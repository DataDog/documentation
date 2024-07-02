---
title: Intelligent Test Runner for Java
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /continuous_integration/intelligent_test_runner/java/
  - /continuous_integration/intelligent_test_runner/setup/java/

further_reading:
    - link: /continuous_integration/tests
      tag: Documentation
      text: Explore Test Results and Performance
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Troubleshooting CI Visibility
---

## Compatibility

Intelligent Test Runner is supported in `dd-java-agent >= 1.27.0`.

The following test frameworks are supported:
- JUnit >= 4.10 and >= 5.3
- TestNG >= 6.4
- Spock >= 2.0
- Cucumber >= 5.4.0
- Karate >= 1.0.0
- Scalatest >= 3.0.8

## セットアップ

### Test Visibility

Prior to setting up Intelligent Test Runner, set up [Test Visibility for Java][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

{{% ci-itr-activation-instructions %}}

## Run tests with the Intelligent Test Runner enabled

After completing setup, run your tests as you normally do:

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

## Disabling skipping for specific tests

You can override the Intelligent Test Runner's behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### Why make tests unskippable?

The Intelligent Test Runner uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

Examples include:

- Tests that read data from text files
- Tests that interact with APIs outside of the code being tested (such as remote REST APIs)
- Designating tests as unskippable ensures that the Intelligent Test Runner runs them regardless of coverage data.

### Compatibility

Unskippable tests are supported in the following versions and testing frameworks:

- JUnit >= 4.10 and >= 5.3
- TestNG >= 6.4
- Spock >= 2.2
- Cucumber >= 5.4.0
- Scalatest >= 3.0.8

### Marking tests as unskippable

{{< tabs >}}
{{% tab "JUnit 5" %}}

#### Individual test case

Add a JUnit `Tag` with the value `datadog_itr_unskippable` to your test case to mark it as unskippable.

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

#### Test suite

Add a JUnit `Tag` with the value `datadog_itr_unskippable` to your test suite to mark it as unskippable.

If a suite is marked as unskippable, none of the test cases from that suite can be skipped by ITR.

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

#### Individual test case

Add a JUnit `Category` with the value `datadog_itr_unskippable` to your test case to mark it as unskippable.
You do not have to create the `datadog_itr_unskippable` for every test case or test suite, one category is enough for the entire project.

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

#### Test suite

Add a JUnit `Tag` with the value `datadog_itr_unskippable` to your test suite to mark it as unskippable.
You do not have to create the `datadog_itr_unskippable` for every test case or test suite, one category is enough for the entire project.

If a suite is marked as unskippable, none of the test cases from that suite can be skipped by ITR.

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

#### Individual test case

Add a group with the value `datadog_itr_unskippable` to your test case to mark it as unskippable.

```java
import org.testng.annotations.Test;

public class MyTestSuite {

  @Test(groups = "datadog_itr_unskippable")
  public void myTest() {
    // ...
  }
}
```

#### Test suite

Add a group with the value `datadog_itr_unskippable` to your test suite to mark it as unskippable.

If a suite is marked as unskippable, none of the test cases from that suite can be skipped by ITR.

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

#### Individual test case

Add a `spock.lang.Tag` with the value `datadog_itr_unskippable` to your test case to mark it as unskippable.

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

#### Test suite

Add a `spock.lang.Tag` with the value `datadog_itr_unskippable` to your test suite to mark it as unskippable.

If a suite is marked as unskippable, none of the test cases from that suite can be skipped by ITR.

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

#### Individual scenario

Add `datadog_itr_unskippable` tag to your gherkin scenario to mark it as unskippable.

```gherkin
Feature: My Feature

  @datadog_itr_unskippable
  Scenario: My Scenario
    # ...
```

#### Feature

Add `datadog_itr_unskippable` tag to your gherkin feature to mark it as unskippable.

If a feature is marked as unskippable, none of the scenarios from that feature can be skipped by ITR.

```gherkin
@datadog_itr_unskippable
Feature: My Feature

  Scenario: My Scenario
    # ...
```

{{% /tab %}}
{{% tab "ScalaTest" %}}

Create a `Tag` with the value `datadog_itr_unskippable` and tag your test case with it:

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


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/java
[2]: https://www.jacoco.org/jacoco/
