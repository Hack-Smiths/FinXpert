
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, PlayCircle, BookOpen, Award, Clock } from "lucide-react";

const Learn = () => {
  const courses = [
    {
      id: 1,
      title: "Mutual Funds 101",
      description: "Learn the basics of mutual funds and how to select the right ones for your portfolio.",
      duration: "15 mins",
      level: "Beginner",
      category: "Mutual Funds",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      title: "Understanding Equity Markets",
      description: "Dive into the world of stocks, market capitalization, and valuation metrics.",
      duration: "25 mins",
      level: "Intermediate",
      category: "Equity",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      title: "Debt Investments Explained",
      description: "Explore different debt instruments including bonds, fixed deposits, and debt funds.",
      duration: "20 mins",
      level: "Beginner",
      category: "Debt",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      title: "Tax-Efficient Investing",
      description: "Strategies to optimize your investments for tax efficiency and maximize returns.",
      duration: "30 mins",
      level: "Advanced",
      category: "Tax Planning",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 5,
      title: "SIP vs Lumpsum Investing",
      description: "Compare systematic investment plans with lumpsum investments and learn when to use each.",
      duration: "15 mins",
      level: "Beginner",
      category: "Investment Strategy",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 6,
      title: "Retirement Planning Essentials",
      description: "Build a solid retirement corpus with strategic asset allocation and regular reviews.",
      duration: "35 mins",
      level: "Intermediate",
      category: "Retirement",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-amber-100 text-amber-800";
      case "Advanced":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">Learn Finance</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Bite-sized financial education to help you make smarter investment decisions.
          All courses are crafted by financial experts and presented in an easy-to-understand format.
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Popular Courses</h2>
        <Button variant="outline" className="text-sm">
          View All Courses <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-0 right-0 m-2">
                <Badge className={`${getLevelColor(course.level)}`}>
                  {course.level}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div>
                  {course.category}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm" className="text-finxpert-purple hover:text-purple-700 hover:bg-finxpert-light-purple">
                <BookOpen className="h-4 w-4 mr-2" />
                Read
              </Button>
              <Button className="bg-finxpert-purple hover:bg-purple-600 text-white">
                <PlayCircle className="h-4 w-4 mr-2" />
                Start Course
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="glass-card p-8 rounded-2xl bg-gradient-to-r from-finxpert-light-purple to-finxpert-blue/30">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-bold mb-2">Get Certified in Financial Literacy</h2>
            <p className="text-gray-700 mb-4">
              Complete our comprehensive financial literacy program and earn a certificate to showcase your knowledge.
            </p>
            <Button className="gradient-button">
              <Award className="h-5 w-5 mr-2" />
              Enroll in Certification
            </Button>
          </div>
          
          <div className="shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Financial Certification" 
              className="w-40 h-40 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
