// var sideWinder = function (sw) {

//     sw.setup = function () {
//         sw.createCanvas(sw.windowWidth / 2, sw.windowHeight / 2);
//         sw.grid = new Grid(20, 20, sw)
//         let maze = new Sindewinder(sw.grid, sw);
//     };

//     sw.draw = function () {
//         sw.background(51);
//         sw.grid.toCanvas(sw.width);
//     }
// }

// var sideWinderMaze = new p5(sideWinder, "sindeWinderMaze");
var sideWinderMaze = new p5(sideWinder, "sindeWinderMaze");
var binaryMaze = new p5(binaryMaze, "binaryMaze");