<template>
    <div id="app">
        <div id="app">
            <ul id="outside">
                <li id="outsideli" v-for="order in orders" :key="order[0]">
                    <ul>
                        <li
                            id="style1"
                            v-for="item in order[1]"
                            :key="item.name"
                        >
                            {{ item.name }}:
                            {{ item.count }}
                        </li>
                    </ul>
                    <br />
                    <div id="wrapper">
                        <button
                            v-bind:id="order[0]"
                            v-on:click="deleteItem($event)"
                        >
                            Delete
                        </button>
                        <button v-bind:id="order[0]" v-on:click="route($event)">
                            Modify
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import database from "../firebase.js";
export default {
    data() {
        return {
            orders: [],
        };
    },
    methods: {
        fetchItems: function() {
            database
                .collection("orders")
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        let temp = [];
                        temp.push(doc.id);
                        let temp1 = [];
                        doc.data().order.itemsList.forEach((element) => {
                            temp1.push(element);
                        });
                        temp.push(temp1);
                        this.orders.push(temp);
                    });
                });
        },
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            database
                .collection("orders")
                .doc(doc_id)
                .delete();
        },
        route: function(event) {
            let doc_id = event.target.getAttribute("id");
            this.$router.push({ name: "modify", params: { docId: doc_id } });
        },
    },
    created() {
        this.fetchItems();
    },
};
</script>

<style scoped>
h1 {
    background-color: gold;
    text-align: center;
    padding: 2%;
}
#outside {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
#itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
}
#outsideli {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}
#style1 {
    list-style-type: none;
}
button {
    background-color: gold;
    border-radius: 5px;
    font-weight: bold;
}
#wrapper {
    text-align: center;
}
</style>
