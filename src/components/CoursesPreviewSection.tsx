import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Star, ArrowRight } from "lucide-react";

const courses = [
  {
    category: "Data Science Course",
    title: "Football Stats Analytics", 
    description: "Learn data science through player analytics and match statistics",
    duration: "12 hours",
    modules: 8,
    rating: 4.8,
    personalizations: ["For Developers", "For Analysts", "For Beginners"],
    featured: true
  },
  {
    category: "Cybersecurity Course",
    title: "Security for E-commerce",
    description: "Master cybersecurity through online retail protection scenarios", 
    duration: "15 hours",
    modules: 10,
    rating: 4.9,
    personalizations: ["For Developers", "For Managers", "For IT Teams"]
  },
  {
    category: "Frontend Development",
    title: "Build Gaming Interfaces",
    description: "Learn React and modern frontend through game UI development",
    duration: "18 hours", 
    modules: 12,
    rating: 4.7,
    personalizations: ["For Designers", "For Developers", "For Beginners"]
  },
  {
    category: "Machine Learning",
    title: "Movie Recommendation Systems",
    description: "Build ML algorithms through entertainment data and user preferences",
    duration: "20 hours",
    modules: 14,
    rating: 4.8,
    personalizations: ["For Engineers", "For Data Scientists", "For Product Managers"]
  }
];

const CoursesPreviewSection = () => {
  return (
    <section id="courses" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Professional Development{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Expert-crafted courses that adapt to your background and learning style. 
            Learn through practical, real-world scenarios.
          </p>
          <Button variant="outline" size="lg">
            View All Courses
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <Card 
              key={index}
              className={`group hover:shadow-card-shadow transition-all duration-300 border-border/50 hover:border-primary/20 ${
                course.featured ? 'ring-2 ring-primary/20 bg-gradient-card' : 'bg-background'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-sm font-medium text-accent">
                    {course.category}
                  </div>
                  {course.featured && (
                    <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                
                <p className="text-muted-foreground">
                  {course.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Course Meta */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.modules} modules
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {course.rating}
                  </div>
                </div>

                {/* Personalization Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.personalizations.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-primary-light text-primary px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  variant={course.featured ? "hero" : "default"} 
                  className="w-full group"
                >
                  Start Learning
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesPreviewSection;