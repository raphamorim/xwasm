#define PI 3.14159265358979323846
#define RAD 6.283185307179586
#define COEFF_1 0.7853981633974483
#define COEFF_2 2.356194490192345
#define BLADES 3
#define CYCLE_WIDTH 100
#define BLADES_T_CYCLE_WIDTH 300
#include <math.h>
#include <stdlib.h>
#include <emscripten.h>

int height;
int width;
int pixelCount;
int ch;
int cw;
double maxDistance;

int data[2000000];

int* EMSCRIPTEN_KEEPALIVE init(int cWidth, int cHeight) {
  width = cWidth;
  height = cHeight;
  pixelCount = width * height;
  ch = height >> 1;
  cw = width >> 1;
  maxDistance = sqrt(ch * ch + cw * cw);
  return &data[0];
}

double customAtan2(int y, int x) {
  double abs_y = abs(y) + 1e-10;
  double angle;
  if (x >= 0) {
    double r = (x - abs_y) / (x + abs_y);
    angle = 0.1963 * r * r * r - 0.9817 * r + COEFF_1;
  } else {
    double r = (x + abs_y) / (abs_y - x);
    angle = 0.1963 * r * r * r - 0.9817 * r + COEFF_2;
  }
  return y < 0 ? -angle : angle;
}

double customFmod(double a, double b)
{
  return (a - b * floor(a / b));
}

void EMSCRIPTEN_KEEPALIVE render(double timestamp) {
  int scaledTimestamp = floor(timestamp / 10.0 + 2000.0);
  for (int y = 0; y < height; y++) {
    int dy = ch - y;
    int dysq = dy * dy;
    int yw = y * width;
    for (int x = 0; x < width; x++) {
      int dx = cw - x;
      int dxsq = dx * dx;
      double angle = customAtan2(dx, dy) / RAD;
      int asbs = dxsq + dysq;
      double distanceFromCenter = sqrt(asbs);
      double scaledDistance = asbs / 400.0 + distanceFromCenter;
      double lerp = 1.0 - (customFmod(fabs(scaledDistance - scaledTimestamp + angle * BLADES_T_CYCLE_WIDTH), CYCLE_WIDTH)) / CYCLE_WIDTH;
      double absoluteDistanceRatioGB = 1.0 - distanceFromCenter / maxDistance;
      double absoluteDistanceRatioR = absoluteDistanceRatioGB * 0.8 + 0.2;
      int fadeB = round(50.0 * lerp * absoluteDistanceRatioGB);
      int fadeR = round(240.0 * lerp * absoluteDistanceRatioR * (1.0 + lerp) / 2.0);
      int fadeG = round(120.0 * lerp * lerp * lerp * absoluteDistanceRatioGB);
      data[yw + x] =
        (255 << 24) |   // A
        (fadeB << 16) | // B
        (fadeG << 8) |  // G
        fadeR;          // R
    }
  }
}
