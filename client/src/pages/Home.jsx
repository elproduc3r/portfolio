import ParallaxMirror from "../components/ParallaxMirror";
import Pace from "../components/Pace";
import Header from "../components/Header";
import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import ServiceSection from "../components/ServicesSection";
import ContactSection from "../components/ContactSection";
import PageContainer from "../components/PageContainer";
import { ModeContext } from "../components/ModeContext";

const Home = () => {
  return (
    <ModeContext.Provider value={{mode: "dark"}} >
      <PageContainer>
        <ParallaxMirror />
        <Pace />
        <Header />
        <HomeSection />
        <AboutSection />
        <ServiceSection />
        <ContactSection />
      </PageContainer>
    </ModeContext.Provider>
  );
};

export default Home;
