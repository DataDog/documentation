---
aliases:
- /ko/metrics/guide/agent-filtering-for-dogstatsd-custom-metrics/
description: Datadog Agent에서 사용하지 않는 Custom Metrics를 필터링하여 수집 및 인덱싱되는 메트릭 볼륨을 줄이세요.
further_reading:
- link: /metrics/custom_metrics/
  tag: 설명서
  text: Custom Metrics에 대해 더 알아보기
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: 설명서
  text: Custom Metrics 청구
- link: /metrics/metrics-without-limits/
  tag: 설명서
  text: Metrics without Limits™
- link: /metrics/volume/
  tag: 설명서
  text: Metrics Volume Management
- link: https://www.datadoghq.com/blog/custom-metrics-governance/
  tag: 블로그
  text: 엔드투엔드 Custom Metrics 거버넌스 모범 사례
title: Custom Metrics에 대한 Agent 측 필터링
---
{{< callout url="https://www.datadoghq.com/product-preview/agent-side-filtering-for-custom/" >}} Custom Metrics에 대한 Agent 측 필터링은 미리 보기 상태입니다. 이 기능에 관심이 있으시면 이 양식을 작성하세요. {{< /callout >}}

## 개요 {#overview}

Agent 측 필터링을 사용하면 Datadog으로 전송하기 전에 Datadog Agent에서 직접 DogStatsD와 Agent 통합의 사용하지 않거나 원치 않는 Custom Metrics를 필터링할 수 있습니다. 이를 통해 인덱싱 및 수집되는 Custom Metrics 볼륨을 모두 크게 줄일 수 있습니다.

필터링은 Agent 수준에서 수행되지만 Datadog UI를 통해 중앙에서 관리되므로 팀에게 완전한 가시성과 제어 기능을 제공합니다. Datadog에서 필터링 정책을 생성, 업데이트 및 관리하여 투명성을 유지하면서 메트릭 거버넌스를 간소화할 수 있습니다.

필터링 정책을 생성하고 업데이트하려면 [`metric_tags_write`][1] RBAC 권한이 필요합니다. 모든 사용자는 필터링 정책을 조회할 수 있습니다.

## 전제 조건 {#prerequisites}

- Datadog Agent v7.67.0 이상으로 업그레이드합니다.
    - DogStatsD 메트릭을 필터링하려면 v7.70.0 이상을 사용하는 것이 좋습니다. 
    - Agent Integration 메트릭의 경우 v7.74.0 이상을 사용해야 합니다.
- [`org_management`][2] 권한으로 조직에 대해 [Remote Configuration][3]을 활성화합니다.
- [`api_keys_write`][4] 권한으로 Agent에서 사용하는 [API 키에 대한 Remote Configuration 기능][5]을 활성화합니다. API 키에서 Remote Configuration을 활성화한 후, 변경 사항을 적용하려면 Agent를 다시 시작하세요.

{{<img src="agent/remote_config/RC_Key_updated.png" alt="Remote Configuration 기능의 Enable 버튼이 있는 API 키 속성" width="90%" style="center">}}

## 메트릭 필터링 정책 생성 {#create-a-metric-filtering-policy}

[Metrics Settings 페이지][7] 또는 [Metrics Summary 페이지][6]에서 메트릭 필터링 정책을 생성할 수 있습니다.

메트릭 필터링 정책은 Remote Configuration이 활성화된 모든 Agent v7.67.0 이상(Agent Integration 메트릭의 경우 v7.74.0 이상)에 적용됩니다. 이전 Agent 버전이나 Remote Configuration이 비활성화된 Agent에는 필터링 정책이 적용되지 않습니다.

정책 업데이트는 1~2분 내에 Agent에 배포됩니다.

### Metrics Settings 페이지의 경우 {#from-the-metrics-settings-page}

1. {{< ui >}}\+ Create Policy{{< /ui >}}를 클릭합니다.
2. {{< ui >}}Filter metrics{{< /ui >}}를 클릭합니다.
3. 새 정책에 대한 설명을 입력합니다.
4. {{< ui >}}Metrics to Filter{{< /ui >}} 드롭다운에서 필터링할 메트릭을 선택하거나 {{< ui >}}Upload CSV{{< /ui >}}를 클릭합니다.
   - CSV를 업로드하려면 파일을 선택하고 {{< ui >}}Open{{< /ui >}}를 클릭합니다. 여러 개의 CSV를 사용하여 정책을 생성할 수 있습니다.
5. 필터링할 메트릭 목록이 만족스러우면 {{< ui >}}Save and Filter{{< /ui >}}를 클릭합니다.

### Metrics Summary 페이지의 경우 {#from-the-metrics-summary-page}

Metrics Summary 페이지에서 다음 방법 중 하나를 사용하여 메트릭 필터링 정책을 생성합니다.

{{< tabs >}}
{{% tab "메트릭 쿼리의 경우" %}}

1. 검색창에 메트릭 쿼리를 입력합니다.
2. 화면 오른쪽에 있는 세 개의 수직 점 버튼을 클릭합니다.
3. {{< ui >}}Filter metrics{{< /ui >}}를 클릭합니다.
4. {{< ui >}}Choose policy{{< /ui >}} 드롭다운에서 {{< ui >}}New Policy{{< /ui >}}을 클릭합니다. 정책에 대한 설명을 입력합니다.
5. {{< ui >}}Metrics to Filter{{< /ui >}}을 검토합니다. 목록에서 메트릭을 제거하려면 행 오른쪽에 있는 `X`를 클릭하고, 목록에 메트릭을 추가하려면 {{< ui >}}\+ Include More Metrics{{< /ui >}}를 클릭합니다.
6. {{< ui >}}Save and Filter{{< /ui >}}를 클릭합니다.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_from_metric_query.mp4" alt="메트릭 쿼리에서 메트릭 필터링 정책 생성" video="true" >}}

{{% /tab %}}
{{% tab "정책 편집기의 경우" %}}

1. 화면 오른쪽에 있는 세 개의 수직 점 버튼을 클릭합니다.
2. {{< ui >}}Filter metrics{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Choose policy{{< /ui >}} 드롭다운에서 {{< ui >}}New Policy{{< /ui >}}을 클릭합니다. 정책에 대한 설명을 입력합니다.
4. {{< ui >}}Metrics to Filter{{< /ui >}} 필드에 메트릭 쿼리를 입력하거나 드롭다운에서 메트릭을 개별적으로 선택합니다. 목록에서 메트릭을 제거하려면 행 오른쪽에 있는 `X`를 클릭합니다.
5. {{< ui >}}Save and Filter{{< /ui >}}를 클릭합니다.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_with_policy_editor.mp4" alt="정책 편집기에서 메트릭 필터링 정책 생성" video="true" >}}

{{% /tab %}}
{{% tab "CSV 업로드의 경우" %}}

1. 화면 오른쪽에 있는 세 개의 수직 점 버튼을 클릭합니다.
2. {{< ui >}}Filter metrics{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Choose policy{{< /ui >}} 드롭다운에서 {{< ui >}}New Policy{{< /ui >}}을 클릭합니다. 정책에 대한 설명을 입력합니다.
4. {{< ui >}}Metrics to Filter{{< /ui >}} 필드 오른쪽에 있는 {{< ui >}}Upload CSV{{< /ui >}}를 클릭합니다.
5. CSV 파일을 선택하고 {{< ui >}}Open{{< /ui >}}를 클릭합니다.
6. 나열된 메트릭을 검토합니다. 목록에서 메트릭을 제거하려면 행 오른쪽에 있는 `X`를 클릭합니다. 필요한 경우 추가 CSV 파일을 업로드하거나 {{< ui >}}Metrics to Filter{{< /ui >}} 필드를 통해 메트릭을 추가합니다.
7. {{< ui >}}Save and Filter{{< /ui >}}를 클릭합니다.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_with_csv_upload.mp4" alt="CSV 파일 업로드를 사용하여 메트릭 필터링 정책 생성" video="true" >}}

{{% /tab %}}
{{< /tabs >}}

## 메트릭 필터링 정책 편집 {#edit-a-metric-filtering-policy}

[Metrics Settings 페이지][1] 또는 [Metrics Summary 페이지][2]에서 메트릭 필터링 정책을 편집할 수 있습니다.

### Metrics Settings 페이지의 경우 {#from-the-metrics-settings-page-1}

1. 편집할 정책을 클릭합니다.
2. {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Metrics to Filter{{< /ui >}} 드롭다운에서 필터링할 메트릭을 선택하거나 {{< ui >}}Upload CSV{{< /ui >}}를 클릭합니다.
   - CSV를 업로드하려면 파일을 선택하고 {{< ui >}}Open{{< /ui >}}을 클릭합니다.
4. {{< ui >}}Save and Filter{{< /ui >}}를 클릭합니다.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/edit_policy_from_metrics_settings.mp4" alt="Metrics Settings 페이지에서 메트릭 필터링 정책 편집" video="true" >}}

### Metrics Summary 페이지의 경우 {#from-the-metrics-summary-page-1}

다음 방법 중 하나를 사용하여 Metrics Summary 페이지에서 메트릭 필터링 정책을 편집합니다.

{{< tabs >}}
{{% tab "메트릭 쿼리의 경우" %}}

1. 검색창에 메트릭 쿼리를 입력합니다.
2. 화면 오른쪽에 있는 세 개의 수직 점 버튼을 클릭합니다.
3. {{< ui >}}Filter metrics{{< /ui >}}를 클릭합니다.
4. {{< ui >}}Choose policy{{< /ui >}} 드롭다운에서 편집할 정책을 선택합니다.
5. {{< ui >}}Metrics to Filter{{< /ui >}}와 {{< ui >}}Existing metrics in policy{{< /ui >}} 목록을 검토합니다. 목록에서 메트릭을 제거하려면 행 오른쪽에 있는 `X`를 클릭하고, 목록에 메트릭을 추가하려면 {{< ui >}}\+ Include More Metrics{{< /ui >}}를 클릭합니다.
6. {{< ui >}}Save and Filter{{< /ui >}}를 클릭합니다.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/edit_policy_with_metric_query.mp4" alt="메트릭 쿼리를 사용하여 메트릭 필터링 정책 편집" video="true" >}}

{{% /tab %}}
{{% tab "정책 편집기의 경우" %}}

1. 화면 오른쪽에 있는 세 개의 수직 점 버튼을 클릭합니다.
2. {{< ui >}}Filter metrics{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Choose policy{{< /ui >}} 드롭다운에서 편집할 정책을 선택합니다.
4. {{< ui >}}Metrics to Filter{{< /ui >}} 드롭다운에서 메트릭을 개별적으로 선택합니다. 목록에서 메트릭을 제거하려면 행 오른쪽에 있는 `X`를 클릭합니다.
5. {{< ui >}}Save and Filter{{< /ui >}}를 클릭합니다.

{{% /tab %}}
{{% tab "CSV 업로드의 경우" %}}

1. 화면 오른쪽에 있는 세 개의 수직 점 버튼을 클릭합니다.
2. {{< ui >}}Filter metrics{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Choose policy{{< /ui >}} 드롭다운에서 편집할 정책을 선택합니다.
4. {{< ui >}}Metrics to Filter{{< /ui >}} 필드 오른쪽에 있는 {{< ui >}}Upload CSV{{< /ui >}}를 클릭합니다.
5. CSV 파일을 선택하고 {{< ui >}}Open{{< /ui >}}을 클릭합니다.
6. {{< ui >}}Metrics to Filter{{< /ui >}}와 {{< ui >}}Existing metrics in policy{{< /ui >}} 목록을 검토합니다. 목록에서 메트릭을 제거하려면 행 오른쪽에 있는 `X`를 클릭하고, 목록에 메트릭을 추가하려면 {{< ui >}}\+ Include More Metrics{{< /ui >}}를 클릭합니다.
7. {{< ui >}}Save and Filter{{< /ui >}}를 클릭합니다.

{{% /tab %}}
{{< /tabs >}}

## 모든 정책 및 필터링된 메트릭 조회 {#view-all-policies-and-filtered-metrics}

[Metrics Settings 페이지][1]에서 모든 정책 및 필터링된 메트릭을 조회할 수 있습니다.

[settings button][1]을 클릭합니다. 

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/settings_from_summary.png" alt="Metrics Summary 페이지의 설정 버튼" style="width:100%;" >}}

탐색 모음에서 {{< ui >}}Metrics{{< /ui >}}을 클릭하여 [settings]로 바로 이동합니다.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/settings_from_nav.png" alt="Datadog의 확장된 메트릭 패널에 있는 설정 옵션" style="width:100%;" >}}

### 모든 정책 조회 {#view-all-policies}

사이드바에서 {{< ui >}}Policies{{< /ui >}} 탭을 선택하여 모든 정책 목록을 확인합니다. 사이드바가 보이지 않으면 {{< ui >}}Show Sidebar{{< /ui >}} 버튼을 클릭합니다 {{< img src="metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png" inline="true" width="22" >}}.

메트릭 필터링 정책을 클릭하여 편집하거나 삭제할 수 있는 세부 정보 보기를 엽니다.

### 모든 필터링된 메트릭 조회 {#view-all-filtered-metrics}

사이드바에서 {{< ui >}}Filtered Metrics{{< /ui >}} 탭을 선택하여 모든 필터링된 메트릭 목록을 확인합니다. 사이드바가 보이지 않으면 {{< ui >}}Show Sidebar{{< /ui >}} 버튼을 클릭합니다 {{< img src="metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png" inline="true" width="22" >}}.

편집 또는 삭제하려면 {{< ui >}}ATTACHED POLICIES{{< /ui >}} 열에서 필터링된 메트릭에 연결된 정책을 클릭합니다.

## 정책 삭제 {#delete-policies}

[메트릭 설정 페이지][1]에서 메트릭 필터링 정책을 삭제할 수 있습니다.

1. 삭제할 메트릭 필터링 정책을 클릭합니다.
2. 페이지 오른쪽 상단에서 {{< ui >}}Delete{{< /ui >}}를 선택합니다.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/delete_policy.png" alt="메트릭 필터링 정책 세부 정보 보기의 정책 삭제 버튼" style="width:100%;" >}}

## API를 통해 메트릭 필터링 정책 관리 {#manage-metric-filtering-policies-through-the-api}

<div class="alert alert-danger">이 엔드포인트는 Custom Metrics에 대한 Agent 측 필터링이 미리 보기 상태인 동안 변경될 수 있습니다.</div>

이 엔드포인트에는 유효한 Datadog API 키와 애플리케이션 키가 필요합니다. 자세한 내용은 API 참조의 [시작하기][8]를 참조하세요.

### 필터링된 메트릭 정책 생성 {#create-a-filtered-metric-policy}

선택한 [Datadog 사이트][9]의 기본 URL은 다음과 같습니다. {{<region-param key="dd_api" code="true">}}

아래 예시에서 `<BASE_URL>`을 기본 URL로 대체하세요.

**POST** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### 본문 예시 {#example-body}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metric_names": [
        "metric.name.one",
        "metric.name.two"
      ]
    }
  }
}
{{< /code-block >}}

### 필터링된 메트릭 정책 업데이트(부분 업데이트) {#update-a-filtered-metric-policy-partial-update}

선택한 [Datadog 사이트][9]의 기본 URL은 다음과 같습니다. {{<region-param key="dd_api" code="true">}}

아래 예시에서 `<BASE_URL>`을 기본 URL로 대체하세요.

**PATCH** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### 본문 예시 {#example-body-1}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metrics_to_add": [
        "metric.name.three",
        "metric.name.four"
      ],
      "metrics_to_remove": [
        "metric.name.five",
        "metric.name.six"
      ]
    }
  }
}
{{< /code-block >}}

### 필터링된 메트릭 정책 업데이트(전체 교체) {#update-a-filtered-metric-policy-full-replace}

선택한 [Datadog 사이트][9]의 기본 URL은 다음과 같습니다. {{<region-param key="dd_api" code="true">}}

아래 예시에서 `<BASE_URL>`을 기본 URL로 대체하세요.

**PUT** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### 본문 예시 {#example-body-2}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metric_names": [
        "metric.name.seven",
        "metric.name.eight"
      ]
    }
  }
}
{{< /code-block >}}

### 정책 삭제 {#delete-a-policy}

선택한 [Datadog 사이트][9]의 기본 URL은 다음과 같습니다. {{<region-param key="dd_api" code="true">}}

아래 예시에서 `<BASE_URL>`을 기본 URL로 대체하세요.

**DELETE** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

### 필터링된 메트릭 정책 가져오기 {#get-a-filtered-metric-policy}

선택한 [Datadog 사이트][9]의 기본 URL은 다음과 같습니다. {{<region-param key="dd_api" code="true">}}

아래 예시에서 `<BASE_URL>`을 기본 URL로 대체하세요.

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### 응답 본문 예시 {#example-response-body}

{{< code-block lang="json" disable_copy="true" collapsible="true" >}}
{
  "data": [
    {
      "type": "filtered_metrics",
      "id": "metric.name.one",
      "attributes": {
        "updated_timestamp": 1745954352
      }
    },
    {
      "type": "filtered_metrics",
      "id": "metric.name.two"
      "attributes": {
        "updated_timestamp": 1745954389
      }
    }
    // ... up to ~10,000 entries
  ],
  "links": {
    "self": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=200&page[limit]=100",
    "next": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=300&page[limit]=100",
    "prev": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=100&page[limit]=100",
    "first": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=0&page[limit]=100",
    "last": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=9900&page[limit]=100"
  },
  "meta": {
    "agent_coverage_percent": 100,
    "agents_with_latest_policy_count": 4,
    "deployment_failure": {
        "failed_agent_count": 0,
        "failure_message": ""
    },
    "deployment_status": "Deployed to all Agents",
    "deployment_strategy": "all",
    "policy_name": "test_policy_1",
    "total": 7,
    "total_agent_count": 4,
    "updated_by": "user@datadoghq.com",
    "updated_timestamp": 1758912365
  }
}
{{< /code-block >}}

### 필터링된 메트릭 정책 목록 {#list-filtered-metric-policies}

선택한 [Datadog 사이트][9]의 기본 URL은 다음과 같습니다. {{<region-param key="dd_api" code="true">}}

아래 예시에서 `<BASE_URL>`을 기본 URL로 대체하세요.

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### 응답 본문 예시 {#example-response-body-1}

{{< code-block lang="json" disable_copy="true" collapsible="true" >}}
{
    "data": [
        {
            "id": "06b-fab-47e",
            "type": "filtered_metrics",
            "attributes": {
                "count": 85,
                "deployment_status": "Deployed to all Agents",
                "deployment_strategy": "all",
                "policy_name": "policy one",
                "updated_by": "user@datadoghq.com",
                "updated_timestamp": 1758547485,
                "version": 4            
            }
        },
        {
            "id": "07b-201-47e",
            "type": "filtered_metrics",
            "attributes": {
                "count": 8,
                "deployment_status": "Deployed to all Agents",
                "deployment_strategy": "all",
                "policy_name": "policy two",
                "updated_by": "user@datadoghq.com",
                "updated_timestamp": 1758547212,
                "version": 1
            }
        }
    ]
}
{{< /code-block >}}

## 미리 보기 제한 사항 {#preview-limitations}

이번 초기 미리 보기 릴리스에는 다음과 같은 제한 사항이 포함되어 있습니다.

- 최대 10,000개의 메트릭 이름을 필터링할 수 있습니다.
- Agent의 리소스 사용량에 미치는 영향은 메모리(RSS) 최대 10MB로 제한되며 CPU 사용량은 증가하지 않습니다.
- DogStatsD 또는 Agent 통합에서 수신된 Custom Metrics만 지원됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/#metrics
[2]: /ko/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /ko/account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/metric/summary
[7]: https://app.datadoghq.com/metric/settings/policies                                            
[8]: /ko/api/latest/#getting-started
[9]: /ko/getting_started/site/