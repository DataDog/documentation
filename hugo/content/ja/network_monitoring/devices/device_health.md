---
description: ネットワークデバイスの問題を検出し、NDM の構成変更と関連付けます。
further_reading:
- link: /network_monitoring/devices/config_management
  tag: ドキュメント
  text: Network Configuration Management
- link: /bits_ai/bits_investigation/
  tag: ドキュメント
  text: Bits Investigation
- link: /network_monitoring/devices/troubleshooting
  tag: ドキュメント
  text: NDM のトラブルシューティング
- link: https://www.datadoghq.com/blog/end-to-end-network-operations-with-bits/
  tag: ブログ
  text: Datadog を使用して L7 から L1 までのネットワーク問題を解決する
title: デバイスの健全性
---
{{< callout url="https://www.datadoghq.com/product-preview/network-device-remediation-with-bits/" btn_hidden="false" header="デバイスの健全性はプレビュー版です">}}
{{< /callout >}}

## 概要 {#overview}

[デバイスの健全性][1]は、インフラストラクチャー全体のネットワークデバイスの問題を表面化し、構成変更との関連付けを支援します。デバイスの健全性を使用して、以下のことができます。

- フリート全体のパフォーマンスが低下したデバイスと影響を受けるメトリクスを特定する
- メトリクスの異常と構成変更を共有タイムライン上で関連付ける
- [Bits Investigation][2] を起動して根本原因を特定する
- 調査フローから直接構成変更をロールバックして対処する

すべてのデバイスの問題をフリート全体で表示するには、[{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Devices{{< /ui >}} > {{< ui >}}Health{{< /ui >}}][1] に移動します。特定のデバイスのアクティブな問題を確認するには、[デバイス][3]リストまたは NDM の視覚化からデバイスを選択し、デバイスサイドパネルでアクティブな問題を開きます。

## 問題を調査する {#investigate-an-issue}

問題を選択して問題パネルを開くと、以下が表示されます。

- 何が起きたかを平易な言葉でまとめた概要
- 問題が発生した時期とその深刻度を示す、影響を受けたメトリクスのグラフ
- 構成変更がデバイス上でいつ行われたかを示すタイムラインオーバーレイ。メトリクスの異常と特定の変更を関連付けることができます

{{< img src="network_device_monitoring/health/investigate-issue.png" alt="インターフェース ge0/0 での帯域幅使用率の低下を示すデバイスの健全性の問題。根本原因の概要、構成変更マーカー付きの時系列グラフ、および Bits Investigation で詳細を調査するためのボタンが表示されています。" style="width:100%;" >}}

### Bits Investigation を開始する{#launch-a-bits-investigation}

選択した問題から、[Bits Investigation][2] をトリガーできます。Bits Investigation は問題を分析し、以下を提供します。

- 調査の各ステップの概要とその検出結果
- 平易な言葉による根本原因分析

Bits Investigation を開始するには、[{{< ui >}}Investigate further with Bits{{< /ui >}}] をクリックしてください。[{{< ui >}}View full investigation{{< /ui >}}] をクリックすると、調査の全容が新しいタブで開きます。詳細については、[Bits Investigation][2] を参照してください。

### 提案された修正を適用する {#apply-a-proposed-fix}

提案された修正 (前回の信頼できるバージョンへの設定のロールバックなど) を適用することで、問題パネルから直接アクションを実行できます。適用される構成変更の正確な差分を確認できます。

{{< img src="network_device_monitoring/health/proposed-fix.png" alt="以前の構成バージョンへのロールバックを示す提案修正パネル。修正の適用ボタンと、現在の実行中設定および提案された修正の並列差分が表示されています。" style="width:100%;" >}}

### 影響を受けるデバイスと依存関係を表示する {#view-impacted-devices-and-dependencies}

問題パネルには、同じ問題によって影響を受ける可能性のある他のデバイスや依存関係も表示されるため、ネットワーク全体に対する影響のスコープを評価する上で役立ちます。さらに調査を行うには、図または影響を受けるデバイスのリストから任意のデバイスを選択して、そのデバイスページを開きます。

{{< img src="network_device_monitoring/health/affected-devices-and-dependencies.png" alt="ny-edge デバイスの依存関係マップ。接続されているデバイスと、すべて「低下」とマークされた 9 台の影響を受けるデバイスのリストが表示されています。" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/health
[2]: /ja/bits_ai/bits_investigation/
[3]: https://app.datadoghq.com/devices