import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: 'Amaiya Popov',
      rating: 5,
      text: 'The taste of Flavours took me back to the lanes of Lucknow. The ambience is beautiful and the service is impeccable. Highly recommended!'
    },
    {
      id: 2,
      name: 'Rahul Gupta',
      rating: 5,
      text: 'Exceptional food and great service. Every dish is prepared with care and the flavors are authentic. Must visit!'
    },
    {
      id: 3,
      name: 'Meera Jha',
      rating: 5,
      text: 'Flavours is more than just a restaurant. It\'s an experience. The attention to detail in every dish and the warmth of hospitality is unmatched.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2">What Our Guests Say</h2>
        <div className="h-1 w-24 bg-red-800 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {reviews.slice(0, 2).map(review => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">{review.text}</p>
              <p className="font-bold text-gray-900">{review.name}</p>
            </div>
          ))}
        </div>

        {/* Featured Review */}
        <div className="bg-red-800 text-white rounded-lg p-8 mb-8">
          <div className="flex gap-4">
            <Quote size={32} className="flex-shrink-0" />
            <div>
              <p className="italic text-lg mb-4">"{reviews.text}"</p>
              <p className="font-bold">— {reviews.name}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">4.8 out of 5 stars • 1,200+ reviews</p>
          <button className="bg-red-800 text-white px-8 py-3 rounded-lg hover:bg-red-900 transition">
            Leave a Review
          </button>
        </div>
      </div>
    </section>
  );
}