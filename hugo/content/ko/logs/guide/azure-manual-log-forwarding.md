---
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/guide/reduce_data_transfer_fees
  tag: 가이드
  text: 데이터 전송 수수료를 줄이면서 로그를 Datadog로 보내는 방법
title: Azure 수동 로그 포워딩 설정
---
## 개요 {#overview}

이 가이드를 사용하여 Azure에서 원하는 Datadog 사이트로 로그를 수동으로 포워딩하도록 설정합니다.

**참고**: Azure Log Analytics Workspace에서 로그를 수집하려면 [자동화된 ARM 템플릿][1] 또는 [Azure Container App][2] 프로세스를 사용합니다.

<div class="alert alert-info">
2025년 4월 30일부터 Azure는 더 이상 Node.js 18을 지원하지 않습니다. 호환성을 유지하려면 동일한 파라미터를 사용하여 Azure Resource Manager(ARM) 템플릿으로 업데이트합니다.
</div>

## 설정 {#setup}

[Azure Container App][4] 또는 [Azure Blob Storage][3] 계정을 통해 로그를 포워딩할 수 있습니다.

{{< tabs >}}

{{% tab "컨테이너 앱(권장)" %}}

1. 아래의 버튼을 클릭하고 Azure 포털에서 양식을 작성합니다. Datadog은 Datadog 계정으로 로그를 포워딩하는 데 필요한 Azure 리소스를 자동으로 배포합니다.

[![Azure로 배포](https://aka.ms/deploytoazurebutton)][200]

2. 템플릿 배포가 완료된 후, 각 로그 소스에 대해 [진단 설정][201]을 구성하여 Azure 플랫폼 로그(리소스 로그 포함)를 배포 중에 생성된 스토리지 계정으로 전송합니다.

**참고**: 리소스는 동일한 Azure 리전의 스토리지 계정으로만 스트리밍할 수 있습니다.

[200]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json/uiFormDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FmanualForwarderUiDefinition.json
[201]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
{{% /tab %}}

{{% tab "Blob Storage" %}}

1. 아직 [Azure Blob Storage][100]를 설정하지 않은 경우 다음 방법 중 하나로 시작합니다.
   - [Azure 포털][101]
   - [Azure Storage Explorer][102]
   - [Azure CLI][103]
   - [PowerShell][104]
2. 아래 지침에 따라 Blob Storage에서 로그를 포워딩하도록 Datadog-Azure 함수를 설정합니다.
3. Azure App Services에서 [Blob Storage로 로그를 포워딩하도록][105] 구성합니다.

##### 함수 앱 생성 {#create-a-function-app}

이미 이 용도로 설정된 함수 앱이 있는 경우 [이벤트 허브 트리거 템플릿을 사용하여 함수 앱에 새 함수 추가](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template)로 건너뛰세요.

1. Azure 포털에서 [함수 앱 개요][106]로 이동하여 {{< ui >}}Create{{< /ui >}}를 클릭합니다.
2. {{< ui >}}Instance Details{{< /ui >}} 섹션에서 다음 항목을 설정합니다.
   1. {{< ui >}}Code{{< /ui >}} 라디오 버튼을 선택합니다.
   1. {{< ui >}}Runtime stack{{< /ui >}}에 대해 `Node.js`를 선택합니다.
   1. {{< ui >}}Version{{< /ui >}}에 대해 `18 LTS`를 선택합니다.
   1. {{< ui >}}Operating System{{< /ui >}}에 대해 `Windows`를 선택합니다.
3. 기타 설정을 원하는 대로 구성합니다.
4. {{< ui >}}Review + create{{< /ui >}}를 클릭하여 리소스의 유효성을 검증합니다. 유효성 검사에 성공하면 {{< ui >}}Create{{< /ui >}}를 클릭합니다.

##### Azure Blob Storage 트리거 템플릿을 사용하여 함수 앱에 새 함수 추가 {#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template}

1. [함수 앱 개요][106]에서 신규 또는 기존 함수 앱을 선택합니다.
2. {{< ui >}}Functions{{< /ui >}} 탭에서 {{< ui >}}Create{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Development environment{{< /ui >}} 필드에서 {{< ui >}}Develop in portal{{< /ui >}}을 선택합니다.
4. {{< ui >}}Select a template{{< /ui >}} 아래에서 [Azure Blob Storage 트리거][107]를 선택합니다.
5. {{< ui >}}Storage account connection{{< /ui >}}을 선택합니다.
   **참고**: 자세한 내용은 [Azure 스토리지 계정의 연결 문자열 설정][108]을 참조하세요.
6. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

자세한 내용은 [Azure 함수 시작하기][109]를 참조하세요.

##### Blob Storage 트리거를 Datadog으로 연결 {#point-your-blob-storage-trigger-to-datadog}

1. 이벤트 허브 트리거 함수의 상세 페이지에서 {{< ui >}}Developer{{< /ui >}} 사이드 메뉴 아래의 {{< ui >}}Code + Test{{< /ui >}}를 클릭합니다.
2. 함수의 `index.js` 파일에 [Datadog-Azure 함수 코드][110]를 추가합니다.
3. Datadog API 키를 `DD_API_KEY` 환경 변수로 추가하거나 함수 코드의 20번째 줄에 있는 `<DATADOG_API_KEY>`를 API 키로 대체합니다.
4. Datadog US1 사이트를 사용하지 않는 경우, 함수 앱의 구성 탭에서 `DD_SITE` 환경 변수로 [Datadog 사이트][111]를 설정하거나 함수 코드의 21번째 줄에 사이트 파라미터를 직접 입력합니다.
5. {{< ui >}}Save{{< /ui >}} 함수를 저장합니다.
6. {{< ui >}}Developer{{< /ui >}} 사이드 메뉴에서 {{< ui >}}Integration{{< /ui >}}을 클릭합니다.
7. {{< ui >}}Trigger and inputs{{< /ui >}} 아래의 {{< ui >}}Azure Blob Storage{{< /ui >}}를 클릭합니다.
8. {{< ui >}}Blob Parameter Name{{< /ui >}}을 `blobContent`로 설정하고 {{< ui >}}Save{{< /ui >}}를 클릭합니다.
9. [Datadog Log Explorer][112]에서 이 리소스의 로그를 확인하여 설정이 올바른지 검증합니다.


[100]: https://learn.microsoft.com/azure/storage/blobs/
[101]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal
[102]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[103]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-cli
[104]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-powershell
[105]: https://learn.microsoft.com/training/modules/store-app-data-with-azure-blob-storage/
[106]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[107]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[108]: https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[109]: https://learn.microsoft.com/azure/azure-functions/functions-get-started
[110]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[111]: https://docs.datadoghq.com/ko/getting_started/site/
[112]: https://app.datadoghq.com/logs
{{% /tab %}}

{{< /tabs >}}

{{% azure-log-archiving %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/guide/azure-automated-log-forwarding/
[2]: /ko/getting_started/integrations/azure/#container-app-log-forwarding-setup
[3]: https://learn.microsoft.com/azure/storage/blobs/
[4]: https://learn.microsoft.com/azure/container-apps/