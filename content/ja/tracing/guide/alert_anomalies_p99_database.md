---
further_reading:
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2 分
  text: サービスのレイテンシーを前週と比較する
- link: /tracing/guide/slowest_request_daily/
  tag: 3 分
  text: ウェブサービスの最も遅いエンドポイントで最も遅いトレースをデバッグする
- link: /tracing/guide/apm_dashboard/
  tag: 4 分
  text: ダッシュボードを作成して、APM メトリクスを追跡、関連付ける
- link: /tracing/guide/
  tag: ''
  text: すべてのガイド
kind: ガイド
title: データベースサービスの異常な p99 レイテンシーに関するアラート
---

_所要時間 3 分_

{{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_cropped.mp4" video="true" alt="進行中のアラートがあるモニター表示" style="width:90%;">}}

Datadog では、ユーザー自身で継続的にサービスの健全性を監視する代わりに、APM を使用して健全性を追跡するようにモニターを設定できます。ここでは、異常検知モニターを使用します。[異常検知][1]とは、傾向や、季節的な曜日や時間帯のパターンを考慮しながら、メトリクスの挙動が過去のものとは異なる場合、これを認識できるアルゴリズム機能です。異常検知は、しきい値ベースのアラート設定では監視することが困難または不可能な強い傾向や反復パターンを持つメトリクスに適しています。

1. **[New Monitor ページ][2]を開き、[APM][3]** を選択します。
2. Primary Tags に **環境を選択**し、Service に **監視するデータベースを選択**します。

    [Resource][4] にデータベースで実行される特定のクエリを選択して監視することができますが、この例では全体的なパフォーマンスを確認するため、`*` のままにします。

    [サービス][5]を選択すると、次のステップを設定できるようになり、新しいモニターの追跡対象となるメトリクスのパフォーマンスを示すグラフがページ上部に表示されます。 

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_2_cropped.png" alt="進行中のアラートがあるモニター表示" style="width:90%;">}}

3. ***Anomaly Alert* を選択**し、*For* オプションに「p99 latency」を選択します。

   Anomaly Alert を選択すると、選択したメトリクス (この例では p99 latency) の挙動の予測ベースラインもグラフに表示されるようになります。

4. ***Alert when* フィールドの値を「100%」に設定します**。

    これで、選択期間のすべてのイベントがアラートをトリガーする異常になります。これは、異常検知を開始する場合のベストプラクティスです。時間の経過とともに、状況に応じた適正値がわかってきます。異常検知モニターの詳細については、[よくあるご質問][6] をご確認ください。

5. **アラート通知を変更します**。

    ここでは、通知内容をデフォルトテキストのままにしておくことも、アラート内でタグ付けするチームメンバーを選ぶこともできます。

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_3.png" alt="モニターの継続的なアラート設定" style="width:90%;">}}

    通知テキストのマークアップと、このフィールドで設定可能な値および条件の詳細については、[通知の概要][7]をご確認ください。

6. ***Notify your team* ボックスに自分のユーザー名が表示されていることを確認**し、データベースのレイテンシー異常が検知された場合に通知するチームメンバーを追加します。
    **注意**: 他のユーザーを追加するには、先頭に必ず `@` を入力してください。***Save* をクリックします**。

    これでアラート設定が完了し、今後、この画面からパラメーターを調整したり、メトリクスのパフォーマンスを追跡したりできます。

7. ***Edit* タブから *Status* タブに切り替えます**。

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_4_cropped.png" alt="進行中のアラートがあるモニター表示" style="width:90%;">}}

    このタブでは、モニターの現在の状況の確認やミュート設定、トリガーされたアラートの詳細調査をします。

8. **[サービスカタログ][8]に戻り**、モニターを設定したサービスを見つけ、**サービスページを開いて**、そこでヘッダーの下にある **Monitor バーをクリック**します。

    このウィンドウでは、サービスに設定された他のモニターや推奨設定の提案モニターに加え、**新しいモニターが表示されます**。

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_5_cropped.png" alt="進行中のアラートがあるモニター表示" style="width:90%;">}}

    モニターを作成するにつれ、追加するサービス、メトリクス、イベントと、これらに設定する複雑な条件がさらに出てきます。モニターはそれぞれ、サービスに接続されているため、サービス詳細画面および [Service Map][9] からアクセスできます。

    {{< img src="tracing/guide/alert_anomalies_p99_database/alert_anomalies_6_cropped.png" alt="サービスマップ" style="width:90%;">}}

    マップ上の各サービスの色分けは、緑色はすべてのモニターが正常、黄色は 2 つ以上のモニターで警告があるがアラートはなし、赤は 2 つ以上のモニターでアラートあり、灰色はモニター設定なし、という状態を示しています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/anomaly/
[2]: https://app.datadoghq.com/monitors#/create
[3]: https://app.datadoghq.com/monitors#create/apm
[4]: /ja/tracing/glossary/#resources
[5]: /ja/tracing/glossary/#services
[6]: /ja/monitors/types/anomaly/#faq
[7]: /ja/monitors/notify/?tab=is_alertis_warning
[8]: https://app.datadoghq.com/services
[9]: https://app.datadoghq.com/service/map