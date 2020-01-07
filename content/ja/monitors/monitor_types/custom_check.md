---
title: カスタムチェックモニター
kind: documentation
description: 任意のカスタムチェックのステータスを監視する
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
## 概要

カスタムモニターは、Agent に付属するインテグレーションでは報告されないサービスチェックを対象とします。

メトリクス、イベント、サービスチェックを送信する独自のチェックを記述する方法については、[Agent チェックガイド][1]を参照してください。

## コンフィグレーション

1. **カスタムチェック**を選択します。
  {{< img src="monitors/monitor_types/custom_check/Selecting_custom_check.png" alt="selecting custom monitor"  style="width:80%;">}}
2. 監視する**ホストまたはタグ**を選択します。
  {{< img src="monitors/monitor_types/custom_check/monitor_scope.png" alt="monitor scope"  style="width:80%;">}}
  チェックは、すべての監視対象のホストに含まれるすべての一意のタグセットに対して実行されます。たとえば、`Nginx` サービスチェックは、`{host,port}` ごとに 1 つのステータスを報告します。そのため、1 つのホストで複数のサーバーが実行されている場合は、障害発生時に各サーバーが個別にアラートを生成します。

3. **アラートオプション**を選択します。
  {{< img src="monitors/monitor_types/custom_check/monitor_options.png" alt="monitor options"  style="width:80%;">}}
  チェックが実行されるたびに、CRITICAL、WARNING、OK のいずれかのステータスが送信されますが、どのような条件が継続したときに状態変化と通知を発生させるかを選択することもできます。たとえば、チェックが失敗したことは直ちに通知し、リカバリ状態が続いた場合にのみリカバリさせることができます。その場合は、1 回の CRITICAL ステータス、1 回の WARNING ステータス、4 回の OK ステータスで通知されるように選択します。
  オプションで、設定したタイムフレーム後に**データなしの通知**を行うことができます。タイムフレームには 2 分以上を選択する必要があります。

4. **通知オプション**を構成します。
  よく使用される通知オプションの詳細な設定手順については、[通知に関するドキュメント][2]のページを参照してください。

## その他の参考資料 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/agent_checks
[2]: /ja/monitors/notifications