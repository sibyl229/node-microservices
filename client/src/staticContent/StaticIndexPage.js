import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div>
      <h3>User Guides</h3>
      <ul>
        <li><Link to="/guide/50">WormBase core genomes</Link></li>
        <li><Link to="/guide/56">Release schedule</Link></li>
        <li><Link to="/guide/77">Tools</Link></li>
        <li><Link to="/guide/25">Reagent sources and information</Link></li>
        <li><Link to="/guide/6">Data mining and fair use</Link></li>
      </ul>
    </div>
  );
}
