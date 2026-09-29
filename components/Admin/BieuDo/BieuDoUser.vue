<template>
  <div class="card">
    <div class="card-body">
      <h5 class="mb-3">Trạng thái tài khoản</h5>
      <div class="chart-wrapper" style="position: relative; height: 100%">
        <canvas ref="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default {
  name: "BieuDoUser",
  props: {
    users: {
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
    users: {
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
      if (!this.users) return;

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const active = this.users.filter((u) => u.active).length;
      const locked = this.users.filter((u) => !u.active).length;

      const ctx = this.$refs.chart.getContext("2d");

      this.chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Hoạt động", "Bị khóa"],
          datasets: [
            {
              data: [active, locked],
              backgroundColor: ["#198754", "#dc3545"],
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

<style>
</style>
