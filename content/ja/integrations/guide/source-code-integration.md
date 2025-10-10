---
description: APM と統合するソースコードインテグレーションを設定して、テレメトリーをリポジトリとリンクし、CI パイプラインのアーティファクトに git
  情報を埋め込み、GitHub インテグレーションを使用してインラインコードスニペットを生成します。
further_reading:
- link: /integrations/github/
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: /tracing/error_tracking/
  tag: ドキュメント
  text: バックエンドサービスのエラー追跡について
- link: /profiler/
  tag: ドキュメント
  text: Continuous Profiler について
- link: /serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
  tag: ドキュメント
  text: サーバーレスモニタリングについて
- link: /tests/developer_workflows/
  tag: ドキュメント
  text: Test Optimization について
- link: /code_analysis/
  tag: ドキュメント
  text: Code Analysis について
- link: /security/application_security/
  tag: ドキュメント
  text: Application Security Monitoring について
- link: /logs/error_tracking/
  tag: ドキュメント
  text: ログの Error Tracking について
- link: https://www.datadoghq.com/blog/live-debugging/
  tag: ブログ
  text: Datadog Live Debugging で本番環境のバグを効率的に修正
title: Datadog ソースコードインテグレーション
---

## 概要

Datadog のソースコードインテグレーションを使って、テレメトリーを Git リポジトリと連携させ、関連するソースコード行にアクセスしてスタックトレースやスロープロファイルなどの問題をデバッグできます。

{{< img src="integrations/guide/source_code_integration/inline-code-snippet.png" alt="Java RuntimeException のインラインコードスニペットと GitHub でコードを見るためのボタン" style="width:100%;">}}


## セットアップ

Datadog Agent v7.35.0 以降が必要です。

[APM][6] をすでに設定している場合は、[**Integrations** > **Link Source Code**][7] に移動し、バックエンドサービスのソースコードインテグレーションを構成してください。

## テレメトリーに Git 情報をタグ付け

テレメトリーには、実行中のアプリケーションのバージョンを特定のリポジトリやコミットと結びつける Git 情報をタグ付けする必要があります。

サポートされている言語については、Datadog はデプロイされたアーティファクトに [Git 情報を埋め込む](#embed-git-information-in-your-build-artifacts)ことを推奨しています。この情報は [Datadog トレーシングライブラリ][9]によって自動的に抽出されます。

その他の言語や構成については、自身で[テレメトリータギングを構成する](#configure-telemetry-tagging)ことができます。

### ビルドアーティファクトに Git 情報を埋め込む

リポジトリの URL とコミットハッシュをビルドアーティファクトに埋め込むことができます。[Datadog トレーシングライブラリ][9]はこの情報を使用して、APM サービスのテレメトリーに適切なタグを自動的に追加します。

git 情報の埋め込みに対応している言語を、次の中から 1 つ選択します。

{{< tabs >}}
{{% tab "Go" %}}

Go クライアントライブラリのバージョン 1.48.0 以降が必要です。

#### コンテナ

Docker コンテナを使用している場合、Docker を使用する、Datadog トレーシングライブラリを使用する、または `DD_GIT_*` 環境変数でアプリケーションを構成するの 3 つのオプションがあります。

##### オプション 1: Docker

{{% sci-docker %}}

##### オプション 2: Datadog トレーシングライブラリ

{{% sci-dd-tracing-library %}}

##### オプション 3: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

#### サーバーレス

サーバーレスを使用している場合、サーバーレスアプリケーションのセットアップに応じて 3 つのオプションがあります。

##### オプション 1: Datadog ツール

{{% sci-dd-serverless %}}

##### オプション 2: Datadog トレーシングライブラリ

{{% sci-dd-tracing-library %}}

##### オプション 3: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

#### ホスト

ホストを使用している場合、2 つのオプションがあります。

##### オプション 1: Datadog トレーシングライブラリ

{{% sci-dd-tracing-library %}}

##### オプション 2: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

[101]: https://tip.golang.org/doc/go1.18
[102]: https://www.npmjs.com/package/@datadog/datadog-ci
[103]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/plugin/
[104]: https://github.com/DataDog/datadog-cdk-constructs

{{% /tab %}}

{{% tab "Python" %}}

<div class="alert alert-info">Python クライアントライブラリのバージョン 1.12.0 以降が必要です。</div>

#### コンテナ

Docker コンテナを使用している場合、Docker を使用する、Datadog トレーシングライブラリを使用する、または `DD_GIT_*` 環境変数でアプリケーションを構成するの 3 つのオプションがあります。

##### オプション 1: Docker

{{% sci-docker %}}

##### オプション 2: Setuptools または Unified Python プロジェクト設定ファイル

{{% sci-dd-setuptools-unified-python %}}

##### オプション 3: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

[101]: https://github.com/DataDog/dd-trace-go
[102]: https://github.com/DataDog/hatch-datadog-build-metadata#readme

#### サーバーレス

サーバーレスを使用している場合、サーバーレスアプリケーションのセットアップに応じて 3 つのオプションがあります。

##### オプション 1: Datadog ツール

{{% sci-dd-serverless %}}

##### オプション 2: Setuptools または Unified Python プロジェクト設定ファイル

{{% sci-dd-setuptools-unified-python %}}

##### オプション 3: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

#### ホスト

ホストを使用している場合、2 つのオプションがあります。

##### オプション 1: Setuptools または Unified Python プロジェクト設定ファイル

{{% sci-dd-setuptools-unified-python %}}

##### オプション 2: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab ".NET" %}}

<div class="alert alert-info">.NET クライアントライブラリのバージョン 2.24.1 以降が必要です。</div>

まず、`.pdb` ファイルが .NET アセンブリ (`.dll` または `.exe`) と同じフォルダにデプロイされていることを確認してください。
その後、特定のデプロイメントモデルに応じて、残りの手順に従ってください。

#### コンテナ

Docker コンテナを使用しえいる場合、Docker を使用する、Microsoft SourceLink を使用する、または `DD_GIT_*` 環境変数でアプリケーションを構成するの 3 つのオプションがあります。

##### オプション 1: Docker

{{% sci-docker %}}

##### オプション 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### オプション 3: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

#### サーバーレス

サーバーレスを使用している場合、サーバーレスアプリケーションのセットアップに応じて 3 つのオプションがあります。

##### オプション 1: Datadog ツール

{{% sci-dd-serverless %}}

##### オプション 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### オプション 3: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

#### ホスト

ホストを使用している場合、Microsoft SourceLink を使用するか、`DD_GIT_*` 環境変数でアプリケーションを構成するかの 2 つのオプションがあります。

##### オプション 1: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### オプション 2: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "Node.js" %}}

<div class="alert alert-info">
Node.js クライアントライブラリのバージョン 3.21.0 以降が必要です。
</br>
</br>
TypeScript アプリケーションでコードリンクやスニペットを表示するには、以下のオプションを付けて Node アプリケーションを実行する必要があります。
</br>
<a href="https://nodejs.org/dist/v12.22.12/docs/api/cli.html#cli_enable_source_maps"><code>--enable-source-maps</code></a>.
</div>

#### コンテナ

Docker コンテナを使用している場合、Docker を使用する、または `DD_GIT_*` 環境変数でアプリケーションを構成するの 2 つのオプションがあります。

##### オプション 1: Docker

{{% sci-docker %}}

##### オプション 2: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

#### サーバーレス

サーバーレスを使用している場合、サーバーレスアプリケーションのセットアップに応じて 2 つのオプションがあります。

##### オプション 1: Datadog ツール

{{% sci-dd-serverless %}}

##### オプション 2: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

#### ホスト

ホストを使用している場合、`DD_GIT_*` 環境変数でアプリケーションを構成します。

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "Ruby" %}}

<div class="alert alert-info">Ruby クライアントライブラリのバージョン 1.6.0 以降が必要です。</div>

#### コンテナ

Docker コンテナを使用している場合、Docker を使用する、または `DD_TAGS` 環境変数でアプリケーションを構成するの 2 つのオプションがあります。

##### オプション 1: Docker

{{% sci-docker-ddtags %}}

##### オプション 2: `DD_TAGS` 環境変数

{{% sci-dd-tags-env-variable %}}

#### サーバーレス

サーバーレスを使用している場合、サーバーレスアプリケーションのセットアップに応じて 2 つのオプションがあります。

##### オプション 1: Datadog ツール

{{% sci-dd-serverless %}}

##### オプション 2: `DD_TAGS` 環境変数

{{% sci-dd-tags-env-variable %}}

#### ホスト

ホストを使用している場合、`DD_TAGS` 環境変数でアプリケーションを構成します。

{{% sci-dd-tags-env-variable %}}

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-info">Java クライアントライブラリのバージョン 1.12.0 以降が必要です。</div>

#### コンテナ

Docker コンテナを使用している場合、Docker を使用する、または `DD_GIT_*` 環境変数でアプリケーションを構成するの 2 つのオプションがあります。

##### オプション 1: Docker

{{% sci-docker %}}

##### オプション 2: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

#### サーバーレス

サーバーレスを使用している場合、サーバーレスアプリケーションのセットアップに応じて 2 つのオプションがあります。

##### オプション 1: Datadog ツール

{{% sci-dd-serverless %}}

##### オプション 2: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

#### ホスト

ホストを使用している場合、`DD_GIT_*` 環境変数でアプリケーションを構成します。

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-info">PHP クライアントライブラリのバージョン 1.12.0 以降が必要です。</div>

#### コンテナ

Docker コンテナを使用している場合、Docker を使用する、または `DD_GIT_*` 環境変数でアプリケーションを構成するの 2 つのオプションがあります。

##### オプション 1: Docker

{{% sci-docker %}}

##### オプション 2: `DD_GIT_*` 環境変数

{{% sci-dd-git-env-variables %}}

#### ホスト

ホストを使用している場合、`DD_GIT_*` 環境変数でアプリケーションを構成します。

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{< /tabs >}}

### Docker コンテナ内でのビルド

ビルドプロセスが Docker コンテナ内の CI で実行される場合は、ビルドが Git 情報にアクセスできるように以下の手順を実行します。

1. 次のテキストを `.dockerignore` ファイルに追加します。これにより、ビルドプロセスが `.git` フォルダのサブセットにアクセスできるようになり、git のコミットハッシュとリポジトリの URL を特定できるようになります。

   ```
   !.git/HEAD
   !.git/config
   !.git/refs
   ```

2. 以下のコードを `Dockerfile` に追加してください。実際のビルドが実行される前に配置されていることを確認してください。

   ```
   COPY .git ./.git
   ```

### テレメトリータギングの構成

サポートされていない言語の場合、`git.commit.sha` タグと `git.repository_url` タグを使用してデータを特定のコミットにリンクします。`git.repository_url` タグにプロトコルが含まれないことを確認してください。例えば、リポジトリの URL が `https://github.com/example/repo` の場合、`git.repository_url` タグの値は `github.com/example/repo` となります。

## リポジトリのメタデータを同期

テレメトリーとソースコードをリンクさせるには、リポジトリのメタデータを Datadog と同期させる必要があります。Datadog はリポジトリ内のファイルの実際の内容は保存せず、Git のコミットオブジェクトとツリーオブジェクトのみを保存します。

### Git プロバイダー

ソースコードインテグレーションは、以下の Git プロバイダーをサポートしています。

| プロバイダー | Context Links Support | Code Snippets Support |
|---|---|---|
| GitHub SaaS (github.com) | はい | はい |
| GitHub Enterprise Server | はい | はい |
| GitLab SaaS (gitlab.com) | はい | はい |
| GitLab self-managed | はい | いいえ |
| Bitbucket | はい | いいえ |
| Azure DevOps サービス | はい | いいえ |
| Azure DevOps Server | はい | いいえ |

{{< tabs >}}
{{% tab "GitHub" %}}

Datadog の [GitHub インテグレーション][101]を [GitHub インテグレーションタイル][102]にインストールして、リポジトリのメタデータを Datadog が自動的に同期できるようにします。インテグレーションタイルで権限を指定する場合、少なくとも **Contents** の **Read** 権限を選択してください。

GitHub インテグレーションを設定することで、[**Error Tracking**][103]、[**Continuous Profiler**][104]、[**Serverless Monitoring**][105]、[**CI Visibility**][106]、[**Application Security Monitoring**][107] でインラインコードスニペットを確認することもできます。

[101]: https://docs.datadoghq.com/ja/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/
[103]: /ja/logs/error_tracking/backend/?tab=serilog#setup
[104]: /ja/integrations/guide/source-code-integration/?tab=continuousprofiler#links-to-git-providers
[105]: /ja/serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
[106]: /ja/tests/developer_workflows/#open-tests-in-github-and-your-ide
[107]: /ja/security/application_security/

{{% /tab %}}
{{% tab "GitLab" %}}

<div class="alert alert-danger">
セルフマネージド GitLab インスタンスからのリポジトリは、ソースコードインテグレーションではすぐに使えません。この機能を有効にするには、<a href="/help">サポートにお問い合わせください</a>。
</div>

テレメトリーをソースコードとリンクさせるには、リポジトリのメタデータを [`datadog-ci git-metadata upload`][2] コマンドでアップロードします。`datadog-ci v2.10.0` 以降が必要です。

Git リポジトリ内で `datadog-ci git-metadata upload` を実行すると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、そして追跡したファイルのパスのリストを受け取ります。

このコマンドは、Datadog と同期する必要があるコミットごとに実行します。

[gitlab.com][1] を使用している場合、これにより [**Error Tracking**][3]、[**Continuous Profiler**][4]、[**Serverless Monitoring**][5]、[**CI Visibility**][6]、および [**Application Security Monitoring**][7] でインラインコードスニペットを確認することができます。

### 検証

データが収集されていることを確認するために、CI パイプラインで `datadog-ci git-metadata upload` を実行します。

以下のような出力が期待できます。

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://gitlab.com
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[3]: /ja/logs/error_tracking/backend/?tab=serilog#setup
[4]: /ja/integrations/guide/source-code-integration/?tab=continuousprofiler#links-to-git-providers
[5]: /ja/serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
[6]: /ja/tests/developer_workflows/#open-tests-in-github-and-your-ide
[7]: /ja/security/application_security/

{{% /tab %}}
{{% tab "その他の Git プロバイダー" %}}

<div class="alert alert-danger">
セルフホストインスタンスまたはプライベート URL 上のリポジトリは、ソースコードインテグレーションではすぐに使えません。この機能を有効にするには、<a href="/help">サポートにお問い合わせください</a>。
</div>

テレメトリーをソースコードとリンクさせるには、リポジトリのメタデータを [`datadog-ci git-metadata upload`][1] コマンドでアップロードします。`datadog-ci v2.10.0` 以降が必要です。

Git リポジトリ内で `datadog-ci git-metadata upload` を実行すると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、そして追跡したファイルのパスのリストを受け取ります。

このコマンドは、Datadog と同期する必要があるコミットごとに実行します。

### 検証

データが収集されていることを確認するために、CI パイプラインで `datadog-ci git-metadata upload` を実行します。

以下のような出力が期待できます。

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## 使用方法

### Git プロバイダーへのリンク

{{< tabs >}}
{{% tab "エラー追跡" %}}
[エラー追跡][1]でスタックフレームからソースリポジトリへのリンクを見ることができます。

1. [**APM** > **Error Tracking**][2] の順に移動します。
2. 課題をクリックします。右側に **Issue Details** パネルが表示されます。
3. **Latest Event** の下で、フレームの右側にある **View** ボタンをクリックするか、**View file**、**View Git blame**、**View commit** を選択すると、ソースコード管理ツールにリダイレクトされます。

{{< img src="integrations/guide/source_code_integration/error-tracking-panel-full.png" alt="Error Tracking のエラースタックトレースの右側に表示される、3 つのオプション (ファイルの表示、注釈の表示、コミットの表示) を備えたリポジトリの表示ボタンと、スタックトレース内のインラインコードスニペット" style="width:100%;">}}

GitHub インテグレーションを使用している場合、または GitLab SaaS インスタンス (gitlab.com) でリポジトリをホストしている場合は、スタックフレームの **Connect to preview** をクリックします。スタックトレースでインラインコードスニペットを直接見ることができます。

[1]: /ja/tracing/error_tracking/
[2]: https://app.datadoghq.com/apm/error-tracking

{{% /tab %}}
{{% tab "Continuous Profiler" %}}

[Continuous Profiler][1] では、プロファイルフレームのソースコードプレビューを見ることができます。

1. [**APM** > **Profile Search**][2] の順に移動します。
2. フレームグラフのメソッドにカーソルを合わせます。
3. 必要であれば、`Opt` または `Alt` を押してプレビューを有効にします。

{{< img src="integration/guide/source_code_integration/profiler-source-code-preview.png" alt="Continuous Profiler のソースコードプレビュー" style="width:100%;">}}

プロファイルフレームからソースリポジトリへのリンクも表示できます。これは、行、メソッド、ファイルごとに分割されたプロファイルでサポートされています。

1. [**APM** > **Profile Search**][2] の順に移動します。
2. フレームグラフのメソッドにカーソルを合わせます。右側に **More actions** というラベルのついたケバブアイコンが表示されます。
3. *More actions** > **View in repo** をクリックし、トレースをソースコードリポジトリで開きます。

{{< img src="integrations/guide/source_code_integration/profiler-link-to-git.png" alt="Continuous Profiler から GitHub へのリンク" style="width:100%;">}}

[1]: /ja/profiler/
[2]: https://app.datadoghq.com/profiling/explorer
{{% /tab %}}
{{% tab "Serverless Monitoring" %}}

Lambda 関数の関連するスタックトレースのエラーからソースリポジトリへのリンクを **Serverless Monitoring** で確認できます。

1. [**Infrastructure** > **Serverless**][101] に移動し、**AWS** タブをクリックします。
2. Lambda 関数をクリックし、関連するスタックトレースを持つ呼び出しの **Open Trace** ボタンをクリックします。
3. **View Code** をクリックして、ソースコードリポジトリでエラーを開きます。

GitHub インテグレーションを使用している場合、エラーフレームで **Connect to preview** をクリックします。Lambda 関数のスタックトレースでインラインコードスニペットを直接見ることができます。

{{< img src="integration/guide/source_code_integration/serverless-aws-function-errors.mp4" alt="Serverless Monitoring から GitHub へのリンク" video="true" >}}

[101]: https://app.datadoghq.com/functions?cloud=aws&entity_view=lambda_functions

{{% /tab %}}
{{% tab "Test Optimization" %}}

失敗したテスト実行からソースリポジトリへのリンクは、**Test Optimization** で確認できます。

1. [**Software Delivery** > **Test Optimization** > **Test Runs**][101] に移動し、失敗したテスト実行を選択します。
2. **View on GitHub** ボタンをクリックして、テストをソースコードリポジトリで開きます。

{{< img src="integration/guide/source_code_integration/test_run_blurred.png" alt="CI Visibility Explorer から GitHub へのリンク" style="width:100%;">}}

詳細は [Datadog で開発者のワークフローを強化する][102]を参照してください。

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /ja/tests/developer_workflows/#open-tests-in-github-and-your-ide

{{% /tab %}}
{{% tab "Code Analysis" %}}

失敗した Static Analysis と Software Composition Analysis のスキャンからソースリポジトリへのリンクは、**Code Analysis** で確認できます。

1. [**Software Delivery** > **Code Analysis**][101] に移動し、リポジトリを選択します。
2. **Code Vulnerabilities** または **Code Quality** ビューで、コードの脆弱性または違反をクリックします。**Details** セクションで、**View Code** ボタンをクリックして、フラグが付けられたコードをソースコードリポジトリで開きます。

{{< img src="integration/guide/source_code_integration/code-analysis-scan.png" alt="Code Analysis Code Vulnerabilities ビューから GitHub へのリンク" style="width:100%;">}}

詳細については、[Code Analysis のドキュメント][102]を参照してください。

[101]: https://app.datadoghq.com/ci/code-analysis
[102]: /ja/code_analysis/

{{% /tab %}}
{{% tab "Application Security Monitoring" %}}

セキュリティシグナルの関連するスタックトレースのエラーからソースリポジトリへのリンクは、**Application Security Monitoring** で確認できます。

1. [**Security** > **Application Security**][101] に移動し、セキュリティシグナルを選択します。
2. **Related Signals** タブの **Traces** セクションまでスクロールダウンし、関連するスタックトレースをクリックします。
3. **View Code** をクリックして、ソースコードリポジトリでエラーを開きます。

GitHub インテグレーションを使用している場合、エラーフレームで **Connect to preview** をクリックします。インラインコードスニペットをセキュリティシグナルのスタックトレースで直接見ることができます。

{{< img src="integration/guide/source_code_integration/asm-signal-trace-blur.png" alt="Application Security Monitoring から GitHub へのリンク" style="width:100%;">}}

[101]: https://app.datadoghq.com/security/appsec

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/error-tracking
[2]: https://app.datadoghq.com/integrations/github/
[3]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps
[5]: /ja/integrations/github/
[6]: /ja/tracing/
[7]: https://app.datadoghq.com/source-code/setup/apm
[8]: /ja/tracing/error_tracking/
[9]: /ja/tracing/trace_collection/dd_libraries/