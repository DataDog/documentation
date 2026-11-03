---
aliases:
- /ja/continuous_integration/setup_tests/java
- /ja/continuous_integration/tests/java
- /ja/continuous_integration/tests/setup/java
code_lang: java
code_lang_weight: 10
further_reading:
- link: /tests/containers/
  tag: ドキュメント
  text: Containers 内でテスト用に環境変数を転送する
- link: /tests/explorer
  tag: ドキュメント
  text: テスト結果とパフォーマンスを調べる
- link: /tests/flaky_test_management/early_flake_detection
  tag: ドキュメント
  text: 不安定さの早期検出でテストの不安定さを検出する
- link: /tests/flaky_test_management/auto_test_retries
  tag: ドキュメント
  text: テストの自動再試行で失敗したテストケースを再試行する
- link: /tests/correlate_logs_and_tests
  tag: ドキュメント
  text: ログとテストトレースを相関付ける
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング
title: Java テスト
type: multi-code-lang
---
## 互換性{#compatibility}

サポート対象テストフレームワーク:

| テストフレームワーク | バージョン |
|---|---|
| JUnit 4 | 4.10 以上 |
| JUnit 5 | 5.3 以上 |
| TestNG | 6.4 以上|
| Spock | 2.0 以上 |
| Cucumber | 5.4.0 以上 |
| Karate | 1.0.0 以上 |
| ScalaTest | 3.0.8 以上 |
| Scala MUnit | 0.7.28 以上 |
| Scala Weaver | 0.8.4 以上 (SBT をビルドシステムとして使用する場合のみ) |

お使いのテストフレームワークがサポートされていない場合は、[Manual Testing API][1] を使用してテストをインスツルメンテーションしてみてください。

サポートされるビルドシステム:

| ビルドシステム | バージョン |
|---|---|
| Gradle | 2.0 以上|
| Maven | 3.2.1 以上 |
| Bazel | 1.2.0 以上 |

<div class="alert alert-info">Bazel を使用して Java テストを実行する場合は、Datadog の <a href="/tests/setup/bazel/java/">Java テスト用 Bazel ルール</a>を使用してください。</div>

Ant や SBT などの他のビルドシステムは、以下の制限付きでサポートされます。
- 自動カバレッジ構成およびレポートはサポートされません。
- マルチモジュールプロジェクトをビルドする場合、すべてのモジュールが個別のトレースでレポートされます。

### Android {#android}

JVM 上で実行される Android テストがサポートされます。Espresso テスト、Compose UI テスト、一部のユニットテストなど、Android API に依存するテストは、[Robolectric][11] フレームワークでのみサポートされます。

エミュレーターや物理デバイスを必要とするテストはサポートされません。

## セットアップ {#setup}

[Datadog サイト][2] の対話型セットアップ手順、または以下の手順に従ってください。

Datadog Java トレーサーの構成は、CI プロバイダーによって異なります。

{{< tabs >}}
{{% tab "自動インスツルメンテーションサポートがある CI プロバイダー" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "その他のクラウドの CI プロバイダー" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "オンプレミスの CI プロバイダー" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

### SDK のダウンロード{#downloading-sdk}

SDK のダウンロードは、サーバーごとに 1 回だけ行う必要があります。

SDK がすでにサーバー上にローカルで存在する場合、直接テストの実行に進むことができます。

ダウンロードしたトレーサー JAR を保存するフォルダーへのパスで、`DD_TRACER_FOLDER` 変数を宣言します。

{{< code-block lang="shell" >}}
export DD_TRACER_FOLDER=... // e.g. ~/.datadog
{{< /code-block >}}

以下のコマンドを実行して、SDK JAR を指定したフォルダーにダウンロードします。

{{< code-block lang="shell" >}}
wget -O $DD_TRACER_FOLDER/dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

`java -jar $DD_TRACER_FOLDER/dd-java-agent.jar` コマンドを実行して、SDK のバージョンをチェックします。

### テストの実行{#running-your-tests}

テストプロセスを開始する前に、これらの変数を設定してください。並列テストランナーの場合、すべてのワーカーが継承するように親プロセスで設定してください。

まず、ビルドツールに必要な以下の環境変数を設定します。

{{< tabs >}}
{{% tab "Maven" %}}

`DD_TRACER_FOLDER` (必須)
: ダウンロードした Java トレーサーがあるフォルダーへのパス。

`MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar`(必須)
: Maven ビルドプロセスに SDK をインジェクトします。

{{% /tab %}}
{{% tab "Gradle" %}}

`DD_TRACER_FOLDER` (必須)
: ダウンロードした Java トレーサーがあるフォルダーへのパス。

`GRADLE_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar`(必須)
: Gradle ランチャープロセスに SDK をインジェクトします。

{{% /tab %}}
{{% tab "SBT" %}}

`DD_TRACER_FOLDER` (必須)
: ダウンロードした Java トレーサーがあるフォルダーへのパス。

`SBT_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar`(必須)
: テストを実行する JVM に SDK をインジェクトします。

{{% /tab %}}
{{% tab "その他" %}}

`DD_TRACER_FOLDER` (必須)
: ダウンロードした Java トレーサーがあるフォルダーへのパス。

`JAVA_TOOL_OPTIONS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar`(必須)
: テストを実行する JVM に SDK をインジェクトします。

{{% /tab %}}
{{< /tabs >}}

次に、以下の共通環境変数を設定して、SDK とそのレポート手法を構成します。

`DD_CIVISIBILITY_ENABLED=true` (必須)
: Test Optimization を有効にします。<br/>
**デフォルト**: `false`

`DD_ENV` (オプション)
: テストが実行されている環境の名前。<br/>
**デフォルト**: `(empty)`<br/>
**例**: `local`、`ci`

`DD_SERVICE` (オプション)
: テスト対象のサービスまたはライブラリの名前。<br/>
**デフォルト**: `unnamed-java-app`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Agentless モードの場合、必須)
: Agentless モードを有効にして、テスト結果を Datadog に直接送信します。<br/>
**デフォルト**: `false`

`DD_API_KEY` (Agentless モードの場合、必須)
: テスト結果のアップロードを認証するために使用される Datadog API キー。この変数で Agentless モードが有効になることはありません。<br/>
**デフォルト**: `(empty)`

`DD_SITE` (Agentless モードの場合、オプション)
: テスト結果のアップロード先の [Datadog サイト][4]。US1 以外のサイトを使用する場合は、この構成を設定します。<br/>
**デフォルト**: `datadoghq.com`

`DD_TRACE_AGENT_URL` (Datadog Agent を使用する場合のみ)
: トレース収集用の Datadog Agent URL。`http://hostname:port` の形式にします。<br/>
**デフォルト**: `http://localhost:8126`

`DD_TEST_SESSION_NAME` (オプション)
: `unit-tests`、`integration-tests`、`smoke-tests` などのテストグループを識別します。<br/>
**デフォルト**: CI ジョブ名とテストコマンド、または CI ジョブ名が利用できない場合はテストコマンド。<br/>
**例**: `unit-tests`、`integration-tests`、`smoke-tests`

通常と同じ方法でテストを実行します (例: `mvn test`、`mvn verify`、`./gradlew clean test`、または `sbt test`)。

## 構成{#configuration}

ほとんどの場合、デフォルトの構成値でうまくいきます。

ただし、SDK の動作をカスタマイズするには、[Datadog SDK の構成][3] オプションを使用できます。

### Git のメタデータを収集する{#collecting-git-metadata}

{{% ci-git-metadata %}}

## 拡張{#extensions}

SDK は、プログラムで機能を拡張するために使用できる一連の API を公開しています。

### テストにカスタムタグを追加する{#adding-custom-tags-to-tests}

{{< tabs >}}
{{% tab "OpenTelemetry API" %}}

カスタムタグを追加するには、[opentelemetry-api][1] ライブラリをコンパイル時の依存関係として含め、`dd.trace.otel.enabled` (システムプロパティ) または `DD_TRACE_OTEL_ENABLED` (環境変数) を `true` に設定します。

その後、アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

```java
import io.opentelemetry.api.trace.Span;

// ...
// inside your test
Span span = Span.current();
span.setAttribute("test_owner", "my_team");
// test continues normally
// ...
```

タグの追加の詳細については、Java カスタムインスツルメンテーションドキュメントの [タグの追加][2] セクションを参照してください。

[1]: https://mvnrepository.com/artifact/io.opentelemetry/opentelemetry-api
[2]: /ja/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags

{{% /tab %}}
{{% tab "OpenTracing API" %}}

カスタムタグを追加するには、[opentracing-util][1] ライブラリをコンパイル時の依存関係としてプロジェクトに追加します。

その後、アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

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

タグの追加の詳細については、Java カスタムインスツルメンテーションドキュメントの [タグの追加][2] セクションを参照してください。

[1]: https://mvnrepository.com/artifact/io.opentracing/opentracing-util
[2]: /ja/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags

{{% /tab %}}
{{< /tabs >}}

### テストへのカスタム測定値の追加{#adding-custom-measures-to-tests}

タグと同様に、現在アクティブなスパンを使用して、テストにカスタム測定値を追加できます。

{{< tabs >}}
{{% tab "OpenTelemetry API" %}}

```java
import io.opentelemetry.api.trace.Span;

// ...
// inside your test
Span span = Span.current();
span.setAttribute("test.memory.usage", 1e8);
// test continues normally
// ...
```

{{% /tab %}}
{{% tab "OpenTracing API" %}}

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

{{% /tab %}}
{{< /tabs >}}

カスタム測定値の詳細については、[カスタム測定値の追加ガイド][6] を参照してください。

### 手動テスト API の使用{#using-manual-testing-api}

以下のサポートされているテストフレームワークのいずれかを使用する場合、Java トレーサーが自動的にテストのインスツルメンテーションを行い、Datadog バックエンドに結果を送信します。

サポート対象外のフレームや特製のテストソリューションを使用している場合は、手動テスト API を利用して、バックエンドにテスト結果を報告することもできます。

手動テスト API を使用するには、[`dd-trace-api`][7] ライブラリをコンパイル時の依存関係としてプロジェクトに追加します。

#### ドメインモデル{#domain-model}

この API は、テストセッション、テストモジュール、テストスイート、テストの 4 つの概念に基づいています。

##### テストセッション{#test-session}

テストセッションはプロジェクトのビルドを表し、通常はユーザーまたは CI スクリプトにより発行された 1 つのテストコマンドの実行に対応します。

テストセッションを開始するには、`datadog.trace.api.civisibility.CIVisibility#startSession` を呼び出し、プロジェクト名と使用したテストフレームワーク名を渡します。

すべてのテストが終了したら、`datadog.trace.api.civisibility.DDTestSession#end` を呼び出して、残りのテスト結果をすべてバックエンドに送信するようにします。

##### テストモジュール{#test-module}

テストモジュールは、プロジェクトビルド内のより小さな作業単位を表し、通常はプロジェクトモジュールに対応します。たとえば、Maven サブモジュールや Gradle サブプロジェクトなどです。

テストモードを開始するには、`datadog.trace.api.civisibility.DDTestSession#testModuleStart` を呼び出し、モジュール名を渡します。

モジュールのビルドとテストが終了したら、`datadog.trace.api.civisibility.DDTestModule#end` を呼び出します。

##### テストスイート{#test-suite}

テストスイートは、共通の機能を共有する一連のテストで構成されます。
これらは共通の初期化と終了処理を共有でき、いくつかの変数を共有することもできます。
単一のスイートは通常、テストケースを含む Java クラスに対応します。

`datadog.trace.api.civisibility.DDTestModule#testSuiteStart` を呼び出し、テストスイート名を渡すことで、テストモジュール内にテストスイートを作成します。

テストスイート内の関連するテストがすべて実行を完了したら `datadog.trace.api.civisibility.DDTestSuite#end` を呼び出します。

##### テスト{#test}

テストは、テストスイートの一部として実行される単一のテストケースを表します。
通常、これはテストロジックを含むメソッドに対応します。

スイート内にテストを作成するには、`datadog.trace.api.civisibility.DDTestSuite#testStart` を呼び出し、テスト名を渡します。

テストの実行が終了したら、`datadog.trace.api.civisibility.DDTest#end` を呼び出します。

#### コード例{#code-example}

次のコードは、API の簡単な使い方を表しています。

```java
package com.datadog.civisibility.example;

import datadog.trace.api.civisibility.CIVisibility;
import datadog.trace.api.civisibility.DDTest;
import datadog.trace.api.civisibility.DDTestModule;
import datadog.trace.api.civisibility.DDTestSession;
import datadog.trace.api.civisibility.DDTestSuite;
import java.lang.reflect.Method;

// the null arguments in the calls below are optional startTime/endTime values:
// when they are not specified, current time is used
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
            ddTest.setErrorInfo(e); // pass error info to mark test case as failed
        } finally {
            ddTest.end(null);
        }
    }

    private static void myTestCase() throws Exception {
        // run some test logic
    }

    private static void runSecondTestSuite(DDTestModule testModule) {
        DDTestSuite secondTestSuite = testModule.testSuiteStart("my-second-suite", ManualTest.class, null);
        secondTestSuite.setSkipReason("this test suite is skipped"); // pass skip reason to mark test suite as skipped
        secondTestSuite.end(null);
    }
}
```

最後に必ず ``datadog.trace.api.civisibility.DDTestSession#end`` を呼び出して、すべてのテスト情報を Datadog に渡してください。

## ベストプラクティス{#best-practices}

### 決定論的なテストパラメーターの表現{#deterministic-test-parameters-representation}

Test Optimization は、[テストパラメーターが決定論的][8] であり、テスト実行間で変化しない場合に最も効果を発揮します。
テストケースにテスト実行ごとに変化するパラメーター (現在の日付、乱数、`toString()` メソッドがオーバーライドされないクラスのインスタンスなど) がある場合、一部の製品機能が期待通りに動作しないことがあります。
たとえば、実行履歴が利用できなかったり、テストケースが不安定な動作を示しても不安定として分類されなかったりする可能性があります。

この問題を解消する最善の方法は、テストのパラメーターがテスト実行ごとに同じであるようにすることです。

JUnit 5 では、テストパラメーターの値を変更せずに [文字列表現をカスタマイズする][9] ことでも対処できます。
そのためには、`org.junit.jupiter.api.Named` インターフェースを使用するか、`org.junit.jupiter.params.ParameterizedTest` アノテーションの `name` パラメーターを変更してください。

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

### テストセッション名 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME` を使用してテストセッションの名前と関連するテストグループを定義します。このタグの値の例は次のとおりです。

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME` が指定されていない場合、デフォルトで CI ジョブ名とテストコマンドになります。CI ジョブ名が利用できない場合は、テストコマンドが使用されます。

異なるテストグループを区別しやすくするため、テストセッション名はリポジトリ内で一意でなければなりません。

#### `DD_TEST_SESSION_NAME` を使用するタイミング{#when-to-use-dd-test-session-name}

Datadog がテストセッション間の対応関係を確立するためにチェックするパラメーターのセットがあります。テストの実行に使用されるテストコマンドもその 1 つです。一時フォルダーなど、実行ごとに変化する文字列がテストコマンドに含まれる場合、Datadog はそれらのセッションを互いに無関係なものとみなします。たとえば、以下のとおりです。

- `mvn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

テストコマンドが実行ごとに異なる場合、Datadog は `DD_TEST_SESSION_NAME` を使用することを推奨します。

## トラブルシューティング{#troubleshooting}

### SDK で Test Optimization を有効にした後、Datadog にテストが表示されない{#the-tests-are-not-appearing-in-datadog-after-enabling-test-optimization-in-the-sdk}

ビルドログを調べて、SDK がビルドプロセスにインジェクトされていることを確認してください。
インジェクションが成功していれば、`DATADOG TRACER CONFIGURATION` を含む行が表示されます。
その行がない場合は、SDK のインジェクションと構成に使用される環境変数がビルドプロセスで利用可能であることを確認してください。
よくある間違いは、あるビルドステップで変数を設定し、別のビルドステップでテストを実行することです。このアプローチでは、ビルドステップ間で変数が伝播されない場合に機能しないことがあります。

最新バージョンの SDK を使用していることを確認してください。

ビルドシステムとテストフレームワークが Test Optimization でサポートされていることを確認してください。[サポートされているビルドシステムとテストフレームワーク](#compatibility)のリストを参照してください。

`dd.civisibility.enabled` プロパティ (または `DD_CIVISIBILITY_ENABLED` 環境変数) が SDK 引数で `true` に設定されていることを確認してください。

`DD_TRACE_DEBUG` 環境変数を `true` に設定して、トレーサーのデバッグログを有効にした状態でビルドを実行してみてください。
ビルド出力で、`DD_API_KEY` 環境変数が設定されていないなど、トレーサーの構成ミスを示すエラーがないかチェックしてください。

### SDK がアタッチされたプロジェクトをビルドする際に、テストやソースコードのコンパイルに失敗する{#tests-or-source-code-compilation-fails-when-building-a-project-with-the-sdk-attached}

Test Optimization はデフォルトで、コンパイラープラグインがアタッチされた状態で Java コードのコンパイルを実行できるようになっています。

このプラグインはパフォーマンスのオーバーヘッドを削減するためだけのものなので、オプションです。

ビルドの構成によっては、プラグインを追加することで、コンパイルのプロセスが妨げられる場合があります。

プラグインがビルドを妨げる場合は、`-javaagent` 引数のリストに `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` を追加して無効にしてください。
(または `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED=false` 環境変数を設定してください)。

### dd-javac-plugin-client アーティファクトが見つからないためビルドに失敗する{#builds-fails-because-dd-javac-plugin-client-artifact-cannot-be-found}

ビルドでカスタムアーティファクトリストレージを使用している場合や、オフラインモードで実行されている場合、ビルドにインジェクトされた Java コンパイラープラグインが利用できない可能性があります。

この場合は、`-javaagent` 引数のリストに `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` を追加することで、プラグインのインジェクションを無効にできます。
(または `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED` 環境変数を false に設定してください)。

このプラグインはパフォーマンスのオーバーヘッドを削減するためだけのものなので、オプションです。

### SDK をアタッチしてプロジェクトをビルドするとテストが失敗する{#tests-fail-when-building-a-project-with-the-sdk-attached}

場合によっては、SDK をアタッチすることでテストが失敗することがあります。特に、JVM の内部状態やサードパーティライブラリのクラスのインスタンス上でアサーションを実行する場合、その可能性が高まります。

そうしたケースに対する最適なアプローチは、テストをアップデートすることですが、SDK のサードパーティライブラリインテグレーションを無効にするという、より迅速なオプションも存在します。

インテグレーションは、テスト対象のコードで何が起きるかについてより詳細なインサイトを提供し、HTTP リクエストやデータベースに対する呼び出しなどを監視する結合テストでは特に有用です。
インテグレーションは、デフォルトで有効になっています。

特定のインテグレーションを無効にするには、[Datadog Tracer Compatibility][10] テーブルを参照して、関連する設定プロパティ名を確認してください。
たとえば、`OkHttp3` クライアントリクエストインテグレーションを無効にするには、`-javaagent` 引数のリストに `dd.integration.okhttp-3.enabled=false` を追加してください。

すべてのインテグレーションを無効にするには、`-javaagent` 引数のリストに `dd.trace.enabled=false` を追加してください (または `DD_TRACE_ENABLED=false` 環境変数を設定してください)。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: #using-manual-testing-api
[2]: https://app.datadoghq.com/ci/setup/test?language=java
[3]: /ja/tracing/trace_collection/library_config/java/?tab=containers#configuration
[4]: /ja/getting_started/site/
[6]: /ja/tests/guides/add_custom_measures/?tab=java
[7]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[8]: /ja/tests/#parameterized-test-configurations
[9]: https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests-display-names
[10]: /ja/tracing/trace_collection/compatibility/java#integrations
[11]: https://robolectric.org/getting-started/