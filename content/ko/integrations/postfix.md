---
app_id: postfix
app_uuid: 76293d0a-1cde-4f25-ae72-c3e6ef352273
assets:
  dashboards:
    postfix: assets/dashboards/postfix_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: postfix.queue.size
      metadata_path: metadata.csv
      prefix: postfix.
    process_signatures:
    - postfix start
    - sendmail -bd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 66
    source_type_name: Postfix
  saved_views:
    postfix_processes: assets/saved_views/postfix_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/postfix/README.md
display_on_public_website: true
draft: false
git_integration_title: postfix
integration_id: postfix
integration_title: Postfix
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: postfix
public_title: Postfix
short_description: Postfix 대기열 규모 모니터링하기
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Postfix 대기열 규모 모니터링하기
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-postfix-queues
  support: README.md#Support
  title: Postfix
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Postfix 그래프][1]

## 개요

이 점검은 Postfix 대기열의 크기를 모니터링합니다.

## 설정

### 설치

Postfix 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있으므로 Postfix 서버에 추가 설치할 필요가 없습니다.

### 구성

이 점검을 구성해 `find` 명령을 사용할 수 있습니다. 그러려면 `dd-agent`에 `sudo` 액세스를 부여해 `incoming`, `active`, `deferred` 메일 대기열의 메시지 수를 얻을 수 있습니다.

(선택 사항) 에이전트를 구성해 내장된 `postqueue -p` 명령을 사용해 `active`, `hold`, `deferred` 메일 대기열의 메시지 수를 얻을 수 있습니다. `postqueue`의 경우 `sudo` 권한 없이 설정 그룹 ID 권한으로 실행됩니다.

**경고**: `postqueue`를 사용해 메일 대기열을 모니터링하면 `incoming` 대기열의 메시지 수를 보고하지 않습니다.

#### 메트릭 수집

##### sudo 사용

1. [에이전트 설정 디렉터리][3] 루트에 있는 `conf.d/` 폴더에서 `postfix.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 옵션은 [샘플 postfix.d/conf.yaml][4]을 참고하세요.

   ```yaml
   init_config:
     ## @param postfix_user - string - required
     ## The user running dd-agent must have passwordless sudo access for the find
     ## command to run the postfix check.  Here's an example:
     ## example /etc/sudoers entry:
     ##   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/incoming -type f
     ##
     ## Redhat/CentOS/Amazon Linux flavours need to add:
     ##          Defaults:dd-agent !requiretty
     #
     postfix_user: postfix

   instances:
     ## @param directory - string - optional - default: /var/spool/postfix
     ## Path to the postfix directory. The directory option is required if `postqueue: false` is set. For more 
     ## information see https://docs.datadoghq.com/integrations/postfix/#using-sudo.
     #
     - directory: /var/spool/postfix

       ## @param queues - list of string - required
       ## List of queues to monitor.
       #
       queues:
         - incoming
         - active
         - deferred
   ```

2. `queues`에 있는 각 메일 대기열에 대해 에이전트가 디렉터리에서 `find`를 분기합니다. 이를 위해 Postfix 사용자의 권한으로 `sudo`를 사용하기 때문에 에이전트 사용자 `dd-agent`에 다음 `/etc/sudoers` 줄을 추가해야 합니다. 이 경우 Postfix가 `postfix`로 실행된다고 추정합니다.

   ```text
   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/incoming -type f
   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/active -type f
   dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/deferred -type f
   ```

3. [Agent를 재시작합니다][5]

##### postqueue 사용

1. [에이전트 설정 디렉터리][3]의 루트에 있는 `conf.d/` 폴더에서 `postfix.d/conf.yaml` 파일을 편집합니다.

   ```yaml
   init_config:
     ## @param postqueue - boolean - optional - default: false
     ## Set `postqueue: true` to gather mail queue counts using `postqueue -p`
     ## without the use of sudo. Postqueue binary is ran with set-group ID privileges,
     ## so that it can connect to Postfix daemon processes.
     ## Only `tags` keys are used from `instances` definition.
     ## Postfix has internal access controls that limit activities on the mail queue.
     ## By default, Postfix allows `anyone` to view the queue. On production systems
     ## where the Postfix installation may be configured with stricter access controls,
     ## you may need to grant the dd-agent user access to view the mail queue.
     ##
     ## postconf -e "authorized_mailq_users = dd-agent"
     ##
     ## http://www.postfix.org/postqueue.1.html
     ##
     ## authorized_mailq_users (static:anyone)
     ## List of users who are authorized to view the queue.
     #
     postqueue: true

   instances:
     ## @param config_directory - string - optional
     ## The config_directory option only applies when `postqueue: true`.
     ## The config_directory is the location of the Postfix configuration directory
     ## where main.cf lives.
     #
     - config_directory: /etc/postfix

       ## @param queues - list of string - required
       ## List of queues to monitor.
       #
       queues:
         - incoming
         - active
         - deferred
   ```

2. `instances`에 있는 각 `config_directory`에 대해 에이전트는 Postfix 구성 디렉터리의 `postqueue -c`를 분기합니다. Postfix에는 메일 대기열의 활동을 제한할 수 있는 내부 액세스 컨트롤이 있습니다. 기본적으로 Postfix는 `anyone`(누구나) 대기열을 볼 수 있도록 합니다. Postfix 설치가 더 엄격한 액세스 컨트롤로 구성되어 있는 프로덕션 시스템의 경우, 메일 대기열을 보려면 `dd-agent` 사용자 액세스를 부여해야 할 수 있습니다. 상세한 내용은 [postqueue Postfix 설명서][6]를 참고하세요. 

   ```shell
   postconf -e "authorized_mailq_users = dd-agent"
   ```

    대기열 보기 권한이 있는 사용자 목록:

   ```shell
   authorized_mailq_users (static:anyone)
   ```

3. [Agent를 재시작합니다][5].

#### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Postfix는 syslog daemon에 로그를 전송하고, 그 후 로그를 파일 시스템이 씁니다. 이름 지정 법칙과 로그 파일 대상을 구성할 수 있습니다.

```text
/etc/syslog.conf:
    mail.err                                    /dev/console
    mail.debug                                  /var/log/mail.log
```

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. `postfix.d/conf.yaml` 파일에 다음 설정 블록을 추가합니다. 환경에 따라 `path` 및 `service` 파라미터 값을 변경합니다. 사용 가능한 모든 설정 옵션은 [postfix.d/conf.yaml 샘플][5]을 참고하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/mail.log
       source: postfix
       service: myapp
   ```

3. [Agent를 재시작합니다][5].

### 검증

[에이전트 상태 하위 명령을 실행]75]하고 점검 섹션에서 `postfix`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "postfix" >}}


### 이벤트

Postfix 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Postfix 점검에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Postfix 대기열 성능 모니터링][10]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postfix/images/postfixgraph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/postfix/datadog_checks/postfix/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: http://www.postfix.org/postqueue.1.html
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/postfix/metadata.csv
[9]: https://docs.datadoghq.com/ko/help/
[10]: https://www.datadoghq.com/blog/monitor-postfix-queues