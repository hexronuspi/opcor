import Faq from "../components/aboutus/faq";
import OpcorPage from "../components/aboutus/opcor";
import WhatWeFund from "../components/aboutus/whatwefund";
import Footer from "../components/home/footer";
import Navbar from "../components/home/navbar";

export default function AboutUs() {
  return (
    <main>
        <Navbar/>
        <OpcorPage/>
        <WhatWeFund/>
        <Faq/>
        <Footer/>
    </main>
  );
}
