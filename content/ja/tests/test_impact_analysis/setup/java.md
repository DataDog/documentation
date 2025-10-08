---
aliases:
- /ja/continuous_integration/intelligent_test_runner/java/
- /ja/continuous_integration/intelligent_test_runner/setup/java/
- /ja/intelligent_test_runner/setup/java
code_lang: java
code_lang_weight: 10
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: Java 向け Test Impact Analysis
type: multi-code-lang
---

## 互換性

Test Impact Analysis は `dd-java-agent >= 1.27.0` でサポートされています。

以下のテストフレームワークがサポートされています。
- JUnit >= 4.10 および >= 5.3
- TestNG >= 6.4
- Spock >= 2.0
- Cucumber >= 5.4.0
- Karate >= 1.0.0
- ScalaTest 3.0.8 以上

## セットアップ

### テストの最適化

Test Impact Analysis を設定する前に、[Java 向け Test Optimization][1] をセットアップしてください。Agent 経由でデータを報告する場合は、v6.40 以降または v7.40 以降を使用してください。

{{% ci-itr-activation-instructions %}}

## Test Impact Analysis を有効にしてテストを実行する

設定が完了したら、通常通りテストを実行します。

{{< tabs >}}
{{% tab "Gradle" %}}

{{< code-block lang="shell" >}}
DD_CIVISIBILITY_ENABLED=true \
DD_ENV=ci \
DD_SERVICE=my-java-app \
GRADLE_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar \
./gradlew clean test
{{< /code-block >}}

{{% /tab %}}
{{% tab "Maven" %}}

{{< code-block lang="shell" >}}
DD_CIVISIBILITY_ENABLED=true \
DD_ENV=ci \
DD_SERVICE=my-java-app \
MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar \
mvn clean verify
{{< /code-block >}}

{{% /tab %}}
{{% tab "その他" %}}

{{< code-block lang="shell" >}}
DD_CIVISIBILITY_ENABLED=true \
DD_ENV=ci \
DD_SERVICE=my-java-app \
JAVA_TOOL_OPTIONS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar \
// テストを実行
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 特定のテストに対するスキップの無効化

Test Impact Analysis の動作を上書きし、特定のテストがスキップされないようにできます。これらのテストは unskippable テストと呼ばれます。

### テストをスキップできないようにする理由は？

Test Impact Analysis はコード カバレッジ データを使用してテストをスキップすべきかどうかを判断します。場合によっては、このデータだけでは判断が不十分なことがあります。

例:

- テキストファイルからデータを読み込むテスト
- テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)
- テストを unskippable に指定すると、カバレッジ データに関係なく Test Impact Analysis によって常に実行されます。

### 互換性

スキップできないテストは、以下のバージョンとテストフレームワークでサポートされています。

- JUnit >= 4.10 および >= 5.3
- TestNG >= 6.4
- Spock >= 2.2
- Cucumber >= 5.4.0
- ScalaTest 3.0.8 以上

### unskippable テストの指定方法

{{< tabs >}}
{{% tab "JUnit 5" %}}

#### 個別のテスト ケース

テスト ケースをスキップ不可にするには、JUnit `Tag` 値 `datadog_itr_unskippable` を追加します。

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

テスト スイートをスキップ不可にするには、JUnit `Tag` 値 `datadog_itr_unskippable` を追加します。

スイートがスキップ不可に指定されている場合、そのスイート内のテスト ケースは Test Impact Analysis によりスキップされません。

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

#### 個別のテスト ケース

"テスト ケースをスキップ不可にするには、JUnit `Category` 値 `datadog_itr_unskippable` を追加します。
すべてのテスト ケースまたはテスト スイートごとに `datadog_itr_unskippable` を作成する必要はありません。プロジェクト 全体で 1 つの Category で十分です。"

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

"テスト スイートをスキップ不可にするには、JUnit `Tag` 値 `datadog_itr_unskippable` を追加します。
すべてのテスト ケースまたはテスト スイートごとに `datadog_itr_unskippable` を作成する必要はありません。プロジェクト全体で 1 つの Category で十分です。"

スイートがスキップ不可に指定されている場合、そのスイート内のテスト ケースは Test Impact Analysis によりスキップされません。

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

#### 個別のテスト ケース

テスト ケースをスキップ不可にするには、`datadog_itr_unskippable` グループをテスト ケースに追加します。

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

テスト スイートをスキップ不可にするには、`datadog_itr_unskippable` グループをテスト スイートに追加します。

スイートがスキップ不可に指定されている場合、そのスイート内のテスト ケースは Test Impact Analysis によりスキップされません。

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

#### 個別のテスト ケース

テスト ケースをスキップ不可にするには、`spock.lang.Tag` 値 `datadog_itr_unskippable` を追加します。

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

テスト スイートをスキップ不可にするには、`spock.lang.Tag` 値 `datadog_itr_unskippable` を追加します。

スイートがスキップ不可に指定されている場合、そのスイート内のテスト ケースは Test Impact Analysis によりスキップされません。

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

#### 個別のシナリオ

Gherkin シナリオをスキップ不可にするには、`datadog_itr_unskippable` タグを追加します。

```gherkin
Feature: My Feature

  @datadog_itr_unskippable
  Scenario: My Scenario
    # ...
```

#### 機能

Gherkin フィーチャーをスキップ不可にするには、`datadog_itr_unskippable` タグを追加します。

フィーチャーがスキップ不可に指定されている場合、そのフィーチャー内のシナリオは Test Impact Analysis によりスキップされません。

```gherkin
@datadog_itr_unskippable
Feature: My Feature

  Scenario: My Scenario
    # ...
```

{{% /tab %}}
{{% tab "ScalaTest" %}}

`datadog_itr_unskippable` 値を持つ `Tag` を作成し、それをテスト ケースに付与します。

```scala
import org.scalatest.Tag
import org.scalatest.flatspec.AnyFlatSpec

object ItrUnskippableTag extends Tag("datadog_itr_unskippable")

class MyTestSuite extends AnyFlatSpec {
  "myTest" should "assert something" taggedAs ItrUnskippableTag in {
    // ...
  }
}
```

{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/java
[2]: https://www.jacoco.org/jacoco/