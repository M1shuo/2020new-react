const data = [
    {
        "id": 22,
        "name": " 有理数",
        "pId": -1,
        "sort": "1",
        "bookId": 19
    },
    {
        "id": 23,
        "name": "正数和负数",
        "pId": 22,
        "sort": "1",
        "bookId": 19
    },
    {
        "id": 24,
        "name": "正数和负数",
        "pId": 23,
        "sort": "1",
        "bookId": 19
    },
    {
        "id": 25,
        "name": "有理数",
        "pId": 22,
        "sort": "2",
        "bookId": 19
    },
    {
        "id": 26,
        "name": "有理数",
        "pId": 25,
        "sort": "1",
        "bookId": 19
    },
    {
        "id": 27,
        "name": "有理数的初步认识",
        "pId": 26,
        "sort": "1",
        "bookId": 19
    },
    {
        "id": 28,
        "name": "数轴",
        "pId": 22,
        "sort": "2",
        "bookId": 19
    }
]

function buildTree(arr, id) {
    const roots = getRoots(arr, -1);
    findChildren(arr, roots)
    console.log(roots);
}

function getRoots(arr, id) {
    const nodes = arr.filter(item => {
        return item.pId == id
    });
    return nodes;
}


function findChildren(arr, nodes) {
    for (var i = 0; i < nodes.length; i++) {
        const nodes2 = getRoots(arr, nodes[i].id)
        if (nodes2) {
            nodes[i].children = nodes2;
            findChildren(arr, nodes2)
        }
    }
}
buildTree(data, -1);
