#!/usr/bin/env python3

import json
import yaml
from collections import defaultdict

def process_agent_config(config_yaml):
  separator = '#######'
  agent_config_array = config_yaml.splitlines()
  agent_config_dict = {}
  current_header = ''

  for index, line in enumerate(agent_config_array):
    if separator in line:
      heading = agent_config_array[index + 1].replace('#', '').strip()

      if heading != '':
        agent_config_dict[heading] = '' # use defaultdict.setdefault here?
        current_header = heading
    else:
      if '#' in line and not '##' in line and not '@param' in line:
        formatted_string = line.replace('#', '')
        formatted_string = formatted_string
        agent_config_dict[current_header] += formatted_string

  formatted_agent_config_json = json.dumps(agent_config_dict)
  formatted_agent_config_yaml = yaml.dump(agent_config_dict, sort_keys=False)

  print(formatted_agent_config_yaml)

  with open('data/agent_config.json', 'w+') as outfile:
      outfile.write(formatted_agent_config_json)


  