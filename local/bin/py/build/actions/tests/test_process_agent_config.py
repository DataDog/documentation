#!/usr/bin/env python3
import unittest
from process_agent_config import process_agent_config

class TestProcessAgentConfig(unittest.TestCase):
  def test_process_agent_config(self):
    test_string = """
    ##################################
    ## Test Configuration ##
    ##################################

    ## @param test - boolean - optional - default: false
    #
    # test: false

    ## @param test_config - custom object - optional
    ## This is a test comment
    #
    # logs_config:

      ## @param test_nested_kv - boolean - optional - default: false
      #
      # test_nested_kv: false

      ## @param test_nested_array - list of custom objects - optional
      #
      # test_nested_array:
      #   - type: <RULE_TYPE>
      #     name: <RULE_NAME>
      #     pattern: <RULE_PATTERN>

    {{ end -}}
    {{- if .Test }}
    """
    
    result = process_agent_config.process_agent_config(test_string)

if __name__ == '__main__':
    unittest.main()