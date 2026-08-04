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

Agent の設定ファイル (`/etc/datadog-agent/datadog.yaml`) にある `logs_config.open_files_limit` パラメーターは、Agent が同時に監視できるログ ファイルの最大数を決定します。この上限は、大規模なディレクトリでワイルド カードを使用した場合のパフォーマンス上の問題を防ぐために設けられています。このパラメーターを調整することで、上限を引き上げることができます。

```yaml
logs_config:
  open_files_limit: 500
```

コンテナ環境では、`DD_LOGS_CONFIG_OPEN_FILES_LIMIT` 環境変数を設定することができます。

デフォルト値は、Agent のバージョンとオペレーティングシステムによって異なります。ご利用の Agent バージョンのデフォルト値を確認するには、Datadog Agent リポジトリの [config_template.yaml ファイル][1]を参照してください。正しいデフォルト値を確認するために、必ずご利用の Agent バージョンに対応するタグを選択してください。

**注**: 追跡されるログファイルの制限を増やすと、Agent のリソース消費量が増加する場合があります。

[1]: https://github.com/DataDog/datadog-agent/blob/369a8dbb39dc6e8601d82c8f43caaaf88d6a0a55/pkg/config/config_template.yaml#L987-L993