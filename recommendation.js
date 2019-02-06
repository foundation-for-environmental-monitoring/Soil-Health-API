var webdriver = require ('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
//var path = require('chromedriver').path;

var service = new chrome.ServiceBuilder("./node_modules/chromedriver/lib/chromedriver/chromedriver.exe").build();
chrome.setDefaultService(service);

var By = webdriver.By;

const screen = {
  width: 640,
  height: 480
};

var driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen))
.build();


/*function main (N, P, K, callback) {
	driver.get('https://soilhealth.dac.gov.in/calculator/calculator');
	pause (5, fillValues.bind(null, N, P, K, async function(response){
		await console.log(response);
		return callback(response);
	}));
	}*/
	

function pause (time, funcName){
	setTimeout(funcName, time*1000);
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    });
}

function quitDriver() {
	driver.close();
	driver.quit();
}

async function fillValues (N, P, K, callback) {
	driver.get('https://soilhealth.dac.gov.in/calculator/calculator');
	await sleep(5000);
	let returnObj = {};
	let reco1 = {};
	let reco2 = {};
	let fertilizerPath = ['//*[@id="C1F1"]/option[@value="1$11$46.0000$0.0000$0.0000"]', '//*[@id="C1F2"]/option[@value="2$12$0.0000$16.0000$0.0000"]', '//*[@id="C1F3"]/option[@value="3$19$0.0000$0.0000$60.0000"]'];
	let fertilizerPath2 = ['//*[@id="C2F1"]/option[@value="5$39$16.0000$44.0000$0.0000"]', '//*[@id="C2F2"]/option[@value="1$11$46.0000$0.0000$0.0000"]', '//*[@id="C2F3"]/option[@value="3$19$0.0000$0.0000$60.0000"]'];
	let dosagePath = ['//*[@id="Comb1_Fert1_Rec_dose1"]', '//*[@id="Comb1_Fert2_Rec_dose1"]', '//*[@id="Comb1_Fert3_Rec_dose1"]'];
	let dosagePath2 = ['//*[@id="Comb2_Fert1_Rec_dose1"]', '//*[@id="Comb2_Fert2_Rec_dose1"]', '//*[@id="Comb2_Fert3_Rec_dose1"]'];
	let fertilizer = [];
	let dosage = [];
	let fertilizer2 = [];
	let dosage2 = [];

	driver.findElement(By.xpath('//*[@id="State_Code"]/option[@value="27"]')).click();
	await sleep (8000);
	driver.findElement(By.xpath('//*[@id="District_CodeDDL"]/option[@value="525"]')).click();
	driver.findElement(By.xpath('//*[@id="N"]')).sendKeys(N);
	driver.findElement(By.xpath('//*[@id="P"]')).sendKeys(P);
	driver.findElement(By.xpath('//*[@id="K"]')).sendKeys(K);
	await sleep (2000);
	driver.findElement(By.xpath('//*[@id="PrintDiv"]/center[1]/table/tbody/tr[5]/td/input')).click();
	await sleep (2000);
	driver.findElement(By.xpath('//*[@id="Group_Code"]/option[@value="1"]')).click();
	await sleep (2000);
	driver.findElement(By.xpath('//*[@id="Crop_Code"]/option[@value="3"]')).click();
	await sleep (2000);
	driver.findElement(By.xpath('//*[@id="AddCrop"]')).click();
	await sleep (1000);
	
	for (var i = 0; i < fertilizerPath.length; i++) {

		driver.findElement(By.xpath(fertilizerPath[i])).getText().then(function(text){
			fertilizer.push(text);
		});

		driver.findElement(By.xpath(dosagePath[i])).getAttribute('value').then(function(text){
			dosage.push(text);
		});
	}

	for (var i = 0; i < fertilizerPath2.length; i++) {

		driver.findElement(By.xpath(fertilizerPath2[i])).getText().then(function(text){
			fertilizer2.push(text);
		});

		driver.findElement(By.xpath(dosagePath2[i])).getAttribute('value').then(function(text){
			dosage2.push(text);
		});
	}
	await sleep (1000);

	reco1 = dosage.map(function(obj,index){
  		var tempObj = {};
  		tempObj[fertilizer[index]] = obj;
  		return tempObj;
	});

	reco2 = dosage2.map(function(obj,index){
  		var tempObj = {};
  		tempObj[fertilizer2[index]] = obj;
  		return tempObj;
	});
	
	returnObj = {"1" : reco1, "2": reco2};
	//console.log(reco1);
	pause(20, quitDriver);
	
	callback(JSON.stringify(returnObj));
	//return Promise.resolve(reco1);
	/*return new Promise(resolve => {
		JSON.stringify(reco1);
		resolve();	
	});*/
}

module.exports = { fillValues };

