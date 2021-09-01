---
title: セッションリプレイの概要
kind: ガイド
description: セッションリプレイを有効にするためのガイドとプライバシーオプションの設定方法
beta: true
further_reading:
  - link: /real_user_monitoring/explorer
    tag: ドキュメント
    text: RUM データを Explorer で確認
  - link: 'https://www.datadoghq.com/blog/session-replay-datadog/'
    tag: ブログ
    text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示
---
<div class="alert alert-info"><p>セッションリプレイは非公開ベータ版です。この期間中のセッションリプレイに対する請求への影響はありません。プライベートベータに追加する場合は、<a href="mailto:support@datadoghq.com">support@datadoghq.com</a> にメールして登録してください。</p><p>現時点では、セッションリプレイは <a href="/getting_started/site/">US1 Datadog サイト</a>でのみ利用できます。</p>
<p>注: セッションリプレイは、<a href="https://www.datadoghq.com/legal/hipaa-eligible-services/">HIPAA 適格サービス</a>ではありません。ご不明な点がございましたら、<a href="mailto:support@datadoghq.com">support@datadoghq.com</a> までメールでお問い合わせください。</p>
</div>

## セッションリプレイとは

セッションリプレイは、ユーザーのウェブブラウジング体験をキャプチャして視覚的に再生できるようにすることで、UX モニタリングを拡張します。
セッションリプレイを RUM パフォーマンスデータと組み合わせて使用すると、エラーの識別、再現、解決のためのアセットとなり、ウェブアプリケーションの使用パターンと設計上の落とし穴に対する貴重な洞察をもたらすこともできます。

## セッションリプレイデータを収集する

### 初期設定

セッションリプレイを使用するには、[Datadog RUM ブラウザモニタリング][1]を設定します。次のセクションを設定します: アプリケーションの作成、クライアントトークンの生成、RUM SDK の設定。

セッションリプレイは、RUM ブラウザ SDK の専用ビルドを通じて利用できます。セッションリプレイを有効にするには、選択したインストール方法に応じて、npm パッケージ名または CDN URL を変更します。

#### npm
`@datadog/browser-rum package` を [`@datadog/browser-rum`][2] のバージョン >3.0.2 に置き換えます。`datadogRum.init()` が呼び出されると、セッションリプレイの記録も開始されます。

``` javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  replaySampleRate: 100,
  trackInteractions: true,
})

DD_RUM.startSessionReplayRecording();
```

#### CDN
ブラウザ SDK URL `https://www.datadoghq-browser-agent.com/datadog-rum.js` を `https://www.datadoghq-browser-agent.com/datadog-rum-v3.js` に置き換えます。`DD_RUM.init()` が呼び出されると、`DD_RUM.startSessionReplayRecording()` も呼び出されるまで、セッションリプレイの記録は開始されません。

*サポートされているブラウザ*: セッションリプレイレコーダーは、IE11 を除き、RUM ブラウザ SDK でサポートされているすべてのブラウザをサポートしています。[ブラウザサポートテーブル][3]を参照してください。

#### コンフィギュレーション

通常の [RUM 初期化パラメータ][4]はすべてサポートされています。

`init()` を呼び出しても、セッションリプレイは自動的に記録を開始しません。記録を開始するには、`startSessionReplayRecording()` を呼び出します。これは、条件付きで記録を開始する場合に役立ちます。たとえば、認証されたユーザーセッションのみを記録する場合などです。

``` javascript
if (user.isAuthenticated) {
    DD_RUM.startSessionReplayRecording()
}
```

セッションリプレイの記録は、`stopSessionReplayRecording()` を呼び出すことで停止できます。

### 機密性の高い個人データの難読化

デフォルトでは、タイプ `password`、`email`、`tel` の HTML 入力要素の入力イベントはすべて無視されます。

これらのイベントは、データ属性 `data-dd-privacy` を `input-ignored` に設定するか、`dd-privacy-input-ignored` のクラスを追加することにより、他の要素でも無視できます。たとえば、次のフォームへの入力はすべて無視されます。

``` html
<form method="post" data-dd-privacy=”input-ignored”>
    <input type="text" name="name" id="name" required>
    <input type="number" name="age" id="age" required>
    <input type="email" name="email" id="email" required>
    <input type="submit" value="submit">
</form>
```

さらに、HTML 要素は完全に難読化できます。これらの要素は、Datadog セッションのリプレイのナビゲーションバーのこの例のように、記録時に白いブロックに置き換えられます。

{{< img src="real_user_monitoring/guide/replay-hidden.png" alt="リプレイ非表示の例">}}

データ属性 `data-dd-privacy` を hidden に設定するか、`dd-privacy-hidden` のクラスを追加して、要素を難読化します。非表示としてマークされた要素は、コンテンツが*記録されない*ため、PII は Datadog に送信されません。たとえば、次の div は難読化され、リプレイで同じサイズの白いブロックに置き換えられます。

``` html
<div id=”profile-info” data-dd-privacy=”hidden”>
    <p>Name: John Doe</p>
    <p>Birth date: June 6th, 1987</p>
</div>
```

## トラブルシューティング

### 一部の HTML 要素はリプレイ時に表示されない

セッションリプレイは現在、次の HTML 要素をサポートしていません: `iframe`、`video`、`audio`、`canvas`、ウェブコンポーネント。

### フォントまたは画像が正しくレンダリングされない

セッションリプレイはビデオではなく、DOM のスナップショットに基づいて再構築された実際の iframe です。したがって、リプレイはページのさまざまなアセット (フォントと画像) に依存します。

いくつかの理由により、リプレイ時にアセットが利用できない理由が説明される場合があります。

1. リソースがもう存在しません。たとえば、以前のデプロイの一部でした。
2. リソースにアクセスできません。たとえば、認証が必要な場合や、リソースに内部ネットワークからのみアクセスできる場合があります。
3. CORS (通常はウェブフォント) が原因で、リソースがブラウザによってブロックされています。
リプレイは `app.datadoghq.com` ドメインでレンダリングされ、アセットリクエストはブラウザによるクロスオリジンセキュリティチェックの対象となります。指定されたアセットがドメインに対して許可されていない場合、ブラウザはリクエストをブロックします。
したがって、修正は、ウェブサイトが依存するフォントまたは画像アセットの [`Access-Control-Allow-Origin`][5] ヘッダーを介して `app.datadoghq.com` を許可し、これらのリソースが再生のためにアクセスできるようにすることです。
クロスオリジンリソースシェアリングの詳細については、[MDN ウェブドキュメントの記事][6]を参照してください。

### CSS ルールが適切に適用されていない / マウスホバーがリプレイされない

フォントや画像とは異なり、レコーダーは [CSSStyleSheet][7] インターフェイスを利用して、記録データの一部として適用されるさまざまな CSS ルールをバンドルしようとします。これが不可能な場合は、CSS ファイルへのリンクの記録にフォールバックします。

**注**: マウスホバーを適切にサポートするには、CSSStyleSheet インターフェイスから CSS ルールにアクセスできる必要があります。

スタイルシートがウェブページとは異なるドメインでホストされている場合、CSS ルールへのアクセスはブラウザによるクロスオリジンセキュリティチェックの対象となり、ブラウザは[クロスオリジン][8]属性を使用して CORS を利用してスタイルシートをロードするように指示される必要があります。

たとえば、アプリケーションが `example.com` ドメインにあり、リンク要素を介して `assets.example.com` の CSS ファイルに依存している場合、資格情報が必要な場合を除き、`crossoriring` 属性を `anonymous` に設定する必要があります。

``` html
<link rel="stylesheet" crossorigin="anonymous"
      href="https://assets.example.com/style.css”>
```

さらに、`assets.example.com` の `example.com` ドメインを承認します。これにより、[`Access-Control-Allow-Origin`][5] ヘッダーを設定することにより、アセットファイルがリソースをロードできるようになります。

## よくある質問

### 仕組みは？

RUM ブラウザ SDK の一部であるセッションリプレイレコーダーは、DOM + CSS のスナップショットを取得します。次に、ウェブページで発生するイベント (DOM の変更、マウスの移動、クリック、入力イベントなど) をタイムスタンプとともに追跡および記録します。

Datadog リプレイビューで、ページを再構築し、記録されたイベントを適切なタイミングで再適用します。

ブラウザ SDK は[オープンソース][9]で、オープンソースプロジェクト [rrweb][10] を活用しています。

### パフォーマンスへの影響は？

チームは、セッションリプレイレコーダーがアプリケーションのパフォーマンスに与える影響を最小限に抑えることに重点を置いています。

- Datadog に送信する前にデータを圧縮することにより、セッションリプレイのネットワークへの影響を軽減しています
- CPU を集中的に使用する作業 (圧縮など) のほとんどをバックグラウンドのサービスワーカーに委任することで、ブラウザの UI スレッドの負荷を軽減しています。

予想されるネットワーク帯域幅への影響は 100Kb/分未満です。アーリーアダプターからより多くのデータが集まったら、より詳しい概算をお伝えできる予定です。

### セッションリプレイはどのくらいの期間利用できますか？

セッションリプレイは、通常の RUM セッションと同じ 30 日間の保持ポリシーに従います。

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