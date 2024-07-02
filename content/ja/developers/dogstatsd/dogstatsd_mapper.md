---
title: DogStatsD Mapper
description: DogStatsD のマッピング規則を使用して、statsd メトリクス名の一部をタグに変換。
further_reading:
  - link: developers/dogstatsd
    tag: ドキュメント
    text: DogStatsD 入門
  - link: developers/libraries
    tag: ドキュメント
    text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: DogStatsD ソースコード
---
Agent バージョン 7.17+ では、DogStatsD Mapper 機能でマッピング規則とワイルドカード、正規表現パターンを使用して、DogStatsD に送信されたメトリクス名の一部をタグに変換できるようになりました。たとえば、以下のようなメトリクスの変換が可能です。

- `airflow.job.duration.<ジョブ種類>.<ジョブ名>`

これは 2 つの関連するタグを使用して `airflow.job.duration` メトリクスに変換することができます。

- `job_type:<ジョブ種類>`
- `job_name:<ジョブ名>`.

以下の手順でマッピング規則を作成します。

1. [`datadog.yaml` ファイルを開きます][1]。
2. `dogstatsd_mapper_profiles` パラメーター下に[マッピング規則のコンフィギュレーションブロック](#マッピング規則のコンフィギュレーション)を追加します。

## マッピング規則のコンフィギュレーション

マッピング規則ブロックは以下のようなレイアウトになります。

```yaml
dogstatsd_mapper_profiles:
    - name: '<プロファイル名>'
      prefix: '<プロファイルのプレフィックス>'
      mappings:
          - match: '<一致するメトリクス>'
            match_type: '<一致タイプ>'
            name: '<マッピング済みのメトリクス名>'
            tags:
                '<タグキー>': '<展開するタグ値>'
```

次のプレースホルダーと組み合わせます。

| プレースホルダー             |  定義                                                                                                                               | 必須                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
|  `<プロファイル名>`       | マッピング規則のプロファイルに付与する名称。                                                                                              | はい                     |
| `<プロファイルのプレフィックス>`      | プロファイルに関連付けられているメトリクス名のプレフィックス。                                                                                        | はい                     |
| `<一致するメトリクス>`     | [ワイルドカード](#ワイルドカードの一致パターン) または [正規表現](#正規表現の一致パターン) の一致ロジックを使ってグループを抽出するためのメトリクス名。         | はい                     |
| `<一致タイプ>`          | `<一致するメトリクス>`に適用する一致タイプ。[ワイルドカード](#ワイルドカードの一致パターン) または [正規表現](#正規表現の一致パターン) のいずれかとなります。    | いいえ / デフォルト: `wildcard` |
| `<マッピング済みのメトリクス名>`  | 同じグループで定義されたタグと共に Datadog に送信する新しいメトリクス名。                                                           | はい                     |
| `<タグキー>`             | 収集されたタグに関連付けるタグキー。                                                                                           | いいえ                      |
| `<展開するタグ値>` | `<一致タイプ>` からインラインに収集するタグ。                                                                                     | いいえ                      |

## ワイルドカードの一致パターン

ワイルドカードの一致パターンは、`*` をワイルドカードに用いたドット区切りのメトリクス名と一致します。このパターンを使用する場合、メトリクス名には英数字、`.`、`_` のみ使用できます。抽出されたグループは `$1`、`$2`、`$3`... などの `$n` 形式、または `${1}`、`${2}`、`${3}`... などの `${n}` 形式でのみ展開が可能です。

たとえば、以下のマッピンググループコンフィギュレーションを持つメトリクス `custom_metric.process.value_1.value_2` について見てみましょう。

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric.process.*.*'
            match_type: wildcard
            name: custom_metric.process
            tags:
                tag_key_1: '$1'
                tag_key_2: '$2'
```

メトリクス `custom_metric.process` にタグ `tag_key_1:value_1` および `tag_key_2:value_2` が付与され、Datadog に送られます。

## 正規表現の一致パターン

正規表現の一致パターンは、正規表現パターンを使用したメトリクス名と一致します。ワイルドカードの一致パターンとは異なり、`.` を含むキャプチャされたグループを定義することができます。
抽出されたグループは `$1`、`$2`、`$3`... などの `$n` 形式、または `${1}`、`${2}`、`${3}`... などの `${n}` 形式でのみ展開が可能です。

たとえば、以下のマッピンググループコンフィギュレーションを持つメトリクス `custom_metric.process.value_1.value.with.dots._2` について見てみましょう。

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric\.process\.([\w_]+)\.(.+)'
            match_type: regex
            name: custom_metric.process
            tags:
                tag_key_1: '$1'
                tag_key_2: '$2'
```

メトリクス `custom_metric.process` にタグ `tag_key_1:value_1` および `tag_key_2:value.with.dots._2` が付与され、Datadog に送られます。

## メトリクス名でグループを展開する

`regex` および `wildcard` の一致パターンでは、上記のように、収集されたグループを関連するタグキーが付いたタグ値として展開することができます。メトリクス `name` のパラメーターとして使用することも可能です。たとえば、以下のマッピンググループコンフィギュレーションにメトリクス `custom_metric.process.value_1.value_2` がある場合は以下のようになります。

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric.process.*.*'
            match_type: wildcard
            name: 'custom_metric.process.prod.$1.live'
            tags:
                tag_key_2: '$2'
```

メトリクス `custom_metric.process.prod.value_1.live` にタグ `tag_key_2:value_2` が付与され、Datadog に送られます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file