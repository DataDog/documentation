---
description: Datadog 설치가 원활하게 실행되도록 유지하기.
further_reading:
- link: getting_started/dashboards/
  tag: 설명서
  text: 대시보드 시작하기
title: Datadog 유지 관리 및 실행
---

[계획][24] 및 [구축][25] 섹션에서는 프로덕션 환경을 원활하게 하기 위해 Datadog 환경 구축 및 반복, 통합 전략화, 목표 설정과 관련한 인사이트를 얻었습니다. 다음 단계는 실행입니다. Datadog 설치 환경을 효율적으로 실행할 수 있도록 내외부 작업을 관리하는 방법을 알아봅니다.

## 서비스 작업

새로운 Datadog 설치 환경을 순차적으로 릴리스하여 위험을 줄이고 채택률을 높일 수 있습니다. 이 섹션에는 Datadog의 사용자 환경을 최적화하기 위한 일련의 항목 릴리스 목록이 안내되어 있습니다. IT 아키텍처가 매우 다양하기 때문에 이 가이드는 높은 수준의 정보를 담고 있습니다. 다음 하이라이트를 참고하세요.

### 새 인프라 인스턴스 온보딩

인프라는 IT와 통합 가시성의 핵심 요소입니다. Datadog 관리자 팀이 가장 중요하고 자주 하는 작업입니다. Datadog 플랫폼은 적응력이 뛰어나고 대부분의 작업을 간소화할 수 있는 도구를 제공합니다. 특정 환경에 맞게 조정을 시작해 보세요. IT 아키텍처는 하이퍼바이저, 하이퍼스케일러, 서버리스 인프라 등의 구성 요소를 포함할 수 있습니다.

**권장 사항**:   

[Fleet Automation][1]을 사용하여 대규모로 에이전트를 원격으로 관리하세요. 팀의 새로운 인프라 요청을 지속적으로 확인하고, 조기에 플래그를 지정하며, 엔지니어링 리소스를 적용하여 인프라 서비스를 합리적으로 확장하는 데 집중할 수 있습니다.

### 새로운 애플리케이션 설치 공간 온보딩

Datadog에 애플리케이션을 추가하는 것은 Datadog 관리 초기에 흔히 하는 작업입니다. Datadog의 요구 사항에 따라 현지 조건에 적합한 효율적인 메커니즘을 개발하세요. 계획 단계에서부터 최소한 지식 기반 항목을 추가하고 추가 고려 사항을 확인할 수 있습니다.

- Universal Service Tag(`version`)는 시각화에서 중요합니다. 이렇게 유용한 시각화를 지원하려면 자동화되고 안정적이며 규정을 준수하는 방법을 개발해야 합니다.

- 종합적인 [Software Catalog][2]는 구축하면 향후 많은 혜택을 누릴 수 있습니다. Software Catalog는 Datadog 설계 패턴의 핵심이며 거버넌스, 종속성 및 서비스 정의 개체를 호스팅합니다.

**권장 사항:**   
애플리케이션 빌드 프로세스에 통합된 자동 버전 태깅을 개발하세요. Software Catalog에 집중하고 설정 안내를 통해 준비 상태를 추적하세요.

## 기술 문제 해결

서비스형 플랫폼 구조로 인해 Datadog 호스트는 관리자의 트러블슈팅이 거의 필요하지 않습니다. Agent 호스트의 문제를 파악하려면` datadog-agent status` [명령][3]을 사용하세요. 이 명령은 해결해야 할 영역을 식별하는 세분화되고 구체적이며 실행 가능한 정보를 보고합니다. 또한 `datadog-agent flare` 명령을 사용하면 Datadog 지원 팀에서 해결해야 하는 문제를 신속하게 파악할 수 있습니다.

**권장 사항**: 
첫날 `status` 및 `flare` 명령을 사용해 보세요.

## 관리 작업

다른 모든 엔터프라이즈 소프트웨어와 마찬가지로 지속적인 유지 관리 작업은 체계적이며 현지 정책을 준수해야 합니다. 일반적으로 다음을 포함한 작업들이 진행됩니다.

### 사용량 모니터링

이러한 목적을 위해 제공되는 도구를 채택하는 것과 마찬가지로 사용량 모니터링은 필수적입니다. Datadog에서는 이 기능의 기반이 될 수 있는 [예상 사용량 메트릭][5] 대시보드를 제공합니다. 또한 모든 로그, 메트릭, 트레이스의 [예상 사용량][6]을 시각화할 수 있는 기본 제공 대시보드도 제공합니다.

### 대시보드 및 모니터 배포

사용자가 Datadog에 익숙해지면 [대시보드][7] 및 [모니터][8]와 같이 자주 사용하는 항목에 대한 개선 및 조정을 요청할 수 있습니다. SLO 및 기타 콘텐츠 개체를 포함한 구성 요소는 반복 개발을 위해 설계되었으며 JSON으로 작성됩니다. 플랫 파일로 복제, 내보내기, 수정, 가져오기 및 저장할 수 있습니다. 또한 대시보드와 상호 작용하고 대시보드를 생성하기 위한 [대시보드 API][10] 및 [terraform 공급자][9]를 사용할 수 있습니다.  

대시보드를 만들 때는 구성 프로세스보다 표시하려는 콘텐츠의 우선 순위를 정하세요. 이러한 생성 과정은 대시보드 작성 도구 및 제품과 함께 제공되는 사전 구성 대시보드에서 지원됩니다. {{< translate key="integration_count" >}} 통합에 포함된 각 대시보드는 해당 기술을 모니터링하기 위한 부가 템플릿입니다. 기본 대시보드는 Datadog의 환경과 옵저버빌리티 권장 모델의 이점을 제공합니다. 

**권장 사항:**  

- 생성하려는 대시보드의 목적을 결정합니다.
- [예상 사용량 지표][6]에 따라 Datadog 사용량 모니터를 설정합니다.  
- 이러한 예상 사용량 메트릭에 [이상 또는 변경 모니터][11]를 생성하여 Datadog 사용량이 급증할 때 알림을 보냅니다.    
- 다른 대시보드를 [재사용 및 복제][12]하여 시간을 절약합니다.
- [OOTB 대시보드][13]를 활용하여 소비량을 관리합니다.

많이 사용되는 OOTB 대시보드는 AWS EC2 개요 대시보드입니다:

{{< img src="/administrators_guide/ec2_overview.png" alt="AWS EC2 개요 대시보드" style="width:90%;">}}

### API 키 로테이션 

Datadog 플랫폼은 표준 Restful API 키 인증을 사용하며 키 로테이션을 포함한 표준 [API 키 보안][14]을 따를 것을 권장합니다. 또한 이러한 키를 논리적 작업 그룹에 할당하여 보안 프로필 및 로테이션 작업을 최적화할 것을 권장합니다.

**권장 사항:**   

Datadog API 및 앱 키를 자체 시스템에 통합하여 키를 관리하세요. 키를 쉽게 관리할 수 있는 그룹으로 설정하세요. 

### RBAC 개체 역할, 팀 및 권한 집합

Datadog [RBAC][15]는 SAML 공급자와 해당 SAML 공급자의 업스트림에 있는 AD/LDAP 스토어에 의존합니다. AD 사용자 그룹을 미러링하고 표준 그룹 매핑에서 Datadog에 해당하는 권한을 할당할 수 있습니다. 키-값 구조에 대한 특정 그룹 이름 및 속성을 교환하려면 Datadog 관리자와 SAML/AD/LDAP 관리자 간 협업이 필요합니다.    

## Datadog Agent 업데이트

Agent 구성 요소는 보안 및 기능 향상으로 정기적으로 업데이트되므로 최신 상태를 유지하는 것이 가장 좋습니다. 새 소프트웨어의 테스트 및 릴리스와 관련한 현지 절차를 따르세요.   

**권장 사항:**  

기존 패치 관리 표준 및 업그레이드 정책에 Datadog 업그레이드를 포함하세요. Datadog 모니터의 [릴리스 피드][17]를 구독하고 업그레이드가 필요한 Agent에는 [Fleet Automation 페이지][18]를 면밀히 확인합니다.

## 요약

Datadog 관리 시 기존 프로세스 표준과 부합해야 하는 몇 가지 활동이 있습니다. 키 로테이션, 패치 업데이트, 온보딩 및 코드형 인프라(IaC)를 위해 Datadog를 표준 시스템에 통합하세요. 이러한 표준을 조기에 게시하여 사용자가 새로운 Datadog 설치를 시작할 수 있도록 안내하세요. 

## 다음 단계

Datadog 설치를 성공적으로 계획, 설정 및 유지 관리한 후에는 다음 리소스를 사용하여 진행 중인 Datadog 여정을 지원하세요.

- [Datadog 인증 획득][20]
- [Datadog 지원 시작하기][21]
- [Datadog 새 릴리스 및 보안 뉴스레터 신청하기][22]
- [모니터 블로그 확인][23]

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/fleet_automation/
[2]: /ko/software_catalog/
[3]: /ko/agent/configuration/agent-commands#agent-information
[4]: /ko/agent/troubleshooting/send_a_flare/?tab=agent\#send-a-flare-using-the-flare-command
[5]: https://app.datadoghq.com/dash/integration/31281/estimated-usage-overview?fromUser=false\&refresh_mode=sliding\&view=spans\&from_ts=1721313591456\&to\_ts=1721317191456\&live=true
[6]: /ko/account_management/billing/usage_metrics/
[7]: /ko/dashboards/#overview
[8]: /ko/monitors/
[9]: /ko/getting_started/integrations/terraform/#dashboards
[10]: /ko/api/latest/dashboards/
[11]: /ko/monitors/types/anomaly/
[12]: /ko/getting_started/dashboards/#start-by-reusing-other-dashboards
[13]: https://app.datadoghq.com/dashboard/lists
[14]: /ko/account_management/api-app-keys/#using-multiple-api-keys
[15]: /ko/account_management/rbac/?tab=datadogapplication
[16]: /ko/integrations/
[17]: https://github.com/DataDog/datadog-agent/releases
[18]: https://app.datadoghq.com/fleet
[19]: /ko/api/latest/key-management/
[20]: https://www.datadoghq.com/certification/overview/
[21]: /ko/getting_started/support/
[22]: https://www.datadoghq.com/subscriptions/
[23]: https://www.datadoghq.com/blog/
[24]: /ko/administrators_guide/plan/
[25]: /ko/administrators_guide/build/