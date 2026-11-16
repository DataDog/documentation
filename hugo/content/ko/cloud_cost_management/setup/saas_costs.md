---
aliases:
- /ko/cloud_cost_management/saas_costs
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: 문서
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: 문서
  text: AWS 청구서에 대한 인사이트 확보
- link: /cloud_cost_management/setup/azure
  tag: 문서
  text: Azure 청구서에 대한 인사이트 확보
- link: /cloud_cost_management/setup/google_cloud
  tag: 문서
  text: Google Cloud 청구서에 대한 인사이트 확보
- link: /cloud_cost_management/setup/oracle
  tag: 문서
  text: Oracle 청구서에 대한 인사이트 확보
- link: /cloud_cost_management/setup/custom
  tag: 문서
  text: 사용자 지정 비용에 대한 인사이트 확보
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: 블로그
  text: 서비스 뒤에 숨은 클라우드 및 SaaS 비용을 빠르고 종합적으로 분석하기
- link: https://www.datadoghq.com/blog/cursor-cloud-cost-management/
  tag: 블로그
  text: Datadog Cloud Cost Management로 Cursor 비용 관리하기
title: SaaS 및 AI 비용
---
## 개요 {#overview}

SaaS 및 AI 비용을 사용하면 Datadog에서 클라우드 비용 데이터와 관련된 계정을 구성하여 **공급자로부터 직접** 비용 데이터를 보낼 수 있습니다.

{{< card-grid >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=snowflake#configure-your-saas-accounts" src="integrations_logos/snowflake_small.svg" alt="snowflake" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=databricks#configure-your-saas-accounts" src="integrations_logos/databricks_small.svg" alt="databricks" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts" src="integrations_logos/openai_small.svg" alt="openai" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts" src="integrations_logos/anthropic_small.svg" alt="anthropic" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=cursor#configure-your-saas-accounts" src="integrations_logos/cursor_small.svg" alt="cursor" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=temporalcloud#configure-your-saas-accounts" src="integrations_logos/temporal_small.svg" alt="temporal cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=github#configure-your-saas-accounts" src="integrations_logos/github_small.svg" alt="github" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=confluentcloud#configure-your-saas-accounts" src="integrations_logos/confluent-cloud_small.svg" alt="confluent cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=mongodb#configure-your-saas-accounts" src="integrations_logos/mongodb_small.svg" alt="mongodb" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=elasticcloud#configure-your-saas-accounts" src="integrations_logos/elastic-cloud_small.svg" alt="elastic cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=fastly#configure-your-saas-accounts" src="integrations_logos/fastly_small.svg" alt="fastly" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=twilio#configure-your-saas-accounts" src="integrations_logos/twilio_small.svg" alt="twilio" >}}
{{< /card-grid >}}

지원되지 않는 공급자인 경우 [사용자 지정 비용][1]을 사용하여 모든 비용 소스를 Datadog에 업로드하고 서비스의 총 비용을 파악하세요. 현재는 USD 단위의 SaaS 비용만 지원됩니다.

## 설정 {#setup}

[**Cloud Cost** > **Settings**, select **Accounts**][8]로 이동한 다음 비용 데이터를 수집할 공급자에서 {{< ui >}}Configure{{< /ui >}}를 클릭합니다.

{{< img src="cloud_cost/saas_costs/all_accounts.png" alt="비용 데이터를 수집하려는 AWS, Azure, Google Cloud 계정을 추가합니다. Fastly, Snowflake, Confluent Cloud, MongoDB, Databricks, OpenAI, Twilio, GitHub, Cursor 및 Temporal Cloud 계정을 추가할 수도 있습니다." style="width:100%" >}}

{{< tabs >}}

{{% tab "Snowflake" %}}

1. [Snowflake 계정 URL][102]을 찾습니다.
   {{< img src="integrations/snowflake/snowflake_account_url.png" alt="Snowflake UI에서 계정 URL 복사 옵션이 선택된 계정 메뉴" style="width:100%;" >}}
2. Datadog에서 [Snowflake 통합 타일][101]로 이동하여 {{< ui >}}Add Snowflake Account{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Account URL{{< /ui >}} 필드에 Snowflake 계정 URL을 입력합니다. 예: `https://xyz12345.us-east-1.snowflakecomputing.com`.
4. 섹션에서 {{< ui >}}Connect your Snowflake account{{< /ui >}}토글을 클릭하여 Cloud Cost Management에서 Snowflake를 활성화합니다.
5. {{< ui >}}User Name{{< /ui >}} 필드에 Snowflake 사용자 이름을 입력합니다.
6.  [Snowflake 통합][103] 페이지의 4단계에 따라 Snowflake를 모니터링하기 위한 Datadog 전용 역할 및 사용자를 생성합니다.
7. [Snowflake 통합][103] 페이지의 5단계에 따라 키-값 쌍 인증을 구성합니다.
8.  {{< ui >}}Save{{< /ui >}}를 클릭합니다.

지난 6개월간의 Snowflake 비용 데이터는 24시간 이내에 Cloud Cost Management에서 확인할 수 있습니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

**Snowflake 쿼리 태그**

[Snowflake의 쿼리 태그][105]는 쿼리와 연결할 수 있는 강력한 메타데이터 문자열입니다. [Snowflake 비용 관리 통합][101]은 Snowflake 통합 타일에서 찾을 수 있는 쉼표로 구분된 허용 목록에 있는 [JSON 구문 분석 가능][106] 쿼리 태그를 수집합니다.

예를 들어, 조직이 Snowflake 컴퓨팅 비용을 `team` 및 `application` 차원별로 그룹화하려는 경우, 다음과 같은 방식으로 특정 팀의 애플리케이션에 대한 Snowflake 쿼리에 태그를 지정할 수 있습니다.

```
ALTER SESSION SET QUERY_TAG = '{"team": "devops", "application": "CI_job_executor"}';
```
{{< img src="cloud_cost/saas_costs/snowflake_query_tags_example.png" alt="팀 및 애플리케이션 쿼리 태그별로 비용을 그룹화합니다." style="width:100%" >}}

결과적으로 `team` 및 `application` 쿼리 태그로 실행된 모든 쿼리의 비용은 해당 개념에 귀속할 수 있습니다.

비용 관리 내에서 쿼리 태그를 사용하려면 다음 사항을 확인하세요.

- `query_tag` 문자열은 JSON 구문 분석이 가능해야 합니다. 구체적으로, 이는 해당 문자열이 기본 `PARSE_JSON` 함수로 처리될 수 있음을 의미합니다.

- 키 허용 목록이 Snowflake 통합 타일에서 제공되어야 합니다. 이러한 키는 JSON 형식 `query_tag` 필드의 첫 번째 계층에 매핑됩니다. 이 허용 목록은 쉼표로 구분된 문자열 목록 형식으로 나타납니다(예: `tag_1,tag_2,tag_3`). 문자열에는 영숫자, 밑줄, 하이픈, 마침표만 포함되어 있는지 확인하세요. {{< ui >}}Resources Collected{{< /ui >}} > {{< ui >}}Cloud Cost Management{{< /ui >}} > {{< ui >}}Collected Query Tags{{< /ui >}} 아래의 Snowflake 타일에 이 정보를 입력할 수 있습니다.

**참고**: 데이터 규모를 고려하여 쿼리 태그를 선택하세요. 적절한 쿼리 태그는 그룹 카디널리티가 낮거나 중간 정도인 태그입니다(예: 팀, 사용자, 서비스). 그룹 카디널리티가 높은 쿼리 태그(예: 작업 실행과 관련된 고유 UUID)를 선택하면 데이터 수집 및 프런트엔드 렌더링 모두에서 병목 현상이 발생할 수 있습니다.

**Snowflake CCM 객체 태그**

객체 태그는 향상된 감사 가능성 및 비용 분석을 위해 Snowflake 객체에 연결할 수 있는 사용자 정의 문자열입니다. 예를 들어 팀별로 비용을 추적하려면 해당 팀이 사용하는 웨어하우스에 태그를 지정하세요.

모든 객체 태그 구성은 [Snowflake][104] 내에서 수행됩니다.

참고:
- **태그 상속**: Snowflake 객체는 계층 구조를 따르며, CCM 통합은 비용 데이터를 제출할 때 상속된 태그를 고려합니다.

{{< img src="cloud_cost/saas_costs/snowflake_setup.png" alt="Snowflake와 통합하여 비용 데이터를 수집하세요." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/snowflake-web
[102]: https://docs.snowflake.com/en/user-guide/organizations-connect
[103]: /ko/integrations/snowflake-web/#cloud-cost-management
[104]: https://docs.snowflake.com/en/user-guide/object-tagging
[105]: https://docs.snowflake.com/en/sql-reference/parameters#query-tag
[106]: https://docs.snowflake.com/en/sql-reference/functions/parse_json

{{% /tab %}}

{{% tab "Databricks" %}}

1. Datadog에서 [Databricks 통합 타일][101]로 이동하여 {{< ui >}}Configure{{< /ui >}}를 클릭합니다.
2. Databricks 서비스 주체에 해당하는 작업 공간 이름, URL, 클라이언트 ID, 클라이언트 암호를 입력합니다.
3.  {{< ui >}}Select products to set up integration{{< /ui >}} 섹션에서 각 계정의 토글을 클릭하여 Databricks `Cloud Cost Management`를 활성화합니다.
4. Databricks 인스턴스의 웨어하우스에 해당하는 `System Tables SQL Warehouse ID`를 입력하여 시스템 테이블 청구 데이터를 쿼리합니다.
5. {{< ui >}}Save Databricks Workspace{{< /ui >}}를 클릭합니다.

서비스 주체는 Unity Catalog 내의 [시스템 테이블](https://docs.databricks.com/aws/en/admin/system-tables/)에 대한 읽기 액세스 권한이 필요합니다. Databricks에서 {{< ui >}}SQL Editor{{< /ui >}}를 열고 서비스 주체의 클라이언트 ID(표시 이름 아님)를 사용하여 다음 명령을 실행합니다.

```sql
GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
```

지난 15개월간의 Databricks 비용 데이터는 24시간 후 Cloud Cost Management에서 액세스할 수 있습니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

{{< img src="cloud_cost/saas_costs/databricks_setup_1.png" alt="Databricks와 통합하여 비용 데이터를 수집하세요." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/databricks

{{% /tab %}}


{{% tab "OpenAI" %}}

<div class="alert alert-danger">Cloud Cost Management의 OpenAI 비용 데이터를 수집하려면 <strong>관리자 범위 API 키가 필요합니다</strong>. 프로젝트 범위의 API 키는 비용 데이터를 수집할 수 없습니다.</div>

1. OpenAI 계정 설정에서 [관리자 API 키][103]를 생성합니다.
   - [OpenAI 계정][104]에 로그인합니다.
   - [관리자 키 페이지][105]로 이동하거나 {{< ui >}}Organization settings{{< /ui >}} 아래의 {{< ui >}}API keys{{< /ui >}} 로 이동한 후 {{< ui >}}Admin keys{{< /ui >}} 탭을 선택합니다.
   - {{< ui >}}Create a new secret key{{< /ui >}}를 클릭한 후 생성된 관리자 API 키를 복사합니다.
2. Datadog에서 [OpenAI 통합 타일][102]로 이동하여 {{< ui >}}Add Account{{< /ui >}}를 클릭합니다.
3. OpenAI 계정 이름을 입력하고, 관리자 API 키를 입력한 다음, 필요시 태그를 지정합니다.
4. {{< ui >}}Resources{{< /ui >}} 섹션에서 각 계정의 토글을 클릭하여 `OpenAI Billing Usage Data Collection`을 활성화합니다.
5. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

지난 15개월간의 OpenAI 비용 데이터는 24시간 후 Cloud Cost Management에서 액세스할 수 있습니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

{{< img src="cloud_cost/saas_costs/openai_setup.png" alt="OpenAI와 통합하여 비용 데이터를 수집하세요." style="width:100%" >}}

[102]: https://app.datadoghq.com/integrations/openai
[103]: https://platform.openai.com/docs/api-reference/admin-api-keys
[104]: https://platform.openai.com/
[105]: https://platform.openai.com/settings/organization/admin-keys

{{% /tab %}}

{{% tab "Anthropic" %}}

### 1. 관리자 API 키 생성 {#1-generate-an-admin-api-key}

먼저 Anthropic에서 [관리자 API 키](https://docs.anthropic.com/en/api/administration-api)를 가져와 시작합니다. 이 키를 사용하면 조직 전체의 사용량 및 비용 보고서에 액세스할 수 있습니다.

1. 조직 설정으로 이동하거나 Anthropic 계정 관리자에게 문의하여 새 관리자 API 키를 생성합니다.
2. API 키를 안전한 위치에 복사합니다.

### 2. Datadog 통합 구성 {#2-configure-the-datadog-integration}

1. Datadog에서 [**Integrations > Anthropic Usage and Costs**](https://app.datadoghq.com/integrations?integrationId=anthropic-usage-and-costs)로 이동합니다.
2. {{< ui >}}Configure{{< /ui >}} 탭의 {{< ui >}}Account details{{< /ui >}} 아래에 Anthropic에서 받은 {{< ui >}}Admin API Key{{< /ui >}}를 붙여넣습니다.
3. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

구성을 저장하면 Datadog이 이 키를 사용하여 Anthropic 사용량 및 비용 엔드포인트를 폴링하기 시작하고 환경에 메트릭을 채웁니다.

**참고**: Anthropic Enterprise 및 플랫폼 계정의 비용을 둘 다 추적하려면 설정 단계를 반복하여 각 API 키 유형에 대해 별도의 계정 항목을 추가하세요. 표준 플랫폼 사용량에는 [관리자 API 키](https://docs.anthropic.com/en/api/administration-api)를 사용하고 Anthropic Enterprise 사용량에는 Enterprise Analytics API 키를 사용하세요.

{{% /tab %}}

{{% tab "Cursor" %}}

<div class="alert alert-warning">Cursor 관리자 API 키를 생성하려면 Enterprise 플랜과 팀 관리자 역할이 필요합니다. 표준 팀 플랜 계정은 액세스 거부 오류를 반환합니다.</div>

### 1. 관리자 API 키 생성 {#1-generate-an-admin-api-key-1}

먼저 Cursor에서 Admin API 키를 받습니다. 이 키를 사용하면 팀 전체의 사용량 및 비용 보고서에 액세스할 수 있습니다.

1. Cursor 대시보드에서 **Settings > Advanced > Admin API Keys**로 이동합니다.
2. 새 관리자 API 키를 생성하고 안전한 위치에 복사합니다.

### 2. Datadog 통합 구성 {#2-configure-the-datadog-integration-1}

1. Datadog에서 [**Integrations > Cursor**][101]로 이동합니다.
2. {{< ui >}}Configure{{< /ui >}} 탭의 {{< ui >}}Account details{{< /ui >}} 아래에 Cursor에서 복사한 {{< ui >}}Admin API Key{{< /ui >}}를 붙여넣습니다.
3. {{< ui >}}Resources{{< /ui >}} 섹션 아래에서 각 계정의 토글을 클릭하여 `Cursor in Cloud Cost Management`를 활성화합니다.
4. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

구성을 저장하면 Datadog에서 이 키를 사용하여 Cursor 사용량 및 비용 엔드포인트를 폴링하기 시작하며, 환경에서 메트릭을 채웁니다. 지난 15개월간의 Cursor 비용 데이터는 24시간 후 Cloud Cost Management에서 액세스할 수 있습니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

[101]: https://app.datadoghq.com/integrations/cursor

{{% /tab %}}

{{% tab "Temporal Cloud" %}}

<div class="alert alert-warning">Temporal Cloud 청구 API 키를 생성하려면 <strong>재무 관리자</strong> 또는 <strong>계정 소유자</strong> 역할이 있는 서비스 계정이 필요합니다. 메트릭 읽기 전용 및 계정 관리자 역할은 청구 API에 액세스할 수 없습니다.</div>

### 1. 청구 API 키 생성 {#1-generate-a-billing-api-key}

1. Temporal Cloud에서 **Settings > Service Accounts > Create Service Account**로 이동합니다.
2. 서비스 계정에 **재무 관리자** 또는 **계정 소유자** 역할을 할당합니다.
3. 서비스 계정에 대한 API 키를 생성하고 안전한 위치에 복사합니다. Temporal Cloud는 키를 한 번만 표시합니다.

### 2. Datadog 통합 구성 {#2-configure-the-datadog-integration-2}

1. Datadog에서 [**Integrations > Temporal Cloud Cost Management**][110]로 이동합니다.
2. {{< ui >}}Install Integration{{< /ui >}}을 클릭한 다음 {{< ui >}}Configure{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Add Account{{< /ui >}}를 클릭하고 Temporal Cloud의 Billing API 키를 붙여넣습니다.
4. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

구성을 저장하면 Datadog에서는 이 키를 사용하여 Temporal Cloud Billing API를 폴링하기 시작하고 환경에 메트릭을 채웁니다. Temporal Cloud 비용 데이터는 25~30시간 이내에 Cloud Cost Management에서 액세스할 수 있습니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

[110]: https://app.datadoghq.com/integrations/temporal-cloud-costs

{{% /tab %}}

{{% tab "GitHub" %}}

1. GitHub의 [Personal Access Tokens][109] 페이지에서 `manage_billing:enterprise` 및 `read:org` 범위로 개인 인증 토큰(클래식)을 생성합니다.
2. Datadog [GitHub Costs 타일][108]로 이동합니다.
3. {{< ui >}}Add New{{< /ui >}}를 클릭합니다.
4. 계정 이름, 개인 액세스 토큰, 기업 이름(`enterprise-name` 형식), 적절한 태그를 입력합니다.
5. 확인 표시 버튼을 클릭하여 이 계정을 저장합니다.

지난 15개월간의 GitHub 비용 데이터는 24시간 이내에 Cloud Cost Management에서 액세스할 수 있습니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

{{< img src="cloud_cost/saas_costs/github_setup.png" alt="GitHub와 통합하여 비용 데이터를 수집하세요." style="width:100%" >}}

[108]: https://app.datadoghq.com/integrations/github-costs
[109]: https://github.com/settings/tokens

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

1. Confluent Cloud에서 [청구 관리자][102] 역할이 있는 API 키를 생성하거나 획득합니다.
2. Datadog의 [Confluent Cloud 통합 타일][101]로 이동한 다음 {{< ui >}}Add Account{{< /ui >}}를 클릭합니다.
3. Confluent Cloud 계정 이름, API 키, API 시크릿을 입력하고 필요시 태그를 지정합니다.
4. {{< ui >}}Resources{{< /ui >}} 섹션에서 {{< ui >}}Collect cost data to view in Cloud Cost Management{{< /ui >}}에 대한 토글을 클릭합니다.
5. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

Confluent Cloud 비용 데이터는 설정 후 24시간이 지나면 Cloud Cost Management에서 확인할 수 있습니다. 이 데이터에는 Confluent 청구 API에서 제공하는 최대 기간인 12개월의 기록이 자동으로 포함됩니다. 향후 3개월에 걸쳐 데이터가 점진적으로 확장되어 15개월의 기록을 포함하게 됩니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

비용에 대한 클러스터 수준 태그나 비즈니스 메타데이터 태그를 수집하려면 스키마 레지스트리 API 키와 시크릿을 추가할 수 있습니다. 자세한 내용은 [Confluent Cloud의 스키마 관리][103]를 참조하세요.

{{< img src="cloud_cost/saas_costs/confluent_setup_1.png" alt="Confluent와 통합하여 비용 데이터를 수집하세요." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/confluent-cloud
[102]: https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[103]: https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud

{{% /tab %}}
{{% tab "MongoDB" %}}

1. MongoDB에서 `Organizational Billing Viewer` 권한으로 [API 토큰을 생성][101]하고, 클러스터 리소스 태그에 대한 `Organizational Read Only` 권한을 추가합니다.
2. Datadog에서 [MongoDB Cost Management 통합 타일][102]로 이동하여 {{< ui >}}Add New{{< /ui >}}를 클릭합니다.
3. MongoDB 계정 이름, 공개 키, 개인 키, 조직 ID를 입력하고 필요시 태그를 지정합니다.
4. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

지난 15개월간의 MongoDB 비용 데이터는 24시간 후 Cloud Cost Management에서 액세스할 수 있습니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

{{< img src="cloud_cost/saas_costs/mongodb_setup.png" alt="MongoDB와 통합하여 비용 데이터를 수집하세요." style="width:100%" >}}

[101]: https://www.mongodb.com/docs/cloud-manager/reference/user-roles/#organization-roles
[102]: https://app.datadoghq.com/integrations/mongodb-cost-management

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

1. Elastic Cloud 조직 설정의 [API 키][102] 섹션으로 이동합니다.
2. {{< ui >}}Create New Key{{< /ui >}}를 클릭합니다.
3. API 키에 대해 {{< ui >}}Name{{< /ui >}} 및 {{< ui >}}Expiration Date{{< /ui >}}를 선택합니다.
4. {{< ui >}}Billing Admin{{< /ui >}} 역할을 선택합니다.
5. {{< ui >}}Create Key{{< /ui >}}를 클릭하여 키를 생성합니다.
6. Datadog의 [Elastic Cloud 통합 타일][101]로 이동합니다.
7. {{< ui >}}Add Account{{< /ui >}}를 클릭합니다.
8. 계정 테이블에 {{< ui >}}Elastic Cloud Organization ID{{< /ui >}} 및 {{< ui >}}Billing API Key{{< /ui >}}를 입력합니다.

지난 15개월간의 Elastic Cloud 비용 데이터는 24시간 후 Cloud Cost Management에서 액세스할 수 있습니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

{{< img src="cloud_cost/saas_costs/elasticcloud_setup.png" alt="Elastic Cloud와 통합하여 비용 데이터를 수집하세요." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/elastic-cloud-ccm
[102]: https://cloud.elastic.co/account/keys

{{% /tab %}}

{{% tab "Fastly" %}}

1. Fastly의 [개인 API 토큰][101] 페이지에서 최소 `"global:read"` 범위 및 `"Billing"` 역할이 있는 API 토큰을 생성합니다.
2. Datadog에서 [Fastly 비용 관리 통합 타일][102]로 이동하여 {{< ui >}}Add New{{< /ui >}}를 클릭합니다.
3. Fastly 계정 이름과 API 토큰을 입력합니다.
4. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

지난 15개월간의 Fastly 비용 데이터는 24시간 후 Cloud Cost Management에서 액세스할 수 있습니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

{{< img src="cloud_cost/saas_costs/fastly_setup_1.png" alt="Fastly와 통합하여 비용 데이터를 수집하세요." style="width:100%" >}}

[101]: https://manage.fastly.com/account/personal/tokens
[102]: https://app.datadoghq.com/integrations/fastly-cost-management

{{% /tab %}}
{{% tab "Twilio" %}}

1. Datadog에서 [Twilio 통합 타일][101]로 이동하여 {{< ui >}}Add Account{{< /ui >}}를 클릭합니다.
2. {{< ui >}}Resources{{< /ui >}} 섹션에서 각 계정의 토글을 클릭하여 `Twilio in Cloud Cost Management`를 활성화합니다.
3. Twilio 계정에 대해 {{< ui >}}Account SID{{< /ui >}}를 입력합니다.
4. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

지난 15개월간의 Twilio 비용 데이터는 24시간 후 Cloud Cost Management에서 액세스할 수 있습니다. 각 SaaS 비용 통합에서 수집하여 사용 가능한 데이터에 액세스하려면 [수집된 데이터 섹션](#data-collected)을 참조하세요.

{{< img src="cloud_cost/saas_costs/twilio_setup.png" alt="Twilio와 통합하여 비용 데이터를 수집하세요." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/twilio

{{% /tab %}}
{{< /tabs >}}

## 수집되는 데이터 {#data-collected}

[**Cloud Cost Explorer** 페이지][3], [Cloud Cost Tag Explorer][4] 및 [대시보드][5], [노트북][6] 또는 [모니터][7]에서 비용 데이터를 조회할 수 있습니다. 이러한 비용 메트릭은 다른 [클라우드 비용 메트릭][2] 또는 관측 가능성 메트릭과 결합할 수도 있습니다.

다음 표에는 각 SaaS 비용 통합과 관련된 기본 제공 태그 중 일부가 표시된 목록이 포함되어 있습니다.

{{< tabs >}}
{{% tab "Snowflake" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">태그 이름</th>
      <th>태그 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_locator</code></td>
      <td>사용량이 소비된 계정의 로케이터입니다.</td>
    </tr>
    <tr>
      <td><code>account_name</code></td>
      <td>사용량이 소비된 계정의 이름입니다.</td>
    </tr>
    <tr>
      <td><code>balance_source</code></td>
      <td>일일 사용량 결제에 사용된 자금의 출처입니다. 소스는 다음 중 하나일 수 있습니다.<br>- <b>capacity</b>: 조직의 용량 약정에 남아 있는 크레딧으로 지불된 사용량입니다.<br>- <b>rollover</b>: 롤오버 크레딧으로 지불된 사용량입니다. 조직이 용량 약정을 갱신하면 사용하지 않은 크레딧이 새 계약의 잔액에 롤오버 크레딧으로 추가됩니다.<br>- <b>free usage</b>: 조직에 제공된 무료 크레딧으로 충당된 사용량입니다.<br>- <b>overage</b>: 조직이 용량, 롤오버 및 무료 크레딧을 모두 소진했을 때 발생하는 온디맨드 가격으로 지불된 사용량입니다.<br>- <b>rebate</b>: 조직이 다른 조직과 데이터를 공유했을 때 조직에 부여된 크레딧으로 충당된 사용량입니다.</td>
    </tr>
    <tr>
      <td><code>billing_type</code></td>
      <td>청구되거나 크레딧이 부여되는 항목을 나타냅니다. 가능한 청구 유형은 다음과 같습니다.<br>- <b>consumption</b>: 컴퓨팅 크레딧, 스토리지 비용 및 데이터 전송 비용과 관련된 사용량입니다.<br>- <b>rebate</b>: 조직이 다른 조직과 데이터를 공유했을 때 조직에 부여된 크레딧으로 충당된 사용량입니다.<br>- <b>priority support</b>: 우선 지원 서비스에 청구되는 요금입니다. 이 요금은 계정이 아니라 계약의 조항과 관련이 있습니다.<br>- <b>vps_deployment_fee</b>: Virtual Private Snowflake 배포에 대한 요금입니다.<br>- <b>support_credit</b>: Snowflake 지원 팀이 Snowflake의 문제로 인해 발생한 요금을 취소하기 위해 계정에 크레딧을 부여했습니다.</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>개별 라인 항목과 관련된 비용 유형에 대한 설명입니다. 비용 유형마다 설명이 다르며 <code>servicename</code> 태그로 표시됩니다.</td>
    </tr>
    <tr>
      <td><code>contract_number</code></td>
      <td>조직의 Snowflake 계약 번호입니다.</td>
    </tr>
    <tr>
      <td><code>database_name</code></td>
      <td>쿼리가 실행된 데이터베이스의 이름입니다(해당되는 경우). <b>쿼리 속성</b> 비용에 대해서만 확인됩니다.</td>
    </tr>
    <tr>
      <td><code>organization_name</code></td>
      <td>조직의 이름입니다.</td>
    </tr>
    <tr>
      <td><code>query_hash</code></td>
      <td>귀속 목적을 위해 쿼리의 파라미터화된 버전을 나타내는 고유 해시. <b>쿼리 속성</b> 비용에 대해서만 확인됩니다.</td>
    </tr>
    <tr>
      <td><code>query_hash_version</code></td>
      <td>생성에 사용된 Snowflake 쿼리 해시 알고리즘의 버전입니다. <code>query_hash</code>. <b>쿼리 속성</b> 비용에 대해서만 확인됩니다.</td>
    </tr>
    <tr>
      <td><code>rating_type</code></td>
      <td>레코드의 사용량의 평가 또는 가격 책정 방식을 나타냅니다. 가능한 값은 다음과 같습니다.<br>- <b>compute</b><br>- <b>data_transfer</b><br>- <b>storage</b><br>- <b>Other</b></td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>계정이 위치한 리전의 이름입니다.</td>
    </tr>
    <tr>
      <td><code>service_level</code></td>
      <td>Snowflake 계정의 서비스 수준(에디션)입니다(Standard, Enterprise 또는 Business Critical).</td>
    </tr>
    <tr>
      <td><code>servicename</code></td>
      <td>사용 유형. 가능한 서비스 유형은 다음과 같습니다.<br>- <b>automatic_clustering</b>: 자동 클러스터링을 참조하세요.<br>- <b>data_transfer</b>: 데이터 전송 비용 이해를 참조하세요.<br>- <b>logging</b>: 로깅 및 추적 개요를 참조하세요.<br>- <b>materialized_view</b>: 구체화된 뷰 작업을 참조하세요.<br>- <b>replication</b>: 여러 계정에 걸친 복제 및 장애 조치 소개를 참조하세요.<br>- <b>query_acceleration</b>: 쿼리 가속 서비스 사용을 참조하세요.<br>- <b>search_optimization</b>: 검색 최적화 서비스를 참조하세요.<br>- <b>serverless_task</b>: 작업 소개를 참조하세요.<br>- <b>snowpipe</b>: Snowpipe를 참조하세요.<br>- <b>snowpipe_streaming</b>: Snowpipe 스트리밍을 참조하세요.<br>- <b>storage</b>: 스토리지 비용 이해를 참조하세요.<br>- <b>warehouse_metering_query_attribution</b>: 실행 시간이 100ms 이상인 쿼리의 가상 웨어하우스 크레딧 사용량을 참조하세요. 서버리스 또는 클라우드 서비스 사용량을 나타내지 않습니다.<br>- <b>warehouse_metering_query_attribution</b>: 실행 시간이 100ms 이하인 쿼리의 가상 웨어하우스 크레딧 사용량과 유휴 웨어하우스 시간을 참조하세요. 서버리스 또는 클라우드 서비스 컴퓨팅 사용량을 나타내지 않습니다.</td>
    </tr>
    <tr>
      <td><code>user_name</code></td>
      <td>쿼리와 연결된 사용자 또는 서비스 계정의 이름입니다.</td>
    </tr>
    <tr>
      <td><code>warehouse_id</code></td>
      <td>비용을 발생시키는 웨어하우스의 식별자입니다.</td>
    </tr>
    <tr>
      <td><code>warehouse_name</code></td>
      <td>이 사용량과 연결된 웨어하우스의 이름입니다.</td>
    </tr>
    <tr>
      <td><code>warehouse_size</code></td>
      <td>웨어하우스의 크기입니다(예: 대형, 중형).</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}
{{% tab "Databricks" %}}

**참고**: Databricks 비용 통합은 정가와 사용량 데이터를 사용하여 비용을 계산합니다. 협상되거나 할인된 요금은 반영하지 않습니다.

<table>
  <thead>
    <tr>
      <th style="width: 220px;">태그 이름</th>
      <th>태그 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_id</code></td>
      <td>이 보고서가 생성된 계정의 ID입니다.</td>
    </tr>
    <tr>
      <td><code>billing_origin_product</code></td>
      <td>청구 이벤트가 발생하는 제품 또는 기능입니다(예: JOBS, CLUSTERS).</td>
    </tr>
    <tr>
      <td><code>central_clean_room_id</code></td>
      <td>워크로드와 연결된 중앙 클린룸의 ID입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>클라우드 유형과 연결된 SKU 이름의 조합입니다(예: AWS - PREMIUM_ALL_PURPOSE_COMPUTE).</td>
    </tr>
    <tr>
      <td><code>cloud</code></td>
      <td>이 사용량은 클라우드와 관련이 있습니다. 가능한 값은 AWS, AZURE, GCP입니다.</td>
    </tr>
    <tr>
      <td><code>cluster_id</code></td>
      <td>이 사용량과 연결된 클러스터의 ID입니다.</td>
    </tr>
    <tr>
      <td><code>custom_tags</code></td>
      <td>사용량에 적용된 사용자 지정 태그로, 일반적으로 추가 메타데이터나 분류를 위한 키-값 쌍입니다.</td>
    </tr>
    <tr>
      <td><code>destination_region</code></td>
      <td>워크로드가 전달되는 리전입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>dlt_maintenance_id</code></td>
      <td>Delta Live Tables의 유지 관리 ID입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>dlt_pipeline_id</code></td>
      <td>Delta Live Tables 파이프라인의 ID입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>dlt_tier</code></td>
      <td>Delta Live Tables 서비스 계층입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>dlt_update_id</code></td>
      <td>이 사용량과 관련된 Delta Live Table 업데이트 ID입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>endpoint_id</code></td>
      <td>SQL 기반 또는 서빙 관련 사용에 대한 엔드포인트 ID입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>endpoint_name</code></td>
      <td>SQL 또는 서빙 엔드포인트 이름입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>instance_pool_id</code></td>
      <td>사용된 인스턴스 풀의 ID입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>is_photon</code></td>
      <td>Photon 처리가 사용되었는지 여부를 나타냅니다(<code>true</code> 또는 <code>false</code>).</td>
    </tr>
    <tr>
      <td><code>is_serverless</code></td>
      <td>사용량이 서버리스 컴퓨팅 리소스와 관련이 있는지 여부를 나타냅니다(<code>true</code> 또는 <code>false</code>).</td>
    </tr>
    <tr>
      <td><code>job_id</code></td>
      <td>Databricks 내 작업에 대한 고유 식별자입니다</td>
    </tr>
    <tr>
      <td><code>job_name</code></td>
      <td>Databricks 내 작업 이름입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>job_run_id</code></td>
      <td>특정 작업 실행에 대한 식별자입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>jobs_tier</code></td>
      <td>작업 계층입니다(예: <code>CLASSIC</code> 또는 <code>PREMIUM</code>).</td>
    </tr>
    <tr>
      <td><code>networking</code></td>
      <td>이 작업에 사용된 네트워킹 유형입니다(지정된 경우).</td>
    </tr>
    <tr>
      <td><code>node_type</code></td>
      <td>이 청구 기록에 사용된 노드 유형입니다(예: m5d.large).</td>
    </tr>
    <tr>
      <td><code>notebook_id</code></td>
      <td>이 청구 기록에 사용된 노트북의 ID입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>notebook_path</code></td>
      <td>Databricks 내 노트북 경로입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>record_id</code></td>
      <td>이 기록에 대한 고유 ID입니다.</td>
    </tr>
    <tr>
      <td><code>run_name</code></td>
      <td>현재 작업 또는 워크플로 실행 이름입니다(해당되는 경우).</td>
    </tr>
    <tr>
      <td><code>serving_type</code></td>
      <td>사용 중인 서빙 모델 유형입니다(해당하는 경우, 예: Model Serving).</td>
    </tr>
    <tr>
      <td><code>source_region</code></td>
      <td>이 청구 기록이 발생한 리전입니다(해당하는 경우).</td>
    </tr>
    <tr>
      <td><code>sql_tier</code></td>
      <td>사용량과 관련된 SQL 계층입니다(해당하는 경우).</td>
    </tr>
    <tr>
      <td><code>usage_metadata</code></td>
      <td>사용량 유형, 서비스 카테고리 또는 기타 관련 정보와 같은 세부 정보를 포함할 수 있는 사용량 관련 메타데이터입니다.</td>
    </tr>
    <tr>
      <td><code>usage_type</code></td>
      <td>청구되는 사용량 유형입니다(예: COMPUTE_TIME).</td>
    </tr>
    <tr>
      <td><code>warehouse_id</code></td>
      <td>SQL 웨어하우스의 ID입니다(해당하는 경우).</td>
    </tr>
    <tr>
      <td><code>workspace_id</code></td>
      <td>이 사용량과 연결된 작업 공간의 ID입니다.</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}

{{% tab "OpenAI" %}}

| 태그 이름 | 태그 설명 |
|---|---|
| `charge_description` | 비용이 청구와 연결된 모델의 이름입니다. |
| `organization_id` | 조직의 고유 식별자입니다. |
| `organization_name` | 조직의 이름입니다. |
| `project_id` | 프로젝트의 고유 식별자입니다. |
| `project_name` | 프로젝트의 이름입니다. |

{{% /tab %}}

{{% tab "Anthropic" %}}

| 태그 이름 | 태그 설명 |
|---|---|
| `workspace_id` | Anthropic 작업 공간의 고유 식별자입니다. |
| `workspace_name` | 태그 정규화된 작업 공간 이름 버전입니다. |
| `display_workspace_name` | 변경되지 않은 작업 공간 이름입니다. |
| `org_id` | Anthropic 조직의 고유 식별자입니다. |
| `org_name` | 태그 정규화된 Anthropic 조직 이름 버전입니다. |
| `display_org_name` | 변경되지 않은 조직 이름입니다. |
| `org_type` | Anthropic 계정 유형입니다(예: `enterprise` 또는 `platform`). |
| `model_id` | 표준 Anthropic 모델 식별자입니다(예: `claude-3-opus-20240229`). |
| `model` | `model_id`에 대한 별칭으로, 사용 및 메트릭과의 호환성과 일관성을 위해 제공됩니다. |
| `model_name` | 모델의 친숙한 이름입니다(예: `Claude 3 Opus`). |
| `service_tier` | 사용량과 관련된 Anthropic 서비스 플랜 또는 티어입니다(예: `standard`, `pro`, `enterprise`). |
| `token_type` | 소비된 토큰 카테고리입니다.|
| `context_window` | 토큰에 대한 컨텍스트 윈도우 크기입니다(예: `tier_0-200k`). |

{{% /tab %}}

{{% tab "Cursor" %}}

| 태그 이름 | 태그 설명 |
|---|---|
| `billing_group` | 사용량이 귀속되는 Cursor 조직 내의 청구 그룹입니다. |
| `charge_type` | Cursor 요금 카테고리(예: `fast_premium`, `slow_premium`). |
| `hour` | 사용량이 기록된 시간입니다(UTC 기준). |
| `is_headless` | Cursor 편집기 외부에서 실행되는 백그라운드 에이전트와 같은 헤드리스 세션에 의해 사용량이 생성되었는지 여부를 나타냅니다(`true` 또는 `false`). |
| `max_mode` | 요청이 더 높은 비용으로 최첨단 모델에 쿼리를 라우팅하는 Cursor Max를 사용했는지 여부를 나타냅니다(`true` 또는 `false`). |
| `user` | 비용을 발생시킨 Cursor 사용자의 이메일 주소입니다. |

{{% /tab %}}

{{% tab "Temporal Cloud" %}}

**참고**: Temporal Cloud에서 구성된 사용자 지정 네임스페이스 태그는 동적 `temporal_tag_<key>` 태그로 표시됩니다(예: `tmprl_project`로 태그가 지정된 네임스페이스는 `temporal_tag_tmprl_project`로 나타남).

| 태그 이름 | 태그 설명 |
|---|---|
| `namespace` | 사용량이 귀속되는 Temporal Cloud 네임스페이스입니다(예: `replay-2025`). |
| `billing_account` | 요금과 관련된 Temporal Cloud 청구 계정입니다. |
| `billing_account_id` | Temporal Cloud 청구 계정의 고유 식별자입니다. |
| `resource_type` | 사용량을 생성하는 리소스 유형입니다(예: `Namespace`). |
| `service_subcategory` | 요금을 발생시키는 사용량 카테고리(예: `Actions`, `Active Storage`, `Retained Storage`). |
| `sku_id` | 요금과 관련된 Temporal Cloud SKU의 고유 식별자입니다(예: `business-actions`, `business-active-storage`). |
| `sku_meter` | 요금을 계산하는 데 사용되는 Temporal Cloud SKU 미터입니다(예: `Actions`, `Active Storage`, `Retained Storage`). |
| `charge_category` | Temporal Cloud 요금의 카테고리입니다(예: `usage`). |
| `pricing_unit` | 요금 책정에 사용되는 단위입니다(예: `GB/h`, `1 Million Actions`). |
| `usage_unit` | 요금 측정에 사용되는 사용량 단위입니다(예: `GB/h`, `1 Million Actions`). |
| `unit_price` | 사용량 단위당 가격입니다. |
| `invoice_id` | 요금과 관련된 Temporal Cloud 청구서의 고유 식별자입니다. |

{{% /tab %}}

{{% tab "GitHub" %}}

**참고**: GitHub 비용 통합은 목록 가격과 사용 데이터를 기반으로 비용을 추정하며 할인 정보를 사용할 수 있는 경우 할인 값을 포함합니다. 협의된 요금은 고려하지 않습니다.

| 태그 이름 | 태그 설명 |
|---|---|
| `enterprise_name` | GitHub 엔터프라이즈 계정을 식별하는 영숫자 문자열입니다. |
| `charge_description` | 청구에 대한 설명입니다. |
| `product` | 사용 제품입니다(예: "actions" 또는 "storage"). |
| `organization_name` | GitHub 조직입니다. |
| `repository_name` | GitHub 리포지토리입니다. |
| `billing_currency` | 청구 통화입니다(예: "USD"). |
| `discount` | 비용 항목이 할인인 경우입니다. |

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">태그 이름</th>
      <th>태그 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>charge_description</code></td>
      <td>비용의 하위 유형입니다(예: KAFKA_NETWORK_WRITE).</td>
    </tr>
    <tr>
      <td><code>environment_id</code></td>
      <td>환경에 대한 고유 식별자입니다.</td>
    </tr>
    <tr>
      <td><code>network_access_type</code></td>
      <td>클러스터의 네트워크 액세스 유형입니다. 가능한 값은 <code>INTERNET</code>, <code>TRANSIT_GATEWAY</code>, <code>PRIVATE_LINK</code>, 및 <code>PEERED_VPC</code>).</td>
    </tr>
    <tr>
      <td><code>product</code></td>
      <td>제품 이름입니다. 가능한 값은 <code>KAFKA</code>, <code>CONNECT</code>, <code>KSQL</code>, <code>AUDIT_LOG</code>, <code>STREAM_GOVERNANCE</code>, <code>CLUSTER_LINK</code>, <code>CUSTOM_CONNECT</code>, <code>FLINK</code>, <code>SUPPORT_CLOUD_BASIC</code>, <code>SUPPORT_CLOUD_DEVELOPER</code>, <code>SUPPORT_CLOUD_BUSINESS</code>, 및 <code>SUPPORT_CLOUD_PREMIER</code>).</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>Confluent 리소스의 고유 식별자입니다.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>Confluent 리소스의 이름입니다.</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

| 태그 이름 | 태그 설명 |
|---|---|
| `charge_description` | 청구의 SKU입니다. |
| `kind` | 리소스의 유형입니다. |
| `name` | Elastic Cloud 리소스의 고유 식별자입니다. |
| `price_per_hour` | Elastic Cloud 리소스의 시간당 비용입니다. |

{{% /tab %}}
{{% tab "MongoDB" %}}

| 태그 이름 | 태그 설명 |
|---|---|
| `charge_description` | 청구에 대한 설명입니다. |
| `cluster_name` | 청구가 발생한 클러스터의 이름입니다. |
| `group_id` | 항목이 연결된 프로젝트의 ID입니다. |
| `invoice_id` | 송장의 고유 식별자입니다. |
| `mongo_org_id` | MongoDB 조직 ID입니다. |
| `replica_set_name` | 항목이 연결된 복제본 세트의 이름입니다. |
| `resource_tags` | 사용자가 설정한 클러스터의 임의 태그이며, 일반적으로 키-값 쌍으로 구성됩니다. |
| `status` | 결제 상태입니다. |

{{% /tab %}}

{{% tab "Fastly" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">태그 이름</th>
      <th>태그 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>charge_description</code></td>
      <td>청구에 대한 설명입니다.</td>
    </tr>
    <tr>
      <td><code>credit_coupon_code</code></td>
      <td>이 비용 항목에 적용된 쿠폰 또는 크레딧의 코드입니다(사용 가능한 경우).</td>
    </tr>
    <tr>
      <td><code>plan_name</code></td>
      <td>이 서비스가 속한 플랜의 이름으로, 종종 'product_line'과 일치합니다.</td>
    </tr>
    <tr>
      <td><code>product_name</code></td>
      <td>청구되는 특정 제품의 이름입니다(예: 'North America Bandwidth').</td>
    </tr>
    <tr>
      <td><code>product_group</code></td>
      <td>'Full Site Delivery'와 같은 제품의 그룹 또는 카테고리입니다.</td>
    </tr>
    <tr>
      <td><code>product_line</code></td>
      <td>이 항목이 속한 제품군입니다(예: 'Network Services').</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>서비스 사용이 발생한 리전입니다(예: 'North America').</td>
    </tr>
    <tr>
      <td><code>service_name</code></td>
      <td>이 비용 항목과 관련된 서비스의 이름으로, 종종 다음 항목과 일치합니다. <code>product_name</code>).</td>
    </tr>
    <tr>
      <td><code>usage_type</code></td>
      <td>청구되는 사용 유형입니다(예: 'Bandwidth').</td>
    </tr>
    <tr>
      <td><code>usage_type_cd</code></td>
      <td>'North America Bandwidth'와 같이 사용 유형을 나타내는 코드 또는 레이블입니다.</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}
{{% tab "Twilio" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">태그 이름</th>
      <th>태그 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_sid</code></td>
      <td>Twilio 계정을 식별하는 영숫자 문자열입니다.</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>사용 카테고리입니다. 자세한 내용은 <a href="https://www.twilio.com/docs/usage/api/usage-record#usage-categories" target="_blank">사용량 카테고리</a>를 참조하세요.</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>청구에 대한 설명입니다.</td>
    </tr>
    <tr>
      <td><code>count_unit</code></td>
      <td>수량이 측정되는 단위입니다(예: 통화의 경우 몇 통, SMS의 경우 몇 개).</td>
    </tr>
    <tr>
      <td><code>usage_unit</code></td>
      <td>사용량이 측정되는 단위입니다(예: 통화의 경우 몇 분, SMS의 경우 몇 개).</td>
    </tr>
  </tbody>
</table>

[101]: https://www.twilio.com/docs/usage/api/usage-record#usage-categories

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloud_cost_management/setup/custom
[2]: /ko/cloud_cost_management
[3]: https://app.datadoghq.com/cost/explorer
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /ko/dashboards
[6]: /ko/notebooks
[7]: /ko/monitors/types/cloud_cost
[8]: https://app.datadoghq.com/cost/settings/accounts