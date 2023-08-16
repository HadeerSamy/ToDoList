import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'


const fullList = FullList.instance
const template = ListTemplate.instance


//#region 

const addButton = document.querySelector("#addItem") as HTMLButtonElement
const inputText = document.querySelector("#newItem") as HTMLInputElement




addButton.addEventListener("click", (event)=>{
  event.preventDefault();
  //To make sure that there's at least one non-white space
  if(/\S/.test(inputText.value))
  {
    const Id = fullList.list.length?parseInt(fullList.list[fullList.list.length - 1].id) + 1:1

    var newItem = new ListItem(Id.toString(),inputText.value)
    fullList.addItem(newItem)
    template.render(fullList)
    console.log(fullList.list)
  }
  inputText.value= ""
})


  const clearAll = document.getElementById("clearItemsButton") as HTMLButtonElement

  clearAll.addEventListener('click', (): void => {
    fullList.clearList()
    template.clear()
  })


  fullList.load()

  template.render(fullList)

//#endregion



