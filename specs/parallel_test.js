var assert = require("assert")
var conf_file = process.argv[3] || "conf/parallel.conf.js";

const {Builder, By, Key, until} = require('selenium-webdriver');

var capabilities = require("../" + conf_file).capabilities;

var buildDriver = function(caps) {
  /* console.log(JSON.stringify(caps))
  console.log("http://" +
  LT_USERNAME +
  ":" +
  LT_ACCESS_KEY +
  "@hub.lambdatest.com/wd/hub") */
  return new Builder()
    .usingServer(
      "http://" +
        LT_USERNAME +
        ":" +
        LT_ACCESS_KEY +
        "@hub.lambdatest.com/wd/hub"
    )
    .withCapabilities(caps)
    .build();
};

capabilities.forEach(function(caps) {
 
  describe("Google's Search Functionality for " + caps.browserName, function() {
    var driver;
    this.timeout(0);

    beforeEach(function(done) {
      caps.name = this.currentTest.title;
      done();
    });

    before(function(done){
      driver = buildDriver(caps);
      done();
    })

    it("can get error results for " + caps.browserName, function(done) {
      driver.get('https://www.google.com/')
      driver.get("http://localhost:3001").then(
        ()=>{
          driver.getTitle().then((title)=>{
            assert.equal(title,'Betaops')
            done()
          })
        }
      ).catch(err=>done(err))
      
      });
    it("knows his or hers url", function(done){
      driver.wait(until.urlIs('http://localhost:3001/employees/sign_in'),6000)
      done()
    })
    it('gets 401 on click')

    after(function(done){
      driver.quit().then(()=>done())
    })
    /* afterEach(function(done) {
      if (this.currentTest.isPassed) {
        driver.executeScript("lambda-status=passed");
      } else {
        driver.executeScript("lambda-status=failed");
      }
      driver.quit().then(function() {
        done();
      }); 
    });*/
  });
});
