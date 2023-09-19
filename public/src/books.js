function findAuthorById(authors, id) {
  return authors.find(author => id === author.id);
}
function findBookById(books, id) {
  return books.find(book => book.id === id);
}


function partitionBooksByBorrowedStatus(books) {
  let currentlyCheckedOut = [];
  let returnedBooks = [];
  for (const book of books) {
  const firstTransaction = book.borrows[0];
  firstTransaction.returned === false ? currentlyCheckedOut.push(book) : returnedBooks.push(book)
  }
  return [currentlyCheckedOut, returnedBooks];
  }
  //returns 2 arrays, one with bcurrently checked out, the other 'returned'
  // looks at first transcition so i = 0 if returned =false it goes into checkedout
//if returened equal true goes into returned
//Case? never checked out?? should It automatically go into returned? 
//ternary condition/shorthand 


function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const result = [];
  borrows.forEach(borrow => {
    if (result.length >= 10) return;
    const borrower = accounts.find(account => account.id === borrow.id);
    const formattedBorrow = {
      ...borrow,
      ...borrower,
    };
    result.push(formattedBorrow);
  });
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

