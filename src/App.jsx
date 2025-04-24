import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CryptoTable from "./components/CryptoTable";
import Header from "./components/Header";
import {
  fetchInitialData,
  startLiveUpdates,
  stopLiveUpdates,
} from "./features/crypto/cryptoSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initializing data and starting live updates
    dispatch(fetchInitialData());
    dispatch(startLiveUpdates());

    // Cleaning up on unmount
    return () => {
      dispatch(stopLiveUpdates());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <CryptoTable />
      </main>
      <footer className="bg-neutral-100 py-4 text-center text-neutral-500 text-sm">
        <div className="container mx-auto">
          Data updates every 2 seconds to simulate real-time behavior
        </div>
      </footer>
    </div>
  );
}

export default App;
