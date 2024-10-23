---
further_reading:
- link: /logs/
  tag: 설명서
  text: \u0008로그를 수집하세요
- link: /infrastructure/process/
  tag: 설명서
  text: 프로세스를 수집하세요
- link: /tracing/
  tag: 설명서
  text: Collect your traces
title: 로그를 위한 TCP Agent 프록시
---

## 개요

로그 수집에는 Datadog Agent 버전 6.0 이상이 필요합니다. 이전 버전의 Agent에는 `log collection` 인터페이스가 포함되어 있지 않습니다.

Datadog은 Agent v6.14/v7.14부터 **HTTPS** 전송을 사용할 것을 권장합니다([로그용 에이전트 전송][1] 참조).
로그에 대해 HTTPS 전송을 사용하는 경우 [에이전트 프록시 설명서][2]를 참조하여 다른 데이터 유형과 동일한 프록시 설정 세트를 사용하세요.

{{< tabs >}}
{{% tab "TCP" %}}

TCP 전송에 프록시를 사용하는 경우 `datadog.yaml` 설정 파일에서 다음 파라미터를 사용하여 TCP를 통해 로그를 프록시로 보내도록 Datadog Agent를 설정합니다:

```yaml
logs_config:
  logs_dd_url: "<PROXY_ENDPOINT>:<PROXY_PORT>"
  logs_no_ssl: true
```

위의 파라미터는 다음과 같은 환경 변수로 설정할 수도 있습니다:

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**참고**: Agent가 SSL 인증서 ({{< region-param key="tcp_endpoint" code="true" >}})의 호스트 이름과 프록시 호스트 이름 간의 불일치를 무시하도록 하려면 파라미터 `logs_no_ssl`가 필요합니다. 프록시와 Datadog 인테이크 엔드포인트 사이에는 SSL 암호화된 연결을 사용할 것을 권장합니다.

* 그런 다음 `<PROXY_PORT>`에서 수신 대기하고 수신한 로그를 전달하도록 프록시를 설정합니다. {{< region-param key="dd_site" code="true" >}}에 대해 {{< region-param key="tcp_endpoint_port" code="true" >}} 포트에서 {{< region-param key="tcp_endpoint" code="true" >}}를 사용하고 SSL 암호화를 활성화합니다.

* 다음 명령을 사용하여 SSL 암호화를 위한 TLS 암호화용 `CA certificates`를 다운로드합니다:
  - `sudo apt-get install ca-certificates` (Debian, Ubuntu)
  - `yum install ca-certificates` (CentOS, Redhat)

  그리고 `/etc/ssl/certs/ca-certificates.crt` (Debian, Ubuntu) 또는 `/etc/ssl/certs/ca-bundle.crt` (CentOS, Redhat)에 위치한 인증서 파일을 사용합니다.

{{% /tab %}}
{{% tab "SOCKS5" %}}

SOCKS5 프록시 서버와 함께 로그를 Datadog 계정으로 보내려면 `datadog.yaml` 설정 파일에서 다음 설정을 사용합니다:

```yaml
logs_config:
  socks5_proxy_address: "<MY_SOCKS5_PROXY_URL>:<MY_SOCKS5_PROXY_PORT>"
```

위의 파라미터는 다음과 같은 환경 변수로 설정할 수도 있습니다:

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{< /tabs >}}

## TCP 프록시의 예시

{{< tabs >}}
{{% tab "HAProxy" %}}
### 로그에 대한 TCP 프록시로 HAProxy 사용

이 예제에서는 HAProxy가 설치되어 있고, 포트 `10514`에서 수신 대기 중인 서버에 TCP로 로그를 전송한 다음 로그를 Datadog으로 전달하도록 Datadog Agent를 구성하는 방법을 설명합니다.

`agent ---> haproxy ---> Datadog`

Agent와 HAProxy 사이에는 암호화가 비활성화되어 있으며, 데이터를 Datadog으로 전송하기 전에 암호화하도록 구성됩니다.

#### Agent 설정

`datadog.yaml` Agent 설정 파일을 편집하고 `logs_no_ssl`를 `true`로 설정합니다. 이는 HAProxy가 트래픽을 전달하지 않으며, Datadog 백엔드가 아니므로 동일한 인증서를 사용할 수 없기 때문입니다.

**참고**: HAProxy가 데이터를 암호화하도록 설정되어 있으므로 `logs_no_ssl`가 true로 설정될 수 있습니다. 그렇지 않은 경우 이 파라미터를 `true`로 설정하지 마세요.

```
logs_config:
  force_use_tcp: true
  logs_dd_url: "<PROXY_SERVER_DOMAIN>:10514"
  logs_no_ssl: true
```

#### HAProxy 설정

HAProxy를 Datadog과 연결된 호스트에 설치해야 합니다. 아직 설정하지 않았다면 다음 설정 파일을 사용하세요.

{{% site-region region="us" %}}

```conf
# 기본 설정
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy
# 몇 가지 정상 기본값
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s
# 포트 3833에서 HAProxy 통계에 대한 보기를 선언합니다.
# 이 페이지를 보기 위해 자격 증명이 필요하지 않으며
# 설정이 끝나면 종료할 수 있습니다.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /
# 이 섹션에서 DNS 레코드를 다시 로드합니다.
# <DNS_SERVER_IP>과<DNS_SECONDARY_SERVER_IP>를 DNS 서버 IP 주소로 교체하세요.
# HAProxy 1.8 이상인 경우
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s
# Agents가 로그 전송을 위해 연결되는
# 엔드포인트를 선언합니다. (예: "logs.config.logs_dd_url"의 값)
frontend logs_frontend
    bind *:10514
    mode tcp
    option tcplog
    default_backend datadog-logs
# Datadog 서버입니다. 실제로 위에 정의된 포워더 프런트엔드로 들어오는
# 모든 TCP 요청은
# Datadog의 퍼블릭 엔드포인트로 프록시됩니다.
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

**참고**: 다음 명령을 사용하여 인증서를 다운로드합니다.

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

성공적으로 다운로드되었다면, CentOS, Redhat용 `/etc/ssl/certs/ca-bundle.crt`에서 찾을 수 있습니다.

HAProxy 설정이 완료되면 다시 로드하거나 HAProxy를 다시 시작할 수 있습니다. `app.datadoghq.com`가 다른 IP로 실패할 경우 HAProxy의 DNS 캐시를 강제로 새로 고침하기 위해 **10분마다 HAProxy를 다시 로드하는 `cron` 작업을 수행할 것을 권장합니다(예를 들어, `service haproxy reload`)**.

{{% /site-region %}}
{{% site-region region="eu" %}}

```conf
# 기본 설정
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy
# 몇 가지 정상 기본값
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s
# 포트 3833에서 HAProxy 통계에 대한 보기를 선언합니다.
# 이 페이지를 보기 위해 자격 증명이 필요하지 않으며
# 설정이 끝나면 종료해도 됩니다.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /
# 이 섹션에서 DNS 레코드를 다시 로드합니다.
# <DNS_SERVER_IP>과 <DNS_SECONDARY_SERVER_IP>를 DNS 서버 IP 주소로 교체하세요.
# HAProxy 1.8 이상인 경우
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s
# 로그 전송을 위해 Agents가 연결되는
# 엔드포인트를 선언합니다. (예: "logs.config.logs_dd_url"의 값)
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs
# Datadog server입니다. 위에 정의된 포워더 프론트엔드로
# 들어오는 모든 TCP 요청은
# Datadog의 퍼블릭 엔드포인트로 프록시됩니다.
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-bundle.crt check port 443
```

다음 명령을 사용하여 인증서를 다운로드합니다:

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

성공적으로 다운로드되었다면, CentOS, Redhat용 `/etc/ssl/certs/ca-bundle.crt`에서 확인할 수 있습니다.

HAProxy 설정이 완료되면 다시 로드하거나 HAProxy를 다시 시작할 수 있습니다. `app.datadoghq.eu`가 다른 IP로 실패할 경우 HAProxy의 DNS 캐시를 강제로 새로 고침하기 위해 **10분마다 HAProxy를 다시 로드하는 `cron`작업을 수행하는 것을 권장합니다(예를 들어, `service haproxy reload`)**.

{{% /site-region %}}

{{% /tab %}}

{{% tab "NGINX" %}}
### 로그에 대한 TCP 프록시로 NGINX 사용

#### Agent 설정

`datadog.yaml` Agent 설정 파일을 편집하고 `logs_config.logs_dd_url`을 설정하여 Datadog과 직접 연결을 설정하는 대신 새로 생성된 프록시를 사용하도록 합니다.

```yaml
logs_config:
  force_use_tcp: true
  logs_dd_url: myProxyServer.myDomain:10514
```

**참고**: NGINX는 트래픽을 Datadog에 전달하고 트래픽을 해독하거나 암호화하지 않으므로 `logs_no_ssl` 파라미터를 변경하지 마세요.

#### NGINX 설정

이 예제에서는 Agent 트래픽을 Datadog으로 프록시하는 데 `nginx.conf`를 사용합니다. 이 설정의 마지막 서버 블록은 TLS 래핑을 수행하여 프록시와 Datadog의 로그 수집 API 엔드포인트 간에 내부 일반 텍스트 로그가 암호화되도록 합니다:

{{% site-region region="us" %}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
events {
    worker_connections 1024;
}
# Datadog Agent용 TCP 프록시
stream {
    server {
        listen 10514; #listen for logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.com:10516;
    }
}
```

{{% /site-region %}}
{{% site-region region="eu" %}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
events {
    worker_connections 1024;
}
# Datadog Agent에 대한 TCP Proxy
stream {
    server {
        listen 10514; #로그에 대한 수신
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.eu:443;
    }
}
```

{{% /site-region %}}
{{% /tab %}}
{{< /tabs >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/logs/log_transport?tab=https
[2]: /ko/agent/configuration/proxy/
