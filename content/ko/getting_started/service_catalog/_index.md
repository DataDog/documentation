---
further_reading:
- link: /service_catalog/
  tag: 설명서
  text: 서비스 카탈로그
- link: https://learn.datadoghq.com/courses/managing-service-catalog
  tag: 학습 센터
  text: 서비스 카탈로그로 서비스 관리하기
- link: https://www.datadoghq.com/blog/service-owner-knowledge-with-datadog-service-catalog/
  tag: 블로그
  text: Datadog 서비스 카탈로그로 마이크로서비스 거버넌스 간소화
- link: /service_catalog/troubleshooting
  tag: 설명서
  text: 트러블슈팅
- link: /service_catalog/scorecards
  tag: 설명서
  text: 서비스 스코어카드
kind: documentation
title: 서비스 카탈로그 시작하기
---

{{< img src="/getting_started/service_catalog/overview_image.jpeg" alt="서비스 카탈로그 안정성 보기로, 여러 서비스와 관련 MTTR, 배포 메트릭, 문제, 인시던트, SLO 및 모니터 상태를 보여줍니다." style="width:90%;" >}}

## 개요

Datadog 서비스 카탈로그는 소유권 메타데이터, 성능 인사이트, 보안 분석, 비용 할당 등을 결합한 서비스 에 대한 통합 보기를 제공합니다. 이 중앙 집중식 허브를 통해 개발팀은 런타임 환경에서 중요한 구성 요소를 발견하고 관리할 수 있습니다.

이 페이지는 Datadog에서 서비스 카탈로그를 시작하는 방법을 안내합니다.

## 사전 필수 요건

아직 하지 않았다면 [Datadog 계정][1]을 생성하세요.

## 서비스 카탈로그에 항목 추가

### 자동 탐지 서비스

[서비스애플리케이션 성능 모니터링(APM)][2], [USM][3], [RUM][4]과 같은 애플리케이션 성능 텔레메트리를 기반으로 서비스를 자동으로 검색합니다. 애플리케이션 성능 모니터링(APM)이 포함된 통합은 Datadog가 트레이스가 수집되는 것과 동일한 빈도로 새로운 서비스를 정기적으로 발견할 수 있도록 합니다. USM을 사용하면 Datadog 에이전트가 eBPF-호환 호스트에 연결됩니다. USM은 이 인프라스트럭처 에서 실행 중인 서비스를 자동으로 감지하고 [통합 서비스 태깅][5]을 사용하여 태깅합니다. 

### 사용자 정의 서비스

이러한 제품을 사용하지 않는 경우 `service.definition.yaml` 레지스트리에 서비스을 항목으로 수동으로 설정할 수 있습니다. 이 파일의 정의에는 카탈로그가 서비스를 제출하는 데 사용하는 모든 메타데이터가 포함됩니다. 이러한 파일은 내부 API 또는 Terraform과 같은 설정 관리 서비스를 사용하여 프로그래밍 방식으로 생성하고 업데이트할 수 있습니다. 이 파일을 버전 관리에 포함하고 환경에 새 리소스가 추가될 때마다 정기적으로 업데이트해야 합니다.

다음 예는 전자상거래 애플리케이션의 `shopping-cart` 서비스를 나타냅니다. 여기에는 소유 팀, 사용 언어, 런북 링크, 코드 저장소 등 서비스 에 대한 중요한 메타데이터가 포함되어 있습니다. 

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: shopping-cart
team: e-commerce
application: shopping-app
tier: "1"
type: web
languages:
  - 고
  - 파이썬(Python)
연락처:
  - 유형: 슬랙
    연락처: https://yourorg.slack.com/archives/e-commerce
  - 유형: 이메일
    연락처: ecommerce@example.com
  - 유형: Microsoft 팀
    연락처: https://teams.microsoft.com/example
링크:
  - 이름: 런북
    유형: 런북
    URL: http://runbook/shopping-cart
  - 이름: 출처
    유형: 저장소
    공급자: GitHub
    URL: https://github.com/shopping-cart
  - 이름: 배포
    유형: 저장소
    공급자: GitHub
    URL: https://github.com/shopping-cart
  - 이름: 구성
    유형: 저장소
    공급자: GitHub
    URL: https://github.com/consul-config/shopping-cart
  - 이름: 전자상거래 팀
    유형: 문서
    공급자: 위키
    URL: https://wiki/ecommerce
  - 이름: 쇼핑 카트 아키텍처
    유형: 문서
    공급자: 위키
    URL: https://wiki/ecommerce/shopping-cart
  - 이름: 장바구니 RFC
    유형: 문서
    공급자: 구글 문서
    URL: https://doc.google.com/shopping-cart
태그:
  - 사업 단위: 소매
  - 비용 센터: 엔지니어링
통합:
  호출 의무:
    서비스-URL: https://www.pagerduty.com/서비스-directory/PSHOPPINGCART
  opsgenie:
    서비스-URL: "https://www.opsgenie.com/서비스/uuid"
    지역: "미국"
CI-파이프라인-지문:
  - id1
  - id2
확장:
  additionalProperties:
    customField1: customValue1
    customField2: customValue2
{{< /code-block >}}

또한 조직에서 유지 관리하는 기존 지식 소스(예: 설정 관리 데이터베이스(CMDB) 테이블([Datadog  ServiceNow 통합][6]) 및 스프레드시트를 사용하여 서비스 카탈로그를 채울 수도 있습니다. Datadog의 [Backstage와의 통합][7]을 사용하면 여기에 등록된 모든 데이터 또는 서비스를 Datadog로 직접 가져올 수도 있습니다.

마지막으로 인프라스트럭처 모니터링 및 로그 관리와 같은 다른 Datadog 제품에서도 `service` 태그에서 항목을 생성할 수도 있습니다.

{{< img src="/getting_started/service_catalog/import_entries.jpeg" alt="서비스 카탈로그 설정 및 설정 섹션에서 항목 가져 오기"  style="width:90%;">}}

## 서비스 카탈로그에서 메타데이터 관리하기

서비스 카탈로그에 이러한 초기 항목을 만든 후에는 카탈로그가 계속 유효하게 유지되도록 지속적으로 업데이트하는 것이 중요합니다. 서비스 정의 파일은 팀의 버전 관리 내에 존재해야 업데이트가 필요할 수 있는 서비스에서 새 배포 및 기타 변경 사항을 쉽게 참조할 수 있습니다. 

또한 [GitHub 작업][8]을 구성하여 서비스 메타데이터 관리를 자동화할 수도 있습니다. 이렇게 하면 모든 프로덕션 서비스에 유효한 런북 링크가 있어야 하는 등 팀이 표준에 맞는 방식으로 서비스를 설정하도록 할 수도 있습니다. 

조직에 [Backstage][9]와 같은 내부 시스템이나 스프레드시트 등의 기존 소유권 레지스트리가 있는 경우 중앙 팀에서 [API 호출][10]을 사용하여 커스텀 파일에 대한 업데이트를 예약할 수 있습니다. 

### 모니터링 스택 전체에서 원격 분석 연결

나머지 통합 가시성 플랫폼의 모니터링 데이터를 연결하여 카탈로그의 유용성을 개선하세요.

[통합 서비스 태깅][5]을 사용하면 `service` 태그를 사용하여 서비스 카탈로그의 서비스 엔티티를 모든 Datadog 제품에서 상호 참조할 수 있습니다. 이러한 태그는 메타데이터, 메트릭, 그리고 인프라스트럭처 모니터링 , RUM, 로그 관리, 소프트웨어 제공 및 보안과 같은 기타 컨텍스트 소스를 통해 서비스 엔티티를 강화하는 데 도움을 줄 수 있습니다.

범용 애플리케이션 성능 원격 분석 서비스 모니터링 및 애플리케이션 성능 모니터링(APM)은 시스템 에코시스템에 대한 기본 제공 종속성 매핑도 제공하므로 모든 런타임 환경에서 구성 요소가 서로 상호 작용하는 방식을 확인할 수 있습니다.

## 서비스 카탈로그 강화하기

카탈로그에 서비스가 채워지면 서비스 정의를 추가 컨텍스트로 보강하여 더 유용하게 만들 수 있습니다. 여기에는 `service.definition.yaml` 파일에 서비스 메타데이터의 주요 부분을 추가하는 것이 포함될 수 있습니다: 

- 팀
- 대기 엔지니어
- 연락처 채널 
- 문서 링크
- 마지막으로 배포된 버전
- 코드 리포지토리 
- 런북 링크
- 라이브러리 종속성 및 해당 버전
- 관련성 대시보드

서비스 카탈로그는 서비스 정의 스키마를 사용하여 서비스에 대한 이 메타데이터를 저장하고 표시합니다. 스키마에는 유효한 값만 허용되도록 하는 유효성 검사 규칙이 내장되어 있습니다. 현재 [지원되는 4가지 스키마][11]로 v2, v2.1, v2.2 및 v3가 있습니다.

## 서비스 카탈로그 스코어카드 사용

[서비스 스코어카드][12]는 조직이 모범 사례를 평가할 수 있는 규칙으로 체계할 수 있도록 해줍니다. 카탈로그에 스코어카드를 구현함으로써 팀은 다음을 포함한 다양한 서비스 품질을 측정할 수 있습니다.

- 모니터링 적용 범위
- 프로덕션 준비 상태
- 보안 태세
- 최신 내부 툴링 채택
- 통합 점검

Datadog 스코어카드에는 통합 가시성 관행, 소유권 태깅, 프로덕션 준비 상태 체크포인트에 대한 10가지 기본 규칙이 포함되어 있습니다. 자신만의 커스텀 규칙을 정의할 수도 있습니다. 예를 들어, 보안 검토( 프로세스)의 단계에 매핑되는 일련의 규칙이 포함된 스코어카드를 만들어 각 서비스 이 규정을 준수하는지 여부를 신속하게 감사할 수 있습니다. 이러한 규칙에는 CVE 분석과 관련된 점검, RBAC 설정, 또는 기타 보안 파라미터가 포함될 수 있습니다.

스코어카드에 커스텀 규칙을 추가하려면 대시보드: 

1. 스코어카드 페이지에서 **규칙 만들기**를 클릭합니다.
2. 규칙의 이름, 규칙이 속한 스코어카드, 규칙 설명 및 소유 팀을 지정합니다. 
3. 평가 중인 각 `{rule, service}` 튜플에 대해 `pass`, `fail`, 또는 `skip` 의 결과를 [점수표 API][13] `/scorecard/outcomes/batch` 엔드포인트로 보냅니다. 
4. 스코어카드 대시보드에서 결과 개요 보기

{{< img src="/getting_started/service_catalog/create_rule.jpeg" alt="스코어카드 대시보드에 커스텀 규칙을 추가하는 규칙 모달 만들기" style="width:90%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com
[2]: /ko/tracing
[3]: /ko/universal_service_monitoring
[4]: /ko/real_user_monitoring
[5]: /ko/getting_started/tagging/unified_service_tagging
[6]: /ko/integrations/servicenow/#service-ingestion
[7]: /ko/service_catalog/setup#import-data-from-other-sources
[8]: https://www.datadoghq.com/blog/github-actions-service-catalog
[9]: https://backstage.io/docs/overview/what-is-backstage
[10]:/ko/api/latest/service-definition
[11]: /ko/service_catalog/add_metadata#metadata-structure-and-supported-versions
[12]: /ko/service_catalog/scorecards
[13]: /ko/api/latest/service-scorecards