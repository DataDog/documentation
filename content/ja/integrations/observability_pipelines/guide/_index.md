---
aliases:
- /ja/metrics/custom_metrics/guide/custom-metrics-governance-drop-metrics-missing-specific-tags
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/observability_pipelines/guide/custom-metrics-governance-drop-metrics-missing-specific-tags.md
further_reading:
- link: https://vector.dev/docs/setup/going-to-prod/
  tag: ドキュメント
  text: Vector の本番環境への導入
- link: 'https://vector.dev/docs/reference/configuration/sources/datadog_agent/ '
  tag: ドキュメント
  text: Vector のソースとなる Datadog Agent
- link: /integrations/observability_pipelines/integrate_vector_with_datadog/
  tag: ドキュメント
  text: Vector にデータを送信するための Datadog Agent の構成
kind: ガイド
title: カスタムメトリクスガバナンス - 特定のタグがないメトリクスを削除する
---

## 概要

カスタムメトリクスは、アプリケーションのパフォーマンス、インフラストラクチャーの健全性、ビジネス KPI など、ビジネスのあらゆる面を視覚化します。カスタムメトリクスの使用量を管理するために、Datadog では、[カスタムメトリクスのリアルタイム使用量推定][1]、[使用量属性][2]、[Metrics without Limits][3]™ などのコストの視覚化と管理のためのツールをいくつか提供しています。

これらのツールは、Datadog に取り込まれたメトリクスを視覚化するために、メトリクスタグを使用します。これは、任意のタグに関連付けられたカスタムメトリクスの数を監視するのに役立ちます。例えば、タグを使用して、特定のアプリケーションチームが生成しているカスタムメトリクスの数を確認することができます。しかし、カスタムメトリクスは適切なタグ付けを行わずに送信されることがあるため、カスタムメトリクスの全体量を把握することが難しくなります。また、適切なタグ付けを行わないと、メトリクスを生成している特定のチーム、サービス、またはアプリケーションに帰属させることも難しくなります。

## 前提条件

`team` のような重要なタグキーがないカスタムメトリクスをフィルタリングするには、Datadog に取り込まれる前に [Vector][4] を使用してそれらを削除します。Vector は、観測可能性パイプラインに最適化されたオープンソースツールであり、エンタープライズソリューションの Datadog Observability Pipelines では、Datadog に送信するカスタムメトリクスを制御することができます。

このガイドは、すでに Vector のパイプラインがセットアップされていることを前提にしています。Vector に慣れていない方は、[Vector の設定][5]と [Vector Remap Language][6] をご覧ください。

## フィルター変換を設定する

Vector には、Datadog に送信する前にデータを[変換][7]できる関数が豊富に用意されています。特定のタグでメトリクスをフィルタリングする最も簡単な方法は、[フィルター変換][8]を使用することです。例えば、以下のコンポーネントは `team_tag` を持たないメトリクスをフィルタリングし、それらのメトリクスが Vector パイプラインで削除されるようにします。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: |
      exists(.tags.<team_tag>)
```

{{% /tab %}}
{{% tab "TOML" %}}

```
[transforms.my_transform_id]
    type = "filter"
    inputs = [ "my-source-or-transform-id" ]
    condition = '''
    exists(.tags.<team_tag>)
    '''
```

{{% /tab %}}
{{< /tabs >}}

同様に、タグではなくネームスペースでメトリクスをフィルタリングしたい場合は、以下のような構成を行います。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: |2
       .namespace == "foo" 
```

{{% /tab %}}
{{% tab "TOML" %}}

```
[transforms.my_transform_id]
    type = "filter"
    inputs = [ "my-source-or-transform-id" ]
    condition = ''' 
        .namespace == "foo" 
    '''
```

{{% /tab %}}
{{< /tabs >}}

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/account_management/billing/usage_metrics/#types-of-usage
[2]: https://docs.datadoghq.com/ja/account_management/billing/usage_attribution/
[3]: https://docs.datadoghq.com/ja/metrics/metrics-without-limits/
[4]: https://vector.dev/
[5]: https://vector.dev/docs/setup/
[6]: https://vector.dev/docs/reference/vrl/
[7]: https://vector.dev/docs/reference/configuration/transforms/
[8]: https://vector.dev/docs/reference/configuration/transforms/filter/