import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductsService } from '../../../core/services/products.service';
import { Products } from '../../../core/models/products.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart: any;

  constructor(private productsService: ProductsService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadChart();
  }

  loadChart() {
    this.productsService.getProducts().subscribe(products => {
      const countPerCategory = this.getCountPerCategory(products);

      const labels = Object.keys(countPerCategory);
      const data = Object.values(countPerCategory);

      this.createChart(labels, data);
    });
  }

  getCountPerCategory(products: Products[]): { [key: string]: number } {
    const countPerCategory: { [key: string]: number } = {};

    products.forEach(product => {
      const categoryName = product.category.name;
      
      if (countPerCategory[categoryName]) {
        countPerCategory[categoryName]++;
      } else {
        countPerCategory[categoryName] = 1;
      }
    });

    return countPerCategory;
  }

  createChart(labels: string[], data: number[]) {
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Jumlah Produk Per Category',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
