---
title: ダッシュボードを作成して、APM メトリクスを追跡、関連付ける
kind: ガイド
further_reading:
  - link: /tracing/guide/alert_anomalies_p99_database/
    tag: 3 分
    text: データベースサービスの異常な p99 レイテンシーに関するアラート
  - link: tracing/guide/week_over_week_p50_comparison/
    tag: 2 分
    text: サービスのレイテンシーを前週と比較する
  - link: /tracing/guide/slowest_request_daily/
    tag: 3 分
    text: ウェブサービスの最も遅いエンドポイントで最も遅いトレースをデバッグする
  - link: tracing/guide/add_span_md_and_graph_it/
    tag: 7 分
    text: スパンタグを追加し、アプリケーションのパフォーマンスを分類する
  - link: tracing/guide/
    tag: ''
    text: すべてのガイド
---
_4 分で読了_

{{< img src="tracing/guide/apm_dashboard/dashboard_7.mp4" alt="ダッシュボード 7" video="true"  style="width:90%;">}}

Datadog APM では、ビジネスの優先順位と重要なメトリクスに基づいてダッシュボードを作成できます。
このダッシュボードにウィジェットを作成して、従来のインフラストラクチャー、ログ、およびホストメモリ使用量などのカスタムメトリクスを、スループット、レイテンシー、相関のエラー率に基づく重要な APM メトリクスとともに追跡できます。
また、主要顧客のユーザーエクスペリエンスや最大のトランザクションを追跡したり、ブラックフライデーのような主要イベントに先駆けてメインウェブサーバーのスループットを追跡したりできます。

このガイドでは、トレースメトリクスをダッシュボードに追加し、それをインフラストラクチャーメトリクスと関連付けてから、App Analytics クエリをエクスポートする方法について説明します。このガイドでは、以下の 3 つの方法でダッシュボードにウィジェットを追加する方法について説明します。

* 既存の APM グラフをコピーする_（ステップ 1.、2.、3.）_
* 手動で作成する。_（ステップ 4.、5.）_
* App Analytics クエリをエクスポートする。_（ステップ 7.）_

1. **[サービス一覧ページ][1]**を開き、`web-store` サービスを選択します。

2. **Total Requests グラフを見つけ**、右上の `export` ボタンをクリックして `Export to Dashboard` を選択します。**`New Timeboard` をクリックします**。

    {{< img src="tracing/guide/apm_dashboard/dashboard_2.png" alt="ダッシュボード 2"  style="width:90%;">}}

3. 成功メッセージの **`View Dashboard` をクリック**します。

   新しいダッシュボードでは、`web-store` サービスの `Hit/error count on service` グラフが利用可能になりました。このサービスのスループット全体とエラーの合計量が表示されます。

    {{< img src="tracing/guide/apm_dashboard/dashboard_3.png" alt="ダッシュボード 3"  style="width:90%;">}}

   **注**: 鉛筆アイコンをクリックするとこのグラフを編集し、使用されている正確なメトリクスを確認できます。

4. ダッシュボードスペースの **`Add graph` プレースホルダータイルをクリック**してから、**このスペースに `Timeseries` をドラッグ**します。

   これは、ダッシュボードウィジェットの編集画面です。ここでは、利用可能なすべてのメトリクスに対してあらゆるタイプの視覚化を作成できます。詳細については、[時系列ウィジェットのドキュメント][2]をご覧ください。

5. **`system.cpu.user` ボックスをクリック**して、関連するメトリクスとパラメーターを選択します。この例では以下の通りです。

    | パラメーター | 値                         | 説明                                                                                                          |
    | ------    | -----                         | -----                                                                                                                |
    | `metric`  | `trace.rack.requests.errors` | Ruby Rack の誤ったリクエストの合計セット。                                                                       |
    | `from`    | `service:web-store`           | このサンプルスタックのメインサービス。これは Ruby サービスであり、チャート内のすべての情報はここから取得されます。 |
    | `sum by`  | `http.status_code`            | http ステータスコードによるチャートの分類。                                                                        |

    {{< img src="tracing/guide/apm_dashboard/dashboard_4.mp4" video="true" alt="ダッシュボード 4"  style="width:90%;">}}

   この具体的な内訳は、選択できる多くの一例にすぎません。`trace.` で始まるメトリクスには APM 情報が含まれることに注意することが重要です。[詳細については、APM メトリクスのドキュメント][3]を参照してください。

6. **別の時系列をプレースホルダータイルにドラッグします**

   この例では、`trace.*` と `runtime.*` という 2 種類のメトリクスがグラフに追加されます。これらのメトリクスを組み合わせることで、リクエストとコードランタイムパフォーマンス間の情報を関連付けることができます。具体的には、レイテンシーの急上昇はスレッドカウントの増加に伴って発生する可能性があることがわかっているため、スレッドカウントの横にサービスのレイテンシーが表示されます。

    1. まず、ウィジェットに `trace.rack.reqesusts.errors` メトリクスを追加します。

        | パラメーター | 値                                        | 説明                                                                                                          |
        | ------    | -----                                        | -----                                                                                                                |
        | `metric`  | `trace.rack.request.duration.by.service.99p` | サービスのリクエストのレイテンシーの 99 パーセンタイル。                                                           |
        | `from`    | `service:web-store`                          | このサンプルスタックのメインサービス。これは Ruby サービスであり、チャート内のすべての情報はここから取得されます。 |

    2. 次に、`Graph additional: Metrics` をクリックして、チャートに別のメトリクスを追加します。

        | パラメーター | 値                       | 説明                                                                                                          |
        | ------    | -----                       | -----                                                                                                                |
        | `metric`  | `runtime.ruby.thread_count` | Ruby ランタイムメトリクスから取得したスレッドカウント。                                                                    |
        | `from`    | `service:web-store`           | このサンプルスタックのメインサービス。これは Ruby サービスであり、チャート内のすべての情報はここから取得されます。 |

        {{< img src="tracing/guide/apm_dashboard/dashboard_5.mp4" alt="dashboard_5" video="true"  style="width:90%;">}}

    このセットアップでは、レイテンシーの急上昇が Ruby スレッドカウントの急上昇に関連しているかどうかを示すことができ、レイテンシーの原因をすぐに特定することで迅速な解決が可能になります。

7. **[App Analytics][4] に移動します**。

   この例では、サンプルアプリケーション全体のレイテンシーをクエリする方法を示します。プラットフォーム上のマーチャント別に分類し、レイテンシーが最も高い上位 10 マーチャントを表示します。App Analytics 画面から、グラフをダッシュボードにエクスポートしてそこでこれを表示します。

    {{< img src="tracing/guide/apm_dashboard/dashboard_6.mp4" video="true" alt="ダッシュボード 6"  style="width:90%;">}}

8. **ダッシュボードに戻ります**。

   複数のウィジェットが見られるようになり、技術的な観点とビジネス上の観点の両方からサンプルアプリケーションを深く観察できるようになりました。しかし、インフラストラクチャーメトリクスの追加、複数の種類の視覚化の使用、計算と予測の追加など、できることはまだまだあります。

   ダッシュボードを使用すれば、関連するイベントを調べることもできます。

9. **`Search Events or Logs` ボタンをクリック**して、関連するイベントストリームの検索を追加します。**注**: この例では Ansible が使用されていますが、[イベントストリーム][5]は異なる場合があります。

    {{< img src="tracing/guide/apm_dashboard/dashboard_1.png" alt="ダッシュボード 1"  style="width:90%;">}}

   ここでは、ダッシュボードのビューとともに、デプロイ、タスクの完了、モニターアラートなど、（Datadog または Ansible、Chef などの外部サービスで）発生した最近のイベントを確認できます。これらのイベントは、ダッシュボードで設定されたメトリクスで起こっていることと関連付けることができます。

   最後に、テンプレート変数を必ず使用してください。これは、すべてのユーザーがウィジェット自体を編集しなくても使用できるダッシュボード上のウィジェットを動的に制御する一連の値です。

10. コントロールパネルの **`Add Template Variables` をクリック**します。**`Add Variable +` をクリック**し、テンプレート変数に名前を付けて、変数が制御するタグを選択します。

    この例では、ダッシュボードが 2 つの主要な操作領域である `us-east1` と `europe-west-4` でどのように動作するかを確認するために、`Region` のテンプレート変数が追加されています。

    {{< img src="tracing/guide/apm_dashboard/dashboard_8.mp4" alt="ダッシュボード 8" video="true"  style="width:90%;">}}

    これで、このテンプレート変数を各グラフに追加できます。

    {{< img src="tracing/guide/apm_dashboard/dashboard_9.png" alt="ダッシュボード 9"  style="width:90%;">}}

    コントロールパネルで値を変更すると、ダッシュボードですべての値が更新されます。

    {{< img src="tracing/guide/apm_dashboard/dashboard_10.mp4" alt="ダッシュボード 10" video="true"  style="width:90%;">}}

    使用可能なメトリクスをすべて確認し、Datadog の可観測性の 3 本の柱を最大限に活用してください。この基本的なダッシュボードは、組織の監視と可観測性のためのワンストップショップである強力なツールに簡単に変換できます。

    {{< img src="tracing/guide/apm_dashboard/dashboard_7.mp4" alt="ダッシュボード 7" video="true"  style="width:90%;">}}

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /ja/dashboards/widgets/timeseries
[3]: /ja/tracing/guide/metrics_namespace
[4]: https://app.datadoghq.com/apm/search/analytics
[5]: /ja/events