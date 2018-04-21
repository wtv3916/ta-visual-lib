let chromy
exports.init = (chromyReference) => {
    chromy = chromyReference
    return this
}

exports.click = (selector) => {
    chromy.wait(selector).click(selector)
    return this
}

exports.type = (selector, text) => {
    chromy.wait(selector).type(selector, text)
    return this
}

exports.sleep = (time) => {
    chromy.wait(time)
    return this
}

exports.wait_page_load = () => {
	chromy.wait(() => {
		return document.readyState == 'complete'
	})
}
