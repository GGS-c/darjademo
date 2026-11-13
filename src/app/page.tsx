import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryStories } from '@/components/home/CategoryStories';
import { NewArrivals } from '@/components/home/NewArrivals';
import { EditorialSplit } from '@/components/home/EditorialSplit';
import { BestSellers } from '@/components/home/BestSellers';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { BrandStory } from '@/components/home/BrandStory';
import { InstagramFeed } from '@/components/home/InstagramFeed';

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategoryStories />
      <NewArrivals />
      <EditorialSplit />
      <BestSellers />
      <CategoryGrid />
      <BrandStory />
      <InstagramFeed />
    </div>
  );
}
