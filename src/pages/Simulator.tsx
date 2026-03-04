import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Simulator3D from "@/components/Simulator3D";

const Simulator = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <Simulator3D />
      </div>
      <Footer />
    </div>
  );
};

export default Simulator;
