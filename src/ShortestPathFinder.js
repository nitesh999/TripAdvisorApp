export function getTripDetails(deals, dealReferenceMap, sortingType, source, dest) {
    // Create adjacency matrix of all vertices (cities)
    var adjacencyMatrix = createAdjacencyMatrix(deals, sortingType);

    // Run Dijkstra's shortest path algorithm
    var dijkstraResult = runDijkstra(adjacencyMatrix, source, dest);

    // Now extract the shortest path from source -> dest
    return extractShortestPath(dijkstraResult, dealReferenceMap, dest);
}

function extractShortestPath(dijkstraResult, dealReferenceMap, dest) {
    var trips = [];
    var arrivalCity = dest;
    var departureCity = dijkstraResult.prev[arrivalCity];
    while (departureCity != undefined) {
        trips.push(dealReferenceMap[dijkstraResult.referenceDealMap[departureCity + arrivalCity]]);
        arrivalCity = departureCity;
        departureCity = dijkstraResult.prev[arrivalCity];
    }

    trips.reverse();

    return trips;
}

function runDijkstra(graph, source, dest) {
    var dist = [];
    var prev = [];
    var referenceDealMap = [];

    dist[source] = 0;

    for (var cityVertex in graph) {
        if (cityVertex != source)
            dist[cityVertex] = Infinity;

        prev[cityVertex] = undefined;

        add(cityVertex, dist[cityVertex]);
    }

    while (!isEmpty()) {
        var u = extractMin();

        if (u === dest) // terminate search early if we reach destination vertex
            break;

        // u (from city), v (to city)
        // so this iterates all adjacent trips u -> v
        for (var v in graph[u]) {
            if (!inQueue(v))
                continue;

            var alt = dist[u] + graph[u][v].weight;

            if (alt < dist[v]) {
                dist[v] = alt;
                prev[v] = u;
                referenceDealMap[u + v] = graph[u][v].referenceDeal;

                updatePriority(v, alt);
            }
        }
    }

    return { prev: prev, referenceDealMap: referenceDealMap };
}

function createAdjacencyMatrix(dataList, sortingType) {
    var matrix = []; // this will be a 2D array to store city adjacencies

    for (var i in dataList) {
        var node = dataList[i];

        var from = node.departure;
        var to = node.arrival;
        var transport = node.transport;

        var cost = node.cost * (1 - (node.discount * .01));
        var time = parseInt(node.duration.h + node.duration.m);
        var weight;
        if (sortingType == 'Cheapest')
            weight = cost;
        else if (sortingType == 'Fastest')
            weight = time;
        else
            throw 'Incorrect sortingType value: ' + sortingType;

        var referenceDeal = node.reference;

        if (!matrix[from])
            matrix[from] = [];

        if (!matrix[from][to] || weight < matrix[from][to].weight)
            matrix[from][to] = { weight: weight, referenceDeal: referenceDeal };
    }

    return matrix;
}

var queue = [];
var indexHashmap = []; // a hashmap that maps id -> index in queue

const add = function (id, value) {
    queue.push({ id: id, value: value });

    var index = queue.length - 1;
    indexHashmap[id] = index;

    sortUpwards(index);
};

const extractMin = function () {
    var root = queue[0];
    indexHashmap[root.id] = undefined;
    var lastElement = queue[queue.length - 1];
    indexHashmap[lastElement.id] = 0;

    queue[0] = lastElement;
    queue.pop();

    var index = 0;
    sortDownwards(index);

    return root.id;
};

const updatePriority = function (id, newValue) {
    var index = indexHashmap[id];

    var originalValue = queue[index].value;

    queue[index].value = newValue;

    if (newValue < originalValue)
        sortUpwards(index);
    else if (newValue > originalValue)
        sortDownwards(index);
};

const isEmpty = function () { return queue.length == 0; };
const inQueue = function (id) { return indexHashmap[id] != undefined; };

/* Recursive function */
function sortDownwards(index) {
    var leftChildIndex = 2 * index + 1;
    var rightChildIndex = 2 * index + 2;

    var smallestChildIndex;
    if (!queue[leftChildIndex] && !queue[rightChildIndex]) // Base Case
        return;
    else if (!queue[leftChildIndex])
        smallestChildIndex = rightChildIndex;
    else if (!queue[rightChildIndex])
        smallestChildIndex = leftChildIndex;
    else
        smallestChildIndex = queue[leftChildIndex].value < queue[rightChildIndex].value ? leftChildIndex : rightChildIndex;

    if (queue[smallestChildIndex].value < queue[index].value) {
        // Swap elements
        swap(index, smallestChildIndex);

        sortDownwards(smallestChildIndex);
    }
}

/* Recursive function */
function sortUpwards(index) {
    // Base case
    if (index == 0)
        return;

    var parent = Math.floor((index - 1) / 2);

    if (queue[index].value < queue[parent].value) {
        // Swap elements
        swap(parent, index);

        sortUpwards(parent);
    }
}

/* This swaps queue elements i, j and updates their indices in indexHashmap */
function swap(i, j) {
    // Update indexHashmap
    indexHashmap[queue[i].id] = j;
    indexHashmap[queue[j].id] = i;

    // Swap elements in queue
    var temp = queue[i];
    queue[i] = queue[j];
    queue[j] = temp;
}