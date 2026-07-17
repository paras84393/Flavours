import React from 'react';
import { Star } from 'lucide-react';

export default function ChefRecommendations() {
const recommendations = [
  {
    id: 1,
    name: "Makhani Tikka",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 245,
  },
  {
    id: 2,
    name: "Melt-in-Mouth Kebabs",
    image:
      "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 3,
    name: "24-Hour Slow Cooked Haleem",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviews: 198,
  },
  {
    id: 4,
    name: "Butter Chicken",
    image:
      "https://images.unsplash.com/photo-1603893662172-99ed0cea2a08?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 289,
  },
  {
    id: 5,
    name: "Chicken Biryani",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 267,
  },
  {
    id: 6,
    name: "Tandoori Chicken",
    image:
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviews: 234,
  },
];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2 text-gray-900">Chef's Recommendations</h2>
        <div className="h-1 w-24 bg-red-800 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map(item => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{item.rating} ({item.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}