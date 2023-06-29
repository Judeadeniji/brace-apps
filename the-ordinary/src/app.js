import { Component } from "@mejor";
import Header from "@app/components/header";
import Footer from "@app/components/footer";

const App = Component(({ Outlet }) => {
  return (
    <div class="font-sf-pro font-normal w-full h-full px-[5px] md:px-0 md:mx-auto md:max-w-[920px] lg:max-w-[1366px]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
});

export default App;