import React from 'react';
import Hero from '../components/Hero';
import ChefRecommendations from '../components/ChefRecommendations';
import Reviews from '../components/Reviews';

export default function Home() {
  return (
    <div>
      <Hero />
      <ChefRecommendations />
      <Reviews />
    </div>
  );
}