import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
import { SocketContext } from '../Context/SocketContext';





export const GraphicsBands = () => {

  const canvasRef = useRef();
  const { socket } = useContext(SocketContext);
    
  useLayoutEffect(() => {
    socket.on('current-bands', ( bands ) => {
      if (canvasRef.current) {
        canvasRef.current.focus().destroy();
      }
      const myChart = createdGraphic(bands);
    });
  }, [ socket ])

  const createdGraphic = ( bands = [] ) => {
    const ctx = document.getElementById('myChart').getContext('2d');

    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip
    );
      
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: bands.map( band => band.name ),
            datasets: [{
                label: '# of Votes',
                data: bands.map( band => band.votes ),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          animation: false,
          indexAxis: 'y',
          scales: {

          }
        }
    });

  return myChart;    
  }




    return (
        <>
            <canvas id="myChart" ref={ canvasRef }></canvas>

        </>
    )
}
