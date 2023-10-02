document.addEventListener("DOMContentLoaded", function() {
    var intermediateMatrices = [];
    
    function createMatrix() {
        var nodes = document.getElementById('nodes').value;
        var matrixContainer = document.getElementById('matrix-container');
        matrixContainer.innerHTML = '';
        var divider = document.createElement('hr');
        matrixContainer.appendChild(divider);
    
        if (nodes) {
            var table = document.createElement('table');
            table.classList.add('matrix-table');
    
            for (var i = 0; i < nodes; i++) {
                var row = document.createElement('tr');
                for (var j = 0; j < nodes; j++) {
                    var cell = document.createElement('td');
                    var input = document.createElement('input');
                    input.type = 'number';
                    input.placeholder = 'Enter value';
                    input.id = `cell-${i}-${j}`;
                    cell.appendChild(input);
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
    
            matrixContainer.appendChild(table);
        } else {
            alert('Please enter a valid number of nodes.');
        }
    }
    

    function submitMatrix() {
        var rows = document.getElementById('nodes').value;
        var cols = document.getElementById('nodes').value;
    
        if (rows && cols) {
            var A = [];
            for (var i = 0; i < rows; i++) {
                A.push([]);
                for (var j = 0; j < cols; j++) {
                    var inputValue = parseInt(document.getElementById(`cell-${i}-${j}`).value);
                    A[i].push(inputValue);
                }
            }
            AIIPaths(A, rows);
            displayIntermediateMatrices(rows, cols);
        } else {
            alert('Please create a matrix first.');
        }
    }

    function AIIPaths(A, n) {
        intermediateMatrices.push(copyMatrix(A));
        for (let k = 0; k < n; k++) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    A[i][j] = Math.min(A[i][j], A[i][k] + A[k][j]);
                }
            }
            intermediateMatrices.push(copyMatrix(A));
        }
    }
    function copyMatrix(matrix) {
        return matrix.map(function (row) {
            return row.slice();
        });
    }

    function displayIntermediateMatrices(rows, cols) {
        var intermediateMatricesContainer = document.getElementById('intermediate-matrices');
        intermediateMatricesContainer.innerHTML = '';
    
        intermediateMatrices.forEach(function (matrix, index) {

            var stageDiv = document.createElement('div');
            stageDiv.classList.add('stage-container');
            var stageName = document.createElement('h3');
            stageName.textContent = 'Stage ' + index;
            stageDiv.appendChild(stageName);
    
            var table = document.createElement('table');
            table.classList.add('matrix-table');
    
            for (var i = 0; i < rows; i++) {
                var row = document.createElement('tr');
                for (var j = 0; j < cols; j++) {
                    var cell = document.createElement('td');
                    cell.textContent = matrix[i][j];
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }

            stageDiv.appendChild(table);

            intermediateMatricesContainer.appendChild(stageDiv);
        });
    }
    
    document.getElementById('create-matrix-button').addEventListener('click', createMatrix);
    document.getElementById('submit-matrix-button').addEventListener('click', submitMatrix);
});
