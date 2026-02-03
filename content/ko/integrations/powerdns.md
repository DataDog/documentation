---
aliases:
- /ko/integrations/powerdns_recursor
app_id: powerdns
categories:
- 캐싱
- 로그 수집
- 네트워크
custom_kind: 통합
description: PowerDNS Recursor를 오가는 비정상적인 트래픽을 모니터링하세요.
integration_version: 5.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Power DNS Recursor
---
## 개요

PowerDNS Recursor의 성능을 추적하고 비정상적인 트래픽을 모니터링하세요. 이 Agent 점검은 다음을 포함하여 Recursor에서 다양한 메트릭을 수집합니다.

- 쿼리 답변 시간-1밀리초 미만, 10밀리초, 100밀리초, 1초 또는 1초보다 긴 응답이 몇 개인지 확인합니다.
- 쿼리 시간 초과.
- 캐시 히트 및 미스.
- 유형별 답변률: SRVFAIL, NXDOMAIN, NOERROR.
- 무시되거나 드롭된 패킷.

이외에 다수가 있습니다.

## 설정

### 설치

PowerDNS Recursor 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 Recursor에 별도로 설치할 필요가 없습니다.

### 설정

#### PowerDNS 준비

이 점검은 PowerDNS Recursor의 통계 API를 사용하여 성능 통계를 수집합니다. 4.1 이전의 pdns_recursor 버전은 기본적으로 통계 API를 활성화하지 않습니다. 이전 버전을 실행 중인 경우 다음을 recursor 구성 파일에 추가하여 활성화합니다(예: `/etc/powerdns/recursor.conf`).

```conf
webserver=yes
api-key=changeme             # only available since v4.0
webserver-readonly=yes       # default no
#webserver-port=8081         # default 8082
#webserver-address=0.0.0.0   # default 127.0.0.1
```

pdns_recursor 3.x를 실행하는 경우 다음 옵션 이름 앞에 `experimental-`을 추가합니다 (예: `experimental-webserver=yes`).

pdns_recursor 4.1 이상이라면 `api-key`를 설정하기만 하면 됩니다.

통계 API를 활성화하려면 recursor를 다시 시작합니다.

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. [Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트의 `conf.d/` 폴더에 있는 `powerdns_recursor.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 powerdns_recursor.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/datadog_checks/powerdns_recursor/data/conf.yaml.example)을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param host - string - required
     ## Host running the recursor.
     #
     - host: 127.0.0.1

       ## @param port - integer - required
       ## Recursor web server port.
       #
       port: 8082

       ## @param api_key - string - required
       ## Recursor web server api key.
       #
       api_key: "<POWERDNS_API_KEY>"

       ## @param version - integer - required - default: 3
       ## Version 3 or 4 of PowerDNS Recursor to connect to.
       ## The PowerDNS Recursor in v4 has a production ready web server that allows for
       ## statistics gathering. In version 3.x the server was marked as experimental.
       ##
       ## As the server was marked as experimental in version 3 many of the metrics have
       ## changed names and the API structure (paths) have also changed. With these changes
       ## there has been a need to separate the two concerns. The check now has a key value
       ## version: which if set to version 4 queries with the correct API path on the
       ## non-experimental web server.
       ##
       ## https://doc.powerdns.com/md/httpapi/api_spec/#url-apiv1serversserver95idstatistics
       #
       version: 3
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

1. 다음을 실행해 `systemd-journal` 그룹에 `dd-agent` 사용자를 추가하세요.

   ```text
   usermod -a -G systemd-journal dd-agent
   ```

1. PowerDNS Recursor 로그 수집을 시작하려면 이 구성 블록을 `powerdns_recursor.d/conf.yaml` 파일에 추가하세요.

   ```yaml
   logs:
     - type: journald
       source: powerdns
   ```

   사용 가능한 모든 구성 옵션은 [샘플 powerdns_recursor.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/datadog_checks/powerdns_recursor/data/conf.yaml.example)을 참고하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `powerdns_recursor`                                                              |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                    |
| `<INSTANCE_CONFIG>`  | `{"host":"%%host%%", "port":8082, "api_key":"<POWERDNS_API_KEY>", "version": 3}` |

##### 로그 수집

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "powerdns"}`                  |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent `status` 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `powerdns_recursor`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **powerdns.recursor.all_outqueries** <br>(gauge) | 초당 발신 UDP 쿼리 수<br>_query로 표시_ |
| **powerdns.recursor.answers0_1** <br>(gauge) | 1밀리초 이내에 응답한 초당 쿼리 수<br>_query로 표시_ |
| **powerdns.recursor.answers100_1000** <br>(gauge) | 1초 이내에 응답한 초당 쿼리 수<br>_query로 표시_ |
| **powerdns.recursor.answers10_100** <br>(gauge) | 100밀리초 이내에 응답한 초당 쿼리 수<br>_query로 표시_ |
| **powerdns.recursor.answers1_10** <br>(gauge) | 10밀리초 이내에 응답한 초당 쿼리 수<br>_query로 표시_ |
| **powerdns.recursor.answers_slow** <br>(gauge) | 1초 이내에 응답하지 않은 초당 쿼리 수<br>_query로 표시_ |
| **powerdns.recursor.auth4_answers0_1** <br>(gauge) | 1밀리초 이내에 auth4s가 응답한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.auth4_answers100_1000** <br>(gauge) | 1초 이내에 auth4s가 응답한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.auth4_answers10_100** <br>(gauge) | 100밀리초 이내에 auth4s가 응답한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.auth4_answers1_10** <br>(gauge) | 10밀리초 이내에 auth4s가 응답한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.auth4_answers_slow** <br>(gauge) | 1초 이내에 auth4s가 응답하지 않은 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.auth6_answers0_1** <br>(gauge) | 1밀리초 이내에 auth6s가 응답한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.auth6_answers100_1000** <br>(gauge) | 1초 이내에 auth6s가 응답한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.auth6_answers10_100** <br>(gauge) | 100밀리초 이내에 auth6s가 응답한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.auth6_answers1_10** <br>(gauge) | 10밀리초 이내에 auth6s가 응답한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.auth6_answers_slow** <br>(gauge) | 1초 이내에 auth6s가 응답하지 않은 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.cache_entries** <br>(gauge) | 캐시의 엔트리 수<br>_entry로 표시_ |
| **powerdns.recursor.cache_hits** <br>(gauge) | 초당 캐시 히트 수<br>_hit로 표시_ |
| **powerdns.recursor.cache_misses** <br>(gauge) | 초당 캐시 미스 수<br>_miss로 표시_ |
| **powerdns.recursor.case_mismatches** <br>(gauge) | 초당 대소문자 불일치 횟수<br>_error로 표시_ |
| **powerdns.recursor.chain_resends** <br>(gauge) | 이미 처리 중인 쿼리와 연결된 초당 쿼리 수<br>_query로 표시_ |
| **powerdns.recursor.client_parse_errors** <br>(gauge) | 초당 파싱 불가 패킷 수<br>_hit로 표시_ |
| **powerdns.recursor.concurrent_queries** <br>(gauge) | 현재 실행 중인 MThread의 수<br>_query로 표시_ |
| **powerdns.recursor.dlg_only_drops** <br>(gauge) | 'Delegation only' 설정으로 인해 초당 삭제된 레코드 수. pdns_recursor v4.x부터 사용 가능<br>_record로 표시_ |
| **powerdns.recursor.dnssec_queries** <br>(gauge) | DO 비트 설정된 초당 수신 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_record로 표시_ |
| **powerdns.recursor.dnssec_result_bogus** <br>(gauge) | Bogus 상태인 초당 DNSSEC 유효성 검사 횟수. pdns_recursor v4.x부터 사용 가능|
| **powerdns.recursor.dnssec_result_indeterminate** <br>(gauge) | Indeterminate 상태인 초당 DNSSEC 유효성 검사 횟수. pdns_recursor v4.x부터 사용 가능|
| **powerdns.recursor.dnssec_result_insecure** <br>(gauge) | Insecure 상태인 초당 DNSSEC 유효성 검사 횟수. pdns_recursor v4.x부터 사용 가능|
| **powerdns.recursor.dnssec_result_nta** <br>(gauge) | NTA(Negative trust anchor) 상태인 초당 DNSSEC 유효성 검사 횟수. pdns_recursor v4.x부터 사용 가능|
| **powerdns.recursor.dnssec_result_secure** <br>(gauge) | Secure 상태인 초당 DNSSEC 유효성 검사 횟수. pdns_recursor v4.x부터 사용 가능|
| **powerdns.recursor.dnssec_validations** <br>(gauge) | 초당 실행된 DNSSEC 유효성 검사 횟수. pdns_recursor v4.x부터 사용 가능|
| **powerdns.recursor.dont_outqueries** <br>(gauge) | '쿼리 안 함' 설정으로 인해 삭제된 발신 쿼리 수<br>_query로 표시_ |
| **powerdns.recursor.edns_ping_matches** <br>(gauge) | 유효한 EDNS PING 응답을 전송한 초당 서버 수. pdns_recursor v4.x부터 사용 가능<br>_host로 표시_ |
| **powerdns.recursor.edns_ping_mismatches** <br>(gauge) | 유효하지 않은 EDNS PING 응답을 전송한 초당 서버 수. pdns_recursor v4.x부터 사용 가능<br>_host로 표시_ |
| **powerdns.recursor.failed_host_entries** <br>(gauge) | 해석 실패한 서버의 수<br>_host로 표시_ |
| **powerdns.recursor.ignored_packets** <br>(gauge) | 쿼리만 수신해야 하는 서버 소켓에서 초당 수신된 논쿼리 패킷의 수. pdns_recursor v4.x부터 사용 가능<br>_packet으로 표시_ |
| **powerdns.recursor.ipv6_outqueries** <br>(gauge) | IPv6를 통한 초당 발신 쿼리 수|
| **powerdns.recursor.ipv6_questions** <br>(gauge) | RD 비트 설정된 엔드 유저 시작 IPv6 UDP 쿼리 수<br>_query로 표시_ |
| **powerdns.recursor.max_mthread_stack** <br>(gauge) | 지금까지 사용된 스레드 스택의 최대 사용량|
| **powerdns.recursor.negcache_entries** <br>(gauge) | 부정 응답 캐시 수<br>_entry로 표시_ |
| **powerdns.recursor.no_error_packets** <br>(gauge) | 초당 수신된 오류 패킷 수. pdns_recursor v4.x부터 사용 가능<br>_packet으로 표시_ |
| **powerdns.recursor.noedns_outqueries** <br>(gauge) | EDNS 없이 전송한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.noerror_answers** <br>(gauge) | 초당 NOERROR 응답 수<br>_operation으로 표시_ |
| **powerdns.recursor.noping_outqueries** <br>(gauge) | EDNS PING 없이 전송한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.nsset_invalidations** <br>(gauge) | 더 이상 작동하지 않아 삭제된 초당 nsset 횟수. pdns_recursor v4.x부터 사용 가능|
| **powerdns.recursor.nsspeeds_entries** <br>(gauge) | NS 속도 맵의 엔트리 수. pdns_recursor v4.x부터 사용 가능<br>_entry로 표시_ |
| **powerdns.recursor.nxdomain_answers** <br>(gauge) | 초당 NXDOMAIN 응답 수<br>_response로 표시_ |
| **powerdns.recursor.outgoing4_timeouts** <br>(gauge) | 발신 UDP IPv4 쿼리의 초당 타임아웃 횟수. pdns_recursor v4.x부터 사용 가능<br>_timeout으로 표시_ |
| **powerdns.recursor.outgoing6_timeouts** <br>(gauge) | 발신 UDP IPv6 쿼리의 초당 타임아웃 횟수. pdns_recursor v4.x부터 사용 가능<br>_timeout으로 표시_ |
| **powerdns.recursor.outgoing_timeouts** <br>(gauge) | 초당 발신 UDP 쿼리 타임아웃 횟수<br>_timeout으로 표시됨_ |
| **powerdns.recursor.over_capacity_drops** <br>(gauge) | 동시 쿼리 제한에 도달하여 삭제된 초당 질의 횟수<br>_query로 표시_ |
| **powerdns.recursor.packetcache_entries** <br>(gauge) | 패킷 캐시의 엔트리 수<br>_entry로 표시_ |
| **powerdns.recursor.packetcache_hits** <br>(gauge) | 초당 패킷 캐시 히트 수<br>_hit로 표시_ |
| **powerdns.recursor.packetcache_misses** <br>(gauge) | 초당 패킷 캐시 미스 수<br>_miss로 표시_ |
| **powerdns.recursor.policy_drops** <br>(gauge) | Lua 정책 결정으로 인해 초당 삭제된 패킷 수<br>_packet으로 표시_ |
| **powerdns.recursor.policy_result_custom** <br>(gauge) | RPZ/필터 엔진이 사용자 지정 응답을 전송한 초당 패킷 수. pdns_recursor v4.x부터 사용 가능<br>_packet으로 표시_ |
| **powerdns.recursor.policy_result_drop** <br>(gauge) | RPZ/필터 엔진이 삭제한 초당 패킷 수. pdns_recursor v4.x부터 사용 가능<br>_packet으로 표시_ |
| **powerdns.recursor.policy_result_noaction** <br>(gauge) | RPZ/필터 엔진이 조치를 취하지 않은 초당 패킷 수. pdns_recursor v4.x부터 사용 가능<br>_packet으로 표시_ |
| **powerdns.recursor.policy_result_nodata** <br>(gauge) | RPZ/필터 엔진이 NODATA로 응답한 초당 패킷 수. pdns_recursor v4.x부터 사용 가능<br>_packet으로 표시_ |
| **powerdns.recursor.policy_result_nxdomain** <br>(gauge) | RPZ/필터 엔진이 NXDOMAIN로 응답한 초당 패킷 수. pdns_recursor v4.x부터 사용 가능<br>_packet으로 표시_ |
| **powerdns.recursor.policy_result_truncate** <br>(gauge) | RPZ/필터 엔진이 TCP로 강제 전환한 초당 패킷 수. pdns_recursor v4.x부터 사용 가능<br>_packet으로 표시_ |
| **powerdns.recursor.qa_latency** <br>(gauge) | 지난 'latency-statistic-size' 패킷에 지수 가중 이동 평균을 적용한 평균 레이턴시(마이크로초)<br>_microsecond로 표시_ |
| **powerdns.recursor.questions** <br>(gauge) | 사용자가 시작한 초당 UDP 쿼리 수<br>_operation으로 표시_ |
| **powerdns.recursor.real_memory_usage** <br>(gauge) | PowerDNS가 사용하는 메모리 양(바이트). pdns_recursor v4.x부터 사용 가능<br>_byte로 표시_ |
| **powerdns.recursor.resource_limits** <br>(gauge) | 리소스 제한으로 인해 실행하지 못한 초당 쿼리 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.server_parse_errors** <br>(gauge) | 파싱할 수 없는 초당 서버 응답 패킷 수<br>_error로 표시_ |
| **powerdns.recursor.servfail_answers** <br>(gauge) | 초당 SERVFAIL 응답 수<br>_response로 표시_ |
| **powerdns.recursor.spoof_prevents** <br>(gauge) | PowerDNS가 스푸핑 시도로 간주하여 데이터를 삭제한 초당 횟수|
| **powerdns.recursor.sys_msec** <br>(gauge) | '시스템' 모드에서 소요된 CPU 시간(밀리초)<br>_millisecond로 표시_ |
| **powerdns.recursor.tcp_client_overflow** <br>(gauge) | '쿼리 안 함' 설정으로 인해 드롭된 발신 쿼리 수<br>_query로 표시_ |
| **powerdns.recursor.tcp_clients** <br>(gauge) | 초당 활성 TCP/IP 클라이언트 수|
| **powerdns.recursor.tcp_outqueries** <br>(gauge) | 초당 발신 TCP 쿼리 수<br>_operation으로 표시_ |
| **powerdns.recursor.tcp_questions** <br>(gauge) | 초당 수신 TCP 쿼리 수<br>_operation으로 표시_ |
| **powerdns.recursor.throttle_entries** <br>(gauge) | 스로틀 맵의 엔트리 수<br>_entry로 표시_ |
| **powerdns.recursor.throttled_out** <br>(gauge) | 스로틀된(제한된) 초당 발신 TCP 쿼리 수<br>_operation으로 표시_ |
| **powerdns.recursor.too_old_drops** <br>(gauge) | 너무 오래되어 삭제된 초당 질의 수. pdns_recursor v4.x부터 사용 가능<br>_query로 표시_ |
| **powerdns.recursor.udp_in_errors** <br>(gauge) | OS가 처리할 수 있는 속도보다 빠르게 수신된 초당 패킷 수. pdns_recursor v4.x부터 사용 가능<br>_packet으로 표시_ |
| **powerdns.recursor.udp_noport_errors** <br>(gauge) | 원격 포트가 수신 중 상태가 아니라는 ICMP 응답을 받은 초당 UDP 패킷 수. pdns_recursor v4.x부터 사용 가능<br>_packet으로 표시_ |
| **powerdns.recursor.udp_recvbuf_errors** <br>(gauge) | UDP 수신 버퍼에서 발생하는 초당 오류 수. pdns_recursor v4.x부터 사용 가능<br>_error로 표시_ |
| **powerdns.recursor.udp_sndbuf_errors** <br>(gauge) | UDP 전송 버퍼에서 발생하는 초당 오류 수. pdns_recursor v4.x부터 사용 가능<br>_error로 표시_ |
| **powerdns.recursor.unauthorized_tcp** <br>(gauge) | 'allow-from' 제한으로 인해 거부된 초당 TCP 질의 수<br>_operation으로 표시_ |
| **powerdns.recursor.unauthorized_udp** <br>(gauge) | 'allow-from' 제한으로 인해 거부된 초당 UDP 질의 수<br>_operation으로 표시_ |
| **powerdns.recursor.unexpected_packets** <br>(gauge) | 원격 서버에서 수신한 초당 예상치 못한 응답 수<br>_operation으로 표시_ |
| **powerdns.recursor.unreachables** <br>(gauge) | 초당 네임서버에 연결할 수 없는 횟수|
| **powerdns.recursor.uptime** <br>(gauge) | PowerDNS가 실행된 시간(초)<br>_second로 표시_ |
| **powerdns.recursor.user_msec** <br>(gauge) | '사용자' 모드에서 소요된 CPU 시간(밀리초)<br>_millisecond로 표시_ |

### 이벤트

PowerDNS Recursor 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**powerdns.recursor.can_connect**

Agent 점검이 모니터링되는 Gearman 인스턴스에 연결할 수 없는 경우 `CRITICAL`을 반환합니다. 연결할 수 있으면`OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.