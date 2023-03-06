import ImageControls from './components/ImageControls';
import ImageScalable from './components/ImageScalable';

const Image = () => <></>;

Image.Controls = ImageControls;
Image.Scalable = ImageScalable;

export { default as imageHook } from './image.hook';
export { default as imageService } from './image.service';
export * from './image.type';
export default Image;
