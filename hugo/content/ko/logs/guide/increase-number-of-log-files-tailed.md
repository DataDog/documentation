---
aliases:
- /ko/logs/faq/how-to-increase-the-number-of-log-files-tailed-by-the-agent
further_reading:
- link: /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/
  tag: FAQ
  text: 외부 로그 전달자를 통해 Datadog으로 로그를 보내는 방법
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 구문 분석에 대해 알아보기
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: 로그 구문 분석 문제를 조사하는 방법
title: 에이전트가 추적하는 로그 파일 수 늘리기
---
Agent 구성 파일(`/etc/datadog-agent/datadog.yaml`)의 `logs_config.open_files_limit` 매개변수는 Agent가 동시에 테일링할 수 있는 최대 로그 파일 수를 결정합니다. 이 제한은 대규모 디렉터리에 와일드카드가 설정되었을 때 발생할 수 있는 성능 문제를 방지하기 위해 설정되었습니다. 이 매개변수를 조정하여 제한을 늘릴 수 있습니다.

```yaml
logs_config:
  open_files_limit: 500
```

컨테이너화된 환경의 경우 `DD_LOGS_CONFIG_OPEN_FILES_LIMIT` 환경 변수를 설정할 수 있습니다.

기본값은 Agent 버전 및 운영 체제에 따라 다릅니다. 사용 중인 Agent 버전의 기본값을 확인하려면 Datadog Agent 저장소의 [예시 Agent 구성 파일][1]을 참조하세요. 운영 체제에 맞는 파일을 여세요. 올바른 기본값을 확인하려면 Agent 버전에 해당하는 태그를 선택하세요.

**참고**: 테일링할 수 있는 로그 파일 수 제한을 늘리면 Agent의 리소스 사용량이 늘어날 수 있습니다.

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example