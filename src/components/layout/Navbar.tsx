import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="gradient-primary p-2 rounded-lg shadow-elegant group-hover:shadow-glow transition-smooth">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">CreativeLabAI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-muted-foreground hover:text-foreground transition-smooth">
              Features
            </Link>
            <Link to="#pricing" className="text-muted-foreground hover:text-foreground transition-smooth">
              Pricing
            </Link>
            <Link to="/auth" className="text-muted-foreground hover:text-foreground transition-smooth">
              Sign In
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild className="hidden md:inline-flex">
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}