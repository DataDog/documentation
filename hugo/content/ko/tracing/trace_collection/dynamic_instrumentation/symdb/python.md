---
aliases:
- /ko/dynamic_instrumentation/symdb/python
- /ko/tracing/dynamic_instrumentation/symdb/python
code_lang: python
code_lang_weight: 20
description: Python 애플리케이션을 구성하여 Dynamic Instrumentation을 위한 IDE와 같은 자동 완성 및 검색 기능을
  활성화하세요.
is_beta: true
private: false
title: Python용 자동 완성 및 검색 활성화하기
type: multi-code-lang
---
{{< callout url="#" btn_hidden="true" >}}
자동 완성 및 검색은 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 요구 사항 {#requirements}

- 서비스에 [Dynamic Instrumentation][1]이 활성화되어 있어야 합니다.
- 트레이싱 라이브러리 [`dd-trace-py`][6] 2.9.0 이상이 설치되어 있어야 합니다.

## 설치 {#installation}

Dynamic Instrumentation이 활성화된 상태로 서비스를 실행하고 자동 완성 및 검색을 추가로 활성화하려면 다음 단계를 따르세요.

1. `DD_DYNAMIC_INSTRUMENTATION_ENABLED` 환경 변수를 `true`로 설정하여 Dynamic Instrumentation이 활성화된 상태로 서비스를 실행합니다.
2. `DD_SERVICE` 및 `DD_VERSION` [Unified Service Tags][5]를 지정합니다.
3. 서비스를 호출합니다.

  ```shell
  export DD_SERVICE=<YOUR_SERVICE>
  export DD_ENV=<YOUR_ENV>
  export DD_VERSION=<YOUR_VERSION>
  export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
  export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true
  ddtrace-run python -m myapp
  ```

필수 기능이 활성화된 상태로 서비스를 시작한 후, [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Dynamic Instrumentation{{< /ui >}}][4] 페이지에서 Dynamic Instrumentation의 IDE와 같은 기능을 사용할 수 있습니다.

## 추가 구성 {#additional-configuration}

### 타사 탐지 {#third-party-detection}

패키지나 모듈에 대한 자동 완성 제안이 나타나지 않으면 타사 코드로 잘못 인식되었을 수 있습니다. 자동 완성 및 검색 기능은 휴리스틱을 사용하여 타사 코드를 필터링하는데, 이 과정에서 때때로 의도치 않은 오분류가 발생할 수 있습니다.

코드가 올바르게 인식되도록 하고 정확한 자동 완성 및 검색 기능을 활성화하려면 다음 옵션을 사용하도록 타사 탐지 설정을 구성하세요.

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=<LIST_OF_USER_CODE_MODULES>
export DD_THIRD_PARTY_DETECTION_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>
```

여기서 `<LIST_OF_USER_CODE_MODULES>` 및 `<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>`는 쉼표로 구분된 패키지 접두사 목록입니다. 예:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=shopping,database
```

[1]: /ko/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /ko/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-py