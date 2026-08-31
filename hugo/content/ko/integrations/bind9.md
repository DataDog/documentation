---
app_id: bind9
app_uuid: b37533b0-6f0e-4259-9971-083f08086fac
assets:
  dashboards:
    Bind9 - Details: assets/dashboards/bind9_details.json
    Bind9 - Overview: assets/dashboards/bind9_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: bind9.nsstat_AuthQryRej
      metadata_path: metadata.csv
      prefix: bind9.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10222
    source_type_name: BIND 9
  logs:
    source: bind9
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 네트워크
- 로그 수집
- 메트릭
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md
display_on_public_website: true
draft: false
git_integration_title: bind9
integration_id: bind9
integration_title: Bind 9
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: bind9
public_title: Bind 9
short_description: Bind9 로그 및 서버 메트릭을 수집할 수 있는 Datadog 통합
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Network
  - Category::Log Collection
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Bind9 로그 및 서버 메트릭을 수집할 수 있는 Datadog 통합
  media:
  - caption: Bind9 - 개요
    image_url: images/bind9_overview.png
    media_type: 이미지
  - caption: Bind9 - 세부 정보
    image_url: images/bind9_details.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Bind 9
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

[Bind 9][1]는 도메인 네임 시스템(DNS) 프로토콜의 이식성이 높은 완전한 구현 버전입니다. Bind 9 네임 서버(지정됨)는 권한 있는 네임 서버, 리커시브 리졸버(recursive resolver), DNS 포워더(Forwarder) 또는 이 세 가지 역할을 동시에 수행할 수 있습니다.


본 통합은 쿼리, 쿼리 오류, 네트워크, 렘 서버, 알림 및 보안 로그 유형에 대한 보강 및 시각화를 제공해 드립니다. 기본 제공되는 대시보드로 DNS 요청 패턴, DNS 통신, 적절한 서버 설정 및 DNS 공격에 대한 자세한 인사이트를 시각화하여 강력하고 안정적인 DNS 환경을 확보합니다. 또한 본 통합은 기본 제공 탐지 규칙을 제공합니다. 필요에 따라 시각화에 사용할 수 있는 Bind 9 통계를 메트릭 형태로 수집합니다.


## 설정

### 설치

Bind 9 통합을 설치하려면 다음 에이전트 설치 명령을 실행하고 아래 단계를 따릅니다. 자세한 내용은 [통합 관리][2] 문서를 참조하세요.

**참고**: 에이전트 버전 >= 7.58.0에서는 해당 단계를 수행할 필요가 없습니다.

Linux 명령
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-bind9==1.1.0
  ```

#### 로그 수집

#### 파일 모니터링

1. Bind 9 기기에 로그인합니다.
2. `named.conf` 파일을 열어 다음 로깅 절을 추가합니다.
    ```
    logging {
     channel <example_channel> {
          file "/folder_path/file_name.log" versions <unlimited | <integer>> size <size> suffix <increment | timestamp>;
          print-time (yes | local | iso8601 | iso8601-utc);
          print-category yes;
          print-severity yes;
     };
     category <example-category> { <example_channel>; };
    }
    ```
    **참고**: `print-time`의 권장 값은 `iso8601-utc`인데, 이는 Datadog이 기본적으로 모든 로그가 UTC 시간대일 것으로 예상하기 때문입니다. Bind 9 로그의 시간대가 UTC가 아닌 경우 [다른 시간대 사용에 관한 단계][3]를 따르세요. 아울러, [Bind 9이 정의한 카테고리를 확인][4]하세요.

    로깅 채널 예시:
    ```
    logging {
     channel default_log {
          file "/var/log/named/query.log" versions 3 size 10m;
          print-time iso8601-utc;
          print-category yes;
          print-severity yes;
     };
       category default { default_log; };
    }
    ```
3. 파일을 저장하고 종료합니다.
4. 서비스를 다시 시작합니다.
    ```
    service named restart
    ```

#### Syslog
1. Bind 9 기기에 로그인합니다.
2. `named.conf` 파일을 열어 다음 로깅 절을 추가합니다.
    ```
    logging {
     channel <example_channel> {
          syslog <syslog_facility>;
          severity (critical | error | warning | notice | info | debug [level ] | dynamic);
          print-time (yes | local | iso8601 | iso8601-utc);
          print-category yes;
          print-severity yes;
     };
     category <example-category> { <example_channel>; };
    }
    ```
    **참고**: `print-time`의 권장 값은 `iso8601-utc`인데, 이는 Datadog이 기본적으로 모든 로그가 UTC 시간대일 것으로 예상하기 때문입니다. Bind 9 로그의 시간대가 UTC가 아닌 경우 [다른 시간대 사용에 관한 단계][3]를 따르세요. 아울러, [Bind 9이 정의한 카테고리를 확인][4]하세요.

    로깅 채널 예시:
    ```
    logging {
     channel default_log {
          syslog local3;
          print-time iso8601-utc;
          print-category yes;
          print-severity yes;
     };
       category default { default_log; };
    }
    ```

3. 파일을 저장하고 종료합니다.
4. syslog/Rsyslog 설정을 편집하여 Bind 9이 선택한 기능으로 Datadog에 로깅합니다.
    ```
    <syslog_facility>.* @@<DATADOG_AGENT_IP_ADDRESS>:<PORT>
    ```
5. 다음 서비스를 재시작합니다.
    ```
    service syslog/rsyslog restart
    service named restart
    ```

**참고**: Bind 9 애플리케이션용으로 설정한 채널에서 `print-category` 및 `print-severity`가 `yes`로 설정되어 있는지 확인하세요.

### 설정

#### 메트릭 수집

1. [에이전트 설정 디렉토리][5]의 루트에 있는 `conf.d/` 폴더에서 `bind9.d/conf.yaml` 파일을 편집하여 Bind 9 [메트릭][6] 수집을 시작합니다. 사용 가능한 설정 옵션 전체를 보려면 [bind9.d/conf.yaml 샘플][7]을 참고하세요.

   ```yaml
   init_config:

   instances:
     - url: "<BIND_9_STATS_URL>"
   ```

2. [에이전트를 재시작합니다][8].

#### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

#### 파일 모니터링

1. Bind 9 로그 수집을 시작하려면 이 설정 블록을 `bind9.d/conf.yaml` 파일에 추가하세요.

   사용 가능한 모든 설정 옵션은 [bind9.d/conf.yaml 샘플][7]을 참조하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/named/*.log
       service: bind9
       source: bind9
   ```
   **참고**: `conf.yaml`의 `path` 변수를 Bind 9 애플리케이션용 채널의 `file` 파라미터에 설정된 경로와 동일한 경로로 변경하세요.

3. [에이전트를 재시작합니다][8].

#### Syslog
1. Bind 9 로그 수집을 시작하려면 이 설정 블록을 `bind9.d/conf.yaml` 파일에 추가하세요.

   사용 가능한 모든 설정 옵션은 [bind9.d/conf.yaml 샘플][7]을 참조하세요.

   ```yaml
   logs:
     - type: tcp
       port: <PORT>
       service: bind9
       source: bind9
   ```
   **참고**: `port`의 값은 `syslog.conf/rsyslog.conf`에서 언급한 것과 동일해야 합니다.

3. [에이전트를 재시작합니다][8].

<h4 id="timezone-steps"> Bind 9 Datadog 로그 파이프라인에서 UTC가 아닌 다른 시간대 지정</h4>

Datadog은 기본적으로 모든 로그가 UTC 표준 시간대일 것으로 예상합니다. Bind 9 로그의 표준 시간대가 UTC가 아니라면 Bind 9 Datadog 파이프라인에서 올바른 시간대를 지정하세요.

Bind 9 파이프라인에서 다음과 같이 시간대를 변경합니다.

  1. Datadog 앱에서 [파이프라인 페이지][9]로 이동합니다.

  2. **필터 파이프라인** 검색창에 "Bind 9"을 입력합니다.

  3. Bind 9 파이프라인 위로 마우스를 올려 **클론** 버튼을 클릭합니다. 그러면 Bind 9 파이프라인의 편집 가능한 복제본이 생성됩니다.

  4. 다음 단계에 따라 Grok 파서를 편집합니다.
      - 복제한 파이프라인에서 "Grok Parser: Parsing Bind 9 common log format"이라는 이름의 프로세서를 찾아 파이프라인 위로 마우스를 올려 `Edit` 버튼을 클릭합니다.
      - **파싱 규칙 정의**에서,
        - `UTC` 문자열을 Bind 9 서버 표준 시간대의 [TZ 식별자][10]로 변경합니다. 예를 들어, 표준 시간대가 IST인 경우 값을`Asia/Calcutta`로 변경합니다.
      - **업데이트** 버튼을 클릭합니다.

### 검증

[에이전트의 상태 하위 명령을 실행][11]하고 점검 섹션에서 `bind9`을 찾습니다.

## 호환성

이 점검은 다른 주요 플랫폼과 모두 호환됩니다.

## 수집한 데이터

### 로그

Bind 9 통합은 다음 로그 유형을 수집합니다.

| 이벤트 유형    |
| -------------- |
| 쿼리, 쿼리 오류, Lame 서버, 알림, 보안|

### 메트릭
{{< get-metrics-from-git "bind9" >}}


### 이벤트

Bind 9 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "bind9" >}}


## 트러블슈팅

로그 파일을 모니터링하는 동안 **권한 거부** 오류가 표시되면 `dd-agent` 사용자에게 해당 파일 읽기 권한을 부여합니다.

  ```shell
  sudo chown -R dd-agent:dd-agent /var/log/named/
  ```

추가로 도움이 필요하면 [Datadog 지원 팀][14]에 문의하세요.


[1]: https://www.isc.org/bind/
[2]: https://docs.datadoghq.com/ko/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/ko/integrations/bind9/#timezone-steps
[4]: https://downloads.isc.org/isc/bind9/9.18.29/doc/arm/html/reference.html#namedconf-statement-category
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://docs.datadoghq.com/ko/integrations/bind9/#metrics
[7]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://app.datadoghq.com/logs/pipelines
[10]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[11]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-extras/blob/master/bind9/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/bind9/assets/service_checks.json
[14]: https://docs.datadoghq.com/ko/help/