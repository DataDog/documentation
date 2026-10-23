---
description: Azure CLI, Bicep 또는 Docker를 사용하여 App and API Protection 콜아웃 서비스를 배포하고
  환경 변수를 구성합니다.
further_reading:
- link: /security/application_security/setup/azure/api-management
  tag: 문서
  text: Azure API Management용 App and API Protection 활성화하기
- link: /security/application_security/setup/azure/api-management/policies
  tag: 문서
  text: App and API Protection을 위한 Azure API Management 정책
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: 소스 코드
  text: App and API Protection Azure API Management 콜아웃 소스 코드
- link: /security/application_security/troubleshooting
  tag: 문서
  text: App and API Protection 문제 해결
title: Azure API Management 콜아웃 구성하기
---
{{< callout url="#" btn_hidden="true" header="Azure API Management용 App and API Protection은 미리 보기로 제공되고 있습니다." >}}
Azure API Management용 App and API Protection 미리 보기를 사용해 보려면 다음 설정 지침을 따르세요.
{{< /callout >}}

이 페이지에서는 원클릭 템플릿을 사용하지 않고 Azure API Management(APIM)용 App and API Protection 콜아웃 서비스를 배포하고 구성하는 방법을 설명합니다. 아직 통합을 배포하지 않았다면 [Azure API Management용 App and API Protection 활성화하기][1]부터 시작하세요.

콜아웃 서비스는 컨테이너 이미지 `ghcr.io/datadog/dd-trace-go/apim-callout:latest`로 제공됩니다. 다음 2개 포트에서 수신 대기합니다.

- `8080`은 모든 요청 및 응답 단계를 처리하는 콜아웃 엔드포인트 `POST /`를 제공합니다.
- `8081` 은 상태 엔드포인트 `GET /`을 제공합니다.

## 배포 옵션 {#deployment-options}

{{< tabs >}}
{{% tab "Azure CLI" %}}

`deploy/azure/deploy.sh` 스크립트는 `az deployment group create`를 래핑합니다.

먼저 Azure CLI가 설치 및 인증되었는지, Bicep을 사용할 수 있는지, 리소스 그룹이 존재하는지, APIM 계층이 Consumption이 아닌지 확인합니다. 그런 다음 `az deployment group what-if`를 실행하여 변경 사항을 적용하기 전에 미리 볼 수 있습니다.

```shell
DD_API_KEY=<your-datadog-api-key> \
  ./deploy/azure/deploy.sh \
  --resource-group <rg-name> \
  --apim-name <apim-service-name>
```

성공하면 스크립트가 콜아웃 URL, 컨테이너 Apps 호스트 이름, Datadog Agent IP 주소 및 정책 배포 여부를 출력합니다.

이 예시는 `--deploy-policy` 및 `--no-deploy-policy`를 모두 생략하므로 스크립트가 대신 선택합니다. 대상 범위에서 기존 정책을 읽은 후 다음 단계를 수행합니다.

- 범위에 정책이 없거나 기본 스켈레톤만 있는 경우 정책을 배포합니다.
- Datadog 콜아웃이 이미 제자리에 있거나 사용자 지정 정책 콘텐츠가 발견되면 배포를 건너뜁니다.

이는 `deployPolicy`가 기본적으로 `false`로 설정되는 Bicep 모듈과는 다릅니다. 따라서 위의 명령은 APIM 정책을 작성할 수 있습니다. 정책이 작성되지 않도록 보장하려면 `--no-deploy-policy`를 전달하세요.

사용 가능한 플래그:

| 플래그                            | 설명                                                     |
|---------------------------------|-----------------------------------------------------------------|
| `--resource-group`, `-g`        | 배포를 위한 리소스 그룹입니다.                                          |
| `--apim-name`                   | 보호할 APIM 인스턴스의 이름입니다.                           |
| `--apim-resource-group`         | 배포 리소스 그룹과 다른 경우 APIM 인스턴스가 포함된 리소스 그룹입니다. 해당 리소스 그룹에는 리소스를 생성할 권한도 필요합니다. 배포 시 관리 ID, 역할 할당 및 배포 스크립트가 생성됩니다. |
| `--api-ids`                     | 정책을 특정 API ID로 제한합니다.                        |
| `--deploy-policy`               | Datadog 정책을 주입합니다.                                      |
| `--no-deploy-policy`            | 정책 주입을 건너뜁니다.                                          |
| `--what-if`                     | 배포를 적용하지 않고 미리 봅니다.                     |
| `--name-prefix`                 | 생성된 리소스 이름의 접두사입니다.                              |
| `--container-image`             | 콜아웃 컨테이너 이미지를 재정의합니다.                           |
| `--dd-site`                     | Datadog 사이트입니다.                                                   |
| `--log-analytics-workspace-id`  | 로그용 기존 Log Analytics 작업 영역의 ID입니다.                      |
| `--vnet-address-prefix`         | 생성된 가상 네트워크의 주소 공간입니다. 서브넷 접두사는 고정되어 있으므로 이 값에 해당 접두사가 포함되어야 합니다. [주소 범위](#address-ranges)를 참조하세요. |
| `--existing-vnet-id`            | 사용할 기존 가상 네트워크의 ID입니다. 필수 서브넷 및 해당 전제 조건은 [기존 가상 네트워크 사용](#using-an-existing-virtual-network)을 참조하세요. |
| `--existing-aca-subnet-id`      | 콜아웃 서비스를 위한 기존 서브넷의 ID입니다. `--existing-vnet-id`와 함께 필수입니다. |
| `--existing-aci-subnet-id`      | Datadog Agent를 위한 기존 서브넷의 ID입니다. `--existing-vnet-id`와 함께 필수입니다. |
| `--enable-https`                | HTTPS를 통해 콜아웃 엔드포인트를 제공합니다.                          |
| `--no-locks`                    | 리소스 잠금을 건너뜁니다.                                            |
| `--min-replicas`                | 최소 콜아웃 복제본 수입니다.                                       |
| `--max-replicas`                | 최대 콜아웃 복제본 수입니다.                                       |
| `--concurrent-requests`         | 확장 전 복제본당 동시 요청 수입니다.             |

스크립트는 환경에서 `DD_API_KEY` 및 `DD_SITE`를 읽습니다.

{{% /tab %}}

{{% tab "Bicep 모듈" %}}

Infrastructure-as-Code에서 Bicep 모듈을 직접 참조합니다.

```bicep
module apimCallout 'path/to/contrib/azure/apim-callout/deploy/azure/main.bicep' = {
  name: 'dd-apim-callout'
  params: {
    datadogApiKey: keyVault.getSecret('dd-api-key')
    apimServiceName: 'my-apim'
    logAnalyticsWorkspaceId: logAnalytics.id
    // every other parameter has a default
  }
}
```

`datadogApiKey` 및 `apimServiceName`은 필수 항목입니다. 나머지 파라미터는 선택 사항입니다. `apimResourceGroup`, `targetApiIds`, `logAnalyticsWorkspaceId`, `namePrefix`, `location`, `datadogSite`, `deployPolicy`, `enableHttps`, `containerImage`, `vnetAddressPrefix`, `existingVnetId`, `existingAcaSubnetId`, `existingAciSubnetId`, `enableLocks`, `minReplicas`, `maxReplicas`, `concurrentRequestsThreshold` 및 `customTags`.

`existingVnetId`를 설정하면 `existingAcaSubnetId` 및 `existingAciSubnetId`가 필수 항목이 되며 해당 서브넷에 대한 필수 구성 요소가 추가됩니다. `vnetAddressPrefix`를 설정해도 서브넷은 이동하지 않습니다. 둘 다에 대해서는 [네트워킹](#networking)을 참조하세요.

기본값:

| 파라미터                     | 기본값                                           |
|-------------------------------|---------------------------------------------------|
| `namePrefix`                  | `dd-apim`                                         |
| `datadogSite`                 | `datadoghq.com`                                   |
| `deployPolicy`                | `false`                                           |
| `enableHttps`                 | `false`                                           |
| `containerImage`              | `ghcr.io/datadog/dd-trace-go/apim-callout:latest` |
| `vnetAddressPrefix`           | `10.0.0.0/16`                                     |
| `minReplicas` / `maxReplicas` | `1` / `10`                                        |
| `concurrentRequestsThreshold` | `20`                                              |
| `targetApiIds`                | 비어 있음, 모든 API에 적용됨                  |

허용되는 `datadogSite` 값은 `datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`, `ap2.datadoghq.com` 및 `ddog-gov.com`입니다. 현재 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

{{% /tab %}}

{{% tab "Docker" %}}

로컬 테스트 또는 Azure 외부에서 호스팅하는 경우 이미지를 직접 실행하세요.

```shell
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -e DD_AGENT_HOST=datadog-agent \
  ghcr.io/datadog/dd-trace-go/apim-callout:latest
```

서비스가 실행 중인지 확인합니다.

```shell
curl -s http://localhost:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

이 방식으로 호스팅되는 컨테이너는 여전히 APIM 게이트웨이로부터의 네트워크 연결성과 트레이스 및 보안 이벤트를 수신할 Datadog Agent가 필요합니다.

{{% /tab %}}
{{< /tabs >}}

## 네트워킹 {#networking}

### 주소 범위 {#address-ranges}

`vnetAddressPrefix` 및 `--vnet-address-prefix`는 가상 네트워크의 주소 공간을 설정하지만, 그 내부의 서브넷 접두사는 고정되어 있습니다.

| 서브넷             | 접두사         |
|--------------------|----------------|
| 콜아웃 서비스    | `10.0.1.0/27`  |
| Datadog Agent      | `10.0.2.0/24`  |
| APIM               | `10.0.3.0/27`  |

배포 시 주소 공간에서 서브넷을 파생하지 않으므로, 설정하는 모든 값에는 이러한 접두사 3개가 포함되어야 합니다. 기본값은 `10.0.0.0/16`입니다. `10.1.0.0/16`과 같은 값은 서브넷을 가상 네트워크 외부에 두기 때문에 배포에 실패합니다.

콜아웃 서비스를 다른 주소 범위에 배치하려면 대신 `existingVnetId`를 사용하여 자체 네트워크를 제공하세요.

### 기존 가상 네트워크 사용 {#using-an-existing-virtual-network}

`existingVnetId`를 설정하면 배포 시 가상 네트워크, 서브넷, 네트워크 보안 그룹 및 NAT 게이트웨이를 건너뜁니다. 대신 이를 직접 제공해야 하므로 `existingAcaSubnetId` 및 `existingAciSubnetId`가 필요하며, 각 서브넷은 배포 시 설정되었을 요구 사항을 충족해야 합니다:

- 콜아웃 서브넷에는 `Microsoft.App/environments` 위임과 Container Apps 환경에 맞는 충분한 주소가 필요합니다.
- 에이전트 서브넷에는 `Microsoft.ContainerInstance/containerGroups` 위임과 아웃바운드 연결이 필요합니다. 그래야 에이전트가 Datadog에 연결할 수 있습니다.
- 콜아웃 서비스는 `8126` 포트에서 에이전트에 연결할 수 있어야 합니다.

이 모드에서는 배포 시 APIM 서브넷도 생성되지 않으므로, APIM 인스턴스는 이미 동일한 가상 네트워크와 통합되어 있어야 합니다. 그렇지 않으면 APIM 구성 단계가 실패하거나 APIM이 콜아웃 서비스를 확인할 수 없습니다.

## 구성 {#configuration}

콜아웃 서비스는 시작 시 Datadog WAF(Web Application Firewall)를 자동으로 활성화하므로 `DD_APPSEC_ENABLED`를 설정할 필요가 없습니다.

이 서비스는 다음 설정을 지원합니다.

| 환경 변수               | 기본값 | 설명                                                                                                                         |
|------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APIM_CALLOUT_HOST`             | `0.0.0.0`     | 콜아웃 서비스가 수신 대기하는 주소입니다.                                                                                            |
| `DD_APIM_CALLOUT_PORT`             | `8080`        | 콜아웃 엔드포인트용 포트입니다(`POST /`).                                                                                           |
| `DD_APIM_CALLOUT_HEALTHCHECK_PORT` | `8081`        | 상태 엔드포인트용 포트입니다(`GET /`).                                                                                             |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`| `10485760`    | 분석되는 최대 본문 바이트 수입니다(단위: 바이트, 10MB). `0`으로 설정하면 본문 분석을 건너뛰어 교환을 호출 2회로 줄입니다.  |
| `DD_APIM_CALLOUT_REQUEST_TIMEOUT`  | `30s`         | 캐시된 요청별 상태의 TTL(Time-to-live)입니다. 고아 상태는 이 기간이 지나면 해제됩니다.                                           |
| `DD_APIM_CALLOUT_TLS`              | `false`       | HTTP 대신 HTTPS를 제공합니다.                                                                                                        |
| `DD_APIM_CALLOUT_TLS_CERT_FILE`    | (비어 있음)       | TLS 인증서 경로입니다. TLS가 활성화된 경우 필수입니다.                                                                          |
| `DD_APIM_CALLOUT_TLS_KEY_FILE`     | (비어 있음)       | TLS 개인 키 경로입니다. TLS가 활성화된 경우 필수입니다.                                                                          |

## 자동 기본값 {#automatic-defaults}

다음 변수가 설정되지 않은 경우 서비스는 시작 시 해당 변수를 할당합니다:

| 환경 변수          | 값     | 설명                                                    |
|-------------------------------|-----------|----------------------------------------------------------------|
| `DD_APM_TRACING_ENABLED`      | `false`   | 콜아웃 서비스 자체에 대한 APM 트레이스를 보낼지 여부입니다.                |
| `DD_APPSEC_WAF_TIMEOUT`       | `10ms`    | 요청당 WAF 평가 예산입니다.                             |
| `DD_TRACE_PROPAGATION_STYLE`  | `datadog` | 요청에 삽입되는 트레이스 컨텍스트 헤더의 형식입니다.    |

단일 WAF 평가가 예산을 초과하면 요청은 지연되지 않고 허용됩니다.

## Datadog Agent 연결 {#datadog-agent-connection}

콜아웃 서비스는 Datadog으로 데이터를 직접 보내지 않습니다. 이 서비스는 트레이스와 보안 이벤트를 Datadog Agent로 보내고, Agent가 이를 Datadog으로 전달합니다. 콜아웃 서비스와 Agent는 별도의 컨테이너에서 실행되며 각각 고유한 환경 변수를 가집니다.

**콜아웃 컨테이너**:

| 환경 변수 | 기본값 | 설명                           |
|----------------------|---------------|---------------------------------------|
| `DD_AGENT_HOST`      | `localhost`   | Datadog Agent의 호스트 이름 또는 IP입니다. |

**Datadog Agent 컨테이너**:

| 환경 변수      | 기본값   | 설명                                                                                       |
|---------------------------|-----------------|---------------------------------------------------------------------------------------------------|
| `DD_API_KEY`              | (필수)      | Datadog API 키입니다.                                                                             |
| `DD_SITE`                 | `datadoghq.com` | Datadog 사이트입니다.                                                                                |
| `DD_APM_ENABLED`          | `false`         | `true`로 설정합니다. 그렇지 않으면 Agent가 트레이스를 수락하지 않습니다.                                        |
| `DD_APM_NON_LOCAL_TRAFFIC`| `false`         | `true`로 설정합니다. 콜아웃은 별도의 컨테이너에서 실행되므로 해당 트래픽은 Agent의 로컬 트래픽이 아닙니다. |
| `DD_APM_RECEIVER_PORT`    | `8126`          | Agent가 트레이스를 수락하는 포트입니다. 콜아웃이 해당 포트에 연결할 수 있어야 합니다.                           |

콜아웃이 자체 컨테이너에서 실행되므로 `DD_APM_ENABLED` 및 `DD_APM_NON_LOCAL_TRAFFIC`이 둘 다 필요합니다. 이러한 설정이 없으면 Agent는 이 통합에서 생성된 스팬 및 보안 이벤트를 버립니다. 원클릭 배포는 이 모든 것을 Agent 컨테이너에 자동으로 설정합니다.

콜아웃 컨테이너에 `DD_API_KEY`를 설정하지 마세요. 원클릭 배포는 콜아웃 컨테이너에 `DD_AGENT_HOST`를 설정하고 `datadogApiKey` 및 `datadogSite`를 Agent 컨테이너의 `DD_API_KEY` 및 `DD_SITE`로 매핑합니다.

현재 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

## 콜아웃 엔드포인트 암호화 {#encrypting-the-callout-endpoint}

HTTPS를 통해 콜아웃 엔드포인트를 제공하려면 `DD_APIM_CALLOUT_TLS`를 `true`로 설정하고 `DD_APIM_CALLOUT_TLS_CERT_FILE` 및 `DD_APIM_CALLOUT_TLS_KEY_FILE`을 둘 다 제공합니다. TLS가 활성화되어 있는데 두 파일 중 하나라도 누락되면 서비스가 시작되지 않습니다. 허용되는 최소 TLS 버전은 1.2입니다.

TLS가 활성화된 경우 APIM 정책은 `https://`를 통해 서비스를 호출해야 합니다.

## 상태 검사 {#health-check}

포트 `8081`에서 상태 엔드포인트를 검사합니다.

```shell
curl -s http://localhost:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

`200` 응답은 서비스가 실행 중임을 나타내지만 WAF의 상태를 나타내지는 않습니다. 보안 데이터가 도착하는지 확인하려면 [Azure API Management용 App and API Protection 활성화하기][1]에서 설명하는 Datadog UI 검사를 사용하세요.

## 크기 조정 및 성능 {#sizing-and-performance}

0.5 vCPU, 1 GiB Azure Container Apps 배포에서 request-headers 및 response-headers 단계에는 각각 약 2.4ms가 소요됩니다. 콜아웃과 백엔드를 모두 포함한 전체 APIM 파이프라인에는 약 9.7ms가 소요됩니다.

본문 단계는 본문 검사가 활성화되어 있고 이전 단계에서 본문을 요청한 경우에만 실행됩니다. 게이트웨이는 콜아웃 서비스에 대한 연결 풀을 유지하며, 이는 프로덕션 환경에서 지연 시간을 줄일 수 있습니다.

네트워크 왕복 시간을 최소화하려면 APIM 인스턴스와 동일한 Azure 리전에 콜아웃 서비스를 배포하고 APIM을 API 소비자와 가까운 거리로 유지하세요. 기본적으로 서비스는 1~10개의 복제본으로 확장되며 복제본당 동시 요청 20개에서 확장됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/setup/azure/api-management