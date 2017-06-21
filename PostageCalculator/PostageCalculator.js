var PostageCalculatorPage = function () {
  
  var tab_overseas = element(by.className('postage-location__tab__container-international'));
  //this is a tab element obtain by a classname locator
  var txt_from_field  = element(by.model('searchStr'));
  //this is just a element obtain by model locator
  var select_country = element(by.model('searchModel.form.international.to.country')).all(by.tagName('option'));
  //this is a array with all the options from the select
  var btn_go = element(by.id('submit-international'));
  //this is a element obtain by id
  var xpath_select_country_option = '//*[@id="intTo"]/optgroup[2]/option[contains(.,\'Country\')]';
  //this is just a string variable
  var tabs_services = element.all(by.className('postage-service__summary-container'));
  //obtains all the services elements by the class name on a list or array 
  var lbl_international_parcel_service = element(by.className('postage-item'));

    this.get = function() {
      browser.get('https://auspost.com.au/parcels-mail/calculate-postage-delivery-times/#/');           
    }
    //this return the driver on the specify url

    this.send_over_seas = function (from,to) {
      tab_overseas.click();
      //click on tab panel overseas
      txt_from_field.sendKeys(from);
      //writes on field the from string content
      var xpath_country_option = xpath_select_country_option.replace('Country',to);
      //replaces the Country word by the entered text
      var country_element = element(by.xpath(xpath_country_option));
      //obtains the select option by the xpath
      country_element.click();
      //clicks on the country option in order to select it
      btn_go.click();
      //click on go button
    };
    // this method select the option that contains the enter country

    this.international_parcel_displayed = function(){
      return lbl_international_parcel_service.isDisplayed();
    };
    //this method return if the parcel text is diplayed

    this.get_service_price_by_own_package = function(service){
      var service_element = tabs_services.filter(function(elem, index) {
          return elem.getText().then(function(text) {
            return text.includes(service); 
            // return if a service contains the expected text, if true it'll be store on the answered element array 
            //filter protractor function returns a array that complies on the function passed as parameter.
          });
        }).first(); 
        //obtains all elements that complies filter with , the filter applies a function where its define the filter logic, obtains the first one 
      service_element.click();
      //clicks element
      return service_element.getText();  
      //returns the text of the selected element that complies filter with 
    };


};


describe('PostageCalculator Test', function() {
  
  var postageCalculatorPage = new PostageCalculatorPage(); 
  //creates a postageCalculatorPage Page Object
  postageCalculatorPage.get();
  //load the web driver on the defined url
  
  it('Sending a package from SIDONIA to Colombia it should display the parcel services', function() {
    postageCalculatorPage.send_over_seas('SIDONIA VIC 3444','Colombia');
    expect(postageCalculatorPage.international_parcel_displayed()).toBeTruthy();
  });// asserts than its shown the parcel services

  it('Capture the express service price', function() {
    var service_text = postageCalculatorPage.get_service_price_by_own_package('Express'); //store the returned text on the   
    expect(service_text).toContain('Box');
    expect(service_text).toContain('$150.29');
  });//asserts than a value its contained on the service text


});




