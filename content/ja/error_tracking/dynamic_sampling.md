---
description: Error Tracking における Dynamic Sampling により、使用量が一度に消費されないようにする方法について学びます。
further_reading:
- link: /logs/error_tracking/manage_data_collection
  tag: ドキュメント
  text: Error Tracking におけるデータ管理について学びます。
- link: /logs/error_tracking
  tag: ドキュメント
  text: Logs 向け Error Tracking について学びます。
is_beta: false
private: true
title: Error Tracking の Dynamic Sampling
---

## 概要

Error Tracking の課金はエラー数に基づいているため、単一の issue でエラーが大幅に増加すると、Error Tracking の予算が急速に消費される可能性があります。Dynamic Sampling は、日次レート制限と過去のエラー数に基づいて issue ごとのエラー レートのしきい値を設定し、そのしきい値に達した場合にエラーをサンプリングすることで、保護します。issue のエラー レートが指定のしきい値を下回ると、Dynamic Sampling は自動的に無効化されます。

## セット アップ

Dynamic Sampling は Error Tracking と共に自動的に有効化され、日次レート制限と過去のボリュームに基づくデフォルトの取り込みしきい値が設定されます。

最良の結果を得るには、[Error Tracking のレート制限ページ][2] で日次レート制限を設定してください: **Edit Rate Limit** をクリックし、新しい値を入力します。

{{< img src="error_tracking/dynamic-sampling-rate-limit.png" alt="Error Tracking の Rate Limit" style="width:90%" >}}

## Dynamic Sampling の無効化

Dynamic Sampling は [Error Tracking の設定ページ][4] で無効化できます。

{{< img src="error_tracking/dynamic-sampling-settings.png" alt="Error Tracking の Dynamic Sampling 設定" style="width:90%" >}}

## Dynamic Sampling の監視

Dynamic Sampling が issue に適用されると、`Dynamic Sampling activated` イベントが生成されます。イベントの表示と活用の詳細は [Event Management のドキュメント][1] を参照してください。

{{< img src="error_tracking/dynamic-sampling-event.png" alt="Error Tracking の Rate Limit" style="width:90%" >}}

### 調査および緩和手順

Dynamic Sampling が適用された場合、次の手順を推奨します:

- どの issue がクォータを消費しているかを確認します。Dynamic Sampling が適用された issue へのリンクは、Event Management で生成されたイベント内に含まれています。
- この issue について追加のサンプルを収集したい場合は、[Error Tracking のレート制限ページ][2] で日次クォータを引き上げてください。
- 将来的にこの issue でのサンプル収集を回避したい場合は、[除外フィルター][3] を作成して、追加のイベントが Error Tracking に取り込まれないようにすることを検討してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/events/
[2]: https://app.datadoghq.com/error-tracking/settings/rate-limits
[3]: /ja/logs/error_tracking/manage_data_collection#add-a-rule
[4]: https://app.datadoghq.com/error-tracking/settings