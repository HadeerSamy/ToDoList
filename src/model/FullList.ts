import ListItem from './ListItem'

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List {

    //our instance of this class
    static instance: FullList = new FullList()

    //we made the constructor private because we're working with singleton design pattern
    private constructor(private _list : ListItem[]=[]) {}

    
    public get list() : ListItem[] {
        return this._list
    }
    
    load(): void {
        const currentList : string | null = localStorage.getItem("myList")
        if(typeof currentList !== "string")
        {
            return 
        }
        else{
            //json parse to return it to object
            const parsedList : { id:string,item:string,checked:boolean}[] = JSON.parse(currentList)
            parsedList.forEach(itemObj => {
                const newListItem = new ListItem(itemObj.id, itemObj.item, itemObj.checked)
                FullList.instance.addItem(newListItem)
            })
        }
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save()
    }



    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}