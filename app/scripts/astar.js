// implementation from http://buildnewgames.com/astar/
// world = 2d array
// start, end = [x,y]
function findPath(world, start, end) {
    var abs = Math.abs;
    var max = Math.max;
    var pow = Math.pow;
    var sqrt = Math.sqrt;

    // anything higher = blocked
    // i.e. 0 is walkable (emptyTile)
    var maxWalkableTileNum = 0;
    var worldWidth = world[0].length;
    var worldHeight = world.length;
    var worldSize = worldWidth * worldHeight;

    // heuristic
    // default = no diagonals (Manhattan)
    var distanceFunction = ManhattanDistance;
    var findNeighbours = function() {};

    // alt heuristics
    // diagonals but no squeezing through cracks
    // var distance = DiagonalDistance;
    // var findNeighbours = DiagonalNeighbours;

    // diagonals and squeezing through cracks
    // var distanceFunction = DiagonalDistance;
    // var findNeighbours = DiagonalNeighboursFree;

    // euclidean, no squeezing through cracks
    // var distanceFunction = EuclideanDistance;
    // var findNeighoburs = DiagonalNeighbours;

    // euclidean and squeezing through cracks
    // var distanceFunction = EuclideanDistance;
    // var findNeighbours = DiagonalNeighboursFree;

    function ManhattanDistance(Point, Goal) {
        // linear movement
        return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
    }

    function DiagonalDistance(Point, Goal) {
        // diag mvt assuming diag == 1, same as nesw
        return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
    }

    function EuclideanDistance(Point, Goal) {
        // diag = slightly further than cardinal direction
        // diag = Euclide (AC = sqrt(AB^2 + BC^2))
        return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
    }

    // neighbours
    function Neighbours(x, y) {
        var N = y - 1;
        var S = y + 1;
        var E = x + 1;
        var W = x - 1;
        var myN = N > -1 && canWalkHere(x, N);
        var myS = S < worldHeight && canWalkHere(x, S);
        var myE = E < worldWidth && canWalkHere(E, y);
        var myW = W > -1 && canWalkHere(W, y);
        var result = [];

        if(myN) {
            result.push({x:x, y:N});
        }
        if(myE) {
            result.push({x:E, y:y});
        }
        if(myS) {
            result.push({x:x, y:S});
        }
        if(myW) {
            result.push({x:W, y:y});
        }
        findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
        return result;
    }

    // no squeezing between cracks!
    function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
        if(myN) {
            if(myE && canWalkHere(E, N)) {
                result.push({x:E, y: N});
            }
            if(myW && canWalkHere(W, N)) {
                result.push({x:W, y:N});
            }
        }
        if(myS) {
            if(myE && canWalkHere(E, S)) {
                result.push({x:E, y:S});
            }
            if(myW && canWalkHere(W, S)) {
                result.push({x:W, y:S});
            }
        }
    }

    // allow squeezing through cracks
    function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result) {
        myN = N > -1;
        myS = S < worldHeight;
        myE = E < worldWidth;
        myW = W > -1;

        if(myE) {
            if(myN && canWalkHere(E, N)) {
                result.push({x:E, y:N});
            }
            if(myS && canWalkHere(E, S)) {
                result.push({x:E, y:S});
            }
        }
        if(myW) {
            if(myN && canWalkHere(W, N)) {
                result.push({x:W, y:N});
            }
            if(myS && canWalkHere(W, S)) {
                result.push({x:W, y:S});
            }
        }
    }

    function canWalkHere(x, y) {
        return (
                (world[x] !== null) &&
                (world[x][y] !== null) &&
                (world[x][y] <= maxWalkableTileNum)
                );
    }

    // Node - used to store route costs
    function Node(Parent, Point) {
        var newNode = {
            Parent: Parent,
            value: Point.x + (Point.y * worldWidth),
            x:Point.x,
            y:Point.y,
            // distanceFunction cost to get TO node from START
            f: 0,
            // distanceFunction cost to get FROM node to GOAL
            g: 0
        };

        return newNode;
    }

    // Path function: executes AStar
    function calculatePath() {
        var pathStart = Node(null, {x: start[0], y:start[1]});
        var pathEnd = Node(null, {x:end[0], y:end[1]});

        var AStar = new Array(worldSize);
        var Open = [pathStart];
        var Closed = [];
        var result = [];
        var myNeighbours;
        var myNode;
        var myPath;
        var length;
        var max;
        var min;
        var i;
        var j;

        while(length = Open.length) {

            max = worldSize;
            min = -1;
            for(i = 0; i < length; i++) {
                if(Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }

            // get next node, remove from array
            myNode = Open.splice(min, 1)[0];

            // is it dest?
            if(myNode.value === pathEnd.value) {
                myPath = Closed[Closed.push(myNode) - 1];
                do {
                    result.push([myPath.x, myPath.y]);
                } while(myPath = myPath.Parent);

                AStar = Closed = Open = [];
                result.reverse(); // return start to finish
            } else { // not dest
                // find nearby walkable nodes
                myNeighbours = Neighbours(myNode.x, myNode.y);
                // test each nmode which hasn't already been tried
                for(i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = Node(myNode, myNeighbours[i]);
                    if(!AStar[myPath.value]) {
                        // est cost of route so far
                        myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
                        /// est cost entire guessed route to dest
                        myPath.f = myPath.g + distanceFunction(myNeighbours[i], pathEnd);
                        Open.push(myPath);
                        //mark node as visited
                        AStar[myPath.value] = true;
                    }
                }
                Closed.push(myNode);
            }
        } // keep going til Open is empty
        return result;
    }

    return calculatePath();
}