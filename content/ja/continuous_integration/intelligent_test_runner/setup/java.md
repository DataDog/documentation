---
aliases:
- /ja/continuous_integration/integrate_tests/
code_lang: java
code_lang_weight: 10
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
is_beta: true
kind: ドキュメント
title: Java のための Intelligent Test Runner
type: multi-code-lang
---

{{< callout url="#" btn_hidden="true" >}}Java のための Intelligent Test Runner はベータ版です。{{< /callout >}}

## 互換性

Intelligent Test Runner は `dd-java-agent >= 1.22.0` でサポートされています。

以下のテストフレームワークがサポートされています。
- JUnit >= 4.10 および >= 5.3
- TestNG >= 6.4
- Spock >= 2.0
- Cucumber >= 5.4.0
- Karate >= 1.0.0

## セットアップ

### Test Visibility

Intelligent Test Runner をセットアップする前に、[Test Visibility for Java][1] をセットアップしてください。Agent を通してデータを報告する場合は、v6.40 以降または v7.40 以降を使用してください。

{{% ci-itr-activation-instructions %}}

## Intelligent Test Runner を有効にしたテストの実行

設定が完了したら、通常通りテストを実行します。

{{< tabs >}}
{{% tab "Gradle" %}}

{{< code-block lang="shell" >}}
./gradlew cleanTest test -Dorg.gradle.jvmargs=\
-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app
{{< /code-block >}}

{{% /tab %}}
{{% tab "Maven" %}}

{{< code-block lang="shell" >}}
MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app \
mvn clean verify
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 特定のテストに対するスキップの無効化

Intelligent Test Runner の動作をオーバーライドして、特定のテストがスキップされないようにすることができます。これらのテストは、スキップできないテストと呼ばれます。

### テストをスキップできないようにする理由は？

Intelligent Test Runner は、テストをスキップすべきかどうかを判断するために、コードカバレッジデータを使用します。場合によっては、このデータだけでは判断できないこともあります。

例:

- テキストファイルからデータを読み込むテスト
- テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)
- テストをスキップ不可に指定すると、カバレッジデータに関係なく Intelligent Test Runner がテストを実行します。

### 互換性

スキップできないテストは、以下のバージョンとテストフレームワークでサポートされています。

- JUnit >= 4.10 および >= 5.3
- TestNG >= 6.4
- Spock >= 2.2
- Cucumber >= 5.4.0

### テストをスキップ不可にマークする

{{< tabs >}}
{{% tab "JUnit 5" %}}

#### 個別のテストケース

値 `datadog_itr_unskippable` を指定した JUnit `Tag` をテストケースに追加して、スキップ不可とマークします。

```java
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Tags;
import org.junit.jupiter.api.Test;

public class MyTestSuite {

  @Test
  @Tags({@Tag("datadog_itr_unskippable")})
  public void myTest() {
    // ...
  }
}
```

#### テストスイート

値 `datadog_itr_unskippable` を指定した JUnit `Tag` をテストスイートに追加して、スキップ不可とマークします。

スイートがスキップ不可とマークされている場合、ITR によってそのスイートのテストケースをスキップすることはできません。

```java
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Tags;
import org.junit.jupiter.api.Test;

@Tags({@Tag("datadog_itr_unskippable")})
public class MyTestSuite {

  @Test
  public void myTest() {
    // ...
  }
}
```

{{% /tab %}}
{{% tab "JUnit 4" %}}

#### 個別のテストケース

値 `datadog_itr_unskippable` を指定した JUnit `Category` をテストケースに追加して、スキップ不可とマークします。
すべてのテストケースやテストスイートに対して `datadog_itr_unskippable` を作成する必要はありません。プロジェクト全体に対して 1 つのカテゴリーで十分です。

```java
import org.junit.Test;
import org.junit.experimental.categories.Category;

public class MyTestSuite {

  @Category(datadog_itr_unskippable.class)
  @Test
  public void myTest() {
    // ...
  }

  public interface datadog_itr_unskippable {}
}
```

#### テストスイート

値 `datadog_itr_unskippable` を指定した JUnit `Tag` をテストスイートに追加して、スキップ不可とマークします。
すべてのテストケースやテストスイートに対して `datadog_itr_unskippable` を作成する必要はありません。プロジェクト全体に対して 1 つのカテゴリーで十分です。

スイートがスキップ不可とマークされている場合、ITR によってそのスイートのテストケースをスキップすることはできません。

```java
import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category(MyTestSuite.datadog_itr_unskippable.class)
public class MyTestSuite {

  @Test
  public void myTest() {
    // ...
  }

  public interface datadog_itr_unskippable {}
}
```

{{% /tab %}}
{{% tab "TestNG" %}}

#### 個別のテストケース

値 `datadog_itr_unskippable` を指定したグループをテストケースに追加して、スキップ不可とマークします。

```java
import org.testng.annotations.Test;

public class MyTestSuite {

  @Test(groups = "datadog_itr_unskippable")
  public void myTest() {
    // ...
  }
}
```

#### テストスイート

値 `datadog_itr_unskippable` を指定したグループをテストスイートに追加して、スキップ不可とマークします。

スイートがスキップ不可とマークされている場合、ITR によってそのスイートのテストケースをスキップすることはできません。

```java
import org.testng.annotations.Test;

@Test(groups = "datadog_itr_unskippable")
public class MyTestSuite {

  @Test
  public void myTest() {
    // ...
  }
}
```

{{% /tab %}}
{{% tab "Spock" %}}

#### 個別のテストケース

値 `datadog_itr_unskippable` を指定した `spock.lang.Tag` をテストケースに追加して、スキップ不可とマークします。

```java
import spock.lang.Specification
import spock.lang.Tag

class MyTestSuite extends Specification {

  @Tag("datadog_itr_unskippable")
  def myTest() {
    // ...
  }
}
```

#### テストスイート

値 `datadog_itr_unskippable` を指定した `spock.lang.Tag` をテストスイートに追加して、スキップ不可とマークします。

スイートがスキップ不可とマークされている場合、ITR によってそのスイートのテストケースをスキップすることはできません。

```java
import spock.lang.Specification
import spock.lang.Tag

@Tag("datadog_itr_unskippable")
class MyTestSuite extends Specification {

  def myTest() {
    // ...
  }
}
```

{{% /tab %}}
{{% tab "Cucumber" %}}

#### 個別シナリオ

gherkin シナリオに `datadog_itr_unskippable` タグを追加して、スキップ不可とマークします。

```gherkin
Feature: My Feature

  @datadog_itr_unskippable
  Scenario: My Scenario
    # ...
```

#### 機能

gherkin 機能に `datadog_itr_unskippable` タグを追加して、スキップ不可とマークします。

機能がスキップ不可とマークされている場合、その機能のシナリオは ITR によってスキップされることはありません。

```gherkin
@datadog_itr_unskippable
Feature: My Feature

  Scenario: My Scenario
    # ...
```

{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/java
[2]: https://www.jacoco.org/jacoco/