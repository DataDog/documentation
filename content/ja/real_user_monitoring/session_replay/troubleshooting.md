---
description: セッションリプレイに関する問題のトラブルシューティング方法について説明します。
further_reading:
- link: https://github.com/DataDog/browser-sdk
  tag: GitHub
  text: browser-sdk ソースコード
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: セッションリプレイについて
kind: documentation
title: セッションリプレイのトラブルシューティング
---

## 概要

Datadog セッションリプレイで予期しない動作が発生した場合に問題は、このページを使うと解決に役立ちます。問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。各リリースには改善と修正が含まれているため、[RUM Browser SDK][2] は定期的に最新バージョンに更新してください。

## セッションリプレイレコーダー

### 一部の HTML 要素はリプレイ時に表示されない

セッションリプレイは、次の HTML 要素をサポートしていません: `iframe`、`video`、`audio`、`canvas`。セッションリプレイは、Web コンポーネントをサポートしていません。

### フォントまたは画像が正しくレンダリングされない

セッションリプレイはビデオではなく、DOM のスナップショットに基づいて再構築された実際の iframe です。したがって、リプレイはページのさまざまなアセット (フォントと画像) に依存します。

以下の理由により、リプレイ時にアセットを利用できない場合があります。

- リソースがもう存在しません。たとえば、以前のデプロイの一部でした。
- リソースにアクセスできません。たとえば、認証が必要な場合や、リソースに内部ネットワークからのみアクセスできる場合があります。
- CORS (通常はウェブフォント) が原因で、リソースがブラウザによってブロックされています。
   - リプレイは `session-replay-datadoghq.com` サンドボックスドメインでレンダリングされ、アセットリクエストはブラウザによるクロスオリジンセキュリティチェックの対象となります。指定されたアセットがドメインに対して許可されていない場合、ブラウザはリクエストをブロックします。
   - ウェブサイトが依存しているフォントや画像アセットに対して、[`Access-Control-Allow-Origin`][3] ヘッダーを通して `session-replay-datadoghq.com` を許可し、これらのリソースが再生時にアクセスできることを確認します。詳しくは、[Cross Origin Resource Sharing][4] をご覧ください。

### CSS ルールが適切に適用されていない / マウスホバーがリプレイされない

フォントや画像とは異なり、レコーダーは [CSSStyleSheet][5] インターフェイスを利用して、記録データの一部として適用されるさまざまな CSS ルールをバンドルしようとします。これが不可能な場合は、CSS ファイルへのリンクの記録にフォールバックします。

マウスホバーを適切にサポートするには、CSSStyleSheet インターフェイスから CSS ルールにアクセスできる必要があります。

スタイルシートがウェブページとは異なるドメインでホストされている場合、CSS ルールへのアクセスはブラウザによるクロスオリジンセキュリティチェックの対象となり、ブラウザは[クロスオリジン][6]属性を使用して CORS を利用してスタイルシートをロードするように指示される必要があります。

たとえば、アプリケーションが `example.com` ドメインにあり、リンク要素を介して `assets.example.com` の CSS ファイルに依存している場合、資格情報が必要な場合を除き、`crossorigin` 属性を `anonymous` に設定する必要があります。

```html
<link rel="stylesheet" crossorigin="anonymous"
      href="https://assets.example.com/style.css”>
```

さらに、`assets.example.com` の `example.com` ドメインを承認します。これにより、[`Access-Control-Allow-Origin`][3] ヘッダーを設定することにより、アセットファイルがリソースをロードできるようになります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[5]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
[6]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin