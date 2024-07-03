---
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Learn about the RUM Explorer
- link: /real_user_monitoring/
  tag: Documentation
  text: Learn how to visualize your RUM data
title: Understanding the RUM Event Hierarchy
---

## 概要

このガイドでは、RUM が収集するさまざまな[データの種類][1]を説明し、各イベントの種類の階層を説明します。

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-session-hierarchy-overview.png" alt="RUM のイベント階層図。複数のビューを含む 1 つのセッションを表示します。" style="width:50%;">}}

## セッション
すべての RUM データは、イベント階層の最上位にあるユーザーまたは Synthetic のセッションを参照しています。セッションは一意のユーザージャーニーであり、ユーザーがトリガーしたすべてのもの (たとえば、閲覧ページ、ビュー、クリック、スクロール、エラー) を包含します。セッションは、最大 4 時間の連続したアクティビティが可能で、[15 分間の非アクティブ][2]の後に失効することもあります。セッションはジャーニー全体を包含するので、そのユーザーに結びついたすべての[属性][3]は、そのセッションにも結びつきます。例えば、`action count` のようなデフォルトの属性でクエリを行い、[ユーザー属性][4]のようなカスタムなものを追加したいと思うかもしれません。

#### 検索の例: あるユーザーの全セッションを一覧表示する

特定のユーザーのすべてのセッションを一覧表示するには、イベントの種類のドロップダウンから **Sessions** を選択し、セッションステータスとユーザーの検索クエリを作成します。

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-sample-search-all-session-user-1.png" alt="ユーザー「Lee Davis」からの全セッションをリストアップするサンプル検索。" style="width:80%;">}}

各セッションは自動的に一意の `session.id` に関連付けられます。

## ビュー
セッション内では、ユーザーがアプリケーションのページ (ブラウザ RUM) または画面や画面セグメント (モバイル RUM) に移動するたびに、ビューイベントが作成されます。

各ビューは、URL 内のテキストや、特定のページのロード時間などのタイミングメトリクスなど、複数のビュー固有の属性やデータを自動的に収集します。特定のビューをクエリする場合、デバイス、オペレーティングシステム、ユーザー情報など、任意のデフォルトレベルの属性を追加することができます。ただし、イベント固有の属性は、ビュー固有である必要があります。イベントのみを表示するには、以下のイメージに示すように、イベントセレクタを調整することができます。

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-switch-views.png" alt="RUM ビュー。" style="width:80%;">}}

`session.id` と同様に、各ビューには自動的に一意な `view.id` が接続されます。

### アクション、エラー、リソース、ロングタスク

ビュー内では、SDK は、すべて同じ階層レベルに沿ったより詳細なイベントを作成します。しかし、各イベントは一意であり、独自の属性とプロパティを保持します。

### アクション

アクションは、ページ上でのユーザーのアクティビティを表します。ブラウザでは、すべてのクリックアクションが自動的に収集されます。モバイルでは、すべてのタップ、スワイプ、スクロールが収集されます。これらのデフォルトアクションの他に、フォームの完了やビジネストランザクションなどの[カスタムアクション][5]を送信することも可能です。

#### 検索の例: エラーにつながるアクションのトップリスト

この例では、ユーザーが "Add to cart” ボタンをクリックした結果、エラーが発生したすべてのアクションを検索するクエリを表示しています。

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-actions-all-add-to-cart-1.png" alt="エラーが発生したすべての「Add to Cart」アクションのサンプル検索。" style="width:80%;">}}

### エラー

RUM を使用して、ユーザーセッション中に発生した[フロントエンドエラー][6]を収集することができます。デフォルトでは、ブラウザ SDK は処理されない例外とコンソールエラーのエラーイベントを作成します。さらに、RUMの `addError` API を通じて、カスタムエラーを収集することもできます ([ブラウザ][7]と[モバイル][8]上)。モバイルアプリでは、エラーがセッションの終了 (クラッシュとも呼ばれる) につながったかどうかも確認することができます。

エラーは RUM とエラー追跡の両方で見ることができます。ソースエラーとカスタムエラーはエラー追跡で処理され、コンソールエラーは RUM にのみ表示されます。

#### 検索の例: アプリケーション内のページで発生したすべてのクラッシュのリスト

この例では、エラーイベントを検索して、特定のアプリケーションの "HomeViewController" ページで発生したすべてのクラッシュを表示するクエリを表示します。

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-sample-search-checkoutviewcontroller.png" alt="あるページで発生したすべてのクラッシュのサンプル検索。" style="width:80%;">}}

### リソース
リソースはビューから収集され、アプリケーションからネットワークプロバイダーへの外部リクエスト、例えば XHR、JS の読み込み、イメージ、フォントなどが含まれます。ビューから収集されるため、アプリケーションにロードされたすべてのリソースをクエリしたり、単一のビューで発生したリソースだけにスコープダウンすることができます。

#### 検索の例: イメージサイズでフィルターをかけた `/cart` ビューに読み込まれたすべてのイメージのリスト

この例では、イベントタイプのドロップダウンから **Resources** が選択され、カートビューで読み込まれた 1000 キロバイト以上のイメージをクエリしてリストアップしています。

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-resources.png" alt="カートビューに読み込まれたイメージのうち、1000 キロバイト以上のもののサンプル検索。" style="width:80%;">}}

### ロングタスク
ロングタスクとは、UI スレッドを一定時間ブロックするタスクのことです。例えばモバイルでは、300 ミリ秒以上画面がブロックされると、ロングタスクはフリーズしたフレームになることがあります。

#### 検索の例: 500 ms 以上続いた全てのフリーズしたフレームロングタスク

この例では、イベントタイプのドロップダウンから **Long tasks** が選択され、次に期間が指定されています。

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-long-tasks.png" alt="500 ミリ秒以上のフリーズした全フレームロングタスクのサンプル検索。" style="width:80%;">}}

## トラブルシューティング

### クエリを書き込むとデータが表示されない

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-no-data-appears-3.png" alt="クエリを書き込んでもデータが表示されない例。" style="width:80%;">}}

クエリを書いてもデータが表示されない場合は、イベントセレクタが検索バーにあるものと一致しているかどうかを確認してください。上記の例では、イベントセレクタは **views** 内を検索するように設定されていますが、検索バーには **action** 属性のみが表示されています。アクション関連のデータを表示するには、ビューセレクタをアクションに切り替えてください。それでもデータが表示されない場合は、タイムフレームセレクタを確認し、データが表示されるはずのタイムウィンドウにいることを確認します。

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-data-now-appears.png" alt="ビューと時間枠のセレクタを使用してクエリを更新する例。" style="width:80%;">}}

### 別のイベントタイプにネストされたイベントタイプをクエリする 

特定のアクションをクエリする場合、親イベントタイプを使用することはできますが、同等または下位レベルのものは使用できません。例えば、アクションはビューの下にネストされており、アクションとエラーは階層的な連鎖の中で同じレベルにあります。つまり、あるページで発生したすべてのアクションとエラーをクエリすることはできますが、 特定のエラータイプを持つすべてのアクションをクエリすることはできません。

#### 検索の例: `/` で発生したアクションの上位 10 件

この例では、ホームページを表す `/` で発生したアクションの上位 10 件を見るために、トップリストビューを使用してすべてのビュー名のアクションイベントタイプ内で検索しています。

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-top-ten-actions.png" alt="ホームページで発生したアクションの上位 10 件のサンプル検索。" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/data_collected
[2]: /ja/account_management/billing/rum/#when-does-a-session-expire
[3]: /ja/real_user_monitoring/browser/data_collected/#event-specific-metrics-and-attributes
[4]: /ja/real_user_monitoring/browser/data_collected/#user-attributes
[5]: /ja/real_user_monitoring/guide/send-rum-custom-actions/?tab=npm
[6]: /ja/real_user_monitoring/browser/collecting_browser_errors/?tab=npm
[7]: /ja/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[8]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios/?tab=swift#custom-errors