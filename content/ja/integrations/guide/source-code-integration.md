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
  text: Test Visibility について
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
{{% tab "NodeJS" %}}

<div class="alert alert-info">NodeJS クライアントライブラリのバージョン 3.21.0 以降が必要です。</div>

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

<div class="alert alert-info">The PHP client library version 1.2.0 or later is required.</div>

If you are using Docker containers, you have two options: using Docker or configuring your application with  `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Host

If you are using a host, configure your application with `DD_GIT_*` environment variables.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{< /tabs >}}

### Build inside a Docker container

If your build process is executed in CI within a Docker container, perform the following steps to ensure that the build can access Git information:

1. Add the following text to your `.dockerignore` file. This ensures that the build process is able to access a subset of the `.git` folder, enabling it to determine the git commit hash and repository URL.

   ```
   !.git/HEAD
   !.git/config
   !.git/refs
   ```

2. Add the following line of code to your `Dockerfile`. Ensure that it is placed before the actual build is ran.

   ```
   COPY .git ./.git
   ```

### Configure telemetry tagging

For unsupported languages, use the `git.commit.sha` and `git.repository_url` tags to link data to a specific commit. Ensure that the `git.repository_url` tag does not contain protocols. For example, if your repository URL is `https://github.com/example/repo`, the value for the `git.repository_url` tag should be `github.com/example/repo`.

## Synchronize your repository metadata

To link your telemetry with source code, your repository metadata must be synchronized to Datadog. Datadog doesn't store the actual content of files in your repository, only the Git commit and tree objects.

### Git providers

The source code integration supports the following Git providers:

| Provider | Context Links Support | Code Snippets Support |
|---|---|---|
| GitHub SaaS (github.com) | Yes | Yes |
| GitHub Enterprise Server | Yes | Yes |
| GitLab SaaS (gitlab.com) | Yes | Yes |
| GitLab self-managed | Yes | No |
| Bitbucket | Yes | No |
| Azure DevOps Services | Yes | No |
| Azure DevOps Server | Yes | No |

{{< tabs >}}
{{% tab "GitHub" %}}

Install Datadog's [GitHub integration][101] on the [GitHub integration tile][102] to allow Datadog to synchronize your repository metadata automatically. When specifying permissions on the integration tile, select at least **Read** permissions for **Contents**.

Setting up the GitHub integration also allows you to see inline code snippets in [**Error Tracking**][103], [**Continuous Profiler**][104], [**Serverless Monitoring**][105], [**CI Visibility**][106], and [**Application Security Monitoring**][107].

[101]: https://docs.datadoghq.com/ja/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/
[103]: /ja/logs/error_tracking/backend/?tab=serilog#setup
[104]: /ja/integrations/guide/source-code-integration/?tab=continuousprofiler#links-to-git-providers
[105]: /ja/serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
[106]: /ja/tests/developer_workflows/#open-tests-in-github-and-your-ide
[107]: /ja/security/application_security/

{{% /tab %}}
{{% tab "GitLab" %}}

<div class="alert alert-warning">
Repositories from self-managed GitLab instances are not supported out-of-the-box by the source code integration. To enable this feature, <a href="/help">contact Support</a>.
</div>

To link telemetry with your source code, upload your repository metadata with the [`datadog-ci git-metadata upload`][2] command.

Git リポジトリ内で `datadog-ci git-metadata upload` を実行すると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、そして追跡したファイルのパスのリストを受け取ります。

このコマンドは、Datadog と同期する必要があるコミットごとに実行します。

If you are using [gitlab.com][1], this also allows you to see inline code snippets in [**Error Tracking**][3], [**Continuous Profiler**][4], [**Serverless Monitoring**][5], [**CI Visibility**][6], and [**Application Security Monitoring**][7].

### Validation

To ensure the data is being collected, run `datadog-ci git-metadata upload` in your CI pipeline.

You can expect to see the following output:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://gitlab.com
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[3]: /ja/logs/error_tracking/backend/?tab=serilog#setup
[4]: /ja/integrations/guide/source-code-integration/?tab=continuousprofiler#links-to-git-providers
[5]: /ja/serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
[6]: /ja/tests/developer_workflows/#open-tests-in-github-and-your-ide
[7]: /ja/security/application_security/

{{% /tab %}}
{{% tab "Other Git Providers" %}}

<div class="alert alert-warning">
Repositories on self-hosted instances or private URLs are not supported out-of-the-box by the source code integration. To enable this feature, <a href="/help">contact Support</a>.
</div>

To link telemetry with your source code, upload your repository metadata with the [`datadog-ci git-metadata upload`][1] command.

When you run `datadog-ci git-metadata upload` within a Git repository, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

Run this command for every commit that you need to be synchronized with Datadog.

### Validation

To ensure the data is being collected, run `datadog-ci git-metadata upload` in your CI pipeline.

You can expect to see the following output:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## Usage

### Links to Git providers

{{< tabs >}}
{{% tab "Error Tracking" %}}
You can see links from stack frames to their source repository in [Error Tracking][1].

1. Navigate to [**APM** > **Error Tracking**][2].
2. Click on an issue. The **Issue Details** panel appears on the right.
3. Under **Latest Event**, click the **View** button on the right of a frame or select **View file**, **View Git blame**, or **View commit** to be redirected to your source code management tool.

{{< img src="integrations/guide/source_code_integration/error-tracking-panel-full.png" alt="A view repository button with three options (view file, view blame, and view commit) available on the right side of an error stack trace in Error Tracking, along with inline code snippets in the stack trace" style="width:100%;">}}

If you're using the GitHub integration, or if you're hosting your repositories on the GitLab SaaS instance (gitlab.com), click **Connect to preview** on stack frames. You can see inline code snippets directly in the stack trace.

[1]: /ja/tracing/error_tracking/
[2]: https://app.datadoghq.com/apm/error-tracking

{{% /tab %}}
{{% tab "Continuous Profiler" %}}

You can see a source code preview for profile frames in the [Continuous Profiler][1].

1. Navigate to [**APM** > **Profile Search**][2].
2. Hover your cursor over a method in the flame graph.
3. If needed, press `Opt` or `Alt` to enable the preview.

{{< img src="integrations/guide/source_code_integration/profiler-source-code-preview.png" alt="Source code preview in the Continuous Profiler" style="width:100%;">}}

You can also see links from profile frames to their source repository. This is supported for profiles broken down by line, method, or file.

1. Navigate to [**APM** > **Profile Search**][2].
2. Hover your cursor over a method in the flame graph. A kebab icon with the **More actions** label appears on the right.
3. Click **More actions** > **View in repo** to open the trace in its source code repository.

{{< img src="integrations/guide/source_code_integration/profiler-link-to-git.png" alt="Link to GitHub from the Continuous Profiler" style="width:100%;">}}

[1]: /ja/profiler/
[2]: https://app.datadoghq.com/profiling/search
{{% /tab %}}
{{% tab "Serverless Monitoring" %}}

You can see links from errors in your Lambda functions' associated stack traces to their source repository in **Serverless Monitoring**.

1. Navigate to [**Infrastructure** > **Serverless**][101] and click on the **AWS** tab.
2. Click on a Lambda function and click the **Open Trace** button for an invocation with an associated stack trace.
3. Click **View Code** to open the error in its source code repository.

If you're using the GitHub integration, click **Connect to preview** on error frames. You can see inline code snippets directly in the Lambda function's stack trace.

{{< img src="integrations/guide/source_code_integration/serverless-aws-function-errors.mp4" alt="Link to GitHub from Serverless Monitoring" video="true" >}}

[101]: https://app.datadoghq.com/functions?cloud=aws&entity_view=lambda_functions

{{% /tab %}}
{{% tab "Test Visibility" %}}

You can see links from failed test runs to their source repository in **Test Visibility**.

1. Navigate to [**Software Delivery** > **Test Visibility** > **Test Runs**][101] and select a failed test run.
2. Click the **View on GitHub** button to open the test in its source code repository.

{{< img src="integrations/guide/source_code_integration/test_run_blurred.png" alt="Link to GitHub from the CI Visibility Explorer" style="width:100%;">}}

For more information, see [Enhancing Developer Workflows with Datadog][102].

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /ja/tests/developer_workflows/#open-tests-in-github-and-your-ide

{{% /tab %}}
{{% tab "Code Analysis" %}}

You can see links from failed Static Analysis and Software Composition Analysis scans to their source repository in **Code Analysis**.

1. Navigate to [**Software Delivery** > **Code Analysis**][101] and select a repository.
2. In the **Code Vulnerabilities** or **Code Quality** view, click on a code vulnerability or violation. In the **Details** section, click the **View Code** button to open the flagged code in its source code repository.

{{< img src="integrations/guide/source_code_integration/code-analysis-scan.png" alt="Link to GitHub from the Code Analysis Code Vulnerabilities view" style="width:100%;">}}

For more information, see the [Code Analysis documentation][102].

[101]: https://app.datadoghq.com/ci/code-analysis
[102]: /ja/code_analysis/

{{% /tab %}}
{{% tab "Application Security Monitoring" %}}

You can see links from errors in your security signals' associated stack traces to their source repository in **Application Security Monitoring**.

1. Navigate to [**Security** > **Application Security**][101] and select a security signal.
2. Scroll down to the **Traces** section on the **Related Signals** tab and click on an associated stack trace.
3. Click **View Code** to open the error in its source code repository.

If you're using the GitHub integration, click **Connect to preview** on error frames. You can see inline code snippets directly in the security signal's stack trace.

{{< img src="integrations/guide/source_code_integration/asm-signal-trace-blur.png" alt="Link to GitHub from Application Security Monitoring" style="width:100%;">}}

[101]: https://app.datadoghq.com/security/appsec

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/error-tracking
[2]: https://app.datadoghq.com/integrations/github/
[3]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps
[5]: /ja/integrations/github/
[6]: /ja/tracing/
[7]: https://app.datadoghq.com/source-code/setup/apm
[8]: /ja/tracing/error_tracking/
[9]: /ja/tracing/trace_collection/dd_libraries/