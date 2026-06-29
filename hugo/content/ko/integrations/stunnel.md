---
categories:
- log collection
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/stunnel.md
description: Stunnel 프록시에서 로그를 수집하여 Datadog으로 전송하세요.
has_logo: true
integration_id: stunnel
integration_title: Stunnel
is_public: true
custom_kind: integration
name: Stunnel
public_title: Datadog-Stunnel 통합
short_description: Stunnel 프록시에서 로그를 수집하여 Datadog으로 전송하세요.
---

## 개요

Stunnel은 프로그램 코드를 변경하지 않고 기존 클라이언트 및 서버에 TLS 암호화 기능을 추가하도록 설계된 프록시입니다.

Datadog - Stunnel 프록시 통합을 사용하여 잠재적인 네트워크 문제 또는 DDoS 공격을 모니터링하세요.

## 설정

### 설치

Stunnel을 실행하는 서버에 [Datadog Agent를 설치][1]해야 합니다.

### 설정

Stunnel 프록시 로그 수집을 시작하려면 [Agent 설정 디렉터리][2] 루트에 있는 `conf.d/` 폴더에서`stunnel.d/conf.yaml` 파일을 만드세요.

#### 로그 수집

_Agent 버전 v6.0 이상에서 사용 가능_

1. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

    ```yaml
    logs_enabled: true
    ```

2. Stunnel 로그 수집을 시작하려면 `stunnel.d/conf.yaml` 파일에 다음 설정 블록을 추가하세요.

    ```yaml
    logs:
        - type: file
          path: /var/log/stunnel.log
          source: stunnel
          service: '<MY_SERVICE>'
          sourcecategory: proxy
    ```

   `path` 및 `service` 파라미터 값을 변경하고 환경에 맞게 설정합니다.

3. [Agent를 다시 시작합니다][3].

### 검증

[Agent의 `status` 하위 명령을 실행][4]하고  Checks 섹션에서 `stunnel`을 찾으세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ko/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: /ko/agent/guide/agent-commands/#agent-status-and-information