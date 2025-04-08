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
        if (typeof callback !== 'function') throw Error('Callback must be a function');
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

    _inOrderRecursive(root, callback) {
        if (root === null) return;
        this._inOrderRecursive(root.left, callback);
        callback(root);
        this._inOrderRecursive(root.right, callback);
    }

    _preOrderRecursive(root, callback) {
        if (root === null) return;
        callback(root);
        this._preOrderRecursive(root.left, callback);
        this._preOrderRecursive(root.right, callback);
    }

    _postOrderRecursive(root, callback) {
        if (root === null) return;
        this._postOrderRecursive(root.left, callback);
        this._postOrderRecursive(root.right, callback);
        callback(root);
    }

    inOrder(callback) {
        if (typeof callback !== 'function') throw Error('Callback must be a function');
        this._inOrderRecursive(this.root, callback);
    }

    preOrder(callback) {
        if (typeof callback !== 'function') throw Error('Callback must be a function');
        this._preOrderRecursive(this.root, callback);
    }

    postOrder(callback) {
        if (typeof callback !== 'function') throw Error('Callback must be a function');
        this._postOrderRecursive(this.root, callback);
    }

    _getHeightRecursive(node) {
        if (node === null) return -1;
        return 1 + Math.max(this._getHeightRecursive(node.left), this._getHeightRecursive(node.right));
    }

    height(value) {
        const node = this.find(value);
        if (node === null) return null;
        return this._getHeightRecursive(node);
    }

    depth(value, node = this.root, currentDepth = 0) {
        if (node === null) return null;
        if (node.data === value) return currentDepth;

        const left = this.depth(value, node.left, currentDepth + 1);
        if (left !== null) return left;

        return this.depth(value, node.right, currentDepth + 1);
    }

    _checkBalance(node) {
        if (node === null) return 0;

        const leftHeight = this._checkBalance(node.left);
        if (leftHeight === -1) return -1;

        const rightHeight = this._checkBalance(node.right);
        if (rightHeight === -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) return -1;

        return 1 + Math.max(leftHeight, rightHeight);
    }

    isBalanced() {
        return this._checkBalance(this.root) !== -1;
    }

    rebalance() {
        if (this.root === null) return null;

        const newArray = [];

        this.inOrder(function addToNewArray(node) {
            newArray.push(node.data);
        });

        this.root = this._buildTree(newArray, 0, newArray.length - 1)
    }
}

