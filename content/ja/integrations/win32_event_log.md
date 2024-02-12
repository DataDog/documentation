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
integration_title: Windows Event Log
integration_version: 2.14.1
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: win32_event_log
oauth: {}
public_title: Windows Event Log
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
  title: Windows Event Log
---



## 概要

このインテグレーションは、Windows Event Log を監視して Datadog に転送します。

このインテグレーションを有効にすると、

- システムとアプリケーションのイベントを Datadog で追跡できます。
- システムとアプリケーションのイベントを他のアプリケーションと関連付けることができます。

詳細については、[Windows のイベントログのドキュメント][1]を参照してください。

## セットアップ

### インストール

Windows Event Log チェックは [Datadog Agent][2] パッケージに含まれています。追加のインストールは必要ありません。

### コンフィギュレーション

Windows Event Log の収集方法は、以下のいずれか、または両方があります。

- [Datadog イベント][3]として
- [Datadog ログ][4]として

どちらの方法も [Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `win32_event_log.d/conf.yaml` で構成されます。使用可能なすべての構成オプションの詳細については、[サンプル win32_event_log.d/conf.yaml][6] を参照してください。


#### Windows Event チャンネルをリストアップ

まず、監視したい Windows Event Log チャンネルを特定します。

収集方法によって、チャンネル名は以下の構成パラメーターに使用することができます。

- Datadog ログ: `channel_path`
- Datadog イベント: `path`
- Datadog イベント (レガシー): `log_file`

##### PowerShell

チャンネルの一覧を表示するには、PowerShell で以下のコマンドを実行します。

```powershell
Get-WinEvent -ListLog *
```

最もアクティブなチャンネルを表示するには、PowerShell で以下のコマンドを実行します。

```powershell
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

このコマンドは、チャンネルを `LogMode MaximumSizeInBytes RecordCount LogName` の形式で表示します。

応答例

```text
LogMode  MaximumSizeInBytes RecordCount LogName 
Circular          134217728      249896 Security
Circular            5242880        2932 <CHANNEL_2>
```

`LogName` 列の値は、チャンネルの名前です。上の例では、チャンネル名は `Security` です。

##### Windows Event Viewer

Windows Event Viewer で Event Log のチャンネル名を見つけるには、Event Log Properties ウィンドウを開き、`Full Name` フィールドを参照します。次の例では、チャンネル名は `Microsoft-Windows-Windows Defender/Operational` です。

![Windows Event Log][7]

{{< tabs >}}

{{% tab "イベント" %}}

#### イベント収集

Windows Event Log を Datadog イベントとして収集するには、`win32_event_log.d/conf.yaml` コンフィギュレーションファイルの `instances:` セクションでチャンネルを設定します。

Datadog Agent は、Windows Event Log を Datadog イベントとして収集するために、2 つの方法で構成することができます。それぞれの方法には、チャンネルとフィルターの構成構文があります。詳しくは、[イベントのフィルタリング](?tab=events#filtering-events)を参照してください。

* 最新の方法は、Event Log API を使用します。Datadog では、以下のレガシーな方法よりもパフォーマンスが良いため、Event Log API を使用することを推奨しています。

  </br> Event Log API の収集方法を使用するには、各インスタンスで `legacy_mode: false` を設定します。`legacy_mode: false` を設定した場合、`path` は `\win32_event_log.d\conf.yaml` ファイルで設定する必要があります。

  </br> この例では、`Security` と `<CHANNEL_2>` チャンネルのエントリーを示します。

  ```yaml
  init_config:
  instances:
    - # Event Log API 
      path: Security
      legacy_mode: false
      filters: {}

    - path: "<CHANNEL_2>" 
      legacy_mode: false
      filters: {}
  ```

* レガシーな方法は WMI を使用し、インスタンスのデフォルトモードとなります。

  </br> `legacy_mode` が設定されていないか `true` に設定されている場合、`source_name`、`event_id`、`message_filters`、`log_file`、`type` のフィルターのうち少なくとも 1 つが設定されている必要があります。

  </br> この例では、`Security` と `<CHANNEL_2>` チャンネルのエントリーを示します。

  ```yaml
  init_config:
  instances:
    - # WMI (default)
      legacy_mode: true
      log_file:
        - Security

    - legacy_mode: true
      log_file:
        - "<CHANNEL_2>"
  ```

  詳しくは、[イベントログファイルを `Win32_NTLogEvent` WMI クラスに追加する][1]を参照してください。


[1]: https://docs.datadoghq.com/ja/integrations/guide/add-event-log-files-to-the-win32-ntlogevent-wmi-class/
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

最後に、[Agent を再起動][8]します。

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
<code>Get-EventLog</code> PowerShell コマンドまたは Windows イベントビューア GUI から提供される情報が、<code>Get-WmiObject</code> から提供される情報とは多少異なる場合があります。<br>設定したイベントがインテグレーションによってキャプチャされない場合は、<code>Get-WmiObject</code> を使用してフィルターの値をダブルチェックしてください。
</div>

Datadog Agent は、Windows Event Log を Datadog イベントとして収集するために、2 つの方法で構成することができます。それぞれの方法には、フィルターの構成構文があります。各モードで使用可能なフィルターオプションについては、[サンプル win32_event_log.d/conf.yaml][1] を参照してください。

Datadog では、フィルターに最新の方法を使用することを推奨しています。

* 最新の方法には、以下のフィルターが含まれています。

  - `path`: `Application`、`System`、`Setup`、`Security`
  - `type`: `Critical`、`Error`、`Warning`、`Information`、`Success Audit`、`Failure Audit`
  - `source`: 使用可能な任意のソース名
  - `id`: event_id: Windows EventLog ID

  このフィルター例では、最新の方法を使用しています。

  ```yaml
  instances:
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

[`query` オプション][2]を使用して、[XPATH または構造化 XML クエリ][3]でイベントをフィルターすることができます。Datadog は、Event Viewer に表示されるイベントが Datadog Agent に収集させたいものと一致するまで、Event Viewer のフィルターエディタでクエリを作成することを推奨します。`filters` オプションは `query` オプションを使用すると無視されます。

  ```yaml
  init_config:
  instances:
    # Critical、Warning、Error イベントを収集します
    - path: Application
      legacy_mode: false
      query: '*[System[(Level=1 or Level=2 or Level=3)]]'

    - path: Application
      legacy_mode: false
      query: |
        <QueryList>
          <Query Id="0" Path="Application">
            <Select Path="Application">*[System[(Level=1 or Level=2 or Level=3)]]</Select>
          </Query>
        </QueryList>
 ```

* レガシーな方法には、以下のフィルターが含まれています。

  - `log_file`: `Application`、`System`、`Setup`、`Security`
  - `type`: `Critical`、`Error`、`Warning`、`Information`、`Audit Success`、`Audit Failure`
  - `source_name`: 使用可能な任意のソース名
  - `event_id`: Windows EventLog ID

* レガシーメソッドは `query` オプションをサポートしていません。最新のメソッド (`legacy_mode: false` を設定) と Logs Tailer だけが `query` オプションをサポートしています。

  このフィルター例では、レガシーな方法を使用しています。

  ```yaml
  instances:
    # Legacy
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

[1]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
[2]: https://github.com/DataDog/integrations-core/blob/10296a69722b75098ed0b45ce55f0309a1800afd/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example#L74-L89
[3]: https://learn.microsoft.com/en-us/windows/win32/wes/consuming-events
{{% /tab %}}
{{% tab "Logs" %}}

イベントログのフィルターには、 `log_processing_rules` 正規表現オプションと同様に `query` を使用することができます。Datadog では、Windows Event Log の生成速度が速く、CPU とメモリの使用量が `log_processing_rules` フィルターよりも少ない `query` オプションの使用を推奨しています。`log_processing_rules` フィルターを使用すると、Agent は各イベントを処理し、正規表現で除外されてもフォーマットするように強制されます。`query` オプションを使用すると、これらのイベントは Agent に報告されません。

`query` オプションを使用すると、[XPATH または構造化 XML クエリ][1]でイベントをフィルターすることができます。`query` オプションは `log_processing_rules` によって処理されるイベントの数を減らし、パフォーマンスを向上させることができます。XPath や XML クエリの構文には式の制限があります。フィルターを追加するには、`log_processing_rules` フィルターを使用してください。

Datadog は、Event Viewer に表示されるイベントが Agent に収集させたいものと一致するまで、Event Viewer のフィルターエディタでクエリを作成してテストすることを推奨します。

![Filter Current Log][2]

次に、Agent 構成にクエリをコピーアンドペーストします。

```yaml
  # Critical、Warning、Error イベントを収集します
  - type: windows_event
    channel_path: Application
    source: windows.events
    service: Windows       
    query: '*[System[(Level=1 or Level=2 or Level=3)]]'

  - type: windows_event
    channel_path: Application
    source: windows.events
    service: Windows       
    query: |
      <QueryList>
        <Query Id="0" Path="Application">
          <Select Path="Application">*[System[(Level=1 or Level=2 or Level=3)]]</Select>
        </Query>
      </QueryList>
```

![XML Query][3]

`query` オプションに加えて、ログ処理ルールでイベントをさらにフィルターすることができます。

フィルターの例としては、以下のようなものがあります。

```yaml
  - type: windows_event
    channel_path: Security
    source: windows.events
    service: Windows       
    log_processing_rules:
    - type: include_at_match
      name: relevant_security_events
      pattern: '"EventID":(?:{"value":)?"(1102|4624|4625|4634|4648|4728|4732|4735|4737|4740|4755|4756)"'

  - type: windows_event
    channel_path: Security
    source: windows.events
    service: Windows       
    log_processing_rules:
    - type: exclude_at_match
      name: relevant_security_events
      pattern: '"EventID":(?:{"value":)?"(1102|4624)"'

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
        pattern: '"EventID":(?:{"value":)?"(101|201|301)"'
```

**注**: このパターンはログの形式によって異なる場合があります。[Agent `stream-logs` サブコマンド][4]を使用すると、この形式を表示することができます。

ログをフィルタリングする例については、[高度なログ収集のドキュメント][5]を参照してください。

#### レガシーイベント
_Agent バージョン 7.41 未満に適用されます_

Legacy Provider EventID は、[Windows Event Schema][6] で見られるように、ログの形式を変更する `Qualifiers` 属性を持っています。これらのイベントは、Windows イベントビューアで見ることができる、次のような XML 形式を持っています。
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

Agent バージョン 7.41 以降では、EventID フィールドが正規化されます。このため、レガシーパターンから部分文字列 `(?:{"value":)?` が不要になりました。バージョン 7.41 以降では、以下のような短い正規表現パターンを使用することができます。

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

[1]: https://learn.microsoft.com/en-us/windows/win32/wes/consuming-events
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/win32_event_log/images/filter-event-viewer.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-core/master/win32_event_log/images/xml-query-event-viewer.png
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/
[5]: https://docs.datadoghq.com/ja/agent/logs/advanced_log_collection/?tab=configurationfile#filter-logs
[6]: https://learn.microsoft.com/en-us/windows/win32/wes/eventschema-systempropertiestype-complextype
{{% /tab %}}
{{< /tabs >}}

フィルターの設定が終わったら、Agent Manager を使用して [Agent の再起動][8]を行います (またはサービスを再起動します)。

### 検証

{{< tabs >}}
{{% tab "イベント" %}}

Datadog Agent Manager の情報ページを確認するか、[Agent の `status` サブコマンド][1]を実行し、Checks セクションで `win32_event_log` を探します。

以下のようなセクションが表示されるはずです。

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

Datadog Agent Manager の情報ページを確認するか、[Agent の `status` サブコマンド][1]を実行し、Logs Agent セクションで `win32_event_log` を探します。

以下のようなセクションが表示されるはずです。

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

Windows Event Log チェックには、メトリクスは含まれません。

### イベント

すべての Windows イベントが Datadog に転送されます。

### サービスのチェック

Windows Event Log チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ヘルプが必要ですか？[Datadog サポート][9]に [Agent Flare][10] でお問い合わせください。

### ログ処理ルールが機能しない

ログ処理ルールを使用してログをフィルターする場合、生のログが構成した正規表現 (regex) パターンに一致することを確認してください。以下の構成では、ログレベルは `warning` または `error` のいずれかでなければなりません。それ以外の値は除外されます。

```yaml
    - type: windows_event
      channel_path: System
      source: windows.events
      service: Windows       
      log_processing_rules:
      - type: include_at_match
        name: system_errors_and_warnings
        pattern: '"level":"((?i)warning|error)"'
```

ログ処理ルールをトラブルシューティングするには
1. `log_processing_rules` スタンザを削除するかコメントアウトします。
1. Agent を再起動します。
1. キャッチしようとしている値を含むテストログを送信してください。ログが Datadog に表示される場合は、正規表現に問題がある可能性があります。正規表現とログファイルを比較して、正しいフレーズをキャプチャしていることを確認してください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [高度なログの収集][11]
- [Windows Server 2012 の監視][12]
- [Windows Server 2012 メトリクスの収集方法][13]
- [Datadog を使用した Windows Server 2012 の監視][14]
- [Datadog を使用した Windows イベントログの監視][15]


[1]: https://docs.microsoft.com/en-us/windows/win32/eventlog/event-logging
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[3]: https://docs.datadoghq.com/ja/events/
[4]: https://docs.datadoghq.com/ja/logs/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/win32_event_log/images/windows-defender-operational-event-log-properties.png
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://docs.datadoghq.com/ja/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[11]: https://docs.datadoghq.com/ja/agent/logs/advanced_log_collection/?tab=configurationfile
[12]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[13]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[14]: https://www.datadoghq.com/blog/windows-server-monitoring
[15]: https://www.datadoghq.com/blog/monitor-windows-event-logs-with-datadog/