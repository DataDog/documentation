---
further_reading:
- link: service_management/events/correlation/triage_and_notify
  tag: ドキュメント
  text: ケースのトリアージと通知について
title: インテリジェントな相関付け
---

## 概要

インテリジェントな相関付けでは、機械学習を用いたモデリング手法を使用します。Datadog 内で収集された基盤となるテレメトリーやその他のヒューリスティック手法を使用して、ユーザーに代わって Datadog Monitor イベント同士を自動的に相関付けます。
## インテリジェントな相関付けの有効化

始めるには
1. [Correlation Settings][1] ページに移動し、[Preview Cases][2] をクリックします。 
1. そこから、自分の組織から作成されたインテリジェントな相関付けをプレビューすることができます。


{{< img src="service_management/events/correlation/intelligent/intelligent_config_updated.png" alt="インテリジェントな相関付けの構成" style="width:100%;" >}}


## 最初のケースの受信

{{< img src="service_management/events/correlation/intelligent/intelligent_project.png" alt="Event Management - Intelligent Correlation" style="width:100%;" >}}

[Event Correlations][3] に移動すると、**Intelligent Correlation** というプロジェクトが見つかります。このプロジェクトから、インテリジェントな相関付けにより作成されたケースを見ることができます。

インテリジェントな相関付けは、関連するアラートを見つけた後、自動的にケースを生成します。
{{< img src="service_management/events/correlation/intelligent/intelligent_correlation.png" alt="インテリジェントな相関付けから作成されたケースのケース詳細ページの Investigation タブに表示された関連アラート" style="width:100%;" >}}




## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/settings/correlation
[2]: https://app.datadoghq.com/event/correlation/rule/new?tab=intelligent
[3]: https://app.datadoghq.com/event/correlation