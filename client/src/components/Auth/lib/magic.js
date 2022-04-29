import { Magic } from 'magic-sdk';

console.log(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);
export const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);