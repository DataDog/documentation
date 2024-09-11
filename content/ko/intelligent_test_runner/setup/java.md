---
aliases:
- /continuous_integration/intelligent_test_runner/java/
- /continuous_integration/intelligent_test_runner/setup/java/
code_lang: java
code_lang_weight: 10
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
title: 자바(Java)용 지능형 테스트 러너
type: multi-code-lang
---

## 호환성

지능형 테스트 러너는 `dd-java-agent >= 1.27.0`에서 지원됩니다.

지원되는 테스트 프레임워크는 다음과 같습니다.
- JUnit >= 4.10 및 >= 5.3
- TestNG >= 6.4
- Spock >= 2.0
- Cucumber >= 5.4.0
- Karate >= 1.0.0
- Scalatest >= 3.0.8

## 설정

### 테스트 가시성

지능형 테스트 러너를 설정하기 전에 [자바(Java)용 테스트 가시성][1]을 설정하세요. 에이전트를 통해 데이터를 보고하는 경우 v6.40 이상 또는 v7.40 이상을 사용하세요.

{{% ci-itr-activation-instructions %}}

## 지능형 테스트 러너를 활성화하여 테스트 실행하기

설정이 완료되면 평소처럼 테스트를 실행합니다.

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

## 특정 테스트에 대한 건너뛰기 비활성화

지능형 테스트 러너의 동작을 재정의하여 특정 테스트가 건너뛰지 않도록 할 수 있습니다. 이러한 테스트를 건너뛸 수 없는 테스트라고 합니다.

### 테스트 건너뛰기를 불가능하게 하는 이유는 무엇인가요?

지능형 테스트 러너는 코드 검사 데이터를 사용하여 테스트를 건너뛰어야 하는지 여부를 결정합니다. 경우에 따라 이 데이터만으로는 결정을 내리는 데 충분하지 않을 수 있습니다.

예를 들면 다음과 같습니다:

- 텍스트 파일에서 데이터를 읽는 테스트
- 테스트 중인 코드 외부의 API와 상호 작용하는 테스트(예: 원격 REST API)
- 테스트를 건너뛸 수 없는 것으로 지정하면 지능형 테스트 러너가 커버리지 데이터에 관계없이 테스트를 실행합니다.

### 호환성

건너뛸 수 없는 테스트는 다음 버전 및 테스트 프레임워크에서 지원됩니다.

- JUnit >= 4.10 및 >= 5.3
- TestNG >= 6.4
- Spock >= 2.2
- Cucumber >= 5.4.0
- Scalatest >= 3.0.8

### 테스트를 건너뛸 수 없는 것으로 표시

{{< tabs >}}
{{% tab "JUnit 5" %}}

#### 개별 테스트 케이스

테스트 케이스에 `datadog_itr_unskippable` 값이 포함된 JUnit `Tag`을 추가하여 건너뛸 수 없는 테스트로 표시합니다.

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

#### 테스트 스위트

테스트 스위트(suite)에 `datadog_itr_unskippable` 값이 포함된 JUnit `Tag`을 추가하여 건너뛸 수 없는 테스트로 표시합니다.

스위트(suite)를 건너뛸 수 없는 스위트로 표시하면, ITR은 해당 스위트(suite)의 테스트 케이스 중 어떤 것도 건너뛸 수 없습니다.

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

#### 개별 테스트 케이스

테스트 케이스에 `datadog_itr_unskippable` 값이 포함된 JUnit `Category`을 추가하여 건너뛸 수 없는 테스트로 표시합니다.
모든 테스트 케이스 또는 테스트 스위트(suite)에 대해 `datadog_itr_unskippable`를 생성할 필요는 없습니다. 전체 프로젝트용 카테고리 하나만 생성해도 충분합니다.

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

#### 테스트 스위트

테스트 스위트(suite)에 `datadog_itr_unskippable` 값이 포함된 JUnit `Tag`을 추가하여 건너뛸 수 없는 스위트(suite)로 표시합니다.
모든 테스트 케이스 또는 테스트 스위트(suite)에 대해 `datadog_itr_unskippable`를 생성할 필요는 없습니다. 전체 프로젝트용 카테고리 하나만 생성해도 충분합니다.

스위트(suite)를 건너뛸 수 없는 스위트로 표시하면, ITR은 해당 스위트(suite)의 테스트 케이스 중 어느 것도 건너뛸 수 없습니다.

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

#### 개별 테스트 케이스

테스트 케이스에 `datadog_itr_unskippable` 값이 포함된 그룹을 추가하여 건너뛸 수 없는 테스트로 표시합니다.

```java
import org.testng.annotations.Test;

public class MyTestSuite {

  @Test(groups = "datadog_itr_unskippable")
  public void myTest() {
    // ...
  }
}
```

#### 테스트 스위트

테스트 스위트(suite)에 `datadog_itr_unskippable` 값이 포함된 그룹을 추가하여 건너뛸 수 없는 스위트(suite)로 표시합니다.

스위트(suite)를 건너뛸 수 없는 스위트로 표시하면, ITR은 해당 스위트(suite)의 테스트 케이스 중 어느 것도 건너뛸 수 없습니다.

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

#### 개별 테스트 사례

테스트 케이스에 `datadog_itr_unskippable` 값이 포함된 `spock.lang.Tag`을 추가하여 건너뛸 수 없는 테스트로 표시합니다.

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

#### 테스트 스위트

테스트 스위트(suite)에 `datadog_itr_unskippable` 값이 포함된 `spock.lang.Tag`을 추가하여 건너뛸 수 없는 스위트(suite)로 표시합니다.

스위트(suite)를 건너뛸 수 없는 스위트로 표시하면, ITR은 해당 스위트(suite)의 테스트 케이스 중 어느 것도 건너뛸 수 없습니다.

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

#### 개별 시나리오

gherkin 시나리오에 `datadog_itr_unskippable` 태그를 추가하여 건너뛸 수 없는 시나리오로 표시합니다.

```gherkin
Feature: My Feature

  @datadog_itr_unskippable
  Scenario: My Scenario
    # ...
```

#### 기능

gherkin 기능에 `datadog_itr_unskippable` 태그를 추가하여 건너뛸 수 없는 시나리오로 표시합니다.

기능을 건너뛸 수 없는 기능으로 표시하면, ITR은 해당 기능의 시나리오 중 어떤 것도 건너뛸 수 없습니다.

```gherkin
@datadog_itr_unskippable
Feature: My Feature

  Scenario: My Scenario
    # ...
```

{{% /tab %}}
{{% tab "ScalaTest" %}}

다음과 같이 `datadog_itr_unskippable` 값이 포함된 `Tag`를 생성하여 테스트 케이스를 태깅합니다.

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


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/tests/java
[2]: https://www.jacoco.org/jacoco/