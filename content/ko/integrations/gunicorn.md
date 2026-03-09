---
app_id: gunicorn
categories:
- 로그 수집
custom_kind: 통합
description: 요청률 및 기간, 로그-메시지 비율 및 작업자 프로세스를 모니터링하세요.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-gunicorn-performance
  tag: 블로그
  text: Datadog으로 Gunicorn 성능 모니터링
integration_version: 4.1.1
media: []
supported_os:
- linux
- macos
title: Gunicorn
---
![Gunicorn Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/gunicorn/images/gunicorn-dash.png)

## 개요

Datadog 에이전트는 Gunicorn에 대한 하나의 주요 메트릭, 즉 실행 중인 작업자 프로세스의 수를 수집합니다. 또한 Gunicorn이 실행 중인지 여부에 대한 서비스 점검 정보를 전송합니다.

Gunicorn 자체에서 DogStatsD를 사용하여 다음을 포함한 메트릭을 추가로 제공할 수 있습니다:

- 총 요청 비율
- 상태 코드별 요청 비율(2xx, 3xx, 4xx, 5xx)
- 요청 기간(평균, 중앙값, 최대, 95번째 백분위수 등)
- 로그 수준(심각, 오류, 경고, 예외)별 로그 메시지 비율

## 설정

### 설치

Datadog Agent Gunicorn 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest)  패키지에 포함되어 있으므로 Gunicorn 서버에 별도로 설치할 필요가 없습니다.

Gunicorn 점검을 사용하려면 Gunicorn 앱의 Python 환경에 [`setproctitle`](https://pypi.python.org/pypi/setproctitle) 패키지가 있어야 합니다. 없는 경우 Datadog Agent는 `gunicorn` 마스터 프로세스를 찾을 수 없다고 보고합니다(따라서 작업자도 찾을 수 없음). `gunicorn.workers` 메트릭을 수집하려면 앱의 Python 환경에 `setproctitle` 패키지를 설치하세요.

### 설정

Gunicorn [메트릭](#metric-collection) 및 [로그](#log-collection) 수집을 시작하려면 [Agent 설정 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory)의 루트에 있는 `conf.d/` 폴더에서 `gunicorn.d/conf.yaml` 파일을 편집합니다.
모든 가용 설정 옵션을 보려면 [샘플 gunicorn.yaml](https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example)을 참조하세요.

#### 메트릭 수집

##### Gunicorn을 DogStatsD에 연결

1. 버전 19.1부터 Gunicorn은 [DogStatsD](https://docs.datadoghq.com/guides/dogstatsd/)과 마찬가지로 StatsD 프로토콜을 구현하는 Daemon에 메트릭을 전송하는 [옵션](https://docs.gunicorn.org/en/stable/settings.html#statsd-host)을 제공합니다. 다른 많은 Gunicorn 옵션과 같이 CLI에서 `gunicorn`(`--statsd-host`)로 전달하거나 앱의 설정 파일(`statsd_host`)에서 설정할 수 있습니다. **모든 Gunicorn 메트릭**을 수집하려면 `"localhost:8125"`에서 [DogStatsD](https://docs.datadoghq.com/guides/dogstatsd/)로 메트릭을 전송하도록 앱을 설정합니다. 그런 다음 앱을 다시 시작하세요.

1. `gunicorn.d/conf.yaml` 파일에 설정 블록을 추가하여 [Gunicorn 메트릭](#메트릭) 수집을 시작하세요.

```yaml
init_config:

instances:
    ## @param proc_name - string - required
    ## The name of the gunicorn process. For the following gunicorn server:
    ##
    ## gunicorn --name <WEB_APP_NAME> <WEB_APP_CONFIG>.ini
    ##
    ## the name is `<WEB_APP_NAME>`
  - proc_name: <YOUR_APP_NAME>
```

3. [Agent를 다시 시작](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)하여 Gunicorn 메트릭을 Datadog으로 전송합니다.

#### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. 다음 명령을 사용하여 [액세스 로그](https://docs.gunicorn.org/en/stable/settings.html#accesslog) 파일의 경로를 설정합니다.
   `--access-logfile <MY_FILE_PATH>`

1. 다음 명령을 사용하여 [에러 로그](https://docs.gunicorn.org/en/stable/settings.html#errorlog) 파일의 경로를 설정합니다.
   `--error-logfile FILE, --log-file <MY_FILE_PATH>`

1. 이 설정 블록을 `gunicorn.d/conf.yaml` 파일에 추가하여 Gunicorn 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/gunicorn/access.log
       service: "<MY_SERVICE>"
       source: gunicorn

     - type: file
       path: /var/log/gunicorn/error.log
       service: "<MY_SERVICE>"
       source: gunicorn
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \[\d{4}-\d{2}-\d{2}
   ```

   `service` 및 `path` 파라미터 값을 변경하고 환경에 맞게 설정합니다. 모든 가용 설정 옵션은 [샘플 gunicorn.yaml](https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example)을 참조하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `gunicorn`을 찾습니다.

상태가 `OK`가 아닌 경우 트러블슈팅 섹션을 참조하세요.

`netstat`을 사용하여 Gunicorn이 _자체_ 메트릭도 전송하는지 확인합니다:

```text
sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp 0 0 127.0.0.1:38374 127.0.0.1:8125 ESTABLISHED 15500/gunicorn: mas
```

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gunicorn.log.critical** <br>(rate) | 로깅된 심각한 상태 메시지의 비율.<br>_occurrence로 표시_ |
| **gunicorn.log.error** <br>(rate) | 로깅된 오류의 비율.<br>_occurrence로 표시_ |
| **gunicorn.log.exception** <br>(rate) | 로깅된 예외의 비율.<br>_occurrence으로 표시_ |
| **gunicorn.log.warning** <br>(rate) | 로깅된 경고의 비율.<br>_occurrence으로 표시됨_ |
| **gunicorn.request.duration.95percentile** <br>(gauge) | 요청 지속 시간의 95번째 백분위수.<br>_millisecond로 표시_ |
| **gunicorn.request.duration.avg** <br>(gauge) | 평균 요청 지속 시간.<br>_millisecond로 표시_ |
| **gunicorn.request.duration.count** <br>(rate) | 수신된 요청의 비율.<br>_request로 표시_ |
| **gunicorn.request.duration.max** <br>(gauge) | 최대 요청 지속 시간.<br>_millisecond로 표시_ |
| **gunicorn.request.duration.median** <br>(gauge) | 요청 지속 시간의 중앙값.<br>_millisecond로 표시_ |
| **gunicorn.request.status.100** <br>(rate) | 100 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.101** <br>(rate) | 101 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.102** <br>(rate) | 102 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.200** <br>(rate) | 200 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.201** <br>(rate) | 201 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.202** <br>(rate) | 202 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.203** <br>(rate) | 203 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.204** <br>(rate) | 204 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.205** <br>(rate) | 205 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.206** <br>(rate) | 206 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.207** <br>(rate) | 207 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.208** <br>(rate) | 208 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.226** <br>(rate) | 226 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.300** <br>(rate) | 300 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.301** <br>(rate) | 301 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.302** <br>(rate) | 302 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.303** <br>(rate) | 303 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.304** <br>(rate) | 304 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.305** <br>(rate) | 305 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.307** <br>(rate) | 307 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.308** <br>(rate) | 308 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.400** <br>(rate) | 400 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.401** <br>(rate) | 401 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.402** <br>(rate) | 402 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.403** <br>(rate) | 403 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.404** <br>(rate) | 404 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.405** <br>(rate) | 405 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.406** <br>(rate) | 406 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.407** <br>(rate) | 407 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.408** <br>(rate) | 408 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.409** <br>(rate) | 409 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.410** <br>(rate) | 410 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.411** <br>(rate) | 411 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.412** <br>(rate) | 412 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.413** <br>(rate) | 413 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.414** <br>(rate) | 414 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.415** <br>(rate) | 415 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.416** <br>(rate) | 416 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.417** <br>(rate) | 417 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.419** <br>(rate) | 419 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.421** <br>(rate) | 421 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.422** <br>(rate) | 422 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.423** <br>(rate) | 423 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.424** <br>(rate) | 424 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.426** <br>(rate) | 426 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.428** <br>(rate) | 428 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.429** <br>(rate) | 429 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.431** <br>(rate) | 431 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.451** <br>(rate) | 451 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.500** <br>(rate) | 500 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.501** <br>(rate) | 501 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.502** <br>(rate) | 502 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.503** <br>(rate) | 503 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.504** <br>(rate) | 504 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.505** <br>(rate) | 505 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.506** <br>(rate) | 506 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.507** <br>(rate) | 507 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.508** <br>(rate) | 508 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.510** <br>(rate) | 510 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.511** <br>(rate) | 511 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.request.status.512** <br>(rate) | 512 상태 코드 응답을 반환하는 요청 비율.<br>_request로 표시_ |
| **gunicorn.requests** <br>(rate) | 수신된 요청률.<br>_request로 표시_ |
| **gunicorn.workers** <br>(gauge) | 상태(유휴 또는 작업 중)별로 태깅된 작업자 수. 작업자는 0.1초 간격 동안(psutil을 통해) CPU 사용 시간이 증가한 것으로 기록되면 작업 중으로 간주됩니다. 작업자가 I/O(예: HTTP/데이터베이스 호출 대기)로 인해 차단되어 있더라도 CPU 사용 시간 변화가 감지되지 않으면 유휴 상태로 간주됩니다.<br>_worker로 표시_ |

### 이벤트

Gunicorn 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**gunicorn.is_running**

Agent가 Gunicorn 마스터 프로세스를 찾을 수 없는 경우 `CRITICAL`이 반환되며, 그 외 경우에는 `OK`가 반환됩니다.

_상태: ok, critical_

## 트러블슈팅

### 에이전트가 Gunicorn 프로세스를 찾을 수 없습니다.

```shell
  Checks
  ======

    gunicorn (5.12.1)
    -----------------
      - instance #0 [ERROR]: 'Found no master process with name: gunicorn: master [my_web_app]'
      - Collected 0 metrics, 0 events & 1 service check
      - Dependencies:
          - psutil: 4.4.1
```

Gunicorn이 실제로 실행되고 있지 않거나 앱의 파이썬(Python) 환경에 `setproctitle` 패키지가 설치되어 있지 않습니다.

`setproctitle`이 설치되어 있지 않으면 프로세스 표에 Gunicorn이 다음과 같이 표시됩니다.

```text
$ ps -ef | grep gunicorn
ubuntu   18013 16695  2 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18018 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18019 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
```

설치되어_있는_경우 `gunicorn` 프로세스가 Datadog 에이전트에서 예상한 형식대로 표시됩니다.

```text
$ ps -ef | grep gunicorn
ubuntu   18457 16695  5 20:26 pts/0    00:00:00 gunicorn: master [my_app]
ubuntu   18462 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [my_app]
ubuntu   18463 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [my_app]
```

## 참고 자료

- [Datadog으로 Gunicorn 성능 모니터링](https://www.datadoghq.com/blog/monitor-gunicorn-performance)