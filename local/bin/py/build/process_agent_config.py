#!/usr/bin/env python3

import json
from collections import defaultdict

def process_agent_config(config_yaml):
  try:
    header_delimiter = '#######'
    agent_config_array = config_yaml.splitlines()
    agent_config_dict = {}
    current_header = ''

    for index, line in enumerate(agent_config_array):
      print(line)
      if header_delimiter in line:
        heading = agent_config_array[index + 1].replace('#', '').strip().lower()

        if heading != '':
          agent_config_dict.setdefault(heading, '')
          current_header = heading
      else:

        # if '#' in line and not '##' in line and not '@param' in line and line != '#':
          # formatted_string = line.replace('#', '') + '\n'

        if '#' in line and line != '#':
          if '##' in line and not line.startswith('###'):
            formatted_string = line + '\n'
          else:
            formatted_string = line.replace('#', '') + '\n'

          agent_config_dict[current_header] += formatted_string

    formatted_agent_config_json = json.dumps(agent_config_dict)

    with open('data/agent_config.json', 'w+') as outfile:
        outfile.write(formatted_agent_config_json)
  except Exception as err:
    print(err)


  