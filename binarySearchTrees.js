class Node {
    constructor(root, left = null, right = null) {
        this.root = root;
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

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root}`);
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


}

let tree = new Tree([1, 3, 2, 4]);
tree.prettyPrint(tree.root);