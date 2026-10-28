---
aliases:
- /ko/infrastructure/serverless/azure_app_services/
- /ko/serverless/azure_app_services/
- /ko/serverless/azure
further_reading:
- link: /integrations/azure_app_services/
  tag: 설명서
  text: Azure 앱 서비스
- link: /integrations/azure_app_service_environment/
  tag: 설명서
  text: Azure App Service 환경
- link: /serverless/guide/disable_serverless
  tag: 설명서
  text: Serverless Monitoring 비활성화
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=azure#web-apps-app-service
  tag: 설명서
  text: OTLP를 사용하여 Azure App Service 트레이스를 Datadog으로 전송
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: 블로그
  text: Azure App Service용 Datadog 확장을 이용해 .NET 웹 앱 모니터링
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: 블로그
  text: ASP.NET Core 애플리케이션을 Azure App Service에 배포
- link: https://www.datadoghq.com/pricing/?product=serverless-monitoring&tab=azure-app-service#products
  tag: 가격
  text: Azure App Service APM 가격
title: Azure App Service용 Serverless Monitoring
---
## 개요 {#overview}

[Azure 앱 서비스][1]는 웹 애플리케이션, REST API 및 모바일 백엔드를 호스팅하는 플랫폼입니다. Datadog Serverless Monitoring은 Azure 앱 서비스 애플리케이션에 대한 메트릭, 로그 및 트레이스를 제공합니다.

{{< img src="serverless/azure_app_service/azure_app_service_top_2.png" alt="Azure 앱 서비스가 선택된 Datadog UI, Serverless Monitoring 페이지입니다." style="width:100%;" >}}

Datadog에서 [{{< ui >}}Serverless{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}][4] 페이지를 사용하여 모든 Azure 리소스의 문제를 해결하세요.

### Azure 메트릭 및 로그 {#azure-metrics-and-logs}

[Azure 통합][2]을 설치하여 Azure 앱 서비스에 대한 [보강된 메트릭][3] 및 리소스 메타데이터를 수집하세요.

[Azure 로그 포워딩][6]을 설정하여 Azure 앱 서비스 리소스 및 애플리케이션 로그를 자동으로 수집하고 Datadog으로 전송합니다.

### APM 및 Custom Metrics {#apm-and-custom-metrics}

APM 및 Custom Metrics로 Azure 앱 서비스 워크로드를 모니터링하려면 Azure 앱 서비스 워크로드를 계측할 수 있습니다.

| OS      | 런타임   | 문서               |
|---------|-----------|-----------------------------|
| Linux   | Java, Node.js, .NET, PHP, Python | [Linux - 코드 내 계측][7] |
| Linux   | 컨테이너 | [Linux - 컨테이너 계측][8] |
| Windows | Java, Node.js, .NET | [Windows - 코드 계측][9]

기능:
- 자동 계측을 사용한 전체 분산 APM 추적
- 관련 Azure App Service 메트릭과 메타데이터를 보여주는 사용자 지정 APM 서비스 및 트레이스 보기
- 스팬을 사용자 지정할 수 있는 수동 APM 계측
- `Trace_ID` 애플리케이션 로그에 삽입
- [DogStatsD][10]로 Custom Metrics 사용

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/overview
[2]: /ko/integrations/azure/
[3]: /ko/integrations/azure_app_services/#metrics
[4]: https://app.datadoghq.com/serverless/azure/app-service-plan
[5]: /ko/integrations/azure/#setup
[6]: /ko/logs/guide/azure-automated-log-forwarding/
[7]: /ko/serverless/azure_app_service/linux_code
[8]: /ko/serverless/azure_app_service/linux_container
[9]: /ko/serverless/azure_app_service/windows_code
[10]: /ko/extend/dogstatsd/