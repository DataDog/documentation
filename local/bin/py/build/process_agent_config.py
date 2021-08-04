#!/usr/bin/env python3

import json
from collections import defaultdict

def process_agent_config(config_yaml):
  separator = '#######'
  agent_config_array = config_yaml.splitlines()
  agent_config_dict = {}
  test_arr = []

  for index, line in enumerate(agent_config_array):
    if separator in line:
      heading = agent_config_array[index + 1].replace('#', '').strip()

      if heading != '':
        test_arr.append('!!!' + heading + '!!!')
    else:
      if line.startswith('#') and not line.startswith('##') and line != '#' and not '@param' in line:
        test_arr.append(line)
  
  print(test_arr)

  # Loop over test_arr if str.startswith('!!!') create an object with that as the key and each index until it hits the next '!!!'.  (or perhaps not contains ('#') to delimit headers?)
  
# config: {
#   "basic configuration": [
#     "site: datadoghq.com",
#     "dd_url": "zyx.xdif"
#   ]
# }

# config: {
#   "basic configuration": [
#     {"site": "datadoghq.com"},
#     {"dd_url": "zyx.xdif"}
#   ]
# }


  