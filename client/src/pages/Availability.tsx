import React from "react";
import Pace from "../components/Pace";
import Header from "../components/Header";
import PageContainer from "../components/PageContainer";
import Companies from '../components/Companies';
import Interviews from '../components/Interviews';
import AddClientModal from '../components/AddClientModal';
import AddInterviewModal from '../components/AddInterviewModal';
import ModeContext from "../components/ModeContext";

const tableContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'auto'
} as const;

const Home = (): JSX.Element => {

  return (

    <ModeContext.Provider value={{mode: "light"}}>
      <PageContainer bgColor="#ffffff">
        <Pace />
        <Header />
        <section>
          <div className="row" style={{display: "flex", flexWrap: "wrap"}}>
            <AddClientModal />
            <AddInterviewModal /> 
          </div>  
        </section>
        <section className="pd-top-4">
          <div className="row" style={tableContainerStyle}>
            <Interviews />
          </div>
          <hr />
          <div className="row" style={tableContainerStyle}>
            <Companies />
          </div>
        </section>
      </PageContainer>
    </ModeContext.Provider>
  );
};

export default Home;
