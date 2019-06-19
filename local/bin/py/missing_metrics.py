import datadog
from datadog import initialize, api
import time
import os
import glob
import csv

def get_csv_metrics(env):
  csv_files = glob.glob(env + 'integration/*/*metadata.csv')

  csv_metrics = {}
  for csv_file in csv_files:
    with open(csv_file, 'rb') as c_file:
      csv_reader = csv.reader(c_file, delimiter=',')
      for row in csv_reader:
        if len(row) > 0:
          if row[0] != 'metric_name':
            csv_metrics[row[0]] = 1
  return csv_metrics

def get_dd_metrics(csv_metrics):
  cloud = ('aws','azure', 'gcp') # tuple
  ignore = ['isatap', '.p90', '.p95', '.p99', 'gcp.logging.user.', 'gcp.custom.']

  # Datadog Demo account
  options = {
      'api_key': 'x', #
      'app_key': 'x' # ruth-test
  }
  initialize(**options)

  # Taking the last:
  days = 5
  from_time = int(time.time()) - 60 * 60 * 24 * days

  dd_metrics = api.Metric.list(from_time).get('metrics')
  metrics_send = []
  metrics_print = []

  for metric in dd_metrics:
    i = 0
    if metric.startswith(cloud):
      if metric not in csv_metrics:
        for word in ignore:
          if word in metric:
            i = 1
        if i == 0:
          print(metric)
          docs_tags = metric.split('.')
          metrics_send.append({
            'metric': 'docs.missing.metrics',
            'points': 1,
            'tags': ['docs_metric:' + metric, 'docs_cloud:' + docs_tags[0], 'docs_ns:' + docs_tags[1]]
          })
          if metric.startswith(metrics_start_with):
            metrics_print.append(metric)
  print(len(metrics_send))
  return [metrics_send, metrics_print]

def post_dd_metrics(metrics):
# Post to Corpsite Datadog account
  options = {
      'api_key': 'x',
      'app_key': 'x'
  }
  datadog.initialize(**options)
  print(datadog.api.Metric.send(metrics))

if __name__ == '__main__':
  print('Getting csv metrics...')
  csv_metrics = get_csv_metrics(os.environ['DOGWEB'])
  print('Getting dd metrics...')
  metrics = get_dd_metrics(csv_metrics)
  print('Posting dd metrics...')
  post_dd_metrics(metrics[0])
