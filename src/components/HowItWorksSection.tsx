import { Card, CardContent } from "@/components/ui/card";
import { Upload, UserCheck, MessageCircle, Save } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload & Analyze",
    description: "Drop your PDF, paste a website link, or add text. Our AI instantly analyzes the content and extracts key insights."
  },
  {
    number: "02", 
    icon: UserCheck,
    title: "Choose Your Role",
    description: "Select how you want to learn - as a developer, student, manager, or any role. Get personalized explanations and examples."
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Interactive Learning",
    description: "Chat with AI, create mind maps, use voice mode, and explore concepts through interactive whiteboard tools."
  },
  {
    number: "04",
    icon: Save,
    title: "Save & Share",
    description: "Export insights, save your progress, create summaries, and continue your learning journey anytime, anywhere."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform any content into personalized learning in just four simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/20 to-transparent z-0"></div>
              )}
              
              <Card className="relative z-10 text-center hover:shadow-card-shadow transition-all duration-300 bg-background/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className="text-6xl font-bold text-primary/10 mb-4">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;