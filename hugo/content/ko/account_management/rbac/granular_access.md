---
description: 대시보드, 모니터, Notebooks와 같은 개별 Datadog 리소스에 대한 액세스를 팀, 역할 또는 사용자별로 제어하여
  세분화된 권한을 관리하세요.
title: 세분화된 액세스 제어
---
## 개별 리소스에 대한 액세스 관리 {#manage-access-to-individual-resources}

일부 리소스에서는 역할, [Teams][1] 또는 사용자를 기준으로 개별 리소스에 대한 액세스를 제한할 수 있습니다.

다양한 주체를 활용하여 조직의 액세스 패턴을 제어하고 지식 공유 및 협업을 촉진하세요.
- Teams를 사용하여 조직 내 기능 그룹에 대한 액세스를 매핑하세요. 예를 들어, 대시보드 편집 권한을 해당 대시보드를 소유한 애플리케이션 팀으로 제한할 수 있습니다.
- 역할을 사용하여 페르소나에 대한 액세스를 매핑하세요. 예를 들어, 결제 수단 편집 권한을 결제 관리자로 제한할 수 있습니다.
- 필요한 경우에만 개별 사용자에게 액세스 권한을 부여하세요.


| 세분화된 액세스 제어가 지원되는 리소스 | 팀 기반 액세스 | 역할 기반 액세스 | 사용자/서비스 계정 기반 액세스 |
|--------------------------------------------------|-------------------|-------------------|-------------------------------------|
| [Apps][13]                                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [AWS Accounts][11]                               | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Azure App Registrations][11]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Work Management 프로젝트][10]                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Connections][14]                                | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Connection Groups][15]                          | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Cross Org Connections][20]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Dashboards][2]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Datastores][16]                                 | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Dynamic Severity][26]                           | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Experiments][27]                                | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Feature Flags][25]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Google Service Accounts][11]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Integration Accounts][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Integration Services][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Integration Webhooks][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Logs Pipelines][24]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Monitors][3]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Notebooks][4]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Observability Pipelines][23]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [On-Call][22]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Private Action Runner][18]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Powerpacks][5]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Reference tables][12]                           | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [RUM apps][19]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security rules][6]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security suppressions][7]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Service Level Objectives][8]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Sheets][21]                                     | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Synthetic tests][9]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Workflows][17]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |


### 개별 리소스에 대한 액세스 권한 상향 {#elevate-access-to-individual-resources}

`user_access_manage` 권한이 있는 사용자는 팀, 역할, 사용자 또는 서비스 계정을 기준으로 제한을 지원하는 모든 개별 리소스에 대한 액세스 권한을 상향할 수 있습니다. 역할 기반 액세스 제한만 있는 리소스는 지원되지 않습니다. 액세스 권한을 얻으려면 세분화된 액세스 제어 모달에서 {{< ui >}}Elevate Access{{< /ui >}} 버튼을 클릭하세요.

[1]: /ko/account_management/teams/
[2]: /ko/dashboards/configure/#permissions
[3]: /ko/monitors/configuration/#permissions
[4]: /ko/notebooks/#limit-edit-access
[5]: /ko/dashboards/widgets/powerpack/#powerpack-permissions
[6]: /ko/security/detection_rules/#restrict-edit-permissions
[7]: /ko/security/suppressions/#restrict-edit-permissions
[8]: /ko/service_level_objectives/#permissions
[9]: /ko/synthetics/browser_tests/#permissions
[10]: /ko/incident_response/work_management/settings#granular-access-control
[11]: /ko/getting_started/integrations/#granular-access-control
[12]: /ko/reference_tables/#permissions
[13]: /ko/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-app
[14]: /ko/actions/connections/?tab=workflowautomation#connection-credentials
[15]: /ko/actions/connections/?tab=workflowautomation#connection-groups
[16]: /ko/actions/datastore/
[17]: /ko/actions/workflows/access_and_auth/#restrict-access-on-a-specific-workflow
[18]: /ko/actions/private_actions
[19]: /ko/real_user_monitoring
[20]: /ko/account_management/org_settings/cross_org_visibility/#permissions
[21]: /ko/sheets/#permissions
[22]: /ko/incident_response/on-call/#granular-access-control
[23]: /ko/observability_pipelines/configuration/access_control/
[24]: /ko/logs/log_configuration/pipelines/#pipeline-permissions
[25]: /ko/getting_started/feature_flags/
[26]: /ko/security/cloud_siem/detect_and_monitor/dynamic_severity/#restrict-edit-permissions
[27]: /ko/experiments/