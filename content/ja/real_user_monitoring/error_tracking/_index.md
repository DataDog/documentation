---
title: RUM エラー追跡
kind: ドキュメント
beta: true
further_reading:
  - link: /real_user_monitoring/error_tracking/explorer
    tag: Documentation
    text: RUM Error Tracking Explorer
  - link: 'https://app.datadoghq.com/error-tracking'
    tag: UI
    text: エラー追跡
---
{{< site-region region="eu" >}}

<div class="alert alert-warning"> EU リージョンは、現在 Error Tracking の対象外です。フィードバックまたはご質問は、<a href="/help">Datadog サポート</a>までお問い合わせください。</div>

{{< /site-region >}}

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

1. [RUM Browser SDK][2] のバージョン `v1.11.5+` をダウンロードします。
2. [SDK の初期化時][3]に、__version__、__env__、__service__ を構成します。

### マッピングファイルのアップロード

一部のアプリケーションのソースコードは、実稼働用にデプロイされるときにパフォーマンスの最適化およびセキュリティの観点から難読化または縮小されます。
その結果、そのようなアプリケーションで発生したエラーのスタックトレースも難読化され、特定のエラーの原因となっているコード行やファイルを理解するために使用できないため、トラブルシューティングのプロセスが難航することになります。

Datadog では、ソースマップを安全にアップロードして、スタックトレースの難読化を解除できます。

#### Javascript ソースマップ

ソースマップは、Javascript のソースコードを縮小する際に生成されるマッピングファイルです。このマッピングファイルをビルドディレクトリからアップロードするために、[Datadog CLI][4] を使用できます（ビルドディレクトリとそのサブディレクトリをスキャンして、関連する縮小化ファイルとともにソースマップを自動的にアップロード）。CI パイプラインから、ソースマップを直接アップロードします。

1. `package.json` ファイルに `@datadog/datadog-ci` を追加します。CLI の `v0.5.2` バージョン以降を使用する必要があります。
2. `DATADOG_API_KEY` という名の環境変数として、Datadog API キーをエクスポートします。
3. 次のコマンドを実行します。
   {{< code-block lang="curl">}}datadog-ci sourcemaps upload /path/to/build/directory \
  --service=my-service \
  --release-version=v35.2395005 \
  --minified-path-prefix=https://hostname.com/static/js{{< /code-block >}}

CLI パラメーターの詳細については、[公式 Github リポジトリ][5]を参照してください。

<div class="alert alert-warning"><strong>関連ソースコードを直接含むソースマップ</strong>を作成するには、Javascript bundler を構成する必要があります。アップロードする前に、ソースマップ内の <code>sourcesContent</code> 属性が空でないことを確認してください。</div>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/real_user_monitoring/data_collected/error#error-origins
[2]: https://www.npmjs.com/package/@datadog/browser-rum
[3]: /ja/real_user_monitoring/installation/?tab=us#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps