---
description: モニターの使用パターンを分析して、未使用または冗長なモニターを特定し、アラートの質を向上させノイズを低減するためのモニター管理のベストプラクティスを実施することで、モニターの乱れを解消する方法を学びます。
further_reading:
- link: monitors/guide/monitor_best_practices
  tag: Documentation
  text: モニターのベストプラクティス
- link: monitors/quality
  tag: Documentation
  text: モニター品質
title: モニターの乱雑さの解消
---
## 概要

モニターは時間とともに乱雑になり、情報の過多、アラートの重複、運用上の摩擦を引き起こします。このガイドでは、乱雑になったモニターを特定し整理するための明確なアプローチを概説し、アラートワークフローを効率化するためのユースケースを提供します。

また、整理されたモニター環境を維持するためのベストプラクティスも記載しているので、システムの拡張に応じたモニター戦略の拡張と統制に役立ちます。

###前提条件

[モニターの書き込み権限][10] を持っている必要があります。

###ユースケース

このガイドでは、乱雑なモニターを整理するためのいくつかの重要なユースケースを紹介します。

**[長期間ミュートされているモニター](#mutedforalongperiodoftime)**: 長期間 (数週間または数か月) ミュートされているモニター
**[アラート状態に固定されているモニター](#inthealertedstateforalongperiodoftime)**: 通常、認識または解決されることなく異常に長い期間「アラート」状態になっているモニター
**[重複モニター](#duplicatemonitors)**: 同じ条件、メトリクス、またはサービスでトリガーされている複数のモニター (チームのサイロ化や調整不足によることが多い)
**[フラッピングやノイズの多いモニター](#flappyandnoisymonitors)**: トリガーと解決を繰り返す「フラップ」動作の多いモニターや、価値の低いアラートを大量に生成するモニター
**[誤って設定されたモニター](#misconfiguredmonitors)**: ダッシュボードへのリンクが壊れている、評価遅延が欠けている、アラートの構成要素が欠けているまたは不正確である、または古いタグや命名規則を持つモニター

##長期間ミュートされているモニター

モニターは、障害、セキュリティ脅威、パフォーマンスの問題に対する早期警告システムとして機能します。しかし、モニターを長期間ミュートしたままにすると本来の目的が失われます。一般的に、モニターが長期間ミュートされている状態は、不必要、無関係、または不要な情報が多すぎて役に立たないことを示しています。こうしたモニターは見直して適切に調整したうえで再有効化するか、不要なものを削除することで乱雑さを軽減し、古いモニターをアラート環境から取り除く必要があります。

価値のある情報を提供していないモニターを整理し、長期のミュート設定を期限付きのスケジュール設定に切り替えましょう。

### 1. モニターの見直し

長期間ミュートされているモニターを見直して、実際に必要なものや有用なものを把握します。適切な理由でミュートされているモニターについては削除しないようにします。

これらのモニターを見るには、[モニター品質][1] ページに移動し、60 日以上ミュートされているモニターのリストを見つけます。ミュートされたモニターは、クエリ `muted_elapsed:<number_of_days>d` を使うことで [**モニターリスト**][8] からも見つけることができます。

リストができたら、モニター品質ページから各モニターに対してアクションを取るか、ステップ 2 と 3 に進んでモニターを一括削除します。

### 2. モニター ID リストの取得

変更をプログラムで自動化するために、モニター ID のリストを取得します。60 日以上ミュートされているモニターから始めます。

以下の CURL コマンドでその情報を取得します。

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("muted_duration_over_sixty_days")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_muted.csv
```

これにより、モニターの詳細が CSV ファイルで出力され、確認しやすくなります。クエリは使用例に応じて調整してください。

### 3. モニターの削除

ステップ 2 で取得した、60 日以上ミュートされているモニターのリストを使い、以下のスクリプトで削除します。スクリプトを実行する前に、モニター ID の列をテーブルの**最初**に配置してください。

```shell
input_file="monitors_muted.csv"
tail -n +2 "$input_file" | awk -F',' '{print $1}' | while read -r monitor_id; do
    echo "Deleting monitor ID: $monitor_id"

    curl -X DELETE "{{< region-param key=dd_api >}}/api/v1/monitor/${monitor_id}" \
        -H "Accept: application/json" \
        -H "DD-API-KEY: ${DD_API_KEY}" \
        -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
    echo "Deleted monitor: $monitor_id"
done
```

##長期間アラート状態にあるモニター

アラートが出続ける場合、対処できない問題であるか、監視の閾値の設定が誤っているかのいずれかです。どちらの場合も、アラートへの信頼を損ない、アラート疲労を引き起こします。これらのモニターは見直すか、編集するか、削除する必要があります。

アラート状態に 60 日以上あるモニターのリストを取得する方法は次のとおりです。

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("alerted_too_long")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_alerted_too_long.csv
```

削除するには、[モニターの削除コマンド](#3deletethemonitors) と同じプロセスを使用してください。`input_file` を `monitors_alerted_too_long.csv` に置き換えます。

##重複しているモニター

タグの違いだけで別々のモニターを作成すると、不要な重複につながることがあります。たとえば、`prod` 用のモニターと `staging` 用のモニターで CPU 使用率を監視すると、モニターの数が増えます。

モニターの重複は、不必要な情報を生み、混乱を引き起こします。多くの場合、これらは適切なスコープとタグ付けを行うことで、単一の [**マルチアラート**モニター][2] に統合することで、重複が減り、アラートの管理が容易になります。

アラートの原因となったタグ値ごとに通知を変える必要がある場合は、[モニター変数][3] を使用して、閾値を超えたタグに基づいてメッセージを動的にカスタマイズしてください。

##フラッピングやノイズの多いモニター

不要なアラートが多いと、チームは本来対処すべき問題に鈍感になります。フラッピング (モニターがアラート状態と回復状態を頻繁に切り替わる現象) が発生しているということは、一般的に閾値設定の不備や評価遅延の不足、またはシステムの不安定さが原因であると思われます。

ノイズを減らすために、モニターの評価集約と閾値設定を見直してください。設定を調整してアラートの動作を安定させるか、役割を終えたモニターを削除してください。

大量のアラートを発生させているモニターの一覧を取得する方法は次のとおりです。

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("noisy_monitor")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > noisy_monitors.csv
```

削除するには、[モニターの削除コマンド](#3deletethemonitors) と同じプロセスを使用してください。`input_file` を `noisy_monitors.csv` に置き換えてください。

##誤って設定されたモニター

誤って設定されたモニターとは、本来有用であるにもかかわらず、ユーザーに通知が届かないために十分に機能していないアクティブなモニターを指します。このような設定ミスがあると、モニターの信頼性が低下し、デバッグやトリアージが困難になります。設定ミスを修正することで、アラートの正確性と実用性が向上し、観測可能性のワークフローにも適切に組み込まれます。

###通知先の設定ミス
[**モニター品質ページ**][4] を使用して、通知先の設定が壊れているモニターを視覚化します。このようなモニターからの通知は、目的地に届きません。

**Datadog の推奨**としては、適切な配信を確保するためにモニターの受信者を確認するか、モニターを削除することが挙げられます。

通知先が誤って設定されているモニターのリストを取得する方法は次のとおりです。

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("broken_at_handle")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_broken_handle.csv
```

削除するには、[モニターの削除コマンド](#3deletethemonitors) と同じプロセスを使用してください。`input_file` を `monitors_broken_handle.csv` に置き換えます。

###遅延設定の欠落
この問題は主に AWS メトリクスに基づくモニターに影響を与えます。Datadog は API を通じて AWS メトリクスを取得するため、データが利用可能になる前に通常は一定の遅延があります。これを考慮しないと、不完全または遅延したデータにより、モニターが誤検知を引き起こす可能性があります。

影響を受けたモニターは、評価遅延が設定されていないモニターにフラグが付けられている [モニター品質][4] ページで確認できます。

**Datadog の推奨**としては、AWS メトリクスを使用するすべてのモニターに遅延を追加することが挙げられます。データの取り込み遅延を見込む場合、一般的には 300 秒 (5 分) の遅延で十分です。

遅延が設定されていないモニターのリストを取得する方法は次のとおりです。

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("crawler_metric_missing_eval_delay")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_missing_delay.csv
```

詳細については、[AWS トラブルシューティングガイド][7] を参照してください。

###構成要素の欠落

複合条件モニターは、2 つ以上のモニター (構成要素と呼ばれる) の論理的な組み合わせに基づいてその状態を評価します。これらの構成要素モニターのいずれかが削除されたり、利用できなくなったりすると、複合条件モニターは無効または信頼できなくなります。

構成要素が欠落しているということは、通常、複合条件モニターが作成された後に元の入力モニターの少なくとも 1 つが削除されたことを意味します。これにより、複合条件モニターの評価が不完全になり、アラート動作において誤解を招く可能性があります。

**Datadog の推奨**としては、複合条件モニターを見直し、不足している構成要素を置き換えるか復元する、または複合条件モニターを削除することが挙げられます。欠落している構成要素を持つ複合モニターのリストは、[モニター品質][4] ページで確認できます。

プログラム的に欠落している構成要素を持つモニターのリストを取得する方法は次のとおりです。

```bash
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("composite_has_deleted_constituents")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_missing_constituent.csv
```

削除するには、[モニターの削除コマンド](#3deletethemonitors) と同じプロセスを使用してください。`input_file` を `monitors_missing_constituent.csv` に置き換えてください。

詳細については、[複合条件モニター][11] をご覧ください。

##モニターの乱雑化を防ぐためのベストプラクティス

| ベストプラクティス | 説明 | 実装 |
||||
| **冗長性を排除する** | 同じ信号に対して、スコープ (地域、チーム、または環境など) がわずかに異なるモニターを複数作成することを控えます。管理とスケーリングが容易な、**タグを使用した**グループ化モニター**を適用します。|
| **明確な所有権を設定する** | すべてのモニターには、アラートを適切な対応者にルーティングし、混乱を避けるための明確な所有者が必要です。| `team:` タグと通知ハンドル (`@slackxyz`、`@pagerdutytwilio`) を使用します。最も頻繁にモニターを作成するユーザーを監査するには、[モニターリスト][8] の **Creator** フィルターを使用します。|
| **ノイズの多いまたは非アクティブのモニターを見直す** | あまりにも頻繁にアラートを発するモニターや全くアラートを発しないモニターは、疲労を引き起こしたり、誤設定を示す可能性があります。| [**モニター品質ページ**][4] を使用して、ノイズの多いモニター、壊れているモニター、または古いモニターを特定し、整理します。|
| **モニターテンプレートを活用する** | 一般的なパターン (RED メトリクスや API レイテンシなど) には、テンプレートを使用し、重複を減らし標準化を図ります。| [再利用可能なテンプレート][5] を使用して、重複を減らし、チーム間での標準化を確保します。|
| **タグ付けポリシーを確立する** | 一貫性があり意味のあるタグを使用することで、モニターを簡単にフィルタリング、グループ化、ルーティングできます。| 一貫したタグ (`service:`、`env:`、`team:` など) を使用し、[タグ付けポリシー][6] を確立します。これにより、スコープ付きのダッシュボード、アラート、およびコンプライアンス追跡が可能になります。|
| **モニター品質ダッシュボード** | チーム、サービス、および環境全体のモニターの状態の傾向を視覚化し、ギャップを積極的に特定し、改善を追跡します。| [**モニター品質ダッシュボード**](#templatemonitorqualitydashboard) を設定して、時間の経過とともに改善を追跡し、大規模なクリーンアップ作業を優先します。|

##テンプレートモニター品質ダッシュボード

まずは、以下の JSON ダッシュボード定義を直接 Datadog アカウントにインポートします。

1. アプリで、[**ダッシュボード**][9] に移動し、[**New Dashboard**] (新規ダッシュボード) をクリックします。
2. ページ上部で、[**Configure**] (構成) をクリックし、[**Import dashboard JSON...**] (ダッシュボード JSON をインポート...) を選択します。
3. 以下の JSON をコピーして貼り付け、モニター品質ダッシュボードを構成します。

```json
{
  "title": "Monitor Quality OOTB Dashboard",
  "description": "",
  "widgets": [
    {
      "id": 8853380235542346,
      "definition": {
        "type": "note",
        "content": "This Monitor Quality dashboard provides a comprehensive view of monitor quality metrics, broken down by `team` and `service`. Its goal is to help you easily analyze and act on monitor quality data, enabling you to schedule reports, download insights as PDFs, and more.\n\n**Key Features:**\n- Team and Service Views: You can filter the dashboard either by team or by service, but not both simultaneously. If you filter by `team`, refer to the [Team Section](https://app.datadoghq.com/dashboard/u7b-4n7-gn5/monitor-quality-ootb-dashboard?fromUser=false&refresh_mode=paused&from_ts=1732107838741&to_ts=1732280638741&live=false&tile_focus=4548404374449802) for relevant insights. If you filter by `service`, explore the [Service Section](https://app.datadoghq.com/dashboard/u7b-4n7-gn5/monitor-quality-ootb-dashboard?fromUser=false&refresh_mode=paused&from_ts=1732107865224&to_ts=1732280665224&live=false&tile_focus=2841959907422822) for detailed information.\n- Monitor-Level Details: For a deeper dive into specific impacted monitors, navigate to the [Monitor Quality page](https://app.datadoghq.com/monitors/quality).\n- Seamless Navigation: Use the context links provided in the dashboard to jump directly to the [Monitor Quality page](https://app.datadoghq.com/monitors/quality), pre-filtered with the same criteria you've applied on the dashboard.\n\nThis dashboard is designed to give you both a high-level overview and actionable paths to improve your monitoring posture.",
        "background_color": "white",
        "font_size": "14",
        "text_align": "left",
        "vertical_align": "center",
        "show_tick": false,
        "tick_pos": "50%",
        "tick_edge": "left",
        "has_padding": true
      },
      "layout": { "x": 0, "y": 0, "width": 12, "height": 3 }
    },
    {
      "id": 4548404374449802,
      "definition": {
        "title": "General overview - by team",
        "background_color": "blue",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 2449119265341574,
            "definition": {
              "type": "note",
              "content": "This section is powered by the `datadog.monitor.suggested_monitor_health_by_team` metric, which is emitted daily.\n\nThe monitor counts reported in this metric exclude synthetic monitors.\n\nThese counts represent the total number of suggestions for monitor quality improvements, broken down by team.\n\nUse the `team` filter to view insights specific to your team.\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "white",
              "font_size": "14",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 0, "width": 5, "height": 4 }
          },
          {
            "id": 3001209940385798,
            "definition": {
              "title": "Distribution of Quality Improvements by Type",
              "title_size": "16",
              "title_align": "left",
              "time": { "hide_incomplete_cost_data": true },
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{$team,$service} by {suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "style": { "palette": "datadog16" },
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 500,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "type": "sunburst",
              "hide_total": false,
              "legend": { "type": "automatic" },
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$team}}"
                }
              ]
            },
            "layout": { "x": 5, "y": 0, "width": 7, "height": 4 }
          },
          {
            "id": 498569597362654,
            "definition": {
              "title": "Evolution of Quality Improvements by Type over Time",
              "title_size": "16",
              "title_align": "left",
              "show_legend": false,
              "legend_layout": "auto",
              "legend_columns": ["avg", "min", "max", "value", "sum"],
              "time": { "hide_incomplete_cost_data": true },
              "type": "timeseries",
              "requests": [
                {
                  "formulas": [{ "formula": "query1" }],
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{$team,$service} by {suggestion_type}"
                    }
                  ],
                  "response_format": "timeseries",
                  "style": {
                    "palette": "datadog16",
                    "order_by": "values",
                    "line_type": "solid",
                    "line_width": "normal"
                  },
                  "display_type": "line"
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$team}}"
                }
              ]
            },
            "layout": { "x": 0, "y": 4, "width": 12, "height": 4 }
          },
          {
            "id": 1376609088194674,
            "definition": {
              "title": "Top Teams Impacted",
              "title_size": "16",
              "title_align": "left",
              "time": { "hide_incomplete_cost_data": true },
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" }
              }
            },
            "layout": { "x": 0, "y": 8, "width": 12, "height": 4 }
          },
          {
            "id": 718136447073638,
            "definition": {
              "type": "note",
              "content": "Monitors with Missing Recipients per Team",
              "background_color": "vivid_blue",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 12, "width": 6, "height": 1 }
          },
          {
            "id": 2393792996475864,
            "definition": {
              "type": "note",
              "content": "Monitors with Broken Handles per Team",
              "background_color": "vivid_green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 12, "width": 6, "height": 1 }
          },
          {
            "id": 4443082314028290,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- no notification handle found in monitor body\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 13, "width": 6, "height": 2 }
          },
          {
            "id": 3954366540293996,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- notification handle is not valid\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 13, "width": 6, "height": 2 }
          },
          {
            "id": 2546970864549118,
            "definition": {
              "title": "Monitors with Missing Recipients per Team",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:missing_at_handle,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "blue"
              }
            },
            "layout": { "x": 0, "y": 15, "width": 6, "height": 5 }
          },
          {
            "id": 3744392131942638,
            "definition": {
              "title": "Monitors with Broken Handles per Team",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:broken_at_handle,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "green"
              }
            },
            "layout": { "x": 6, "y": 15, "width": 6, "height": 5 }
          },
          {
            "id": 2751217590574740,
            "definition": {
              "type": "note",
              "content": "Monitors Muted for Too Long",
              "background_color": "purple",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 20, "width": 6, "height": 1 }
          },
          {
            "id": 5158165900159898,
            "definition": {
              "type": "note",
              "content": "Monitors Generating a High Volume of Alerts",
              "background_color": "green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 20, "width": 6, "height": 1 }
          },
          {
            "id": 8032070484951580,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been muted for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 21, "width": 6, "height": 2 }
          },
          {
            "id": 4153429942317530,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor generates the top 5% of alerts over the past 10 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 21, "width": 6, "height": 2 }
          },
          {
            "id": 4158897740932848,
            "definition": {
              "title": "Monitors Muted for Too Long",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:muted_duration_over_sixty_days,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "semantic"
              }
            },
            "layout": { "x": 0, "y": 23, "width": 6, "height": 5 }
          },
          {
            "id": 5392245250417816,
            "definition": {
              "title": "Monitors Generating a High Volume of Alerts",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:noisy_monitor,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": { "display": { "type": "stacked" }, "palette": "grey" }
            },
            "layout": { "x": 6, "y": 23, "width": 6, "height": 5 }
          },
          {
            "id": 1271026446632020,
            "definition": {
              "type": "note",
              "content": "Monitors Stuck in Alert State",
              "background_color": "vivid_yellow",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 28, "width": 6, "height": 1 }
          },
          {
            "id": 6315895116466318,
            "definition": {
              "type": "note",
              "content": "Composite Monitors have Deleted Components",
              "background_color": "gray",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 28, "width": 6, "height": 1 }
          },
          {
            "id": 8251226565664096,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been alerting for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 29, "width": 6, "height": 2 }
          },
          {
            "id": 1329067816249636,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor is a composite one and has deleted components\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 29, "width": 6, "height": 2 }
          },
          {
            "id": 7052384595427880,
            "definition": {
              "title": "Monitors Stuck in Alert State",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:alerted_too_long,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "orange"
              }
            },
            "layout": { "x": 0, "y": 31, "width": 6, "height": 5 }
          },
          {
            "id": 2768363536962548,
            "definition": {
              "title": "Composite Monitors have Deleted Components",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:composite_has_deleted_constituents ,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "datadog16"
              }
            },
            "layout": { "x": 6, "y": 31, "width": 6, "height": 5 }
          }
        ]
      },
      "layout": { "x": 0, "y": 3, "width": 12, "height": 37 }
    },
    {
      "id": 2841959907422822,
      "definition": {
        "title": "General overview - by service",
        "background_color": "pink",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 3801590205295194,
            "definition": {
              "type": "note",
              "content": "This section is powered by the `datadog.monitor.suggested_monitor_health_by_service` metric, which is emitted daily.\n\nThe monitor counts reported in this metric exclude synthetic monitors.\n\nThese counts represent the total number of suggestions for monitor quality improvements, broken down by service.\n\nUse the `service` filter to view insights specific to your team.\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "white",
              "font_size": "14",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 0, "width": 5, "height": 4 }
          },
          {
            "id": 8418200284207718,
            "definition": {
              "title": "Distribution of Quality Improvements by Type",
              "title_size": "16",
              "title_align": "left",
              "time": { "hide_incomplete_cost_data": true },
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{$team,$service} by {suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "style": { "palette": "datadog16" },
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 500,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "type": "sunburst",
              "hide_total": false,
              "legend": { "type": "automatic" },
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$service}}"
                }
              ]
            },
            "layout": { "x": 5, "y": 0, "width": 7, "height": 4 }
          },
          {
            "id": 8281740697966220,
            "definition": {
              "title": "Evolution of Quality Improvements by Type over Time",
              "title_size": "16",
              "title_align": "left",
              "show_legend": false,
              "legend_layout": "auto",
              "legend_columns": ["avg", "min", "max", "value", "sum"],
              "time": { "hide_incomplete_cost_data": true },
              "type": "timeseries",
              "requests": [
                {
                  "formulas": [{ "formula": "query1" }],
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{$team, $service} by {suggestion_type}"
                    }
                  ],
                  "response_format": "timeseries",
                  "style": {
                    "palette": "datadog16",
                    "order_by": "values",
                    "line_type": "solid",
                    "line_width": "normal"
                  },
                  "display_type": "line"
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$service}}"
                }
              ]
            },
            "layout": { "x": 0, "y": 4, "width": 12, "height": 4 }
          },
          {
            "id": 5048429332292860,
            "definition": {
              "title": "Top services impacted",
              "title_size": "16",
              "title_align": "left",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" }
              }
            },
            "layout": { "x": 0, "y": 8, "width": 12, "height": 5 }
          },
          {
            "id": 2233801928907094,
            "definition": {
              "type": "note",
              "content": "Monitors with Missing Recipients per Service",
              "background_color": "vivid_blue",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 13, "width": 6, "height": 1 }
          },
          {
            "id": 7329031300309162,
            "definition": {
              "type": "note",
              "content": "Monitors with Broken Handles per Service",
              "background_color": "vivid_green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 13, "width": 6, "height": 1 }
          },
          {
            "id": 7627510169738418,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- no notification handle found in monitor body\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 14, "width": 6, "height": 2 }
          },
          {
            "id": 2826082028591748,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- notification handle is not valid\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 14, "width": 6, "height": 2 }
          },
          {
            "id": 5050954942402816,
            "definition": {
              "title": "Monitors with Missing Recipients per Service",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:missing_at_handle,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "blue"
              }
            },
            "layout": { "x": 0, "y": 16, "width": 6, "height": 5 }
          },
          {
            "id": 7809748805807956,
            "definition": {
              "title": "Monitors with Broken Handles per Service",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:broken_at_handle,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "green"
              }
            },
            "layout": { "x": 6, "y": 16, "width": 6, "height": 5 }
          },
          {
            "id": 8416588682594596,
            "definition": {
              "type": "note",
              "content": "Monitors Muted for Too Long",
              "background_color": "purple",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 21, "width": 6, "height": 1 }
          },
          {
            "id": 4951606729784970,
            "definition": {
              "type": "note",
              "content": "Monitors Generating a High Volume of Alerts",
              "background_color": "green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 21, "width": 6, "height": 1 }
          },
          {
            "id": 1778359756038190,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been muted for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 22, "width": 6, "height": 2 }
          },
          {
            "id": 8559060613933804,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor generates the top 5% of alerts over the past 10 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 22, "width": 6, "height": 2 }
          },
          {
            "id": 7041249940897320,
            "definition": {
              "title": "Monitors Muted for Too Long",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:muted_duration_over_sixty_days,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "semantic"
              }
            },
            "layout": { "x": 0, "y": 24, "width": 6, "height": 5 }
          },
          {
            "id": 7810615049061724,
            "definition": {
              "title": "Monitors Generating a High Volume of Alerts",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:noisy_monitor,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "grey"
              }
            },
            "layout": { "x": 6, "y": 24, "width": 6, "height": 5 }
          },
          {
            "id": 5108940190121326,
            "definition": {
              "type": "note",
              "content": "Monitors Stuck in Alert State",
              "background_color": "vivid_yellow",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 29, "width": 6, "height": 1 }
          },
          {
            "id": 4931941666409286,
            "definition": {
              "type": "note",
              "content": "Composite Monitors have Deleted Components",
              "background_color": "gray",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 29, "width": 6, "height": 1 }
          },
          {
            "id": 6520923360190496,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been alerting for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 30, "width": 6, "height": 2 }
          },
          {
            "id": 1364025765104008,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor is a composite one and has deleted components\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 30, "width": 6, "height": 2 }
          },
          {
            "id": 3670188762233230,
            "definition": {
              "title": "Monitors Stuck in Alert State",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:alerted_too_long,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "orange"
              }
            },
            "layout": { "x": 0, "y": 32, "width": 6, "height": 5 }
          },
          {
            "id": 9006201303765196,
            "definition": {
              "title": "Composite Monitors have Deleted Components",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:alerted_too_long,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "datadog16"
              }
            },
            "layout": { "x": 6, "y": 32, "width": 6, "height": 5 }
          }
        ]
      },
      "layout": {
        "x": 0,
        "y": 40,
        "width": 12,
        "height": 38,
        "is_column_break": true
      }
    }
  ],
  "template_variables": [
    {
      "name": "team",
      "prefix": "team",
      "available_values": [],
      "default": "*"
    },
    {
      "name": "service",
      "prefix": "service",
      "available_values": [],
      "default": "*"
    }
  ],
  "layout_type": "ordered",
  "notify_list": [],
  "reflow_type": "fixed"
}
```

##参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/quality
[2]: /ja/monitors/guide/alert_aggregation/#multialert
[3]: /ja/monitors/notify/variables/?tab=is_alert#conditionalvariables
[4]: https://app.datadoghq.com/monitors/quality?order=desc
[5]: https://app.datadoghq.com/monitors/templates?q=&amp;origination=installed&amp;p=1
[6]: https://app.datadoghq.com/monitors/settings/policies
[7]: /ja/integrations/guide/awsintegrationtroubleshooting/#metricsdelayed
[8]: https://app.datadoghq.com/monitors/manage
[9]: https://app.datadoghq.com/dashboard/lists
[10]: /ja/account_management/rbac/permissions/#monitors
[11]: /ja/monitors/types/composite/