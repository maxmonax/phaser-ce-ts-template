// static configs

namespace Config {
  export const DOM_PARENT_ID = 'game';

  // game full area (GWxGSH =~ 19x9 for iPhone X, because need browser top panel height compensation)
  export const GH = 2000;
  export const GW = 960;

  // game safe area (GSWxGH = 4x3 for iPad)
  export const GSH = 1280;
  export const GSW = 900;

  export const FPS = 12;

  // orientation config
  export const isLockOrientation = true;
  export const lockOrientationMobileOnly = false;
  export const lockOrientationLand = false;

}