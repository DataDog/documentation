---
app_id: logstash
app_uuid: efcb18d9-2789-4481-bd4b-ff5a4c058dc3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: logstash.process.cpu.percent
      metadata_path: metadata.csv
      prefix: logstash.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10016
    source_type_name: Logstash
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: ervansetiawan@gmail.com
  support_email: ervansetiawan@gmail.com
categories:
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/logstash/README.md
display_on_public_website: true
draft: false
git_integration_title: logstash
integration_id: logstash
integration_title: Logstash
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: logstash
public_title: Logstash
short_description: 로그스태시(Logstash) 인스턴스에서 런타임 메트릭 모니터링 및 수집
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::로그 수집
  - Offering::Integration
  configuration: README.md#Setup
  description: 로그스태시(Logstash) 인스턴스에서 런타임 메트릭 모니터링 및 수집
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Logstash
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

로그스태시(Logstash)에서 실시간으로 메트릭을 받아 다음을 수행할 수 있습니다.

- 로그스태시(Logstash) 상태 시각화 및 모니터링
- 로그스태시(Logstash) 이벤트에 대한 알림을 받습니다.

## 설정

### 설치

로그스태시(Logstash) 점검이 [Datadog 에이전트][1] 패키지에 포함되어 있지 않습니다. 그러므로 패키지를 설치해야 합니다.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

에이전트 v7.21+/v6.21+의 경우 아래 지침을 통해 호스트에서 로그스태시(Logstash) 점검을 설치합니다. 이전 버전의 에이전트를 보려면 [커뮤니티 통합 사용][1]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-logstash==<INTEGRATION_VERSION>
   ```

2. 핵심 [통합][2]과 유사하게 통합을 설정합니다.

[1]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[2]: https://docs.datadoghq.com/ko/getting_started/integrations/
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

다음 Dockerfile을 사용하여 로그스태시(Logstash) 통합을 포함하는 커스텀 Datadog 에이전트 이미지를 빌드합니다.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN datadog-agent integration install -r -t datadog-logstash==<INTEGRATION_VERSION>
```

쿠버네티스(Kubernetes)를 사용하는 경우 Datadog 오퍼레이터 또는 헬름 차트 설정을 업데이트하여 이 커스텀 Datadog 에이전트 이미지를 가져옵니다.

자세한 내용은 [커뮤니티 통합 사용][1]을 참조하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
{{% /tab %}}
{{< /tabs >}}

### 구성

#### 메트릭 수집

{{< tabs >}}
{{% tab "Host" %}}

##### 호스트

1. [에이전트 설정 디렉터리][1]의 루트에 있는 `conf.d/` 폴더에서 `logstash.d/conf.yaml` 파일을 편집합니다.

   ```yaml
   init_config:

   instances:
     # The URL where Logstash provides its monitoring API.
     # This will be used to fetch various runtime metrics about Logstash.
     #
     - url: http://localhost:9600
   ```

   사용 가능한 모든 설정 옵션은 [샘플 logstash.d/conf.yaml][2]을 참조하세요.

2. [에이전트를 재시작][3]하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

##### 컨테이너화

컨테이너화된 환경의 경우 다음 파라미터와 함께 자동탐지 템플릿을 사용합니다.

| 파라미터            | 값                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `logstash`                           |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:9600"}` |

이 템플릿을 적용하는 방법을 알아보려면 [도커(Docker) 통합][1] 또는 [쿠버네티스(Kubernetes) 통합][2]을 참조하세요.

사용 가능한 모든 설정 옵션은 [샘플 logstash.d/conf.yaml][3]을 참조하세요.

[1]: https://docs.datadoghq.com/ko/containers/docker/integrations
[2]: https://docs.datadoghq.com/ko/containers/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

#### 로그 수집

Datadog에는 [출력 플러그인][2]이 있습니다. 로그스태시(Logstash)를 Datadog 플랫폼으로 전송하는 작업을 처리합니다.

이 플러그인을 설치하려면 다음 명령을 실행하세요.

- `logstash-plugin install logstash-output-datadog_logs`

그런 다음 [Datadog API 키][3]를 사용하여 `datadog_logs` 플러그인을 설정하다 합니다.

```conf
output {
    datadog_logs {
        api_key => "<DATADOG_API_KEY>"
    }
}
```

기본값으로 플러그인은 gzip 압축을 사용하여 HTTPS(포트 443)를 통해 로그를 전송하도록 설정됩니다.
다음 파라미터를 사용하여 해당 작업을 변경할 수 있습니다.

- `use_http`: TCP 전달을 사용하려면 `false`로 설정하고 `host` 및 `port`를 적절히 업데이트합니다(기본값은 `true`).
- `use_compression`: 압축은 HTTP에만 사용할 수 있습니다. `false`(기본값은 `true`)로 설정하여 비활성화합니다.
- `compression_level`: HTTP에서 압축 수준을 설정합니다. 범위는 1에서 9까지이며 9가 가장 좋은 비율입니다(기본값은 `6`).

추가로 파라미터를 사용하여 [프록시][4]을 통과하기 위해 사용하는 엔드포인트를 변경할 수 있습니다.

- `host`: 로그의 프록시 엔드포인트가 Datadog로 직접 전달되지 않습니다(기본값: `http-intake.logs.datadoghq.com`).
- `port`: 로그의 프록시 포트가 Datadog으로 직접 전달되지 않습니다(기본값: `80`).
- `ssl_port`: 로그에 사용되는 포트는 보안 TCP/SSL 연결을 통해 Datadog으로 전달됩니다(기본값: `443`).
- `use_ssl`: Datadog에 대한 보안 TCP/SSL 연결을 초기화하도록 에이전트에 지시합니다(기본값: `true`).
- `no_ssl_validation`: SSL 호스트 이름 유효성 검사를 비활성화합니다(기본값: `false`).

**참고**: `host` 및 `port`을 해당 지역{{< region-param key="http_endpoint" code="true" >}} {{< region-param key="http_port" code="true" >}}으로 설정합니다.

```conf
output {
   datadog_logs {
       api_key => "<DATADOG_API_KEY>"
       host => "http-intake.logs.datadoghq.eu"
   }
}
```

##### 로그에 메타데이터 추가하기

Datadog에서 로그를 최대한 활용하려면 호스트명과 소스 등 로그와 관련된 적절한 메타데이터를 확보하는 것이 중요합니다. 기본적으로, Datadog [예약된 속성에 대한 기본 리매핑][5] 덕분에 호스트 이름과 타임스탬프가 올바르게 리매핑되어야 합니다. 서비스가 올바르게 리매핑되었는지 확인하려면 서비스 리매핑 목록에 해당 속성 값을 추가하세요.

##### Source

필터를 설정하여 로그스태시(Logstash) 필터를 설정하여 로그에서 소스(Datadog 통합 이름)를 설정합니다.

```conf
filter {
  mutate {
    add_field => {
 "ddsource" => "<MY_SOURCE_VALUE>"
       }
    }
 }
```

이렇게 하면 Datadog에서 [통합 자동 설정][6]이 트리거됩니다.

##### 커스텀 태그

[호스트 태그][7]는 [인프라스트럭처 목록][8]에 일치하는 호스트 네임이 있는 경우 로그에 자동으로 설정됩니다. `ddtags` 속성을 사용하여 커스텀 태그를 로그에 추가합니다.

```conf
filter {
  mutate {
    add_field => {
        "ddtags" => "env:test,<KEY:VALUE>"
       }
    }
 }
```

### 검증

[에이전트의 `status` 하위 명령]을 실행하고[9] 점검 섹션에서 `logstash`를 찾습니다.

## 호환성

로그스태시(Logstash) 점검 은 로그스태시(Logstash) 5.x, 6.x 및 7.x 버전과 함께 호환됩니다. 또한 로그스태시(Logstash) 6.0에 도입된 새로운 멀티파이프라인 메트릭을 지원합니다. 로그스태시(Logstash) 버전 5.6.15, 6.3.0 및 7.0.0에서 테스트되었습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "logstash" >}}


### 이벤트

로그스태시(Logstash) 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "logstash" >}}


## 트러블슈팅

### 에이전트 연결 불가

```text
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

`conf.yaml`의 `url`가 올바른지 확인합니다.

추가 정보가 필요한 경우 [Datadog 지원][10]으로 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/logstash-output-datadog_logs
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.datadoghq.com/ko/agent/proxy/#proxy-for-logs
[5]: /ko/logs/#edit-reserved-attributes
[6]: /ko/logs/processing/#integration-pipelines
[7]: /ko/getting_started/tagging/assigning_tags
[8]: https://app.datadoghq.com/infrastructure
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[10]: http://docs.datadoghq.com/help