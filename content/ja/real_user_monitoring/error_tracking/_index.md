---
title: RUM エラー追跡
kind: ドキュメント
beta: true
further_reading:
  - link: /real_user_monitoring/error_tracking/explorer
    tag: Documentation
    text: RUM Error Tracking Explorer
  - link: 'https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps'
    tag: Documentation
    text: Datadog CLI の公式リポジトリ
  - link: /real_user_monitoring/guide/upload-javascript-source-maps
    tag: ガイド
    text: JavaScript ソースマップのアップロード
  - link: 'https://app.datadoghq.com/error-tracking'
    tag: UI
    text: エラー追跡
---
{{< img src="real_user_monitoring/error_tracking/page.png" alt="エラー追跡ページ"  >}}

## Error Tracking とは？

Datadog では、非常に多くのエラーが収集されます。システムの正常性維持には、このエラーを監視することが不可欠ですが、件数が多いため個々のエラーイベントを重要度により特定し修正の順序を見極めることは大変困難です。

Error Tracking を使用すると、以下の機能により簡単にエラーを監視できます。

- __同様のエラーを問題としてグループ化する__ ため、ノイズがなくなり最も重要なエラーを特定することができます。
- __経時的に問題を監視する__ ため、開始のタイミングや継続した場合の頻度を把握できます。
- __必要なコンテキストをまとめて 1 か所で確認__ できるため、問題のトラブルシューティングが容易になります。

## はじめに

Error Tracking では、RUM SDK によりブラウザから収集されたエラー ([ソース元][1]のあるエラー) を処理します。

エラー追跡を素早く開始するには:

1. [RUM Browser SDK][2] の最新バージョンをダウンロードします。
2. [SDK の初期化時][3]に、__version__、__env__、__service__ を構成します。

### マッピングファイルのアップロード

一部のアプリケーションのソースコードは、実稼働用にデプロイされるときにパフォーマンスの最適化およびセキュリティの観点から難読化または縮小されます。
その結果、そのようなアプリケーションで発生したエラーのスタックトレースも難読化され、トラブルシューティングのプロセスが難航することになります。

#### Javascript ソースマップ

ソースマップは、Javascript のソースコードを縮小する際に生成されるマッピングファイルです。このマッピングファイルをビルドディレクトリからアップロードするために、[Datadog CLI][4] を使用できます（ビルドディレクトリとそのサブディレクトリをスキャンして、関連する縮小化ファイルとともにソースマップを自動的にアップロード）。CI パイプラインから、ソースマップを直接アップロードします。

{{< tabs >}}
{{% tab "US" %}}

1. `package.json` ファイルに `@datadog/datadog-ci` を追加します (必ず最新バージョンを使用してください)。
2. [新しい専用の Datadog API キーを作成][1]し、`DATADOG_API_KEY` という名前の環境変数としてエクスポートします。
3. 次のコマンドを実行します。
```bash
datadog-ci sourcemaps upload /path/to/dist \
    --service=my-service \
    --release-version=v35.2395005 \
    --minified-path-prefix=https://hostname.com/static/js
```


[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "EU" %}}

1. `package.json` ファイルに `@datadog/datadog-ci` を追加します (必ず最新バージョンを使用してください)。
2. [新しい専用の Datadog API キーを作成][1]し、`DATADOG_API_KEY` という名前の環境変数としてエクスポートします。
3. 2 つの追加環境変数 `export DATADOG_SITE="datadoghq.eu"` および `export DATADOG_API_HOST="api.datadoghq.eu"` をエクスポートして、EU リージョンにファイルをアップロードするために CLI を構成します。
4. 次のコマンドを実行します。
```bash
datadog-ci sourcemaps upload /path/to/dist \
    --service=my-service \
    --release-version=v35.2395005 \
    --minified-path-prefix=https://hostname.com/static/js
```


[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

ソースマップでエラー追跡が正常に動作するには、以下を満たすように Javascript バンドルを構成する必要があります。

-   ソースマップが直接関連ソースコードを直接含むこと。アップロードする前に、ソースマップ内の <code>sourcesContent</code> 属性が空でないことを確認してください。
-   関連する縮小ファイルのサイズで拡張された各ソースマップのサイズが、__上限の 50mb__を越えないこと。この合計は、ソースコードを複数の小さい部分に分けるようバンドルを構成することで抑制することができます ([WebpackJS でこれを実行する方法はこちら][5])。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/error#error-origins
[2]: https://www.npmjs.com/package/@datadog/browser-rum
[3]: /ja/real_user_monitoring/browser/#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/
[5]: https://webpack.js.org/guides/code-splitting/