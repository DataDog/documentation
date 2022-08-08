---
description: セッションリプレイでユーザーの Web 閲覧体験をキャプチャし、視覚化する方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: ブログ
  text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: ブログ
  text: ファネル分析により、主要なユーザーフローを理解し、最適化する
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM データを Explorer で確認
kind: documentation
title: Session Replay
---

## 概要

セッションリプレイは、ユーザーのウェブブラウジング体験をキャプチャして視覚的に再生できるようにすることで、ユーザーエクスペリエンスモニタリングを拡張します。セッションリプレイを RUM パフォーマンスデータと組み合わせると、エラーの識別、再現、解決に有益で、ウェブアプリケーションの使用パターンと設計上の落とし穴に対する洞察をもたらすこともできます。

RUM ブラウザ SDK は[オープンソース][1]であり、オープンソースの [rrweb][2] プロジェクトを活用したものです。

## セッションリプレイレコーダー

セッションリプレイレコーダーは、RUM ブラウザ SDK の一部です。このレコーダーは、Web ページで発生したイベント (DOM の変更、マウスの移動、クリック、入力イベントなど) を、これらのイベントのタイムスタンプとともに追跡して記録することにより、ブラウザの DOM と CSS のスナップショットを取得します。

その後、Datadog は Web ページを再構築し、記録されたイベントをリプレイビューの適切なタイミングで再適用します。セッションリプレイは、通常の RUM セッションと同じ 30 日間の保持ポリシーに従います。

セッションリプレイレコーダーは、IE11 を除き、RUM ブラウザ SDK でサポートされているすべてのブラウザをサポートしています。詳しくは、[ブラウザサポートテーブル][3]を参照してください。

セッションリプレイのネットワークへの影響を軽減し、セッションリプレイレコーダーがアプリケーションのパフォーマンスに与えるオーバーヘッドを最小限に抑えるため、Datadog はデータを送信する前に圧縮を行います。また、Datadog は CPU に負荷のかかる作業 (圧縮など) のほとんどをバックグラウンドのサービスワーカーに委ねることで、ブラウザの UI スレッドの負荷を軽減しています。ネットワーク帯域幅への影響は 100kB/分未満と予想されます。

## セットアップ

セッションリプレイは、RUM ブラウザ SDK で利用できます。セッションリプレイのデータ収集を開始するには、RUM アプリケーションの作成、クライアントトークン生成、RUM ブラウザ SDK の初期化により、[Datadog RUM ブラウザモニタリング][4]をセットアップしてください。

### セッションリプレイを有効にする

選択したインストール方法に応じて、npm パッケージ名または CDN URL を変更します。

### npm

`@datadog/browser-rum package` を [`@datadog/browser-rum`][5] のバージョン >3.6.0 に置き換えます。記録を開始するには、`datadogRum.startSessionReplayRecording()` を呼び出します。

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
    premiumSampleRate: 100,
    trackInteractions: true
});

datadogRum.startSessionReplayRecording();
```

### CDN

RUM ブラウザ SDK URL `https://www.datadoghq-browser-agent.com/datadog-rum.js` を `https://www.datadoghq-browser-agent.com/datadog-rum-v4.js` に置き換えます。`DD_RUM.init()` が呼び出されると、`DD_RUM.startSessionReplayRecording()` も呼び出されるまで、セッションリプレイの記録は開始されません。

## コンフィギュレーション

RUM ブラウザ SDK の[初期化パラメーター][6]を使用することができます。

`init()` を呼び出しても、セッションリプレイは自動的に記録を開始しません。記録を開始するには、`startSessionReplayRecording()` を呼び出します。これは、条件付きで記録を開始する場合に役立ちます。たとえば、認証されたユーザーセッションのみを記録する場合などです。

```javascript
if (user.isAuthenticated) {
    DD_RUM.startSessionReplayRecording();
}
```

セッションリプレイの記録を停止するには、`stopSessionReplayRecording()` を呼び出してください。

### セッションリプレイを無効にする

セッションの記録を停止するには、`startSessionReplayRecording()` を削除し、`premiumSampleRate` を `0` に設定します。これにより、RUM &amp; セッションリプレイの[ブラウザプレミアムプラン][7]のデータ収集が停止され、リプレイ、リソース、ロングタスクが含まれるようになります。

これらの構成を適用するには、[RUM ブラウザ SDK][5] をバージョン 3.6 以降にアップグレードしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /ja/real_user_monitoring/browser/#setup
[5]: https://www.npmjs.com/package/@datadog/browser-rum
[6]: /ja/real_user_monitoring/browser/#initialization-parameters
[7]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay