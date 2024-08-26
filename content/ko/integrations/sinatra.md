---
aliases:
- /ko/logs/log_collection/nxlog
categories:
- 로그 수집
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/sinatra.md
description: Sinatra 애플리케이션 로그 수집.
has_logo: true
integration_id: sinatra
integration_title: Sinatra
is_public: true
custom_kind: integration
name: Sinatra
public_title: Datadog-Sinatra 통합
short_description: Sinatra 애플리케이션 로그 수집.
supported_os:
- linux
- mac_os
- windows
title: Sinatra
---

## 개요

해당 통합을 통해 [Sinatra][1] 애플리케이션에서 웹 액세스 로그를 가져와 모니터링할 수 있습니다:

- 에러 로그 (4xx 코드, 5xx 코드)
- 웹 페이지 응답 시간
- 요청 수
- 교환된 바이트 수

## 구성

### 설치

Sinatra 애플리케이션 실행 인스턴스에 [에이전트를 설치][2]합니다.

### 설정

기본 [Sinatra 로깅][3] 기능은 로그를 stdout으로 설정합니다. Datadog은 [Rack][4] [공통 로거][5]를 활용하여 파일과 콘솔에 로그를 남길 것을 권장합니다.

하단은 파일과 콘솔에 로그를 생성하는 설정 예시입니다. Rack 설정 파일(`config.ru`) 또는 Sinatra 애플리케이션 설정 블록에서 설정할 수 있습니다.

```ruby
require 'sinatra'

configure do
  # 클래식 스타일 애플리케이션에서는 로깅이 기본값으로 활성화되어 있으므로,
  # `enable :logging`는 필요하지 않습니다.
  file = File.new("/var/log/sinatra/access.log", 'a+')
  file.sync = true
  use Rack::CommonLogger, file
end

get '/' do
  'Hello World'
end
```

해당 로거는 공통 Apache Access 형식을 사용하며 다음과 같은 형식의 로그를 생성합니다:

```text
127.0.0.1 - - [15/Jul/2018:17:41:40 +0000] "GET /uptime_status HTTP/1.1" 200 34 0.0004
127.0.0.1 - - [15/Jul/2018 23:40:31] "GET /uptime_status HTTP/1.1" 200 6997 1.8096
```

#### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 사용하도록 설정합니다:

    ```yaml
    logs_enabled: true
    ```

2. [에이전트 설정 디렉토리][6]의 루트에 있는 `sinatra.d/conf.yaml` 파일에 다음 설정 블록을 추가하여 Sinatra 애플리케이션 로그 수집을 시작합니다:

    ```yaml
    logs:
      - type: file
        path: /var/log/sinatra/access.log
        source: sinatra
        service: webapp
    ```

   `path`와 `service` 파라미터 값을 환경에 맞도록 변경합니다.

3. [에이전트 재시작][7]

[1]: http://sinatrarb.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: http://sinatrarb.com/intro.html#Logging
[4]: http://rack.github.io
[5]: https://www.rubydoc.info/github/rack/rack/Rack/CommonLogger
[6]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: /ko/agent/guide/agent-commands/#restart-the-agent