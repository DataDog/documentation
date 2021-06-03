---
"assets":
  "dashboards":
    "Postman API Dashboard": assets/dashboards/overview.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- ""
"creates_events": true
"ddtype": "check"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/postman/README.md"
"display_name": "Postman"
"draft": false
"git_integration_title": "postman"
"guid": "c678faae-1fc2-420b-83af-e973441b99de"
"integration_id": "postman"
"integration_title": "Postman"
"is_public": true
"kind": "integration"
"maintainer": "integrations-partnerships@postman.com"
"manifest_version": "1.0.0"
"metric_prefix": "postman"
"metric_to_check": "postman.monitor.run.total_latency"
"name": "postman"
"public_title": "Postman"
"short_description": "Postman Monitoring を実行し、Datadog でメトリクスを分析しイベントを生成します。　"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## 概要

[Postman][1] は、API の構築手順を簡素化しコラボレーションを合理化することで、より優れた API を短期間で作成するための API プラットフォームです。

このインテグレーションにより、以下が可能になり、モニタリングの健全性を常に把握できます。

- Datadog で実行された Postman Monitoring のメトリクスを分析

- 成功および失敗した Monitoring のイベントを生成
## セットアップ

詳細は、[Postman のドキュメントページ][2]でご確認ください。




### コンフィギュレーション

1. Datadog [API キー][3]を生成します。
2. Postman アカウントにサインインし、[Datadog インテグレーション][4]へ移動します。
3. "Add Integration" を選択します。
4. Datadog へ Monitor メトリクスやイベントを送信するには
   - 新しいインテグレーションに名前を付けます。
   - データを Datadog に送信するモニターを選択します。
   - Datadog API キーを入力します。
   - 使用する Datadog のリージョンを選択します。
   - オプションとして、実行ごとに、イベント、メトリクス、またその両方を送信するかを選択できます。
5. 最後に、"Add Integration" を選択し、インテグレーションの設定を完了します。

![インテグレーションを構成][5]

### 検証



## 収集データ

### メトリクス
{{< get-metrics-from-git "postman" >}}


### サービスのチェック

Postman には、サービスのチェック機能は含まれません。

### イベント

Postman でモニターが実行されるたびにイベントが生成されます。イベントの重要度は、Postman Monitor で全てのテストが合格した場合は "Low" となり、一部失敗した場合やイベントの実行時にエラーが発生した場合は "Normal" となります。

## トラブルシューティング

ご不明な点は、[Postman サポート][7]までお問い合わせください。

[1]: https://www.postman.com/
[2]: https://learning.postman.com/docs/integrations/available-integrations/datadog/
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://go.postman.co/integrations/service/datadog
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/postman/images/add-integration-datadog.jpeg
[6]: https://github.com/DataDog/integrations-extras/blob/master/postman/metadata.csv
[7]: https://www.postman.com/support/

