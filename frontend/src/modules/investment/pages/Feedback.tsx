
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Star, MessageSquare, Send } from "lucide-react";

const Feedback = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Feedback submitted successfully!", {
        description: "Thank you for helping us improve FinXpert.",
      });
      setRating(null);
      setFeedback("");
      setEmail("");
      setFeedbackType("suggestion");
      setIsSubmitting(false);
    }, 1500);
  };

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Product Manager",
      content: "FinXpert has completely transformed how I manage my investments. The AI recommendations are spot-on!",
      rating: 5
    },
    {
      id: 2,
      name: "Amit Patel",
      role: "IT Professional",
      content: "I've tried many investment apps, but FinXpert stands out with its beautiful UI and genuinely helpful advice.",
      rating: 5
    },
    {
      id: 3,
      name: "Neha Gupta",
      role: "Entrepreneur",
      content: "The ROI simulator helped me visualize my future wealth. Great tool for planning long-term goals!",
      rating: 4
    }
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">Share Your Feedback</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Help us improve FinXpert. Your feedback is valuable in making our platform better for everyone.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-finxpert-purple" />
                Tell Us What You Think
              </CardTitle>
              <CardDescription>Share your experience, suggestions, or report issues</CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="feedback-type" className="text-base">Feedback Type</Label>
                    <RadioGroup 
                      id="feedback-type" 
                      value={feedbackType} 
                      onValueChange={setFeedbackType}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="suggestion" id="suggestion" />
                        <Label htmlFor="suggestion">Suggestion</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="issue" id="issue" />
                        <Label htmlFor="issue">Report Issue</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="praise" id="praise" />
                        <Label htmlFor="praise">Praise</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="rating" className="text-base">Rate Your Experience</Label>
                    <div className="flex items-center mt-2" id="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="p-1 focus:outline-none"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(null)}
                        >
                          <Star
                            className={`h-8 w-8 ${
                              (hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0))
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            } transition-colors`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-gray-500 text-sm">
                        {rating ? `${rating} out of 5 stars` : "Select a rating"}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="feedback" className="text-base">Your Feedback</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Tell us what you like or how we can improve"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={5}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-base">Your Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll only use this to follow up on your feedback if needed.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleSubmit}
                className="gradient-button w-full"
                disabled={isSubmitting || !feedback}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Submitting...
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-6">What Our Users Say</h2>
          
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white/80">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-finxpert-light-purple flex items-center justify-center text-finxpert-purple font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 italic">"{testimonial.content}"</p>
                  
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="glass-card p-6 mt-6 text-center">
            <h3 className="text-lg font-bold mb-2">Join Our User Research Panel</h3>
            <p className="text-gray-600 mb-4">
              Help shape the future of FinXpert by participating in user testing sessions and interviews.
            </p>
            <Button variant="outline" className="border-finxpert-purple text-finxpert-purple hover:bg-finxpert-light-purple">
              Join Research Panel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
