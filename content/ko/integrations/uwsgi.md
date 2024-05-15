---
categories:
- 로그 수집
- 웹
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/uwsgi.md
description: 초, 제공된 바이트, 요청 상태 등에 따라 요청을 추적하려면 uWSGI 로그를 수집하세요.
doc_link: /integrations/uwsgi/
git_integration_title: uwsgi
has_logo: true
integration_id: uwsgi
integration_title: uWSGI
is_public: true
kind: 통합
name: uwsgi
public_title: Datadog-uWSGI 통합
short_description: 초, 제공된 바이트, 요청 상태 등에 따라 요청을 추적하려면 로그를 수집하세요.
supported_os:
- 리눅스
- mac_os
- windows
title: uWSGI
---

## 개요

초, 제공된 바이트, 요청 상태(2xx, 3xx, 4xx, 5xx), 서비스 가동 시간, 지연 등에 따라 요청을 추적하려면 uWSGI 로그를 수집하세요.

## 설정

### 설치

uWSGI 서버에 실행되는 인스턴스에 [에이전트를 설치하세요][1].

### 설정

기본적으로 [Install the agent][1] 서버는 stdout에 로깅됩니다. 다음 명령어를 실행해 파일에 로깅하거나 [uWSGI 지침에 따라 파일에 로깅하세요][2].

```text
uwsgi --socket :3031 --logger file:logfile=/var/log/uwsgi/uwsgi.log,maxsize=2000000
```

에이전트 설정 디렉터리 루트에 `uwsgi.d/conf.yaml` 파일을 생성합니다.

#### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 사용하도록 설정합니다:

```yaml
logs_enabled: true
```

그런 다음 이 설정 블록을 `uwsgi.d/conf.yaml` 파일에 추가해 로그 수집을 시작합니다.

```yaml
logs:
    - type: file
      path: /var/log/uwsgi/uwsgi.log
      service: '<MY_APPLICATION>'
      source: uwsgi
```

마지막으로 [에이전트를 재시작][3]합니다.

기본적으로 Datadog-uWSGI 통합은 [기본 uWSGI 로그 형식][4] 및 [Apache와 같은 결합 형식][5]을 지원합니다.

## 문제 해결

도움이 필요하세요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://uwsgi-docs.readthedocs.io/en/latest/Logging.html#logging-to-files
[3]: /ko/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: https://uwsgi-docs.readthedocs.io/en/latest/LogFormat.html#uwsgi-default-logging
[5]: https://uwsgi-docs.readthedocs.io/en/latest/LogFormat.html#apache-style-combined-request-logging
[6]: /ko/help/