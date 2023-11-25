import { fabric } from 'fabric';
import { uuid } from '@/utils';
import { getGlobalEditor } from '@/utils/global';

export default function createRect (options) {
  const { width = 200, height = 200, left, top, ...rest } = options;
  const editor = getGlobalEditor();
  const { canvas, sketch } = editor;
  const rect = new fabric.Rect({
    id: uuid(),
    width,
    height,
    ...rest,
  });

  if (left == null) {
    // @ts-ignore
    rect.set('left', sketch.width / 2 - rect.width / 2);
  } else {
    rect.set('left', left);
  }
  if (top == null) {
    // @ts-ignore
    rect.set('top', sketch.height / 2 - rect.height / 2);
  } else {
    rect.set('top', top);
  }

  canvas.add(rect);
  canvas.requestRenderAll();
  canvas.setActiveObject(rect);
  return rect;
}

export const createImageRect = async (options) => {
  const editor = getGlobalEditor();
  const { canvas, sketch } = editor;
  const { image, left, top, ...rest } = options;
  const rect = new fabric.Rect({
    id: uuid(),
    sub_type: 'image',
    ...rest,
  });

  rect.set({
    fill: new fabric.Pattern({
      source: image,
      repeat: 'no-repeat'
    }),
    width: image.width,
    height: image.height
  });

  if (left == null) {
    // @ts-ignore
    rect.set('left', sketch.width / 2 - rect.width / 2);
  } else {
    rect.set('left', left);
  }
  if (top == null) {
    // @ts-ignore
    rect.set('top', sketch.height / 2 - rect.height / 2);
  } else {
    rect.set('top', top);
  }

  canvas.add(rect);
  canvas.requestRenderAll();
  canvas.setActiveObject(rect);
  return rect;
}