---
kind: 설명서
title: .NET용 데이터 스트림 모니터링 설정
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">데이터 스트림 모니터링은 AP1 리전에서 지원되지 않습니다.</a></div>
{{< /site-region >}}

### 전제 조건

데이터 스트림 모니터링을 시작하려면 Datadog 에이전트와 .NET 라이브러리 라이브러리 최신 버전이 필요합니다.
* [Datadog 에이전트 v7.34.0 이상][1]
* .NET Tracer v2.28.0 이상([.NET Core][2], [.NET Framework][3])

### 설치

.NET에서는 자동 계측을 사용해 데이터 스트림 모니터링에 필요한 추가 메타 데이터를 삽입하거나 추출해 엔드 투 엔드 대기 시간과 대기열과 서비스 간 관계를 측정합니다. 데이터 스트림 모니터링을 사용하려면 Kafka나 RabbitMQ을 통해 메시지를 보내는 서비스(또는 메시지를 받는 서비스)에서 `DD_DATA_STREAMS_ENABLED` 환경 변수를 `true`로 설정합니다.

예를 들면 다음과 같습니다.
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

[1]: /ko/agent
[2]: /ko/tracing/trace_collection/dd_libraries/dotnet-core
[3]: /ko/tracing/trace_collection/dd_libraries/dotnet-framework