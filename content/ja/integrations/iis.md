---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
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
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: iis.
metric_to_check: iis.uptime
name: iis
public_title: Datadog-IIS インテグレーション
short_description: 全体またはサイトごとのメトリクスを追跡し、各サイトの稼働/停止状態を監視 status.
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

1. IIS サーバーに [Agent をインストール][3]します。

2. IIS サーバーに `Win32_PerfFormattedData_W3SVC_WebService` WMI クラスがインストールされている必要があります。
  確認するには、次のコマンドを使用します。
  ```
  Get-WmiObject -List -Namespace root\cimv2 | select -Property name | where name -like "*Win32_PerfFormattedData_W3SVC*"
  ```

  このクラスは、web-common-http Windows Feature の一部としてインストールされます。

  ```
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

### コンフィグレーション

[Agent の構成ディレクトリ][5]のルートにある [Agent の `conf.d` ディレクトリ][4]の `iis.d/conf.yaml` ファイルを編集します。

#### IIS の準備

まず、IIS サーバーで WMI カウンターを再同期します。

Windows <2003 (または同等のバージョン) の場合は、cmd.exe で次のコマンドを実行します。

```
C:/> winmgmt /clearadap
C:/> winmgmt /resyncperf
```

Windows >=  2008 (または同等のバージョン) の場合は、次のコマンドを実行します。

```
C:/> winmgmt /resyncperf
```

#### メトリクスの収集

 * [IIS のメトリクス](#metrics)の収集を開始するには、`iis.d/conf.yaml` ファイルに次の構成ブロックを追加します。

```
init_config:

instances:
  - host: . # "." は現在のホストを意味します
  # sites:  # 特定のサイトを監視するか、サイトごとにメトリクスを収集するか
  #   - example.com
  #   - dev.example.com
```

サイトごとにメトリクスを収集するには、`sites` オプションを使用します。セットアップすると、Agent は、リストされたサイトごとにメトリクスを収集し、それぞれのサイト名でタグ付けします。`sites` を構成しない場合も、Agent は同じメトリクスを収集しますが、それらの値はすべてのサイトの合計になります。

リモート IIS サーバー上のサイトを監視することもできます。関連する構成オプションの詳細については、[サンプル iis.d/conf.yaml][6] を参照してください。デフォルトでは、このチェックは単一のインスタンス (Agent が実行されている現在のマシン) に対して実行されます。そのマシン上の IIS の WMI パフォーマンスカウンターがチェックされます。

他のリモートマシンもチェックする場合は、ホストごとに 1 つのインスタンスを追加します。
注: 現在のマシンでもカウンターをチェックする場合は、空のパラメーターを使用してインスタンスを作成する必要があります。

オプションの `provider` パラメーターを使用すると、WMI プロバイダーを指定できます (デフォルトは、Datadog Agent 32 ビットの場合は `32`、そうでない場合は `64`). これは、デフォルト以外のプロバイダーに WMI データをリクエストするために使用されます。使用できるオプションは `32` または `64` です。詳細については、[この MSDN 記事を参照してください][7]。

`sites` パラメーターを使用すると、メトリクスを読み取るサイトのリストを指定できます。サイトを指定すると、メトリクスにはサイト名がタグ付けされます。サイトを定義しない場合、このチェックはすべてのサイトの集計値を取得します。

以下に、現在のマシンと、MYREMOTESERVER という名前のリモートマシンをチェックする構成の例を挙げます。リモートホストでは、デフォルトのサイトからのみメトリクスを取得します。

```
- host: .
  tags:
    - myapp1
  sites:
    - Default Web Site
- host: MYREMOTESERVER
  username: MYREMOTESERVER\fred
  password: mysecretpassword
  is_2008: false
```

* `is_2008` (オプション) - 注: IIS6/7 (主に W2K8) には、perfmon が TotalBytesTransferred を TotalBytesTransfered として報告するというスペルミスがあるため、この環境で IIS メトリクスを取得するには、これを有効にする必要があります。

* 使用可能なすべての構成オプションの詳細については、[サンプル iis.yaml][6] を参照してください。

* [Agent を再起動][8]すると、Datadog への IIS メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

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
            sourcecategory: http_web_access
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。
    使用可能なすべての構成オプションの詳細については、[サンプル iis.d/conf.yaml][6] を参照してください。

3. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `iis` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "iis" >}}


### イベント
IIS チェックには、イベントは含まれません。

### サービスのチェック

**iis.site_up**:<br>
Agent は、`iis.yaml` で構成されたサイトごとにこのサービスチェックを送信します。サイトのアップタイムがゼロの場合は、`Critical` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/iis/images/iisgraph.png
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/windows/#agent-check-directory-structure
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[7]: https://msdn.microsoft.com/en-us/library/aa393067.aspx
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/iis/metadata.csv
[12]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}