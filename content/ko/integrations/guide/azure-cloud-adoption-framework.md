---
further_reading:
- link: /integrations/azure/
  tag: 설명서
  text: Datadog-Azure 통합
- link: https://www.datadoghq.com/blog/migrate-to-azure-with-the-microsoft-cloud-adoption-framework/
  tag: 블로그
  text: Microsoft Cloud Adoption Framework를 사용한 Azure 마이그레이션
kind: 가이드
title: Datadog를 사용하는 Azure Cloud Adoption Framework
---

## 개요

Datadog와 Azure의 Cloud Adoption Framework를 사용하면 온프레미스 또는 기타 클라우드 환경 모두에서 새로운 클라우드 환경으로 안전하고 빠르게 마이그레이션할 수 있습니다.

다음과 같이 할 수 있습니다:

1. 팀이 효과적으로 워크로드 마이그레이션을 실행할 수 있도록 Datadog 계정을 준비하세요. 이것이 "계획" 단계입니다.
2. 팀이 새로운 환경으로 이동할 때 Datadog를 사용해 기존 환경과 새로운 워크로드의 상태를 측정하세요. 이것이 "마이그레이션" 단계입니다.

이 가이드는 Azure의 Cloud Adoption Framework를 사용하는 조직을 위한 마이그레이션 프로세스를 설명합니다.

아직 Datadog 계정이 없다면 [2주 평가판을 시작할 수 있습니다][1].

## 계획

마이그레이션을 계획할 때 Datadog 계정을 준비해 워크로드가 Azure 계정으로 마이그레이션되자마자 새로운 워크로드를 모니터링하세요. 다음과 같이 하면 됩니다.

1. [Datadog-Azure 통합][2]을 활성화하여 새로운 워크로드가 성능과 상태를 표시할 수 있도록 합니다.
2. 마이그레이션 시 팀이 워크로드를 설명하는 데 사용할 수 있는 태깅 전략을 기록합니다.
3. 마이그레이션 진행 시 이해관계자가 사용할 수 있는 대시보드를 설정하고 전반적인 새로운 워크로드 상태를 이해합니다.
4. 인시던스 대응을 위한 커뮤니케이션 채널을 설정합니다.

### Datadog-Azure 통합 활성화

Datadog와 Azure는 파트너십을 통해 Azure 계정에서 Datadog 서비스를 제공하고 있습니다. 마이그레이션 목적지 각각에 대해 Datadog 리소스를 생성해 Datadog 계정과 Azure 계정을 연결하여 Azure에서 관측 가능성 데이터에 액세스할 수 있습니다.

Datadog에서 수집하려는 Azure 데이터를 결정하는데 도움이 되는 이 프로세스에 대한 자세한 정보는 [Microsoft Azure 설명서][2]를 참조하세요.

Datadog 리소스는 대규모 Datadog-Azure 통합 목록 설정을 간소화하고 새로운 Azure 워크로드의 상태와 성능에 대한 팀의 가시성을 크게 향상합니다. Datadog에서는 [Azure DevOps 통합][3]을 활성화할 것을 권장합니다. 이를 통해 팀은 워크로드 성능 데이터를 빌드 및 릴리스 이벤트와 연계할 수 있습니다.

이 통합을 설정하는 방법에 대한 자세한 정보는 [Microsoft Azure DevOps][4]를 참조하세요.

Datadog는 Microsoft Teams 또는 Slack 등 필요 시 팀과의 커뮤니테이션을 향상하기 위한 많은 통합을 제공합니다. 

조직에서 사용하는 모든 커뮤니케이션 통합을 추가합니다. 통합 및 설정 지침에 대한 전체 목록은 [통합][5]을 참조하세요.

### 태그

애플리케이션과 환경에 대한 효과적인 모니터링에 태깅은 필수적입니다. Azure 목적지로 마이그레이션을 시작하기 전 태깅 전략을 수립해야 합니다.

어렵게 생각될 수도 있지만 많은 시간이 들거나 복잡하지 않습니다. 좋은 태그 후보는 인프라 또는 서비스를 분류하는 데 유용한 모든 데이터를 포함합니다.

해당되는 경우 리소스에 다음 태그를 추가하세요.

| 태그 이름       | 설명                                                                                                                                                                                                     |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `env`          | `prod`, `staging` 및 `dev`의 경우:                                                                                                                                                                               |
| `service`      | 의문이 있는 경우 `ApplicationName`과 동일한 값을 사용합니다.                                                                                                                                                         |
| `version`      | 어떤 버전의 애플리케이션이 사용 중인지 확인합니다.                                                                                                                                                        |
| `team`         | 어느 팀이 리소스를 빌드하고 관리하는지 정의합니다. 각 팀만을 위한 별도의 Microsoft Teams 채널을 만들어 서비스 상태에 대한 소식을 받을 수 있도록 합니다. |
| `owner`        | 특히 누가 리소스에 책임이 있는지 정의합니다.                                                                                                                                                         |
| `workload`     | 어떤 워크로드에 리소스가 연결되었는지 알려주고 레거시에서 클라우드에 이르는 성능과 KPI 비교를 지원합니다.                                                                                                  |
| `landing-zone` | 리소스가 존재하는(해당 경우) 랜딩 존을 파악하고 레거시에서 클라우드에 이르는 성능과 KPI 비교를 지원합니다.                                                                                     |

Azure의 Cloud Adoption Framework는 위의 목록과 약간 중복되는 [사전 정의된 태깅 전략][6]을 제공합니다. 이 설명서를 검토하고 조직에 적용되는 태그, 특히 **최소 제안 태그** 섹션에 나와 있는 태그를 설정하세요.

### 대시보드

Datadog는 Azure 관련 서비스를 이용하는 고객을 위해 즉시 사용할 수 있는 여러 가지 대시보드를 제공합니다. 사용 가능한 대시보드 목록은 [Azure 통합][7]을 참조하세요.

조직에 잘 맞는 태깅 전략을 확보하면 Datadog는 [즉시 사용 가능한 대시보드를 복제][8]하고 표준화된 태그 목록에서 [대시보드 탬플릿 변수][9]를 추가할 것을 권장합니다.

대시보드 템플릿 변수를 통해 Datadog 대시보드는 광범위한 데이터 요약과 구체적인 데이터 하위목록을 태그별로 표시해 가시성을 제공합니다. 예를 들어 `workload` 태그를 대시보드 템플릿 변수로 추가하면 많은 워크로드 성능 요약을 대시보드에서 확인하고 특정 워크로드 성능별로 전체 대시보드를 필터링할 수 있습니다.

이러한 방법으로 단일 대시보드는 각 워크로드에 대한 별도의 대시보드를 관리할 필요없이 모든 워크로드를 볼 수 있는 유용한 도구가 됩니다.

### 인시던트 대응을 위한 커뮤니케이션 채널

많은 조직이 서비스 또는 워크로드의 소유 계층 구조를 반영하는 전용 커뮤니케이션 채널을 설정하고자 합니다. Datadog에서는 태깅 전략을 통해 이러한 커뮤니케이션 채널의 이름 명명 규칙을 페어링할 것을 권장합니다.

예를 들어 `owner` 태그를 사용하여 표준화한 경우 `owner` 태그 값으로 이름이 정의된 조사 이메일 그룹 또는 커뮤니케이션 채널을 구성합니다. [동적 핸들][10]을 구성하여 팀은 올바른 알림이 적절한 응답자에게 전달되도록 보장할 수 있습니다.

## 마이그레이션하기

Datadog 계정이 준비되었다면 팀은 Datadog를 사용해 원래 환경에서 새로운 랜딩 존 워크로드로 원활하게 마이그레이션할 수 있습니다.

각 워크로드에 대해 이 프로세스는 다음을 포함합니다.

1. Datadog 에이전트를 설치하고 설정하여 레거시 환경과 새로운 워크로드에 대한 종합적이고 일관된 모니터링을 보장합니다.
2. 대시보드를 설정하여 레거시 환경 상태와 새 워크로드 상태를 나란히 관찰할 수 있습니다.
3. 모니터를 설정하면 조사 팀이 성능 KPI의 중요 변경 사항에 응답할 수 있습니다.
4. 신서틱(Synthetic) 테스트를 추가하여 선제적으로 사용자 경험의 예기치 않은 저하를 모니터링할 수 있습니다.
5. SLO를 설정하여 이해관계자가 잘 확인할 수 있도록 KPI 상태를 문서화하세요.

### 원래 환경에서 관측 가능성 격차 해결

워크로드 또는 서비스 소유자로서 원래 환경과 새로운 Azure 워크로드에 대한 종합적이고 일관된 관측 가능성을 확보하는 최상의 방법은 Datadog 에이전트를 설치하는 것입니다.

Datadog 에이전트는 파일 크기가 작고 모든 서버(온프레미스 또는 클라우드 제공업체 포함)에 걸쳐 실행되도록 설계되었습니다. 또한 서비스 상태를 확인하는 데 필요한 데이터를 수집하고 Datadog 계정에 모두 가져옵니다.

[이 페이지][11]는 개별 서버에서 에이전트를 설치하는 방법 및 원하는 설정 관리 도구를 사용해(권장) 설치를 진행하는 방법을 안내합니다.

Datadog 에이전트를 설치하면 다음 데이터 수집 방법을 추가하여 환경 상태에 대한 더 완전한 가시성을 확보하세요.

  1. 통합을 추가하여 적용하는 서비스 기술별로 [데이터를 수집합니다][12].
  2. [애플리케이션 성능 모니터링(APM)을 활성화하여][13] 요청 개수, 지연 시간 및 서비스 오류 비율을 측정합니다.
  3. [환경에서 생성된 로그 캡처][14]를 통해 예기치 않은 메트릭 및 트레이스 상태가 관찰될 때 더 자세한 컨텍스트를 확보합니다. 많은 로그가 있는 경우 [가장 핵심 로그만 저장하세요][15].
  4. [네트워크 성능 모니터링(NPM) 활성화][16]를 통해 서비스 간 효과적인 커뮤니케이션을 보장하세요. 원래 환경이 새로운 클라우드 환경과 커뮤니케이션해야 하기 때문에 NPM은 마이그레이션 프로세스에서 핵심적입니다.

새로운 워크로드를 마이그레이션하기 전 에이전트를 설치하고, 레거시 환경에서 완벽한 데이터 수집을 설정하고, 새로운 워크로드를 설계해 완전한 동일 데이터 수집을 포함하는 Datadog 에이전트를 포함하세요.

조직의 태깅 표준에 따라 모든 성능 데이터가 적절한 팀, 워크로드 및 랜딩 존에 따라 이해될 수 있도록 보장하세요.

### 워크로드 상태 및 마이그레이션 대시보드

상태 데이터가 Datadog 계정으로 유입되면 [호스트][17], [컨테이너][18], [서비스][19] 및 [네트워크 트래픽][20]을 포함하는 Datadog 가시성 맵이나 통합한 기술에 맞는 [즉시 사용 가능한 대시 보드]에서 구축한 환경을 확인하고 이해할 수 있습니다. 

해당 대시보드를 복제하고 커스터마이즈하거나 새로운 커스텀 대시보드를 생성해 구체적인 사용 사례에 필요한 데이터를 확인할 수 있습니다.

일부 경우, 레거시 환경과 새로운 워크로드의 성능을 나란히 시각화하는 것이 좋을 수 있습니다.

이러한 단계를 따라 예시 대시보드를 만드세요.

1. Datadog 계정에서 [대시보드를 생성하세요][22].
2. 오른쪽 코너에서 **설정** 아이콘을 클릭하세요.
3. **대시보드 JSON 내보내기**를 클릭하세요. 자세한 정보는 [대시보드 설정][23]을 참조하세요.
4. [`azure_caf_side_by_side_dashboard.json`][24]에서 찾은 대시보드의 JSON 정의를 붙여넣거나 업로드하세요.

### 실행 가능한 알림을 워크로드 소유자에게 전송

워크로드를 마이그레이션하면서 중요 성능 KPI 임계값이 초과했을 때 적합한 사람들이 자동으로 알림을 받을 수 있도록 보장하세요.

이렇게 하려면 Datadog에 모니터를 생성하여 워크로드 상태를 계속 관찰하고 Microsoft Teams, Slack 및 페이저 서비스 및 티켓팅 시스템을 통해 커뮤니케이션 채널로 알림이 트리거되도록 해야 합니다. 자세한 정보는 [모니터][25]를 참조하세요.

전용 조사 채널(예: 매 소유자, 팀 또는 워크스페이스에 대한 Teams 채널이 있는 경우)에 효과적으로 태그를 매핑했다면 모니터를 설정하고 모니터 템플릿 변수를 사용하여 [적합한 커뮤니케이션 채널][10]로 동적으로 알릴 수 있습니다][10].

조직마다 실행 가능하고 효과적인 알림의 범위란 크게 다를 수 있습니다. 그러므로 팀의 요구에 적합한 새로운 모니터를 설정하세요. 샘플 모니터에 대한 정의는 [`azure_caf_service_errors_15_min.json` 파일][26]을 참조하세요.

### 선제적인 신서틱(Synthetic) 모니터링

[신서틱(Synthetic) 테스트][27]을 설정하여 선제적으로 최종 사용자에게 원활한 고객 경험이 제공되는지 확인할 수 있습니다.

새로운 워크로드가 레거시 환경과 동일한 최종 사용자를 지원하는 경우 신서틱 테스트는 필수적입니다. 마이그레이션으로 예기치 못한 오류나 성능 저하가 발생하면 고객에게 영향을 미치기 전 문제를 플래그 지정하고 해결할 수 있습니다.

또한 Azure DevOps의 [CI/CD 파이프라인에서 이러한 테스트를 통합하여][28] 배포 프로세스의 일환으로 최종 사용자 경험을 테스트할 수 있습니다.

### SLO를 통한 성공 기록

서비스 수준 목표(Service Level Objectives)를 설정하여 워크로드 가용성 목표와 마이그레이션 전반에서의 성공을 기록하세요.

SLO 설정 방법에 대한 자세한 정보와 대시보드를 통해 SLO를 이해관계자에게 표시하는 방법에 대한 자세한 정보는 [서비스 수준 목표(Service Level Objectives)][29]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://us3.datadoghq.com/signup
[2]: /ko/integrations/azure/?tab=link&site=us3
[3]: /ko/integrations/azure_devops/#overview
[4]: /ko/integrations/azure_devops/#setup
[5]: /ko/integrations/#cat-collaboration
[6]: https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-tagging#minimum-suggested-tags
[7]: https://app.datadoghq.com/dashboard/lists/preset/3?q=azure
[8]: /ko/dashboards/#clone-dashboard
[9]: /ko/dashboards/template_variables/
[10]: /ko/monitors/notify/variables/?tab=is_alert#dynamic-handles
[11]: https://app.datadoghq.com/account/settings/agent/latest
[12]: https://app.datadoghq.com/account/settings#integrations
[13]: https://app.datadoghq.com/apm/getting-started
[14]: https://app.datadoghq.com/logs/onboarding
[15]: /ko/logs/guide/getting-started-lwl/
[16]: /ko/network_monitoring/performance/
[17]: https://app.datadoghq.com/infrastructure/map
[18]: https://app.datadoghq.com/infrastructure/map?node_type=container
[19]: https://app.datadoghq.com/apm/map
[20]: https://app.datadoghq.com/network/map
[21]: https://app.datadoghq.com/dashboard/lists/preset/3
[22]: https://app.datadoghq.com/dashboard/lists#
[23]: /ko/dashboards/#copy-import-or-export-dashboard-json
[24]: /resources/json/azure_caf_side_by_side_dashboard.json
[25]: /ko/monitors/
[26]: /resources/json/azure_caf_service_errors_15_min.json
[27]: /ko/synthetics/
[28]: /ko/synthetics/cicd_integrations/configuration?tab=npm
[29]: /ko/monitors/service_level_objectives/