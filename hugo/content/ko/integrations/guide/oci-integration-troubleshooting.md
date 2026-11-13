---
description: Datadog OCI 통합 문제 해결 단계
further_reading:
- link: https://docs.datadoghq.com/integrations/oracle-cloud-infrastructure/
  tag: 통합
  text: OCI 통합
title: OCI 통합 문제 해결
---
## 개요 {#overview}

본 지침을 활용하여 Datadog [OCI 통합][1] 관련 문제를 해결하세요.

## 통합 문제 {#integration-issues}

[OCI 통합 타일][2]의 **Issues** 탭에서 OCI 통합 관련 구성 문제를 확인하세요.

## 유효하지 않은 Datadog API 또는 애플리케이션 키 자격 증명 {#invalid-datadog-api-or-app-key-credentials}

이 문제는 OCI 통합에 구성된 Datadog API 키 또는 애플리케이션 키가 만료되었거나 유효하지 않을 때 발생합니다. 두 키 모두 스택 적용 중에 유효성이 검증됩니다. 확인하려면 ORM 스택의 작업 로그에서 다음 오류를 찾아보세요.

```
Error: unexpected response code '403': {"errors":["Forbidden"]}

  with module.integration[0].restapi_object.datadog_tenancy_integration,
  on modules/integration/main.tf line 15, in resource "restapi_object" "datadog_tenancy_integration":
  15: resource "restapi_object" "datadog_tenancy_integration" {
```

이 문제를 해결하려면 새 자격 증명을 생성하고 통합 배포를 업데이트하세요.

1. Datadog 조직 설정에서 [API 키][6]로 이동하여 새 API 키를 생성합니다.
2. Datadog 조직 설정에서 [애플리케이션 키][8]로 이동하여 새 애플리케이션 키를 생성합니다.
3. 새 키로 통합 배포를 업데이트하고 다시 적용합니다.

{{< tabs >}}
{{% tab "빠른 시작(ORM 스택)" %}}

1. [Oracle Resource Manager 스택](https://cloud.oracle.com/resourcemanager/stacks)으로 이동하여 Datadog QuickStart 스택을 찾습니다.
2. 스택에서 **Edit**을 클릭합니다.
3. **Next**를 클릭하여 **Configure Variables** 페이지로 이동합니다.
4. **Datadog API 키** 및 **Datadog 애플리케이션 키** 값을 새 자격 증명으로 업데이트합니다.
5. **Next**를 클릭합니다.
6. **Save changes**를 클릭합니다.

{{% /tab %}}
{{% tab "Terraform" %}}

1. Terraform `.tf` 파일의 `datadog_api_key` 및 `datadog_app_key` 값을 새 자격 증명으로 업데이트합니다.
2. `terraform apply`를 실행하여 업데이트된 구성을 적용합니다.

{{% /tab %}}
{{< /tabs >}}

## 필요한 OCI IAM 권한 누락 {#required-oci-iam-permissions-are-missing}

Datadog이 OCI를 쿼리할 때 `403` 오류를 수신했으며, 이는 필요한 모든 IAM 권한이 부여되지 않았음을 나타냅니다.
OCI의 [정책 페이지][4]를 확인하여 `dd-svc-policy` 및 `dd-dynamic-group` 정책에 모든 **읽기 전용** 권한이 올바르게 구성되었는지 확인하세요.

## OCI 테넌시가 서비스 커넥터 허브 한도에 도달함 {#oci-tenancy-reaching-service-connector-hub-limit}

각 테넌시에 대해 5개의 구획마다 최소 하나의 서비스 커넥터 허브가 필요합니다. OCI 계정에서 [서비스 한도 증가를 요청][5]하세요.

## 하나 이상의 구독된 리전에서 데이터를 수집할 수 없음 {#cannot-collect-data-from-one-or-more-subscribed-regions}

Datadog 메트릭 및 로그를 전달하는 데 사용되는 애플리케이션 함수가 발견되지 않았습니다.
이를 해결하려면 OCI 테넌시에서 기존 Datadog 통합 ORM 스택을 다시 적용하세요. 

**참고**: 선택적 구성 섹션에 서브넷 OCID를 지정한 경우, 구독된 리전당 하나의 서브넷 OCID가 있는지 확인하세요. 기존 스택을 다시 적용하기 전에 다른 수정 작업을 수행하지 마세요.

## 메트릭이 수집되지 않음 {#metrics-not-being-collected}

모니터링되는 각 리전에 대해 다음 사항의 확인을 완료하세요.

1. 통합 구획에서 `dd-function-app` 함수 애플리케이션이 존재하는지 확인합니다.
2. `dd-function-app`에서 `dd-metrics-forwarder` 함수가 존재하는지 확인합니다.
3. 사용자 지정 서브넷을 사용하는 경우, 해당 서브넷이 [권한][7](5단계 이후 참고 사항에 자세히 설명됨)을 충족하는지 확인합니다.
4. Datadog에서 생성한 각 메트릭 서비스 커넥터 허브에 대해 해당 함수 타겟이 `dd-function-app`의 `dd-metrics-forwarder` 함수인지 확인합니다. Datadog에서 생성한 메트릭 커넥터 허브는 `dd-metrics-connectorhub-<suffix>` 형식을 사용합니다. 커넥터 허브가 다른 전달 함수 애플리케이션을 타겟으로 하는 경우, 이를 삭제하고 자동으로 다시 프로비저닝되도록 하세요.

## OCI 스택 제거 문제 {#oci-stack-destroy-issues}

제거 작업이 실패하거나 실행할 수 없는 경우:

1. [OCI 통합 리포지토리][11]를 복제한 후, 리포지토리 디렉터리로 이동합니다.
2. [OCI 통합 정리 스크립트][10]를 사용하여 남아 있는 리소스를 제거합니다.
3. 필수 변수를 설정합니다.
4. 드라이 런을 검토합니다.

    ```shell
    export OCI_PROFILE="<YOUR_OCI_PROFILE>"
    export COMPARTMENT_OCID="<YOUR_COMPARTMENT_OCID>"
    export TENANCY_OCID="<YOUR_TENANCY_OCID>"

    python3 oci-integration-cleanup/integration_cleanup.py \
      --profile "$OCI_PROFILE" \
      --compartment-ocid "$COMPARTMENT_OCID" \
      --dry-run true
    ```

5. 드라이 런 출력에서 삭제 예정인 리소스를 검토합니다. 출력이 올바르면 정리를 실행합니다.

    ```shell
    python3 oci-integration-cleanup/integration_cleanup.py \
      --profile "$OCI_PROFILE" \
      --compartment-ocid "$COMPARTMENT_OCID" \
      --confirm-tenancy-id "$TENANCY_OCID" \
      --region-workers <number of regions to be processed in parallel> \
      --dry-run false
    ```

## 오래된 통합 버전 {#outdated-integration-version}

이 문제는 Datadog 통합 ORM 스택 또는 Terraform 모듈이 최신 상태가 아닐 때 발생합니다. 이 문제를 해결하려면 배포를 최신 버전으로 업데이트하고 다시 적용하세요. 빠른 시작(ORM 스택) 및 Terraform에 대한 지침은 [통합 업데이트][8]를 참조하세요.

도움이 더 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: /ko/integrations/oracle-cloud-infrastructure
[2]: https://app.datadoghq.com/integrations?integrationId=oracle-cloud-infrastructure
[3]: /ko/help/
[4]: https://cloud.oracle.com/identity/domains/policies
[5]: https://docs.oracle.com/en/cloud/get-started/subscriptions-cloud/mmocs/requesting-service-limit-change.html
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://docs.datadoghq.com/ko/integrations/oracle-cloud-infrastructure/#deploy-the-quickstart-orm-stack
[8]: /ko/integrations/oracle-cloud-infrastructure/#update-the-integration
[9]: https://app.datadoghq.com/organization-settings/application-keys
[10]: https://github.com/DataDog/oracle-cloud-integration/tree/master/oci-integration-cleanup#readme
[11]: https://github.com/DataDog/oracle-cloud-integration