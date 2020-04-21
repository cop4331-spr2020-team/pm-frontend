import React, { useState, useEffect } from 'react';
import Violations from './Violations.js';
import Paginating from './Paginating';
import {Input, FormGroup, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import './cards.css';
import { Button, Form,Modal, ModalBody,Label } from 'reactstrap';

let s;

const ViolationPage = () => {
    const [violations, setViolations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [violationsPerPage] = useState(4);

    const [searchTerm, setSearchTerm] = useState("");               // Search input
    const [search, setSearch] = useState("false");                  // Search Button

    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState(0);                    // Selected ticket to edit
    const [selectedLicensePlate, setPlate] = useState("");          // along with 5 parameters to can be changed
    const [selectedViolationType, setViolationType] = useState("");
    const [selectedLocation, setLocation] = useState("");
    const [selectedStatus, setStatus] = useState("");
    const [selectedDescription, setDescription] = useState("");

    const [aViolation, setAViolation] = useState([]);
    const [loggedIn, setloggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [edited, setEdited] = useState(false);

    const [counter, setCounter] = React.useState(0);
    

    // Emulate componentDidMount()
    React.useEffect(() => {
        s = setInterval(() => {
          setCounter(state => (state +1));
        }, 1000);
      }, []);


    useEffect(() => {

        // Get all tickets
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const res = await axios.get('http://api.parkingmanagerapp.com/tickets/query',{ withCredentials: true,
                    params: {
                        _userId: [userId]
                    }
                })
                if(res.status == 200) {
                    setLoading(false);
                    setViolations(res.data.docs.filter(violation => violation._id.includes(searchTerm)));
                    setCurrentPage(1);
                }
                else setloggedIn(false);
            }
            catch(error) {
                console.log(error);
            }
        } 

        // Check if user is logged in
        const getUserInfo = async () => {
            setLoading(true);
            try{
                const res = await axios.get('http://api.parkingmanagerapp.com/auth/user_info',{ withCredentials: true})
                if (res.status != 200){
                    setLoading(false);
                    setloggedIn(false);
                }
                else if(res.data.userId == undefined) {
                    setLoading(false);
                    setloggedIn(false);
                }
                else  {
                    setloggedIn(true);
                    setLoading(false);
                    setUserId(res.data.userId);
                    fetchPosts();
                }
            }
            catch(error) {
                console.log(error);
            }
        } 
        // Check if user token
        if(!loggedIn) {
            //getUserInfo();
        }
        
       // Refresh posts after editing a ticket
        if (edited == true) {
            fetchPosts();
            setEdited(false);
            setModal(false);
        }

        // Sets initial modal information
        if(modal == true){
            setAViolation(violations.filter(function(obj){
                return obj._id == selected;
            }))

            aViolation.map(item=>(
                setPlate(item.license_plate),
                setViolationType(item.violation),
                setLocation(item.location),
                setStatus(item.status),
                setDescription(item.description)
            ))
        }

        if(search == true) {
            fetchPosts();
            setSearch(false);
        }

        // To prevent problems with updating page
        if (counter > 8) {
            clearInterval(s);
        }
       

    }, [search, modal, counter, edited]);

    const handleChange = event => { 
        setSearchTerm(event.target.value);
    }

    const changePlate = event => { 
        setPlate(event.target.value);
    }

    const changeViolaType = event => { 
        setViolationType(event.target.value);
    }

    const changeLocation = event => {
        setLocation(event.target.value);
    }

    const changeStatus = event => {
        setStatus(event.target.value);
    }

    const changeDescription = event => {
        setDescription(event.target.value);
    }
    // Request to edit a ticket
    const editViolation = (event) => {
 
        axios.post(`http://api.parkingmanagerapp.com/tickets/${selected}`, { 
            withCredentials:true,
            license_plate: selectedLicensePlate,
            violation: selectedViolationType,
            description: selectedDescription,
            location: selectedLocation,
            status: selectedStatus    
        })
		.then(result => {
			if (result.status === 200) {
                console.log('success');
                setEdited(true);
            }
		})
		.catch(error => {
            console.log('fail');
		});
    }   
    
    // Get current posts for pagination
    const indexOfLastViolation = currentPage * violationsPerPage;
    const indexOfFirstViolation = indexOfLastViolation - violationsPerPage;
    const currentViolations = violations.slice(indexOfFirstViolation, indexOfLastViolation)
    

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Sets the ID for the ticket that was selected to be displayed on Modal
    const displayModal = id =>{
        setSelected(id)
        setModal(true)
    };

    if(!loading && !loggedIn){
        return <Redirect to ='/login' />
    }
        return (
            <div className="container-fluid">
                <div className="container row pb-2 m-1">    
                    <Input  // Search Bar
                        className="col-lg-3 rounded-0"
                        type="text"
                        placeholder=" Search by Ticket ID"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <Button className="btn-warning" onClick={() => setSearch(true)}>Search</Button>

                </div>
                <Violations violations={currentViolations} loading={loading} modal={displayModal}/> {/*load in tickets 4 at a time */}  
                            
                <div className="mt-3">
                    <Paginating // Pagination component
                        violationsPerPage={violationsPerPage} 
                        totalViolations={violations.length} 
                        paginate={paginate} 
                        currentPage={currentPage}
                    />
                </div>
                
                <Modal isOpen={modal}>
                    <ModalBody>
                            <Form>
                                <h3 className="text-center pb-2 pt-2 font-weight-bold "> Modify </h3>
                                <FormGroup>
                                    <Label>License Plate</Label>
                                    <Input
                                        name="licensePlate"
                                        className="text"
                                        type="text"
                                        value={selectedLicensePlate}
                                        onChange={changePlate}
                                        />
                                </FormGroup>
                                 <FormGroup>
                                    <Label>Violation Type</Label>
                                    <Input
                                        name="violationType"
                                        className="text"
                                        type="select"
                                        value={selectedViolationType}
                                        onChange={changeViolaType}
                                        >
                                        <option>Expired Tag</option>
                                        <option>No Tag</option>
                                        <option>Improper Parking</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Location</Label>
                                    <Input
                                        name="location"
                                        className="text"
                                        type="select"
                                        value={selectedLocation}
                                        onChange={changeLocation}
                                        >
                                        <option>Garage A</option>
                                        <option>Garage B</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Status</Label>
                                    <Input
                                        name="status"
                                        className="text"
                                        type="select"
                                        value={selectedStatus}
                                        onChange={changeStatus}
                                        >
                                        <option>Rejected</option>
                                        <option>Submitted</option>
                                        <option>Completed</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input
                                        name="licensePlate"
                                        className="text"
                                        type="textarea"
                                        value={selectedDescription}
                                        onChange={changeDescription}
                                        />
                                </FormGroup>

                            </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={editViolation}>Apply Changes</Button>
                        <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
 
            </div>
        );
};
   export default ViolationPage;

   