import { Line } from "vue-chartjs";
import axios from "axios";

export default {
    extends: Line,
    data: function() {
        return {
            regions: ["west", "national", "east", "central", "south", "north"],
            results: [],
            datacollection: {
                labels: [],
                datasets: [
                    {
                        label: "west",
                        data: [],
                        borderColor: "red",
                        fill: false, // Makes it not filled
                    },
                    {
                        label: "national",
                        data: [],
                        borderColor: "blue",
                        fill: false,
                    },
                    {
                        label: "east",
                        data: [],
                        borderColor: "#D500F9",
                        fill: false,
                    },
                    {
                        label: "central",
                        data: [],
                        borderColor: "black",
                        fill: false,
                    },
                    {
                        label: "south",
                        data: [],
                        borderColor: "#795548",
                        fill: false,
                    },
                    {
                        label: "north",
                        data: [],
                        borderColor: "#76FF03",
                        fill: false,
                    },
                ],
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: "PSI Twenty Four Hourly (By Region)",
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        };
    },
    methods: {
        fetchItems: function() {
            axios
                .get(
                    `https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`
                )
                .then((response) => {
                    this.results = response.data.items;
                    for (let i = 0; i < this.results.length; i++) {
                        let element = this.results[i];
                        for (let key in element) {
                            if (
                                key === "timestamp" &&
                                !this.datacollection.labels.includes(
                                    element[key]
                                )
                            ) {
                                this.datacollection.labels.push(
                                    element[key] + ""
                                );
                            } else if (key === "readings") {
                                let reading =
                                    element[key]["psi_twenty_four_hourly"];
                                let keys = Object.keys(reading);
                                for (let region of keys) {
                                    let graph = 0;
                                    for (
                                        let index = 0;
                                        index < this.regions.length;
                                        index++
                                    ) {
                                        const temp = this.regions[index];
                                        if (temp === region) {
                                            graph = index;
                                        }
                                    }
                                    this.datacollection.datasets[
                                        graph
                                    ].data.push(reading[region]);
                                }
                            }
                        }
                    }
                    this.renderChart(this.datacollection, this.options);
                });
        },
    },
    created() {
        this.fetchItems();
    },
};
