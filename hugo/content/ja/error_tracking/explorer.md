---
description: Error Tracking エクスプローラーについて学びます。
further_reading:
- link: /monitors/types/error_tracking
  tag: ドキュメント
  text: Error Tracking モニターについて
title: Error Tracking エクスプローラー
---
## 概要{#overview}

{{< img src="error_tracking/error-tracking-overview-3.png" alt="Error Tracking エクスプローラーにおける課題の詳細" style="width:100%;" >}}

Error Tracking エクスプローラーでは、問題の表示、フィルタリング、調査を行えます。問題とは、同じバグに関連する類似のエラーのグループです。Datadog は、エラータイプ、エラーメッセージ、スタックトレースなどの属性を使用して各エラーのフィンガープリントを計算し、問題を作成します。同じフィンガープリントを持つエラーは同じ問題にグループ化されます。

## 問題を調べる {#explore-your-issues}

Error Tracking エクスプローラーに表示される各項目が問題であり、以下のようなエラーに関する概要情報が含まれています。

-   エラータイプやエラーメッセージ
-   基になるエラーが発生したファイルのパス
-   問題の存続期間に関する重要な情報:
    -   確認された最初と最後の時期
    -   経時的な発生グラフ
    -   指定期間内の発生回数

問題には以下のタグも付けられます。
- `New` 問題が初めて確認されたのが過去 2 日以内であり、状態が [{{< ui >}}FOR REVIEW{{< /ui >}}] (レビュー対象) である場合 (「[問題の状態][5]」を参照)。
- `Regression` 問題が [{{< ui >}}RESOLVED{{< /ui >}}] (解決済み) で、新しいバージョンで再度発生した場合 (「[回帰検出][6]」を参照)。
- `Crash` アプリケーションがクラッシュした場合
- [疑わしい原因][3]がある場合

### 時間範囲 {#time-range}

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Error Tracking の時間範囲" style="width:80%;" >}}

時間範囲は、エクスプローラーの右上にタイムラインとして表示されます。この機能を使用すると、選択した期間内にエラーが発生した問題を表示できます。時間範囲を変更するには、ドロップダウンから事前設定された範囲を選択します。

### 並べ替え {#sorting}

以下のオプションのいずれかを使用して、リスト内の問題を並べ替えます。
-   [{{< ui >}}Relevance{{< /ui >}}] (関連性) は、問題の複数の特徴を組み合わせて、コード関連の問題、最近発生した問題、急増している問題に優先順位を付けます。Error Tracking では、問題の経過時間、過去 1 日間の発生回数、過去 1 時間の顕著な増加、アプリケーションのクラッシュを引き起こしたかどうかを分析します。
-   [{{< ui >}}Count{{< /ui >}}] (回数) は、選択した時間範囲における合計発生回数に基づいて問題を並べ替えます。
-   [{{< ui >}}Newest{{< /ui >}}] (最初) は、最初に確認された日時で問題を並べ替えます。
-   [{{< ui >}}Impacted Sessions{{< /ui >}}] (影響を受けるセッション) は、影響を受ける [RUM セッション][4]の数で問題を並べ替えます。

### ファセット {#facets}

{{< img src="/error_tracking/facets-panel-2.png" alt="Error Tracking のファセット" style="width:100%;" >}}

Error Tracking は、問題の事前定義された属性のリストを自動的にインデックス化し、それを基にファセットを作成します。ファセットには、選択した期間における属性の個別のメンバーがすべて表示され、該当する問題の数などの基本的な分析情報が提供されます。ファセットを使用すると、特定の属性に基づいて問題を絞り込んだり、切り口を変えて分析することができます。

よく使用されるエラー属性には、以下のようなものがあります。
| 属性 | 説明 |
|-----------|-------------|
| `error.message`| エラーに関連付けられたメッセージ。|
| `error.type` | エラーのタイプまたはクラス。|
| `error.stack` | エラーに関連付けられたスタックトレース。|
| `error.handling` | エラーが処理済みかどうかを示します。APM エラーは、親スパンが処理の成功 (`HTTP 200`、`gRPC OK`) またはエラー処理の成功 (`HTTP 400`、`gRPC NOT_FOUND`) を報告した場合に `handled` と見なされます。RUM エラーがコード内で手動でキャプチャされていない場合は `unhandled` となります。|

編集アイコンをクリックすると、ビューでの表示と非表示を切り替えることができるファセットの一覧が表示されます。

{{< img src="/error_tracking/error-tracking-facets.png" alt="鉛筆アイコンをクリックして、利用可能な Error Tracking のファセットのビューでの表示と非表示を切り替えます。" style="width:100%;" >}}

### 問題レベルのフィルター {#issue-level-filters}

Error Tracking では、エラーイベントに加えて、問題レベルのフィルターを使用して表示される問題を絞り込むことができます。

{{< img src="error_tracking/issue-level-filters-2.png" alt="Error Tracking における問題レベルのフィルター" style="width:100%;" >}}

#### ソース {#sources}

Error Tracking では、複数の Datadog 製品 (RUM、Logs、APM) のエラーが 1 つのビューにまとめて表示されるため、スタック全体でエラーを監視し、トラブルシューティングすることができます。エクスプローラーに表示する問題を [{{< ui >}}All{{< /ui >}}] (すべて)、[{{< ui >}}Browser{{< /ui >}}] (ブラウザ)、[{{< ui >}}Mobile{{< /ui >}}] (モバイル)、または [{{< ui >}}Backend{{< /ui >}}] (バックエンド) の中から選択できます。

より細かく絞り込むには、特定のログソースまたは SDK で問題を絞り込むか、スコープをプログラミング言語に設定します。

#### 修正案あり {#fix-available}

AI が生成した修正案がある問題のみを表示して、問題をすばやく解決できるようにします。

#### チームフィルター {#teams-filters}

[Issue Team Ownership][2] を使用すると、Git `CODEOWNERS` とサービス所有者によって、自分のチームに関連する問題を迅速に特定できます。

#### 担当者 {#assigned-to}

問題を追跡して自分自身や最も知識が豊富なチームメンバーに割り当て、問題のリストを担当者で簡単に絞り込むことができます。

#### 疑わしい原因 {#suspected-cause}

[疑わしい原因][3]を使用すると、エラーをすばやく絞り込んで優先順位を付けられるため、チームが想定される根本原因により効果的に対処できます。

## 問題を調べる {#inspect-an-issue}

問題をクリックすると、問題パネルが開いて詳細が表示されます。

{{< img src="real_user_monitoring/error_tracking/issue_summary_2.png" alt="問題の概要が表示されている Error Tracking 問題パネルの上部" style="width:80%;" >}}

問題のトラブルシューティングに必要な概要情報は、パネルの上部に示されます。ここで、特定の問題のライフサイクル (最初と最後の発生日、総発生回数、一定期間の発生数の変化) を確認できます。

{{< img src="real_user_monitoring/error_tracking/error_sample_2.png" alt="エラーのサンプルが表示されている Error Tracking 問題パネルの下部" style="width:80%;" >}}

問題パネルに表示される情報は、エラーソースによって異なります。たとえば、APM エラーから作成された問題の場合は、リソースや操作名などのエラースパンタグが表示され、関連するトレースやそのトレースにリンクされているログに直接アクセスできます。

問題パネルの下部では、関連する問題のエラーのサンプルを参照できます。各エラーサンプルでは、エラーのスタックトレースや影響を受けたユーザーの特性などのトラブルシューティング情報を確認できます。

## 新規または影響の大きいエラーに関するアラートを受け取る {#get-alerted-on-new-or-impactful-errors}

新しい問題を発生してすぐに把握できれば、重大化する前に先手を打って特定し、修正できます。Error Tracking モニターでは、新しい問題や、システムまたはユーザーへの影響が大きい問題を追跡できます ([「Error Tracking モニター][7]」を参照)。

エクスプローラーから検索クエリを直接エクスポートして、関連するスコープで Error Tracking モニターを作成できます。

{{< img src="/error_tracking/create-monitor.mp4" alt="検索クエリを Error Tracking モニターにエクスポートする" video=true >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events
[2]: /ja/error_tracking/issue_team_ownership
[3]: /ja/error_tracking/suspected_causes
[4]: /ja/real_user_monitoring/explorer/search/#event-types
[5]: /ja/error_tracking/issue_states
[6]: /ja/error_tracking/regression_detection
[7]: /ja/monitors/types/error_tracking