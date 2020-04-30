let assert = require("assert")
let capabilities = require('../conf/parallel.conf').capabilities

let Adapter = require('../adapter');


capabilities.forEach(function(caps){
    Adapter = require('../adapter')
    describe(`UI tests for ${caps.browserName}`, function(done){
        let web;
        before(()=>{
            web = new Adapter(caps);
        })
        describe('dummy tests', function(){
            it('should make the dummy go dummy', async function(){
                web.open('http://localhost:3001/employees/sign_in');
                web.waitForExist('name=commit');
                web.waitForValue('name=commit', 'Entrar');
                web.type('id=employee_email', 'andre@marche.com.br');
                web.type('id=employee_password', 'senhas');
                web.click('//div[2]');
                web.click('name=commit');
                web.selectWindow('title=Betaops');
                web.click('//div[1]/div/a/p[1]');
                web.selectWindow('title=Betaops');
                web.assertText('//a[contains(text(),\'Empacotar\')]', 'Empacotar')
                await web.quit()           
            })
        })
    })

})


