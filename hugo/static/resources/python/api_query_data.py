from datadog import initialize, api
from time import time
from json import dump

options = {'api_key': '<YOUR_DD_API_KEY>',
           'app_key': '<YOUR_DD_APP_KEY>'}

initialize(**options)

end = int(time())  # Specify the time period over which you want to fetch the data in seconds
start = end - 3600

query = 'system.cpu.idle{*}'  # Enter the metric you want, see your list here: https://app.datadoghq.com/metric/summary.
                              # Optionally, enter your host to filter the data, see here: https://app.datadoghq.com/infrastructure

results = api.Metric.query(start=start, end=end, query=query)

with open("output.json", "w") as f:
  dump(results, f)
  # This creates a file named output.json in the current folder
