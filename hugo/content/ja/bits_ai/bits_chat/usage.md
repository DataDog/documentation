---
description: Datadog Web アプリケーション、モバイルアプリ、または Slack から Bits Chat を開きます。
further_reading:
- link: /bits_ai/bits_chat/
  tag: ドキュメント
  text: Bits Chat
- link: /bits_ai/bits_code/slack_code_channels/
  tag: ドキュメント
  text: Bits Code を使用したコードチャンネル
title: Bits Chat を使用する
---
Bits Chat は、Datadog の公開ドキュメント、テレメトリ、および所有権に関するコンテキストを持っています。Bits Chat を使用して、システムやアクティブなインシデントについて質問してください。Bits Chat は、Datadog Web アプリケーション、モバイルアプリ、および Slack で利用できます。

## Web アプリケーション {#web-application}
Datadog Web アプリケーションで Bits Chat を開く方法にはいくつかあります。
- [Bits Chat][1] に直接移動します。
- ナビゲーションバーの右上で、[{{< ui >}}Ask Bits{{< /ui >}}] (Bits に尋ねる) をクリックします。
- Bits Chat と統合された Datadog 製品で、AI トリガーボタン (例: {{< ui >}}Ask Bits{{< /ui >}}) か、 {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px" alt="">}} (きらきら星アイコン) をクリックします。
- <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd> を押します。
- 左側のナビゲーションパネルで {{< ui >}}Bits AI{{< /ui >}} をクリックし、{{< ui >}}Bits Chat{{< /ui >}} を選択します。

## モバイルアプリケーション {#mobile-application}

[モバイルアプリ][2]から Bits にシステムやアクティブなインシデントについて質問してください。

1. ホーム画面で、[{{< ui >}}Bits Chat{{< /ui >}}] をタップします。
1. 音声またはテキストで Bits Chat とのチャットを開始します。
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="Bits AI を使用した Mobile App Home ダッシュボードのビュー" style="width:40%;" >}}

## Slack {#slack}
Bits に質問したり、インシデントを宣言したり、調査を開始したり、コードを変更したりできます。Bits Chat はメッセージスレッドで返信するため、チームは質問、コンテキスト、回答を 1 か所にまとめることができます。

1. [Bits Chat 設定][3]で Slack ワークスペースを選択します。
2. **Slack アカウントを接続**をクリックし、Datadog が両方の製品であなたを認識できるよう権限を付与してください。
3. (オプション) ワークスペースに**権限を付与**をクリックし、Bits Chat が関連する Slack の会話を読み取れるようにします。

セットアップが完了したら、Datadog App を使用して、ワークスペース内のチャンネルに自然言語で `@Datadog` にクエリを送信できます。

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Slack におけるサービス依存関係クエリの例の出力" style="width:60%;">}}

### Bits Code を使用したコードチャンネル {#code-channels-with-bits-code}

Bits Chat にコードの変更を依頼すると、そのタスク専用の[コードチャンネル][4]が作成されます。コードチャンネルでは、[Bits Code][5] があなたやチームと協力して変更作業を行います。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ask
[2]: /ja/mobile/#installing
[3]: https://app.datadoghq.com/ask/settings
[4]: /ja/bits_ai/bits_code/slack_code_channels/
[5]: /ja/bits_ai/bits_code/