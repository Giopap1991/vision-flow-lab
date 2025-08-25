import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image, BarChart3, Eye } from "lucide-react";

const mockCreatives = [
  { id: 1, name: "Summer Ad 1", ctr: 3.2, cvr: 1.8, status: "completed", project: "Summer Campaign" },
  { id: 2, name: "Holiday Banner", ctr: 4.1, cvr: 2.3, status: "completed", project: "Holiday Promo" },
  { id: 3, name: "Brand Logo", ctr: 2.8, cvr: 1.5, status: "processing", project: "Brand Awareness" },
  { id: 4, name: "Product Shot", ctr: 3.7, cvr: 2.1, status: "completed", project: "Product Launch" },
];

export default function Gallery() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Gallery</h1>
        <p className="text-muted-foreground">Browse and manage all your creative assets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockCreatives.map((creative) => (
          <Card key={creative.id} className="shadow-card hover:shadow-elegant transition-smooth group">
            <div className="aspect-square bg-gradient-primary/10 rounded-t-lg flex items-center justify-center">
              <Image className="h-12 w-12 text-primary" />
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">{creative.name}</h3>
                <p className="text-sm text-muted-foreground">{creative.project}</p>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>CTR: <strong className="text-primary">{creative.ctr}%</strong></span>
                <span>CVR: <strong className="text-primary">{creative.cvr}%</strong></span>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant={creative.status === "completed" ? "default" : "secondary"}>
                  {creative.status}
                </Badge>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}