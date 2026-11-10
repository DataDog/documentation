---
aliases:
- /ja/real_user_monitoring/frustration_signals
- /ja/real_user_monitoring/browser/frustration_signals/
description: RUM フラストレーションシグナル (レイジクリック、デッドクリック、エラークリックを含む) を使ってユーザーの摩擦ポイントを特定し、ユーザーエクスペリエンスを改善し、離脱率を減らします。
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: ブログ
  text: Datadog フラストレーションシグナルによるユーザーのペインポイントの検出
- link: /real_user_monitoring/platform/dashboards/usage#frustration-signals
  tag: ドキュメント
  text: フラストレーションシグナルダッシュボード
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: /session_replay/
  tag: ドキュメント
  text: Session Replay について
title: フラストレーションシグナル
---
## 概要{#overview}

フラストレーションシグナルは、ユーザーがフラストレーションを感じる瞬間を顕在化させることで、アプリケーションの最大の摩擦ポイントを特定するのに役立ちます。

RUM は 3 種類のフラストレーションシグナルを収集します。

レイジクリック
: 1 秒間のスライディングウィンドウ内で、ユーザーが同じ要素を 4 回以上クリックした場合。

デッドクリック
: ユーザーが、クリックしてもページ上で何も発生しない静的な要素をクリックした場合。

エラークリック
: ユーザーが要素をクリックした直後に、JavaScript のエラーが発生した場合。

フラストレーションシグナルを有効にすることで、Datadog はデフォルトで 3 つのシグナルタイプすべてを収集します。

## 要件 {#requirements}

まず、ブラウザ RUM SDK バージョン >= 4.14.0 が必要です。

フラストレーションシグナルの収集を開始するには、SDK の構成に以下を追加します。

{{% collapse-content title="最新バージョン" level="h3" expanded=true %}}

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
})
```

{{% /collapse-content %}}

{{% collapse-content title="v5.0.0 より前" level="h3" expanded=false %}}

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
  trackFrustrations: true
})
```

フラストレーションシグナルにはアクションが必要です。`trackFrustrations` を有効にすると、`trackUserInteractions` が自動的に有効になります。

{{% /collapse-content %}}

## 使用方法 {#usage}

フラストレーションシグナルは、[{{< ui >}}RUM Applications{{< /ui >}} ページ][1]上のユーザーのフラストレーションの原因を表す高レベルのデータポイントとして表示されます。[RUM エクスプローラー][2]にフラストレーションのカウントの一覧を表示するには、{{< ui >}}Options{{< /ui >}} ボタンをクリックし、`@session.frustration.count` の列を追加します。

### アプリケーションリスト {#application-list}

ブラウザセッションのリスト上でカーソルを合わせ、セッションをクリックして、ユーザーのフラストレーションを示すクリック動作を監視します。または、{{< ui >}}Frustrated Sessions{{< /ui >}} をクリックして、フラストレーションシグナルが発生したセッションにアクセスします。

### フラストレーションシグナルダッシュボードを確認する {#explore-the-frustration-signals-dashboard}

{{< ui >}}Frustration Signals{{< /ui >}} ダッシュボードは、アプリケーション全体のフラストレーションレベルの概要を提供し、最もフラストレーションの高いユーザーや、フラストレーションシグナルの数が最も多いページなどのトピックを表示します。

このダッシュボードを複製し、ニーズに合わせてカスタマイズできます。詳細については、「[フラストレーションシグナルダッシュボード][3]」を参照してください。

### フラストレーションシグナルを検索する {#search-for-frustration-signals}

[RUM エクスプローラー][4]で RUM が収集したすべてのデータを検索し、フラストレーションシグナルの傾向を把握したり、より大きな文脈でパターンを分析したり、[ダッシュボード][5]や[モニター][6]にエクスポートしたりすることができます。

検索クエリにファセットを入力すると、検索が開始されます。利用可能な検索フィールドは以下のとおりです。

フラストレーションタイプ
: フラストレーションシグナルを含むアクションを検索します。たとえば、レイジクリックが発生したアクションを確認したい場合は、検索クエリに `action.frustration.type:rage_click` を追加します。

フラストレーションカウント
: フラストレーションシグナルが発生したセッションとビューを検索します。たとえば、少なくとも 1 つのフラストレーションシグナルが発生したユーザーセッションやビューを検索する場合は、検索クエリに `session.frustration.count:>1` または `view.frustration.count:>1` を追加します。

#### セッション {#sessions}

{{< ui >}}Frustration Count{{< /ui >}}列に値があるセッションをクリックして、検出されたユーザーフラストレーションを調査します。シグナルのタイプ (`rage click`、`dead click`、または`error click`) と、セッション中に何が発生したかを示すイベントタイムラインを確認できます。

#### ビュー {#views}

ビューをクリックすると、`frustration detected` タグで特定のページでユーザーがフラストレーションを感じたかどうかを特定することができます。

{{< img src="real_user_monitoring/frustration_signals/frustration_signals_in_performance_tab.png" alt="パフォーマンスウォーターフォールグラフの [イベント] ドロップダウンメニューにあるフラストレーションシグナルアクション" style="width:90%;" >}}

パフォーマンスウォーターフォールは、フラストレーションシグナルを含むアクションを表示します。

{{< img src="real_user_monitoring/frustration_signals/actions_frustration_signal.png" alt="アクションとして検出されたフラストレーションシグナル" style="width:90%;" >}}

#### アクション {#actions}

選択したアクションにフラストレーションシグナルが含まれている場合、{{< ui >}}Actions{{< /ui >}} タブに `frustration detected` タグが表示されます。

1 つのアクションで複数のフラストレーションシグナルが発生した場合、アクションパネルの {{< ui >}}What Happened{{< /ui >}} の下に表示されます。

{{< img src="real_user_monitoring/frustration_signals/actions_panel_multiple_frustration_signals.png" alt="[発生した事象] の下にある、アクション内で検出された複数のフラストレーションシグナルタイプ" style="width:90%;" >}}

#### エラー {#errors}

{{< ui >}}Errors{{< /ui >}} タブのエラーをクリックすると、エラーの詳細が記載されたサイドパネルが開きます。フラストレーションシグナルが発生したかどうかを確認できます。

{{< img src="real_user_monitoring/frustration_signals/errors_tab.png" alt="[アクション] サイドパネルの [エラー] タブ" style="width:90%;" >}}

## Session Replay でフラストレーションシグナルを確認する {#watch-frustration-signals-in-session-replay}

[Session Replay][7] では、実際のユーザーアクティビティをビデオのように再現して観察できます。リプレイでは、ユーザーがフラストレーションの兆候を示した際にとったアクションをビデオで確認できます。

Session Replay のユーザージャーニーには、発生したイベントの詳細が時系列で記録されています。イベントにカーソルを合わせると、リプレイでその時点に移動できます (たとえば、デッドクリックが発生した時点など)。

{{< img src="real_user_monitoring/frustration_signals/session_replay_frustration_signals.png" alt="ブラウザの記録にフラストレーションシグナルが表示されます" style="width:90%;" >}}

 詳しくは、[Session Replay のドキュメント][8]をご覧ください。

## フラストレーションシグナルのアラートを作成する {#create-alerts-for-frustration-signals}

フラストレーションシグナルのモニターを作成し、アラートを設定することで、アプリケーションの重要なページでフラストレーションシグナルが発生した場合、自身やチームに通知することが可能です。

たとえば、特定のページでフラストレーションシグナルが発生した場合に通知するアラートを設定することができます。

{{< img src="real_user_monitoring/frustration_signals/rum_monitor_frustration_count.png" alt="フラストレーションシグナルの数に基づいてアラートする RUM モニターを作成します" style="width:90%;" >}}

詳しくは、[Real User Monitoring モニターのドキュメント][9]をご覧ください。

## トラブルシューティング {#troubleshooting}

### ユーザーがキーボードのキー (Delete など) を押したときには、レイジクリックは作成されません {#rage-clicks-are-not-being-created-when-a-user-presses-a-key-like-delete-on-the-keyboard}

フラストレーションシグナルは、キーボードのストロークではなく、マウスのクリックによって発生します。

### サイドパネルに、セッションのフラストレーションシグナルの数がイベントタイムラインと異なることが表示されない {#the-side-panel-does-not-show-that-a-session-has-a-different-number-of-frustration-signals-than-in-the-event-timeline}

セッションがライブの場合、情報を取得中であるため、バナーに表示される値がタイムラインのものと異なることがあります。

<div class="alert alert-danger">
フィードバックのご提供や機能のリクエストについては、<a href="/help/">Datadog サポート</a>までご連絡ください。
</div>

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /ja/real_user_monitoring/explorer/
[3]: /ja/real_user_monitoring/platform/dashboards/usage#frustration-signals
[4]: https://app.datadoghq.com/rum/explorer
[5]: /ja/dashboards/
[6]: /ja/monitors/
[7]: https://app.datadoghq.com/rum/replay/sessions/
[8]: /ja/session_replay/
[9]: /ja/monitors/types/real_user_monitoring/
[10]: mailto:success@datadoghq.com