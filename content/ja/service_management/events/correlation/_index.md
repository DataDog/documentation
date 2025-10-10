---
algolia:
  tags:
  - イベントの相関
  - イベントのグループ化
  - 相関パターン
disable_toc: false
further_reading:
- link: service_management/events/
  tag: ドキュメント
  text: Event Management
- link: service_management/case_management/
  tag: ドキュメント
  text: Case Management
title: 相関
---
{{% site-region region="gov" %}}
<div class="alert alert-danger">
Event Correlation は現在、{{< region-param key=dd_datacenter code="true" >}} サイトでは利用できません。
</div>
{{% /site-region %}}
## 概要

Event Correlation では、イベント間の関連性やユーザーが定義した設定に基づいてイベントをグループ化し、環境から得られる通知や問題を削減します。相関機能とケースを活用することで、以下が可能になります。
* アラートによる疲弊の軽減
* 受信するチケットや通知の件数の削減
* すべての該当チームがサイロ化せず、一つの問題を把握できるようにする

{{< whatsnext desc="はじめに:" >}}
    {{< nextlink href="/service_management/events/correlation/configuration" >}}<u>相関（Correlation）</u> - 2 種類の相関機能の利用を開始する{{< /nextlink >}}
    {{< nextlink href="/service_management/events/correlation/triage_and_notify/" >}}<u>トリアージと通知</u> - 作成された相関について、ビューの確認、トリアージ、通知、チケットの受信を行う{{< /nextlink >}}
    {{< nextlink href="/service_management/events/correlation/analytics/" >}}<u>分析</u> - 割り当てられたケース数、サービスごとの件数など、相関で得られるメトリクスを分析・調査する{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}