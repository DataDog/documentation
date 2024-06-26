---
aliases:
- /ko/logs/languages/go
further_reading:
- link: https://www.datadoghq.com/blog/go-logging/
  tag: 블로그
  text: Golang 로그 수집, 표준화, 중앙화하는 방법
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 실행하기
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: 로그 수집 트러블슈팅 가이드
- link: /glossary/#tail
  tag: 용어
  text: '"tail"에 대한 용어 항목'
kind: 설명서
title: Go 로그 수집
---

Go 로그를 Datadog로 보내려면 파일에 로그한 후 Datadog 에이전트로 해당 파일을 [테일링][11]하세요. 개방형 소스 로깅 라이브러리인 [logrus]에서 다음 설정을 사용할 수 있습니다.

Datadog에서는 [커스텀 파싱 규칙][2]이 필요하지 않도록 로깅 라이브러리를 설정하여 로그를 JSON으로 생성하는 것을 권장합니다.

## 로거 설정

클래식 Go 구성을 하려면 `main.go` 파일을 열고 다음 코드를 붙여 넣으세요.

```go
package main

import (
  log "github.com/sirupsen/logrus"
)

func main() {

    // JSONFormatter 사용
    log.SetFormatter(&log.JSONFormatter{})

    // logrus로 평소와 같이 이벤트로 로깅
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")
}
```

로그 이벤트에서 보고 싶은 JSON 개체를 제공하여 로그에 메타데이터를 추가할 수 있습니다.

`hostname`, `username`, `customers`, `metric` 등, Go 애플리케이션과 관련해 트러블슈팅을 할 수 있는 어떤 정보든 메타데이터로 사용할 수 있습니다.

```go
package main

import (
  log "github.com/sirupsen/logrus"
)

func main() {

    // JSONFormatter 사용
    log.SetFormatter(&log.JSONFormatter{})

    // logrus로 이벤트 로깅
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")

  // 메타데이터의 경우 다음을 재사용해 로깅 문 사이에 필드를 재사용하는 것이 일반적임
  contextualizedLog := log.WithFields(log.Fields{
    "hostname": "staging-1",
    "appname": "foo-app",
    "session": "1ce3f6v"
  })

  contextualizedLog.Info("Simple event with global metadata")
}
```

## Datadog 에이전트 설정

[로그 수집을 활성화한 후][3]에는 [커스텀 로그 수집][5]을 설정해 로그 파일에 테일링하고 Datadog로 새 로그를 전송하세요.

1. [에이전트 구성 디렉터리][5]의 `conf.d/`에 `go.d/` 폴더를 생성하세요.
2. 다음 내용으로 `go.d/`에 `conf.yaml` 파일을 생성하세요.

    ```yaml
    ##Log section
    logs:

      - type: file
        path: "<path_to_your_go_log>.log"
        service: <service_name>
        source: go
        sourcecategory: sourcecode
    ```

3. [에이전트를 재시작합니다][6].
4. [에이전트의 상태 하위 명령][7]을 실행하고 `Checks` 섹션 아래 `go`를 찾아서 로그가 Datadog로 잘 전송되었는지 확인하세요.

로그가 JSON 형식인 경우 Datadog에서 자동으로 [로그 메시지를 파싱][8]하여 로그 속성을 추출합니다. [Log Explorer][10]를 사용해 로그를 확인하고 트러블슈팅하세요.

## 로그 및 트레이스 연결

애플리케이션에서 APM이 활성화된 경우에는 [APM Go 로깅 설명서][10]에 따라 자동으로 로그에 트레이스 및 스팬 ID를 추가해 애플리케이션 로그와 트레이스 간의 상관 관계를 개선할 수 있습니다.

## 모범 사례

* 로거 이름을 기능 및 서비스와 관련된 이름으로 지정하세요.
* `DEBUG`, `INFO`, `WARNING`, `FATAL` 로그 수준을 사용하세요. Go의 `FATAL` 수준은 Datadog의 `Emergency` 수준으로 매핑됩니다.
* 가장 중요한 정보부터 로깅하세요. 그 후 이터레이션을 추가해 로깅을 확장해 나가세요.
* 로그에 컨텍스트를 추가할 때는 메타데이터를 이용하세요. 그러면 사용자, 고객, 비즈니스 관련 속성으로 빠르게 필터링할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/sirupsen/logrus
[2]: /ko/logs/log_configuration/parsing
[3]: /ko/agent/logs/?tab=tailfiles#activate-log-collection
[4]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: /ko/logs/log_configuration/parsing/?tab=matchers
[9]: /ko/logs/explorer/#overview
[10]: /ko/tracing/other_telemetry/connect_logs_and_traces/go/
[11]: /ko/glossary/#tail