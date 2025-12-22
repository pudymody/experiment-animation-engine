import DOMCanvas from "./domcanvas.ts"

export { DOMCanvas }
export interface ProgressEvent {
	current: number
	total: number
	percentage: number
}
