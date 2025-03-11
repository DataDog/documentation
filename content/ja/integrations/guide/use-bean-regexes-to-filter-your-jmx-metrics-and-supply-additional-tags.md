---
aliases:
- /ja/integrations/faq/how-to-use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags
further_reading:
- link: /integrations/java/
  tag: Documentation
  text: Java インテグレーション
- link: /integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
  tag: Documentation
  text: jConsole の JMX データを表示し、収集するように jmx.yaml をセットアップするには
title: Bean 正規表現を使用して JMX メトリクスをフィルタリングし、追加のタグを提供する
---

Datadog は、JMX Mbean 名とドメイン名をマッチングさせて、`include` と `exclude` フィルターを構成するための正規表現をサポートしています。正規表現は、[Java の正規表現形式][1]に準拠する必要があります。これらのフィルターはバージョン 5.5.0 で追加されたことに注意してください。

提供された正規表現からのキャプチャグループは、メトリクスの追加のタグ値を供給するために使用することができます。

この記事では、[Java インテグレーション][2]の `bean_regex` を使用する方法の一例と、そのようなキャプチャグループを参照して追加のタグを設定する方法について説明します。

`domain.example.com:name=my.metric.name.env.dev.region.eu-central-1.method.GET.status.200` という Mbean 名があるとします。Agent がメトリクスを収集した後、タグとして使用できる情報がいくつかあります。例えば、以下のタグでメトリクスをエクスポートすることができます。

* `env`: `dev`
* `region`: `eu-central-1`
* `method`: `GET`
* `status`: `200`

Bean 正規表現は、単一の正規表現または正規表現のリストとして提供することができます。後者の場合、リストの中で最初にマッチしたエントリのみが考慮されます。カスタムメトリクスにいくつかのタグを追加してエクスポートするためのコンフィギュレーションファイルの例をご覧ください。

```yaml
init_config:
  is_jmx: true

instances:
  - host: "<JMX_ENDPOINT>"
    port: "<JMX_PORT>"

    conf:
      - include:
          domain: domain.example.com
          bean_regex:
            - "domain.example.com:name=my.metric.name.*(?:\\.env\\.)([a-z]+)(?:.*\\.region\\.)([a-z-]+[0-9])(?:.*\\.method\\.)([A-Z]+)(?:.*\\.status\\.)([0-9]+)(?:.*)"
          attribute:
            attribute1:
              metric_type: gauge
              alias: "my.jmx.metric"
          tags:
              env: $1
              region: $2
              method: $3
              status_code: $4
              optional: tag
```

各キャプチャグループは、Java Map に格納されます。最初のキャプチャグループは位置 `0` から始まります。どのキャプチャグループをタグとしてエクスポートするかを決めたら、`include` または `exclude` フィルターの `tags` セクションで、グループの番号 (例えば、Map 内の位置) と同様に参照する必要があります。

`bean_regex` で提供された例では、キャプチャグループは次のとおりです。

* `$0`: `domain.example.com:name=my.metric.name.env.dev.region.eu-central-1.method.GET.status.200`
* `$1`: `dev`
* `$2`: `eu-central-1`
* `$3`: `GET`
* `$4`: `200`

[メトリクスエクスプローラー][3]を使用すると、メトリクスをクエリしたり、先ほど作成したタグでフィルターをかけたりすることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[2]: /ja/integrations/java/
[3]: /ja/metrics/explorer/