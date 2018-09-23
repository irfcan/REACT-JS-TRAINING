import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  //const { columns, sortColumn, onSort, data } = props; şeklinde idi ama argument destrcucting yaptık
  // These 4 props define the interface of table component

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

      {/*  Yukardaki TableHeader tanımlanınca bu kısma gerek kalmadı
    <thead>
      <tr>
        <th onClick={() => this.raiseSort("title")}>Title</th>
        <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
        <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
        <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
        <th />
        <th />
      </tr>
    </thead> */}
      <TableBody columns={columns} data={data} />

      {/* Alttaki TBODY kısmı gereksiz oldu. Çünkü ilk 4 kısım tableBody içinde lodash get metodu ile 
Like ve Delete kısmı da yukarda columns tanımlanırken halloldu*/}
      {/* <tbody>
      {movies.map(movie => (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td />
          <td />
        </tr>
      ))}
    </tbody> */}
    </table>
  );
};

export default Table;
