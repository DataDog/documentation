---
aliases:
- /ko/observability_pipelines/reference/processing_language/
title: (LEGACY) Datadog Processing Language / Vector Remap Language
---

DPL(Datadog Processing Language) 또는 VRL(Vertor Remap Language)은 로그 변환을 위해 설계된 언어 식 및 도메인 기반 언어입니다. 관측 사용 사례에 맞게 간단한 구문과 [기본 기능][1]을 갖추고 있습니다.

Datadog Processing Language의 경우 `remap` 변환이 지원됩니다.

Remap 변환을 단일 이벤트에 적용해 이벤트를 변환하거나 라우팅 및 필터링 조건을 지정할 수 있습니다. DPL을 다음과 같은 방법으로 사용할 수 있습니다.

- [어레이][2], [스트링][3], 기타 데이터 유형 조정
- [Codec][4]을 사용해 값 코딩 및 디코딩
- 값 [암호화][5] 및 [암호 해독][6]
- 데이터 유형을 다른 유형으로 [강제 변경][7](예: 정수에서 문자열로)
- [syslog 값 변환][8]을 통해 읽을 수 있는 값으로 바꾸기
- [보강 테이블][9]을 사용해 값 보강
- [IP 값 조정][10]
- 커스텀 규칙(예: grok, regex, 등)과 기본 기능(예: syslog, apache, VPC 흐름 로그 등)으로 [구문 분석][11]
- 이벤트 [메타데이터][12]와 [경로][13] 조정

[1]: /ko/observability_pipelines/legacy/reference/processing_language/functions/
[2]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#array
[3]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#string
[4]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#codec
[5]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#encrypt
[6]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#decrypt
[7]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#coerce
[8]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#convert
[9]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#enrichment
[10]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#ip
[11]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#parse
[12]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#event
[13]: /ko/observability_pipelines/legacy/reference/processing_language/functions/#path