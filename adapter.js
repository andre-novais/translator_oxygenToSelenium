

const {Builder, By, Key, until} = require('selenium-webdriver');

class Adapter {
    constructor(caps){
        this.driver = new Builder()
            .withCapabilities(caps)
            .build()
    }
    open(url){
        this.driver.get(url)
    }
    waitForExist(elemAdjEqualsDescription){
        let byFunc = this._byFuncFactory(elemAdjEqualsDescription)
        this.driver.wait(until.elementLocated(byFunc))
    }
    waitForValue(elemAdjEqualsDescription, value){
        let byFunc = this._byFuncFactory(elemAdjEqualsDescription)
        this.driver.wait(until.elementTextIs(byFunc,value)).click()
    }
    type(elemAdjEqualsDescription, value){
        let byFunc = this._byFuncFactory(elemAdjEqualsDescription)
        this.driver.wait(until.elementLocated(byFunc)).sendKeys(value)
    }
    click(elemAdjEqualsDescription){
        let byFunc = this._byFuncFactory(elemAdjEqualsDescription)
        this.driver.wait(until.elementLocated(byFunc)).click()
    }
    selectWindow(titleName){
        this.driver.switchTo().window(titleName)
    }
    assertText(elemAdjEqualsDescription, value){
        let byFunc = this._byFuncFactory(elemAdjEqualsDescription)
        this.driver.wait(until.elementTextIs(byFunc,value))
    }
    quit(){
        this.driver.quit().then(()=>{
            return true
        })
    }
    _splitAdjDescription(adjEqualsDescription){
        let res = adjEqualsDescription.split("=")
        return res
    }
    _byFuncFactory(elemAdjEqualsDescription){
        if(elemAdjEqualsDescription.split('=').length == 1){
            return By.xpath(elemAdjEqualsDescription)
        }
        let [adj, description] = this._splitAdjDescription(elemAdjEqualsDescription)
        if(adj=='name'){
            return By.name(description)
        }
        if(adj=='id'){
            return By.id(description)
        }
        else{
            return By.xpath(description)
        }
    }
}

module.exports = Adapter