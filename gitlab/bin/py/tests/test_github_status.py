import os
import unittest
from unittest import mock

from gitlab.bin.py.github_status import github_status


class TestGithubStatus(unittest.TestCase):

    def setUp(self):
        self.token = os.environ.get('GITHUB_TOKEN')

    @mock.patch('github.Commit.Commit.create_status')
    def test_status_update_success(self, mock_create_status):
        with self.assertRaises(SystemExit) as m:
            github_status(
                token=self.token,
                branch_name='staging',
                state='success',
                description='test',
                context='test'
            )
        self.assertEqual(m.exception.code, 0)

    def test_status_update_fails(self):
        with self.assertRaises(SystemExit) as m:
            github_status(
                branch_name='staging',
                state='success',
                description='',
                context=''
            )
        self.assertEqual(m.exception.code, 1)

    def test_branch_fails(self):
        with self.assertRaises(SystemExit) as m:
            github_status(
                branch_name='nonenonenone',
                state='success',
                description='',
                context=''
            )
        self.assertEqual(m.exception.code, 1)


if __name__ == '__main__':
    unittest.main()
