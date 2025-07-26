import HeroSection from "@/components/HeroSectin";
import { ValuePropositionSection } from "@/components/ValuePropositionSection";
import { PlansSection } from "@/components/PlanSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/auth.action";
export default async function Home() {
  const isAuthenticated = !!(await getCurrentUser());

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-grow">
          <HeroSection />
          <ValuePropositionSection />

          <PlansSection />
          <TestimonialsSection />
          <FaqSection />
        </main>
      </div>
    </>
  );
}
