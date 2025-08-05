import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
   const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-subtle py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="max-w-xl lg:max-w-none">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-accent-light text-accent px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                AI-Powered Learning
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Transform Any Material Into{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Personalized Learning
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Upload PDFs, analyze websites, or explore curated courses with AI-powered insights 
              tailored to your role and goals. Learn smarter, not harder.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="hero" size="xl" className="group">
                Start Learning Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="demo" size="xl" className="group" onClick={() => navigate("/new-session")}>
                <Play className="h-5 w-5" />
                Try Demo
              </Button>
              
              <Button variant="outline" size="xl">
                Explore Courses
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                No credit card required
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                10K+ documents analyzed
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                50+ course variations
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-20 blur-3xl"></div>
              <img
                src={heroImage}
                alt="AI-powered learning platform illustration"
                className="relative rounded-3xl shadow-elegant w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;