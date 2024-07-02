---
"app_id": "sigsci"
"app_uuid": "edc9a664-24f1-45ee-88ad-04e5da064f51"
"assets":
  "dashboards":
    "sigsci": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": sigsci.agent.signal
      "metadata_path": metadata.csv
      "prefix": sigsci.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10037"
    "source_type_name": Signal Sciences
  "monitors":
    "Excessive blocked http requests": assets/monitors/excessiveblockedHTTP.json
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Signal Sciences
  "sales_email": info@signalsciences.com
  "support_email": info@signalsciences.com
"categories":
- security
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/sigsci/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "sigsci"
"integration_id": "sigsci"
"integration_title": "Signal Sciences"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "sigsci"
"public_title": "Signal Sciences"
"short_description": "Collect data from Signal Sciences to see anomalies and block attacks"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Security"
  "configuration": "README.md#Setup"
  "description": Collect data from Signal Sciences to see anomalies and block attacks
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.signalsciences.com/blog/"
  "support": "README.md#Support"
  "title": Signal Sciences
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

Signal Sciences のメトリクスとイベントを Datadog に送信することで、アプリケーション、API、マイクロサービスなどに対する攻撃や悪用をリアルタイムに監視できます。また、Signal Sciences が正しく機能し、トラフィックを検査していることを確認できます。

![image-datadog-sigsci-dashboard][1]

![image-datadog-sigsci-security][2]

Signal Sciences からメトリクスとイベントをリアルタイムに取得して、以下のことができます。

- 以下に関連する WAF のメトリクスを表示できます。

  - 合計リクエスト数
  - 主要な潜在的攻撃の種類
  - コマンドの実行
  - SQL インジェクション
  - クロスサイトスクリプティング
  - パススキャニング
  - 異常トラフィック
  - 不明ソース
  - サーバーの 400/500

- 以下のアクティビティのいずれかにより、Signal Sciences がブロックするか、悪意があると見なした IP を表示できます。

  - OWASP インジェクション攻撃
  - アプリケーション DoS
  - ブルートフォース攻撃
  - アプリケーションの悪用および誤用
  - リクエスト率制限
  - アカウント乗っ取り
  - 不正なボット
  - 仮想パッチ

- Signal Sciences エージェントのステータスに関するアラートを表示できます。

## セットアップ

Signal Sciences-Datadog インテグレーションを使用するには、Signal Sciences ユーザーである必要があります。Signal Sciences の詳細については、<https://www.signalsciences.com> を参照してください。

### 構成

#### メトリクスの収集

1. [Signal Sciences エージェント][3]をインストールします。

2. DogStatsD を使用するように Signal Sciences エージェントを構成します。

    各エージェントの agent.config ファイルに次の行を追加します。

   ```shell
   statsd-type = "dogstatsd"
   ```

    追加すると、エージェントの StatsD クライアントのタグ付け機能が有効になり、`sigsci.agent.signal.<SIGNAL_TYPE>` のようなメトリクスは、`signal_type:<SIGNAL_TYPE>` のタグが付いた `sigsci.agent.signal` として送信されます。

    _例:_`sigsci.agent.signal.http404` => `sigsci.agent.signal` にタグ `signal_type:http404` を使用

    Kubernetes を使用して Datadog Agent を実行している場合は、[Kubernetes と DogStatsD に関するドキュメント][4]の説明に従い、DogStatsD の非ローカルトラフィックを必ず有効にしてください。

3. メトリクスを Datadog Agent に送信するように SigSci エージェントを構成します。

    各エージェントの `agent.config` ファイルに次の行を追加します。

   ```shell
   statsd-address="<DATADOG_AGENT_HOSTNAME>:<DATADOG_AGENT_PORT>"
   ```

4. ボタンをクリックしてインテグレーションをインストールします。

5. Datadog で、「Signal Sciences - Overview」ダッシュボードが作成され、メトリクスのキャプチャが開始されていることを確認します。

#### イベント収集

1. Datadog で、[API キーを作成][5]します。

2. [Signal Sciences ダッシュボード][6]のサイトナビゲーションバーで、Manage > Integrations をクリックし、Datadog Event インテグレーションの横にある Add をクリックします。

3. **API Key** フィールドに API キーを入力します。

4. **Add** をクリックします。

詳細については、[Datadog Signal Sciences インテグレーション][7]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "sigsci" >}}


### イベント

Signal Sciences で IP アドレスにフラグが立てられると、イベントが作成され、[Datadog イベントストリーム][9]に送信されます。

### サービスチェック

Signal Sciences インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Signal Sciences のブログ][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-dashboard.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-security.png
[3]: https://docs.signalsciences.net/install-guides/
[4]: https://docs.datadoghq.com/agent/kubernetes/dogstatsd/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://dashboard.signalsciences.net
[7]: https://docs.signalsciences.net/integrations/datadog/
[8]: https://github.com/DataDog/integrations-extras/blob/master/sigsci/metadata.csv
[9]: https://docs.datadoghq.com/events/
[10]: https://docs.datadoghq.com/help/
[11]: https://www.signalsciences.com/blog/

