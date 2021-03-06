let storedCrews = localStorage.getItem("crews");
if (!storedCrews) {
  console.log("Init crews")
  localStorage.setItem("crews", JSON.stringify([]))
  storedCrews = localStorage.getItem("crews")
}

let save = (crews) => {
  if (Array.isArray(crews)) {
    localStorage.setItem("crews", JSON.stringify(crews))
  }
}

let exportCrew = (id) => {
  let str = JSON.stringify(store.crews.find(c => c.id === id))
  return btoa(str)
}

let importCrew = (str) => {
  if (str && str.name && str.faction && str.id) {
    save(str)
    return str
  } else if (str) {
    let crew = JSON.parse(atob(str))
    if (crew.name && crew.faction && crew.id) {
      store.crews.push(crew)
      save(store.crews)
      return crew
    }
  }
}

export var store = {crews: JSON.parse(storedCrews), save, exportCrew, importCrew}