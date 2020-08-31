---
assets:
  dashboards: {}
  logs:
    source: iis
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/iis/README.md'
display_name: IIS
git_integration_title: iis
guid: 6ad932f0-8816-467a-8860-72af44d4f3ba
integration_id: iis
integration_title: IIS
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: iis.
metric_to_check: iis.uptime
name: iis
public_title: Datadog-IIS インテグレーション
short_description: 全体またはサイトごとのメトリクスを追跡し、各サイトの稼働/停止状態を監視
support: コア
supported_os:
  - windows
---
![IIS グラフ][1]

## 概要

すべてのサイトを集計して、またはサイトごとに IIS メトリクスを収集します。IIS Agent チェックは、アクティブな接続数、送信および受信バイト数、HTTP メソッド別のリクエスト数などのメトリクスを収集します。サイトごとのサービスチェックも送信されるため、サイトが稼働しているか停止しているかを把握できます。

## セットアップ

### インストール

IIS チェックは Agent にパッケージ化されています。IIS のメトリクスとログの収集を開始するには、以下のようにします。

1. IIS サーバーに [Agent をインストール][2]します。

2. IIS サーバーに `Win32_PerfFormattedData_W3SVC_WebService` WMI クラスがインストールされている必要があります。確認するには、次のコマンドを使用します。

    ```text
    Get-WmiObject -List -Namespace root\cimv2 | select -Property name | where name -like "*Win32_PerfFormattedData_W3SVC*"
    ```

   このクラスは、web-common-http Windows Feature の一部としてインストールされます。

    ```text
    PS C:\Users\vagrant> Get-WindowsFeature web-* | where installstate -eq installed | ft -AutoSize

    Display Name                       Name               Install State
    ------------                       ----               -------------
    [X] Web Server (IIS)               Web-Server             Installed
    [X] Web Server                     Web-WebServer          Installed
    [X] Common HTTP Features           Web-Common-Http        Installed
    [X] Default Document               Web-Default-Doc        Installed
    [X] Directory Browsing             Web-Dir-Browsing       Installed
    [X] HTTP Errors                    Web-Http-Errors        Installed
    [X] Static Content                 Web-Static-Content     Installed
    ```

この機能がない場合は、`install-windowsfeature web-common-http` を使用して追加できます。正しく動作させるには、システムの再起動が必要です。

### 構成

まず、IIS サーバーで WMI カウンターを再同期します。Windows <2003 (または同等のバージョン) の場合は、cmd.exe で次のコマンドを実行します。

```text
C:/> winmgmt /clearadap
C:/> winmgmt /resyncperf
```

Windows >=  2008 (または同等のバージョン) の場合は、次のコマンドを実行します。

```text
C:/> winmgmt /resyncperf
```

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

##### メトリクスの収集

1. IIS のサイトデータの収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある [Agent の `conf.d` ディレクトリ][3]の `iis.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル iis.d/conf.yaml][5] を参照してください。

2. [Agent を再起動][6]すると、Datadog への IIS メトリクスの送信が開始されます。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. IIS のログの収集を開始するには、次の構成ブロックを `iis.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: C:\inetpub\logs\LogFiles\W3SVC1\u_ex*
       service: myservice
       source: iis
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル iis.d/conf.yaml][5] を参照してください。

3. [Agent を再起動します][6]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][7]をガイドとして参照して、次のパラメーターを適用します。

##### メトリクスの収集

| パラメーター            | 値                  |
| -------------------- | ---------------------- |
| `<インテグレーション名>` | `iis`                  |
| `<初期コンフィギュレーション>`      | 空白または `{}`          |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][8]を参照してください。

| パラメーター      | 値                                            |
| -------------- | ------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "iis", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `iis` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "iis" >}}


### イベント

IIS チェックには、イベントは含まれません。

### サービスのチェック

**iis.site_up**:<br>
Agent は、`iis.yaml` で構成されたサイトごとにこのサービスチェックを送信します。サイトのアップタイムがゼロの場合は、`Critical` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/iis/images/iisgraph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/windows/#agent-check-directory-structure
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/iis/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/