---
app_id: win32-event-log
app_uuid: 8a0f4809-8470-4f7c-a7e8-350ba64123aa
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Win32
  logs:
    source: windows.events
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/win32_event_log/README.md
display_on_public_website: true
draft: false
git_integration_title: win32_event_log
integration_id: win32-event-log
integration_title: Win 32 event log
integration_version: 2.13.1
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: win32_event_log
oauth: {}
public_title: Win 32 event log
short_description: Windows のイベントを Datadog イベントストリームへ送信。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & System
  - Category::Log Collection
  configuration: README.md#Setup
  description: Windows のイベントを Datadog イベントストリームへ送信。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Win 32 event log
---



## 概要

Win 32 Event Log は、Windows のイベントログを監視して Datadog に転送します。このチェックを有効にして、以下のことができます。

- システムとアプリケーションのイベントを Datadog で追跡できます。
- システムとアプリケーションのイベントを他のアプリケーションと関連付けることができます。

## セットアップ

### インストール

Windows Event Log チェックは [Datadog Agent][1] パッケージに含まれています。追加のインストールは必要ありません。

### コンフィギュレーション

1. [Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `win32_event_log.d/conf.yaml` を編集します。使用可能なすべての構成オプションの詳細については、[サンプル win32_event_log.d/conf.yaml][3] を参照してください。

2. [Agent を再起動][4]すると、Windows イベントが Datadog に送信されます。

**注**: イベントとログは別々に構成されます。ログは、各インスタンス内で構成されません。ログコレクションの構成については、下記の[ログコレクション](#log-collection)をご参照ください。

### ログの収集

まず、`datadog.yaml` で `logs_enabled: true` が設定されていることを確認します。

特定の Windows イベントからログを収集するには、チャンネルを `conf.d/win32_event_log.d/conf.yaml` ファイルに手動で追加するか、Datadog Agent Manager を使用します。[Windows イベントログのドキュメント][5]を参照してください。

チャンネルの一覧を表示するには、PowerShell で以下のコマンドを実行します。

```powershell
Get-WinEvent -ListLog *
```

最もアクティブなチャンネルを表示するには、PowerShell で以下のコマンドを実行します。

```powershell
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

このコマンドは、チャンネルを `LogMode MaximumSizeInBytes RecordCount LogName` の形式で表示します。次に応答例を示します。

```text
LogMode MaximumSizeInBytes RecordCount LogName
Circular 134217728 249896 Security
```

`LogName` 列の値は、チャンネルの名前です。上の例では、チャンネル名は `Security` です。

`win32_event_log.d/conf.yaml` コンフィギュレーションファイルの `logs` セクションにチャンネルを追加します。各チャンネルは、ファイルの `instances` セクションのエントリも必要です。この例では、`Security` と `<CHANNEL_2>` チャンネルのエントリを示しています。

```yaml
init_config:
instances:
  - path: Security 
    legacy_mode: false
    filters: {}

  - path: "<CHANNEL_2>" 
    legacy_mode: false
    filters: {}
logs:
  - type: windows_event
    channel_path: Security
    source: windows.events
    service: Windows

  - type: windows_event
    channel_path: "<CHANNEL_2>"
    source: "windows.events"
    service: myservice
```

`<CHANNEL_X>` パラメーターは、イベントの収集に使用する Windows チャンネル名に変更してください。
[インテグレーションの自動処理パイプライン][6]を利用するには、対応する `source` パラメーターを `windows.events` に設定します。

最後に、[Agent を再起動][4]します。

**注**: Security ログチャンネルの場合は、Datadog Agent ユーザーを `Event Log Readers` ユーザーグループに追加してください。

### イベントの絞り込み

Windows イベントビューア GUI を使用して、このインテグレーションを使用してキャプチャできるすべてのイベントログをリストします。

正確な値を決定するには、次の PowerShell コマンドを使用してフィルターを設定します。

```text
Get-WmiObject -Class Win32_NTLogEvent
```

たとえば、`Security` ログファイルに記録された最新のイベントを表示するには、次のコマンドを使用します。

```text
Get-WmiObject -Class Win32_NTLogEvent -Filter "LogFile='Security'" | select -First 1
```

コマンドの出力にリストされる値を `win32_event_log.d/conf.yaml` で設定して、同種のイベントをキャプチャできます。

<div class="alert alert-info">
<code>Get-EventLog</code> PowerShell コマンドまたは Windows イベントビューア GUI から提供される情報が、<code>Get-WmiObject</code> から提供される情報とは多少異なる場合があります。<br>
設定したイベントがインテグレーションによってキャプチャされない場合は、<code>Get-WmiObject</code> を使用してフィルターの値をダブルチェックしてください。
</div>

1. イベントログに 1 つ以上のフィルターを構成します。フィルターを使用すると、Datadog に取り込むログイベントを選択できます。

    次のプロパティにフィルターを設定できます。

      - type: Warning、Error、または Information
      - log_file: Application、System、Setup、または Security
      - source_name: 使用可能な任意のソース名
      - user: 有効な任意のユーザー名

    `win32_event_log.d/conf.yaml` のコンフィギュレーションファイルに、フィルターごとにインスタンスを追加します。

    いくつかのフィルターの例を示します。

    ```yaml
    - type: windows_event
      channel_path: Security
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: include_at_match
        name: relevant_security_events
        pattern: .*(?i)eventid.+(1102|4624|4625|4634|4648|4728|4732|4735|4737|4740|4755|4756)

    - type: windows_event
      channel_path: Security
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: exclude_at_match
        name: relevant_security_events
        pattern: \"EventID\":\"1102\"|\"4624\"t\"

    - type: windows_event
      channel_path: System
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: include_at_match
        name: system_errors_and_warnings
        pattern: .*(?i)level.+((?i)(warning|error))

    - type: windows_event
      channel_path: Application
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: include_at_match
        name: application_errors_and_warnings
        pattern: .*(?i)level.+((?i)(warning|error))
    ```

    ```yaml
    instances:
      # 以下は、SQL Server からエラーと警告を取得し、
      # すべてのイベントを MSSQLSERVER ソースに置き、#sqlserver でタグ付けしています。
      - tags:
          - sqlserver
        type:
          - Warning
          - Error
        log_file:
          - Application
        source_name:
          - MSSQLSERVER

      # このインスタンスは、すべてのシステムエラーを取得し、#system でタグ付けしています。
      - tags:
          - system
        type:
          - Error
        log_file:
          - System
    ```

2. Agent Manager を使用して [Agent を再起動][4]します (またはサービスを再起動します)。

ログをフィルタリングする例については、[高度なログ収集のドキュメント][7]を参照してください。

### EventID によるフィルタリング

以下は、特定の EventID から Windows イベントログを収集するための正規表現パターンの例です。

```yaml
logs:
  - type: windows_event
    channel_path: Security
    source: windows.event
    service: Windows
    log_processing_rules:
      - type: include_at_match
        name: include_x01
        pattern: \"value\":\"(101|201|301)\"
```

**注**: ログのフォーマットにより、パターンが異なる場合があります

### 検証

Datadog Agent Manager の情報ページを確認するか、[Agent の `status` サブコマンド][8]を実行し、Checks セクションで `win32_event_log` を探します。以下のようなセクションが表示されるはずです。

```shell
Checks
======

  [...]

  win32_event_log
  ---------------
      - instance #0 [OK]
      - Collected 0 metrics, 2 events & 1 service check
```

## 収集データ

### メトリクス

Win32 Event log チェックには、メトリクスは含まれません。

### イベント

すべての Windows イベントが Datadog に転送されます。

### サービスのチェック

Win32 Event log チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

### ドキュメント

- [イベントログファイルを `Win32_NTLogEvent` WMI クラスに追加する][10]

### ブログ

- [Windows Server 2012 の監視][11]
- [Windows Server 2012 メトリクスの収集方法][12]
- [Datadog を使用した Windows Server 2012 の監視][13]

[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.microsoft.com/en-us/windows/win32/eventlog/event-logging
[6]: https://docs.datadoghq.com/ja/logs/processing/pipelines/#integration-pipelines
[7]: https://docs.datadoghq.com/ja/agent/logs/advanced_log_collection/?tab=configurationfile
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://docs.datadoghq.com/ja/integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class/
[11]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[12]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[13]: https://www.datadoghq.com/blog/windows-server-monitoring