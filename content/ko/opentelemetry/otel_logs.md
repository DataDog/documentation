---
aliases:
- /ko/logs/log_collection/opentelemetry/
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: OpenTelemetry
  text: 컬렉터 설명서
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: 블로그
  text: Datadog 익스포터를 사용해 메트릭, 트레이스, 로그를 OpenTelemetry 컬렉터에서 Datadog으로 전송합니다.
- link: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
  tag: 설명서
  text: OpenTelemetry 트레이스와 로그 연결
title: OpenTelemetry에서 Datadog로 로그 전송
---

<div class="alert alert-warning">로그를 Datadog로 전송하는 <a href="https://opentelemetry.io/docs/reference/specification/logs/">OpenTelemetry 로깅</a>과 Datadog Exporter의 기능은 현재 알파 버전입니다.</div>

## 개요

[OpenTelemetry][1]는 IT 팀이 텔레메트리 데이터를 수집하고 라우팅할 때 표준화된 프로토콜과 툴을 제공하는 오픈 소스 관측 프레임워크입니다. OpenTelemetry는 CNCF([Cloud Native Computing Foundation][2])의 인큐베이터로 시작했으며 모니터링 플랫폼에서 분석하고 인사이트를 얻을 수 있도록 텔레메트리 데이터를 계측, 생성, 수집, 내보내기할 수 있습니다.

OpenTelemetry Collector는 다양한 프로세스에서 생산되는 텔레메트리 데이터를 수집하고 내보내는 데 사용되는 에이전트 프로세스이며, 제조사의 구애를 받지 않고 호환이 가능합니다. Datadog에서는 OpenTelemetry Collector용 [Exporter][3]가 있어 트레이스, 메트릭, 로그 데이터를 OpenTelemetry에서 Datadog로 보낼 수 있습니다.

Datadog에서는 로그를 수집할 때 Collector의 [파일로그 수신기][4]를 사용하는 것을 권고합니다. 그러면 파일로그 수신기가 지정한 로그 파일에 테일링을 하며, Datadog Exporter(Collector에서 설정)에서 로그 데이터를 Datadog로 보낼 수 있습니다.

{{< img src="logs/log_collection/otel_collector_logs.png" alt="호스트, 컨테이너, 또는 애플리케이션의 데이터가 Collector의 파일로그 수신기로 전송되고 Collector의 Datadog Explorer가 Datadog 백엔드로 데이터를 전송하는 흐름을 보여주는 다이어그램" style="width:100%;">}}

## 설정

애플리케이션과 서비스가 [OpenTelemetry][4] 라이브러리로 계측된 경우 OpenTelemetry Collector와 Datadog Explorer를 사용해 로그 데이터를 Datadog 백엔드로 전송할 수 있습니다.

[OpenTelemetry Collector로 로그를 전송한 후 Datadog Explorer를 사용해 Datadog로 전달][5]

자세한 내용은 [OpenTelemetry][6]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[4]: https://opentelemetry.io/docs/reference/specification/logs/overview/#third-party-application-logs
[5]: /ko/opentelemetry/otel_collector_datadog_exporter/?tab=onahost#step-4---configure-the-logger-for-your-application
[6]: /ko/tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python