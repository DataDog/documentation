---
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/monitoring/
  tag: 설명서
  text: 파이프라인 상태 모니터링
title: (레거시) 트러블슈팅
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipeline은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요
Datadog Observability Pipelines(OP)에서 예상치 못한 동작 발생 시, 이 가이드를 통해 신속하게 해결할 수 있습니다. 문제가 지속되면 [Datadog 지원팀][3]에 문의하여 추가 지원을 받으세요.

## 진단 로그 조사

Observability Pipelines Worker는 자체 상태에 대한 내부 로그를 생성합니다. Observability Pipelines UI에서 Worker 프로세스가 모든 개별 구성 요소에 생성하는 내부 오류 로그를 조사할 수 있습니다. 다음 단계를 따라 진단 로그를 확인하세요.

1. [Observability Pipelines][1]로 이동합니다.
1. 조사하려는 파이프라인을 클릭합니다.
1. 구성 요소를 클릭하면 구성 요소의 사이드 패널을 볼 수 있습니다.
1. **Diagnostic Logs** 탭을 클릭하면 Worker에서 발생하는 오류 로그를 볼 수 있습니다. 로그 기록을 클릭하면 Log Explorer에서 해당 로그를 조사할 수 있습니다. 로그가 표시되지 않으면 해당 구성 요소가 오류 로그를 생성하지 않는 것입니다.

### 더 자세한 로그 확인하기

OP Worker가 수집하는 내부 로그에 관해 자세한 정보가 필요하면 `VECTOR_LOG` 환경 변수를 사용하여 로그 수준을 높일 수 있습니다. 기본적으로 이 설정은 `INFO`로 설정되어 있으며 `INFO`, `WARNING`, `ERROR` 메시지가 콘솔에 표시됩니다.

이 값을 `DEBUG`로 설정하면 Worker의 내부 프로세스(HTTP 요청 및 수신된 응답 포함)에 관한 자세한 정보를 얻을 수 있습니다. Datadog 지원팀에서 문제 해결에 도움이 되는 `DEBUG` 로그를 요청할 수 있습니다. 이러한 로그는 Log Explorer와 [진단 로그](#investigate-diagnostic-logs)에도 표시됩니다.

## 파이프라인을 통과하는 이벤트를 조사하여 설정 문제 식별

OP Worker v1.4.0 이상 버전에서는 `tap` 기능을 사용해 소스, 변환, 싱크 단계를 통과하는 데이터를 관찰하고, 파이프라인 내 각 구성 요소를 통과하는 원시 데이터를 확인할 수 있습니다.

### Observability Pipelines Worker API 사용

 Observability Pipelines Worker API를 사용하면 `tap` 명령을 사용하여 Worker 프로세스와 상호 작용할 수 있습니다. [설정 가이드][2]에 제공된 Helm 차트를 사용하는 경우 API가 이미 활성화되어 있습니다. 그렇지 않으면 환경 변수 `DD_OP_API_ENABLED`가 `true`로 설정되어 있는지 확인하세요. 이 설정은 API가 `localhost` 및 포트 `8686`을 수신하도록 구성하며, 이는 `tap` CLI가 예상하는 설정입니다.

### `tap`을 사용해 데이터 확인

Worker와 동일한 호스트에서 작업 중이라면, 다음 명령을 실행하여 출력을 `tap`에 표시하세요.

```
observability-pipelines-worker tap <source or transform name>
```

컨테이너화된 환경을 사용 중이라면 `docker exec` 또는 `kubectl exec` 명령을 사용하여 컨테이너로 셸을 가져와서 위의 `tap` 명령을 실행합니다.

### `tap` 사용 예시 

다음 예제 구성을 추가하면 `cleanup` 변환으로 인해 `log` 속성이 `message`의 복사본이 됩니다.

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

다음 명령을 사용하여 예제 구성을 실행하고 `cleanup` 변환의 출력을 확인하세요.

```
observability-pipelines-worker tap cleanup
```

예상되는 출력은 다음과 비슷해야 합니다. 여기서 `log` 속성은 `message` 속성의 복사본입니다.

```
[tap] Pattern 'cleanup' successfully matched.
{"log":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","message":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:53.429855261Z"}
{"log":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","message":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:54.430584949Z"}
{"log":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","message":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:55.430085107Z"}
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /ko/observability_pipelines/legacy/setup/
[3]: /ko/help