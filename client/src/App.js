import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    })
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([
      ...movieReviewList,
      {
        movieName: movieName,
        movieReview: review
      },
    ]);

    document.getElementById("inputMovieName").value = "";
    document.getElementById("inputMovieReview").value = "";
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");


  };

  return (
		<div className="App" style={{backgroundColor: "#151515"}}>
			<h1 className="m-4 text-light display-1 my-h1">CRUD APPLICATION</h1>

			<div className="form m-4 d-flex justify-content-around flex-column align-items-center">
				<div className="m-4 container col-md-6">
        <div className="input-group input-group-lg mb-3">
					<span className="input-group-text border-success bg-success text-light" id="inputGroup-sizing-default">
						Filme
					</span>
					<input
						name="movieName"
						onChange={(e) => {
							setMovieName(e.target.value);
						}}
						id="inputMovieName"
						type="text"
						className="form-control"
						aria-label="Sizing example input"
						aria-describedby="inputGroup-sizing-default"
					/>
				</div>

				<div className="input-group input-group-lg mb-3">
					<span className="input-group-text border-primary bg-primary text-light" id="inputGroup-sizing-default">
						Avaliação
					</span>
					<input
						type="text"
						name="review"
						onChange={(e) => {
							setReview(e.target.value);
						}}
						id="inputMovieReview"
						className="form-control"
						aria-label="Sizing example input"
						aria-describedby="inputGroup-sizing-default"
					/>
				</div>

				<button
					onClick={submitReview}
					type="button"
					className="btn btn-success btn-lg"
				>
					Adicionar Filme
				</button>
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-center">
          {movieReviewList.map((val) => {
            return (
              <div className="card text-center w-95 m-4 border-primary my-card">
                <div className="card-header border-bottom border-primary bg-dark">
                  <h1 className="text-light text-break text-capitalize">{val.movieName}</h1>
                </div>

                <div className="card-body" style={{backgroundColor: "#2E3030"}}>
                  <h6 className="card-title mb-3 fw-normal fst-italic text-light">{val.movieReview}</h6>

                  <div className="input-group mb-3">
                    <span
                      className="input-group-text border-primary fw-normal bg-primary"
                      id="inputGroup-sizing-default"
                    >
                      Avaliação
                    </span>
                    <input
                      onChange={(e) => {
                        setNewReview(e.target.value);
                      }}
                      type="text"
                      className="form-control border-primary"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      updateReview(val.movieName);
                      document.location.reload(true);
                    }}
                  >
                    Atualizar
                  </button>

                  <button
                    onClick={() => {
                      deleteReview(val.movieName);
                      document.location.reload(true);
                    }}
                    type="button"
                    className="btn btn-outline-danger m-3 fw-bolder"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
			</div>
		</div>
	);
}

export default App;
