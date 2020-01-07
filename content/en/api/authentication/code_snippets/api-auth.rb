require 'rubygems'
require 'dogapi'

dog = Dogapi::Client.new(:api_key => '<DATADOG_API_KEY>', :application_key => '<DATADOG_APPLICATION_KEY>', :endpoint => 'https://api.datadoghq.com')
