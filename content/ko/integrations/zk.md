---
app_id: zookeeper
app_uuid: 01aee33c-0c85-4800-ab79-c02a25da04fa
assets:
  dashboards:
    zookeeper: assets/dashboards/zookeeper_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: zookeeper.connections
      metadata_path: metadata.csv
      prefix: zookeeper.
    process_signatures:
    - zkServer.sh start
    - java zoo.cfg
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 48
    source_type_name: ZooKeeper
  saved_views:
    zookeeper_processes: assets/saved_views/zookeeper_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- orchestration
- notifications
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/zk/README.md
display_on_public_website: true
draft: false
git_integration_title: zk
integration_id: zookeeper
integration_title: ZooKeeper
integration_version: 4.5.0
is_public: true
manifest_version: 2.0.0
name: zk
public_title: ZooKeeper
short_description: 클라이언트 연결 및 레이턴시를 추적하고 요청이 백업되는 시점을 파악하세요.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Orchestration
  - Category::알림
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 클라이언트 연결 및 레이턴시를 추적하고 요청이 백업되는 시점을 파악하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ZooKeeper
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![ZooKeeper 대시보드][1]

## 개요

ZooKeeper 점검은 클라이언트 연결 및 레이턴시를 추적하고 처리되지 않은 요청 수를 모니터링하는 등의 작업을 수행합니다.

## 설정

### 설치

ZooKeeper 점검은 [Datadog Agent][2] 패키지에 포함되어 있으므로 ZooKeeper 서버에서 다른 프로그램을 설치할 필요가 없습니다.

### 구성

#### 포함 목록

ZooKeeper 버전 3.5부터는 `4lw.commands.whitelist` 파라미터가 있습니다. [네 글자 명령어][4]를 허용하는 예시를 확인하려면 [ZooKeeper 클러스터 옵션][3]을 참조하세요. 기본적으로 `srvr`만 허용 목록에 추가됩니다. 본 통합은 해당 명령어에 기반하므로 `stat` 및 `mntr`을 허용 목록에 추가합니다.

#### SSL 활성ㅇ화

ZooKeeper 3.5는 SSL 인증 기능을 도입했습니다. ZooKeeper에서 SSL을 설정하는 방법에 대한 자세한 내용은 [ZooKeeper SSL 사용자 지침][5]을 참조하세요. 

ZooKeeper를 SSL로 설정한 후에도 Datadog Agent 를 설정하여 SSL를 통해 ZooKeeper에 연결할 수 있습니다. 이미 JKS 파일로 인증을 설정한 경우, 아래 단계에 따라 PEM 파일로 변환하여 TLS/SSL을 구성하세요.

다음 예제 명령은 JKS `truststore` 및 `keystore` 파일을 호출한다고 가정합니다.

- `server_truststore.jks`
- `server_keystore.jks` 
- `client_truststore.jks`
- `client_keystore.jks`

또한 `keystore` 및 `truststore` 파일에 모두에 별칭이 `server_cert` 및 `client_cert`인 상호 인증서가 있다고 가정합니다. 이는 Java ZooKeeper 클라이언트가 이미 ZooKeeper 서버에 연결할 수 있다는 의미입니다.
비공개 키에 비밀번호가 있는 경우, `config.yaml` 파일에 구성 옵션 `tls_private_key_password`에 맞도록 해당 비밀번호가 포함되어 있는지 확인하세요.

JKS 파일을 PEM 파일로 변환하는 방법

1. 클라이언트의 트러스트 스토어에 신뢰할 수 있는 서버의 인증서가 포함되어 있으므로,`client_truststore.jks`에서 `ca_cert.pem` 파일을 가져옵니다.
    ```
    keytool -exportcert -file ca_cert.pem -keystore client_truststore.jks -alias server_cert -rfc
    ```

2. 클라이언트의 `keystore`에 별칭 `client_cert`에 대한 클라이언트 인증서가 포함되어 있으므로, `client_keystore.jks`에서 `cert.pem` 파일을 가져옵니다.
    ```
    keytool -importkeystore -srckeystore client_keystore.jks -destkeystore cert.p12 -srcstoretype jks -deststoretype pkcs12 -srcalias client_cert
    ```   

3. `openssl pkcs12` 명령을 실행하여 클라이언트 인증서와 인증서에 대한 비공개 키를 모두 내보냅니다. `tls_cert` 구성 옵션은 인증서와 비공개 키가 모두 포함된 PEM 파일을 읽고 파싱할 수 있습니다. 비밀번호로 보호되지 않은 파일을 가져오려면 본 명령에 `-nodes`를 추가합니다.
   ```
   openssl pkcs12 -in cert.p12 -out cert.pem
   ``` 

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. [Agent 구성 디렉터리][1] 루트의 `conf.d/` 폴더에서 `zk.d/conf.yaml` 파일을 편집하여 ZooKeeper [메트릭](#metric-collection) 및 [로그](#log-collection) 수집을 시작합니다.
   사용 가능한 모든 구성 옵션은 [zk.d/conf.yaml 샘플][2]을 참조하세요.

2. [에이전트를 재시작][3]하세요.

#### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. ZooKeeper는 기본적으로 `log4j` 로거를 사용합니다. 파일에 로깅하고 형식을 커스터마이징하려면 `log4j.properties` 파일을 편집하세요.

   ```text
     # Set root logger level to INFO and its only appender to R
     log4j.rootLogger=INFO, R
     log4j.appender.R.File=/var/log/zookeeper.log
     log4j.appender.R.layout=org.apache.log4j.PatternLayout
     log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n
   ```

2. 기본적으로 Datadog의 통합 파이프라인은 다음과 같은 변환 패턴을 지원합니다.

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
     %r [%t] %p %c %x - %m%n
   ```

    형식이 다른 경우 통합 파이프라인을 복제하고 편집합니다.

3. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

4. `zk.d/conf.yaml`의 하단에서 본 구성 블록의 주석 처리를 해제하고 편집합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/zookeeper.log
       source: zookeeper
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

    `path`와 `service` 파라미터 값을 변경하여 환경에 맞게 구성하세요. 사용할 수 있는 구성 옵션 전체를 보려면 [샘플 zk.d/conf.yaml][2]을 참고하세요.

5. [에이전트를 재시작][3]하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `zk`                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port": "2181"}` |

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog Agent에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                           |
| -------------- | ----------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "zookeeper", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent 상태 하위 명령][6]을 실행하고 Checks 섹션에서 `zk`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "zk" >}}


#### 지원 중단 메트릭

다음 메트릭은 아직은 전송되지만 향후 삭제될 예정입니다.

- `zookeeper.bytes_received`
- `zookeeper.bytes_sent`

### 이벤트

ZooKeeper 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "zk" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/zk/images/zk_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_clusterOptions
[4]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_4lw
[5]: https://cwiki.apache.org/confluence/display/ZOOKEEPER/ZooKeeper+SSL+User+Guide
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ko/help/