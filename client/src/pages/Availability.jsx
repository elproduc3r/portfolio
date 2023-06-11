import Pace from "../components/Pace";
import Header from "../components/Header";
import PageContainer from "../components/PageContainer";
import Companies from '../components/Companies';
import Interviews from '../components/Interviews';
import AddClientModal from '../components/AddClientModal';
import AddInterviewModal from '../components/AddInterviewModal';

const tableContainerStyle = {
  display: "flex",
  flexDirection: "column"
};

const Home = () => {
  return (
    <PageContainer bgColor="#ffffff">
      <Pace />
      <Header mode="light" />
      <section>
        <div className="row" style={{display: "flex"}}>
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
  );
};

export default Home;
