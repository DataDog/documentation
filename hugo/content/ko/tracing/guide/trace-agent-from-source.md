---
aliases:
- /ko/tracing/faq/trace-agent-from-source/
title: 소스에서 트레이스 에이전트 설치하기
---

## 소스에서 설치

1. `Go 1.11+`을 설치하세요. 자세한 정보는 [공식 Go 웹사이트][1]에 안내된 단계를 참고하세요.
2. [Datadog 에이전트 레포][2]를 복제합니다.
3. `datadog-agent` 리포지토리 루트에 다음 명령을 실행합니다.
    ```bash
    go install ./cmd/trace-agent
    ```

4. `trace-agent`를 사용해 에이전트를 실행합니다(`$GOPATH/bin` 경로가 시스템 `$PATH`에 있다고 가정).

### 트러블슈팅

에이전트 출력이나 로그(Linux의 경우 `/var/log/datadog/trace-agent.log`)를 확인해 트레이스가 올바르고 Datadog API에
전달되고 있는지 확인합니다.

[1]: https://golang.org/dl
[2]: https://github.com/DataDog/datadog-agent