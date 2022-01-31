import React from "react";
import { useState } from "react";

const Repositories = ({ repositories, onDeleteRepo, onNewRepo }) => {
  const [newRepo, setNewRepo] = useState();
  return (
    <div>
      <div className="repositories" key={repositories._id}>
        <h2 className="title">Repositories {typeof repositories}</h2>
        <ul className="list">
          {repositories.map((repo) => (
            <li className="item" key={repo._id}>
              <div className="info">
                <div className="owner">{repo.name}</div>
                <div className="name">{repo.name}</div>
              </div>
              <button onClick={() => onDeleteRepo(repo._id)} className="delete">
                Delete
              </button>
            </li>
          ))}
        </ul>

        <div className="new">
          <label htmlFor="new-repo">Novo Repo</label>
          <input
            type="url"
            className="new-repo"
            id="new-repo"
            placeholder="Add repository"
            //value={newRepo}
            onChange={(e) => {
              setNewRepo(e.target.value);
            }}
          />
          <button onClick={() => onNewRepo(newRepo)} className="button">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Repositories;
