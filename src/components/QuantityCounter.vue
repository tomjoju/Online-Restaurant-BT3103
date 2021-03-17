<template>
    <div id="app">
        <button v-on:click="minus">-</button>
        {{ counter }}
        <button class="button1" v-on:click="add">+</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            counter: 0,
        };
    },
    methods: {
        minus: function() {
            if (this.counter != 0) {
                this.counter -= 1;
            }
            this.$emit("counter", this.item, this.counter);
        },
        add: function() {
            if (this.counter != 10) {
                this.counter += 1;
            } else {
                alert("You cannot buy more than 10 items.");
            }
            this.$emit("counter", this.item, this.counter);
        },
    },
    props: {
        item: Object,
    },
};
</script>

<style scoped>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    font-size: 30px;
}
button {
    text-align: center;
    background-color: green;
    border-radius: 8px;
    font-size: 36px;
    width: 15%;
}
.button1 {
    background-color: red;
}
</style>
