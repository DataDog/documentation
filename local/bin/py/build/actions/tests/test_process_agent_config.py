#!/usr/bin/env python3

import sys
import unittest
from process_agent_config import format_agent_config_string, create_agent_config_dict

class TestProcessAgentConfig(unittest.TestCase):
  def test_format_agent_config_string(self):
    test_string_one = ' #  \n'
    test_string_two = ' # test:true'
    
    result_one = format_agent_config_string(test_string_one)
    result_two = format_agent_config_string(test_string_two)

    self.assertEqual(result_one, '')
    self.assertEqual(result_two, '  test:true\n')

  def test_create_agent_config_dict(self):
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

    result = create_agent_config_dict(test_string)

    self.assertIn(result, 'test configuration')

if __name__ == '__main__':
    unittest.main()