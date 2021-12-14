var d = window.localStorage
function s() {
	return document.querySelector(...arguments)
}
var newUrl, newPaste, newTitle, newColor, newAddOk

newPanel = s("#newPanel")
newUrl = s("#newUrl")
newPaste = s("#newPaste")
newTitle = s("#newTitle")
newColor = s("#newColor")
newAddOk = s("#newAddOk")
confirmClear = s("#confirmClear")
clear = s("#clear")
add = s("#add")
tile = s("#tile")

var links = []

function init() {
	if (!d.ready) {
		d.links = ''
		// save()
		d.ready = true
	} else {
		d.ready = true
	}
}

function load() {
	links = JSON.parse("[" + d.links + "]")
	console.log(links)
}

function loadTile() {
	load()
	console.log(links)
	for (let link of links) {
		let newLink = document.createElement("a")
		newLink.href = link.href
		newLink.style.borderColor = link.color
		newLink.innerHTML = link.title
		tile.appendChild(newLink)
		console.log(newLink)
	}
}

function save() {
	let dLinks = []
	for (let link of links) {
		dLinks.push(JSON.stringify(link))
	}
	d.links = dLinks.toString()
	console.log(d.links)
}

function addNewLink() {
	if (newTitle.value) {
		links.push({
			href: newUrl.value,
			title: newTitle.value,
			color: newColor.value,
		})
		save()
		console.log(d.links)
		location.reload()
	} else {
		newTitle.style.border = "solid 2px red"
	}
}

newAddOk.onclick = addNewLink

init()

loadTile()

newPaste.onclick = e => {
	navigator.clipboard
		.readText()
		.then(text => {
			newUrl.value = text
		})
		.catch(err => {
			console.error("Failed to read clipboard contents: ", err)
		})
}

newUrl.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    newAddOk.click();
  }
});

newTitle.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    newAddOk.click();
  }
});


add.onclick = e => {
	newPanel.style.display = "flex"
}
clear.onclick = e => {
	clearConfirmPanel.style.display = 'flex'
}
confirmClear.onclick = e => {
	links = []
	save()
	location.reload()
}