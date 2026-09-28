---
aliases:
- /ko/opentelemetry/setup/agentless/managed_platforms
description: Cloudflare, Vercel, Heroku와 같은 관리형 플랫폼에서 전용 OTLP 엔드포인트를 통해 Datadog으로
  트레이스, 메트릭, 로그를 직접 전송하세요.
further_reading:
- link: /opentelemetry/compatibility/
  tag: 설명서
  text: Datadog의 OpenTelemetry 호환성
- link: /opentelemetry/setup/otlp_ingest/
  tag: 설명서
  text: Datadog OTLP 수집 엔드포인트
title: 관리형 플랫폼을 위한 OTLP 수집
---
## 개요 {#overview}

Datadog은 관리형 플랫폼을 위한 전용 OTLP 수집 엔드포인트를 제공하므로 최소한의 구성으로 트레이스, 메트릭, 로그를 Datadog으로 직접 전송할 수 있습니다. 지원되는 각 플랫폼에는 고유한 OTLP 하위 도메인이 있습니다(예: `cloudflare.integrations.otlp.datadoghq.com`). 이러한 전용 엔드포인트를 통해 Datadog은 트래픽 소스를 식별하고 플랫폼별 처리 및 귀속을 적용할 수 있습니다. 일반 OTLP 엔드포인트는 호스트가 존재한다고 가정하므로 관리형 플랫폼 트래픽에 예상치 못한 동작을 유발할 수 있습니다.

[Datadog Agent][1] 또는 [OpenTelemetry Collector][2]를 설치할 수 없는 관리형 플랫폼에서 워크로드를 실행할 때 이 옵션을 사용하세요. 사용 중인 플랫폼이 아래 표에 없고 AWS, Azure 또는 GCP 서버리스 컴퓨팅에서 실행 중인 경우 [Serverless][5]를 참조하세요.

<div class="alert alert-danger">관리형 플랫폼 엔드포인트로 전송된 호스트 메타데이터는 <a href="/infrastructure/list/">Infrastructure Host List</a>에 표시되지 않습니다.</div>

각 엔드포인트는 다음 신호 경로를 지원합니다.

| 신호  | 경로          |
|---------|---------------|
| 트레이스  | `/v1/traces`  |
| 메트릭 | `/v1/metrics` |
| 로그    | `/v1/logs`    |

신호별 구성(메트릭 변환, 로그 처리)에 대한 자세한 내용은 [로그][6] 및 [메트릭][7] 엔드포인트 페이지를 참조하세요.

## 구성 {#configuration}

관리형 플랫폼 엔드포인트를 통해 Datadog으로 OTLP 데이터를 전송하려면 다음 환경 변수로 OpenTelemetry 익스포터를 구성하세요. `{platform}`을 [지원되는 플랫폼](#supported-platforms) 표에 있는 플랫폼의 하위 도메인으로 바꾸세요.

```shell
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}"
export OTEL_EXPORTER_OTLP_HEADERS="dd-api-key=${DD_API_KEY}"
```

트레이스만 전송하려면:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}/v1/traces"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY}"
```

<div class="alert alert-info">관리형 플랫폼 엔드포인트는 <code>dd-otlp-source</code> 헤더를 사용하지 않습니다. 일반 OTLP 엔드포인트에서 마이그레이션하는 경우 구성에서 이 헤더를 제거하세요.</div>

## 지원 플랫폼 {#supported-platforms}

모든 엔드포인트는 `https://{subdomain}.integrations.otlp{{< region-param key="dd_site" >}}/` 패턴을 따릅니다.

| 플랫폼 | 하위 도메인 | 설정 가이드 |
|---|---|---|
| AWX | `awx` | — |
| Claude | `claude` | — |
| Cloudflare | `cloudflare` | [Cloudflare Workers 관측성][11] |
| Cribl | `cribl` | — |
| GitHub Actions | `github-actions` | — |
| Grafbase | `grafbase` | [Grafbase 관측성][12] |
| Heroku | `heroku` | [Heroku 텔레메트리][13] |
| IBM | `ibm` | — |
| LangSmith | `langsmith` | — |
| LiveCloudKit | `livekit` | — |
| Modal | `modal` | [Modal OpenTelemetry][14] |
| MuleSoft | `mulesoft` | [MuleSoft 텔레메트리 익스포터][15] |
| Netlify | `netlify` | — |
| OpenTofu | `opentofu` | — |
| Retool | `retool` | [Retool 성능 모니터링][16] |
| RWX | `rwx` | [RWX OpenTelemetry][17] |
| Salesforce | `sfdc` | — |
| Shopify | `shopify` | — |
| Solace | `solace` | — |
| Spacelift | `spacelift` | — |
| Supabase | `supabase` | — |
| Svix | `svix` | — |
| Trigger.dev | `triggerdev` | — |
| Vercel | `vercel` | [Vercel Marketplace][18] |

위에 나열되지 않은 관리형 플랫폼에서 OTLP 내보내기를 활성화하려면 고객 성공 관리자에게 문의하세요.

## 제한 사항 {#limitations}

### 메타데이터 보강 없음 {#no-metadata-enrichment}

Collector나 Agent가 없으면 텔레메트리가 호스트 메타데이터로 보강되지 않습니다. 이 메타데이터에 의존하는 기능(예: [Infrastructure Host List][8])은 사용할 수 없습니다. 영향을 받는 기능의 전체 목록은 [OpenTelemetry 호환성 목록][4]을 참조하세요.

### 제한된 정규화 {#limited-normalization}

Collector나 Agent가 자동으로 수행하는 일부 신호 처리는 직접 수집 시 수행되지 않습니다. 예를 들어, 누적 메트릭을 델타 메트릭으로 변환하려면 상태 저장 구성 요소가 필요합니다. 플랫폼이 누적 메트릭을 내보내는 경우, 델타 시간성을 내보내도록 SDK 또는 파이프라인을 구성하세요.

### 트레이스 메트릭 {#trace-metrics}

[트레이스 메트릭][3]은 관리형 플랫폼 엔드포인트에 대해 기본적으로 계산됩니다. 관리형 플랫폼은 내보내기 전에 트래픽을 샘플링할 수 있으며, 이는 트레이스 메트릭 정확도에 영향을 줄 수 있습니다.

### 샘플링 {#sampling}

Collector에서 사용할 수 있는 샘플링 제어(테일 기반 샘플링, 확률적 샘플링)는 직접 수집 시 사용할 수 없습니다. 관리형 플랫폼은 내보내기 전에 자체 샘플링을 적용할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/opentelemetry/otlp_ingest_in_the_agent/
[2]: /ko/opentelemetry/setup/collector_exporter/
[3]: /ko/tracing/metrics/
[4]: /ko/opentelemetry/compatibility/
[5]: /ko/opentelemetry/setup/otlp_ingest/serverless/
[6]: /ko/opentelemetry/setup/otlp_ingest/logs/
[7]: /ko/opentelemetry/setup/otlp_ingest/metrics/
[8]: /ko/infrastructure/list/
[11]: https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/
[12]: https://grafbase.com/docs/gateway/observability
[13]: https://devcenter.heroku.com/articles/heroku-telemetry
[14]: https://modal.com/docs/guide/otel-integration
[15]: https://docs.mulesoft.com/monitoring/telemetry-exporter
[16]: https://docs.retool.com/apps/guides/observability/performance-monitoring
[17]: https://www.rwx.com/docs/observability/datadog
[18]: https://vercel.com/marketplace/datadog