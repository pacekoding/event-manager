const validateEmail = (email) => {
  var res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

const convert = (params) => {

  let number = String(params)
  number = number.replace(/[.]/g,'')
  let	reverse = number.toString().split('').reverse().join('')
	let result = reverse.match(/\d{1,3}/g)
	return result.join('.').split('').reverse().join('')
}

const upload = (input) => {
  return fetch('https://ic-dot-qluster-demo.appspot.com/api/uploads/single',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'enctype': 'multipart/form-data; boundary=Boundary_5_1772902226_1492706774665'
    },
    body: input
  }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error);
    })
}

export {
  validateEmail,
  convert,
  upload
}
