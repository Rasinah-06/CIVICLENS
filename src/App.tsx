import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Index from "./pages/Index.tsx";
import ReportIssue from "./pages/ReportIssue.tsx";
import MyReports from "./pages/MyReports.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
import MapView from "./pages/MapView.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
