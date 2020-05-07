import React from 'react';
import { SvgDrawing, DrawingOption } from 'svg-drawing';
interface UseSvgDrawing {
    two: SvgDrawing | null;
    clear: () => void;
    undo: () => void;
    changePenColor: (penColor: DrawingOption['penColor']) => void;
    changePenWidth: (penwidth: DrawingOption['penWidth']) => void;
    getSvgXML: () => string | null;
    download: () => void;
}
export declare const useSvgDrawing: (option?: Partial<DrawingOption> | undefined) => [React.MutableRefObject<HTMLDivElement | null>, UseSvgDrawing];
export {};
