import { createNoise2D } from 'simplex-noise';

export default class NoiseScript {
	constructor() {
		this.noiseMap = [];
		this.noise2D = createNoise2D();
	}

	inverseLerp(value, min, max) {
		return (value - min) / (max - min);
	}

	generateNoiseMap(mapWidth, mapHeight, scale, octaves, presistance, lacunarity, seed) {
    


		// Clamp the scale so its always above 0
		if (scale <= 0) {
			scale = 0.0001;
		}

		let maxNoiseHeight = Number.NEGATIVE_INFINITY; // smallest float value
		let minNoiseHeight = Number.MAX_VALUE; // biggest float value

		// Generate the map as 2d array
		for (let y = 0; y < mapHeight; y++) {
			this.noiseMap.push([]); // Insert row
			for (let x = 0; x < mapWidth; x++) {
				let amplitude = 1;
				let frequency = 1; // rate of changes between height values
				let noiseHeight = 0;

				for (let i = 0; i < octaves; i++) {
					let sampleX = x / scale * frequency;
					let sampleY = y / scale * frequency;

					// Get the noise value
					let simplexValue = this.noise2D(sampleX, sampleY) * 2 - 1;
					noiseHeight = simplexValue * amplitude;

					amplitude *= presistance;
					frequency *= lacunarity;
				} // end of octaves loop

				if (noiseHeight > maxNoiseHeight) {
					maxNoiseHeight = noiseHeight;
				} else if (noiseHeight < minNoiseHeight) {
					minNoiseHeight = noiseHeight;
				}
				this.noiseMap[y].push(noiseHeight); // insert to the array
			}
		}

		for (let y = 0; y < mapHeight; y++) {
			for (let x = 0; x < mapWidth; x++) {
				this.noiseMap[y][x] = this.inverseLerp(minNoiseHeight, maxNoiseHeight, this.noiseMap[y][x]);

			}
		}
		return this.noiseMap;
	}
}
