---
app_id: apache
app_uuid: 8dfc1942-7820-49c7-93c8-5a31579ee52a
assets:
  dashboards:
    apache: assets/dashboards/apache_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: apache.performance.busy_workers
      metadata_path: metadata.csv
      prefix: apache.
    process_signatures:
    - httpd
    - apache
    - apache2
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30
    source_type_name: Apache
  logs:
    source: apache
  monitors:
    '[Apache] Low number of idle workers': assets/monitors/apache_low_idle_workers.json
    '[Apache] resource utilization': assets/monitors/high_keep_alive_and_cpu.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    apache_processes: assets/saved_views/apache_processes.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/apache/README.md
display_on_public_website: true
draft: false
git_integration_title: apache
integration_id: apache
integration_title: Apache
integration_version: 4.5.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: apache
public_title: Apache
short_description: 초당 요청, 제공된 바이트, 작업자 스레드, 업타임 등을 추적합니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::로그 수집
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 초당 요청, 제공된 바이트, 작업자 스레드, 가동 시간 등을 추적합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Apache
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Apache 대시보드][1]

## 개요

Apache 점검은 초당 요청, 제공된 바이트, 작업자 스레드 수, 서비스 업타임 등을 추적합니다.

## 설정

### 설치

Apache 점검은 [Datadog 에이전트][2]를 사용해 패키징됩니다. Apache 메트릭과 로그를 수집하려면 다음을 해야 합니다.

1.  Apache 서버에 [에이전트를 설치합니다.][3]

2. Apache 서버에 `mod_status`를 설치한 다음 `ExtendedStatus`를 활성화합니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. [에이전트 설정 디렉터리][1]의 루트에 있는 `conf.d/` 폴더에서 `apache.d/conf.yaml` 파일을 편집하여 Apache 메트릭 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 apache.d/conf.yaml][2]를 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param apache_status_url - string - required
     ## Status url of your Apache server.
     #
     - apache_status_url: http://localhost/server-status?auto
   ```

2. [Restart the Agent][3].

##### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

1. 로그 수집은 기본적으로 Datadog 에이전트에서 비활성화되어 있습니다. `datadog.yaml`에서 활성화하세요.

   ```yaml
   logs_enabled: true
   ```

2. `apache.d/conf.yaml` 파일에 이 설정 블록을 추가해  Apache 로그 수집을 시작하세요. `path` 및 `service` 값을 조정해 환경에 맞게 설정하세요.

   ```yaml
   logs:
     - type: file
       path: /path/to/your/apache/access.log
       source: apache
       service: apache
       sourcecategory: http_web_access

     - type: file
       path: /path/to/your/apache/error.log
       source: apache
       service: apache
       sourcecategory: http_web_error
   ```

   사용 가능한 모든 설정 옵션에 대해 [샘플 apache.d/conf.yaml][2]를 참조하세요.

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

컨테이너에서 실행되는 에이전트에 대해 이 점검을 구성하려면,

##### 메트릭 수집

도커가 애플리케이션 컨테이너를 레이블링하면 [자동탐지 통합 템플릿][1]을 설정하세요.

```yaml
LABEL "com.datadoghq.ad.check_names"='["apache"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

##### 로그 수집


기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [도커(Docker) 로그 수집][2]을 참조하세요.

그런 다음 도커(Docker) 레이블로 [로그 통합][3]을 설정하세요.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "apache", "service": "<SERVICE_NAME>"}]'
```

[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

쿠버네티스(Kubernetes)에서 실행되는 에이전트에 대해 이 점검을 구성하는 방법:

##### 메트릭 수집

[자동탐지 통합 템플릿][1]을 애플리케이션 컨테이너의 포드 주석으로 설정합니다. 이외 템플릿은 또한 [파일, configmap, key-value store][2]로 설정할 수 있습니다.

**주석 v1** (Datadog 에이전트 v7.36 이하용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache"]'
    ad.datadoghq.com/apache.init_configs: '[{}]'
    ad.datadoghq.com/apache.instances: |
      [
        {
          "apache_status_url": "http://%%host%%/server-status?auto"
        }
      ]
spec:
  containers:
    - name: apache
```

**주석 v2**(Datadog 에이전트 v7.36 이상용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.checks: |
      {
        "apache": {
          "init_config": {},
          "instances": [
            {
              "apache_status_url": "http://%%host%%/server-status?auto"
            }
          ]
        }
      }
spec:
  containers:
    - name: apache
```

##### 로그 수집


Datadog 에이전트에서 기본적으로 로그 수집이 비활성화되어 있습니다. 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집]을 확인하세요.

그런 다음 [로그 통합][4]을 포드 주석으로 설정합니다. 또한 [파일, configmap, 또는 key-value store][5]로 설정할 수 있습니다.

**주석 v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"apache","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: apache
```


[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=daemonset#configuration
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

ECS에서 실행되는 에이전트에 대해 이 점검을 설정하는 방법:

##### 메트릭 수집

도커가 애플리케이션 컨테이너를 레이블링하면 [자동탐지 통합 템플릿][1]을 설정하세요.

```json
{
  "containerDefinitions": [{
    "name": "apache",
    "image": "apache:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"apache\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"apache_status_url\": \"http://%%host%%/server-status?auto\"}]"
    }
  }]
}
```

##### 로그 수집


기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [ECS 로그 수집][2]을 참조하세요.

그런 다음 도커(Docker) 레이블로 [로그 통합][3]을 설정하세요.

```json
{
  "containerDefinitions": [{
    "name": "apache",
    "image": "apache:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"apache\",\"service\":\"<YOUR_APP_NAME>\"}]"
    }
  }]
}
```

[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][4]하고 점검 섹션에서 `apache`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "apache" >}}


### 이벤트

Apache 점검은 이벤트를 포함하지 않습니다.

### 서비스 검사
{{< get-service-checks-from-git "apache" >}}


## 트러블슈팅

### Apache 상태 URL

Apache 통합 에 문제가 있는 경우 대부분 에이전트가 Apache 상태에 액세스할 수 없기 때문인 경우가 많습니다. [`apache.d/conf.yaml` 파일][5]에 나열된 `apache_status_url`(해당되는 경우 로그인 자격 증명 포함)에 대해 curl을 실행해 보세요.

- [Apache SSL 인증서 문제][6]

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [CloudFormation으로 Datadog 배포 및 설정][7]
- [Apache 웹 서버 성능 모니터링][8]
- [Apache 성능 메트릭 수집 방법][9]
- Datadog를 사용해 Apache 웹 서버를 모니터링하는 방법][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/apache/images/apache_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/integrations/faq/apache-ssl-certificate-issues/
[7]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation
[8]: https://www.datadoghq.com/blog/monitoring-apache-web-server-performance
[9]: https://www.datadoghq.com/blog/collect-apache-performance-metrics
[10]: https://www.datadoghq.com/blog/monitor-apache-web-server-datadog