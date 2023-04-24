---
description: クラウドプラットフォームに関連するコストを監視します。
further_reading:
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: Documentation
  text: クラウドコストマネジメント
- link: /monitors/notify/
  tag: Documentation
  text: モニター通知の設定
- link: /monitors/notify/downtimes/
  tag: Documentation
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/manage/status/
  tag: Documentation
  text: モニターステータスの参照
kind: documentation
private: true
title: クラウドコストモニター
---

## 概要
コスト変化を事前に通知することで、予期せぬクラウド利用を抑制することができます。クラウドコストモニターは、コスト変動を迅速に特定し、その原因を調査するのに役立ちます。アラートを構成することで、予期せぬ変化をキャッチすることができます。

クラウドコストモニターを構成するためには、[クラウドコストマネジメント][1]をセットアップする必要があります。設定後、コストの増減をアラートするモニターを構成することができます。

## モニターの作成

Datadog でクラウドコストモニターを作成するには、メインナビゲーションを使用します: **Monitors** --> **New Monitor** --> **Cloud Cost**

[Cloud Costs Analytics][2] からもクラウドコストモニターを作成することができます。コスト表の上にある **+Export to Monitor** をクリックします。

{{< img src="/monitors/monitor_types/cloud_cost/cloud_cost_analytics.png" alt="'Cloud Costs Analytics のページにある Export to Monitor ボタン" style="width:100%;" >}}

## コストモニタータイプを選択する

モニタータイプは、**Compare Costs Over Time** または **Set Daily Cost Threshold** のいずれかを選択します。

| コストタイプ | 説明 | 使用例 |
| ---  | ----------- | ----------- |
| コストを時間で比較する  | 日、週、月単位でコストを比較する | 今日のコストと前週のコストの差が 5% 以上になるとアラート |
| 1 日あたりのコストしきい値を設定する | 1 日の総コストがしきい値を超えた場合のアラートを設定する | 今日の総コストが 1 万ドルを超え場合のアラートを設定する |

## 追跡するコストを指定する

Datadog に報告するコストタイプであれば、モニターとして利用可能です。詳細は、[クラウドコストマネジメント][1]のページを参照してください。エディタを使用して、コストタイプまたはエクスポートを定義します。

| 手順                              | 必須 | デフォルト              | 例             |
|-----------------------------------|----------|----------------------|---------------------|
| コストメトリクスを選択する                 | 〇      | `aws.cost.amortized` | `azure.cost.actual` |
| `filter by` を定義する            | ✕       | すべての条件           | `aws_product:s3`    |
| グループ化                          | ✕       | すべての条件           | `aws_availability_zone` |

## アラートの条件を設定する

コストモニタータイプが **Set Daily Cost Threshold** の場合、クラウドコストがしきい値より `above` (上)、`below` (下)、`above or equal` (以上)、または `below or equal to` (以下) になったときに、アラートをトリガーすることができます。

コストモニタータイプが **Compare Costs Over Time** の場合、コストが定義されたしきい値よりも `increases` (増加) または `decreases` (減少) した場合に、アラートをトリガーすることができます。しきい値には、**Percentage Change** (変化率) または **Dollar Amount** (ドル額) のいずれかを設定することができます。

**注**: **Percentage Change** では、あるドルのしきい値以下の変化をフィルターで除外することも可能です。
例: 500 ドル以上の変更に対して、5% 以上のコスト変更があった場合にアラートを出す

## チームへの通知

**Notify your team** セクションの詳しい説明は、[通知][3]のページをご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/cloud_cost_management/
[2]: https://app.datadoghq.com/cost/analytics
[3]: /ja/monitors/notify/