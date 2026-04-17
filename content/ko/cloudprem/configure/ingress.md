---
description: CloudPrem 배포 환경에서 수신 컨트롤러를 구성하고 관리하는 방법을 알아보세요.
further_reading:
- link: /cloudprem/ingest/
  tag: 설명서
  text: 로그 수집 설정
- link: /cloudprem/operate/monitoring/
  tag: 설명서
  text: CloudPrem 모니터링
title: CloudPrem Ingress 구성
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

수신은 CloudPrem 배포의 핵심 구성 요소입니다. Helm 차트는 퍼블릭 수신과 내부 수신이라는 두 가지 수신 구성을 자동으로 생성합니다. 클러스터에 AWS Load Balancer Controller가 설치되어 있는 경우, 각 수신 구성당 하나의 ALB가 프로비저닝됩니다. 각 로드 밸런서는 수신 어노테이션을 사용하여 추가로 구성할 수 있습니다.

## 퍼블릭 수신

<div class="alert alert-danger">CloudPrem gRPC API 엔드포인트(경로가 <code>/cloudprem2</code>로 시작)만 상호 TLS 인증을 실행합니다. 다른 엔드포인트를 퍼블릭 수신을 통해 노출하면 인증 없이 인터넷을 통해 접근할 수 있으므로 보안 위험이 발생합니다. gRPC 이외의 엔드포인트는 항상 내부 수신으로 제한해야 합니다.</div>

퍼블릭 수신은 Datadog의 컨트롤 플레인 및 쿼리 서비스가 공용 인터넷을 통해 CloudPrem 클러스터를 관리하고 쿼리하는데 반드시 필요합니다. 다음 메커니즘을 통해 CloudPrem gRPC API에 안전한 액세스를 제공합니다.
- Datadog 서비스에서 발생하는 트래픽을 수락하는 인터넷 연결 AWS Application Load Balancer (ALB)를 생성합니다.
- 로드 밸런서 수준에서 종료되는 TLS 암호화를 구현합니다.
- ALB와 CloudPrem 클러스터 간 통신에는 HTTP/2(gRPC)를 사용합니다.
- Datadog 서비스는 유효한 클라이언트 인증서를 제시하는 상호 TLS(mTLS) 인증이 필요합니다.
- 클라이언트 인증서를 `X-Amzn-Mtls-Clientcert` 헤더와 함께 CloudPrem 파드로 전달하도록 ALB를 TLS 패스스루 모드로 구성합니다.
- 유효한 클라이언트 인증서 또는 인증서 헤더가 누락된 요청을 거부합니다.

이 설정을 통해 인증된 Datadog 서비스만 CloudPrem 클러스터에 액세스할 수 있으며, 동시에 엔드투엔드 암호화된 안전한 통신을 유지됩니다.

{{< img src="/cloudprem/ingress/cloudprem_public_ingress1.png" alt="CloudPrem의 퍼블릭 수신 아키텍처를 보여주는 다이어그램으로, Datadog 서비스가 인터넷에 노출된 AWS ALB를 통해 mTLS 인증을 사용하여 CloudPrem gRPC API에 접근하는 구조를 나타냅니다." style="width:100%;" >}}

### IP Allowlisting

Datadog 컨트롤 플레인 및 쿼리 서비스는 고정 IP 범위 세트를 사용하여 CloudPrem 클러스터에 연결하며, 이러한 IP 범위는 Datadog [IP Ranges API][1]의 "webhooks" 섹션에서 각 Datadog 사이트에 대해 가져올 수 있습니다. 예를 들어 datadoghq.eu 사이트의 IP 범위를 가져오려면 다음 명령을 실행할 수 있습니다.
```
curl -X GET "https://ip-ranges.datadoghq.eu/" \
      -H "Accept: application/json" |
      jq '.webhooks'
```

## 내부 수신

내부 수신 기능을 통해 HTTP를 이용하여 Datadog Agent 및 환경 내의 다른 로그 수집기로부터 로그를 수집할 수 있습니다.

{{< img src="/cloudprem/ingress/internal_ingress.png" alt=" Helm 차트로 프로비저닝된 ALB를 사용하는 내부 수신" style="width:100%;" >}}

기본적으로 이 차트는 요청된 API 엔드포인트 경로에 따라 HTTP 트래픽을 적절한 CloudPrem 서비스로 라우팅하기 위해 내부 AWS Application Load Balancer(ALB)를 생성합니다. 하지만 HAProxy, NGINX 또는 Traefik과 같은 자체 수신 컨트롤러를 사용하려면 기본 내부 ALB를 비활성화하고 다음 라우팅 규칙으로 컨트롤러를 구성할 수 있습니다.

```
rules:
- http:
    paths:
      # 인제스트(Quickwit, ES, Datadog) 엔드포인트를 인덱서로 연결
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
      # 인덱스 관리 API 엔드포인트를 메타스토어에 연결
      - path: /api/v1/indexes
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-metastore
            port:
              name: rest
      # 그 외 모든 항목은 검색기로 연결
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-searcher
            port:
              name: rest

```

{{< img src="/cloudprem/ingress/internal_ingress_nginx_controller.png" alt="NGINX 수신 컨트롤러를 사용하는 CloudPrem 내부 수신 구성으로 인덱서, 메타스토어, 검색기로의 경로 라우팅을 보여줍니다." style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/ip-ranges/