import Navbar from "@/components/app/nav-bar";
import Footer from "@/components/app/footer";
import Main from "@/components/app/main";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}
