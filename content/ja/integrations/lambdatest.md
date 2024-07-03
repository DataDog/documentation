---
app_id: lambdatest
app_uuid: 8d4556af-b5e8-4608-a4ca-4632111931c1
assets:
  dashboards:
    LambdaTest: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: lambdatest.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10243
    source_type_name: LambdaTest
  logs:
    source: lambdatest
  oauth: assets/oauth_clients.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: LambdaTest
  sales_email: prateeksaini@lambdatest.com
  support_email: prateeksaini@lambdatest.com
categories:
- automation
- containers
- incidents
- issue tracking
- testing
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lambdatest/README.md
display_on_public_website: true
draft: false
git_integration_title: lambdatest
integration_id: lambdatest
integration_title: LambdaTest
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: lambdatest
public_title: LambdaTest
short_description: Most powerful automation testing platform
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Containers
  - Category::Incidents
  - Category::Issue Tracking
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Most powerful automation testing platform
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: LambdaTest
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Integrate with LambdaTest and empower your teams to collaborate and test efficiently. LambdaTest is a cloud based testing platform that allows users to run manual and automated tests on their websites and web apps across 2000+ browsers, browser versions, and operating systems.

LambdaTest supports manual and various automation testing frameworks like Selenium, Cypress, TestCafe, etc.

With the LambdaTest integration, log bugs while performing cross-browser testing of your websites (and web apps) using LambdaTest platform. LambdaTest automatically includes details from the testing environment, such as browser version, OS, resolution, comments, and screenshots in Datadog.

Here's all that you can do with LambdaTest:

- Live-interactive testing across 2000+ browsers and real machines hosted on cloud-based infrastructure.
- An online automation testing grid supports Selenium and Cypress tests with any CI/CD pipeline to help QA teams validate and ship quality builds faster.
- A next-gen developer-friendly browser that helps to build well-performing and responsive websites with speed.
- 100+ integrations with third-party tools for project management, communication, codeless automation, CI/CD, and more.
- Help is always available with 24/7 chat support.
- Lifetime free access to the platform with 100 free automation testing minutes.

## セットアップ

All configuration happens on the LambdaTest Dashboard. See the [LambdaTest-Datadog integration][1] setup documentation.

### 構成

Here's how you can track incidents in Datadog with LambdaTest:

1. Click **Connect Accounts** to begin authorization of the LambdaTest integration from the Login page in LambdaTest.
2. Log in to your LambdaTest account on the LambdaTest website to be redirected to the Datadog authorization page.
3. Click **Authorize** to complete the integration process.
4. A confirmation email is sent once the integration configuration is complete.
5. Once Datadog is integrated with your LambdaTest account, start logging bugs and performing cross-browser testing.

## Uninstallation

Once you uninstall this integration, any previous authorizations are revoked. 

Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys management page][2].

## Support

For support or feature requests, contact LambdaTest on the following channels:

Email: support@lambdatest.com
Phone: +1-(866)-430-7087
Website: https://www.lambdatest.com/

[1]: https://www.lambdatest.com/support/docs/datadog-integration/
[2]: https://app.datadoghq.com/organization-settings/api-keys?filter=LambdaTest