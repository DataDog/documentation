---
description: App and API Protection 콜아웃 서비스를 사용하여 Azure API Management 게이트웨이에 위협 탐지
  및 차단 기능을 추가하세요.
further_reading:
- link: /security/application_security/setup/azure/api-management/configuration
  tag: 설명서
  text: Azure API Management 콜아웃 구성하기
- link: /security/application_security/setup/azure/api-management/policies
  tag: 설명서
  text: App and API Protection을 위한 Azure API Management 정책
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: 소스 코드
  text: App and API Protection Azure API Management 콜아웃 소스 코드
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 문제 해결하기
title: Azure API Management용 App and API Protection 활성화하기
---
{{< callout url="#" btn_hidden="true" header="Azure API Management용 App and API Protection은 미리 보기로 제공되고 있습니다." >}}
Azure API Management용 App and API Protection 미리 보기를 사용해 보려면 다음 설정 지침을 따르세요.
{{< /callout >}}

Azure API Management(APIM)용 App and API Protection은 백엔드 코드 변경 없이 APIM 게이트웨이에 위협 탐지 및 차단 기능을 추가합니다. APIM은 관리형 서비스이므로 프로세스 내 트레이서를 실행할 수 없습니다. 대신 Datadog은 게이트웨이가 APIM 정책에서 호출하는 HTTP 콜아웃 서비스를 제공합니다. 각 요청에 대해 서비스는 Datadog 웹 애플리케이션 방화벽(WAF)을 실행하고 계속 또는 차단이라는 결정을 반환합니다.

보호 기능은 게이트웨이에서 적용되므로 언어에 관계없이 게이트웨이 뒤의 모든 API를 포괄합니다. 여기에는 귀하가 소유하지 않은 타사 및 레거시 API가 포함됩니다.

## 작동 방식 {#how-it-works}

Azure API Management는 들어오고 나가는 과정에서 정책을 평가합니다. Datadog 정책은 각 단계에서 Datadog 콜아웃 서비스에 [`send-request`][1] 콜아웃을 추가한 다음, 정책 변수에서 결정을 읽습니다.

이 교환은 네 가지 호출을 사용합니다.

1. **인바운드, 요청 헤더.** 서비스는 요청 ID, Datadog 트레이스 전파 헤더를 반환하며, 본문 검사가 적용될 경우 허용되는 본문 바이트 수를 반환합니다.
2. **인바운드, 요청 본문.** 이전 단계에서 본문을 요청했을 때만 실행됩니다.
3. **아웃바운드, 응답 헤더.**
4. **아웃바운드, 응답 본문.** 이전 단계에서 본문을 요청했을 때만 실행됩니다.

요청 ID는 네 단계 모두를 단일 WAF 평가 컨텍스트에 연결합니다. 인바운드 단계에서 차단 결정이 반환되면, APIM은 클라이언트에 차단 응답을 반환하며 백엔드를 호출하지 않습니다. 아웃바운드 단계에서 차단 결정이 반환되면, 백엔드는 이미 실행된 상태이며 APIM은 해당 응답을 차단 응답으로 대체합니다. 계속으로 결정이 내려지면, APIM은 Datadog 트레이스 컨텍스트 헤더를 삽입하고 평소와 같이 요청을 전달합니다.

이 통합은 모든 단계에서 fail-open 방식으로 작동합니다. 각 콜아웃은 `ignore-error="true"`를 설정하므로, 콜아웃 서비스에 연결할 수 없거나, 시간이 초과되거나, `200` 이외의 응답을 반환하는 경우 트래픽은 수정되지 않은 상태로 진행됩니다. 잘못된 구성은 트래픽 중단이 아니라 보안 데이터 누락으로 나타납니다.

정책 내부 구조에 대해서는 [App and API Protection을 위한 Azure API Management 정책][2]을 참조하세요.

## 전제 조건 {#prerequisites}

- Azure 구독.
- **Developer**, **Standard v2** 또는 **Premium** 계층의 기존 Azure API Management 인스턴스. 이 통합은 콜아웃 서비스를 가상 네트워크 내부에 배치하며 APIM 가상 네트워크 통합이 필요하므로 **Consumption** 계층은 지원되지 않습니다.
- [Datadog API 키][3].
- 대상 리소스 그룹에 ARM 또는 Bicep 템플릿을 배포하고 APIM 정책을 편집할 수 있는 권한.
- APIM 리소스에서의 `Microsoft.Authorization/roleAssignments/write` . 이 템플릿은 관리 ID에 **API Management 서비스 기여자** 역할을 부여하여 가상 네트워크 통합을 구성할 수 있도록 합니다. 이 역할 할당은 `deployPolicy`가 `false`일 때를 포함하여 모든 배포 시 생성됩니다.
- 선택 사항: 컨테이너 앱 로그를 수집하기 위한 기존 Log Analytics 작업 영역.

## 콜아웃 서비스 배포 {#deploy-the-callout-service}

**Azure로 배포**를 클릭한 후 Azure 포털에서 양식을 작성하세요.

[![Azure로 배포](https://aka.ms/deploytoazurebutton)][4]

두 개의 파라미터가 필요합니다.

| 파라미터         | 값                                                                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `datadogApiKey`   | Datadog API 키입니다. Azure 포털에서 **Key Vault 시크릿 참조**를 선택하고 기존 Key Vault 시크릿을 사용하세요.|
| `apimServiceName` | 보호할 기존 APIM 인스턴스의 이름.                                                                                          |

템플릿 제공 사항:

- APIM, 콜아웃 서비스 및 Datadog Agent를 위한 별도의 서브넷이 있는 가상 네트워크. 또한 이 템플릿은 네트워크 보안 그룹과 송신을 위한 NAT 게이트웨이를 생성합니다.
- KEDA HTTP 자동 크기 조정을 사용하는 Azure 컨테이너 앱의 콜아웃 서비스. 인그레스는 `8080` 포트, 상태 프로브는 `8081` 포트에서 이루어지며, 서비스는 복제본당 20개의 동시 요청에서 1개에서 10개의 복제본으로 확장됩니다.
- 프라이빗 서브넷에 있는 Azure 컨테이너 인스턴스의 Datadog Agent. 콜아웃 서비스는 트레이스 및 보안 이벤트를 Agent로 전송합니다.
- APIM이 내부 컨테이너 앱 호스트 이름을 확인할 수 있도록 하는 프라이빗 DNS 영역 및 가상 네트워크 링크.
- 기존 APIM 인스턴스에 대한 가상 네트워크 통합 및 선택적으로 Datadog 정책 자체.

다른 모든 파라미터에는 기본값이 있습니다. 유용한 기본값은 다음과 같습니다.

| 파라미터                     | 기본값                                              |
|-------------------------------|------------------------------------------------------|
| `namePrefix`                  | `dd-apim`                                            |
| `datadogSite`                 | {{< region-param key="dd_site" code="true" >}}       |
| `deployPolicy`                | `false`                                              |
| `enableHttps`                 | `false`                                              |
| `containerImage`              | `ghcr.io/datadog/dd-trace-go/apim-callout:latest`    |
| `vnetAddressPrefix`           | `10.0.0.0/16`                                        |
| `minReplicas` / `maxReplicas` | `1` / `10`                                           |
| `concurrentRequestsThreshold` | `20`                                                 |
| `targetApiIds`                | 비어 있음, 모든 API에 적용됨                     |

명령줄이나 자체 코드형 인프라(IaC)에서 배포하려면 [Azure API Management 콜아웃 구성][5]을 참조하세요.

## Datadog 정책 적용 {#apply-the-datadog-policy}

콜아웃 서비스는 게이트웨이가 전송하는 트래픽만 검사하므로 보호하려는 API에 Datadog 정책을 연결하세요.

두 가지 옵션이 있습니다.

- `deployPolicy`를 `true`로 설정하고 배포 시 정책이 삽입되도록 합니다. `targetApiIds` 파라미터는 정책을 적용할 API를 선택하며 기본값은 모든 API입니다.
- 제공된 정책 XML을 APIM 정책 편집기에서 직접 적용하세요. 자리 표시자 URL`https://<dd-apim-callout-host>:8080`의 모든 항목을 호스트 이름만이 아닌 배포의 `calloutBaseUrl` 출력으로 바꾸세요. `enableHttps`를 `true`로 설정하지 않으면 출력은 `http://<ACA-FQDN>`이며 포트는 포함되지 않습니다. `https` 스킴 또는 `:8080` 접미사를 그대로 두면 정책이 서비스에 연결하지 못하고 fail open 상태가 됩니다.

<div class="alert alert-warning">
' <code>deployPolicy</code> '를 <code>true</code> 로 설정하면 선택한 각 범위에서 정책을 <strong>대체</strong>하게 됩니다. 이미 있는 항목과 병합되지 않으므로 해당 범위의 기존 규칙은 모두 손실됩니다. 보호 중인 API에 이미 정책 콘텐츠가 있는 경우 직접 정책을 적용하고 Datadog 인바운드 및 아웃바운드 조각을 기존 섹션에 병합하세요.
</div>

정책 콘텐츠, 첨부 범위 및 차단이 클라이언트 응답이 되는 방식에 대한 자세한 내용은 [App and API Protection을 위한 Azure API Management 정책][2]을 참조하세요.

## 배포 유효성 검사 {#validate-the-deployment}

일반 요청을 전송한 후, 시뮬레이션된 공격을 전송하세요.

```shell
# Normal request: passes through to your backend
curl -v https://<apim-gateway-host>/<api-path>

# Simulated attack: returns 403
curl -v -A dd-test-scanner-log-block "https://<apim-gateway-host>/<api-path>"
```

Datadog에서 결과를 확인하세요.

1. [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App and API Protection{{< /ui >}}][6]을 열고 시뮬레이션된 공격이 신호로 나타나는지 확인합니다.
2. [App and API Protection 서비스 인벤토리][7]를 열고 `apim-callout` 서비스가 나타나는지 확인합니다. 해당 스팬에는 `component:apim-callout` 태그가 있습니다. 다른 서비스 이름을 사용하려면 콜아웃 컨테이너에 `DD_SERVICE`를 설정하세요.

또한 콜아웃 서비스는 `8081` 포트에서 상태 엔드포인트를 노출합니다. 컨테이너 앱 인그레스는 `8080` 포트만 게시하므로 상태 엔드포인트는 컨테이너 내부에서만 연결할 수 있습니다. Azure 컨테이너 앱은 이를 활성 및 준비 상태 프로브에 사용합니다. 상태를 검사하려면 Azure 포털에서 복제본 상태를 검토하세요.

## 성능 {#performance}

0.5 vCPU, 1 GiB Azure 컨테이너 앱 배포에서 측정한 결과입니다.

| 단계                                                          | 처리 시간 |
|----------------------------------------------------------------|-----------------|
| 요청 헤더                                                | ~2.4 ms         |
| 응답 헤더                                               | ~2.4 ms         |
| 콜아웃과 백엔드를 모두 포함한 전체 APIM 파이프라인    | ~9.7 ms         |

본문 단계는 본문 검사가 활성화되어 있고 이전 단계에서 본문을 요청한 경우에만 실행됩니다. 네트워크 왕복 시간을 최소화하려면 APIM 인스턴스와 동일한 Azure 지역에 콜아웃 서비스를 배포하세요.

## 호환성 {#compatibility}

이 통합에서 지원하는 기능 및 해당 기능이 도입된 버전에 대한 자세한 내용은 [App and API Protection 호환성 요구 사항][8]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
[2]: /ko/security/application_security/setup/azure/api-management/policies
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdd-trace-go%2Fmain%2Fcontrib%2Fazure%2Fapim-callout%2Fdeploy%2Fazure%2Fazuredeploy.json
[5]: /ko/security/application_security/setup/azure/api-management/configuration
[6]: https://app.datadoghq.com/security/appsec
[7]: https://app.datadoghq.com/security/appsec/inventory/services
[8]: /ko/security/application_security/setup/compatibility/