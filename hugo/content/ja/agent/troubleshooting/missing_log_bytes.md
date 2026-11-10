---
description: ファイルローテーション後に報告された未読ログデータを調査し、Datadog Agent のログパイプラインにおけるバックプレッシャーを特定します。
further_reading:
- link: /agent/logs/log_transport/
  tag: ドキュメント
  text: ログの Agent 転送
- link: /agent/logs/advanced_log_collection/
  tag: ドキュメント
  text: 高度なログの収集
- link: /logs/guide/mechanisms-ensure-logs-not-lost/
  tag: ガイド
  text: ログの消失を防ぐメカニズム
- link: /agent/troubleshooting/send_a_flare/
  tag: ドキュメント
  text: Agent フレアの送信
title: 欠落したログバイトのトラブルシューティング
---
## 概要 {#overview}

Datadog Agent はアプリケーションログを収集し、Datadog に送信します。ファイルにログを書き込むアプリケーションの場合、Agent は新しいエントリーが追加されるたびにそれらのファイルを読み取ります。アプリケーションは多くの場合、ログファイルのサイズや期間が制限に達するとアクティブなファイルを新しいものに置き換えてローテーションします。

Agent がローテーションされたファイルの末尾に到達する前に読み取りを停止すると、残りのデータは Datadog に送信されません。Agent はこれを**欠落したログバイト**として報告します。[Log Explorer][11]でギャップに気づいたり、[Agent ログファイル][10]に警告が表示されたりすることがあります。

```text
WARN | After rotation close timeout (60s), there were 148213 bytes remaining unread for file "/var/log/app/app.log". These unread logs are now lost. Consider increasing DD_LOGS_CONFIG_CLOSE_TIMEOUT
```

Agent は、ローテーションを検出した後 `logs_config.close_timeout` (デフォルトでは 60 秒) の間ローテーションされたファイルの読み取りを継続します。このタイムアウトが経過した時点で未読データが残っている場合、Agent はファイルを閉じ、上記の警告を書き込みます。

## 考えられる原因 {#possible-causes}

バックプレッシャーは、Agent のログパイプラインのステージが処理に追いつかずステージやファイルの読み取りが遅延したときに発生します。頻繁なローテーションや大量のログも、Agent がタイムアウト内に処理を完了できない原因となることがあります。

- ネットワーク、プロキシ、認証、またはインテークのエラーにより、Agent が Datadog インテークにペイロードを配信できません。
- ネットワークまたはインテークレイテンシーにより、ログの送信が遅延しています。
- エンコーディング、バッチ処理、または圧縮がログパイプラインを制限しています。
- 処理ルールまたは複数行処理がログパイプラインを制限しています。
- ログのレートが、Agent が利用可能な CPU またはネットワークの容量を超えています。
- ダウンストリームのパイプラインが飽和していない場合でも、ローテーション間隔中に書き込まれたデータを Agent が読み取る前に対象のファイルがローテーションされます。

## 欠落したログバイトを診断する {#diagnose-missing-log-bytes}

1. ローテーションの警告に関する [Agent ログファイル][10]を検索します。影響を受けたファイルパス、タイムスタンプ、および未読バイトを記録します。
2. Agent 7.82.0 以降を使用している場合は、[ステータスコマンド][1]を実行し、[ログ Agent バックプレッシャー](#interpret-logs-agent-backpressure)セクションを参照してください。保持されている履歴と警告のタイムスタンプを比較します。
3. **ログ Agent バックプレッシャー**テーブルの複数の行が飽和している場合は、`destination_reliable_N`、`worker`、`strategy`、および `processor` の順序で調査します。[チューニングアクションを選択する](#choose-a-tuning-action)セクションを使用して、そのリストの最初の飽和コンポーネントに対する次のステップを選択します。
4. 関連する変更を 1 つ適用してから、別のコンポーネントに対処する前に、[結果を確認する](#verify-the-result)セクションに従います。
5. Agent が必要なボリュームを処理できない場合は、[ログボリュームを減らす](#reduce-log-volume)セクションに従います。

### ログ Agent バックプレッシャーを解釈する {#interpret-logs-agent-backpressure}

Agent バージョン 7.82.0 以降では、[ステータスコマンド][1]に**ログ Agent バックプレッシャー**セクションが含まれています。このセクションでは、プロセッサー、バッチ処理戦略、送信者ワーカー、および送信先の最近の利用状況が報告されます。ピーク時の利用状況は約 10 時間、詳細な飽和期間は 30 分間保持されます。

{{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}

このセクションは、[Agent フレア][2] 内の `status.log` にもあります。Agent の再起動時に履歴がリセットされるため、再起動前にフレアを取得してください。

```text
Logs Agent Backpressure
=======================

  Overall state: SATURATED
  Reason: destination_reliable_0 pipeline q0s0 is currently saturated (saturated for 3m20s in the last 30m)

  Component              Instance Current   5m avg/max    30m avg/max    2h max    5h max    10h max    30m saturated    Last saturated
  processor              0        20%       18/26%        15/41%         55%       55%       55%        0s               -
  strategy               0        14%       12/19%        13/22%         22%       22%       22%        0s               -
  worker                 q0s0     46%       43/63%        27/63%         63%       63%       63%        0s               -
  destination_reliable_0 q0s0     93%       82/93%        71/93%         93%       93%       93%        3m20s            12:09:42
```

`destination_reliable_0` が飽和状態であるため、プロセッサーやバッチ処理の設定を変更する前に[配信エラーを解決する](#resolve-delivery-errors)セクションに従ってください。

#### 全体的な状態 {#overall-state}

| 状態 | 意味 |
| --- | --- |
| `HEALTHY` | どのコンポーネントも飽和しておらず、過去 30 分間に飽和したコンポーネントもありません。|
| `WARNING` | 飽和しているコンポーネントはありませんが、過去 30 分間に少なくとも 1 つが飽和していました。`Last saturated` と欠落バイトの警告タイムスタンプを比較します。|
| `SATURATED` | 現在の 15 秒間のウィンドウ内で少なくとも 1 つのコンポーネントが飽和しきい値に達しました。|

飽和とは、コンポーネントが待機ではなく稼働にサンプリング時間の少なくとも 90% を費やしたことを意味します。ローテーション警告を使用して損失とテーブルを確認し、考えられる制約を特定してください。

#### テーブル列 {#table-columns}

| 列 | 意味 |
| --- | --- |
| `Component` | ログパイプラインのステージ。[チューニングアクションを選択する](#choose-a-tuning-action)セクションを参照してください。|
| `Instance` | パイプラインまたは送信先インスタンス。|
| `Current` | 約 15 秒間にわたって平滑化された利用率。|
| `5m avg/max` および `30m avg/max` |  指定されたウィンドウ内の平均およびピーク利用率。|
| `2h max`、`5h max`、および `10h max` | 指定されたウィンドウ内のピーク利用率。|
| `30m saturated` | 過去 30 分間に利用率が 90% 以上に達していた時間。|
| `Last saturated` | 最後に保持された飽和サンプルの時刻。`-` は、保持された利用可能なサンプルがないことを意味します。|

## Agent がローテーションされたファイルを読み取るための時間を増やす {#give-the-agent-more-time-to-read-rotated-files}

Agent がローテーションされたファイルの読み取りを完了するためにデフォルトの 60 秒以上かかる場合は、`logs_config.close_timeout` を増やしてください。180 秒のタイムアウトを使用するには、以下を実行します。

{{< tabs >}}
{{% tab "構成ファイル" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  close_timeout: 180
{{< /code-block >}}

{{% /tab %}}
{{% tab "環境変数" %}}

```shell
DD_LOGS_CONFIG_CLOSE_TIMEOUT=180
```

{{% /tab %}}
{{< /tabs >}}

タイムアウトを変更した後、代表的なログボリュームが発生している間に[Agent ログファイル][10]で新しいローテーション警告を検索してください。警告が続く場合は、タイムアウトを再度増やすか、[チューニングアクションを選択する](#choose-a-tuning-action)セクションを使用して、飽和したコンポーネントに対するアクションを選択してください。タイムアウトを長くするとローテーションされたファイルが開いたままになり、ファイル記述子とディスク使用率が増加する可能性があります。

Agent が一致するすべてのファイルをテールしない場合は、代わりに `logs_config.open_files_limit` をチェックしてください。構成の詳細については、[Agent によって追跡されるログファイルの数を増やす][3]を参照してください。

## Agent を調整する {#tune-the-agent}

### チューニングアクションを選択する {#choose-a-tuning-action}

| コンポーネント | 解釈 | このセクションで開始 |
| --- | --- | --- |
| `destination_reliable_N` | ログの送信が遅延または再試行されています。| [配信エラーを解決する](#resolve-delivery-errors) |
| `worker` | ペイロードが送信待ちの状態です。| [配信エラーを解決する](#resolve-delivery-errors) |
| `strategy` | エンコーディング、バッチ処理、または圧縮作業が容量の上限に達しています。| [圧縮を無効にする](#disable-compression)または[パイプライン並列化を増やす](#increase-pipeline-parallelism) |
| `processor` | ログ処理が容量の上限に達しています。| [ログ処理を減らす](#reduce-log-processing)または[パイプライン並列化を増やす](#increase-pipeline-parallelism) |

### 配信エラーを解決する {#resolve-delivery-errors}

`destination_reliable_N` が飽和状態の場合は、[Agent ログファイル][10]を開き、欠落バイトの警告タイムスタンプ付近のエントリーで送信の失敗や再試行がないか確認してください。認証、拒否、プロキシ、DNS、およびコネクションエラーを解決します。[プロキシ構成][5]、[ネットワークアクセスから Datadog エンドポイント][6]、および[Datadog サイト][4]を確認します。

### 圧縮を無効化する {#disable-compression}

HTTPS 配信の場合、圧縮はデフォルトで有効になっています。`strategy` が飽和状態で Agent の CPU 使用率が高い場合は、圧縮の無効化を検討してください。これにより圧縮作業は軽減されますが、ペイロードサイズとログ取り込みに送信されるバイト数は増加します。

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  use_compression: false
{{< /code-block >}}

変更後、[ステータスコマンド][1]を実行し、`strategy` の飽和時間が短縮されたことを確認してください。ネットワーク使用量が容量の上限に達した場合、または [Agent ログファイル][10]に新しい配信エラーが表示された場合は、圧縮を再度有効にしてください。

### パイプラインの並列化を増やす {#increase-pipeline-parallelism}

デフォルトでは、Agent は利用可能な論理 CPU ごとに 1 つのログパイプラインを実行し、最大 4 つのパイプラインを実行します。

`processor` または `strategy` が飽和しており、ホスト CPU に余裕がある場合は、`logs_config.pipelines` を増やしてください。例: Agent が利用可能な論理 CPU が 8 つあるホストの場合:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  pipelines: 8
{{< /code-block >}}

Agent が複数のログソースから収集する場合、パイプラインを追加すると効果的です。単一のソースは 1 つのパイプラインに保持されます。パイプラインを増やすと、Agent CPU、メモリ、および HTTP 送信の合計同時実行数が増加する可能性があります。変更後、[ステータスコマンド][1]を実行し、対象コンポーネントの飽和時間が短縮されたことを確認してください。

### ログ処理を削減する {#reduce-log-processing}

`processor` が飽和している場合は、設定済みの[処理ルール][7]を確認してください。グローバルルールは、Agent が収集するすべてのログに対して実行されます。ルールが 1 つのソースにのみ適用される場合は、そのソースのインテグレーション設定に移動してください。

{{< code-block lang="yaml" filename="conf.d/myapp.d/conf.yaml" >}}
logs:
  - type: file
    path: /var/log/app/app.log
    service: myapp
    source: myapp
    log_processing_rules:
      - type: exclude_at_match
        name: exclude_debug
        pattern: \[DEBUG\]
{{< /code-block >}}

グローバル `logs_config.processing_rules` およびソースレベルの `log_processing_rules` から重複するルールを削除してください。Agent 7.82.0 以降、[自動複数行検出][8]がデフォルトで有効になっています。`processor`コンポーネントが飽和しており、ログに複数行の集約が不要な場合は、無効化を検討してください。

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  auto_multi_line_detection: false
{{< /code-block >}}

ソースの複数行フォーマットが既知である場合は、自動検出を使用する代わりに、[ソースレベルの `multi_line` 処理ルールを設定][12]してください。変更後、[ステータスコマンド][1]を実行してプロセッサーの飽和状態を比較し、関連行が正しくグループ化されたままになっていることを[ログエクスプローラー][11]で確認してください。

## ログボリュームを減らす {#reduce-log-volume}

Agent が利用可能なホストおよびネットワーク容量内で必要なボリュームを処理できない場合は、不要なログをフィルタリングしてください。`exclude_at_match` 処理ルールは、一致ログがホストから送信される前に破棄されます。

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_health_checks
      pattern: GET /health
{{< /code-block >}}

フィルターが 1 つのログソースのみに適用される場合は、代わりにソースレベルの `log_processing_rules` エントリーを使用してください。

## 結果を確認する {#verify-the-result}

代表的なログボリュームの下で各変更をテストします。

1. ステータスコマンドを実行します。
   {{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}
2. ターゲットコンポーネントの使用率が 90% 以上になる時間が短縮されたことを確認します。全体的な状態は、飽和状態が解消された後も最大 30 分間 `WARNING` のままになります。
3. 新しい `remaining unread` 警告に関する [Agent ログファイル][10]を検索します。

変更によって飽和状態や新しいローテーション警告の頻度が軽減されない場合は、変更を元に戻します。次に、[チューニングアクションを選択する](#choose-a-tuning-action)セクションから次のアクションを選択します。飽和状態が別のコンポーネントに移動した場合は、そのコンポーネントに対してリストされているアクションを使用してください。

## Datadog サポートに問い合わせる {#contact-datadog-support}

このページのステップで問題が解決しない場合は、[Datadog サポート][9]にお問い合わせください。パイプラインが飽和状態でかつ Agent を再起動する前に、[フレア][2]を送信してください。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[2]: /ja/agent/troubleshooting/send_a_flare/
[3]: /ja/logs/guide/increase-number-of-log-files-tailed/
[4]: /ja/getting_started/site/
[5]: /ja/agent/configuration/proxy/
[6]: /ja/agent/configuration/network/
[7]: /ja/agent/logs/advanced_log_collection/
[8]: /ja/agent/logs/auto_multiline_detection/
[9]: /ja/help/
[10]: /ja/agent/configuration/agent-log-files/
[11]: /ja/logs/explorer/
[12]: /ja/agent/logs/advanced_log_collection/#manually-aggregate-multi-line-logs