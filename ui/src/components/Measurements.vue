<template>
  <div class="measurements">
    <div ref="lineCharts"></div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts/highstock'
  import _ from 'lodash'

  export default {
    name: 'measurements',
    components: {
      Highcharts, _
    },
    mounted(){
      if (!this.chart && this.options) {
        this.chart = new Highcharts.stockChart(this.$refs.lineCharts, this.options);
      }
    },
    created () {
      this.createConnection();
    },
    data () {
      return {
        socket: null,
        chart: null,
        options: {
          chart: {
            zoomType: 'x'
          },
          series: [
            {name: 'Latitude', data: [], field: 'coordinates.latitude'},
            {name: 'Longitude', data: [], field: 'coordinates.longitude'},
            {name: 'Accelerometer X', data: [], field: 'accelerometer.x'},
            {name: 'Accelerometer Y', data: [], field: 'accelerometer.y'},
            {name: 'Accelerometer Z', data: [], field: 'accelerometer.z'},
            {name: 'Gyrometer X', data: [], field: 'gyrometer.x'},
            {name: 'Gyrometer Y', data: [], field: 'gyrometer.y'},
            {name: 'Gyrometer Z', data: [], field: 'gyrometer.z'},
            {name: 'Pulse', data: [], field: 'pulse'},
          ]
        }
      }
    },
    methods: {
      createConnection () {
        this.socket = new window.WebSocket(process.env.API_URL);
        this.socket.onclose = () => {
          this.createConnection();
        };
        this.socket.onmessage = this.onMessage;
      },
      onMessage (msg) {
        const measurements = JSON.parse(msg.data);
        for (const measurement of measurements) {
          const timestamp = parseInt(measurement.timestamp);
          for (const series of this.chart.series) {
            if (series.options.id) continue;
            const point = [timestamp, _.get(measurement, series.options.field)];
            series.addPoint(point, false, series.data.length >= 100);
          }
        }
        this.chart.redraw();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
