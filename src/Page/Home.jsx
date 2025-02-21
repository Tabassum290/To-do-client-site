import Banner from "../Components'/Banner";
import Footer from "../Components'/Footer";
import Navbar from "../Components'/Navbar";
import Tasks from "../Components'/Tasks";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <main className="max-w-7xl mx-auto my-8">
            <Banner></Banner>
            <Tasks></Tasks>
            </main>
   
            <Footer/>
        </div>
    );
};

export default Home;