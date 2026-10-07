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
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: 설명서
  text: Agentless Scanning 업데이트
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: 설명서
  text: Agentless Scanning 트러블슈팅
title: Agentless Scanning 활성화
---

Agentless Scanning은 Datadog Agent를 설치할 필요 없이 클라우드 인프라에 있는 취약점을 가시화할 수 있도록 도와줍니다. Agentless Scanning은 전체가 인프라 내에서 실행되어 Datadog으로 보내는 데이터는 최소로 하고 민감한 데이터를 외부로 보내지 않습니다. 스캐너가 클라우드 계정 내에서 실행되기 때문에 표준 [클라우드 공급자 비용][20]이 적용됩니다. 더 자세한 내용을 알아보려면 [Agentless Scanning 개요][12]를 참고하세요.

설정은 클라우드 계정별로 약 30분 정도 소요됩니다.

1. 아래 필수 요구 사항을 확인하세요.
1. 클라우드 제공자와 배포 방법을 선택합니다.
1. 클라우드 계정에서 템플릿을 실행합니다.
1. Datadog에서 스캔 결과를 확인합니다.

## 사전 필수 조건

Agentless Scanning을 설정하기 전에 다음 필수 조건을 충족하는지 확인하세요.

- **Remote Configuration**: Datadog 조직에 [Remote Configuration][3]이 활성화되어 있어야 Agentless 스캐너로 스캔 지침을 보낼 수 있습니다.
- **[API 및 Application Keys][1]**:
  - 스캐너가 스캔 결과를 Datadog으로 보내려면 Remote Configuration이 활성화된 API 키가 필요합니다.
  - Datadog API를 통해 스캔 기능을 활성화하려면 **Integrations Manage** 또는 **Org Management** 권한이 있는 **애플리케이션 키**가 필요합니다.
- **Cloud 권한**: Agentless Scanning 인스턴스는 호스트, 호스트 이미지, 컨테이너 레지스트리, 함수를 스캔하기 위한 특정 권한이 필요합니다. Datadog은 설치 시에 아래와 같은 권한을 자동으로 적용하며 투명성을 확보합니다.<br><br>
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
    <li><code>Microsoft.ContainerRegistry/registries/pull/read</code></li>
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

배포를 구조화하는 방법(계정 개수 및 리전 개수에 따른 스캐너 배포)에 관한 자세한 내용은 [Agentless Scanning 배포][2]를 참고하세요.

클라우드 공급자를 선택해 사용 가능한 설정 방법을 확인해 보세요. 여러 클라우드 공급자에 Agentless Scanning을 설정하는 경우, 각 공급자별로 독립적으로 설정을 완료해야 합니다.

{{< tabs >}}
{{% tab "AWS" %}}

### 설정 선택

- **Datadog 신규 사용자**: [Cloud Security 소개][2] 페이지에서 **Get Started with Cloud Security**를 클릭한 후 **Quick Start**를 선택합니다. Quick Start는 AWS CloudFormation을 사용하여 Cloud Security 기능을 모두 활성화한 상태로 Agentless Scanning 을 배포할 수 있는 가이드형 설정입니다. Cloud Security Management를 설정하지 않은 조직만 사용할 수 있습니다.
- **Datadog 내의 단일 AWS 계정**: [CloudFormation](#aws-cloudformation-setup) 또는 [Terraform](#aws-terraform-setup)을 사용하세요. 여러 리전에 배포할 경우에는 Terraform을 권장합니다.
- **여러 계정이 있는 AWS 조직**: [CloudFormation StackSet](#aws-cloudformation-stackset-setup)을 사용해 계정 멤버 전체에 스캔 기능을 배포하세요.
- **AWS 조직이 없이 여러 계정일 경우:** 각 계정에 [CloudFormation](#aws-cloudformation-setup) 또는 [Terraform](#aws-terraform-setup) 설정을 따로 적용하세요.

{{% collapse-content title="CloudFormation" level="h3" id="aws-cloudformation-setup" %}}
Datadog과 통합된 Datadog 계정이 있고 Agentless Scanning을 사용하고 싶거나 새 AWS 계정을 추가하고 싶을 경우에는 CloudFormation을 사용하세요.

#### 새 AWS 계정

1. [Cloud Security Setup][1] 페이지에서 **Cloud Integrations** > **AWS**를 클릭합니다.
1. AWS 섹션 하단에서 **Add AWS accounts by following these steps**를 클릭합니다. **Add New AWS Account(s)** 대화 상자가 표시됩니다.
1. CloudFormation 스택을 생성할 AWS 리전을 선택합니다.
1. [Remote Configuration][3]이 활성화된 API 키를 선택하세요.
1. 클라우드 스토리지에 **Sensitive Data Scanner**를 활성화할지 여부를 선택합니다. 이 기능은 Amazon S3 리소스에 저장된 민감 데이터를 자동으로 카탈로그화하고 분류합니다.
1. **Launch CloudFormation Template**을 클릭합니다. 새 창이 열리고 AWS CloudFormation 화면이 표시됩니다. 제공된 CloudFormation 템플릿을 사용하여 스택을 생성합니다. 템플릿에는 Agentless 스캐너를 배포하고 관리하는 데 필요한 IAM 권한이 포함되어 있습니다.

#### 기존 AWS 계정

1. [Cloud Security Setup][1] 페이지에서 **Cloud Integrations** > **AWS**를 클릭합니다.
1. Agentless 스캐너를 배포하고 싶은 AWS 계정을 선택하세요. 그러면 측면 패널이 열립니다.
1. **Features** 탭에서 **Configure Agentless Scanning** 또는 **Manage**를 클릭하여 Agentless Scanning Setup 모달을 엽니다.
1. **How would you like to set up Agentless Scanning?** 섹션에서 **CloudFormation**을 선택하세요.
1. [Remote Configuration][3]이 활성화된 API 키를 선택하세요.
1. 활성화하고 싶은 기능을 토글하세요. 예를 들어, **Vulnerability Management** 또는 **Sensitive Data Scanner** 중에 선택할 수 있습니다.
1. **Launch CloudFormation Template**을 클릭하세요. AWS CloudFormation 스크린이 있는 새 창이 열립니다. 기존 CloudFormation 템플릿을 사용해 새 스택을 생성하세요.
1. **Done**을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /ko/remote_configuration

{{% /collapse-content %}}
{{% collapse-content title="CloudFormation StackSet(여러 계정)" level="h3" id="aws-cloudformation-stackset-setup" %}}

여러 계정이 있는 AWS Organization의 경우, CloudFormation StackSet을 사용해 전체 멤버 계정에 Agentless Scanning 위임 역할을 배포하세요. 이 방법을 적용하면 AWS Organization에 추가된 새 계정의 온보딩과 구성이 자동화됩니다.

이 설정은 [계정간 스캐닝](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)에 필요한 위임 역할을 AWS Organization 전반, 또는 특정 OU(Organizational Unit)에 배포합니다. 먼저 [CloudFormation](#aws-cloudformation-setup) 또는 [Terraform]((#aws-terraform-setup)을 사용해 중앙 스캔 계정에 먼저 Agentless Scanning을 설정한 후 StackSet을 배포해 나머지 계정을 구성하세요.

#### 사전 필수 조건

1. AWS 관리 계정에 액세스합니다.
1. CloudFormation StackSets를 위해 [Trusted Access with AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html)이 먼저 활성화되어 있어야 합니다.
1. Agentless Scanning이 이미 중앙 스캐닝 계정에 구성되어 있습니다(위 참고).

#### StackSet 배포

1. AWS 관리 계정에 로그인하고 **CloudFormation > StackSets**으로 이동합니다.
1. **Create StackSet**를 클릭합니다.
1. **Service-managed permissions**를 선택합니다.
1. **Specify template** 아래에서 **Amazon S3 URL**을 선택하고 다음 URL을 입력합니다.
   ```
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.3.1/datadog_agentless_delegate_role_stackset.yaml
   ```
1. **StackSet name**을 입력합니다(예: `DatadogAgentlessScanningStackSet`).
1. **ScannerInstanceRoleARN** 파라미터를 구성합니다. 이 파라미터는 Agentless 스캐너 인스턴스에 연결된 IAM 역할의 ARN입니다.
      <div class="alert alert-danger"><code>ScannerInstanceRoleARN</code>은 스캐너 인스턴스 역할의 ARN과 정확히 일치해야 합니다(예: <code>arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole</code>).  <code>arn:aws:iam::123456789012:root</code>와 같은 루트 ARN을 사용하면 작동하지 않습니다.</div>
      <p><code>ScannerInstanceRoleARN</code>은 위임 역할(대상 계정에 생성됨)과 스캐너 인스턴스(중앙 계정에서 이미 실행 중) 간에 신뢰 관계를 수립합니다. 이처럼 계정간 스캐닝을 활성화하여 다음을 실행하세요.</p>
      <ul>
        <li>The scanner runs in Account 4.</li>
        <li>The delegate role exists in Accounts 1, 2, 3 (deployed through the StackSet).</li>
        <li>The scanner assumes the delegate roles to scan resources in those accounts.</li>
      </ul>
1. **Deployment targets**를 설정해 여러 AWS Organization 간, 또는 특정 OU로 배포합니다.
1. **Automatic deployment**를 활성해 AWS Organization에 추가된 새 계정을 구성합니다.
1. 배포를 위해 **single region**을 선택합니다(IAM 역할은 전역이며 계정별로 한 번만 배포하면 됨).
1. StackSet 검토 및 전송합니다.

StackSet 배포 후, 멤버 계정은 중앙 스캐너 계정의 계정간 스캔을 허용하도록 구성됩니다.
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="aws-terraform-setup" %}}

[Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner)은 Datadog Agentless 스캐너를 설치하는 데 재사용할 수 있는 구성을 제공합니다. 여러 리전이 있는 환경에서는 Terraform을 사용할 것을 권장합니다. Terraform은 리전별로 스캐너를 하나씩 배포하여 리전간 네트워킹 비용을 절감할 수 있습니다. 배포 토폴로지 선택과 관련한 안내는 [Agentless Scanning 배포](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)를 참고하세요. 멀티 지역 구성을 포함한 사용 사례는 GitHub 레포지토리에서 [예시 디렉터리](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples)를 참고하세요.

#### 새 AWS 계정

1. [Cloud Security Setup][1] 페이지에서 **Cloud Integrations** > **AWS**를 클릭합니다.
1. AWS 섹션 하단에서 **Add AWS accounts by following these steps**를 클릭합니다. **Add New AWS Account(s)** 대화 상자가 표시됩니다.
1. **Choose a method for adding your AWS account**에서 **Manually**를 선택합니다.
1. [Datadog Agentless Scanner 모듈][2] 설치 가이드를 따릅니다.
1. **I confirm that the Datadog IAM Role has been added to the AWS Account** 체크박스를 선택합니다.
1. **AWS Account ID**와 **AWS Role Name**을 입력합니다.
1. **Save**를 클릭합니다.

#### 기존 AWS 계정

1. [Cloud Security Setup][1] 페이지에서 **Cloud Integrations** > **AWS**를 클릭합니다.
1. Agentless 스캐너를 배포하고 싶은 AWS 계정을 클릭하여 측면 패널을 엽니다.
1. **Features** 탭에서 **Configure Agentless Scanning** 또는 **Manage**를 클릭하여 Agentless Scanning Setup 모달을 엽니다.
1. **How would you like to set up Agentless Scanning?** 섹션에서 **Terraform**을 선택합니다.
1. [Datadog Agentless Scanner 모듈][2] 설치 가이드를 따릅니다.
1. **I confirm the Terraform module is installed** 체크박스를 선택합니다.
1. **Done**을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /collapse-content %}}

위 설정 방법 중 하나를 완료한 후 [설정을 인증](#verify-your-setup)합니다.

[2]: https://app.datadoghq.com/security/csm/
[3]: /ko/remote_configuration

{{% /tab %}}

{{% tab "Azure" %}}

### 설정 선택
- **새 Azure 구독**: [Azure Resource Manager](#azure-resource-manager-setup)(권장) 또는 [Terraform](#azure-terraform-setup)을 사용하세요.
- **기존 Azure 구독**: [Azure Resource Manager](#azure-resource-manager-setup) 또는 [Terraform](#azure-terraform-setup)을 사용하세요.
- **여러 구독**: 반복 가능한 여러 구독 배포에는 [Terraform](#azure-terraform-setup)을 사용하세요.

{{% collapse-content title="Azure Resource Manager" level="h3" id="azure-resource-manager-setup" %}}
Azure Resource Manager 템플릿을 사용해 Agentless Scanner를 배포하세요. 이 템플릿에는 Agentless 스캐너를 배포하고 관리하는 데 필요한 역할 정의가 포함되어 있습니다.

#### 새 Azure 구독

<div class="alert alert-info"><a href="/integrations/guide/azure-manual-setup/?tab=azurecli">Datadog Azure 통합</a> 설정이 되어 있는지 확인합니다.</div>

{{% csm-agentless-azure-resource-manager %}}

#### 기존 Azure 구독

{{% csm-agentless-azure-resource-manager %}}

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="azure-terraform-setup" %}}

[Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner)은 Datadog Agentless 스캐너를 설치하는 데 재사용할 수 있는 구성을 제공합니다. 여러 리전이 있는 환경에서는 Terraform을 사용할 것을 권장합니다. 배포 토폴로지 선택과 관련한 안내는 [Agentless Scanning 배포](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)를 참고하세요. 사용 사례는 GitHub 레포지토리에서 [예시 디렉터리](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples)를 참고하세요.

1. [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) 페이지에서 **Cloud Integrations** > **Azure**를 클릭합니다.
1. Agentless 스캐너를 배포하려는 구독이 포함된  Tenant를 확장합니다.
1. Agentless 스캐너를 배포하고 싶은 위치에서 Azure 구독을 위해 **Enable** 버튼을 누르세요.
1. **Vulnerability Scanning** 토글 스위치를 켭니다.
1. **How would you like to set up Agentless Scanning?** 섹션에서 **Terraform**을 선택합니다.
1. [Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme) 설치 안내를 따르세요.
1. **Done**을 클릭합니다.

{{% /collapse-content %}}

위 설정 방법 중 하나를 완료한 후 [설정을 인증](#verify-your-setup)합니다.

{{% /tab %}}

{{% tab "GCP" %}}

### 설정 선택

- **GCP 신규 고객**: [GCP 통합을 먼저 설정][25]하고 Agentless Scanning을 활성화하세요.
- **기존에 통합된 GCP 프로젝트**: [Cloud Shell](#gcp-cloud-shell-setup)(권장) 또는 [Terraform](#gcp-terraform-setup)을 사용하세요.

<div class="alert alert-info">아직 GCP 프로젝트를 Datadog으로 연결하지 않은 경우, <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp">먼저 GCP 통합을 </a>설정하세요.</div>

{{% collapse-content title="Cloud Shell" level="h3" id="gcp-cloud-shell-setup" %}}
Google Cloud Shell을 사용해 GCP 프로젝트용 Agentless Scanning을 설정하세요. 이 방법은 [GCP용 Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme)을 래핑하는 [설정 스크립트](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless)를 다운로드하기 때문에 직접 Terraform을 관리할 필요가 없습니다. 실행하기 전에 스크립트를 검토할 수 있습니다.

**GCP 권한 필요:** Cloud Shell에서 사용하는 ID에 프로젝트 **Owner** 또는 이와 동등한 수준의 권한이 있어야 합니다. 스크립트가 Terraform 문의 GCS 버킷을 생성하기 때문에 해당 프로젝트의 **Storage** 권한도 필요합니다(예: `roles/storage.admin` 또는 `storage.buckets.create` / `storage.buckets.get` / `storage.buckets.update`). 또는 기존 버킷 이름에 `TF_STATE_BUCKET` 환경 변수를 사용해 **기존 버킷을 재사용**할 수도 있습니다. 이 경우 스크립트에서 버킷을 생성하지 않습니다. "Terraform 문 스토리지"에 403 오류가 발생한 경우, 트러블슈팅 가이드에서 [GCP: 문 버킷 생성 실패][26]를 참고하세요.

1. [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) 페이지에서 **Cloud Integrations** > **GCP**를 클릭하세요.
1. Agentless 스캐너를 배포하려는 프로젝트가 포함된 계정을 확장합니다.
1. Agentless 스캐너를 배포하고 싶은 위치의 GCP 프로젝트에서 **Enable** 버튼을 클릭하세요. **Vulnerability Scanning** 모달이 열립니다.
1. **How would you like to set up Agentless Scanning?** 섹션에서 **Cloud Shell**을 선택하세요.
1. [Remote Configuration](/remote_configuration)이 활성화되어 있는 **API key**를 선택하세요. 애플리케이션 키는 자동으로 생성됩니다.
1. 스캔하고 싶은 **GCP 프로젝트**를 선택하세요.
1. 스캐너 구성:
   - 이미 배포한 스캐너가 있는 경우에는 **use an existing scanner**(권장)를 선택하고, 그 외에는 **deploy a new scanner**를 선택합니다.
   - 새 스캐너를 배포할 경우, 스캐너 프로젝트를 선택(선택한 프로젝트 중 하나여야 함)하세요. Datadog에서는 호스트가 150개 이상인 리전마다 스캐너를 설치할 것을 권장합니다.
1. **Copy command**를 클릭해 생성된 명령을 복사하고**Open Google Cloud Shell**을 클릭해 [Google Cloud Shell](https://ssh.cloud.google.com/cloudshell)을 엽니다. 명령을 검토하고 실행합니다. 스크립트가 [GCP용 Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme)에 적용되어 선택한 프로젝트와 리전에 스캐너가 배포 및 구성됩니다.
1. 명령이 완료된 후에 Datadog 설정 페이지로 돌아가서 **Done**을 클릭합니다.
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="gcp-terraform-setup" %}}
[Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner)은 Datadog Agentless 스캐너를 설치하는 데 재사용할 수 있는 구성을 제공합니다. 여러 리전이 있는 환경에서는 Terraform을 사용할 것을 권장합니다. 배포 토폴로지 선택과 관련한 안내는 [Agentless Scanning 배포](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)를 참고하세요. 사용 사례는 GitHub 레포지토리에서 [예시 디렉터리](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples)를 참고하세요.

1. [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) 페이지에서 **Cloud Integrations** > **GCP**를 클릭하세요.
1. Agentless 스캐너를 배포하려는 프로젝트가 포함된 계정을 확장합니다.
1. Agentless 스캐너를 배포하려는 GCP 프로젝트에서 **Enable** 버튼을 클릭합니다.
1. **Vulnerability Scanning** 토글 스위치를 켭니다.
1. [Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) 설치 안내를 따르세요.
1. **Done**을 클릭합니다.
{{% /collapse-content %}}

위 설정 방법 중 하나를 완료한 후 [설정을 인증](#verify-your-setup)합니다.

[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp
[26]: /ko/security/cloud_security_management/troubleshooting/agentless_scanning#gcp-failed-to-create-state-bucket-storagebucketscreate-403

{{% /tab %}}
{{< /tabs >}}

## 설정 확인

설정 완료 후에 Agentless Scanning가 첫 결과를 내놓는 데 시간이 걸립니다. 이 첫 스캔 주기는 약 30분 정도가 소요됩니다.

<div class="alert alert-info">2시간 후에도 아무런 결과나 나타나지 않으면 <a href="/security/cloud_security_management/troubleshooting/agentless_scanning">Agentless Scanning 트러블슈팅 가이드</a>를 참고하세요.</div>

스캔 결과는 다음 위치에서 확인할 수 있습니다.

- **호스트 및 컨테이너 취약점의 경우**: [Cloud Security Vulnerabilities Explorer][15]. Agentless Scanning으로 감지된 취약점만 보려면 검색창에서 `origin:"Agentless scanner"` 필터를 사용합니다.
- **Lambda 취약점의 경우**: [Code Security(SCA) Explorer][16].
- **민감한 데이터 관련 결과**: [Sensitive Data Scanner][17].

## 스캔에서 리소스 제외

특정 호스트, 컨테이너, 또는 함수를 스캔에서 제와하려면 [Resource Evaluation Filters](/security/cloud_security_management/guide/resource_evaluation_filters)를 참고하세요.

## Agentless Scanning 비활성화

{{< tabs >}}
{{% tab "AWS" %}}
1. [Cloud Security Setup][10] 페이지에서 **Cloud Integrations** > **AWS**를 클릭합니다.
1. 필요한 경우 필터를 사용하여 Agentless Scanning을 중지하려는 계정을 찾으세요. 해당 계정을 클릭하면 설정이 포함된 측면 패널이 열립니다.
1. **Features** 탭에서 **Configure Agentless Scanning** 또는 **Manage**를 클릭하여 Agentless Scanning Setup 모달을 엽니다.
1. **How would you like to set up Agentless Scanning?**에서 **Terraform**을 클릭합니다.
1. **Enable Features**에서 **Enable Agentless Vulnerability management** 옆 토글 스위치를 끕니다.
1. **Done**을 클릭합니다.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. [Cloud Security Setup][10] 페이지에서  **Cloud Integrations** > **Azure**를 클릭합니다.
1. 구독 테넌트를 찾고, 구독 목록을 확장한 다음, Agentless Scanning을 비활성화하려는 구독을 확인합니다.
1. **Enabled** 레이블 옆에 **Edit** 버튼({{< img src="security/csm/setup/edit-button.png" alt="Edit" inline="true" style="width:24px;">}})을 클릭하고 Vulnerability Scanning 모달을 엽니다.
1. **Vulnerability Scanning** 옆 토글 스위치를 끕니다.
1. **Done**을 클릭합니다.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. [Cloud Security Setup][10] 페이지에서  **Cloud Integrations** > **GCP**를 클릭합니다.
1. Agentless Scanning을 비활성화하려는 프로젝트가 포함된 계정을 확장합니다.
1. **Enabled** 레이블 옆에 **Edit** 버튼({{< img src="security/csm/setup/edit-button.png" alt="Edit" inline="true" style="width:24px;">}})을 클릭하고 Vulnerability Scanning 모달을 엽니다.
1. **Vulnerability Scanning** 옆 토글 스위치를 끕니다.
1. **Done**을 클릭합니다.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Agentless Scanning 제거

Agentless Scanning을 설치할 때 사용한 배포 방법을 선택하세요.

{{< tabs >}}
{{% tab "Terraform" %}}
Agentless Scanning을 제거하려면 Terraform 코드에서 스캐너 모듈을 제거합니다. 자세한 내용은 [Terraform 모듈][9] 문서를 참고하세요.

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
Agentless Scanning을 제거하려면 AWS 콘솔에 로그인하여 Agentless Scanning을 위해 생성된 CloudFormation 스택을 삭제합니다(서브 스택 이름은 `DatadogIntegration-DatadogAgentlessScanning-...` 패턴임).
{{% /tab %}}

{{% tab "GCP Cloud Shell" %}}
Google Cloud Shell을 사용해 설정된 Agentless Scanning을 삭제하려면 설치할 때 사용한 설정 명령을 실행하되, 마지막에 `deploy`를 `destroy`로 바꿉니다. 다음 예를 참고하세요.

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o gcp_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_PROJECT="<SCANNER_PROJECT>" \
SCANNER_REGIONS="<SCANNER_REGIONS>" \
PROJECTS_TO_SCAN="<PROJECTS>" \
python3 gcp_agentless_setup.pyz destroy
```

명령을 실행하기 전에 [설정 스크립트 소스][21]를 검토할 수 있습니다.

[21]: https://github.com/DataDog/integrations-management/tree/main/gcp/agentless
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Agentless Scanning을 제거하려면 Azure 구독에 로그인합니다. Agentless 스캐너 전용 리소스 그룹을 생성한 경우, 해당 리소스 그룹과 다음 Azure 역할 정의를 삭제합니다.
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

전용 리소스 그룹을 사용하지 않은 경우`Datadog:true` 및 `DatadogAgentlessScanner:true` 태그로 식별되는 스캐너 리소스를 수동으로 삭제해야 합니다.
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/api-app-keys/
[2]: /ko/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[3]: /ko/remote_configuration
[12]: /ko/security/cloud_security_management/agentless_scanning
[20]: /ko/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage