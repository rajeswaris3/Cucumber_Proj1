const { client } = require('nightwatch-api')
const { Given, Then, When } = require('@cucumber/cucumber')
const page = client.page.navigateToPage();

const agreeButton = '.call[role="button"]'
const manualTablePath = '//table[@class="manual-grid ng-scope"]'
const tableColPath = '/thead/tr/td'
const tableRowPath = '/tbody/tr'
const headerTextClass = '.manual-grid.ng-scope thead td .grid-header'

const expectedColValues = []
const actualColValues = []


Given(/^I open Thermo Fisher's home page$/, () => {
  return page   
    .navigate() 
    .waitUntilElementVisible('css selector','body', 2000) 
});

Then(/^the title is "([^"]*)"$/, title => {

  return client
  .windowMaximize()
  .assert.title(title)
  .frame(1) 
  .waitForElementVisible(agreeButton, 5000)
  .click(agreeButton)  
  .pause(3000)
});

Then(/^the Thermo Fisher quick order link exists$/,()=> {  

    return client
    .waitForElementVisible('body',3000)    
    .assert.visible('#hfQuickOrderLink')    
    .click('#hfQuickOrderLink')        
    .waitForElementVisible('body',3000)    
    .assert.urlEquals('https://www.thermofisher.com/store/quick-order', "Navigation to Quick order successful.")

});

Then(/^the Manual entry has (.+) columns and (.+) rows$/, function(cntCols, cntRows) { 

  return client
  
    .elements('xpath', manualTablePath,()=> {
      //get column elements
      client.elements('xpath', tableColPath,function(result){
        if(result.value=cntCols)
        {
            console.log('Column count match as expected :', result.value)  
        } 
        else
        {
          console.error('Column count doesnot match: Expected : ', +cntCols + '. Retrieved: ' +result.value)
        } 
      })    
      //get row elements
      result = client.elements('xpath', tableRowPath)      
      if(result.value=cntRows)
      {
        console.log('Row count match as expected :', result.value)
      }
      else
      {
        console.error('Row count doesnot match: Expected : ', +cntRows + '. Retrieved: ' +result.value)
      }   
    })  
     
});

Then(/^the expected manual table header is:$/,function(table) { 

  table.rows().map(function(row) {
    expectedColValues.push(row[0])
      console.log(row[0])
  })

  return client
  .elements('css selector', headerTextClass, function (elements) {
    elements.value.forEach(function (elementsObj) {
        client.elementIdText(elementsObj.ELEMENT, function (result) {
         //store retrieved column names excluding special characters
         if(result.value!=='null' ||  result.value!== undefined)
         {
          actualColValues.push(result.value.replace(/[^a-zA-Z0-9 ]/g, ""))
          console.log(result.value )
         }
          
        })
    })

  }) 

});

Then(/^the column header matches as expected$/,()=> {  

  if (actualColValues.length == expectedColValues.length) {
    for (var i = 0; i < expectedColValues.length; i++) {
      if(expectedColValues[i]==actualColValues[i])
      {
        console.log('Column header matches. ' + 'Expected: ' + expectedColValues[i] + ', Retrieved: ' + actualColValues[i])
      }
      else
      {        
        console.error('Column header doesnot match. ' + 'Expected: ' + expectedColValues[i] + ', Retrieved: ' + actualColValues[i])
      }
    }
  }
  else
  {
    console.error('Not all Column names retrieved from Web/Matching as expected.') 
  }

  return client
});
