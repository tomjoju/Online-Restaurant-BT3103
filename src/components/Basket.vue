<template>
    <div id="app">
        <p id="menu">Menu:</p>
        <ul>
            <li v-for="order in itemsSelected" :key="order[0]">
                <p>{{ order[0] }} x {{ order[1] }}</p>
            </li>
        </ul>
        <button
            v-on:click="
                findTotal();
                sendOrder();
            "
        >
            Add Order
        </button>
        <p v-show="subtotal > 0">Subtotal: ${{ subtotal }}</p>
        <p v-show="subtotal > 0">Total: ${{ gst }}</p>
    </div>
</template>

<script>
import database from "../firebase.js";
export default {
    data() {
        return {
            subtotal: 0,
        };
    },
    methods: {
        sendOrder: function() {
            const order = {
                itemsList: [
                    {
                        name: "Pork Fried Rice",
                        count: 0,
                    },
                    {
                        name: "Dry Beef Hor Fun",
                        count: 0,
                    },
                    {
                        name: "Prawn omelette",
                        count: 0,
                    },
                    {
                        name: "Sambal KangKung",
                        count: 0,
                    },
                    {
                        name: "Cereal Prawn",
                        count: 0,
                    },
                    {
                        name: "Mapo Tofu",
                        count: 0,
                    },
                ],
            };
            for (let index = 0; index < this.itemsSelected.length; index++) {
                for (let i = 0; i < order.itemsList.length; i++) {
                    if (
                        this.itemsSelected[index][0] === order.itemsList[i].name
                    ) {
                        order.itemsList[i].count = this.itemsSelected[index][1];
                    }
                }
            }
            database
                .collection("orders")
                .add({
                    order,
                })
                .then(() => location.reload());
        },
        findTotal: function() {
            var temp = 0;
            for (let index = 0; index < this.itemsSelected.length; index++) {
                const element = this.itemsSelected[index];
                temp += element[1] * element[2];
            }
            this.subtotal = temp;
        },
    },
    computed: {
        gst() {
            var numb = this.subtotal * 1.07;
            return numb.toFixed(2);
        },
    },
    props: {
        itemsSelected: {
            type: Array,
        },
    },
};
</script>

<style scoped>
p {
    font-size: 22px;
}
#menu {
    margin-top: 60%;
}
button {
    background-color: gold;
    border-radius: 5px;
    font-weight: bold;
}
</style>
