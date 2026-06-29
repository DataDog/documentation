---
aliases:
- /ko/integrations/guide/source-code-integration/
description: APM과 연동되는 소스 코드 통합을 설정하여 텔레메트리를 리포지토리와 연결하고, CI 파이프라인의 아티팩트에 Git 정보를
  임베딩하고, Datadog 전반에서 인라인 코드 스니펫을 생성할 수 있도록 소스 코드 관리 통합 기능을 사용하세요.
title: 소스 코드 통합
---
## 개요 {#overview}

Datadog의 소스 코드 통합 기능을 사용하면 Git 리포지토리를 Datadog에 연결하여 Datadog 플랫폼 전반에서 다양한 소스 코드 관련 기능을 활성화할 수 있습니다. 관련 소스 코드의 해당 라인에 액세스하여 스택 트레이스, 느린 프로파일 및 기타 문제를 디버깅할 수 있습니다.

{{< img src="source_code_integration/inline-code-snippet.png" alt="GitHub에서 코드를 보기 위한 버튼이 있는 Java RuntimeException의 인라인 코드 스니펫" style="width:100%;">}}

## 설정 및 기능 {#setup-and-features}

{{< whatsnext desc="소스 코드 통합의 설정 및 기능에 대한 내용은 다음 페이지를 참조하세요." >}}
    {{< nextlink href="source_code/source-code-management" >}}소스 코드 관리 공급자 통합{{< /nextlink >}}
    {{< nextlink href="source_code/service-mapping" >}}서비스 매핑
  및 텔레메트리 태깅{{< /nextlink >}}
    {{< nextlink href="source_code/resource-mapping" >}}Kubernetes 리소스 매핑{{< /nextlink >}}
    {{< nextlink href="source_code/features" >}}소스 코드 통합의 기능{{< /nextlink >}}
{{< /whatsnext >}}