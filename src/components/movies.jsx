import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import { getGenres } from "../services/fakeGenreService"; // Gerçek hayatta servisten alınacak
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    // movies: getMovies, // Bu şekilde initialize yapabiliriz ama aslında componentDidMount içinde yapılmalı
    // genres: getGenres,// Bu iki property initialize olmalı
    // genres: getGenres(), gerçek hayatta backendetten alacağız o yüzden bu şekilde olmaz.

    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  // When an instance of a component rendered in the DOM, this method is called
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
    // gerçek hayatta serverdan alınana kadar vakit geçer ve movies ve genres tanımlanmış olmalıdır
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = page => {
    //console.log("Current Page..:", page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    // console.log("Current Genre..:", genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    //console.log("Current Column..:", path);

    //  this.setState({ sortColumn: { path, order: "asc" } });
    this.setState({ sortColumn });
  };

  handleLike = movie => {
    console.log("Like clicked", movie);
    const movies = [...this.state.movies]; // Declaration of  a const movies copying the present state (of movies).We do not want to directly change movies, instead we work with its copy. So we use ... (spread operator)
    const index = movies.indexOf(movie); // Find the index of movies object, and store in a constant index
    movies[index] = { ...movies[index] }; // We go to index of movies object and set this to a new object and we simply use spread operator to clone this object
    movies[index].liked = !movies[index].liked; // We toggle movies[index].liked
    this.setState({ movies });
  };

  getPagedData = () => {
    const {
      currentPage,
      sortColumn,
      selectedGenre,
      pageSize,
      movies: allMovies
    } = this.state; //OBJECT DESTRUCTURING

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies; //OBJECT DESTRUCTURING
    const { currentPage, sortColumn, pageSize } = this.state; //OBJECT DESTRUCTURING

    if (count === 0) return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            <ListGroup
              /*  textProperty="name"    
              valueProperty="_id"  Listgroup defaultProps içinde tanımladık. böylece interface'i simplf yaptık */
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </ul>
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database</p>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          {/* Interface is determined for Pagination Component */}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
export default Movies;
