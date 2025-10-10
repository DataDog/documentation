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

{{% site-region region="us3,eu,us5,gov,ap1,ap2" %}}
<div class="alert alert-danger">
    < region-param key="dd_site_name" > }} 사이트에서는 TCP를 사용할 수 없습니다. 자세한 내용은 <a href="/도움/도움말/">지원팀에</a> 문의하세요.
</div>
{{% /site-region %}}

{{% site-region region="us" %}}
## 개요

로그 수집에는 Datadog 에이전트 v6.0 이상이 필요합니다. 이전 버전의 에이전트에는 `log collection` 인터페이스가 포함되어 있지 않습니다.

에이전트 v6.14/v7.14부터 Datadog에서는 **HTTPS** 전송을 사용하고 시행할 것을 권장합니다([에이전트 로그 전송][1] 참조).
로그에 HTTPS 전송을 사용하는 경우 [에이전트 프록시 설명서][2]를 참조하고 다른 데이터 유형과 동일한 프록시 설정 세트를 사용하세요.

{{< tabs >}}
{{% tab "TCP" %}}

TCP 전송을 위해 프록시를 사용하는 경우, Datadog 에이전트를 설정하여 `datadog.yaml` 설정 파일에서 다음 파라미터를 사용하여 TCP를 통해 프록시에 로그를 전송합니다.

```yaml
logs_config:
  logs_dd_url: "<PROXY_ENDPOINT>:<PROXY_PORT>"
  logs_no_ssl: true
```

위의 파라미터는 다음 환경 변수를 사용하여 설정할 수도 있습니다.

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**참고**: 파라미터 `logs_no_ssl`는 에이전트가 SSL 인증서({{< region-param key="tcp_endpoint" code="true" >}})의 호스트 이름과 귀하의 프록시 호스트 이름 간의 불일치를 무시하도록 하는 데 필요합니다. 프록시와 Datadog 수집 엔드포인트 간에 SSL 암호화된 연결을 사용하는 것을 권장합니다.

* 그런 다음 프록시를 설정하여  `<PROXY_PORT>`를 수신하고 수신한 로그를 전달합니다. {{< region-param key="dd_site" code="true" >}}의 경우 {{< region-param key="tcp_endpoint_port" code="true" >}} 포트의 {{< region-param key="tcp_endpoint" code="true" >}}를 사용해 SSL 암호화를 활성화합니다.

* 다음 명령을 사용하여 SSL 암호화를 위한 TLS 암호화용 `CA certificates`를 다운로드합니다.
  - `sudo apt-get install ca-certificates` (Debian, Ubuntu)
  - `yum install ca-certificates` (CentOS, Redhat)

  `/etc/ssl/certs/ca-certificates.crt`(데비안(Debian), 우분투(Ubuntu)) 또는 `/etc/ssl/certs/ca-bundle.crt`(CentOS, Redhat)에 있는 인증서 파일을 사용합니다.

{{% /tab %}}
{{% tab "SOCKS5" %}}

SOCKS5 프록시 서버를 사용해 로그를 Datadog 계정으로 보내려면 `datadog.yaml` 설정 파일에서 다음 설정을 사용합니다.

```yaml
logs_config:
  socks5_proxy_address: "<MY_SOCKS5_PROXY_URL>:<MY_SOCKS5_PROXY_PORT>"
```

위의 파라미터는 다음 환경 변수를 사용하여 설정할 수도 있습니다.

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{< /tabs >}}

## TCP 프록시 예시

{{< tabs >}}
{{% tab "HAProxy" %}}
### 로그를 위해 TCP 프록시를 HAProxy로 사용하기 

이 예제에서는 Datadog 에이전트를 설정해 HAProxy가 설치되어 있고 포트 `10514` 에서 수신 대기 중인 서버로 TCP 로그를 전달하는 방법을 설명합니다.

`agent ---> haproxy ---> Datadog`

Datadog로 전송하기 전에 데이터를 암호화하도록 설정한 에이전트와 HAProxy 간에 암호화가 비활성화됩니다.

#### 에이전트 구성

`datadog.yaml` 에이전트 설정 파일을 편집하고 `logs_no_ssl`를 `true`로 설정합니다. 이는 HAProxy에서 트래픽을 전달하지 않고 Datadog 백엔드와 일치하지 않으므로 동일한 인증서를 사용할 수 없기 때문에 필요합니다.

**참고**: HAProxy가 데이터를 암호화하도록 설정되어 있기 때문에 `logs_no_ssl`이 true로 설정될 수 있습니다. 그렇지 않으면 파라미터를 `true`로 설정하지 마세요.

```
logs_config:
  force_use_tcp: true
  logs_dd_url: "<PROXY_SERVER_DOMAIN>:10514"
  logs_no_ssl: true
```

#### HAProxy 설정

Datadog에 연결할 수 있는 호스트에 HAProxy를 설치해야 합니다. 아직 설정하지 않은 경우 다음 설정 파일을 사용하세요.

{{% site-region region="us" %}}

```conf
# 기본 설정
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy
# 일부 정상 기본값
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s
# 이는 3833 포트에서 HAProxy 통계에 대한 보기를 정의합니다.
# ㅇ이 페이지를 보는 데 자격 증명이 필요하지 않습니다. 설정이 완료되면
# 끌 수 있습니다.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /
# 이 섹션은 DNS 레코드를 다시 로드하기 위한 것입니다.
# Replacewith your DNS 서버 IP 주소로 <DNS_SERVER_IP> 및 <DNS_SECONDARY_SERVER_IP>를 대체합니다.
# HAProxy 1.8 이상의 경우
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s
# 에이전트가 로그 전송을 위해 연결하는 엔드포인트를 정의합니다.
# (예: "logs.config.logs_dd_url" 값)
frontend logs_frontend
    bind *:10514
    mode tcp
    option tcplog
    default_backend datadog-logs
# Datadog 서버입니다. 위에 정의된 포워더 프런트엔드에 수신되는 모든 TCP 요청은ㄴ
# Datadog 공개 엔드포인트로
# 대체됩니다.
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

**참고**: 다음 명령을 사용하여 인증서를 다운로드합니다.

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

성공하면 파일은 CentOS, Redhat의 경우 `/etc/ssl/certs/ca-bundle.crt`에 있습니다.

HAProxy 설정이 존재하는 경우 다시 로드하거나 HAProxy를 다시 시작할 수 있습니다. **`app.datadoghq.com`이 다른 IP로 페일오버될 경우를 대비하여 10분마다 HAProxy를 다시 로드하는 `cron` 작업**(예: `service haproxy reload`)을 수행하여 HAProxy의 DNS 캐시를 강제로 새로 고치는 것이 좋습니다.

{{% /site-region %}}
{{% site-region region="eu" %}}

```conf
# 기본 설정
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy
# 일부 정상 기본값
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s
# 이는 3833 포트에서 HAProxy 통계에 대한 보기를 정의합니다.
# 이 페이지를 보기 위해 자격 증명이 필요하지 않습니다. 설정이 완료되면
# 끌 수 있습니다.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /
# 이 섹션은 DNS 레코드를 다시 로드합니다.
# DNS 서버 IP 주소를 사용해 <DNS_SERVER_IP> 및 <DNS_SECONDARY_SERVER_IP>를 대체합니다.
# HAProxy 1.8 이상의 경우
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s
# 로그 전송을 위해 에이전트가 연결하는 엔드포인트를 정의합니다.
# (예: "logs.config.logs_dd_url" 값)
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs
# Datadog 서버입니다. 실제로 위에 정의된 포워더 프런트엔드로 수신되는
# 모든 TCP 요청은
# Datadog 공개 엔드포인트로 대체됩니다.
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-bundle.crt check port 443
```

다음 명령을 사용하여 인증서를 다운로드합니다.

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

성공하면 파일은 CentOS, Redhat의 경우 `/etc/ssl/certs/ca-bundle.crt`에 있습니다.

HAProxy 설정이 있는 경우 HAProxy를 다시 로그하거나 시작할 수 있습니다. **`app.datadoghq.eu`이 다른 IP로 페일오버될 경우를 대비하여 10분마다 HAProxy를 다시 로드하는 `cron` 작업**(예: `service haproxy reload`)을 통해 HAProxy의 DNS 캐시를 강제로 새로 고치는 것이 좋습니다.

{{% /site-region %}}

{{% /tab %}}

{{% tab "NGINX" %}}
### 로그를 위해 TCP 프록시로 NGINX 사용하기

#### 에이전트 구성

`datadog.yaml` 에이전트 설정 파일을 편집하고 `logs_config.logs_dd_url`을 Datadog와 직접 연결하는 대신 새로 만든 프록시를 사용하도록 설정합니다.

```yaml
logs_config:
  force_use_tcp: true
  logs_dd_url: myProxyServer.myDomain:10514
```

**참고**: NGINX는 트래픽을 Datadog 로 전달하고 트래픽을 복호화하거나 암호화하지 않으므로 `logs_no_ssl` 파라미터를 변경하지 마세요.

#### NGINX 설정

이 예제에서 `nginx.conf`는 프록시 에이전트 트래픽을 Datadog로 보내는 데 사용할 수 있습니다. 이 설정의 마지막 서버 블록은 내부 일반 텍스트 로그가 프록시와 Datadog 로그를 남기고 API 엔드포인트 사이에 암호화되도록 TLS 래핑을 수행합니다.

{{% site-region region="us" %}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
events {
    worker_connections 1024;
}
# Datadog 에이전트 TCP 프록시
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
# Datadog 에이전트에 대한 TCP 프록시
stream {
    server {
        listen 10514; #listen for logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.eu:443;
    }
}
```

{{% /site-region %}}
{{% /tab %}}
{{< /tabs >}}
{{% /site-region %}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/logs/log_transport?tab=https
[2]: /ko/agent/configuration/proxy/