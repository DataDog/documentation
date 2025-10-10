---
aliases:
- /ko/tracing/profiler/enabling/linux/
- /ko/tracing/profiler/enabling/ddprof/
code_lang: ddprof
code_lang_weight: 90
further_reading:
- link: getting_started/profiler
  tag: 설명서
  text: 프로파일러 시작하기
- link: profiler/profiler_troubleshooting/ddprof
  tag: 설명서
  text: 프로파일러를 사용하는 동안 발생한 문제 해결
title: 컴파일된 언어의 네이티브 프로파일러 활성화
type: multi-code-lang
---

<div class="alert alert-danger">
<code>ddprof</code>는 베타 버전입니다. Datadog에서는 프로덕션에 배포하기 전 민감하지 않은 환경에서 프로파일러를 평가할 것을 권장합니다.
</div>

컴파일된 언어(`ddprof`)의 네이티브 프로파일러는 OS 수준 API를 사용해 프로파일링 데이터를 수집합니다. 보통 C, C++, 또는 Rust와 같은 컴파일링된 언어로 쓴 애플리케이션에 적합합니다.
`ddprof`에서 보낸 프로필은 Datadog 웹 앱의 _네이티브_ 런타임 아래에 나타납니다.

## 필수 조건

모든 언어의 최소 및 권장 런타임과 트레이서 버전에 대한 요약은 [지원되는 언어 및 트레이서 버전][7]을 참고하세요.

지원되는 운영 체제
: Linux (glibc 또는 musl)

지원되는 아키텍처
: `amd64` 또는 `arm64` 프로세서

서버리스
: `ddprof`는 AWS Lambda와 같은 서버리스 플랫폼에서 지원되지 않습니다.

OS 설정
: `perf_event_paranoid` 커널 설정은 2 이하입니다([트러블슈팅][1] 참고)

디버깅 정보
: 기호를 사용할 수 있어야 합니다. 기호 테이블을 포함해야 프로파일러가 사람이 읽을 수 있는 함수 이름으로 표시합니다.

## 설치

프로파일러는 독립 실행형 파일로 사용하거나 라이브러리로 사용할 수 있습니다. 라이브러리로 사용하고 싶은 경우 [라이브러리 설치 지침](#library)으로 건너뛰세요.

### 독립형

1. 최신 [`ddprof` 릴리즈][2]를 다운로드합니다. 다음은 `amd64`(즉, `x86_64`) 플랫폼의 최신 릴리즈를 풀링하는 방법 중 하나입니다.

   ```bash
   curl -Lo ddprof-linux.tar.xz https://github.com/DataDog/ddprof/releases/latest/download/ddprof-amd64-linux.tar.xz
   tar xvf ddprof-linux.tar.xz
   mv ddprof/bin/ddprof INSTALLATION_TARGET
   ```

   `INSTALLATION_TARGET`는 `ddprof` 바이너리를 저장할 위치를 지정합니다. 다음 예시에서는 `INSTALLATION_TARGET`이 `./ddprof`로 설정되어 있다고 가정합니다.

   `aarch64` 플랫폼에 `amd64` 대신 `arm64`를 사용합니다.

3. 프로파일러를 포함하도록 서비스 호출을 수정합니다. 일반 명령이 마지막 인수로써 `ddprof` 실행 파일로 전달됩니다.
   {{< tabs >}}
{{% tab "환경 변수" %}}

```bash
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
./ddprof myapp --arg1 --arg2
```
**참고**: 다음 예시와 같이 기본 셸 기능을 사용해 애플리케이션을 실행하는 경우, 

```bash
exec myapp --arg1 --arg2
```

해당 기본 기능을 사용해 `ddprof`를 호출해야 합니다.

```bash
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
exec ./ddprof myapp --arg1 --arg2
```

{{% /tab %}}
{{% tab "파라미터" %}}

```bash
./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
```

**참고**: 다음 예시와 같이 기본 셸 기능을 사용해 애플리케이션을 실행하는 경우:

```bash
exec myapp --arg1
```

해당 기본 기능을 사용해 `ddprof`를 호출해야 합니다.

```bash
exec ./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
```

{{% /tab %}}
{{< /tabs >}}


5. 애플리케이션 시작 몇 분 후에 [Datadog APM > Profiler 페이지][3]에 내 프로필이 나타납니다.

### 라이브러리

라이브러리에서 C API를 노출합니다.

1. 라이브러리 지원(v0.80 이상)에서 [ddprof][2] 릴리즈를 다운로드하고 tarball을 추출합니다. 다음 예를 참고하세요.

   ```bash
   curl -Lo ddprof-linux.tar.xz https://github.com/DataDog/ddprof/releases/latest/download/ddprof-amd64-linux.tar.xz
   tar xvf ddprof-linux.tar.xz --directory /tmp
   ```

2. 내 코드에서 `ddprof_start_profiling()` 인터페이스를 사용해 프로파일러를 시작합니다. 이 인터페이스는 제공된 릴리즈의 `_dd_profiling.h_` 헤더에 정의되어 있습니다. 프로그램을 종료하면 프로파일러가 자동으로 중단됩니다. 수동으로 프로파일러를 중단하려면 `ms` 파라미터로 함수의 블록 시간을 밀리초로 표시하고 `ddprof_stop_profiling(ms)`를 사용합니다.
   ```cpp
   #include <stdlib.h>
   #include "dd_profiling.h"

   int foo(void) {
     int n = 0;
     for (int i = 0; i < 1000; i++) {
       n += 1;
     }
     return n;
   }

   int main(void) {
     // Initialize and start the Datadog profiler. Uses agent defaults if not
     // specified
     setenv("DD_ENV", "prod", 1);
     setenv("DD_SERVICE", "c_testservice", 1);
     setenv("DD_VERSION", "1.0.3", 1);
     ddprof_start_profiling();

     // Do some work
     for (int i = 0; i < 1e6; i++) {
       foo();
     }
     return 0;
   }
   ```

3. 추출된 디렉터리의 `include`와 `lib` 하위 디렉터리를 구축 시스템으로 보내고 `libdd_profiling`에 연결합니다. 위 예시의 경우 다음과 같습니다.
   ```bash
   gcc -I/tmp/ddprof/include -L/tmp/ddprof/lib profiler_demo.c -o profiler_demo -ldd_profiling
   ```

### 공유된 라이브러리 배포

공유된 라이브러리는 시스템의 라이브러리 검색 경로에 있어야 합니다. 그러지 않으면 애플리케이션 시작이 실패합니다. 이전 예시를 적용하면 다음과 같습니다.
```bash
./profiler_demo
./profiler_demo: error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

이를 피하려면 고정 라이브러리를 연결해야 합니다.

#### 라이브러리 설치

기존 검색 디렉터리에서 라이브러리를 복사해 검색 경로에 추가합니다. Linux 시스템의 검색 디렉터리가 무엇인지 보려면 다음을 실행하세요.
```bash
ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n
```

#### 검색 디렉터리 추가

`LD_LIBRARY_PATH` 환경 변수를 사용해 런타임 링커에 추가 검색 경로를 추가합니다. 이전 디렉터리 레이아웃을 사용한 예시는 다음과 같습니다.

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/tmp/ddprof/lib
```

## 구성

프로파일링 UI를 사용하는 `environment`, `service`, `service_version` 설정을 권장합니다.

[파라미터 전체 목록][5]을 참고하거나 명령줄을 사용합니다.

```bash
ddprof --help
```

### 기록

여러 엔드포인트의 하나에 로깅을 구성할 수 있습니다.
- `stdout`의 경우 로그를 표준 출력 스트림에 출력합니다(기본값).
- `stderr`는 표준 오류 스트림으로 로그를 출력합니다.
- `syslog`는 syslog로 로그를 출력하며, RFC 3164 사양에 따릅니다.  
- `disable`는 로그를 비활성화합니다.
- 다른 값은 파일 경로로 처리되고, `/`로 절대 경로를 지정합니다.

### 전역

실행 프로세스 전체를 계측하려면 `--global` 옵션을 사용할 수 있습니다.
전역 모드는 디버그를 목적으로 고안되었습니다. 이에 따라 한층 높은 권한이 필요합니다. 설정에 따라 루트로 실행하거나, `CAP_PERFMON`와 `CAP_SYSADMIN` 권한을 부여하거나, `perf_event_paranoid`을 `-1`로 설정해야 합니다.

```bash
./ddprof --environment staging --global --service_version full-host-profile
```

대부분의 구성에서 프로파일러의 PID 네임스페이스 내에서 볼 수 있는 모든 프로세스로 구성되어 있습니다.

## 다음에 무엇을 해야 하는지 잘 모르겠나요?

[프로파일러 시작히기][6] 가이드는 성능 문제를 포함하는 샘플 서비스를 제공하여 지속적 프로파일러가 문제를 이해하고 해결하는 방법을 보여줍니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/profiler/profiler_troubleshooting
[2]: https://github.com/DataDog/ddprof/releases
[3]: https://app.datadoghq.com/profiling
[4]: /ko/getting_started/tagging/unified_service_tagging
[5]: https://github.com/DataDog/ddprof/blob/main/docs/Commands.md
[6]: /ko/getting_started/profiler/
[7]: /ko/profiler/enabling/supported_versions/