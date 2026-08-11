---
code_lang: 루비(Ruby)
code_lang_weight: 40
further_reading:
- link: /tracing/troubleshooting
  tag: 설명서
  text: 애플리케이션 성능 모니터링(APM) 트러블슈팅
title: Ruby Profiler 문제 해결
type: multi-code-lang
---

## 프로필 검색 페이지에서 누락된 프로필

프로파일러를 설정하였고 프로파일 검색 페이지에서 프로필을 볼 수 없는 경우 [디버그 모드][1]를 켜고 디버그 파일과 다음 정보를 포함해 [지원 티켓을 엽니다][2].

- 운영 체제 유형 및 버전(예: Ubuntu Linux 24.04)
- 런타임 유형, 버전 및 공급업체(예: Ruby 3.3.1)

## Resque 작업에 누락된 프로파일

[Resque][4] 작업 프로파일링 시, [Resque 설명서][5]에 설명된 대로 `RUN_AT_EXIT_HOOKS` 환경 변수를 `1`로 설정합니다.

이 플래그가 없으면, 수명이 짧은 Resque 작업에 대한 프로파일을 사용할 수 없습니다.

## Ruby VM JIT(Just-In-Time) 헤더 컴파일이 실패하여 프로파일링이 활성화되지 않습니다.

Ruby 2.7과 구버전 GCC(4.8 이하) 사이에는 프로파일러에 영향을 줄 수 있는 알려진 비호환성이 있습니다([Ruby 업스트림 보고서][6], [`dd-trace-rb` 버그 보고서][7]). 이로 인해 "Ruby VM JIT(Just-In-Time) 헤더 컴파일이 실패하여 ddtrace 설치에 Continuous Profiler 지원이 누락되었습니다. C 컴파일러 또는 Ruby VM JIT 컴파일러에 문제가 있는 것 같습니다."와 같은 오류 메시지가 발생할 수 있습니다.

이를 해결하려면 운영 체제 또는 Docker 이미지를 업데이트하여 GCC 버전을 4.8보다 최신 버전으로 업그레이드하세요.

이 문제와 관련해 추가 도움이 필요하면 [지원팀에 문의][2]하고, 명령 실행 결과 출력 `DD_PROFILING_FAIL_INSTALL_IF_MISSING_EXTENSION=true gem install datadog`과 생성된 `mkmf.log` 파일을 함께 첨부하세요.

## 백트레이스가 매우 깊을 경우 일부 프레임이 생략됩니다.

Ruby 프로파일러는 프로파일링 데이터를 수집할 때 백트레이스가 매우 깊은 경우 이를 잘라냅니다(truncate). 잘린 백트레이스에는 일부 호출자 함수가 누락되므로, 루트 호출 프레임과 연결할 수 없게 됩니다. 그 결과, 잘린 백트레이스는 `Truncated Frames`(구버전의 경우 `N frames omitted`) 프레임 아래로 함께 그룹화됩니다.

`DD_PROFILING_MAX_FRAMES` 환경 변수를 사용하거나 코드에서 설정하여 최대 백트레이스(스택) 깊이를 늘릴 수 있습니다.

```ruby
Datadog.configure do |c|
  c.profiling.advanced.max_frames = 600
end
```

## 네이티브 확장을 사용하는 Ruby gem에서 발생하는 예기치 않은 실패 또는 오류

Ruby 프로파일러는 Ruby 애플리케이션에 `SIGPROF` UNIX 시그널을 전송하여 보다 세밀한 데이터 수집합니다.

`SIGPROF`를 전송하는 방식은 일반적인 프로파일링 기법이며, 이로 인해 네이티브 확장 또는 라이브러리의 시스템 호출이 [시스템 `EINTR` 오류 코드][8]로 중단될 수 있습니다. 드물게, 해당 오류 코드의 `EINTR` 오류 처리가 누락되었거나 잘못 구현된 네이티브 확장 또는 관련 라이브러리에서 예기치 않은 문제가 발생할 수 있습니다.

다음은 알려진 비호환성 문제입니다.
* `mysql2` gem을 `libmysqlclient` [8.0.0 이전 버전][9]과 함께 사용하는 경우 문제가 발생할 수 있습니다. 영향을 받는 `libmysqlclient` 버전은 Ubuntu 18.04에는 포함되어 있는 것으로 알려져 있으나, Ubuntu 20.04 이상 버전에는 포함되어 있지 않습니다.
* [`rugged` gem 사용][10]
* [6.0.19 이전 버전][11]의 `passenger`gem 또는 Phusion Passenger 웹 서버 사용
* [`Dir` 클래스의 일부 API][13]

이러한 경우 최신 버전의 프로파일러가 해당 비호환성을 자동으로 감지하고 우회 해결책을 적용합니다.

위에 안내된 경우 외에도 네이티브 확장을 사용하는 Ruby gem에서 실패 또는 오류가 발생하는 경우, `SIGPROF` 신호 사용을 피하는 “no signals” 우회 해결책을 수동으로 활성화할 수 있습니다. 이 우회 방식은 신호 사용을 회피합니다.
이 우회 해결책을 활성화하려면 `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED` 환경 변수를 `true`로 설정하거나, 코드에서 다음과 같이 설정하세요.
 

```ruby
Datadog.configure do |c|
  c.profiling.advanced.no_signals_workaround_enabled = true
end
```

비호환성이 발견되었거나 의심되는 경우 [지원 티켓을 생성하여][2] 팀에 알려주세요. 이를 통해 Datadog는 해당 항목을 자동 감지 목록에 추가하고, gem 또는 라이브러리 작성자와 협력하여 문제를 해결할 수 있습니다.

## Ruby 버전 2.6~3.2의 `gc_finalize_deferred` 세그먼테이션 오류

이 문제의 해결책은 [`dd-trace-rb` 1.21.0 버전][3]부터 자동으로 적용됩니다. Datadog는 해당 문제를 해결하기 위해 1.21.0 이상 버전으로 업그레이드할 것을 권장합니다.

1.21.0 이전 버전에서는 드물게 프로파일러가 [Ruby VM Bug #19991][12]을 유발할 수 있었으며, 이 경우 `gc_finalize_deferred` 함수가 포함된 크래시 스택 트레이스와 함께 “Segmentation fault” 오류가 발생할 수 있습니다.

이 버그는 Ruby 3.3 이상 버전에서 수정되었습니다. 이전 Ruby 버전(또는 dd-trace-rb 1.21.0 이전 버전)을 사용하는 경우에는 “no signals” 우회 해결책을 적용하여 문제를 해결할 수 있습니다.

이 해결책을 적용하려면 `DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED` 환경 변수를 `true`로 설정하거나 코드를 다음과 같이 설정합니다.

```ruby
Datadog.configure do |c|
  c.profiling.advanced.no_signals_workaround_enabled = true
end
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tracing/troubleshooting/#debugging-and-logging
[2]: /ko/help/
[3]: https://github.com/datadog/dd-trace-rb/releases/tag/v1.21.0
[4]: https://github.com/resque/resque
[5]: https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks
[6]: https://bugs.ruby-lang.org/issues/18073
[7]: https://github.com/DataDog/dd-trace-rb/issues/1799
[8]: https://man7.org/linux/man-pages/man7/signal.7.html#:~:text=Interruption%20of%20system%20calls%20and%20library%20functions%20by%20signal%20handlers
[9]: https://bugs.mysql.com/bug.php?id=83109
[10]: https://github.com/DataDog/dd-trace-rb/issues/2721
[11]: https://github.com/DataDog/dd-trace-rb/issues/2976
[12]: https://bugs.ruby-lang.org/issues/19991
[13]: https://github.com/DataDog/dd-trace-rb/issues/3450