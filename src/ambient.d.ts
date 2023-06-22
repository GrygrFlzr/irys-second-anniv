// type definitions seems to be wrong with "moduleResolution": "node"
// https://arethetypeswrong.github.io/?p=photoswipe%405.3.7
declare module 'photoswipe/lightbox' {
	import PhotoSwipeLightBox from 'photoswipe/dist/types/lightbox/lightbox';
	export default PhotoSwipeLightBox;
}
