---
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
title: Datadog에 Azure 로그 전송
---

## 개요

이 가이드를 사용하여 Azure 구독에서 Datadog로 로깅을 설정하세요.

Datadog 에이전트 또는 DaemonSet을 사용하여 Azure에서 Datadog로 로그를 전송할 것을 권장합니다. 일부 리소스의 경우 가능하지 않을 수 있습니다. 해당 경우, Azure 이벤트 허브를 사용하여 로그 포워딩 파이프라인을 생성하고 [Azure 플랫폼 로그][2]를 수집할 수 있습니다. Azure 플랫폼 로그를 이벤트 허브로 전달할 수 없는 리소스의 경우 Blob Storage 포워딩 옵션을 사용할 수 있습니다.

**모든 사이트**: 모든 Datadog 사이트는 이 페이지의 단계를 사용하여 Azure 로그를 Datadog에 전송할 수 있습니다.

**US3**: 조직이 Datadog US3 사이트를 사용하는 경우 Azure 네이티브 통합을 사용하여 Azure 로그 포워딩 설정을 단순화할 수 있습니다. Datadog는 가능한 경우 이 방법을 사용할 것을 권장합니다. 설정은 [Azure의 Datadog 리소스][5]를 통해 이루어집니다. 이는 로그 포워딩을 위한 Azure 이벤트 허브 프로세스를 대체합니다. 자세한 내용은 [Azure 네이티브 로깅 가이드][4]를 참조하세요.

{{< tabs >}}

{{% tab "Automated Installation" %}}

시작하려면 아래 버튼을 클릭하고 Azure 포털에서 양식을 작성하세요. 활동 로그 스트리밍을 Datadog 계정으로 가져오는 데 필요한 Azure 리소스가 배포됩니다.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

또는 Datadog에서 Azure 활동 로그 및 Azure 플랫폼 로그(리소스 로그 포함)를 전송하는 데 사용할 수 있는 자동화된 스크립트가 제공됩니다.

### Azure 활동 로그

다음 단계에 따라 로그 활동을 Datadog 계정으로 스트리밍하는 데 필요한 Azure 리소스를 생성하고. 설정하는 스크립트를 실행합니다. 이러한 리소스는 활동 로그 진단 설정, Azure 함수, 이벤트 허브 네임스페이스 및 이벤트 허브를 포함합니다.

1. Azure 포털에서 **Cloud Shell**로 이동합니다.

{{< img src="integrations/azure/azure_cloud_shell.png" alt="Azure Cloud Shell" popup="true" style="width:100%">}}

2. 아래 명령을 실행하여 Cloud Shell 환경으로 자동 스크립트를 다운로드할 수 있습니다.

{{< code-block lang="powershell" filename="활동 로그 단계 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1", "activity_logs_deploy.ps1")

{{< /code-block >}}

또한 [스크립트 내용 보기](https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1)에서 확인할 수 있습니다.

3. 아래 명령을 실행하여 스크립트를 호출하고, **`<API_KEY>`**를 [Datadog API 토큰](https://app.datadoghq.com/organization-settings/API-키)으로, **`<SUBSCRIPTION_ID>`**를 Azure 구독 ID로 바꿉니다. [부수적인 파라미터](#부수적인-파라미터)을 추가해 배포를 설정합니다.

{{< code-block lang="powershell" filename="활동 로그 단계 2" >}}

./activity_logs_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID>

{{< /code-block >}}

### Azure 플랫폼 로그

Azure 플랫폼 로그(리소스 포함 로그)을 전송하려면 이벤트 허브와 로그 포워더(Forwarder) 함수 쌍을 배포합니다.
배포한 후에는 각 로그 소스에 대한 진단 설정을 생성하여 Datadog에 로그를 스트리밍합니다.

1. Azure 포털에서 **Cloud Shell**로 이동합니다.

2. 아래 Powershell 명령을 실행하여 자동화 스크립트를 Cloud Shell 환경에 다운로드하세요.

   {{< code-block lang="powershell" filename="Platform 로그 Step 1" >}}

   (New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/resource_deploy.ps1", "resource_deploy.ps1")

   {{< /code-block >}}

   또한 [스크립트 내용 보기](https://github.com/Datadog/Datadog-서버리스-기능/함수/blob/master/azure/eventhub_log_forwarder/resource_deploy.ps1)에서 확인할 수 있습니다.

3. 아래 Powershell 명령을 실행하여 **`<API_KEY>`**를 [Datadog API 토큰](https://app.datadoghq.com/organization-settings/api-keys)으로, **`<SUBSCRIPTION_ID>`**를 Azure 구독 ID로 대체하여 스크립트를 호출합니다. 다른 부수적인 파라미터를 추가하여 배포를 설정할 수도 있습니다. [부수적 파라미터](#optional-parameters)를 참조하세요.

   {{< code-block lang="powershell" filename="Platform Logs Step 2" >}}

   ./resource_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID>

   {{< /code-block >}}

4. 모든 Azure 리소스에 대한 진단 설정을 생성하여 로그를 Datadog로 전송합니다. 이러한 진단 설정을 방금 생성한 이벤트 허브로 스트리밍하도록 설정합니다.

플랫폼 로그 파이프라인을 위해 배포된 모든 Azure 리소스의 기본 이름에는 ResourceGroup-Location가 추가됩니다. 예: `datadog-eventhub-westus`. 그러나 파라미터를 재정의하여 이 규칙을 변경할 수 있습니다.

**참고**: 리소스는 동일한 Azure 지역에 있는 이벤트 허브로만 스트리밍할 수 있으므로 리소스 로그를 스트리밍하려는 각 지역에 대해 2단계를 반복합니다.

### 활동과 리소스 로그 모두 설정

활동 로그와 리소스 로그 모두를 스트리밍하려면 부수적인 파라미터 `-ResourceGroupLocation<REGION> `. Activity logs are a subscription-level source, so you can create your pipeline for them in any region. Once this is deployed, send resource logs through the same Event Hub by adding diagnostic settings on your resources in ` westus`를 포함하는 첫 번째 스크립트를 실행합니다.

**참고**: 이 통합은 이벤트를 수집하지 않습니다.

### 부수적 매개 변수

**참고**: 다음 파라미터를 커스터마이즈할 때 커스텀 리소스 이름이 고유한지 확인하세요. 리소스 이름이 다른 Azure 리소스의 목록 내에 이미 존재하지 않는지 확인합니다.

 | -Flag `<Default Parameter>`                                                   | 설명                                                                                                                                                                         |
 |-------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | -DatadogSite `<datadoghq.com>`                                                | 이 플래그를 다른 Datadog 사이트와 함께 파라미터로 추가하여 Datadog 인스턴스를 커스터마이즈합니다.  Datadog 사이트는 {{< region-param key="dd_site" code="true" >}}가 됩니다. |
 | -Environment `<AzureCloud>`                                                   | 이 플래그를 파라미터로 추가하여 Azure 독립 클라우드에서 스토리지를 관리합니다. 추가 옵션에는 `AzureChinaCloud`, `AzureGermanCloud` 및 `AzureUSGovernment`가 있습니다.        |
 | -ResourceGroupLocation `<westus2>`                                            | 이 플래그를 업데이트된 Azure 지역과 함께 추가하여 Azure 리소스 그룹 및 리소스가 배포되는 지역을 선택할 수 있습니다.                                                          |
 | -ResourceGroupName `<datadog-log-forwarder-rg>`                               | 업데이트된 파라미터 으로 이 플래그를 추가하여 Azure 리소스 그룹의 이름을 사용자 지정합니다.                                                                                  |
 | -EventhubNamespace `<datadog-ns-4c6c53b4-1abd-4798-987a-c8e671a5c25e>`        | 업데이트된 파라미터 플래그와 함께 이 플래그를 추가하여 Azure 이벤트 허브 네임스페이스를 커스터마이즈하세요. 기본적으로 `datadog-ns-<globally-unique-ID>`가 생성됩니다.       |
 | -EventhubName `<datadog-eventhub>`                                            | 업데이트된 파라미터 플래그와 함께 이 플래그를 추가하여 Azure 이벤트 허브의 이름을 커스터마이즈합니다.                                                                        |
 | -FunctionAppName `<datadog-functionapp-1435ad2f-7c1f-470c-a4df-bc7289d8b249>` | 업데이트된 파라미터로 이 플래그를 추가하여 Azure 함수 앱의 이름을 커스터마이즈합니다. 기본적으로 `datadog-functionapp-<globally-unique-ID>`가 생성됩니다.                    |
 | -FunctionName `<datadog-function>`                                            | 업데이트된 파라미터로 이 플래그를 추가하여 Azure 함수의 이름을 커스터마이즈합니다.                                                                                           |
 | -DiagnosticSettingName `<datadog-activity-logs-diagnostic-setting>`           | 업데이트된 파라미터로 이 플래그를 추가하여 Azure 진단 설정의 이름을 커스터마이즈하세요. **(로그 활동 전송에만 해당)**                                                        |

설치 오류가 발생했나요? 일반적인 오류 사례는 [자동화된 로그 수집][1]을 참조하세요.

[101]: /ko/integrations/guide/azure-troubleshooting/#automated-log-collection
{{% /tab %}}

{{% tab "Blob Storage" %}}

{{% site-region region="us3,us5,gov,ap1" %}}
<div class="alert alert-warning">
Datadog {{< region-param key="dd_site_name" >}} 사이트에서는 지원되지 않습니다.
</div>
{{% /site-region %}}

Datadog는 Azure 로그 수집용 이벤트 허브 설정을 사용할 것을 권장합니다. 그러나 이 섹션의 단계에 따라 모든 Azure 앱(서비스 로그)을 Azure Blob Storage에서 포워딩할 수도 있습니다:

1. 아직 [Azure Blob Storage][301]를 설정하지 않은 경우 다음 방법 중 하나를 사용하여 시작하세요.
   - [Azure 포털][302]
   - [Azure 저장소 탐색기][303]
   - [Azure CLI][304]
   - [Powershell][305]
2. 아래 지침에 따라 Blob Storage에서 로그를 포워딩하도록 Datadog-Azure 함수를 설정합니다.
3. Azure 앱 서비스를 설정하여 [Blob Storage로 로그를 포워딩][306]합니다.

##### 함수 앱 생성

이미 이 용도로 설정된 함수 앱이 있는 경우 [이벤트 허브 트리거 템플릿을 사용하여 함수 앱에 새 함수 추가]로 건너뛰세요(##add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. Azure 포털에서 [함수 앱 개요][309]로 이동하여 **생성**을 클릭합니다.
2. **인스턴스 세부 정보** 섹션에서 다음 설정을 설정합니다:
  a. **코드** 라디오 버튼을 선택합니다.
  b. **런타임 스택**의 경우 `Node.js`를 선택합니다.
  c. **버전**의 경우 `18 LTS`를 선택합니다.
  d. **운영 체제**의 경우 `Windows`를 선택합니다.
3. 원하는 대로 기타 설정을 설정합니다.
4. **검토 + 생성**을 클릭하여 리소스의 유효성을 검사합니다. 유효성 검사에 성공하면 **생성**을 클릭합니다.

##### Azure Blob Storage 트리거 템플릿을 사용하여 함수 앱에 새 함수 추가

1. [함수 앱 개요][309]에서 신규 또는 기존 함수 앱을 선택합니다.
2. **기능/함수** 탭 에서 **생성**을 클릭합니다.
3. **개발 환경** 필드에서 **포털에서 개발**을 선택합니다.
4. **템플릿 선택**에서 [Azure Blob Storage 트리거][313]를 선택합니다.
5. **저장소 계정 연결**을 선택합니다.
   **참고**: 자세한 내용은 [Azure 스토리지 계정의 연결 문자열 설정][311]을 참조하세요.
6. **생성**을 클릭합니다.

자세한 내용은 [Azure 함수 시작하기][307]를 참조하세요.

##### Blob Storage 트리거를 Datadog로 지정합니다.

1. 이벤트 허브 트리거의 상세 페이지(함수)에서 **개발자** 사이드 메뉴의 **코드 + 테스트**를 클릭합니다.
2. 함수의 `index.js` 파일에 [Datadog-Azure 함수 코드][308]를 추가합니다.
3. Datadog API 키를 `DD_API_KEY` 환경 변수에 추가하거나 20줄에서 `<DATADOG_API_KEY>`를 함수 코드로 대체하여 복사합니다.
4. Datadog US1 사이트를 사용하지 않는 경우, 함수 앱의 설정 탭 아래에 `DD_SITE` 환경 변수를 사용하여 [Datadog 사이트][312]를 설정하거나 파라미터 사이트를 21줄의 함수 코드에 복사합니다.
5. 함수를 **저장** 합니다.
6. **개발자** 사이드 메뉴에서 **통합**을 클릭합니다.
7. **트리거 및 입력**에서 **Azure Blob Storage**를 클릭합니다.
8. **Blob 파라미터 이름**을 `blobContent`로 설정하고 **저장**을 클릭합니다.
9. 이 리소스에서 로그에 대한 [Datadog 로그 탐색기][310]를 확인하여 설정이 올바른지 검증합니다.

[301]: https://azure.microsoft.com/en-us/services/storage/blobs/
[302]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[303]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[304]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[305]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[306]: https://learn.microsoft.com/en-us/training/modules/store-app-data-with-azure-blob-storage/
[307]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-get-started
[308]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[309]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[310]: https://app.datadoghq.com/logs
[311]: https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[312]: https://docs.datadoghq.com/ko/getting_started/site/
[313]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
{{% /tab %}}
{{< /tabs >}}

## 로그 아카이빙

로그를 Azure Blob Storage에 아카이브하려면 Azure Native 통합을 사용하는 경우에도 앱 등록이 필요합니다. 로그 을 Azure Blob Storage에 아카이브하려면 앱 등록을 사용하여 통합 설정 지침을 따르세요. 아카이브 목적으로 만든 앱 등록에는 `Monitoring Reader` 역할을 할당할 필요가 없습니다.

앱 등록을 설정한 후에는 Azure Blob Storage에 기록하는 [로그 아카이브 생성][3]을 수행할 수 있습니다.

**참고**: 저장소 버킷이 Azure Native 통합을 통해 모니터링 중인 구독에 포함된 경우, 앱 등록이 중복되었다는 경고가 Azure 통합 타일에 표시됩니다. 이 경고는 무시해도 됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/platform-logs-overview
[3]: /ko/logs/log_configuration/archives/
[4]: /ko/logs/guide/azure-native-logging-guide/
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
