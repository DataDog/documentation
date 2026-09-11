---
further_reading:
- link: /real_user_monitoring/session_replay/browser
  tag: ドキュメント
  text: セッションリプレイ
- link: /real_user_monitoring/session_replay/mobile/
  tag: ドキュメント
  text: モバイルセッションリプレイ
- link: https://www.datadoghq.com/knowledge-center/session-replay/
  tag: ラーニングセンター
  text: セッションリプレイ概要
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: ブログ
  text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示
- link: /real_user_monitoring/browser/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング
title: セッションリプレイの概要
---

{{< img src="/getting_started/session_replay/preview.mp4" alt="セッションリプレイのプレビュー" style="width:100%" video=true >}}

## 概要

セッションリプレイは、アプリケーションのユーザーセッションを再現するビジュアルツールで、顧客が実際にどのように製品を操作しているかをビデオのように詳細に表示します。セッションリプレイは、クリック数、直帰率、ページビューのメトリクスなどの従来の定量データを、ユーザーのアクションを分析するために必要な定性的なコンテキストで強化します。

このページでは、Datadog でセッションリプレイを始める方法を説明します。まだお持ちでない方は、[Datadog アカウントを作成][1]してください。

## セッションリプレイの構成

セッションリプレイはブラウザアプリとモバイルアプリで利用できます。このガイドの例では、ブラウザアプリでセッションリプレイを使用する例を示しています。

セッションリプレイのデータ収集を開始するには

1. RUM アプリケーションを作成して、[Datadog RUM ブラウザモニタリング][7]をセットアップします (リプレイレコーディングにアクセスするには、**Session Replay Enabled** を切り替えてください)。
2. **Client Token** を生成します。
3. RUM アプリケーションの作成時に生成された構成コードをアプリケーションソースに挿入して、RUM ブラウザ SDK を初期化します。

Datadog がデータの受信を開始するまで、アプリケーションは **RUM Applications** ページに `pending` として表示されます。

セッションリプレイデータを収集するための詳細な手順については、アプリケーションの [RUM セットアップドキュメント][2]に従ってください。モバイルアプリでのセッションリプレイのセットアップについては、[モバイルセッションリプレイ][3]を参照してください。

## 特定のセッションリプレイを探す

セッションリプレイデータを収集したら、[RUM エクスプローラー][4]に移動し、**Session Replay available** を選択すると、リプレイがアタッチされているすべてのセッションが表示されます。このデータは、**リスト**、**時系列**、またはその他の形式として視覚化できます。

{{< img src="/getting_started/session_replay/session-replay-available.png" alt="Session Replay available ボタンと視覚化オプション" style="width:100%" >}}

例えば、顧客からモバイルデバイス上でアプリケーションの問題を経験したと報告があったとします。**ファセット**を使ってセッションをフィルターすることができます。この場合、[ファセット][5]によるフィルターは、特定のユーザーやデバイスのタイプなど、特定の情報を検索するのに役立ちます。

{{< img src="/getting_started/session_replay/facets-views.png" alt="ファセットによるフィルター" style="width:100%" >}}

あなたは[保存ビュー][6]を作成し、アプリケーションが発生させた特定のエラーを含むすべてのセッションを表示しているかもしれません。このビューを表示することは、問題がどこにあるかわかっていて、その問題に遭遇したユーザーのセッションリプレイを見たいときに便利です。

{{< img src="/getting_started/session_replay/pinned-views.png" alt="ビューのドロップダウン" style="width:100%" >}}

## ユーザージャーニーの調査

セッションリプレイは左側のビデオのように表示され、標準的なビデオナビゲーションツールがあります。再生をクリックして最初からリプレイを開始し、特定のユーザーが行ったすべての操作を見ることができます。

**User Journey** はページの右側にあるイベントタイムラインです。リスト内のイベントをクリックすることで、ユーザージャーニーの任意の瞬間に移動することができます。また、**Session Breakdown** をクリックすることで、各ビューで発生したすべてのアクションとエラーを追跡することができます。

{{< img src="/getting_started/session_replay/user-journey.png" alt="ユーザージャーニーのパネル" style="width:100%" >}}

**Events** を選択すると、以下のイベントタイプでユーザージャーニーのリストをフィルターできます。

- **View**
- **Action**
- **Error**
- **Frustration Signal**

ユーザージャーニーで特定の時間またはビューにカーソルを合わせ、**Details** を選択すると、リプレイから離れることなくコアウェブバイタルやその他の関連情報を調べることができます。

{{< img src="/getting_started/session_replay/details-panel.png" alt="追加詳細のパネル">}}

Details ページでは、ウォーターフォールビューを展開してより詳細な情報を見ることができます。

{{< img src="/getting_started/session_replay/performance-waterfall.png" alt="展開されたパフォーマンスウォーターフォール">}}

## 開発ツールを使用したトラブルシューティング

セッションリプレイの[ブラウザ開発ツール][8]を開いて、現在のリプレイに関連するアプリケーションのパフォーマンス、コンソールログ、 エラー、アプリケーションやユーザーの属性を調べます。

{{< img src="/getting_started/session_replay/dev-tools.png" alt="開発ツールコンソール" style="width:100%" >}}

## 相関データへのピボット

セッションリプレイは、アプリケーションのメトリクス、トレース、ログとインテグレーションし、問題のデバッグに役立つコンテキストを提供します。APM とエラー追跡をセッションリプレイと一緒に使用することで、スタックのどこから発生したかに関係なく、ユーザーが直面する問題の根本原因を調査することができます。

### APM トレースによるリクエストパフォーマンスの調査

セッションリプレイに関連付けられた [APM トレース][9]は、フロントエンドとバックエンドの問題をエンドツーエンドで視覚化し、コードとインフラストラクチャーがユーザーエクスペリエンスにどのような影響を与えているかを表示します。フルスタックのトレースを持つことは、エラーがアプリケーションのフロントエンドで発生しているのかバックエンドで発生しているのか不明な場合に役立ちます。

トレース付きのリプレイを選択すると、ブラウザのリクエストと、特定のページでリクエストを満たすために呼び出されたすべてのバックエンドの依存関係やサービスを表示できます。

{{< img src="/getting_started/session_replay/traces-view.png" alt="トレースパネル" style="width:100%" >}}

**View Trace in APM** を選択すると、トレースに関連するエラーやログなどの詳細情報が表示されます。

{{< img src="/getting_started/session_replay/APM.png" alt="詳細情報がある APM ページ" style="width:100%" >}}

### エラー追跡によるエラーの調査

[エラー追跡][10]は、問題をデバッグして根本的な原因を突き止めるのに役立ちます。エラーが発生したときにアラートを受け取り、その原因となったコードの正確な行を確認し、エラーが発生したユーザーセッションを表示することができます。

**Errors** タブでエラーを選択すると、エラーの発生時刻とメッセージが表示されます。**Issue in error tracking** をクリックすると、セッションに関連する詳細と属性が表示されます。

{{< img src="/getting_started/session_replay/error-tracking.png" alt="エラー追跡パネル" style="width:100%" >}}

## 次のステップ

### セッションリプレイからの Synthetic ブラウザテストの作成

セッションリプレイでユーザーが行ったステップの正確なシーケンスから、[Synthetic ブラウザテストを作成する][11]ことができます。Datadog は、定義された自動スケジュールで Synthetic テストを実行してユーザーの行動をシミュレートし、失敗したテストを報告します。このとき、ユーザーが再び問題に遭遇する必要はありません。

Synthetic ブラウザテストでセッションリプレイをキャプチャするには、イベントタイムラインの上にある **Generate Synthetic Browser Test** をクリックします。

{{< img src="/getting_started/session_replay/browser-test.png" alt="ブラウザテスト作成ポップアップウィンドウ" style="width:100%" >}}

テスト結果の管理、実行、解釈の詳細については、[Synthetic ブラウザテスト][12]をお読みください。

### チームとの共有

ページ上部の **Share** ドロップダウンを選択すると、リプレイをチームで共有できます。特定の時間でリプレイを開始し、リプレイの特定の時間や表示にチームの注意を向けることができます。

{{< img src="/getting_started/session_replay/share.png" alt="リプレイ共有のポップアップ" style="width:100%" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/?_gl=1*2g30ya*_gcl_au*OTEwMTA2MjI5LjE2OTIxMDc1MzA.*_ga_KN80RDFSQK*MTY5NDAwODQ4OS40OC4xLjE2OTQwMDg2MzcuMC4wLjA.
[2]: /ja/real_user_monitoring/#get-started
[3]: /ja/real_user_monitoring/session_replay/mobile/
[4]: https://app.datadoghq.com/rum/sessions
[5]: /ja/real_user_monitoring/explorer/search/#facets
[6]: /ja/real_user_monitoring/explorer/saved_views/
[7]: /ja/real_user_monitoring/browser/setup/
[8]: /ja/real_user_monitoring/session_replay/browser/developer_tools
[9]: /ja/real_user_monitoring/connect_rum_and_traces
[10]: /ja/real_user_monitoring/error_tracking/
[11]: /ja/synthetics/guide/rum-to-synthetics/
[12]: /ja/synthetics/browser_tests/