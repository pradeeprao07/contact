import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
    const [phoneNum, setPhoneNum] = useState('')
    const [addNum, setAddNum] = useState([])
    const [phoneNumID, setPhoneNumID] = useState(null)

    function addPhoneNum() {
        if (phoneNum.trim() == '') {
            toast.error('Please enter the number')
        } else if (parseInt(phoneNum) && phoneNum.length === 10) {
            const newID = { id: uuidv4(), value: phoneNum }
            setAddNum(copyOfNumber => [...copyOfNumber, newID])
            toast.success('Number has been added successfully')
            setPhoneNum('')
        } else {
            toast.error('Invalid number')
        }
    }

    function deletePhoneNum(removeNumber) {
        setAddNum(addNum.filter((number) => number.id !== removeNumber.id))
        toast.success('Number has been Deleted')
    }

    function handleUpdate(phoneNumID) {
        const updatedNum = addNum.find(number => number.id == phoneNumID);
        if (updatedNum) {
            setPhoneNum(updatedNum.value)
        }
    }

    function saveUpdatedNum() {
        const updatedNum = addNum.map((number => number.id == phoneNumID ? { ...number, value: phoneNum } : number))
        console.log(updatedNum)
        setAddNum(updatedNum)
        setPhoneNum('')
        setPhoneNumID(null)
        toast.success('Number has been Updated')
    }

    return (   
        <div className="mainPage">
            <ToastContainer />
            <div className="inputSection">
                <input
                    type="text"
                    value={phoneNum}
                    placeholder="Enter the number....."
                    onChange={(e) => { setPhoneNum(e.target.value) }}
                />
                {phoneNumID ? (<Button className='submitBtn' type="primary" onClick={saveUpdatedNum}>Update</Button>) :
                    (<Button className='submitBtn' type="primary" onClick={addPhoneNum}>Add</Button>)}
            </div>
            <div className="contactList">
                {addNum.map((data) => (
                    <div key={data.id} className="contact">
                        <div className="contactDetails">
                            <ImProfile className="phoneIcon" />{data.value}
                        </div>
                        <div className="formatButtons">
                            <AiTwotoneDelete className="deleteIcon" onClick={() => { deletePhoneNum(data) }}>Delete</AiTwotoneDelete>
                            <MdOutlineUpdate className="updateIcon" onClick={() => { handleUpdate(data.id) }}>Update</MdOutlineUpdate>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

