import axios from "axios";

const result = [
    {
        "lat": -34.57295024200886,
        "long": -58.46709644148949,
        "intensity": 1
    },
    {
        "lat": -34.323232323,
        "long": -58.2132313,
        "intensity": 0,
    },
    {
        "lat": -34.323232323,
        "long": -58.2132313,
        "intensity": 0,
    },
    {
        "lat": -34.423232323,
        "long": -58.2132313,
        "intensity": 2,
    },
    {
        "lat": -34.323232323,
        "long": -58.3132313,
        "intensity": 1,
    },
    {
        "lat": -34.423232323,
        "long": -58.3132313,
        "intensity": 2,
    },
]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// intensity 0 = yellow, 1 = orange , 2 = red

export class ApiClient {
    /**
     * Represents a person.
     * @property {Object} centerPoint - { lat: number, long: number }.
     * @property {number} zoom   
     * @property {number} date - optional if its the first rendering -
     */
    async getPointsInAnSquare(centerPoint, zoom, date = Date.now() - 86400 * 1000 * 100000000) {
        const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

        const response = await axios.get(`${backUrl}/api/v1/points/distance?long1=${centerPoint.long}&lat=${centerPoint.lat}&distance=${zoom}`);

        console.log("response--", response)
        // console.log('getPointsInAnSquare: ', { leftTop, rightTop, leftBottom, rightBottom });
        return { success: true, value: response.data };
    }

  /**
  * Represents a person.
  * @property {Object} point - { lat: number, long: number, intensityLevel: number }
  */

  async saveReport(point) {
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

    await axios.post(`${backUrl}/api/v1/points`, {
        latitud: point.lat,
        longitud: point.long,
        createdAt: Date.now(),
        intensityLevel: point.intensityLevel
    });
    // console.log('saveReport: ', lat, lng, density);
    return { success: true };
  }

}

export const apiClient = new ApiClient();