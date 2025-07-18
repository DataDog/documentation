---
aliases:
- /ko/guides/agent_checks/
- /ko/agent/agent_checks
- /ko/developers/agent_checks/
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/README.md
description: 통합 페이지에서 제품을 개발하고 게시하는 방법에 대해 알아보세요.
further_reading:
- link: /developers/integrations/agent_integration/
  tag: 설명서
  text: 에이전트 통합 생성
- link: /developers/integrations/api_integration/
  tag: 설명서
  text: API 통합 생성
- link: /developers/integrations/marketplace_offering/
  tag: 설명서
  text: Datadog 마켓플레이스에서 통합 판매 방법에 대해 알아보세요.
- link: /developers/
  tag: 설명서
  text: Datadog 플랫폼에서 개발하는 방법에 대해 알아보세요.
kind: 설명서
title: 통합 구축
---
## 개요

이 페이지에서는 기술 파트너가 [Datadog 에이전트][11] 또는 [Datadog API][12]를 사용하여 [통합 구축](#create-a-datadog-integration)을 수행하고 **통합** 또는 **마켓플레이스** 페이지에 제품을 목록화하는 방법을 설명합니다.

{{< tabs >}}
{{% tab "통합" %}}

[통합 페이지][101]에는 Datadog 및 NAT 기술 파트너가 구축한 통합 기능이 포함되어 있으며, Datadog 고객에게 _무료_로 제공됩니다.

{{< img src="developers/integrations/integrations_overview.png" alt="Datadog 통합 페이지" style="width:100%;" >}}

[101]: https://app.datadoghq.com/integrations

{{% /tab %}}
{{% tab "Marketplace" %}}

[마켓플레이스 페이지][101]는 기술 파트너가 Datadog 고객에게 통합, 소프트웨어 라이센스, 전문적인 서비스 등 다양한 제품을 _판매_하기 위한 상업용 플랫폼입니다.

{{< img src="developers/marketplace/marketplace_updated_overview.png" alt="Datadog 마켓플레이스 페이지" style="width:100%" >}}

[101]: https://app.datadoghq.com/marketplace

{{% /tab %}}
{{< /tabs >}}

## Datadog 파트너 네트워크 가입

Datadog에 통합을 등록하기 전에 먼저 [Datadog 파트너 네트워크][5] **기술 파트너** 트랙에 적용합니다. 애플리케이션이 승인되면 통합 개발을 시작할 수 있습니다.

## Datadog 통합 생성

### 에이전트 기반 통합

에이전트 기반 통합은 [Datadog 에이전트][11]를 사용하여 기술 파트너가 작성한 검사를 통해 데이터를 제출합니다. 이러한 통합에 대한 구현 코드는 Datadog에서 호스팅합니다.

에이전트 통합은 근거리 통신망(LAN) 또는 가상 사설 클라우드(VPC)에 있는 시스템이나 애플리케이션에서 데이터를 수집하는 데 가장 적합합니다.  [에이전트 통합 생성][2]을 사용하려면 솔루션을 파이썬(Python) 휠(`.whl`)로 게시하고 배포해야 합니다.

### API 기반 통합

API 기반 통합은 [Datadog API][12]를 사용하여 외부 플랫폼에서 —메트릭, 트레이스, 로그 등—의 텔레메트리를 제출할 수 있습니다. 고객은 스택의 나머지 데이터와 함께 이 데이터를 시각화하고 상관 관계를 분석하여 문제를 신속하게 해결할 수 있습니다. API 기반 통합은 고객이 [OAuth를 사용하여 액세스 권한을 부여][13]하면 DataDog에서 데이터를 읽을 수도 있습니다.

기술 파트너는 통합을 구성하는 구현 코드를 작성하고 호스트 합니다. [API 통합 생성][1]은 Datadog과 다른 SaaS 플랫폼 간의 커넥터를 구축하는 기술 파트너에게 적합합니다.

### 이점

통합을 통해 다음과 같은 이점을 얻을 수 있습니다:

데이터와 사용자 관찰 데이터의 상관 관계 분석
: Datadog을 활용하여 고객이 나머지 기술 스택과 함께 플랫폼의 데이터를 볼 수 있도록 함으로써 플랫폼의 가치를 높일 수 있습니다.


고객의 평균 해결 시간(MTTR) 감소
: 고객의 계정에 통합 데이터가 충분하면 전체 스택을 보다 광범위하게 볼 수 있으므로 문제를 보다 신속하게 디버깅하고 해결할 수 있습니다.

채택률 및 가시성 향상
: Datadog의 기본 기능을 보장하면 채택에 대한 마찰이 줄어들고 [통합 페이지][10] 또는 [마켓플레이스 페이지][17]에 타일을 표시하여 모든 Datadog 고객에게 주요 정보를 제공할 수 있습니다.

### 책임

사용자는 통합 작성자로서 코드를 유지 관리하고 모든 [Datadog 사이트][15]에서 통합이 제대로 작동하는지 확인할 책임이 있습니다. 설치 문제가 발생하면 [고객 지원팀에 문의하세요][16].

## 시작하기

### 샌드박스 계정 요청

모든 기술 파트너는 통합 개발을 지원하기 위해 전용 Datadog 샌드박스 계정을 요청할 수 있습니다. 이 샌드박스 계정은 데이터 전송, 대시보드 구축 등에 사용할 수 있는 무료 라이센스를 포함합니다.

<div class="alert alert-info">이미 Datadog 조직(시행 조직 포함)의 구성원인 경우 새로 만든 샌드박스로 전환해야 할 수 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/account_management/org_switching/">계정 관리 설명서</a>를 참조하세요.</div>

샌드박스 계정을 요청하는 방법:

1. [Datadog 파트너 포털][5]에 로그인합니다.
2. 개인 홈페이지에서 **샌드박스 액세스** 아래의 **더보기 ** 버튼을 클릭하세요.
3. **샌드박스 업그레이드 요청**을 선택합니다.

개발자 샌드박스를 만드는 데는 최대 1∼2 영업일이 소요될 수 있습니다. 샌드박스가 생성되면 공동 작업을 위해 [조직의 새 구성원을 초대][6]할 수 있습니다.

### 학습 리소스 탐색

**기술 파트너** 트랙에 참여하여 샌드박스 계정을 요청한 후에는 다음을 통해 제품 개발에 대해 자세히 알아볼 수 있습니다:

* [Datadog 학습 센터][8]에서 온디맨드 [**Datadog 통합 소개**][7] 과정을 수료합니다.
* [API 기반 통합][1] 생성 및 [API 기반 통합을 위한 OAuth 2.0 클라이언트][9]설정에 대한 설명서를 읽습니다.
* [에이전트 기반 통합][2] 생성에 대한 설명서를 읽습니다.

Datadog 통합 판매 또는 기타 유형의 제품 판매에 대한 자세한 내용은 [마켓플레이스 제품 구축][4]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/developers/integrations/api_integration/
[2]: https://docs.datadoghq.com/ko/developers/integrations/agent_integration/
[3]: https://docs.datadoghq.com/ko/integrations/
[4]: https://docs.datadoghq.com/ko/developers/integrations/marketplace_offering/
[5]: https://partners.datadoghq.com/
[6]: https://docs.datadoghq.com/ko/account_management/users/#add-new-members-and-manage-invites
[7]: https://learn.datadoghq.com/courses/intro-to-integrations
[8]: https://learn.datadoghq.com/
[9]: https://docs.datadoghq.com/ko/developers/authorization/
[10]: https://app.datadoghq.com/integrations
[11]: https://docs.datadoghq.com/ko/agent/
[12]: https://docs.datadoghq.com/ko/api/latest/
[13]: https://docs.datadoghq.com/ko/developers/authorization/
[14]: https://docs.datadoghq.com/ko/metrics/custom_metrics/
[15]: https://docs.datadoghq.com/ko/getting_started/site/
[16]: https://docs.datadoghq.com/ko/help/
[17]: https://app.datadoghq.com/marketplace