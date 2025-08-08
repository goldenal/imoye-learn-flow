
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FileText, 
  Link, 
  ChevronDown, 
  ChevronRight,
  Search,
  Settings,
  Send,
  Mic,
  MicOff,
  Share,
  Save,
  BookOpen,
  Brain,
  Lightbulb,
  User,
  MessageSquare,
  Edit3,
  Download,
  Trash2,
  Eye,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Target,
  Zap,
  Network,
  Plus,
  Pin,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Session = () => {
  const { id } = useParams();
  const [expandedSources, setExpandedSources] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTutorMode, setIsTutorMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [learningMode, setLearningMode] = useState('intermediate');
  const [sessionTitle, setSessionTitle] = useState('AI & Machine Learning Fundamentals');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const sources = [
    {
      id: '1',
      name: 'Introduction to Machine Learning',
      type: 'pdf',
      size: '2.4 MB',
      status: 'processed',
      sections: ['Chapter 1: Basics', 'Chapter 2: Algorithms', 'Chapter 3: Applications'],
      preview: 'Machine learning is a subset of artificial intelligence that focuses on...'
    },
    {
      id: '2',
      name: 'Neural Networks Deep Dive',
      type: 'url',
      size: '5.1 MB',
      status: 'processing',
      sections: ['Introduction', 'Perceptrons', 'Backpropagation'],
      preview: 'Neural networks are computing systems inspired by biological neural networks...'
    },
    {
      id: '3',
      name: 'Research Notes',
      type: 'text',
      size: '856 KB',
      status: 'processed',
      sections: ['Key Concepts', 'Examples', 'Questions'],
      preview: 'Important findings from recent AI research papers and implementations...'
    }
  ];

  const chatMessages = [
    {
      id: '1',
      type: 'user',
      content: 'Can you explain the difference between supervised and unsupervised learning?',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      type: 'ai',
      content: 'Great question! Supervised learning uses labeled training data to learn patterns, while unsupervised learning finds hidden patterns in data without labels. For example, supervised learning might classify emails as spam/not spam using pre-labeled examples, while unsupervised learning might group customers by behavior without knowing the categories beforehand.',
      timestamp: '10:31 AM',
      citations: ['Introduction to Machine Learning - Chapter 1', 'Research Notes - Key Concepts']
    },
    {
      id: '3',
      type: 'user',
      content: 'How do neural networks learn?',
      timestamp: '10:35 AM'
    }
  ];

  const suggestedQuestions = [
    'Explain backpropagation in simple terms',
    'What are the main types of machine learning?',
    'Show me examples of deep learning applications',
    'Create a study plan for this topic'
  ];

  const toggleSourceExpansion = (sourceId: string) => {
    setExpandedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    console.log('Recording:', !isRecording);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'url': return Link;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent-light">
      <div className="flex h-screen">
        {/* Left Panel - Sources */}
        <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-border flex flex-col">
          {/* Sources Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Sources ({sources.length})
              </h2>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search sources..." 
                className="pl-9 bg-white/50"
              />
            </div>
          </div>

          {/* Sources List */}
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {sources.map((source) => {
              const IconComponent = getFileIcon(source.type);
              const isExpanded = expandedSources.includes(source.id);
              
              return (
                <Card key={source.id} className="bg-white/50 hover:bg-white/70 transition-all duration-200">
                  <CardHeader className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2 flex-1">
                        <IconComponent className="w-4 h-4 mt-1 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-sm text-foreground line-clamp-1">
                              {source.name}
                            </h3>
                            <Badge className={`text-xs ${getStatusColor(source.status)}`}>
                              {source.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {source.type.toUpperCase()} • {source.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 p-0"
                          onClick={() => toggleSourceExpansion(source.id)}
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3 h-3" />
                          ) : (
                            <ChevronRight className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mt-2">
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <CardContent className="pt-0 px-3 pb-3">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs font-medium text-foreground mb-1">Preview</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {source.preview}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-foreground mb-1">Sections</h4>
                          <div className="space-y-1">
                            {source.sections.map((section, idx) => (
                              <div key={idx} className="text-xs text-muted-foreground hover:text-primary cursor-pointer">
                                {section}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Middle Panel - Chat Interface */}
        <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-sm">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-white/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isEditingTitle ? (
                  <Input
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                    className="text-lg font-semibold bg-white/50"
                    autoFocus
                  />
                ) : (
                  <h1 
                    className="text-lg font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    {sessionTitle}
                  </h1>
                )}
                <Edit3 className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Ready</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-white/80'} rounded-lg p-4 shadow-card`}>
                  {msg.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="/api/placeholder/24/24" />
                        <AvatarFallback className="bg-accent text-accent-foreground text-xs">AI</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">Imoye AI</span>
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  {msg.citations && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">Sources:</p>
                      <div className="flex flex-wrap gap-1">
                        {msg.citations.map((citation, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {citation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          <div className="px-4 py-2">
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-white/50 hover:bg-white/70"
                  onClick={() => setMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-white/40">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about your learning materials..."
                  className="min-h-[60px] pr-12 bg-white/50 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "default" : "ghost"}
                  size="sm"
                  className="absolute right-2 top-2"
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Whiteboard Tools */}
        <div className="w-96 bg-white/80 backdrop-blur-sm border-l border-border flex flex-col">
          {/* Tools Header */}
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Learning Tools
            </h2>
          </div>

          <div className="flex-1 overflow-auto">
            <Tabs defaultValue="personalize" className="h-full">
              <TabsList className="grid w-full grid-cols-3 m-4">
                <TabsTrigger value="personalize" className="text-xs">Personalize</TabsTrigger>
                <TabsTrigger value="interact" className="text-xs">Interact</TabsTrigger>
                <TabsTrigger value="tools" className="text-xs">Tools</TabsTrigger>
              </TabsList>

              <TabsContent value="personalize" className="px-4 space-y-4">
                {/* Role Selector */}
                <Card className="bg-white/50">
                  <CardHeader className="pb-3">
                    <h3 className="font-medium text-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Learning Role
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="bg-white/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Learning Mode */}
                <Card className="bg-white/50">
                  <CardHeader className="pb-3">
                    <h3 className="font-medium text-sm flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Difficulty Level
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Select value={learningMode} onValueChange={setLearningMode}>
                      <SelectTrigger className="bg-white/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Custom Prompt */}
                <Card className="bg-white/50">
                  <CardHeader className="pb-3">
                    <h3 className="font-medium text-sm flex items-center gap-2">
                      <Edit3 className="w-4 h-4" />
                      Custom Instructions
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Textarea
                      placeholder="Specify how you'd like the AI to respond..."
                      className="bg-white/50 min-h-[80px]"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interact" className="px-4 space-y-4">
                {/* Voice Chat */}
                <Card className="bg-white/50">
                  <CardHeader className="pb-3">
                    <h3 className="font-medium text-sm flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Voice Chat
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <Button
                      onClick={toggleRecording}
                      variant={isRecording ? "destructive" : "default"}
                      className="w-full"
                    >
                      {isRecording ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          Start Voice Chat
                        </>
                      )}
                    </Button>
                    {isRecording && (
                      <div className="flex items-center justify-center py-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-primary rounded-full animate-pulse"
                              style={{
                                height: Math.random() * 20 + 10,
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tutor Mode */}
                <Card className="bg-white/50">
                  <CardHeader className="pb-3">
                    <h3 className="font-medium text-sm flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      AI Tutor
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <Button
                      onClick={() => setIsTutorMode(!isTutorMode)}
                      variant={isTutorMode ? "destructive" : "default"}
                      className="w-full"
                    >
                      {isTutorMode ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          End Session
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Tutoring
                        </>
                      )}
                    </Button>
                    {isTutorMode && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">3/7 topics</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '43%' }}></div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tools" className="px-4 space-y-4">
                {/* Mind Map Generator */}
                <Card className="bg-white/50">
                  <CardHeader className="pb-3">
                    <h3 className="font-medium text-sm flex items-center gap-2">
                      <Network className="w-4 h-4" />
                      Mind Map
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <Button variant="outline" className="w-full bg-white/50">
                      <Plus className="w-4 h-4 mr-2" />
                      Generate Mind Map
                    </Button>
                    <Select>
                      <SelectTrigger className="bg-white/50">
                        <SelectValue placeholder="Map style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hierarchy">Hierarchy</SelectItem>
                        <SelectItem value="network">Network</SelectItem>
                        <SelectItem value="timeline">Timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/50">
                  <CardHeader className="pb-3">
                    <h3 className="font-medium text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Quick Actions
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-white/50">
                      <Download className="w-4 h-4 mr-2" />
                      Export Notes
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-white/50">
                      <Share className="w-4 h-4 mr-2" />
                      Share Session
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-white/50">
                      <Pin className="w-4 h-4 mr-2" />
                      Pin Important
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Save & Export Section */}
          <div className="p-4 border-t border-border bg-white/40 space-y-2">
            <Button className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Update Session
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="bg-white/50">
                <Share className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="bg-white/50">
                <Users className="w-4 h-4 mr-1" />
                Collaborate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
