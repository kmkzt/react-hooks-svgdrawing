import React, { useRef, useEffect, useCallback, MutableRefObject } from 'react'
import Two from 'two.js'
import { SvgDrawing, DrawingOption } from 'svg-drawing'
import { downloadBlob } from './utils/downloadBlob'

interface UseSvgDrawing {
  two: SvgDrawing | null
  clear: () => void
  undo: () => void
  changePenColor: (penColor: DrawingOption['penColor']) => void
  changePenWidth: (penwidth: DrawingOption['penWidth']) => void
  getSvgXML: () => string | null
  download: () => void
}
export const useSvgDrawing = (
  option?: Partial<DrawingOption>
): [MutableRefObject<HTMLDivElement | null>, UseSvgDrawing] => {
  const renderRef = useRef<HTMLDivElement | null>(null)
  const drawingRef = useRef<SvgDrawing | null>(null)
  const getSvgXML = useCallback(() => {
    if (!drawingRef.current) return null
    return drawingRef.current.toSvgXml()
  }, [])
  const download = useCallback(() => {
    if (!drawingRef.current) return
    const base64 = drawingRef.current.toSvgBase64()
    if (!base64) return
    downloadBlob({
      base64,
      filename: `${new Date().toISOString()}.svg`,
      mimeType: 'image/svg+xml'
    })
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
    const drawingChildren: Two.Object[] = drawingRef.current.scene.children
    if (drawingChildren.length === 0) return
    drawingRef.current.remove(drawingChildren[drawingChildren.length - 1])
  }, [])
  useEffect(() => {
    if (drawingRef.current) return
    if (!renderRef.current) return
    drawingRef.current = new SvgDrawing({
      ...option,
      el: renderRef.current,
      autostart: true
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
