---
kind: faq
title: 私の JMX と AWS のインテグレーションは両方とも "name" タグを使用しています。どうすればいいのでしょうか？
---

"name" タグは、[AWS インテグレーション][1]からデフォルトで適用される数多くのホストレベルタグの 1 つです。しかし同時に、JMX ベースのインテグレーションによりデフォルトで (JMX 内の "Bean 名" の一致に基づき) メトリクスレベルで適用されることの多いタグでもあります。どちらのタグも便利ですが、両方同時に使用するとタグが干渉し、値の集計が適切に行われなくなる可能性があります。では、これについてはどう対処すればいいのでしょうか？

一番いいのは、JMX インテグレーションの "name" タグを別の名前 (例: "bean_name") に変更することです。Datadog の JMX ベースのインテグレーションでは、これを可能にする 2 つの構成機能が存在します。1 つ目は、構成を通じてデフォルトのタグを除外する機能、そして 2 つ目は、指定の Bean 属性をカスタムのメトリクスタグとして追加する機能です。

例えば、kafka.yaml が次のように構成されている場合、"kafka.messages_in.rate" という名前のメトリクスが収集され、処理の一環として "name:messagesinpersec" でタグ付けが行われます。
```yaml
- include:
domain: 'kafka.server'
bean: 'kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec'
attribute:
  Count:
    metric_type: rate
    alias: kafka.messages_in.rate
```

これが AWS の "name" タグと干渉するのを防ぐには、メトリクスの構成を以下のように変更できます。
```yaml
  - include:
    domain: 'kafka.server'
    bean: 'kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec'
    attribute:
      Count:
        metric_type: rate
        alias: kafka.messages_in.rate
    exclude_tags:
      - name
    tags:
        bean_name: $name
```

この場合、同じメトリクスが収集されますが、"name" タグが代わりに "bean_name:messagesinpersec" として適用されるため、AWS の "name" タグキーと干渉することはありません。
{{< img src="integrations/faq/jmx_metric_collected.png" alt="jmx_metric_collected" >}}

[1]: /ja/integrations/amazon_web_services/