---
aliases:
- /ko/security/cloud_security_management/setup/agentless_scanning/quick_start
- /ko/security/cloud_security_management/setup/agentless_scanning/cloudformation
- /ko/security/cloud_security_management/setup/agentless_scanning/terraform
- /ko/security/cloud_security_management/setup/agentless_scanning/azure_resource_manager
- /ko/security/cloud_security_management/guide/agentless_aws_integration
- /ko/security/cloud_security_management/guide/agentless_terraform
further_reading:
- link: /security/cloud_security_management/setup
  tag: 설명서
  text: Cloud Security 설정
- link: /security/cloud_security_management/agentless_scanning
  tag: 설명서
  text: Cloud Security Agentless Scanning
title: Agentless Scanning 활성화
---

Agentless Scanning은 Datadog Agent를 설치하지 않고도 클라우드 인프라 내 존재하는 취약점에 대한 가시성을 제공합니다. Agentless Scanning의 기능 및 작동 방식에 관한 자세한 내용은 [Agentless Scanning][12] 문서를 참고하세요.

## 사전 필수 조건

Agentless Scanning을 설정하기 전에 다음 조건을 충족했는지 확인하세요.

- **Remote Configuration**: Datadog이 스캔할 클라우드 리소스 등 관련 정보를 Agentless 스캐너로 전송할 수 있도록 [Remote Configuration][3]을 활성화해야 합니다.
- **API 및 애플리케이션 키**:
  - 스캐너가 스캔 결과를 Datadog에 보고하려면 Remote Configuration이 활성화된 API 키가 필요합니다.
  - Datadog API를 통해 스캔 기능을 활성화하려면 **Integrations Manage** 또는 **Org Management** 권한이 있는 애플리케이션 키가 필요합니다.
- **Cloud permissions**: Agentless Scanning 인스턴스는 호스트, 호스트 이미지, 컨테이너 레지스트리, 함수를 스캔하기 위한 특정 권한이 필요합니다. 이러한 권한은 설치 과정의 일부로 자동으로 적용되며, 최소 권한 원칙에 따라 필수적인 스캔을 하는 데 필요한 최소한의 권한으로 엄격하게 제한됩니다.<br><br>
  {{< collapse-content title="AWS 스캔 권한" level="h5" >}}
  <p>Scanning permissions:</p>
  <ul>
    <li><code>ebs:GetSnapshotBlock</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ec2:CopySnapshot</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DeregisterImage</code></li>
    <li><code>ec2:DescribeSnapshotAttribute</code></li>
    <li><code>ec2:DescribeSnapshots</code></li>
    <li><code>ec2:DescribeVolumes</code></li>
    <li><code>ecr:BatchGetImage</code></li>
    <li><code>ecr:GetAuthorizationToken</code></li>
    <li><code>ecr:GetDownloadUrlForLayer</code></li>
    <li><code>kms:CreateGrant</code></li>
    <li><code>kms:Decrypt</code></li>
    <li><code>kms:DescribeKey</code></li>
    <li><code>lambda:GetFunction</code></li>
    <li><code>lambda:GetLayerVersion</code></li>
  </ul>
  <p>Sensitive Data Scanning(DSPM)이 활성화된 경우에만:</p>
  <ul>
    <li><code>kms:GenerateDataKey</code></li>
    <li><code>s3:GetObject</code></li>
    <li><code>s3:ListBucket</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Azure 스캔 권한" level="h5" >}}
  <ul>
    <li><code>Microsoft.Compute/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/disks/read</code></li>
    <li><code>Microsoft.Compute/disks/beginGetAccess/action</code></li>
    <li><code>Microsoft.Compute/disks/endGetAccess/action</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="GCP 스캔 권한" level="h5" >}}
  <ul>
    <li><code>compute.disks.create</code></li>
    <li><code>compute.disks.createSnapshot</code></li>
    <li><code>compute.disks.delete</code></li>
    <li><code>compute.disks.get</code></li>
    <li><code>compute.disks.setLabels</code></li>
    <li><code>compute.disks.use</code></li>
    <li><code>compute.globalOperations.get</code></li>
    <li><code>compute.images.get</code></li>
    <li><code>compute.instances.attachDisk</code></li>
    <li><code>compute.instances.detachDisk</code></li>
    <li><code>compute.snapshots.create</code></li>
    <li><code>compute.snapshots.get</code></li>
    <li><code>compute.snapshots.list</code></li>
    <li><code>compute.snapshots.delete</code></li>
    <li><code>compute.snapshots.setLabels</code></li>
  </ul>
  {{< /collapse-content >}}

## 설정

<div class="alert alert-danger">Agentless 스캐너를 실행하면 추가 비용이 발생합니다. 이러한 비용을 최적화하면서도 12시간 주기의 안정적인 스캔을 보장하기 위해 Datadog은 기본 템플릿으로 <a href="#terraform-setup">Terraform을 사용하여 Agentless Scanning을 설정</a>하는 것을 권장합니다.</div>

Agentless Scanning을 활성화하려면 다음 워크플로 중 하나를 사용하세요.

### 빠른 시작

신규 사용자를 위해 설계된 빠른 시작 워크플로는 Cloud Security를 위한 효율적인 설정 프로세스를 제공하여 AWS 리소스를 즉시 모니터링할 수 있도록 합니다. 구성 자동화에는 AWS CloudFormation을 사용합니다.

{{% collapse-content title="빠른 시작 설정 가이드" level="h4" id="quick-start-setup" %}}신규 사용자를 위해 설계된 빠른 시작 워크플로는 Cloud Security을 위한 효율적인 설정 프로세스를 제공하여 AWS 리소스를 즉시 모니터링할 수 있도록 합니다. AWS CloudFormation을 사용하여 구성을 자동화하고, Misconfigurations, Identity Risks(CIEM), Vulnerability Management와 같은 Cloud Security 기능을 포함합니다.

<div class="alert alert-info">이 문서에서는 AWS CloudFormation을 사용하여 Agentless Scanning을 설정하는 신규 사용자용 빠른 시작 워크플로를 안내합니다. 기존 사용자가 새 AWS 계정을 추가하거나 기존 통합 AWS 계정에서 Agentless Scanning을 활성화하려면 <a href="#terraform-setup">Terraform</a> 또는 <a href="#aws-cloudformation-setup">AWS CloudFormation</a> 가이드를 확인하세요.</div>

<div class="alert alert-danger">Agentless 스캐너를 실행하면 추가 비용이 발생합니다. 이러한 비용을 최적화하면서도 12시간 주기의 안정적인 스캔을 보장하기 위해 Datadog은 기본 템플릿으로 <a href="#terraform-setup">Terraform을 사용하여 Agentless Scanning을 설정</a>하는 것을 권장합니다.</div>

<div class="alert alert-danger">클라우드 스토리지용 Sensitive Data Scanner는 제한적 이용(Limited Availability) 상태입니다. 사용하려면<a href="https://www.datadoghq.com/private-beta/data-security">액세스를 요청하세요</a>.</div>

##### 설치

1. [Intro to Cloud Security][4] 페이지에서 **Get Started with Cloud Security**를 클릭합니다.
1. **Quick Start**를 클릭합니다. Agentless Scanning Quick Start에 포함된 기능을 보여주는 **Features** 페이지가 표시됩니다.
1. 계속하려면 **Start Using Cloud Security**를 클릭합니다.
1. CloudFormation 스택을 생성할 AWS 리전을 선택합니다.
1. Remote Configuratio에 대해 이미 구성된 API 키를 선택합니다. 선택한 API 키에 Remote Configuration이 활성화되어 있지 않다면 선택과 동시에 해당 키에 대한 Remote Configuration이 자동으로 활성화됩니다.
1. 클라우드 스토리지에 **Sensitive Data Scanner**를 활성화할지를 선택합니다. 이 기능은 Amazon S3 리소스에 저장된 민감 데이터를 자동으로 카탈로그화하고 분류합니다.
1. **Launch CloudFormation Template**을 클릭합니다. 새 창이 열리고 AWS CloudFormation 화면이 표시됩니다. 제공된 CloudFormation 템플릿을 사용하여 스택을 생성합니다. 템플릿에는 Agentless 스캐너를 배포하고 관리하는 데 필요한 IAM 권한이 포함되어 있습니다.

##### CloudFormation 스택 업데이트

Datadog은 새로운 기능과 버그 수정 사항이 출시될 때 이를 활용할 수 있도록 CloudFormation 스택을 정기적으로 업데이트할 것을 권장합니다. 업데이트 방법은 다음과 같습니다.
1. AWS 콘솔에 로그인하고 CloudFormation Stacks 페이지로 이동합니다.
2. **DatadogIntegration-DatadogAgentlessScanning-...** CloudFormation 서브 스택을 선택하고, **Update**를 클릭한 후 **Update nested stack**을 클릭합니다.
3. **Replace existing template**을 클릭합니다.
4. S3 URL`https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`에서 `<VERSION>`을  [aws_quickstart/version.txt][14]에 있는 버전으로 교체합니다. 해당 URL을 **Amazon S3 URL** 필드에 붙여넣습니다.
5. 다음 페이지를 수정하지 않고 넘어가려면 **Next**를 클릭한 다음 양식을 제출합니다.

{{% /collapse-content %}}

<br />

### Terraform

[Terraform Datadog Agentless Scanner 모듈][6]은 AWS, Azure 및 GCP용 Datadog Agentless 스캐너를 설치하기 위한 간단하고 재사용 가능한 구성을 제공합니다.

{{% collapse-content title="Terraform 설정 가이드" level="h4" id="terraform-setup" %}}이미 [Cloud Security을 설정][10]했고 새 클라우드 계정을 추가하거나 기존 통합 클라우드 계정에서 [Agentless Scanning[1]을 활성화하려는 경우 Terraform, [AWS CloudFormation][2] 또는 [Azure Resource Manager][5]를 사용할 수 있습니다. 이 문서에서는 Terraform 방식에 대한 상세 가이드를 제공합니다.

<div class="alert alert-info">Cloud Security를 처음 설정하는 경우 AWS CloudFormation을 사용하여 Agentless Scanning을 활성화하는 <a href="#quick-start-setup">빠른 시작 워크플로</a>를 따라 진행할 수 있습니다.</div>

{{< tabs >}}
{{% tab "새 AWS 계정 %}}

1. [Cloud Security Setup][1] 페이지에서 **Cloud Integrations > AWS**를 클릭합니다.
1. AWS 섹션 하단에서 **Add AWS accounts by following these steps**를 클릭합니다. **Add New AWS Account(s)** 대화 상자가 표시됩니다.
1. **Choose a method for adding your AWS account**에서 **Manually**를 선택합니다.
1. [Datadog Agentless Scanner 모듈][2] 설치 가이드를 따릅니다.
1. **I confirm that the Datadog IAM Role has been added to the AWS Account** 체크박스를 선택합니다.
1. **AWS Account ID**와 **AWS Role Name**을 입력합니다.
1. **Save**를 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "기존 AWS 계정" %}}

1. [Cloud Security Setup][1] 페이지에서 **Cloud Integrations > AWS**를 클릭합니다.
1. Agentless 스캐너를 배포하려는 AWS 계정에 **Edit scanning** 버튼({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}})을 클릭합니다.
1. **Enable Resource Scanning**은 켜져 있는 상태여야 합니다. 켜져 있지 않다면, **Enable Resource Scanning** 토글 스위치를 켭니다.
1. **How would you like to set up Agentless Scanning?** 섹션에서 **Terraform**을 선택합니다.
1. [Datadog Agentless Scanner 모듈][2] 설치 가이드를 따릅니다.
1. **I confirm the Terraform module is installed** 체크박스를 선택합니다.
1. **Done**을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "기존 Azure 계정" %}}

1. [Cloud Security Setup][1] 페이지에서 **Cloud Integrations > Azure**를 클릭합니다.
1. Agentless 스캐너를 배포하려는 구독이 포함된  Tenant를 확장합니다.
1. Agentless 스캐너를 배포하려는 Azure 계정에 **Enable** 버튼을 클릭합니다.
1. **Vulnerability Scanning** 토글 스위치를 켭니다.
1. **How would you like to set up Agentless Scanning?** 섹션에서 **Terraform**을 선택합니다.
1. [Datadog Agentless Scanner 모듈][2] 설치 가이드를 따릅니다.
1. **Done**을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme

{{% /tab %}}

{{% tab "기존 GCP 프로젝트" %}}

1. Cloud Security Setup][1] 페이지에서 **Cloud Integrations > GCP**를 클릭합니다.
1. Agentless 스캐너를 배포하려는 프로젝트가 포함된 계정을 확장합니다.
1. Agentless 스캐너를 배포하려는 GCP 프로젝트에서 **Enable** 버튼을 클릭합니다.
1. **Vulnerability Scanning** 토글 스위치를 켭니다.
1. [Datadog Agentless Scanner 모듈][2] 설치 가이드를 따릅니다.
1. **Done**을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme

{{% /tab %}}
{{< /tabs >}}

##### Terraform 모듈 버전 업데이트

Agentless Scanner 모듈에 `source` 레퍼런스를 최신 릴리스로 업데이트합니다. 최신 버전은 [GitHub Releases](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases)에서 확인할 수 있습니다.

사용 예시는 [Github 리포지토리](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples)를 참고하세요.

[1]: /ko/security/cloud_security_management/agentless_scanning
[2]: #aws-cloudformation-setup
[5]: #azure-resource-manager-setup

{{% /collapse-content %}}

<br />

### AWS Cloudformation

AWS CloudFormation 템플릿을 사용하여 CloudFormation 스택을 생성하세요. 이 템플릿에는 Agentless 스캐너를 배포하고 관리하는 데 필요한 IAM 권한이 포함되어 있습니다.

{{% collapse-content title="AWS CloudFormation 설정 가이드" level="h4" id="aws-cloudformation-setup" %}}
이미 [Cloud Security을 설정했고][10] 새 클라우드 계정을 추가하거나 기존 통합 AWS 계정에 [Agentless Scanning][1]을 활성화하려면 [Terraform][7] 또는 AWS CloudFormation을 사용할 수 있습니다. 이 문서는 AWS CloudFormation 방식에 대한 상세 가이드를 제공합니다.

<div class="alert alert-info">Cloud Security를 처음 설정하는 경우 AWS CloudFormation을 사용하여 Agentless Scanning을 활성화하는 <a href="#quick-start-setup">빠른 시작 워크플로</a>를 따라 진행할 수 있습니다.</div>

<div class="alert alert-danger">Agentless 스캐너를 실행하면 추가 비용이 발생합니다. 이러한 비용을 최적화하면서도 12시간 주기의 안정적인 스캔을 보장하기 위해 Datadog은 기본 템플릿으로 <a href="#terraform-setup">Terraform을 사용하여 Agentless Scanning을 설정</a>하는 것을 권장합니다.</div>

<div class="alert alert-danger">클라우드 스토리지용 Sensitive Data Scanner는 제한적 이용(Limited Availability) 상태입니다. 사용하려면<a href="https://www.datadoghq.com/private-beta/data-security">액세스를 요청하세요</a>.</div>

##### AWS CloudFormation 설정

{{< tabs >}}
{{% tab "새 AWS 계정 %}}

1. [Cloud Security Setup][1] 페이지에서 **Cloud Integrations** > **AWS**를 클릭합니다.
1. AWS 섹션 하단에서 **Add AWS accounts by following these steps**를 클릭합니다. **Add New AWS Account(s)** 대화 상자가 표시됩니다.
1. CloudFormation 스택을 생성할 AWS 리전을 선택합니다.
1. Remote Configuration에 대해 이미 구성된 API 키를 선택합니다. 선택한 API 키에 Remote Configuration이 활성화되어 있지 않다면 선택과 동시에 해당 키에 대한 Remote Configuration이 자동으로 활성화됩니다.
1. 클라우드 스토리지에 **Sensitive Data Scanner**를 활성화할지 여부를 선택합니다. 이 기능은 Amazon S3 리소스에 저장된 민감 데이터를 자동으로 카탈로그화하고 분류합니다.
1. **Launch CloudFormation Template**을 클릭합니다. 새 창이 열리고 AWS CloudFormation 화면이 표시됩니다. 제공된 CloudFormation 템플릿을 사용하여 스택을 생성합니다. 템플릿에는 Agentless 스캐너를 배포하고 관리하는 데 필요한 IAM 권한이 포함되어 있습니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "기존 AWS 계정" %}}

1. [Cloud Security Setup][1] 페이지에서 **Cloud Integrations** > **AWS**를 클릭합니다.
1. Agentless 스캐너를 배포하려는 AWS 계정의 **Edit** 버튼({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}})을 클릭합니다.
1. **Enable Resource Scanning** 토글이 켜져 있는지 확인합니다. 켜져 있지 않으면 **Enable Resource Scanning** 토글 스위치를 켜고 [New AWS Accoun][2]의 3~7단계를 완료합니다.
1. **Agentless Scanning** 섹션에서 **Enable Vulnerability Management (Host, Container and Lambda)** 토글 스위치를 켭니다.
1. **Enable Sensitive Data Scanner for Cloud Storage** 활성화 여부를 선택합니다. 이 기능을 사용하면 Amazon S3 리소스에 저장된 민감 데이터를 자동으로 카탈로그화하고 분류합니다.
1. **Done**을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: /ko/security/cloud_security_management/setup/agentless_scanning/enable?tab=newawsaccount#set-up-aws-cloudformation

{{% /tab %}}
{{< /tabs >}}

##### CloudFormation 스택 업데이트

Datadog은 새로운 기능과 버그 수정 사항이 출시될 때 이를 활용할 수 있도록 CloudFormation 스택을 정기적으로 업데이트할 것을 권장합니다. 업데이트 방법은 다음과 같습니다.
1. AWS 콘솔에 로그인하고 CloudFormation Stacks 페이지로 이동합니다.
2. **DatadogIntegration-DatadogAgentlessScanning-...** CloudFormation 서브 스택을 선택하고, **Update**를 클릭한 후 **Update nested stack**을 클릭합니다.
3. **Replace existing template**을 클릭합니다.
4. S3 URL`https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`에서 `<VERSION>`을  [aws_quickstart/version.txt][14]에 있는 버전으로 교체합니다. 해당 URL을 **Amazon S3 URL** 필드에 붙여넣습니다.
5. 다음 페이지를 수정하지 않고 넘어가려면 **Next**를 클릭한 다음 양식을 제출합니다.
{{% /collapse-content %}}

<br />

### Azure Resource Manager

Azure Resource Manager 템플릿을 사용하여  Agentless Scanner를 배포합니다. 이 템플릿에는 Agentless 스캐너를 배포하고 관리하는 데 필요한 역할 정의가 포함되어 있습니다.

{{% collapse-content title="Azure Resource Manager 설정 가이드" level="h4" id="azure-resource-manager-setup" %}}이미 [Cloud Security을 설정했고][10] 새 Azure 계정을 추가하거나 기존 통합 Azure 계정에서 [Agentless Scanning][1]을 활성화하려면 [Terraform][7] 또는 Azure Resource Manager를 사용할 수 있습니다. 이 문서에서는 Azure Resource Manager 방식에 대한 상세 가이드를 제공합니다.

<div class="alert alert-danger">Agentless 스캐너를 실행하면 추가 비용이 발생합니다. 이러한 비용을 최적화하면서도 12시간 주기의 안정적인 스캔을 보장하기 위해 Datadog은 기본 템플릿으로 <a href="#terraform-setup">Terraform을 사용하여 Agentless Scanning</a>을 설정하는 것을 권장합니다.</div>

{{< tabs >}}
{{% tab "새 Azure 계정" %}}

###### Datadog Azure 통합 설정

[Datadog Azure 통합][1] 설정 가이드를 따르세요.

{{% csm-agentless-azure-resource-manager %}}

[1]: /ko/integrations/guide/azure-manual-setup/?tab=azurecli
{{% /tab %}}

{{% tab "기존 Azure 계정" %}}

{{% csm-agentless-azure-resource-manager %}}

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## 설정

### 설정 확인

설정을 완료한 후 Datadog에서 스캔 결과를 확인하여 Agentless Scanning이 올바르게 작동하는지 확인할 수 있습니다. 결과는 일반적으로 첫 번째 스캔 주기가 완료된 후에 나타납니다.

스캔 결과는 다음 위치에서 확인할 수 있습니다.

- **호스트 및 컨테이너 취약점의 경우**: [CSM Vulnerabilities Explorer][15]. Agentless Scanning으로 감지된 취약점만 보려면 검색창에서 `origin:"Agentless scanner"` 필터를 사용합니다.
- **Lambda 취약점의 경우**: [Code Security(SCA) Explorer][16]
- **민감한 데이터 관련 결과**: [Sensitive Data Scanner][17]

### 스캔에서 리소스 제외

{{% csm-agentless-exclude-resources %}}

## Agentless Scanning 비활성화

{{< tabs >}}
{{% tab "AWS" %}}
1. [Cloud Security Setup][10] 페이지에서 **Cloud Integrations** > **AWS**를 클릭합니다.
1. 필요한 경우 필터를 사용하여 Agentless Scanning을 중지하려는 계정을 찾으세요. 해당 계정을 클릭하면 설정이 포함된 사이드 패널이 열립니다.
1. **Features** 탭에서 **Configure Agentless Scanning** 또는 **Manage**를 클릭하여 Agentless Scanning Setup 모달을 엽니다.
1. **How would you like to set up Agentless scanning?**에서 **Terraform**을 클릭합니다.
1. **Enable Features**에서 **Enable Agentless Vulnerability management** 옆 토글 스위치를 끕니다.
1. **Done**을 클릭합니다.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. [Cloud Security Setup][10] 페이지에서  **Cloud Integrations** > **Azure**를 클릭합니다.
1. 구독 테넌트를 찾고, 구독 목록을 확장한 다음, Agentless Scanning을 비활성화하려는 구독을 확인합니다.
1. **Enabled** 레이블 옆에 **Edit** 버튼({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}})을 클릭하고 Vulnerability Scanning 모달을 엽니다.
1. **Vulnerability Scanning** 옆 토글 스위치를 끕니다.
1. **Done**을 클릭합니다.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. [Cloud Security Setup][10] 페이지에서  **Cloud Integrations** > **GCP**를 클릭합니다.
1. Agentless Scanning을 비활성화하려는 프로젝트가 포함된 계정을 확장합니다.
1. **Enabled** 레이블 옆에 **Edit** 버튼({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}})을 클릭하고 Vulnerability Scanning 모달을 엽니다.
1. **Vulnerability Scanning** 옆 토글 스위치를 끕니다.
1. **Done**을 클릭합니다.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Agentless Scanning 제거

{{< tabs >}}
{{% tab "Terraform" %}}
Agentless Scanning을 제거하려면 Terraform 코드에서 스캐너 모듈을 제거합니다. 자세한 내용은 [Terraform 모듈][9] 문서를 참고하세요.

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
Agentless Scanning을 제거하려면 AWS 콘솔에 로그인하여 Agentless Scanning을 위해 생성된 CloudFormation 스택을 삭제합니다.
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Agentless Scanning을 제거하려면 Azure 계정에 로그인합니다. Agentless 스캐너 전용 리소스 그룹을 생성한 경우, 해당 리소스 그룹과 다음 Azure 역할 정의를 삭제합니다.
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

전용 리소스 그룹을 사용하지 않은 경우`Datadog:true` 및 `DatadogAgentlessScanner:true` 태그로 식별되는 스캐너 리소스를 수동으로 삭제해야 합니다.
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/agentless_scanning
[2]: /ko/integrations/amazon_web_services/
[3]: /ko/remote_configuration
[4]: https://app.datadoghq.com/security/csm/
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[7]: #terraform-setup
[8]: mailto:success@datadoghq.com
[10]: https://app.datadoghq.com/security/configuration/csm/setup
[11]: #aws-cloudformation-setup
[12]: /ko/security/cloud_security_management/agentless_scanning
[13]: #azure-resource-manager-setup
[14]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage