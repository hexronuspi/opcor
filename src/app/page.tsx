import Navbar from "./components/home/navbar";
import Hero from "./components/home/hero";
import Footer from "./components/home/footer";
import OpcorLanding from "./components/home/base";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <OpcorLanding/>
      <Footer/>
    </main>
  );
}
