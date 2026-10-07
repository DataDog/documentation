---
further_reading:
- link: https://www.datadoghq.com/blog/create-browser-tests-from-datadog-rum-session-replay/
  tag: ブログ
  text: Datadog RUM セッションリプレイから直接ブラウザテストを作成する
- link: synthetics/browser_tests
  tag: ドキュメント
  text: ブラウザーテストの設定
- link: real_user_monitoring/application_monitoring/browser
  tag: ドキュメント
  text: RUM ブラウザモニタリング
title: Session Replayから Synthetic ブラウザテストを生成する
---
## 概要 {#overview}

[Real User Monitoring (RUM)][1] は、個々のユーザーのリアルタイムのアクティビティとエクスペリエンスをエンドツーエンドで可視化します。[Synthetic ブラウザテスト][2]を使用すると、世界中からのシミュレートされたリクエストとアクションを使用して、システムやアプリケーションのパフォーマンスを観察できます。

{{< img src="synthetics/guide/rum_to_synthetics/generate_test_modal.png" alt="Session Replayモーダルを使用してブラウザテストを生成する" style="width:70%" >}}

RUM のセッションリプレイから Synthetic ブラウザテストを作成し、実際のユーザー行動に基づいてパフォーマンスを追跡することができます。

## Session Replayからテストを生成する{#generate-a-test-from-a-session-replay}

[RUM エクスプローラー][3]に移動し、ブラウザテストの作成元とする[Session Replay][4]が利用可能なセッションを選択します。イベントタイムラインの上にある {{< ui >}}Generate Synthetic Browser Test{{< /ui >}} をクリックします。

{{< img src="synthetics/guide/rum_to_synthetics/test_recording.png" alt="RUM エクスプローラーでのユーザーセッション" style="width:100%" >}}

これにより、ユーザーのクリックやページのロードなど、セッションリプレイ内でキャプチャされたイベントが、新しいブラウザテストの個々のステップに自動的に複製されます。

例えば、以下のスクリーンショットでは、生成されたブラウザテストは、ショッピングページへの移動や {{< ui >}}Add to cart{{< /ui >}} ボタンのクリックなど、ユーザーのセッションを複製しています。

{{< img src="synthetics/guide/rum_to_synthetics/example_test.png" alt="RUM データで自動的に入力されたブラウザテストレコーダー" style="width:100%" >}}

[他のブラウザテスト][6]と同様に、ニーズに合わせてテストやテストステップをさらにカスタマイズできます。例えば、追加の[テストステップ][5]（アサーションなど）の追加、テスト実行頻度の調整、通知のカスタマイズなどが可能です。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/
[2]: /ja/synthetics/browser_tests
[3]: https://app.datadoghq.com/rum/sessions
[4]: /ja/session_replay/
[5]: /ja/synthetics/browser_tests/test_steps
[6]: /ja/synthetics/browser_tests/?tab=requestoptions#test-configuration