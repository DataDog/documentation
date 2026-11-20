---
further_reading:
- link: logs/log_collection
  tag: 설명서
  text: 로그 수집
- link: /infrastructure/process
  tag: 설명서
  text: 프로세스 수집
- link: tracing
  tag: 설명서
  text: 트레이스 수집
- link: extend/prometheus
  tag: 설명서
  text: 사용자 지정 Prometheus 검사 작성
title: 호스트에서 Prometheus 및 OpenMetrics 메트릭 수집
---
Datadog Agent와 [Datadog-OpenMetrics][1] 통합 또는 [Datadog-Prometheus][2] 통합를 사용하여 호스트에서 실행 중인 애플리케이션에서 노출된 Prometheus 및 OpenMetrics 메트릭을 수집합니다.

## 개요 {#overview}

버전 6.5.0부터 Agent에 Prometheus 엔드포인트를 스크레이핑할 수 있는 [OpenMetrics][3] 및 [Prometheus][4] 검사가 포함됩니다. OpenMetrics 검사가 더 효율적이고 Prometheus 텍스트 형식을 완전히 지원하기 때문에 OpenMetrics 검사를 사용하는 것이 좋습니다. 사용자 지정 검사 작성을 비롯한 `OpenMetricsCheck` 인터페이스의 고급 사용법을 자세히 알아보려면 [개발자 도구][5] 섹션을 참조하세요. Prometheus 검사는 메트릭 엔드포인트가 텍스트 형식을 지원하지 않는 경우에만 사용하세요.

이 페이지에서는 이러한 검사의 기본 사용법을 설명합니다. 따라서 Datadog 내에서 모든 Prometheus 노출 메트릭을 가져올 수 있습니다.

## 설정 {#setup}

### 설치 {#installation}

[해당 운영 체제용 Datadog Agent를 설치하세요][6]. OpenMetrics 및 Prometheus 검사는 [Datadog Agent][7] 패키지에 포함되어 있으므로 컨테이너나 호스트에 어떤 것도 설치할 필요가 없습니다.

### 구성 {#configuration}

노출된 메트릭을 수집하려면 다음 단계를 따르세요.

1. [Agent 구성 디렉터리][8] 루트의 `conf.d/` 폴더에 있는 `openmetrics.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 openmetrics.d/conf.yaml][9]을 참조하세요. 통합을 활성화하는 데 필요한 최소 구성은 다음과 같습니다.

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: 'localhost:<PORT>/<ENDPOINT>'
          namespace: '<NAMESPACE>'
          metrics:
              - '<METRIC_TO_FETCH>': '<DATADOG_METRIC_NAME>'
    ```

     다음과 같은 구성 자리 표시자 값을 사용합니다.

    | 자리 표시자             | 설명                                                                                                                                                                                                            |
    | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `<PORT>`                | Prometheus 엔드포인트에 액세스하기 위해 연결할 포트입니다.                                                                                                                                                         |
    | `<ENDPOINT>`            | 컨테이너가 처리하는 메트릭의 URL입니다(Prometheus 형식).                                                                                                                                                     |
    | `<NAMESPACE>`           | Datadog에서 볼 때 모든 메트릭에 접두사로 추가할 설정된 네임스페이스입니다.                                                                                                                                                   |
    | `<METRIC_TO_FETCH>`     | Prometheus 엔드포인트에서 가져올 Prometheus 메트릭 키입니다.                                                                                                                                                     |
    | `<DATADOG_METRIC_NAME>` | 선택적 파라미터로, 설정하면 Datadog에서 '<METRIC_TO_FETCH>' 메트릭 키를 '<DATADOG_METRIC_NAME>'으로 변환합니다. <br>이 옵션을 사용하지 않기로 선택할 경우 '키:값' 쌍 대신 문자열 목록을 전달하세요. |

2. [Agent를 다시 시작][10]하여 메트릭 수집을 시작합니다.

### 사용 가능한 파라미터 {#parameters-available}

`instances`에 사용할 수 있는 전체 파라미터 목록은 다음과 같습니다.

| 이름                                    | 유형                                    | 필수 여부 | 기본값 | 설명                                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openmetrics_endpoint`                        | 문자열                                  | 필수  | 없음          | OpenMetrics 형식으로 메트릭을 노출하는 URL입니다.                                                                           |
| `namespace`                             | 문자열                                  | 필수  | 없음          | 모든 메트릭 네임스페이스 앞에 추가할 네임스페이스입니다. 메트릭은 `namespace.metric_name` 형식으로 수집됩니다.                                                                                                                                          |
| `metrics`                               | 문자열 목록 또는 `key:value` 요소 | 필수  | 없음          | Prometheus 엔드포인트에서 가져올 메트릭에 대한 `<METRIC_TO_FETCH>: <NEW_METRIC_NAME>` 쌍의 목록입니다.<br> `<NEW_METRIC_NAME>` 항목은 선택 사항입니다. 설정된 경우 Datadog에서 이름을 변환합니다. 이 목록에는 최소한 하나의 메트릭이 포함되어야 합니다.                            |
| `raw_metric_prefix`             | 문자열                                  | 선택 사항  | 없음          | 노출된 모든 메트릭 이름에 접두사가 있으면 해당 접두사를 제거합니다.                                                                                                                 |
| `health_service_check`                  | 불리언                                 | 선택 사항  | true          | Prometheus 엔드포인트의 상태를 보고하는 서비스 검사를 전송합니다. 검사 이름은 `<NAMESPACE>.prometheus.health`입니다.                                                                                                                                         |
| `label_to_hostname`                     | 문자열                                  | 선택 사항  | 없음          | 하나의 레이블 값으로 호스트 이름을 재정의합니다.                                                                                                                                                                                                                   |
| `label_joins`                           | 객체                                  | 선택 사항  | 없음          | 레이블 조인을 사용하면 메트릭을 대상으로 지정하고 1:1 매핑을 사용하여 해당 레이블을 검색할 수 있습니다.                                                                                                                                                                               |
| `labels_mapper`                         | 키:값 요소 목록               | 선택 사항  | 없음          | 레이블 매퍼를 사용하면 일부 레이블의 이름을 바꿀 수 있습니다. 형식: `<LABEL_TO_RENAME>: <NEW_LABEL_NAME>`.                                                                                                                                                                    |
| `type_overrides`                        | 키:값 요소 목록               | 선택 사항  | 없음          | 유형 재정의를 사용하면 Prometheus 페이로드의 유형을 재정의하거나 유형이 지정되지 않은 메트릭에 유형을 지정할 수 있습니다(유형이 지정되지 않은 메트릭은 기본적으로 무시됨).<br> 지원되는 `<METRIC_TYPE>`은 `gauge`, `monotonic_count`, `histogram` 및 `summary`입니다.                                             |
| `tags`                                  | 키:값 요소 목록               | 선택 사항  | 없음          | 이 통합에서 내보내는 모든 메트릭, 이벤트 및 서비스 검사에 첨부할 태그 목록입니다.<br> [태깅에 대해 자세히 알아보세요][5].                                                                                                                                     |
| `send_distribution_buckets`             | 불리언                                 | 선택 사항  | false         | OpenMetrics 히스토그램을 [분포 메트릭][15]으로 변환하여 전송하려면 `send_distribution_buckets`를 `true`로 설정하세요. <br>`collect_histogram_buckets`는 `true`(기본값)로 설정해야 합니다.<br> **참고**: OpenMetrics v2의 경우 대신 `collect_counters_with_distributions`를 사용하세요.                                                                              |
| `send_distribution_counts_as_monotonic` | 불리언                                 | 선택 사항  | false         | OpenMetrics 히스토그램/요약 카운트를 단조 카운트로 전송하려면 `send_distribution_counts_as_monotonic`을 `true`로 설정하세요.                                                                                                                                              |
| `collect_histogram_buckets`               | 불리언                                 | 선택 사항  | true          | 히스토그램 버킷을 전송하려면 `collect_histogram_buckets`를 `true`로 설정하세요.                                                                                                                                                                                               |
| `send_monotonic_counter`                | 불리언                                 | 선택 사항  | true          | 카운트를 단조 카운트로 전송하려면 [GitHub의 관련 문제][9]를 참조하세요.                                                                                                                                                                                             |
| `exclude_labels`                        | 문자열 목록                          | 선택 사항  | 없음          | 제외할 레이블 목록입니다.                                                                                                                                                                                                                                       |
| `ssl_cert`                              | 문자열                                  | 선택 사항  | 없음          | Prometheus 엔드포인트에 보안이 설정된 경우, 구성 설정은 다음과 같습니다.<br> 인증서 경로만 지정하고 프라이빗 키를 별도로 지정하거나 인증서와 프라이빗 키가 모두 포함된 파일의 경로를 지정할 수 있습니다. |
| `ssl_private_key`                       | 문자열                                  | 선택 사항  | 없음          | 인증서에 프라이빗 키가 포함되어 있지 않은 경우 필요합니다.<br> **경고**: 로컬 인증서의 프라이빗 키는 암호화되어 있지 않아야 합니다.                                                                                                                          |
| `ssl_ca_cert`                           | 문자열                                  | 선택 사항  | 없음          | 사용자 지정 인증서를 생성하는 데 사용되는 신뢰할 수 있는 CA 경로입니다.                                                                                                                                                                                                  |
| `timeout`                               | 정수                                 | 선택 사항  | 10            | Prometheus/OpenMetrics 쿼리에 대한 시간 제한을 초 단위로 설정합니다.                                                                                                                                                                                                       |
| `max_returned_metrics`                  | 정수                                 | 선택 사항  | 2000          | 검사는 기본적으로 메트릭 2000개로 제한됩니다. 필요한 경우 이 제한을 늘리세요.                                                                                                                                                                                   |
| `bearer_token_auth`                     | 불리언                                 | 선택 사항  | false         | bearer 토큰 인증 헤더를 추가하려면 `bearer_token_auth`를 `true`로 설정하세요. **참고**: `bearer_token_path`가 설정되지 않은 경우 `/var/run/secrets/kubernetes.io/serviceaccount/token`이 기본 경로로 사용됩니다.                                                       |
| `bearer_token_path`                     | 문자열                                  | 선택 사항  | 없음          | Kubernetes 서비스 계정 bearer 토큰 파일 경로입니다(파일이 존재하고 올바르게 마운트되었는지 확인). **참고**: 인증을 위해 HTTP 헤더에 토큰을 추가하려면 `bearer_token_auth`를 `true`로 설정하세요.                                          |
| `collect_counters_with_distributions`   | 불리언                                 | 선택 사항  | false         | 히스토그램 버킷을 Datadog 분포 메트릭으로 보낼 때 `.sum` 및 `.count`로 끝나는 관측 카운터 메트릭도 수집할지 여부입니다. 이 파라미터는 `histogram_buckets_as_distributions` 옵션을 암시적으로 활성화합니다. |

**참고**: `send_distribution_buckets` 및 `send_distribution_counts_as_monotonic`을 제외한 모든 파라미터는 OpenMetrics 검사와 Prometheus 검사 모두에서 지원됩니다.

## 시작하기 {#getting-started}

### 간단한 메트릭 수집 {#simple-metric-collection}

Prometheus가 노출하는 메트릭 수집을 시작하려면 다음 단계를 따르세요.

1. [Prometheus 시작하기][11] 설명서에 따라 자신을 모니터링하는 로컬 Prometheus 버전을 시작합니다.

2. [사용 중인 플랫폼에 맞는 Datadog Agent를 설치합니다][6].

3. [Agent 구성 디렉터리][8] 루트에 있는 `conf.d/` 폴더의 `openmetrics.d/conf.yaml` 파일을 다음 내용으로 편집합니다.

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: http://localhost:9090/metrics
          namespace: 'documentation_example'
          metrics:
              - promhttp_metric_handler_requests_total: prometheus.handler.requests.total
    ```

4. [Agent를 다시 시작][12]합니다.

5. [Metrics Catalog 페이지][13]로 이동하여 수집된 메트릭을 확인합니다. `prometheus_target_interval_length_seconds*`

    {{< img src="integrations/guide/prometheus_host/prometheus_collected_metric_host.png" alt="수집된 Prometheus 메트릭">}}

## 사용자 지정부터 공식 통합까지 {#from-custom-to-official-integration}

기본적으로 일반 Prometheus 검사에서 검색된 모든 메트릭은 사용자 지정 메트릭으로 간주됩니다. 상용 소프트웨어를 모니터링 중이고, 공식 통합할 가치가 있다고 생각되는 경우 망설이지 말고 [기여][5]하세요!

공식 통합에는 자체적인 전용 디렉터리가 있습니다. 일반 검사에 기본 구성 및 메트릭 메타데이터를 하드코딩하기 위한 기본 인스턴스 메커니즘이 있습니다. 예를 들어, [kube-proxy][14] 통합을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/openmetrics/
[2]: /ko/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ko/extend/custom_checks/prometheus/
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /ko/getting_started/tagging/
[8]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://prometheus.io/docs/prometheus/latest/getting_started/
[12]: /ko/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[13]: https://app.datadoghq.com/metric/catalog
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: /ko/metrics/distributions/