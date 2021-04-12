#!/usr/bin/env python3
import unittest
from integrations import Integrations

class TestMarketplaceIntegrations(unittest.TestCase):
    def test_image_src_replaced_by_shortcode(self):
      markdown_img_search_regex = r"!\[(.*?)\]\((.*?)\)"
      img_shortcode_regex = r"({{2}< img)(.*)(>}{2})"
      test_markdown_string = ("## Test\n\n"
        "![TestScreenshot](/fake/path/to/images/1.png)\n\n"
        "### EndTest")

      result = Integrations.replace_image_src(test_markdown_string)

      self.assertNotRegex(result, markdown_img_search_regex)
      self.assertRegex(result, img_shortcode_regex)

    def test_section_removed_from_markdown(self):
      header_string = '## Setup'
      test_markdown_string = ("This is a test markdown string\n\n"
        "## Setup\n\n"
        "1. This\n"
        "2. and this\n"
        "3. should be removed\n\n"
        "### This too\n\n"
        "## This should not be removed")

      result = Integrations.remove_markdown_section(test_markdown_string, header_string)

      self.assertNotIn(header_string, result)
      self.assertIn('## This should not be removed', result)


if __name__ == '__main__':
    unittest.main()
