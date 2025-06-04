import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

import OrdersList from "./OrdersList";
import CreateOrder from "./CreateOrder";
import ReportBatches from "./ReportBatches";
import ReportSummary from "./ReportSummary";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<OrdersList />} />
        <Route path="/create" element={<CreateOrder />} />
        <Route path="/batches" element={<ReportBatches />} />
        <Route path="/summary" element={<ReportSummary />} />
      </Routes>
    </>
  );
}
