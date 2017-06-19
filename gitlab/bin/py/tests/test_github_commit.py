import os
import unittest
from unittest import mock

from gitlab.bin.py.github_comment import github_comment


class TestGithubCommit(unittest.TestCase):

    def setUp(self):
        self.token = os.environ.get('GITHUB_TOKEN')

    @mock.patch('github.Commit.Commit.create_comment')
    def test_comment_update_success(self, mock_create_comment):
        with self.assertRaises(SystemExit) as m:
            github_comment(
                token=self.token,
                branch_name='staging',
                body='Hello World',
                commit=''
            )
        self.assertEqual(m.exception.code, 0)

    def test_comment_update_fails(self):
        with self.assertRaises(SystemExit) as m:
            github_comment(
                token=self.token,
                branch_name='staging',
                body='',
                commit=''
            )
        self.assertEqual(m.exception.code, 1)

    def test_branch_fails(self):
        with self.assertRaises(SystemExit) as m:
            github_comment(
                token=self.token,
                branch_name='TESTING_SHOULD_FAIL',
                body='Hello World',
                commit=''
            )
        self.assertEqual(m.exception.code, 1)


if __name__ == '__main__':
    unittest.main()
