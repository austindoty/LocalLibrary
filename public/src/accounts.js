const { findAuthorById } = require("./books")

function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
}
//helper function for total Number of Borrows
function borrowsById (book, {id}) {
  return book.borrows.filter(borrow => borrow.id === id);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((count, book) => {
    const borrowedById = borrowsById(book, account);
    count += borrowedById.length;
    return count;
  },0);
}
  
/*Filters through the books to see if account has the book checked out:
  an account
   an array of book objects
  an array of author objects
 return:
   an object (a book with the author embedded inside it between authorId and borrows)
returns Array of checkedout books with Author information
*/
    function getBooksPossessedByAccount(account, books, authors) {
      const borrowedBooks = books.filter(book => book.borrows.some(borrow => (!borrow.returned && borrow.id === account.id)));
      const result = [];
      borrowedBooks.forEach(book => {
        const bookAuthor = findAuthorById(authors, book.authorId);
        result.push({
          id: book.id,
          title: book.title,
          genre: book.genre,
          authorId: book.authorId,
          author: bookAuthor,
          borrows: book.borrows,
        });
      });
      return result;
    }
  
//helper function for author's id is in books.js



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
