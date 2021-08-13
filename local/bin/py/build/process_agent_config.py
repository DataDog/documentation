#!/usr/bin/env python3

import json
import re
from os import getenv
from collections import defaultdict

def format_agent_config_string(string):
  """
  Takes a string from the agent config template and formats it for output in the agent_config shortcode.
    - If string contains exactly one '#' and no alphabetic characters, remove the '#' and any new line characters.
    - If the string contains exactly one '#' and has alphabetic characters, remove the '#' and leave the characters (this represents a config key/value)
  """
  # Match any lines containing strictly one '#' character that can have any number of leading or trailing whitespaces, and no words.  Matching lines in the config template file are for spacing only.
  regex_string = r"[^a-zA-Z0-9#]*#[^a-zA-Z0-9#]*$"

  if re.match(regex_string, string):
    return string.replace('#', '').replace('\n', '')
  elif '#' in string and '##' not in string:
    return string.replace('#', '') + '\n'
  else:
    return string + '\n'

def create_agent_config_dict(dd_agent_config_string):
  config_type_header_delimiter = '#######'
  agent_config_array = dd_agent_config_string.splitlines()
  agent_config_dict = {}
  current_config_type = ''
  config_types_string = 'Available config types: \n'

  for index, line in enumerate(agent_config_array):
    if config_type_header_delimiter in line:
      config_type = agent_config_array[index + 1].replace('#', '').strip().lower()

      if config_type != '':
        agent_config_dict.setdefault(config_type, '')
        current_config_type = config_type
        config_types_string += '- ' + config_type + '\n'
    else:
      # Skip any Go template strings or comment boxes used to delineate config types.
      if '{{' in line or line.startswith('##') and line.endswith('##'):
        continue
      else:
        formatted_string = format_agent_config_string(line)

      agent_config_dict[current_config_type] += formatted_string
  
  return agent_config_dict

def process_agent_config(dd_agent_config_string):
  """
  Takes the Datadog Agent Config template as a string, separates it by type, formats the strings, and outputs the results as json to be consumed by the agent_config.html shortcode for display.
  """
  try:
    # config_type_header_delimiter = '#######'
    # agent_config_array = dd_agent_config_string.splitlines()
    # agent_config_dict = {}
    # current_config_type = ''
    # config_types_string = 'Available config types: \n'

    # for index, line in enumerate(agent_config_array):
    #   if config_type_header_delimiter in line:
    #     config_type = agent_config_array[index + 1].replace('#', '').strip().lower()

    #     if config_type != '':
    #       agent_config_dict.setdefault(config_type, '')
    #       current_config_type = config_type
    #       config_types_string += '- ' + config_type + '\n'
    #   else:
    #     # Skip any Go template strings or comment boxes used to delineate config types.
    #     if '{{' in line or line.startswith('##') and line.endswith('##'):
    #       continue
    #     else:
    #       formatted_string = format_agent_config_string(line)

    #     agent_config_dict[current_config_type] += formatted_string
    
    agent_config_dict = create_agent_config_dict(dd_agent_config_string)
    formatted_agent_config_json = json.dumps(agent_config_dict)

    with open('data/agent_config.json', 'w+') as agent_json_config_outfile:
      agent_json_config_outfile.write(formatted_agent_config_json)

    keys = agent_config_dict.keys()
    print('keys')
    print(keys)

    # Documenting what config types are available for Docs team to use in agent config shortcode.
    # with open('agent_config_types_map.txt', 'w+') as agent_config_types_map_outfile:
    #   agent_config_types_map_outfile.write(config_types_string)
  except Exception as err:
    print('An error occurred building agent config data:')
    print(err)

    if getenv("LOCAL") != 'True':
      sys.exit(1)


  