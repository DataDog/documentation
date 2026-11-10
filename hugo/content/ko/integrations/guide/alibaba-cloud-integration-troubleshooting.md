---
description: Datadog Alibaba Cloud 통합 문제 해결 단계
further_reading:
- link: https://docs.datadoghq.com/integrations/alibaba-cloud/
  tag: 통합
  text: Alibaba Cloud 통합
title: Alibaba Cloud 통합 문제 해결하기
---
## 개요 {#overview}

이 가이드를 사용하여 Datadog [Alibaba Cloud 통합][1] 문제를 해결하세요. 구성 문제는 [Alibaba Cloud 통합 타일][2]에 표시됩니다.

## Alibaba Cloud 액세스 키가 유효하지 않거나 존재하지 않음 {#alibaba-cloud-access-key-is-invalid-or-no-longer-exists}

이 문제는 통합을 위해 구성된 액세스 키 ID 또는 액세스 키 시크릿이 유효하지 않거나, 비활성 상태이거나, 삭제되었을 때 발생합니다.

이 문제를 해결하려면 다음 조치를 취하세요.

- 액세스 키가 비활성 상태인 경우 Alibaba Cloud RAM 콘솔에서 다시 활성화하세요.
- 액세스 키 시크릿이 유효하지 않은 경우 올바른 시크릿으로 Datadog 통합을 업데이트하세요.
- 액세스 키가 더 이상 존재하지 않거나 올바른 시크릿을 사용할 수 없는 경우 Datadog이 사용하는 RAM 사용자에 대한 대체 액세스 키를 생성하세요. 새 키 ID와 시크릿을 복사한 다음 Datadog 통합에서 Alibaba Cloud 자격 증명을 업데이트하세요. 지침은 Alibaba Cloud 설명서의 [AccessKey 쌍 생성][3]을 참조하세요.

그런 다음 RAM 사용자에게 [Alibaba Cloud 통합][1]에 필요한 권한이 있는지 확인하세요.

## 클라우드 모니터링 권한 누락 {#cloud-monitoring-permissions-are-missing}

이 문제는 Datadog 통합에서 사용하는 RAM 사용자가 CloudMonitor 메트릭을 쿼리할 수 없을 때 발생합니다.

이 문제를 해결하려면 Datadog 통합 RAM 사용자에 연결된 정책에 `cms:DescribeMetricList` 권한을 추가하세요. 그런 다음 약 15분 정도 기다린 후 다음 수집 주기에서 Datadog이 CloudMonitor 메트릭을 수신하는지 확인하세요.

RAM 정책 편집에 대한 지침은 [RAM 사용자에게 권한 부여][4]를 참조하세요.

## 로그 수집 권한 누락 {#log-collection-permissions-are-missing}

<!-- vale Datadog.words_case_insensitive = NO -->
이 문제는 Datadog 통합에서 사용하는 RAM 사용자에게 Simple Log Service(SLS)의 데이터를 읽는 데 필요한 권한이 없을 때 발생합니다.
<!-- vale Datadog.words_case_insensitive = YES -->

이 문제를 해결하려면 다음 조치를 취하세요.

1. Datadog 통합 RAM 사용자에 연결된 정책을 검토합니다.
2. [SLS RAM 액세스 제어 권한][8]에 설명된 SLS 읽기 권한을 추가합니다.
3. Datadog이 로그를 수집하도록 지정한 모든 SLS 프로젝트와 로그스토어에 해당 정책이 적용되는지 확인합니다.

RAM 정책 편집에 대한 지침은 [RAM 사용자에게 권한 부여][4]를 참조하세요.

## ACK용 Prometheus 권한 누락 {#prometheus-permissions-for-ack-are-missing}

이 문제는 Datadog 통합에서 사용하는 RAM 사용자에게 Alibaba Cloud Container Service for Kubernetes(ACK) 클러스터에서 Alibaba Cloud Managed Service for Prometheus를 구성하는 데 필요한 권한이 없을 때 발생합니다.

이 문제를 해결하려면 해당 RAM 사용자에 연결된 정책에 다음 권한을 추가하세요. 가능한 경우 정책의 범위를 대상 클러스터로 제한하세요. 정책에는 최소한 다음이 포함되어야 합니다.

- `cs:InstallClusterAddons`
- `cs:UnInstallClusterAddons`

이러한 권한을 통해 Datadog은 ACK 클러스터에 `ack-arms-prometheus` 애드온을 설치하고 재설치할 수 있습니다.

RAM 정책 편집에 대한 지침은 [RAM 사용자에게 권한 부여][4]를 참조하세요. 리소스 범위 지정 옵션은 [InstallClusterAddons][9]을 참조하세요.

<!-- vale Datadog.headings = NO -->
## Alibaba Cloud Resource Center 비활성화 {#alibaba-cloud-resource-center-is-not-enabled}
<!-- vale Datadog.headings = YES -->

이 문제는 계정에 Alibaba Cloud 리소스 센터가 활성화되지 않았을 때 발생합니다. 서비스를 활성화할 때까지 Datadog은 메트릭을 수집할 수 없습니다.

이 문제를 해결하려면 다음 조치를 취하세요.

1. Datadog에 연결된 Alibaba Cloud 계정에 로그인합니다.
2. [Resource Center][5]를 엽니다.
3. 계정에서 Resource Center를 활성화합니다.
4. Datadog 통합 RAM 사용자에 `AliyunResourceCenterReadOnlyAccess` 정책을 연결합니다.
5. 약 15분 정도 기다린 후 다음 수집 주기에서 Datadog이 메트릭을 수신하는지 확인합니다.

## Alibaba Cloud API 할당량 한도 도달 {#alibaba-cloud-api-quota-limit-reached}

이 문제는 계정이 Alibaba Cloud API 할당량 한도에 도달했을 때 발생합니다. 일시적인 요청 제한과는 다릅니다.

이 문제를 해결하려면 다음 조치를 취하세요.

1. Alibaba Cloud 계정의 할당량 및 청구 상태를 검토합니다.
2. 해당되는 경우 종량제 할당량을 활성화하거나 미결제 청구 문제를 해결합니다.
3. 기존 할당량이 부족한 경우 [할당량 증설 요청][6]을 진행합니다.
4. 할당량 변경이 적용될 때까지 기다린 후 Datadog이 수집을 재개하는지 확인합니다.

도움이 더 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: /ko/integrations/alibaba-cloud/
[2]: https://app.datadoghq.com/integrations?integrationId=alibaba-cloud
[3]: https://www.alibabacloud.com/help/en/ram/user-guide/create-an-accesskey-pair
[4]: https://www.alibabacloud.com/help/en/ram/user-guide/grant-permissions-to-a-ram-user
[5]: https://resourcecenter.console.aliyun.com/
[6]: https://www.alibabacloud.com/help/en/resource-management/user-guide/request-a-quota-increase
[7]: /ko/help/
[8]: https://www.alibabacloud.com/help/en/sls/log-service-ram-access-control-permissions-configuration
[9]: https://www.alibabacloud.com/help/en/ack/ack-managed-and-ack-dedicated/developer-reference/api-cs-2015-12-15-installclusteraddons