import { BookOpen, Mail, Twitter, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Imoye</span>
            </div>
            <p className="text-background/70 mb-6 max-w-md">
              Transform any material into personalized learning experiences with AI-powered insights 
              tailored to your role and goals.
            </p>
            
            {/* Newsletter */}
            <div>
              <h3 className="font-semibold mb-3">Stay Updated</h3>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-background/30"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-background/70">
              <li><a href="#features" className="hover:text-background transition-colors">Features</a></li>
              <li><a href="#courses" className="hover:text-background transition-colors">Courses</a></li>
              <li><a href="#pricing" className="hover:text-background transition-colors">Pricing</a></li>
              <li><a href="#demo" className="hover:text-background transition-colors">Try Demo</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-background/70">
              <li><a href="#about" className="hover:text-background transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-background transition-colors">Contact</a></li>
              <li><a href="#careers" className="hover:text-background transition-colors">Careers</a></li>
              <li><a href="#blog" className="hover:text-background transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-background/10">
          <div className="text-background/70 text-sm mb-4 md:mb-0">
            © 2024 Imoye. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;