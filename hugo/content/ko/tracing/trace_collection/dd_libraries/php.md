---
aliases:
- /ko/tracing/languages/php
- /ko/agent/apm/php/
- /ko/tracing/php/
- /ko/tracing/setup/php
- /ko/tracing/setup_overview/php
- /ko/tracing/setup_overview/setup/php
- /ko/tracing/faq/php-tracer-manual-installation/
- /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/php
code_lang: php
code_lang_weight: 40
further_reading:
- link: /tracing/guide/trace-php-cli-scripts/
  tag: 가이드
  text: PHP CLI 스크립트 트레이싱
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: 블로그
  text: Datadog APM 및 분산 트레이싱을 사용한 PHP 모니터링
- link: https://github.com/DataDog/dd-trace-php
  tag: 소스 코드
  text: 소스 코드
- link: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
  tag: 소스 코드
  text: 오픈 소스 프로젝트에 기여하기
- link: /tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
title: PHP 애플리케이션 트레이싱
type: multi-code-lang
---
## 호환성 요구 사항 {#compatibility-requirements}

`dd-trace-php` 최신 버전에 필요한 최소 PHP 버전 요구 사항은 PHP 7입니다. PHP 5를 사용 중인 경우에도 PHP 트레이서를 최대 버전 [0.99](https://github.com/DataDog/dd-trace-php/releases/tag/0.99.0)까지 사용할 수 있습니다. PHP 5는 PHP 라이브러리 버전 1.0 현재 EOL 상태입니다.

Datadog의 PHP 버전 및 프레임워크 지원 전체 목록(레거시 및 유지 관리 버전 포함)은 [호환성 요구 사항][1] 페이지를 참조하세요.

## 시작하기 {#getting-started}

시작하기 전에 먼저 [Agent를 설치하고 구성][14]했는지 확인하세요.

### 확장 설치 {#install-the-extension}

공식 설치 프로그램 다운로드:

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

Alpine Linux를 사용 중인 경우, 설치 프로그램을 실행하기 전에 `libgcc_s`를 설치해야 합니다.

```shell
apk add libgcc
```

설치 프로그램 실행:

```shell
# Full installation: APM + AAP + Profiling
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# APM only
php datadog-setup.php --php-bin=all

# APM + AAP
php datadog-setup.php --php-bin=all --enable-appsec

# APM + Profiling
php datadog-setup.php --php-bin=all --enable-profiling
```

<div class="alert alert-warning">
<strong>참고</strong>: Windows에서는 APM만 지원됩니다. Windows에서 PHP 애플리케이션을 추적할 때 <code>--enable-appsec</code> 및 <code>--enable-profiling</code> 플래그를 사용하지 마세요.
</div>

이 명령을 실행하면 호스트 또는 컨테이너에서 찾은 모든 PHP 바이너리에 확장을 설치합니다. `--php-bin`이 생략되면 설치 프로그램이 대화형 모드로 실행되고, 사용자에게 설치할 바이너리를 선택해 달라고 요청합니다. `dd-trace-php`가 특정 바이너리에만 설치되어야 하는 경우, `--php-bin`의 값이 해당 바이너리로의 경로일 수 있습니다.

PHP(PHP-FPM 또는 Apache SAPI)를 다시 시작하고 애플리케이션의 추적이 활성화된 엔드포인트를 방문하세요. 생성된 트레이스를 보려면 [APM Traces 페이지][4]로 이동합니다.

`--enable-appsec`를 지정하지 않으면, 시작 시 짧게 AppSec 확장이 로드되고, 기본적으로 활성화되지 않습니다. 이것은 즉시 단락되어 미미한 성능 오버헤드를 초래합니다.

<div class="alert alert-info">
트레이스가 UI에 표시되려면 몇 분 걸릴 수 있습니다. 몇 분이 지난 뒤에도 여전히 트레이스가 표시되지 않는 경우, 호스트 머신에서 <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> 페이지를 만든 다음 `ddtrace`까지 스크롤을 내립니다. 이 섹션에 실패한 진단 검사가 표시되어 문제가 있는지 식별하는 데 도움이 됩니다.
</div>

<div class="alert alert-danger">
<strong>Apache ZTS:</strong>
PHP CLI 바이너리가 NTS로 빌드되었고(스레드 안전(thread-safe)하지 않음) Apache는 PHP의 ZTS(Zend thread-safe) 버전을 사용하는 경우, ZTS 바이너리에 대한 확장 로드를 수동으로 변경해야 합니다. 코드 <code>/path/to/php-zts --ini</code> 를 실행하여 Datadog의 <code>.ini</code> 파일 위치를 찾은 다음, 파일 이름에서 <code>-zts</code> 접미사를 추가하세요. 예를 들어 <code>extension=ddtrace-20210902.so</code> 에서 <code>extension=ddtrace-20210902-zts.so</code>입니다.
</div>

<div class="alert alert-danger">
<strong>SELinux:</strong>
호스트에서 httpd SELinux 정책이 구성된 경우, SDK의 기능이 제한될 수 있습니다. 단, SELinux 구성에서 임시 파일의 쓰기 및 실행이 명시적으로 허용된 경우는 예외입니다.

`allow httpd_t httpd_tmpfs_t:file { execute execute_no_trans };`

</div>

## 자동 계측 {#automatic-instrumentation}

트레이싱은 기본적으로 활성화됩니다. 확장이 설치되고 나면, **ddtrace**가 애플리케이션을 추적하고 트레이스를 Agent로 전송합니다.

Datadog은 모든 웹 프레임워크를 기본적으로 지원합니다. 자동 계측은 PHP의 런타임이 특정 함수 및 메서드를 래핑하여 추적하도록 수정하는 방식으로 작동합니다. PHP 트레이서는 여러 라이브러리에 대하여 자동 계측을 지원합니다.

자동 계측이 캡처하는 항목:

* 메서드 실행 시간
* URL, 웹 요청에 대한 상태 응답 코드 또는 데이터베이스 액세스를 위한 SQL 쿼리와 같은 관련 트레이스 데이터
* 처리되지 않은 예외 사항(스택 트레이스를 사용할 수 있는 경우 스택 트레이스 포함)
* 시스템을 통과하는 트레이스(예: 웹 요청)의 총 수

## 구성 {#configuration}

필요한 경우 Unified Service Tagging 구성을 포함하여, SDK가 애플리케이션 성능 텔레메트리 데이터를 원하는 방식으로 전송하도록 구성하세요. 자세한 내용은 [라이브러리 구성][6]을 참조하세요.

서비스 또는 리소스별로 트레이스 수집을 제어하려면(리소스 이름에서 와일드카드 사용 포함) [리소스 기반 샘플링을 사용하여 트레이스 수집 제어][15]를 참조하세요.

## 단기 및 장기 CLI 스크립트 트레이싱 {#tracing-short-and-long-running-cli-scripts}

CLI 스크립트를 계측하려면 추가적인 단계가 필요합니다. 자세한 내용은 [PHP CLI 스크립트 추적][7]을 참조하세요.

## 업그레이드 {#upgrading}

PHP 트레이서를 업그레이드하려면 [최신 릴리스를 다운로드][5]하고 [확장 설치](#install-the-extension)와 동일한 단계를 따릅니다.

설치가 완료되면 PHP(PHP-FPM 또는 Apache SAPI)를 다시 시작합니다.

**참고**: 파라미터 `opcache.file_cache`를 설정하여 OPcache의 2차 캐싱을 사용 중인 경우, 캐시 폴더를 제거합니다.

## 제거 {#removing}

PHP 트레이서를 제거하는 방법:

1. php-fpm의 경우, php-fpm 서비스를 중지하거나 Apache 웹 서버를 중지합니다.
2. 파일 `98-ddtrace.ini` 및 `99-ddtrace-custom.ini`를 php 구성 폴더에서 연결 해제합니다.
3. php-fpm의 경우, php-fpm 서비스를 다시 시작하거나 Apache 웹 서버를 다시 시작합니다.

**참고**: 파라미터 `opcache.file_cache`를 설정하여 OPcache의 2차 캐싱을 사용 중인 경우, 캐시 폴더를 제거합니다.

## 애플리케이션 충돌 문제 해결 {#troubleshooting-an-application-crash}

PHP 트레이서로 인해 드물게 애플리케이션 충돌이 발생하는 경우(일반적으로 세그먼테이션 오류에 기인), 코어 덤프 또는 Valgrind 트레이스를 획득하고 Datadog 지원팀에 문의하는 것이 최선입니다.

### 디버그 기호 설치 {#install-debug-symbols}

코어 덤프를 읽을 수 있으려면 PHP를 실행하는 시스템에 PHP 바이너리의 디버그 기호가 설치되어 있어야 합니다.

PHP 또는 PHP-FPM의 디버그 기호가 설치되었는지 검사하려면 `gdb`를 사용하세요.

`gdb` 설치:

```
apt|yum install -y gdb
```

관심 바이너리를 사용하여 `gdb`를 실행합니다. 예를 들어 PHP-FPM의 경우:

```
gdb php-fpm
```

`gdb` 출력이 아래 텍스트와 비슷한 라인을 포함하는 경우, 디버그 기호가 이미 설치된 것입니다.

```
...
Reading symbols from php-fpm...Reading symbols from /usr/lib/debug/path/to/some/file.debug...done.
...
```

`gdb` 출력이 아래 텍스트와 비슷한 라인을 포함하는 경우, 디버그 기호를 설치해야 합니다.

```
...
Reading symbols from php-fpm...(no debugging symbols found)...done.
...
```


#### Centos {#centos}

프로그램 `debuginfo-install`을 제공하는 패키지 `yum-utils` 설치:

```
yum install -y yum-utils
```

PHP 바이너리의 패키지 이름을 찾으세요. 이 이름은 PHP 설치 방법에 따라 다를 수 있습니다.

```
yum list installed | grep php
```

디버그 기호를 설치합니다. 예를 들어 패키지 `php-fpm`의 경우:

```
debuginfo-install -y php-fpm
```

**참고**: PHP 바이너리를 제공하는 리포지토리가 기본적으로 활성화되지 않은 경우, `debuginfo-install` 명령을 실행할 때 활성화할 수 있습니다. 예:

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

#### Debian {#debian}

##### Sury Debian DPA에서 설치된 PHP {#php-installed-from-the-sury-debian-dpa}

PHP가 [Sury Debian DPA][8]에서 설치된 경우, 이미 디버그 기호를 DPA에서 사용할 수 있습니다. 예를 들어 PHP-FPM 7.2의 경우:

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### 다른 패키지에서 설치된 PHP {#php-installed-from-a-different-package}

Debian 프로젝트는 [디버그 기호 설치 지침][9]이 기재된 위키 페이지를 유지 관리합니다.

파일 `/etc/apt/sources.list` 편집:

```
# ... leave here all the pre-existing packages

# add a `deb` deb http://deb.debian.org/debian-debug/ $RELEASE-debug main
# For example for buster
deb http://deb.debian.org/debian-debug/ buster-debug main
```

`apt` 업데이트:

```
apt update
```

먼저 디버그 기호의 표준 패키지 이름을 사용해 보세요. 예를 들어 패키지 이름이 `php7.2-fpm`인 경우, 다음을 사용해 보기:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

디버그 기호를 찾을 수 없는 경우, 유틸리티 도구 `find-dbgsym-packages`를 사용합니다. 바이너리 설치:

```
apt install -y debian-goodies
```

바이너리로의 전체 경로 또는 실행 중인 프로세스의 프로세스 id로부터 디버그 기호 찾기 시도:

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

찾은 경우, 찾은 패키지 이름 설치:

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

#### Ubuntu {#ubuntu}

##### `ppa:ondrej/php`에서 설치된 PHP {#php-installed-from-ppaondrejphp}

PHP가 [`ppa:ondrej/php`][10]에서 설치된 경우, `main/debug` 구성 요소를 추가하여 apt 소스 파일 `/etc/apt/sources.list.d/ondrej-*.list`를 편집합니다.

전:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

후:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

디버그 기호를 업데이트하고 설치합니다. 예를 들어 PHP-FPM 7.2의 경우:

```
apt update
apt install -y php7.2-fpm-dbgsym
```
##### 다른 패키지에서 설치된 PHP {#php-installed-from-a-different-package-1}

PHP 바이너리의 패키지 이름을 찾으세요. 이 이름은 PHP 설치 방법에 따라 다를 수 있습니다.

```
apt list --installed | grep php
```

**참고**: 상황에 따라 `php-fpm`이 실제 패키지를 참조하는 메타패키지일 수 있습니다. 예를 들어 PHP-FPM 7.2인 경우 `php7.2-fpm`이 됩니다. 이런 경우 패키지 이름은 실제 패키지 이름입니다.

먼저 디버그 기호의 표준 패키지 이름을 사용해 보세요. 예를 들어 패키지 이름이 `php7.2-fpm`인 경우, 다음을 사용해 보기:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

`-dbg` 및 `-dbgsym` 패키지를 찾을 수 없는 경우, `ddebs` 리포지토리를 활성화합니다. `ddebs`에서 [디버그 기호를 설치][11]하는 방법에 관한 자세한 정보는 Ubuntu 설명서를 참조하세요.

예를 들어 Ubuntu 18.04+의 경우, `ddebs` 리포지토리 활성화:

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

서명 키 가져오기([서명 키가 정확해야 함][12]):

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <SIGNING KEY FROM UBUNTU DOCUMENTATION>
apt update
```

디버그 기호에 대한 표준 패키지 이름을 추가해 보세요. 예를 들어 패키지 이름이 `php7.2-fpm`인 경우, 다음을 사용해 보기:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

디버그 기호를 찾을 수 없는 경우, 유틸리티 도구 `find-dbgsym-packages`를 사용합니다. 바이너리 설치:

```
apt install -y debian-goodies
```

바이너리로의 전체 경로 또는 실행 중인 프로세스의 프로세스 id로부터 디버그 기호 찾기 시도:

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

찾은 경우, 찾은 패키지 이름 설치:

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

### 코어 덤프 획득 {#obtaining-a-core-dump}

특히 PHP-FPM에서는 PHP 애플리케이션의 코어 덤프를 획득하기 어려울 수 있습니다. 코어 덤프 획득에 도움이 되는 몇 가지 팁을 소개합니다.

1. 애플리케이션 오류 로그를 살펴보아 PHP-FPM이 코어 덤프를 생성했는지 판단:
   - `(SIGSEGV - core dumped)`와 같은 메시지가 있으면 덤핑되었다는 뜻이므로 해당 메시지 검색: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`.
   - `(SIGSEGV)`와 같은 메시지가 있으면 코어가 덤핑되지 않았다는 뜻이므로 해당 메시지 검색: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`.
1. `cat /proc/sys/kernel/core_pattern`을 실행하여 코어 덤프의 위치를 찾습니다. 기본 값은 일반적으로 `core`이며, 이는 이름이 `core`인 파일이 웹 루트 폴더에서 생성될 것이라는 의미입니다.

생성된 코어 덤프가 없으면 다음 구성을 검사하고 필요에 따라 변경하세요.

1. `/proc/sys/kernel/core_pattern`이 중첩된 디렉터리를 포함하는 경로를 포함하는 경우, 전체 디렉터리 경로가 존재하는지 확인합니다.
1. PHP-FPM 풀 워커를 실행 중인 사용자가 `root` 외의 다른 사용자인 경우(보편적인 사용자 이름은 `www-data`임) 해당 사용자에게 코어 덤프 디렉터리에 대한 쓰기 권한을 부여합니다.
1. `/proc/sys/fs/suid_dumpable`의 값이 `0`이 아니어야 합니다. 이 값을 `1` 또는 `2`로 설정합니다(단, PHP-FPM 워커 풀을 `root`로 실행하는 경우는 예외). 시스템 관리자에게 문의하여 옵션을 확인하세요.
1. PHP-FPM 풀 구성 섹션에 적합한 `rlimit_core`가 있어야 합니다. 이것을 무제한 `rlimit_core = unlimited`로 설정할 수 있습니다.
1. 시스템에 적절한 `ulimit`가 설정되어 있어야 합니다. 이것을 무제한 `ulimit -c unlimited`로 설정할 수 있습니다.
1. 애플리케이션이 Docker 컨테이너에서 실행되는 경우, `/proc/sys/*`에 대한 변경은 호스트 머신에 대하여 수행해야 합니다. 사용 가능한 옵션을 알아보려면 시스템 관리자에게 문의하세요. 할 수 있다면, 문제를 테스트 또는 스테이징 환경에서 재현해 보세요.

### Docker 컨테이너 내에서 코어 덤프 획득 {#obtaining-a-core-dump-from-within-a-docker-container}

Docker 컨테이너에서 코어 덤프를 획득하는 데 도움이 되는 아래 정보 활용:

1. Docker 컨테이너는 권한 있는 컨테이너로 실행해야 하며, 코어 파일의 `ulimit` 값을 아래 예시에 표시된 것과 같이 최댓값으로 설정해야 합니다.
   - `docker run` 명령을 실행하는 경우, `--privileged` 및 `--ulimit core=99999999999` 인수 추가
   - `docker compose`를 사용하는 경우, `docker-compose.yml` 파일에 다음 추가:

```yaml
privileged: true
ulimits:
  core: 99999999999
```
2. 컨테이너를 실행할 때(그리고 PHP 애플리케이션을 시작하기 전에) 다음 명령을 실행해야 함:

```
ulimit -c unlimited
echo '/tmp/core' > /proc/sys/kernel/core_pattern
echo 1 > /proc/sys/fs/suid_dumpable
```

### Valgrind 트레이스 획득 {#obtaining-a-valgrind-trace}

충돌에 관한 더 많은 세부 정보를 얻으려면 Valgrind를 사용해 애플리케이션을 실행합니다. 코어 덤프와는 달리 이 방식은 권한이 없는 컨테이너에서 항상 작동합니다.

<div class="alert alert-warning">
<strong>참고</strong>: Valgrind를 통해 실행되는 애플리케이션은 네이티브 방식으로 실행할 때보다 몇 배 느립니다. 이 방법은 프로덕션 외 환경에서 권장됩니다.
</div>

패키지 관리자를 사용하여 Valgrind를 설치합니다. 요청 몇 개를 생성하기 충분할 정도로 Valgrind를 사용해 애플리케이션을 실행합니다.

CLI 애플리케이션의 경우, 다음 실행:
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php path/to/script.php
{{< /code-block >}}
`php-fpm`을 실행할 때 다음 실행:
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}
Apache를 사용하는 경우, 다음 실행:
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- apache2 -X)`
{{< /code-block >}}

그 결과로 도출되는 Valgrind 트레이스는 기본적으로 표준 오류로 인쇄됩니다. 다른 대상으로 인쇄하려면 [공식 설명서][13]를 따르세요. 예상되는 출력은 PHP-FPM 프로세스에 대한 아래 예시와 비슷합니다.

```
==322== Conditional jump or move depends on uninitialised value(s)
==322==    at 0x41EE82: zend_string_equal_val (zend_string.c:403)
==322==    ...
==322==    ...
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==322==    at 0x73C8657: kill (syscall-template.S:81)
==322==    by 0x1145D0F2: zif_posix_kill (posix.c:468)
==322==    by 0x478BFE: ZEND_DO_ICALL_SPEC_RETVAL_UNUSED_HANDLER (zend_vm_execute.h:1269)
==322==    by 0x478BFE: execute_ex (zend_vm_execute.h:53869)
==322==    by 0x47D9B0: zend_execute (zend_vm_execute.h:57989)
==322==    by 0x3F6782: zend_execute_scripts (zend.c:1679)
==322==    by 0x394F0F: php_execute_script (main.c:2658)
==322==    by 0x1FFE18: main (fpm_main.c:1939)
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV)
==322==    ...
==322==    ...
==322==
==322== HEAP SUMMARY:
==322==     in use at exit: 3,411,619 bytes in 22,428 blocks
==322==   total heap usage: 65,090 allocs, 42,662 frees, 23,123,409 bytes allocated
==322==
==322== LEAK SUMMARY:
==322==    definitely lost: 216 bytes in 3 blocks
==322==    indirectly lost: 951 bytes in 32 blocks
==322==      possibly lost: 2,001,304 bytes in 16,840 blocks
==322==    still reachable: 1,409,148 bytes in 5,553 blocks
==322==                       of which reachable via heuristic:
==322==                         stdstring          : 384 bytes in 6 blocks
==322==         suppressed: 0 bytes in 0 blocks
==322== Rerun with --leak-check=full to see details of leaked memory
==322==
==322== Use --track-origins=yes to see where uninitialised values come from
==322== For lists of detected and suppressed errors, rerun with: -s
==322== ERROR SUMMARY: 18868 errors from 102 contexts (suppressed: 0 from 0)
```

### strace 획득 {#obtaining-a-strace}

몇몇 문제는 외부 요인으로 인해 발생할 수 있으므로, `strace`를 확보하면 가치가 있을 수 있습니다.

<div class="alert alert-warning">
<strong>참고</strong>:  <code>strace</code> 를 통해 실행되는 애플리케이션은 네이티브 방식으로 실행할 때보다 몇 배 느립니다. 이 방법은 프로덕션 외 환경에서 권장됩니다.
</div>

패키지 관리자를 사용하여 `strace`를 설치합니다. Datadog 지원팀에 전송할 `strace`를 생성할 때, `-f` 옵션을 사용하여 하위 프로세스를 따라야 합니다.

CLI 애플리케이션의 경우, 다음 실행:
{{< code-block lang="shell" >}}
strace -f php path/to/script.php
{{< /code-block >}}

`php-fpm`의 경우, 다음 실행:
{{< code-block lang="shell" >}}
strace -f php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}

Apache의 경우 다음 실행:
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; strace -f apache2 -X)
{{< /code-block >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /ko/tracing/glossary/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://github.com/DataDog/dd-trace-php/releases
[6]: /ko/tracing/trace_collection/library_config/php/
[7]: /ko/tracing/guide/trace-php-cli-scripts/
[8]: https://packages.sury.org/php/
[9]: https://wiki.debian.org/HowToGetABacktrace
[10]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[11]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[12]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
[13]: https://valgrind.org/docs/manual/manual-core.html#manual-core.comment
[14]: /ko/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[15]: /ko/tracing/guide/resource_based_sampling/