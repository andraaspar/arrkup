import * as escapeHtml from 'escape-html';

export class Arrkup {

	constructor(
		private source: any,
		private allowRaw = true
	) { }

	createString(): string {
		return this.processArrkup(this.getSource())
	}

	processArrkup(source: any): string {
		var result = ''

		if (Array.isArray(source)) {
			var sourceArr = <any[]>source
			if (typeof sourceArr[0] === 'string') {
				result = this.processTag(sourceArr)
			} else if (Array.isArray(sourceArr[0])) {
				result = this.processGroup(sourceArr)
			} else if (sourceArr[0] === null) {
				if (this.getAllowRaw()) {
					result = this.processRaw(sourceArr)
				}
			}
		} else {
			result = this.processNonArrkup(source)
		}

		return result
	}

	processTag(source: any[]): string {
		var tagName = <string>source[0]
		var isSelfClosing = tagName.charAt(tagName.length - 1) == '/'
		if (isSelfClosing) tagName = tagName.slice(0, -1)

		var result = '<' + tagName

		var hasAttributes = source[1] && (typeof source[1] === 'object') && !Array.isArray(source[1])
		if (hasAttributes) result += this.processAttributes(source[1])
		var contentIndex = hasAttributes ? 2 : 1

		if (isSelfClosing) {
			result += '/>'
		} else {
			result += '>'

			result += this.processChildren(source, contentIndex)

			result += '</' + tagName + '>'
		}

		return result
	}

	processGroup(source: any[]): string {
		return this.processChildren(source, 0)
	}

	processRaw(source: any[]): string {
		var result = ''

		for (var i = 1, n = source.length; i < n; i++) {
			result += source[i] + ''
		}

		return result
	}

	processNonArrkup(source: any): string {
		return escapeHtml(source + '')
	}

	processAttributes(rawProps: { [key: string]: any }): string {
		var result = ''

		for (var prop in rawProps) {
			if (rawProps.hasOwnProperty(prop)) {
				result += this.processAttribute(prop, rawProps[prop])
			}
		}

		return result
	}

	processAttribute(key: string, value: any): string {
		var result = ''

		if (key) {
			if (typeof value === 'number') {
				if (!isNaN(value) && isFinite(value)) {
					value = value + ''
				} else {
					value = ''
				}
			}

			if (typeof value === 'string') {
				result = ' ' + key + '="' + escapeHtml(value) + '"'
			} else if (typeof value === 'boolean') {
				if (value) {
					result += ' ' + key
				}
			}
		}

		return result
	}

	processChildren(rawChildren: any[], startIndex: number): string {
		var result = ''

		for (var i = startIndex, n = rawChildren.length; i < n; i++) {
			result += this.processArrkup(rawChildren[i])
		}

		return result
	}

	getSource() { return this.source }
	setSource(value: any): void { this.source = value }

	getAllowRaw() { return this.allowRaw }
	setAllowRaw(flag: boolean): void { this.allowRaw = flag }

	static createString = arrkup
}

export function arrkup(source: any[], allowRaw = true): string {
	return new Arrkup(source, allowRaw).createString()
}
