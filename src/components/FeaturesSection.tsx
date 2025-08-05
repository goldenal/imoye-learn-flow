import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, Palette, Upload, MessageSquare, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Content Analysis",
    description: "Upload any PDF, website, or text. Our AI extracts key insights and creates interactive learning experiences tailored to your needs."
  },
  {
    icon: Users,
    title: "Role-Based Personalization", 
    description: "Learn the same content as a developer, manager, student, or any role. Get relevant examples and explanations that match your background."
  },
  {
    icon: Palette,
    title: "Interactive Whiteboard Tools",
    description: "Voice chat, mind maps, tutor mode, and collaborative tools to enhance your learning experience and retention."
  },
  {
    icon: Upload,
    title: "Multi-Format Support",
    description: "Works with PDFs, websites, documents, and text. Seamlessly integrate any learning material into your personalized workspace."
  },
  {
    icon: MessageSquare,
    title: "AI-Powered Chat",
    description: "Ask questions, get explanations, and dive deeper into topics with our intelligent tutoring system that adapts to your learning style."
  },
  {
    icon: BarChart3,
    title: "Learning Analytics",
    description: "Track your progress, identify knowledge gaps, and get personalized recommendations to optimize your learning journey."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Powerful Features for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Modern Learning
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to transform any content into an engaging, personalized learning experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card-shadow transition-all duration-300 border-border/50 hover:border-primary/20 bg-gradient-card"
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;