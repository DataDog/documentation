---
aliases:
- /ko/sensitive_data_scanner/setup/cloud_storage
description: Sensitive Data Scanner를 사용하여 Amazon S3 버킷에서 민감한 데이터를 스캔하도록 Datadog Agentless
  스캐너를 배포합니다. Remote Configuration 설정과 CloudFormation 또는 Terraform 배포를 다룹니다.
disable_toc: false
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: 설명서
  text: Cloud Security Agentless 스캐닝
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: 설명서
  text: 기본 제공 라이브러리 규칙에 대해 자세히 알아보기
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: 설명서
  text: 사용자 지정 규칙 만들기에 대해 자세히 알아보기
title: 클라우드 스토리지를 위한 Sensitive Data Scanner 설정
---
{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">선택한 사이트에서는 클라우드 스토리지 스캔을 사용할 수 없습니다({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>

{{< /site-region >}}

## 개요 {#overview}

클라우드 스토리지 리소스의 민감한 정보를 스캔하기 위해 환경에 Datadog Agentless 스캐너를 배포합니다. Agentless 스캐너는 귀하가 제어하고 환경 내에서 실행하는 EC2 인스턴스입니다. 스캐너는 [Remote Configuration][1]을 사용하여 S3 버킷 목록과 해당 종속성 목록을 검색합니다. 스캐너는 S3 버킷에 있는 CSV 및 JSON과 같은 다양한 유형의 텍스트 파일을 스캔합니다.

Agentless 스캐너가 [SDS 라이브러리 규칙][2]과 일치하는 항목을 찾으면, 스캔 인스턴스는 해당 규칙 유형과 일치 항목의 위치를 Datadog으로 전송합니다. **참고**: 클라우드 스토리지 리소스와 그 파일은 귀하의 환경에서만 읽히며, 스캔된 민감한 데이터는 Datadog으로 다시 전송되지 않습니다.

Sensitive Data Scanner [검색 결과 페이지][3]에서 스캔된 클라우드 스토리지 리소스와 발견된 일치 항목(일치하는 규칙 포함)을 확인할 수 있습니다.

이 문서는 다음 내용을 안내합니다:
- [Cloud Storage 용 Sensitive Data Scanner 사용을 위해 Remote Configuration 활성화](#enable-remote-configuration)
- [클라우드 스토리지를 위한 Sensitive Data Scanner 사용 시 고려해야 할 보안 사항](#security-considerations)
- CloudFormation[ 또는 ](#automatically-deploy-scanners-using-cloudformation)Terraform[을 사용하여 환경에 스캐너를 배포합니다](#manually-deploy-scanners-using-terraform)

## Enable Remote Configuration {#enable-remote-configuration}

Remote Configuration을 사용하면 Datadog이 배포된 스캐너로 구성 데이터(스캔할 클라우드 스토리지 리소스 등)를 전송할 수 있습니다. AWS 환경에서 Sensitive Data Scanner를 사용하려면 다음 사항을 확인해야 합니다:
- Datadog 조직에 대해 Remote Configuration이 활성화되어 있습니다.
- 스캐너가 배포된 AWS 계정에 대해 Remote Configuration이 활성화된 Datadog API 키를 사용하고 있습니다.

Remote Configuration은 대부분의 조직에서 기본적으로 활성화되어 있습니다. 이를 확인하려면 [Remote Configuration][4] 설정 페이지로 이동하십시오. 활성화되어 있지 않은 경우:
1. RBAC 권한에 [`org_management`][7]이 포함되어 있는지 확인하십시오.
1. Remote Configuration [설정 페이지][5]에서 {{< ui >}}Enable for your Organization{{< /ui >}} > {{< ui >}}Next Step{{< /ui >}}을 클릭합니다.
1. Remote Configuration과 함께 사용할 API 키를 검색하여 선택하고 {{< ui >}}Enable Keys{{< /ui >}}을 클릭합니다. 
1. {{< ui >}}Next Step{{< /ui >}} > {{< ui >}}Done{{< /ui >}}을 클릭합니다. Agent 나 트레이서와 같은 Datadog 구성 요소를 구성할 필요는 없습니다.

**참고**:
- 스캐너가 배포된 AWS 계정에만 Remote Configuration이 활성화된 Datadog API 키가 필요합니다.
- 권한이 있는 `org_management`관리자만 조직에 대해 Remote Configuration을 활성화할 수 있습니다. Remote Configuration이 활성화된 후에는 `api_keys_write` 권한이 있는 사용자만 개별 API 키에 대해 Remote Configuration을 활성화할 수 있습니다.

## 보안 고려 사항 {#security-considerations}

스캐너 인스턴스에 민감한 데이터에 대한 액세스 권한이 부여될 가능성이 있으므로, Datadog은 이러한 인스턴스에 대한 액세스를 관리자 사용자에게만 제한할 것을 권장합니다.

이 위험을 추가로 완화하기 위해 Datadog은 다음과 같은 보안 조치를 구현합니다.

- Datadog 스캐너는 귀하의 인프라 내에서 작동하며, 민감한 데이터 결과를 포함한 모든 데이터가 격리되고 안전하게 유지되도록 합니다.
- 스캐너와 Datadog 간의 모든 데이터 전송은 데이터 기밀성과 무결성을 보장하기 위해 업계 표준 프로토콜(예: HTTPS)을 사용하여 암호화됩니다.
- Datadog은 스캐너가 불필요한 액세스 없이 스캔을 수행할 수 있도록 스캐너에 필요한 권한을 신중하게 검토하고 제한합니다. 즉, 스캐너는 최소 권한 원칙에 따라 작동하며 효과적으로 수행하는 데 필요한 최소한의 권한만 부여받습니다.
- Datadog의 스캐너 인스턴스에서는 무인 보안 업데이트가 활성화되어 있습니다. 이 기능은 수동 개입 없이 중요한 보안 패치 및 업데이트를 설치하는 프로세스를 자동화합니다.
- Datadog 스캐너 인스턴스는 24시간마다 자동으로 교체됩니다. 이 교체 프로세스를 통해 스캐너 인스턴스는 최신 Ubuntu 이미지로 지속적으로 업데이트됩니다.
- 스캐너 인스턴스에 대한 액세스는 보안 그룹을 사용하여 엄격하게 제어됩니다. 스캐너에 대한 인바운드 액세스는 허용되지 않으므로 인스턴스 손상 위험이 더욱 줄어듭니다.

Amazon S3 버킷을 스캔하려면 다음 권한이 필요합니다.

- `s3:GetObject`
- `s3:ListBucket`
- `kms:Decrypt`
- `kms:GenerateDataKey`

## 스캐너 배포 {#deploy-scanners}

Agentless 스캐너는 귀하의 환경에서 실행되는 EC2 인스턴스입니다. 스캐너는 귀하의 S3 버킷에서 민감한 정보를 스캔합니다.

환경에 스캐너를 배포하는 방법에는 두 가지가 있습니다.
- [CloudFormation을 사용하여 자동 배포](#automatically-deploy-scanners-using-cloudformation)
- [Terraform을 사용하여 수동 배포](#manually-deploy-scanners-using-terraform)

### CloudFormation을 사용하여 스캐너 자동 배포 {#automatically-deploy-scanners-using-cloudformation}

CloudFormation을 사용하여 Agentless 스캐너를 배포하면 계정당 하나의 스캐너가 생성되며 해당 계정의 모든 리전에서 스캔이 수행됩니다. 스캐너가 배포될 리전을 설정합니다.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="각 계정의 스캐너가 해당 계정 내의 리전 전반을 스캔하는 모습을 보여주는 다이어그램" style="width:100%;" >}}

새 AWS 계정 또는 기존 AWS 계정에 스캐너를 추가할 수 있습니다.

{{< tabs >}}
{{% tab "새 AWS 계정" %}}

1. [Sensitive Data Scanner][1] 설정 페이지로 이동합니다.
1. {{< ui >}}Storage{{< /ui >}} 탭의 {{< ui >}}Cloud Settings{{< /ui >}} 섹션에서 {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}을(를) 클릭합니다.
1. {{< ui >}}Automatically using CloudFormation{{< /ui >}}을(를) 활성화된 상태로 둡니다.
1. 드롭다운 메뉴에서 AWS 리전을 선택합니다.
1. Remote Configuration에 대해 이미 구성된 API 키를 선택합니다. 선택한 API 키에 Remote Configuration이 활성화되어 있지 않으면, 선택 시 해당 키에 대해 Remote Configuration이 자동으로 활성화됩니다. **참고**: 권한이 있는 `api_keys_write`사용자만 개별 API 키에 대해 Remote Configuration을 활성화할 수 있습니다.
1. AWS 로그를 Datadog으로 보내려면 {{< ui >}}Yes{{< /ui >}}을(를) 선택된 상태로 둡니다.
1. Datadog Cloud Security를 사용하려면 {{< ui >}}Yes{{< /ui >}}을(를) 선택합니다.
1. {{< ui >}}Enable Sensitive Data Scanner{{< /ui >}} 은(는) 기본적으로 자동으로 선택됩니다. 이렇게 하면 CloudFormation이 AWS 관리형 SecurityAudit 정책을 Datadog AWS Integration 역할에 추가하고 Agentless Scanning을 활성화하여 클라우드 데이터 저장소 스캔을 시작합니다.
1. {{< ui >}}Launch CloudFormation Template{{< /ui >}}을 클릭합니다.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{% tab "기존 AWS 계정" %}}

1. [Sensitive Data Scanner][1] 설정 페이지로 이동합니다.
1. {{< ui >}}Storage{{< /ui >}} 탭의 {{< ui >}}AWS{{< /ui >}} 섹션에서:
    - 계정에서 Agentless Scanning이 이미 활성화된 경우:
      1. 해당 계정의 연필 아이콘을 클릭합니다.
      1. {{< ui >}}Enable Sensitive Data Scanning{{< /ui >}}을(를) 켜서 계정에 스캐너를 추가합니다.
      1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.
    - 계정에서 Agentless Scanning이 활성화되지 않은 경우:
      1. 민감한 데이터 스캔을 활성화하려는 계정의 더하기 아이콘을 클릭합니다.
      1. CloudFormation을 사용하여 스캐너를 추가하도록 선택합니다.
      1. 드롭다운 메뉴에서 AWS 리전을 선택합니다.
      1. Remote Configuration에 대해 이미 구성된 API 키를 선택합니다. 선택한 API 키에 Remote Configuration이 활성화되어 있지 않으면, 선택 시 해당 키에 대해 Remote Configuration이 자동으로 활성화됩니다.
      1. {{< ui >}}Enable Sensitive Data Scanning{{< /ui >}}을(를) 켜서 계정에 스캐너를 추가합니다.
      1. {{< ui >}}Launch CloudFormation Template{{< /ui >}}을 클릭합니다.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{< /tabs >}}

### Terraform을 사용하여 수동으로 스캐너 배포 {#manually-deploy-scanners-using-terraform}

[Terraform Module Datadog Agentless Scanner][7]을(를) 사용하여 Agentless 스캐너를 배포할 수 있습니다. 스캐너를 수동으로 배포하는 경우, Datadog은 다음 두 가지 설정 옵션 중 하나를 선택할 것을 권장합니다.

- Agentless 스캐너 전용 AWS 계정을 생성합니다. 각 리전에 클라우드 리소스를 스캔하려면 해당 리전마다 스캐너를 배포해야 합니다.

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="리전의 중앙 스캐너와 여러 계정에 걸쳐 스캔하는 스캐너를 보여주는 다이어그램입니다." style="width:100%;" >}}

- 스캔하려는 클라우드 리소스가 있는 모든 리전에 스캐너를 배포합니다.

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-region.png" alt="각 리전 내의 계정을 스캔하는 리전별 스캐너를 보여주는 다이어그램입니다." style="width:100%;" >}}

## 스캐닝 그룹 {#scanning-groups}

[Cloud Storage][6] 설정 페이지에서 {{< ui >}}Scanning Groups{{< /ui >}} 섹션은 읽기 전용입니다. 모든 [라이브러리 규칙][2]이 스캐닝 그룹 내에 적용됩니다.

## 클라우드 서비스 제공업체 비용 {#cloud-service-provider-cost}

Agentless Scanning을 사용할 경우 클라우드 환경에서 스캐너를 실행하는 데 추가 비용이 발생합니다.

스캐너 비용 견적을 확인하려면 [Datadog Customer Success Manager][8]에게 문의하십시오.

## Agentless Scanning 비활성화 {#disable-agentless-scanning}

1. [Sensitive Data Scanner][6] 설정 페이지로 이동합니다.
1. Agentless Scanning을 비활성화하려는 계정 옆의 연필 아이콘을 클릭합니다.
1. 을(를) 끔으로 전환합니다.{{< ui >}}Enable Sensitive Data Scanning{{< /ui >}}

## Agentless Scanning 제거 {#uninstall-agentless-scanning}

Agentless Scanning을 제거하려면 AWS 콘솔에 로그인하여 Agentless Scanning을 위해 생성된 CloudFormation 스택을 삭제하십시오.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/remote_configuration
[2]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/data-security
[4]: https://app.datadoghq.com/organization-settings/remote-config
[5]: https://app.datadoghq.com/organization-settings/remote-config/setup
[6]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security
[7]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[8]: mailto:success@datadoghq.com
[9]: /ko/account_management/rbac/permissions#access-management