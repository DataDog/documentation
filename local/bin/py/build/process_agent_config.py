#!/usr/bin/env python3

import json
from collections import defaultdict

def process_agent_config(config_yaml):
  separator = '#######'
  agent_config_array = config_yaml.splitlines()
  agent_config_dict = {}
  test_arr = []
  current_header = ''

  for index, line in enumerate(agent_config_array):
    if separator in line:
      heading = agent_config_array[index + 1].replace('#', '').strip()

      if heading != '':
        test_arr.append(heading)
    else:
      if '#' in line and not '##' in line and not '@param' in line:
        test_arr.append(line)

  for index in test_arr:
    if '#' not in index:
      agent_config_dict[index] = ''
      current_header = index
    else:
      agent_config_dict[current_header] += index

  formatted_agent_config_json = json.dumps(agent_config_dict)

  with open('data/agent_config.json', 'w+') as outfile:
      outfile.write(formatted_agent_config_json)


  