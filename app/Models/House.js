export class House {
    constructor(data){
        this.id = data.id
        this.bathrooms = data.bathrooms
        this.bedrooms = data.bedrooms
        this.description = data.description
        this.imgUrl = data.imgUrl
        this.levels = data.levels
        this.price = data.price
        this.year = data.year
    }

    
    get HouseCard() {
        return `
        <div class="col-md-4 mb-3">
            <div class="card">
                <img src="${this.imgUrl}" class="card-img-top house-img" alt="house">
                <div class="card-body">
                <div class="card-title fs-5">${this.bedrooms} Beds | ${this.bathrooms} Baths | ${this.levels} Story</div>
                <p><b>Price: $${this.price}</b></p>
                <p>Year: ${this.year}</p>
                <p>${this.description ? this.description : "It's a house"}</p>
                <div class="d-flex justify-content-between">
                <button class="btn btn-danger" type="button" onclick="app.housesController.removeHouse('${this.id}')">Delete House</button>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning" type="button" onclick="app.housesController.drawForm('${this.id}')">Edit House</button>
                </div>
                </div>
            </div>
        </div>
        `
    }

    static FormButton() {
        return `
        <button onclick="" class="btn btn-success ms-3 mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="mdi mdi-plus"></i>
        </button>
        `
    }

    static HouseForm(editable){
        if(!editable.id){
            editable = new House({
                bathrooms: '',
                bedrooms: '',
                description: '',
                imgUrl: '',
                levels: '',
                price: '',
                year: '',
            })
        }
        return `
        <div class="modal-content">
            <div class ="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">List a new house</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form ${editable.id ? `onsubmit="app.housesController.editHouse('${editable.id}')"` : 'onsubmit="app.housesController.createHouse()"'}>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="bedrooms" class="form-label">Bedrooms</label>
                        <input required type="number" value="${editable.bedrooms}" class="form-control" id="bedrooms" placeholder="bedrooms" name="bedrooms">
                    </div>
                    <div class="mb-3">
                        <label for="bathrooms" class="form-label">Bathrooms</label>
                        <input required type="number" value="${editable.bathrooms}" class="form-control" id="bathrooms" placeholder="bathrooms" name="bathrooms">
                    </div>
                    <div class="mb-3">
                        <label for="levels" class="form-label">Levels</label>
                        <input required type="number" value="${editable.levels}" class="form-control" id="levels" placeholder="levels" name="levels">
                    </div>
                    <div class="mb-3">
                        <label for="imgUrl" class="form-label">Image</label>
                        <input type="text" value="${editable.imgUrl}" class="form-control" id="imgUrl" placeholder="imgUrl" name="imgUrl">
                    </div>
                    <div class="mb-3">
                        <label for="year" class="form-label">Year</label>
                        <input required type="text" value="${editable.year}" class="form-control" id="year" placeholder="year" name="year">
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Price</label>
                        <input required type="number" value="${editable.number}" class="form-control" id="price" placeholder="price" name="price">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea value="${editable.description}" class="form-control" id="description" placeholder="description" name="description">
                        </textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        `
    }
}