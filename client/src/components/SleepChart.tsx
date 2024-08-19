import React from 'react';
import ReactECharts from 'echarts-for-react';
import { SleepRecord } from '../types';

type SleepChartProps = {
    data: SleepRecord[];
}

const SleepChart: React.FC<SleepChartProps> = ({ data }) => {
    // Prepare the data with total hours and original hours/minutes
    const formattedData = data.map(entry => ({
        date: entry.date,
        totalHours: entry.duration.hours + entry.duration.minutes / 60,
        hours: entry.duration.hours,
        minutes: entry.duration.minutes,
    }));

    const options = {
        title: {
            text: 'Last 7 Days Sleep Duration',
        },
        tooltip: {
            trigger: 'axis',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: (params: any) => {
                const { data } = params[0];
                return `Date: ${data.date}<br />Duration: ${data.hours} hours ${data.minutes} minutes`;
            },
        },
        xAxis: {
            type: 'category',
            data: formattedData.map(entry => entry.date),
        },
        yAxis: {
            type: 'value',
            name: 'Hours',
            min: 0,
            max: 24,
        },
        series: [
            {
                type: 'bar',
                data: formattedData.map(entry => ({
                    value: entry.totalHours,
                    hours: entry.hours,
                    minutes: entry.minutes,
                    date: entry.date,
                })),
                color: '#4A90E2',
            },
        ],
    };

    return <ReactECharts option={options} />;
};

export default SleepChart;
