class Node {
    constructor(x, y, parent) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.g = 0;
        this.h = 0;
        this.f = 0;
    }

    // Calculate the heuristic (Manhattan distance) from this node to the target node
    calculateHeuristic(target) {
        return Math.abs(this.x - target.x) + Math.abs(this.y - target.y);
    }
}

function pathfind(bitMap, start, target) {
    const openList = [];
    const closedList = [];

    // Initialize start node
    const startNode = new Node(start.x, start.y, null);
    startNode.g = 0;
    startNode.h = startNode.calculateHeuristic(target);
    startNode.f = startNode.g + startNode.h;

    openList.push(startNode);

    while (openList.length > 0) {
        // Get the node with the lowest f value from the open list
        let currentNode = openList.reduce((minNode, node) => node.f < minNode.f ? node : minNode, openList[0]);

        // Remove currentNode from openList
        openList.splice(openList.indexOf(currentNode), 1);
        closedList.push(currentNode);

        // If current node is the target, reconstruct and return the path
        if (currentNode.x === target.x && currentNode.y === target.y) {
            const path = [];
            while (currentNode !== null) {
                path.unshift({x: currentNode.x, y: currentNode.y});
                currentNode = currentNode.parent;
            }
            return path;
        }

        // Generate neighbors
        const neighbors = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Skip current node
                const neighborX = currentNode.x + i;
                const neighborY = currentNode.y + j;
                if (neighborX >= 0 && neighborX < bitMap.length && neighborY >= 0 && neighborY < bitMap[0].length && bitMap[neighborX][neighborY] === 0) {
                    neighbors.push(new Node(neighborX, neighborY, currentNode));
                }
            }
        }

        // Iterate through neighbors
        for (const neighbor of neighbors) {
            // Skip if neighbor is in closed list
            if (closedList.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
                continue;
            }

            // Calculate tentative g score
            const tentativeGScore = currentNode.g + 1;

            // If neighbor is not in open list or tentative g score is lower
            if (!openList.find(node => node.x === neighbor.x && node.y === neighbor.y) || tentativeGScore < neighbor.g) {
                neighbor.g = tentativeGScore;
                neighbor.h = neighbor.calculateHeuristic(target);
                neighbor.f = neighbor.g + neighbor.h;
                if (!openList.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    openList.push(neighbor);
                }
            }
        }
    }

    // If openList is empty and target not found, return null
    return null;
}