import axios from "axios";

const useFetch = async (url) => {

  try {
    let res = await axios({
        url,
        method: 'get',
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return res.data
}
catch (err) {
    console.error(err);
}
};

export default useFetch;