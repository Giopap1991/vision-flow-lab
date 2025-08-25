import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Sparkles, 
  Zap, 
  Target, 
  Brain, 
  BarChart3, 
  Shield,
  CheckCircle,
  ArrowRight 
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze your creatives and predict performance metrics with 95% accuracy."
  },
  {
    icon: Target,
    title: "Performance Optimization",
    description: "Get actionable insights on CTR and CVR predictions to optimize your creative campaigns for maximum ROI."
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Monitor your creative performance with live dashboards and comprehensive reporting tools."
  },
  {
    icon: Zap,
    title: "Instant Variations",
    description: "Generate multiple creative variations instantly and test different approaches simultaneously."
  },
  {
    icon: Shield,
    title: "Competitor Intelligence",
    description: "Track competitor ads and strategies to stay ahead of the market with our monitoring tools."
  },
  {
    icon: Sparkles,
    title: "Smart Automation",
    description: "Automate your creative workflow with intelligent suggestions and automated A/B testing."
  }
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "10 creative uploads per month",
      "Basic performance predictions",
      "Community support",
      "Standard analytics"
    ],
    cta: "Get Started Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "For growing businesses",
    features: [
      "500 creative uploads per month",
      "Advanced AI predictions",
      "Priority support",
      "Advanced analytics",
      "Competitor tracking",
      "Custom integrations"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "per month",
    description: "For large organizations",
    features: [
      "Unlimited creative uploads",
      "Custom AI models",
      "24/7 dedicated support",
      "White-label solution",
      "Advanced competitor intelligence",
      "Custom integrations & API access"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 gradient-primary text-white border-0">
              🚀 AI-Powered Creative Intelligence
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Transform Your <span className="gradient-text">Creative Strategy</span> with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto">
              Harness the power of artificial intelligence to analyze, optimize, and supercharge your creative campaigns. 
              Get data-driven insights that drive results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="gradient-primary text-white border-0 hover:opacity-90" size="lg" asChild>
                <Link to="/auth">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="bg-transparent border-muted-foreground text-muted-foreground hover:bg-muted" size="lg">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Powerful Features for
              <span className="gradient-text"> Creative Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to analyze, optimize, and scale your creative campaigns with confidence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth hover:-translate-y-1">
                <CardHeader>
                  <div className="gradient-primary p-3 rounded-lg w-fit shadow-elegant">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, Transparent
              <span className="gradient-text"> Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your creative needs. Start free and scale as you grow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative shadow-card hover:shadow-elegant transition-smooth ${
                  plan.popular ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.popular ? "hero" : "outline"} 
                    className="w-full"
                    asChild
                  >
                    <Link to="/auth">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Creatives?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of marketers who trust CreativeLabAI to optimize their campaigns.
          </p>
          <Button variant="glass" size="lg" asChild>
            <Link to="/auth">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}