---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: リアルユーザーモニタリング
- link: /integrations/content_security_policy_logs/
  tag: Documentation
  text: コンテンツセキュリティポリシー
title: トラブルシューティング
---

Datadog Browser RUM で予期しない動作が発生した場合に問題は、このガイドを使うと迅速に解決することができます。問題が解決しない場合は、[Datadog サポート][1]にお問い合わせください。各リリースには改善と修正が含まれているため、[RUM Browser SDK][2] は定期的に最新バージョンに更新してください。

## データがない

RUM データが表示されない場合、または一部のユーザーのデータが欠落している場合

| 一般的な原因                                                                                               | 推奨される修正                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 広告ブロッカーが、RUM ブラウザ SDK のダウンロードや Datadog へのデータ送信を妨害している。     | 一部の広告ブロッカーの制限は、パフォーマンスおよびマーケティング追跡ツールにまで及びます。ドキュメント [npm を使用して RUM ブラウザ SDK をインストールする][3]と[収集したデータをプロキシ経由で転送する][4]を参照してください。 |
| ネットワークルール、VPN、またはアンチウィルスソフトウェアが、RUM ブラウザ SDK のダウンロードや Datadog へのデータ送信を妨害している。 | RUM ブラウザ SDK のダウンロードまたはデータの送信に必要なエンドポイントへのアクセスを許可します。エンドポイントのリストは、[コンテンツセキュリティポリシーのドキュメント][5]にあります。                                        |
| RUM ブラウザ SDK の前に初期化されたスクリプト、パッケージ、クライアントは、ログ、リソース、ユーザーアクションの欠落につながる可能性があります。たとえば、RUM ブラウザ SDK の前に ApolloClient を初期化すると、`graphql` リクエストが RUM エクスプローラーに XHR リソースとして記録されない場合があります。 | RUM ブラウザ SDK が初期化される場所を確認し、アプリケーションコードの実行の早い段階にこのステップを移動することを検討してください。                                             |
| `trackViewsManually: true` を設定して、セッションが存在しないことに気づいた場合、ネットワークエラーがないにもかかわらず、アプリケーションが突然 RUM 情報の送信を停止した可能性があります。 | データの損失を防ぐため、RUM を初期化したら必ず初期ビューを開始してください。詳しくは、[高度なコンフィギュレーション][6]を参照してください。|

[コンテンツセキュリティポリシーのガイドライン][5]を読み、ウェブサイトが RUM ブラウザ SDK CDN とインテークエンドポイントへのアクセスを許可していることを確認します。

### RUM ブラウザ SDK を初期化します

ブラウザコンソールで `window.DD_RUM.getInternalContext()` を実行して RUM ブラウザ SDK が初期化されているかどうかを確認し、`application_id`、`session_id`、およびビューオブジェクトが返されることを確認します。

{{< img src="real_user_monitoring/browser/troubleshooting/success_rum_internal_context.png" alt="内部コンテキストの取得コマンドの成功">}}

RUM ブラウザ SDK がインストールされていない場合、または SDK が正常に初期化されていない場合は、次のような `ReferenceError: DD_RUM is not defined` エラーが表示される場合があります。

{{< img src="real_user_monitoring/browser/troubleshooting/error_rum_internal_context.png" alt="内部コンテキストの取得コマンドのエラー">}}

RUM ブラウザ SDK のロードに関連するエラーに気付いた場合は、ブラウザー開発ツールのコンソールまたはネットワークタブを確認することもできます。

**注**: 正確な結果を確実に得るために、`sessionSampleRate` を 100 に設定してください。詳しくは、[ブラウザ RUM およびブラウザ RUM & セッションリプレイのサンプリングのためのセットアップの構成][9]を参照してください。

### Datadog インテークへのデータ


RUM SDK は、以下のいずれかの条件が満たされるたびに、Datadog のインテークにイベントデータのバッチを送信します。

- 30 秒ごと
- イベント数が 50 件に達したとき
- ペイロードが 16 KB を超えた場合
- `visibility:hidden` または `beforeUnload` の場合

データが送信されている場合、ブラウザ開発ツールの Network セクションに、`/v1/input` (URL の起点部分は RUM のコンフィギュレーションによって異なる場合があります) を対象とするネットワークリクエストが表示されます。

{{< img src="real_user_monitoring/browser/troubleshooting/network_intake.png" alt="Datadog インテークに対する RUM リクエスト">}}

## RUM クッキー

RUM ブラウザ SDK は、クッキーに依存してセッション情報を保存し、さまざまなページで[ユーザーセッション][7]を追跡します。クッキーはファーストパーティであり (ドメインに設定されています)、クロスサイト追跡には使用されません。RUM ブラウザ SDK によって設定されるクッキーは次のとおりです。

| クッキー名        | 詳細                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dd_s`             | 複数のページにわたる一意のユーザーセッションから生成されたすべてのイベントをグループ化するために使用されるクッキー。これには、現在のセッション ID、サンプリングのためにセッションが除外されているかどうか、およびセッションの有効期限が含まれます。クッキーは、ユーザーが Web サイトを操作するたびに、最大ユーザーセッション期間 (4 時間) を上限にさらに 15 分間延長されます。|
| `dd_site_test_*`   | クッキーのサポートをテストするために使用される一時的なクッキー。すぐに期限切れになります。                                                                                                                                                                                                                                     |
| `dd_cookie_test_*` | クッキーのサポートをテストするために使用される一時的なクッキー。すぐに期限切れになります。                                                                                                                                                                                                                                     |

**注**: RUM ブラウザ SDK の最近のバージョンでは、`_dd_l`、`_dd_r`、`_dd` のクッキーは、`_dd_s` に置き換わっています。

## セッション ID、クッキー、RUM アプリケーション

RUM セッションとそれが属する RUM アプリケーションの間には 1 対 1 の関係があります。したがって、`_dd_s` クッキーに設定されたドメインは、完全に監視対象の RUM アプリケーション専用であり、その他のアプリケーションを監視することはできません。

## 技術的な制限

RUM ブラウザ SDK から送信される各イベントは、以下の内容で構築されています。

- RUM グローバルコンテキスト
- イベントコンテキスト (ある場合)
- イベント固有の属性

例:

```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('global', {'foo': 'bar'})
window.DD_RUM && window.DD_RUM.addAction('hello', {'action': 'qux'})
```

サンプルコードでは、次のようなアクションイベントを作成しています。

```json
{
  "type": "action",
  "context": {
    "global": {
      "foo": "bar"
    },
    "action": "qux"
  },
  "action": {
    "id": "xxx",
    "target": {
      "name": "hello"
    },
    "type": "custom"
  },
  ...
}
```

イベントやリクエストが以下の制限を超えた場合、Datadog のインテークによって拒否されます。

| プロパティ                                 | 制限   |
| ---------------------------------------- | ------------ |
| 1 イベントあたりの最大属性数   | 256          |
| 1 イベントあたりの最大属性深度        | 20           |
| 最大イベントサイズ                       | 256 KB       |
| 最大インテークペイロードサイズ              | 5 MB         |

## "Customer data exceeds the recommended threshold" (顧客データが推奨されるしきい値を超えています) の警告

RUM ブラウザ SDK では、[グローバルコンテキスト][10]、[ユーザー情報][11]、[機能フラグ][12]を設定することができ、これらはその後、収集されたイベントに含まれます 。

ユーザーの帯域幅への影響を最小限に抑えるため、RUM ブラウザ SDK は、Datadog インテークに送信されるデータを抑制します。ただし、大量のデータを送信すると、低速のインターネット接続を使用しているユーザーのパフォーマンスには、依然として影響を与える可能性があります。 

最高のユーザーエクスペリエンスを得るために、Datadog では、グローバルコンテキスト、ユーザー情報、および機能フラグのサイズを 3KiB 未満に抑えることを推奨しています。データがこの制限を超えると、警告が表示されます: `The data exceeds the recommended 3KiB threshold.`

v5.3.0 以降、RUM Browser SDK は `compressIntakeRequest` [初期化パラメーター][13]を介してデータ圧縮をサポートしています。有効にすると、この推奨される制限は 3KiB から 16KiB に拡大されます。

## クロスオリジンリードブロッキング警告

Chromium ベースのブラウザで、RUM ブラウザ SDK が Datadog インテークにデータを送信すると、コンソールに CORB 警告 `Cross-Origin Read Blocking (CORB) blocked cross-origin response` が出力されます。

インテークが空でない JSON オブジェクトを返すため、警告が表示されます。この動作は、報告されている [Chromium の問題][8]です。RUM ブラウザ SDK に影響を与えるものではないので、無視しても問題ありません。

## “Deobfuscation failed” の警告

スタックトレースの難読化解除に失敗した場合、この警告が表示されます。スタックトレースが最初から難読化されていない場合は、この警告は無視しても問題ありません。それ以外の場合は、[RUM Debug Symbols ページ][14]を使用してアップロード済みのすべてのソースマップを確認してください。詳しくは、[RUM Debug Symbols を用いた難読化スタックトレースの調査][15]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: /ja/real_user_monitoring/browser/setup/#npm
[4]: /ja/real_user_monitoring/guide/proxy-rum-data/
[5]: /ja/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[6]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[7]: /ja/real_user_monitoring/browser/data_collected/?tab=session
[8]: https://bugs.chromium.org/p/chromium/issues/detail?id=1255707
[9]: /ja/real_user_monitoring/guide/sampling-browser-plans/
[10]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[11]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[12]: /ja/real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=browser
[13]: /ja/real_user_monitoring/browser/setup/#initialization-parameters
[14]: https://app.datadoghq.com/source-code/setup/rum
[15]: /ja/real_user_monitoring/guide/debug-symbols