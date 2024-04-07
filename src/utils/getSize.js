
export const getSizeBasedOnZoom = (currentZoom) => {
    let size = 50;

    if (currentZoom == 20) {
      size = 50
    } else if (currentZoom == 19) {
      size = 75;
    } else if (currentZoom == 18) {
      size = 75;
    } else if (currentZoom == 17) {
      size = 100;
    } else if (currentZoom == 16) {
      size = 150
    } else if (currentZoom == 15) {
      size = 200;
    } else if (currentZoom == 14) {
      size = 400;
    } else if (currentZoom == 13) {
      size = 650;
    } else if (currentZoom == 12) {
      size = 1000
    } else if (currentZoom == 11) {
      size = 2500;
    } else if (currentZoom == 10) {
      size = 4000
    } else if (currentZoom == 9) {
      size = 12500
    } else if (currentZoom == 8) {
      size = 35000
    } else if (currentZoom == 7) {
      size = 55000
    } else if (currentZoom == 6) {
      size = 75000
    } else if (currentZoom == 5) {
      size = 275000
    } else if (currentZoom == 4) {
      size = 350000;
    } else if (currentZoom == 3) {
      size = 400000;
    } else if (currentZoom == 2) {
      size = 550000;
    } else if (currentZoom == 1) {
      size = 650000;
    }

    return size;
  }