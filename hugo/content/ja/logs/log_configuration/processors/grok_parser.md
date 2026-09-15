---
description: Grok プロセッサーを使用してログをパースする
further_reading:
- link: /logs/log_configuration/pipelines
  tag: ドキュメント
  text: Datadog パイプラインの検出
- link: /logs/log_configuration/parsing
  tag: ドキュメント
  text: パースの詳細
- link: https://www.datadoghq.com/blog/detect-http2-abuse-apache-web-server-logs/
  tag: ブログ
  text: Apache Web サーバーログで HTTP/2 の悪用を検出する方法
processor_type: grok-parser
title: Grok パーサー
---
## 概要 {#overview}

メッセージ全体や未加工のイベントの特定の属性をパースするためのカスタム Grok ルールを作成できます。ベストプラクティスとして、Grok パーサーは 10 のパース規則に制限してください。Grok の構文とパース規則に関する詳細については、[パース][1] を参照してください。

{{< img src="/logs/processing/processors/ai-grok-rules.png" alt="Grok パーサーの構成" style="width:90%;" >}}

## ユースケース {#use-cases}

Grok パーサーは主に、ログのメッセージから属性をパースするために使用されます。たとえば、NGINX のログに、抽出したい複数の情報が含まれているメッセージがあるとします。

Grok 規則を作成すると、パーサーは IP アドレス、ユーザー、リクエストのタイムスタンプ、リクエストメソッド、URL、バージョン、ステータスコード、バイト数を書き出すことができます。


## セットアップ {#setup}

[{{< ui >}}Pipelines{{< /ui >}} ページ][2] で Grok プロセッサーを定義します。Grok パース規則を構成するには、次のようにします。

11. [{{< ui >}}Add Grok Parser{{< /ui >}}] (Grok パーサーを追加) をクリックして、新しいパーサー構成を開きます。
1. {{< ui >}}Log Samples{{< /ui >}}: ログサンプルは、[Log Samples] (ログサンプル) セクションに自動的に取り込まれます。ログサンプルをさらに追加することもできます (合計 10 個まで、サンプルあたり 5000 文字まで)。
   **注**: サンプルログは、パイプラインフィルターに一致するログパターンのうち、ボリュームが最も大きい 5 つのログパターンから取得されます。
1. {{< ui >}}Log Samples{{< /ui >}}: 最大 5 つのサンプルログ (サンプルログあたり 5000 文字まで) を追加して、パース規則をテストします。
1. {{< ui >}}Define parsing rules{{< /ui >}}: [{{< ui >}}Auto parsing{{< /ui >}}] (自動パース) をクリックして、サンプルに一致する規則を生成します。
   {{< site-region region="gov,gov2" >}}
   <div class="alert alert-info">選択した <a href="/getting_started/site">Datadog サイト</a> では自動パースを利用できません ({{< region-param key="dd_site_name" >}})。</div>
   {{< /site-region >}}
1. {{< ui >}}Test your rules{{< /ui >}}: サンプルをクリックすると、パース規則に対する評価がトリガーされ、画面の右側に結果が表示されます。すべてのサンプルにはステータス (`match` または `no match`) が表示され、Grok パーサーのパース規則のいずれかがサンプルに一致するかどうかが強調表示されます。


## ログのパース前とパース後の状態 {#before-and-after-state-of-logs}

{{% collapse-content title="例: NGINX アクセスログのパース" level="h3" %}}

**処理前 (未加工のログ):**

```text
192.168.1.1 - john [10/Oct/2023:13:55:36 +0000] "GET /api/users HTTP/1.1" 200 1234
```

**Grok パース規則:**

```text
access.common %{ipOrHost:network.client.ip} %{notSpace:http.ident} %{notSpace:http.auth} \[%{httpdate:date}\] "(?>%{word:http.method} |)%{notSpace:http.url}(?: HTTP/%{number:http.version}|)" %{number:http.status_code} (?>%{number:network.bytes_written}|-)
```

**処理後:**

```json
{
 "network": {
   "client": {
     "ip": "192.168.1.1"
   },
   "bytes_written": 1234
 },
 "http": {
   "ident": "-",
   "auth": "john",
   "method": "GET",
   "url": "/api/users",
   "version": "1.1",
   "status_code": 200
 },
 "date": 1696945536000
}
```

Grok パーサーは、非構造化ログメッセージを、Log Explorer でクエリ、フィルタリング、分析可能な構造化 JSON 属性に変換します。

{{% /collapse-content %}}

## API {#api}

以下の Grok パーサー JSON ペイロードで [Datadog ログパイプライン API エンドポイント][3] を使用します。

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<SUPPORT_RULES>", "match_rules": "<MATCH_RULES>"}
}
```

| パラメーター            | 型             | 必須 | 説明                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | 文字列           | はい      | プロセッサーのタイプ。                                 |
| `name`               | 文字列           | いいえ       | プロセッサーの名前。                                 |
| `is_enabled`         | Boolean          | いいえ       | プロセッサーが有効になっているかどうか。デフォルト: `false`。 |
| `source`             | 文字列           | はい      | パースするログ属性の名前。デフォルト: `message`。|
| `samples`            | 文字列の配列 | いいえ       | この Grok パーサーのサンプルログのリスト (最大 5 件)。    |
| `grok.support_rules` | 文字列           | はい      | Grok パーサーのサポート規則のリスト。            |
| `grok.match_rules`   | 文字列           | はい      | Grok パーサーの照合規則のリスト。              |



## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/parsing/?tab=matchers
[2]: https://app.datadoghq.com/logs/pipelines
[3]: /ja/api/v1/logs-pipelines/