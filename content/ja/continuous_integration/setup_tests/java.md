---
title: Java テスト
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

サポートされているテストフレームワーク:
* JUnit >= 4.10 および >= 5.3
  * Spock Framework や Cucumber-Junit などの JUnit に基づくテストフレームワークも含まれます
* TestNG >= 6.4

## 前提条件

[Datadog Agent をインストールして、テストデータを収集します][1]。

## Java トレーサーのインストール

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
    <dd.java.agent.arg>-javaagent:${settings.localRepository}/com/datadoghq/dd-java-agent/$VERSION/dd-java-agent-$VERSION.jar -Ddd.service=my-java-app -Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true -Ddd.integration.testng.enabled=true</dd.java.agent.arg>
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
    jvmArgs = ["-javaagent:${configurations.ddTracerAgent.asPath}", "-Ddd.service=my-java-app", "-Ddd.prioritization.type=ENSURE_TRACE", "-Ddd.jmxfetch.enabled=false", "-Ddd.integrations.enabled=false", "-Ddd.integration.junit.enabled=true", "-Ddd.integration.testng.enabled=true"]
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


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/setup_tests/agent/
[2]: /ja/tracing/setup_overview/setup/java/?tab=containers#configuration
[3]: /ja/tracing/setup_overview/compatibility_requirements/java