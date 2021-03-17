<template>
    <div id="app">
        <h1>Bar Chart</h1>
        <bar></bar>
        <h1>Line Chart</h1>
        <callAPI></callAPI>
    </div>
</template>

<script>
import BarView from "./charts/barchart.js";
import callAPI from "./CallAPI.js";
export default {
    components: {
        bar: BarView,
        callAPI,
    },
};
</script>

<style>
h1 {
    background-color: gold;
    text-align: center;
    padding: 2%;
}
</style>
