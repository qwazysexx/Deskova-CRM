import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import AppLayout from "./ui_components/AppLayout";
import ProtectedRoute from "./ui_components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import KanbanPage from "./pages/KanbanPage";
import LeadDetailPage from "./pages/LeadDetailPage";
import CreateLeadPage from "./pages/CreateLeadPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

import { getUsername } from "./services/apiCrm";

const App = () => {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername,
  });

  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setIsAuthenticated(true);
    }
  }, [data]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              isAuthenticated={isAuthenticated}
              username={username}
              setUsername={setUsername}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="kanban" element={<KanbanPage />} />
          <Route
            path="profile/:username"
            element={<ProfilePage authUsername={username} />}
          />

          <Route
            path="leads/:id"
            element={
              <LeadDetailPage
                username={username}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          <Route
            path="leads/create"
            element={
              <ProtectedRoute>
                <CreateLeadPage isAuthenticated={isAuthenticated} />
              </ProtectedRoute>
            }
          />

          <Route path="signup" element={<SignupPage />} />

          <Route
            path="signin"
            element={
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                setUsername={setUsername}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;