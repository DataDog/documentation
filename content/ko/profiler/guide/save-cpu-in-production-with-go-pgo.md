---
further_reading:
- link: /profiler
  tag: 설명서
  text: Datadog 지속적 프로파일러
- link: /profiler/compare_profiles/
  tag: 설명서
  text: 프로필 비교
title: Go – 프로필 기반 최적화(PGO)로 프로덕션에서 최대 14% CPU 절약
---

## 개요

[Go 1.21][1]부터 Go 컴파일러는 프로필 기반 최적화(PGO)를 지원합니다.

PGO는 프로덕션 워크로드의 CPU 프로필에서 자주 사용되는 것으로 식별된 코드에 추가 최적화를 지원합니다. 이 기능은 [Datadog Go Continuous Profiler][2]와 호환되며 프로덕션 빌드에 사용할 수 있습니다.

## PGO 작동 방식

PGO 작동에 관한 핵심은 다음을 참고하세요.

- PGO를 활성화하여 Go 프로그램을 빌드하면 컴파일러가 `default.pgo`라는 pprof CPU 프로필을 찾아 사용하여 더욱 최적화된 바이너리를 생성합니다.
- 일반적인 프로그램은 최적화 후 CPU 시간이 2-14% 감소합니다. PGO는 현재 활발하게 개발 중이며, 향후 버전에서 CPU를 더욱 절약하는 것이 목표입니다. Datadog는 [이 이니셔티브를 적극적으로 지원하고 있습니다][3].
- PGO는 주요 프로필을 사용할 때 가장 좋은 결과를 냅니다. 그러나 그 외 오래된 프로필(소프트웨어의 이전 버전에서 생성된 프로필)을 사용하더라도 PGO를 사용하는 것이 비교적 효과가 좋습니다.
- PGO로 최적화된 애플리케이션에서 생성된 프로필을 사용하더라도 최적화/비최적화 사이클이 발생하지 않습니다. 이를 반복 안정성이라고 합니다.

자세한 내용은 [Go PGO 설명서][4]를 참고하세요.

## PGO 활성화

PGO는 Datadog에서 프로필을 수동으로 다운로드하여 사용할 수 있는 표준 Go 컴파일러 옵션입니다. Datadog은 최신의 가장 대표성 있는 프로필을 사용하여 모든 서비스에서 PGO를 활성화할 수 있도록 `datadog-pgo` 도구를 개발했습니다.

`datadog-pgo` 도구를 사용하여 PGO를 활성화하는 방법:

1. [API 및 애플리케이션 키][5]에 설명된 대로 최소한 `continuous_profiler_pgo_read`로 지정된 전용 API 키와 애플리케이션 키를 생성합니다.
2. CI 공급자의 환경 시크릿 메커니즘을 사용하여 `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE`를 설정합니다.
3. 빌드 단계 전에 `datadog-pgo`를 실행합니다.
   예를 들어, `prod`에서 실행되고 메인 패키지가 `./cmd/foo`에 있는 `foo` 서비스인 경우 다음 단계를 추가해야 합니다.

   ```
   go run github.com/DataDog/datadog-pgo@latest "service:foo env:prod" ./cmd/foo/default.pgo
   ```

Go 툴체인은 자동으로 메인 패키지의 모든 `default.pgo` 파일을 선택하므로 `go build` 단계를 수정할 필요가 없습니다.

자세한 내용은 [datadog-pgo GitHub 리포지토리][6]를 참고하세요.

## PGO가 활성화되어 있는지 확인

PGO가 활성화된 위치를 확인하려면 [pgo 태그가 true로 설정되지 않은 Go 프로필][7]을 검색하세요.

`pgo` 태그는 dd-trace-go 1.61.0에서 구현되었으므로 이 버전 이전의 프로필에는 `pgo:false`가 없습니다.


## 추가 읽기

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://tip.golang.org/doc/go1.21
[2]: /ko/profiler/enabling/go
[3]: https://github.com/golang/go/issues/65532
[4]: https://go.dev/doc/pgo
[5]: /ko/account_management/api-app-keys
[6]: https://github.com/DataDog/datadog-pgo?tab=readme-ov-file#getting-started
[7]: https://app.datadoghq.com/profiling/explorer?query=runtime%3Ago%20-pgo%3Atrue%20&viz=stream