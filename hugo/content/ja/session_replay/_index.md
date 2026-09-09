---
aliases:
- /ja/real_user_monitoring/guide/session-replay-getting-started/
- /ja/real_user_monitoring/session_replay/
- /ja/product_analytics/session_replay/
- /ja/real_user_monitoring/session_replay/developer_tools
- /ja/real_user_monitoring/session_replay/browser/developer_tools
- /ja/product_analytics/session_replay/browser/developer_tools
description: Session Replay でユーザーの Web 閲覧またはモバイルアプリの体験をキャプチャし、視覚的に再生する方法について説明します。
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: エクスプローラーで RUM データを視覚化する
- link: /integrations/content_security_policy_logs
  tag: ドキュメント
  text: Datadog で CSP 違反の検出と集計を行う
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: ラーニングセンター
  text: Real User Monitoring (RUM) の紹介
- link: https://www.datadoghq.com/blog/session-replay-custom-heatmap-backgrounds/
  tag: ブログ
  text: Session Replay でカスタムヒートマップをキャプチャして分析する
- link: https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/
  tag: ブログ
  text: AI 要約とスマートチャプターで Session Replay をより迅速に把握する
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: ブログ
  text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示する
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: ブログ
  text: ファネル分析により、主要なユーザーフローを理解し、最適化する
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: ブログ
  text: Zendesk と Datadog Session Replay でユーザーが直面する問題を視覚的に再生する
- link: https://www.datadoghq.com/blog/session-replay-investigate-collaborate/
  tag: ブログ
  text: Datadog Session Replay でユーザーセッションを検索、分析、コラボレーションする
title: Session Replay
---
## 概要 {#overview}

Session Replay は、ユーザーのウェブ閲覧またはモバイルアプリの体験をキャプチャし、視覚的に再生することで、ユーザー体験のモニタリングを拡張します。Session Replay は、[RUM][1] と [Product Analytics][2] の両方で利用可能で、エラーの特定と再現、ユーザージャーニーの理解に役立ち、アプリケーションの使用パターンや設計上の落とし穴に関するインサイトが得られます。

## Browser Session Replay {#browser-session-replay}

Browser Session Replay は、ユーザーのウェブ閲覧体験をキャプチャし、視覚的に再生することで、ユーザー体験のモニタリングを拡張します。Session Replay を RUM パフォーマンスデータと組み合わせることで、エラーの特定、再現、解決に役立ち、Web アプリケーションの使用パターンや設計上の落とし穴を把握することができます。

RUM ブラウザ SDK は [オープンソース][3] であり、オープンソースの [rrweb][4] プロジェクトを活用したものです。

[ブラウザ向けセッションリプレイ][5] について詳しくはこちらをご覧ください。

## Mobile Session Replay {#mobile-session-replay}

Mobile Session Replay は、タップ、スワイプ、スクロールなどの各ユーザー操作を視覚的に再生することで、モバイルアプリケーションの可視性を拡大します。Android と iOS の両方のネイティブアプリで利用できます。アプリケーション上のユーザーインタラクションを視覚的に再生することで、クラッシュやエラーの再現が容易になり、UI を改善するためのユーザージャーニーの理解も容易になります。

[モバイル向け Session Replay][6] について詳しくはこちらをご覧ください。

## AI 駆動の要約とスマートチャプター {#ai-powered-summaries-and-smart-chapters}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">この機能は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>{{< /site-region >}}

要約とスマートチャプターは、セッションを視聴する前に、そのセッションで何が起こったのかのコンテキストを提供します。

**要約**には、ユーザーの意図、主なアクション、フリクションシグナル、および結果がまとめられています。要約では特定の瞬間がハイパーリンクされており、そのポイントに直接ジャンプして再生することができます。セッションリストのリプレイにカーソルを合わせると、要約のプレビューが表示されます。また、リプレイを直接開くこともできます。セッションが以前に要約されている場合、リプレイを開くとすぐに要約が表示されます。

{{< img src="real_user_monitoring/session_replay/session-replay-ai-summary.png" alt="ユーザーの意図、主なアクション、フリクションシグナル、ハイパーリンクされた瞬間が表示されたセッションリプレイプレーヤーの AI 駆動の要約" style="width:100%;" >}}

**スマートチャプター**は、リプレイタイムラインをユーザージャーニーのラベル付きステージに自動的にセグメント化します。たとえば、e コマースセッションであれば、「照明をブラウズ」、「寝具と椅子を購入」、「カートを確認およびチェックアウト」のようなチャプターが考えられます。チャプターはタイムラインにカーソルを合わせると表示されるほか、プレーヤーコントロールのドロップダウンにも表示され、各チャプターに直接ジャンプすることができます。

{{< img src="real_user_monitoring/session_replay/session-replay-smart-chapters.png" alt="ユーザージャーニーのラベル付きステージが表示されたセッションリプレイプレーヤーのスマートチャプタードロップダウン" style="width:100%;" >}}

AI による要約とスマートチャプターは、少なくとも 4 つのユーザーアクションがある 45 秒以上のセッションに対して生成されます。

## コメント {#comments}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">この機能は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。この機能が必要な場合は、<a href="/help/">Datadog サポート</a>にお問い合わせください。</div>{{< /site-region >}}

セッションリプレイのコメントにより、見つかったバグや使いやすさの問題などについて、チームがリプレイ内で直接コラボレーションできます。

コメントを使用すると、次のことが可能です。

- リプレイタイムラインの特定のタイムスタンプにコメントを追加する。コメントマーカーはタイムラインと {{< ui >}}Comments{{< /ui >}} タブに表示されます。
- コメントで @mention を使用してチームメイトやチームを指定する。タグ付けされたユーザーは、コメントされたタイムスタンプの時点で、リプレイを開くリンクを含むメール通知を受け取ります。
- 任意のコメントへのリンクをコピーして外部と共有する。このリンクでは、注釈が付けられた瞬間のコメントスレッドが開いた状態のリプレイが開きます。
- スレッド返信を使用してリプレイ内でコラボレーションし、必要に応じて自分のコメントを編集または削除する。

{{< img src="real_user_monitoring/session_replay/session-replay-comments.png" alt="セッションリプレイプレーヤーのタイムラインにタイムスタンプ付きのコメントがあり、そのスレッド返信が [Comments] タブに表示されています。" style="width:100%;" >}}

注意が必要なリプレイを見つけるには、{{< ui >}}All mentions to me{{< /ui >}} および {{< ui >}}Commented replays{{< /ui >}} のデフォルトのプレイリストを使用します。詳細については、[Session Replay プレイリスト][7] を参照してください。

## データ保持の延長 {#extend-data-retention}

デフォルトでは、セッションリプレイデータは 30 日間保持されます。すべての Session Replay のデフォルト保持期間を 30 日より長く設定するには、アカウントチームにお問い合わせください。

Session Replay データの保持期間を 15 か月に延長するには、個々の Session Replay で {{< ui >}}Extended Retention{{< /ui >}} を有効にします。これらのセッションは非アクティブでなければなりません (ユーザーは体験を完了している)。

Datadog では、後で Session Replay にアクセスするには URL を保存するか [プレイリスト][7] に追加することをお勧めします。

Datadog では、Session Replay が製品内の他の場所で使用されると、保持期間が自動的に 15 か月に延長されます。

- リプレイを [プレイリスト][7] に追加します。
- リプレイをヒートマップのスクリーンショットとして保存します。[リプレイ保持を超えたヒートマップの分析][12] を参照してください。

[Extended Retention] は Session Replay にのみ適用され、関連イベントは含まれません。15 か月は、セッションが収集されたときではなく、[Extended Retention] が有効にされたときから始まります。

[Extended Retention] はいつでも無効にできます。セッションリプレイがまだデフォルトの 30 日間の保持期間内である場合、リプレイは最初の 30 日間のウィンドウの終了時に失効します。30 日を過ぎたセッションリプレイで [Extended Retention] を無効にすると、リプレイは直ちに失効します。

{{< img src="real_user_monitoring/session_replay/extended-retention-1.png" alt="[Extended Retention] を有効にする" style="width:100%;" >}}

保持期間の延長でどのようなデータが保持されるかを理解するには、下図を参照してください。

{{< img src="real_user_monitoring/session_replay/replay-extended-retention-1.png" alt="保持期間の延長でどのデータが保持されるかを示す図" style="width:100%;" >}}

## 再生履歴 {#playback-history}

プレーヤーページに表示される [**watched**] (視聴) カウントをクリックすると、特定のセッションリプレイを誰が視聴したかを確認できます。この機能により、記録を共有したい相手がすでに視聴しているかどうかを確認することができます。

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="セッションの記録を誰が見たかを確認する" style="width:100%;" >}}

履歴には、プレーヤーページや [ノートブック][8]、サイドパネル内の埋め込みプレーヤーで行われた再生のみが含まれます。含まれる再生は、[監査証跡][9] イベントも生成します。サムネイルプレビューは履歴に含まれません。

自分の再生履歴を見るには、プレイリストの {{< ui >}}My Watch History{{< /ui >}}][10] をチェックしてください。

## プレイリスト {#playlists}

Session Replays のプレイリストを作成して、気づいたパターンで整理することができます。[Session Replays プレイリスト][7] について詳しくはこちらをご覧ください。

## 開発ツール {#dev-tools}

開発ツールは、再生中に重要な情報を表示するセッションリプレイの組み込みのデバッグパネルです。これを使用して、問題を特定し、リクエストを追跡し、パフォーマンスのボトルネックを理解できます。問題を自分で再現する必要はありません。開発ツールは [RUM][1] セッションで利用可能です。

[Dev Tools][11] について詳しくはこちらをご覧ください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/
[2]: /ja/product_analytics/
[3]: https://github.com/DataDog/browser-sdk
[4]: https://www.rrweb.io/
[5]: /ja/session_replay/browser/
[6]: /ja/session_replay/mobile/
[7]: /ja/session_replay/playlists
[8]: /ja/notebooks/
[9]: /ja/account_management/audit_trail/
[10]: /ja/rum/replay/playlists/my-watch-history
[11]: /ja/session_replay/dev_tools
[12]: /ja/session_replay/heatmaps/#analyzing-heatmaps-beyond-replay-retention