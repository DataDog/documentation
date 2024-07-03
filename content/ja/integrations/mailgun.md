---
app_id: mailgun
app_uuid: 40d251a6-a42d-42e2-8d06-75f7aac35dc7
assets:
  dashboards:
    mailgun: assets/dashboards/mailgun_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: mailgun.emails.accepted.total
      metadata_path: metadata.csv
      prefix: mailgun.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 623
    source_type_name: Mailgun
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- モニター
custom_kind: インテグレーション
dependencies: []
description: Monitor Mailgun's email delivery and engagement statistics with Datadog.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/mailgun/
draft: false
git_integration_title: mailgun
has_logo: false
integration_id: mailgun
integration_title: Mailgun
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: mailgun
public_title: Mailgun
short_description: Cloud based email service that helps developers send, track, and
  receive emails
supported_os: []
team: web-integrations
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Metrics
  configuration: README.md#Setup
  description: Cloud based email service that helps developers send, track, and receive
    emails
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Mailgun
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Mailgun is an API-based email delivery platform that allows you to:

- Build and manage large-scale email marketing applications.
- Send and track transactional messages.
- Remove invalid email addresses from your list.
- Improve your deliverability and drive higher conversion rates.

Integrate with Datadog to collect email delivery and engagement metrics and logs to track the performance of your Mailgun services.

## セットアップ

### Add and verify domain

1. Log in to your [Mailgun account][1].
2. In the sidebar on the left, click **Sending**. The menu expands. Select **Domains**.
3. Click **Add New Domain** at the top right.
4. Enter your Domain name and region and click **Add Domain**.
5. Verify your domain by following [the instructions in the Mailgun documentation][2].

### View Mailgun API key

When you sign up for Mailgun, a primary account API key is created for you.
This key allows you to perform all CRUD operations through our various API
endpoints and for any of your sending domains.

1. Log in to your [Mailgun account][1].
2. Click your name on the top right, and open the dropdown.
3. Click **API Keys**.
4. Click the eye icon next to **Private API Key**.

### Enable metrics collection

1. Navigate to the configuration tab inside the Datadog [Mailgun integration tile][3].
2. Enter your domain name and the region for your domain.
3. Paste in the API Key found in the steps above.
4. Optionally, add custom tags to associate tags with all metrics collected for this integration.

### Enable logs collection

You may configure Mailgun to forward events as logs to
Datadog. See the section **Tracking Messages - Webhooks** [in the Mailgun documentation][4] for more details.

1. Copy the generated URL from the instructions on the [Mailgun integration tile][3].
2. Log in to your Mailgun account.
3. Click **Sending** in the left side column.
4. Click **Webhooks** in the dropdown.
5. Click **Add webhook** in the top right corner.
6. Select the Event type you want to track.
7. Paste in the generated URL in step 1 under **URL**.
8. Click **Create Webhook**.

## 収集データ

### メトリクス
{{< get-metrics-from-git "mailgun" >}}


### Logs

Mailgun events will show up as logs under the source `mailgun`.

### イベント

The Mailgun integration does not include any events.

### サービスチェック

The Mailgun integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][6].

[1]: https://login.mailgun.com/login/
[2]: https://help.mailgun.com/hc/en-us/articles/360026833053
[3]: https://app.datadoghq.com/integrations/mailgun
[4]: https://documentation.mailgun.com/en/latest/user_manual.html#webhooks-1
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/mailgun/mailgun_metadata.csv
[6]: https://docs.datadoghq.com/ja/help