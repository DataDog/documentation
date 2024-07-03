---
categories:
- notifications
custom_kind: インテグレーション
dependencies: []
description: レガシー Pingdom モニタリングエンドポイントの既存の構成を管理し、移行します。
doc_link: https://docs.datadoghq.com/integrations/pingdom/
draft: false
git_integration_title: pingdom
has_logo: true
integration_id: ''
integration_title: Pingdom Legacy API (V2.1)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: pingdom
public_title: Datadog-Pingdom Legacy API (V2.1) Integration
short_description: Manage and migrate existing configuration of legacy Pingdom monitoring
  endpoints.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

<div class="alert alert-danger">
This integration is deprecated, and the API it relies on could lose support at any time. Use the <a href="https://docs.datadoghq.com/integrations/pingdom_v3/" class="alert-link">Datadog Pingdom V3 Integration</a> instead.
</div>

Track Pingdom user-centric performance metrics in Datadog, for correlation with other relevant events and metrics.

Datadog tracks the `response_time` metric for any sites you configure on the Pingdom website.

Pingdom events can be added by configuring the relevant [Integration Status Monitor][1]

<div class="alert alert-info">
Metrics can only be imported for Pingdom customers at the Starter level or above.
</div>

## セットアップ

### インストール

1. Open the Pingdom integration tile.
2. Enter the username and password to your Pingdom account. (If you have a Team account, you can use your own credentials and specify the account you wish to pull checks from.)
3. You can ignore some checks by unchecking them or add some tags to the events that are going to be generated.

## 収集データ

### メトリクス
{{< get-metrics-from-git "pingdom" >}}


### イベント

The Pingdom integration does not include any events.

### サービスチェック

The Pingdom integration pulls in transaction checks and reports them as service checks.

For the `pingdom.status` check, the following table explains which Pingdom transaction check results correlate to which Datadog service check results.

| Datadog status | Pingdom status      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`, `paused` |

## トラブルシューティング

### Error when updating username or password

You may have seen the following error when saving your Pingdom credentials:

`“There was an issue while testing your Pingdom configuration: Not permitted for account type”`.

Add the email address of your Pingdom account owner in the **(Optional) Account to query** field, then save.

[1]: https://app.datadoghq.com/monitors/create/integration
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/pingdom/pingdom_metadata.csv