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
  text: Agentless Scanning 문제 해결
title: Agentless Scanning 활성화
---
Agentless Scanning은 Datadog Agent를 설치하지 않아도 클라우드 인프라 내에 존재하는 취약성에 대한 가시성을 제공합니다. Agentless Scanning은 사용자 인프라 내에서 완전히 실행되며, 최소한의 데이터만 Datadog으로 전송하고 민감한 데이터는 사용자 환경 내에 유지합니다. 스캐너가 사용자 클라우드 계정에서 실행되므로 표준 [클라우드 공급자 비용][20]이 적용됩니다. 자세한 내용은 [Agentless Scanning 개요][12]를 참조하세요.

설정에는 클라우드 계정당 약 30분이 소요됩니다.

1. 아래의 전제 조건을 확인합니다.
1. 클라우드 공급자와 배포 방법을 선택합니다.
1. 클라우드 계정에서 템플릿을 실행합니다.
1. Datadog에서 스캔 결과를 확인합니다.

## 전제 조건 {#prerequisites}

Agentless Scanning을 설정하기 전에 다음 전제 조건이 충족되었는지 확인하세요.

- **Remote Configuration**: 스캔 지침을 Agentless 스캐너로 전송하려면 Datadog 조직에서 [Remote Configuration][3]이 활성화되어 있어야 합니다.
- **[API 및 애플리케이션 키][1]**:
  - 스캐너가 Datadog에 스캔 결과를 보고하려면 Remote Configuration이 활성화된 {{< ui >}}API key{{< /ui >}}가 필요합니다.
  - Datadog API를 통해 스캔 기능을 활성화하려면 `Integrations Manage` 또는 `Org Management` 권한이 있는 {{< ui >}}Application key{{< /ui >}}가 필요합니다.
- **클라우드 권한**: Agentless Scanning 인스턴스가 호스트, 호스트 이미지, 컨테이너 레지스트리 및 함수를 스캔하려면 특정 권한이 필요합니다. Datadog은 설치 중 투명성을 위해 아래에 나열된 이러한 권한을 자동으로 적용합니다.<br><br>
  {{< collapse-content title="AWS 스캔 권한" level="h3" >}}
  <p>스캔 권한:</p>
  <ul>
    <li><code>ebs:GetSnapshotBlock</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ec2:CopySnapshot</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DeregisterImage</code></li>
    <li><code>ec2:DescribeImages</code></li>
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
  <p>민감한 데이터 스캔(DSPM)이 활성화된 경우에만:</p>
  <ul>
    <li><code>kms:GenerateDataKey</code></li>
    <li><code>s3:GetObject</code></li>
    <li><code>s3:ListBucket</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Azure 스캔 권한" level="h3" >}}
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
    <li><code>Microsoft.Compute/galleries/images/versions/read</code></li>
    <li><code>Microsoft.ContainerRegistry/registries/pull/read</code></li>
    <li><code>Microsoft.ContainerRegistry/registries/repositories/content/read</code> (데이터 액션)</li>
    <li><code>Microsoft.Web/sites/read</code></li>
    <li><code>Microsoft.Web/sites/publish/Action</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="GCP 스캔 권한" level="h3" >}}
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

## 설정 {#setup}

스캐너를 배포할 계정 수와 리전 수를 포함하여 배포를 구성하는 방법에 대한 자세한 내용은 [Agentless Scanning 배포][2]를 참조하세요.

사용 가능한 설정 방법을 보려면 클라우드 공급자를 선택하세요. 여러 클라우드 공급자에서 Agentless Scanning을 설정하는 경우 각 공급자에 대해 설정을 독립적으로 완료하세요.

{{< tabs >}}
{{% tab "AWS" %}}

### 설정 선택 {#choose-your-setup}

- **Datadog을 처음 사용하는 경우**: [Intro to Cloud Security][2] 페이지에서 {{< ui >}}Get Started with Cloud Security{{< /ui >}}를 클릭한 다음 {{< ui >}}Quick Start{{< /ui >}}를 클릭하세요. Quick Start는 AWS CloudFormation을 사용하여 모든 Cloud Security 기능을 미리 활성화한 상태로 Agentless Scanning을 배포하는 안내 설정 흐름입니다. Cloud Security Management를 아직 설정하지 않은 조직에서만 사용할 수 있습니다.
- **Datadog의 단일 AWS 계정**: [CloudFormation](#aws-cloudformation-setup) 또는 [Terraform](#aws-terraform-setup)을 사용하세요. 다중 리전 배포에는 Terraform이 권장됩니다.
- **여러 계정이 있는 AWS 조직**: [CloudFormation StackSet](#aws-cloudformation-stackset-setup)를 사용하여 모든 멤버 계정에 스캔 기능을 배포하세요.
- **AWS Organizations를 사용하지 않는 다중 계정**: 각 계정에 대해 [CloudFormation](#aws-cloudformation-setup) 또는 [Terraform](#aws-terraform-setup) 설정을 개별적으로 반복하세요.

{{% collapse-content title="CloudFormation" level="h4" id="aws-cloudformation-setup" %}}
Datadog과 통합된 AWS 계정이 이미 있는 상태에서 Agentless Scanning을 활성화하거나 새 AWS 계정을 추가하려면 CloudFormation을 사용하세요.

#### 새 AWS 계정 {#new-aws-account}

1. [Cloud Security Setup][1] 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}를 클릭합니다.
1. AWS 섹션 하단에서 {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}를 클릭합니다. {{< ui >}}Add New AWS Account(s){{< /ui >}} 대화 상자가 표시됩니다.
1. {{< ui >}}Add a Single AWS Account{{< /ui >}} 및 {{< ui >}}CloudFormation{{< /ui >}} 옵션을 선택합니다.
1. CloudFormation 스택을 생성할 AWS 리전을 선택합니다.
1. [Remote Configuration][3]이 활성화된 API 키를 선택합니다.
1. 클라우드 스토리지에 대해 {{< ui >}}Sensitive Data Scanner{{< /ui >}}를 활성화할지 여부를 선택합니다. 이 기능은 Amazon S3 리소스의 민감한 데이터를 자동으로 카탈로그화하고 분류합니다.
1. {{< ui >}}Launch CloudFormation Template{{< /ui >}}을 클릭합니다. 새 창이 열리고 AWS CloudFormation 화면이 표시됩니다. 제공된 CloudFormation 템플릿을 사용하여 스택을 생성합니다. 이 템플릿에는 Agentless 스캐너를 배포하고 관리하는 데 필요한 IAM 권한이 포함되어 있습니다.

#### 기존 AWS 계정 {#existing-aws-account}

1. [Cloud Security Setup][1] 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}를 클릭합니다.
1. Agentless 스캐너를 배포할 AWS 계정을 클릭하여 사이드 패널을 엽니다.
1. {{< ui >}}Features{{< /ui >}} 탭에서 {{< ui >}}Configure Agentless Scanning{{< /ui >}} 또는 {{< ui >}}Manage{{< /ui >}}를 클릭하여 Agentless Scanning Setup 모달을 엽니다.
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} 섹션에서 {{< ui >}}CloudFormation{{< /ui >}}을 선택합니다.
1. CloudFormation 스택에 해당하는 AWS 리전을 선택합니다.
1. [Remote Configuration][3]이 활성화된 API 키를 선택합니다.
1. Datadog이 생성하는 새 애플리케이션 키를 복사합니다.
1. 다음 중 하나를 선택합니다.
   - 기존 스캐너를 사용한 다음 사용할 스캐너를 선택합니다.
   - 새 스캐너를 배포합니다.
1. 활성화할 기능(예: {{< ui >}}Agentless Vulnerability Management{{< /ui >}} 또는 {{< ui >}}Sensitive Data Scanning for Cloud Storage{{< /ui >}})을 전환합니다.
1. {{< ui >}}Launch CloudFormation Template{{< /ui >}}을 클릭합니다. 새 창이 열리고 AWS CloudFormation 화면이 표시됩니다. 제공된 CloudFormation 템플릿을 사용하여 스택을 생성합니다.
1. {{< ui >}}Done{{< /ui >}}을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /ko/remote_configuration

{{% /collapse-content %}}
{{% collapse-content title="CloudFormation StackSet(다중 계정)" level="h4" id="aws-cloudformation-stackset-setup" %}}

여러 계정이 있는 AWS 조직의 경우 CloudFormation StackSet를 사용하여 모든 멤버 계정에 Agentless Scanning 위임 역할을 배포합니다. 이 접근 방식을 적용하면 온보딩이 자동화되고 AWS 조직에 추가되는 새 계정이 구성됩니다.

이 설정은 AWS 조직 또는 특정 조직 단위(OU) 전체에서 [계정 간 스캔](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)에 필요한 위임 역할을 배포합니다. 먼저 [CloudFormation](#aws-cloudformation-setup) 또는 [Terraform](#aws-terraform-setup)을 사용하여 중앙 스캔 계정에 Agentless Scanning을 설정한 다음 StackSet를 배포하여 나머지 계정을 구성하세요.

#### 전제 조건 {#prerequisites-1}

- AWS 관리 계정에 대한 액세스 권한
- [Trusted Access with AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html)가 CloudFormation StackSets에 대해 활성화되어 있어야 함
- 중앙 스캔 계정에 Agentless Scanning이 이미 구성되어 있음([위 참조](#aws-cloudformation-setup))

#### StackSet 배포 {#deploy-the-stackset}

1. AWS 관리 계정에 로그인하고 {{< ui >}}CloudFormation{{< /ui >}} > {{< ui >}}StackSets{{< /ui >}}로 이동합니다.
1. {{< ui >}}Create StackSet{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Service-managed permissions{{< /ui >}}를 선택합니다.
1. {{< ui >}}Specify template{{< /ui >}}에서 {{< ui >}}Amazon S3 URL{{< /ui >}}을 선택하고 다음 URL을 입력합니다.
   ```
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.22.1/datadog_agentless_delegate_role_stackset.yaml
   ```
1. {{< ui >}}StackSet name{{< /ui >}}을 입력합니다(예: `DatadogAgentlessScanningStackSet`).
1. Agentless 스캐너 인스턴스에 연결된 IAM 역할의 ARN인 {{< ui >}}ScannerInstanceRoleARN{{< /ui >}} 파라미터를 구성합니다.
      <div class="alert alert-danger"> <code>ScannerInstanceRoleARN</code> 은 스캐너 인스턴스 역할의 정확한 ARN이어야 합니다(예: <code>arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole</code>). 루트 ARN(예: <code>arn:aws:iam::123456789012:root</code> )은 사용할 수 없습니다.</div>
      <p> <code>ScannerInstanceRoleARN</code> 은 위임 역할(대상 계정에 생성됨)과 스캐너 인스턴스(중앙 계정에서 이미 실행 중) 간의 신뢰 관계를 설정합니다. 이를 통해 다음과 같은 계정 간 스캔이 가능해집니다.</p>
      <ul>
        <li>스캐너가 계정 4에서 실행됩니다.</li>
        <li>위임 역할이 계정 1, 2, 3에 존재합니다(StackSet를 통해 배포됨).</li>
        <li>스캐너가 위임 역할을 수임하여 해당 계정의 리소스를 스캔합니다.</li>
      </ul>
1. AWS 조직 또는 특정 OU에 배포할 {{< ui >}}Deployment targets{{< /ui >}}를 설정합니다.
1. {{< ui >}}Automatic deployment{{< /ui >}}를 활성화하여 AWS 조직에 추가되는 새 계정을 구성합니다.
1. 배포할 리전 하나를 선택합니다(IAM 역할은 전역이며 계정당 한 번만 배포하면 됨).
1. StackSet를 검토하고 제출합니다.

StackSet가 배포된 후 멤버 계정은 중앙 스캐너 계정에서 계정 간 스캔을 허용하도록 구성됩니다.
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="aws-terraform-setup" %}}

[Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner)은 Datadog Agentless 스캐너를 설치하기 위한 재사용 가능한 구성을 제공합니다. Terraform은 다중 리전 환경에 권장되는 배포 방법입니다. 이는 리전당 하나의 스캐너를 배포하므로 리전 간 네트워킹 비용이 발생하지 않습니다. 배포 토폴로지 선택 지침은 [Agentless Scanning 배포](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)를 참조하세요. 다중 리전 구성을 포함한 사용 예시는 GitHub 리포지토리의 [examples 디렉터리](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples)를 참조하세요.

#### 새 AWS 계정 {#new-aws-account-1}

1. [Cloud Security Setup][1] 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}를 클릭합니다.
1. AWS 섹션 하단에서 {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}를 클릭합니다. {{< ui >}}Add New AWS Account(s){{< /ui >}} 대화 상자가 표시됩니다.
1. {{< ui >}}Add a Single AWS Account{{< /ui >}} 및 {{< ui >}}Manually{{< /ui >}} 옵션을 선택합니다.
1. [Datadog Agentless Scanner 모듈][2] 설치 지침을 따릅니다.
1. {{< ui >}}I confirm that the Datadog IAM Role has been added to the AWS Account{{< /ui >}} 확인란을 선택합니다.
1. {{< ui >}}AWS Account ID{{< /ui >}} 및 {{< ui >}}AWS Role Name{{< /ui >}}을 입력합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

#### 기존 AWS 계정 {#existing-aws-account-1}

1. [Cloud Security Setup][1] 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}를 클릭합니다.
1. Agentless 스캐너를 배포할 AWS 계정을 클릭하여 사이드 패널을 엽니다.
1. {{< ui >}}Features{{< /ui >}} 탭에서 {{< ui >}}Configure Agentless Scanning{{< /ui >}} 또는 {{< ui >}}Manage{{< /ui >}}를 클릭하여 Agentless Scanning Setup 모달을 엽니다.
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} 섹션에서 {{< ui >}}Terraform{{< /ui >}}을 선택합니다.
1. [Datadog Agentless Scanner 모듈][2] 설치 지침을 따릅니다.
1. {{< ui >}}I confirm the Datadog Agentless Scanner was installed using Terraform{{< /ui >}} 확인란을 선택합니다.
1. {{< ui >}}Done{{< /ui >}}을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /collapse-content %}}

위의 설정 방법 중 하나를 완료한 후 [설정을 확인](#verify-your-setup)하세요.

[2]: https://app.datadoghq.com/security/csm/
[3]: /ko/remote_configuration

{{% /tab %}}

{{% tab "Azure" %}}

### 설정 선택 {#choose-your-setup-1}

- **신규 Azure 고객**: 먼저 [Datadog Azure 통합](https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure)을 설정한 다음 Agentless Scanning을 활성화하세요.
- **기존의 통합된 Azure 구독**: [Cloud Shell](#azure-cloud-shell-setup)(권장), [Azure Resource Manager](#azure-resource-manager-setup) 또는 [Terraform](#azure-terraform-setup)을 사용하세요.
- **다중 구독**: 반복 가능한 다중 구독 배포를 위해 [Cloud Shell](#azure-cloud-shell-setup)을 사용하세요. 자체 코드형 인프라를 관리하는 것을 선호한다면 [Terraform](#azure-terraform-setup)을 사용할 수도 있습니다.

<div class="alert alert-info">아직 Azure 구독을 Datadog에 연결하지 않은 경우, 먼저 <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure">Azure 통합을 설정</a>하세요.</div>

{{% collapse-content title="Cloud Shell" level="h4" id="azure-cloud-shell-setup" %}}
Azure Cloud Shell을 사용하여 Azure 구독을 위한 Agentless Scanning을 설정하세요. 이 방법을 사용하면 [설정 스크립트](https://github.com/DataDog/integrations-management/tree/main/azure/agentless)가 다운로드됩니다. 이 스크립트는 [Azure용 Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme)을 래핑하므로 사용자가 Terraform을 직접 관리할 필요가 없습니다. 스크립트를 실행하기 전에 검토할 수 있습니다.

1. Cloud Shell에서 사용하는 ID에 필요한 Azure 권한이 있는지 확인합니다.

   - **스캐너 구독**에서는 ID에 **Owner**와 같이 역할 할당 쓰기 및 리소스 생성 권한을 부여하는 역할이 있어야 합니다.
   - **각 스캔된 구독**에서는 ID에 `Microsoft.Authorization/roleAssignments/write` 권한을 부여하는 역할이 있어야 합니다. 그래야 스캐너의 관리형 ID에 **User Access Administrator** 또는 **Owner**와 같이 디스크 스냅샷을 생성하고 디스크를 읽는 데 필요한 권한을 부여할 수 있습니다.

   생성된 명령을 실행하기 전에 Azure에서 설정 스크립트가 수행하는 작업을 확인하세요.

   - **Terraform 상태**: 기본적으로 **스캐너** 구독에서 Azure 스토리지 계정을 생성합니다. 대신 스캐너 리소스 그룹의 기존 스토리지 계정을 재사용하려면 명령을 실행하기 전에 `TF_STATE_STORAGE_ACCOUNT`를 설정하세요. 해당 변수가 설정되면 스크립트는 새 계정을 생성하지 않습니다.
   - **리소스 공급자**: 가능한 경우 스캐너 구독에서 `Microsoft.Compute`, `Microsoft.Network`, `Microsoft.ManagedIdentity`, `Microsoft.Storage`, `Microsoft.KeyVault`, `Microsoft.Authorization` 등의 리소스 공급자를 등록합니다.
1. [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}를 클릭합니다.
1. Agentless 스캐너를 배포할 Azure 구독을 클릭하여 사이드 패널을 엽니다.
1. {{< ui >}}Features{{< /ui >}} 탭에서 {{< ui >}}Configure Agentless Scanning{{< /ui >}} 또는 {{< ui >}}Manage{{< /ui >}}를 클릭하여 Agentless Scanning Setup 모달을 엽니다.
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} 섹션에서 {{< ui >}}Cloud Shell{{< /ui >}}을 선택합니다.
1. [Remote Configuration](/remote_configuration)이 활성화된 {{< ui >}}API key{{< /ui >}}를 선택합니다. 애플리케이션 키가 자동으로 생성됩니다.
1. 스캔할 {{< ui >}}Azure subscriptions{{< /ui >}}를 선택합니다.
1. 스캐너를 구성합니다.
   - 이미 배포된 스캐너가 있는 경우 {{< ui >}}use an existing scanner{{< /ui >}}(권장) 또는 {{< ui >}}deploy a new scanner{{< /ui >}}를 선택할 수 있습니다.
   - {{< ui >}}deploy a new scanner{{< /ui >}}를 선택하는 경우 {{< ui >}}scanner subscription{{< /ui >}}(선택된 구독 중 하나여야 함) 및 {{< ui >}}scanner locations{{< /ui >}}(Azure 리전, 최대 4개)를 선택합니다. 호스트가 150개를 초과하는 모든 리전에 스캐너를 배포하는 것이 좋습니다.
1. {{< ui >}}Copy command{{< /ui >}}를 클릭하여 생성된 명령을 복사하고 {{< ui >}}Open Azure Cloud Shell{{< /ui >}}을 클릭하여 [Azure Cloud Shell](https://shell.azure.com)을 엽니다. 명령을 검토하고 실행합니다. 이 스크립트는 [Azure용 Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme)을 적용하여 선택된 구독 및 위치에 스캐너를 배포하고 구성합니다.
1. 명령이 완료된 후 Datadog 설정 페이지로 돌아가 {{< ui >}}Done{{< /ui >}}을 클릭합니다.
{{% /collapse-content %}}
{{% collapse-content title="Azure Resource Manager" level="h4" id="azure-resource-manager-setup" %}}
Azure Resource Manager 템플릿을 사용하여 Agentless 스캐너를 배포하세요. 이 템플릿에는 Agentless 스캐너를 배포하고 관리하는 데 필요한 역할 정의가 포함되어 있습니다.

#### 신규 Azure 구독 {#new-azure-subscription}

<div class="alert alert-info"><a href="/integrations/guide/azure-manual-setup/?tab=azurecli">Datadog Azure 통합</a>이 설정되어 있는지 확인하세요.</div>

{{% csm-agentless-azure-resource-manager %}}

#### 기존 Azure 구독 {#existing-azure-subscription}

{{% csm-agentless-azure-resource-manager %}}

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="azure-terraform-setup" %}}

[Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner)은 Datadog Agentless 스캐너를 설치하기 위한 재사용 가능한 구성을 제공합니다. 배포 토폴로지 선택 지침은 [Agentless Scanning 배포](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)를 참조하세요. 사용 예시는 GitHub 리포지토리의 [examples 디렉터리](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples)를 참조하세요.

1. [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}를 클릭합니다.
1. Agentless 스캐너를 배포할 Azure 구독을 클릭하여 사이드 패널을 엽니다.
1. {{< ui >}}Features{{< /ui >}} 탭에서 {{< ui >}}Configure Agentless Scanning{{< /ui >}} 또는 {{< ui >}}Manage{{< /ui >}}를 클릭하여 Agentless Scanning Setup 모달을 엽니다.
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} 섹션에서 {{< ui >}}Terraform{{< /ui >}}을 선택합니다.
1. [Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme) 설치 지침을 따릅니다.
1. {{< ui >}}Done{{< /ui >}}을 클릭합니다.

{{% /collapse-content %}}

위의 설정 방법 중 하나를 완료한 후 [설정을 확인](#verify-your-setup)하세요.

{{% /tab %}}

{{% tab "GCP" %}}

### 설정 선택 {#choose-your-setup-2}

- **신규 GCP 고객**: 먼저 [GCP 통합을 설정][25]한 다음 Agentless Scanning을 활성화하세요.
- **기존의 통합된 GCP 프로젝트**: [Cloud Shell](#gcp-cloud-shell-setup)(권장) 또는 [Terraform](#gcp-terraform-setup)을 사용하세요.

<div class="alert alert-info">아직 GCP 프로젝트를 Datadog에 연결하지 않은 경우, 먼저 <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp">GCP 통합을 설정</a>하세요.</div>

{{% collapse-content title="Cloud Shell" level="h4" id="gcp-cloud-shell-setup" %}}
Google Cloud Shell을 사용하여 GCP 프로젝트를 위한 Agentless Scanning을 설정하세요. 이 방법을 사용하면 [설정 스크립트](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless)가 다운로드됩니다. 이 스크립트는 [GCP용 Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme)을 래핑하므로 사용자가 Terraform을 직접 관리할 필요가 없습니다. 스크립트를 실행하기 전에 검토할 수 있습니다.

1. 필요한 GCP 권한이 있는지 확인합니다.

   - **스캐너 프로젝트**에서는 Cloud Shell에서 사용하는 ID에 **Owner** 또는 이에 상응하는 권한이 있어야 합니다.
   - **스토리지**: 스캐너 프로젝트에서 Terraform 상태 스토리지를 생성하거나 `TF_STATE_BUCKET`으로 참조하는 기존 버킷을 사용할 수 있는 권한을 포함하세요(예: `roles/storage.admin` 또는 `storage.buckets.create`, `storage.buckets.get`, `storage.buckets.update` 권한).

   생성된 명령을 실행하기 전에 GCP에서 설정 스크립트가 수행하는 작업을 확인하세요.

   - **Terraform 상태**: 기본적으로 **스캐너** 프로젝트에서 GCS 버킷을 생성합니다. 기존 버킷을 재사용하려면 명령을 실행하기 전에 `TF_STATE_BUCKET`을 설정하세요. 해당 변수가 설정되면 스크립트는 버킷을 생성하지 않습니다.
   - {{< ui >}}Setting up Terraform state storage{{< /ui >}}에서 403 오류가 발생하면 문제 해결 가이드의 [GCP: Failed to create state bucket][26]을 참조하세요.

1. [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}를 클릭합니다.
1. Agentless 스캐너를 배포할 GCP 프로젝트를 클릭하여 사이드 패널을 엽니다.
1. {{< ui >}}Features{{< /ui >}} 탭에서 {{< ui >}}Configure Agentless Scanning{{< /ui >}} 또는 {{< ui >}}Manage{{< /ui >}}를 클릭하여 Agentless Scanning Setup 모달을 엽니다.
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} 섹션에서 {{< ui >}}Cloud Shell{{< /ui >}}을 선택합니다.
1. [Remote Configuration](/remote_configuration)이 활성화된 {{< ui >}}API key{{< /ui >}}를 선택합니다. 애플리케이션 키가 자동으로 생성됩니다.
1. 스캔할 {{< ui >}}GCP projects{{< /ui >}}를 선택합니다.
1. 스캐너를 구성합니다.
   - 이미 배포된 스캐너가 있는 경우 {{< ui >}}use an existing scanner{{< /ui >}}(권장) 또는 {{< ui >}}deploy a new scanner{{< /ui >}}를 선택할 수 있습니다.
   - {{< ui >}}deploy a new scanner{{< /ui >}}를 선택하는 경우 {{< ui >}}scanner project{{< /ui >}}(선택된 프로젝트 중 하나여야 함) 및 {{< ui >}}scanner regions{{< /ui >}}를 선택합니다. 호스트가 150개를 초과하는 모든 리전에 스캐너를 설치하는 것이 좋습니다.
1. {{< ui >}}Copy command{{< /ui >}}를 클릭하여 생성된 명령을 복사하고 {{< ui >}}Open Google Cloud Shell{{< /ui >}}을 클릭하여 [Google Cloud Shell](https://ssh.cloud.google.com/cloudshell)을 엽니다. 명령을 검토하고 실행합니다. 이 스크립트는 [GCP용 Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme)을 적용하여 선택된 프로젝트 및 리전에 스캐너를 배포하고 구성합니다.
1. 명령이 완료된 후 Datadog 설정 페이지로 돌아가 {{< ui >}}Done{{< /ui >}}을 클릭합니다.

[26]: /ko/security/cloud_security_management/troubleshooting/agentless_scanning#gcp-failed-to-create-state-bucket-storagebucketscreate-403
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="gcp-terraform-setup" %}}
[Terraform Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner)은 Datadog Agentless 스캐너를 설치하기 위한 재사용 가능한 구성을 제공합니다. 배포 토폴로지 선택 지침은 [Agentless Scanning 배포](/security/cloud_security_management/setup/agentless_scanning/deployment_methods)를 참조하세요. 사용 예시는 GitHub 리포지토리의 [examples 디렉터리](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples)를 참조하세요.

1. [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}를 클릭합니다.
1. Agentless 스캐너를 배포할 GCP 프로젝트를 클릭하여 사이드 패널을 엽니다.
1. {{< ui >}}Features{{< /ui >}} 탭에서 {{< ui >}}Configure Agentless Scanning{{< /ui >}} 또는 {{< ui >}}Manage{{< /ui >}}를 클릭하여 Agentless Scanning Setup 모달을 엽니다.
1. {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} 섹션에서 {{< ui >}}Terraform{{< /ui >}}을 선택합니다.
1. [Datadog Agentless Scanner 모듈](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) 설치 지침을 따릅니다.
1. {{< ui >}}Done{{< /ui >}}을 클릭합니다.
{{% /collapse-content %}}

위의 설정 방법 중 하나를 완료한 후 [설정을 확인](#verify-your-setup)하세요.

[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp

{{% /tab %}}
{{< /tabs >}}

## 설정 확인 {#verify-your-setup}

설정을 완료한 후 Agentless Scanning이 초기 결과를 생성하는 데에는 다소 시간이 걸립니다. 첫 번째 스캔 주기가 완료되는 데 약 30분이 소요됩니다.

<div class="alert alert-info">두 시간이 지나도 결과가 표시되지 않으면 <a href="/security/cloud_security_management/troubleshooting/agentless_scanning">Agentless Scanning 문제 해결 가이드</a>를 참조하세요.</div>

다음 위치에서 스캔 결과를 확인하세요.

- **호스트 및 컨테이너 취약성의 경우**: [Cloud Security Vulnerabilities Explorer][15]. Agentless Scanning으로 탐지된 취약성만 보려면 검색창에서 `origin:"Agentless scanner"` 필터를 사용하세요.
- **Lambda 취약성의 경우**: [Code Security(SCA) Explorer][16]
- **민감한 데이터 발견 결과의 경우**: [Sensitive Data Scanner][17]

## 스캔에서 리소스 제외 {#exclude-resources-from-scans}

특정 호스트, 컨테이너 또는 함수를 스캔에서 제외하려면 [리소스 평가 필터](/security/cloud_security_management/guide/resource_evaluation_filters)를 참조하세요.

## Agentless Scanning 비활성화 {#disable-agentless-scanning}

{{< tabs >}}
{{% tab "AWS" %}}
1. [Cloud Security Setup][10] 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}를 클릭합니다.
1. 필요한 경우 필터를 사용하여 Agentless Scanning을 중지할 계정을 찾습니다. 계정을 클릭하여 해당 설정이 포함된 사이드 패널을 엽니다.
1. {{< ui >}}Features{{< /ui >}} 탭의 {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}} 아래에서 토글을 해제 위치로 전환합니다.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. [Cloud Security Setup][10] 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}를 클릭합니다.
1. Agentless Scanning을 비활성화하려는 구독이 포함된 테넌트를 확장합니다. 구독을 클릭하여 해당 설정이 포함된 사이드 패널을 엽니다.
1. {{< ui >}}Features{{< /ui >}} 탭의 {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}} 아래에서 토글을 해제 위치로 전환합니다.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. [Cloud Security Setup][10] 페이지에서 {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}를 클릭합니다.
1. Agentless Scanning을 비활성화하려는 프로젝트가 포함된 계정을 확장합니다. 프로젝트를 클릭하여 해당 설정이 포함된 사이드 패널을 엽니다.
1. {{< ui >}}Features{{< /ui >}} 탭의 {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}} 아래에서 토글을 해제 위치로 전환합니다.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Agentless Scanning 제거 {#uninstall-agentless-scanning}

Agentless Scanning을 설치할 때 사용한 배포 방법을 선택하세요.

{{< tabs >}}
{{% tab "Terraform" %}}
Agentless Scanning을 제거하려면 Terraform 코드에서 스캐너 모듈을 제거하세요. 자세한 내용은 [Terraform 모듈][9] 설명서를 참조하세요.

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
Agentless Scanning을 제거하려면 AWS 콘솔에 로그인하고 Agentless Scanning에 대해 생성된 CloudFormation 스택을 삭제하세요(하위 스택 이름은 `DatadogIntegration-DatadogAgentlessScanning-...` 패턴을 따름).
{{% /tab %}}

{{% tab "GCP Cloud Shell" %}}
Google Cloud Shell을 사용하여 설정된 Agentless Scanning을 제거하려면 설치 중 사용한 것과 동일한 설정 명령을 실행하세요. 이때 끝에 있는 `deploy`를 `destroy`로 바꿉니다. 예를 들면 다음과 같습니다.

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

{{% tab "Azure Cloud Shell" %}}
Azure Cloud Shell을 사용하여 설정된 Agentless Scanning을 제거하려면 설치 중 사용한 것과 동일한 설정 명령을 실행하세요. 이때 끝에 있는 `deploy`를 `destroy`로 바꿉니다. 예를 들면 다음과 같습니다.

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o azure_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_SUBSCRIPTION="<SCANNER_SUBSCRIPTION>" \
python3 azure_agentless_setup.pyz destroy
```

destroy 명령은 `terraform destroy`를 실행하고, 이전에 구성된 각 구독에 대해 Datadog의 Agentless 스캔 옵션을 비활성화하며, API 키를 보관하는 Key Vault를 삭제하기 전에 확인 메시지를 표시합니다. 리소스 그룹 및 Terraform 상태 스토리지 계정은 기본적으로 유지되며, 스크립트가 이에 대한 수동 삭제 지침을 출력합니다.

명령을 실행하기 전에 [설정 스크립트 소스][22]를 검토할 수 있습니다.

[22]: https://github.com/DataDog/integrations-management/tree/main/azure/agentless
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
Agentless Scanning을 제거하려면 Azure 구독에 로그인하세요. Agentless 스캐너를 위한 전용 리소스 그룹을 생성한 경우, 이 리소스 그룹을 다음 Azure 역할 정의와 함께 삭제하세요.
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

전용 리소스 그룹을 사용하지 않은 경우, `Datadog:true` 및 `DatadogAgentlessScanner:true` 태그로 식별할 수 있는 스캐너 리소스를 수동으로 삭제해야 합니다.
{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/api-app-keys/
[2]: /ko/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[3]: /ko/remote_configuration
[12]: /ko/security/cloud_security_management/agentless_scanning
[20]: /ko/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage