<template>
  <div class="card">
    <div class="card-body">
      <h5 class="mb-3">Tình trạng phòng</h5>
      <div class="chart-wrapper" style="position: relative; height: 100%">
        <canvas ref="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(PieController, ArcElement, Tooltip, Legend);

export default {
  name: "BieuDoTTPhong",
  props: {
    rooms: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  watch: {
    rooms: {
      deep: true,
      handler() {
        this.renderChart();
      },
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const statusCount = {
        "Còn phòng": 0,
        "Đang sửa chữa": 0,
        "Hết phòng": 0,
      };

      this.rooms.forEach((room) => {
        if (statusCount[room.status] !== undefined) {
          statusCount[room.status]++;
        }
      });

      const ctx = this.$refs.chart.getContext("2d");

      this.chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: Object.keys(statusCount),
          datasets: [
            {
              data: Object.values(statusCount),
              backgroundColor: ["#0d6efd", "#ffc107", "#dc3545"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    },
  },
};
</script>
