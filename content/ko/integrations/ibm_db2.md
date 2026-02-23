---
app_id: ibm-db2
app_uuid: e588293a-833f-4888-a7b4-2208e087059a
assets:
  dashboards:
    IBM Db2 Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: ibm_db2.connection.active
      metadata_path: metadata.csv
      prefix: ibm_db2.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10054
    source_type_name: IBM Db2
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 스토어
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_db2/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_db2
integration_id: ibm-db2
integration_title: IBM Db2
integration_version: 4.0.1
is_public: true
manifest_version: 2.0.0
name: ibm_db2
public_title: IBM Db2
short_description: IBM Db2 데이터베이스에서 테이블스페이스, 버퍼 풀 및 기타 메트릭을 모니터링하세요.
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - 카테고리::데이터 저장
  - Category::Log Collection
  - 제공::통합
  configuration: README.md#Setup
  description: IBM Db2 데이터베이스에서 테이블 공간, 버퍼 풀 및 기타 메트릭을 모니터링하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-db2-with-datadog
  support: README.md#Support
  title: IBM Db2
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![default dashboard][1]

## 개요

이 검사는 Datadog Agent를 통해 [IBM Db2][2]를 모니터링합니다.

## 설정

### 설치

IBM Db2 검사는 [Datadog Agent][3] 패키지에 포함되어 있습니다.

#### 종속성

[ibm_db][4] 클라이언트 라이브러리가 필요합니다. 설치하려면 작동하는 컴파일러가 있는지 확인하고 다음을 실행하세요.

##### Unix

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install ibm_db==3.2.3
```

참고: Python 2를 실행하는 Agent의 경우 `ibm_db=3.1.0` 대신 `ibm_db==3.0.1`을 사용하세요. 

##### Windows

에이전트 버전 6.11 미만인 경우:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" -m pip install ibm_db==3.0.1
```

Agent 버전 6.12 이상 및 7.0 미만인 경우:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" -m pip install ibm_db==3.0.1
```

Agent 버전 7.0 이상 7.58 미만의 경우,

```text
"C:\Program Files\Datadog\Datadog Agent\embedded3\python.exe" -m pip install ibm_db==3.1.4
```

Agent 버전 7.58 이상인 경우,

```text
"C:\Program Files\Datadog\Datadog Agent\embedded3\python.exe" -m pip install ibm_db==3.2.3
```

Linux에서는 XML 기능이 필요할 수 있습니다. 빌드 과정 중에 오류가 발생하는 경우 `libxslt-dev`(또는 RPM의 경우 `libxslt-devel`)를 설치하세요.

#### 모니터링 활성화

IBM Db2 통합은 다음 테이블 함수를 사용하여 데이터를 가져옵니다.
* `MON_GET_TABLESPACE`
* `MON_GET_TRANSACTION_LOG`
* `MON_GET_BUFFERPOOL`
* `MON_GET_DATABASE`
* `MON_GET_INSTANCE`

이러한 테이블 함수에 대한 자세한 내용은 [공식 IBM 문서][5]를 참조하세요.

Db2 인스턴스를 모니터링하려면 위의 5개 테이블 함수에 대한 `EXECUTE` 권한이 있는 Db2 사용자를 생성하거나 Db2 사용자에게 다음 역할 중 하나를 부여합니다.
* `DATAACCESS` 권한
* `DBADM` 권한
* `SQLADM` 권한

인스턴스, 연결된 데이터베이스 및 데이터베이스 개체의 상태를 모니터링하려면, 모니터링하려는 각 개체에 데이터베이스 시스템 모니터 스위치를 활성화합니다.
* Statement
* Lock
* 테이블
* Buffer pool

인스턴스 마스터 사용자로 전환하고 `db2` 프롬프트에서 다음 명령을 실행합니다.

```text
update dbm cfg using HEALTH_MON on
update dbm cfg using DFT_MON_STMT on
update dbm cfg using DFT_MON_LOCK on
update dbm cfg using DFT_MON_TABLE on
update dbm cfg using DFT_MON_BUFPOOL on
```

다음으로 `get dbm cfg`를 실행하면 다음이 표시됩니다.

```text
 Default database monitor switches
   Buffer pool                         (DFT_MON_BUFPOOL) = ON
   Lock                                   (DFT_MON_LOCK) = ON
   Sort                                   (DFT_MON_SORT) = OFF
   Statement                              (DFT_MON_STMT) = ON
   Table                                 (DFT_MON_TABLE) = ON
   Timestamp                         (DFT_MON_TIMESTAMP) = ON
   Unit of work                            (DFT_MON_UOW) = OFF
 Monitor health of instance and databases   (HEALTH_MON) = ON
```

### 구성

{{< tabs >}}
{{% tab "호스트" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `ibm_db2.d/conf.yaml` 파일을 편집하여 `ibm_db2` 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 ibm_db2.d/conf.yaml][1]을 참조하세요.

2. [에이전트를 재시작합니다][2].

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. IBM Db2 로그 수집을 시작하려면 `ibm_db2.d/conf.yaml` 파일에 다음 구성 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: /home/db2inst1/sqllib/db2dump/db2diag.log
       source: ibm_db2
       service: db2sysc
       log_processing_rules:
         - type: multi_line
           name: new_log_start_with_date
           pattern: \d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])
   ```

3. [에이전트를 재시작합니다][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/datadog_checks/ibm_db2/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화된 환경" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_db2`                                                                                                     |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"db": "<DB_NAME>", "username":"<USERNAME>", "password":"<PASSWORD>", "host":"%%host%%", "port":"%%port%%"}` |

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                                                                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ibm_db2", "service": "<SERVICE_NAME>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])"}}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `ibm_db2`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ibm_db2" >}}


### 이벤트

- 테이블스페이스 상태가 변경될 때마다 `ibm_db2.tablespace_state_change`가 트리거됩니다.

### 서비스 점검
{{< get-service-checks-from-git "ibm_db2" >}}


## 트러블슈팅

### CLI Driver SQL1531N 오류

다음과 같은 오류 로그를 생성하는 문제가 발생하는 경우:

```
2023-08-10 23:34:47 UTC | CORE | ERROR | (pkg/collector/python/datadog_agent.go:129 in LogMessage) | ibm_db2:c051131490335a94 | (ibm_db2.py:563) | Unable to connect to database `datadog` as user `db2inst1`: [IBM][CLI Driver] SQL1531N  The connection failed because the name specified with the DSN connection string keyword could not be found in either the db2dsdriver.cfg configuration file or the db2cli.ini configuration file.  Data source name specified in the connection string: "DATADOG". SQLCODE=-1531
```

다음 시나리오 중 하나로 인해 발생할 가능성이 높습니다.
- 구성(conf.yaml)에 호스트 및 포트 구성이 누락되었습니다.
- CLI 드라이버는 `db2cli.ini` 및 `db2dsdriver.cfg`가 없기 때문에 데이터베이스를 찾을 수 없습니다.

Agent는 데이터베이스에 적절하게 연결할 위치를 결정하기 위해 위의 두 시나리오 모두에 대한 정보가 필요합니다. 이 문제를 해결하려면 이 문제가 발생한 모든 `ibm_db2` 검사 인스턴스에 대해 호스트 또는 포트 파라미터를 포함할 수 있습니다. 다른 방법으로는 `db2cli.ini` 또는 `db2dsdriver.cfg` 파일에 정의된 DSN을 사용하려는 경우 Agent가 사용하는 `clidriver` 디렉터리에 해당 파일을 복사할 수 있습니다. 일반적인 상황에서 해당 디렉터리는 Linux의 경우에 `/opt/datadog-agent/embedded/lib/python3.9/site-packages/clidriver/cfg`에 있습니다.

### `ibm_db` 클라이언트 라이브러리를 오프라인으로 설치

Air-Gapped 환경에 있거나 `pip install ibm_db==x.y.z`(버전 번호: `x.y.z`) 실행이 불가능한 제한된 네트워크에 있는 경우 다음 방법을 사용하여 `ibm_db`를 설치할 수 있습니다.


1. 네트워크 액세스가 가능한 머신에서 [`ibm_db` 라이브러리][7] 및 [ODBC 및 CLI][8]에 대한 소스 tarball을 다운로드합니다. ODBC와 CLI는 `ibm_db` 라이브러리에서 필요하기 때문에 별도로 다운로드해야 하지만 `pip`를 통해서는 다운로드할 수 없습니다. 다음 스크립트는 Linux 시스템에 `ibm_db==x.y.z`(버전 번호: `x.y.z`)에 대한 아카이브 파일을 설치합니다. 

   ```
   curl -Lo ibm_db.tar.gz https://github.com/ibmdb/python-ibmdb/archive/refs/tags/vx.y.z.tar.gz

   curl -Lo linuxx64_odbc_cli.tar.gz https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
   ```

1. 두 파일을 제한된 호스트로 전송한 다음 아카이브를 추출합니다.

   ```
   tar -xvf ibm_db.tar.gz

   tar -xvf linuxx64_odbc_cli.tar.gz
   ```

1. `linuxx64_odbc_cli.tar.gz`에서 `/clidriver`가 추출된 위치로 `IBM_DB_HOME` 환경 변수를 설정합니다. 이렇게 하면 설치가 실패하므로 `ibm_db` 라이브러리가 새 버전의 ODBC 및 CLI를 설치하는 것을 방지할 수 있습니다.

   ```
   export IBM_DB_HOME=/path/to/clidriver
   ```

1. Agent에 내장된 [`pip`][9]를 사용하여 `ibm_db` 라이브러리를 로컬로 설치합니다. 이 라이브러리의 파일은 `ibm_db.tar.gz`에서 추출된 `python-ibmdb-x.y.z` 내에 포함되어 있습니다.

   ```
   /opt/datadog-agent/embedded/bin/pip install --no-index --no-deps --no-build-isolation  /path/to/python-ibmdb-x.y.z/IBM_DB/ibm_db/
   ```

다음 오류가 나타나는 경우:

```
  error: subprocess-exited-with-error

  × Preparing metadata (pyproject.toml) did not run successfully.
  | exit code: 1
   -> [8 lines of output]
      Detected 64-bit Python
      Detected platform = linux, uname = x86_64
      Downloading https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
       Downloading DSDriver from url =  https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
      Pre-requisite check [which gcc] : Failed

      No Gcc installation detected.
      Please install gcc and continue with the installation of the ibm_db.
      [end of output]
```

`gcc` 설치가 필요할 수 있습니다.

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 IBM DB2 모니터링][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ibm_db2/images/dashboard_overview.png
[2]: https://www.ibm.com/analytics/us/en/db2
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/ibmdb/python-ibmdb
[5]: https://www.ibm.com/docs/en/db2oc?topic=views-monitor-procedures-functions
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://pypi.org/project/ibm-db/#files
[8]: https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/
[9]: https://docs.datadoghq.com/ko/developers/guide/custom-python-package/?tab=linux
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://www.datadoghq.com/blog/monitor-db2-with-datadog