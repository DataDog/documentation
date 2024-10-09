---
further_reading:
- link: service_management/events/correlation/triage_and_notify
  tag: ドキュメント
  text: ケースのトリアージと通知について
- link: service_management/events/correlation/analytics
  tag: ドキュメント
  text: ケースの分析
title: 構成
---

## 概要

相関関係には 2 種類があります。

- **パターンベース**: イベントの相関関係をユーザーが制御します。Datadog は、ML モデルによるインテリジェントなアラートを活用し、パターンベースの相関を自動的に拡充します。
- **インテリジェント (非公開ベータ版)**: ML モデリングアプローチを使用し、Datadog が自動的に相関を構築します。構成は不要です。


### 相関の構成

{{< whatsnext desc=" " >}}
   {{< nextlink href="service_management/events/correlation/patterns" >}}パターンベース相関{{< /nextlink >}}
   {{< nextlink href="service_management/events/correlation/intelligent" >}}インテリジェント相関{{< /nextlink >}}
{{< /whatsnext >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}