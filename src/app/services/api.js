

const result = {
    "lat": -34.323232323,
    "long": -58.2132313,
    "intensity": 2,
}

// intensity 0 = amarillo, 1 = naranja, 2 = rojo

// siempre pasar una fecha apenas abre para que traiga las ultimas 6 horas.

export class ApiClient {
  // necesito puntos izq-top, der-top, izq-bottom, der-bottom
  async getPointsInAnSquare({ leftTop, rightTop, leftBottom, rightBottom }) {
    console.log('getPointsInAnSquare: ', { leftTop, rightTop, leftBottom, rightBottom });
    await timeout(500);
    return { success: true, value: result };
  }

  async saveReport({lat, lng, density}) {
    console.log('saveReport: ', lat, lng, density);
    await timeout(500);
    return { success: true };
  }

}

export const apiClient = new ApiClient();