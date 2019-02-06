const http = require ('http'); //internal node module
const request = require('request');//external npm module
const serverless = require('serverless-http');//external npm module
const url = require('url');//internal node module
const querystring = require('querystring');//internal node module
const cp = require('child_process');
const recommendation = require('./recommendation.js');


_EXTERNAL_URL = ['https://soilhealth.dac.gov.in/HealthCard/CropSet/BindIrrigation?VerificationToken=1HrxvpI4nApv2tOcc-1IwudEKQWicdsZvniLT3NRupq7UtjZyrKi3lbS0IziOyCZxHXbPEU5Z8SLrN4OZSZNpNc4AdeCNqrcJcj32f8111I1%2CDtZEChvjqXY6FsKmxt_Qkhej1rrnCOiYJ2kAgILooj97rXsmQzm7R7yDNoFOLlOyUiXwtoQSGnihVA9MiYnhR0Z8fPQ3yYsrCXTFpfXmcZQ1&Sample_Id=&_=1540351237638',
'https://soilhealth.dac.gov.in/HealthCard/CropSet/BindCropGroup?VerificationToken=JRXUnBr5_FkjIplwXz6GiNaYf_FUv1IJL4OYowAQfQURjlBIBE2RQHSONp7CCTD5jFZX5b-Uy2hBog9B93gnmfvuy8CaxwVAb3Rza_nz6go1%2Ci7WBSvZhZxKqLM14s8hGzxs9Ssha5tfeEQcXGjdsoQNuHw3eoSf4rCNbHdHd2bkp-RRT_IsE1_O7VEjN1iItbIKSszd0dDmIMA-x3Kwatjo1&Irrigation_Code=&District_Code=',
'https://soilhealth.dac.gov.in/HealthCard/CropSet/BindCrop?VerificationToken=JRXUnBr5_FkjIplwXz6GiNaYf_FUv1IJL4OYowAQfQURjlBIBE2RQHSONp7CCTD5jFZX5b-Uy2hBog9B93gnmfvuy8CaxwVAb3Rza_nz6go1%2Ci7WBSvZhZxKqLM14s8hGzxs9Ssha5tfeEQcXGjdsoQNuHw3eoSf4rCNbHdHd2bkp-RRT_IsE1_O7VEjN1iItbIKSszd0dDmIMA-x3Kwatjo1&Irrigation_Code=&District_Code=',
'https://soilhealth.dac.gov.in/HealthCard/CropSet/BindSeason?VerificationToken=JRXUnBr5_FkjIplwXz6GiNaYf_FUv1IJL4OYowAQfQURjlBIBE2RQHSONp7CCTD5jFZX5b-Uy2hBog9B93gnmfvuy8CaxwVAb3Rza_nz6go1%2Ci7WBSvZhZxKqLM14s8hGzxs9Ssha5tfeEQcXGjdsoQNuHw3eoSf4rCNbHdHd2bkp-RRT_IsE1_O7VEjN1iItbIKSszd0dDmIMA-x3Kwatjo1&_=1540868534074',
'https://soilhealth.dac.gov.in/HealthCard/CropSet/BindSoilType?VerificationToken=JRXUnBr5_FkjIplwXz6GiNaYf_FUv1IJL4OYowAQfQURjlBIBE2RQHSONp7CCTD5jFZX5b-Uy2hBog9B93gnmfvuy8CaxwVAb3Rza_nz6go1%2Ci7WBSvZhZxKqLM14s8hGzxs9Ssha5tfeEQcXGjdsoQNuHw3eoSf4rCNbHdHd2bkp-RRT_IsE1_O7VEjN1iItbIKSszd0dDmIMA-x3Kwatjo1&_=1540868534075',
'https://soilhealth.dac.gov.in/HealthCard/CropSet/BindDuration?VerificationToken=JRXUnBr5_FkjIplwXz6GiNaYf_FUv1IJL4OYowAQfQURjlBIBE2RQHSONp7CCTD5jFZX5b-Uy2hBog9B93gnmfvuy8CaxwVAb3Rza_nz6go1%2Ci7WBSvZhZxKqLM14s8hGzxs9Ssha5tfeEQcXGjdsoQNuHw3eoSf4rCNbHdHd2bkp-RRT_IsE1_O7VEjN1iItbIKSszd0dDmIMA-x3Kwatjo1&_=1540868534076' 
];

/* 
* 'callSHCApi' sends a request to 'externalURL' 
* it recieves data as JSON which is then sent through in a 'response' object
* this 'response' object is then stringified and written out by the 'res' object of the AWS serverless call within the 'handler' function
*/

const callSHCApi = (externalURL, callback) => {
    request(externalURL, { json: true }, (err, res, body) => {
    if (err) { 
        return callback && callback(err);
     }
    return callback && callback(body);
    });
}

/*
* the 'handler' function serves as the interface between the 'callSHCApi' and AWS
* it also filters data based on endpoints and URL queries
* once data is recieved from the 'callSHCApi' function, it writes the data at the required AWS URL
*/

module.exports.handler = serverless( (req, res) => {

    let district = "525";//default district is Osmanabad, Maharashtra
    let N = 0, P = 0, K = 0; 
    //Parse URL to recieve both endpoints as well as query
    let parsedUrl = url.parse(req.url);  

    //Seperate query from endpoint
    let parsedQs = querystring.parse(parsedUrl.query);

    //verify if URL contains a valid query or not
    if (parsedQs.district){
        district = parsedQs.district;
    }
    if (parsedQs.N && parsedQs.P && parsedQs.K)
    {
        N = parsedQs.N;
        P = parsedQs.P;
        K = parsedQs.K;
    }
    
    //This section decides the data to be returned based on the endpoint and query
    if (req.url == "/irrigation"){
        callSHCApi (_EXTERNAL_URL[0], function (response){
            res.write(JSON.stringify(response));
            res.end();
        });
    }
    if (req.url == "/cropGroup?district="+district || req.url == "/cropGroup"){
        callSHCApi (_EXTERNAL_URL[1]+district+"&_=1540868534072", function (response){
            res.write(JSON.stringify(response));
            res.end();
        });
    }
    if (req.url == "/crop?district="+district || req.url == "/crop"){
        callSHCApi (_EXTERNAL_URL[2]+district+"&_=1540868534073", function (response){
            /*
            *&_=1540868534073 is part of the original url which was removed so that the district filter could be added. It is appended back into the url *in the line above
            */
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
    if (req.url == "/reco?N="+N+"&P="+P+"&K="+K){
        /*cp.exec('node recommendation.js', callback);
        function callback() {
            res.write()
        }*/
        //console.log(N);
        recommendation.fillValues(N, P, K, function (data){
            var response = {
                "isBase64Encoded": false, 
                "statusCode" : 200,
                "headers": {},
                "body": JSON.stringify(data)
            };
            console.log(JSON.stringify(response));
            res.write(JSON.stringify(response));
            res.end();
        });
        
    }
});
