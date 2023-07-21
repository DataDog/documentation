---
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 확인
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: 트러블슈팅 CI
kind: 설명서
title: .NET용 Intelligent Test Runner
---

## 호환성

Intelligent Test Runner는 `dd-trace>= 2.22.0`에서만 지원됩니다 (툴 버전을 가져오려면 `dd-trace --version`를 실행하세요).

## 설정

Intelligent Test Runner를 설정하기 전에 [.NET용 Test Visibility][1]를 설정합니다. Agent를 통해 데이터를 보고하는 경우 v6.40+/v7.40+를 사용합니다.

Intelligent Test Runner를 활성화하려면 다음 환경 변수를 설정합니다:

`DD_APPLICATION_KEY` (필수)
: 건너뛸 테스트를 쿼리하는 데 사용되는 [Datadog 애플리케이션 키][2].<br/>
**기본값**: `(empty)`

이러한 환경 변수를 설정한 후에는 [dotnet test][4] 또는 [VSTest.Console.exe][5]를 사용하여 평소와 같이 테스트를 실행합니다:

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


#### UI 활성화
환경 변수 설정 외에도, 사용자 또는 "Intelligent Test Runner Activation" 권한이 있는 조직의 사용자가 [테스트 서비스 설정][3] 페이지에서 Intelligent Test Runner를 활성화해야 합니다.

{{< img src="continuous_integration/itr_overview.png" alt="Datadog의 CI 섹션에 있는 테스트 서비스 설정에서 Intelligent test runner를 활성화했습니다.">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/tests/dotnet
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[5]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options