require 'rubygems'
require 'dogapi'

dog = Dogapi::Client.new(:api_key => '<YOUR_API_KEY>', :application_key => '<YOUR_APP_KEY>', :endpoint => 'https://api.datadoghq.com')
