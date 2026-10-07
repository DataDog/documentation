---
description: ブラウザベースの Datadog Agent Manager GUI を使用して、サポートされているブラウザおよび認証を利用して Windows
  Agent を構成および管理します。
further_reading:
- link: /agent/basic_agent_usage/windows/
  tag: ドキュメント
  text: Windows Agent の基本的なエージェントの利用方法
title: Windows 用 Datadog Agent Manager
---
## 概要 {#overview}

Datadog Agent Manager GUI はブラウザベースです。GUI が実行されるポートは、`datadog.yaml` ファイルで構成できます。ポートを `-1` に設定すると、GUI は無効になります。デフォルトでは、Windows と Mac ではポート 5002 で有効になっており、Linux では無効になっています。

### 要件 {#requirements}

1. ブラウザで Cookie を有効にする必要があります。GUI は、ブラウザにトークンを生成して保存します。トークンは GUI サーバーとのすべての通信を認証するために使用されます。

2. GUI は、それを起動するユーザーが適切なユーザー権限を持っている場合にのみ起動されます。`datadog.yaml` を開くことができれば、GUI を使用することができます。

3. セキュリティ上の理由から、GUI はローカルネットワークインターフェース (localhost/127.0.0.1) からのみアクセス可能であるため、ユーザーは Agent が実行されているホストにいる必要があります。つまり、Agent を VM またはコンテナで実行し、ホストからアクセスすることはできません。

#### サポートされるブラウザ {#supported-browsers}

| ブラウザ       | サポートされるバージョン (以降) | コメント                 |
|---------------|------------------------------|-------------------------|
| IE            | 11                           |                         |
| Edge          | 12                           |  Pre-Chromium Edge |
| Edge-chromium | 79                           |                         |
| Firefox       | 38                           |                         |
| Chrome        | 60                           |                         |
| Safari        | 8                            |                         |
| iOS           | 12                           |  Mobile Safari          |

### Datadog Agent Manager を起動する {#start-the-datadog-agent-manager}

Agent を Windows ホストに [インストール][1] した後、Datadog Agent Manager を起動して Agent をグラフィカルに管理します。

Windows のスタートメニューから

* {{< ui >}}Datadog{{< /ui >}} フォルダをクリックします。
* {{< ui >}}Datadog Agent Manager{{< /ui >}} を右クリックします。
* {{< ui >}}Run as Administrator{{< /ui >}} を選択します。

管理者特権の PowerShell プロンプトから

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
```

Datadog Agent Manager がデフォルトのウェブブラウザで起動します。ウェブアドレスは `http://127.0.0.1:5002` です。

## オプション {#options}

次のセクションでは、左側のナビゲーションバーのオプションについて説明します。

### ステータス {#status}

#### 一般 {#general}

Datadog Agent Manager を起動すると、デフォルトで一般ステータスページが表示されます。次のセクションが含まれます。

| セクション     | 説明                                                                     |
|-------------|---------------------------------------------------------------------------------|
| {{< ui >}}Agent Info{{< /ui >}}  | バージョン、ログレベル、ファイルパスなどの Agent に関する情報を提供します。|
| {{< ui >}}System Info{{< /ui >}} | システム時間、ntp オフセット、Go、Python バージョンに関する情報が含まれています。      |
| {{< ui >}}Host Info{{< /ui >}}   | OS、プラットフォーム、プロセス、稼働時間などのホストに関する情報を提供します。    |
| {{< ui >}}Hostnames{{< /ui >}}   | Agent が検出したホスト名とホストタグを表示します。                       |
| {{< ui >}}JMX Status{{< /ui >}}  | JMX チェックのリストとそのステータス。                                        |
| {{< ui >}}Forwarder{{< /ui >}}   | API キーのステータスなど、Agent の Forwarder に関する情報。     |
| {{< ui >}}Endpoints{{< /ui >}}   | Agent が使用中のエンドポイント。                                                 |
| {{< ui >}}Logs Agent{{< /ui >}}  | Logs Agent に関する情報 (有効な場合)。                                    |
| {{< ui >}}Aggregator{{< /ui >}}  | Agent のデータアグリゲーターに関する情報。                                    |
| {{< ui >}}DogStatsD{{< /ui >}}   | DogStatsD で送信されたデータの統計。                                        |

#### コレクター {#collector}

コレクターのステータスページには、Agent の実行中のチェックに関する詳細が表示されます。例:

```text
cpu
   Instance ID: cpu [OK]
   Total Runs: 1,561
   Metric Samples: 7, Total: 10,921
   Events: 0, Total: 0
   Service Checks: 0, Total: 0
   Average Execution Time: 4ms
```

### ログ {#log}

ログページには、`agent.log` に出力されている Agent のログが表示されます。ログは、新しい順または古い順に並べ替えることができます。

```text
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check cpu
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check cpu
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check disk
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check disk
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check file_handle
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check file_handle
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check io
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check io
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check memory
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check memory
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check network
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check network
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check ntp
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check ntp
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check uptime
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check uptime
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check winproc
2019-07-10 17:46:05 EDT | INFO | (runner.go:302 in work) | Done running check winproc
2019-07-10 17:48:02 EDT | INFO | (transaction.go:114 in Process) | Successfully posted payload to "https://6-2-1-app.agent.datadoghq.com/api/v1/check_run?api_key=*************************12345"
```

### 設定 {#settings}

設定ページには、Agent のメイン構成ファイル `datadog.yaml` の内容が表示されます。このファイルは、Datadog Agent Manager から直接編集できます。変更を行った後、右上の {{< ui >}}Save{{< /ui >}} をクリックし、[Agent を再起動](#restart-agent)してください。

利用可能なオプションの全リストについては、[Windows 用の `datadog.yaml` ファイルの例][6] を参照してください。

### チェック {#checks}

#### チェックの管理 {#manage-checks}

チェックの管理ページには、有効なチェックの構成ファイルの内容が表示されます。これらのファイルは、Datadog Agent Manager から直接編集できます。変更を行った後、右上の {{< ui >}}Save{{< /ui >}} をクリックし、[Agent を再起動](#restart-agent)してください。

チェックを追加するには、ドロップダウンメニューで {{< ui >}}Add a Check{{< /ui >}} を選択します。これにより、インストール可能なチェックのリストが表示されます。構成の詳細については、各チェックの [インテグレーション][3] ページを参照してください。

#### チェック内容のサマリー {#checks-summary}

チェック内容のサマリーページには、実行中のチェックのリスト、各チェックのインスタンス数、チェックのステータスが表示されます。

### フレア {#flare}

Agent に問題がある場合、フレアページが [Datadog サポート][4] チームとトラブルシューティングする際に役立ちます。チケット番号 (任意) とメールアドレスを入力し、{{< ui >}}Submit{{< /ui >}} をクリックします。これにより、Agent ログと構成ファイルのコピーが Datadog サポートに送信されます。フレアの詳細については、[Agent Flare][5] ドキュメントを参照してください。

### Agent を再起動する {#restart-agent}

左側のナビゲーションバーから {{< ui >}}Restart Agent{{< /ui >}} をクリックすると、Agent が直ちに再起動します。ページや確認プロンプトはありません。Agent の再起動後、[一般ステータス](#general)ページに転送されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/basic_agent_usage/windows/#installation
[3]: /ja/integrations/
[4]: /ja/help/
[5]: /ja/agent/troubleshooting/send_a_flare/
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example