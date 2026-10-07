---
description: Add Hostname 프로세서를 사용하여 로그를 보낸 호스트의 이름이 포함된 필드를 추가하는 방법을 학습합니다.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Add Hostname 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

이 프로세서는 로그를 보낸 호스트의 이름이 포함된 필드를 추가합니다. 예를 들어, `hostname: 613e197f3526`입니다. **참고**: `hostname`이 이미 존재하는 경우, Worker는 오류를 발생시키며 기존 `hostname`을 덮어쓰지 않습니다.

## 설정 {#setup}

이 프로세서를 설정하려면 다음 단계를 따르세요.
- {{< ui >}}filter query{{< /ui >}}를 정의합니다. 자세한 내용은 [로그 검색 구문][1]을 참조하세요.
  - 지정된 필터 쿼리와 일치하는 로그만 처리됩니다.
  - 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.

[1]: /ko/observability_pipelines/search_syntax/logs/