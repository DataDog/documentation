---
further_reading:
- link: /service_management/service_level_objectives/
  tag: ドキュメント
  text: サービス レベル目標の概要
- link: /service_management/service_level_objectives/metric/
  tag: ドキュメント
  text: メトリクス ベースの SLO
- link: /service_management/service_level_objectives/monitor/
  tag: ドキュメント
  text: Monitor ベースの SLO
- link: /service_management/service_level_objectives/time_slice/
  tag: ドキュメント
  text: タイム スライス SLO
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: ブログ
  text: Datadog で SLO を管理するためのベスト プラクティス
title: SLO タイプの比較
---

## 概要

SLO を作成する際は、次のタイプから選択できます:
- **メトリクス ベースの SLO**: SLI の計算をカウント ベースにしたい場合に使用できます。SLI は、良いイベントの合計を全イベントの合計で割って算出します。
- **Monitor ベースの SLO**: SLI の計算を時間ベースにしたい場合に使用できます。SLI は Monitor のアップタイムに基づきます。Monitor ベースの SLO は、新規または既存の Datadog Monitor を基盤にする必要があり、調整は基盤となる Monitor 側で行う必要があります (SLO の作成からは実施できません)。
- **タイム スライス SLO**: SLI の計算を時間ベースにしたい場合に使用できます。SLI はカスタムのアップタイム定義 (システムが良好な挙動を示した時間の合計を、総時間で割ったもの) に基づきます。タイム スライス SLO は Datadog Monitor を必要としません。SLO の作成中に各種メトリクス フィルターやしきい値を試し、ダウンタイムを即座に調査できます。

<div class="alert alert-info">メトリクス ベースおよびタイム スライス SLO が参照できる履歴期間は、アカウントのメトリクス保持期間に一致します (既定では 15 か月)。</div>

## 比較表

|                                                                       | **メトリクス ベースの SLO**                                                                                           | **Monitor ベースの SLO**                                                                                                                                               | **タイム スライス SLO**                                                                   |
|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **サポートされるデータ タイプ**                                              | タイプが count、rate、distribution のメトリクス                                                              | Metric Monitor タイプ、Synthetic Monitors、Service Checks                                                                                                        | すべてのメトリクス タイプ (gauge メトリクスを含む) |
| **グループ付き SLO の機能**                                 | すべてのグループに基づいて SLO を計算<br><br>SLO サイド パネルと SLO ウィジェットで全グループを表示可能                 | single multi alert Monitor を持つ SLO でサポート<br><br>**オプション 1:** すべてのグループに基づいて SLO を計算 (SLO サイド パネルと SLO ウィジェットで全グループを表示可能)<br>**オプション 2:** 最大 20 個の選択したグループに基づいて SLO を計算 (SLO サイド パネルと SLO ウィジェットで選択したすべてのグループを表示可能)                                                                                                                                | すべてのグループに基づいて SLO を計算<br><br>SLO サイド パネルと SLO ウィジェットで全グループを表示可能 |
| **SLO サイド パネル** | カスタムの時間ウィンドウを設定して最大 15 か月の SLO 履歴を表示可能    | カスタムの時間ウィンドウを設定して最大 3 か月の SLO 履歴を表示可能                         | カスタムの時間ウィンドウを設定して最大 15 か月の SLO 履歴を表示可能                                         |
| **SLO アラート ([エラー バジェット][1] または [バーン レート][2] アラート)**         | 利用可能<br><br>グループがある場合、SLO 全体のみを基準にアラート可能                                                                                                      | Metric Monitor タイプに基づく SLO のみに対して利用可能 (Synthetic Monitors および Service Checks では利用不可)<br><br>グループがある場合、SLO 全体のみを基準にアラート可能                                                      | 利用可能<br><br>グループがある場合、グループ単位または SLO 全体を基準にアラート可能   |
| [**SLO Status Corrections**][3]                                       | 補正期間は SLO ステータスの計算から除外されます                                                     | 補正期間は SLO ステータスの計算から除外されます                                                                                                          | 補正期間は SLO ステータスの計算でアップタイムとして算入されます |
| **SLO ウィジェット ([SLO List ウィジェット][10] または [SLO ウィジェット][9])**            | SLO ウィジェットで最大 15 か月の履歴データを表示可能                                                | SLO ウィジェットで最大 3 か月の履歴データを表示可能                                                                                                      | SLO ウィジェットで最大 15 か月の履歴データを表示可能  |
| **[SLO Data Source][5] (最大 15 か月の履歴データ)**         | 利用可能                                                                                                      | 利用不可                                                                                                                                                       | 利用可能                                             |
| **SLO 計算における欠損データの扱い**                      | 欠損データは SLO ステータスおよびエラー バジェットの計算で無視されます                                            | 欠損データは [基盤となる Monitor の設定][6] に従って処理されます                                                                                        | 欠損データは SLO ステータスおよびエラー バジェットの計算でアップタイムとして扱われます        |
| **アップタイムの計算**                                               |  該当なし                                                                                                           |  アップタイムの計算は基盤となる Monitor に基づきます<br><br>グループがある場合、全体のアップタイムには*すべての*グループにアップタイムがあることが必要です| [アップタイム][7] はローリング タイム ウィンドウではなく、離散的な時間 チャンクを用いて計算されます<br><br>グループがある場合、全体のアップタイムには*すべての*グループにアップタイムがあることが必要です |
| **SLO Manage ページの [Calendar View][11]**                            | 利用可能                                                                                                      | 利用不可                                                                                                                                                       | 利用可能                                                                            |
| **パブリック [API][8] と Terraform サポート**                            | 利用可能                                                                                                      | 利用可能                                                                                                                                                           | 利用可能                                                                            |

## SLO タイプの選び方に関するベスト プラクティス

- 可能な限りメトリクス ベースの SLO を使用してください。SLO を違反するまでに残された不良イベント数をエラー バジェットが正確に反映するようにすることがベスト プラクティスです。SLO の計算は、イベント数に基づいてボリューム加重にもなります。
- 一方、アップタイムを追跡し、時間ベースの SLI 計算を用いる SLO が必要な場合は、タイム スライス SLO を使用してください。Monitor ベースの SLO と異なり、タイム スライス SLO では SLO のために基盤となる Monitor を維持する必要がありません。
- 最後に、タイム スライス SLO でカバーされないユース ケース (非メトリクス系の Monitor や複数の Monitor に基づく SLO など) については、Monitor ベースの SLO の活用を検討してください。


## 関連資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/error_budget/
[2]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/burn_rate/
[3]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/#slo-status-corrections
[4]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/#slo-widgets
[5]: https://docs.datadoghq.com/ja/dashboards/guide/slo_data_source/
[6]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/monitor/#missing-data
[7]: /ja/service_management/service_level_objectives/time_slice/#uptime-calculations
[8]: https://docs.datadoghq.com/ja/api/latest/service-level-objectives/
[9]: https://docs.datadoghq.com/ja/dashboards/widgets/slo/
[10]: https://docs.datadoghq.com/ja/dashboards/widgets/slo_list/
[11]: https://docs.datadoghq.com/ja/service_management/service_level_objectives/#slo-calendar-view