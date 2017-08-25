import os
import unittest
from unittest import mock

from gitlab.bin.py.index_algolia import index_algolia, algoliasearch


class TestBuildConfig(unittest.TestCase):

    def setUp(self):
        self.app_id = 'test_id'
        self.api_key = 'test_key'
        self.content_path = os.path.join(os.environ.get('CORPSITE'), 'public/') if \
            os.environ.get('CORPSITE', None) else os.path.join(os.getcwd(), '../../../../public/')

    @mock.patch('algoliasearch.index.Index.delete_objects')
    @mock.patch('algoliasearch.index.Index.save_objects')
    def test_algolia_success(self, mock_delete_objects, mock_save_objects):
        with self.assertRaises(SystemExit) as m:
            index_algolia(app_id=self.app_id, api_key=self.api_key, content_path=self.content_path)
        self.assertEqual(m.exception.code, 0)

    def test_bad_content_path(self):
        with self.assertRaises(SystemExit) as m:
            index_algolia(app_id=self.app_id, api_key=self.api_key, content_path='blah')
        self.assertEqual(m.exception.code, 'Public folder path incorrect')

    def test_algolia_failure_exit_1(self):
        with self.assertRaises(SystemExit) as m:
            index_algolia(app_id=self.app_id, api_key=self.api_key, content_path=self.content_path)
        self.assertEqual(m.exception.code, 1)

if __name__ == '__main__':
    unittest.main()
