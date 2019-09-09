#!/usr/bin/env python3
import tempfile
from datadog import initialize, api
import time
import glob
import platform
import csv
import sys
from optparse import OptionParser

tempdir = (
   "./integrations_data"
)


def get_csv_metrics(tempdir):
  csv_files = glob.glob(tempdir + "/extracted/**/*/*metadata.csv", recursive=True)

  csv_metrics = {}
  for csv_file in csv_files:
    with open(csv_file, 'r') as c_file:
      csv_reader = csv.reader(c_file, delimiter=',')
      for row in csv_reader:
        if len(row) > 0:
          if row[0] != 'metric_name':
            csv_metrics[row[0]] = 1
  return csv_metrics


def get_dd_metrics(csv_metrics, keys):
  cloud = ('aws','azure', 'gcp') # tuple
  ignore = ['isatap', '.p90', '.p95', '.p99', 'gcp.logging.user.', 'gcp.custom.','aws.ec2.iam_credentials_expiration_seconds']

  # Datadog Demo account
  options = {
      'api_key': keys.demoapikey,
      'app_key': keys.demoappkey
  }
  initialize(**options)

  # Taking the last:
  days = 5
  from_time = int(time.time()) - 60 * 60 * 24 * days

  dd_metrics = {}

  try:
    dd_metrics = api.Metric.list(from_time).get('metrics', {})
  except:
    print('\x1b[31mERROR\x1b[0m: There was an error with the Datadog API call, current value of dd_metrics is: \n {}'.format(dd_metrics))

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
          #print(metric)
          docs_tags = metric.split('.')
          metrics_send.append({
            'metric': 'docs.missing.metrics',
            'points': 1,
            'tags': ['docs_metric:' + metric, 'docs_cloud:' + docs_tags[0], 'docs_ns:' + docs_tags[1]]
          })
  #print(len(metrics_send))
  return metrics_send


def post_dd_metrics(metrics, keys):
  # Post to Corpsite Datadog account
  options = {
      'api_key': keys.corpapikey,
      'app_key': keys.corpappkey
  }
  initialize(**options)
  api.Metric.send(metrics)


if __name__ == '__main__':
  print('\x1b[32mINFO\x1b[0m: Getting csv metrics from...')
  #print(tempdir)
  csv_metrics = get_csv_metrics(tempdir)
  #print(csv_metrics)
  print('\x1b[32mINFO\x1b[0m: Parsing keys')
  parser = OptionParser(usage="usage: %prog [options]")
  parser.add_option("-k", "--demoapikey", help="demo api key", default=None)
  parser.add_option("-p", "--demoappkey", help="demo app key", default=None)
  parser.add_option("-a", "--corpapikey", help="corp api key", default=None)
  parser.add_option("-b", "--corpappkey", help="corp app key", default=None)
  options, args = parser.parse_args()
  print('\x1b[32mINFO\x1b[0m: Getting dd metrics...')
  metrics = get_dd_metrics(csv_metrics, options)

  if len(metrics) != 0:
    print('\x1b[32mINFO\x1b[0m: Posting dd metrics...')
    post_dd_metrics(metrics, options)
  else:
    print('\x1b[31mERROR\x1b[0m: List of metrics recovered was empty.')
    sys.exit(1)
