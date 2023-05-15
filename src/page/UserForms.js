import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";

function UserForms() {
    
  const [postsPerPage] = useState(5);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");

  const getAllPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/forms`);
      const data = res.data;
      const sortedData =
        sortOrder === "asc"
          ? data.sort((a, b) => a.name.localeCompare(b.name))
          : data.sort((a, b) => b.name.localeCompare(a.name));
      const slice = sortedData.slice(offset, offset + postsPerPage);
      setPosts(slice);
      setPageCount(Math.ceil(data.length / postsPerPage));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (slug) => {
    console.log(slug);
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .get(`http://localhost:3000/forms?slug=${slug}`)
        .then((response) => {
          const edit_id = response.data[0].id;
          console.log(edit_id);
          axios
            .delete(`http://localhost:3000/forms/${edit_id}`)
            .then((response) => {
              setPosts([...posts])
              window.location.reload();
            })
            .catch((error) => {
              alert("error");
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage * postsPerPage);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    getAllPosts();
  }, [offset, sortOrder]);

  return (
    <div className="container">
      <div className="row">
        <div className="col table-container">
          <div>
            <div
              className="text-center text-dark mt-2"
              style={{ borderBottom: "1px solid black" }}
            >
              <strong className="fs-2">All Forms</strong>
            </div>
            <div className="my-3 d-flex justify-content-end">
              <Link to="/devlop">
                <button className="btn btn-primary mx-3">Create Form +</button>
              </Link>
            </div>
          </div>
          <Table className="text-center" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>No.</th>
                <th onClick={handleSort} style={{ cursor: "pointer" }}>
                  Form Name {sortOrder === "asc" ? "▲" : "▼"}
                </th>
                <th>Form</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {posts.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      to={`/view/${item.slug}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/view/${item.slug}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <i className="fa-solid fa-eye text-warning"></i>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/devlop/${item.slug}`}>
                      <i className="fa-solid fa-pen-to-square text-warning"></i>
                    </Link>
                  </td>
                  <td>
                    <Link onClick={() => handleDelete(item.slug)}>
                      <i className="fa-solid fa-trash text-danger"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="my-3 d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForms;
