#!/usr/bin/env python3

import json
from collections import defaultdict

def process_agent_config(config_yaml):
  separator = '#######'
  lines = config_yaml.splitlines()
  headings = []
  agent_config_dict = {}

  print(enumerate(lines))

  # for index, line in enumerate(lines):
  #   if separator in line:
  #     heading = lines[index + 1].replace('#', '').strip()

      # if (heading != ''):
      #   headings.append(heading)
  
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


  