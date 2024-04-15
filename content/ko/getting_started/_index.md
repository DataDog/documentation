---
aliases:
- /ko/overview
- /ko/getting_started/faq/
cascade:
  algolia:
    category: 시작하기
    rank: 50
disable_sidebar: true
further_reading:
- link: https://learn.datadoghq.com/
  tag: 학습 센터
  text: Datadog 시작을 위한 코스 수강하기

title: 시작하기
---

{{< whatsnext desc="이 섹션에는 다음 주제가 포함됩니다.">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: Datadog UI 사용 방법(대시보드, 인프라 스트럭처 목록, 지도 등)을 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Datadog 사이트</u>: 해당 리전 및 보안 요구 사항에 적합한 Datadog 사이트를 선택하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}<u>DevSecOps 번들</u>: APM DevSecOps 및 인프라 스트럭처 DevSecOps 번들을 시작하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: 호스트에서 Datadog으로 메트릭과 이벤트를 전송하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/containers" >}}<u>컨테이너</u>: Agent Autodiscovery 및 Datadog 연산자 사용 방법을 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>AWS Lambda용 서버리스</u>: 서버리스 인프라스트럭처에서 메트릭, 로그, 트레이스를 수집하는 방법을 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/integrations" >}}<u>통합</u>: Datadog 통합을 통해 메트릭, 트레이스 및 로그를 수집하는 방법을 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: Datadog에 OpenTelemetry 메트릭, 트레이스 및 로그를  전송하는 방법을 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/dashboards" >}}<u>대시보드</u>: 중요한 업무 관련 질문에 대한 답을 제공하는 대시보드를 만들고, 공유하고, 유지 관리하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}<u>모니터</u>: 중요한 변경 사항이 발생할 때 팀이 알 수 있도록 경고 및 알림을 설정하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>로그</u>: 첫 번째 로그를 보내고 로그 처리를 사용하여 강화하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>추적</u>: 소규모 애플리케이션을 추적하도록 Agent를 설정하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>프로파일러</u>: Continuous Profiler를 사용하여 코드의 성능 문제를 찾고 수정하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>태그</u>: 메트릭, 로그 및 트레이스에 태그를 지정하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u>: Datadog HTTP API를 시작하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/service_catalog" >}}<u>서비스 카탈로그</u>: 서비스 카탈로그에서 규모에 맞게 서비스 소유권, 안정성, 성능을 관리하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>세션 재생</u>: 세션 재생을 통해 사용자가 제품과 어떻게 상호 작용하는지 심층적으로 살펴보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>연속 테스트</u>: CI 파이프라인 및 IDE에서 종합적인 엔드투엔드 테스트를 실행하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>합성 모니터링</u>: 합성 테스트를 통해 API 엔드포인트와 주요 비즈니스 여정을 테스트하고 모니터링하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}<u>인시던트 관리</u>: 시스템 문제를 알리고 추적하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>데이터베이스 모니터링</u>: 데이터베이스의 상태와 성능을 확인하고 문제를 신속하게 해결하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>클라우드 보안 관리</u>: CSM을 통해 팀을 구성하고 운영하기 위한 모범 사례를 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>애플리케이션 보안 관리</u>: ASM을 통해 팀을 구성하고 운영하기 위한 모범 사례를 알아보세요..{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>클라우드 SIEM</u>: 클라우드 SIEM으로 팀을 구성하고 운영하기 위한 모범 사례를 알아보세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}<u>워크플로 자동화</u>: 경고 및 보안 신호에 대한 대응하여 엔드투엔드 프로세스를 자동화하세요.{{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>학습 센터</u>: 학습 경로를 따라 셀프 가이드 수업 또는 실습을 수강하고 Datadog 인증 프로그램을 살펴보세요.{{< /nextlink >}}
{{< /whatsnext >}}
