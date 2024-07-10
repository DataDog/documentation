---
aliases:
- /ja/logs/faq/i-have-a-custom-log-file-with-heightened-read-permissions
further_reading:
- link: /logs/log_collection/
  tag: Documentation
  text: ログの収集方法
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
- link: /glossary/#tail
  tag: 用語集
  text: 用語集 "テール" の項目
title: 高度な読み取り権限を持つカスタムログファイルからのログ送信
---

多くの場合、ログファイル、特に *syslog* や *journald* などのシステムログは、*sudo* や *admin* のアクセス権を持っていないため、Datadog Agent のログ収集をブロックする高度な読み取り権限を持っています。

これを回避するには、3 つの解決策が考えられます。

* (非推奨) Agent に root 権限を与えて、それらのファイルをテールできるようにします。Datadog は、このルートを使用しないことを強く推奨します。
* Agent がアクセスできるようにファイルの権限を変更します。Agent にはディレクトリの実行権限と読み取り権限、ファイルの読み取り権限が必要です。以下のコマンドを実行して、これらの権限を与えます (Agent だけでなく、どのユーザーに対しても)。
  * chmod 755 `<folder name>`
  * chmod 644 `<file name>`
* オープンソースのログシッパー (Rsyslog、NXLog など) を構成し、root アクセス権を持って、Datadog プラットフォームに直接、または Datadog Agent にローカルにログを送信します。手順については、[Rsyslog][1]、[Syslog-ng][2]、[NXlog][3]、[FluentD][4]、または [Logstash][5] の専用ドキュメントをお読みください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/rsyslog/
[2]: /ja/integrations/syslog_ng/
[3]: /ja/integrations/nxlog/
[4]: /ja/integrations/fluentd/#log-collection
[5]: /ja/integrations/logstash/#log-collection