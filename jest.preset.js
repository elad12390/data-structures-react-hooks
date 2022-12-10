const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  transform: {
    ...nxPreset.transform,
    "^.+\\.tsx?$": "ts-jest"
  }
};
