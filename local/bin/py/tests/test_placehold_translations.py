import os
import unittest

from local.bin.py.placehold_translations import get_languages, create_glob, create_placeholder_file, diff_globs


class TestPlaceholdTranslations(unittest.TestCase):
    def setUp(self):
        self.test_languages = ('en', 'ja')
        self.config = 'config.yaml'
        self.project_root = os.environ['DOCS']
        self.test_file = ''

    def test_find_available_languages(self):
        # returns a list of available languages
        language_list = get_languages(self.project_root + self.config)
        self.assertEqual(len([l for l in language_list if l in self.test_languages]), 2)

    def test_find_missing_markdown(self):
        """
        globs should be formatted:
        {
            "en": [
                "/abs/path/to/file/file.md",
            ]
        }
        """
        for l in self.test_languages:
            glob = create_glob(self.project_root + 'content/', l)
            self.assertTrue(glob.get("name", "") == l)
            self.assertTrue(isinstance(glob.get("glob", False), list))
            self.assertTrue(len(glob.get("glob", [])))

    def test_diff_globs(self):
        glob_1 = create_glob(self.project_root + 'content/', self.test_languages[0])
        glob_2 = create_glob(self.project_root + 'content/', self.test_languages[1])
        glob_diff = diff_globs(base=glob_1, compare=glob_2)
        self.assertTrue(len(glob_1['glob']) > 0)
        self.assertTrue(len(glob_2['glob']) > 0)
        self.assertTrue(len(glob_1['glob']) > len(glob_2['glob']))
        for file in glob_diff:
            self.assertTrue(not os.path.isfile(file.replace('.md', '.%s.md' % self.test_languages[1])))
        self.assertTrue(len(glob_diff) > 0)

    def test_create_placeholder_file(self):
        glob_1 = create_glob(self.project_root + 'content/', self.test_languages[0])
        glob_2 = create_glob(files_location=self.project_root + 'content/',
                             lang=self.test_languages[1],
                             disclaimer=get_languages(self.project_root + self.config)[self.test_languages[1]]['disclaimer'])
        glob_diff = diff_globs(base=glob_1, compare=glob_2)
        self.test_file = glob_diff[0].replace('.md', '.%s.md' % self.test_languages[1])
        self.assertFalse(os.path.isfile(self.test_file))
        create_placeholder_file(template=glob_diff[0], new_glob=glob_2)
        self.assertTrue(os.path.isfile(self.test_file))
        with open(self.test_file) as o_file:
            self.assertTrue('NOTICE' in o_file.read())

    def tearDown(self):
        # remove created markdown file
        if os.path.isfile(self.test_file):
            os.remove(self.test_file)


if __name__ == '__main__':
    unittest.main()
