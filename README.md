Bookself API 
======
Bookself api is an api project that can store books containing name, year, author, publisher, number of pages, pages read, and whether the book has been read or not

Prerequisites
=======
dependencies :
-------
* [Eslint](https://www.npmjs.com/package/eslint?activeTab=readme) 
* [nodemon](https://www.npmjs.com/package/nodemon) 
* [Hapi](https://www.npmjs.com/package/@hapi/hapi)  
* [nanoid](https://www.npmjs.com/package/nanoid)  

Installation :
-------
1. Clone this project 
2. Run `npm install` in your terminal 
3. Run `npm run start` in your terminal 
4. open your postman 

How To Use :
-------
####  #Add Some book 
* Method : POST 
* URL : /books 
* Body Request : 

``` 
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

![add new book ](https://user-images.githubusercontent.com/69721453/216074976-e4909e7b-ec7e-4515-b1e9-e0a1d1a0d1e2.jpg)

####  #Get all book 
* Method : GET  
* URL : /books 

![get all books ](https://user-images.githubusercontent.com/69721453/216111537-4216498b-9496-46d9-85b4-2d4c910fa23e.jpg)

if there is no book  you gonna get response body 
```
{
    "status": "success",
    "data": {
        "books": []
    }
}
```
####  #Get detail book 
* Method : GET  
* URL : /books/{Bookid}

![get detailed books ](https://user-images.githubusercontent.com/69721453/216112403-bd5a1304-1cef-4fcc-b81c-b715599ce37a.jpg)

####  # Update book 
* Method : PUT  
* URL : /books/{Bookid}
* Request Body : 
```
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```
![update books ](https://user-images.githubusercontent.com/69721453/216112538-0f15b9f4-ab61-4a39-9d57-f20a755bf46a.jpg)


####  # Delete Book 
* Method : DELETE  
* URL : /books/{Bookid}

![delete books](https://user-images.githubusercontent.com/69721453/216113122-639d1273-71e9-4519-baf5-9202f54d3261.jpg)

Need To Improve : 
---
* Integrated with database
* ui
