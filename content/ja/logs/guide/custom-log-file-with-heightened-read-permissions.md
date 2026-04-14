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

多くの場合、*syslog* や *journald* などのシステムログを含むログファイルは読み取り権限が厳しく設定されているため、*sudo* や *admin* アクセス権を持たない Datadog Agent がログを収集できないことがあります。

この問題を回避する方法は 3 つあります。

* (非推奨) Agent に root アクセス権を付与してファイルを tail できるようにする。Datadog ではこの方法を強く非推奨としています。
* ファイルの権限を変更して Agent がアクセスできるようにする。Agent にはディレクトリに対する実行権限と読み取り権限、ファイルに対する読み取り権限が必要です。以下のコマンドを実行して (Agent だけでなく任意のユーザーに) これらの権限を付与します。
  * chmod 755 `<folder name>`
  * chmod 644 `<file name>`
* root アクセス権を持つオープンソースのログシッパー (Rsyslog、NXLog など) を構成し、これらのログを直接 Datadog プラットフォームに送信するか、ローカルで稼働している Datadog Agent に送信する。設定手順については [Rsyslog][1]、[Syslog-ng][2]、[NXLog][3]、[FluentD][4]、[Logstash][5] の各ドキュメントを参照してください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/rsyslog/
[2]: /ja/integrations/syslog_ng/
[3]: /ja/integrations/nxlog/
[4]: /ja/integrations/fluentd/#log-collection
[5]: /ja/integrations/logstash/#log-collection