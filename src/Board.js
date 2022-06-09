// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];

      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    //Specification
    // I: row index
    // O: boolean, whether there is conflict or not
    // C: use given functions
    // E: if not given an input it should return false
    // J: to check if there are two pieces on row
    // E: this function iterates over a row array and if we have more
    // than one pieces on a row.
    // A: //pseudocode, look in func


    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      var row = this.get(rowIndex);
      var rowLength = row.length;
      for (position of row) {
        if (position === 1 ) {
          count++ }
        if (count > 1) {
          return true;
        }
      }
      return false;
    },

    hasAnyRowConflicts: function() {
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

// I: num representing column we are checking
// O: boolean, true if conflict in column, else false
// C: use given funcs
// E: if we really mess with the input?

//Explanation: go through each value in a column
// if there are multiple non-zero values
// then we have a conflict

    hasColConflictAt: function(colIndex) {
      //make a counter var
      var count = 0;
      //create for loop from 0 to n (row/column length)
      for (var i = 0; i < this.get(0).length; i++) {
        //if value at current index is 1
        if (this.get(i)[colIndex]) {
          //counter ++
          count++;
        }
        //if counter > 1
        if (count > 1) {
          //we have conflict, return true
          return true;
        }
      }
      //outside of for loop
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    //I: return value from findMajorDiagonalColumnIndexAtFirstRow (with position inputs)
    //O: boolean, if true has a conflict on majorDiagonal
    //C: same as before
    //E: none yet, lets find some

    //Justification: run this function to find conflicts on a major diagonal
    //Explanation: The function should evaluate to diagonal indices based on a start location
    //major diagonal colum index at first row is starting point
    //starting from there we check major diagonal values from it
    //if there is more than 1 non-zero value on major diagonal
    //return true, else return false


    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //declare a counter var
      var count = 0;
      //create a for loop that goes from i to N
      for (var i = 0; i < this.get(0).length; i++) {
        //value is this.get(i)[input]
        //if value we're checking is === 1
        if (this.get(i)[majorDiagonalColumnIndexAtFirstRow]) {
          //increase counter and inputVar
          count++
        }
        majorDiagonalColumnIndexAtFirstRow++
        //if counter > 1
        if (count > 1) {
          //we found conflict, return true
          return true;
        }
      }
      //outside of for loop
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    //Explanation: We are running majorDiagonalConflictAt
    //For every major diagonal (including ones that start at negative indexes)
    //if any invocations return true; return true
    hasAnyMajorDiagonalConflicts: function() {
      //iterate from (-1 * rows.length) to rows.length
      for (var i = (this.get(0).length * -1); i < this.get(0).length; i++) {
        //if hasMajorDiagonalConflict is true
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }  return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    // I: result from minor Diagonal Column index, just a value
    // O: boolean, true with conflict, false no conflict
    // C: backbone functions, same as always
    // E: not really

    // Exp: Takes a column index at the first row,
    //checks the minor diagonal for conflicts:
    //by iterating through the rows and moving the column value (left/descending values)

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // declare a counter
      var counter = 0;
      // create a for loop, from i = 0, to i < this.get(0).length
      for (var i = 0; i < this.get(0).length; i++) {
        // if this.get(i)[minorDiagonalColumnIndexAtFirstRow]
        if (this.get(i)[minorDiagonalColumnIndexAtFirstRow]) {
          // counter++;
          counter++;
        }
        // minorDiagnol--;
        minorDiagonalColumnIndexAtFirstRow--;
        // if counter > 1
        if (counter > 1) {
          return true;
        }
        // end of loop
      }
      return false; // fixme
    },

    // I: no input
    // O: boolean, true if conflict, false otherwise
    // C: same
    // E: none

    // Explanation: When function is ran should iterate over every minor diagonal:
    // Each minor diagnol is checked for conflict
    // Needs to extend pass matrix row length
    // Will have to iterate from 0 to 6, 0 to 2 * row.length()

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (var i = 0; i < 2 * this.rows().length; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
