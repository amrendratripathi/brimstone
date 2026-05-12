import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import AccountPage from "./pages/Account";
import AdminPage from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import GlobalBackground from "@/components/GlobalBackground";
import WorkerDashboard from "./pages/WorkerDashboard";
import AdminReferralDashboard from "./pages/AdminReferralDashboard";
import { WorkerLoginPage, WorkerSignupPage } from "./pages/WorkerAuth";
import WorkerProtectedRoute from "@/components/referral/WorkerProtectedRoute";
import MobileCartFAB from "@/components/MobileCartFAB";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {/* Global brim_bg2 background — visible on all non-home pages */}
              <GlobalBackground />
              <MobileCartFAB />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute requireRole="admin"><AdminPage /></ProtectedRoute>} />

                {/* Worker Referral Routes */}
                <Route path="/worker/login" element={<WorkerLoginPage />} />
                <Route path="/worker/signup" element={<WorkerSignupPage />} />
                <Route path="/worker/dashboard" element={<WorkerProtectedRoute><WorkerDashboard /></WorkerProtectedRoute>} />
                <Route path="/admin/referral" element={<WorkerProtectedRoute requireAdmin><AdminReferralDashboard /></WorkerProtectedRoute>} />
                <Route path="/worker" element={<Navigate to="/worker/login" replace />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
