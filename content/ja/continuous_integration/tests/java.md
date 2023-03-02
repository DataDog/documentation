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
  text: トラブルシューティング CI
kind: documentation
title: Java テスト
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、現時点では CI Visibility は使用できません。</div>
{{< /site-region >}}

## 互換性

対応するテストフレームワーク:
* JUnit >= 4.10 および >= 5.3
* また、Spock Framework や Cucumber-Junit など、JUnit をベースにしたテストフレームワークも含まれます。**注**: JUnit 4 を使用する Cucumber v1 のみがサポートされています。
* TestNG >= 6.4

## 報告方法の構成

Datadog にテスト結果を報告するには、Datadog の Java ライブラリを構成する必要があります。

{{< tabs >}}

{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

Jenkins や自己管理型の GitLab CI などのオンプレミス CI プロバイダーでテストを実行する場合、[Agent インストール手順][1]に従って各ワーカノードに Datadog Agent をインストールします。これは、テスト結果が自動的に基礎となるホストメトリクスにリンクされるため、推奨されるオプションです。

CI プロバイダーがコンテナベースのエグゼキューターを使用している場合、ビルド内の `localhost` の使用ではコンテナ自体を参照しており、Datadog Agent が動作している基礎となるワーカーノードではないため、すべてのビルドで `DD_AGENT_HOST` 環境変数 (デフォルトは `http://localhost:8126`) を、ビルドコンテナの中からアクセスできるエンドポイントに設定します。

Kubernetes のエグゼキューターを使用している場合、Datadog は [Datadog Admission Controller][2] の使用を推奨しており、これは自動的にビルドポッドの環境変数 `DD_AGENT_HOST` を設定してローカルの Datadog Agent と通信させます。


[1]: /ja/agent/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{% tab "クラウド CI プロバイダー (Agentless)" %}}

<div class="alert alert-info">Agentless モードは、Datadog Java ライブラリのバージョン >= 0.101.0 で使用できます</div>

GitHub Actions や CircleCI など、基盤となるワーカーノードにアクセスできないクラウド CI プロバイダーを使用している場合は、Agentless モードを使用するようにライブラリを構成します。そのためには、以下の環境変数を設定します。

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (必須)
: Agentless モードを有効または無効にします。<br/>
**デフォルト**: `false`

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][1]。<br/>
**デフォルト**: `(empty)`

さらに、どの [Datadog サイト][2]にデータを送信するかを構成します。

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][2]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/
{{< /tabs >}}

{{< /tabs >}}

## Java トレーサーのインストール

Java トレーサー v0.101.0 以降をインストールし、有効にします。

{{< tabs >}}
{{% tab "Maven" %}}

ルートの `pom.xml` に新しい Maven プロファイルを追加し、Datadog Java トレーサーの依存関係と `javaagent` arg のプロパティを構成します。その際に、`$VERSION` を [Maven リポジトリ][1]からアクセス可能なトレーサーの最新のバージョンで置き換えます (先行する `v` なし): ![Maven Central][2]

{{< code-block lang="xml" filename="pom.xml" >}}
<profile>
  <id>dd-civisibility</id>
  <activation>
    <activeByDefault>false</activeByDefault>
  </activation>
  <properties>
    <dd.java.agent.arg>-javaagent:${settings.localRepository}/com/datadoghq/dd-java-agent/$VERSION/dd-java-agent-$VERSION.jar -Ddd.service=my-java-app -Ddd.civisibility.enabled=true</dd.java.agent.arg>
  </properties>
  <dependencies>
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-java-agent</artifactId>
        <version>$VERSION</version>
        <scope>provided</scope>
    </dependency>
  </dependencies>
</profile>
{{< /code-block >}}


[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-java-agent?style=flat-square
{{% /tab %}}
{{% tab "Gradle" %}}

`ddTracerAgent` エントリを `configurations` タスクブロックに追加し、Datadog Java トレーサーの依存関係を追加します。その際に、`$VERSION` を [Maven リポジトリ][2]で利用可能なトレーサーの最新のバージョンで置き換えます (先行する `v` なし): ![Maven Central][2]

{{< code-block lang="groovy" filename="build.gradle" >}}
configurations {
    ddTracerAgent
}
dependencies {
    ddTracerAgent "com.datadoghq:dd-java-agent:$VERSION"
}
{{< /code-block >}}


[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-java-agent?style=flat-square
{{% /tab %}}
{{< /tabs >}}

### Java コンパイラープラグインのインストール

Java コンパイラープラグインはトレーサーと連携し、ソースコードの情報を追加で提供します。
プラグインをインストールすることで、特定の CI visibility 機能のパフォーマンスと精度を向上させることができます。

このプラグインは標準的な `javac` コンパイラーで動作します (Eclipse JDT コンパイラーはサポートされていません)。

構成が成功すると、コンパイラーの出力に `DatadogCompilerPlugin initialized` という行が表示されるはずです。

{{< tabs >}}
{{% tab "Maven" %}}

トレーサー設定用のルート `pom.xml` に追加したのと同じ Maven プロファイルの関連セクションに、以下のスニペットを含めます。
`$VERSION` は、[Maven リポジトリ][1]からアクセスできるアーティファクトの最新バージョンに置き換えてください (前の `v` は削除してください): ![Maven Central][2]

{{< code-block lang="xml" filename="pom.xml" >}}
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-javac-plugin-client</artifactId>
    <version>$VERSION</version>
</dependency>
{{< /code-block >}}

{{< code-block lang="xml" filename="pom.xml" >}}
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.5</version>
            <configuration>
                <annotationProcessorPaths>
                    <annotationProcessorPath>
                        <groupId>com.datadoghq</groupId>
                        <artifactId>dd-javac-plugin</artifactId>
                        <version>$VERSION</version>
                    </annotationProcessorPath>
                </annotationProcessorPaths>
                <compilerArgs>
                    <arg>-Xplugin:DatadogCompilerPlugin</arg>
                </compilerArgs>
            </configuration>
        </plugin>
    </plugins>
</build>
{{< /code-block >}}

Maven コンパイラープラグインは、バージョン 3.5 から [annotationProcessorPaths][3] プロパティをサポートしています。どうしても古いバージョンを使用したい場合は、プロジェクトで Datadog コンパイラープラグインを通常の依存関係として宣言してください。

さらに、JDK 16 以降を使用している場合は、プロジェクトのベースディレクトリにある [.mvn/jvm.config][4] ファイルに以下の行を追加してください。

{{< code-block lang="properties" filename=".mvn/jvm.config" >}}
--add-exports=jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED
--add-exports=jdk.compiler/com.sun.tools.javac.code=ALL-UNNAMED
--add-exports=jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED
--add-exports=jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED
{{< /code-block >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-javac-plugin
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-javac-plugin?style=flat-square
[3]: https://maven.apache.org/plugins/maven-compiler-plugin/compile-mojo.html#annotationProcessorPaths
[4]: https://maven.apache.org/configure.html#mvn-jvm-config-file

{{% /tab %}}
{{% tab "Gradle" %}}

plugin-client JAR をプロジェクトのクラスパスに追加し、plugin JAR をコンパイラーのアノテーション処理系パスに追加し、Java クラスをコンパイルするタスクに plugin の引数を渡します。

`$VERSION` は、[Maven リポジトリ][1]からアクセスできるアーティファクトの最新バージョンに置き換えてください (前の `v` は削除してください): ![Maven Central][2]

{{< code-block lang="groovy" filename="build.gradle" >}}
if (project.hasProperty("dd-civisibility")) {
    dependencies {
        implementation 'com.datadoghq:dd-javac-plugin-client:$VERSION'
        annotationProcessor 'com.datadoghq:dd-javac-plugin:$VERSION'
        testAnnotationProcessor 'com.datadoghq:dd-javac-plugin:$VERSION'
    }

    tasks.withType(JavaCompile).configureEach {
        options.compilerArgs.add('-Xplugin:DatadogCompilerPlugin')
    }
}
{{< /code-block >}}

さらに、JDK 16 以降を使用している場合は、[gradle.properties][3] ファイルに以下の行を追加してください。

{{< code-block lang="properties" filename="gradle.properties" >}}
org.gradle.jvmargs=\
--add-exports=jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED  \
--add-exports=jdk.compiler/com.sun.tools.javac.code=ALL-UNNAMED \
--add-exports=jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED \
--add-exports=jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED
{{< /code-block >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-javac-plugin
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-javac-plugin?style=flat-square
[3]: https://docs.gradle.org/current/userguide/build_environment.html#sec:gradle_configuration_properties

{{% /tab %}}
{{< /tabs >}}

## テストのインスツルメンテーション

{{< tabs >}}
{{% tab "Maven" %}}

[Maven Surefire プラグイン][1]または [Maven Failsafe プラグイン][2] (または両方を使用する場合は両方) を構成して、Datadog Java Agent を使用し、テスト対象のサービスまたはライブラリの名前を `-Ddd.service` プロパティで指定します。

* [Maven Surefire プラグイン][1]を使用している場合:

{{< code-block lang="xml" filename="pom.xml" >}}
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <argLine>${dd.java.agent.arg}</argLine>
  </configuration>
</plugin>
{{< /code-block >}}

* [Maven Failsafe プラグイン][2]を使用している場合:

{{< code-block lang="xml" filename="pom.xml" >}}
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-failsafe-plugin</artifactId>
  <configuration>
     <argLine>${dd.java.agent.arg}</argLine>
  </configuration>
  <executions>
      <execution>
        <goals>
           <goal>integration-test</goal>
           <goal>verify</goal>
        </goals>
      </execution>
  </executions>
</plugin>
{{< /code-block >}}

`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

{{< code-block lang="bash" >}}
DD_ENV=ci mvn clean verify -Pdd-civisibility
{{< /code-block >}}


[1]: https://maven.apache.org/surefire/maven-surefire-plugin/
[2]: https://maven.apache.org/surefire/maven-failsafe-plugin/
{{% /tab %}}
{{% tab "Gradle" %}}

`configurations.ddTracerAgent` プロパティに基づいて Datadog Java トレーサーをターゲットとする `-javaagent` 引数を `jvmArgs` 属性に追加し、`-Ddd.service` プロパティでテスト対象のサービスまたはライブラリの名前を指定して、`test` Gradle タスクを構成します。

{{< code-block lang="groovy" filename="build.gradle" >}}
test {
  if(project.hasProperty("dd-civisibility")) {
    jvmArgs = ["-javaagent:${configurations.ddTracerAgent.asPath}", "-Ddd.service=my-java-app", "-Ddd.civisibility.enabled=true"]
  }
}
{{< /code-block >}}

`DD_ENV` 環境変数でテストを実行する環境 (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`) を指定して、通常どおりにテストを実行します。例:

{{< code-block lang="bash" >}}
DD_ENV=ci ./gradlew cleanTest test -Pdd-civisibility --rerun-tasks
{{< /code-block >}}

**注:** Gradle でのビルドはプログラムを通じてカスタマイズできるため、これらのステップを特定のビルドコンフィギュレーションに適応させなければならない場合があります。

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

## コンフィギュレーション設定

次のシステムプロパティはコンフィギュレーションのオプションを設定するもので、環境変数と同等の値を持ちます。両方に同じキータイプが設定されている場合は、システムプロパティコンフィギュレーションが優先されます。 システムプロパティは、JVM フラグとして設定できます。

`dd.service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: `unnamed-java-app`<br/>
**例**: `my-java-app`

`dd.env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

`dd.trace.agent.url`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**環境変数**: `DD_TRACE_AGENT_URL`<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサーコンフィギュレーション][2]オプションも使用できます。

**重要:** インテグレーションテストを行う際に、より多くのインテグレーションを有効化したい場合があるかもしれません。特殊なインテグレーションを有効化するには、[Datadog Tracer Compatibility][3] テーブルを使用してインテグレーションテスト用のカスタム設定を作成してください。

たとえば、`OkHttp3` クライアントリクエストのインテグレーションを有効化する場合は、設定に `-Ddd.integration.okhttp-3.enabled=true` を追加します。

### Git のメタデータを収集する

Datadog は、テスト結果を可視化し、リポジトリ、ブランチ、コミットごとにグループ化するために Git の情報を使用します。Git のメタデータは、CI プロバイダーの環境変数や、プロジェクトパス内のローカルな `.git` フォルダがあれば、そこからテストインスツルメンテーションによって自動的に収集されます。

サポートされていない CI プロバイダーでテストを実行する場合や、`.git` フォルダがない場合は、環境変数を使って Git の情報を手動で設定することができます。これらの環境変数は、自動検出された情報よりも優先されます。Git の情報を提供するために、以下の環境変数を設定します。

`DD_GIT_REPOSITORY_URL`
: コードが格納されているリポジトリの URL。HTTP と SSH の両方の URL に対応しています。<br/>
**例**: `git@github.com:MyCompany/MyApp.git`、`https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: テスト中の Git ブランチ。タグ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `develop`

`DD_GIT_TAG`
: テストされる Git タグ (該当する場合)。ブランチ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: フルコミットハッシュ。<br/>
**例**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: コミットのメッセージ。<br/>
**例**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: コミット作成者名。<br/>
**例**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: コミット作成者メールアドレス。<br/>
**例**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: ISO 8601 形式のコミット作成者の日付。<br/>
**例**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: コミットのコミッター名。<br/>
**例**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: コミットのコミッターのメールアドレス。<br/>
**例**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: ISO 8601 形式のコミットのコミッターの日付。<br/>
**例**: `2021-03-12T16:00:28Z`

## 収集した情報

CI Visibility を有効にすると、プロジェクトから以下のデータが収集されます。

* テストの名前と時間。
* CI プロバイダーが設定する事前定義された環境変数。
* Git のコミット履歴。ハッシュ、メッセージ、作成者情報、変更されたファイル (ファイルの内容は含まず) が含まれます。
* CODEOWNERS ファイルからの情報。

## トラブルシューティング

### トレーサーで CI Visibility を有効にした後、Datadog にテストが表示されない

Datadog にテストが表示されない場合は、Java トレーサのバージョン 0.91.0 以降を使用していることを確認してください。
`-Ddd.civisibility.enabled=true` のコンフィギュレーションプロパティは、そのバージョン以降でのみ利用可能です。

以前のバージョンのトレーサーを使用する必要がある場合、以下のシステムプロパティを使用して CI Visibility を構成することができます。
{{< code-block lang="bash" >}}
-Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true -Ddd.integration.testng.enabled=true
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags
[2]: /ja/tracing/trace_collection/library_config/java/?tab=containers#configuration
[3]: /ja/tracing/trace_collection/compatibility/java