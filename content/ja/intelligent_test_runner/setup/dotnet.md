---
aliases:
- /ja/continuous_integration/intelligent_test_runner/dotnet/
- /ja/continuous_integration/intelligent_test_runner/setup/dotnet/
code_lang: dotnet
code_lang_weight: 0
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: Explore Test Results and Performance
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Troubleshooting CI Visibility
title: Intelligent Test Runner for .NET
type: multi-code-lang
---

## 互換性

Intelligent Test Runner は `dd-trace>= 2.22.0` のみに対応しています (`dd-trace --version` を実行するとツールのバージョンを取得できます)。

## セットアップ

### Test Visibility

Prior to setting up Intelligent Test Runner, set up [Test Visibility for .NET][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

{{% ci-itr-activation-instructions %}}

## Run tests with the Intelligent Test Runner enabled

After completing setup, run your tests as you normally do by using [dotnet test][2] or [VSTest.Console.exe][3]:

{{< tabs >}}

{{% tab "dotnet テスト" %}}


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

Intelligent Test Runner の動作をオーバーライドして、特定のテストがスキップされないようにすることができます。これらのテストは、スキップできないテストと呼ばれます。

### テストをスキップできないようにする理由は？

Intelligent Test Runner は、テストをスキップすべきかどうかを判断するために、コードカバレッジデータを使用します。場合によっては、このデータだけでは判断できないこともあります。

例:

- Tests that read data from text files.
- Tests that interact with APIs outside of the code being tested (such as remote REST APIs).
- テストをスキップ不可に指定すると、カバレッジデータに関係なく Intelligent Test Runner がテストを実行します。

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/dotnet
[2]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[3]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options