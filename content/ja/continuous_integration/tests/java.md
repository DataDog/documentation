---
aliases:
- /ja/continuous_integration/setup_tests/java
further_reading:
- link: /continuous_integration/tests/containers/
  tag: ドキュメント
  text: コンテナ内でテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI のトラブルシューティング
kind: documentation
title: Java テスト
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 互換性

対応するテストフレームワーク:
* JUnit >= 4.10 および >= 5.3
  * また、Spock Framework や Cucumber-Junit などの JUnit ベースのテストフレームワークもすべて含まれます。 **注**: JUnit 4 を使用する Cucumber v1 にのみ対応しています。
* TestNG >= 6.4

対応するビルドシステム:
* Gradle >= 2.0
* Maven >= 3.2.1

## 報告方法の構成

Datadog にテスト結果を報告するには、Datadog Java ライブラリを構成する必要があります。

{{< tabs >}}

{{% tab "オンプレミスの CI プロバイダー (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}

{{% tab "クラウドの CI プロバイダー (Agentless)" %}}

<div class="alert alert-info">Agentless モードは Datadog Java ライブラリのバージョン >= 0.101.0 で利用できます。</div>

{{% ci-agentless %}}


{{% /tab %}}
{{< /tabs >}}

## トレーサーライブラリのダウンロード

トレーサーライブラリのダウンロードは、サーバーごとに 1 回だけ行う必要があります。

トレーサーライブラリがすでにサーバー上でローカルで利用可能な場合は、直接テストの実行に進むことができます。

ダウンロードしたトレーサー JAR ファイルの保存先となるフォルダーへのパスで、変数 `DD_TRACER_FOLDER` を宣言します。

{{< code-block lang="shell" >}}
export DD_TRACER_FOLDER=... // e.g. ~/.datadog
{{< /code-block >}}

以下のコマンドを実行して、トレーサーの JAR ファイルを指定したフォルダーにダウンロードします。

{{< code-block lang="shell" >}}
wget -O $DD_TRACER_FOLDER/dd-java-agent.jar https://dtdg.co/latest-java-tracer
{{< /code-block >}}

`java -jar $DD_TRACER_FOLDER/dd-java-agent.jar` コマンドを実行すると、トレーサーライブラリのバージョンを確認できます。

## テストの実行

{{< tabs >}}
{{% tab "Maven" %}}

`DD_TRACER_FOLDER` 変数には、トレーサーをダウンロードしたパスを設定してください。

環境変数 `MAVEN_OPTS` を使って Datadog Java トレーサー JAR ファイルへのパスを指定し、テストを実行します。

トレーサーの引数を指定する際は、以下の情報を設定します。

* プロパティ `dd.civisibility.enabled` を `true` に設定して、CI Visibility を有効にします。
*  `dd.env property` を使用して、テストが実行される環境を定義します (例: 開発者のワークステーションでテストを実行するときは `local`、CI プロバイダーで実行するときは `ci`)。
* テストされるサービスまたはライブラリの名前を `dd.service property`  で定義します。

例:

{{< code-block lang="shell" >}}
MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app \
mvn clean verify
{{< /code-block >}}

`mvn verify` または `mvn test` ゴールは、インテグレーションテストを実行するために Maven Failsafe プラグインを実行するかどうかに応じて、どちらでも構いません。

{{% /tab %}}
{{% tab "Gradle" %}}

`DD_TRACER_FOLDER` 変数には、トレーサーをダウンロードしたパスを設定してください。

システムプロパティ `org.gradle.jvmargs` を使って Datadog Java トレーサー JAR ファイルへのパスを指定し、テストを実行します。

トレーサーの引数を指定する際は、以下の情報を設定します。

* プロパティ `dd.civisibility.enabled` を `true` に設定して、CI Visibility を有効にします。
*  `dd.env property` を使用して、テストが実行される環境を定義します (例: 開発者のワークステーションでテストを実行するときは `local`、CI プロバイダーで実行するときは `ci`)。
* テストされるサービスまたはライブラリの名前を `dd.service property` で定義します。

例:

{{< code-block lang="shell" >}}
./gradlew cleanTest test --rerun-tasks -Dorg.gradle.jvmargs=\
-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app
{{< /code-block >}}

コマンドラインで `org.gradle.jvmargs` を指定すると、別の場所で指定された値がオーバーライドされます。`gradle.properties` ファイルでこのプロパティを指定している場合は、必ずコマンドラインの引数で必要な設定を再現するようにしてください。

**注:** CI Visibility は [Gradle のコンフィギュレーションキャッシュ][1]と互換性がないため、トレーサーでテストを実行する際には、キャッシュを有効にしないでください。

[1]: https://docs.gradle.org/current/userguide/configuration_cache.html

{{% /tab %}}
{{< /tabs >}}

### テストにカスタムタグを追加する

現在アクティブなスパンを使用して、テストにカスタムタグを追加することができます。

```java
// テスト内
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test_owner", "my_team");
}
// テストは正常に続きます
// ...
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、Java カスタムインスツルメンテーションドキュメントの[タグの追加][1]セクションを参照してください。

## 手動テスト API

以下のサポートされているテストフレームワークのいずれかを使用する場合、Java トレーサーが自動的にテストのインスツルメンテーションを行い、Datadog バックエンドに結果を送信します。

サポート対象外のフレームや特製のテストソリューションを使用している場合は、手動テスト API を利用して、バックエンドにテスト結果を報告することもできます。

### 手動の API 依存関係の追加

手動 API クラスは `com.datadoghq:dd-trace-api` アーティファクトで利用可能です。

{{< tabs >}}
{{% tab "Maven" %}}

トレース API 依存関係を Maven プロジェクトに追加し、`$VERSION` を [Maven リポジトリ][1]からアクセス可能なトレーサーの最新バージョン (前の `v` は削除してください: ![Maven Central][2]) に変更します。

{{< code-block lang="xml" filename="pom.xml" >}}
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>$VERSION</version>
    <scope>test</scope>
</dependency>
{{< /code-block >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-trace-api?style=flat-square
{{% /tab %}}
{{% tab "Gradle" %}}

トレース API 依存関係を Maven プロジェクトに追加し、`$VERSION` を [Maven リポジトリ][1]からアクセス可能なトレーサーの最新バージョン (前の `v` は削除してください: ![Maven Central][2]) に変更します。

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    testImplementation "com.datadoghq:dd-trace-api:$VERSION"
}
{{< /code-block >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-trace-api?style=flat-square
{{% /tab %}}
{{< /tabs >}}

### ドメインモデル

この API は、テストセッション、テストモジュール、テストスイート、テストの 4 つの概念に基づいています。

#### テストセッション

テストセッションはプロジェクトのビルドを表し、通常はユーザーまたは CI スクリプトにより発行された 1 つのテストコマンドの実行に対応します。

テストセッションを開始するには、`datadog.trace.api.civisibility.CIVisibility#startSession` を呼び出し、プロジェクトの名前と使用したテストフレームワークの名前を渡します。

テストがすべて完了したら、`datadog.trace.api.civisibility.DDTestSession#end` を呼び出し、残りのテスト結果をすべてバックエンドに送信するようライブラリに強制します。

#### テストモジュール

テストモジュールはプロジェクトビルド内のより小さな作業単位を表し、通常はプロジェクトの 1 つのモジュールに対応します。例: Maven　のサブモジュールや Gradle のサブプロジェクト。

テストモードを開始するには、`datadog.trace.api.civisibility.DDTestSession#testModuleStart` を呼び出し、モジュール名を渡します。

モジュールでビルドとテストが完了したら、`datadog.trace.api.civisibility.DDTestModule#end` を呼び出します。

#### テストスイート

テストスイートは、共通の機能を持つテストのセットで構成されます。
これらのテストは、共通の初期化および終了を共有することができ、また、いくつかの変数を共有することができます。
各スイートは通常、テストケースを格納する 1 つの Java クラスに対応します。

テストモジュール内にテストスイートを作成するには、`datadog.trace.api.civisibility.DDTestModule#testSuiteStart` を呼び出し、テストスイート名を渡します。

スイートの中の関連するテストがすべて実行を終えたら `datadog.trace.api.civisibility.DDTestSuite#end` を呼び出します。

#### テスト

テストは、テストスイートの一部として実行される単一のテストケースを表します。
通常、テストのロジックを含む 1 つのメソッドに対応します。

スイート内にテストを作成するには、`datadog.trace.api.civisibility.DDTestSuite#testStart` を呼び出し、テスト名を渡します。

テストが実行を終えたら、`datadog.trace.api.civisibility.DDTest#end` を呼び出します。

### コード例

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

## 構成設定

[Datadog トレーサーの構成][2]オプションは、トレーサーの挙動を微調整するために利用可能です。

{{% ci-git-metadata %}}

{{% ci-information-collected %}}

## トラブルシューティング

### トレーサーで CI Visibility を有効にした後、Datadog にテストが表示されない

最新バージョンのトレーサーを使用していることを確認してください。

ビルドシステムとテストフレームワークが CI Visibility でサポートされていることを確認します。[サポートされているビルドシステムとテストフレームワーク](#compatibility)のリストを参照してください。

トレーサーの引数で、プロパティ `dd.civisibility.enabled` が `true` に設定されていることを確認します。

ビルドのアウトプットで、環境変数 `DD_API_KEY` の未設定など、トレーサーの構成ミスを示すエラーがないか確認します。

### トレーサーがアタッチされたプロジェクトをビルドする際に、テストやソースコードのコンパイルに失敗する

CI Visibility はデフォルトで、コンパイラープラグインがアタッチされた状態で Java コードのコンパイルを実行できるようになっています。

このプラグインは、パフォーマンスのオーバーヘッドを減らすためだけのもので、オプションです。

ビルドの構成によっては、プラグインを追加することで、コンパイルのプロセスが妨げられる場合があります。

プラグインがビルドに干渉する場合は、`-javaagent` 引数のリストに `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` を追加して、プラグインを無効にしてください。

### トレーサーがアタッチされた状態でプロジェクトをビルトすると、テストに失敗する

場合によっては、トレーサーをアタッチすることでテストが中断されることがあります。特に、JVM の内部状態やサードパーティライブラリのクラスのインスタンス上でアサーションを実行する場合、その可能性が高まります。

そうしたケースに対する最適なアプローチは、テストをアップデートすることですが、トレーサーのサードパーティライブラリインテグレーションを無効にするという、より迅速なオプションも存在します。

インテグレーションは、テスト対象のコードで何が起きるかについてより詳細なインサイトを提供し、HTTP リクエストやデータベースに対する呼び出しなどを監視する結合テストでは特に有用です。
インテグレーションは、デフォルトで有効になっています。

特定のインテグレーションを無効にするには、[Datadog Tracer Compatibility][3] テーブルを参照して、該当の構成プロパティ名を確認してください。
たとえば、`OkHttp3` クライアントリクエストのインテグレーションを無効にするには、`-javaagent` 引数のリストに`dd.integration.okhttp-3.enabled=false` を追加します。

すべてのインテグレーションを無効にするには、`-javaagent` 引数のリストに `dd.trace.enabled=false` を追加します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags
[2]: /ja/tracing/trace_collection/library_config/java/?tab=containers#configuration
[3]: /ja/tracing/trace_collection/compatibility/java#integrations