// static configs

namespace Config {
  export const DOM_PARENT_ID = 'game';

  // game full area (GWxGSH =~ 19x9 for iPhone X, because need browser top panel height compensation)
  export const GW = 2000;
  export const GH = 960;

  // game safe area (GSWxGH = 4x3 for iPad)
  export const GSW = 1280;
  export const GSH = 900;

  export const FPS = 12;

  // orientation config
  export const isLockOrientation = true;
  export const lockOrientationMobileOnly = true;
  export const lockOrientationLand = true;

}