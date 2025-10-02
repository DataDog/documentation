---
further_reading:
- link: /integrations/azure/
  tag: 설명서
  text: Datadog-Azure 통합
- link: https://www.datadoghq.com/blog/migrate-to-azure-with-the-microsoft-cloud-adoption-framework/
  tag: 블로그
  text: Microsoft Cloud Adoption Framework를 사용한 Azure 마이그레이션
title: Datadog를 사용하는 Azure Cloud Adoption Framework
---

## 개요

Datadog는 Azure Cloud Adoption Framework로 온프레미스 또는 다른 클라우드 환경에서 새로운 클라우드로 안전하면서도 신속하게 마이그레이션할 수 있도록 도와줍니다.

다음을 할 수 있습니다.

1. 팀이 워크로드 마이그레이션을 효율적으로 실행할 수 있도록 Datadog 계정을 준비합니다. 이는 '계획' 단계입니다.
2. Datadog을 사용하여 팀이 새 랜딩 존에서 작업을 시작할 때 기존 환경 및 신규 워크로드의 상태를 측정합니다. 이는 '마이그레이션' 단계입니다.

이 가이드는 Azure의 Cloud Adoption Framework를 사용하는 조직을 위한 마이그레이션 프로세스를 설명합니다.

아직 Datadog 계정이 없다면 [2주 평가판을 시작][1]해 볼 수 있습니다.

## 계획

마이그레이션을 계획할 때 다음 작업을 실행해 Azure 계정으로 마이그레이션하는 즉시 신규 워크로드를 모니터링할 수 있도록 Datadog 계정을 준비합니다.

1. [Datadog-Azure 통합][2]를 사용하도록 설정하여 신규 워크로드의 성능 및 서비스 상태를 표시합니다.
2. 팀 마이그레이션 시 워크로드를 설명하는 데 사용할 태깅 전략을 문서화합니다.
3. 마이그레이션 진행 시 이해관계자가 사용할 수 있는 대시보드를 설정하고 전반적인 새로운 워크로드 상태를 이해합니다.
4. 인시던트 응답을 위한 커뮤니케이션 채널을 구축합니다.

### Datadog-Azure 통합 활성화

Datadog와 Azure가 협업하여 Azure 계정 내에서 Datadog 서비스를 제공합니다. 각 랜딩 존에 Datadog 리소스를 생성하고 Datadog 계정을 Azure 계정과 연결합니다. 이렇게 하면 Azure에서 관측 데이터에 액세스할 수 있습니다.

Datadog에서 수집하려는 Azure 데이터를 정하는 데 도움이 되는 프로세스에 대한 자세한 내용을 확인하려면 [Microsoft Azure 설명서][2]를 참조하세요.

Datadog 리소스로 Datadog-Azure 통합의 대규모 목록 설정을 간소화하고 신규 Azure 워크로드의 서비스 상태 및 성능에 관한 팀의 관측성을 크게 증진합니다. Datadog은 팀이 워크로드 성능 데이터를 빌드 및 릴리스 이벤트와 상호 연결할 수 있도록 [Azure DevOps 통합][3]을 활성화할 것을 권장합니다.

통합 설정에 대한 자세한 내용을 확인하려면 [Microsoft Azure DevOps][4]를 참조하세요.

Datadog은 Microsoft Teams 또는 Slack과 같이 팀 커뮤니케이션을 개선할 수 있는 다양한 통합 기능을 제공합니다.

조직에서 사용하는 모든 커뮤니케이션 통합을 추가합니다. 통합의 전체 목록 및 설정 지침을 확인하려면 [통합][5]을 참조하세요.

### 태그

태깅은 애플리케이션 및 환경을 효과적으로 모니터링하는 데 매우 중요합니다. Azure 랜딩 존으로 마이그레이션을 시작하기 전에 태깅 전략을 구현해야 합니다.

어렵게 들릴 수도 있지만 시간이 많이 소요되거나 복잡하지 않습니다. 적절한 태그에는 인프라스트럭처 또는 서비스를 분류하는 데 유용한 모든 데이터가 포함됩니다.

해당되는 경우 리소스에 다음 태그를 추가합니다.

| 태그 이름       | 설명                                                                                                                                                                                                     |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `env`          | `prod`, `staging`, `dev`용입니다.                                                                                                                                                                               |
| `service`      | 의문이 있는 경우 `ApplicationName`과 동일한 값을 사용합니다.                                                                                                                                                         |
| `version`      | 사용 중인 애플리케이션의 버전을 파악합니다.                                                                                                                                                       |
| `team`         | 리소스를 생성 또는 관리하는 팀을 정의합니다. 각 팀 전용 Microsoft Teams 채널을 별도로 만들어 팀에 서비스 상태에 대해 알릴 수 있도록 합니다. |
| `owner`        | 리소스 책임자를 구체적으로 정의합니다.                                                                                                                                                         |
| `workload`     | 리소스가 어떤 워크로드와 관련이 있는지 명확히 정하고 레거시 투 클라우드 성능 및 KPI 비교를 지원합니다.                                                                                                  |
| `landing-zone` | 리소스가 존재하는 랜딩 존(해당되는 경우)을 파악하고 레거시 투 클라우드 성능 및 KPI 비교를 지원합니다.                                                                                     |

Azure Cloud Adoption Framework는 위의 목록과 다소 중복되는 [사전 정의된 태깅 전략][6]을 제공합니다. 본 문서를 검토하고 조직에 적용되는 태그, 특히 **최소 권장 태그** 섹션에 명시된 태그를 구현합니다.

### 대시보드

Datadog은 Azure 관련 서비스를 사용하는 고객을 위해 즉시 사용 가능한 대시보드를 몇 가지 제공합니다. 사용 가능한 대시보드 목록을 살펴보려면 [Azure 통합][7]을 참조하세요.

Datadog에서는 조직에 맞는 태깅 전략이 수립되면 [기본 제공 대시보드를 복제][8]하여 표준화된 태그 목록에서 [대시보드 템플릿 변수][9]를 추가할 것을 권장합니다.

Datadog 대시보드는 대시보드 템플릿 변수를 활용하여 광범위한 데이터 요약의 가시성을 제공하고, 데이터 하위 집합을 태그별로 지정합니다. 예를 들어, 대시보드에 `workload` 태그의 템플릿 변수를 추가하면, 대시보드를 여러 워크로드의 성능 요약으로 활용하고 전체 대시보드를 특정 워크로드의 성능으로 필터링할 수도 있습니다.

이렇게 하면 각 워크로드별로 대시보드를 나누어 관리하지 않아도 하나의 대시보드를 모든 워크로드에 유용하게 사용할 수 있습니다.

### 인시던트 응답을 위한 커뮤니케이션 채널

많은 조직에서 서비스 또는 워크로드의 소유권 계층을 반영한 전용 커뮤니케이션 채널을 설정합니다. Datadog은 이러한 커뮤니케이션 채널의 명명 규칙을 태깅 전략과 함께 사용할 것을 권장합니다.

예를 들어, `owner` 태그로 표준화한 경우, `owner` 태그값으로 정의한 조사 에메일 그룹 또는 커뮤니케이션 채널을 설정합니다. [다이나믹 핸들][10]을 설정하면 팀이 적절한 알림을 적합한 응답자에게 전송할 수 있습니다.

## 마이그레이션

Datadog 계정 준비가 완료되면 팀이 Datadog을 사용하여 기존 환경에서 신규 랜딩 존 워크로드로 순조롭게 마이그레이션할 수 있습니다.

각 워크로드의 프로세스에는 다음이 포함됩니다.

1. Datadog 에이전트를 설치하고 설정하여 레거시 환경과 새로운 워크로드에 대한 종합적이고 일관된 모니터링을 보장합니다.
2. 대시보드를 설정하여 레거시 환경 및 신규 워크로드 상태를 함께 관측할 수 있습니다.
3. 모니터링을 설정하여 조사 팀이 성과 KPI의 중요 변경 사항에 대응할 수 있습니다.
4. 신서틱 테스트를 추가하여 사용자 경험의 예기치 않은 성능 저하를 사전에 모니터링합니다.
5. SLO를 설정하여 KPI 상태를 문서화해 이해관계자의 가시성을 제고합니다.

### 원래 환경에서 관측 가능성 격차 해결

워크로드 또는 서비스 소유자로서 기존 환경 및 신규 Azure 워크로드에서 포괄적이면서도 일관된 관측성을 확보하는 가장 좋은 방법은 Datadog Agent를 설치하는 것입니다.

Datadog Agent는 가벼우며 모든 서버(온프레미스 또는 클라우드 공급자)에서 실행할 수 있도록 설계되었습니다. 서비스 상태를 확인하는 데 필요한 데이터를 수집하여 Datadog 계정으로 전부 취합할 수 있습니다.

[본 페이지][11]에서는 개별 서버에 에이전트를 설치하는 방법과 선택한 설정 관리 도구로 이를 설치하는 방법(선호)을 알아봅니다.

Datadog Agent를 설치한 후 다음과 같은 데이터 수집 방법을 추가하여 환경 상태를 더욱 완벽하게 파악할 수 있습니다.

  1. 서비스에 사용되는 기술과 관련된 [데이터를 수집하는 통합을 추가][12]합니다.
  2. [APM(Application Performance Monitoring)][13]을 사용하여 서비스의 요청 카운트, 레이턴시, 오류율을 측정합니다.
  3. [환경이 생성한 로그를 캡처][14]하여 메트릭 및 트레이스가 예기치 않게 동작하는 경우에 관한 자세한 컨텍스트를 확보합니다. 로그가 많다면 [가장 중요한 로그만 저장][15]합니다.
  4. 서비스 간 효율적인 통신을 위해 [CNM(Cloud Network Monitoring)][16]을 활성화하세요. 기존 환경이 새 클라우드 환경과 통신해야 할 수 있으므로 CNM은 마이그레이션 프로세스에서 매우 중요합니다.

새 워크로드를 마이그레이션하기 전에 레거시 환경에 에이전트를 설치하고 전체 데이터 수집을 설정합니다. 또한, 동일한 전체 데이터 수집이 존재하는 Datadog Agent를 포함하도록 신규 워크로드를 설계합니다.

조직의 태깅 표준을 준수하여 모든 성과 데이터를 일관되게 이해하고 해당 팀, 워크로드, 랜딩 존에 맞게 파악할 수 있도록 합니다.

### 워크로드 상태 및 마이그레이션 대시보드

서비스 상태 데이터가 Datadog 계정으로 유입되면 [호스트][17], [컨테이너][18], [서비스][19], [네트워크 트래픽][20] 맵을 포함한 Datadog의 시각화 맵에서 환경을 확인 및 이해할 수 있습니다. 아울러, 통합한 기술에 적합한 [즉시 사용 가능한 대시보드][21]에서도 해당 환경을 확인 및 이해할 수 있습니다.

대시보드를 복제하여 사용자 지정하거나 커스텀 대시보드를 생성하여 특정 사용 사례에 필요한 데이터를 확인할 수 있습니다.

경우에 따라서 레거시 환경 및 신규 워크로드 성능을 함께 시각화하는 것이 좋을 수 있습니다.

다음 단계에 따라 예시 대시보드를 생성합니다.

1. Datadog 계정에서 [대시보드를 생성][22]합니다.
2. 오른쪽 모서리의 **Settings** 아이콘을 클릭합니다.
3. **Import dashboard JSON**를 클릭합니다. 자세한 내용을 확인하려면 [대시보드 설정][23]을 참조하세요.
4. [`azure_caf_side_by_side_dashboard.json`][24]에 있는 대시보드의 JSON 정의를 붙여넣거나 업로드합니다.

### 워크로드 소유자에게 실행 가능한 알림 전송하기

워크로드를 마이그레이션할 때 중요한 성과 KPI 임계값을 넘으면 적합한 담당자에게 자동으로 알림이 전송되도록 합니다.

Datadog에서 워크로드의 상태를 지속적으로 관측하는 모니터링을 생성하고 Microsoft Teams, Slack, 페이징 서비스, 티켓팅 시스템을 통해 커뮤니케이션 채널에 알림을 트리거합니다. 자세한 내용을 확인하려면 [모니터링][25]을 참조하세요.

태그가 전용 조사 채널에 효과적으로 매핑되는 경우(예: 모든 소유자, 팀 또는 워크스페이스에 대한 Teams 채널이 있는 경우), 모니터링을 설정하여 모니터링 템플릿 변수로 [적절한 커뮤니케이션 채널에 동적 알림][10]을 전송할 수 있습니다. 

실행 가능하면서도 효율적인 알림을 설정하는 작업은 조직마다 크게 달라지므로, 신규 모니터링을 팀의 필요에 맞게 설정합니다. 모니터링 샘플의 정의를 살펴보려면 [`azure_caf_service_errors_15_min.json` 파일][26]을 참조하세요.

### 사전 Synthetic Monitoring

[신서틱 테스트][27]를 설정하여 최종 사용자에게 탁월한 고객 경험을 제공할 수 있는지 사전 검증할 수 있습니다.

신서틱 테스트는 신규 워크로드가 레거시 환경과 동일한 최종 사용자에게 서비스를 제공할 때 매우 중요합니다. 마이그레이션으로 인해 예기치 않은 오류나 성능 저하가 발생하면, 고객에게 영향을 미치기 전에 해당 문제를 알리고 대응할 수 있습니다.

또한, 배포 프로세스의 일부로 최종 사용자 환경을 테스트하기 위해 Azure DevOps에서 [CI/CD 파이프라인에 해당 테스트를 통합][28]할 수도 있습니다.

### SLO로 성공적인 문서화

Service Level Objectives를 설정하여 마이그레이션을 통한 워크로드의 가용성 목표와 성공을 문서화합니다.

SLO를 설정하고 대시보드를 통해 이해관계자에게 제시하는 방법에 대한 자세한 내용을 확인하려면 [Service Level Objectives][29]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://us3.datadoghq.com/signup
[2]: /ko/integrations/azure/?tab=link&site=us3
[3]: /ko/integrations/azure_devops/#overview
[4]: /ko/integrations/azure_devops/#setup
[5]: /ko/integrations/#cat-collaboration
[6]: https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-tagging#minimum-suggested-tags
[7]: https://app.datadoghq.com/dashboard/lists/preset/3?q=azure
[8]: /ko/dashboards/configure/#configuration-actions
[9]: /ko/dashboards/template_variables/
[10]: /ko/monitors/notify/variables/?tab=is_alert#dynamic-handles
[11]: https://app.datadoghq.com/account/settings/agent/latest
[12]: https://app.datadoghq.com/account/settings#integrations
[13]: https://app.datadoghq.com/apm/getting-started
[14]: https://app.datadoghq.com/logs/onboarding
[15]: /ko/logs/guide/getting-started-lwl/
[16]: /ko/network_monitoring/cloud_network_monitoring/
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