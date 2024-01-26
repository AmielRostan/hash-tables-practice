class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
    this.capacity = numBuckets;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    const index = this.hashMod(key);
    const pair = new KeyValuePair(key, value);

    if(this.count === this.data.length) {
      this.resize();
    }

    if(this.data[index] === null) {
      this.data[index] = pair;
    } else {
      let node = this.data[index];
      while(node) {
        if(node.key === key) {
          node.value = value;
          return;
        }

        node = node.next;
      }
      pair.next = this.data[index];
      this.data[index] = pair;
    }
    this.count++;
  }


  read(key) {
    const index = this.hashMod(key);
    if(this.data[index] !== null) {
      let node = this.data[index];

      while(node) {
        if(node.key === key) {
          return node.value;
        }
        node = node.next;
      }
    }
    return undefined;
  }


  resize() {
    const data = this.data;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);

    for(let pair of data) {
      while(pair) {
        const index = this.hashMod(pair.key);
        let newNode = new KeyValuePair(pair.key, pair.value);

        if(this.data[index] === null) {
          this.data[index] = newNode;
        } else {
          let node = this.data[index];
          while(node.next !== null) {
            node = node.next;
          }
          node.next = newNode;
        }

        pair = pair.next;
      }
    }
  }


  delete(key) {
    const index = this.hashMod(key);

    if(this.data[index] !== null) {
      let node = this.data[index];
      if(node.key === key) {
        this.data[index] = node.next;
        this.count--;
        return;
      } else {
        let pastNode = node;
        node = node.next;
        while(node) {
          if(node.key === key) {
            pastNode.next = node.next;
            this.count--;
            return;
          }
          pastNode = node;
          node = node.next;
        }
      }
    }
    return 'Key not found'
  }
}


module.exports = HashTable;
