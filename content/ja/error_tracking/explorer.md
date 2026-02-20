---
description: Error Tracking Explorer の概要を確認します。
further_reading:
- link: /monitors/types/error_tracking
  tag: ドキュメント
  text: Error Tracking Monitor について
title: Error Tracking Explorer
---

## 概要

{{< img src="error_tracking/error-tracking-overview-2.png" alt="Error Tracking Explorer における Issue の詳細" style="width:100%;" >}}

Error Tracking Explorer では、Issue の表示、フィルタリング、調査が行えます。Issue とは、同じバグに紐づく類似エラーをまとめたグループです。Datadog は、エラー タイプ、エラー メッセージ、スタック トレースなどの属性をもとに各エラーのフィンガープリントを計算して Issue を作成します。フィンガープリントが同じエラーは、同一の Issue としてグループ化されます。

## Issue を探索する

Error Tracking Explorer に表示される各項目は Issue です。Issue には、次のようなエラーの概要情報が含まれます:

-   エラー タイプとエラー メッセージ
-   根本となるエラーが発生したファイルへのパス
-   Issue のライフサイクルに関する重要情報:
    -   最初に検出された日時と最後に検出された日時
    -   発生回数の推移グラフ
    -   選択した期間における発生回数

また、Issue には次のタグが付きます:
- `New`: Issue が 2 日未満前に初めて検出され、状態が **FOR REVIEW** の場合 (詳細: [Issue の状態][5])
- `Regression`: Issue が **RESOLVED** だったものの、新しいバージョンで再発した場合 (詳細: [Regression Detection][6])
- `Crash`: アプリケーション クラッシュが発生した場合
- [Suspected Cause][3] が付与されている場合

### 時間範囲

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Error Tracking の時間範囲" style="width:80%;" >}}

Explorer の右上には、タイム ラインとして時間範囲が表示されます。この機能により、選択した期間内にエラー発生がある Issue のみを表示できます。時間範囲は、ドロップダウンからプリセットの範囲を選択して変更します。

### 並び替え

リスト内の Issue は、次のいずれかの方法で並び替えできます:
-   **Relevance**: 複数の特性を組み合わせて、コードに関係するもの、最近のもの、急増しているものを優先表示します。Error Tracking は、Issue の経過時間、直近 1 日の発生回数、直近 1 時間の目立った増加、アプリケーション クラッシュを引き起こしたかどうかを分析します。
-   **Count**: 選択した時間範囲における総発生回数で並び替えます。
-   **Newest**: 初めて検出された日時が新しい順に並び替えます。
-   **Impacted Sessions**: 影響を受けた [RUM セッション][4] 数で並び替えます。

### ファセット

{{< img src="/error_tracking/facets-panel.png" alt="Error Tracking のファセット" style="width:100%;" >}}

Error Tracking は、Issue からあらかじめ定義された属性を自動でインデックス化し、ファセットを作成します。ファセットでは、選択した期間における属性のユニークな値を一覧表示し、該当する Issue 数などの簡易的な分析情報も確認できます。Facet を使うと、指定した属性で Issue を絞り込んだり、切り口を変えて分析したりできます。

よく使われるエラー属性の例:
| 属性 | 説明 |
|-----------|-------------|
| `error.message` | エラーに関連付けられたメッセージ。 |
| `error.type` | エラーのタイプまたはクラス。 |
| `error.stack` | エラーに関連付けられたスタック トレース。 |
| `error.handling` | エラーが処理済みかどうかを示します。APM エラーは、親スパンが成功した処理 (`HTTP 200`, `gRPC OK`) もしくは成功したエラー処理 (`HTTP 400`, `gRPC NOT_FOUND`) を報告した場合に `handled` と見なされます。RUM エラーは、コード内で手動キャプチャされていない場合に `unhandled` となります。 |

Edit アイコンをクリックすると、表示 / 非表示を切り替えられるファセットの一覧を確認できます。

{{< img src="/error_tracking/error-tracking-facets.png" alt="鉛筆アイコンをクリックして、表示中の Error Tracking ファセットを表示 / 非表示に切り替えます。" style="width:100%;" >}}

### Issue レベル フィルター

エラー イベントに加えて、Error Tracking には表示中の Issue 一覧をより細かく絞り込むための Issue レベル フィルターが用意されています。

{{< img src="error_tracking/issue-level-filters.png" alt="Error Tracking の Issue レベル フィルター" style="width:100%;" >}}

#### ソース

Error Tracking は、複数の Datadog 製品 (RUM, Logs, APM) のエラーを 1 つのビューに統合し、スタック全体を横断してエラーの監視とトラブル シューティングができるようにします。Explorer では、**All**、**Browser**、**Mobile**、**Backend** の Issue を表示対象として選べます。

さらに粒度を上げたい場合は、特定のログ ソースや SDK で絞り込んだり、プログラミング言語単位でスコープを限定したりできます。

#### 修正案あり

AI 生成の修正案が用意されている Issue のみを表示し、問題を素早く解消できるようにします。

#### チーム フィルター

[Issue Team Ownership][2] を使うと、Git `CODEOWNERS` とサービス オーナー情報に基づいて、チームに関連する Issue をすばやく特定できます。

#### 担当者

Issue を自分、または最も詳しいメンバーに割り当てて追跡できます。担当者で絞り込めるため、Issue の一覧を簡単に整理できます。

#### 推定原因

[推定原因][3] により、エラーの絞り込みと優先順位付けを素早く行えます。想定される根本原因により焦点を当てやすくなり、チームがより効率的に対処できます。

## Issue を確認する

任意の Issue をクリックすると Issue パネルが開き、より詳しい情報を確認できます。

{{< img src="real_user_monitoring/error_tracking/issue_summary.png" alt="Issue の要約が表示される Error Tracking Issue パネル上部" style="width:80%;" >}}

トラブル シューティングに必要な概要情報は、パネル上部にまとまっています。ここから、ライフサイクル (初回 / 最終の発生日時、総発生回数、時間経過に伴う発生回数) を把握できます。

{{< img src="real_user_monitoring/error_tracking/error_sample.png" alt="エラー サンプルが表示される Error Tracking Issue パネル下部" style="width:80%;" >}}

Issue パネルに表示される内容は、エラーのソースによって異なります。たとえば APM エラーから作成された Issue では、リソース名やオペレーション名などのエラー スパン タグが表示され、関連 Trace や紐づく Logs へ直接アクセスできます。

パネル下部では、該当 Issue に紐づくエラー サンプルを切り替えて確認できます。各エラー サンプルでは、エラーのスタック トレースや影響を受けたユーザーの特性など、原因調査に役立つ情報を参照できます。

## 新規 / 影響の大きいエラーのアラートを受け取る

新しい Issue を発生直後に把握できれば、重大化する前に先回りして特定と修正が行えます。Error Tracking monitor では、新規 Issue や、システムまたはユーザーへの影響が大きい Issue を追跡できます (詳細: [Error Tracking Monitors][7])。

Explorer での検索クエリは、そのままエクスポートして、同じスコープで Error Tracking Monitor を作成できます:

{{< img src="/error_tracking/create-monitor.mp4" alt="検索クエリをエクスポートして Error Tracking Monitor を作成する" video=true >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events
[2]: /ja/error_tracking/issue_team_ownership
[3]: /ja/error_tracking/suspected_causes
[4]: /ja/real_user_monitoring/explorer/search/#event-types
[5]: /ja/error_tracking/issue_states
[6]: /ja/error_tracking/regression_detection
[7]: /ja/monitors/types/error_tracking