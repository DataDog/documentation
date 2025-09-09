---
aliases:
- /ko/developers/marketplace/offering
- /ko/developers/integrations/create_a_tile
- /ko/guides/agent_checks/
- /ko/agent/agent_checks
- /ko/developers/agent_checks/
description: Datadog 통합을 개발하고 게시하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: 블로그
  text: Datadog 마켓플레이스를 통해 모니터링 도달 범위 확대
- link: /developers/integrations/marketplace_offering
  tag: 설명서
  text: Datadog 마켓플레이스에서 제공 상품/서비스 생성
title: Datadog 통합
type: 설명서
---
## 개요

이 페이지에서는 통합의 정의와 Datadog에서 Integration Developer Platform을 사용하여 통합을 구축하는 일반적인 프로세스에 대해 알아봅니다.

## 통합이란?

통합을 통해 타사는 메트릭, 로그, 트레이스, 이벤트와 같은 옵저버빌리티 데이터를 Datadog에 전송할 수 있습니다. 통합에는 사용자가 데이터를 시각화하고 분석하는 데 도움이 되는 기본 제공(OOTB) 대시보드, 모니터 및 기타 콘텐츠가 포함됩니다.

### 통합 생성의 이점

통합을 생성하면 다음과 같은 이점을 얻을 수 있습니다.

데이터와 사용자 옵저버빌리티 데이터의 상호 연관성 파악
: Datadog을 활용해 고객이 나머지 기술 스택과 함께 플랫폼의 데이터를 볼 수 있도록 함으로써 플랫폼의 가치를 높입니다.

고객의 MTTR(평균 해결 시간) 단축 
: 고객의 계정이 통합 데이터로 강화되면 전체 스택을 더 폭넓게 볼 수 있어 빠르게 디버깅하고 해결할 수 있습니다.

도입 및 가시성 향상
: Datadog의 기본 기능을 보장하여 도입 장벽을 낮출 수 있으며, [Integrations 페이지][2]나 [Marketplace 페이지][3]에 타일을 표시하여 모든 Datadog 고객에게 효과적인 가시성을 제공합니다.

## 통합 타일이란?

통합 타일은 고객을 위한 탐색 및 설치 지점 역할을 하며, 다음이 포함됩니다.
* 제공 서비스에 관련 정보
* 설정 지침
* 설치 또는 구매 옵션
* 기본 제공 대시보드 및 추가 콘텐츠

통합 타일은 Datadog의 통합 구성 요소입니다.

## 공식 통합을 위한 조건

모든 공식 통합에는 다음이 포함되어야 합니다.
* Datadog으로 전송된 텔레메트리
* 즉시 사용 가능한 통합 대시보드
* 타일의 이미지
* OAuth(API 통합만)
* 로그 파이프라인(로그 통합만)
* 권장 모니터(메트릭에서 전송되는 통합의 경우)

## 시작하기

### Datadog Partner Network에 가입하기

Datadog에 통합 기능을 등록하기 전에 먼저 [Datadog Partner Network][1]의 **Technology Partner** 트랙에 지원하세요. 지원이 승인되면 통합 기능 개발을 시작할 수 있습니다.

### 샌드박스 계정 요청

모든 기술 파트너는 통합 개발을 지원하기 위해 전용 Datadog 샌드박스 계정을 요청할 수 있습니다. 이 샌드박스 계정은 데이터 전송, 대시보드 구축 등에 사용할 수 있는 무료 라이센스를 포함합니다.

<div class="alert alert-info">이미 Datadog 조직 (시범 조직 포함)의 구성원이라면 새로 작성한 샌드박스로 전환해야 할 수도 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/account_management/org_switching/">계정 관리 설명서</a>를 참조하세요.</div>

샌드박스 계정을 요청하려면:

1. [Datadog Partner Portal][1]에 로그인합니다.
2. 개인 홈페이지에서 **Sandbox Access** 아래의 **Learn More** 버튼을 클릭합니다.
3. **Request Sandbox Upgrade**를 선택합니다.

개발자 샌드박스를 만드는 데는 최대 1-2 영업일이 소요될 수 있습니다. 샌드박스가 생성되면 공동 작업을 위해 [조직의 새 구성원을 초대][7]할 수 있습니다.

### 통합 개요 구축하기

다음 단계를 따라 Datadog으로 새로운 통합을 생성하세요.

1. **Datadog Partner Network에 지원하세요.** 승인되면 Datadog Technology Partner 팀의 담당자가 오리엔테이션 콜 예약을 위해 연락드립니다.
2. Datadog Partner Network를 통해 개발을 위한 **Datadog 샌드박스 계정을 요청합니다.**
3. Integration Developer Platform을 사용하여 **통합 개발을 시작합니다.**

   a. 통합에 대한 기본 정보를 정의합니다.

   b. 다음 통합 유형 중 하나를 생성하기 위해 지침을 따라 통합 코드를 정의하고 작성합니다.
      - [Agent 기반 통합][5]
      - [API 기반 통합][6]   

   c. 통합에서 쿼리하거나 제출하는 데이터 유형을 지정합니다.

   d. 대시보드를 만들고, 필요 시 모니터나 보안 규칙을 만듭니다.

   e. 나머지 필드에는 설치 및 제거 지침, 이미지, 지원 정보, 통합의 가치를 설명하는데 도움이 되는 기타 정보를 입력합니다.

4. Datadog 샌드박스 계정에서 **통합을 테스트합니다.**
5. **리뷰를 위해 통합을 제출합니다.**
6. **승인되면 통합이 게시됩니다.**

### 책임

통합 작성자는 모든 [Datadog 사이트][8]에서 통합이 제대로 작동하도록 코드를 유지 관리하고 보장할 책임이 있습니다. 설정 시 문제가 발생하면 [Support에 문의하세요][9].

## 기본 제공 통합 vs. Marketplace 제공 통합

{{< tabs >}}
{{% tab "통합" %}}

[Integrations 페이지][101]에는 Datadog과 기술 파트너가 구축한 통합이 포함되어 있으며 Datadog 고객은 _무료_로 사용할 수 있습니다.

{{< img src="developers/integrations/integrations_overview.png" alt="Datadog 통합 페이지" style="width:100%;" >}}

[101]: https://app.datadoghq.com/integrations

{{% /tab %}}
{{% tab "Marketplace" %}}

[마켓플레이스 페이지][101]는 기술 파트너가 Datadog 고객에게 통합, 소프트웨어 라이센스, 전문적인 서비스 등 다양한 제품을 _판매_하기 위한 상업용 플랫폼입니다.

{{< img src="developers/marketplace/marketplace_updated_overview.png" alt="Datadog 마켓플레이스 페이지" style="width:100%" >}}

[101]: https://app.datadoghq.com/marketplace

{{% /tab %}}
{{< /tabs >}}

Marketplace 통합은 다음의 경우에 적합합니다.
* Datadog 제품에 대한 전문 지식을 갖춘 시스템 통합업체.
* Datadog 도입을 지원하는 전문 서비스 제공 파트너.

|                          | **기본 제공 통합**                                                                 | **Marketplace 통합**                                                                                   |
|--------------------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| **목적**              | Datadog과 파트너 플랫폼 간에 데이터를 연결하고 전송할 수 있는 방법 제공     | 확장 기능, 파트너 서비스, 레거시 기술 지원 등을 통해 Datadog 사용 경험 개선    |
| **이용 가능 여부**         | Integrations 페이지에 포함됨                                                     | 유료, Marketplace에서 구매 가능                                                                             |
| **생성 및 유지 관리**| Datadog 또는 Technology Partners                                                        | Technology Partners                                                                                            |
| **요금**              | Datadog 구독에 포함                                                      | 추가 요금                                               |

## 출시(GTM) 기회

Datadog는 GTM 지원을 제공합니다. 자세한 내용은 파트너 매니저에게 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://partners.datadoghq.com
[2]: https://app.datadoghq.com/integrations
[3]: https://app.datadoghq.com/marketplace
[4]: https://docs.datadoghq.com/ko/developers/integrations/marketplace_offering/
[5]: /ko/developers/integrations/agent_integration/
[6]: /ko/developers/integrations/api_integration/
[7]: https://docs.datadoghq.com/ko/account_management/users/#add-new-members-and-manage-invites
[8]: https://docs.datadoghq.com/ko/getting_started/site/
[9]: https://docs.datadoghq.com/ko/help/