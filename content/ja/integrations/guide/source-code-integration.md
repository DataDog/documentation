---
description: Set up the source code integration that integrates with APM to link your
  telemetry with your repositories, embed git information into artifacts in your CI
  pipeline, and use the GitHub integration to generate inline code snippets.
further_reading:
- link: /integrations/github/
  tag: Documentation
  text: Learn about the GitHub Integration
- link: /tracing/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking for Backend Services
- link: /profiler/
  tag: Documentation
  text: Learn about the Continuous Profiler
- link: /serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
  tag: Documentation
  text: Learn about Serverless Monitoring
- link: /tests/developer_workflows/
  tag: Documentation
  text: Test Visibility について
- link: /code_analysis/
  tag: Documentation
  text: Code Analysis について
- link: /security/application_security/
  tag: Documentation
  text: Learn about Application Security Monitoring
- link: /logs/error_tracking/
  tag: ドキュメント
  text: Learn about Error Tracking for logs
- link: https://www.datadoghq.com/blog/live-debugging/
  tag: ブログ
  text: Fix production bugs efficiently with Datadog Live Debugging
title: Datadog Source Code Integration
---

## 概要

Datadog's source code integration allows you to connect your telemetry with your Git repositories. It allows debugging stack traces, slow profiles, and other issues by accessing the relevant lines of your source code.

{{< img src="integrations/guide/source_code_integration/inline-code-snippet.png" alt="Java RuntimeException のインラインコードスニペットと GitHub でコードを見るためのボタン" style="width:100%;">}}


## セットアップ

Datadog Agent v7.35.0 以降が必要です。

[APM][6] をすでに設定している場合は、[**Integrations** > **Link Source Code**][7] に移動し、バックエンドサービスのソースコードインテグレーションを構成してください。

## Tag your telemetry with Git information

Your telemetry must be tagged with Git information that ties the running application version with a particular repository and commit.

For supported languages, Datadog recommends [embedding Git information](#embed-git-information-in-your-build-artifacts) in the deployed artifacts, which is then extracted by the [Datadog Tracing Libraries][9] automatically.

For other languages and configurations, you can [configure telemetry tagging](#configure-telemetry-tagging) yourself.

### Embed Git information in your build artifacts

You can embed the repository URL and commit hash in your build artifact. The [Datadog Tracing Libraries][9] use this information to automatically add the right tags to your APM service telemetry.

git 情報の埋め込みに対応している言語を、次の中から 1 つ選択します。

{{< tabs >}}
{{% tab "Go" %}}

<div class="alert alert-info">The Go client library version 1.48.0 or later is required.</div>

#### コンテナ

If you are using Docker containers, you have three options: using Docker, using the Datadog tracing library, or configuring your application with `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: Datadog Tracing Library

{{% sci-dd-tracing-library %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### サーバーレス

If you are using Serverless, you have three options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: Datadog Tracing Library

{{% sci-dd-tracing-library %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### ホスト

If you are using a host, you have two options.

##### Option 1: Datadog Tracing Library

{{% sci-dd-tracing-library %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

[101]: https://tip.golang.org/doc/go1.18
[102]: https://www.npmjs.com/package/@datadog/datadog-ci
[103]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/plugin/
[104]: https://github.com/DataDog/datadog-cdk-constructs

{{% /tab %}}

{{% tab "Python" %}}

<div class="alert alert-info">The Python client library version 1.12.0 or later is required.</div>

#### コンテナ

If you are using Docker containers, you have three options: using Docker, using the Datadog tracing library, or configuring your application with `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: Setuptools or Unified Python Project Settings File

{{% sci-dd-setuptools-unified-python %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

[101]: https://github.com/DataDog/dd-trace-go
[102]: https://github.com/DataDog/hatch-datadog-build-metadata#readme

#### サーバーレス

If you are using Serverless, you have three options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: Setuptools or Unified Python Project Settings File

{{% sci-dd-setuptools-unified-python %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### ホスト

If you are using a host, you have two options.

##### Option 1: Setuptools or Unified Python Project Settings File

{{% sci-dd-setuptools-unified-python %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab ".NET" %}}

<div class="alert alert-info">The .NET client library version 2.24.1 or later is required.</div>

#### コンテナ

If you are using Docker containers, you have three options: using Docker, using Microsoft SourceLink, or configuring your application with `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### サーバーレス

If you are using Serverless, you have three options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### ホスト

ホストを使用している場合、Microsoft SourceLink を使用するか、`DD_GIT_*` 環境変数でアプリケーションを構成するかの 2 つのオプションがあります。

##### Option 1: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "NodeJS" %}}

<div class="alert alert-info">The NodeJS client library version 3.21.0 or later is required.</div>

#### コンテナ

If you are using Docker containers, you have two options: using Docker or configuring your application with `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### サーバーレス

If you are using Serverless, you have two options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### ホスト

If you are using a host, configure your application with `DD_GIT_*` environment variables.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "Ruby" %}}

<div class="alert alert-info">The Ruby client library version 1.6.0 or later is required.</div>

#### コンテナ

If you are using Docker containers, you have two options: using Docker or configuring your application with the `DD_TAGS` environment variable.

##### Option 1: Docker

{{% sci-docker-ddtags %}}

##### Option 2: `DD_TAGS` Environment Variable

{{% sci-dd-tags-env-variable %}}

#### サーバーレス

If you are using Serverless, you have two options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: `DD_TAGS` Environment Variable

{{% sci-dd-tags-env-variable %}}

#### ホスト

If you are using a host, configure your application with the `DD_TAGS` environment variable.

{{% sci-dd-tags-env-variable %}}

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-info">The Java client library version 1.12.0 or later is required.</div>

If you are using Docker containers, you have two options: using Docker or configuring your application with  `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### サーバーレス

If you are using Serverless, you have two options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### ホスト

If you are using a host, configure your application with `DD_GIT_*` environment variables.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{< /tabs >}}

### Docker コンテナ内でのビルド

If your build process is executed in CI within a Docker container, perform the following steps to ensure that the build can access Git information:

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

### Configure telemetry tagging

For unsupported languages, use the `git.commit.sha` and `git.repository_url` tags to link data to a specific commit. Ensure that the `git.repository_url` tag does not contain protocols. For example, if your repository URL is `https://github.com/example/repo`, the value for the `git.repository_url` tag should be `github.com/example/repo`.

## Synchronize your repository metadata

To link your telemetry with source code, your repository metadata must be synchronized to Datadog. Datadog doesn't store the actual content of files in your repository, only the Git commit and tree objects.

### Git providers

The source code integration supports the following Git providers:

| プロバイダー | Context Links Support | Code Snippets Support |
|---|---|---|
| GitHub SaaS (github.com) | はい | Yes |
| GitHub Enterprise Server | はい | Yes |
| GitLab SaaS (gitlab.com) | はい | はい |
| GitLab self-managed | はい | いいえ |
| Bitbucket | はい | いいえ |
| Azure DevOps Services | はい | いいえ |
| Azure DevOps Server | はい | いいえ |

{{< tabs >}}
{{% tab "GitHub" %}}

Install Datadog's [GitHub integration][101] on the [GitHub integration tile][102] to allow Datadog to synchronize your repository metadata automatically. When specifying permissions on the integration tile, select at least **Read** permissions for **Contents**.

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

<div class="alert alert-warning">
Repositories from self-managed GitLab instances are not supported out-of-the-box by the source code integration. To enable this feature, <a href="/help">contact Support</a>.
</div>

To link telemetry with your source code, upload your repository metadata with the [`datadog-ci git-metadata upload`][2] command.

Git リポジトリ内で `datadog-ci git-metadata upload` を実行すると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、そして追跡したファイルのパスのリストを受け取ります。

Run this command for every commit that you need to be synchronized with Datadog.

If you are using [gitlab.com][1], this also allows you to see inline code snippets in [**Error Tracking**][3], [**Continuous Profiler**][4], [**Serverless Monitoring**][5], [**CI Visibility**][6], and [**Application Security Monitoring**][7].

### 検証

データが収集されていることを確認するために、CI パイプラインで `datadog-ci git-metadata upload` を実行します。

以下のような出力が期待できます。

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
{{% tab "その他の Git プロバイダー" %}}

<div class="alert alert-warning">
Repositories on self-hosted instances or private URLs are not supported out-of-the-box by the source code integration. To enable this feature, <a href="/help">contact Support</a>.
</div>

To link telemetry with your source code, upload your repository metadata with the [`datadog-ci git-metadata upload`][1] command.

Git リポジトリ内で `datadog-ci git-metadata upload` を実行すると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、そして追跡したファイルのパスのリストを受け取ります。

Run this command for every commit that you need to be synchronized with Datadog.

### 検証

データが収集されていることを確認するために、CI パイプラインで `datadog-ci git-metadata upload` を実行します。

以下のような出力が期待できます。

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
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

{{< img src="integrations/guide/source_code_integration/error-tracking-panel-full.png" alt="A view repository button with three options (view file, view blame, and view commit) available on the right side of an error stack trace in Error Tracking, along with inline code snippets in the stack trace" style="width:100%;">}}

If you're using the GitHub integration, or if you're hosting your repositories on the GitLab SaaS instance (gitlab.com), click **Connect to preview** on stack frames. You can see inline code snippets directly in the stack trace.

[1]: /ja/tracing/error_tracking/
[2]: https://app.datadoghq.com/apm/error-tracking

{{% /tab %}}
{{% tab "Continuous Profiler" %}}

You can see a source code preview for profile frames in the [Continuous Profiler][1].

1. [**APM** > **Profile Search**][2] の順に移動します。
2. Hover your cursor over a method in the flame graph.
3. If needed, press `Opt` or `Alt` to enable the preview.

{{< img src="integrations/guide/source_code_integration/profiler-source-code-preview.png" alt="Source code preview in the Continuous Profiler" style="width:100%;">}}

You can also see links from profile frames to their source repository. This is supported for profiles broken down by line, method, or file.

1. [**APM** > **Profile Search**][2] の順に移動します。
2. Hover your cursor over a method in the flame graph. A kebab icon with the **More actions** label appears on the right.
3. *More actions** > **View in repo** をクリックし、トレースをソースコードリポジトリで開きます。

{{< img src="integrations/guide/source_code_integration/profiler-link-to-git.png" alt="Continuous Profiler から GitHub へのリンク" style="width:100%;">}}

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