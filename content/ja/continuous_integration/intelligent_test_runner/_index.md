---
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: GitHub
  text: Datadog Intelligent Test Runner による CI テストの効率化
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: GitHub
  text: Datadog によるすべての CI パイプラインの監視
is_beta: true
kind: documentation
title: Intelligent Test Runner
---
{{< beta-callout url="https://app.datadoghq.com/ci/getting-started" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
Intelligent Test Runner for CI Visibility は非公開ベータ版です。CI Visibility の概要のページにあるフォームに記入して、アクセスをリクエストすることができます。
{{< /beta-callout >}}

## 概要

Intelligent Test Runner は、Datadog のテストインパクト分析ソリューションです。これにより、与えられたコミットに対して影響を与えるテストのみを実行し、無関係なテストはスキップすることができます。


{{< img src="continuous_integration/itr_overview.png" alt="Datadog の CI セクションのテストサービス設定で Intelligent test runner を有効にする">}}

関連するコードに対してのみテストを実行することで、テストが失敗した場合、それは変更されたコードに関連する正当な失敗である可能性が高くなります。

## ベータ版での制限事項

Intelligent Test Runner のベータ版では、一定の制限があります。

- 以下のセクションで必要とされる環境変数の中には、ベータ版の間だけ必要とされるものがあります。
- Intelligent Test Runner は、Datadog Agent を使用しない場合のみ動作します。このページの構成ステップでは、Datadog ライブラリが Agent を介さずにバックエンドに直接データを送信します。現在 Agent を使用している場合、ホストメトリクスとの相関が失われます。
- Intelligent Test Runner の現在の実装には、実行すべきテストをスキップする可能性のある既知の制限がありま す。Intelligent Test Runner は、以下を検出できません。
  - ライブラリの依存関係の変更。
  - コンパイラーオプションの変更。
  - 外部サービスの変更。
  - データ駆動型テストにおけるデータファイルの変更。

Intelligent Test Runner をオーバーライドしてすべてのテストを実行するには、Git のコミットメッセージのどこかに `ITR:NoSkip` (大文字小文字を区別しない) を追加してください。

## Datadog ライブラリのセットアップ

Intelligent Test Runner を設定する前に、特定の言語の [Test Visibility][1] の設定を完了している必要があります。

### JavaScript

Intelligent Test Runner を有効にするには、以下の環境変数の設定が必要です。

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (必須)
: Agentless モードを有効または無効にします。<br/>
**デフォルト**: `false`<br/>
**注**: ベータ版のみ必要

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][2]。<br/>
**デフォルト**: `(empty)`

`DD_APPLICATION_KEY` (必須)
: スキップするテストをクエリするために使用する [Datadog アプリケーションキー][3]。<br/>
**デフォルト**: `(empty)`

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][4]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

`DD_CIVISIBILITY_GIT_UPLOAD_ENABLED=true` (必須)
: git メタデータのアップロードを有効にするためのフラグ。<br/>
**デフォルト**: `false`<br/>
**注**: ベータ版のみ必要

`DD_CIVISIBILITY_ITR_ENABLED=true` (必須)
: テストスキップを有効にするためのフラグ。 <br/>
**デフォルト**: `false`<br/>
**注**: ベータ版のみ必要

これらの環境変数を設定した後、通常通りテストを実行します。

{{< code-block lang="bash" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$API_KEY DD_CIVISIBILITY_GIT_UPLOAD_ENABLED=true DD_CIVISIBILITY_ITR_ENABLED=true yarn test
{{< /code-block >}}

**重要**: Intelligent Test Runner は、すべてのテストをスキップすることができます。デフォルトでは、実行するテストがない場合、`jest` は失敗します。`jest` が失敗しないようにするには、`jest` に [`--passWithNoTests`][5] を渡してください。

#### UI アクティベーション
環境変数の設定に加えて、お客様またはお客様の組織で管理者権限を持つユーザーが、[テストサービス設定][6]ページで Intelligent Test Runner を有効にする必要があります。

#### 互換性

Intelligent Test Runner は、以下のバージョンとテストフレームワークでのみサポートされています。

* `dd-trace>=3.4.0`
* `jest>=24.8.0`
  * `testRunner` としてサポートされているのは `jest-circus/runner` のみです。
  * テスト環境としてサポートされているのは `jsdom` と `node` のみです。

### .NET

Intelligent Test Runner を有効にするには、`dd-trace` ツールのバージョンが >= 2.16.0 であること (ツールのバージョンを取得するには `dd-trace --version` を実行します)、および以下の環境変数が設定されている必要があります。

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (必須)
: Agentless モードを有効または無効にします。<br/>
**デフォルト**: `false`<br/>
**注**: ベータ版のみ必要

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][2]。<br/>
**デフォルト**: `(empty)`

`DD_APPLICATION_KEY` (必須)
: スキップするテストをクエリするために使用する [Datadog アプリケーションキー][3]。<br/>
**デフォルト**: `(empty)`

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][4]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

`DD_CIVISIBILITY_ITR_ENABLED=true` (必須)
: Intelligent Test Runner を有効にするためのフラグ。 <br/>
**デフォルト**: `false`<br/>
**注**: ベータ版のみ必要

これらの環境変数の設定後、通常通り [dotnet テスト][7]や [VSTest.Console.exe][8] を使ってテストを実行します。

{{< tabs >}}

{{% tab "dotnet テスト" %}}


{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{< /tabs >}}

{{% tab "VSTest.Console" %}}


{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{< /tabs >}}

{{< /tabs >}}

#### UI アクティベーション

環境変数の設定に加えて、お客様またはお客様の組織で管理者権限を持つユーザーが、[テストサービス設定][6]ページで Intelligent Test Runner を有効にする必要があります。

### Swift

Intelligent Test Runner を有効にするには、`dd-sdk-swift` フレームワークのバージョンが >= 2.2.0-rc.1 である必要があります。また、スキームやテストプランのテスト設定で `Code Coverage` オプションを有効にするか、`swift test` コマンドに `--enable-code-coverage` を追加しなければなりません (SPM ターゲットを使用している場合)。

また、以下の環境変数も設定する必要があります。

`DD_TEST_RUNNER`
: テストのインスツルメンテーションを有効または無効にします。この値を `$(DD_TEST_RUNNER)` に設定すると、テストプロセスの外部 (CI ビルドなど) で定義された環境変数を使用してテストインスツルメンテーションを有効または無効にできます。<br/>
**デフォルト**: `false`<br/>
**推奨**: `$(DD_TEST_RUNNER)`

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][2]。<br/>
**デフォルト**: `(empty)`

`DD_APPLICATION_KEY` (必須)
: スキップするテストをクエリするために使用する [Datadog アプリケーションキー][3]。<br/>
**デフォルト**: `(empty)`

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][4]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

#### UI アクティベーション

環境変数の設定に加えて、お客様またはお客様の組織で管理者権限を持つユーザーが、[テストサービス設定][6]ページで Intelligent Test Runner を有効にする必要があります。

## CI ジョブのセットアップ

Intelligent Test Runner は、git のメタデータ情報 (コミット履歴) を使って動作します。しかし、CI プロバイダーによっては git shallow clone (`git clone --depth=0`) を使って、過去のコミット情報を一切ダウンロードせずに対象のコミットだけをダウンロードするものがあります。この設定では、Intelligent Test Runner が動作するのに十分な情報が含まれていません。CI で shallow clone を使用している場合は、それを変更する必要があります。

shallow clone に代わる効率的な方法として、partial clone (Git v2.27+ でサポート) があります。これは、現在のコミットと必要な git メタデータを複製し、すべてのファイルの過去のバージョンを取得することはありません: `git clone --filter=blob:none`

## コンフィギュレーション

デフォルトブランチは、無関係なテストのノイズを減らすために、自動的に Intelligent Test Runner の有効化から除外されますが、構成することは可能です。この除外によって影響を受けるテストが見落とされる可能性があるため、Datadog はデフォルトブランチを含めることを推奨しています。

{{< img src="continuous_integration/itr_configuration.png" alt="Intelligent Test Runner から除外するブランチを選択" style="width:80%;">}}


## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /ja/getting_started/site/
[5]: https://jestjs.io/docs/cli#--passwithnotests
[6]: https://app.datadoghq.com/ci/settings/test-service
[7]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[8]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options