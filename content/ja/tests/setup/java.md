---
title: Java Tests
code_lang: java
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /continuous_integration/setup_tests/java
  - /continuous_integration/tests/java
  - /continuous_integration/tests/setup/java
further_reading:
    - link: /tests/containers/
      tag: Documentation
      text: Forwarding Environment Variables for Tests in Containers
    - link: /tests/explorer
      tag: Documentation
      text: Explore Test Results and Performance
    - link: /tests/early_flake_detection
      tag: Documentation
      text: Detect test flakiness with Early Flake Detection
    - link: /tests/auto_test_retries
      tag: ドキュメント
      text: Retry failing test cases with Auto Test Retries
    - link: /tests/correlate_logs_and_tests
      tag: ドキュメント
      text: Correlate logs and test traces
    - link: /tests/troubleshooting/
      tag: ドキュメント
      text: CI の表示に関するトラブルシューティング
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-info">
  If your CI provider is Jenkins, you can use <a href="/continuous_integration/pipelines/jenkins/#enable-with-the-jenkins-configuration-ui-1">UI-based configuration</a> to enable Test Visibility for your jobs and pipelines.
</div>

## 互換性

サポートされているテストフレームワーク:

| Test Framework | バージョン |
|---|---|
| JUnit 4 | >= 4.10 |
| JUnit 5 | >= 5.3 |
| TestNG | >= 6.4 |
| Spock | >= 2.0 |
| Cucumber | >= 5.4.0 |
| Karate | >= 1.0.0 |
| Scalatest | >= 3.0.8 |
| Scala MUnit | >= 0.7.28 |

If your test framework is not supported, you can try instrumenting your tests using [Manual Testing API][1].

Supported build systems:

| Build System | バージョン |
|---|---|
| Gradle | >= 2.0 |
| Maven | >= 3.2.1 |

Other build systems, such as Ant or Bazel, are supported with the following limitations:
- Automatic coverage configuration and reporting is not supported.
- When building a multi-module project, every module is reported in a separate trace.

## セットアップ

Setting up Test Visibility for Java includes the following steps:
1. Configure tracer reporting method.
2. Download tracer library to the hosts where your tests are executed.
3. Run your tests with the tracer attached.

You may follow interactive setup steps on the [Datadog site][2] or with the instructions below.

### 報告方法の構成

This step involves configuring how Datadog Java Tracer reports data to Datadog.
There are two main options:
* Reporting the data to Datadog Agent, which will forward it to Datadog.
* Reporting the data directly to Datadog.

{{< tabs >}}
{{% tab "Cloud CI provider (Agentless)" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

### トレーサーライブラリのダウンロード

トレーサーライブラリのダウンロードは、サーバーごとに 1 回だけ行う必要があります。

トレーサーライブラリがすでにサーバー上でローカルで利用可能な場合は、直接テストの実行に進むことができます。

ダウンロードしたトレーサー JAR ファイルの保存先となるフォルダーへのパスで、変数 `DD_TRACER_FOLDER` を宣言します。

{{< code-block lang="shell" >}}
export DD_TRACER_FOLDER=... // e.g. ~/.datadog
{{< /code-block >}}

以下のコマンドを実行して、トレーサーの JAR ファイルを指定したフォルダーにダウンロードします。

{{< code-block lang="shell" >}}
wget -O $DD_TRACER_FOLDER/dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

`java -jar $DD_TRACER_FOLDER/dd-java-agent.jar` コマンドを実行すると、トレーサーライブラリのバージョンを確認できます。

### テストの実行

{{< tabs >}}
{{% tab "Maven" %}}

Set the following environment variables to configure the tracer:

`DD_CIVISIBILITY_ENABLED=true` (Required)
: Enables the CI Visibility product.

`DD_ENV` (Required)
: Environment where the tests are being run (for example: `local` when running tests on a developer workstation or `ci` when running them on a CI provider).

`DD_SERVICE` (Required)
: Name of the service or library being tested.

`DD_TRACER_FOLDER` (必須)
: ダウンロードした Java トレーサーがあるフォルダへのパス。

`MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Required)
: Injects the tracer into the Maven build process.

Run your tests as you normally do (for example: `mvn test` or `mvn verify`).

{{% /tab %}}
{{% tab "Gradle" %}}

`DD_TRACER_FOLDER` 変数には、トレーサーをダウンロードしたパスを設定してください。

システムプロパティ `org.gradle.jvmargs` を使って Datadog Java トレーサー JAR ファイルへのパスを指定し、テストを実行します。

トレーサーの引数を指定する際は、以下の情報を設定します。

* プロパティ `dd.civisibility.enabled` を `true` に設定して、CI Visibility を有効にします。
* Define the environment where the tests are being run using the `dd.env` property (for example: `local` when running tests on a developer workstation or `ci` when running them on a CI provider).
* Define the name of the service or library being tested in the `dd.service` property.

例:

{{< code-block lang="shell" >}}
./gradlew cleanTest test -Dorg.gradle.jvmargs=\
-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app
{{< /code-block >}}

コマンドラインで `org.gradle.jvmargs` を指定すると、別の場所で指定された値がオーバーライドされます。`gradle.properties` ファイルでこのプロパティを指定している場合は、必ずコマンドラインの引数で必要な設定を再現するようにしてください。

{{% /tab %}}
{{% tab "その他" %}}

Set the following environment variables to configure the tracer:

`DD_CIVISIBILITY_ENABLED=true` (Required)
: Enables Test Visibility.

`DD_ENV` (Required)
: Environment where the tests are being run (for example: `local` when running tests on a developer workstation or `ci` when running them on a CI provider).

`DD_SERVICE` (Required)
: Name of the service or library being tested.

`DD_TRACER_FOLDER` (必須)
: ダウンロードした Java トレーサーがあるフォルダへのパス。

`JAVA_TOOL_OPTIONS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Required)
: Injects the tracer into the JVMs that execute your tests.

Run your tests as you normally do.

{{% /tab %}}
{{< /tabs >}}

## 構成

ほとんどの場合、デフォルトの構成値でうまくいきます。

しかし、トレーサーの動作を微調整する必要がある場合は、[Datadog トレーサーの構成][3]オプションを使用することができます。

### Git のメタデータを収集する

{{% ci-git-metadata %}}

## 拡張

The tracer exposes a set of APIs that can be used to extend its functionality programmatically.

### テストにカスタムタグを追加する

To add custom tags include [opentracing-util][4] library as a compile-time dependency to your project.

You can then add custom tags to your tests by using the active span:

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test_owner", "my_team");
}
// test continues normally
// ...
```

これらのタグに対してフィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。

For more information about adding tags, see the [Adding Tags][5] section of the Java custom instrumentation documentation.

### Adding custom measures to tests

Just like tags, you can add custom measures to your tests by using the current active span:

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```

For more information about custom measures, see the [Add Custom Measures guide][6].

### 手動テスト API の使用

以下のサポートされているテストフレームワークのいずれかを使用する場合、Java トレーサーが自動的にテストのインスツルメンテーションを行い、Datadog バックエンドに結果を送信します。

サポート対象外のフレームや特製のテストソリューションを使用している場合は、手動テスト API を利用して、バックエンドにテスト結果を報告することもできます。

To use the manual testing API, add the [`dd-trace-api`][7] library as a compile-time dependency to your project.

#### ドメインモデル

この API は、テストセッション、テストモジュール、テストスイート、テストの 4 つの概念に基づいています。

##### テストセッション

テストセッションはプロジェクトのビルドを表し、通常はユーザーまたは CI スクリプトにより発行された 1 つのテストコマンドの実行に対応します。

テストセッションを開始するには、`datadog.trace.api.civisibility.CIVisibility#startSession` を呼び出し、プロジェクトの名前と使用したテストフレームワークの名前を渡します。

テストがすべて完了したら、`datadog.trace.api.civisibility.DDTestSession#end` を呼び出し、残りのテスト結果をすべてバックエンドに送信するようライブラリに強制します。

##### テストモジュール

テストモジュールはプロジェクトビルド内のより小さな作業単位を表し、通常はプロジェクトの 1 つのモジュールに対応します。例: Maven　のサブモジュールや Gradle のサブプロジェクト。

テストモードを開始するには、`datadog.trace.api.civisibility.DDTestSession#testModuleStart` を呼び出し、モジュール名を渡します。

モジュールでビルドとテストが完了したら、`datadog.trace.api.civisibility.DDTestModule#end` を呼び出します。

##### テストスイート

テストスイートは、共通の機能を持つテストのセットで構成されます。
これらのテストは、共通の初期化および終了を共有することができ、また、いくつかの変数を共有することができます。
各スイートは通常、テストケースを格納する 1 つの Java クラスに対応します。

テストモジュール内にテストスイートを作成するには、`datadog.trace.api.civisibility.DDTestModule#testSuiteStart` を呼び出し、テストスイート名を渡します。

スイートの中の関連するテストがすべて実行を終えたら `datadog.trace.api.civisibility.DDTestSuite#end` を呼び出します。

##### テスト

テストは、テストスイートの一部として実行される単一のテストケースを表します。
通常、テストのロジックを含む 1 つのメソッドに対応します。

スイート内にテストを作成するには、`datadog.trace.api.civisibility.DDTestSuite#testStart` を呼び出し、テスト名を渡します。

テストが実行を終えたら、`datadog.trace.api.civisibility.DDTest#end` を呼び出します。

#### コード例

次のコードは、API の簡単な使い方を表しています。

```java
package com.datadog.civisibility.example;

import datadog.trace.api.civisibility.CIVisibility;
import datadog.trace.api.civisibility.DDTest;
import datadog.trace.api.civisibility.DDTestModule;
import datadog.trace.api.civisibility.DDTestSession;
import datadog.trace.api.civisibility.DDTestSuite;
import java.lang.reflect.Method;

// 下の呼び出しの中の引数 null は、オプションの startTime/endTime の値です:
// 値の指定がない場合は、現在の時刻が使用されます
public class ManualTest {
    public static void main(String[] args) throws Exception {
        DDTestSession testSession = CIVisibility.startSession("my-project-name", "my-test-framework", null);
        testSession.setTag("my-tag", "additional-session-metadata");
        try {
            runTestModule(testSession);
        } finally {
            testSession.end(null);
        }
    }

    private static void runTestModule(DDTestSession testSession) throws Exception {
        DDTestModule testModule = testSession.testModuleStart("my-module", null);
        testModule.setTag("my-module-tag", "additional-module-metadata");
        try {
            runFirstTestSuite(testModule);
            runSecondTestSuite(testModule);
        } finally {
            testModule.end(null);
        }
    }

    private static void runFirstTestSuite(DDTestModule testModule) throws Exception {
        DDTestSuite testSuite = testModule.testSuiteStart("my-suite", ManualTest.class, null);
        testSuite.setTag("my-suite-tag", "additional-suite-metadata");
        try {
            runTestCase(testSuite);
        } finally {
            testSuite.end(null);
        }
    }

    private static void runTestCase(DDTestSuite testSuite) throws Exception {
        Method myTestCaseMethod = ManualTest.class.getDeclaredMethod("myTestCase");
        DDTest ddTest = testSuite.testStart("myTestCase", myTestCaseMethod, null);
        ddTest.setTag("my-test-case-tag", "additional-test-case-metadata");
        ddTest.setTag("my-test-case-tag", "more-test-case-metadata");
        try {
            myTestCase();
        } catch (Exception e) {
            ddTest.setErrorInfo(e); // テストケースを失敗としてマークするためのエラー情報を渡します
        } finally {
            ddTest.end(null);
        }
    }

    private static void myTestCase() throws Exception {
        // 何らかのテストロジックを実行します
    }

    private static void runSecondTestSuite(DDTestModule testModule) {
        DDTestSuite secondTestSuite = testModule.testSuiteStart("my-second-suite", ManualTest.class, null);
        secondTestSuite.setSkipReason("this test suite is skipped"); // テストスイートをスキップ済みとしてマークするためのスキップ理由を渡します
        secondTestSuite.end(null);
    }
}
```

最後に必ず `datadog.trace.api.civisibility.DDTestSession#end` を呼び出し、すべてのテスト情報を Datadog に流すようにします。

## ベストプラクティス

### Deterministic test parameters representation

Test Visibility works best when the [test parameters are deterministic][8] and stay the same between test runs.
If a test case has a parameter that varies between test executions (such as a current date, a random number, or an instance of a class whose `toString()` method is not overridden), some of the product features may not work as expected.
For example, the history of executions may not be available, or the test case may not be classified as flaky even if it exhibits flakiness.

The best way to fix this is to make sure that the test parameters are the same between test runs.

In JUnit 5, this can also be addressed by [customizing the string representation of the test parameters][9] without changing their values.
To do so, use `org.junit.jupiter.api.Named` interface or change the `name` parameter of the `org.junit.jupiter.params.ParameterizedTest` annotation:

```java
@ParameterizedTest
@MethodSource("namedArguments")
void parameterizedTest(String s, Date d) {
   // The second parameter in this test case is non-deterministic.
   // In the argument provider method it is wrapped with Named to ensure it has a deterministic name.
}

static Stream<Arguments> namedArguments() {
    return Stream.of(
            Arguments.of(
                    "a string",
                    Named.of("current date", new Date())),
            Arguments.of(
                    "another string",
                    Named.of("a date in the future", new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(1))))
    );
}
```

```java
@ParameterizedTest(name = "[{index}] {0}, a random number from one to ten")
@MethodSource("randomArguments")
void anotherParameterizedTest(String s, int i) {
  // The second parameter in this test case is non-deterministic.
  // The name of the parameterized test is customized to ensure it has a deterministic name.
}

static Stream<Arguments> randomArguments() {
    return Stream.of(
            Arguments.of("a string", ThreadLocalRandom.current().nextInt(10) + 1),
            Arguments.of("another string", ThreadLocalRandom.current().nextInt(10) + 1)
    );
}
```

## トラブルシューティング

### トレーサーで CI Visibility を有効にした後、Datadog にテストが表示されない

Verify that the tracer is injected into your build process by examining your build's logs.
If the injection is successful, you can see a line containing `DATADOG TRACER CONFIGURATION`.
If the line is not there, make sure that the environment variables used to inject and configure the tracer are available to the build process.
A common mistake is to set the variables in a build step and run the tests in another build step. This approach may not work if the variables are not propagated between build steps.

最新バージョンのトレーサーを使用していることを確認してください。

ビルドシステムとテストフレームワークが CI Visibility でサポートされていることを確認します。[サポートされているビルドシステムとテストフレームワーク](#compatibility)のリストを参照してください。

Ensure that the `dd.civisibility.enabled` property (or `DD_CIVISIBILITY_ENABLED` environment variable) is set to `true` in the tracer arguments.

Try running your build with tracer debug logging enabled by setting the `DD_TRACE_DEBUG` environment variable to `true`.
Check the build output for any errors that indicate tracer misconfiguration, such as an unset `DD_API_KEY` environment variable.

### トレーサーがアタッチされたプロジェクトをビルドする際に、テストやソースコードのコンパイルに失敗する

CI Visibility はデフォルトで、コンパイラープラグインがアタッチされた状態で Java コードのコンパイルを実行できるようになっています。

The plugin is optional, as it only serves to reduce the performance overhead.

ビルドの構成によっては、プラグインを追加することで、コンパイルのプロセスが妨げられる場合があります。

If the plugin interferes with the build, disable it by adding `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` to the list of `-javaagent` arguments
(or by setting `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED=false` environment variable).

### Builds fails because dd-javac-plugin-client artifact cannot be found

It is possible that the Java compiler plugin injected into the build is not available if the build uses a custom artifactory storage or if it is run in offline mode.

If this is the case, you can disable plugin injection by adding `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` to the list of `-javaagent` arguments
(or by setting the `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED` environment variable to false).

The plugin is optional, as it only serves to reduce the performance overhead.

### Tests fail when building a project with the tracer attached

場合によっては、トレーサーをアタッチすることでテストが中断されることがあります。特に、JVM の内部状態やサードパーティライブラリのクラスのインスタンス上でアサーションを実行する場合、その可能性が高まります。

そうしたケースに対する最適なアプローチは、テストをアップデートすることですが、トレーサーのサードパーティライブラリインテグレーションを無効にするという、より迅速なオプションも存在します。

インテグレーションは、テスト対象のコードで何が起きるかについてより詳細なインサイトを提供し、HTTP リクエストやデータベースに対する呼び出しなどを監視する結合テストでは特に有用です。
インテグレーションは、デフォルトで有効になっています。

To disable a specific integration, refer to the [Datadog Tracer Compatibility][10] table for the relevant configuration property names.
For example, to disable `OkHttp3` client request integration, add `dd.integration.okhttp-3.enabled=false` to the list of `-javaagent` arguments.

To disable all integrations, augment the list of `-javaagent` arguments with `dd.trace.enabled=false` (or set `DD_TRACE_ENABLED=false` environment variable).

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: #using-manual-testing-api
[2]: https://app.datadoghq.com/ci/setup/test?language=java
[3]: /tracing/trace_collection/library_config/java/?tab=containers#configuration
[4]: https://mvnrepository.com/artifact/io.opentracing/opentracing-util
[5]: /tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags
[6]: /tests/guides/add_custom_measures/?tab=java
[7]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[8]: /tests/#parameterized-test-configurations
[9]: https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests-display-names
[10]: /tracing/trace_collection/compatibility/java#integrations
