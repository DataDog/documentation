---
aliases:
- /ja/real_user_monitoring/session_replay/troubleshooting
description: Session Replay に関する問題をトラブルシュートする方法を学びましょう。
further_reading:
- link: https://github.com/DataDog/browser-sdk
  tag: ソースコード
  text: browser-sdk のソースコード
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: Session Replay について
- link: /integrations/content_security_policy_logs
  tag: ドキュメント
  text: Datadog を使用して CSP 違反を検出および集約する
title: Session Replay (ブラウザ) のトラブルシューティング
---

## 概要

Datadog Session Replay で予期しない動作が発生した場合は、このページを使用して問題の解決を試みてください。引き続き問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。また、[RUM Browser SDK][2] の最新バージョンへ定期的にアップデートしてください。各リリースでは改善や修正が含まれています。

## Session Replay Recorder

### リプレイ時に一部の HTML 要素が表示されない

Session Replay は以下をサポートしていません。

- 次の HTML 要素: `iframe`、`video`、`audio`、`canvas`
  - Session Replay で iframe を表示するには、別途 iframe コードにインスツルメンテーションを行う必要があります。サブドメイン間にまたがる iframe の場合は、`trackSessionAcrossSubdomains: true` を使用してください。正しくインスツルメンテーションされていれば、iframe と親ウィンドウは同じセッション内で別々のページとして表示されます。iframe を親ウィンドウ内に直接埋め込むリプレイはサポートされていません。
- [Web Animations API][7]

Session Replay では HTTPS 接続を使用する必要があります。安全でない接続を使用している場合、リソースはタイムアウトし、画像や一部のページ要素が表示されません。

### フォントや画像が正しくレンダリングされない

Session Replay は動画ではなく、DOM のスナップショットを基に再構築された実際の iframe です。そのため、フォントや画像など、ページのさまざまなアセットに依存します。

リプレイ時にアセットが利用できない可能性がある理由は以下のとおりです。

- リソースが存在しない (例: 過去のデプロイの一部で、現在は削除された)
- リソースにアクセスできない (例: 認証が必要、または内部ネットワークからのみアクセス可能)
- ブラウザが CORS のためリソースをブロックしている (主に Web フォントなど)
   - リプレイは `session-replay-datadoghq.com` サンドボックスドメイン上でレンダリングされ、アセットのリクエストはブラウザのオリジン間セキュリティチェックの対象となります。対象のアセットがドメインに対して許可されていない場合、ブラウザはリクエストをブロックします。
   - Web サイトが依存するフォントや画像アセットをリプレイで利用できるようにするため、[`Access-Control-Allow-Origin`][3] ヘッダーを使用して `session-replay-datadoghq.com` を許可してください。詳細については [Cross Origin Resource Sharing][4] を参照してください。

### CSS ルールが正しく適用されない/マウスホバーがリプレイされない

フォントや画像とは異なり、レコーダーは [CSSStyleSheet][5] インターフェイスを活用して、録画データの一部として適用されているさまざまな CSS ルールをバンドルしようとします。これが不可能な場合、CSS ファイルへのリンクを記録する方法にフォールバックします。

マウスホバーを正しく再現するには、CSS ルールが CSSStyleSheet インターフェイスを介してアクセス可能である必要があります。

もしスタイルシートがウェブページとは異なるドメインにホストされている場合、CSS ルールへのアクセスはブラウザのオリジン間セキュリティチェックの対象となります。ブラウザに CORS を利用してスタイルシートを読み込むよう指示する必要があり、そのために [crossorigin][6] 属性を使用します。

例えば、アプリケーションが `example.com` ドメイン上にあり、`assets.example.com` の CSS ファイルを link 要素で参照している場合、特に認証情報を必要としない限り、`crossorigin` 属性を `anonymous` に設定する必要があります。

```html
<link rel="stylesheet" crossorigin="anonymous"
      href="https://assets.example.com/style.css">
```

さらに、`assets.example.com` 側で `example.com` ドメインを許可してください。これは、[`Access-Control-Allow-Origin`][3] ヘッダーを設定することでアセットファイルがリソースを読み込めるようにします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[5]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
[6]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API