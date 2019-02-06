const http = require ('http');
const request = require('request');
const serverless = require('serverless-http');


_EXTERNAL_URL = ['https://soilhealth.dac.gov.in/HealthCard/CropSet/BindIrrigation?VerificationToken=1HrxvpI4nApv2tOcc-1IwudEKQWicdsZvniLT3NRupq7UtjZyrKi3lbS0IziOyCZxHXbPEU5Z8SLrN4OZSZNpNc4AdeCNqrcJcj32f8111I1%2CDtZEChvjqXY6FsKmxt_Qkhej1rrnCOiYJ2kAgILooj97rXsmQzm7R7yDNoFOLlOyUiXwtoQSGnihVA9MiYnhR0Z8fPQ3yYsrCXTFpfXmcZQ1&Sample_Id=&_=1540351237638',
'https://soilhealth.dac.gov.in/HealthCard/CropSet/BindCropGroup?VerificationToken=JRXUnBr5_FkjIplwXz6GiNaYf_FUv1IJL4OYowAQfQURjlBIBE2RQHSONp7CCTD5jFZX5b-Uy2hBog9B93gnmfvuy8CaxwVAb3Rza_nz6go1%2Ci7WBSvZhZxKqLM14s8hGzxs9Ssha5tfeEQcXGjdsoQNuHw3eoSf4rCNbHdHd2bkp-RRT_IsE1_O7VEjN1iItbIKSszd0dDmIMA-x3Kwatjo1&Irrigation_Code=&District_Code=525&_=1540868534072',
'https://soilhealth.dac.gov.in/HealthCard/CropSet/BindCrop?VerificationToken=JRXUnBr5_FkjIplwXz6GiNaYf_FUv1IJL4OYowAQfQURjlBIBE2RQHSONp7CCTD5jFZX5b-Uy2hBog9B93gnmfvuy8CaxwVAb3Rza_nz6go1%2Ci7WBSvZhZxKqLM14s8hGzxs9Ssha5tfeEQcXGjdsoQNuHw3eoSf4rCNbHdHd2bkp-RRT_IsE1_O7VEjN1iItbIKSszd0dDmIMA-x3Kwatjo1&Irrigation_Code=&District_Code=525&_=1540868534073',
'https://soilhealth.dac.gov.in/HealthCard/CropSet/BindSeason?VerificationToken=JRXUnBr5_FkjIplwXz6GiNaYf_FUv1IJL4OYowAQfQURjlBIBE2RQHSONp7CCTD5jFZX5b-Uy2hBog9B93gnmfvuy8CaxwVAb3Rza_nz6go1%2Ci7WBSvZhZxKqLM14s8hGzxs9Ssha5tfeEQcXGjdsoQNuHw3eoSf4rCNbHdHd2bkp-RRT_IsE1_O7VEjN1iItbIKSszd0dDmIMA-x3Kwatjo1&_=1540868534074',
'https://soilhealth.dac.gov.in/HealthCard/CropSet/BindSoilType?VerificationToken=JRXUnBr5_FkjIplwXz6GiNaYf_FUv1IJL4OYowAQfQURjlBIBE2RQHSONp7CCTD5jFZX5b-Uy2hBog9B93gnmfvuy8CaxwVAb3Rza_nz6go1%2Ci7WBSvZhZxKqLM14s8hGzxs9Ssha5tfeEQcXGjdsoQNuHw3eoSf4rCNbHdHd2bkp-RRT_IsE1_O7VEjN1iItbIKSszd0dDmIMA-x3Kwatjo1&_=1540868534075',
'https://soilhealth.dac.gov.in/HealthCard/CropSet/BindDuration?VerificationToken=JRXUnBr5_FkjIplwXz6GiNaYf_FUv1IJL4OYowAQfQURjlBIBE2RQHSONp7CCTD5jFZX5b-Uy2hBog9B93gnmfvuy8CaxwVAb3Rza_nz6go1%2Ci7WBSvZhZxKqLM14s8hGzxs9Ssha5tfeEQcXGjdsoQNuHw3eoSf4rCNbHdHd2bkp-RRT_IsE1_O7VEjN1iItbIKSszd0dDmIMA-x3Kwatjo1&_=1540868534076' 
];

const callSHCApi = (externalURL, callback) => {
    request(externalURL, { json: true }, (err, res, body) => {
    if (err) { 
        return callback && callback(err);
     }
    return callback && callback(body);
    });
}



// var test = (event, context, callback) => {
// 	var resJSON = callSHCApi ( function (res) {
// 			return JSON.stringify(res);
// 		});
// 	const response = {
// 		statusCode: 200,
// 		body: resJSON,
// 	};
// 	callback && callback (null, response);
// };


var test = (req, res) => {
	if (req.url == "/irrigation"){
		callSHCApi (_EXTERNAL_URL[0], function (response){
			res.write(JSON.stringify(response));
        	res.end();
		});
	}
	if (req.url == "/cropGroup"){
		callSHCApi (_EXTERNAL_URL[1], function (response){
			res.write(JSON.stringify(response));
        	res.end();
		});
	}
	if (req.url == "/crop"){
		callSHCApi (_EXTERNAL_URL[2], function (response){
			res.write(JSON.stringify(response));
        	res.end();
		});
	}
	if (req.url == "/season"){
		callSHCApi (_EXTERNAL_URL[3], function (response){
			res.write(JSON.stringify(response));
        	res.end();
		});
	}
	if (req.url == "/soilType"){
		callSHCApi (_EXTERNAL_URL[4], function (response){
			res.write(JSON.stringify(response));
        	res.end();
		});
	}
	if (req.url == "/duration"){
		callSHCApi (_EXTERNAL_URL[5], function (response){
			res.write(JSON.stringify(response));
        	res.end();
		});
	}
};
module.exports.handler = serverless(test);




// if(req.url === "/crop"){
//             apiCallCrop.callApi(function(response){
//                 //console.log(JSON.stringify(response));
//                 res.write(JSON.stringify(response));
//                 res.end();
//             });
//         }
//         if(req.url === "/season"){
//             apiCallSeason.callApi(function(response){
//                 //console.log(JSON.stringify(response));
//                 res.write(JSON.stringify(response));
//                 res.end();
//             });
//         }
//         if(req.url === "/soilType"){
//             apiCallSoilType.callApi(function(response){
//                 //console.log(JSON.stringify(response));
//                 res.write(JSON.stringify(response));
//                 res.end();
//             });