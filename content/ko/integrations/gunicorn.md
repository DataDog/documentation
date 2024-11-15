---
app_id: gunicorn
app_uuid: 49687997-bbf2-45db-9b4f-223cf7c492ed
assets:
  dashboards:
    gunicorn: assets/dashboards/gunicorn_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gunicorn.workers
      metadata_path: metadata.csv
      prefix: gunicorn.
    process_signatures:
    - 'gunicorn: master'
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 60
    source_type_name: Gunicorn
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    gunicorn_processes: assets/saved_views/gunicorn_processes.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gunicorn/README.md
display_on_public_website: true
draft: false
git_integration_title: gunicorn
integration_id: gunicorn
integration_title: Gunicorn
integration_version: 2.7.0
is_public: true
manifest_version: 2.0.0
name: gunicorn
public_title: Gunicorn
short_description: 요청 비율 및 기간, 로그-메시지 비율 및 작업자 프로세스를 모니터링하세요.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 요청 비율 및 기간, 로그-메시지 비율 및 작업자 프로세스를 모니터링하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-gunicorn-performance
  support: README.md#Support
  title: Gunicorn
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Gunicorn 대시보드][1]

## 개요

Datadog 에이전트는 Gunicorn에 대한 하나의 주요 메트릭, 즉 실행 중인 작업자 프로세스의 수를 수집합니다. 또한 Gunicorn이 실행 중인지 여부에 대한 서비스 점검 정보를 전송합니다.

Gunicorn 자체에서 DogStatsD를 사용하여 다음을 포함한 메트릭을 추가로 제공할 수 있습니다:

- 총 요청 비율
- 상태 코드별 요청 비율(2xx, 3xx, 4xx, 5xx)
- 요청 기간(평균, 중앙값, 최대, 95번째 백분위수 등)
- 로그 수준(심각, 오류, 경고, 예외)별 로그 메시지 비율

## 설정

### 설치

Datadog 에이전트의 Gunicorn 점검은 [Datadog 에이전트 ][2] 패키지에 포함되어 있으므로 Gunicorn 서버에 아무 것도 설치할 필요가 없습니다.

Gunicorn 점검을 사용하려면 Gunicorn 앱의 파이썬(Python) 환경에 [`setproctitle`][3] 패키지가 있어야 합니다. 없는 경우 Datadog 에이전트는 `gunicorn` 마스터 프로세스를 찾을 수 없다고 보고합니다(따라서 작업자를 찾을 수 없음). `gunicorn.workers` 메트릭을 수집하려면 앱의 파이썬 환경에 `setproctitle` 패키지를 설치하세요.

### 설정

[에이전트의 설정 디렉토리][4] 루트의 `conf.d/` 폴더에 있는 `gunicorn.d/conf.yaml` 파일을 수정하여 Gunicorn [메트릭](#메트릭 수집) 및 [로그](#로그 수집) 수집을 시작하세요.
사용 가능한 모든 설정 옵션은 [gunicorn.yaml 샘플][5]을 참조하세요.

#### 메트릭 수집

##### Gunicorn을 DogStatsD에 연결

1. 버전 19.1부터 Gunicorn은 [DogStatsD][7]과 마찬가지로 StatsD 프로토콜을 구현하는 데몬에 메트릭을 전송하는 옵션[6]을 제공합니다. 다른 많은 Gunicorn 옵션과 같이 CLI에서 `gunicorn`(`--statsd-host`)로 전달하거나 앱의 설정 파일(`statsd_host`)에 설정할 수 있습니다. **모든 Gunicorn 메트릭**을 수집하려면 앱을 설정하여  `"localhost:8125"`에서 [DogStatsD][7]로 메트릭을 전송하합니다. 그런 다음 앱을 다시 시작하세요.

2. `gunicorn.d/conf.yaml` 파일에 설정 블록을 추가하여 [Gunicorn 메트릭](#메트릭) 수집을 시작하세요.

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

3. [에이전트][8]를 다시 시작하여 메트릭을 Datadog로 전송하기 시작합니다.

#### 로그 수집

_에이전트 버전 6.0 이상에서 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 다음 명령을 사용하여 [액세스 로그][9] 파일의 경로를 설정합니다.
    `--access-logfile <MY_FILE_PATH>`

3. 다음 명령을 사용하여 [오류 로그][10] 파일의 경로를 설정합니다.
    `--error-logfile FILE, --log-file <MY_FILE_PATH>`

4. 이 설정 블록을 `gunicorn.d/conf.yaml` 파일에 추가하여 Gunicorn 로그 수집을 시작하세요.

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

   `service` 및 `path` 파라미터 값을 변경하고 환경에 맞게 설정합니다. 사용 가능한 모든 설정 옵션은 [gunicorn.yaml 샘플][5]을 참조하세요.

5. [에이전트를 재시작합니다][8].

### 검증

[에이전트의 상태 하위 명령을 실행][11]하고 점검 섹션에서 `gunicorn`을 찾습니다.

상태가 `OK`가 아닌 경우 트러블슈팅 섹션을 참조하세요.

`netstat`을 사용하여 Gunicorn이 _자체_ 메트릭도 전송하는지 확인합니다:

```text
sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp 0 0 127.0.0.1:38374 127.0.0.1:8125 ESTABLISHED 15500/gunicorn: mas
```

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "gunicorn" >}}


### 이벤트

Gunicorn 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "gunicorn" >}}


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

- [Datadog를 사용한 Gunicorn 성능 모니터링][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/gunicorn/images/gunicorn-dash.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://pypi.python.org/pypi/setproctitle
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example
[6]: https://docs.gunicorn.org/en/stable/settings.html#statsd-host
[7]: https://docs.datadoghq.com/ko/guides/dogstatsd/
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.gunicorn.org/en/stable/settings.html#accesslog
[10]: https://docs.gunicorn.org/en/stable/settings.html#errorlog
[11]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/assets/service_checks.json
[14]: https://www.datadoghq.com/blog/monitor-gunicorn-performance