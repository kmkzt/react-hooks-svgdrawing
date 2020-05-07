var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useRef, useEffect, useCallback } from 'react';
import { SvgDrawing } from 'svg-drawing';
import { downloadBlob } from './utils/downloadBlob';
export var useSvgDrawing = function (option) {
    var renderRef = useRef(null);
    var drawingRef = useRef(null);
    var getSvgXML = useCallback(function () {
        if (!drawingRef.current)
            return null;
        return drawingRef.current.toSvgXml();
    }, []);
    var download = useCallback(function () {
        if (!drawingRef.current)
            return;
        var base64 = drawingRef.current.toSvgBase64();
        if (!base64)
            return;
        downloadBlob({
            base64: base64,
            filename: new Date().toISOString() + ".svg",
            mimeType: 'image/svg+xml'
        });
    }, []);
    var changePenColor = useCallback(function (penColor) {
        if (!drawingRef.current || !penColor)
            return;
        drawingRef.current.penColor = penColor;
    }, []);
    var changePenWidth = useCallback(function (penSise) {
        if (!drawingRef.current)
            return;
        drawingRef.current.penWidth = Number(penSise);
    }, []);
    var clear = useCallback(function () {
        if (!drawingRef.current)
            return;
        drawingRef.current.clear();
    }, []);
    var undo = useCallback(function () {
        if (!drawingRef.current)
            return;
        var drawingChildren = drawingRef.current.scene.children;
        if (drawingChildren.length === 0)
            return;
        drawingRef.current.remove(drawingChildren[drawingChildren.length - 1]);
    }, []);
    useEffect(function () {
        if (drawingRef.current)
            return;
        if (!renderRef.current)
            return;
        drawingRef.current = new SvgDrawing(__assign(__assign({}, option), { el: renderRef.current, autostart: true }));
    });
    return [
        renderRef,
        {
            two: drawingRef.current,
            changePenWidth: changePenWidth,
            changePenColor: changePenColor,
            clear: clear,
            undo: undo,
            getSvgXML: getSvgXML,
            download: download
        }
    ];
};
