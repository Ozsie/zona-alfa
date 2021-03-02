let storedCrews = localStorage.getItem("crews");
if (!storedCrews) {
  console.log("Init crews")
  localStorage.setItem("crews", JSON.stringify([]))
  storedCrews = localStorage.getItem("crews")
}

let save = (crews) => {
  localStorage.setItem("crews", JSON.stringify(crews))
}

export var store = {crews: JSON.parse(storedCrews), save}