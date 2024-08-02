---
aliases:
- /ko/infrastructure/serverless/azure_app_services/
further_reading:
- link: /integrations/azure_app_services/
  tag: 설명서
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: 설명서
  text: Azure App Service 환경
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: 블로그
  text: Azure App Service용 Datadog 확장을 이용해 .NET 웹 앱 모니터링
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: 블로그
  text: ASP.NET Core 애플리케이션을 Azure App Service에 배포
- link: https://www.datadoghq.com/pricing/?product=application-performance-monitoring#application-performance-monitoring-apm_faq-what-is-considered-as-a-host-for-azure-app-services
  tag: 가격
  text: Azure App Service APM 가격
title: Azure App Service 모니터링
---

## 개요

Microsoft [Azure App Service][1]는 인프라스트럭처 관리 없이도 웹 앱, 모바일 백엔드, 이벤트 중심 기능, RESTful API를 구축 및 호스팅할 수 있는 서버리스 리소스 그룹입니다. 모든 규모의 워크로드를 호스팅할 수 있으며 자동 확장 및 고가용성 옵션을 제공합니다.

Datadog은 모든 Azure App Service 리소스 유형에 대한 모니터링 기능을 제공합니다:

- [Azure 통합][3]을 사용하는 앱과 함수에 대한 Azure 모니터 [메트릭][2].
- [Azure App Service 보기][4]를 사용해 문제를 빠르게 찾고, Azure App Service 리소스 간의 관계를 매핑하며, 비용 및 성능에 관한 인사이트를 얻을 수 있습니다.
- API를 통해 커스텀 메트릭을 제출합니다.
- [이벤트 허브][6]를 통해 [리소스 로그][5]를 제출합니다.

Datadog은 베이직, 스탠다드, 프리미엄 플랜에서 다음 Azure App Service 워크로드 런타임에 대한 추가 모니터링 기능을 제공합니다:

| OS | 런타임 |앱 유형|상태|설명서| 
|----|---------|-----|----|--------------|
|윈도우즈(Windows)|.NET|함수 앱 & 웹 앱|GA|[Windows .NET 설정][7]|
|윈도우즈(Windows)|Java|함수 앱 & 웹 앱|베타|[Windows Java 설정][8]|
|리눅스(Linux)|.NET|웹 앱|GA|[Linux .NET 설정][9]|
|리눅스(Linux)|Node|웹 앱|GA|[Linux 노드 설정][9]|
|리눅스(Linux)|PHP|웹 앱|GA|[Linux PHP 설정][9]|
|리눅스(Linux)|Java|웹 앱|GA|[Linux Java 설정][10]|
|리눅스(Linux)|파이썬(Python)|웹 앱|GA|[Linux Python 설정][9]|

기능:
- 자동 계측을 사용한 전체 분산 APM 추적
- 관련 Azure App Service 메트릭과 메타데이터를 보여주는 사용자 지정 APM 서비스 및 트레이스 보기
- 스팬을 사용자 지정할 수 있는 수동 APM 계측
- 애플리케이션 로그에 `Trace_ID` 삽입
- [DogStatsD][11]로 커스텀 메트릭 사용

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/overview
[2]: /ko/integrations/azure_app_services/#metrics
[3]: /ko/integrations/azure/
[4]: https://app.datadoghq.com/functions?search=&cloud=azure&entity_view=app_service_plan
[5]: /ko/integrations/azure/#log-collection
[6]: https://learn.microsoft.com/azure/event-hubs/
[7]: /ko/serverless/azure_app_services/azure_app_services_windows?tab=net#setup
[8]: /ko/serverless/azure_app_services/azure_app_services_windows?tab=java#setup
[9]: /ko/serverless/azure_app_services/azure_app_services_linux?tab=nodenetphppython
[10]: /ko/serverless/azure_app_services/azure_app_services_linux?tab=java
[11]: /ko/developers/dogstatsd/