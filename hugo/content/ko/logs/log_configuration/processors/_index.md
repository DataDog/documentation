---
algolia:
  tags:
  - logs processors
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
aliases:
- /ko/logs/processing/processors/
description: Datalog Log Management의 프로세서를 사용해 로그 구문 분석, 보강 및 구조화
further_reading:
- link: /logs/log_configuration/pipelines
  tag: 설명서
  text: Datadog Pipelines 살펴보기
- link: /logs/logging_without_limits/
  tag: 설명서
  text: Logging without Limits*
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: https://www.youtube.com/watch?v=OztSU3JzfC8&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=4&t=245s
  tag: 비디오
  text: '팁 및 요령: 리테일 엔드포인트에서 로그에 비즈니스 데이터 추가'
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: 학습 센터
  text: 로그 파이프라인 구축 및 관리
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: 학습 센터
  text: 기본 통합 파이프라인을 사용하여 로그 처리
title: 프로세서
---
## 개요 {#overview}

<div class="alert alert-info">이 설명서에 개괄적으로 소개된 프로세서는 클라우드 기반 로깅 환경에 국한합니다. 온프레미스 로그를 구문 분석, 구조화 및 강화하려면 <a href="https://docs.datadoghq.com/observability_pipelines/processors/">Observability Pipelines</a>를 참조하세요.</div>

프로세서는 [파이프라인][1] 내에서 실행되어 데이터 구조화 작업을 완료하고 로그를 강화하기 위한 속성을 생성합니다.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="프로세서" style="width:100%" >}}

[로그 구성 설정][1]에서 [Grok 파서][3] 또는 [날짜 리매퍼][4]와 같은 프로세서를 구성하여 로그를 강화하고 패싯 검색을 향상할 속성을 추출, 생성 및 리매핑할 수 있습니다.

**참고**:

- 구조화된 로그는 유효한 형식으로 전송해야 합니다. 구조에 구문 분석할 수 없는 잘못된 문자가 포함된 경우, [mask_sequences][2] 기능을 사용해 Agent 수준에서 삭제해야 합니다.

- 파이프라인당 최대 20개의 프로세서를 사용하는 것이 모범 사례로 권장됩니다.

## 프로세서 유형 {#processor-types}

{{< whatsnext desc="자세히 알아보려면 프로세서 유형을 선택하세요.">}}
    {{< nextlink href="logs/log_configuration/processors/arithmetic_processor">}}<strong>산술 프로세서</strong>: 기존 숫자 속성에 수식을 적용한 결과를 로그의 새로운 새 속성으로 추가합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/array_processor">}}<strong>배열 프로세서</strong>: 로그의 JSON 배열에서 값을 추출, 집계 또는 변환합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/remapper">}}<strong>속성 리매퍼</strong>: 원본 속성 또는 태그를 다른 대상 속성 또는 태그로 리매핑합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/category_processor">}}<strong>카테고리 프로세서</strong>: 그룹화 및 분류를 위해 검색 쿼리 일치 여부에 따라 로그에 새 속성을 추가합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/decoder_processor">}}<strong>디코더 프로세서</strong>: 바이너리-텍스트 인코딩된 필드(예: Base64 또는 Hex)를 원래 표현으로 변환합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/geoip_parser">}}<strong>GeoIP 파서</strong>: IP 주소 속성에서 대륙, 국가, 하위 지역 또는 도시 정보를 추출합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/grok_parser">}}<strong>Grok 파서</strong>: 로그 메시지 또는 특정 속성에서 데이터를 추출하고 구조화하기 위한 사용자 지정 구문 분석 규칙을 만듭니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_date_remapper">}}<strong>로그 날짜 리매퍼</strong>: 하나 이상의 속성을 로그의 공식 타임스탬프로 지정합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_message_remapper">}}<strong>로그 메시지 리매퍼</strong>: 하나 이상의 속성을 로그의 공식 메시지로 지정합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_status_remapper">}}<strong>로그 상태 리매퍼</strong>: 하나 이상의 속성을 로그의 공식 심각도 상태로 지정합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/lookup_processor">}}<strong>조회 프로세서</strong>: 로그 속성을 참조 테이블 또는 매핑 테이블의 사람이 읽을 수 있는 값에 매핑합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/ocsf_processor">}}<strong>OCSF 프로세서</strong>: 보안 로그를 Open Cybersecurity Schema Framework (OCSF)로 정규화합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/service_remapper">}}<strong>서비스 리매퍼</strong>: 하나 이상의 속성을 로그의 공식 서비스로 지정합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/span_remapper">}}<strong>스팬 리매퍼</strong>: 애플리케이션 스팬과 로그 간의 상관관계를 정의합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/string_builder_processor">}}<strong>문자열 빌더 프로세서</strong>: 기존 속성과 원시 문자열의 템플릿에서 새로운 속성을 생성합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/threat_intel_processor">}}<strong>위협 인텔리전스 프로세서</strong>: 침해 지표(IoC) 표와 대조하여 로그에 위협 인텔리전스 속성을 추가합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/trace_remapper">}}<strong>트레이스 리매퍼</strong>: 애플리케이션 트레이스와 로그 간의 상관관계를 정의합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/url_parser">}}<strong>URL 파서</strong>: URL 속성에서 쿼리 파라미터 및 기타 구성 요소를 추출합니다.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/user_agent_parser">}}<strong>User-Agent 파서</strong>: 사용자-에이전트 속성을 분석하여 OS, 브라우저, 장치 및 기타 사용자 데이터를 추출합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/pipelines/
[2]: /ko/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[3]: /ko/logs/log_configuration/processors/grok_parser/
[4]: /ko/logs/log_configuration/processors/log_date_remapper/