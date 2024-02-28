---
aliases:
- /ko/logs/faq/how-to-increase-the-number-of-log-files-tailed-by-the-agent
further_reading:
- link: /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/
  tag: FAQ
  text: 외부 로그 전달자를 통해 Datadog에 어떻게 로그를 전송할 수 있나요?
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: 로그 파싱 문제를 탐색하는 방법
kind: 가이드
title: 에이전트가 추적하는 로그 파일 수 늘리기
---

기본적으로 에이전트는 Windows와 MacOS에서 로그 파일 200개를 추적할 수 있고, 다른 운영 시스템에서는 로그 파일 500개까지 추적할 수 있습니다. 대량의 디렉터리에서 와일드카드가 설정될 때 성능 문제가 발생하는 것을 예방하기 위해 이와 같은 수 제한을 두었습니다.

제한을 늘리려면 에이전트 구성 파일(`/etc/datadog-agent/datadog.yaml`)의 `logs_config` 섹션에서 `open_files_limit` 값을 설정하세요.

```yaml
logs_config:
  open_files_limit: 500
```

컨테이너화된 환경에서는 `DD_LOGS_CONFIG_OPEN_FILES_LIMIT` 환경 변수를 설정하세요.

**참고**: 추적하는 로그 파일 제한을 늘리면 에이전트의 리소스 소비가 늘어날 수 있습니다.