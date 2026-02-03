const ctx = document.getElementById('salesChart').getContext('2d');

const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales (in units)',
            data: [12, 19, 14, 20, 25, 22],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales Dashboard'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});