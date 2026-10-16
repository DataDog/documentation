---
aliases:
- /ko/dynamic_instrumentation/symdb/dotnet
- /ko/tracing/dynamic_instrumentation/symdb/dotnet
code_lang: dotnet
code_lang_weight: 30
description: .NET 애플리케이션을 구성하여 Dynamic Instrumentation에서 IDE와 유사한 자동 완성 및 검색 기능을 활성화합니다.
is_beta: true
private: false
title: .NET 자동 완성 및 검색 활성화
type: multi-code-lang
---
{{< callout url="#" btn_hidden="true" >}}
자동 완성 및 검색은 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 요구 사항 {#requirements}

- 서비스에 [Dynamic Instrumentation][1]이 활성화되어 있어야 합니다.
- 트레이싱 라이브러리 [`dd-trace-dotnet`][6] 2.58.0 이상이 설치되어 있어야 합니다.

## 설치 {#installation}

Dynamic Instrumentation이 활성화된 상태로 서비스를 실행하고 자동 완성 및 검색을 추가로 활성화하려면 다음 단계를 따르세요.

1. `DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true` 환경 변수를 설정합니다.
2. `DD_SERVICE` 및 `DD_VERSION` [Unified Service Tags][5]를 지정합니다.
3. Dynamic Instrumentation과 자동 완성 및 검색이 활성화된 상태로 서비스를 시작하면 [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Dynamic Instrumentation{{< /ui >}}][4] 페이지에서 Dynamic Instrumentation의 IDE와 유사한 기능을 사용할 수 있습니다.

## 추가 구성 {#additional-configuration}

### 타사 탐지 {#third-party-detection}

패키지나 모듈에 대한 자동 완성 제안이 나타나지 않으면 타사 코드로 잘못 인식되었을 수 있습니다. 자동 완성 및 검색 기능은 휴리스틱을 사용하여 타사 코드를 필터링하는데, 이 과정에서 때때로 의도치 않은 오분류가 발생할 수 있습니다.

코드가 올바르게 인식되도록 하고 정확한 자동 완성 및 검색 기능을 사용하려면 다음 옵션으로 타사 탐지 설정을 구성할 수 있습니다.

```shell
export DD_THIRD_PARTY_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

여기서 목록이란 쉼표로 구분된 패키지 접두사 목록을 의미합니다. 예시는 다음과 같습니다.

```shell
export DD_THIRD_PARTY_EXCLUDES=com.mycompany,io.mycompany
```

[1]: /ko/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /ko/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-dotnet