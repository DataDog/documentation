---
aliases:
- /ko/developers/marketplace/
description: Datadog 마켓플레이스에 대해 자세히 알아보세요.
further_reading:
- link: https://www.datadoghq.com/partner/
  tag: 파트너 네트워크
  text: Datadog 파트너 네트워크
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: 블로그
  text: Datadog 마켓플레이스를 통해 모니터링 도달 범위 확대
- link: /developers/integrations/create_a_tile
  tag: 설명서
  text: 타일 생성
- link: /developers/integrations/agent_integration
  tag: 설명서
  text: 에이전트 기반 통합 생성
title: 마켓플레이스 제품/서비스 빌드
type: 설명서
---
## 개요

[Datadog 마켓플레이스][2]는 기술 파트너가 Datadog 사용자에게 유료 제품을 목록 제공할 수 있는 디지털 마켓플레이스입니다.

**통합** 페이지는 비용 없이 Datadog와 기술 파트너가 빌드한 통합을 포함하지만, **마켓플레이스** 페이지는 Datadog 고객과 기술 파트너를 위한 상업용 플랫폼으로 다양한 제품/서비스를 사고파는 곳입니다. 해당 제품/서비스에는 에이전트 기반 또는 API 기반 통합, 소프트웨어 라이선스 및 전문 서비스가 포함됩니다.

{{< img src="developers/marketplace/marketplace_overview.png" alt="Datadog 마켓플레이스 페이지" style="width:100%" >}}

## 오퍼링 목록

Datadog 마켓플레이스에서 다음 유형의 제품/서비스가 지원됩니다.

통합
: [Datadog 에이전트][19] 또는 [Datadog API][15]는 사용자의 Datadog 계정에서 데이터를 풀링하거나 해당 계정으로 타사 데이터를 전송하는 마켓플레이스 통합입니다. 이러한 통합은 메트릭, 이벤트, 로그, 트레이스 등 다양한 데이터 유형을 포함할 수 있습니다.

소프트웨어 라이선스
: 소프트웨어 라이선스는 Datadog 마켓플레이스에서 고객에게 소프트웨어 솔루션을 제공하고 라이선스를 판매할 수 있도록 해줍니다.

전문 서비스
: 전문 서비스는 일정 기간 동안 구현, 지원, 관리를 위한 팀의 서비스를 제공할 수 있도록 해줍니다.

## Datadog 마켓플레이스 가입하기

기술 파트너는 즉시 사용 가능한 통합을 등록할 수 있지만 마켓플레이스 파트너는 기술 파트너에게 제공되지 않는 고유한 혜택을 누릴 수 있습니다.

- 블로그 게시물, 보도 자료 인용, 소셜 미디어 증폭을 포함한 **시장 진출 협업**과 파트너 성장 가속화에 초점을 맞춘 전용 영업 및 마케팅 리소스에 대한 액세스를 제공합니다.
- 내부 판매 강화를 위한 **교육과 지원**이 제공됩니다.
- **독점 스폰서십 기회** 컨퍼런스 및 이벤트([Datadog DASH][20])를 할인된 가격으로 누릴 수 있습니다.
- 사용자 검색으로부터 **새로운 리드 생성**이 가능합니다.

## Datadog 파트너 네트워크 가입하세요.

Datadog 마켓플레이스에 제품/서비스를 등록하기 전 먼저, [Datadog 파트너 네트워크][3] **기술 파트너** 트랙을 신청해야 합니다. 신청이 승인되면 제품/서비스 개발을 시작할 수 있습니다.

## 샌드박스 계정 요청

모든 기술 파트너는 개발 지원을 위해 전용 Datadog 샌드박스 계정을 요청할 수 있습니다.

샌드박스 계정을 요청하는 방법:

1. [Datadog 파트너 포털][6]에 로그인합니다.
2. 개인 홈페이지에서 **샌드박스 액세스** 아래의 **더보기 ** 버튼을 클릭하세요.
3. **샌드박스 업그레이드 요청**을 선택합니다.

<div class="alert alert-info">이미 Datadog 조직(시행 조직 포함)의 구성원인 경우 새로 만든 샌드박스로 전환해야 할 수 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/account_management/org_switching/">계정 관리 설명서</a>를 참조하세요.</div>

개발자 샌드박스를 만드는 데는 최대 1-2 영업일이 소요될 수 있습니다. 샌드박스가 생성되면 공동 작업을 위해 [조직의 새 구성원을 초대][7]할 수 있습니다.

## 마켓플레이스에 액세스 요청

개인용 마켓플레이스 리포지토리에 액세스를 요청하려면 <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a>에 이메일을 보내주세요. 액세스가 허용되면 마켓플레이스 리포지토리에서 주석, 모범 사례와 함께 [예시 풀 요청][12]을 검토할 수 있습니다.

## 출시(GTM) 기회 조정

마켓플레이스 타일이 출시되면 기술 파트너는 Datadog 파트너 마케팅 팀과 교류하여 공동 출시(GTM) 전략을 조정할 수 있습니다. 다음이 포함됩니다.

- 파트너 보도 자료용 Datadog 견적서 
- [Datadog 모니터][21]의 블로그 게시물
- 소셜 미디어 게시물 강화

## 시작하기

API 기반 통합, 소프트웨어 라이선스 또는 전문 서비스를 시작하려면, [타일 생성][13]을 확인하세요. Datadog 마켓플레이스에서 에이전트 기반 통합을 빌드하고 판매하는 데 관심이 있다면 [에이전트 기반 통합 생성][19]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/marketplace
[3]: https://partners.datadoghq.com/
[5]: https://docs.datadoghq.com/ko/developers/datadog_apps
[6]: https://partners.datadoghq.com/English/
[7]: /ko/account_management/users/#add-new-members-and-manage-invites
[8]: https://learn.datadoghq.com/courses/intro-to-integrations
[9]: https://learn.datadoghq.com/
[10]: https://chat.datadoghq.com/
[11]: https://docs.datadoghq.com/ko/developers/authorization/
[12]: https://github.com/DataDog/marketplace/pull/107
[13]: https://docs.datadoghq.com/ko/developers/integrations/create_a_tile
[15]: https://docs.datadoghq.com/ko/developers/integrations/api_integration
[19]: https://docs.datadoghq.com/ko/developers/integrations/agent_integration
[20]: https://www.dashcon.io/
[21]: https://www.datadoghq.com/blog/