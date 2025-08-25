-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for subscription tiers
CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'enterprise');

-- Create enum for creative status
CREATE TYPE creative_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    subscription_tier subscription_tier DEFAULT 'free',
    credits_remaining INTEGER DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creatives table
CREATE TABLE public.creatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    original_url TEXT NOT NULL,
    status creative_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Variations table
CREATE TABLE public.variations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creative_id UUID NOT NULL REFERENCES public.creatives(id) ON DELETE CASCADE,
    variation_url TEXT NOT NULL,
    predicted_ctr DECIMAL(5,4),
    predicted_cvr DECIMAL(5,4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Competitors table
CREATE TABLE public.competitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    facebook_page_id TEXT,
    website_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Competitor ads table
CREATE TABLE public.competitor_ads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competitor_id UUID NOT NULL REFERENCES public.competitors(id) ON DELETE CASCADE,
    ad_url TEXT NOT NULL,
    ad_copy TEXT,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_ads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for projects table
CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for creatives table
CREATE POLICY "Users can view creatives in own projects" ON public.creatives FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = creatives.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can create creatives in own projects" ON public.creatives FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = creatives.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can update creatives in own projects" ON public.creatives FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = creatives.project_id AND projects.user_id = auth.uid()));
CREATE POLICY "Users can delete creatives in own projects" ON public.creatives FOR DELETE 
    USING (EXISTS (SELECT 1 FROM public.projects WHERE projects.id = creatives.project_id AND projects.user_id = auth.uid()));

-- RLS Policies for variations table
CREATE POLICY "Users can view variations of own creatives" ON public.variations FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.creatives 
        JOIN public.projects ON creatives.project_id = projects.id 
        WHERE creatives.id = variations.creative_id AND projects.user_id = auth.uid()
    ));
CREATE POLICY "Users can create variations for own creatives" ON public.variations FOR INSERT 
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.creatives 
        JOIN public.projects ON creatives.project_id = projects.id 
        WHERE creatives.id = variations.creative_id AND projects.user_id = auth.uid()
    ));

-- RLS Policies for competitors table
CREATE POLICY "Users can view own competitors" ON public.competitors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own competitors" ON public.competitors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own competitors" ON public.competitors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own competitors" ON public.competitors FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for competitor ads table
CREATE POLICY "Users can view ads from own competitors" ON public.competitor_ads FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.competitors WHERE competitors.id = competitor_ads.competitor_id AND competitors.user_id = auth.uid()));
CREATE POLICY "Users can create ads for own competitors" ON public.competitor_ads FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM public.competitors WHERE competitors.id = competitor_ads.competitor_id AND competitors.user_id = auth.uid()));

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, subscription_tier, credits_remaining)
    VALUES (NEW.id, NEW.email, 'free', 10);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_creatives_updated_at BEFORE UPDATE ON public.creatives FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();