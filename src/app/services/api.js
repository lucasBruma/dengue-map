
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

// intensity 0 = amarillo, 1 = naranja, 2 = rojo

// siempre pasar una fecha apenas abre para que traiga las ultimas 6 horas.

export class ApiClient {

  // necesito puntos izq-top, der-top, izq-bottom, der-bottom
  /**
 * Represents a person.
 * @property {Object} centerPoint - { lat: number, long: number }.
 * @property {number} zoom   
 * @property {number} date - optional if its the first rendering -
 */
  async getPointsInAnSquare(centerPoint, zoom, date = date.now()) {
    // console.log('getPointsInAnSquare: ', { leftTop, rightTop, leftBottom, rightBottom });
    await delay(500);
    return { success: true, value: result };
  }

  /**
  * Represents a person.
  * @property {Object} point - { lat: number, long: number, intensityLevel: number }
  */

  async saveReport(point) {
    // console.log('saveReport: ', lat, lng, density);
    await delay(500);
    return { success: true };
  }

}

export const apiClient = new ApiClient();