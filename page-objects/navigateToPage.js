const { client } = require("nightwatch-api")

module.exports= {
    url: 'http://thermofisher.com/',

    elements: {
      
                
    },

    commands:[{

        waitUntilElementVisible(selector,element,timeout,callback){
          return client.waitForElementVisible(selector,element,timeout)
        },

        checkPopup(selector, buttonToClick, callback) {
        
            return client.element('css selector', selector, result => {
              if (results.value.length > 0) { 
                  //popup exists                  
                  client
                  .waitForElementVisible(buttonToClick, 5000)
                  .pause(2000)
                  .click(buttonToClick)
                  console.log("Popup Agreed")
              }
              else
              {
                  console.log("No popup dialogs")
              }
              
            })
          }

    }]
}