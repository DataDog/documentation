---
title: レート
kind: documentation
further_reading:
- link: "developers/metrics"
  tag: "Documentation"
  text: "メトリクスの詳細"
- link: "developers/libraries"
  tag: "Documentation"
  text: "公式/コミュニティ寄稿の API および DogStatsD クライアントライブラリ"
---

## 概要

レートはメトリクスの微分係数を表します。これは、定義された時間間隔でのメトリクスの値変化量です。

## 送信

### Agent チェック

{{% table  %}}

|方法 | 概要 |
|:---|:---|
|self.rate(...)|サンプリングされたカウンターの未加工の値を送信します。送信前にこれらの値をレートに正規化したり、差分を計算しないでください。それは Agent によって行われます。<ul><li>1 回のチェックで一度だけ呼び出す必要があります。</li><li>以前送信された値より小さな値は無視されます。したがって、カウンターは単調増加します。</li><li>Datadog Web アプリケーションに GAUGE タイプとして保存されます。時系列に保存される値は、サンプル間のカウンター値の時間正規化された差分です。</li></ul>|
{{% /table %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
