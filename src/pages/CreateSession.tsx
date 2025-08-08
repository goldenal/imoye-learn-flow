
import { useNavigate } from "react-router-dom";
import { useCreateSessionLogic, SessionData } from "./CreateSessionLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  ArrowLeft, 
  ArrowRight,
  Check,
  Globe,
  File,
  Type,
  Settings,
  Eye
} from "lucide-react";
import { useState } from "react";

const CreateSession = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [contentType, setContentType] = useState<"file" | "url" | "text" | null>(null);

  const {
    sessionData,
    setSessionData,
    loading,
    error,
    handleFileChange,
    isSessionTitleValid,
    isFileValid,
    createCorpus,
    uploadDocument,
    handlePersonalisationChange
  } = useCreateSessionLogic({
    title: "",
    description: "",
    tags: [],
    goal: "",
    role: "",
    focusAreas: [],
    difficulty: "intermediate",
    content: "",
    url: "",
    file: null
  });

  const steps = [
    { number: 1, title: "Add Content", icon: Upload },
    { number: 2, title: "Session Details", icon: Settings },
    { number: 3, title: "Personalization", icon: Settings },
    { number: 4, title: "Review & Start", icon: Eye }
  ];

  const roles = [
    "Student", "Professional", "Researcher", "Entrepreneur", 
    "Developer", "Manager", "Consultant", "Analyst"
  ];

  const suggestedTags = [
    "Machine Learning", "Business", "Research", "Technology",
    "Marketing", "Finance", "Strategy", "Innovation"
  ];

  const focusAreaOptions = [
    "Key Concepts", "Practical Applications", "Case Studies", 
    "Best Practices", "Technical Details", "Strategic Insights"
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTagAdd = (tag: string) => {
    if (!sessionData.tags.includes(tag)) {
      setSessionData({
        ...sessionData,
        tags: [...sessionData.tags, tag]
      });
    }
  };

  const handleTagRemove = (tag: string) => {
    setSessionData({
      ...sessionData,
      tags: sessionData.tags.filter(t => t !== tag)
    });
  };

  const handleFocusAreaToggle = (area: string) => {
    if (sessionData.focusAreas.includes(area)) {
      setSessionData({
        ...sessionData,
        focusAreas: sessionData.focusAreas.filter(a => a !== area)
      });
    } else {
      setSessionData({
        ...sessionData,
        focusAreas: [...sessionData.focusAreas, area]
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Content Type</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card 
                  className={`cursor-pointer transition-all ${
                    contentType === 'file' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-card'
                  }`}
                  onClick={() => setContentType('file')}
                >
                  <CardContent className="p-6 text-center">
                    <File className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h4 className="font-medium mb-2">Upload File</h4>
                    <p className="text-sm text-muted-foreground">PDF, DOCX, TXT</p>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all ${
                    contentType === 'url' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-card'
                  }`}
                  onClick={() => setContentType('url')}
                >
                  <CardContent className="p-6 text-center">
                    <Globe className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h4 className="font-medium mb-2">Add Website</h4>
                    <p className="text-sm text-muted-foreground">URL or webpage</p>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all ${
                    contentType === 'text' ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-card'
                  }`}
                  onClick={() => setContentType('text')}
                >
                  <CardContent className="p-6 text-center">
                    <Type className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h4 className="font-medium mb-2">Paste Text</h4>
                    <p className="text-sm text-muted-foreground">Direct text input</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {contentType === 'file' && (
  <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center bg-primary/5">
    <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
    <h4 className="font-medium mb-2">Drop your file here</h4>
    <p className="text-sm text-muted-foreground mb-4">
      Supports PDF, DOCX, TXT, Sheets, Slides up to 10MB
    </p>
    <input
      type="file"
      accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint"
      style={{ display: 'none' }}
      id="file-upload-input"
      onChange={handleFileChange}
    />
    <label htmlFor="file-upload-input">
      <Button asChild variant="outline">
        <span>Browse Files</span>
      </Button>
    </label>
    {sessionData.file && (
      <div className="mt-2 text-xs text-green-700">Selected: {sessionData.file.name}</div>
    )}
  </div>
)}

            {contentType === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Website URL</label>
                  <Input 
                    placeholder="https://example.com/article"
                    value={sessionData.url}
                    onChange={(e) => setSessionData({...sessionData, url: e.target.value})}
                  />
                </div>
                {sessionData.url && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <LinkIcon className="w-4 h-4" />
                      Preview will appear here
                    </div>
                  </div>
                )}
              </div>
            )}

            {contentType === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Paste your text</label>
                  <Textarea 
                    placeholder="Paste or type your content here..."
                    className="min-h-[200px]"
                    value={sessionData.content}
                    onChange={(e) => setSessionData({...sessionData, content: e.target.value})}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Markdown formatting supported</span>
                    <span>{sessionData.content.length} characters</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Session Details</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Session Title</label>
                <Input 
  placeholder="Auto-generated from content or enter custom title"
  value={sessionData.title}
  onChange={(e) => setSessionData({ ...sessionData, title: e.target.value })}
  required
/>
{!isSessionTitleValid() && (
  <div className="text-xs text-red-600 mt-1">Session title is required.</div>
)}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <Textarea 
                  placeholder="Add context about what you want to learn..."
                  value={sessionData.description}
                  onChange={(e) => setSessionData({...sessionData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {sessionData.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="default" 
                        className="cursor-pointer"
                        onClick={() => handleTagRemove(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Suggested tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags.filter(tag => !sessionData.tags.includes(tag)).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => handleTagAdd(tag)}
                        >
                          + {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Learning Goal</label>
                <Input 
                  placeholder="What do you want to achieve from this session?"
                  value={sessionData.goal}
                  onChange={(e) => setSessionData({...sessionData, goal: e.target.value})}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Personalization</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Your Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((role) => (
                    <Button
                      key={role}
                      variant={sessionData.role === role ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSessionData({...sessionData, role})}
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Focus Areas</label>
                <div className="grid grid-cols-2 gap-2">
                  {focusAreaOptions.map((area) => (
                    <Button
                      key={area}
                      variant={sessionData.focusAreas.includes(area) ? "default" : "outline"}
                      className="justify-start h-auto p-3"
                      onClick={() => handleFocusAreaToggle(area)}
                    >
                      <div className="flex items-center gap-2">
                        {sessionData.focusAreas.includes(area) && <Check className="w-4 h-4" />}
                        <span className="text-sm">{area}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Difficulty Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <Button
                      key={level}
                      variant={sessionData.difficulty === level ? "default" : "outline"}
                      className="capitalize"
                      onClick={() => setSessionData({...sessionData, difficulty: level as any})}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Review & Start</h3>
            </div>

            <Card className="bg-gradient-subtle">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Session Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      {sessionData.title || "Untitled Session"}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Content Type:</span>
                      <span className="ml-2 capitalize">{contentType}</span>
                    </div>
                    <div>
                      <span className="font-medium">Role:</span>
                      <span className="ml-2">{sessionData.role}</span>
                    </div>
                    <div>
                      <span className="font-medium">Difficulty:</span>
                      <span className="ml-2 capitalize">{sessionData.difficulty}</span>
                    </div>
                    <div>
                      <span className="font-medium">Focus Areas:</span>
                      <span className="ml-2">{sessionData.focusAreas.length} selected</span>
                    </div>
                  </div>

                  {sessionData.tags.length > 0 && (
                    <div>
                      <span className="font-medium text-sm">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {sessionData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="text-center pt-4">
              <Button
  size="lg"
  className="bg-gradient-primary hover:opacity-90 text-white px-8"
  disabled={loading !== null || !isSessionTitleValid() || (contentType === 'file' && !isFileValid())}
  onClick={async () => {
    try {
      if (!isSessionTitleValid()) return;
      let corpusResp = await createCorpus();
      if (corpusResp && corpusResp.status === "success" && corpusResp.corpus_name) {
        let uploadResp = null;
        if (contentType === "file") {
          uploadResp = await uploadDocument(corpusResp.corpus_name);
        }
        // Use display_name from corpusResp for navigation
        navigate(`/session/${corpusResp.display_name}`);
      }
    } catch (err) {
      // Optionally handle error (already set in hook)
    }
  }}
>
  {loading === "creating" && <span>Creating session...</span>}
  {loading === "finalising" && <span>Finalising...</span>}
  {loading === null && <span>Start Learning Session</span>}
  <ArrowRight className="w-4 h-4 ml-2" />
</Button>
{error && <div className="text-xs text-red-600 mt-2">{error}</div>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-semibold">Create New Session</h1>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="mb-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-center gap-3 ${
                  step.number === currentStep
                    ? 'text-primary font-medium'
                    : step.number < currentStep
                    ? 'text-green-600'
                    : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step.number === currentStep
                      ? 'bg-primary text-white'
                      : step.number < currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-muted'
                  }`}
                >
                  {step.number < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{step.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-card">
            <CardContent className="p-8">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!contentType && currentStep === 1}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
