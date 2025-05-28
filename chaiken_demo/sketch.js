// chaiken curves demo
// by thrly

// resources used:
// https://observablehq.com/@pamacha/chaikins-algorithm
// also https://medium.com/@jrespinozah/creating-smooth-curves-with-chaikins-algorithm-a0ad91d98ef7

n_points = 6;
points = [];

function setup() {
  createCanvas(500, 500);
  background(220);

  for (let i = 0; i < n_points; i++) {
    points[i] = [
      map(i * (width / (n_points - 1)), 0, width, 50, width - 50),
      map(random(height), 0, height, 20, height - 50),
    ];
  }

  drawCurve(points);

  strokeWeight(1);
  // draw original lines
  for (let i = 0; i < points.length - 1; i++) {
    line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
  }
}

function draw() {
  
  // if (frameCount === 1) {
  //   const capture = P5Capture.getInstance();
  //   capture.start({
  //     format: "gif",
  //     duration: 5,
  //     framerate: 1
  //   });
  // }
  
  frameRate(1);
  background(220);
  textSize(30);
  text("Chaikin curve", 20, 50);
  
  strokeWeight(0.5);
  drawCurve(points);
  let smoothing_iterations = (frameCount-1) % 5;
  textSize(18);
  text("smoothing iterations: " + smoothing_iterations, 20, height - 30);
  strokeWeight(3);
  drawCurve(chaikin(points, smoothing_iterations));
}

function chaikin(point_array, n_iterations) {
  let smooth_array = [];
  for (let iter = 0; iter < n_iterations; iter++) {
    let temp = [];
    for (let i = 0; i < point_array.length - 1; i++) {
      let p0 = [point_array[i][0], point_array[i][1]];
      let p1 = [point_array[i + 1][0], point_array[i + 1][1]];
      let q = [0.75 * p0[0] + 0.25 * p1[0], 0.75 * p0[1] + 0.25 * p1[1]];
      let r = [0.25 * p0[0] + 0.75 * p1[0], 0.25 * p0[1] + 0.75 * p1[1]];
      temp.push(q);
      temp.push(r);
    }
    point_array = temp.slice();
  }

  // add back in start and end
  point_array.splice(0, 0, [points[0][0], points[0][1]]);
  point_array.push([
    points[points.length - 1][0],
    points[points.length - 1][1],
  ]);
  // looping back to start - doesn't smooth start
  // point_array.push([points[0][0], points[0][1]]); // TODO: this doesn't smooth the close
  return point_array;
}

// draw the chaikin curve
function drawCurve(smooth_array) {
  push();
  for (let i = 0; i < smooth_array.length - 1; i++) {
    stroke(0);
    // draw linking lines / edges
    line(
      smooth_array[i][0],
      smooth_array[i][1],
      smooth_array[i + 1][0],
      smooth_array[i + 1][1]
    );
    // draw breakpoints
    stroke(255,0,255);
    fill(255,0,255)
    circle(smooth_array[i][0], smooth_array[i][1], 5);
  }
  // add final circle;
  circle(
    smooth_array[smooth_array.length - 1][0],
    smooth_array[smooth_array.length - 1][1],
    5
  ); 
  pop();
}
