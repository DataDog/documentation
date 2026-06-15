---
app_id: pgbouncer
categories:
- data stores
- log collection
custom_kind: integration
description: 연결 풀 메트릭을 추적하고 애플리케이션의 인바운드 및 아웃바운드 트래픽을 모니터링합니다.
integration_version: 8.2.0
media: []
supported_os:
- linux
- macos
title: PGBouncer
---
## 개요

PgBouncer 점검은 연결 풀 메트릭을 추적하고 애플리케이션과 주고받는 모니터링 트래픽을 추적합니다.

## 설정

### 설치

PgBouncer 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 PgBouncer 노드에 별도로 설치할 필요가 없습니다.

이 점검에는 연결된 사용자가 쿼리 PgBouncer 인스턴스에 필요합니다.

1. PgBouncer `pgbouncer.ini` 파일에 Datadog 사용자를 생성합니다.

   ```ini
   stats_users = datadog
   ```

1. `userlist.txt` 파일에 `datadog` 사용자에 대한 연결된 비밀번호를 추가합니다.

   ```text
   "datadog" "<PASSWORD>"
   ```

1. 자격 증명을 확인하려면 다음 명령을 실행합니다.

   ```shell
   psql -h localhost -U datadog -p 6432 pgbouncer -c \
   "SHOW VERSION;" \
   && echo -e "\e[0;32mpgBouncer connection - OK\e[0m" \
   || echo -e "\e[0;31mCannot connect to pgBouncer\e[0m"
   ```

   비밀번호를 입력하라는 메시지가 표시되면 `userlist.txt`에 추가한 비밀번호를 입력합니다.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. [Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트의 `conf.d/` 폴더에 있는 `pgbouncer.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 pgbouncer.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/pgbouncer/datadog_checks/pgbouncer/data/conf.yaml.example)을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param database_url - string - required
     ## `database_url` parameter should point to PgBouncer stats database url (ie. "pgbouncer")
     #
     - database_url: "postgresql://datadog:<PASSWORD>@<HOSTNAME>:<PORT>/<DATABASE_URL>?sslmode=require"
   ```

   **참고**: PgBouncer 인스턴스가 SSL을 지원하지 않는 경우 서버 오류를 방지하기 위해 `sslmode=require`을 `sslmode=allow`로 바꾸세요. 자세한 내용은 [SSL 지원](https://www.postgresql.org/docs/9.1/libpq-ssl.html)에 대한 Postgres 설명서를 참조하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. 이 설정 블록을 `pgbouncer.d/conf.yaml` 파일에 추가하여 Pgbouncer 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/postgresql/pgbouncer.log
       source: pgbouncer
       service: "<SERVICE_NAME>"
   ```

   `path` 및 `service` 파라미터 값을 변경하고 사용자 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 pgbouncer.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/pgbouncer/datadog_checks/pgbouncer/data/conf.yaml.example)을 참조하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `pgbouncer`                                                                                            |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                          |
| `<INSTANCE_CONFIG>`  | `{"database_url": "postgresql://datadog:<PASSWORD>@%%host%%:%%port%%/<DATABASE_URL>?sslmode=require"}` |

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                           |
| -------------- | ----------------------------------------------- |
| `<LOG_CONFIG>` | {"source": "pgbouncer", "service": "pgbouncer"} |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `pgbouncer`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **pgbouncer.clients.connect_time** <br>(gauge) | 연결이 생성된 시점(에포크 이후 초 단위)<br>_second로 표시_ |
| **pgbouncer.clients.request_time** <br>(gauge) | 마지막 요청이 발생한 시점(에포크 이후 초 단위)<br>_second로 표시_ |
| **pgbouncer.clients.wait** <br>(gauge) | 현재 대기 시간(초)<br>_second로 표시_ |
| **pgbouncer.clients.wait_us** <br>(gauge) | 현재 대기 시간의 마이크로초 단위 부분<br>_microsecond로 표시_ |
| **pgbouncer.databases.current_connections** <br>(gauge) | 이 데이터베이스의 현재 연결 수<br>_connection으로 표시_ |
| **pgbouncer.databases.max_connections** <br>(gauge) | 최대 허용 연결 수<br>_connection으로 표시_ |
| **pgbouncer.databases.pool_size** <br>(gauge) | 최대 서버 연결 수<br>_connection으로 표시_ |
| **pgbouncer.max_client_conn** <br>(gauge) | 최대 허용 클라이언트 연결 수<br>_connection으로 표시_ |
| **pgbouncer.pools.cl_active** <br>(gauge) | 서버 연결에 연결되어 쿼리 처리가 가능한 클라이언트 연결<br>_ connection으로 표시_ |
| **pgbouncer.pools.cl_waiting** <br>(gauge) | 서버 연결 대기 중인 클라이언트 연결<br>_connection으로 표시_ |
| **pgbouncer.pools.maxwait** <br>(gauge) | 대기열의 첫 번째(가장 오래된) 클라이언트가 대기한 시간(초)<br>_second로 표시_ |
| **pgbouncer.pools.maxwait_us** <br>(gauge) | 최대 대기 시간의 마이크로초 단위 부분<br>_microsecond로 표시_ |
| **pgbouncer.pools.sv_active** <br>(gauge) | 클라이언트 연결에 연결된 서버 연결<br>_connection으로 표시_ |
| **pgbouncer.pools.sv_idle** <br>(gauge) | 클라이언트 쿼리 작업을 할 준비가 된 유휴 서버 연결<br>_connection으로 표시_ |
| **pgbouncer.pools.sv_login** <br>(gauge) | 현재 로그인 중인 서버 연결<br>_connection으로 표시_ |
| **pgbouncer.pools.sv_tested** <br>(gauge) | 현재 server_reset_query 또는 server_check_query를 실행 중인 서버 연결<br>_connection로 표시_ |
| **pgbouncer.pools.sv_used** <br>(gauge) | server_check_delay를 초과하여 유휴 상태이며 server_check_query가 필요한 서버 연결<br>_connection로 표시_ |
| **pgbouncer.servers.connect_time** <br>(gauge) | 연결이 생성된 시점(에포크 이후 경과된 초)<br>_second로 표시_ |
| **pgbouncer.servers.request_time** <br>(gauge) | 마지막 요청이 발생한 시점(에포크 이후 초 단위)<br>_second로 표시_ |
| **pgbouncer.stats.avg_query** <br>(gauge) | 평균 쿼리 시간<br>_microsecond로 표시_ |
| **pgbouncer.stats.avg_query_count** <br>(gauge) | 마지막 통계 수집 주기 동안의 초당 평균 쿼리 수<br>_query로 표시_ |
| **pgbouncer.stats.avg_query_time** <br>(gauge) | 평균 쿼리 시간<br>_microsecond로 표시_ |
| **pgbouncer.stats.avg_recv** <br>(gauge) | 수신된 클라이언트 네트워크 트래픽<br>_byte로 표시_ |
| **pgbouncer.stats.avg_req** <br>(gauge) | 마지막 통계 수집 주기 동안의 초당 평균 요청 수<br>_request로 표시_ |
| **pgbouncer.stats.avg_sent** <br>(gauge) | 전송된 클라이언트 네트워크 트래픽<br>_byte로 표시_ |
| **pgbouncer.stats.avg_transaction_count** <br>(gauge) | 마지막 통계 수집 주기 동안의 초당 평균 트랜잭션 수<br>_request로 표시_ |
| **pgbouncer.stats.avg_transaction_time** <br>(gauge) | 평균 트랜잭션 시간<br>_microsecond로 표시_ |
| **pgbouncer.stats.avg_wait_time** <br>(gauge) | 클라이언트의 서버 연결 대기 시간(초당 평균, 마이크로초 단위)<br>_microsecond로 표시_ |
| **pgbouncer.stats.bytes_received_per_second** <br>(rate) | 수신된 총 네트워크 트래픽<br>_byte로 표시_ |
| **pgbouncer.stats.bytes_sent_per_second** <br>(rate) | 전송된 총 네트워크 트래픽<br>_byte로 표시_ |
| **pgbouncer.stats.queries_per_second** <br>(rate) | 쿼리율<br>_query로 표시됨_ |
| **pgbouncer.stats.requests_per_second** <br>(rate) | 요청률<br>_query로 표시됨_ |
| **pgbouncer.stats.total_query_time** <br>(rate) | Pgbouncer가 PostgreSQL에서 실제 쿼리를 실행하는 데 소요된 시간<br>_microsecond로 표시_ |
| **pgbouncer.stats.total_transaction_time** <br>(rate) | pgbouncer가 트랜잭션을 처리하는 데 걸린 시간<br>_microsecond로 표시_ |
| **pgbouncer.stats.total_wait_time** <br>(gauge) | 클라이언트의 서버 연결 대기 시간(마이크로초)<br>_microsecond로 표시_ |
| **pgbouncer.stats.transactions_per_second** <br>(rate) | 트랜잭션 비율<br>_transaction으로 표시_ |

**참고**: 일부 메트릭은 일부 버전의 PgBouncer에서 사용 가능하지 않습니다.

### 이벤트

PgBouncer 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

**pgbouncer.can_connect**

Agent가 모니터링되는 PGBouncer 인스턴스에 연결할 수 없는 경우 `CRITICAL`을 반환합니다. 연결할 수 있으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.