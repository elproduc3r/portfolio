import Pace from "../components/Pace";
import Header from "../components/Header";
import PageContainer from "../components/PageContainer";
import Clients from '../components/Clients';
import Projects from '../components/Projects';
import AddClientModal from '../components/AddClientModal';
import AddProjectModal from '../components/AddProjectModal';

const Home = () => {
  return (
    <PageContainer bgColor="#ffffff">
      <Pace />
      <Header mode="light" />
      <section>
        <div className="row block-1-8 block-m-1-2" style={{display: "flex"}}>
          <AddClientModal />
          <AddProjectModal /> 
        </div>  
      </section>
      <section>
        <div className="row block-1-8 block-m-1-2" style={{display: "flex"}}>
          <Projects />
        </div>
        <hr />
        <div className="row block-1-8 block-m-1-2" style={{display: "flex"}}>
          <Clients />
        </div>
      </section>
    </PageContainer>
  );
};

export default Home;
