---
aliases:
- /ko/developers/marketplace/offering
description: 통합 타일 개발 및 게시 방법 알아보기
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: 블로그
  text: Datadog 마켓플레이스를 통해 모니터링 도달 범위 확대
- link: /developers/integrations/marketplace_offering
  tag: 설명서
  text: Datadog 마켓플레이스에서 제공 상품/서비스 생성
title: Datadog으로 통합 구축
type: 설명서
---
## 개요

이 페이지에서는 Technology Partner가 통합 또는 Marketplace 제품을 만들고 Datadog에 제출하는 방법에 대해 알아봅니다.

## 시작하기

### 목록 만들기
1. **Integrations > Developer Platform > Publishing**으로 이동하여 **New Listing**을 클릭합니다.
1. 제품 유형을 선택합니다.
1. 제품 이름을 추가합니다.
1. **Create**를 클릭합니다.

### 개요 입력
1. 개요 섹션에 공급업체 이름, 공급업체 URL, 간략한 설명 등 관련 세부 정보를 입력하고 적절한 태그를 적용합니다.
1. 로고의 워드마크 버전을 SVG 형식으로 업로드합니다.
1. 통합 식별자로 사용되는 고유한 통합 ID를 설정합니다.

### 통합 코드 정의 및 작성

[Agent 기반 통합][5] 또는 [API 기반 통합][6]을 생성하려면 해당 지침을 따릅니다.

**Agent 기반 통합**을 생성하려면 제시된 단계를 따릅니다.

Agent 기반 통합은 Datadog Agent를 사용하여 개발자가 작성한 점검을 통해 데이터를 제출합니다.

점검은 고객의 Datadog 계정으로 메트릭, 이벤트, 서비스 점검을 전송할 수 있습니다. Agent 자체도 로그를 제출할 수 있지만, 이는 점검 외부에서 구성됩니다. 이 코드는 GitHub에 호스팅되어 있습니다.

이러한 통합을 구현하는 코드는 Datadog에서 호스팅됩니다. Agent 통합은 근거리 통신망(LAN) 또는 가상 프라이빗 클라우드(VPC)에 있는 시스템이나 애플리케이션에서 데이터를 수집하는 데 가장 적합합니다. Agent 통합을 생성하려면 솔루션을 Python wheel(.whl) 형식으로 게시하고 배포해야 합니다.

Agent Check를 설정하는 방법은 [Agent Check 문서][5]에서 확인할 수 있으며, 이 페이지로 돌아와 나머지 단계를 진행하세요.

**API 기반 통합**을 생성하는 경우 OAuth를 사용해야 합니다. 제시된 단계를 따르세요.

OAuth는 통합이 클라이언트 애플리케이션에 안전하게 액세스를 위임할 수 있도록 하는 표준입니다. HTTPS를 통해 작동하며, 크리덴셜 대신 액세스 토큰을 사용해 디바이스, API, 서버, 애플리케이션의 접근을 허용합니다.

OAuth 통합 설정 방법은 [OAuth 클라이언트 문서][7]에서 확인할 수 있으며, 이 페이지로 돌아와 나머지 단계를 진행하세요.

해당 플랫폼이 OAuth와 호환되지 않는 경우 Datadog Ecosystems 팀에 문의하여 예외를 요청하세요.

### 설치 및 제거 가이드 제공

1. **설치 지침**은 필수 구성, 인증 과정, 초기 설정 단계를 번호 순서대로 정리해 안내합니다.
1. **제거 지침**은 통합을 올바르게 제거하는 방법을 안내합니다.

### 통합이 상호작용하는 데이터 정의

사용자는 Datadog 데이터 유형 정보를 확인하여 통합 기능을 이해할 수 있습니다. Datadog에서 데이터를 가져오는 경우 쿼리된 데이터 섹션에 특정 데이터 유형을 지정합니다. Datadog으로 데이터를 보내는 경우 제출된 데이터 섹션에 특정 데이터 유형을 지정합니다. 특정 필드에는 추가 정보가 필요할 수 있습니다.

통합에서 메트릭을 전송하는 경우:
1. 메트릭 점검을 설정합니다. 통합이 실행 중임을 사용자에게 알리기 위해 모든 실행 시에 메트릭을 내보냅니다.
1. `metadata.csv` 파일에서 메트릭 목록을 입력하여 업로드합니다.

통합에서 로그를 전송하는 경우, 로그 파이프라인이 필요합니다.
1. 지침을 따라 [로그 파이프라인을 생성합니다][8].
1. 이전 단계에서 내보낸 두 개의 파일을 업로드합니다.

### 통합 관련 콘텐츠 생성

Datadog 통합은 설치 즉시 사용 가능한 기본 콘텐츠를 지원합니다. 사용자가 통합의 가치를 쉽게 확인할 수 있도록 대시보드, 모니터 템플릿, SIEM 탐지 규칙 등의 콘텐츠를 포함하세요.

1. 통합과 함께 제공할 대시보드를 하나 이상 만들어 첨부합니다.
    - 모든 통합에는 대시보드가 ​​필요합니다. 새 대시보드를 만들 때는 Datadog의 [모범 사례][9]를 따르세요.
1. 다른 콘텐츠를 만들고 첨부합니다.
    - 새 모니터 템플릿을 만들려면 Datadog의 [모범 사례][10]를 따르세요.
    - SIEM 탐지 규칙을 생성하려면 Datadog의 [모범 사례][11]를 따르세요.

### 지원 정보 추가

지원팀에 연락처 정보를 제공합니다.

### 출시 노트 추가

최초로 출시할 때는 현재 상태를 그대로 두고, 향후 업데이트에서는 기능 추가, 변경, 수정, 제거 사항을 새로운 버전으로 명시합니다.

### 리뷰 및 제출

1. 통합을 미리 확인하고 모든 것이 올바르게 작동되는지 확인합니다.
1. 완료되면 리뷰를 위해 제출합니다.
1. Datadog 팀에서 리뷰 후 피드백을 제공합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://partners.datadoghq.com
[2]: /ko/integrations
[3]: /ko/marketplace
[4]: /ko/developers/integrations/marketplace_offering/
[5]: /ko/developers/integrations/agent_integration/
[6]: /ko/developers/integrations/api_integration/
[7]: /ko/developers/integrations/api_integration/#oauth
[8]: /ko/developers/integrations/log_pipeline/
[9]: /ko/developers/integrations/create-an-integration-dashboard/
[10]: /ko/developers/integrations/create-an-integration-monitor-template/
[11]: /ko/developers/integrations/create-a-cloud-siem-detection-rule/