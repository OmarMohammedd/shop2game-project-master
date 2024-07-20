import Navbar from "@/components/custom/navbar";
import Hero from "@/components/custom/hero";
import Gameselection from "@/components/custom/gameselection";
import Gamequery from "@/components/custom/gamequery";
import Footer from "@/components/custom/footer";
export default function Home() {

  return (
    <>
      <Navbar />
      <Hero />
      <Gameselection />
      <Gamequery />
      <Footer />
    </>
  );
}
