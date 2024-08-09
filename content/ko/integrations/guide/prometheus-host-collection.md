---
further_reading:
- link: logs/log_collection
  tag: 설명서
  text: 로그 수집
- link: /infrastructure/process
  tag: 설명서
  text: 프로세스 수집
- link: 추적
  tag: 설명서
  text: 트레이스 수집
- link: developers/prometheus
  tag: 설명서
  text: 자체적인 커스텀 프로메테우스(Prometheus) 점검 작성
title: 호스트에서 프로메테우스(Prometheus) 및 개방형메트릭 수집
---

Datadog 에이전트와 [Datadog-개방형메트릭][1] 또는 [Datadog-프로메테우스][2] 통합을 사용하여 호스트에서 실행 중인 애플리케이션에서 노출된 프로메테우스 및 개방형 메트릭 메트릭을 수집합니다.

## 개요

버전 6.5.0부터 프로메테우스 엔드포인트를 스크래핑할 수 있는 [개방형 메트릭][3] 및 [프로메테우스][4] 점검이 에이전트에 포함되어 있습니다. Datadog은 더 효율적이고 프로메테우스 텍스트 형식을 완벽하게 지원하는 개방형 메트릭 점검을 사용할 것을 권장합니다. 커스텀 점검 작성 등 `OpenMetricsCheck` 인터페이스의 고급 사용법은 [개발자 도구][5] 섹션을 참조하세요. 또한, 메트릭 엔드포인트가 텍스트 형식을 지원하지 않는 경우에만 프로메테우스 점검을 사용하세요.

이 페이지에서는 이러한 검사의 기본 사용법을 설명하며, 이를 통해 Datadog 내에 노출된 모든 프로메테우스 메트릭을 가져올 수 있습니다.

## 구성

### 설치

[해당 운영체제에 맞는 Datadog Agent를 설치하세요][6]. 개방형메트릭 및 프로메테우스 점검은 [Datadog 에이전트][7] 패키지에 포함되어 있으므로 컨테이너나 호스트에 달리 설치할 필요가 없습니다.

### 설정

노출된 메트릭 수집 방법:

1. [에이전트 설정 디렉터리][8]의 루트에 있는 `conf.d/` 폴더의 `openmetrics.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [샘플 openmetrics.d/conf.yaml][9]을 참조하세요. 통합을 활성화하는 데 필요한 최소 필수 설정은 다음과 같습니다.

    ```yaml
    init_config:

    instances:
        - prometheus_url: 'localhost:<PORT>/<ENDPOINT>'
          namespace: '<NAMESPACE>'
          metrics:
              - '<METRIC_TO_FETCH>': '<DATADOG_METRIC_NAME>'
    ```

   다음 자리 표시자 설정 값을 사용합니다.

    | 자리 표시자             | 설명                                                                                                                                                                                                            |
    | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `<PORT>`                | 프로메테우스 엔드포인트에 액세스하기 위한 연결 포트입니다.                                                                                                                                             |
    | `<ENDPOINT>`            | 프로메테우스 형식으로, 컨테이너에서 제공되는 메트릭 URL입니다.                                                                                                                                                   |
    | `<NAMESPACE>`           | Datadog에서 확인 시 각 메트릭의 접두어로 사용되는 네임스페이스를 설정합니다.                                                                                                                                                   |
    | `<METRIC_TO_FETCH>`     | 프로메테우스 엔드포인트에서 가져온 프로메테우스 메트릭 키입니다.                                                                                                                                              |
    | `<DATADOG_METRIC_NAME>` | 설정된 경우 Datadog에서 `<METRIC_TO_FETCH>` 메트릭 키를 `<DATADOG_METRIC_NAME>`으로 변환하는 선택적 파라미터입니다. <br>이 옵션을 사용하지 않기로 선택한 경우 `key:value` 쌍이 아닌 문자열 목록을 전달하세요. |

2. [에이전트를 다시 시작][10]하여 메트릭 수집을 시작하세요.

### 사용 가능한 파라미터

아래에서 `instances`에 사용할 수 있는 파라미터 전체 목록을 학인하세요.

| 이름                                    | 유형                                    | 필요 | 기본값 | 설명                                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prometheus_url`                        | 스트링                                  | 필수  | 없음          | 프로메테우스/개방형메트릭에 의해 애플리케이션 메트릭이 노출되는 URL입니다.                                                                                                                                                                                        |
| `namespace`                             | 스트링                                  | 필수  | 없음          | 모든 메트릭 네임스페이스 앞에 네임스페이스 을 추가해야 합니다. 메트릭은 `namespace.metric_name` 형식으로 수집됩니다.                                                                                                                                          |
| `metrics`                               | 문자열 또는 `key:value` 요소 목록 | 필수  | 없음          | 프로메테우스 엔드포인트에서 가져온 메트릭 `<METRIC_TO_FETCH>: <NEW_METRIC_NAME>` 쌍의 목록입니다. <br>`<NEW_METRIC_NAME>`은 선택적입니다. 설정된 경우 Datadog 이름을 변경합니다. 이 목록은 최소 하나의 메트릭을 포함해야 합니다.                            |
| `prometheus_metrics_prefix`             | 문자열                                  | 선택 사항  | 없음          | 노출된 프로메테우스/개방형메트릭 접두어                                                                                                                                                                                                                   |
| `health_service_check`                  | 부울                                 | 선택 사항  | true          | 프로메테우스 엔드포인트의 상태에 대한 서비스 점검 보고를 전송하세요. 점검 이름은 `<NAMESPACE>.prometheus.health`입니다.                                                                                                                                         |
| `label_to_hostname`                     | 스트링                                  | 선택 사항  | 없음          | 하나의 라벨 값을 사용해 호스트 이름을 덮어씁니다.                                                                                                                                                                                                                   |
| `label_joins`                           | object                                  | 선택 사항  | 없음          | 레이블 병합을 사용하면 메트릭을 타깃팅하고 1:1 매핑을 사용하여 해당 레이블을 검색할 수 있습니다.                                                                                                                                                                               |
| `labels_mapper`                         | 키:값 요소 목록               | 선택 사항  | 없음          | 레이블 매퍼를 사용해 일부 레이블의 이름을 변경할 수 있습니다. 형식: `<LABEL_TO_RENAME>: <NEW_LABEL_NAME>`                                                                                                                                                                    |
| `type_overrides`                        | 키:값 요소 목록               | 선택 사항  | 없음          | 유형 재정의를 사용하면 프로메테우스 페이로드의 유형을 재정의하거나 유형이 지정되지 않은 측정항목을 입력할 수 있습니다(기본적으로 무시됨). <br>지원되는 `<METRIC_TYPE>`은 `gauge`, `monotonic_count`, `histogram` 및 `summary`입니다.                                             |
| `tags`                                  | 키:값 요소 목록               | 선택 사항  | 없음          | 이 통합에서 발생하는 모든 메트릭, 이벤트 및 서비스 점검에 연결할 태그 목록입니다.<br> [태그 지정에 대해 자세히 알아보세요][5].                                                                                                                                     |
| `send_distribution_buckets`             | 부울                                 | 선택 사항  | false         | 개방형메트릭 히스토그램을 [분산 메트릭][15]으로 보내고 변환하려면 `send_distribution_buckets`을 `true`로 설정합니다. <br>`collect_histogram_buckets`은 `true`(기본값)으로 설정해야 합니다. **참고**: 개방형메트릭 버전 2의 경우 `collect_counters_with_distributions`을 대신 사용하세요.                                                                              |
| `send_distribution_counts_as_monotonic` | 부울                                 | 선택 사항  | false         | 개방형메트릭 히스토그램/요약 개수를 모노토닉 개수로 보내려면 `send_distribution_counts_as_monotonic`을 `true`로 설정합니다.                                                                                                                                              |
| `collect_histogram_buckets`               | 부울                                 | 선택 사항  | true          | `collect_histogram_buckets`을 `true`로 설정하여 히스토그램 버킷을 전송합니다.                                                                                                                                                                                               |
| `send_monotonic_counter`                | 부울                                 | 선택 사항  | true          | 모노토닉 개수를 개수로 전송하려면 [GitHub에서 관련 문제][9]를 확인하세요.                                                                                                                                                                                             |
| `exclude_labels`                        | 문자열 목록                          | 선택 사항  | 없음          | 제외할 레이블 목록입니다.                                                                                                                                                                                                                                       |
| `ssl_cert`                              | 스트링                                  | 선택 사항  | 없음          | 프로메테우스 엔드포인트가 보안되고 있는 경우 이를 구성하기 위한 설정은 다음과 같습니다.<br> 인증서에 대한 경로만 지정해야 하므로 개인 키를 지정해야 합니다. 또는 인증서와 개인 키를 모두 포함하는 파일에 대한 경로를 지정해야 할 수 있습니다. |
| `ssl_private_key`                       | 스트링                                  | 선택 사항  | 없음          | 인증서에 개인 키가 포함되어 있지 않은 경우 필요합니다. <br> **경고**: 로컬 인증서의 개인 키는 암호화되지 않아야 합니다.                                                                                                                          |
| `ssl_ca_cert`                           | 스트링                                  | 선택 사항  | 없음          | 커스텀 인증서를 생성하는 데 사용되는 신뢰할 수 있는 CA의 경로입니다.                                                                                                                                                                                                  |
| `prometheus_timeout`                    | 정수                                 | 선택 사항  | 10            | 프로메테우스/개방형메트릭 쿼리에 대한 시간 초과(초)를 설정합니다.                                                                                                                                                                                                       |
| `max_returned_metrics`                  | 정수                                 | 선택 사항  | 2000          | 기본적으로 점검은 메트릭 2000개로 제한됩니다. 필요한 경우 이 제한을 늘립니다.                                                                                                                                                                                   |
| `bearer_token_auth`                     | 부울                                 | 선택 사항  | false         | 베어러 토큰 인증 헤더를 추가하려면 `bearer_token_auth`을 `true`로 설정하세요. **참고**: `bearer_token_path`가 설정되지 않은 경우 `/var/run/secrets/kubernetes.io/serviceaccount/token`이 기본 경로로 사용됩니다.                                                       |
| `bearer_token_path`                     | 스트링                                  | 선택 사항  | 없음          | 쿠버네티스(Kubernetes) 서비스 계정 전달자 토큰 파일의 경로입니다(파일이 존재하고 올바르게 마운트되었는지 확인). **참고**: 인증을 위해 HTTP 헤더에 토큰을 추가하려면 `bearer_token_auth`을 `true`으로 설정하세요.                                          |
| `collect_counters_with_distributions`   | 부울                                 | 선택 사항  | false         | 히스토그램 버킷을 Datadog 분산 메트릭으로 전송할 때 `.sum` 및 `.count`로 끝나는 관찰 카운터 메트릭을 수집할지 여부입니다. 이는 암묵적으로 `histogram_buckets_as_distributions` 옵션을 활성화합니다. |

**참고**: `send_distribution_buckets` 및 `send_distribution_counts_as_monotonic`를 제외한 모든 파라미터는 개방형메트릭 점검과 프로메테우스 점검 모두에서 지원됩니다.

## 시작하기

### 단순 메트릭 수집

프로메테우스로 인해 노출된 메트릭 수집을 시작하려면 이러한 단계를 따릅니다.

1. [프로메테우스 시작하기][11] 문서에 따라 자체 모니터링하는 프로메테우스 로컬 버전을 시작하세요.

2. [플랫폼에 맞는 Datadog 에이전트를 설치합니다][6].

3. [에이전트 설정 디렉토리][8]의 루트에 있는 `conf.d/` 폴더에 있는 `openmetrics.d/conf.yaml` 파일을 다음 내용으로 편집합니다:

    ```yaml
    init_config:

    instances:
        - prometheus_url: http://localhost:9090/metrics
          namespace: 'documentation_example'
          metrics:
              - promhttp_metric_handler_requests_total: prometheus.handler.requests.total
    ```

4. [에이전트를 다시 시작합니다][12].

5. [메트릭 요약 페이지][13]로 이동하여 수집된 메트릭(`prometheus_target_interval_length_seconds*`)을 확인합니다.

    {{< img src="integrations/guide/prometheus_host/prometheus_collected_metric_host.png" alt="수집된 프로메테우스 메트릭">}}

## 사용자 지정에서 공식 통합까지

기본적으로 일반 Prometheus 검사에서 검색된 모든 메트릭은 사용자 지정 메트릭으로 간주됩니다. 기성 소프트웨어를 모니터링하면서 공식 통합이 필요하다고 생각되면 주저하지 마시고 [기여][5]해 주세요!

공식 통합 서비스에는 전용 디렉토리가 있습니다. 일반 검사에는 기본 설정 및 메트릭 메타데이터를 하드코딩하기 위한 기본 인스턴스 메커니즘이 있습니다. 예를 들어, [kube-proxy][14] 통합을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/openmetrics/
[2]: /ko/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ko/developers/custom_checks/prometheus/
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /ko/getting_started/tagging/
[8]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://prometheus.io/docs/prometheus/latest/getting_started/
[12]: /ko/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[13]: https://app.datadoghq.com/metric/summary
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: /ko/metrics/distributions/