---
title: RUM の使用方法
kind: documentation
aliases:
  - /ja/real_user_monitoring/setup
further_reading:
  - link: 'https://www.npmjs.com/package/@datadog/browser-rum'
    tag: npm
    text: datadog/browser-rum npm package
  - link: /real_user_monitoring/installation/advanced_configuration
    tag: ドキュメント
    text: RUM データ収集の高度なコンフィギュレーション
  - link: /real_user_monitoring/dashboards
    tag: ドキュメント
    text: 追加設定なしで RUM データをダッシュボードで確認
---
Datadog リアルユーザーモニタリング (RUM) ソリューションのセットアップ:

1. [リアルユーザーモニタリングのページ][1]で、**New Application** ボタンをクリックします。
2. アプリケーションの詳細を入力し、**Generate Client Token** をクリックします。アプリケーションの `clientToken` と `applicationId` が自動的に作成されます。
3. [npm](#npm-セットアップ) を使用して Datadog ブラウザー RUM ライブラリをセットアップするか、[生成されたコードスニペット](#バンドル-セットアップ) を head タグに貼り付けます。
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
  datacenter: 'us',
  sampleRate: 100
});
```

{{% /tab %}}
{{% tab "EU" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  datacenter: 'eu',
  sampleRate: 100
});
```

{{% /tab %}}
{{< /tabs >}}

## バンドルセットアップ

生成されたコードスニペットを、アプリケーションで監視するすべての HTML ページの head タグ（他のスクリプトタグの前にあるタグ）に貼り付けます。同期型のスクリプトタグをより高い位置に含めると、Datadog RUM ですべてのパフォーマンスデータとエラーを収集できます。

{{< tabs >}}
{{% tab "US" %}}

```html
<script
  src="https://www.datadoghq-browser-agent.com/datadog-rum-us.js"
  type="text/javascript">
</script>
<script>
  window.DD_RUM && window.DD_RUM.init({
    clientToken: '<CLIENT_TOKEN>',
    applicationId: '<APPLICATION_ID>',
    sampleRate: 100
  });
</script>
```

{{% /tab %}}
{{% tab "EU" %}}

```html
<script
  src="https://www.datadoghq-browser-agent.com/datadog-rum-eu.js"
  type="text/javascript">
</script>
<script>
  window.DD_RUM && window.DD_RUM.init({
    clientToken: '<CLIENT_TOKEN>',
    applicationId: '<APPLICATION_ID>',
    sampleRate: 100
  });
</script>
```

{{% /tab %}}
{{< /tabs >}}

**注**: `window.DD_RUM` チェックは、ライブラリで読み込みエラーが起きた際に問題を防ぐために使用されます。

## 初期化パラメーター

| パラメーター            | 種類   | 必須 | デフォルト | 説明                                                                                                  |
|----------------------|--------|----------|---------|--------------------------------------------------------------------------------------------------------------|
| `applicationId`      | 文字列 | はい      | ``      | RUM アプリケーションの ID。                                                                                      |
| `clientToken`        | 文字列 | はい      | ``      | [Datadog クライアントトークン][5]。                                                                                 |
| `datacenter`         | 文字列 | はい      | `us`    | 所属する組織の Datadog サイト。`us` はアメリカの Datadog のサイト、 `eu` は EU の Datadog サイト。                   |
| `resourceSampleRate` | 数値 | いいえ       | `100`   | リソースを収集するセッションのうち追跡されるセッションの割合。`100` は全てのセッションが追跡されることを、`0` は追跡されるセッションがないことを意味します。               |
| `sampleRate`         | 数値 | いいえ       | `100`   | 追跡するセッションの割合。追跡されたセッションのみ RUM イベントを送信します。`100` は全てを、`0` は皆無を意味します。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum
[2]: /ja/real_user_monitoring/data_collected
[3]: /ja/real_user_monitoring/dashboards
[4]: https://www.npmjs.com/package/@datadog/browser-rum
[5]: /ja/account_management/api-app-keys/#client-tokens