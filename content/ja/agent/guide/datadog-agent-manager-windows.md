---
further_reading:
- link: /agent/basic_agent_usage/windows/
  tag: Documentation
  text: Basic Agent Usage for the Windows Agent
title: Datadog Agent Manager for Windows
---

## 概要

Datadog Agent Manager GUI はブラウザベースです。GUI が実行されるポートは `datadog.yaml` ファイルで構成できます。ポートを `-1` に設定すると、GUI が無効になります。 デフォルトでは、Windows と Mac ではポート 5002 で有効になっており、Linux では無効になっています。

### 要件

1. cookie をブラウザーで有効にする必要があります。GUI は、GUI サーバーとのすべての通信を認証するために使用されるトークンを生成し、ブラウザーに保存します。

2. GUI は、GUI を起動するユーザーが正しいユーザーアクセス許可を持つ場合にのみ起動されます。`datadog.yaml` を開くことができれば、GUI を使用できます。

3. セキュリティ上の理由から、GUI はローカルネットワークインターフェイス (localhost/127.0.0.1) からのみアクセスできます。そのため、Agent を同じホストで実行する必要があります。したがって、Agent を VM やコンテナーで実行してホストマシンからアクセスすることはできません。

#### サポートされるブラウザ

| Browser       | サポートされるバージョン (以降) | コメント                 |
|---------------|------------------------------|-------------------------|
| IE            | 11                           |                         |
| Edge          | 12                           |  Pre-Chromium Edge |
| Edge-chromium | 79                           |                         |
| Firefox       | 38                           |                         |
| Chrome        | 60                           |                         |
| Safari        | 8                            |                         |
| iOS           | 12                           |  Mobile Safari          |

### Datadog Agent Manager を起動する

Agent を Windows ホストに[インストール][1]した後、Datadog Agent Manager を起動して Agent をグラフィカルに管理します。

Windows のスタートメニューから

* Datadog フォルダーをクリックします。
* Datadog Agent Manager を右クリックします。
* `Run as Administrator` を選びます。

管理者特権の PowerShell プロンプトから
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
```

Datadog Agent Manager がデフォルトのウェブブラウザで起動します。ウェブアドレスは `http://127.0.0.1:5002` です。

## オプション

次のセクションでは、左側のナビゲーションバーのオプションについて説明します。

### ステータス

#### 一般

Datadog Agent Manager を起動すると、デフォルトで一般ステータスページが表示されます。次のセクションが含まれます。

| セクション     | 説明                                                                     |
|-------------|---------------------------------------------------------------------------------|
| Agent Info  | バージョン、ログレベル、ファイルパスなどの Agent に関する情報を提供します。 |
| System Info | システム時間、ntp オフセット、Go、Python バージョンに関する情報が含まれています。       |
| ホスト情報   | OS、プラットフォーム、プロシージャ、稼働時間などのホストに関する情報を提供します。     |
| ホスト名   | Agent が検出したホスト名とホストタグを表示します。                        |
| JMX Status  | JMX チェックのリストとそのステータス。                                         |
| Forwarder   | API キーのステータスなど、Agent の Forwarder に関する情報。       |
| エンドポイント   | Agent が使用中のエンドポイント。                                                  |
| ログ Agent  | Logs Agent に関する情報（有効な場合）。                                     |
| Aggregator  | Agent のデータ Aggregator に関する情報。                                     |
| DogStatsD   | DogStatsD で送信されたデータの統計。                                         |

#### コレクター

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

### ログ

ログページには、`agent.log` に出力される Agent ログが表示されます。ログは、最新のものまたは古いものから順にソートできます。

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

### 設定

設定ページには、Agent のメイン構成ファイル `datadog.yaml` の内容が表示されます。このファイルは、Datadog Agent Manager から直接編集できます。変更を行った後、右上の **Save** をクリックし、[Agent を再起動](#restart-agent)します。

使用可能なすべての構成オプションの詳細については、[サンプル config_template.yaml][2] を参照してください。

### チェック

#### チェックの管理

チェックの管理ページには、有効なチェック構成ファイルの内容が表示されます。このファイルは、Datadog Agent Manager から直接編集できます。変更を行った後、右上の **Save** をクリックし、[Agent を再起動](#restart-agent)します。

チェックを追加するには、ドロップダウンメニューで **Add a Check** を選択します。これにより、インストール可能なチェックのリストが表示されます。構成の詳細については、特定のチェックの[インテグレーション][3]ページを参照してください。

#### チェック内容のサマリー

チェック内容のサマリーページには、実行中のチェックのリスト、各チェックのインスタンス数、チェックのステータスが表示されます。

### フレア

Agent に問題がある場合、フレアページは [Datadog サポート][4]チームとトラブルシューティングする際に役立ちます。チケット番号（任意）とメールアドレスを入力して、**Submit** をクリックします。これにより、Agent ログと構成ファイルのコピーが Datadog サポートに送信されます。フレアの詳細については、[Agent フレア][5]のドキュメントをご覧ください。

### Agent の再起動

左側のナビゲーションバーで **Restart Agent** をクリックすると、Agent が即座に再起動します。ページや確認プロンプトはありません。Agent を再起動すると、[一般ステータス](#general)ページに転送されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/basic_agent_usage/windows/#installation
[2]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[3]: /ja/integrations/
[4]: /ja/help/
[5]: /ja/agent/troubleshooting/send_a_flare/