---
aliases:
- /ko/security/cloud_security_management/agentless_scanning/deployment_methods
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: 설명서
  text: Cloud Security Agentless Scanning
title: Agentless Scanning 배포하기
---

환경에 Agentless 스캐너를 배포하는 권장 방법은 교차 계정 스캔과 동일 계정 스캔, 두 가지가 있습니다.

{{< tabs >}}
{{% tab "교차 계정 스캔" %}}

교차 계정 스캔을 사용하면 Agentless 스캐너를 단일 클라우드 계정의 여러 리전에 배포할 수 있습니다. 배포된 Agentless 스캐너는 여러 계정 전반에 가시성을 제공하면서, 실제로 비용이 많이 드는 교차 리전 스캔을 할 필요가 없습니다.

호스트가 250개 이상인 대규모 계정이라면 가장 비용 효율적인 옵션입니다. 교차 리전 스캔을 방지하고 Agentless 스캐너 관리의 편의성을 높여줍니다. Agentless 스캐너 전용 계정을 생성하거나 기존 계정을 선택할 수 있으며, Agentless 스캐너가 있는 계정도 스캔할 수 있습니다.

다음 다이어그램은 에이전트 없는 스캐너를 중앙 클라우드 계정에 배포했을 때의 작동 방식을 나타냅니다.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Agentless 스캐너가 중앙 Cloud 계정에 배포됨을 보여주는 Agentless Scanning 다이어그램" width="90%" >}}

{{% /tab %}}
{{% tab "동일 계정 스캔" %}}

동일 계정 스캔을 사용하면 계정당 하나의 Agentless 스캐너가 배포됩니다. 이 방식은 계정별로 각 Agentless 스캐너가 교차 리전 스캔을 하여 비용이 더 발생할 수 있지만, 교차 계정 권한을 부여하고 싶지 않은 경우 Datadog에서는 이 옵션을 권장합니다.

다음 다이어그램은 에이전트 없는 스캐너를 각 Cloud 계정 내에 배포했을 때의 작동 방식을 나타냅니다.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Agentless 스캐너가 각 Cloud 계정에 배포됨을 보여주는 Agentless Scanning 다이어그램" width="90%" >}}

[3]: https://app.datadoghq.com/security/csm/vm
[4]: /ko/remote_configuration

{{% /tab %}}
{{< /tabs >}}

## 권장 구성
Agentless Scanning을 사용하면 클라우드 환경에서 스캐너 실행 시 [추가 클라우드 서비스 제공업체 비용][2]이 발생합니다. 비용을 관리하면서 12시간마다 안정적인 스캔을 보장하기 위해  Terraform을 기본 템플릿으로 사용하여 Agentless Scanning을 설정하는 것이 좋습니다. Terraform을 사용하면 리전별로 하나의 스캐너를 배포할 수 있어 교차 리전 네트워킹을 방지할 수 있습니다.
스캐너의 효율성을 높이려면 다음 설정 가이드라인을 따르세요.

- 단일 AWS 계정 내에 스캐너를 배포하세요.
- 호스트가 250개 이상인 각 리전에 스캐너를 배포하세요.
- [Cloud Storage Scanning][1]을 사용하는 경우 데이터 저장소가 있는 모든 리전에 스캐너를 배포하세요.

Datadog은 교차 리전 비용을 최소화하기 위해 스캔을 적절한 리전으로 자동 예약합니다.

**참고**: 실제 스캔된 데이터는 사용자 인프라에 남아 있으며, 수집된 패키지 목록과 수집된 호스트 관련 정보(호스트 이름/EC2 인스턴스)만 Datadog에 보고됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: /ko/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost