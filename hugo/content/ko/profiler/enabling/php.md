---
aliases:
- /ko/tracing/profiler/enabling/php/
code_lang: php
code_lang_weight: 70
further_reading:
- link: getting_started/profiler
  tag: 설명서
  text: 프로파일러 시작하기
- link: profiler/profile_visualizations
  tag: 설명서
  text: 사용 가능한 프로파일 시각화에 대해 자세히 알아보기
- link: profiler/profiler_troubleshooting/php
  tag: 설명서
  text: 프로파일러를 사용하는 동안 발생한 문제 해결
- link: https://www.datadoghq.com/blog/php-exception-profiling/
  tag: 블로그
  text: PHP에서 예외 프로파일링을 신경 써야 하는 이유는 무엇인가요?
title: PHP Profiler 활성화
type: multi-code-lang
---

## 필수 조건

모든 언어에 대한 최소 및 권장 런타임과 트레이서 버전 정보는 [지원되는 언어 및 트레이서 버전][14]에서 확인해 보세요.

Datadog Profiler는 64비트 Linux에서 최소 PHP 7.1 이상이 필요합니다.

PHP ZTS 빌드는 `dd-trace-php` 버전 0.99 이상부터 지원하며, PHP 디버그 빌드는 지원하지 **않습니다**.

{{< tabs >}}
{{% tab "GNU C Linux" %}}

운영 체제 glibc 2.17 이상이 필요합니다. 다음 버전 이상은 본 요구 사항을 충족합니다.
  - CentOS 7.
  - Debian 8은 지원 종료되었습니다(EOL).
  - Ubuntu 14.04는 지원 종료되었습니다(EOL).

Datadog은 지원 종료(EOL)되지 않은 OS 버전을 실행할 것을 권장합니다.

{{% /tab %}}
{{% tab "Alpine Linux" %}}

해당 프로파일러는 musl v1.2 기반으로 빌드했기 때문에 Alpine Linux 버전 3.13 이상이 필요합니다.

또한 다음으로 `libgcc_s`를 설치해야 합니다.

```shell
apk add libgcc
```

{{% /tab %}}
{{< /tabs >}}

다음 프로파일링 기능은 아래에 명시된 `dd-trace-php` 라이브러리 최소 버전부터 사용할 수 있습니다.

|      기능              | 필수 `dd-trace-php` 버전          |
|---------------------------|------------------------------------------|
| [코드 핫스팟][12]       | 0.71+                                    |
| [엔드포인트 프로파일링][13]  | 0.79.0+                                  |
| [타임라인][15]            | 0.98.0+            |

연속 프로파일러는 AWS Lambda와 같은 일부 서버리스 플랫폼에서는 지원되지 않습니다.

## 설치

다음에 따라 애플리케이션 프로파일링을 시작합니다.

1. Datadog Agent v6+가 설치되어 실행 중인지 확인합니다. Datadog은 [Datadog Agent v7+][2] 사용을 권장합니다.

2. [GitHub 릴리스 페이지][3]에서 `datadog-setup.php` 스크립트를 다운로드합니다. 버전 0.69.0은 이 설치 프로그램이 포함된 첫 번째 트레이서 릴리스입니다.

3. 설치 프로그램을 실행하여 트레이서와 프로파일러를 모두 설치합니다(예: `php datadog-setup.php --enable-profiling`). 본 스크립트는 대화형이며, 탐지된 PHP 위치 중 어디에 설치할지 묻습니다. 스크립트 끝에는 향후 사용할 수 있도록 비대화형 버전 명령 인수를 출력합니다.

4. `datadog-setup.php`를 통해 구성 모드로 프로파일러를 구성합니다.

    ```
    # `datadog.profiling.enabled` is not required for v0.82.0+.
    php datadog-setup.php config set -d datadog.profiling.enabled=1

    php datadog-setup.php config set \
      -d datadog.service=app-name \
      -d datadog.env=prod \
      -d datadog.version=1.3.2

    php hello.php
    ```

    Apache, PHP-FPM 및 기타 서버는 INI
설정을 변경한 후 재시작해야 합니다.

    자세한 INI 설정은 [구성 문서][4]를 참조하세요.

5. 요청을 받은 후 1~2분이 경과하면 프로파일이 [APM > Profiler page][5]에 표시됩니다.

## 다음에 무엇을 해야 하는지 어려우신가요?

[프로파일러 시작히기][6] 가이드는 성능 문제를 포함하는 샘플 서비스를 제공하여 지속적 프로파일러가 문제를 이해하고 해결하는 방법을 보여줍니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[3]: https://github.com/DataDog/dd-trace-php/releases
[4]: /ko/tracing/trace_collection/library_config/php/#environment-variable-configuration
[5]: https://app.datadoghq.com/profiling
[6]: /ko/getting_started/profiler/
[12]: /ko/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /ko/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /ko/profiler/enabling/supported_versions/
[15]: /ko/profiler/profile_visualizations/#timeline-view