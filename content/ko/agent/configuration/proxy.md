---
algolia:
  tags:
  - 에이전트 프록시
aliases:
- /ko/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
- /ko/agent/proxy
further_reading:
- link: /logs/
  tag: 설명서
  text: 로그 수집
- link: /infrastructure/process/
  tag: 설명서
  text: 프로세스 수집
- link: /tracing/
  tag: 설명서
  text: 트레이스 및 프로필 수집
- link: /agent/configuration/agent-fips-proxy
  tag: 설명서
  text: Datadog FIPS 규정 준수
kind: 설명서
title: 에이전트 프록시 설정
---

## 개요

네트워크 구성이 아웃바운드 트래픽 때문에 제한된 경우, 아웃바운드 정책이 더 허용되는 호스트 하나나 여러 개를 에이전트 트래픽 전체용 프록시로 사용합니다.

인터넷에 직접 연결되지 않은 호스트의 경우 SSL/TLS를 통해 트래픽을 Datadog로 보내는 몇 가지 방법이 있습니다.

1. Squid나 Microsoft Web Proxy와 같이 이미 네트워크에 배포된 웹 프록시 사용
2. HAProxy 사용(같은 프록시를 통해 **16~20 에이전트**를 프록시로 사용하고 싶을 경우)
3. 에이전트를 프록시로 사용(프록시당 **최대 16개 에이전트**일 경우, **에이전트 v5에서만 가능**)

## FIPS 규정 준수

Datadog 에이전트에서 Datadog 에이전트 FIPS 프록시를 설정하는 방법과 관련한 정보는 [Datadog FIPS 규정 준수][1]를 참고하세요. FIPS 프록시는 US1-FED 리전에서만 사용할 수 있습니다. Datadog 에이전트 FIPS 프록시를 다른 일반 프록시와 함께 사용할 수 없습니다.

## 웹 프록시

Squid와 관련한 자세한 정보는 이 페이지에서 [Squid](#Squid) 섹션을 참고하세요.

에이전트에서 기본적으로 기존 웹 프록시를 지원합니다. 프록시를 통해 인터넷에 연결해야 하는 경우 에이전트 구성 파일을 편집하세요.

**에이전트 v6 & v7**

에이전트 `datadog.yaml` 구성 파일에서 `https`와 `http` 요청에 다른 프록시 서버를 설정하세요. 에이전트는 Datadog로 데이터를 전송할 때 `https`를 사용하나 통합에서 메트릭을 수집할 때는 `http`를 사용할 수 있습니다. 프록시를 사용한 요청이 무엇이든, 프록시 서버에서 SSL을 활성화할 수 있습니다. 다음은 `datadog.yaml` 파일 구성 예시입니다.

<div class="alert alert-warning">
로그 수집이 활성화되면 지정한 특정 전송이 <a href="/agent/logs/log_transport?tab=https#enforce-a-specific-transport">적용</a>되도록 하세요.
권장하는 설정은 HTTPS를 사용하는 것입니다. 이 경우, 프록시 메트릭과 프록시 로그에 <code>&ltHOST&gt;:&ltPORT&gt;</code>가 사용됩니다.
TCP 전송을 사용하는 경우 <a href="/agent/logs/proxy">로그용 TCP 프록시</a>를 참고하세요.
</div>

`https` 요청 모두에 HTTP 프록시 설정:

```yaml
proxy:
    https: "http://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>"
```

참고: `https` 요청에 HTTP 프록시를 설정할 때 에이전트와 Datadog 간의 실제 통신은 TLS로 엔드투엔드 암호화되며 프록시에서는 이 암호를 해독할 수 없습니다. 유일하게 암호화되지 않는 통신은 `HTTP CONNECT` 요청인데, 이는 에이전트와 Datadog 사이에 첫 TCP 연결을 수립하기 위해 에이전트와 프록시 사이에 있는 요청입니다. 따라서 `https` 요청에 프록시를 사용할 때 에이전트와 Datadog 간 소통을 암호화하기 위해 HTTPS 프록시를 사용할 필요가 없습니다.

`https`와 `http` 요청 모두를 위한  HTTPS 프록시 설정

```yaml
proxy:
    https: "https://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "https://<SSL_PROXY_SERVER_FOR_HTTP>:<PORT>"
```

`https` 및 `http` 요청 모두를 위해 프록시 서버에 연결할 수 있도록 `<USERNAME>`과 `<PASSWORD>` 설정:

```yaml
proxy:
    https: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTP>:<PORT>"
```

프록시를 바이패스해야 하는 특정 호스트를 지정하려면 `no_proxy` 목록을 사용:

```yaml
proxy:
    https: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTP>:<PORT>"
    no_proxy:
      - host1
      - host2
```

**참고**: HTTP(S) 요청을 하는 모든 통합은 통합 수준에서 정의된 값이 없을 경우 `datadog.yaml` 구성 파일에서 정의한 프록시 설정을 기본값으로 가져옵니다. 이를 원치 않는 경우에는 통합의 모든 인스턴스 설정이나 `init_config` 폴백에서 `skip_proxy`를 true로 설정하거나 `use_agent_proxy`를 false로 설정합니다.

##### NO_PROXY 허용 값

기본적으로 `no_proxy`/`NO_PROXY`는 에이전트 HTTP(S) 요청 엔드포인트와 정확하게 매칭되어야 합니다(에이전트 통합에서 실행하는 요청 제외). `no_proxy_nonexact_match`를 활성화하여 에이전트 통합에 사용한 규칙(아래)을 동일하게 적용해 에이전트가 `NO_PROXY` 값과 매칭되도록 하는 것을 권장합니다.

```yaml
no_proxy_nonexact_match: true
```

에이전트 통합에는 다음 규칙이 적용됩니다(`no_proxy_nonexact_match`이 활성화되면 전체 에이전트에 적용됨).
* 도메인 이름이 해당 이름과 하위 도메인 이름 전체와 일치합니다. 다음 예를 참고하세요.
  - `datadoghq.com`은 `app.agent.datadoghq.com`, `www.datadoghq.com`, `datadoghq.com`와 일치하나 `www.notdatadoghq.com`와는 일치하지 **않음**
  - `datadoghq`는 `frontend.datadoghq`,`backend.datadoghq`와 일치하나, `www.datadoghq.com`나 `www.datadoghq.eu`와는 일치하지 **않음**
* "."으로 시작되는 도메임 이름은 오직 하위 도메인과 일치합니다. 다음 예를 참고하세요.
  - `.datadoghq.com`은 `app.agent.datadoghq.com`, `www.datadoghq.com`와 일치하나 `datadoghq.com`와는 일치하지 **않음**
* CIDR 범위가 서브넷 내 IP 주소와 일치합니다. 다음 예를 참고하세요.
  - `192.168.1.0/24`가 IP 범위 `192.168.1.1`에서 `192.168.1.254`까지와 일치함
* 정확한 IP 주소입니다. 다음 예를 참고하세요.
  - `169.254.169.254`
* 호스트 이름. 다음 예를 참고하세요.
  - `webserver1`

#### 환경 변수

에이전트 v6.4부터는 환경 변수를 통해 프록시 설정을 할 수 있습니다.

* `DD_PROXY_HTTPS`: `https` 요청을 위한 프록시 서버 설정
* `DD_PROXY_HTTP`: `http` 요청을 위한 프록시 서버 설정
* `DD_PROXY_NO_PROXY`: 프록시를 바이패스해야 하는 호스트 목록 설정. 목록은 띄어쓰기로 구분됨.

환경 변수는 `datadog.yaml` 파일에 있는 값보다 우선 순위를 갖습니다. 환경 변수에 값이 없는 경우(예: ``DD_PROXY_HTTP=""``) 에이전트에서는 우선 순위가 낮은 옵션을 사용하지 않고 빈 값을 사용합니다.

Unix 호스트의 경우, 시스템 수준 프록시가 `HTTPS_PROXY`, `HTTP_PROXY`, `NO_PROXY`와 같은 표준 환경 변수로 지정됩니다. 이런 환경 변수가 있으면 에이전트에서 사용합니다. 그러나 이 같은 변수가 Docker, ECS, Kubernetes와 같은 오케스트레이터 통합의 요청에도 모두 영향을 주니 유의하세요.

에이전트에서는 다음 우선순위로 값을 사용합니다.

1. `DD_PROXY_HTTPS`, `DD_PROXY_HTTP`, `DD_PROXY_NO_PROXY` 환경 변수
2. `HTTPS_PROXY`, `HTTP_PROXY`, `NO_PROXY` 환경 변수
3. `datadog.yaml` 내 값

**에이전트 v5**

<div class="alert alert-warning">
<code>&ltHOST&gt;:&ltPORT&gt;</code>는 프록시 메트릭에서 사용될 수 있으나 프록시 로그에는 사용되지 않습니다. 자세한 내용은 <a href="/agent/logs/proxy">로그용 프록시</a> 페이지를 참고하세요.
</div>

`datadog.conf` 파일에서 프록시 정보를 편집합니다.

```text
# If you need a proxy to connect to the Internet, provide the settings here
proxy_host: my-proxy.example.com
proxy_port: 3128
proxy_user: my_user
proxy_password: my_password
```

새 설정을 적용하려면 [에이전트를 재시작][2]해야 합니다.

### Squid

[Squid][3]는 HTTP, HTTPS, FTP 등과 같은 웹을 지원하는 전달 프록시입니다. Windows 등 운영 체제 대부분에서 실행되며 GNU GPL 라이선스로 사용이 허가됩니다. 네트워크에 사용하는 웹 프록시가 아직 없을 경우에는 Squid가 가장 사용하기 편한 옵션입니다.

#### Squid로 프록시 전달

##### 트래픽을 Datadog로 전달하기만 하도록 Squid 구성

내부 에이전트와 Datadog에 연결되어 있는 호스트에 Squid를 설치합니다. 운영 체제 내에 있는 패키지 매니저를 사용하거나 [Squid 프로젝트 페이지][3]에서 직접 소프트웨어를 설치할 수도 있습니다.

구성 파일을 편집해 Squid를 구성합니다. 보통 Linux에서는 `/etc/squid/squid.conf`에, Windows에서는 `C:\squid\etc\squid.conf`에 파일이 위치하고 있습니다.

로컬 트래픽을 허용하고 Datadog에서 필요한 곳으로 전달하기 위해 `squid.conf` 구성 파일을 편집합니다.

```conf
http_port 0.0.0.0:3128

acl local src 127.0.0.1/32

acl Datadog dstdomain .{{< region-param key="dd_site" >}}

http_access allow Datadog
http_access allow local manager
```

##### Squid 시작

새 구성이 적용되도록 Squid를 시작(또는 재시작)합니다.

{{< tabs >}}
{{% tab "Linux" %}}

```bash
sudo systemctl start squid
```

Squid가 이미 실행중이라면 다음 명령을 실행해 Squid를 재시작하세요.

```bash
sudo systemctl restart squid
```

{{% /tab %}}
{{% tab "Windows" %}}

Windows에서 Squid를 구성하는 경우 먼저 [Squid를 시스템 서비스로 구성][1]해야 합니다. 그 후에 관리자 명령 프롬프트에 다음 명령을 실행하세요.

```bash
net start squid
```

Squid가 이미 실행중이라면 다음 명령을 실행해 Squid를 재시작하세요.

```bash
net stop squid
net start squid
```

[1]: https://wiki.squid-cache.org/KnowledgeBase/Windows
{{% /tab %}}
{{< /tabs >}}

##### Datadog 에이전트 구성

**에이전트 v6 & v7**

다음을 포함하여 에이전트 구성 파일(`datadog.yaml`)을 수정합니다.

```yaml
proxy:
  http: http://127.0.0.1:3128
  https: http://127.0.0.1:3128
```

다음 변경 사항을 저장한 후 [에이전트를 재시작][2]합니다.

[Infrastructure Overview][4]를 확인해 Datadog가 에이전트로부터 데이터를 수신할 수 있는지 확인합니다.

**에이전트 v5**

다음을 포함하여 에이전트 구성 파일(`datadog.conf`)을 수정합니다.

```conf
proxy_host: 127.0.0.1
proxy_port: 3128
```

다음 변경 사항을 저장한 후 [에이전트를 재시작][2]합니다.

[Infrastructure Overview][4]를 확인해 Datadog가 에이전트로부터 데이터를 수신할 수 있는지 확인합니다.

## HAProxy

[HAProxy][5]는 TCP와 HTTP 애플리케이션에 프록시 서비스를 제공하는 빠르고 신뢰할 수 있는 무료 솔루션입니다. 보통 수신 요청을 풀 서버로 분산하는 부하 분산 장치로 HAProxy를 사용하나, 외부에 연결되어 있지 않는 호스트에서 에이전트 트래픽을 Datadog로 보낼 때 프록시 서비스로도 사용할 수 있습니다.

`agent ---> haproxy ---> Datadog`

네트워크에 사용 중인 웹 프록시가 없거나 에이전트를 대량으로 프록시하고 싶을 경우에 적합한 옵션입니다. HAProxy 인스턴스 하나만으로 네트워크 로컬 에이전트 트래픽을 모두 처리할 수 있는 예도 있는데, 각 프록시가 에이전트 1000개 이상 처리할 수 있기 때문입니다.

**참고**: 이 수치는 특정 `m3.xl` 인스턴스 성능에 기반한 보수적인 예상치입니다. HAProxy 처리량에 영향을 주는 네트워크 관련 및 호스트 관련 변수가 많습니다. 따라서 서비스로 이용하기 전후에 프록시 배포를 유의하여 살피는 것이 좋습니다. 자세한 내용은 [HAProxy 설명서][5]를 참고하세요.

HAProxy와 Datadog 간 통신은 항상 TLS로 암호화됩니다. 에이전트 호스트와 HAProxy 호스트 간 통신의 경우에는 프록시와 에이전트가 같은 호스트에 있다고 전제하기 때문에 기본적으로 암호화되지 않습니다. 그러나 HAPoxy 호스트와 에이전트 호스트가 격리된 동일 네트워크에 있지 않으면 이 통신도 TLS로 암호화해 보안 조치를 취하는 것이 좋습니다.
에이전트와 HAProxy 간 데이터를 암호화하려면 HAProxy 호스트용 주체 대체 이름(SAN) 확장으로 x509 인증을 생성해야 합니다. 이 인증 번들(*.pem)에는 공용 인증과 프라이빗 키가 포함되어 있어야 합니다. 더 자세한 정보는 [HAProxy 블로그 포스트][6]를 참고하세요.


**참고**: 다음 명령의 하나를 사용해 Datadog 인증을 다운로드 받으세요.

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

Debian 및 Ubuntu용 인증 경로는 `/etc/ssl/certs/ca-certificates.crt`이고, CentOS 및 Red Hat용 인증 경로는 `/etc/ssl/certs/ca-bundle.crt`입니다.

### HAProxy로 프록시 전달

#### HAProxy 구성

Datadog에 연결되어 있는 호스트에 HAProxy를 설치해야 합니다. 아직 구성하지 않은 경우, 다음 구성 파일의 하나를 사용하세요. Datdog 서비스와 사이트에 따라 구성이 달라집니다. 내 [Datadog 사이트][7]에 맞는 구성을 보려면 우측에 있는 `DATADOG SITE` 선택기를 사용하세요.

**참고**: 에이전트와 HAPProxy가 동일한 분리된 로컬 네트워크에 속하지 않는 경우 `HTTPS`설정 파일을 사용하는 것이 좋습니다.

##### 다단계 API 테스트

```conf
# 기본 설정
글로벌
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# 일부 정상적인 기본값
기본값
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# 포트 3833에서 HAP Proxy 통계 보기를 선언
# 이 페이지를 보는 데 자격 증명이 필요하지 않고 다음을 실행할 수 있습니다
# 설정이 끝나면 전원을 끕니다.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# 이 섹션에서는 DNS 레코드를 다시 로드합니다
# <DNS_SERVER_IP>과 <DNS_SECONDARY_SERVER_IP>를 DNS 서버 IP 주소로 바꿉니다.
# HAProxy 1.8 이상용
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# 에이전트가 연결되는 엔드포인트 선언
# 메트릭을 전송합니다(예: "dd_url" 값).
frontend metrics-forwarder
    bind *:3834
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# 에이전트가 연결되는 엔드포인트를 선언
# 트레이스를 전송합니다(예: 애플리케이션 성능 모니터링(APM)의 "endpoint" 값
# 설정 섹션).
frontend traces-forwarder
    bind *:3835
    mode tcp
    option tcplog
    default_backend datadog-traces

# 에이전트가 연결되는 엔드포인트를 선언
# 프로필을 전송합니다 (예를 들어,  "apm_config.profiling_dd_url"의 값).
frontend profiles-forwarder
    bind *:3836
    mode tcp
    option tcplog
    default_backend datadog-profiles

# 에이전트가 연결되는 엔드포인트를 선언
# 프로세스를 전송합니다(예를 들어 프로세스에서 "url"값
# 설정 섹션).
frontend processes-forwarder
    bind *:3837
    mode tcp
    option tcplog
    default_backend datadog-processes

# 에이전트가 연결되는 엔드포인트를 선언
# 로그를 전송합니다(예를 들어 "logs.config.logs_dd_url"의 값)
# use_http: true와 함께 로그를 보내는 경우
frontend logs_http_frontend
    bind *:3838
    mode http
    option tcplog
    default_backend datadog-logs-http

# use_http: true와 함께 로그를 보내는 경우
# frontend logs_frontend
#    bind *:10514
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# 에이전트가 연결되는 엔드포인트를 선언
# 데이터베이스 모니터링 메트릭 및 활동 전송(예를 들어 "database_monitoring.metrics.dd_url" 및 "database_monitoring.activity.dd_url" 값)
frontend database_monitoring_metrics_frontend
    bind *:3839
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# 에이전트가 연결되는 엔드포인트를 선언
# 데이터베이스 모니터링 샘플 전송(예를 들어  "database_monitoring.samples.dd_url"의 값)
frontend database_monitoring_samples_frontend
    bind *:3840
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# 에이전트가 연결되는 엔드포인트를 선언
# 네트워크 디바이스 모니터링 메타데이터 전송(예: "network_devices.metadata.dd_url" 값)
frontend network_devices_metadata_frontend
    bind *:3841
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

# 에이전트가 연결되는 엔드포인트를 선언
# 네트워크 장치 SNMP 트랩 데이터 전송(예: "network_devices.snmp_traps.forwarder.dd_url" 값)
frontend network_devices_snmp_traps_frontend
    bind *:3842
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps

# 에이전트가 연결되는 엔드포인트를 선언
# 계측 원격 측정 데이터 전송(예: "apm_config.telemetry.dd_url" 값)
frontend instrumentation_telemetry_data_frontend
    bind *:3843
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# 에이전트가 연결되는 엔드포인트를 선언
# 네트워크 디바이스 모니터링 넷플로우 플로우 전송 (예: "network_devices.netflow.dd_url" 값)
frontend network_devices_netflow_frontend
    bind *:3845
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# 에이전트가 연결되는 엔드포인트를 선언
# 원격 설정 전송(예를 들어, "remote_configuration.rc_dd_url"의 값)
frontend remote_configuration_frontend
    bind *:3846
    mode http
    option tcplog
    default_backend datadog-remote-configuration

# Datadog 서버입니다. TCP 요청이 오는
# 위에 정의된 포워더 프론트엔드는
# Datadog의 공용 엔드포인트로 프록시 됩니다.
backend datadog-metrics
    balance roundrobin
    mode http
    # 다음 설정은 HAProxy 1.8 이상용
    server-template mothership 5 haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-api
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-flare
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-traces
    balance roundrobin
    mode tcp
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-processes
    balance roundrobin
    mode tcp
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-logs-http
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-remote-configuration
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에 대한 다음 설정의 주석 해제
    # server mothership config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>
```

##### HTTPS

이 구성을 사용하면 에이전트와 HAPProxy 간의 통신에 SSL/TLS 암호화를 추가합니다. `<PATH_TO_PROXY_CERTIFICATE_PEM>`변수를 프록시 인증서 번들(*.pem)의 경로로 바꿉니다.

```conf
# 기본 설정
글로벌
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# 일부 정상적인 기본값
기본값
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# 포트 3833에서 HAP Proxy 통계 보기를 선언
# 이 페이지를 보는 데 자격 증명이 필요하지 않고
# 구성이 끝나면 전원을 끌 수 있습니다.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# 이 섹션에서는 DNS 레코드를 다시 로드
# <DNS_SERVER_IP> 과 <DNS_SECONDARY_SERVER_IP>를 DNS 서버 IP 주소로 바꿉니다.
# For HAProxy 1.8 and newer
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# 에이전트가 연결되는 엔드포인트 선언
# 메트릭을 전송합니다(예: "dd_url" 값).
frontend metrics-forwarder
    bind *:3834 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# 에이전트가 연결되는 엔드포인트를 선언
# 트레이스를 전송합니다(예: APM의 "endpoint" 값
#설정 섹션).
frontend traces-forwarder
    bind *:3835 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-traces

# 에이전트가 연결되는 엔드포인트를 선언
# 프로필을 전송합니다 (예를 들어, "apm_config.profiling_dd_url"의 값).
frontend profiles-forwarder
    bind *:3836 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-profiles

# 에이전트가 연결되는 엔드포인트를 선언
# 프로세스를 전송합니다(예를 들어 프로세스에서 "url"값
# 설정 섹션).
frontend processes-forwarder
    bind *:3837 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-processes

# 에이전트가 연결되는 엔드포인트를 선언
# 로그를 전송합니다(예를 들어 "logs.config.logs_dd_url"의 값)
# use_http: true와 함께 로그를 보내는 경우
frontend logs_http_frontend
    bind *:3838 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-logs-http

# force_use_tcp: true와 함께 로그를 보내는 경우
# frontend logs_frontend
#    bind *:10514 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# 에이전트가 연결되는 엔드포인트를 선언
# 데이터베이스 모니터링 메트릭 및 활동 전송(예를 들어 "database_monitoring.metrics.dd_url" 및 "database_monitoring.activity.dd_url" 값)
frontend database_monitoring_metrics_frontend
    bind *:3839 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# 에이전트가 연결되는 엔드포인트를 선언
# 데이터베이스 모니터링 샘플 전송(예를 들어 "database_monitoring.samples.dd_url"의 값)
frontend database_monitoring_samples_frontend
    bind *:3840 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# 에이전트가 연결되는 엔드포인트를 선언
# 네트워크 디바이스 모니터링 메타데이터 전송(예: "network_devices.metadata.dd_url" 값)
frontend network_devices_metadata_frontend
    bind *:3841 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

# 에이전트가 연결되는 엔드포인트를 선언r
# 네트워크 장치 SNMP 트랩 데이터 전송(예: "network_devices.snmp_traps.forwarder.dd_url" 값)
frontend network_devices_snmp_traps_frontend
    bind *:3842 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps


# 에이전트가 연결되는 엔드포인트를 선언
# 계측 원격 측정 데이터 전송(예: "apm_config.telemetry.dd_url" 값)
frontend instrumentation_telemetry_data_frontend
    bind *:3843 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# 에이전트가 연결되는 엔드포인트를 선언
# 네트워크 디바이스 모니터링 넷플로우 플로우 전송 (예: "network_devices.netflow.dd_url" 값)
frontend network_devices_netflow_frontend
    bind *:3845 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# 에이전트가 연결되는 엔드포인트를 선언
# 원격 설정 전송(예를 들어, "remote_configuration.rc_dd_url"의 값)
frontend remote_configuration_frontend
    bind *:3846 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-remote-configuration

# Datadog 서버입니다. TCP 요청이 오는
# 위에 정의된 포워더 프론트엔드는
# Datadog의 공용 엔드포인트로 프록시 됩니다.
backend datadog-metrics
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-api
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-flare
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-traces
    balance roundrobin
    mode tcp
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-processes
    balance roundrobin
    mode tcp
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-logs-http
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-remote-configuration
    balance roundrobin
    mode http
    # 다음 구성은 HAProxy 1.8 이상용
    server-template mothership 5 config.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 이전 HAProxy 버전에서는 다음 구성의 주석을 해제
    # server mothership config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

```

**참고**: 프록시 호스트에서 인증서를 가져올 수 없는 경우 `verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>`대신 `verify none`를 사용할 수 있지만, 이 경우 HAProxy에서는 Datadog의 수신 인증서를 확인할 수 없습니다.

HAProxy 1.8 이상에서는 DNS 서비스 검색을 통해 서버 변경을 감지하고 자동으로 구성에 적용할 수 있습니다.
HAProxy의 이전 버전을 사용하는 경우 HAProxy를 다시 로드하거나 재시작해야 합니다. {{< region-param key="dd_full_site" code="true" >}}가 다른 IP로 실패할 경우 HAProxy의 DNS 캐시를 강제로 새로 고침하기 위해(`service haproxy reload`와 같이) **매 10분마다 `cron`작업 HAProxy 다시 로드를 하는 것을 권장합니다**.

#### Datadog 에이전트 구성

**에이전트 v6 & v7**

`dd_url`을 HAProxy 주소로 설정해 HAProxy를 가리키도록 각 에이전트를 편집합니다(예: `haproxy.example.com`).
`dd_url`설정은 `datadog.yaml`파일에서 찾을 수 있습니다.

`dd_url: <SCHEME>://haproxy.example.com:3834`

이전에 HAProxy HTTPS 설정을 선택한 경우 `<SCHEME>`을 `https`로 대체하거나, HTTPS를 선택하지 않은 경우에는 `http`로 대체합니다.

프록시를 통해 트레이스, 프로필, 프로세스, 로그를 보내려면 `datadog.yaml` 파일에서 다음을 설정하세요.

```yaml
apm_config:
    apm_dd_url: <SCHEME>://haproxy.example.com:3835
    profiling_dd_url: <SCHEME>://haproxy.example.com:3836/api/v2/profile
    telemetry:
        dd_url: <SCHEME>://haproxy.example.com:3843

process_config:
    process_dd_url: <SCHEME>://haproxy.example.com:3837

logs_config:
    use_http: true
    logs_dd_url: haproxy.example.com:3838
    # 에이전트와 HAProxy 간의 암호화를 사용하려면 아래 줄에 설명 추가
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: haproxy.example.com:3839
        # 에이전트와 HAProxy 간의 암호화를 사용하려면 아래 줄에 설명 추가
        logs_no_ssl: true
    activity:
        logs_dd_url: haproxy.example.com:3839
        # 에이전트와 HAProxy 간의 암호화를 사용하려면 아래 줄에 설명 추가
        logs_no_ssl: true
    samples:
        logs_dd_url: haproxy.example.com:3840
        # 에이전트와 HAProxy 간의 암호화를 사용하려면 아래 줄에 설명 추가
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: haproxy.example.com:3841
        # 에이전트와 HAProxy 간의 암호화를 사용하려면 아래 줄에 설명 추가
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: haproxy.example.com:3842
            # 에이전트와 HAProxy 간의 암호화를 사용하려면 아래 줄에 설명 추가
            logs_no_ssl: true
    netflow:
        forwarder:
            logs_dd_url: haproxy.example.com:3845
            # 에이전트와 HAProxy 간의 암호화를 사용하려면 아래 줄에 설명 추가
            logs_no_ssl: true

remote_configuration:
    rc_dd_url: haproxy.example.com:3846
    # 에이전트와 HAProxy 간의 암호화를 사용하려면 아래 줄에 설명 추가
    no_tls: true
```

에이전트와 HAProxy 간에 암호화를 사용할 때 에이전트가 프록시 인증서에 액세스 권한이 없거나, 프록시 인증서의 유효성을 검사할 수 없거나, 유효성 검사가 필요 없는 경우 `datadog.yaml` 에이전트 구성 파일을 편집하여 `skip_ssl_validation`을 `true`로 설정할 수 있습니다.
이 옵션을 `true`로 설정하면 에이전트는 인증서 유효성 검사 단계를 건너뛰고 프록시의 ID를 확인하지 않지만 통신은 여전히 SSL/TLS로 암호화됩니다.

```yaml
skip_ssl_validation: true
```

마지막으로 [에이전트 재시작][2]을 누릅니다.

모든 것이 정상적으로 작동하는지 확인하려면 `http://haproxy.example.com:3833`에서 [인프라스트럭처 개요][4]뿐만 아니라 HAProxy 통계도 검토합니다.

**에이전트 v5**

`dd_url`을 HAProxy 주소로 설정해 HAProxy를 가리키도록 각 에이전트를 편집합니다(예: `haproxy.example.com`).
`dd_url`설정은 `datadog.conf` 파일에서 찾을 수 있습니다.

`dd_url: http://haproxy.example.com:3834`

프록시를 통해 트레이스 또는 프로세스를 보내려면 `datadog.conf` 파일에서 다음을 설정합니다.

```conf
[trace.api]
endpoint = http://haproxy.example.com:3835

[process.api]
endpoint = http://haproxy.example.com:3837
```

SSL 인증서 확인을 사용하지 않도록 설정하려면 Python이 SSL 인증서(`app.datadoghq.com`)의 호스트 이름과 사용자의 HAProxy 호스트 이름 사이가 불일치하지 않도록 감독자 구성을 편집해야 합니다.

* Debian 기반 시스템에서 `/etc/dd-agent/supervisor_ddagent.conf`
* Red Hat 기반 시스템에서 `/etc/dd-agent/supervisor.conf`
* SmartOS에서 `/opt/local/datadog/supervisord/supervisord.conf`
* FreeBSD에서 `/usr/local/etc/datadog/supervisord/supervisord.conf`
* macOS에서 `~/.datadog-agent/supervisord/supervisord.conf`

관리자인 파일이 `<SUP_FILE>`에 있다고 가정합니다.

```bash
sed -i 's/ddagent.py/ddagent.py --sslcheck=0/' <SUP_FILE>
```

Windows 에이전트의 경우 구성 파일 `datadog.conf`을 편집하고 다음 옵션을 추가합니다.

```conf
skip_ssl_validation: yes
```

마지막으로 [에이전트 재시작][2]을 누릅니다.

모든 것이 정상적으로 작동하는지 확인하려면 에서 [인프라스트럭처 개요][4]와 HAProxy 통계를 검토합니다.

## NGINX

[NGINX][8]는 역방향 프록시, 로드 밸런서, 메일 프록시, HTTP 캐시로도 사용할 수 있는 웹 서버입니다. 또한 NGINX를 Datadog 에이전트의 프록시로 사용할 수도 있습니다.

`agent ---> nginx ---> Datadog`

NGINX와 Datadog 간의 통신은 항상 TLS로 암호화됩니다. 프록시와 에이전트가 동일한 호스트에 있다고 가정하기 때문에 에이전트 호스트와 NGINX 호스트 간의 통신은 기본적으로 암호화되지 않습니다. 그러나 동일한 분리된 로컬 네트워크에 없는 경우 TLS 암호화를 사용하여 이 통신을 보안하는 것을 권장합니다.
에이전트와 NGINX 간의 데이터를 암호화하려면 NGINX 호스트에 대한 SAN(주체 대체 이름) 확장명이 있는 x509 인증서를 생성해야 합니다.

**참고**: 다음 명령의 하나를 사용해 Datadog 인증을 다운로드 받으세요.

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

Debian 및 Ubuntu의 인증서 경로는 `/etc/ssl/certs/ca-certificates.crt`, CentOS 및 Red Hat 인증서 경로는 `/etc/ssl/certs/ca-bundle.crt`입니다.

### NGINX를 이용한 프록시 포워딩

#### NGINX 설정

Datadog에 연결된 호스트에 NGINX를 설치해야 합니다. 아직 설정하지 않은 경우 다음 구성 파일 중 하나를 사용할 수 있습니다. 구성은 Datadog 서비스 및 사이트에 따라 다릅니다. [Datadog 사이트][7]을 기준으로 설정을 보려면 우측에 있는 `DATADOG SITE` 선택기를 사용하세요.

**참고**: 에이전트와 NGINX가 동일한 분리된 로컬 네트워크에 속하지 않는 경우 `HTTPS` 구성 파일을 사용하는 것을 권장합니다.

##### HTTP

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# HTTP Proxy for Datadog Agent
http {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3834; #listen for metrics
        access_log off;

        location /api/v1/validate {
            proxy_ssl_verify on;
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_ssl_verify on;
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_ssl_verify on;
            proxy_pass https://haproxy-app.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# Datadog 에이전트용 TCP 프록시
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3835; #listen for traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836; #listen for profiles
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837; #listen for processes
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838; #listen for logs with use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839; #listen for database monitoring metrics
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840; #listen for database monitoring samples
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841; #listen for network devices metadata
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842; #listen for network devices traps
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843; #listen for instrumentations telemetry data
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845; #listen for network devices netflow
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846; #listen for Remote Configuration requests
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
    }
}
```

##### HTTPS


이 설정은 에이전트와 NGINX 간의 통신에 대한 SSL/TLS 암호화를 추가합니다. 프록시 공용 경로를  `<PATH_TO_PROXY_CERTIFICATE>`로, 개인 키 경로를 `<PATH_TO_PROXY_CERTIFICATE_KEY>`로 바꿉니다.

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# HTTP Proxy for Datadog Agent
http {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3834 ssl; #listen for metrics
        access_log off;

        location /api/v1/validate {
            proxy_ssl_verify on;
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_ssl_verify on;
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_ssl_verify on;
            proxy_pass https://haproxy-app.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# Datadog 에이전트용 TCP 프록시
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3835 ssl; #listen for traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836 ssl; #listen for profiles
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837 ssl; #listen for processes
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838 ssl; #listen for logs with use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839 ssl; #listen for database monitoring metrics
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840 ssl; #listen for database monitoring samples
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841 ssl; #listen for network devices metadata
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842 ssl; #listen for network devices traps
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843 ssl; #listen for instrumentations telemetry data
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845 ssl; #listen for network devices netflow
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846 ssl; #listen for Remote Configuration requests
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
    }
}
```

**참고**: 프록시 호스트에서 인증서를 가져올 수 없는 경우 `proxy_ssl_verify on`를 제거할 수 있지만, 이 경우 NGINX에서 Datadog의 수신 인증서를 확인할 수 없습니다.

#### Datadog 에이전트 구성

`dd_url`을 Nginx 주소로 설정해 Nginx를 가리키도록 각 에이전트를 편집합니다(예: `nginx.example.com`).
`dd_url` 설정은 `datadog.yaml` 파일에서 찾을 수 있습니다.

`dd_url: "<SCHEME>://nginx.example.com:3834"`

이전에 HAProxy HTTPS 구성을 선택한 경우 `<SCHEME>`을 `https`로 대체하거나 HTTPS를 선택하지 않은 경우 `http`로 대체합니다.

프록시를 통해 트레이스, 프로필, 프로세스, 로그를 보내려면 `datadog.yaml` 파일에서 다음을 설정합니다.

```yaml
apm_config:
    apm_dd_url: <SCHEME>://nginx.example.com:3835
    profiling_dd_url: <SCHEME>://nginx.example.com:3836/api/v2/profile
    telemetry:
        dd_url: <SCHEME>://nginx.example.com:3843

process_config:
    process_dd_url: <SCHEME>://nginx.example.com:3837

logs_config:
    use_http: true
    logs_dd_url: nginx.example.com:3838
    # 에이전트와 NGINX 간의 암호화를 사용하기 위해 아래 줄에 설명 추가
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: nginx.example.com:3839
        # 에이전트와 NGINX 간의 암호화를 사용하기 위해 아래 줄에 설명 추가
        logs_no_ssl: true
    activity:
        logs_dd_url: nginx.example.com:3839
        # 에이전트와 NGINX 간의 암호화를 사용하기 위해 아래 줄에 설명 추가
        logs_no_ssl: true
    samples:
        logs_dd_url: nginx.example.com:3840
        # 에이전트와 NGINX 간의 암호화를 사용하기 위해 아래 줄에 설명 추가
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: nginx.example.com:3841
        # 에이전트와 NGINX 간의 암호화를 사용하기 위해 아래 줄에 설명 추가
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: nginx.example.com:3842
            # 에이전트와 NGINX 간의 암호화를 사용하기 위해 아래 줄에 설명 추가
            logs_no_ssl: true
    netflow:
        forwarder:
            logs_dd_url: nginx.example.com:3845
            # 에이전트와 NGINX 간의 암호화를 사용하기 위해 아래 줄에 설명 추가
            logs_no_ssl: true

remote_configuration:
    rc_dd_url: nginx.example.com:3846
    # 에이전트와 NGINX 간의 암호화를 사용하기 위해 아래 줄에 설명 추가
    no_tls: true
```


에이전트와 NGINX 간의 암호화를 사용할 때 에이전트가 프록시 인증서에 액세스할 수 없거나, 프록시 인증서의 유효성을 검사할 수 없거나, 유효성 검사가 필요하지 않은 경우 `datadog.yaml` 에이전트 구성 파일을 편집하여 `skip_ssl_validation`을 `true`로 설정할 수 있습니다.
이 옵션을 `true`로 설정하면 에이전트는 인증서 유효성 검사 단계를 건너뛰고 프록시의 ID를 확인하지 않지만 통신은 여전히 SSL/TLS로 암호화됩니다.

```yaml
skip_ssl_validation: true
```

TCP를 통해 로그를 보낼 때는 [로그용 TCP 프록시][9]를 참고하세요.

## Datadog 에이전트

{{< tabs >}}
{{% tab "에이전트 v6 & v7" %}}

**이 기능은 에이전트 v5**에서만 사용할 수 있습니다.

{{% /tab %}}
{{% tab "에이전트 v5" %}}

트래픽을 Datadog으로 전달하려면 실제 프록시(웹 프록시 또는 HAProxy)를 사용하는 것을 권장하나, 이러한 옵션을 사용할 수 없는 경우 **에이전트 v5**의 인스턴스를 프록시 역할로 설정할 수 있습니다.

1. **datadog-agent를 실행하는** 하나의 노드를 프록시로 지정합니다.
    이 예제에서는 프록시 이름을 `proxy-node`로 가정합니다. 이 노드는 **반드시** `https://app.datadoghq.com`에 접근할 수 있어야 합니다.

2. `proxy-node`에서 SSL 연결 확인:

    ```shell
    curl -v https://app.datadoghq.com/account/login 2>&1 | grep "200 OK"
    ```

3. `datadog.conf`에서 다음 행을 변경하여 `proxy-node`에 로컬이 아닌 트래픽을 켜도록 허용합니다.
     `# non_local_traffic: no`는 `non_local_traffic: yes`를 읽을 수 있어야 합니다.

4. `proxy-node`가 포트 17123을 통해 다른 노드에서 연결할 수 있는지 확인합니다. `proxy-node`에서 에이전트를 시작하고 다른 노드에서 실행합니다.

    `curl -v http://proxy-node:17123/status 2>&1 | grep "200 OK"`

5. 프록시가 아닌 노드를 `proxy-node`로 전달하도록 업데이트합니다. `datadog.conf`에서 다음 줄을 다음에서 변경합니다.

    `dd_url: https://app.datadoghq.com`
   에서
    `dd_url: http://proxy-node:17123`으로 변경

6. [인프라스트럭처 페이지][1]에서 모든 노드가 데이터를 Datadog에 보고하는지 확인합니다.


[1]: https://app.datadoghq.com/infrastructure#overview
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/agent/configuration/agent-fips-proxy
[2]: /ko/agent/configuration/agent-commands/
[3]: http://www.squid-cache.org/
[4]: https://app.datadoghq.com/infrastructure
[5]: http://haproxy.1wt.eu
[6]: https://www.haproxy.com/blog/haproxy-ssl-termination/
[7]: /ko/getting_started/site/
[8]: https://www.nginx.com
[9]: /ko/agent/logs/proxy
