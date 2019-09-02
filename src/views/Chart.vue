<template>
  <div class="hero is-medium">
    <div class="hero-body is-paddingless">
      <h2 class="title">
        {{ displayedDate }}
      </h2>
      <div class="canvas-container">
        <button
          class="button is-primary arrow-button arrow-left"
          type="button"
          @click="changeMonth(-1)"
        >
          &lsaquo;
        </button>
        <canvas id="mood-chart" class="mood-chart"></canvas>
        <button
          class="button is-primary arrow-button arrow-right"
          type="button"
          @click="changeMonth(+1)"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  data() {
    return {
      displayedFor: new Date(),
      dotColors: []
    };
  },

  computed: {
    firstDay: {
      cache: false,
      get() {
        return new Date(
          this.displayedFor.getFullYear(),
          this.displayedFor.getMonth(),
          1
        );
      }
    },

    lastDay: {
      cache: false,
      get() {
        return new Date(
          this.displayedFor.getFullYear(),
          this.displayedFor.getMonth() + 1,
          0
        );
      }
    },

    displayedDate: {
      cache: false,
      get() {
        return this.displayedFor.toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric"
        });
      }
    }
  },

  methods: {
    changeMonth(by) {
      this.displayedFor.setMonth(this.displayedFor.getMonth() + by);
      this.moodChart.options.scales.xAxes[0].time.min = this.firstDay;
      this.moodChart.options.scales.xAxes[0].time.max = this.lastDay;
      this.changeDotColors();
      this.$forceUpdate();
      this.moodChart.update();
    },

    changeDotColors() {
      this.$store.state.moodsChartList.forEach((el, index) => {
        switch (el.y) {
          case 5:
            this.dotColors[index] = "rgb(0, 169, 79)";
            break;
          case 4:
            this.dotColors[index] = "rgb(0, 255, 25)";
            break;
          case 3:
            this.dotColors[index] = "rgb(229, 255, 29)";
            break;
          case 2:
            this.dotColors[index] = "rgb(218, 105, 39)";
            break;
          case 1:
            this.dotColors[index] = "rgb(255, 0, 0)";
            break;
          default:
            this.dotColors[index] = "rgb(0, 0, 0)";
            break;
        }
      });
    }
  },

  mounted() {
    const ctx = document.getElementById("mood-chart");
    this.changeDotColors();
    this.moodChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            fill: false,
            lineTension: 0,
            responsive: true,
            maintainAspectRatio: true,
            data: this.$store.state.moodsChartList,
            borderColor: "rgba(0, 0, 0, 1)",
            borderWidth: 1,
            pointBackgroundColor: this.dotColors,
            pointRadius: 5,
            pointHoverRadius: 10
          }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                max: 5,
                min: 1
              }
            }
          ],

          xAxes: [
            {
              type: "time",
              time: {
                unit: "day",
                min: this.firstDay,
                max: this.lastDay
              }
            }
          ]
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.hero {
  width: 95%;
  align-self: center;
  height: 80vh;
}

.canvas-container {
  display: flex;
  align-items: stretch;
  height: 80vh;
}

.arrow-button {
  height: auto;
  width: 3vw;
  font-size: 3em;
  padding: 10px;
  &.arrow-left {
    margin-right: 1vw;
  }

  &.arrow-right {
    margin-left: 1vw;
  }
}

.mood-chart {
  position: relative;
  width: calc(100% - 8vw) !important;
  height: inherit !important;
  padding: 1em;
}
</style>

