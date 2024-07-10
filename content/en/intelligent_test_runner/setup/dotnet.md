---
title: Intelligent Test Runner for .NET
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /continuous_integration/intelligent_test_runner/dotnet/
  - /continuous_integration/intelligent_test_runner/setup/dotnet/
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

## Compatibility

Intelligent Test Runner is only supported on `dd-trace>= 2.22.0` (execute `dd-trace --version` to get the version of the tool).

## Setup

### Test Visibility

Prior to setting up Intelligent Test Runner, set up [Test Visibility for .NET][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

{{% ci-itr-activation-instructions %}}

## Run tests with the Intelligent Test Runner enabled

After completing setup, run your tests as you normally do by using [dotnet test][2] or [VSTest.Console.exe][3]:

{{< tabs >}}

{{% tab "dotnet test" %}}


{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}


{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## Disable skipping for specific tests

You can override the Intelligent Test Runner's behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### Why make tests unskippable?

The Intelligent Test Runner uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

Examples include:

- Tests that read data from text files.
- Tests that interact with APIs outside of the code being tested (such as remote REST APIs).
- Designating tests as unskippable ensures that the Intelligent Test Runner runs them regardless of coverage data.

### Marking tests as unskippable

{{< tabs >}}
{{% tab "XUnit" %}}

#### Individual test case

Add a XUnit `TraitAttribute` with the key `datadog_itr_unskippable` to your test case to mark it as unskippable.

```csharp
using Xunit;
using Xunit.Abstractions;

public class MyTestSuite
{
  [Fact]
  [Trait("datadog_itr_unskippable", null)]
  public void MyTest()
  {
    // ...
  }
}
```

#### Test suite

Add a XUnit `TraitAttribute` with the key `datadog_itr_unskippable` to your test suite to mark it as unskippable.

If a suite is marked as unskippable, none of the test cases from that suite can be skipped by ITR.

```csharp
using Xunit;
using Xunit.Abstractions;

[Trait("datadog_itr_unskippable", null)]
public class MyTestSuite
{
  [Fact]
  public void MyTest()
  {
    // ...
  }
}
```

{{% /tab %}}
{{% tab "NUnit" %}}

#### Individual test case

Add a NUnit `PropertyAttribute` with the key `datadog_itr_unskippable` and a non-null value (for example, string.Empty) to your test case to mark it as unskippable.

```csharp
using NUnit.Framework;

public class MyTestSuite
{
  [Test]
  [Property("datadog_itr_unskippable", "")]
  public void MyTest()
  {
    // ...
  }
}
```

#### Test suite

Add a NUnit `PropertyAttribute` with the key `datadog_itr_unskippable` and a non-null value (for example, string.Empty) to your test suite to mark it as unskippable.

If a suite is marked as unskippable, none of the test cases from that suite can be skipped by ITR.

```csharp
using NUnit.Framework;

[Property("datadog_itr_unskippable", "")]
public class MyTestSuite
{
  [Test]
  public void MyTest()
  {
    // ...
  }
}
```

{{% /tab %}}
{{% tab "MsTestV2" %}}

#### Individual test case

Add a MsTestV2 `TestPropertyAttribute` with the key `datadog_itr_unskippable` to your test case to mark it as unskippable.

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class MyTestSuite
{
  [TestMethod]
  [TestProperty("datadog_itr_unskippable", null)]
  public void MyTest()
  {
    // ...
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/dotnet
[2]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[3]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options
