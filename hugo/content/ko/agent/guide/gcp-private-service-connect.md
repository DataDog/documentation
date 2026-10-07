---
description: 공용 인터넷을 사용하지 않고 Datadog로 원격 분석을 비공개로 보내도록 Google Cloud Private Service
  Connect 엔드포인트 및 DNS 영역을 구성합니다.
further_reading:
- link: /integrations/google_cloud_platform/
  tag: 설명서
  text: Datadog-Google Cloud Platform 통합
- link: /agent/guide/private-link
  tag: 설명서
  text: AWS PrivateLink를 통해 Datadog에 연결
title: Google Cloud Private Service Connect로 Datadog 연결하기
---

{{% site-region region="us5" %}}
[Google Cloud Private Service Connect][1](PSC)를 사용하면 공용 인터넷을 통하지 않고도 Datadog로 텔레메트리를 전송할 수 있습니다.

Datadog에서는 데이터 수집 서비스의 일부를 Google Cloud as Private Service Connect [_게시된 서비스_][2]에 노출시킵니다. 이를 [게시된 서비스 표](#published-services)에서 볼 수 있습니다.

각 Datadog 수집 서비스에 프라이빗 IP 주소를 노출하도록 각 PSC 엔드포인트를 구성할 수 있습니다. 이 IP 주소는 트래픽을 Datadog 백엔드로 라우팅합니다. 그 후 각 엔드포인트에서 해당되는 DNS 이름으로 재정의하도록 Google Cloud [_Private DNS Zone_][3]을 구성할 수 있습니다.

{{< img src="agent/guide/psc/gcp-psc-overview-1.png" alt="Google Cloud Private Service Connect 스키마. 좌측 'Customer VPC' 상자에는 Datadog 에이전트가 PSC 엔드포인트로 전송하는 데이터가 포함되어 있습니다. 우측 'Datadog VPC' 상자에는 Datadog 서비스와 통신하는 서비스 연결이 포함되어 있습니다. 'Customer VPC' 상자의 엔드포인트는 Google Cloud 백본을 통해 'Datadog VPC' 상자의 서비스 연결로 연결됩니다." >}}

## 설정

### 엔드포인트 연결

1. 내 Google Cloud 콘솔에서 **Network services** > **Private Service Connect**로 이동합니다.
2. **Endpoints** 섹션으로 이동해 **Connect endpoint**를 클릭합니다.
   {{< img src="agent/guide/psc/connect-endpoint1.png" alt="Google Cloud 콘솔의 '연결 엔드포인트' 페이지 스크린샷" >}}

   - **Target** 아래에서 _Published service_를 선택합니다.
   - **Target service**에 사용하고자 하는 Datadog 수집 서비스의 _PSC 대상 이름_을 입력합니다. [게시된 서비스 표](#published-services)에서 내 PCS 대상 이름을 찾을 수 있습니다.
   - **Endpoint name**에는 엔드포인트에 사용할 고유 식별자를 입력합니다. `datadog-<SERVICE>`를 사용할 수 있습니다(예 `datadog-api`).
   - **Network**와 **Subnetwork**에서는 엔드포인트에를 게시할 네트워크와 하부 네트워크를 선택합니다.
   - **IP address**에서는 드롭다운 메뉴에서 _Create IP address_를 선택하여 엔드포인트 전용 서브넷에 내부 IP를 생성합니다. 이 IP를 선택하세요.
   - 엔드포인트를 `us-central1` 외 가상 머신에 연결하려면 **Enable global access**를 선택합니다.

   **참고**: Datadog에서는 `us-central1` 리전에서 PSC 생산자 엔드포인트를 노출합니다. 이 엔드포인트는 글로벌 액세스를 지원하여 어떤 리전에서든 서비스에 연결할 수 있도록 합니다. 그러나 전송 규칙이 `us-central1` 리전에서 생성되어야 합니다.

3. **Add endpoint**를 클릭합니다. 내 상태가 _Accepted_인지 확인합니다. 다음 섹션에서 필요하니 IP 주소를 잘 기록해 두세요.
   {{< img src="agent/guide/psc/connect-endpoint-success1.png" alt="Google Cloud 콘솔에 엔드포인트를 추가하면 나타나는 성공 메시지 스크린샷. IP 주소가 포함되어 있음" >}}

### DNS 영역 생성
1. Google Cloud 콘솔에서 **Network services** > **Cloud DNS**로 이동합니다.
2. **Create zone**을 클릭합니다.
   {{< img src="agent/guide/psc/create-a-dns-zone1.png" alt="Google Cloud 콘솔의 'DNS 영역 생성' 페이지 스크린샷" >}}

   - **Zone type** 아래에서 _Private_을 선택합니다.
   - **Zone name**에는 내 영역을 설명하는 이름을 입력합니다.
   - **DNS name**에 사용하고자 하는 Datadog 수집 서비스의 _프라이빗 DNS 이름_을 입력합니다. [게시된 서비스 표](#published-services)에서 내 DNS 이름을 찾을 수 있습니다.
3. 그 후 엔드포인트 IP를 가리키는 `A` 레코드를 생성합니다.  내가 생성한 영역의 _Zone details_ 페이지에서 **Add record set**을 클릭합니다.
   {{< img src="agent/guide/psc/create-record1.png" alt="Google Cloud 콘솔의 'Create record set' 페이지 스크린샷" >}}

   - **DNS name**은 수정하지 말고 그대로 둡니다.
   - **Resource record type**에서 `A`를 선택합니다.
   - **IPv4 Address**아래에 이전 섹션 마지막에 표시된 IP 주소를 입력합니다.

### 메트릭 및 트레이스에 필요한 추가 단계
(`agent.`{{< region-param key="dd_site" code="true" >}}) 도메인의 하위 도메인인 Datadog 수신 서비스 2개가 있습니다. 이 때문에 프라이빗 호스팅 영역은 다른 데이터 수신과는 약간 다릅니다.

[Create a DNS Zone](#create-a-dns-zone-1) 섹션의 안내에 따라 (`agent.`{{< region-param key="dd_site" code="true" >}})의 프라이빗 영역을 생성합니다. 그 후 아래 레코드 3개를 추가합니다.

| DNS 이름 | 리소스 레코드 유형 | IPv4 주소 |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | 메트릭 엔드포인트 IP 주소 |
| `*`      | A                    | 메트릭 엔드포인트 IP 주소 |
| `trace`  | A                    | 트레이스 엔드포인트 IP 주소 |

**참고**: 이 영역에는 내 메트릭 엔드포인트의 IP 주소를 가리키는 와일드카드(`*`) 레코드가 필요합니다. Datadog 에이전트에서는 (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}) 형식으로 버저닝된 엔드포인트를 사용해 텔레메트리를 전송하기 때문입니다.

### 검증

구성을 확인하려면 SSH를 사용해 내 로컬 노드에서 다음과 유사한 `dig` 명령을 실행하세요.

_와일드카드가 메트릭 엔드포인트로 라우팅되는지 확인_
```shell
> dig +noall +answer 7-49-0-app.agent.us5.datadoghq.com
```

다음과 같은 응답이 반환됩니다.
```
7-49-0-app.agent.us5.datadoghq.com. 300 IN A        10.1.0.4
```


_트레이스 하위 도메인이 트레이스 엔드포인트로 라우팅되는지 확인_
```shell
> dig +noall +answer trace.agent.us5.datadoghq.com
```
다음과 같은 응답이 반환됩니다.
```
trace.agent.us5.datadoghq.com. 300 IN  A       10.1.0.9
```

응답에 표시된 IP 주소가 PSC 대상과 연결된 것과 일치하는지 확인해야 합니다.

## 게시됨 서비스
| Datadog 수집 서비스 | PSC 대상 이름 | 비공개 DNS 이름 |
| ---------------------- | --------------- | ---------------- |
| 로그(에이전트)           | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-agent-intake-psc` | `agent-http-intake.logs.us5.datadoghq.com` |
| 로그(사용자 HTTP 수집) | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-intake-psc` | `http-intake.logs.us5.datadoghq.com` |
| API | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-api-psc` | `api.us5.datadoghq.com` |
| Metrics | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-metrics-agent-psc` | `agent.us5.datadoghq.com` |
| 컨테이너 | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-orchestrator-psc` | `orchestrator.us5.datadoghq.com` |
| 프로세스 | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-process-psc` | `process.us5.datadoghq.com` |
| 프로파일링 | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-http-profile-psc` | `intake.profile.us5.datadoghq.com` |
| 트레이스 | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-trace-edge-psc` | `agent.us5.datadoghq.com` |
| Database Monitoring | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-dbm-metrics-psc` | `dbm-metrics-intake.us5.datadoghq.com` |
| 원격 설정 | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-fleet-psc` | `config.us5.datadoghq.com` |



[1]: https://cloud.google.com/vpc/docs/private-service-connect
[2]: https://cloud.google.com/vpc/docs/private-service-connect#published-services
[3]: https://cloud.google.com/dns/docs/zones/zones-overview

{{% /site-region %}}
{{% site-region region="eu" %}}
PSC([Private Service Connect][1])를 사용하면 공용 인터넷을 통하지 않고도 Datadog로 텔레메트리를 전송할 수 있습니다.

Datadog는 [게시된 서비스 표](#published-services-1)에서 볼 수 있듯이 Google Cloud Platform에서 데이터 수집 서비스 중 일부를 PSC [_published services_][2]로 노출합니다.

각 Datadog 수집 서비스에 프라이빗 IP 주소를 노출하도록 각 PSC 엔드포인트를 구성할 수 있습니다. 이 IP 주소는 트래픽을 Datadog 백엔드로 라우팅합니다. 그 후 각 엔드포인트에서 해당되는 DNS 이름으로 재정의하도록 Google Cloud [_Private DNS Zone_][3]을 구성할 수 있습니다.

{{< img src="agent/guide/psc/gcp-psc-overview-1.png" alt="Google Cloud Private Service Connect 스키마. 좌측 'Customer VPC' 상자에는 Datadog 에이전트가 PSC 엔드포인트로 전송하는 데이터가 포함되어 있습니다. 우측 'Datadog VPC' 상자에는 Datadog 서비스와 통신하는 서비스 연결이 포함되어 있습니다. 'Customer VPC' 상자의 PSC 엔드포인트는 Google Cloud 백본을 통해 'Datadog VPC' 상자의 서비스 연결로 연결됩니다." >}}

## 설정

### 엔드포인트 연결

1. GCP 콘솔에서 **Network services** > **Private Service Connect**로 이동합니다.
2. **Endpoints** 섹션으로 이동해 **Connect endpoint**를 클릭합니다.
   {{< img src="agent/guide/psc/connect-endpoint-eu1.png" alt="'Google Cloud 콘솔의 'Connect endpoint' 페이지 스크린샷" >}}

   - **Target** 아래에서 _Published service_를 선택합니다.
   - **Target service**에 사용하려는 Datadog 수집 서비스에 해당하는 _PSC 대상 이름_을 입력합니다. PSC 대상 이름은 [게시된 서비스 표](#published-services-1)에서 찾을 수 있습니다.
   - **Endpoint name**에는 엔드포인트에 사용할 고유 식별자를 입력합니다. `datadog-<SERVICE>`를 사용할 수 있습니다(예 `datadog-metrics`).
   - **Network**와 **Subnetwork**에서는 엔드포인트에를 게시할 네트워크와 하부 네트워크를 선택합니다.
   - **IP address**에서는 드롭다운 메뉴에서 _Create IP address_를 선택하여 엔드포인트 전용 서브넷에 내부 IP를 생성합니다. 이 IP를 선택하세요.
   - 엔드포인트를 `europe-west3` 외 가상 머신에 연결하려면 **Enable global access**를 선택합니다.

   **참고**: Datadog에서는 `europe-west3` 리전에서 PSC 생산자 엔드포인트를 노출합니다. 이 엔드포인트는 글로벌 액세스를 지원하여 어떤 리전에서든 서비스에 연결할 수 있도록 합니다. 그러나 전송 규칙이 `europe-west3` 리전에서 생성되어야 합니다.

3. **Add endpoint**를 클릭합니다. 내 상태가 _Accepted_인지 확인합니다. 다음 섹션에서 필요하니 IP 주소를 잘 기록해 두세요.
   {{< img src="agent/guide/psc/connect-endpoint-success-eu1.png" alt="Google Cloud 콘솔에 엔드포인트를 추가하면 나타나는 성공 메시지 스크린샷. IP 주소가 포함되어 있음" >}}

### DNS 영역 생성
1. Google Cloud 콘솔에서 **Network services** > **Cloud DNS**로 이동합니다.
2. **Create zone**을 클릭합니다.
   {{< img src="agent/guide/psc/create-a-dns-zone-eu1.png" alt="Google Cloud 콘솔의 'DNS 영역 생성' 페이지 스크린샷" >}}

   - **Zone type** 아래에서 _Private_을 선택합니다.
   - **Zone name**에는 내 영역을 설명하는 이름을 입력합니다.
   - **DNS name**에 사용하려는 Datadog 수집 서비스에 해당하는 _비공개 DNS 이름_을 입력합니다. DNS 이름은 [게시된 서비스 표](#published-services-1)에서 찾을 수 있습니다.
3. 그 후 엔드포인트 IP를 가리키는 `A` 레코드를 생성합니다.  내가 생성한 영역의 _Zone details_ 페이지에서 **Add record set**을 클릭합니다.
   {{< img src="agent/guide/psc/create-record-eu1.png" alt="Google Cloud 콘솔의 'Create record set' 페이지 스크린샷" >}}

   - **DNS name**은 수정하지 말고 그대로 둡니다.
   - **Resource record type**에서 `A`를 선택합니다.
   - **IPv4 Address**아래에 이전 섹션 마지막에 표시된 IP 주소를 입력합니다.

### 메트릭 및 트레이스에 필요한 추가 단계

(`agent.`{{< region-param key="dd_site" code="true" >}}) 도메인의 하위 도메인인 Datadog 수신 서비스 2개가 있습니다. 이 때문에 프라이빗 호스팅 영역은 다른 데이터 수신과는 약간 다릅니다.

[Create a DNS Zone](#create-a-dns-zone-1) 섹션의 안내에 따라 (`agent.`{{< region-param key="dd_site" code="true" >}})의 프라이빗 영역을 생성합니다. 그 후 아래 레코드 3개를 추가합니다.

| DNS 이름 | 리소스 레코드 유형 | IPv4 주소 |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | 메트릭 엔드포인트 IP 주소 |
| `*`      | A                    | 메트릭 엔드포인트 IP 주소 |
| `trace`  | A                    | 트레이스 엔드포인트 IP 주소 |

**참고**: 이 영역에는 내 메트릭 엔드포인트의 IP 주소를 가리키는 와일드카드(`*`) 레코드가 필요합니다. Datadog 에이전트에서는 (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}) 형식으로 버저닝된 엔드포인트를 사용해 텔레메트리를 전송하기 때문입니다.

### 검증

구성을 확인하려면 SSH를 사용해 내 로컬 노드에서 다음과 유사한 `dig` 명령을 실행하세요.

_와일드카드가 메트릭 엔드포인트로 라우팅되는지 확인_
```shell
> dig +noall +answer 7-49-0-app.agent.datadoghq.eu
```

다음과 같은 응답이 반환됩니다.
```
7-49-0-app.agent.datadoghq.eu. 300 IN A        10.1.0.4
```


_트레이스 하위 도메인이 트레이스 엔드포인트로 라우팅되는지 확인_
```shell
> dig +noall +answer trace.agent.datadoghq.eu
```
다음과 같은 응답이 반환됩니다.
```
trace.agent.datadoghq.eu. 300 IN  A       10.1.0.9
```

응답에 표시된 IP 주소가 PSC 대상과 연결된 것과 일치하는지 확인해야 합니다.

## 게시됨 서비스
| Datadog 수집 서비스 | PSC 대상 이름 | 비공개 DNS 이름 |
| ---------------------- | --------------- | ---------------- |
| 로그(에이전트)           | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-logs-agent-intake-psc` | `agent-http-intake.logs.datadoghq.eu` |
| 로그(사용자 HTTP 수집) | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-logs-intake-psc` | `http-intake.logs.datadoghq.eu` |
| API | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-api-psc` | `api.datadoghq.eu` |
| Metrics | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-metrics-agent-psc` | `agent.datadoghq.eu` |
| 컨테이너 | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-orchestrator-psc` | `orchestrator.datadoghq.eu` |
| 프로세스 | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-process-psc` | `process.datadoghq.eu` |
| 프로파일링 | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-logs-http-profile-psc` | `intake.profile.datadoghq.eu` |
| 트레이스 | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-trace-edge-psc` | `agent.datadoghq.eu` |
| Database Monitoring | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-dbm-metrics-psc` | `dbm-metrics-intake.datadoghq.eu` |
| 원격 설정 | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-fleet-psc` | `config.datadoghq.eu` |



[1]: https://cloud.google.com/vpc/docs/private-service-connect
[2]: https://cloud.google.com/vpc/docs/private-service-connect#published-services
[3]: https://cloud.google.com/dns/docs/zones/zones-overview

{{% /site-region %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}