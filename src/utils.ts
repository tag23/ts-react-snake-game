import { Point } from "./types";

export class LinkedNode<T> {
    data: T;
    next: LinkedNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}
  
export class LinkedList<T> {
    head: LinkedNode<T> | null;
    count: number;

    constructor(head: LinkedNode<T> | null) {
        this.head = head;
        this.count = head ? 1 : 0;
    }

    push(data: T) {
        let currentNode: LinkedNode<T> | null = null;
        const node = new LinkedNode(data);

        if (this.head === null) {
            this.head = node;
        } else {
            currentNode = this.head;

            while (currentNode.next !== null) {
                currentNode = currentNode?.next;
            }
            currentNode.next = node;
        }

        this.count += 1;
    }

    length() {
        return this.count;
    }

    indexOf(data: T) {
        if (!data) {
            return -1;
        }

        let idx: number = 0;
        let found: boolean = false;
        let currentNode: LinkedNode<T> | null = this.head;

        while (currentNode?.data !== data && idx < this.length()) {
            currentNode = currentNode?.next || null;
            idx += 1;
        }

        if (currentNode?.data === data) {
            found = true;
        }

        if (!found) {
            return -1;
        }

        return idx - 1;
    }

    insertByIndex(idx: number, data: T) {
        if (idx < 0 || idx >= this.length()) {
            return;
        }

        const newNode: LinkedNode<T> = new LinkedNode(data);

        if (idx === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            const node: LinkedNode<T> | null = this.getByIndex(idx-1);
            newNode.next = node?.next || null;
            
            if (!node) {
                return;
            }

            node.next = newNode;
        }
        this.count += 1;
    } 

    removeByIndex(idx: number) {
        if (idx < 0 || idx >= this.length()) {
            return null;
        }

        let currentNode: LinkedNode<T> | null = this.head;
        
        if (idx === 0) {
            this.head = currentNode?.next || null;
        } else {
            const previousNode = this.getByIndex(idx - 1);

            if (!previousNode) {
                return null;
            }

            currentNode = previousNode?.next || null;
            previousNode.next = currentNode?.next || null;
        }

        this.count -= 1;
        return currentNode?.data;
    }
    
    getByIndex(idx: number) {
        if (idx < 0 || idx >= this.length()) {
            return null;
        }

        let currentNode: LinkedNode<T> | null = this.head;

        for (let iter = 0; iter < idx && currentNode !== null; iter++) {
            currentNode = currentNode.next;
        }

        return currentNode;
    }

    editByIndex(idx: number, data: T) {
        if (idx < 0 || idx >= this.length()) {
            return null;
        }

        let currentNode: LinkedNode<T> | null = this.getByIndex(idx);

        if (!currentNode) {
            return null;
        }

        currentNode.data = data;

        return currentNode;
    }

    getByData(data: T) {
        return this.getByIndex(this.indexOf(data));
    }

    some(func: (item: T) => boolean) {
        let currentNode: LinkedNode<T> | null = this.head;
        
        while (currentNode) {
            if (func(currentNode?.data)) {
                return true;
            }
            
            currentNode = currentNode?.next || null;
        }

        return false;
    }

    someExceptHead(func: (item: T) => boolean) {
        let currentNode: LinkedNode<T> | null = this.head;
        
        while (currentNode) {
            if (currentNode !== this.head) {
                if (func(currentNode?.data)) {
                    return true;
                }
            }

            currentNode = currentNode?.next || null;
        }

        return false;
    }
}

export const generateRandomPoint = (xRange: number, yRange: number): Point => {
    return {x: Math.floor(Math.random() * xRange), y: Math.floor(Math.random() * yRange)};
};