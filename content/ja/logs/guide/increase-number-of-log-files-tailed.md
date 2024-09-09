---
aliases:
- /ja/logs/faq/how-to-increase-the-number-of-log-files-tailed-by-the-agent
further_reading:
- link: /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/
  tag: よくあるご質問
  text: 外部ログシッパーを経由して Datadog にログを送信するには？
- link: /logs/log_configuration/parsing
  tag: ドキュメント
  text: パースの詳細
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: よくあるご質問
  text: ログのパースに関する問題を調査する方法
title: Agent によって追跡されるログファイルの数を増やす
---

デフォルトでは、Agent は Windows と MacOS で最大 200 ログファイル、その他の OS で最大 500 ログファイルを追跡することができます。この制限は、巨大なディレクトリにワイルドカードが設定された場合のパフォーマンスの問題を回避するために設定されています。

この制限を増やすには、Agent のコンフィギュレーションファイル (`/etc/datadog-agent/datadog.yaml`) の `logs_config` セクションで `open_files_limit` の値を設定します。

```yaml
logs_config:
  open_files_limit: 500
```

コンテナ環境では、`DD_LOGS_CONFIG_OPEN_FILES_LIMIT` 環境変数を設定することができます。

**注**: 追跡されるログファイルの制限を増やすと、Agent のリソース消費量が増加する場合があります。