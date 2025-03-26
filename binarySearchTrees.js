class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.array = array
            .sort((a, b) => a - b)
            .filter((item, index, self) => self.indexOf(item) === index);
        this.root = this._buildTree(this.array, 0, this.array.length - 1);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    _buildTree(array, start, end) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);

        let root = new Node(array[mid]);

        root.left = this._buildTree(array, start, mid - 1);
        root.right = this._buildTree(array, mid + 1, end);

        return root;
    }

    insert(root = this.root, value) {
        if (root === null) {
            return new Node(value);
        }

        if (root.data > value) {
            
        }
    }

    deleteItem(value) {
        let currNode = this.root;


    }
}

let tree = new Tree([1, 3, 2, 4]);
tree.prettyPrint();