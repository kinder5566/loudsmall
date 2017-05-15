const config = {
  API_PATH: '/',
  GOOGLE_SIGNIN_KEY: '562070636068-j39mtcautf9s7earojcqni4i4moh6oev.apps.googleusercontent.com',
  GOOGLE_MAP_KEY: 'AIzaSyB-OO813j0MGMFSI7itImo2ioBZqpOBu6I',
  GOOGLE_STATICMAP_KEY: 'AIzaSyCIM0480n1UenB7z51iSmTePTZZxx0Ehm0'
};

export default config

if(typeof module !== 'undefined' && module) {
  module.exports = config;
}