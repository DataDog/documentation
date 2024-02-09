---
disable_toc: false
further_reading:
- link: /observability_pipelines/monitoring/
  tag: 설명서
  text: 파이프라인 상태 모니터링
kind: documentation
title: 트러블슈팅
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">옵저버빌리티 파이프라인은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요
Datadog 옵저버빌리티 파이프라인(OP)에서 예기치 않은 동작이 발생하는 경우, 이 가이드를 통해 문제를 신속하게 해결할 수 있습니다. 계속해서 문제가 발생하면 [Datadog 지원팀][3]에 문의하여 추가 지원을 받으세요.

## 진단 로그 조사

옵저버빌리티 파이프라인 작업자는 자체 상태에 대한 내부 로그를 내보냅니다. 옵저버빌리티 파이프라인 UI에서 작업자 프로세스가 모든 개별 컴포넌트에 대해 내보내는 내부 오류 로그를 조사할 수 있습니다. 다음 진단 로그를 보려면:

1. [Observability Pipelines][1]로 이동합니다.
1. 조사하려는 파이프라인을 클릭합니다.
1. 컴포넌트의 사이드 패널을 보려면 컴포넌트를 클릭합니다.
1. 작업자가 내보내는 오류 로그를 보려면 **Diagnostic Logs** 탭을 클릭하세요. Log Explorer에서 로그 기록을 클릭하여 조사합니다. 나열된 로그가 없으면 컴포넌트가 오류 로그를 생성하지 않는 것입니다.

### 더 상세한 로그 보기

OP Worker가 수집하는 내부 로그에 대한 자세한 내용이 필요한 경우 `VECTOR_LOG` 환경 변수를 사용하여 로그의 수준을 높일 수 있습니다. 기본적으로 `INFO`로 설정되어 있으며, 이는 콘솔에서 `INFO`, `WARNING` 및 `ERROR` 메시지가 표시됨을 의미합니다.

이 옵션을 `DEBUG`로 설정하면 작업자의 내부 프로세스(HTTP 요청 및 수신된 응답 포함)에 대한 자세한 정보를 얻을 수 있습니다. 또한, Datadog 지원팀은 트러블슈팅에 도움이 되는 `DEBUG` 로그를 요청할 수 있습니다. 이러한 로그는 로그 탐색기 및 [진단 로그](#investigate-diagnostic-logs)에도 나타납니다.

## 파이프라인을 통해 진행되는 이벤트를 검사하여 설정 문제를 파악하세요.

OP Worker v1.4.0+를 사용하면 소스, 변환 및 싱크를 통과하는 데이터에 `tap`할 수 있으므로 파이프라인의 각 컴포넌트를 통해 처리되는 원시 데이터를 볼 수 있습니다.

### 옵저버빌리티 파이프라인 작업자 API 사용 

옵저버빌리티 파이프라인 작업자 API를 사용하면  `tap` 명령을 사용하여 작업자 프로세스와 상호 작용할 수 있습니다. [설정 가이드][2]에 제공된 Helm 차트를 사용하는 경우 API가 이미 활성화되어 있으며, 그렇지 않은 경우 환경 변수 `DD_OP_API_ENABLED`가 `true`로 설정되어 있는지 확인하세요. 이렇게 설정하면 CLI가 `tap`에 대해 예상하는 대로 API가 `localhost` 및 포트 `8686`를 수신합니다.

### 데이터를 보기 위해 `tap` 사용

작업자와 동일한 호스트에 있는 경우 `tap` 출력에 다음 명령을 실행하세요:

```
observability-pipelines-worker tap <source or transform name>
```

컨테이너화된 환경을 사용하는 경우 `docker exec` 또는 `kubectl exec` 명령을 사용하여 컨테이너에 shell을 가져와 위의 `tap` 명령을 실행합니다.

### `tap` 사용 예시

다음 예제 설정을 추가합니다. 여기서 `cleanup` 변환은 `log` 속성을 `message`의 복사본으로 만듭니다:

```
sources:
  demo:
    type: demo_logs
    format: json

transforms:
  cleanup:
    type: remap
    inputs:
      - demo
    source: |-
      .log = .message

sinks:
  blackhole:
    type: blackhole
  inputs:
    - cleanup
  print_interval_secs: 0
```

다음 명령을 사용하여 예제 설정을 실행하고 `cleanup` 변환의 출력을 확인합니다:

```
observability-pipelines-worker tap cleanup
```

예상 출력은 다음과 유사해야 합니다. 여기서 `log` 속성은 `message` 속성의 복사본입니다:

```
[tap] Pattern 'cleanup' successfully matched.
{"log":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","message":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:53.429855261Z"}
{"log":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","message":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:54.430584949Z"}
{"log":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","message":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:55.430085107Z"}
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /ko/observability_pipelines/setup/
[3]: /ko/help