---
aliases:
- /ko/logs/log_collection/adobe_experience_manager
categories:
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/adobe_experience_manager.md
description: Adobe Experience Manager 로그를 수집하여 오류를 추적하고, 응답 시간을 요청하며, 성능이 저하된 웹 페이지를
  추적합니다.
doc_link: /integrations/adobe_experience_manager/
further_reading:
- link: logs/
  tag: 설명서
  text: 로그 관리
has_logo: true
integration_id: adobe
integration_title: Adobe Experience Manager
is_public: true
name: adobe_experience_manager
public_title: Datadog-Adobe Experience Manager
short_description: 오류 추적, 응답 시간 요청 등을 위해 로그를 수집합니다.
supported_os:
- linux
- mac_os
- 윈도우즈(Windows)
title: Adobe Experience Manager
---

## 개요

Adobe Experience Manager 로그를 수집하여 오류를 추적하고, 응답 시간을 요청하며, 성능이 저하된 웹 페이지를 추적합니다.

## 설정

### 설치

Adobe Experience Manager를 실행하는 인스턴스에 [Agent를 설치][1]합니다.

#### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog Agent에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 사용하도록 설정합니다.

    ```yaml
    logs_enabled: true
    ```

2. [conf.d 디렉터리][2]에 `adobe.experience.manager.d/conf.yaml`을 만들고 아래 설정을 추가하여 로그 수집을 시작하세요.

    ```yaml
    logs:
        - type: file
          path: cq-installation-dir/crx-quickstart/logs/*.log
          service: '<MY_APPLICATION>'
          source: adobe.experience.manager
    ```

      `path` 및 `service` 파라미터 값을 변경하고 사용자 환경에 맞게 구성합니다.

3. [에이전트를 다시 시작합니다][3].

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ko/agent/guide/agent-commands/#restart-the-agent
[4]: /ko/help/