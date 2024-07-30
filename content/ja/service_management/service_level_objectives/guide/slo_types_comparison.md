---
further_reading:
- link: /service_management/service_level_objectives/
  tag: ドキュメント
  text: サービスレベル目標の概要
- link: /service_management/service_level_objectives/metric/
  tag: ドキュメント
  text: 接続
- link: /service_management/service_level_objectives/monitor/
  tag: ドキュメント
  text: アクションの保存と再利用
- link: /service_management/service_level_objectives/time_slice/
  tag: ドキュメント
  text: APM
title: SLO タイプの比較
---

## 概要

SLO を作成する際、以下のタイプから選択できます。
- **メトリクスベースの SLO**: SLI をカウントベースで計算したい場合に使用でき、SLI は優良イベントの合計を全イベントの合計で割った値として計算されます。
- **モニターベースの SLO**: SLI を時間ベースで計算したい場合に使用でき、SLI はモニターのアップタイムを基にしています。モニターベースの SLO は新規または既存の Datadog モニターに基づく必要があり、調整はそのモニターに対して行う必要があります (SLO の作成時にはできません)。
- **タイムスライス SLO**: SLI を時間ベースで計算したい場合に使用でき、SLI はカスタムアップタイム定義 (システムが正常な動作を示した時間を合計時間で割ったもの) に基づきます。タイムスライス SLO は、Datadog モニターを必要とせず、さまざまなメトリクスフィルターとしきい値を試して、SLO 作成中にダウンタイムを即座に調査することができます。

## 比較チャート

|                                                                       | **メトリクスベースの SLO**                                                                                                                      | **モニターベースの SLO**                                                                                                                                               | **タイムスライス SLO**                                                                   |
|-----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **サポートされるデータタイプ**                                              | カウント、レート、またはディストリビューションタイプのメトリクス                                                                                         | メトリクスモニターのタイプ、Synthetic モニター、サービスチェック                                                                                                        | すべてのメトリクスタイプ (ゲージメトリクスを含む)                                           |
| **グループによる SLO の機能**                                               | すべてのグループに基づいて計算された SLO<br><br>SLO サイドパネルで全グループを、SLO サマリーウィジェットで最大 20 グループを表示できます                                                                                                                  | 単一のマルチアラートモニターを持つ SLO のサポート<br><br>**オプション 1:** すべてのグループに基づいて計算された SLO (SLO サイドパネルと SLO サマリーウィジェットでワースト 5 グループを表示できます)<br>**オプション 2:** 最大 20 個の選択されたグループに基づいて計算された SLO (SLO サイドパネルと SLO サマリーウィジェットで選択されたすべてのグループを表示できます)                                                                                                                                | すべてのグループに基づいて計算された SLO<br><br>SLO サイドパネルで全グループを、SLO サマリーウィジェットで最大 20 グループを表示できます                                                           |
| **SLO 詳細サイドパネル (最大 90 日間の履歴データ)** | SLO 情報を表示するためのカスタムタイムウィンドウを設定できます                                                                                              | SLO 情報を表示するためのカスタムタイムウィンドウを設定できません (7 日、30 日、90 日の履歴は表示できます)                                                                                                                     | SLO 情報を表示するためのカスタムタイムウィンドウを設定できます                                         |
| **SLO アラート ([エラーバジェット][1]または[バーンレート][2]アラート)**         | 利用可能                                                                                                      | メトリクスモニタータイプに基づく SLO にのみ利用可能 (Synthetic モニターやサービスチェックの場合は利用できません)                                                      | 利用不可                                                    |
| [**SLO ステータスの修正**][3]                                       | 修正期間は SLO ステータスの計算から無視されます                                                              | 修正期間は SLO ステータスの計算から無視されます                                                                                        | 修正期間は SLO ステータス計算のアップタイムとしてカウントされます |
| **[SLO ウィジェット][4] (最大 90 日間の履歴データ)**                                                  | 利用可能                                                                                                           | 利用可能                                                                                                                           | 利用可能                                                        |
| [**SLO データソース**][5]                                              | 利用可能 (最大 15 か月の履歴データあり)                                                                | 利用不可                                                                                                                                     | 利用不可                                                |
| **SLO 計算における欠落データの処理**                      | SLO ステータスおよびエラーバジェットの計算では、欠落データは無視されます                                                                       | 欠落データは、[基礎となるモニターの構成][6]に基づいて処理されます                                                                                        | SLO ステータスおよびエラーバジェットの計算では、欠落データはアップタイムとして扱われます        |
| **アップタイムの計算**                                          |  N/A                                                                                  |  アップタイムの計算は基礎となるモニターに基づいて行われます<br><br>グループが存在する場合、全体のアップタイムには*すべての*グループがアップタイムであることが求められます| [アップタイム][7]はローリングタイムウィンドウではなく、個別のタイムチャンクを見て計算されます<br><br>グループが存在する場合、全体のアップタイムには*すべての*グループがアップタイムであることが求められます |
| **SLO 管理ページのカレンダー表示**                                   | 利用可                                                                                                                                | 利用不可                                                                                                                                                      | 利用可                                                                            |
| **公開 [API][8] と Terraform のサポート**                                   | 利用可                                                                                                                                 | 利用可                                                                                                                                                     | 利用可能                                                                            |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/error_budget/
[2]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/burn_rate/
[3]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/#slo-status-corrections
[4]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/#slo-widgets
[5]: https://docs.datadoghq.com/ja/dashboards/guide/slo_data_source/
[6]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/monitor/#missing-data
[7]: /ja/service_management/service_level_objectives/time_slice/#uptime-calculations
[8]: https://docs.datadoghq.com/ja/api/latest/service-level-objectives/