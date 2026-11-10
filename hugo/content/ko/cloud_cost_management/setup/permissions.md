---
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management에 대해 알아보기
- link: /account_management/rbac/
  tag: 설명서
  text: 역할 기반 액세스 제어에 대해 알아보기
- link: /account_management/rbac/data_access/
  tag: 설명서
  text: Data Access Control에 대해 알아보기
title: 권한
---
## 개요 {#overview}

권한은 사용자가 Datadog에서 수행할 수 있는 액션을 제어합니다. 사용자에게 역할이 할당되며, 각 역할에는 사용자가 확인하고 수행할 수 있는 작업을 결정하는 권한 세트가 있습니다.

Cloud Cost Management(CCM)는 `cloud_cost_management_read` 및 `cloud_cost_management_write`라는 두 가지 주요 권한으로 비용 데이터와 대부분의 CCM 구성에 대한 액세스를 제어합니다. 예산 편집(`ccm_budget_write`), 예산의 예측 사용자 지정(`ccm_forecast_write`), 보고서 일정 관리(`generate_ccm_report_schedules`, `manage_ccm_report_schedules`)와 같은 특정 기능에 대해 추가 제품 수준 권한이 제공됩니다. [역할 기반 액세스 제어(RBAC)][1]를 통해 이러한 권한을 역할에 할당합니다.

CCM은 태그를 기준으로 비용 데이터에 대한 액세스를 추가로 제한할 수 있도록 [Data Access Control](#data-access-control)도 지원합니다.

## 사용 가능한 권한 {#available-permissions}

| 권한 | 설명 |
|------------|-------------|
| `cloud_cost_management_read` | CCM 페이지 및 외부 통합 전반에서 비용 데이터, 예산, 권장 사항 및 설정을 볼 수 있는 읽기 전용 액세스 권한을 부여합니다. |
| `cloud_cost_management_write` | 사용자 지정 비용 업로드 및 클라우드 계정 관리를 포함하여 CCM 구성을 수정할 수 있는 액세스 권한을 부여합니다. 예산 생성, 편집 또는 삭제 권한은 부여하지 않습니다. 자세한 내용은 `ccm_budget_write`를 참조하세요. |
| `ccm_budget_write` | 예산 메타데이터 및 항목별 예산 금액을 포함하여 Cloud Cost Management 예산을 생성, 업데이트, 삭제할 수 있는 권한을 부여합니다. 페이지에 액세스하려면 읽기 권한이 필요합니다. |
| `ccm_forecast_write` | Cloud Cost Management 예산에서 사용자 지정 예측 값을 편집할 수 있는 권한을 부여합니다. 페이지에 액세스하려면 읽기 권한이 필요합니다. |
| `generate_ccm_report_schedules` | 모든 보고서 일정을 확인하고 사용자가 직접 생성한 일정만 관리할 수 있는 권한을 부여합니다. |
| `manage_ccm_report_schedules` | 조직 전체의 모든 보고서 일정을 조회, 생성 및 전반적으로 관리할 수 있는 권한을 부여합니다. |
| `ccm_report_write` | Cloud Cost Management 보고서를 생성, 업데이트, 삭제할 수 있는 권한을 부여합니다. 페이지에 액세스하려면 cloud_cost_management_read가 필요합니다. |


## 페이지별 권한 요구 사항 {#permission-requirements-by-page}

아래 표에서는 각 CCM 페이지 및 관련 기능에 필요한 권한을 보여줍니다.

| 페이지/기능                            | 읽기 권한                                  | 쓰기 권한                                  |
|-----------------------------------------------|--------------------------------------------------|---------------------------------------------------|
| CCM 요약 페이지                              | 비용 요약 데이터 조회 필요               | 해당 없음                                               |
| CCM 컨테이너 페이지                           | 컨테이너 비용 할당 데이터 조회 필요  | 해당 없음                                               |
| CCM 권장 사항 페이지                      | 비용 권장 사항 조회 필요            | 해당 없음                                               |
| CCM Explorer 페이지                             | 비용 데이터 쿼리 및 조회 필요             | 해당 없음                                               |
| CCM 계획 페이지                                 | 예산 조회에 필요                         | `ccm_budget_write`예산 생성, 편집 또는 삭제에 필요 |
| CCM 설정 페이지 - 사용자 지정 비용              | 사용자 지정 비용 설정 조회 필요           | 사용자 지정 비용 업로드 필요                   |
| CCM 설정 페이지 - 태그 Pipelines             | 태그 Pipelines 조회 필요                   | 태그 Pipelines 생성 필요                  |
| CCM 설정 페이지 - SaaS Integrations         | SaaS Integrations 설정 조회 필요       | CCM용 통합 활성화 필요            |
| CCM 설정 페이지 - 계정                  | 클라우드 계정 조회 필요                  | 계정 수정 또는 생성 필요             |
| CCM 설정 페이지 - 권장 사항 구성 | 권장 사항 설정 조회 필요         | 권장 사항 사용자 지정 필요             |
| 대시보드/Notebooks(외부)               | 위젯 생성 및 비용 데이터 조회 필요    | 해당 없음                                               |
| Monitors(외부)                           | CCM 모니터링 생성에 필요                  | 해당 없음                                               |
| Service Catalog(외부)                    | 비용 데이터 조회에 필요                       | 해당 없음                                               |
| Resource Catalog(외부)                   | 비용 데이터 조회에 필요                       | 해당 없음                                               |
| API를 통한 비용 데이터 쿼리                     | API를 통해 비용 데이터를 조회하는 데 필요      | 해당 없음                                               |

## Data Access Control {#data-access-control}

[Data Access Control][2]을 사용하여 특정 태그를 기준으로 비용 데이터에 대한 액세스를 제한합니다. 이 기능을 사용하면 각 팀이 해당 팀의 리소스와 관련된 비용만 확인하도록 제한할 수 있습니다. 예를 들어, 팀이 `team:payments` 또는 `env:production` 태그가 지정된 비용만 확인하도록 제한할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/
[2]: /ko/account_management/rbac/data_access/