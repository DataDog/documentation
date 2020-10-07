---
title: はじめに
kind: ドキュメント
aliases:
  - /ja/real_user_monitoring/setup
  - /ja/real_user_monitoring/installation/
further_reading:
  - link: 'https://www.npmjs.com/package/@datadog/browser-rum'
    tag: npm
    text: datadog/browser-rum npm package
  - link: /real_user_monitoring/installation/advanced_configuration
    tag: Documentation
    text: RUM データ収集の高度なコンフィギュレーション
  - link: /real_user_monitoring/dashboards
    tag: Documentation
    text: 追加設定なしで使用できるダッシュボードで RUM データを視覚化します
---
Datadog リアルユーザーモニタリング (RUM) ソリューションのセットアップ:

1. [リアルユーザーモニタリングのページ][1]で、**New Application** ボタンをクリックします。
2. アプリケーションの詳細を入力し、**Generate Client Token** をクリックします。アプリケーションの `clientToken` と `applicationId` が自動的に作成されます。
3. [npm](#npm-セットアップ) を使用して Datadog RUM SDK をセットアップするか、[生成されたコードスニペット](#バンドル-セットアップ) を head タグに貼り付けます。
4. 変更をアプリケーションにデプロイします。実行が開始されると、ユーザーのブラウザーからDatadog によるイベントの収集が開始します。
5. [収集されたデータ][2]は、Datadog の[ダッシュボード][3]で視覚的に確認できます。

**注**: Datadog がデータの受信を開始するまで、アプリケーションはアプリケーションリストページに「保留中」として表示されます。

## npm セットアップ

[`@datadog/browser-rum`][4]を `package.json` ファイルに追加したら、次のコマンドを実行して初期化します。

{{< tabs >}}
{{% tab "US" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: 'datadoghq.com',
//  service: 'my-web-application',
//  env: 'production',
//  version: '1.0.0',
    sampleRate: 100,
    trackInteractions:true,
});
```

{{% /tab %}}
{{% tab "EU" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: 'datadoghq.eu',
//  service: 'my-web-application',
//  env: 'production',
//  version: '1.0.0',
    sampleRate: 100,
    trackInteractions:true,
});
```

{{% /tab %}}
{{< /tabs >}}

**注**: 初期化パラメーター `trackInteractions` は、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。

## バンドルセットアップ

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグ（他のスクリプトタグの前にあるタグ）に貼り付けます。同期型のスクリプトタグをより高い位置に含めると、Datadog RUM ですべてのパフォーマンスデータとエラーを収集できます。

{{< tabs >}}
{{% tab "US" %}}

```html
<script
    src="https://www.datadoghq-browser-agent.com/datadog-rum.js"
    type="text/javascript"
></script>
<script>
    window.DD_RUM &&
        window.DD_RUM.init({
            clientToken: '<CLIENT_TOKEN>',
            applicationId: '<APPLICATION_ID>',
            site: 'datadoghq.com',
        //  service: 'my-web-application',
        //  env: 'production',
        //  version: '1.0.0',
            sampleRate: 100,
            trackInteractions:true,
        });
</script>
```

{{% /tab %}}
{{% tab "EU" %}}

```html
<script
    src="https://www.datadoghq-browser-agent.com/datadog-rum.js"
    type="text/javascript"
></script>
<script>
    window.DD_RUM &&
        window.DD_RUM.init({
            clientToken: '<CLIENT_TOKEN>',
            applicationId: '<APPLICATION_ID>',
            site: 'datadoghq.eu',
        //  service: 'my-web-application',
        //  env: 'production',
        //  version: '1.0.0',
            sampleRate: 100,
            trackInteractions:true,
        });
</script>
```

{{% /tab %}}
{{< /tabs >}}

**注**: 初期化パラメーター `trackInteractions` は、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。

**注**: `window.DD_RUM` チェックは、RUM SDK で読み込みエラーが起きた際に問題を防ぐために使用されます。

## 初期化パラメーター

| パラメーター                      | タイプ    | 必須 | デフォルト         | 説明                                                                                                       |
| ------------------------------ | ------- | -------- | --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `applicationId`                | 文字列  | 〇      | ``              | RUM アプリケーションの ID。                                                                                           |
| `clientToken`                  | 文字列  | 〇      | ``              | [Datadog クライアントトークン][5]。                                                                                      |
| `site`                         | 文字列  | 〇      | `datadoghq.com` | 所属する組織の Datadog サイト。`datadoghq.com` はアメリカの Datadog のサイト、 `datadoghq.eu` は EU の Datadog サイト。   |
| `service`                      | 文字列  | ✕       | ``              | このアプリケーションのサービス名。                                                                            |
| `env`                          | 文字列  | ✕       | ``              | アプリケーションの環境 (例: prod、pre-prod、staging)                                                       |
| `version`                      | 文字列  | ✕       | ``              | アプリケーションのバージョン (例: 1.2.3、6c44da20、2020.02.13)                                                       |
| `trackInteractions`            | Boolean | ✕       | `false`         | [ユーザーアクションの自動収集][6]を有効にします                                                                |
| `resourceSampleRate`           | 数値  | ✕       | `100`           | リソースを収集するセッションのうち追跡されるセッションの割合。`100` は全てのセッションが追跡されることを、`0` は追跡されるセッションがないことを意味します。                    |
| `sampleRate`                   | 数値  | ✕       | `100`           | 追跡するセッションの割合。追跡されたセッションのみ RUM イベントを送信します。`100` は全てを、`0` は皆無を意味します。      |
| `silentMultipleInit`           | Boolean | ✕       | `false`         | Datadog の RUM がページ上ですでに初期化されている場合、初期化が暗黙に失敗します。                                 |
| `proxyHost`                    | 文字列  | ✕       | ``              | オプションのプロキシ URL。詳細については、完全な[プロキシ設定ガイド][7]を参照してください。                                     |
| `trackSessionAcrossSubdomains` | Boolean | ✕       | `false`         | 同じサイトのサブドメインのセッションを保持するには、`true` に設定します。**ログと RUM SDK の双方を使用している場合は、この設定を一致させる必要があります。**  |
| `useSecureSessionCookie`       | Boolean | ✕       | `false`         | 安全なセッションの Cookie を使用するには、`true` に設定します。これで、RUM イベントから安全でない (非 HTTPS) 接続が送られるのを阻止できます。**ログと RUM SDK の双方を使用している場合は、この設定を一致させる必要があります。** |
| `useCrossSiteSessionCookie`    | Boolean | ✕       | `false`         | サイト間で安全なセッションの Cookie を使用するには、`true` に設定します。これで、別の対象 (`iframe` など) からサイトが読み込まれた場合に RUM SDK を実行できます。useSecureSessionCookie と併せて使用されます。 **ログと RUM SDK の双方を使用している場合は、この設定を一致させる必要があります。** |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum
[2]: /ja/real_user_monitoring/data_collected/
[3]: /ja/real_user_monitoring/dashboards/
[4]: https://www.npmjs.com/package/@datadog/browser-rum
[5]: /ja/account_management/api-app-keys/#client-tokens
[6]: /ja/real_user_monitoring/data_collected/user_action/#automatic-collection-of-user-actions
[7]: /ja/real_user_monitoring/faq/proxy_rum_data/