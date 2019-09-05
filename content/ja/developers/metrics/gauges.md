---
title: ゲージ
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

ゲージは、特定の物事の値を経時的に測定します。

## 送信

### Agent チェック

{{% table responsive="true" %}}

|方法 | 概要 |
|:---|:---|
|self.gauge(...)|<ul><li>チェックの実行中に複数回呼び出されると、メトリクスの最後のサンプルだけが使用されます。</li><li>Web アプリケーションに GAUGE タイプとして保存されます。</li></ul>|
{{% /table %}}

### DogStatsD

{{% table responsive="true" %}}

|方法 | 概要 |
|:---|:---|
|dog.gauge(...)|Datadog Web アプリケーションに GAUGE タイプとして保存されます。時系列に保存される値は、StatsD フラッシュ期間の間にメトリクスに送信された最後のゲージ値です。|
{{% /table %}}

#### 例

コードサンプルについては、[DogStatsD 固有のドキュメント][1]を参照してください。

## アプリ内モディファイアー

* `as_count()` の効果 なし
* `as_rate()` の効果 なし

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/dogstatsd/data_types#gauges