---
disable_toc: false
title: New Relic 대상
---

로그를 New Relic으로 전송하려면 Observability Pipelines의 New Relic 대상을 사용하세요.

## 설정

[파이프라인 설정][1] 시 New Relic 대상과 환경 변수를 설정하세요. 아래 정보는 파이프라인 UI에서 구성됩니다.

### 대상 설정

{{% observability_pipelines/destination_settings/new_relic %}}

### 환경 변수 설정

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

## 대상 작동 방식

### 이벤트 배치 작업

다음 파라미터 중 하나가 충족되면 이벤트 배치가 플러시됩니다. 자세한 내용은 [이벤트 배치 작업][2]을 참고하세요.

| 최대 이벤트     | 최대 바이트       | 시간 초과(초)   |
|----------------|-----------------|---------------------|
| 100            | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching