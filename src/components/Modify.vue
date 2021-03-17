<template>
    <div id="app">
        <ul>
            <li id="style1" v-for="(item, index) in datapacket" :key="index">
                <p>{{ item.name }}: {{ item.count }}</p>
                <input
                    v-bind:id="index"
                    type="number"
                    placeholder="0"
                    min="0"
                    value="0"
                />
            </li>
        </ul>
        <br />
        <button v-on:click="updateOrder">Update Order</button>
    </div>
</template>

<script>
import database from "../firebase.js";
export default {
    data() {
        return {
            datapacket: [],
        };
    },
    methods: {
        fetchItems: function() {
            database
                .collection("orders")
                .doc(this.docId)
                .get()
                .then((snapshot) => {
                    for (let index = 0; index < 6; index++) {
                        this.datapacket.push(
                            snapshot.data().order.itemsList[index]
                        );
                    }
                });
        },
        updateOrder: function() {
            let copy = [];
            for (let index = 0; index < this.datapacket.length; index++) {
                const element = this.datapacket[index];
                var num = document.getElementById(index).value;
                if (element.count === num || num === 0) {
                    copy.push(element);
                } else {
                    let newElement = {};
                    newElement.count = num;
                    newElement.name = element.name;
                    copy.push(newElement);
                }
            }
            var orderToUpdate = database.collection("orders").doc(this.docId);
            return orderToUpdate
                .update({
                    order: {
                        itemsList: copy,
                    },
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    this.$router.push({ path: "/orders" });
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        },
    },
    created() {
        this.fetchItems();
    },
    props: {
        docId: String,
    },
};
</script>

<style scoped>
button {
    background-color: gold;
    border-radius: 5px;
    font-weight: bold;
}
#style1 {
    list-style-type: none;
}
</style>
