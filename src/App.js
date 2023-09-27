import CreateCampaign from "./component/CreateCampaign";
import Campaigns from "./component/Campaigns";
import Header from "./component/Header";

function App() {
    return (
        <div className="App">
            <Header />
            <main className="mt-10">
                <CreateCampaign />
                <Campaigns />
            </main>
        </div>
    );
}

export default App;
