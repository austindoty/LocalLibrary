const {sortAccountsByLastName} = require("./accounts");
const {partitionBooksByBorrowedStatus} = require("./books");

function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}
//need to call in the partion after its done
function getBooksBorrowedCount(books) {
  const partition = partitionBooksByBorrowedStatus(books);
  return partition[0].length;
}

function getMostCommonGenres(books) {
  allGenres = books.map(book => book.genre);
  const list = [];
  allGenres.forEach(genre => {
    let genreBooks=list.find(res => res.name ===genre)
    if(genreBooks !=null){
      genreBooks.count++;
    }
      list.push({name:genre, count:1});
    });
    return list.sort((a,b) => b.count-a.count).splice(0,5)
  }
  


/*function getMostPopularBooks(books) {
  const result =[];
  books.forEach(book => {
    if(book.borrows.length != null){
    
    }
  })
}
*/

function getMostPopularBooks(books) {
  return books
   .map((book) => {
    return { name: book.title, count: book.borrows.length };
   })
   .sort((a, b) => (a.count < b.count ? 1 : -1))
   .slice(0, 5);
 }
  

function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach((author) => {
   let theAuthor = {
    name: `${author.name.first} ${author.name.last}`,
    count: 0
   };
   books.forEach((book) => {
    if (book.authorId === author.id) {
     theAuthor.count += book.borrows.length;
    }
   });
   result.push(theAuthor);
  });
  return result
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);
 }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
