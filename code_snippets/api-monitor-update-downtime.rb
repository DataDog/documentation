require 'rubygems'
require 'dogapi'

api_key = '9775a026f1ca7d1c6c5af9d94d9595a4'
app_key = '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

# Update downtime
stagingDowntimes = []
downtimes = dog.get_all_downtimes()
downtimes[1].each do |item|
  print item['scope']
  if item['scope'] == ['env:staging']
    stagingDowntimes.push item
  end
end

dog.update_downtime(stagingDowntimes[0]['id'], :scope => 'env:testing', :end => Time.now.to_i + 60000, :message => 'Doing some testing on staging.')
