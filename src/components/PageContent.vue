<template>
    <div id="app">
        <ul id="itemsList">
            <li v-for="item in items" :key="item.name">
                <p id="itemName">{{ item.name }}</p>
                <img v-bind:src="item.imageURL" />
                <p id="price">${{ item.price }}</p>
                <counter v-bind:item="item" v-on:counter="onCounter"></counter>
            </li>
        </ul>
        <basket id="shoppingBasket" :itemsSelected="itemsSelected"></basket>
    </div>
</template>

<script>
import database from "../firebase.js";
import QuantityCounter from "./QuantityCounter";
import Basket from "./Basket";
export default {
    data() {
        return {
            items: [],
            itemsSelected: [],
        };
    },
    methods: {
        fetchItems: function() {
            database
                .collection("menu")
                .get()
                .then((snapshot) => {
                    let item = {};
                    snapshot.forEach((doc) => {
                        item = doc.data();
                        this.items.push(item);
                    });
                });
        },
        onCounter: function(item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {
                var found = false;
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item_name == item.name) {
                        if (count > 0) {
                            this.itemsSelected.splice(i, 1);
                            this.itemsSelected.push([
                                item.name,
                                count,
                                item.price,
                            ]);
                            // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        } else {
                            this.itemsSelected.splice(i, 1);
                            i -= 1;
                        }
                        found = true;
                    }
                }
                if (!found && count > 0) {
                    // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                    this.itemsSelected.push([item.name, count, item.price]);
                }
            }
        },
    },
    created() {
        this.fetchItems();
    },
    props: {},
    components: {
        counter: QuantityCounter,
        basket: Basket,
    },
};
</script>

<style scoped>
#itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
}
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}
img {
    width: 135px;
    height: 135px;
}

#price {
    font-size: 25px;
}

#itemName {
    font-size: 25px;
}

#shoppingBasket {
    position: absolute;
    top: 23%;
    left: 78%;
}
</style>
