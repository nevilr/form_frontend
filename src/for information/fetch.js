import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Details() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/forms/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  console.log(data);

  return (
    <div className="text-light">
      <h1>Details for ID: {id}</h1>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
}

export default Details;
