class LibraryItem{
    id: number
    title: string
    year: number
    author: string
    isAvailable: boolean

    constructor(id: number, title: string, year: number, author: string, isAvailable:  boolean){
        this.id = id
        this.title = title
        this.year = year
        this.author = author
        this.isAvailable = isAvailable
    }

    getInfo(){
        console.log(`TITLE: ${this.title}\n AUTHOR: ${this.author}\n YEAR: ${this.year}\n AVAILABLE: ${this.isAvailable}\n`)
    }
}

class Book extends LibraryItem{
    genre: string
    pages: number

    constructor(id: number, title: string, year: number, author: string, isAvailable:  boolean, genre: string, pages: number){
        super(id, title, year, author, isAvailable)
        this.genre = genre
        this.pages = pages
    }

    getInfo(){
        super.getInfo()
        console.log(` Genre: ${this.genre}\n Pages: ${this.pages}\n`)
    }
}

class Magazine extends LibraryItem{
    issueNumber: number

    constructor(id: number, title: string, year: number, author: string, isAvailable:  boolean, issueNumber: number){
        super(id, title, year, author, isAvailable)
        this.issueNumber = issueNumber
    }

    getInfo(){
        super.getInfo()
        console.log(` Issue Nr: ${this.issueNumber}\n`)
    }
}

class Brochure extends LibraryItem{
    topic: string

    constructor(id: number, title: string, year: number, author: string, isAvailable:  boolean, topic: string){
        super(id, title, year, author, isAvailable)
        this.topic= topic
    }
    getInfo(){
        super.getInfo()
        console.log(` Topic: ${this.topic}\n`)
    }
}

class Library{
    private items: LibraryItem[] = []

    addItem(item: LibraryItem){
        this.items.push(item)
    }

    getAllItems(){
        console.log(this.items)
    }

    filterByAuthor(author: string){
        return console.log('Filtered -> ', this.items.filter(item => item.author === author))
    }
}

const library = new Library()

const book1 = new Book(1, "The Great Gatsby", 1925, "F. Scott Fitzgerald", true, "Classic", 180)
const magazine1 = new Magazine(4, "National Geographic", 2025, "Various", true, 102)
const brochure1 = new Brochure(6, "Healthy Eating", 2023, "WHO", true, "Nutrition")


library.addItem(book1)
library.addItem(magazine1)
library.addItem(brochure1)
// library.getAllItems()
library.filterByAuthor("Various")

// const book2 = new Book(2, "1984", 1949, "George Orwell", false, "Dystopian", 328)
// const book3 = new Book(3, "Clean Code", 2008, "Robert C. Martin", true, "Programming", 464)

// const magazine2 = new Magazine(5, "Time", 2024, "Various", false, 88)

// const brochure2 = new Brochure(7, "Sustainable Living", 2022, "UN", true, "Ecology")