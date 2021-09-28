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

## 互換性

サポートされている CI プロバイダー:
* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

## Datadog CI CLI のインストール

`@datadog/datadog-ci` CLI をインストールします:

{{< code-block lang="bash" >}}
yarn global add @datadog/datadog-ci
{{< /code-block >}}

## テストレポートのアップロード

JUnit XML テストレポートを Datadog にアップロードするには:

{{< code-block lang="bash" >}}
datadog-ci junit upload [--service] [--tags] [--max-concurrency] [--dry-run] <paths>
{{< /code-block >}}

例:

{{< code-block lang="bash" >}}
datadog-ci junit upload --service my-service \
  --tags key1:value1 --tags key2:value2 \
  unit-tests/junit-reports acceptance-tests/junit-reports e2e-tests/single-report.xml
{{< /code-block >}}

`--service`
: JUnit XML レポートをアップロードするサービスの名前。<br>
**デフォルト**: `DD_SERVICE` 環境変数値。

`--tags`
: `key:value` の形式のキーと値のペアの配列。これにより、すべてのスパンに適用されるグローバルタグが設定されます。結果の辞書は、`DD_TAGS` 環境変数の内容とマージされます。`key` が `--tags` と `DD_TAGS` の両方にある場合、`DD_TAGS` の値が優先されます。

`--max-concurrency`
: API への同時アップロードの数。<br>
**デフォルト**: `20`

`--dry-run`
: 最終アップロードステップなしでコマンドを実行します。他のすべてのチェックが実行されます。<br>
**デフォルト**: `false`

位置引数 
: JUnit XML レポートが配置されているファイルパスまたはディレクトリ。ディレクトリを渡すと、CLI はその中のすべての `.xml` ファイルを検索します。


## 環境変数

次の環境変数を使用して `junit` コマンドを構成します。

`DATADOG_API_KEY` (必須)
: リクエストの認証に使用される API キー。

`DD_ENV`
: テスト結果を表示する環境。

`DD_SERVICE`
: `--service` でサービスを指定していない場合は、この環境変数を使用して指定できます。

`DD_TAGS`
: `key1:value1,key2:value2` の形式ですべてのスパンに適用されるグローバルタグ。結果の辞書は、`--tags` パラメーターの内容とマージされます。`key` が `--tags` と `DD_TAGS` の両方にある場合、`DD_TAGS` の値が優先されます。

`DATADOG_SITE`
: アップロードする Datadog サイト。たとえば、`datadoghq.com` または `datadoghq.eu` です。

## オプションの依存関係

- [`git`][1] は、リポジトリのメタデータを抽出するために使用されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://git-scm.com/downloads
