---
description: 単一の RUM ビューに対してエージェントによる調査を実施し、ユーザーエクスペリエンスの悪化の根本原因を明らかにします。
further_reading:
- link: /real_user_monitoring/ai_investigations/
  tag: ドキュメント
  text: AI 調査概要
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラー
- link: /real_user_monitoring/explorer/events/
  tag: ドキュメント
  text: イベントサイドパネルを表示
title: 単一ビュー AI 調査
---
## 概要 {#overview}

単一ビュー AI 調査は、単一の RUM ビューに対してエージェントによる根本原因分析を行います。パフォーマンスが悪いセッション、例えば読み込みが遅い、またはエラーをスローしたページや画面を見つけた場合、[**Investigate with AI**] (AI で調査する) をクリックしてください。Datadog の RUM エージェントは、エラー、時間のかかるネットワークリクエスト、メインスレッドのブロッキング、バックエンドトレース、CPU プロファイル、およびデバイスコンテキストといった、そのビューに関連付けられたすべてのデータを検査します。

RUM イベントを手動で調べて、API 呼び出しの遅さ、クライアントサイドの計算の重さ、または CDN の問題のどれが問題なのかを判断する代わりに、AI 調査による所見のリストが根本原因カテゴリ (アプリパフォーマンス、サーバーサイド、サードパーティ、環境) でグループ分けされて表示されます。そこから、チャットインターフェイスを通じてフォローアップするか、結果を[ノートブック][1]に保存してチームと共有できます。

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="RUM ビューの調査による所見をカテゴリ別に表示する単一ビュー AI 調査パネル。" style="width:100%;" >}}

## 調査を開始する{#launch-an-investigation}

1. RUM ビューのサイドパネルを開きます。
2. [**Investigate with AI**] ボタンをクリックします。

   **注意**: ビューが終了してからこのボタンが利用可能になるまで、最大 15 分かかる場合があります。

調査は実行され、結果が利用可能になると順にサイドパネルにストリーミングされるため、分析が完了する前に最初の所見を読み始めることができます。

## エージェントが調査する内容{#what-the-agent-investigates}

ビューを調査するために、Datadog の RUM エージェントは、そのビューのために Datadog が収集したデータを検査し、利用可能な場合は相関するテレメトリにアクセスします。

- **ビューイベント**とそのサブイベント: [リソース][2]、[長いタスク][3]、[エラー][4]、および[ユーザーアクション][5]。
- **ビュー全体の集約されたパフォーマンス信号**。これには、圧縮されていないリソース、過剰なスクリプト評価、帯域幅の非効率性などの自動検出された問題が含まれます。
- **SDK によってキャプチャされたデバイスおよび環境コンテキスト** (ブラウザまたはオペレーティングシステム、地理、コネクションタイプ、その他の [RUM 属性][6])。
- **APM トレース**。ビューのリソースがバックエンドトレースと相関している場合です。エージェントはトレースデータを使用して、サーバー側の遅延を特定のスパンやサービスに帰属させます。詳細については、[RUM と APM トレースの相関][7]を参照してください。
- **プロファイリングデータ**。アプリケーションで [RUM プロファイリング相関][8]が有効になっている場合です。エージェントは CPU プロファイルを使用して、アプリパフォーマンスに関する所見をコード内の特定の関数に帰属させます。

ビューに利用可能なデータが豊富であればあるほど、分析はより正確になります。RUM と APM を相関させ、プロファイリングを有効にすることで、エージェントはクライアント側のタイムラインを超えて調査することができます。

## 根本原因のソース{#sources-of-root-causes}

Datadog の RUM エージェントは、ビューのパフォーマンスが悪い根本原因を特定するために 4 つのソースを調査します。

| ソース            | 調査される内容                                                                                              |
|-------------------|---------------------------------------------------------------------------------------------------------------|
| アプリパフォーマンス   | メインスレッドの競合、コード実行、レンダリング遅延などのクライアント側の問題。              |
| サーバーサイド       | ビューに影響を与えたバックエンドのレイテンシーとサーバー側のエラー。                                               |
| サードパーティ       | アプリケーションによって読み込まれたサードパーティのスクリプトやライブラリからのパフォーマンスへの影響。                                |
| 環境       | ユーザーエクスペリエンスに影響を与えたネットワークおよびインフラストラクチャーの状態。                                   |

## 結果を読む{#read-the-results}

各所見は、タイトル、問題の説明、重大度レベル、および影響を受けるイベントへのリンクを含むカードとして表示されます。複数の所見が影響度に基づいてランク付けされて表示されるため、最も影響の大きい問題にまず集中できます。

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-results.png" alt="重大度、説明、および影響を受けたイベントへのリンクを含む、ランク付けされた所見を表示する結果パネル。" style="width:70%;" >}}

軽量のチャットインターフェイスを使用すると、分析に関するフォローアップが可能です。特定の所見についての詳細を尋ねたり、追加のコンテキストをリクエストしたり、関連する症状を探ったりできます。

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-chat.png" alt="ビューで見つかった問題についてフォローアップの質問をするようユーザーに促すチャットインターフェイス。" style="width:70%;" >}}

## アクションを実行する{#take-action}

調査が完了した後、パネルを離れることなく所見に基づいて行動できます。

- **Save to a Notebook** (ノートブックに保存): 完全なタイムラインと所見を[ノートブック][1]にエクスポートして、チームと共有します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/notebooks/
[2]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[3]: /ja/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-attributes
[4]: /ja/real_user_monitoring/error_tracking/
[5]: /ja/real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[6]: /ja/real_user_monitoring/explorer/search/
[7]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/
[8]: /ja/real_user_monitoring/correlate_with_other_telemetry/profiling/