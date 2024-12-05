---
app_id: scadamods-kepserver
app_uuid: fbf2e54c-4985-4de5-aa2b-cf592fc5c4f8
assets:
  dashboards:
    Kepserver Overview Demonstration: assets/dashboards/scadamods_kepserver_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: scadamods.kepserver.configured.tags.count
      metadata_path: metadata.csv
      prefix: scadamods.kepserver.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Scadamods Kepserver
author:
  homepage: http://www.scadamods.com
  name: ScadaMods
  sales_email: info@scadamods.com
  support_email: support@scadamods.com
  vendor_id: scadamods
categories:
- マーケットプレイス
- cloud
- iot
- ログの収集
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: scadamods_kepserver
integration_id: scadamods-kepserver
integration_title: ScadaMods Kepserver
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: scadamods_kepserver
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.scadamods.kepserver
  product_id: kepserver
  short_description: Kepware の KesperverEx は、SCADA アプリケーションのためのミドルウェアです。このインテグレーションにより、イベント、ログ、コンフィギュレーション変更をアプリケーションで監視することができます。
  tag: デバイス
  unit_label: Kepserver ホストインスタンス
  unit_price: 142.99
public_title: ScadaMods Kepserver
short_description: Kepserver と呼ばれる SCADA アプリケーションのアクティビティを監視します。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Cloud
  - Category::IOT
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Kepserver と呼ばれる SCADA アプリケーションのアクティビティを監視します。
  media:
  - caption: Kepserver の紹介と Datadog とのインテグレーション例
    image_url: images/scadamods-kepserver-thumbnail.png
    media_type: ビデオ
    vimeo_id: 630489715
  - caption: ログアクセスに関する API コンフィギュレーション
    image_url: images/kepserver_api_conf.png
    media_type: image
  - caption: API サービスの有効化
    image_url: images/kepserver_conf_api_en.png
    media_type: image
  - caption: チャンネルで Diagnostic Capture が有効
    image_url: images/kepserver_conf_statistics_enable.png
    media_type: image
  - caption: ウィンドウズトレイアイコンから構成するための設定
    image_url: images/kepserver_conf_tray_settings.png
    media_type: image
  - caption: ユーザーマネージャーの設定
    image_url: images/kepserver_conf_user.png
    media_type: image
  - caption: API レストインターフェイスのドキュメント
    image_url: images/kepserver_web.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ScadaMods Kepserver
---



## 概要
Scadamods Kepserver インテグレーションは、チャンネル、デバイス、タグへのあらゆる変更を監視します。このインテグレーションは、Kepserver イベントログからイベントのストリームを提供し、Datadog ダッシュボード上でリアルタイムにイベントを確認することができます。Kepserver の Configuration API を通じて、このインテグレーションは各 Kepserver インスタンスに実装されたチャンネル、デバイス、タグのコンフィギュレーションを確認するための詳細を収集します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "scadamods_kepserver" >}}


### イベント

Kepserver チェックでは、Kepserver イベントログ API で提供されるすべてのイベントログが送信されます。

### サービスのチェック

**scadamods_kepserver.can_connect**:<br>
Agent が監視対象の Kepserver インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` が返されます。そうでない場合は `OK` が返されます。

## トラブルシューティング

### 1. 不正アクセスエラー

症状: Kepserver チェックが、Kepserver インスタンスに接続できない場合、`CRITICAL` を報告する。

ログ: Kepserver チェックでは、次のエラーメッセージがログに記録される。
```Failed to retrieve Kepserver Event Logs: 401 Client Error: Unauthorized for url: http://127.0.0.1:57412//config/v1/event_log?```

推奨:

- Kepserver インスタンスが起動していることを確認します。
- Web ブラウザで `http://127.0.0.1:57412//config/v1/event_log?` URL にアクセスし、Kepserver API のエンドポイントにアクセスできることを確認します。
- ユーザーが Kepserver API エンドポイントへのアクセス権を持っていない場合、適切なアクセス許可を持つユーザーを作成します。
- Kepserver Administration ページに移動し、適切なアクセス許可を持つ新規ユーザーを作成します。
- タブに移動し、'Enable' オプションで 'Yes' を選択して、Kepserver インスタンスで Configuration API Service が有効になっていることを確認します。
- Kepserver API エンドポイントが Configuration API Services タブの 'View in browser' リンクと同じであることを確認します。
- `scadamods_kepserver.d/conf.yaml` ファイルで、ユーザー名とパスワードが正しいことを確認します。

### 2. OPC-UA メトリクス収集の失敗

説明: OPC-UA メトリクスは、Kepserver のシステム診断機能から取得されます。システム診断機能はデフォルトでは無効になっており、ユーザーはプロジェクトの OPC-UA プロパティでこれを有効にする必要があります。'node_id' は OPC-UA メトリクスが収集されるサーバーへの参照です。サーバーが稼動していない場合、'node_id' はクライアントが見つけることに失敗します。'node_id' のデフォルトは Kepserver インスタンスの 'ns=2' です。これを変更する必要がある場合は、support@scadamods.com までご連絡ください。

症状: Kepserver チェックで、システム診断のための OPC-UA メトリクスが取得できない。

ログ: Kepserver チェックでは、以下のエラーメッセージがログに記録される。

``` OPC UA metric request failed: "The node id refers to a node that does not exist in the server address space."(BadNodeIdUnknown)```

推奨:
- Kepserver の System Diagnostics が有効になっていることを確認します。
- Kepserver プロジェクトのプロパティページに移動し、OPC-UA タブを選択します。`Log diagnostics` オプションが `Yes` に設定されていることを確認します。



さらにサポートが必要な場合は、[Datadog サポート][8]、または [support@scadamods.com][15] にお問い合わせください。

## サポート
サポートや機能のリクエストは、Scadamods にお問い合わせください。
- メール: support@scadamods.com

---
産業用💪強度を搭載

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら][15]からメッセージをお送りいただければ、導入をサポートいたします！*

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [KesperverEx マニュアル][9]

[1]: https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/scadamods_kepserver.yaml.example
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/scadamods_kepserver/datadog_checks/scadamods_kepserver/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/scadamods_kepserver/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://github.com/scadadog/public_artifacts/blob/master/kepserverex-manual.pdf
[10]: https://www.kepware.com/getattachment/6882fe00-8e8a-432b-b138-594e94f8ac88/kepserverex-secure-deployment-guide.pdf
[11]: https://www.kepware.com/getattachment/f38ad6fe-be2e-40cc-9481-11d9e85c980c/configuration-api-made-easy.pdf
[12]: https://www.kepware.com/en-us/products/kepserverex/
[13]: https://www.kepware.com/getattachment/f5b80059-b32a-43ae-8fec-42183f890755/KEPServerEX_installation_guide_v610.pdf
[14]: https://www.datadoghq.com/
[15]: mailto:support@scadamods.com
[16]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[17]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-information

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/scadamods-kepserver" target="_blank">こちらをクリック</a>してください。