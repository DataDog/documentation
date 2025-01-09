---
code_lang: php
code_lang_weight: 70
further_reading:
- link: /tracing/troubleshooting
  tag: 설명서
  text: 애플리케이션 성능 모니터링(APM) 트러블슈팅
title: PHP 프로파일러 트러블슈팅
type: multi-code-lang
---

## 프로필 검색 페이지에서 누락된 프로필

프로파일러를 설정했는데 프로필 검색 페이지에 프로파일이 표시되지 않는 경우 `phpinfo()` 함수를 실행합니다. 프로파일러는 `phpinfo()`에 연결하여 진단을 실행합니다. 웹 서버에 문제가 있는 경우 각 서버 API (SAPI)는 독립적으로 설정할 수 있으므로 명령줄이 아닌 웹 서버에서 `phpinfo()`를 실행합니다.

다음 정보와 함께 [지원 티켓을 엽니다][1].

- 운영 체제 유형 및 버전(예: Linux Ubuntu 20.04)
- `phpinfo()` 출력에는 PHP 버전, SAPI 유형, Datadog 라이브러리 버전 및 프로파일러 진단이 포함됩니다.

## 기본 설정에서 오버헤드 절감

기본 오버헤드가 허용되지 않는 경우, 프로파일러가 수집하는 샘플
유형 중 일부를 비활성화하려면 다음 INI 설정을 변경합니다.

- `datadog.profiling.allocation_enabled`: 할당 프로파일링 제어
- `datadog.profiling.experimental_cpu_time_enabled`: CPU-타임 샘플 제어
- `datadog.profiling.exception_enabled`: 예외 프로파일링 제어

이러한 샘플 유형을 비활성화하면 월 타임 샘플만
수집됩니다.

다른 INI 설정과 해당 환경 변수는 [설정 문서][2]를 참조하세요.

## 프로파일러 과부하를 유도하는 예외

Datadog 예외 프로파일러는 경량 풋프린트로 보통 조건에서 오버헤드가 적습니다.
예외가 많이 생성되는 경우 해당 프로파일러에 상당한 과부하가 발생할 수 있습니다.
제어 플로우에 대한 예외를 사용하는 경우 발생할 수 있습니다.

예외 비율이 비정상적으로 높은 경우 예외 프로파일링
`datadog.profiling.exception_enabled`을 `0`으로 설정하여 프로파일링을 해제하거나
`datadog.profiling.exception_sampling_distance` INI 세팅(기본값 `100`)을 통해 샘플링 디스턴스를 더 높은 값으로 변경할 수 있습니다.
샘플링 디스턴스가 높을수록 생성되는 샘플 수가
줄어들고 오버헤드가 감소합니다.

예외 샘플링 디스턴스에 대한 지침은 [설정 문서][2]를
참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/help/
[2]: /ko/tracing/trace_collection/library_config/php/#environment-variable-configuration