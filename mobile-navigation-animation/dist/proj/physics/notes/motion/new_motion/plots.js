// График для кинематики
Plotly.newPlot('kinematics-plot', [
    {
        x: [0, 1, 2, 3, 4, 5],
        y: [0, 2, 4, 6, 8, 10],
        mode: 'lines+markers',
        name: 'Скорость (м/с)',
        line: {color: 'red', width: 2}
    },
    {
        x: [0, 1, 2, 3, 4, 5],
        y: [0, 1, 4, 9, 16, 25],
        mode: 'lines',
        name: 'Путь (м)',
        line: {color: 'blue', width: 2, dash: 'dot'}
    }
], {
    title: 'Равноускоренное движение',
    xaxis: {title: 'Время (с)'},
    yaxis: {title: 'Значение'},
    margin: {t: 50, l: 50, r: 30, b: 50},
    showlegend: true,
    legend: {x: 0.8, y: 0.1},
    paper_bgcolor: '#f9f9f5'
});