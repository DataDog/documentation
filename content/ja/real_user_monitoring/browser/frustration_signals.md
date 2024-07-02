---
aliases:
- /ja/real_user_monitoring/frustration_signals
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: ブログ
  text: Datadog フラストレーションシグナルによるユーザーのペインポイントの検出
- link: /real_user_monitoring/dashboards/usage#frustration-signals
  tag: ドキュメント
  text: フラストレーションシグナルダッシュボード
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: セッションリプレイについて
title: コミュニティ
---

## 概要

フラストレーションシグナルは、ユーザーがフラストレーションを感じる瞬間を顕在化させることで、アプリケーションの最大の摩擦ポイントを特定するのに役立ちます。

RUM は 3 種類のフラストレーションシグナルを収集します。

レイジクリック
: 1 秒間のスライディングウィンドウの中で、ユーザーが 3 回以上要素をクリックした場合。

デッドクリック
: ユーザーが静的な要素をクリックしても、そのページでは何のアクションも起こらないこと。

エラークリック
: JavaScript のエラーが発生する直前に、ユーザーがある要素をクリックした場合。

## 要件

まず、ブラウザ RUM SDK バージョン >=  4.14.0 が必要です。

フラストレーションシグナルの収集を開始するには、SDK の構成に以下を追加します。

<details open>
  <summary>最新バージョン</summary>
```
window.DD_RUM.init({
  trackUserInteractions: true,
})
```
</details>
<details>
  <summary><code>v5.0.0</code> より前</summary>
```
window.DD_RUM.init({
  trackUserInteractions: true,
  trackFrustrations: true
})
```

フラストレーションシグナルにはアクションが必要です。`trackFrustrations` を有効にすると、自動的に `trackUserInteractions` が有効になります。
</details>

## API

フラストレーションシグナルは、[**RUM Applications** ページ][1]にユーザーのフラストレーションの原因を表す高レベルのデータポイントとして表示されます。[RUM エクスプローラー][2]にフラストレーションカウントのリストを表示するには、**Options** ボタンをクリックして `@session.frustration.count` の列を追加してください。

### アプリケーションリスト

ブラウザセッションのリストにカーソルを合わせ、セッションをクリックすると、ユーザーのフラストレーションクリックの挙動を観測することができます。または、**Frustrated Sessions** をクリックすると、フラストレーションシグナルのあるセッションにアクセスできます。

### フラストレーションシグナルダッシュボードを見る

**Frustration Signals** ダッシュボードは、アプリケーション全体のフラストレーションレベルの概要を提供し、最もフラストレーションの高いユーザーや、フラストレーションシグナルの数が最も多いページなどのトピックを表示します。

このダッシュボードをクローンして、自分のニーズに合わせてカスタマイズすることができます。詳しくは、[フラストレーションシグナルダッシュボード][3]をご覧ください。

### フラストレーションシグナルを検索する

[RUM エクスプローラー][4]で RUM が収集したすべてのデータを検索し、フラストレーションシグナルの傾向を把握したり、より大きな文脈でパターンを分析したり、[ダッシュボード][5]や[モニター][6]にエクスポートしたりすることができます。

検索クエリにファセットを入力すると、検索が開始されます。利用可能な検索フィールドは以下の通りです。

Frustration Type
: フラストレーションシグナルを持つアクションを検索します。例えば、レイジクリックがあったアクションを見たい場合、検索クエリに `action.frustration.type:rage_click` を追加します。

Frustration Count
: 何らかのフラストレーションシグナルが発生したセッションとビューを検索します。例えば、少なくとも 1 つのフラストレーションシグナルが発生したユーザーセッションまたはビューを検索したい場合、検索クエリに `session.frustration.count:>1` または `view.frustration.count:>1` を追加します。

#### セッション

**Frustration Count** 列の値があるセッションをクリックすると、検出されたユーザーのフラストレーションを調べることができます。シグナルの種類 (`rage click`、`dead click`、`error click`) と、セッション中に発生したことを示すイベントタイムラインを見ることができます。

#### ビュー

ビューをクリックすると、`frustration detected` タグで特定のページでユーザーがフラストレーションを感じたかどうかを特定することができます。

{{< img src="real_user_monitoring/frustration_signals/frustration_signals_in_performance_tab.png" alt="パフォーマンスウォーターフォールグラフのイベントドロップダウンメニューのフラストレーションシグナルアクション" style="width:90%;" >}}

パフォーマンスウォーターフォールは、フラストレーションシグナルを含むアクションを表示します。

{{< img src="real_user_monitoring/frustration_signals/actions_frustration_signal.png" alt="アクションとして検出されたフラストレーションシグナル" style="width:90%;" >}}

#### アクション

選択したアクションにフラストレーションシグナルが含まれている場合、**Actions** タブに `frustration detected` タグが表示されます。

1 つのアクションで複数のフラストレーションシグナルが発生した場合、アクションパネルの **What Happened** の下に表示されます。

{{< img src="real_user_monitoring/frustration_signals/actions_panel_multiple_frustration_signals.png" alt="What Happened のアクションで検出された複数のフラストレーションシグナルの種類" style="width:90%;" >}}

#### CoScreen

**Errors** タブでエラーをクリックすると、エラーの詳細が表示されたサイドパネルが開きます。フラストレーションシグナルが発生したかどうかを確認することができます。

{{< img src="real_user_monitoring/frustration_signals/errors_tab.png" alt="Actions サイドパネルの Errors タブ" style="width:90%;" >}}

## フラストレーションシグナルをセッションリプレイで見る

[セッションリプレイ][7]では、実際のユーザーの行動をビデオのように再現して観測することができます。リプレイは、ユーザーがフラストレーションの兆候を示したときに取るアクションの証拠をビデオで提供します。

セッションリプレイのユーザージャーニーには、発生したイベントの詳細が時系列で表示されます。イベントにカーソルを合わせると、リプレイ内のその時点に移動します (例えば、デッドクリックが発生した時点など)。

{{< img src="real_user_monitoring/frustration_signals/session_replay_frustration_signals.png" alt="フラストレーションシグナルがブラウザレコーディングに表示されます" style="width:90%;" >}}

詳しくは、[セッションリプレイのドキュメント][8]をご覧ください。

## フラストレーションシグナルのアラート作成

フラストレーションシグナルのモニターを作成し、アラートを設定することで、アプリケーションの重要なページでフラストレーションシグナルが発生した場合、自身や チームに通知することが可能です。

例えば、特定のページでフラストレーションシグナルが発生した場合に通知するアラートを設定することができます。

{{< img src="real_user_monitoring/frustration_signals/rum_monitor_frustration_count.png" alt="フラストレーションシグナルの数でアラートを出す RUM モニターを作る" style="width:90%;" >}}

詳しくは、[リアルユーザーモニタリングモニターのドキュメント][9]をご覧ください。

## ヘルプ

### ユーザーがキーボードのキー (Delete など) を押したときに、なぜレイジクリックが作成されないのでしょうか？

フラストレーションシグナルは、キーボードのストロークではなく、マウスのクリックによって発生します。

### サイドパネルに、セッションのフラストレーションシグナルの数がイベントタイムラインと異なることが表示されるのはなぜですか？

セッションがライブの場合、情報を取得しているため、バナーにタイムラインと異なる数値が反映されることがあります。

### 追跡するシグナルを選択することはできますか？

フラストレーションシグナルを有効にすることで、Datadog はデフォルトで 3 つのシグナルタイプすべてを収集します。詳細については、[カスタマーサクセスマネージャー][10]にお問い合わせください。

<div class="alert alert-warning">
フィードバックの提供や機能リクエストの提出は、<a href="/help/">Datadog サポート</a>にご連絡ください。
</div>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /ja/real_user_monitoring/explorer/
[3]: /ja/real_user_monitoring/dashboards/usage#frustration-signals
[4]: https://app.datadoghq.com/rum/explorer
[5]: /ja/dashboards/
[6]: /ja/monitors/
[7]: https://app.datadoghq.com/rum/replay/sessions/
[8]: /ja/real_user_monitoring/session_replay/
[9]: /ja/monitors/types/real_user_monitoring/
[10]: mailto:success@datadoghq.com