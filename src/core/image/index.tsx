import ImageControls from './components/ImageControls';
import ImageExtension from './components/ImageExtension';
import ImageScalable from './components/ImageExtensionView';

const Image = () => <></>;

Image.Controls = ImageControls;
Image.Scalable = ImageScalable;
Image.Extension = ImageExtension;

export { default as imageHook } from './image.hook';
export { default as imageService } from './image.service';
export * from './image.type';
export default Image;
