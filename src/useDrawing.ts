import React, { useRef, useEffect, useCallback, MutableRefObject } from 'react'
import { SvgDrawing, DrawingOption } from 'svg-drawing'

interface UseSvgDrawing {
  two: SvgDrawing | null
  clear: () => void
  undo: () => void
  changePenColor: (penColor: DrawingOption['penColor']) => void
  changePenWidth: (penwidth: DrawingOption['penWidth']) => void
  getSvgXML: () => string | null
  download: (ext: 'svg' | 'png' | 'jpg') => void
}
export const useSvgDrawing = (
  option?: Partial<DrawingOption>
): [MutableRefObject<HTMLDivElement | null>, UseSvgDrawing] => {
  const renderRef = useRef<HTMLDivElement | null>(null)
  const drawingRef = useRef<SvgDrawing | null>(null)
  const getSvgXML = useCallback(() => {
    if (!drawingRef.current) return null
    return drawingRef.current.toElement().outerHTML
  }, [])
  const download = useCallback((ext: 'svg' | 'png' | 'jpg' = 'svg') => {
    if (!drawingRef.current) return
    drawingRef.current.download(ext)
  }, [])
  const changePenColor = useCallback((penColor: DrawingOption['penColor']) => {
    if (!drawingRef.current || !penColor) return
    drawingRef.current.penColor = penColor
  }, [])
  const changePenWidth = useCallback((penSise: DrawingOption['penWidth']) => {
    if (!drawingRef.current) return
    drawingRef.current.penWidth = Number(penSise)
  }, [])
  const clear = useCallback(() => {
    if (!drawingRef.current) return
    drawingRef.current.clear()
  }, [])
  const undo = useCallback(() => {
    if (!drawingRef.current) return
    drawingRef.current.undo()
  }, [])
  useEffect(() => {
    if (drawingRef.current) return
    if (!renderRef.current) return
    drawingRef.current = new SvgDrawing(renderRef.current, {
      ...option
    })
  })

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
  ]
}
