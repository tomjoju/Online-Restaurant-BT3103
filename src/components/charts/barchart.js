import { Bar } from "vue-chartjs";
import database from "../../firebase.js";

export default {
    extends: Bar,
    data: () => ({
        orders: [],
        datacollection: {
            labels: [
                "Pork Fried Rice",
                "Dry Beef Hor Fun",
                "Prawn omelette",
                "Sambal KangKung",
                "Cereal Prawn",
                "Mapo Tofu",
            ],
            datasets: [
                {
                    backgroundColor: [
                        "blue",
                        "purple",
                        "green",
                        "red",
                        "brown",
                        "yellow",
                    ],
                    data: [0, 0, 0, 0, 0, 0],
                },
            ],
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Total Number of each dish",
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                        },
                    },
                ],
            },
            responsive: true,
            maintainAspectRatio: false,
        },
    }),
    methods: {
        fetchItems: function() {
            database
                .collection("orders")
                .get()
                .then((querySnapShot) => {
                    querySnapShot.forEach((doc) => {
                        let temp1 = [];
                        doc.data().order.itemsList.forEach((element) => {
                            temp1.push(element);
                        });
                        this.orders.push(temp1);
                    });
                    for (let i = 0; i < 6; i++) {
                        for (let j = 0; j < this.orders.length; j++) {
                            let itemCount = this.datacollection.datasets[0]
                                .data[i];
                            this.datacollection.datasets[0].data[i] =
                                itemCount + this.orders[j][i].count;
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
