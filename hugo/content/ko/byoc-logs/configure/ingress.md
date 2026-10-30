---
aliases:
- /ko/cloudprem/configure/ingress/
description: BYOC Logs 배포를 위한 인그레스 컨트롤러를 구성 및 관리하는 방법을 알아보세요.
further_reading:
- link: /byoc-logs/ingest/
  tag: 문서
  text: 로그 수집 설정하기
- link: /byoc-logs/operate/monitoring/
  tag: 문서
  text: BYOC Logs 모니터링하기
title: BYOC Logs 인그레스 구성
---
## 개요 {#overview}

인그레스는 BYOC(Bring Your Own Cloud) Logs 배포의 핵심 구성 요소입니다. Helm 차트는 공용 인그레스와 내부 인그레스라는 두 가지 인그레스 구성을 자동으로 생성합니다. AWS Load Balancer Controller가 클러스터에 설치된 경우, 인그레스 구성당 하나의 ALB를 프로비저닝합니다. 각 로드 밸런서는 인그레스 주석을 사용하여 추가로 구성할 수 있습니다.

## 공용 인그레스 {#public-ingress}

<div class="alert alert-danger">BYOC Logs gRPC API 엔드포인트(경로가 <code>/cloudprem</code>문자열로 시작하는 경우)만 상호 TLS 인증을 수행합니다. 공용 인그레스를 통해 다른 엔드포인트를 노출하면 인증 없이 인터넷을 통해 해당 엔드포인트에 액세스할 수 있으므로 보안 위험이 발생합니다. 비 gRPC 엔드포인트는 항상 내부 인그레스로 제한하세요. </div>

공용 인그레스는 Datadog이 공용 인터넷을 통해 BYOC Logs 클러스터를 관리하고 쿼리할 수 있도록 하는 데 필수적입니다. 다음 메커니즘을 통해 BYOC Logs gRPC API에 대한 보안 액세스를 제공합니다.
- Datadog 서비스의 트래픽을 허용하는 인터넷 연결 AWS Application Load Balancer(ALB)를 생성합니다.
- 로드 밸런서 수준에서 종료되는 TLS 암호화를 구현합니다.
- ALB와 BYOC Logs 클러스터 간 통신에 HTTP/2(gRPC)를 사용합니다.
- Datadog 서비스가 유효한 클라이언트 인증서를 제시해야 하는 상호 TLS(mTLS) 인증을 요구합니다.
- ALB를 TLS 패스스루 모드로 구성하여 `X-Amzn-Mtls-Clientcert` 헤더와 함께 클라이언트 인증서를 BYOC Logs 파드로 전달합니다.
- 유효한 클라이언트 인증서나 인증서 헤더가 없는 요청을 거부합니다.

이 설정을 통해 엔드투엔드 보안 암호화 통신을 유지하면서, 인증된 Datadog 서비스만 BYOC Logs 클러스터에 액세스할 수 있도록 보장합니다.

{{< img src="/cloudprem/ingress/cloudprem_public_ingress1.png" alt="mTLS 인증을 사용하여 인터넷 연결 AWS ALB를 통해 BYOC Logs gRPC API에 액세스하는 Datadog 서비스와 BYOC Logs 퍼블릭 인그레스 아키텍처를 보여주는 다이어그램" style="width:100%;" >}}

### IP 허용 목록 {#ip-allowlisting}

Datadog은 고정 IP 범위 세트를 사용하여 BYOC Logs 클러스터에 연결하며, 이 범위는 각 Datadog 사이트에 대해 Datadog [IP 범위 API][1]의 'webhooks' 섹션에서 검색할 수 있습니다. 예를 들어, datadoghq.eu 사이트의 IP 범위를 가져오려면 다음을 실행할 수 있습니다.

```
curl -X GET "https://ip-ranges.datadoghq.eu/" \
      -H "Accept: application/json" |
      jq '.webhooks'
```

## 내부 인그레스 {#internal-ingress}

내부 인그레스를 사용하면 HTTP를 통해 환경 내의 Datadog Agent 및 기타 로그 컬렉터에서 로그를 수집할 수 있습니다.

{{< img src="/cloudprem/ingress/internal_ingress.png" alt=" Helm 차트로 프로비저닝된 ALB를 사용하는 내부 인그레스" style="width:100%;" >}}

기본적으로 차트는 내부 AWS Application Load Balancer(ALB)를 생성하여 요청된 API 엔드포인트 경로에 따라 적절한 BYOC Logs 서비스로 HTTP 트래픽을 라우팅합니다. 그러나 자체 인그레스 컨트롤러(예: HAProxy, NGINX 또는 Traefik)를 사용하려는 경우 기본 내부 ALB를 비활성화하고 다음 라우팅 규칙으로 컨트롤러를 구성할 수 있습니다.

```
rules:
- http:
    paths:
      # Ingest (Quickwit, ES, Datadog) endpoints to indexers
      - path: /api/v1/*/ingest
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/bulk
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/*/_bulk
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v2/logs
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      # Index management API endpoints to metastores
      - path: /api/v1/indexes
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-metastore
            port:
              name: rest
      # Everything else to searchers
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-searcher
            port:
              name: rest

```

{{< img src="/cloudprem/ingress/internal_ingress_nginx_controller.png" alt="indexer, metastore 및 searcher 서비스로의 경로 라우팅을 보여주는 NGINX 인그레스 컨트롤러를 사용한 BYOC Logs 내부 인그레스 구성" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/ip-ranges/