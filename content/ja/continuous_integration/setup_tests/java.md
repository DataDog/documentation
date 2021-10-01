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
* JUnit 4.10+
* JUnit 5.3+
* TestNG 6.4+
* Spock Framework および Cucumber-Junit など、JUnit ベースのフレームワーク

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

## 前提条件

[Datadog Agent をインストールして、テストデータを収集します][1]。

## Java トレーサーのインストール

### Maven

ルートの `pom.xml` に新しい Maven プロファイルを追加し、Datadog Java トレーサーの依存関係と `javaagent` arg のプロパティを構成します。その際に、`$VERSION` を [Maven リポジトリ][2]からアクセス可能なトレーサーの最新のバージョンで置き換えます:

{{< code-block lang="xml" >}}
<profile>
  <id>ci-app</id>
  <activation>
    <activeByDefault>false</activeByDefault>
  </activation>

  <properties>
    <dd.java.agent.arg>-javaagent:${settings.localRepository}/com/datadoghq/dd-java-agent/$VERSION/dd-java-agent-$VERSION.jar</dd.java.agent.arg>
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

### Gradle

`ddTracerAgent` エントリを `configurations` タスクブロックに追加し、Datadog Java トレーサーの依存関係を追加します。その際に、`$VERSION` を [Maven リポジトリ][2]で利用可能なトレーサーの最新のバージョンで置き換えます。

{{< code-block lang="groovy" >}}
configurations {
    ddTracerAgent
}

dependencies {
    ddTracerAgent "com.datadoghq:dd-java-agent:$VERSION"
}
{{< /code-block >}}

## テストのインスツルメンテーション

### Maven

[Maven Surefire プラグイン][3]および/または [Maven Failsafe プラグイン][4]を、Datadog Java Agent を使用するよう構成します (テストフレームワークとして JUnit ではなく、TestNG を使用している場合は `-Ddd.integration.testng.enabled=true` を使用してください):

{{< code-block lang="xml" >}}
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <argLine>${dd.java.agent.arg} -Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true</argLine>
  </configuration>
</plugin>

<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-failsafe-plugin</artifactId>
  <configuration>
     <argLine>${dd.java.agent.arg} -Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true</argLine>
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

`ci-app` プロファイルを使用してテストを実行します。例:

{{< code-block lang="bash" >}}
mvn clean verify -P ci-app
{{< /code-block >}}

### Gradle

`configurations.ddTracerAgent` プロパティに基づき、Datadog Java トレーサーをターゲットとする `-javaagent` 引数を `jvmArgs` 属性に追加して、`test` Gradle タスクを構成します (テストフレームワークとして JUnit ではなく、TestNG を使用している場合は `-Ddd.integration.testng.enabled=true` を使用してください)。

{{< code-block lang="groovy" >}}
test {
    jvmArgs = ["-javaagent:${configurations.ddTracerAgent.asPath}", "-Ddd.prioritization.type=ENSURE_TRACE", "-Ddd.jmxfetch.enabled=false", "-Ddd.integrations.enabled=false", "-Ddd.integration.junit.enabled=true"]
}
{{< /code-block >}}

通常と同じ方法でテストを実行します。例:

{{< code-block lang="bash" >}}
./gradlew cleanTest test --rerun-tasks
{{< /code-block >}}

**重要:** Gradle でのビルドはプログラムを通じてカスタマイズできるため、これらのステップを特定のビルドコンフィギュレーションに適応させなければならない場合があります。

## コンフィギュレーションオプション

次のシステムプロパティはコンフィギュレーションのオプションを設定するもので、環境変数と同等の値を持ちます。両方に同じキータイプが設定されている場合は、システムプロパティコンフィギュレーションが優先されます。 システムプロパティは、JVM フラグとして設定できます。

`dd.integration.junit.enabled`
: `true` の場合、JUnit  ランナーに基づくテストを報告します。<br/>
**環境変数**: `DD_INTEGRATION_JUNIT_ENABLED`<br/>
**デフォルト**: `false`

`dd.integration.testng.enabled`
: `true` の場合、TestNG に基づくテストを報告します。<br/>
**環境変数**: `DD_INTEGRATION_TESTNG_ENABLED`<br/>
**デフォルト**: `false`

また、トレーサーの優先タイプを `EnsureTrace` に設定してテストスパンからの逸脱を回避します。

`dd.prioritization.type`
: トレーサーによるテストスパンの逸脱を避けるため、`ENSURE_TRACE` に設定します。<br/>
**環境変数**: `DD_PRIORITIZATION_TYPE`<br/>
**デフォルト**: `FAST_LANE`

[Datadog トレーサーのコンフィギュレーション][5]オプションはテストフェーズで利用可能です。

### 推奨されるコンフィギュレーション

Datadog Java Agent の起動を改善するには、次のコンフィギュレーション設定に従ってください:

システムプロパティ: `dd.service`
: **環境変数**: `DD_SERVICE`<br/>
**デフォルト**: `unnamed-java-app`</br>
**設定値**: CI Tests タブに表示されるテストサービス名。

システムプロパティ: `dd.agent.host`
: **環境変数**: `DD_AGENT_HOST`<br/>
**デフォルト**: `localhost`</br>
**設定値**: Datadog Agent のホスト。

システムプロパティ: `dd.trace.agent.port`
: **環境変数**: `DD_TRACE_AGENT_PORT`<br/>
**デフォルト**: `8126`</br>
**設定値**: Datadog Agent のポート。

システムプロパティ: `dd.integrations.enabled`
: **環境変数**: `DD_INTEGRATIONS_ENABLED`<br/>
**デフォルト**: `true`</br>
**推奨値**: `false`

システムプロパティ: `dd.integration.junit.enabled` or `dd.integration.testng.enabled`
: **環境変数**: `DD_INTEGRATION_JUNIT_ENABLED` or `DD_INTEGRATION_TESTNG_ENABLED`<br/>
**デフォルト**: `false`</br>
**推奨値**: `true`

システムプロパティ: `dd.prioritization.type`
: **環境変数**: `DD_PRIORITIZATION_TYPE`<br/>
**デフォルト**: `FAST_LANE`</br>
**推奨値**: `ENSURE_TRACE`

システムプロパティ: `dd.jmxfetch.enabled`
: **環境変数**: `DD_JMXFETCH_ENABLED`<br/>
**デフォルト**: `true`</br>
**推奨値**: `false`

**重要:** インテグレーションテストを行う際に、より多くのインテグレーションを有効化したい場合があるかもしれません。特殊なインテグレーションを有効化するには、[Datadog Tracer Compatibility][6] テーブルを使用してインテグレーションテスト用のカスタム設定を作成してください。

たとえば、`OkHttp3` クライアントリクエストのインテグレーションを有効化する場合は、設定に `-Ddd.integration.okhttp-3.enabled=true` を追加します。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/setup_tests/agent/
[2]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[3]: https://maven.apache.org/surefire/maven-surefire-plugin/
[4]: https://maven.apache.org/surefire/maven-failsafe-plugin/
[5]: /ja/tracing/setup_overview/setup/java/?tab=containers#configuration
[6]: /ja/tracing/setup_overview/compatibility_requirements/java