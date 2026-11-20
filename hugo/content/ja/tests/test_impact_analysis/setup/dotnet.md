---
aliases:
- /ja/continuous_integration/intelligent_test_runner/dotnet/
- /ja/continuous_integration/intelligent_test_runner/setup/dotnet/
- /ja/intelligent_test_runner/setup/dotnet
code_lang: dotnet
code_lang_weight: 0
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: .NET 向け Test Impact Analysis
type: multi-code-lang
---

## 互換性

Test Impact Analysis は `dd-trace>= 2.22.0` にのみ対応しています。ツールのバージョンは `dd-trace --version` で確認できます。

## セットアップ

### テストの最適化

Test Impact Analysis を設定する前に、[.NET 向け Test Optimization][1] をセットアップしてください。Agent 経由でデータを報告する場合は、v6.40 以降または v7.40 以降を使用してください。

{{% ci-itr-activation-instructions %}}

## Run tests with Test Impact Analysis enabled

セットアップが完了したら、通常どおり [dotnet test][2] または [VSTest.Console.exe][3] を使用してテストを実行してください。

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

## 特定のテストのスキップを無効にする

You can override the Test Impact Analysis behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### テストをスキップできないようにする理由は？

Test Impact Analysis uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

例:

- テキストファイルからデータを読み込むテスト。
- テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)。
- Designating tests as unskippable ensures that Test Impact Analysis runs them regardless of coverage data.

### Marking tests as unskippable

{{< tabs >}}
{{% tab "XUnit" %}}

#### Individual test case

テストケースをスキップ不可にするには、XUnit の `TraitAttribute` でキー `datadog_itr_unskippable` をテストケースに追加します。

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

#### テストスイート

テストスイートをスキップ不可にするには、XUnit の `TraitAttribute` でキー `datadog_itr_unskippable` をテストスイートに追加します。

If a suite is marked as unskippable, none of the test cases from that suite can be skipped by Test Impact Analysis.

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

テストケースをスキップ不可にするには、キー `datadog_itr_unskippable` と null ではない値 (例: string.Empty) を持つ NUnit の `PropertyAttribute` をテストケースに追加します。

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

#### テストスイート

テストスイートをスキップ不可にするには、キー `datadog_itr_unskippable` と null ではない値 (例: string.Empty) を持つ NUnit の `PropertyAttribute` をテストスイートに追加します。

If a suite is marked as unskippable, none of the test cases from that suite can be skipped by Test Impact Analysis.

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

テストケースをスキップ不可にするには、MsTestV2 の `TestPropertyAttribute` でキー `datadog_itr_unskippable` をテストケースに追加します。

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