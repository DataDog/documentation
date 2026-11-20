---
app_id: microsoft-sysmon
app_uuid: 76dd5a2d-68d8-4acf-b066-ba00c1524694
assets:
  dashboards:
    Microsoft Sysmon - Overview: assets/dashboards/microsoft_sysmon_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    source_type_id: 42258945
    source_type_name: Microsoft Sysmon
  logs:
    source: microsoft-sysmon
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/microsoft_sysmon/README.md
display_on_public_website: true
draft: false
git_integration_title: microsoft_sysmon
integration_id: microsoft-sysmon
integration_title: Microsoft Sysmon
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: microsoft_sysmon
public_title: Microsoft Sysmon
short_description: Windows のシステム アクティビティ イベントに関するインサイトを取得します。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Windows システムアクティビティ関連のイベントに関するインサイトを取得します。
  media:
  - caption: Microsoft Sysmon - 概要 1
    image_url: images/microsoft_sysmon_overview_1.png
    media_type: image
  - caption: Microsoft Sysmon - 概要 2
    image_url: images/microsoft_sysmon_overview_2.png
    media_type: image
  - caption: Microsoft Sysmon - 概要 3
    image_url: images/microsoft_sysmon_overview_3.png
    media_type: image
  - caption: Microsoft Sysmon - 概要 4
    image_url: images/microsoft_sysmon_overview_4.png
    media_type: image
  - caption: Microsoft Sysmon - 概要 5
    image_url: images/microsoft_sysmon_overview_5.png
    media_type: image
  - caption: Microsoft Sysmon - 概要 6
    image_url: images/microsoft_sysmon_overview_6.png
    media_type: image
  - caption: Microsoft Sysmon - 概要 7
    image_url: images/microsoft_sysmon_overview_7.png
    media_type: image
  - caption: Microsoft Sysmon - 概要 8
    image_url: images/microsoft_sysmon_overview_8.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Sysmon
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Microsoft Sysmon][1] は Windows のシステム サービスおよびデバイス ドライバーであり、プロセスの作成、ネットワーク接続、ファイルの変更、レジストリの変更などを含むシステム アクティビティを詳細にログに記録します。

このインテグレーションは、[Sysmon イベント ログ][2]を拡充して取り込みます。事前に構築されたダッシュボードを使用すると、Sysmon イベントを俯瞰的に把握でき、セキュリティ チームがシステム アクティビティを監視するのに役立ちます。

## セットアップ

### インストール

Microsoft Sysmon インテグレーションをインストールするには、次の Agent インストール コマンドを実行し、以下の手順に従ってください。詳細は [Integration Management][3] ドキュメントを参照してください。

**注**: Agent バージョンが 7.66.0 以上の場合、この手順は不要です。

管理者として powershell.exe を起動し、次のコマンドを実行します:
  ```powershell
  & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration install datadog-microsoft_sysmon==1.0.0
  ```

### 設定

#### ログ収集の構成

1. Datadog Agent でのログ収集は、デフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. Microsoft Sysmon のログの収集を開始するには、次の構成ブロックを `microsoft_sysmon.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
      - type: windows_event
        channel_path: "Microsoft-Windows-Sysmon/Operational"
        source: microsoft-sysmon
        service: microsoft-sysmon
        sourcecategory: windowsevent
    ```

3. [Agent を再起動][4]します。

#### Sysmon の構成

Sysmon をインストールするには、次の手順に従ってください:
1. [Sysmon ダウンロード ページ][1]から zip ファイルをダウンロードし、内容を解凍します。
2. Sysmon を構成するための XML ファイルを作成します。たとえば、AppData フォルダー内のアプリが作成するプロセスを監視したい場合、構成ファイルは次に示す内容のようになります。他のイベントについても、`EventFiltering` XML タグの下に同様の方法でイベント フィルターを追加できます。

  ```xml
    <Sysmon schemaversion="4.90">
        <EventFiltering>
          <ProcessCreate onmatch="include">
              <Image condition="contains">C:\Users\*\AppData\Local\Temp\</Image>
              <Image condition="contains">C:\Users\*\AppData\Roaming\</Image>
          </ProcessCreate>
        </EventFiltering>
    </Sysmon>
  ```

3. 解凍したフォルダー内で管理者として次のコマンドを実行します:

  ```powershell
    .\Sysmon -i [<configfile>]
  ```

**注:** Sysmon は、構成ファイル (XML) を使って高度な設定が可能で、次のようなことができます:
- どのイベントを監視するかを制御する
- プロセスやパスなどに基づいてイベントをフィルタリングする。

有効にするイベント タイプが多すぎると、データ取り込み量が過剰になる可能性があります。脅威モデルと監視の必要性に応じて、重要なセキュリティ イベントのみを有効にしてください。
これらのイベントは、不要なログ ノイズを避けるために、重要なシステム ディレクトリ、プロセス、およびユーザーに対して選択的に有効にする必要があります。

構成の詳細については、[Sysmon ドキュメント][5]を参照してください。

### 検証

[Agent の `status` サブ コマンドを実行][6]し、`Checks` セクションの `microsoft_sysmon` を確認します。

## 収集データ

### ログ

Microsoft Sysmon インテグレーションは、以下の [Sysmon イベント ログ][2]を収集します:
- プロセス アクティビティ ログ
- ネットワーク アクティビティ ログ
- ファイル アクティビティ ログ
- レジストリ アクティビティ ログ
- WMI アクティビティ ログ
- Sysmon サービス アクティビティ ログ
- 名前付きパイプおよびクリップボードのアクティビティ ログ

### メトリクス

Microsoft Sysmon インテグレーションにはメトリクスは含まれていません。

### イベント

Microsoft Sysmon インテグレーションにはイベントは含まれていません。

### サービス チェック

Microsoft Sysmon インテグレーションにはサービスチェックは含まれていません。

## サポート

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon
[2]: https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon#events
[3]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=windowspowershell#install
[4]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/#restart-the-agent
[5]: https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon#configuration-files
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/