---
title: ネットワークモニター
kind: documentation
description: TCP/HTTP エンドポイントのステータスをチェックする
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: モニター通知の設定
  - link: monitors/downtimes
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: monitors/monitor_status
    tag: Documentation
    text: モニターステータスの参照
---
ネットワークモニターは、Agent で使用できる TCP チェックと HTTP チェックを対象とします。Agent の構成の詳細については、[HTTP チェックに関するドキュメント][1]を参照してください。

## ネットワークステータス

1. **ネットワークチェック**を選択します。使用可能なオプションには、Agent によって送信されている、監視対象の `HTTP` または `TCP` チェックがすべて含まれます。
    {{< img src="monitors/monitor_types/network/network_check_pick.png" alt="network check pick"  style="width:80%;">}}
2. **モニター範囲**を選択します。選択したチェックに含まれるホストまたはタグのみを選択できます。
    {{< img src="monitors/monitor_types/network/network_check_monitor_scope.png" alt="network check monitor scope"  style="width:80%;">}}
3. **アラートオプション**を選択します。
    {{< img src="monitors/monitor_types/network/network_check_alert_conditions.png" alt="network check alert conditions"  style="width:80%;">}}

    **注**: [メトリクスモニター][2]と異なり、エンドポイントが `X` 分間使用できない状態だった場合にアラートを受け取ることはできません。代わりに、最大 5 回連続して無効ステータスが発生した場合にアラートを受け取ることができます。Agent 構成で大きなタイムアウト値を使用していない限り、サイトがダウンした場合、これは、約 15 ～ 20 秒 (Agent の収集時間) が 5 回、すなわち約 90 秒間のデータなし状態になることを意味します。

4. **通知オプション**を構成します。よく使用される通知オプションの詳細な設定手順については、[通知に関するドキュメント][3]のページを参照してください。

## ネットワークメトリクス

1. **ネットワークメトリクス**を選択します。`TCP` または `HTTP` 応答時間メトリクスを選択できます。

2. **モニター範囲**を選択します。選択したメトリクスに含まれるホストまたはタグのみを選択できます。

3. **アラートオプション**を選択します。詳細は、[メトリクスモニターに関するドキュメント][2]のアラート条件セクションを参照してください。

4. **通知オプション**を構成します。よく使用される通知オプションの詳細な設定手順については、[通知に関するドキュメント][3]のページを参照してください。

## その他の参考資料 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/http_check
[2]: /ja/monitors/monitor_types/metric
[3]: /ja/monitors/notifications