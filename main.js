import NoiseScript from "./components/noiseScript";
import MapGenerator from "./components/mapGenerator";

const canvas = document.getElementById("noiseMap");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let width = 0;
let height = 0;
let scale = 27;
let octaves = 4;
let presistance = 0.5;
let lacunarity = 1.87;
let seed = 100;
let offset = {x:0, y:0};

let noiseMap = new NoiseScript().generateNoiseMap(canvas.width, canvas.height, scale, octaves, presistance, lacunarity, seed, offset);
let colorMap = new MapGenerator(canvas.width, canvas.height, ctx, noiseMap);
colorMap.drawNoise();

const button = document.getElementById('btn');
const scaleSlider = document.getElementById("scaleSlider");
const octavesSlider = document.getElementById("octavesSlider");
const presistanceSlider = document.getElementById("presistanceSlider");
const lacunaritySlider = document.getElementById("lacunaritySlider");
const seedSlider = document.getElementById("seedSlider");
const offsetXSlider = document.getElementById("offsetXSlider");
const offsetYSlider = document.getElementById("offsetYSlider");

button.addEventListener('click', function handleClick() {
  scale = scaleSlider.value;
  octaves = octavesSlider.value;
  presistance = presistanceSlider.value;
  lacunarity = lacunaritySlider.value;
  seed = seedSlider.value;
  offset = {x:parseInt(offsetXSlider.value), y:parseInt(offsetYSlider.value)};

  let noiseMap = new NoiseScript().generateNoiseMap(canvas.width, canvas.height, scale, octaves, presistance, lacunarity, seed, offset);
  let colorMap = new MapGenerator(canvas.width, canvas.height, ctx, noiseMap);
  colorMap.drawNoise();
});
