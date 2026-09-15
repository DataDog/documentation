---
aliases:
- /ko/cloud_cost_management/azure/
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: 설명서
  text: AWS 청구서에 대한 인사이트 확보
- link: /cloud_cost_management/setup/google_cloud
  tag: 설명서
  text: Google Cloud 청구서에 대한 인사이트 확보
- link: /cloud_cost_management/oracle
  tag: 설명서
  text: Oracle 청구서에 대한 인사이트 확보
title: Azure
---
## 개요 {#overview}

Datadog에서 Azure Cloud Cost Management를 사용하려면 Datadog Azure 통합을 구성하고 Azure에서 **상각(amortized)** 및 **실제(actual)** 내보내기를 생성해야 합니다. 또한 Datadog은 컨테이너에서 내보내기를 읽을 수 있는 권한이 있어야 합니다.

Datadog은 구독, 리소스 그룹 및 청구 계정 수준에서 비용 가시성을 제공합니다. Microsoft 고객 계약(MCA)은 세 가지 범위 모두에서 설정할 수 있습니다. 계정 유형을 확인하려면 [Azure 설명서][10]를 참조하세요.

<div class="alert alert-info">
<strong>종량제(PAYG) 계정</strong>
<p>Datadog Cloud Cost Management는 Azure에서 <strong>실제 비용(Actual Cost)</strong> 및 <strong>상각 비용(Amortized Cost)</strong> 내보내기가 필요합니다. PAYG (Microsoft Online Services Program) 구독은 일반적으로 <strong>사용량 세부 정보(사용량만)</strong> 내보내기만 제공하므로 CCM용으로 설정할 수 없습니다. 각 Azure 계정 유형에서 사용할 수 있는 내보내기 유형은 Microsoft의 <a href="https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports">Cost Management 내보내기 설명서</a>를 참조하세요.</p>
<p>구독이 PAYG인 경우 다음 옵션 중 하나를 고려하세요.</p>
<ul>
<li>필수 내보내기 유형을 지원하는 Microsoft 고객 계약(MCA) 또는 기업 계약(EA)으로 마이그레이션하세요.</li>
<li>Microsoft Azure 지원에 문의하여 구독에 사용할 수 있는 내보내기 유형을 확인하세요.</li>
</ul>
<p>Datadog CCM 설정에 대한 도움이 필요하거나 옵션을 논의하려면 <a href="/help/">Datadog 지원 팀</a>에 문의하세요.</p>
</div>

## 설정 {#setup}

[API][13] 또는 [Terraform][14]을 사용하거나 아래 지침에 따라 Datadog에서 직접 설정할 수 있습니다.

{{% site-region region="us3" %}}
**참고**: Datadog의 **US3** 사이트를 사용하는 경우 Azure Portal을 통해 [Datadog 리소스 메서드][1]를 사용하여 Datadog Azure Native 통합을 설정했을 수 있습니다. Cloud Cost Management를 지원하려면 [앱 등록을 생성][2]해야 합니다.


[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /ko/integrations/azure/?tab=azurecliv20#setup
{{% /site-region %}}

### Azure 통합 구성 {#configure-the-azure-integration}
[Setup & Configuration][3]으로 이동하여 Azure 계정을 추가하고 단계에 따라 Azure 통합을 구성합니다.

{{< tabs >}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/azure_terraform_setup.png" alt="Terraform 옵션이 선택된 CCM 설정 페이지로, 범위 및 내보내기 세부 정보를 구성하기 위해 1단계와 2단계가 확장된 모습" style="width:100%" >}}

### 범위 유형 선택 {#select-scope-type}

드롭다운에서 계정의 범위 유형을 선택합니다. CCM은 청구 계정, 구독 및 리소스 그룹의 범위 유형을 지원합니다.

### 생성할 리소스 선택 {#select-the-resources-to-create}

Terraform 구성은 기존 Azure 리소스에 따라 세 가지 설정 방식을 지원합니다.

* **새 설정**: {{< ui >}}Create storage account and container{{< /ui >}}를 선택하여 스토리지 계정, 컨테이너 및 비용 내보내기를 만듭니다.
* **기존 스토리지 계정 및 컨테이너**: {{< ui >}}Create storage account and container{{< /ui >}}를 선택 해제하고 {{< ui >}}Create cost exports{{< /ui >}}를 선택하여 기존 스토리지를 사용하되 새 비용 내보내기를 만듭니다.
* **기존 스토리지 계정, 컨테이너 및 비용 내보내기**: 두 옵션을 모두 선택 해제하여 기존 스토리지 및 비용 내보내기를 사용합니다.

### 범위 및 내보내기 세부 정보 구성 {#configure-the-scope-and-export-details}

구성에 대해 다음 정보를 입력합니다.

* {{< ui >}}Billing account or Subscription ID{{< /ui >}}: 1단계에서 선택한 범위에 따라 해당 청구 계정 ID 또는 구독 ID입니다.
* {{< ui >}}Resource group name{{< /ui >}}: 선택한 범위 내에 있는 기존 리소스 그룹의 이름입니다. Terraform 설정을 위해서는 기존 리소스 그룹이 필요합니다.
* {{< ui >}}Location{{< /ui >}}: 리소스 그룹의 Azure 위치입니다. 예를 들어, `East US 2`입니다.
* {{< ui >}}Storage account and container name{{< /ui >}}: 생성하도록 선택한 리소스에 따라 새로 생성하거나 기존에 존재하는 스토리지 계정 및 컨테이너의 이름입니다.
* {{< ui >}}Actual cost export name and path{{< /ui >}}: 실제 비용 내보내기의 이름 및 경로입니다.
* {{< ui >}}Amortized cost export name and path{{< /ui >}}: 상각 비용 내보내기의 이름 및 경로입니다.
  * **참고:** 비어 있는 값, `/`로 시작하는 값(예: `/`, `/cost`), `/`로 끝나는 값(예: `cost/`) 등의 접두사 형식은 지원되지 않습니다. 반면 중간에 `/`를 포함하는 접두사(예: `cost/hourly`)는 지원됩니다.

### 생성된 Azure 리소스 Terraform HCL 복사 및 변경 사항 적용 {#copy-generated-azure-resource-terraform-hcl-and-apply-changes}

2단계의 필드를 모두 입력하면 3단계가 활성화되고 생성된 Terraform HCL이 표시됩니다. 지침에 따라 이 코드로 Terraform 구성 파일을 설정합니다. CCM으로 돌아가 비용 내보내기를 구성하기 전에 `terraform plan` 또는 `terraform apply` 실행 중 발생하는 문제를 모두 해결합니다.

### Azure 콘솔에서 내보내기 구성 {#access-azure-console-to-configure-exports}

{{< img src="cloud_cost/setup/azure_toggle_file_partitioning.png" alt="두 내보내기 모두에 대해 파일 파티셔닝을 켭니다." style="width:50%" >}}

Azure 콘솔 링크를 열어 비용 내보내기를 찾습니다. 필요한 경우 현재 범위를 내보내기에 맞는 범위로 변경합니다. 실제 및 상각 내보내기를 모두 선택하고 {{< ui >}}Edit{{< /ui >}}을 클릭하여 File Partitioning이 아직 활성화되지 않은 경우 활성화합니다.

{{< img src="cloud_cost/run_now.png" alt="내보내기 측면 패널에서 Run Now 버튼을 클릭하여 내보내기를 생성합니다." style="width:50%" >}}

File Partitioning 변경 사항을 저장하고 {{< ui >}}Run Now{{< /ui >}}를 클릭합니다. 두 내보내기 실행이 모두 성공하면 CCM으로 돌아갑니다.

### 생성된 Datadog HCL 복사 및 변경 사항 적용 {#copy-generated-datadog-hcl-and-apply-changes}

{{< ui >}}Apply Datadog Terraform HCL{{< /ui >}} 단계의 지침을 따릅니다. CCM으로 돌아가 계정 생성 여부를 확인하기 전에 `terraform plan` 또는 `terraform apply` 실행 중 발생하는 모든 문제를 해결하세요.

{{% /tab %}}

{{% tab "수동" %}}

{{< img src="cloud_cost/setup/azure_manual_setup.png" alt="수동 옵션이 선택된 CCM 설정 페이지로, 1단계와 2단계가 확장되어 범위 유형을 구성하고 기존 내보내기를 선택할 수 있습니다." style="width:100%" >}}

### 비용 내보내기 생성 {#generate-cost-exports}

두 가지 데이터 유형, 즉 **실제(actual)** 및 **상각(amortized)**에 대해 내보내기를 생성해야 합니다. Datadog은 두 내보내기에 대해 동일한 스토리지 컨테이너를 사용할 것을 권장합니다.

1. Azure 포털의 {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Cost Management{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} 아래에 있는 [Cost Management | Configuration][5]으로 이동한 후 {{< ui >}}Exports{{< /ui >}}를 클릭합니다.
  {{< img src="cloud_cost/azure_export_path.png" alt="Azure 포털에서 내비게이션의 Exports 옵션이 강조 표시된 화면입니다." style="width:100%" >}}
2. 검색 필터 옆에 있는 내보내기 범위를 선택합니다.

   **참고**: 범위는 {{< ui >}}billing account{{< /ui >}}, {{< ui >}}subscription{{< /ui >}} 또는 {{< ui >}}resource group{{< /ui >}}이어야 합니다.
3. 범위를 선택한 후 {{< ui >}}Schedule export{{< /ui >}}를 클릭합니다.

   {{< img src="cloud_cost/azure_exports_page.png" alt="Azure 포털에서 내보내기 범위와 Schedule 버튼이 강조 표시된 화면입니다." style="width:100%" >}}

4. {{< ui >}}Cost and usage (actual + amortized){{< /ui >}} 템플릿을 선택합니다.
    {{< img src="cloud_cost/azure_new_export.png" alt="템플릿 및 수동 옵션이 강조 표시된 새 내보내기 페이지입니다." style="width:100%" >}}

5. 각 내보내기에서 {{< ui >}}Edit{{< /ui >}}을 클릭하고 다음 세부 정보를 확인합니다.
    - 빈도: {{< ui >}}Daily export of month-to-date costs{{< /ui >}}
    - 데이터셋 버전:
      - 지원 버전: `2021-10-01`, `2021-01-01`, `2020-01-01`
      - 지원되지 않는 버전: `2019-10-01`
    {{< img src="cloud_cost/improved_export.png" alt="내보내기 세부 정보: 지표(Actual), 내보내기 유형(Daily), 데이터셋 버전" style="width:100%" >}}

6. 새 내보내기의 '내보내기 접두사'를 입력합니다. 예를 들어 기존 내보내기와의 충돌을 피하려면 `datadog`를 입력합니다.

7. {{< ui >}}Destination{{< /ui >}} 탭에서 다음 세부 정보를 선택합니다.
    - {{< ui >}}Azure blob storage{{< /ui >}}를 스토리지 유형으로 선택합니다.
    - 내보내기에 사용할 스토리지 계정, 컨테이너 및 디렉터리를 선택합니다.
        - **참고**: 이러한 필드에서 `.`과(와) 같은 특수 문자를 사용하지 마세요.
        - **참고**: 청구 내보내기는 모든 구독에 저장할 수 있습니다. 여러 구독에 대해 내보내기를 생성하는 경우 Datadog은 모든 내보내기를 동일한 스토리지 계정에 저장할 것을 권장합니다. 내보내기 이름은 고유해야 합니다.
    - {{< ui >}}CSV{{< /ui >}} 또는 {{< ui >}}Parquet{{< /ui >}}을 형식으로 선택합니다.
    - 압축 유형을 선택합니다. {{< ui >}}CSV{{< /ui >}}의 경우 {{< ui >}}Gzip{{< /ui >}} 및 {{< ui >}}None{{< /ui >}}이 지원됩니다. {{< ui >}}Parquet{{< /ui >}}의 경우 {{< ui >}}Snappy{{< /ui >}} 및 {{< ui >}}None{{< /ui >}}이 지원됩니다.
    - {{< ui >}}File partitioning{{< /ui >}}이 선택되었는지 확인합니다.
    - {{< ui >}}Overwrite data{{< /ui >}}가 선택되어 있지 않은지 확인합니다.
        - **참고:** Datadog은 {{< ui >}}Overwrite data{{< /ui >}} 설정을 지원하지 않습니다. 설정이 이전에 선택되어 있었다면 디렉터리의 파일을 정리하거나 다른 디렉터리로 이동합니다.

   {{< img src="cloud_cost/improved_export_destination_2.png" alt="파일 파티셔닝 및 데이터 덮어쓰기 설정이 포함된 내보내기 대상" >}}

8. {{< ui >}}Review + create{{< /ui >}} 탭에서 {{< ui >}}Create{{< /ui >}}을 선택합니다.
9. {{< ui >}}Run Now{{< /ui >}}를 클릭하여 첫 번째 내보내기를 수동으로 생성합니다. 성공적으로 완료될 때까지 기다린 후 계속 진행합니다.

{{< img src="cloud_cost/run_now.png" alt="내보내기 측면 패널에서 Run Now 버튼을 클릭하여 내보내기를 생성합니다." style="width:50%" >}}

### Datadog에 내보내기 액세스 권한 제공 {#provide-datadog-access-to-your-exports}
내보내기가 저장된 스토리지 계정에 대해 Datadog에 읽기 액세스 권한을 부여합니다.

{{% collapse-content title="청구 계정" level="h4" %}}

1. Exports 탭에서 내보내기의 Storage Account를 클릭하여 해당 위치로 이동합니다.
2. Containers 탭을 클릭합니다.
3. 청구 데이터가 저장된 스토리지 컨테이너를 선택합니다.
4. {{< ui >}}Access Control (IAM){{< /ui >}} 탭을 선택하고 {{< ui >}}Add{{< /ui >}}를 클릭합니다.
5. {{< ui >}}Add role assignment{{< /ui >}}를 선택합니다.
6. {{< ui >}}Storage Blob Data Reader{{< /ui >}}를 선택한 다음 {{< ui >}}Next{{< /ui >}}를 클릭합니다.
7. Datadog과 연결한 앱 등록 중 하나에 이러한 권한을 할당합니다.
    - {{< ui >}}Select members{{< /ui >}}를 클릭하고 앱 등록 이름을 선택한 후 {{< ui >}}Select{{< /ui >}}를 클릭합니다. **참고**: 앱 등록이 목록에 표시되지 않으면 이름을 입력하기 시작합니다. 사용 가능한 앱 등록인 경우 UI가 업데이트되어 표시됩니다.
    - {{< ui >}}Review + assign{{< /ui >}}을 선택합니다.

내보내기가 서로 다른 스토리지 컨테이너에 있는 경우, 다른 스토리지 컨테이너에 대해 1단계부터 7단계까지 반복합니다.

{{% /collapse-content %}} 
{{% collapse-content title="구독 및 리소스 그룹" level="h4" %}}
1. Exports 탭에서 내보내기의 Storage Account를 클릭하여 해당 위치로 이동합니다.
2. Containers 탭을 클릭합니다.
3. 청구 데이터가 저장된 스토리지 컨테이너를 선택합니다.
4. {{< ui >}}Access Control (IAM){{< /ui >}} 탭을 선택하고 {{< ui >}}Add{{< /ui >}}를 클릭합니다.
5. {{< ui >}}Add role assignment{{< /ui >}}를 선택합니다.
6. {{< ui >}}Storage Blob Data Reader{{< /ui >}}를 선택한 다음 {{< ui >}}Next{{< /ui >}}를 클릭합니다.
7. Datadog과 연결한 앱 등록 중 하나에 이러한 권한을 할당합니다.
    - {{< ui >}}Select members{{< /ui >}}를 클릭하고 앱 등록 이름을 선택한 후 {{< ui >}}Select{{< /ui >}}를 클릭합니다.
    - {{< ui >}}Review + assign{{< /ui >}}을 선택합니다.

내보내기가 서로 다른 스토리지 컨테이너에 있는 경우, 다른 스토리지 컨테이너에 대해 1단계부터 7단계까지 반복합니다.
{{% /collapse-content %}}

### Cost Management Reader 액세스 구성 {#configure-cost-management-reader-access}
**참고:** 범위가 {{< ui >}}Billing Account{{< /ui >}}인 경우 이 액세스를 구성할 필요가 없습니다.

1. [구독][1]으로 이동하여 구독 이름을 클릭합니다.
2. {{< ui >}}Access Control (IAM){{< /ui >}} 탭을 선택합니다.
3. {{< ui >}}Add{{< /ui >}}를 클릭한 다음 {{< ui >}}Add role assignment{{< /ui >}}를 클릭합니다.
4. {{< ui >}}Cost Management Reader{{< /ui >}}를 선택한 다음 {{< ui >}}Next{{< /ui >}}를 클릭합니다.
5. 앱 등록에 이러한 권한을 할당합니다.

이 설정은 Microsoft Cost Management에 대한 주기적 비용 계산을 허용하여 비용 정확성을 보장합니다.

**참고**: 설정 후 Datadog에서 데이터가 안정화되기까지 48~72시간이 소요될 수 있습니다.

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}



**참고**: 앱 등록에 적절한 권한이 있지만 네트워크에서 Datadog의 웹훅 IP를 차단하는 경우 권한 문제로 보이는 오류가 발생할 수 있습니다.

이 문제를 해결하려면 `https://ip-ranges.`의 `Webhooks` 섹션으로 이동하여 Datadog의 웹훅 IP를 네트워크 허용 목록에 추가하세요.{{< region-param key="dd_site" code="true" >}}.

### Datadog에서 Cloud Cost 구성 {#configure-cloud-cost-in-datadog}
[Setup & Configuration][3]으로 이동하여 단계를 따릅니다.

### EA에서 MCA로 내보내기 마이그레이션 {#migrate-exports-from-an-ea-to-an-mca}

Azure는 Enterprise Agreement(EA)에서 Microsoft Customer Agreement(MCA)로 비용 내보내기 정의를 자동으로 마이그레이션하지 않습니다. 자세한 내용은 Microsoft의 [MCA 온보딩 설명서][15]를 참조하세요.

다음 프로세스는 청구 계정, 구독 또는 리소스 그룹 범위를 사용하는 Datadog 구성에 대한 과거 EA 데이터를 보존합니다.

1. 실제 및 상각 EA 내보내기 모두에 대해 다음 설정을 기록합니다.
   * 대소문자를 포함한 내보내기 이름
   * 스토리지 계정
   * 스토리지 컨테이너
   * 스토리지 디렉터리 및 내보내기 접두사
   * 데이터 세트 버전, 형식 및 압축 유형
1. 최종 EA 기간 내보내기가 실행된 후, 예약된 EA 내보내기를 비활성화하되 정의는 유지합니다. EA 및 MCA 예약 내보내기가 동시에 동일한 대상에 기록되지 않도록 합니다.
1. Datadog의 Azure Cloud Cost Management 구성을 활성화된 상태로 유지하고 변경하지 않습니다. 청구 계정 범위의 경우, Datadog은 EA ID를 유지합니다.
1. MCA가 활성화된 후, Terraform 또는 Azure 포털을 사용하여 해당 MCA 범위에서 실제 및 상각 내보내기를 다시 생성합니다. EA 내보내기에서 기록된 내보내기 이름, 스토리지 계정, 컨테이너, 디렉터리 및 접두사를 사용합니다.
   * Terraform의 경우 Azure 리소스 HCL 단계까지 [Terraform 설정 흐름][19]을 따릅니다. 새로운 Datadog HCL을 적용하거나 기존 Cloud Cost Management 구성을 교체하지 마세요.
   * Azure 포털의 경우 [수동 비용 내보내기 지침][17]을 따릅니다.

Datadog은 기존 대상에서 과거 EA 파일을 계속 읽고 동일한 비용 기록에 MCA 데이터를 추가합니다.

<div class="alert alert-warning">
<strong>MCA 범위에서 EA 날짜 백필 금지</strong>
<p>MCA 내보내기에는 이전 EA의 비용이 포함되지 않습니다. EA 날짜 범위에 대해 일회성 MCA 내보내기를 실행하면 공유 대상에 더 최신의 빈 매니페스트가 기록될 수 있습니다. Datadog은 매월 최신 내보내기를 읽으므로 빈 매니페스트로 인해 이전에 수집된 EA 데이터가 0으로 처리될 수 있습니다.</p>
</div>

EA에서 MCA로 마이그레이션한 후 데이터를 백필하려면 요청한 날짜에 적용되었던 계약을 사용하세요.

* MCA 발효일 이전 날짜의 경우 이전 EA 범위에서 일회성 실제 및 상각 내보내기를 실행합니다.
* MCA 발효일 당일 또는 그 이후 날짜의 경우 MCA 범위에서 일회성 실제 및 상각 내보내기를 실행합니다.

이전 EA 범위를 사용할 수 없는 경우 Microsoft 지원에 문의하여 과거 내보내기를 요청하세요. 내보내기 이름이나 대상을 변경했거나 Datadog 구성을 삭제하고 다시 만든 경우 [Datadog 지원][16]에 문의하세요. Datadog 지원 팀이 구성을 검토할 때까지 추가 일회성 또는 예약 내보내기를 생성하지 마세요.

### 과거 데이터 가져오기 {#getting-historical-data}

Azure는 내보내기를 만든 달부터 비용 데이터를 내보냅니다. Datadog은 이러한 내보내기에서 최대 15개월 분량의 사용 가능한 과거 비용 데이터를 자동으로 수집합니다. Azure 비용 내보내기 UI를 사용하여 최대 12개월 분량의 Azure 비용 데이터를 수동으로 백필할 수 있습니다.

**참고**: EA에서 MCA로 마이그레이션한 경우 과거 내보내기를 실행하기 전에 [마이그레이션 지침][18]을 따르세요.

1. 위의 **설정** 및 **Datadog에서 Cloud Cost 구성** 섹션의 지침을 완료합니다.
1. 백필 프로세스를 시작하기 전에 통합이 엔드투엔드로 정상 작동하는지 확인할 수 있도록 비용 데이터가 Datadog에 표시될 때까지 최대 24시간 기다립니다. **참고:** 이미 설정을 완료했고 비용 데이터가 Datadog에 표시되고 있다면 아래의 백필 단계로 바로 진행할 수 있습니다.
1. 각 월에 대해 **실제** 및 **상각** 보고서를 수동으로 내보냅니다. 예를 들어, 2025년 6월의 경우:
    1. 내보내기 편집
    2. 내보내기 유형을 {{< ui >}}One-time export{{< /ui >}}로 변경
    3. {{< ui >}}From{{< /ui >}}을 06-01-2025로 설정 **참고:** 이는 해당 월의 첫째 날이어야 합니다.
    4. {{< ui >}}End{{< /ui >}}를 06-30-2025로 설정 **참고:** 이는 해당 월의 마지막 날이어야 합니다.
    5. 내보내기 저장 **참고:** 이렇게 하면 내보내기가 자동으로 실행됩니다.
    6. 내보내기 실행 완료까지 대기
1. 일일 내보내기를 재개하려면 **실제** 및 **상각** 내보내기를 모두 원래 상태로 되돌립니다.
    1. 내보내기 편집
    2. 내보내기 유형을 {{< ui >}}Daily export of month-to-date costs{{< /ui >}}로 변경
    3. 내보내기 저장

Datadog은 이 데이터를 자동으로 찾아 수집하며 24시간 이내에 Datadog에 표시됩니다.

[Microsoft API][6]를 사용하거나 [Microsoft에 지원 티켓을 제출][7]하여 스토리지 계정에 과거 데이터를 생성할 수도 있습니다. 파일 구조 및 파티셔닝이 예약된 내보내기 형식을 따르는지 확인하세요.

### 비용 유형 {#cost-types}

다음 비용 유형을 사용하여 수집된 데이터를 시각화할 수 있습니다.

| 비용 유형            | 설명           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | 적용된 할인율에 할인 기간 동안 사용량에 배분된 선결제 금액을 더한 비용(발생주의).|
| `azure.cost.actual` | 사용 시점에 청구된 금액으로 표시된 비용(현금주의). 실제 비용에는 개별 청구 유형으로 비공개 할인과 예약 인스턴스 및 Savings Plans 할인이 포함됩니다.|
| `azure.cost.discounted.ondemand` | 개별 협상 할인이 적용된 후 Azure에서 제공하는 정가를 기준으로 한 비용. 실제 온디맨드 비용을 확인하려면 이 메트릭을 (1 - <negotiated_discount>)로 나눕니다. 예를 들어 모든 Azure 제품에 대해 5%의 균일 할인율이 적용되는 경우, 이 메트릭을 .95(1-.05)로 나누면 실제 온디맨드 가격을 확인할 수 있습니다.|

### 기본 제공 태그 {#out-of-the-box-tags}

Datadog은 여러 소스의 태그를 사용하여 Azure 비용 데이터를 자동으로 보강합니다. 비용 데이터에 태그가 적용되는 방식에 대한 종합적인 내용은 [태그][12]를 참조하세요.

다음 기본 제공 태그는 [사용 비용 보고서][9]에서 파생되며 비용 데이터를 보다 쉽게 탐색하고 이해할 수 있도록 지원합니다.

| 태그 이름                         | 태그 설명       |
| ---------------------------- | ----------------- |
| `accountname` | 라인 항목과 연결된 계정 이름입니다. |
| `accountownerid` | 라인 항목과 연결된 소유자의 ID입니다. |
| `billingaccountid` | 라인 항목과 연결된 청구 계정의 ID입니다. |
| `billingaccountname` | 라인 항목과 연결된 청구 계정의 이름입니다. |
| `billingcurrency` | 청구 계정과 연결된 통화입니다. |
| `billingperiod` | 비용의 청구 기간입니다. |
| `billingperiodenddate` | 청구 기간의 종료 날짜입니다. |
| `billingperiodstartdate` | 청구 기간의 시작 날짜입니다. |
| `billingprofileid` | Enterprise Agreement 등록의 고유 식별자입니다. |
| `billingprofilename` | Enterprise Agreement 등록의 이름입니다. |
| `chargetype` | 라인 항목에 적용되는 비용 유형(`Usage`, `Purchase` 또는 `Refund`)입니다. |
| `consumedservice` | 라인 항목과 연결된 서비스의 이름입니다. |
| `costcenter` | 비용 추적을 위해 구독에 정의된 비용 센터입니다. |
| `costinbillingcurrency` | 크레딧 또는 세금 적용 전 청구 통화 기준 비용입니다. |
| `costinpricingcurrency` | 크레딧 또는 세금 적용 전 가격 책정 통화 기준 비용입니다. |
| `currency` | 청구 계정과 연결된 통화입니다. |
| `date` | 비용의 사용 또는 구매 날짜입니다. |
| `effectiveprice` | 해당 기간의 혼합 단가입니다. 혼합 가격은 수량이 증가함에 따라 가격이 낮아지는 단계별 요금제와 같이 단가의 변동을 평균화합니다. |
| `exchangeratedate` | 환율이 설정된 날짜입니다. |
| `exchangeratepricingtobilling` | 가격 책정 통화의 비용을 청구 통화로 변환하는 데 사용된 환율입니다. |
| `frequency` | 요금이 반복될 것으로 예상되는지 여부를 나타냅니다. 요금은 일회성(`OneTime`)이거나, 매월 또는 매년 반복(`Recurring`)되거나, 사용량 기준(`Usage`)일 수 있습니다 |
| `InvoiceId` | 송장 PDF에 나열된 고유 문서 ID입니다. |
| `invoicesectionid` | MCA 송장 섹션의 ID입니다. |
| `invoicesectionname` | Enterprise Agreement(EA) 부서의 이름입니다. |
| `isazurecrediteligible` | `true` 요금을 Azure 크레딧으로 결제할 수 있는 경우입니다. |
| `location` | 리소스가 실행 중인 데이터 센터 위치입니다. |
| `metercategory` | 이 사용량이 속한 최상위 서비스(예: `Networking`)입니다. |
| `meterid` | 미터의 고유 ID입니다. |
| `metername` | 라인 항목의 사용 세부 정보(예: `L8s v2` 또는 `General Purpose Data Stored`)입니다. |
| `meterregion` | 위치 기반으로 가격이 책정된 서비스의 데이터 센터 위치(예: `West US 2`)입니다. `resourcelocation`을 사용하여 `N/A` 없이 위치 데이터를 확인하세요. |
| `metersubcategory` | 미터 하위 분류 범주의 이름(예: `General Purpose - Storage`)입니다. `metername` 또는 `metercategory`를 사용하여 `N/A` 없이 최상위 분류를 확인하세요. |
| `offerid` | 구매한 오퍼의 이름입니다. |
| `partnumber` | 특정 미터 가격을 가져오는 데 사용되는 ID입니다. |
| `planname` | 마켓플레이스를 통해 구매한 경우 마켓플레이스 플랜 이름입니다. |
| `PreviousInvoiceId` | 이 라인 항목이 환불인 경우 원래 송장에 대한 참조입니다. |
| `PricingCurrency` | 협상된 가격을 기준으로 요금을 책정할 때 사용되는 통화입니다. |
| `pricingmodel` | 사용 유형(예: `Reservation`)입니다. |
| `ProductId` | 특정 Azure 제품의 식별자입니다. |
| `productname` | VM 또는 디스크 유형 및 리전과 같은 세부 수준의 Azure 제품 이름입니다. |
| `productorderid` | 제품 주문 ID입니다. `productname`을 사용하여 `N/A` 없이 최상위 제품 정보를 확인하세요. |
| `productordername` | 제품 주문의 이름입니다. `productname`을 사용하여 `N/A` 없이 최상위 제품 정보를 확인하세요. |
| `publishername` | 마켓플레이스 서비스의 게시자입니다. |
| `publishertype` | 게시자 유형입니다. Microsoft Customer Agreement 계정의 경우 `Microsoft`, Enterprise Agreement 계정의 경우 `Azure`입니다. |
| `reservationid` | 구매한 예약 인스턴스의 ID입니다. `N/A` 값이 표시되는 경우 해당 값은 `OnDemand` 리소스를 나타내며 `pricingmodel` 태그를 사용하여 확인할 수 있습니다. |
| `reservationname` | 구매한 예약 인스턴스의 이름입니다. `N/A` 값이 표시되는 경우 해당 값은 `OnDemand` 리소스를 나타내며 `pricingmodel` 태그를 사용하여 확인할 수 있습니다. |
| `resourcegroup` | 리소스가 포함된 리소스 그룹의 이름입니다. 모든 요금이 리소스 그룹에 배포된 리소스에서 발생하는 것은 아닙니다. |
| `resourceid` | Azure 리소스의 ID입니다. |
| `resourcelocation` | 리소스가 실행 중인 데이터 센터 위치입니다(예: `westus2`). |
| `resourcename` | 리소스의 이름입니다. 모든 요금이 배포된 리소스에서 발생하는 것은 아닙니다. |
| `resourcetype` | Azure 리소스의 유형입니다. |
| `servicefamily` | 서비스가 속한 서비스 제품군입니다(예: `Compute`). `consumedservice` 태그에서 인프라 유형에 대한 더 자세한 정보를 확인할 수 있습니다. |
| `ServicePeriodEndDate` | Azure 서비스 기간의 종료일입니다. |
| `ServicePeriodStartDate` | Azure 서비스 기간의 시작일입니다. |
| `subscriptionid` | Azure 구독의 ID입니다. |
| `subscriptionname` | Azure 구독의 이름입니다. |
| `term` | Savings Plan의 기간 또는 약정 기간을 개월 단위로 설명합니다(예: `12`). |
| `unitofmeasure` | 서비스 청구 단위입니다. 예를 들어 컴퓨팅 서비스는 시간당 청구됩니다. |


#### 비용 및 관측성 상관 분석 {#cost-and-observability-correlation}

비용을 관측성 데이터와 함께 확인하는 것은 인프라 변경이 비용에 미치는 영향을 이해하고, 비용 변동 원인을 파악하며, 비용과 성능을 모두 최적화하는 데 중요합니다. Datadog은 관측성 및 비용 메트릭의 상관관계를 간소화하기 위해 주요 Azure 제품의 비용 데이터에 `name` 태그를 추가합니다.

예를 들어 각 Azure VM의 비용 및 사용률을 조회하려면 `azure.cost.amortized` 및 `azure.vm.network_in_total`(또는 다른 VM 메트릭)을 포함하는 표를 만들고 `name` 기준으로 그룹화할 수 있습니다. 또는 스토리지 사용량과 비용을 나란히 보려면 `metercategory:Storage`로 필터링하고 `azure.storage.transactions` 및 `azure.cost.amortized`을 `name` 기준으로 그룹화하여 그래프로 표시할 수 있습니다.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]:  https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]:  https://docs.datadoghq.com/ko/integrations/azure/?tab=azurecliv20#setup
[3]:  https://app.datadoghq.com/cost/setup
[4]:  https://app.datadoghq.com/integrations/azure
[5]:  https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/config
[6]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]:  https://support.microsoft.com
[8]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports
[9]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-daily-usage
[10]: https://docs.azure.cn/en-us/cost-management-billing/manage/resolve-past-due-balance#check-the-type-of-your-account
[12]: /ko/cloud_cost_management/tags
[13]: /ko/api/latest/cloud-cost-management/#create-cloud-cost-management-azure-configs
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/azure_uc_config
[15]: https://learn.microsoft.com/en-us/azure/cost-management-billing/microsoft-customer-agreement/onboard-microsoft-customer-agreement
[16]: /ko/help/
[17]: ?tab=manual#generate-cost-exports
[18]: #migrate-exports-from-an-ea-to-an-mca
[19]: ?tab=terraform