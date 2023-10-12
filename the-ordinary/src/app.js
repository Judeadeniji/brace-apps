import { Component } from "@mejor";
import Header, { show_menu } from "@app/components/header";
import Loader from "@app/components/loader";
import Footer from "@app/components/footer";
import { Menu } from "@app/components/reusables";
import { app_store } from "@app/services/app-store";

const App = (({ Outlet }) => {
  const { loading } = app_store.getState().value;
  return (
    <div class="font-sf-pro font-normal items-end md:max-w-[920px] lg:max-w-[1366px]">
      {
        loading ? <Loader /> : (<comment>Loader</comment>)
      }
      <div class="border m-0 w-screen relative px-2 h-full">
        <Header />
            <div class="w-full m-0 md:mt-[120px] mt-[64px]">
              <Outlet /> 
              <Menu show={show_menu} />
            </div>
        <Footer />
      </div>
    </div>
  );
});

export default App;