---
aliases:
- /ja/logs/faq/how-to-remap-custom-severity-values-to-the-official-log-status
further_reading:
- link: logs/log_collection/#custom-log-collection
  tag: Documentation
  text: Agent によるログ収集について
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
title: カスタム重大度値を公式ログステータスに再マップする
---

デフォルトでは、[Log Status Remapper][1] は [Syslog 重大度基準][2]に基づいています。
しかし、公式のログステータスに再マッピングしたいかもしれない異なる重大度値を持つ他のシステムがあるかもしれません。
これは、カスタム値と期待される値の間のマッピングを定義する[カテゴリープロセッサー][3]のおかげで可能です。

このページでは、その方法を Bunyan レベルと Web アクセスログの 2 つの例で説明します。

## Web アクセスログ

リクエストのステータスコードから、ログのステータスを判断することができます。Datadog インテグレーションでは、以下のマッピングを使用します。

* 2xx: OK
* 3xx: Notice
* 4xx: Warning
* 5xx: Error

ログのステータスコードが `http.status_code` 属性に格納されていると仮定します。
パイプラインにカテゴリープロセッサーを追加し、上記のマッピングを反映した新しい属性を作成します。

{{< img src="logs/guide/category_processor.png" alt="カテゴリープロセッサー" >}}

次に、新しく作成された属性を使用するステータスリマッパーを追加します。

{{< img src="logs/guide/log_status_remapper.png" alt="ログステータスリマッパー" >}}

## バニヤンレベル

バニヤンのレベルは Syslog のレベルと同様ですが、その値は 10 倍になります。

* 10 = TRACE
* 20 = DEBUG
* 30 = INFO
* 40 = WARN
* 50 = ERROR
* 60 = FATAL

バニヤンレベルが `bunyan_level` 属性に格納されていると仮定します。
パイプラインにカテゴリープロセッサーを追加し、上記のマッピングを反映した新しい属性を作成します。

{{< img src="logs/guide/category_processor_bunyan.png" alt="カテゴリープロセッサーバニヤン" >}}

次に、新しく作成された属性を使用するステータスリマッパーを追加します。

{{< img src="logs/guide/status_remapper_bunyan.png" alt="ログステータスリマッパーバニヤン" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/processors/#log-status-remapper
[2]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[3]: /ja/logs/log_configuration/processors/#category-processor