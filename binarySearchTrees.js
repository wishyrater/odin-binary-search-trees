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

    _insertRecursive(root, value) {
        if (root === null) {
            return new Node(value);
        }

        if (root.data === value) {
            return root;
        }

        if (value < root.data) {
            root.left = this._insertRecursive(root.left, value);
        } else if (value > root.data) {
            root.right = this._insertRecursive(root.right, value);
        }

        return root;
    }

    insert(value) {
        this.root = this._insertRecursive(this.root, value);
    }

    _getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null && curr.left !== null) {
            curr = curr.left;
        }
        return curr;
    }

    _deleteRecursive(root, value) {
        if (root === null) {
            return root;
        }

        if (root.data > value) {
            root.left = this._deleteRecursive(root.left, value);
        } else if (root.data < value) {
            root.right = this._deleteRecursive(root.right, value);
        } else {
            // only right child
            if (root.left === null) {
                return root.right;
            }

            // only left child
            if (root.right === null) {
                return root.left;
            }

            // both children
            let successor = this._getSuccessor(root);
            root.value = successor.value;
            root.right = this._deleteRecursive(root.right, successor.key);
        }

        return root;
    }

    deleteItem(value) {
        this.root = this._deleteRecursive(this.root, value);
    }

    _findRecursive(root, value) {
        if (root === null) {
            return null;
        } else if (root.data < value) {
            return this._findRecursive(root.right, value);
        } else if (root.data > value) {
            return this._findRecursive(root.left, value);
        } else if (root.data === value) {
            return root;
        }
    }

    find(value) {
        return this._findRecursive(this.root, value);
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') throw Error('Callback must be instance of function');
        if (this.root === null) return;

        const queue = [this.root];
        while (queue.length !== 0) {
            const curr = queue.at(0);
            callback(curr);
            if (curr.left !== null) queue.push(curr.left);
            if (curr.right !== null) queue.push(curr.right);
            queue.shift();
        }
    }
}

let tree = new Tree([1, 3, 2, 4]);
tree.prettyPrint();