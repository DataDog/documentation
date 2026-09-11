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
Agent の設定ファイル (`logs_config.open_files_limit`) の `/etc/datadog-agent/datadog.yaml` パラメータは、Agent が同時にテールできるログファイルの最大数を決定します。この制限は、巨大なディレクトリでワイルドカードが設定されている場合に発生するパフォーマンスの問題を防ぐために設定されています。このパラメータを調整することで、制限を増やすことができます。

```yaml
logs_config:
  open_files_limit: 500
```

コンテナ化された環境では、`DD_LOGS_CONFIG_OPEN_FILES_LIMIT` 環境変数を設定できます。

デフォルト値は、Agent のバージョンとオペレーティングシステムによって異なります。お使いの Agent バージョンのデフォルト値をチェックするには、Datadog Agent リポジトリの [example Agent configuration files][1] を参照してください。お使いのオペレーティングシステムのファイルを開いてください。正しいデフォルト値を確認するために、必ずお使いの Agent バージョンに対応するタグを選択してください。

**注**: テールできるログファイルの制限を増やすと、Agent のリソース消費量が増加する可能性があります。

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example