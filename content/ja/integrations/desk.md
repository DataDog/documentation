---
"categories":
- "Collaboration"
- "issue tracking"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "イベントストリームで、新規、オープン、保留中、解決済みのケースを確認および議論。"
"doc_link": "https://docs.datadoghq.com/integrations/desk/"
"draft": false
"git_integration_title": "desk"
"has_logo": true
"integration_id": "desk"
"integration_title": "Desk"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "desk"
"public_title": "Datadog-Desk Integration"
"short_description": "See and discuss new, open, pending, and resolved cases in your event stream."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect Desk to Datadog to view your Salesforce support case data in an OOTB dashboard. The dashboard allows you to:

- Tail new case events in the event stream
- Visualize case stats by user and status
- View trends in support tickets alongside DevOps issues

For more information, see [Keep support on the same page with the Salesforce Desk integration][1].

## セットアップ

### 構成

From your Desk account, add an API application on the Settings -> API -> My Applications page (you may need administrator privileges).

Fill out the form as shown, leaving the latter two URL fields blank. Desk should then generate an application key, application secret, API access token, and API access token secret.

{{< img src="integrations/desk/desk_config.png" alt="desk config" popup="true">}}

Then from your Datadog account, enter the corresponding information on the [Desk tile][2] along with your company's unique Desk domain name. Hit the install button, and then you're all set.

After installation, you can select `desk.*` metrics on a custom dashboard or view them on the provided [Desk dashboard][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "desk" >}}


### イベント

The Desk integration does not include any events.

### サービスチェック

The Desk integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration
[2]: https://app.datadoghq.com/integrations/desk
[3]: https://app.datadoghq.com/screen/integration/desk
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/desk/desk_metadata.csv
[5]: https://docs.datadoghq.com/help/

