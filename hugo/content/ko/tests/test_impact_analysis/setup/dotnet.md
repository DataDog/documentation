---
aliases:
- /ko/continuous_integration/intelligent_test_runner/dotnet/
- /ko/continuous_integration/intelligent_test_runner/setup/dotnet/
- /ko/intelligent_test_runner/setup/dotnet
code_lang: dotnet
code_lang_weight: 0
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
title: .NET용 Test Impact Analysis
type: multi-code-lang
---

## 호환성

Test Impact Analysis는 `dd-trace>= 2.22.0`(도구 버전을 확인하려면 `dd-trace --version` 실행)에서만 지원됩니다.

## 설정

### 테스트 최적화

Test Impact Analysis를 설정하기 전에 [.NET용 Test Optimization][1]를 설정하세요. Agent를 통해 데이터를 보고하는 경우 v6.40 이상 또는 v7.40 이상을 사용하세요.

{{% ci-itr-activation-instructions %}}

## 활성화된 Test Impact Analysis로 테스트 실행

설치를 완료한 후 [dotnet test][2] 또는 [VSTest.Console.exe][3]를 사용하여 평소처럼 테스트를 실행합니다.

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

## 특정 테스트 건너뛰기 비활성화

est Impact Analysis를 재정의하여 특정 테스트가 건너뛰어지지 않도록 할 수 있습니다. 이러한 테스트를 건너뛸 수 없는 테스트라고 합니다.

### 테스트 건너뛸 수 없는 이유는 무엇인가요?

Test Impact Analysis는 코드 커버리지 데이터를 사용하여 테스트를 건너뛸지 여부를 결정합니다. 경우에 따라 이 데이터만으로는 결정을 내리기에 충분하지 않을 수 있습니다.

예를 들면 다음과 같습니다:

- 텍스트 파일에서 데이터를 읽는 테스트.
- 테스트 중인 코드 외부의 API와 상호 작용하는 테스트(예: 원격 REST API).
- 테스트를 건너뛸 수 없도록 지정하면 Test Impact Analysis에서 커버리지 데이터와 관계없이 테스트를 실행합니다.

### 테스트를 건너뛸 수 없는 것으로 표시

{{< tabs >}}
{{% tab "XUnit" %}}

#### 개별 테스트 케이스

`datadog_itr_unskippable` 키가 있는 XUnit `TraitAttribute`을 테스트 케이스에 추가하여 unskippable로 표시합니다.

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

#### 테스트 스위트(suite)

`datadog_itr_unskippable` 키가 있는 XUnit `TraitAttribute`를 테스트 모음에 추가하여 unskippable로 표시합니다.

테스트 케이스 모음이 unskippable로 표시된 경우,  Test Impact Analysis에서는 해당 테스트 케이스 모음의 어떤 ​​것도 건너뛸 수 없습니다.

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

#### 개별 테스트 케이스

`datadog_itr_unskippable` 키와 null이 아닌 값(예: string.Empty)을 포함하는 NUnit `PropertyAttribute`를 테스트 케이스에 추가하여 unskippable로 표시합니다.

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

#### 테스트 스위트(suite)

키와 null이 아닌 값(예: string.Empty)을 포함하는 NUnit `PropertyAttribute`를 테스트 모음에 추가하여 unskippable로 표시합니다.

테스트 케이스 모음이 unskippable로 표시된 경우,  Test Impact Analysis에서는 해당 테스트 케이스 모음의 어떤 ​​것도 건너뛸 수 없습니다.

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

#### 개별 테스트 케이스

`datadog_itr_unskippable` 키가 포함된 MsTestV2 `TestPropertyAttribute`를 테스트 케이스에 추가하여 unskippable로 표시합니다.

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

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/tests/dotnet
[2]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[3]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options