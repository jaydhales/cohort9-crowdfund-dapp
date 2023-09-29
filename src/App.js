import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Campaign from "./pages/campaign";
import { Toaster } from "react-hot-toast";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/campaign/:id",
            element: <Campaign />,
        },
    ]);
    return (
        <div className="App">
            <Toaster position="top-center"  />
            <Header />
            <main className="mt-10">
                <RouterProvider router={router} />
            </main>
        </div>
    );
}

export default App;

// Bonus
// Listen to ContributeEth event, so that the campaign page is updated (without refreshing) when someone contribute to a campaign
