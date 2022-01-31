import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Search from "./Search";
import Repositories from "./Repositories";
import "./styles.css";

import {
  getRepositories,
  createRepository,
  destroyRepository,
} from "../../services/api";

const MainPage = () => {
  const { user,logout } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [loading, setloading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const userId = "61f2e48f26dce70e1d279eb6";

  const loadData = async (query = "") => {
    try {
      setloading(true);
      const response = await getRepositories(userId, query);
      setRepositories(response.data);
      console.log(response.data);
      setloading(false);
    } catch (e) {
      console.log(e.message);
      setLoadingError(true);
    }
  };

  useEffect(() => {
    (async () => await loadData())();
  }, []);

  const handleLogout = () => {
    logout();
    console.log("logout");
  };

  const handleSearch = async (query) => {
    await loadData(query);
  };

  const handleDeleteRepo = async (repository_id) => {
    console.log("delete " + repository_id);
    await destroyRepository(user.id, repository_id);
    await loadData();
  };

  const handleNewRepo = async (url) => {
    console.log("new repo " + url);
    try {
      await createRepository(userId, url);
      await loadData();
    } catch (error) {
      console.log(error.message);
      setLoadingError(true);
    }
  };

  if (loadingError) {
    return (
      <div className="loading">
        Error loading <Link to="/login">voltar</Link>
      </div>
    );
  }
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div id="main">
      <Nav onLogout={handleLogout} />
      <Search onSearch={handleSearch} />
      <Repositories
        repositories={repositories}
        onDeleteRepo={handleDeleteRepo}
        onNewRepo={handleNewRepo}
      />
    </div>
  );
};

export default MainPage;
