---
aliases:
- /ko/tracing/runtime_metrics/dotnet
code_lang: dotnet
code_lang_weight: 50
description: 트레이스에 연결된 런타임 메트릭을 통해 .NET 애플리케이션의 성능에 대한 추가 인사이트를 얻으세요.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: 설명서
  text: 로그 및 트레이스를 서로 연결
- link: tracing/trace_collection/custom_instrumentation
  tag: 설명서
  text: 애플리케이션을 수동으로 계측하여 트레이스를 생성합니다.
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스 및 트레이스 탐색
- link: https://www.datadoghq.com/blog/dotnet-runtime-metrics/
  tag: 블로그
  text: Datadog를 통한 .NET 런타임 메트릭 모니터링
kind: 설명서
title: .NET 런타임 메트릭
type: multi-code-lang
---

## 런타임 메트릭 호환성

- .NET Framework 4.6.1 이상 
- .NET Core 3.1
- .NET 5
- .NET 6
- NET 7
- .NET 8

## 자동 설정

`DD_RUNTIME_METRICS_ENABLED=true` 환경 변수를 사용하여 .NET Tracer 1.23.0+에서 런타임 메트릭 컬렉션을 활성화합니다.

.NET 서비스와의 상관관계에서 런타임 메트릭을 봅니다. Datadog에서 [서비스 카탈로그][1]를 참조하세요.

기본적으로 애플리케이션의 런타임 메트릭은 포트 `8125` 를 통해 DogStatsD 으로 Datadog 에이전트로 전송됩니다. [에이전트][2]에 [DogStatsD]가 활성화되어 있는지 확인하세요.

에이전트를 컨테이너 로 실행하는 경우 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`가 [true로 설정되어 있는지][3], 포트 `8125`가 에이전트 에서 열려 있는지 확인합니다. 또한:

- **쿠버네티스(Kubernetes)**: DogStatsD 포트를 호스팅 포트에 [바인딩해야 합니다][4].
- **ECS**: [작업 정의에서 적절한 플래그를 설정][5]합니다.

또는 에이전트는 UDP 전송의 대안으로 유닉스 도메인 소켓(UDS)을 사용하여 메트릭을 수집할 수 있습니다. 자세한 내용은 [DogStatsD 를 통한 Unix 도메인 소켓][7]을 참조하세요.

## 수집한 데이터

.NET 메트릭을 사용하도록 설정하면 기본적으로 다음 메트릭이 수집됩니다.

{{< get-metrics-from-git "dotnet" >}}

메트릭 애플리케이션 성능 모니터링(APM) 서비스(현황) 페이지에서 Datadog는 [기본 .NET 런타임 대시보드][6]를 제공합니다. 

## IIS에 대한 추가 권한

.NET Framework에서는 성능 카운터를 사용하여 메트릭 데이터를 수집합니다. 비대화형 로그온 세션의 사용자(IIS 애플리케이션 풀 계정 및 일부 서비스 계정 포함)가 반대의 데이터에 액세스하려면 **성능 모니터링 사용자** 그룹에 추가되어야 합니다.

IIS 응용 프로그램 풀은 사용자의 목록 에 나타나지 않는 특수 계정을 사용합니다. 성능 모니터링 사용자 그룹에 추가하려면 `IIS APPPOOL\<name of the pool>` 을 찾습니다. 예를 들어 DefaultAppPool의 사용자는 `IIS APPPOOL\DefaultAppPool` 입니다.

이 작업은 '컴퓨터 관리' UI 또는 관리자 명령 프롬프트에서 수행할 수 있습니다:

```
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ko/developers/dogstatsd/#setup
[3]: /ko/agent/docker/#dogstatsd-custom-metrics
[4]: /ko/developers/dogstatsd/?tab=kubernetes#agent
[5]: /ko/agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30412/net-runtime-metrics
[7]: /ko/developers/dogstatsd/unix_socket/