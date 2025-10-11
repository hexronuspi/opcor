import Navbar from "./components/home/navbar";
import Hero from "./components/home/hero";
import Footer from "./components/home/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Footer/>
    </main>
  );
}
