import os
import unittest

import yaml

from gitlab.bin.py.build_config import build_config


class TestBuildConfig(unittest.TestCase):

    def setUp(self):
        self.root = os.environ.get('CORPSITE') if os.environ.get('CORPSITE', None) else \
            os.path.join(os.getcwd(), '../../../../')
        self.config_base = "config.yaml"
        self.preview_yaml = "config/preview.yaml"
        self.staging_yaml = "config/staging.yaml"
        self.live_yaml = "config/live.yaml"
        self.build_yaml = "build.yaml"
        self.branch_name = "docs-hugo"
        self.remove_build_file()

    def test_config_file_is_written(self):
        build_config(
            proj_path=self.root,
            base=self.config_base,
            override=self.preview_yaml
        )
        self.assertTrue(os.path.isfile(os.path.join(self.root, self.build_yaml)))

    def test_preview_yaml(self):
        with open(os.path.join(self.root, self.preview_yaml)) as preview_file:
            preview_yaml = yaml.load(preview_file.read())
        build_config(
            proj_path=self.root,
            base=self.config_base,
            override=self.preview_yaml,
            distro=preview_yaml.get('baseurl'),
            branch=self.branch_name
        )
        with open(os.path.join(self.root, self.build_yaml)) as build_file:
            build_yaml = yaml.load(build_file.read())
        self.assertTrue('%s%s' % (preview_yaml.get('baseurl'), self.branch_name) in build_yaml.get('baseurl'))
        self.assertEqual(preview_yaml.get('params')['static_url'], build_yaml.get('params')['static_url'])
        self.assertEqual(preview_yaml.get('params')['img_url'], build_yaml.get('params')['img_url'])
        self.assertTrue(build_yaml.get('buildFuture'))
        self.assertTrue(build_yaml.get('buildDrafts'))
        self.assertEqual(build_yaml.get('params')['environment'], 'preview')
        self.assertTrue(build_yaml.get('params')['scripts'][0]['tagmanager'])

    def test_staging_yaml(self):
        build_config(
            proj_path=self.root,
            base=self.config_base,
            override=self.staging_yaml
        )
        with open(os.path.join(self.root, self.staging_yaml)) as testing_file:
            staging_yaml = yaml.load(testing_file.read())
        with open(os.path.join(self.root, self.build_yaml)) as build_file:
            build_yaml = yaml.load(build_file.read())
        self.assertEqual(staging_yaml.get('baseurl'), build_yaml.get('baseurl'))
        self.assertEqual(staging_yaml.get('params')['static_url'], build_yaml.get('params')['static_url'])
        self.assertEqual(staging_yaml.get('params')['img_url'], build_yaml.get('params')['img_url'])
        self.assertFalse(build_yaml.get('buildFuture'))
        self.assertFalse(build_yaml.get('buildDrafts'))
        self.assertEqual(build_yaml.get('params')['environment'], 'staging')
        self.assertFalse(build_yaml.get('params')['scripts'][0]['tagmanager'])

    def test_live_yaml(self):
        build_config(
            proj_path=self.root,
            base=self.config_base,
            override=self.live_yaml
        )
        with open(os.path.join(self.root, self.live_yaml)) as testing_file:
            live_yaml = yaml.load(testing_file.read())
        with open(os.path.join(self.root, self.build_yaml)) as build_file:
            build_yaml = yaml.load(build_file.read())
        self.assertEqual(live_yaml.get('baseurl'), build_yaml.get('baseurl'))
        self.assertEqual(live_yaml.get('params')['static_url'], build_yaml.get('params')['static_url'])
        self.assertEqual(live_yaml.get('params')['img_url'], build_yaml.get('params')['img_url'])
        self.assertFalse(build_yaml.get('buildFuture'))
        self.assertFalse(build_yaml.get('buildDrafts'))
        self.assertEqual(build_yaml.get('params')['environment'], 'live')
        self.assertTrue(build_yaml.get('params')['scripts'][0]['tagmanager'])

    def tearDown(self):
        self.remove_build_file()

    def remove_build_file(self):
        if os.path.isfile(os.path.join(self.root, self.build_yaml)):
            os.remove(os.path.join(self.root, self.build_yaml))

if __name__ == '__main__':
    unittest.main()
