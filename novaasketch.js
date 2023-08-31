const canvasSketch = require('canvas-sketch');

//read in the file
const noaadata = require('./data/noaa_globalanomalies_landandocean_1963-2023.json');
const noaayears = noaadata.length;
console.log(noaayears);

const settings = {
  dimensions: [1920, 1080]
};

const between = (x, min, max) => {
  //console.log(x, min, max)
  return x >= min && x <= max;
}

const brightArray = ["#0251ff", "#61b7fa", "#00a1a3", "#00fcff", "#80c751", "#f8d932", "#e77f0e", "#e33e01"];
const mutedArray = ["#bed6ce", "#94bfd1", "#8494ba", "#8b7ca8", "#a86d84", "#ca873d", "#ffbf5e", "#ffdf88", "#ffefaf", "#fffed5"];

const landoceanArray = [-0.27, -0.04, 0.19, 0.42, 0.65, 0.88, 1.11, 1.34, 1.57, 2.5];
const oceanArray = [-0.22, -0.05, 0.12, 0.29, 0.46, 0.63, 0.8, 0.97];

const getColor = (anomalyValue, colorArray, scaleArray) => {
  var color = "#F2F2F2";
  //console.log(anomalyValue);
  if (anomalyValue <= scaleArray[0]) {
    color = colorArray[0];
  } else if (between(anomalyValue, scaleArray[0], scaleArray[1])) {
    color = colorArray[1];
  } else if (between(anomalyValue, scaleArray[1], scaleArray[2])) {
    color = colorArray[2];
  } else if (between(anomalyValue, scaleArray[2], scaleArray[3])) {
    color = colorArray[3];
  } else if (between(anomalyValue, scaleArray[3], scaleArray[4])) {
    color = colorArray[4];
  } else if (between(anomalyValue, scaleArray[4], scaleArray[5])) {
    color = colorArray[5];
  } else if (between(anomalyValue, scaleArray[5], scaleArray[6])) {
    color = colorArray[6];
  } else if (between(anomalyValue, scaleArray[6], scaleArray[7])) {
    color = colorArray[7];
  } else if (between(anomalyValue, scaleArray[7], scaleArray[8])) {
    color = colorArray[8];
  } else if (between(anomalyValue, scaleArray[8], scaleArray[9])) {
    color = colorArray[8];
  }
  return color;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = 12;
    const rows = 61;
    const numCells = cols * rows;

    //80% of the the width of the canvas
    const gridw = width * 0.98;
    const gridh = height * 0.98; 

    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols; //taking the remainder using columns gives the cell grid; modulate between 0 & cols-1
      const row = Math.floor(i / cols); //at every cols steps, the value will increase by 1
      
      //X and Y values of each cell using row and col
      const x = col * cellw;
      const y = row * cellh;
      //draw the time a bit smaller then the size of the cell
      const w = cellw * 0.98;
      const h = cellh * 0.8;

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);

      context.lineWidth = 15;

      context.beginPath();
      //set default style
      context.strokeStyle = "#F2F2F2";
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      var cellcolor;

      if (noaadata[i]) {
        cellcolor = getColor(noaadata[i]["anomaly"], mutedArray, landoceanArray);
        context.beginPath();
        context.strokeStyle = cellcolor;
        context.moveTo(w * -0.5, 0);
        context.lineTo(w * 0.5, 0);
        context.stroke();
      }
      
      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
