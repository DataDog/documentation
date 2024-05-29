---
kind: 설명서
title: 서버리스 에이전트 설정
---

## 개요

에이전트의 [기본 설정 파일][1]은 `datadog.yaml`입니다. 서버리스 에이전트의 경우 환경 변수와 함께 `datadog.yaml` 설정 옵션이 전달됩니다. 일반적으로 환경 변수는 대문자 스네이크 케이스 설정 옵션으로 이름이 지정됩니다. 예를 들어 Datadog API 키를 `DD_API_KEY`로 설정합니다.

### 기본 설정

| 환경 변수                   | 설명                                                                                                                                                                                                        |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`                   | Datadog API 키가 있는 일반 텍스트 환경 변수입니다. **1개**의 키 환경 변수가 필요합니다. [서버리스 CLI 환경 변수][7]를 참조하세요.                                                                                              |
| `DD_KMS_API_KEY`               | KMS를 사용하는 Datadog API 키가 있는 환경 변수입니다. **1개**의 키 환경 변수가 필요합니다. [서버리스 CLI 환경 변수][7]를 참조하세요.                                                                        |
| `DD_API_KEY_SECRET_ARN`        | 비밀 관리자 **One** 키 환경 변수를 사용하는 Datadog API 키가 있는 환경 변수가 필요합니다. [서버리스 CLI 환경 변수][7]를 참조하세요.                                                                           |
| `DD_LOG_LEVEL`                 | [Datadog 에이전트 로그][8]의 레벨을 설정합니다.                                                                                                                                                                      |
| `DD_SERVERLESS_FLUSH_STRATEGY` | Datadog 에이전트 플러싱(flushing) 전략입니다. 허용되는 값은 `end` 또는 `periodically[,milliseconds]`입니다. 예를 들어 `DD_SERVERLESS_FLUSH_STRATEGY=periodically,100`은 100ms마다 플러싱합니다.                                                                                                                  |
| `DD_ENV`                       | 내보내는 모든 데이터에 대해 글로벌 태그 `env`태그를 설정합니다.                                                                                                                                                                |
| `DD_TAGS`                      | 공백으로 구분된 호스트 태그입니다. 예: `simple-tag-0 tag-key-1:tag-value-1`.                                                                                                                                  |
| `DD_SITE`                      | 메트릭, 트레이스 및 로그에 대한 목적지 사이트입니다. Datadog 사이트를 `{{< region-param key="dd_site" >}}`으로 설정합니다. `datadoghq.com`에 대한 기본값입니다.                                                                   |
| `DD_DD_URL`                    | 제출 메트릭에 대한 URL을 덮어쓰기 위한 추가적인 설정입니다.                                                                                                                                                        |
| `DD_URL`                       | `DD_DD_URL`에 대한 별칭입니다. `DD_DD_URL`이(가) 이미 설정된 경우 무시합니다.                                                                                                                                                      |
| `DD_TRACE_ENABLED`             | 트레이스 수집을 활성화합니다. 기본값은 `true`입니다. 추가적인 트레이스 수집 환경 변수에 대한 자세한 내용을 참조하세요.                                                                                       |
| `DD_TAGS`                      | 태그 목록입니다. 이 에이전트에서 내보내는 모든 메트릭, 이벤트, 로그, 트레이스 및 서비스 검사는 앱 내에 첨부됩니다.                                                                                                         |
| `DD_TAG_VALUE_SPLIT_SEPARATOR` | 지정된 구분 기호에 따라 태그 값을 분할합니다. 호스트 태그 및 컨테이너 통합에서 오는 태그에만 적용됩니다. DogStatsD 메트릭의 태그나 다른 통합에서 수집한 태그에는 적용되지 않습니다. |
|

### 로그 수집 설정

| 환경 변수                                  | 설명                                                                                                                                                                                                                          |
|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LOGS_ENABLED`                             | Datadog 에이전트 로그 수집을 사용하려면 `true`로 설정합니다.                                                                                                                                                          |
| `DD_LOGS_CONFIG_DD_URL`                       | 로그에 프록시를 사용할 때 도달할 엔드포인트 및 포트를 정의합니다. 로그는 TCP에서 전달되므로 프록시가 TCP 연결을 처리할 수 있어야 합니다. `<ENDPOINT>:<PORT>`형식의 문자열입니다.                                  |
| `DD_LOGS_CONFIG_LOGS_NO_SSL`                  | SSL 암호화를 사용하지 않도록 설정합니다. 이 파라미터는 로그가 로컬로 프록시에 전달되는 경우에만 사용해야 합니다. 그런 다음 프록시 측에서 SSL 암호화를 처리하는 것을 권장합니다.                                             |
| `DD_LOGS_CONFIG_PROCESSING_RULES`             | 모든 로그에 적용되는 글로벌 처리 규칙입니다. 사용 가능한 규칙은 `exclude_at_match`, `include_at_match`및 `mask_sequences`입니다. 자세한 내용은 [글로벌 처리 규칙][2]을 참조하세요.                                            |
| `DD_LOGS_CONFIG_FORCE_USE_HTTP`               | 기본적으로 에이전트 시작 시 HTTPS 연결을 설정할 수 있는 경우 에이전트는 HTTPS 배치의 로그를 포트 443으로 보내고 그렇지 않을 경우 TCP로 다시 돌아갑니다. 항상 HTTPS로 로그를 보내려면 이 파라미터를 `true`로 설정합니다 (권장 사항). |
| `DD_LOGS_FORCE_USE_TCP`                       | 가능하면 기본적으로 HTTPS를 통해 로그가 전송됩니다. 항상 TCP를 통해 로그를 보내려면 이 파라미터를 `true`로 설정합니다. `DD_LOGS_CONFIG_FORCE_USE_HTTP`이 `true`로 설정된 경우 이 파라미터는 무시됩니다.                                                            |
| `DD_LOGS_CONFIG_USE_COMPRESSION`              | 이 파라미터는 HTTPS로 로그를 보낼 때 사용할 수 있습니다. `true`로 설정하면 에이전트가 로그를 보내기 전에 로그를 압축합니다.                                                                                                                 |
| `DD_LOGS_CONFIG_COMPRESSION_LEVEL`            | 이 파라미터는 `0`(압축 없음)에서 `9`(최대 압축이지만 리소스 사용량은 높음) 사이의 값을 허용합니다. `DD_LOGS_CONFIG_USE_COMPRESSION`이 `true`로 설정된 경우에만 적용됩니다.                                                |
| `DD_LOGS_CONFIG_BATCH_WAIT`                   | Datadog 에이전트가 전송하기 전에 각 로그 배치를 채울 때까지 기다리는 최대 시간(초)입니다. 기본값은 `5`입니다.                                                                                                                                     |
| `DD_LOGS_CONFIG_OPEN_FILES_LIMIT`             | 병렬로 정렬할 수 있는 최대 파일 수입니다. 기본값은 `500`입니다.                                                                                                                                                          |
| `DD_LOGS_CONFIG_FILE_WILDCARD_SELECTION_MODE` | 와일드카드 일치가 열린 파일 제한을 초과하는 경우 일치의 우선 순위를 지정하는 데 사용되는 전략입니다. 사용 가능한 값은 `by_name`및 `by_modification_time`입니다.                                                                                               |
| `DD_LOGS_CONFIG_LAMBDA_LOGS_TYPE`             | 내보낼 로그의 원본입니다. 허용되는 값은 공백으로 구분된 `function`, `platform`, `extension`의 목록입니다. 모든 것이 기본값입니다.                                                                                                   |

### 애플리케이션 성능 모니터링(APM) 설정

| 환경 변수              | 설명                                                                                                                                                                                                                           |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`          | 애플리케이션 성능 모니터링(APM) 에이전트를 활성화하기 위해 `true`로 설정합니다. 기본값은 `true`입니다.                                                                                                                                                                                    |
| `DD_APM_ENV`              | 트레이스에 태그가 지정된 환경 태그입니다. 이 변수가 설정되지 않은 경우 이 값은 `DD_ENV`에서 상속되고, `DD_ENV`이 설정되지 않은 경우 이 값은 `DD_TAGS`에서 설정된 `env:`태그에서 상속됩니다. |
| `DD_APM_RECEIVER_PORT`    | 트레이스 수신기가 수신 대기하는 포트입니다. HTTP 수신기를 비활성화하려면 `0`로 설정합니다. 기본값: `8126`.                                                                                                                               |
| `DD_APM_RECEIVER_SOCKET`  | Unix 도메인 소켓을 통해 트레이스를 허용합니다. 기본적으로 해제되어 있습니다. 설정이 되면 유효한 소켓 파일을 나타내야 합니다.                                                                                                                      |
| `DD_APM_DD_URL`           | 애플리케이션 성능 모니터링(APM)용 프록시를 사용할 때 도달할 엔드포인트 및 포트를 정의합니다. `<ENDPOINT>:<PORT>`형식의 문자열입니다. 트레이스가 TCP로 전달되므로 프록시가 TCP 연결을 처리할 수 있어야 합니다.                                                        |
| `DD_APM_REPLACE_TAGS`     | [잠재적으로 민감한 정보][3]가 포함된 특정 태그를 바꾸거나 제거할 규칙 집합을 정의합니다.                                                                                                                |
| `DD_APM_IGNORE_RESOURCES` | 정규식의 제외 목록입니다. 이러한 식 중 하나와 일치하는 리소스 이름을 가진 모든 트레이스는 무시됩니다. 쉼표로 구분된 목록을 사용하고 각 항목을 큰따옴표 안에 포함시킵니다. 예:`"^foo$", "bar$"`                                              |
| `DD_APM_LOG_THROTTLING`   | 10초 간격마다 경고 및 오류의 총 수를 10개로 제한하려면 `true`로 설정합니다. 기본값은 `true`입니다.                                                                                                                                                    |

### 고급 네트워크 설정

| 환경 변수             | 설명                                                                                                                                                                                                                                                                              |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SKIP_SSL_VALIDATION` | 에이전트가 SSL/TLS 인증서의 유효성 검사를 건너뛰도록 하려면 이 옵션을 `true`로 설정합니다. 기본값은 `false`입니다.                                                                                                                                                                                |
| `DD_MIN_TLS_VERSION`     | 이 옵션은 `DD_SITE` 또는 `DD_URL`에 지정된 Datadog 흡입구에 데이터를 제출하기 위한 최소 TLS 버전을 정의합니다. 가능한 값은 `tlsv1.0`, `tlsv1.1`, `tlsv1.2`또는 `tlsv1.3`입니다. 값은 대소문자를 구분하지 않습니다. 기본값은 `tlsv1.2`입니다. |

### 프록시 설정

| 환경 변수        | 설명                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | `http` 요청에 대해 프록시로 사용할 수 있는 HTTP URL                |
| `DD_PROXY_HTTPS`    | `https` 요청에 대해 프록시로 사용할 수 있는 HTTPS URL              |
| `DD_PROXY_NO_PROXY` | 프록시를 사용하지 않아야 하며, 공백으로 구분된 URL 목록. |

프록시 설정에 대한 자세한 정보는 [Agent v6 프록시 설명서][6]를 참조하세요.

### DogStatsD(커스텀 메트릭)

[StatsD 프로토콜][5]을 사용해 커스텀 메트릭 전송:

| 환경 변수                                      | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|---------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`                  | 다른 컨테이너에서 DogStatsD 패킷 수신(커스텀 메트릭 전송에 필요)                                                                                                                                                                                                                                                                                                                                                                    |
| `DD_DOGSTATSD_SOCKET`                             | 수신할 Unix 소켓 경로입니다. `rw`(으)로 마운트된 볼륨이어야 합니다.                                                                                                                                                                                                                                                                                                                                                                                 |
| `DD_DOGSTATSD_ORIGIN_DETECTION`                   | Unix 소켓 메트릭을 위한 컨테이너 감지 및 태깅을 활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                         |
| `DD_DOGSTATSD_TAGS`                               | DogStatsD 서버에서 받은 모든 메트릭, 이벤트 및 서비스 검사에 추가할 추가적인 태그의 목록이며 공백으로 구분되어 있습니다. 예: `"env:golden group:retrievers"`.                                                                                                                                                                                                                                                                                                   |
| `DD_USE_DOGSTATSD`                                | DogStatsD 라이브러리에서 커스텀 메트릭 전송을 활성화하거나 비활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                    |
| `DD_DOGSTATSD_PORT`                               | 에이전트 DogStatsD 포트를 재정의합니다.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `DD_BIND_HOST`                                    | DogStatsD 및 트레이스를 수신하는 호스트입니다. `apm_config.apm_non_local_traffic`이 활성화된 경우 애플리케이션 성능 모니터링(APM)에 의해 무시되고 `dogstatsd_non_local_traffic`이 활성화된 경우 DogStatsD에 의해 무시됩니다. 트레이스 에이전트는 이 호스트를 사용하여 메트릭을 보냅니다.<br/> **참고**: DogStatsD가 `::1`를 수신 대기하는 IPv6 환경에서는 `localhost`기본값이 유효하지 않습니다. 이 문제를 해결하려면 이 값을 `127.0.0.1`로 설정하여 DogStatsD가 IPv4에서 수신 중인지 확인합니다. |
| `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT`            | `true`로 설정하면 에이전트는 클라이언트가 제공한 컨테이너 ID를 사용하여 컨테이너 태그로 메트릭, 이벤트 및 서비스 검사를 강화합니다. <br/>**참고**: 이를 위해서는 DogStatsD 프로토콜 버전 1.2와 호환되는 클라이언트를 사용해야 합니다.                                                                                                                                                                                                                                    |
| `DD_DOGSTATSD_BUFFER_SIZE`                        | 바이트에서 StatsD 패킷을 수신하는 데 사용되는 버퍼 크기입니다.                                                                                                                                                                                                                                                                                                                                                                                                |
| `DD_DOGSTATSD_STATS_ENABLE`                       | Go expvars에 따라 DogStatsD의 내부 통계를 게시합니다.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DD_DOGSTATSD_QUEUE_SIZE`                         | DogStatsD 서버의 내부 대기열 크기를 설정합니다. 이 대기열의 크기를 줄이면 DogStatsD 서버의 최대 메모리 사용량이 감소하지만 패킷 삭제 수가 증가할 수도 있습니다.                                                                                                                                                                                                                               |
| `DD_DOGSTATSD_STATS_BUFFER`                       | DogStatsD의 통계 순환 버퍼에 포함할 항목 수를 설정합니다.                                                                                                                                                                                                                                                                                                                                                                                  |
| `DD_DOGSTATSD_STATS_PORT`                         | Go expvar 서버의 포트입니다.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `DD_DOGSTATSD_SO_RCVBUF`                          | **POSIX 시스템 전용**: DogStatsD의 소켓 수신 버퍼에 할당된 바이트 수를 설정합니다. 기본적으로 OS가 이 값을 설정합니다. OS 기본값을 변경하지 않고 버퍼 크기를 늘리려면 이 변수를 사용합니다. 최대 허용 값은 OS에 따라 다릅니다.                                                                                                                   |
| `DD_DOGSTATSD_METRICS_STATS_ENABLE`               | `true`로 설정하면 DogStatsD는 처리한 메트릭에 대한 기본 통계(카운트/마지막으로 확인)를 수집합니다. 이러한 통계를 보려면 에이전트 `dogstatsd-stats`명령을 사용합니다.                                                                                                                                                                                                                                                         |
| `DD_DOGSTATSD_NO_AGGREGATION_PIPELINE`            | DogStatsD에서 집계되지 않는 파이프라인을 사용하도록 설정합니다. 이 파이프라인은 타임스탬프가 포함된 메트릭을 수신하고 태깅을 제외한 추가 처리 없이 해당 메트릭을 흡입구로 전달합니다.                                                                                                                                                                                                                                                                             |
| `DD_DOGSTATSD_NO_AGGREGATION_PIPELINE_BATCH_SIZE` | 집계되지 않는 파이프라인이 흡입구로 보낸 페이로드의 최대 메트릭 수입니다.                                                                                                                                                                                                                                                                                                                                                                 |
| `DD_STATSD_FORWARD_HOST`                          | DogStatsD 서버에서 수신한 모든 패킷을 다른 StatsD 서버로 전달합니다. 다른 StatsD 서버가 처리하지 못할 수 있으므로 전달된 패킷이 일반 StatsD 패킷이고 DogStatsD 패킷이 **아닌지** 확인합니다.                                                                                                                                                                                                                  |
| `DD_STATSD_FORWARD_PORT`                          | StatsD 패킷을 전달할 포트입니다.                                                                                                                                                                                                                                                                                                                                                                                          |
| `DD_STATSD_METRIC_NAMESPACE`                      | 이 호스트에서 오는 모든 StatsD 메트릭에 대한 네임스페이스를 설정합니다. 수신된 각 메트릭은 Datadog로 전송되기 전에 네임스페이스로 접두사가 붙습니다.                                                                                                                                                                                                                                                                                                          |

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml

[2]: https://docs.datadoghq.com/ko/agent/logs/advanced_log_collection/#global-processing-rules

[3]: https://docs.datadoghq.com/ko/tracing/setup_overview/configure_data_security/#replace-rules-for-tag-filtering

[4]: https://docs.datadoghq.com/ko/tracing/troubleshooting/agent_rate_limits/#max-connection-limit

[5]: /ko/developers/dogstatsd/

[6]: /ko/agent/configuration/proxy/#agent-v6

[7]: /ko/serverless/libraries_integrations/cli/#environment-variables

[8]: /ko/agent/troubleshooting/debug_mode/?tab=agentv6v7#agent-log-level