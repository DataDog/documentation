---
title: JUnit テストレポートファイルを Datadog にアップロードする
kind: documentation
further_reading:
  - link: /continuous_integration/explore_tests
    tag: ドキュメント
    text: テスト結果とパフォーマンスを調べる
  - link: /continuous_integration/troubleshooting/
    tag: ドキュメント
    text: トラブルシューティング CI
---
{{< site-region region="us,eu" >}}
JUnit テストレポートファイルは、テスト名とスイート名、合格/不合格ステータス、期間、場合によってはエラーログなどのテスト実行情報を含む XML ファイルです。[JUnit][1] テストフレームワークによって導入されましたが、他の多くの一般的なフレームワークは、この形式を使用して結果を出力できます。

最も包括的なテスト結果を提供するため推奨されるオプションである Datadog トレーサーを使用してネイティブにテストをインスツルメントする代わりに、JUnit XML テストレポートをアップロードすることもできます。

JUnit XML レポートからインポートされたテスト結果は、トレーサーによってレポートされたテストデータと一緒に表示されます。ただし、この方法を使用する場合は、インテグレーションテストや構造化スタックトレースに分散型トレースがないなど、いくつかの制限があります。このため、この方法は、使用されている言語またはテストフレームワークのネイティブサポートがない場合にのみ使用してください。

## Datadog CI CLI のインストール

`npm` を使用して [`datadog-ci`][2] CLI をグローバルにインストールします。

{{< code-block lang="bash" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

## テストレポートのアップロード

JUnit XML テストレポートを Datadog にアップロードするには、次のコマンドを実行し、`--service` パラメーターを使用してテストされたサービスまたはライブラリの名前と、XML レポートファイルまたはそれらを含むディレクトリへの 1 つ以上のファイルパスを指定します。

{{< code-block lang="bash" >}}
datadog-ci junit upload --service <service_name> <path> [<path> ...]
{{< /code-block >}}

`DATADOG_API_KEY` 環境変数に有効な [Datadog API キー][3]を指定し、`DD_ENV` 環境変数にテストが実行された環境を指定します (たとえば、開発者ワークステーションから結果をアップロードする場合は `local`、CI プロバイダーから結果をアップロードする場合は `ci`)。例:

{{< site-region region="us" >}}
{{< code-block lang="bash" >}}
DD_ENV=ci DATADOG_API_KEY=<api_key> datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="eu" >}}
{{< code-block lang="bash" >}}
DD_ENV=ci DATADOG_API_KEY=<api_key> DATADOG_SITE=datadoghq.eu datadog-ci junit upload \
  --service my-api-service \
  unit-tests/junit-reports e2e-tests/single-report.xml
{{< /code-block >}}
{{< /site-region >}}

## コンフィギュレーション設定

これは、`datadog-ci junit upload` コマンドを使用するときに使用できるオプションの完全なリストです。

`--service` (必須)
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**例**: `my-api-service`

`--env`
: テストが実行された環境。<br/>
**環境変数**: `DD_ENV`<br/>
**例**: `ci`

`--tags`
: すべてのテストにアタッチされる `key:value` 形式のキーと値のペア (`--tags` パラメーターは複数回指定できます)。`DD_TAGS` を使用してタグを指定する場合は、カンマを使用してタグを区切ります (例: `team:backend,priority:high`)。<br/>
**環境変数**: `DD_TAGS`<br/>
**デフォルト**: (none)<br/>
**例**: `team:backend`<br/>
**注**: `--tags` と `DD_TAGS` 環境変数を使用して指定されたタグがマージされます。`--tags` と `DD_TAGS` の両方に同じキーが表示される場合、環境変数 `DD_TAGS` の値が優先されます。

`--max-concurrency`
: API への同時アップロードの数。<br/>
**デフォルト**: `20`

`--dry-run`
: 実際にファイルを Datadog にアップロードせずにコマンドを実行します。他のすべてのチェックが実行されます。<br/>
**デフォルト**: `false`

位置引数
: JUnit XML レポートが配置されているファイルパスまたはディレクトリ。ディレクトリを渡すと、CLI はその中のすべての `.xml` ファイルを検索します。

次の環境変数がサポートされています。

`DATADOG_API_KEY` (必須)
: リクエストの認証に使用される [Datadog API キー][3]。<br/>
**デフォルト**: (なし)


{{< site-region region="eu" >}}
さらに、選択したサイトを使用するように Datadog サイトを構成します ({{< region-param key="dd_site_name" >}}):

`DATADOG_SITE` (必須)
: 結果をアップロードする [Datadog サイト][1]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

[1]: /ja/getting_started/site/
{{< /site-region >}}


## リポジトリの収集とメタデータのコミット

Datadog CI CLI は、git リポジトリを抽出し、CI プロバイダーの環境変数とローカルの `.git` ディレクトリからメタデータをコミットして、テスト実行にアタッチしようとします。このディレクトリを読み取るには、[`git`][4] バイナリが必要です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://junit.org/junit5/
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://git-scm.com/downloads
{{< /site-region >}}
{{< site-region region="us3,gov" >}}
選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) は、現時点ではサポートされていません。
{{< /site-region >}}