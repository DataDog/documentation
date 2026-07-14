---
algolia:
  tags:
  - agent proxy
aliases:
- /ko/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
- /ko/agent/proxy
description: 인증 및 우회 옵션을 사용하여 HTTP/HTTPS 프록시를 통해 트래픽을 전송하도록 Datadog Agent를 구성합니다.
further_reading:
- link: /logs/
  tag: 설명서
  text: 로그 수집
- link: /infrastructure/process/
  tag: 설명서
  text: 프로세스 수집
- link: /tracing/
  tag: 설명서
  text: 트레이스 및 프로파일 수집
- link: /agent/configuration/fips-compliance
  tag: 설명서
  text: Datadog FIPS 규정 준수
title: Datadog Agent 프록시 구성
---
Datadog Agent가 HTTP/HTTPS 프록시를 통해 트래픽을 전송하도록 구성할 수 있습니다. 프록시는 일반적으로 공용 인터넷에 직접 연결되지 않은 호스트에서 트래픽을 전송하는 데 사용됩니다.

## Datadog Agent 구성 {#configure-the-datadog-agent}

Datadog Agent가 프록시를 사용하도록 구성하는 방법은 두 가지입니다.
- Agent 구성 파일을 사용할 수 있습니다.
- 환경 변수를 사용할 수 있습니다. 환경 변수는 구성 파일 설정을 재정의합니다.

### 구성 파일 {#configuration-file}

구성 파일을 사용하여 프록시를 설정하려면 기본 Agent 구성 파일(`datadog.yaml`)에서 `proxy` 섹션을 편집하거나 추가한 후 [Datadog Agent를 다시 시작][1]합니다.

```yaml
proxy:
  # Required: Proxy endpoint for HTTP connections
  http: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>
  # Required: Proxy endpoint for HTTPS connections (most Datadog traffic)
  https: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>

  # Optional: List of hosts or CIDR ranges to bypass the proxy
  # Example:
  # no_proxy:
  #   - 192.168.0.0/24
  #   - localhost
  #   - .myinternaldomain.com
  no_proxy:
    - <HOST_TO_BYPASS_1>
    - <HOST_TO_BYPASS_2>

# Recommended: Set to true to ensure no_proxy behaves in a standard way
no_proxy_nonexact_match: true

# Recommended: Force the Agent to use HTTP to send logs (if logs is enabled)
logs_config:
  force_use_http: true
```

* `<USER>`, `<PASSWORD>`, `<PROXY_HOST>`, `<PROXY_PORT>`를 프록시 자격 증명 및 주소로 바꾸세요.
* 사용자 이름과 비밀번호는 선택 사항입니다.
* 프록시 구성 및 요구 사항에 따라 `http`, `https` 또는 둘 다를 지정하세요. 대부분의 Datadog 트래픽은 HTTPS를 사용합니다.
* `no_proxy`을 사용하여 Agent가 프록시를 우회하고 직접 연결해야 하는 호스트를 지정할 수 있습니다.
* **변경 사항을 적용하려면 [Datadog Agent를 다시 시작][1]하세요.**

운영 체제별 구성 파일 위치에 대한 자세한 내용은 [Agent 구성 파일][2]을 참조하세요.

### 환경 변수 {#environment-variables}

또는 다음 환경 변수를 설정하여 프록시를 구성할 수 있습니다. 구성이 완료되면 [Datadog Agent를 다시 시작][1]하세요.

```bash
DD_PROXY_HTTP="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"
DD_PROXY_HTTPS="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"

DD_PROXY_NO_PROXY="<HOST_TO_BYPASS_1> <HOST_TO_BYPASS_2>"
DD_NO_PROXY_NONEXACT_MATCH=true

DD_LOGS_CONFIG_FORCE_USE_HTTP=true
```

## 프록시 서버 구성 예시 {#proxy-server-setup-examples}

기존 프록시 서버가 없는 경우 Datadog은 **Squid**와 같은 HTTP 프록시 사용을 권장합니다.

1. **Squid(권장)**: 모든 아웃바운드 HTTP/HTTPS Agent 트래픽을 투명하게 프록시하여 구성을 단순화하는 강력한 HTTP/HTTPS 프록시입니다. [Squid 프록시 사용][3].
2. **HAProxy(권장하지 않음)**: Datadog으로 트래픽을 전달할 수 있지만 Datadog 도메인 목록을 최신 상태로 유지해야 하므로 관리가 더 복잡합니다. [HAProxy 예시 설정 보기][4].
3. **NGINX(권장하지 않음)**: HAProxy와 유사하게 Datadog으로 트래픽을 전달하기 위해 NGINX를 사용하는 것은 도메인 목록을 최신 상태로 유지해야 하는 관리 부담 때문에 권장되지 않습니다. [NGINX 예시 설정 보기][5].

Datadog은 HAProxy 또는 NGINX와 같은 소프트웨어를 사용하여 트래픽을 전달하는 것을 권장하지 않습니다. Agent가 연결해야 하는 Datadog 엔드포인트 목록을 수동으로 구성하고 유지 관리해야 하기 때문입니다. 이 목록은 변경될 수 있으며, 최신 상태로 유지하지 않으면 데이터 손실이 발생할 수 있습니다. 유일한 예외는 DPI(Deep Packet Inspection)가 필요한 경우입니다. 이 경우 HAProxy 또는 NGINX를 사용하여 TLS를 비활성화하거나 자체 TLS 인증서를 사용하고 트래픽을 검사할 수 있습니다.

## 확인 {#verification}

Agent를 다시 시작한 후 Agent 상태 명령과 Agent 로그(`agent.log`, `trace-agent.log` 등)를 확인하여 연결 오류가 없는지 검토하세요.

## FIPS 프록시(US1-FED) {#fips-proxy-us1-fed}

Datadog Agent와 함께 Datadog Agent FIPS Proxy를 설정하는 방법은 [Datadog FIPS 규정 준수][6]를 참조하세요. FIPS 프록시는 US1-FED 리전에서만 사용할 수 있습니다. Datadog Agent FIPS Proxy는 일반 프록시와 함께 사용할 수 없습니다.

## 추가 자료{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/agent-commands/#restart-the-agent
[2]: /ko/agent/configuration/agent-configuration-files/#main-configuration-file
[3]: /ko/agent/configuration/proxy_squid/
[4]: /ko/agent/faq/proxy_example_haproxy/
[5]: /ko/agent/faq/proxy_example_nginx/
[6]: /ko/agent/configuration/fips-compliance/