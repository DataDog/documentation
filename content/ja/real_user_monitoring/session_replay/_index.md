---
aliases:
- /ja/real_user_monitoring/guide/session-replay-getting-started
description: セッションリプレイの設定方法について説明します
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM データを Explorer で確認
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: ブログ
  text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: ブログ
  text: ファネル分析により、主要なユーザーフローを理解し、最適化する
kind: documentation
title: Session Replay
---

## 概要

セッションリプレイは、ユーザーのウェブ閲覧体験をキャプチャし、視覚的に再生することで、ユーザー体験のモニタリングを拡張します。

セッションリプレイを RUM パフォーマンスデータと組み合わせることで、エラーの特定、再現、解決に役立ち、ウェブアプリケーションの使用パターンや設計上の落とし穴を把握することができます。

## セッションリプレイデータを収集する

### 初期設定

セッションリプレイを使用するには、[Datadog RUM ブラウザモニタリング][1]を設定します。次のセクションを設定します: アプリケーションの作成、クライアントトークンの生成、RUM SDK の設定。

セッションリプレイは、RUM ブラウザ SDK の専用ビルドを通じて利用できます。セッションリプレイを有効にするには、選択したインストール方法に応じて、npm パッケージ名または CDN URL を変更します。

#### npm

`@datadog/browser-rum package` を [`@datadog/browser-rum`][2] のバージョン >3.6.0 に置き換えます。記録を開始するには、`datadogRum.startSessionReplayRecording()` を呼び出します。

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    //  service: 'my-web-application',
    //  env: 'production',
    //  version: '1.0.0',
    sampleRate: 100,
    replaySampleRate: 100,
    trackInteractions: true
});

datadogRum.startSessionReplayRecording();
```

#### CDN

ブラウザ SDK URL `https://www.datadoghq-browser-agent.com/datadog-rum.js` を `https://www.datadoghq-browser-agent.com/datadog-rum-v4.js` に置き換えます。`DD_RUM.init()` が呼び出されると、`DD_RUM.startSessionReplayRecording()` も呼び出されるまで、セッションリプレイの記録は開始されません。

セッションリプレイレコーダーは、IE11 を除き、RUM ブラウザ SDK でサポートされているすべてのブラウザをサポートしています。詳しくは、[ブラウザサポートテーブル][3]を参照してください。

### コンフィギュレーション

通常の [RUM 初期化パラメータ][4]はすべてサポートされています。

`init()` を呼び出しても、セッションリプレイは自動的に記録を開始しません。記録を開始するには、`startSessionReplayRecording()` を呼び出します。これは、条件付きで記録を開始する場合に役立ちます。たとえば、認証されたユーザーセッションのみを記録する場合などです。

```javascript
if (user.isAuthenticated) {
    DD_RUM.startSessionReplayRecording();
}
```

セッションリプレイの記録は、`stopSessionReplayRecording()` を呼び出すことで停止できます。

## トラブルシューティング

### 一部の HTML 要素はリプレイ時に表示されない

セッションリプレイは現在、次の HTML 要素をサポートしていません: `iframe`、`video`、`audio`、`canvas`、ウェブコンポーネント。

### フォントまたは画像が正しくレンダリングされない

セッションリプレイはビデオではなく、DOM のスナップショットに基づいて再構築された実際の iframe です。したがって、リプレイはページのさまざまなアセット (フォントと画像) に依存します。

いくつかの理由により、リプレイ時にアセットが利用できない理由が説明される場合があります。

1. リソースがもう存在しません。たとえば、以前のデプロイの一部でした。
2. リソースにアクセスできません。たとえば、認証が必要な場合や、リソースに内部ネットワークからのみアクセスできる場合があります。
3. CORS (通常はウェブフォント) が原因で、リソースがブラウザによってブロックされています。
   - リプレイは `session-replay-datadoghq.com` サンドボックスドメインでレンダリングされ、アセットリクエストはブラウザによるクロスオリジンセキュリティチェックの対象となります。指定されたアセットがドメインに対して許可されていない場合、ブラウザはリクエストをブロックします。
   - ウェブサイトが依存しているフォントや画像アセットに対して、[`Access-Control-Allow-Origin`][5] ヘッダーを通して `session-replay-datadoghq.com` を許可し、これらのリソースが再生時にアクセスできることを確認します。
   - 詳しくは、[Cross Origin Resource Sharing][6] を参照してください。

### CSS ルールが適切に適用されていない / マウスホバーがリプレイされない

フォントや画像とは異なり、レコーダーは [CSSStyleSheet][7] インターフェイスを利用して、記録データの一部として適用されるさまざまな CSS ルールをバンドルしようとします。これが不可能な場合は、CSS ファイルへのリンクの記録にフォールバックします。

**注**: マウスホバーを適切にサポートするには、CSSStyleSheet インターフェイスから CSS ルールにアクセスできる必要があります。

スタイルシートがウェブページとは異なるドメインでホストされている場合、CSS ルールへのアクセスはブラウザによるクロスオリジンセキュリティチェックの対象となり、ブラウザは[クロスオリジン][8]属性を使用して CORS を利用してスタイルシートをロードするように指示される必要があります。

たとえば、アプリケーションが `example.com` ドメインにあり、リンク要素を介して `assets.example.com` の CSS ファイルに依存している場合、資格情報が必要な場合を除き、`crossorigin` 属性を `anonymous` に設定する必要があります。

```html
<link rel="stylesheet" crossorigin="anonymous"
      href="https://assets.example.com/style.css”>
```

さらに、`assets.example.com` の `example.com` ドメインを承認します。これにより、[`Access-Control-Allow-Origin`][5] ヘッダーを設定することにより、アセットファイルがリソースをロードできるようになります。

## よくある質問

### 仕組みは？

RUM ブラウザ SDK の一部であるセッションリプレイレコーダーは、DOM と CSS のスナップショットを取得します。ウェブページで発生するイベント (DOM の変更、マウスの移動、クリック、入力イベントなど) をタイムスタンプとともに追跡および記録します。

Datadog のリプレイビュー上では、ページが再構築され、記録されたイベントが適切なタイミングで再適用されます。

ブラウザ SDK は[オープンソース][9]で、オープンソースプロジェクト [rrweb][10] を活用しています。

### パフォーマンスへの影響は？

セッションリプレイレコーダーがアプリケーションのパフォーマンスに与える影響を最小限に抑えるため、Datadog は、

-   Datadog に送信する前にデータを圧縮することにより、セッションリプレイのネットワークへの影響を軽減しています。
-   CPU を集中的に使用する作業 (圧縮など) のほとんどをバックグラウンドのサービスワーカーに委任することで、ブラウザの UI スレッドの負荷を軽減しています。

予想されるネットワーク帯域の影響は 100Kb/分以下です。

### セッションリプレイはどのくらいの期間利用できますか？

セッションリプレイは、通常の RUM セッションと同じ 30 日間の保持ポリシーに従います。

### セッションリプレイを無効にするには？

- セッションの記録を停止するには、`startSessionReplayRecording()` を削除します。
- リプレイ、リソース、ロングタスクを含む RUM セッションリプレイプランの収集を停止するには、`replaySampleRate` を `0` に設定します。

これらの構成を適用するには、[Browser RUM SDK][2] をバージョン 3.6 以降にアップグレードしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/#setup
[2]: https://www.npmjs.com/package/@datadog/browser-rum
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /ja/real_user_monitoring/browser/#initialization-parameters
[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[7]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
[8]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[9]: https://github.com/DataDog/browser-sdk
[10]: https://www.rrweb.io/