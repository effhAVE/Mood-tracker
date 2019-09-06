<template>
  <div class="hero">
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
          <font-awesome-icon icon="angle-left" />
        </button>
        <div class="mood-chart-container">
          <canvas id="mood-chart" class="mood-chart"></canvas>
        </div>
        <button
          class="button is-primary arrow-button arrow-right"
          type="button"
          @click="changeMonth(+1)"
        >
          <font-awesome-icon icon="angle-right" />
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
      displayedFor: this.$moment(),
      dotColors: []
    };
  },

  computed: {
    firstDay: {
      cache: false,
      get() {
        return this.displayedFor.startOf("month").toDate();
      }
    },

    lastDay: {
      cache: false,
      get() {
        return this.displayedFor.endOf("month").toDate();
      }
    },

    displayedDate: {
      cache: false,
      get() {
        return this.displayedFor.format("MMMM YYYY");
      }
    }
  },

  methods: {
    changeMonth(by) {
      this.displayedFor.add(by, "months");
      this.moodChart.options.scales.xAxes[0].time.min = this.firstDay;
      this.moodChart.options.scales.xAxes[0].time.max = this.lastDay;
      this.changeDotColors();
      this.$forceUpdate();
      this.moodChart.update();
    },

    changeDotColors() {
      this.$store.state.moodsAverages.forEach(({ y }, index) => {
        let colour = "rgb(0, 0, 0)";
        if (y === 5) {
          colour = "rgb(0, 169, 79)";
        } else if (y >= 4.5) {
          colour = "rgb(0, 193, 16)";
        } else if (y >= 4) {
          colour = "rgb(0, 255, 25)";
        } else if (y >= 3.5) {
          colour = "rgb(151, 255, 25)";
        } else if (y >= 3) {
          colour = "rgb(229, 255, 29)";
        } else if (y >= 2.5) {
          colour = "rgb(255, 197, 25)";
        } else if (y >= 2) {
          colour = "rgb(255, 122, 40)";
        } else if (y >= 1.5) {
          colour = "rgb(255, 80, 0)";
        } else if (y === 1) {
          colour = "rgb(255, 0, 0)";
        }
        this.dotColors[index] = colour;
      });
    }
  },

  mounted() {
    const ctx = document.getElementById("mood-chart");
    let dpi = window.devicePixelRatio;
    function fixDpi() {
      //get CSS height
      //the + prefix casts it to an integer
      //the slice method gets rid of "px"
      let style_height = +getComputedStyle(ctx)
        .getPropertyValue("height")
        .slice(0, -2);
      //get CSS width
      let style_width = +getComputedStyle(ctx)
        .getPropertyValue("width")
        .slice(0, -2);
      //scale the canvas
      ctx.setAttribute("height", style_height * dpi);
      ctx.setAttribute("width", style_width * dpi);
    }
    fixDpi();
    window.addEventListener("resize", fixDpi);
    this.changeDotColors();
    this.moodChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            fill: false,
            lineTension: 0,
            data: this.$store.state.moodsAverages,
            borderColor: "rgba(0, 0, 0, 1)",
            borderWidth: 1,
            pointBackgroundColor: this.dotColors,
            pointRadius: 5,
            pointHoverRadius: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
  width: 100%;
  align-self: center;
  flex-grow: 5;
  flex: 1 1 1px;
  .hero-body {
    display: flex;
    flex-direction: column;
    flex: 1 1 1px;
  }
}

.canvas-container {
  display: flex;
  align-items: stretch;
  flex: 1 1 1px;
}

.arrow-button {
  height: auto;
  width: 50px;
  font-size: 3em;
  padding: 10px;
  margin: 5px;
  @media (max-width: 930px) {
    position: absolute;
    bottom: 5px;
    width: 45vw;
    height: 50px;
    font-size: 2em;
    &.arrow-left {
      left: 0;
    }

    &.arrow-right {
      right: 0;
    }
  }
}

.mood-chart-container {
  flex-grow: 2;
}

.mood-chart {
  position: relative;
  @media (max-width: 930px) {
    width: 100% !important;
    height: 60vh !important;
    padding: 5px;
  }
  padding: 1em;
}
</style>

