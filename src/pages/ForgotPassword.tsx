import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid(email)) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log("Password reset requested for:", email);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-elegant border-0">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Check your email</h2>
                  <p className="text-muted-foreground">
                    We've sent a password reset link to
                  </p>
                  <p className="font-medium text-foreground">{email}</p>
                </div>
                
                <div className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setEmail("");
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Try different email
                    </Button>
                    
                    <Link to="/login">
                      <Button variant="ghost" className="w-full">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to sign in
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Imoye
          </h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Reset your password
          </h2>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <Card className="shadow-elegant border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Forgot password?</CardTitle>
            <CardDescription>
              No worries, we'll send you reset instructions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={email && !isEmailValid(email) ? "border-destructive" : ""}
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                {email && !isEmailValid(email) && (
                  <p className="text-xs text-destructive">Please enter a valid email address</p>
                )}
              </div>

              {/* Reset Password Button */}
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={!isEmailValid(email) || isLoading}
              >
                {isLoading ? "Sending..." : "Send reset instructions"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;