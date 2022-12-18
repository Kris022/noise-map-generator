import NoiseScript from "./components/noiseScript";
import MapGenerator from "./components/mapGenerator";

const canvas = document.getElementById("noiseMap");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let width = 0;
let height = 0;
let scale = 27
let octaves = 4
let presistance = 0.5
let lacunarity = 1.87

let noiseMap = new NoiseScript().generateNoiseMap(canvas.width, canvas.height, scale, octaves, presistance, lacunarity);
let colorMap = new MapGenerator(canvas.width, canvas.height, ctx, noiseMap);
colorMap.drawNoise();




const button = document.getElementById('btn');
const scaleSlider = document.getElementById("scaleSlider");

button.addEventListener('click', function handleClick() {
  console.log(scaleSlider.value);
  scale = scaleSlider.value;

  let noiseMap = new NoiseScript().generateNoiseMap(canvas.width, canvas.height, scale, octaves, presistance, lacunarity);
  let colorMap = new MapGenerator(canvas.width, canvas.height, ctx, noiseMap);
  colorMap.drawNoise();
});
