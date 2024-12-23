export const COLOR_THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  BLUE: 'blue',
  RED: 'red',
  GREEN: 'green',
  PURPLE: 'purple',
  PINK: 'pink',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  SYSTEM: 'system',
};

export const THEMES_LIST = Object.keys(COLOR_THEMES).map(
  (key) => COLOR_THEMES[key]
);
