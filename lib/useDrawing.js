import { useRef, useEffect, useCallback } from 'react';
import { SvgDrawing } from 'svg-drawing';
import { downloadBlob } from './utils/downloadBlob';
export const useSvgDrawing = (option) => {
    const renderRef = useRef(null);
    const drawingRef = useRef(null);
    const getSvgXML = useCallback(() => {
        if (!drawingRef.current)
            return null;
        return drawingRef.current.toSvgXml();
    }, []);
    const download = useCallback(() => {
        if (!drawingRef.current)
            return;
        const base64 = drawingRef.current.toSvgBase64();
        if (!base64)
            return;
        downloadBlob({
            base64,
            filename: `${new Date().toISOString()}.svg`,
            mimeType: 'image/svg+xml'
        });
    }, []);
    const changePenColor = useCallback((penColor) => {
        if (!drawingRef.current || !penColor)
            return;
        drawingRef.current.penColor = penColor;
    }, []);
    const changePenWidth = useCallback((penSise) => {
        if (!drawingRef.current)
            return;
        drawingRef.current.penWidth = Number(penSise);
    }, []);
    const clear = useCallback(() => {
        if (!drawingRef.current)
            return;
        drawingRef.current.clear();
    }, []);
    const undo = useCallback(() => {
        if (!drawingRef.current)
            return;
        const drawingChildren = drawingRef.current.scene.children;
        if (drawingChildren.length === 0)
            return;
        drawingRef.current.remove(drawingChildren[drawingChildren.length - 1]);
    }, []);
    useEffect(() => {
        if (drawingRef.current)
            return;
        if (!renderRef.current)
            return;
        drawingRef.current = new SvgDrawing({
            ...option,
            el: renderRef.current,
            autostart: true
        });
    });
    return [
        renderRef,
        {
            two: drawingRef.current,
            changePenWidth,
            changePenColor,
            clear,
            undo,
            getSvgXML,
            download
        }
    ];
};
