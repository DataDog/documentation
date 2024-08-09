---
app_id: cacti
app_uuid: b18f92f2-2aa5-435e-b04e-84ce3538fa2d
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cacti.rrd.count
      metadata_path: metadata.csv
      prefix: cacti.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25
    source_type_name: Cacti
  logs:
    source: cacti
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- developer tools
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cacti/README.md
display_on_public_website: true
draft: false
git_integration_title: cacti
integration_id: cacti
integration_title: Cacti
integration_version: 2.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cacti
public_title: Cacti
short_description: Cacti RRD를 Datadog에 전달하여 더 많은 알림과 그래프화를 이용하세요.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::로그 수집
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Cacti RRD를 Datadog에 전달하여 더 많은 알림과 그래프화를 이용하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cacti
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

실시간으로 Cacti에서 메트릭을 받아 다음을 수행할 수 있습니다.

- Cacti 상태를 시각화하고 모니터링합니다.
- Cacti 페일오버와 이벤트에 대한 알림을 받습니다.

## 설정

### 설치

Cacti 점검은 [Datadog 에이전트][1] 패키지에 포함되어 있으므로 메트릭 수집을 시작하려면 먼저 다음을 수행해야 합니다.

1. `librrd` 헤더와 라이브러리를 설치합니다.
2. 파이썬(Python) 바인딩을 `rrdtool`에 설치합니다.

#### 헤더 및 라이브러리

데비안(Debian)/우분투(Ubuntu):

```shell
sudo apt-get install librrd-dev
```

RHEL/CentOS:

```shell
sudo yum install rrdtool-devel
```

#### 파이썬(Python) 바인딩

다음 명령을 사용해 `rrdtool` 파이썬 패키지를 에이전트에 추가합니다.

```shell
sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install rrdtool
```

### 설정

#### Datadog 사용자 생성

1. Cacti 데이터베이스에 읽기 전용 권한이 있는 Datadog 사용자를 생성합니다.

   ```shell
   sudo mysql -e "create user 'datadog'@'localhost' identified by '<MYSQL_PASSWORD>';"
   sudo mysql -e "grant select on cacti.* to 'datadog'@'localhost';"
   ```

2. 사용자 및 권한을 확인합니다.

   ```shell
   mysql -u datadog --password=<MYSQL_PASSWORD> -e "show status" | \
   grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
   echo -e "\033[0;31mCannot connect to MySQL\033[0m"

   mysql -u datadog --password=<MYSQL_PASSWORD> -D cacti -e "select * from data_template_data limit 1" && \
   echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
   echo -e "\033[0;31mMissing SELECT grant\033[0m"
   ```

3. `datadog-agent` 사용자에게 RRD 파일 액세스 권한을 부여합니다.

   ```shell
   sudo gpasswd -a dd-agent www-data
   sudo chmod -R g+rx /var/lib/cacti/rra/
   sudo su - datadog-agent -c 'if [ -r /var/lib/cacti/rra/ ];
   then echo -e "\033[0;31mdatadog-agent can read the RRD files\033[0m";
   else echo -e "\033[0;31mdatadog-agent can not read the RRD files\033[0m";
   fi'
   ```

#### Agent 설정

1. 에이전트를 설정해 MySQL에 연결하고 `cacti.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [샘플 cacti.d/conf.yaml][2]을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param mysql_host - string - required
     ## url of your MySQL database
     #
     - mysql_host: "localhost"

       ## @param mysql_port - integer - optional - default: 3306
       ## port of your MySQL database
       #
       # mysql_port: 3306

       ## @param mysql_user - string - required
       ## User to use to connect to MySQL in order to gather metrics
       #
       mysql_user: "datadog"

       ## @param mysql_password - string - required
       ## Password to use to connect to MySQL in order to gather metrics
       #
       mysql_password: "<MYSQL_PASSWORD>"

       ## @param rrd_path - string - required
       ## The Cacti checks requires access to the Cacti DB in MySQL and to the RRD
       ## files that contain the metrics tracked in Cacti.
       ## In almost all cases, you'll only need one instance pointing to the Cacti
       ## database.
       ## The `rrd_path` will probably be `/var/lib/cacti/rra` on Ubuntu
       ## or `/var/www/html/cacti/rra` on any other machines.
       #
       rrd_path: "<CACTI_RRA_PATH>"
   ```

2. [Restart the Agent][3].

### 검증

[에이전트 상태 하위 명령을 실행하고][4] 점검 섹션 아래에서 `cacti`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cacti" >}}


### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 로그 수집을 사용하도록 설정합니다.

    ```yaml
    logs_enabled: true
    ```

2. 이 설정 블록을 `cacti.d/conf.yaml` 파일에 추가하여 Cacti 로그 수집을 시작합니다.

    ```yaml
    logs:
      - type: file
        path: /opt/cacti/log/cacti.log
        source: cacti
    ```

   환경에 따라 `path` 파라미터 값을 변경합니다. 사용 가능한 모든 설정 옵션은 [샘플 cacti.d/conf.yaml][2]을 참조하세요.

3. [Restart the Agent][3].

### 이벤트

Cacti 점검은 이벤트를 포함하지 않습니다.

### 서비스 검사

Cacti 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

### 알려진 문제

이 통합에서 사용하는 파이썬(Python) 라이브러리는 특정 상황에서 메모리를 유출합니다. 메모리 유출이 있는 경우 다른 방법은 rrdtool 대신 [python-rrdtool][6] 패키지를 설치하는 것입니다. 이 이전 버전의 패키지는 유지관리되지 않으므로 이 통합에서 공식적으로 지원되지 않지만 다른 사용자들이 메모리 문제를 해결할 수 있도록 도왔습니다.

이 메모리 유출을 추적하기 위한 [Github 문제][7] 조사가 현재 진행 중입니다.

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/cacti/metadata.csv
[6]: https://github.com/pbanaszkiewicz/python-rrdtool
[7]: https://github.com/commx/python-rrdtool/issues/25
[8]: https://docs.datadoghq.com/ko/help/