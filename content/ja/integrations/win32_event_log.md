---
aliases:
  - /ja/integrations/event_viewer/
  - /ja/integrations/eventviewer/
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/win32_event_log/README.md'
display_name: Win32
draft: false
git_integration_title: win32_event_log
guid: b04d6f04-947c-4068-b73d-f861adc39959
integration_id: win32-event-log
integration_title: Win 32 event log
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: win32_event_log.
name: win32_event_log
public_title: Datadog-Win 32 Event Log インテグレーション
short_description: Windows のイベントを Datadog イベントストリームへ送信。
support: コア
supported_os:
  - windows
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

特定の Windows イベントからログを収集するには、チャンネルを `conf.d/win32_event_log.d/conf.yaml` ファイルに手動で追加するか、Datadog Agent Manager を使用します。

チャンネルリストを表示するには、PowerShell で以下のコマンドを実行します。

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

次に、チャンネルを `win32_event_log.d/conf.yaml` 構成ファイルに追加します。

```yaml
logs:
  - type: windows_event
    channel_path: "<チャンネル_1>"
    source: "<チャンネル_1>"
    service: myservice

  - type: windows_event
    channel_path: "<チャンネル_2>"
    source: "<チャンネル_2>"
    service: myservice
```

`<CHANNEL_X>` パラメーターは、イベントの収集に使用する Windows チャンネル名に変更してください。
[インテグレーションの自動処理パイプライン][5]を利用するには、対応する `source` パラメーターを同じチャンネル名に設定します。

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
   instances:
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

2. Agent Manager を使用して [Agent を再起動][4]します (またはサービスを再起動します)。

### 検証

Datadog Agent Manager の情報ページを確認するか、[Agent の `status` サブコマンド][6]を実行し、Checks セクションで `win32_event_log` を探します。以下のようなセクションが表示されるはずです。

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

すべての Windows イベントが Datadog アプリケーションに転送されます。

### サービスのチェック

Win32 Event log チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

### ドキュメント

- [イベントログファイルを `Win32_NTLogEvent` WMI クラスに追加する方法][8]

### ブログ

- [Windows Server 2012 の監視][9]
- [Windows Server 2012 メトリクスの収集方法][10]
- [Datadog を使用した Windows Server 2012 の監視][11]

[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/logs/processing/pipelines/#integration-pipelines
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.datadoghq.com/ja/integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class/
[9]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[10]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[11]: https://www.datadoghq.com/blog/windows-server-monitoring