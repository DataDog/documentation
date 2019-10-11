---
title: セット
kind: documentation
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: メトリクスの詳細
  - link: developers/libraries
    tag: Documentation
    text: 公式/コミュニティ寄稿の API および DogStatsD クライアントライブラリ
---
## 概要

セットは、グループ内の一意の要素の数をカウントするために使用されます。

## 送信

### Agent チェック

{{% table responsive="true" %}}

|方法 | 概要 |
|:---|:---|
|self.set(...)|グループ内の一意の要素の数をカウントするために使用されます。<ul><li>1 回の Agent チェックで複数回呼び出されます。</li><li>Datadog Web アプリケーションに GAUGE タイプとして保存されます。</li></ul>|
{{% /table %}}

### DogStatsD

{{% table responsive="true" %}}

|方法 | 概要 |
|:---|:---|
|dog.set(...)|グループ内の一意の要素の数をカウントするために使用されます。<ul><li>Datadog Web アプリケーションに GAUGE タイプとして保存されます。時系列に保存される値は、フラッシュ期間の間に StatsD に送信されたメトリクスの一意の値のカウントです。</li></ul>|
{{% /table %}}

#### DogStatsD の例

コードサンプルについては、[DogStatsD 固有のドキュメント][1]を参照してください。

## アプリ内モディファイアー

* `as_count()` の効果
    * 時間集計関数を SUM に設定します。
    * メタデータ間隔を使用して、未加工のレートをカウントに変換します。そのメトリクスのためのメタデータ間隔が存在しない場合は機能しません。
* `as_rate()` の効果
    * 時間集計関数を SUM に設定します。
    * クエリ間隔とメタデータ間隔を使用して、時間集計レートを計算します。そのメトリクスのためのメタデータ間隔が存在しない場合は機能しません。
* 既知の問題: Agent チェックが送信する RATE メトリクスは間隔メタデータを持たないため、as_rate() と as_count() は機能しません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/dogstatsd/data_types#sets