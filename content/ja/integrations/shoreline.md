---
app_id: shoreline-integration
app_uuid: 90e1b0ed-0907-4973-929c-7e7f1be0c4f4
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://shoreline.io/
  name: Shoreline.io
  sales_email: sales@shoreline.io
  support_email: support@shoreline.io
categories:
- 自動化
- インシデント
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/shoreline/README.md
display_on_public_website: true
draft: false
git_integration_title: shoreline
integration_id: shoreline-integration
integration_title: Shoreline.io
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: shoreline
public_title: Shoreline.io
short_description: トリガーされたモニターを修復するためのオートメーション構築
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Incidents
  - Offering::UI Extension
  - Supported OS::Linux
  configuration: README.md#Setup
  description: トリガーされたモニターを修復するためのオートメーション構築
  media:
  - caption: 改善ダッシュボード
    image_url: images/remediation_dashboard.png
    media_type: image
  - caption: 修復自動化セットアップの例
    image_url: images/automate_remediation.png
    media_type: image
  - caption: フリート全体でのインタラクティブなデバッグと修理の例
    image_url: images/fleetwide_interactive_debugging_and_repair.png
    media_type: image
  - caption: フリート全体での linux コマンドの詳細の例
    image_url: images/fleetwide_linux_command_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Shoreline.io
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Shoreline のインシデント自動化により、DevOps と Site Reliability Engineer (SRE) は、**大規模なデバッグ**をインタラクティブに行い、迅速に**修復を構築**して反復作業を排除することができます。

デバッグ・修復機能により、サーバーに個別に SSH 接続することなく、サーバーファーム全体でリアルタイムにコマンドを実行することができます。Linux コマンド、シェルスクリプト、クラウドプロバイダー API の呼び出しなど、Linux コマンドプロンプトに入力できるものはすべて実行し、これらのデバッグセッションを Datadog モニターに接続したオートメーションにします。

Shoreline アプリは、モニターがトリガーされると自動的に自動化を実行し、平均修復時間 (MTTR) と手作業を大幅に削減します。

Shoreline は、待機中の全員が最高の SRE と同等の能力を発揮できるよう支援します。Shoreline は、オンコールチームにデバッグツールと承認された修復アクションを提供し、エスカレーションを減らしてインシデントを迅速に修正し、ミスを減らして初回で正しくインシデントを修正できるよう支援します。

まずは、[Shoreline][1] でトライアルアカウントを設定してください。
## 計画と使用

### インフラストラクチャーリスト

以下の手順でインテグレーション構成を行います。

1. Shoreline Agent をダウンロードします。
2. このタイルから Datadog インテグレーションをインストールすると、アプリにアクセスできるようになります。
2. Datadog-Shoreline アプリを構成します。


#### Shoreline Agent

Agent は、監視対象のホストのバックグラウンドで実行される効率的で非侵入型のプロセスです。Agent は、ホストと接続されているすべてのポッドとコンテナからデータを収集、集計して Shoreline のバックエンドに送信し、バックエンドはそのデータを使用してメトリクスを作成します。

Agent は、Shoreline とお客様の環境のリソースをつなぐ安全なリンクとして機能します。Agent は、単純な Linux コマンドから修復のためのプレイブックまで、お客様に代わってアクションを実行することができます。操作言語ステートメントは、API リクエストを Shoreline のバックエンドに渡し、関連する Agent に渡して、対象リソースにコマンドを実行させます。

Agent は Shoreline のバックエンドからコマンドを受け取り、構成されたアラーム、アクション、ボットに基づいて自動的に修復のステップを踏みます。これらのオブジェクトは、お客様のフリートを監視し、何か問題が発生した場合に適切な対応を行うために連動して動作します。

Shoreline Agent を、Shoreline の監視対象としたいすべてのホストにインストールします。

Shoreline Agent をインストールするには、次の 3 つの方法のいずれかを実行します。

1. [Kubernetes][2]
2. [Kubernetes と Helm][3]
3. [仮想マシン][4]


#### アプリの構成

Shoreline で Datadog-Shoreline アプリを構成するには、Datadog の API キーとアプリケーションキーが必要です。また、ダッシュボード名と Webhook 名を定義する必要があります。

例:
![integration_example][5]

アプリの詳細な構成方法については、[Datadog-Shoreline のドキュメント][6]を参照してください。

## Agent

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

## その他の参考資料

詳細については、[Shoreline のドキュメント][8]を参照してください。


[1]: https://shoreline.io/datadog?source=DatadogIntTile
[2]: https://docs.shoreline.io/installation/kubernetes
[3]: https://docs.shoreline.io/installation/kubernetes#install-with-helm
[4]: https://docs.shoreline.io/installation/virtual-machines
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/shoreline/images/integrate_shoreline_and_datadog.png
[6]: https://docs.shoreline.io/integrations/datadog
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.shoreline.io/