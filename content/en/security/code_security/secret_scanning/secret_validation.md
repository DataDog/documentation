---
title: Secret Validation
aliases: /security/code_security/secret_scanning/secret_validation/
is_beta: true
algolia:
  tags: ['static analysis', 'ci pipeline', 'SAST', 'secret scanning']
---
## About validity checks
For certain detections (see the list below), Datadog checks whether a detected secret is valid during scans. For these live validation checks, Datadog makes `GET` requests to provider endpoints to confirm that a credential is active. Datadog only makes requests to endpoints that do not return sensitive data or personally identifiable information (PII), and only to verify if the credential can still access the provider endpoint.

For secret types with validation available, Datadog displays the validation status in the explorer as "Active" or "Inactive". You can also filter or query detections by their Validation Status.

For some secret types, Datadog uses static validation methods, such as computing a checksum, to confirm that a detected secret is not a false positive. Static validation results are not displayed and all references to "validation" in the explorer correspond to live validation results.

## List of supported validators
| Secret type | Static validator available | Live validator available |
|-------------|----------------------------|--------------------------|
|`adobe_access_token`|✓|✓|
|`adobe_refresh_token`|✓|✗|
|`adafruit_io_key`|✗|✓|
|`aiven_personal_token`|✗|✓|
|`anthropic's_claude_api_key`|✗|✓|
|`asana_oauth_token`|✓|✓|
|`asana_personal_access_token`|✗|✓|
|`atlassian_access_token`|✓|✓|
|`atlassian_refresh_token`|✓|✗|
|`aws_access_key_id`|✗|✓|
|`aws_secret_access_key`|✗|✓|
|`azure_container_registry_key`|✓|✗|
|`azure_entra_id_token`|✓|✗|
|`beamer_api_token`|✗|✓|
|`bitbucket_oauth_access_token`|✗|✓|
|`buildkite_access_token`|✗|✓|
|`circleci_personal_access_token`|✗|✓|
|`circleci_project_access_token`|✗|✓|
|`cloudflare_api_token`|✗|✓|
|`cloudflare_origin_ca_key`|✗|✓|
|`contentful_access_token`|✗|✓|
|`datadog_api_key`|✗|✓|
|`datadog_nonce_session_token`|✗|✓|
|`datadog_personal_access_token`|✗|✓|
|`discord_application_oauth_access_token`|✗|✓|
|`discord_application_token`|✗|✓|
|`discord_bot_token`|✗|✓|
|`docker_access_token`|✓|✓|
|`doppler_access_token`|✗|✓|
|`dropbox_access_token`|✗|✓|
|`duffel_test_access_token`|✗|✓|
|`fastly_api_token`|✗|✓|
|`flutterwave_api_secret_key`|✗|✓|
|`frame_io_developer_token`|✗|✓|
|`frame_io_oauth_session_secret`|✗|✓|
|`github_access_token`|✓|✓|
|`github_fine-grained_personal_access_token`|✗|✓|
|`heroku_api_key`|✗|✓|
|`hugging_face_access_token`|✗|✓|
|`intercom_access_token`|✗|✓|
|`launchdarkly_access_token`|✗|✓|
|`lichess_personal_access_token`|✗|✓|
|`non_expired_json_web_token`|✓|✗|
|`notion_integration_token`|✗|✓|
|`npm_access_token`|✓|✓|
|`openai_project_api_key`|✗|✓|
|`openai_user_api_key`|✗|✓|
|`oracle_access_token`|✓|✗|
|`pagerduty_api_token`|✗|✓|
|`perfect_cloud_api_key`|✗|✓|
|`postman_api_key`|✗|✓|
|`pulumi_access_token`|✗|✓|
|`rubygems_api_key`|✗|✓|
|`sendgrid_api_key`|✗|✓|
|`sentry_organization_token`|✗|✓|
|`sentry_personal_token`|✗|✓|
|`shippo_api_key`|✗|✓|
|`shippo_jwt`|✓|✓|
|`slack_access_token`|✗|✓|
|`snowflake_personal_access_token`|✓|✗|
|`square_access_token`|✗|✓|
|`typeform_personal_access_token`|✗|✓|
|`twilio_access_token`|✓|✗|
|`workos_api_key`|✗|✓|
|`xai_(grok)_api_key`|✗|✓|