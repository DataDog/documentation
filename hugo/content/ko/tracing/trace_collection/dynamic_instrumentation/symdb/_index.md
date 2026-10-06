---
aliases:
- /ko/dynamic_instrumentation/symdb
- /ko/tracing/dynamic_instrumentation/symdb
description: Dynamic Instrumentation에서 IDE와 유사한 자동 완성 및 검색 기능을 활성화하여 개발자 경험을 개선하세요.
further_reading:
- link: /dynamic_instrumentation/
  tag: 문서
  text: Dynamic Instrumentation에 대해 자세히 알아보기
is_beta: true
private: false
site_support_id: autocomplete_search
title: 자동 완성 및 검색
---
{{< callout url="#" btn_hidden="true" >}}
자동 완성 및 검색은 Python 및 .NET에서 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 개요 {#overview}

자동 완성 및 검색은 클래스 및 메서드 검색과 [Dynamic Instrumentation 표현식 언어][5]에 대한 자동 완성과 같은 IDE 기능을 추가하여 [Dynamic Instrumentation][1]의 사용자 경험을 향상합니다.

자동 완성 및 검색을 제공하기 위해 민감하지 않은 심볼과 메타데이터가 애플리케이션에서 Datadog으로 업로드됩니다. 업로드된 데이터에는 클래스, 메서드, 인수, 필드, 지역 변수의 이름과 줄 번호와 같은 관련 메타데이터가 포함됩니다.

## 시작 {#getting-started}

### 전제 조건 {#prerequisites}

자동 완성 및 검색을 사용하려면 다음이 필요합니다.

- 서비스에 [Dynamic Instrumentation][1]이 활성화되어 있어야 합니다.
- [Datadog Agent][2] 7.49.0 이상의 버전이 서비스와 함께 설치되어 있어야 합니다.
- 해당 Agent에 [Remote Configuration][3]이 활성화되어 있어야 합니다.
- [Unified Service Tagging][4] 태그 `service`, `env` 및 `version`이 배포에 적용되어 있어야 합니다.

### 서비스에 자동 완성 및 검색 활성화 {#enable-autocomplete-and-search-for-your-service}

아래에서 런타임을 선택하세요.

{{< card-grid card_width="170px" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/dotnet" src="integrations_logos/dotnet-core.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/symdb/dotnet" src="integrations_logos/dotnet-framework.png" alt="Dotnet" >}}
{{< /card-grid >}}

## 자동 완성 및 검색 살펴보기 {#explore-autocomplete-and-search}

자동 완성 및 검색을 사용하면 Dynamic Instrumentation이 IDE처럼 작동합니다.

- **클래스 및 메서드 검색**: 계측을 추가할 위치를 찾습니다.
- **코드 표시**: Dynamic Instrumentation 구성에서 메서드를 선택하면 Datadog이 해당 메서드의 코드를 표시합니다.
- **표현식 자동 완성**: [Dynamic Instrumentation 표현식 언어][5]를 사용하는 표현식 템플릿에 대한 제안을 받습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dynamic_instrumentation/
[2]: /ko/agent/
[3]: /ko/tracing/guide/remote_config
[4]: /ko/getting_started/tagging/unified_service_tagging/
[5]: /ko/dynamic_instrumentation/expression-language