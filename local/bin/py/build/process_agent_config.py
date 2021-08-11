#!/usr/bin/env python3

import json
from collections import defaultdict

def format_agent_config_string(string):
  # Could try using Regex here, like this? ^[^a-zA-Z0-9#]*#[^a-zA-Z0-9#]*$
  if string == '#' or string == ' #' or string == '  #':
    return string.replace('#', '').replace('\n', '')
  elif '#' in string and '##' not in string:
    return string.replace('#', '') + '\n'
  else:
    return string + '\n'

def process_agent_config(config_yaml):
  try:
    header_delimiter = '#######'
    agent_config_array = config_yaml.splitlines()
    agent_config_dict = {}
    current_header = ''

    for index, line in enumerate(agent_config_array):
      if header_delimiter in line:
        heading = agent_config_array[index + 1].replace('#', '').strip().lower()

        if heading != '':
          agent_config_dict.setdefault(heading, '')
          current_header = heading
      else:
        if '{{' in line or line.startswith('##') and line.endswith('##'):
          continue
        else:
          formatted_string = format_agent_config_string(line)

        agent_config_dict[current_header] += formatted_string
        
    formatted_agent_config_json = json.dumps(agent_config_dict)

    with open('data/agent_config.json', 'w+') as outfile:
        outfile.write(formatted_agent_config_json)
  except Exception as err:
    print('An error occurred:')
    print(err)


  