/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// I: the n x n board dimension and n rooks
// O: a board MATRIX NOT THE DECORATED BOARD OBJECT that is n x n and contains n rooks
// C: same as always
// E: 2x2 and 3x3 are no solution

// Explanation: Given an n, create a board that is n x n, iterate through every position on
// the board and while its iterating toggle a piece at current location, and check for conflict
// on a row and column. after all iterations run, return board.


window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution.togglePiece(i, j);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
      }
    }
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

//I: n, signifies nxn board dimensions and n number of rooks
//O: a number representing the number of possible solutions
//C: same as always
//E: None

//Explanation: Given an n the function generates an n x n board
//we need a place to store the solutions

//iterate through the matrix,
//placing a rook at the next location for each iteration
//run the inner recursive function with each board state
//with current board state as argument
//then iterate through the board,
//placing a rook at each possible location
//and checking each position for any rook conflicts
//if n rooks are on board,
//and current board state isn't in solution storage
// push to storage solution
// if there arent n rooks
//then call innerRecursivefunction with current board state as argument
//start running innerFunction with... A BLANK n x n BOARD.
//return solutionstorage.length

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionStorage = [];
  var emptyBoard = new Board({n: n});

declare variable to hold count of pieces
var numPieces = function (board) {
  return _.reduce(board.rows(), function(memo, row) {
  return memo + _.reduce(row, function(memo, col) {
    return memo + col;
  }, 0);
}, 0);
}


// \/\/\/\/\/\/\/\/\/ OLD CODE THAT DOES NOT WORK RIGHT \/\/\/\/\/\/\/
declare inner recursive function
var innerFunction = function (board) {
var sum = 0;
for (var i = 0; i < board.rows().length; i++) {
  var row = board.get(i);
  sum += row.reduce((previousValue, currentValue) => previousValue + currentValue);
}

//if we have n pieces on boards
console.log(board.rows())
  if (sum === n){
  //push the solution to solutionStorage
    solutionStorage.push(board.rows());
      //return
      return;
  }

KEEPS ON LOOPING
  //loop over rows of matrix
  for (var i = 0; i < n; i++) {
    //loop over columns in rows of matrix
    for (var j = 0; j < n; j++) {
      //at current position, toggle rook IF THERE IS NO PIECE THERE
      if (board.get(i)[j] === 0){
        board.togglePiece(i, j);
      }
      //if anyRookConflict logic returns true
      if (board.hasAnyRooksConflicts()) {
        //untoggle rook at current position
        board.togglePiece(i, j);
      }
      //call innerRecursiveFunction on current board state
      innerFunction(board);
    }}
  }
// declare an empty matrix
// run the inner recursive function with a blank matrix passed in
innerFunction(emptyBoard)
// ^^^^^^^^^^^OLD CODE THAT DOES NOT WORK RIGHT^^^^^^^^^^^^^^^



so we do need an inner recursive function

where we pass in the x,y coordinates starting at 0,0
and increment x every new execution context
incrementing y is done with a for loop in the recursive function
at each x,y toggle + check for conflict
if you hit n pieces on board
push solution to solutionStorage

console.log('Number of solutions for ' + n + ' rooks:', juanSolutions.length);
return solutionStorage.length;

//   \/\/\/\/\/\/ JUAN TRYING TO IMPLEMENT THE SOLUTION AFTER HOURS \/\/\/\/\

// var board = new Board({ n : n })
// var juanCounter = 0
// var juanRecursive = function (x) {
// if (x === n) {
//   juanCounter++
//   return;
// }

// for (var i = 0; i < n; i++){
//   board.togglePiece(x, i)
//   if (!board.hasAnyRooksConflicts()) {
//     juanRecursive(x + 1)
//   }
//   board.togglePiece(x, i)
//   }
// }
// juanRecursive(0)
// return juanCounter

};






// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
