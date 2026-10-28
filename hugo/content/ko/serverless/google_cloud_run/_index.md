---
aliases:
- /ko/serverless/gcp
- /ko/serverless/google_cloud
- /ko/serverless/google
further_reading:
- link: /integrations/google-cloud-run/
  tag: 설명서
  text: Google Cloud Run 통합
- link: /serverless/guide/disable_serverless
  tag: 설명서
  text: Serverless Monitoring 비활성화
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=gcp#cloud-run-and-cloud-run-functions
  tag: 설명서
  text: OTLP를 사용하여 Cloud Run 트레이스를 Datadog으로 전송하기
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: 블로그
  text: Cloud Run 서비스에서 트레이스, 로그, 사용자 지정 메트릭 수집
title: Google Cloud Run
---
Google Cloud Run은 자동 확장, 내장 로드 밸런싱, 사용한 만큼만 지불하는 요금제를 통해 상태 비저장 컨테이너와 Serverless 함수를 실행할 수 있는 완전 관리형 컴퓨팅 플랫폼입니다.

Datadog은 [Google Cloud 통합][1]을 통해 Cloud Run에 대한 모니터링 및 로그 수집을 제공합니다.

또한 Datadog은 Cloud Run 애플리케이션을 계측하기 위해 Serverless Agent를 사용하여 트레이스, 향상된 메트릭, 커스텀 메트릭 및 직접 로그 수집을 가능하게 하는 솔루션을 제공합니다. [향상된 메트릭][2]은 `gcp.run.container.enhanced.*` 및 `gcp.run.job.enhanced.*` 네임스페이스로 구분됩니다.

계측을 수행하려면 아래에서 워크로드를 선택하여 지침을 확인하세요.

## 워크로드 선택 {#choose-your-workload}

{{< card-grid card_width="350px" >}}
  {{< image-card href="/serverless/google_cloud_run/containers" title="Containers" >}}
  {{< image-card href="/serverless/google_cloud_run/jobs" title="작업" subtitle="(미리 보기)" >}}
  {{< image-card href="/serverless/google_cloud_run/functions" title="함수" >}}
  {{< image-card href="/serverless/google_cloud_run/functions_1st_gen" title="함수" subtitle="(1세대)" >}}
{{< /card-grid >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:/ko/integrations/google_cloud_platform/
[2]:/ko/integrations/google-cloud-run/#metrics