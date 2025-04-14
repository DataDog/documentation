---
title: Logs のトラブルシューティング
---

Datadog Logs で予期しない動作が発生した場合に、ご自分で確認できるよくある問題を本ガイドでいくつかご紹介します。問題が解決しない場合は、[Datadog サポート][1] にお問い合わせください。

## ログの欠落 - ログの 1 日のクォータに達した場合

ログ構成を変更していないのに、[Log Explorer][2] に今日のログがないことが表示されます。これは、1 日のクォータに達しているために起こっている可能性があります。

{{< img src="logs/troubleshooting/daily_quota_reached.png" alt="ログがないことを示す棒グラフと、1 日のクォータに達したことを示すメッセージ" style="width:90%" >}}

クォータの設定、更新、削除については、[1 日のクォータを設定する][3]を参照してください。

## ログが欠落する - タイムスタンプが取り込みウィンドウ外

18 時間以上前のタイムスタンプを持つログは取り込み時に削除されます。
どの `service` と `source` が影響を受けているかを `datadog.estimated_usage.logs.drop_count` メトリクスで確認することで、根本的な問題を修正してください。

## JSON ログからタイムスタンプキーをパースできない

Datadog にインジェストされる前に JSON ログのタイムスタンプを[認識できる日付フォーマット][4]に変換できない場合、以下の手順で Datadog の[算術プロセッサ][5]と[ログ日付リマッパー][6]を使ってタイムスタンプを変換しマッピングしてください。

1. [Pipelines][7] ページに移動します。

2. **Pipelines** で、**Preprocessing for JSON logs** にカーソルを合わせ、鉛筆のアイコンをクリックします。

3. 予約済み属性マッピングリストから `timestamp` を削除します。この属性は、前処理中にログの正式なタイムスタンプとしてパースされません。

{{< img src="logs/troubleshooting/preprocessing_json_timestamp.png" alt="JSON ログコンフィギュレーションボックスと日付属性 (デフォルトでタイムスタンプを含む) の前処理" style="width:90%" >}}

2. [算術プロセッサ][5]を設定し、タイムスタンプに 1000 を掛けてミリ秒に変換する数式を表示します。計算式の結果は新しい属性になります。

3. 新しい属性を正式なタイムスタンプとして使用するために、[ログ日付リマッパー][6]を設定します。

[Log Explorer][2] にアクセスすると、新しい JSON ログとそのタイムスタンプがマッピングされて表示されます。

## 切り捨てられたログ

1MB 以上のログは切り捨てられます。どの `service` と `source` が影響を受けているかを `datadog.estimated_usage.logs.truncated_count` と `datadog.estimated_usage.logs.truncated_bytes` メトリクスで確認することで、根本的な問題を修正してください。

## ログメッセージが切り捨てられる

インデックス化されたログにのみ適用されるフィールドの追加の切り捨てがあります。message フィールドの値は 75 KiB に、非 message フィールドは 25 KiB に切り捨てられます。Datadog は完全なテキストを保存し、Log Explorer の通常のリストクエリで表示されます。ただし、グループ化されたクエリを実行する際、例えばその切り捨てられたフィールドでログをグループ化する場合や、特定のフィールドを表示する操作を行う場合、切り捨てられたバージョンが表示されます。

[1]: /ja/help/
[2]: https://app.datadoghq.com/logs
[3]: /ja/logs/log_configuration/indexes/#set-daily-quota
[4]: /ja/logs/log_configuration/pipelines/?tab=date#date-attribute
[5]: /ja/logs/log_configuration/processors/?tab=ui#arithmetic-processor
[6]: /ja/logs/log_configuration/processors/?tab=ui#log-date-remapper
[7]: https://app.datadoghq.com/logs/pipelines