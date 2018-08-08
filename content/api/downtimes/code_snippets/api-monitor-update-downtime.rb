require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Update downtime
stagingDowntimes = []
downtimes = dog.get_all_downtimes()
downtimes[1].each do |item |
        print item['scope']
if item['scope'] == ['env:staging']
stagingDowntimes.push item
end

end

dog.update_downtime(stagingDowntimes[0]['id'], :scope => 'env:testing', :end => Time.now.to_i + 60000, :message => "Doing some testing on staging.")