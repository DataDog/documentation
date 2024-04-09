#!/usr/bin/env python3
from datadog import initialize, api
import time
import glob
import csv
import os
import sys

TEMPDIR = (
   "./integrations_data"
)

HQ_CREDS = {
    'api_key': os.getenv('DD_HQ_API_KEY'),
    'app_key': os.getenv('DD_HQ_APP_KEY')
}

CORP_CREDS = {
    'api_key': os.getenv('DD_CORP_API_KEY'),
    'app_key': os.getenv('DD_CORP_APP_KEY')
}

def get_csv_metrics(tempdir):
  csv_files = glob.glob(tempdir + "/extracted/**/*/*metadata.csv", recursive=True)
  csv_metrics = {}
  t = ('aws',)
  csv_metrics_list = []

  for csv_file in csv_files:
    with open(csv_file, 'r') as c_file:
      csv_reader = csv.reader(c_file, delimiter=',')
      for row in csv_reader:
        if len(row) > 0:
          if row[0] != 'metric_name' and row[0] not in csv_metrics_list:
            csv_metrics_list.append(row[0])
            csv_metrics[row[0]] = 1
            metric = row[0].split('.')
            if metric[0] not in t:
              if metric[0] != 'trace' and metric[0] != 'datadog':
                t = t + (metric[0],)
  print(f"Found {len(csv_metrics_list)} documented metrics.")
  return [csv_metrics, t]


def get_dd_metrics(days):
  initialize(**HQ_CREDS)

  from_time = int(time.time()) - 60 * 60 * 24 * days

  dd_metrics = {}

  try:
    dd_metrics = api.Metric.list(from_time).get('metrics', {})
  except:
    print(f'\x1b[31mERROR\x1b[0m: There was an error with the Datadog API call, current value of dd_metrics is: \n {dd_metrics}')

  return dd_metrics

def compile_metrics(csv_dict, sources_t, dd_metrics_list):
  cloud = ('aws','azure', 'gcp')
  ignore = [
            '.p5',
            '.p7',
            '.p9',
            'aws.ec2.iam_credentials_expiration_seconds',
            'azure.operationalinsights_workspaces.',
            'cloudfoundry.nozzle',
            'gcp.logging.user.',
            'gcp.custom.',
            'isatap',
            'spark_extended',
            'vsphere.',
            'zookeeper.avg_',
            'zookeeper.cnt_',
            'zookeeper.max_',
            'zookeeper.min_',
            'zookeeper.sum_'
    ]
  final_metrics = []
  for metric in dd_metrics_list:
      if metric.startswith(sources_t):
        if metric not in csv_dict and not any(str_ in metric for str_ in ignore):
            docs_tags = metric.split('.')
            if docs_tags[0] in cloud:
                final_metrics.append({
                'metric': 'docs.missing.metrics',
                'points': 1,
                'tags': ['docs_metric:' + metric, 'docs_cloud:' + docs_tags[0], 'docs_ns:' + docs_tags[1]]
                })
            else:
                final_metrics.append({
                'metric': 'docs.missing.metrics',
                'points': 1,
                'tags': ['docs_metric:' + metric, 'docs_ns:' + docs_tags[0]]
                })
  return final_metrics


def post_dd_metrics(metrics):
  # Post to Corpsite Datadog account
  initialize(**CORP_CREDS)
  api.Metric.send(metrics, compress_payload=True)


if __name__ == '__main__':
  print(f'\x1b[32mINFO\x1b[0m: Getting csv metrics from {TEMPDIR}')
  csv_metrics = get_csv_metrics(TEMPDIR)
  print('\x1b[32mINFO\x1b[0m: Getting dd metrics...')
  dd_metrics = get_dd_metrics(5)
  metrics = compile_metrics(csv_metrics[0], csv_metrics[1], dd_metrics)
  if len(metrics) != 0:
    print('\x1b[32mINFO\x1b[0m: Posting dd metrics...')
    post_dd_metrics(metrics)
  else:
    print('\x1b[31mERROR\x1b[0m: List of metrics recovered was empty.')
    sys.exit(1)
