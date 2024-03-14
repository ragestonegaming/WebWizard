import axios from "axios"

const API = "http://127.0.0.1:5000"

export const login = () => {

}

export const predict =async (answers) => {
    try {
    let res = await axios.post(`${API}/predict`, answers)
    console.log("RlllESULT", res)
    let aiRes = await chat({message: res.data.prediction})
    let finalRes = {disease: res?.data?.prediction, aiResult: aiRes?.response};
    console.log(finalRes)
    return finalRes;

    } catch (e) {
        console.log(e)
    }
}

export const chat = async (message) => {
    try {
    let res = await axios.post(`${API}/chat`, message)
    console.log("RESULT", res)
    return res.data;
        
    } catch (error) {
        
    }
}

