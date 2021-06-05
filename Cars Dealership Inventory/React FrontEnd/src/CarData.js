import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-modal'

class CarData extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            val: -1,
            isInsertOpen: false,
            isUpdateOpen: false,
            car: '',
            company: ''
        }
    }

    async getData() {
        this.setState({
            data: [],
			val:-1
        })
        const response = await fetch("http://localhost:8080/BSEF18M015-ReactAjax/data");
        const res = await response.json();
        this.setState({
            data: res.data
        })
    }

    componentDidMount() {
        this.getData();
    }

    handleChange = (e) => {
        this.setState({
            val: e.target.value
        })
    };

    render() {
        return (
            <React.Fragment>
                <h1 style={{
                    marginLeft: "100px",
                    marginRight: "100px",
                    textAlign: "center",
                    background: "linear-gradient(to bottom, #ff9900 0%, #ffff00 100%)",
                    border: "1px",
                    borderRadius: "10px",
                }}>WELCOME TO CARS DATABASE!</h1>
                <br/>
                <div class="container" style={{
                    padding: "20px",
                    border: "1px",
                    borderRadius: "10px"
                }}>
                    <div style={{height:"250px",overflow:"auto"}}>
                    <table class="table table-dark">
                        <tr>
                            <th>Car</th>
                            <th>Company</th>
                            <th>Update/Delete</th>
                        </tr>
                        {
                            this.state.data.map((item) => {
                                return (
                                    <tr>
                                        <td id={"name" + item.id}>{item.name}</td>
                                        <td id={"company" + item.id}>{item.company}</td>
                                        <td><input type="radio" value={item.id} name="options"
                                                   onChange={this.handleChange}/></td>
                                    </tr>
                                )
                            })

                        }
                    </table>
                    </div>
                    <br/><br/>
                    <button class="btn btn-danger" onClick={async () => {
                        let value = this.state.val;
                        if (value == -1) {
                            alert("Please Select an option");
                        } else {
                            await fetch(`http://localhost:8080/BSEF18M015-ReactAjax/delete?id=${value}`)
                            this.getData();
                            this.setState({
                                val: -1
                            })
                        }
                    }}>DELETE
                    </button>
                    <span> </span>
                    <button class="btn btn-success" onClick={() => {
                        this.setState({
                            car: '',
                            company: ''
                        })

                        this.setState({
                            isInsertOpen: true
                        })
                    }}>Insert
                    </button>

                    <span> </span>

                    <button  class="btn btn-info" onClick={() => {
                        if (this.state.val == -1) {
                            alert("Please Select an option");
                        } else {
                            this.setState({
                                car: document.getElementById(`name${this.state.val}`).textContent,
                                company: document.getElementById(`company${this.state.val}`).textContent
                            })
                            this.setState({
                                isUpdateOpen: true,
                            })
                        }

                    }}>Update
                    </button>
                </div>


                <Modal isOpen={this.state.isInsertOpen} style={
                    { content: {background: "linear-gradient(to bottom, #ff9900 0%, #ffff00 100%)"} }}>
                    <h3>Insert Record</h3>
                    <div className="form-group">
                        <label>Car Name:</label> <input type='text'  class="form-control" placeholder='Enter Car Name' value={this.state.car} onChange={(e) => {
                    this.setState({
                        car: e.target.value
                    })
                }}/><br/>
                        <label>Company:</label> <input type='text'  class="form-control" placeholder='Enter Company Name' value={this.state.company}
                                    onChange={(e) => {
                                        this.setState({
                                            company: e.target.value
                                        })
                                    }}/><br/>
                    </div>
                    <button className="btn btn-success" style={{marginRight:"20px"}} onClick={async () => {
                        var carName = this.state.car
                        var company = this.state.company
                        if (carName === "" || company === "") {
                            alert("Please Enter Valid Input name and company");
                        } else {
                            await fetch(`http://localhost:8080/BSEF18M015-ReactAjax/insert?CarName=${carName}&company=${company}`);
                            this.getData();
                            this.setState({
                                company: ''
                            })
                            this.setState({
                                car: ''
                            })
                            alert("Car Info added Successfully")
                        }
                    }}>INSERT
                    </button>
                    <button class="btn btn-secondary"  onClick={() => {
                        this.setState({
                            isInsertOpen: false
                        })
                    }}>
                        Back
                    </button>
                </Modal>

                <Modal isOpen={this.state.isUpdateOpen}style={
                    { content: {background: "linear-gradient(to bottom, #ff9900 0%, #ffff00 100%)"} }}>
                    <h3>Update Record</h3>

                    <div className="form-group">
                        <label>Car Name:</label> <input type='text' class="form-control" placeholder='Enter Updated Car Name' value={this.state.car}
                                     onChange={(e) => {
                                         this.setState({
                                             car: e.target.value
                                         })
                                     }}/><br/>
                        <label> Company:</label> <input type='text' class="form-control"  placeholder='Enter Updated Company Name' value={this.state.company}
                                    onChange={(e) => {
                                        this.setState({
                                            company: e.target.value
                                        })
                                    }}/><br/>
                    </div>

                    <button className="btn btn-info" style={{marginRight:"20px"}} onClick={async () => {
                        let carId = `name${this.state.val}`;
                        let companyId = `company${this.state.val}`;
                        var carName = this.state.car;
                        var company = this.state.company;
                        if (carName === "" || company === "") {
                            alert("Please Enter Valid Input name and company");
                        } else {
                            await fetch(`http://localhost:8080/BSEF18M015-ReactAjax/update?id=${this.state.val}&updatedName=${carName}&updatedCompany=${company}`);
                            this.getData();
                            alert("Car Info Updated Successfully")
                        }

                    }}>Update
                    </button>
                    <button class="btn btn-secondary" onClick={() => {
                        this.setState({
                            isUpdateOpen: false
                        })
                    }}>
                        Back
                    </button>
                </Modal>

            </React.Fragment>
        )
    }

}

export default CarData;