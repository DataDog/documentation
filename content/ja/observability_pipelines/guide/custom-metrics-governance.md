---
aliases:
- /ja/metrics/custom_metrics/guide/custom-metrics-governance-drop-metrics-missing-specific-tags/
- /ja/integrations/observability_pipelines/guide/custom-metrics-governance-drop-metrics-missing-specific-tags/
- /ja/observability_pipelines/guide/custom-metrics-governance-drop-metrics-missing-specific-tags
further_reading:
- link: /observability_pipelines/setup/
  tag: ドキュメント
  text: 観測可能性パイプラインを設定する
kind: ガイド
title: 観測可能性パイプラインによるカスタムメトリクスガバナンス
---

## 概要

カスタムメトリクスは、アプリケーションのパフォーマンス、インフラストラクチャーの健全性、ビジネス KPI など、ビジネスのあらゆる面を視覚化します。カスタムメトリクスの使用量を管理するために、Datadog では、[カスタムメトリクスのリアルタイム使用量推定][1]、[使用量属性][2]、[Metrics without Limits™][3] などのメトリクスを取り込んだ後のコストの視覚化と管理のためのツールをいくつか提供しています。

このガイドでは、観測可能性パイプラインを使用して、カスタムメトリクスを取り込む前に管理・制御する方法について説明します。具体的には、次のような方法を説明します。
- [特定のタグまたはメトリクスのネームスペースが欠落しているカスタムメトリクスを削除する](#drop-metrics-missing-specific-tags-or-the-metrics-namespace)
- [カスタムメトリクスタグを削除する](#remove-custom-metric-tags)
- [タグのカーディナリティが急上昇しないようにルールを設定する](#prevent-tag-cardinality-spikes)

## 前提条件

このガイドでは、テレメトリーデータの収集、処理、ルーティングを行うツールである観測可能性パイプラインワーカーを既にセットアップしていることを前提に説明しています。観測可能性パイプラインについてよく知らない場合は、[インストール][4]ドキュメントと [Datadog Processing Language (DPL) / Vector Remap Language (VRL)][5] を参照してください。

## 特定のタグまたはメトリクスのネームスペースが欠落しているメトリックをドロップする

### 問題

`team` や `application` などのタグを追加して、[使用量属性][6]機能で全体的なメトリクス使用量を分解すると便利です。使用量属性機能では、特定のチームやアプリケーションが生成しているカスタムメトリクスの数を確認することができます。しかし、カスタムメトリクスの送信は、これらの重要なタグを付けずに行われる場合があります。このため、メトリクスを生成した特定のチーム、サービス、またはアプリケーションに属性付けすることが難しくなります。

### ソリューション

この問題を防ぐには、観測可能性パイプラインワーカーを使用して、自分にとって意味のあるタグが見つからないメトリクスを削除します。これは、メトリクスを取り込む前、つまり、メトリクスがアカウントのカスタムメトリクスの使用量に貢献する前に行うことができます。

観測可能性パイプラインには、Datadog に送信する前にメトリクスデータを変換するための関数が豊富に用意されています。例えば、`filter` 変換を使用して、特定のタグキーがないメトリクスを削除します。以下のコンポーネントは、`team_tag` を持たないメトリクスをフィルタリングし、観測可能性パイプラインの構成でそれらのメトリクスを確実にドロップします。

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: |
      exists(.tags.<team_tag>)
```

同様に、タグではなくネームスペースでメトリクスをフィルタリングしたい場合は、以下のような構成を行います。

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: |2
       .namespace == "foo"
```
## カスタムメトリクスタグを削除する

### 問題

メトリクスタグは、特定のホスト、ポッド、アプリケーション、およびサービスに対する可視性を向上させることができます。しかし、メトリクスの中には、ほとんどクエリを実行しないタグや、視覚化または調査ワークフローに有用なタグがある場合があります。Metrics without Limits™ を使用すると、(メトリクスが取り込まれた後に) 不要なタグを自動的に除外することができますが、(メトリクスの取り込み前に) メトリクスにタグをドロップして、これらのタグが組織のメトリクス使用量に貢献しないようにすることはできません。

**注**: 取り込み前のメトリクスからタグを削除すると、メトリクスのクエリを実行する際の数学的精度に影響します。Metrics without Limits™ を使用すると、メトリクスのクエリの数学的精度に影響を与えることなく、いつでも重要なタグを定義することができます。

この問題に対処するために、観測可能性パイプラインを使用して、**メトリクスが取り込まれる前に**以下のいずれかを実行することができます。

- [タグを 1 つドロップする](#solution-1-drop-one-tag)
- [保持するタグの許可リスト配列を定義する](#solution-2-define-an-allowlist-array-of-tags-to-keep)
- [ドロップするタグのブロックリスト配列を定義する](#solution-3-define-a-blocklist-array-of-tags-to-drop)
- [リファレンステーブルで有効なタグの許可リストを定義する](#solution-4-define-an-allowlist-of-valid-tags-in-a-reference-table)

### 解決策 1: タグを 1 つドロップする

Datadog に取り込む前のカスタムメトリクスに特定のタグを付けるには、観測可能性パイプラインの [`remap` 変換][7]を使用します。これは、メトリクスを操作するドメイン固有の言語が付属しています。

1 つのメトリクスタグをドロップするという基本的な使用方法については、DPL/VRL の `del()` 関数を使用します。例えば、以下のコンポーネントは `tag_to_drop` タグをドロップします。

```yaml
transforms:
  drop_one_tag:
    type: remap
    inputs:
      - dd_agent.metrics
    source: |
      # `tag_to_drop` タグを削除します。
      del(.tags.tag_to_drop)
```

### 解決策 2: 保持するタグの許可リスト配列を定義する

許可リスト以外のタグをすべて削除したい場合は、許可リストを定義して `filter()` 関数を使用します。これにより、許可リストに含まれないタグは自動的にドロップされます。以下の構成例を参照してください。

```yaml
transforms:
  drop_excluded_tags:
    type: remap
    inputs:
      - dd_agent.metrics
    source: |
      # 許可されるべきタグのリスト。
      tags_allowlist = ["tag 1", "tag 2", "tag 3", "tag 4"]

      # `tags_allowlist` にないタグをフィルターにかけ、ドロップします。
      .tags = filter(object!(.tags)) -> |key, _value| { includes(tags_allowlist, key) }
```

### 解決策 3: ドロップするタグをブロックリスト配列で定義する

落としたいタグが決まっている場合は、解決策 2 と同じ手順で、`includes` の呼び出しの結果を `!` でプレフィックスして否定します。

```yaml
transforms:
  drop_excluded_tags:
    type: remap
    inputs:
      - dd_agent.metrics
    source: |
      # ブロックされるべきタグのリスト。
      tags_blocklist = ["tag 1", "tag 2", "tag 3", "tag 4"]

      # `tags_blocklist` にあるタグをフィルターにかけ、ドロップします。
      .tags = filter(object!(.tags)) -> |key, _value| { !includes(tags_blocklist, key) }
```

### 解決策 4: リファレンステーブルで有効なタグの許可リストを定義する

有効なタグのリストが決まっている場合、観測可能性パイプラインの `get_enrichment_table_records` と `find_enrichment_table_records` 関数を利用することが可能です。これにより、観測可能性パイプラインで `csv` 形式のリッチメントテーブルを参照することができます。サポートされているファイル形式は `csv` のみです。

この例では、`valid_tags.csv` という名前の `csv` ファイルに、以下のような有効なタグが含まれています。

```
tag_name
"tag 1"
"tag 2"
"tag 3"
"tag 4"
```

テーブルとして参照するには、`valid_tags.csv` というファイルに以下の構成を設定する必要があります。

```
enrichment_tables:
  valid_tag_table:
    type: file
    file:
      path: /etc/vector/valid_tags.csv
      encoding:
        type: csv
    schema:
      tag_name: string
```

`enrichment_tables` フィールドを設定すると、以下の構成で `valid_tags.csv` ファイルに含まれないタグをドロップできるようになります。


```yaml
transforms:
  drop_excluded_tags:
    type: remap
    inputs:
      - dd_agent.metrics
    source: |
      # `valid_tags.csv` のタグと一致しないタグをフィルターにかけ、ドロップします。
      .tags = filter(object!(.tags)) -> |key, _value| {
        !is_empty(find_enrichment_table_records!("valid_tag_table", { "tag_name": key }))
      }
```

## タグのカーディナリティの急上昇を防ぐ

### 問題

カスタムメトリクスの全体量は、Datadog に送信されたタグ値の組み合わせの数に依存します。カスタム メトリクスがどのようにカウントされるかは、[カスタムメトリクスの請求][8]を参照してください。特定のタグキーのカーディナリティが意図せずに急上昇することがあります。たとえば、`path` タグは通常 100 のユニークなタグ値を持ちますが、突然 10,000 のユニークなタグ値に急上昇します。このようにタグのカーディナリティが突然上昇すると、カスタムメトリクス全体のボリュームが増加する可能性があります。また、カスタムメトリクス用のアカウント割り当てを超過する可能性もあります。

### ソリューション

このような状況を避けるために、観測可能性パイプラインでルールを設定することで、カーディナリティの急上昇を防ぐことができます。

観測可能性パイプラインの [`tag_cardinality_limits` 変換][9]を使って、タグキーのカーディナリティの上限を設定することができます。タグのカーディナリティの制限を超えると、メトリクス名を完全に削除したり、タグのキーを削除したりすることができます。この変換では、以下の属性を設定することができます。

- `value_limit`: 与えられたタグキーに対して、いくつの明確な値を受け入れるか。
- `limit_exceeded_action`: カーディナリティの制限を超えるようなタグを持つメトリクスが来た場合に、どのような処理を行うかを制御します。以下に設定するオプションがあります。
    - `drop_event`: 設定した上限を超えるようなタグを含むメトリクスをドロップします。
    - `drop_tag`: 設定した上限を超えるタグを受信メトリクスから削除します。
- `mode`: 以前に見たタグを追跡し、受信したメトリクス上のタグが制限を超えた場合に判断するために、内部でどのようなアプローチを使用するかを制御します。
    - `exact`: このモードは `probabilistic` よりも必要なメモリ量が多いが、制限に達した後に新しいタグでメトリクスを誤って出力することはありません。
    - `probabilistic`: このモードは `exact` よりも必要なメモリ量が少ないですが、設定された上限を超える新しいタグが含まれていても、メトリクスが変換を通過してしまうことがあります。このようなことが起こる割合は、`cache_size_per_tag` の値を変更することで制御することができます。
- `cache_size_per_tag`: タグの重複を検出するために使用するキャッシュのサイズをバイト単位で定義することができるオプションのタグ。キャッシュが大きければ大きいほど、誤検出や、構成された制限に達した後でもタグの新しい値が許可されるケースを減らすことができます。

以下の構成例をご覧ください。

```yaml
transforms:
  limit_tags_to_500:
    type: tag_cardinality_limit
    inputs:
      - dd_agent.metrics
    limit_exceeded_action: drop_tag
    mode: exact
    value_limit: 500
```
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/billing/usage_metrics/#types-of-usage
[2]: /ja/account_management/billing/usage_attribution/
[3]: /ja/metrics/metrics-without-limits/
[4]: /ja/observability_pipelines/setup/
[5]: /ja/observability_pipelines/reference/processing_language/
[6]: /ja/account_management/billing/usage_attribution/
[7]: /ja/observability_pipelines/reference/transforms/#remap
[8]: /ja/account_management/billing/custom_metrics/?tab=countrategauge
[9]: /ja/observability_pipelines/reference/transforms/#tagcardinalitylimit