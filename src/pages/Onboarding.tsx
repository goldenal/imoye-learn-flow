import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ChevronRight, 
  ChevronLeft, 
  Code, 
  Database, 
  Brain, 
  Shield, 
  Palette, 
  TrendingUp,
  DollarSign,
  Megaphone,
  Plus,
  Check
} from "lucide-react";

interface OnboardingData {
  interests: string[];
  customInterest: string;
  role: string;
  customRole: string;
  learningStyle: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    interests: [],
    customInterest: "",
    role: "",
    customRole: "",
    learningStyle: "",
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const interestOptions = [
    { id: "frontend", label: "Frontend Development", icon: Code },
    { id: "backend", label: "Backend Development", icon: Database },
    { id: "datascience", label: "Data Science", icon: TrendingUp },
    { id: "cybersecurity", label: "Cybersecurity", icon: Shield },
    { id: "ai", label: "AI/Machine Learning", icon: Brain },
    { id: "business", label: "Business Strategy", icon: TrendingUp },
    { id: "design", label: "Design", icon: Palette },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "marketing", label: "Marketing", icon: Megaphone },
  ];

  const roleOptions = [
    "Student",
    "Software Developer", 
    "Data Scientist",
    "Business Analyst",
    "Manager/Executive",
    "Researcher",
    "Consultant",
    "Career Changer",
  ];

  const learningStyleOptions = [
    {
      id: "visual",
      title: "Visual",
      description: "Mind maps, diagrams, and visual content"
    },
    {
      id: "interactive", 
      title: "Interactive",
      description: "Chat, Q&A, and hands-on activities"
    },
    {
      id: "structured",
      title: "Structured", 
      description: "Step-by-step courses and guided paths"
    },
    {
      id: "exploratory",
      title: "Exploratory",
      description: "Browse and discover at your own pace"
    },
  ];

  const handleInterestToggle = (interest: string) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const addCustomInterest = () => {
    if (data.customInterest.trim() && !data.interests.includes(data.customInterest)) {
      setData(prev => ({
        ...prev,
        interests: [...prev.interests, prev.customInterest],
        customInterest: ""
      }));
    }
  };

  const addCustomRole = () => {
    if (data.customRole.trim()) {
      setData(prev => ({
        ...prev,
        role: prev.customRole,
        customRole: ""
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    console.log("Onboarding completed:", data);
    // Navigate to dashboard or home page
    navigate("/");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 2:
        return data.interests.length > 0;
      case 3:
        return data.role !== "";
      case 4:
        return data.learningStyle !== "";
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Welcome to Imoye!</h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Let's personalize your learning experience to help you achieve your goals faster.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">What we'll set up:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <p>Your interests</p>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <p>Your role & goals</p>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <p>Learning style</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">What topics interest you most?</h2>
              <p className="text-muted-foreground">
                Select all that apply. We'll curate content based on your interests.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = data.interests.includes(option.id);
                
                return (
                  <Button
                    key={option.id}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col gap-2 ${isSelected ? 'bg-primary text-primary-foreground' : ''}`}
                    onClick={() => handleInterestToggle(option.id)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs text-center">{option.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Custom Interest Input */}
            <div className="space-y-2">
              <Label htmlFor="customInterest">Other interest:</Label>
              <div className="flex gap-2">
                <Input
                  id="customInterest"
                  placeholder="Enter custom interest"
                  value={data.customInterest}
                  onChange={(e) => setData(prev => ({ ...prev, customInterest: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={addCustomInterest}
                  disabled={!data.customInterest.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Selected Interests */}
            {data.interests.length > 0 && (
              <div className="space-y-2">
                <Label>Selected interests:</Label>
                <div className="flex flex-wrap gap-2">
                  {data.interests.map((interest) => {
                    const option = interestOptions.find(opt => opt.id === interest);
                    return (
                      <Badge 
                        key={interest} 
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {option ? option.label : interest}
                        <button className="ml-1 hover:text-destructive">×</button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">What's your primary role or goal?</h2>
              <p className="text-muted-foreground">
                This helps us recommend the most relevant content for you.
              </p>
            </div>

            <RadioGroup 
              value={data.role} 
              onValueChange={(value) => setData(prev => ({ ...prev, role: value }))}
              className="space-y-3"
            >
              {roleOptions.map((role) => (
                <div key={role} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={role} id={role} />
                  <Label htmlFor={role} className="flex-1 cursor-pointer">
                    {role}
                  </Label>
                </div>
              ))}
              
              {/* Custom Role Option */}
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="custom" id="custom" />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="custom" className="cursor-pointer">Other</Label>
                  {data.role === "custom" && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter your role"
                        value={data.customRole}
                        onChange={(e) => setData(prev => ({ ...prev, customRole: e.target.value }))}
                        onKeyPress={(e) => e.key === 'Enter' && addCustomRole()}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={addCustomRole}
                        disabled={!data.customRole.trim()}
                      >
                        Set
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </RadioGroup>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">How do you prefer to learn?</h2>
              <p className="text-muted-foreground">
                We'll customize your learning experience based on your preference.
              </p>
            </div>

            <div className="space-y-3">
              {learningStyleOptions.map((style) => (
                <div 
                  key={style.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    data.learningStyle === style.id 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'hover:border-accent'
                  }`}
                  onClick={() => setData(prev => ({ ...prev, learningStyle: style.id }))}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                      data.learningStyle === style.id 
                        ? 'border-primary bg-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {data.learningStyle === style.id && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{style.title}</h3>
                      <p className="text-sm text-muted-foreground">{style.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Progress Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Imoye
          </h1>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-elegant border-0">
          <CardHeader className="pb-4">
            <CardTitle className="sr-only">Onboarding Step {currentStep}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handleComplete}
                  disabled={!canProceed()}
                  className="flex items-center gap-2"
                >
                  Complete Setup
                  <Check className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center gap-2"
                >
                  {currentStep === 1 ? "Get Started" : "Continue"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;