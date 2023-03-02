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
integration_title: Win32 Event Log
integration_version: 2.13.2
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: win32_event_log
oauth: {}
public_title: Win32 Event Log
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
  title: Win32 Event Log
---



## 概要

Win32 Event Log は、Windows のイベントログを監視して Datadog に転送します。このチェックを有効にして、以下のことができます。

- システムとアプリケーションのイベントを Datadog で追跡できます。
- システムとアプリケーションのイベントを他のアプリケーションと関連付けることができます。

詳細については、[Windows のイベントログのドキュメント][1]を参照してください。

## セットアップ

### APM に Datadog Agent を構成する

Windows Event Log チェックは [Datadog Agent][2] パッケージに含まれています。追加のインストールは必要ありません。

### コンフィギュレーション

Windows Event Log の収集方法は、以下のいずれか、または両方があります。
- [Datadog イベント][3]として
- [Datadog ログ][4]として

どちらの方法も [Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `win32_event_log.d/conf.yaml` で構成されます。使用可能なすべての構成オプションの詳細については、[サンプル win32_event_log.d/conf.yaml][6] を参照してください。


#### Windows Event チャンネルをリストアップ

まず、監視したい Windows Event Log チャンネルを特定します。チャンネルの一覧を見るには、PowerShell で次のコマンドを実行します。

```powershell
Get-WinEvent -ListLog *
```

最もアクティブなチャンネルを表示するには、PowerShell で以下のコマンドを実行します。

```powershell
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

このコマンドは、チャンネルを `LogMode MaximumSizeInBytes RecordCount LogName` の形式で表示します。次に応答例を示します。

```text
LogMode  MaximumSizeInBytes RecordCount LogName 
Circular          134217728      249896 Security
Circular            5242880        2932 <CHANNEL_2>
```

`LogName` 列の値は、チャンネルの名前です。上の例では、チャンネル名は `Security` です。

収集方法によって、チャンネル名は以下の構成パラメーターに使用することができます。
- `log_file`
- `path`
- `channel_path`

{{< tabs >}}
{{% tab "イベント" %}}

#### イベント収集

Windows Event Log を Datadog イベントとして収集するには、`win32_event_log.d/conf.yaml` コンフィギュレーションファイルの `instances:` セクションでチャンネルを設定します。

Agent は、2 つの方法で Windows Event Log を Datadog イベントとして収集するよう構成することができます。各方法は、チャンネルとフィルターのための独自の構成構文を持っています ([イベントのフィルタリング](?tab=events#filtering-events)を参照してください)。従来の方法は WMI を使用し、インスタンスのデフォルトモードです。新しい方法は、Event Log API を使用します。Event Log API を使用する方がパフォーマンスが良いので、Event Log API を使用することをお勧めします。Event Log API の収集メソッドを使用するには、各インスタンスで `legacy_mode: false` を設定します。

この例では、`Security` と `<CHANNEL_2>` チャンネルのエントリーを示します。

```yaml
init_config:
instances:
  - # WMI - レガシーモード (デフォルト)
    legacy_mode: true
    log_file: Security

  - # Event Log API (パフォーマンスが優れている)
    path: Security
    legacy_mode: false
    filters: {}

  - path: "<CHANNEL_2>" 
    legacy_mode: false
    filters: {}
```

{{% /tab %}}
{{% tab "Logs" %}}

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent では、ログ収集はデフォルトで無効になっています。Windows Event Log を Datadog ログとして収集するには、`datadog.yaml` ファイルで `logs_enabled: true` を設定して[ログ収集を有効化][1]します。

Windows Event Log を Datadog ログとして収集するには、`win32_event_log.d/conf.yaml` コンフィギュレーションファイルの `logs:` セクションの下にチャンネルを設定します。この例では、`Security` と `<CHANNEL_2>` チャンネルのエントリーを示しています。

```yaml
logs:
  - type: windows_event
    channel_path: Security
    source: windows.events
    service: Windows

  - type: windows_event
    channel_path: "<CHANNEL_2>"
    source: windows.events
    service: myservice
```

対応する `source` パラメーターに `windows.events` を設定すると、[インテグレーション自動処理パイプライン][2]の恩恵を受けることができます。

[1]: https://docs.datadoghq.com/ja/agent/logs/#activate-log-collection
[2]: https://docs.datadoghq.com/ja/logs/processing/pipelines/#integration-pipelines
{{% /tab %}}
{{< /tabs >}}

`<CHANNEL_2>` パラメーターに、イベントを収集したい Windows チャンネル名を入力します。

最後に、[Agent を再起動][7]します。

**注**: Security ログチャンネルの場合は、Datadog Agent ユーザーを `Event Log Readers` ユーザーグループに追加してください。

### イベントの絞り込み

イベントログに 1 つ以上のフィルターを構成します。フィルターを使用すると、Datadog に取り込むログイベントを選択できます。

  {{< tabs >}}
  {{% tab "イベント" %}}

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

レガシーモードフィルターの例:

  - `log_file`: `Application`、`System`、`Setup`、`Security`
  - `type`: `Critical`、`Error`、`Warning`、`Information`、`Audit Success`、`Audit Failure`
  - `source_name`: 使用可能な任意のソース名
  - `event_id`: Windows EventLog ID

  非レガシーモードフィルターの例:

  - `path`: `Application`、`System`、`Setup`、`Security`
  - `type`: `Critical`、`Error`、`Warning`、`Information`、`Success Audit`、`Failure Audit`
  - `source`: 使用可能な任意のソース名
  - `id`: event_id: Windows EventLog ID

  各モードで利用可能なすべてのフィルターオプションについては、[sample win32_event_log.d/conf.yaml][1] を参照してください。

  いくつかのフィルターの例を示します。

  ```yaml
  instances:
    # LEGACY MODE
    # The following captures errors and warnings from SQL Server which
    # puts all events under the MSSQLSERVER source and tag them with #sqlserver.
    - tags:
        - sqlserver
      type:
        - Warning
        - Error
      log_file:
        - Application
      source_name:
        - MSSQLSERVER

    # This instance captures all system errors and tags them with #system.
    - tags:
        - system
      type:
        - Error
      log_file:
        - System
  ```

  ```yaml
  instances:
    # NON-LEGACY MODE
    - legacy_mode: false
      path: System
      filters:
        source:
        - Microsoft-Windows-Ntfs
        - Service Control Manager
        type:
        - Error
        - Warning
        - Information
        - Success Audit
        - Failure Audit
        id:
        - 7036
  ```

[1]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
{{% /tab %}}
{{% tab "Logs" %}}

各フィルターについて、コンフィギュレーションファイル `win32_event_log.d/conf.yaml` にログ処理ルールを追加します。

いくつかのフィルターの例を示します。

  ```yaml
    - type: windows_event
      channel_path: Security
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: include_at_match
        name: relevant_security_events
        pattern: '"EventID":"(1102|4624|4625|4634|4648|4728|4732|4735|4737|4740|4755|4756)"'

    - type: windows_event
      channel_path: Security
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: exclude_at_match
        name: relevant_security_events
        pattern: '"EventID":"(1102|4624)"'

    - type: windows_event
      channel_path: System
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: include_at_match
        name: system_errors_and_warnings
        pattern: '"level":"((?i)warning|error)"'

    - type: windows_event
      channel_path: Application
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: include_at_match
        name: application_errors_and_warnings
        pattern: '"level":"((?i)warning|error)"'
  ```

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
          pattern: '"EventID":"(101|201|301)"'
  ```

**注**: このパターンはログの形式によって異なる場合があります。[Agent `stream-logs` サブコマンド][1]を使用すると、この形式を表示することができます。

ログをフィルタリングする例については、[高度なログ収集のドキュメント][2]を参照してください。

  #### レガシーイベント
_Agent バージョン 7.41 未満に適用されます_

Legacy Provider EventID は、[Windows Event Schema][3] で見られるように、ログの形式を変更する `Qualifiers` 属性を持っています。これらのイベントは、Windows イベントビューアで見ることができる、次のような XML 形式を持っています。
  ```xml
  <EventID Qualifiers="16384">3</EventID>
  ```

これらの EventID にマッチするように、以下の正規表現を使用する必要があります。
  ```yaml
  logs:
    - type: windows_event
      channel_path: Security
      source: windows.event
      service: Windows
      log_processing_rules:
        - type: include_at_match
          name: include_legacy_x01
          pattern: '"EventID":{"value":"(101|201|301)"'
  ```

Agent バージョン 7.41 以降では、EventID フィールドが正規化され、このレガシーパターンは適用されなくなりました。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/
[2]: https://docs.datadoghq.com/ja/agent/logs/advanced_log_collection/?tab=configurationfile
[3]: https://learn.microsoft.com/en-us/windows/win32/wes/eventschema-systempropertiestype-complextype
{{% /tab %}}
{{< /tabs >}}

フィルターの設定が終わったら、Agent Manager を使用して [Agent の再起動][7]を行います (またはサービスを再起動します)。

### 検証

{{< tabs >}}
{{% tab "イベント" %}}

Datadog Agent Manager の情報ページを確認するか、[Agent の `status` サブコマンド][1]を実行し、Checks セクションで `win32_event_log` を探します。以下のようなセクションが表示されるはずです。

```shell
Checks
======

  [...]

  win32_event_log
  ---------------
      - instance #0 [OK]
      - Collected 0 metrics, 2 events & 1 service check
```

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{% tab "Logs" %}}

Datadog Agent Manager の情報ページを確認するか、[Agent の `status` サブコマンド][1]を実行し、Logs Agent セクションで `win32_event_log` を探します。以下のようなセクションが表示されるはずです。

```shell
Logs Agent
==========

  [...]

  win32_event_log
  ---------------
    - Type: windows_event
      ChannelPath: System
      Status: OK
```

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

## 収集データ

### メトリクス

Win32 Event log チェックには、メトリクスは含まれません。

### イベント

すべての Windows イベントが Datadog に転送されます。

### サービスのチェック

Win32 Event log チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## {{< partial name="whats-next/whats-next.html" >}}

### ドキュメント

- (レガシー) [イベントログファイルを `Win32_NTLogEvent` WMI クラスに追加する][9]

### GitHub

- [Windows Server 2012 の監視][10]
- [Windows Server 2012 メトリクスの収集方法][11]
- [Datadog を使用した Windows Server 2012 の監視][12]


[1]: https://docs.microsoft.com/en-us/windows/win32/eventlog/event-logging
[2]: https://app.datadoghq.com/account/settings#agent/windows
[3]: https://docs.datadoghq.com/ja/events/
[4]: https://docs.datadoghq.com/ja/logs/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://docs.datadoghq.com/ja/integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class/
[10]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[11]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[12]: https://www.datadoghq.com/blog/windows-server-monitoring