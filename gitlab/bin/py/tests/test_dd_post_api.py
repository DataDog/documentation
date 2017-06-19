import os
import unittest
from unittest import mock

from gitlab.bin.py.dd_post_api import dd_send_event, dd_send_metric


class TestDDSendEvent(unittest.TestCase):
    def setUp(self):
        os.environ['CI_JOB_NAME'] = 'test_build_name'
        os.environ['CI_JOB_STAGE'] = 'test_build_stage'
        os.environ['CI_REPOSITORY_URL'] = 'test_build_repo'
        os.environ['CI_ENVIRONMENT_NAME'] = 'test_environment'
        os.environ['CI_PROJECT_NAME'] = 'test_project'
        os.environ['CI_REGISTRY_IMAGE'] = 'test_image'
        os.environ['CI_PIPELINE_ID'] = 'test_pipeline_id'

    @mock.patch('datadog.api.api_client.APIClient.submit')
    def test_dd_send_event_success(self, mock_api_submit):
        with self.assertRaises(SystemExit) as m:
            dd_send_event(
                api_key='valid_key',
                title="test_event",
                description="text description",
                result="success"
            )
        self.assertEqual(m.exception.code, 0)

    def test_dd_send_event_authentication_failure(self):
        with self.assertRaises(SystemExit) as m:
            dd_send_event(
                api_key='invalid_key',
                title="test_event",
                description="text description",
                result="success"
            )
        self.assertEqual(m.exception.code, 1)

    @mock.patch('datadog.api.api_client.APIClient.submit')
    def test_dd_send_metric_success(self, mock_api_submit):
        with self.assertRaises(SystemExit) as m:
            dd_send_metric(
                api_key='valid_key',
                metric="corpsite.test_mertic.duration",
                points=42,
                step_name="dd_post_metric",
                step_status="success"
            )
        self.assertEqual(m.exception.code, 0)

    def test_dd_send_metric_authentication_failure(self):
        with self.assertRaises(SystemExit) as m:
            dd_send_metric(
                api_key='invalid_key',
                metric="corpsite.test_mertic.duration",
                points=42,
                step_name="dd_post_metric",
                step_status="success"
            )
        self.assertEqual(m.exception.code, 1)

    def tearDown(self):
        del os.environ['CI_JOB_NAME']
        del os.environ['CI_JOB_STAGE']
        del os.environ['CI_REPOSITORY_URL']
        del os.environ['CI_ENVIRONMENT_NAME']
        del os.environ['CI_PROJECT_NAME']
        del os.environ['CI_REGISTRY_IMAGE']
        del os.environ['CI_PIPELINE_ID']


if __name__ == '__main__':
    unittest.main()
