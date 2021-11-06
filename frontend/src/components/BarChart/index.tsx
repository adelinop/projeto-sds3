import Chart from 'react-apexcharts'
import { SaleSuccess } from 'types/sale';
import { BASE_URL } from 'utils/requests';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { round } from 'utils/format';

const BarChart = () => {
    type seriesData = {
        name: string;
        data: number[];
    }
    type ChartData = {
        labels: {
            categories: string[];
        };
        series: seriesData[];
    }


    const [chartData, setCharData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    });


    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`).then(response => {
            const data = response.data as SaleSuccess[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => round(100 * x.deals / x.visited, 1));
            setCharData({
                labels: {
                    categories: myLabels
                },
                series: [
                    {
                        name: "% Sucesso",
                        data: mySeries
                    }
                ]
            })
        });
    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    return (
        <Chart
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
}
export default BarChart;
