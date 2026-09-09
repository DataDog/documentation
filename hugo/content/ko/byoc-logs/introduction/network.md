---
aliases:
- /ko/cloudprem/introduction/network/
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: 설명서
  text: BYOC Logs 인그레스 구성
title: 네트워크
---
이 문서는 BYOC(Bring Your Own Cloud) Logs와 Datadog이 서로 통신하는 방법에 대한 개요를 제공합니다.

## 역방향 연결(기본값) {#reverse-connection-default}

기본적으로 BYOC Logs **searcher** 포드는 API 키를 사용하여 Datadog으로의 아웃바운드 WebSocket 연결을 시작합니다. 각 searcher 포드는 `wss://<DD_SITE>/api/unstable/cloudprem-connection-gateway/connect`에 대한 자체 연결을 유지합니다.

Datadog은 다음과 같은 이유로 이 설정을 권장합니다.
- **네트워크에서 열어야 할 인바운드 포트가 없습니다.**
- **DNS 레코드나 퍼블릭 인그레스가 필요하지 않습니다.**
- 연결이 귀하의 인프라에서 시작되므로 방화벽 및 보안 정책이 간소화됩니다.

### 역방향 연결을 통해 흐르는 데이터 {#what-flows-through-the-reverse-connection}

| 데이터 | 방향 | 설명 |
|------|-----------|-------------|
| 검색 쿼리 | Datadog → BYOC Logs | 로그 탐색기, 대시보드, 모니터에서 발생하는 쿼리 |
| 쿼리 결과 | BYOC Logs → Datadog | 표시를 위해 반환된 일치하는 로그 항목 |
| 인덱스 관리 | Datadog → BYOC Logs | 인덱스 생성, 업데이트, 삭제 |

### 네트워크 요구 사항 {#network-requirements}

검색기 포드는 Datadog 사이트에 대한 **아웃바운드 HTTPS(포트 443)** 액세스가 필요합니다(예: `app.datadoghq.com`). 인바운드 연결은 필요하지 않습니다.

환경에서 HTTP 프록시를 사용하는 경우, BYOC Logs는 `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` 환경 변수를 사용한 표준 프록시 구성을 지원합니다.

### Datadog에 연결되는 포드 {#which-pods-connect-to-datadog}

**searcher** 포드만 역방향 연결을 설정합니다. 인덱서, 컨트롤 플레인, 메타스토어 및 자니터는 Datadog에 대한 연결을 시작하지 않습니다.

<div class="alert alert-warning">역방향 연결을 사용할 때는 최소 하나의 searcher 포드를 실행 상태로 유지하세요. 모든 searcher 포드를 사용할 수 없거나 다음으로 확장된 경우: <code>0</code>, searcher 포드가 시작되어 다시 연결될 때까지 Datadog은 역방향 연결을 통해 쿼리나 인덱스 관리 요청을 라우팅할 수 없습니다.</div>

## 공용 인그레스(선택 사항) {#public-ingress-optional}

BYOC Logs를 구성하여 공용 인그레스를 배포함으로써 Datadog이 반대 방향으로 연결을 설정하도록 할 수도 있습니다.

공용 인그레스를 사용하면 Datadog의 컨트롤 플레인 및 쿼리 서비스가 공용 인터넷을 통해 BYOC Logs 클러스터를 관리하고 쿼리할 수 있습니다. 이는 mTLS 인증을 사용하여 BYOC Logs gRPC API에 대한 보안 액세스를 제공합니다. BYOC Logs 인그레스에 대한 자세한 내용은 [구성 페이지](/byoc-logs/configure/ingress/)에서 확인할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}