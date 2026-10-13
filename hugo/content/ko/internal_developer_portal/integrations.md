---
aliases:
- /ko/tracing/software_catalog/integrations
- /ko/tracing/service_catalog/integrations
- /ko/service_catalog/integrations
- /ko/software_catalog/integrations
description: Internal Developer Portal을 PagerDuty, Opsgenie, GitHub, Jira 및 CI/CD
  플랫폼을 포함한 타사 도구와 연결하여 Catalog 메타데이터를 보강하고 액션을 자동화하세요.
further_reading:
- link: /internal_developer_portal/catalog/entity_model/
  tag: 문서
  text: 서비스 정의 API에 대해 자세히 알아보기
- link: /integrations/opsgenie/
  tag: 문서
  text: Opsgenie 통합에 대해 자세히 알아보기
- link: /integrations/pagerduty/
  tag: 문서
  text: PagerDuty 통합에 대해 자세히 알아보기
title: Integrations
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
Internal Developer Portal의 PagerDuty 및 Opsgenie 통합은 다음 {{< region-param key=dd_datacenter code="true" >}} 사이트에서 지원되지 않습니다.
</div>
{{% /site-region %}}
  
## 개요 {#overview}

[Datadog 통합][1]에 대한 서비스 계정을 구성하면 통합의 메타데이터를 [Catalog][16] 엔터티 정의에 포함할 수 있습니다. 여기에서 [Action Catalog][31]를 사용하여 Datadog을 벗어나지 않고도 외부 시스템을 쿼리하거나 인시던트 생성 또는 티켓 업데이트와 같은 액션을 트리거할 수 있습니다.

{{< callout url="https://forms.gle/PzXWxrnGaQPiVf9M8" header="새 통합 요청" >}}
{{< /callout >}}

## 협업, 인시던트 관리 및 티켓팅 {#collaboration-incident-management-and-ticketing}

| 통합 | 설명 | 예시 액션(Action Catalog) |
|--------------|----------------|----------------------------------|
| [PagerDuty][2] | PagerDuty 메타데이터를 서비스에 추가하여 Catalog에 누가 당직 중인지와 해당 서비스에 활성 PagerDuty 인시던트가 있는지 등의 정보를 표시하고 이에 대한 링크를 생성할 수 있습니다. | `Get current on-call`, `Trigger incident` <br> [사용 가능한 모든 액션 보기.][32] |
| [Opsgenie][3] | Opsgenie 메타데이터를 서비스에 추가하여 Catalog에 해당 서비스의 당직자 정보를 표시하고 관련 링크를 생성할 수 있습니다. | `Acknowledge alert`, `Get current on call` <br> [사용 가능한 모든 액션 보기.][33] |
| [StatusPage][4] | 인시던트 및 구성 요소에 대한 세부 정보를 생성, 업데이트 및 검색합니다. | `Create an incident`, `Update component status` <br> [사용 가능한 모든 액션 보기.][34] |
| [Freshservice][5] | Freshservice 티켓을 생성, 업데이트 및 조회합니다. | `List tickets`, `Update ticket` <br> [사용 가능한 모든 액션 보기.][35] |
| [Slack][6] | 인시던트 알림이나 업데이트를 Slack 채널로 보내고 채널 관리를 수행합니다. | `Invite users to channel`, `Set channel topic` <br> [사용 가능한 모든 액션 보기.][36] |
| [Microsoft Teams][7] | 인시던트 협업을 위해 Teams 채널로 메시지나 프롬프트를 보냅니다. | `Make a decision`, `Send a message` <br> [사용 가능한 모든 액션 보기.][37] |
| [Jira][8] | Datadog에서 직접 이슈를 생성하고 업데이트합니다. | `Create issue`, `Add comment` <br> [사용 가능한 모든 액션 보기.][38] |
| [Asana][9] | Asana 태스크를 생성 및 업데이트하고, 사용자를 할당하며, 태그를 적용합니다. | `Add tag to task`, `Update task completed status` <br> [사용 가능한 모든 액션 보기.][39] |
| [LaunchDarkly][10] | Feature Flag 변경 사항을 추적하고, 개발자가 플랫폼을 벗어나지 않고 변경할 수 있도록 하며, 변경 사항을 기반으로 자동화를 수행합니다. | `Add expire user target date`, `Toggle feature flag` <br> [사용 가능한 모든 액션 보기.][40] |

### 설정 예시 {#setup-examples}

{{% collapse-content title="PagerDuty" level="h4" expanded=false id="pagerduty-setup" %}}

[PagerDuty Service Directory][63]에 있는 모든 서비스를 연결할 수 있습니다. Catalog의 각 서비스에 하나의 PagerDuty 서비스를 매핑할 수 있습니다.

1. 아직 설정하지 않았다면 [Datadog PagerDuty 통합][2]을 설정합니다.
1. [PagerDuty API 액세스 키][61]를 가져옵니다.
1. [PagerDuty 통합 설정][52] 페이지에 키를 붙여넣습니다.

   {{< img src="tracing/software_catalog/pagerduty-token.png" alt="API 키 필드가 강조 표시된 PagerDuty 통합 설정 양식." style="width:100%;" >}}

1. [엔터티 정의][82]에 PagerDuty 정보를 추가합니다.
   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

{{% /collapse-content %}}

{{% collapse-content title="Opsgenie" level="h4" expanded=false id="opsgenie-setup" %}}

엔터티 정의에 Opsgenie 메타데이터를 추가하려면 다음 단계를 따르세요. 

1. 아직 설정하지 않았다면 [Datadog Opsgenie 통합][3]을 설정합니다.
1. [Opsgenie API 액세스 키][62]를 가져오고 **구성 액세스** 및 **읽기** 권한이 있는지 확인합니다.
3. [통합 타일][55] 하단에서 계정을 추가하고, Opsgenie API 액세스 키를 붙여넣은 다음, Opsgenie 계정의 지역을 선택합니다.

   {{< img src="tracing/software_catalog/create_account1.png" alt="Opsgenie 통합 타일의 Create New Account 워크플로" style="width:80%;" >}}
   {{< img src="tracing/software_catalog/create_account2.png" alt="Opsgenie 통합 타일의 Create New Account 워크플로" style="width:80%;" >}}

4. Opsgenie 메타데이터로 [엔터티 정의][82]를 업데이트합니다. 예:

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

이 단계를 완료하면 Catalog의 서비스에 대한 **Ownership** 탭에 **On Call** 정보 상자가 나타납니다.

{{< img src="tracing/software_catalog/oncall_information.png" alt="Catalog에서 Opsgenie 정보를 표시하는 On Call 정보 상자" style="width:85%;" >}}

{{% /collapse-content %}}


## 소스 코드 관리 {#source-code-management}

| 통합 | 설명 | 예시 액션(Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub][11] | 이슈 또는 PR 생성, 리포지토리 파일 관리, 팀 액세스 자동화. | `Add labels to pull request`, `Get team membership` <br> [사용 가능한 모든 액션 보기.][41] |
| [GitLab][12] | 이슈, 병합 요청, 브랜치 및 커밋 관리. | `Approve merge request`, `Cherry pick commit` <br> [사용 가능한 모든 액션 보기.][42] |
| 기타(Bitbucket, Azure Repos) | Datadog Catalog 또는 Action Catalog에서 기본적으로 지원되지 않는 플랫폼과 상호 작용합니다. | 해당 없음. HTTP 액션 및 요청을 사용하여 플랫폼 API 호출 |

GitHub를 사용하여 엔터티 정의를 관리하고 GitHub 통합을 구성하여 정의를 Catalog로 자동으로 가져올 수도 있습니다. [엔터티 정의 생성 및 GitHub에서 가져오기][83]에 대해 자세히 알아보세요.

## CI/CD {#cicd}

| 통합 | 설명 | 예시 액션(Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub Actions][11] | GitHub에서 CI/CD 워크플로를 조회하고, 시작하고, 조정합니다. | `Get latest workflow run`, `Trigger github actions workflow run` <br> [사용 가능한 모든 액션 보기.][47] |
| [GitLab Pipelines][12] | GitLab 프로젝트 파이프라인을 관리하고, 잡을 취소하거나 재시도하고, 파이프라인 결과를 쿼리합니다. | `Get latest pipeline`, `Retry jobs in a pipeline` <br> [사용 가능한 모든 액션 보기.][48] |
| [Jenkins][13] |  Jenkins 잡을 트리거하고 관리합니다. | `Submit Jenkins job`, `Get Jenkins job status` <br> [사용 가능한 모든 액션 보기.][43] |
| [CircleCI][14] | CI 파이프라인과 상호 작용합니다. | `Approve workflow job`, `Get job details` <br> [사용 가능한 모든 액션 보기.][44] |
| [Azure DevOps Pipelines (ADO)][15] | 파이프라인을 트리거하고 실행 데이터를 가져옵니다. 모니터 활동을 기반으로 배포 또는 QA 워크플로를 시작하는 데 이상적입니다. | `Get pipeline`, `Run pipeline` <br> [사용 가능한 모든 액션 보기.][45] |

## CMDB 및 내부 개발자 포털 {#cmdbs-and-internal-developer-portals}


ServiceNow 및 Backstage에서 Datadog Catalog로 엔터티를 가져올 수 있습니다. 자세한 내용은 다음 문서를 참조하세요.

- [ServiceNow에서 항목 가져오기][84]
- [Backstage에서 항목 가져오기][85]


## 클라우드 리소스 {#cloud-resources}

Datadog의 인프라 통합 및 [Resource Catalog][54]는 AWS, Azure 및 GCP 전반에 걸친 포괄적인 통합 인벤토리를 제공합니다. 또한 [Action Catalog][31]에 있는 Datadog의 1000개 이상의 액션을 활용하여 사용자 지정 시각화, 액션 및 자동화를 생성할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/
[2]: /ko/integrations/pagerduty/
[3]: /ko/integrations/opsgenie
[4]: /ko/integrations/statuspage/
[5]: /ko/integrations/guide/freshservice-tickets-using-webhooks/
[6]: /ko/integrations/slack
[7]: /ko/integrations/microsoft_teams
[8]: /ko/integrations/jira
[9]: /ko/integrations/asana
[10]: /ko/integrations/launchdarkly
[11]: /ko/integrations/github
[12]: /ko/integrations/gitlab
[13]: /ko/integrations/jenkins
[14]: /ko/integrations/circleci
[15]: /ko/integrations/azure_devops/
[16]: /ko/internal_developer_portal/catalog/
[31]: /ko/actions/actions_catalog/
[32]: /ko/actions/actions_catalog/?search=pagerduty
[33]: /ko/actions/actions_catalog/?search=opsgenie
[34]: /ko/actions/actions_catalog/?search=statuspage
[35]: /ko/actions/actions_catalog/?search=freshservice
[36]: /ko/actions/actions_catalog/?search=slack
[37]: /ko/actions/actions_catalog/?search=microsoft+teams
[38]: /ko/actions/actions_catalog/?search=jira
[39]: /ko/actions/actions_catalog/?search=asana
[40]: /ko/actions/actions_catalog/?search=launchdarkly
[41]: /ko/actions/actions_catalog/?search=github
[42]: /ko/actions/actions_catalog/?search=gitlab
[43]: /ko/actions/actions_catalog/?search=jenkins
[44]: /ko/actions/actions_catalog/?search=circleci
[45]: /ko/actions/actions_catalog/?search=azure+devops
[47]: /ko/actions/actions_catalog/?search=github+actions
[48]: /ko/actions/actions_catalog/?search=gitlab+pipelines
[51]: https://app.datadoghq.com/services
[52]: https://app.datadoghq.com/integrations/pagerduty
[53]: https://app.datadoghq.com/integrations/github
[54]: https://app.datadoghq.com/infrastructure/catalog
[55]: https://app.datadoghq.com/integrations/opsgenie
[61]: https://support.pagerduty.com/docs/api-access-keys
[62]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[63]: https://support.pagerduty.com/docs/service-directory
[82]: /ko/internal_developer_portal/catalog/entity_model
[83]: /ko/internal_developer_portal/catalog/set_up/create_entities#github-integration
[84]: /ko/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow
[85]: /ko/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage