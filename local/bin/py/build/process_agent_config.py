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
    config_type_header_delimiter = '#######'
    agent_config_array = config_yaml.splitlines()
    agent_config_dict = {}
    current_config_type = ''
    config_types_string = ''

    for index, line in enumerate(agent_config_array):
      if config_type_header_delimiter in line:
        config_type = agent_config_array[index + 1].replace('#', '').strip().lower()

        if config_type != '':
          agent_config_dict.setdefault(config_type, '')
          current_config_type = config_type
          config_types_string += config_type + '\n'
      else:
        # Skip any Go template strings or comment boxes used to delineate config types.
        if '{{' in line or line.startswith('##') and line.endswith('##'):
          continue
        else:
          formatted_string = format_agent_config_string(line)

        agent_config_dict[current_config_type] += formatted_string

    formatted_agent_config_json = json.dumps(agent_config_dict)

    with open('data/agent_config.json', 'w+') as agent_json_config_outfile:
      agent_json_config_outfile.write(formatted_agent_config_json)

    # Documenting what config types are available for Docs team to use in agent config shortcode.
    with open('agent_config_types_map.txt', 'w+') as agent_config_types_map_outfile:
      agent_config_types_map_outfile.write(config_types_string)
  except Exception as err:
    print('An error occurred:')
    print(err)


  