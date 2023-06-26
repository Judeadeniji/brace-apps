import { memo } from "brace-js";
import Header from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import Skills from "./components/skills";
import { Projects, Newsletter } from "./components/projects";
import Footer from "./components/footer";

const App = (props) => {
  return (
      <div class="main" key="root">
        <div id="top">
          <Header key="header" />
          <Hero key="Hero" />
        </div>
        <div class="content">
          <About />
          <Skills />
          <Projects />
          <Newsletter />
        </div>
          <Footer />
      </div>
    );
};

export default App;

