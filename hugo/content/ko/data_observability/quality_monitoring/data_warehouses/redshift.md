---
description: Amazon Redshift를 Datadog Data Observability에 연결하여 데이터 품질을 모니터링하고, 사용량을
  추적하고, 문제를 탐지하세요.
further_reading:
- link: /data_observability/
  tag: 설명서
  text: Data Observability 개요
- link: /monitors/types/data_observability/
  tag: 설명서
  text: Data Observability 모니터
title: Redshift
---
## 개요 {#overview}

Redshift 통합은 Datadog을 Amazon Redshift 클러스터에 연결하여 메타데이터, 쿼리 기록 및 테이블 수준 메트릭을 동기화합니다. 이를 사용하여 데이터 신선도를 모니터링하고, 이상을 탐지하며, 웨어하우스 및 다운스트림 도구 전반의 계보를 추적하세요.

Datadog은 프로비저닝된 Redshift 클러스터와 Redshift Serverless 워크그룹을 모두 지원합니다.

## 전제 조건 {#prerequisites}

시작하기 전에 다음 항목이 있는지 확인하세요.

- [Datadog에 연결된 AWS 계정][3]
  - Data Observability에는 로그 포워딩이 필요하지 않습니다.
- 역할을 생성하고 권한을 부여할 수 있는 Redshift 슈퍼유저 또는 데이터베이스 사용자
- Redshift 클러스터 또는 워크그룹이 IP별로 네트워크 액세스를 제한하는 경우, Datadog 웹훅 IP를 VPC 보안 그룹 인바운드 규칙에 추가하세요. IP 목록은 `webhooks` 섹션에서 {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}확인할 수 있습니다.

## Redshift에서 계정 설정 {#set-up-your-account-in-redshift}

슈퍼유저로 Redshift 클러스터에 연결하고 다음 SQL을 실행하여 Datadog 전용 역할을 생성하세요.

1. 역할을 생성하고 시스템 카탈로그 뷰에 대한 액세스 권한을 부여합니다.

   ```sql
   -- Create a dedicated role for Datadog monitoring
   CREATE ROLE datadog_role;

   -- Required for table size metrics
   GRANT SELECT ON svv_table_info TO ROLE datadog_role;
   ```

2. 데이터에 대한 읽기 전용 액세스 권한을 부여합니다. 한 가지 옵션을 선택하세요.

   {{< tabs >}}
   {{% tab "모든 스키마(권장)" %}}

   dbt가 풀 리퀘스트를 위해 생성하는 스키마를 포함하여, 데이터베이스의 모든 현재 및 향후 스키마, 테이블, 뷰에 대한 Datadog의 읽기 액세스 권한을 부여합니다. 이 옵션은 dbt CI/CD에 필요합니다.

   ```sql
   GRANT USAGE FOR SCHEMAS IN DATABASE "<YOUR_DATABASE>" TO ROLE datadog_role;
   GRANT SELECT FOR TABLES IN DATABASE "<YOUR_DATABASE>" TO ROLE datadog_role;
   ```

   {{% /tab %}}
   {{% tab "특정 스키마" %}}

   Datadog이 모니터링할 각 스키마에 대해 다음 작업을 실행하세요. 이는 dbt와 같은 다른 사용자가 생성한 테이블 및 뷰를 포함하여, 해당 스키마의 현재 및 향후 테이블과 뷰를 포함합니다.

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO ROLE datadog_role;
   GRANT SELECT FOR TABLES IN SCHEMA "<YOUR_SCHEMA>" TO ROLE datadog_role;
   ```

   dbt CI 스키마와 같이 나중에 생성된 스키마는 포함되지 않습니다. dbt CI/CD의 경우 **모든 스키마** 옵션을 사용하세요.

   {{% /tab %}}
   {{< /tabs >}}

3. Datadog 데이터베이스 사용자를 생성하거나 할당하세요.

   {{< tabs >}}
   {{% tab "프로비저닝된 클러스터" %}}

   전용 데이터베이스 사용자를 생성하고 역할을 할당하세요.

   ```sql
   -- Replace <STRONG_PASSWORD> with a secure password
   CREATE USER datadog_user PASSWORD '<STRONG_PASSWORD>' SYSLOG ACCESS UNRESTRICTED;
   GRANT ROLE datadog_role TO datadog_user;
   ```

   {{% /tab %}}
   {{% tab "Serverless" %}}

   Redshift Serverless에서는 데이터베이스 사용자가 IAM ID에서 자동으로 매핑됩니다. 예를 들어, `DatadogIntegrationRole`이라는 이름의 IAM 역할은 데이터베이스 사용자 `IAMR:DatadogIntegrationRole`에 매핑됩니다.

   IAM에 매핑된 데이터베이스 사용자에게 `datadog_role`을 부여하세요.

   ```sql
   GRANT ROLE datadog_role TO "IAMR:<YOUR_IAM_ROLE_NAME>";
   ALTER USER "IAMR:<YOUR_IAM_ROLE_NAME>" SYSLOG ACCESS UNRESTRICTED;
   ```

   {{% /tab %}}
   {{< /tabs >}}

## IAM 정책 구성 {#configure-iam-policies}

Redshift 클러스터가 포함된 AWS 계정과 연결된 Datadog AWS 통합 IAM 역할에 다음 정책을 추가하세요.

{{< tabs >}}
{{% tab "프로비저닝된 클러스터" %}}

`AmazonRedshiftDataFullAccess` AWS 관리형 정책과 이전 섹션에서 생성한 Datadog 데이터베이스 사용자에 대해 `redshift:GetClusterCredentials` 권한을 부여하는 인라인 정책을 연결하세요.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift:GetClusterCredentials",
            "Resource": [
                "arn:aws:redshift:<REGION>:<ACCOUNT_ID>:dbuser:<CLUSTER_IDENTIFIER>/datadog_user"
            ]
        }
    ]
}
```

{{% /tab %}}
{{% tab "Serverless" %}}

`AmazonRedshiftDataFullAccess` AWS 관리형 정책과 워크그룹에 `redshift-serverless:GetCredentials` 권한을 부여하는 인라인 정책을 연결하세요.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift-serverless:GetCredentials",
            "Resource": "arn:aws:redshift-serverless:<REGION>:<ACCOUNT_ID>:workgroup/<WORKGROUP_ID>"
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Datadog에서 Redshift 통합 구성{#configure-the-redshift-integration-in-datadog}

Datadog에서 Redshift 통합을 구성하려면 다음 단계를 따르세요.

1. [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1]로 이동합니다.
2. Redshift 옵션에 대한 {{< ui >}}Configure{{< /ui >}} 버튼을 클릭합니다.

   {{< img src="data_observability/redshift/data_obs_redshift_on_integrations_page.png" alt="Data Observability 통합 설정 페이지의 Redshift" style="width:100%;" >}}

3. 연결된 AWS 계정을 선택하거나 새 AWS 계정을 추가합니다.

   {{< img src="data_observability/redshift/data_obs_redshift_integration_flow.png" alt="Redshift Data Observability 통합을 위해 연결된 AWS 계정 또는 새 AWS 계정 선택" style="width:100%;" >}}

4. 클러스터 연결 세부 정보를 입력합니다.

   {{< tabs >}}
   {{% tab "프로비저닝된 클러스터" %}}

   - {{< ui >}}Cluster identifier{{< /ui >}}: Redshift 클러스터 식별자
   - {{< ui >}}Region{{< /ui >}}: 클러스터가 호스팅되는 AWS 리전(예: `us-east-1`)
   - {{< ui >}}Database user{{< /ui >}}: 설정 중에 생성된 Datadog 사용자(예: `datadog_user`)
   - {{< ui >}}Initial database{{< /ui >}}: 연결할 데이터베이스의 이름(기본값은 `dev`입니다)

   {{% /tab %}}
   {{% tab "Serverless" %}}

   - {{< ui >}}Workgroup name{{< /ui >}}: Redshift Serverless 워크그룹 이름
   - {{< ui >}}Region{{< /ui >}}: 워크그룹이 호스팅되는 AWS 리전(예: `us-east-1`)
   - {{< ui >}}Initial database{{< /ui >}}: 연결할 데이터베이스의 이름(기본값은 `dev`입니다)

   {{% /tab %}}
   {{< /tabs >}}

   {{< img src="data_observability/redshift/data_obs_redshift_add_credentials.png" alt="Data Observability 통합을 위한 Redshift 자격 증명 입력 필드" style="width:100%;" >}}

5. {{< ui >}}Add account{{< /ui >}}를 클릭합니다.

## 다음 단계 {#next-steps}

저장을 하고 나면, Datadog은 백그라운드에서 정보 스키마와 쿼리 기록 동기화를 시작합니다. 초기 동기화는 Redshift 배포 규모에 따라 몇 시간이 걸릴 수 있습니다.

초기 동기화가 완료되면 [Data Observability 모니터][2]를 생성하여 최신성, 열 수준 메트릭 및 사용자 지정 SQL 메트릭에 대한 경보 설정을 시작하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/data-obs/settings/integrations
[2]: /ko/monitors/types/data_observability/
[3]: /ko/integrations/amazon-web-services/