require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

public_id='<SYNTHETICS_TEST_PUBLIC_ID>'

### To create an API test

api_type = 'api'
api_config = {config:{assertions:[{operator:'is',type:'statusCode',target:403},{operator:'is',property:'content-type',type:'header',target:'text/html'},{operator:'lessThan',type:'responseTime',target:2000}],request:{method:'GET',url:'https://datadoghq.com',timeout:30,headers:{header1:'value1',header2:'value2'},body:'body to send with the request'}},locations:['aws:us-east-2','aws:eu-central-1','aws:ca-central-1','aws:eu-west-2','aws:ap-northeast-1','aws:us-west-2','aws:ap-southeast-2'],message:'test',name:'Test',tags:['foo:bar']}
api_options = {options:{tick_every:60,min_failure_duration:0,min_location_failed:1,follow_redirects:true}}

dog.update_synthetics_test('test_id' => public_id, 'type' => api_type , 'config' => api_config , 'options' => api_options)
