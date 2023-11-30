---
aliases:
- /ko/developers/dogstatsd/data_types/
description: DogStatsD에서 사용하는 데이터그램 형식과 (고급) 쉘 사용에 대한 개요
further_reading:
- link: developers/dogstatsd
  tag: 설명서
  text: DogStatsD 소개
- link: developers/libraries
  tag: 설명서
  text: 공식적으로 커뮤니티에서 만든 API 및 DogStatsD 클라이언트 라이브러리
kind: 설명서
title: 데이터그램 형식 및 쉘 사용
---

이 섹션에서는 DogStatsD가 수락하는 메트릭, 이벤트 및 서비스 검사의 원시 데이터그램 형식을 지정합니다. 원시 데이터그램은 UTF-8로 인코딩됩니다. [DogStatsD 클라이언트 라이브러리][1]를 사용하는 경우에는 건너 뛰어도 되는 부분이지만, 사용자 고유의 라이브러리를 작성하거나 쉘을 사용하여 메트릭을 전송하는 경우에는 반드시 확인하세요.

## DogStatsD 프로토콜

{{< tabs >}}
{{% tab "Metrics" %}}

`<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| 파라미터                           | 필수 | 설명                                                                                                                                                    |
| ----------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<METRIC_NAME>`                     | 예      | ASCII 영숫자, 밑줄 및 마침표만 포함하는 문자열입니다. [메트릭 네이밍 정책][1]을 참조하세요.                                                  |
| `<VALUE>`                           | 예      | 정수 또는 부동 소수.                                                                                                                                           |
| `<TYPE>`                            | 예      | `c`는 카운트, `g`는 게이지, `ms`는 타이머, `h`는 히스토그램, `s`는 세트, `d`는 분포를 위한 것입니다. 자세한 내용은 [메트릭 유형][2]를 참조하세요.                    |
| `<SAMPLE_RATE>`                     | 아니요       | `0`와 `1` 사이의 부동 소소수점은 카운트, 히스토그램, 분포 및 타이머 메트릭에만 사용할 수 있습니다. 시간의 100%를 샘플링하는 기본값은 `1`입니다.  |
| `<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | 아니요       | 쉼표로 구분된 문자열 목록입니다. 키/값 태그(`env:prod`)에 콜론을 사용합니다. 태그 정의에 대한 지침은 [태그 시작하기][3]를 참조하세요.              |

다음은 데이터그램의 예입니다:

- `page.views:1|c`: `page.views`카운트 메트릭을 증가시켜 줍니다.
- `fuel.level:0.5|g`: 연료통의 반이 비었음을 기록합니다. 
- `song.length:240|h|@0.5`: `song.length`히스토그램을 절반만 보낸 것처럼 샘플링합니다.
- `users.uniques:1234|s`: 사이트에 대한 고유 방문자를 추적합니다.
- `users.online:1|c|#country:china`: 활성 사용자 카운트 메트릭과 태그를 원산지별로 증가시켜 줍니다.
- `users.online:1|c|@0.5|#country:china`: 활성화된 중국 사용자를 추적하고 샘플링 속도를 사용합니다.

### DogStatsD 프로토콜 v1.1

에이전트`>=v6.25.0` && `<v7.0.0` 또는 `>=v7.25.0`를 시작으로 값 패킹이 가능합니다. 이것은 `SET`를 제외한 모든 메트릭 유형을 지원합니다. 값은 다음과 같이 `:`로 구분됩니다:

`<METRIC_NAME>:<VALUE1>:<VALUE2>:<VALUE3>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

`TYPE`, `SAMPLE_RATE` 및 `TAGS`는 모든 값 사이에 공유됩니다. 이렇게 하면 각각 하나의 값으로 여러 개의 메시지를 보내는 보내는 것보다 동일한 메트릭을 생성합니다. 이는 히스토그램, 타이밍 및 분포 메트릭에 유용합니다.

### 데이터그램 예시

- `page.views:1:2:32|d`: 값 `1`,`2`, `32`를 사용하여 `page.views`분포 메트릭을 세 번 샘플링합니다.
- `song.length:240:234|h|@0.5`: `song.length`히스토그램을 절반씩 두 번 보낸 것처럼 샘플링합니다. 각 값에는 `0.5`의 샘플링 속도가 적용됩니다.

### DogStatsD 프로토콜 v1.2

에이전트 `>=v6.35.0` && `<v7.0.0` 또는 `>=v7.35.0`부터 새 컨테이너 ID 필드가 지원됩니다.
Datadog 에이전트는 컨테이너 ID 값을 사용하여 추가 컨테이너 태그로 DogStatsD 메트릭을 강화합니다.

컨테이너 ID에는 다음과 같이 `c:` 접두사가 붙습니다:

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|c:<CONTAINER_ID>`

**참고:**`datadog.yaml`파일 또는 환경 변수`DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT=true`에서 `dogstatsd_origin_detection_client`를 `true`로 설정하여 Datadog 에이전트에 컨테이너 ID 필드를 추출하고 해당 컨테이너 태그를 부착하도록 지시합니다.

### 데이터그램 예시

- `page.views:1|g|#env:dev|c:83c0a99c0a54c0c187f461c7980e9b57f3f6a8b0c918c8d93df19a9de6f3fe1d`: Datadog 에이전트는 `image_name`및 `image_tag`같은 컨테이너 태그를 `page.views`메트릭에 추가합니다.

컨테이너 태그에 대한 자세한 내용은 [쿠버네티스][4] 및 [도커][5] 태깅 설명서를 참조하세요.

### DogStatsD 프로토콜 v1.3

에이전트 v6.40.0+ 및 v7.40.0+는 부수적인 유닉스 타임스탬프 필드를 지원합니다.

이 필드가 제공되면, Datadog 에이전트는 태그로 메트릭을 보강하는 것 외에는 메트릭에 대해 어떠한 처리도 하지 않습니다(애그리게이션 없음). 이 필드는 애플리케이션에서 이미 메트릭을 집계하고 있으며, 추가 처리 없이 해당 메트릭을 Datadog으로 보내려는 경우에 유용할 수 있습니다.

유닉스 타임스탬프는 과거의 유효한 양수여야 합니다. 게이지 및 카운트 메트릭만 지원됩니다.

값은 유닉스 타임스탬프 (UTC)이며 다음과 같이 `T`가 접두사로 붙어야 합니다:

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|T<METRIC_TIMESTAMP>`

### 데이터그램 예시

- `page.views:15|c|#env:dev|T1656581400`: 2022년 6월 30일 오전 9시 30분 UTC에 15페이지가 조회되었음을 나타내는 카운트

[1]: /ko/metrics/#naming-metrics
[2]: /ko/metrics/types/
[3]: /ko/getting_started/tagging/
[4]: /ko/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[5]: /ko/agent/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
{{% /tab %}}
{{% tab "Events" %}}

`_e{<TITLE_UTF8_LENGTH>,<TEXT_UTF8_LENGTH>}:<TITLE>|<TEXT>|d:<TIMESTAMP>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| 파라미터                            | 필수 | 설명                                                                                                            |
| ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `_e`                                 | 예      | 데이터그램은 `_e`로 시작해야 합니다.                                                                                     |
| `<TITLE>`                            | 예      | 이벤트 타이틀입니다.                                                                                                       |
| `<TEXT>`                             | 예      | 이벤트 텍스트입니다. `\\n`로 줄 바꿈을 삽입합니다.                                                                        |
| `<TITLE_UTF8_LENGTH>`                | 예      | UTF-8로 인코딩된 `<TITLE>`의 길이(바이트)                                                                              |
| `<TEXT_UTF8_LENGTH>`                 | 예      | UTF-8로 인코딩된`<TEXT>`의 길이(바이트)                                                                               |
| `d:<TIMESTAMP>`                      | 아니요       | 이벤트에 타임스탬프를 추가합니다. 기본값은 현재 Unix epoch 타임스탬프입니다.                                         |
| `h:<HOSTNAME>`                       | 아니요       | 이벤트에 호스트 이름을 추가합니다. 기본값은 없습니다.                                                                               |
| `k:<AGGREGATION_KEY>`                | 아니요       | 애그리게이션 키를 추가하여 동일한 키를 가진 다른 이벤트와 이벤트를 그룹화합니다. 기본값 없습니다.                              |
| `p:<PRIORITY>`                       | 아니요       | `normal` 또는 `low`로 설정합니다. 기본값은 `normal`입니다.                                                                            |
| `s:<SOURCE_TYPE_NAME>`               | 아니요       | 소스 유형을 이벤트에 추가합니다. 기본값은 없습니다.                                                                            |
| `t:<ALERT_TYPE>`                     | 아니요       | `error`,`warning`,`info` 또는 `success`로 설정합니다. 기본값 `info`입니다.                                                        |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | 아니요       | 태그의 콜론은 태그 목록 문자열의 일부이며 다른 파라미터와 같은 파싱 목적이 없습니다. 기본값은 없습니다. |

다음은 데이터그램의 예시입니다:

```text
## Send an exception
_e{21,36}:An exception occurred|Cannot parse CSV file from 10.0.0.17|t:warning|#err_type:bad_file

## Send an event with a newline in the text
_e{21,42}:An exception occurred|Cannot parse JSON request:\\n{"foo: "bar"}|p:low|#err_type:bad_request
```

{{% /tab %}}
{{% tab "Service Checks" %}}

`_sc|<NAME>|<STATUS>|d:<TIMESTAMP>|h:<HOSTNAME>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|m:<SERVICE_CHECK_MESSAGE>`

| 파라미터                            | 필수 | 설명                                                                                                                             |
| ------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `_sc`                                | 예      | 데이터그램은 반드시 `_sc`로 시작해야 합니다.                                                                                                     |
| `<NAME>`                             | 예      | 서비스 검사 이름입니다.                                                                                                                 |
| `<STATUS>`                           | 예      | 검사 상태(OK = `0`, WARNING = `1` , Critical = `2`, UNKNOWN = `3` )에 해당하는 정수입니다.                                  |
| `d:<TIMESTAMP>`                      | 아니요       | 검사에 타임스탬프를 추가합니다. 기본값은 현재 Unix epoch 타임스탬프입니다.                                                          |
| `h:<HOSTNAME>`                       | 아니요       | 이벤트에 호스트 이름을 추가합니다(기본값 없음).                                                                                               |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | 아니요       | 이벤트의 태그를 설정합니다. 쉼표로 구분된 문자열 목록입니다(기본값 없음).                                                           |
| `m:<SERVICE_CHECK_MESSAGE>`          | 아니요       | 서비스 검사의 현재 상태를 설명하는 메시지입니다. 이 항목은 메타데이터 항목 중 마지막에 위치해야 합니다(기본값 없음). |

데이터그램 예시입니다:

```text
# 원격 연결에 대한 CRITICAL 상태 전송
_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s
```

{{% /tab %}}
{{< /tabs >}}

## DogStatsD 및 쉘을 사용하여 메트릭을 전송합니다.

Linux 및 기타 Unix 계열 OS의 경우 Bash를 사용합니다. Windows의 경우 PowerShell 및 [PowerShell-statsd][2](네트워크 비트를 처리하는 간단한 PowerShell 기능)을 사용합니다.

DogStatsD는 메트릭, 이벤트 또는 서비스 검사 정보가 포함된 메시지를 생성하여 로컬로 설치된 에이전트에 컬렉터로 보냅니다. 대상 IP 주소는 `127.0.0.1`이고, UDP를 통한 컬렉터 포트는 `8125`입니다. 에이전트 설정에 대한 자세한 내용은 [DogStatsD][3]을 참조하세요.

{{< tabs >}}
{{% tab "Metrics" %}}

메트릭 전송 형식은 다음과 같습니다:

```text
<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>
```

아래 예시에서는 `shell`태그와 함께 `custom_metric`로 호출되는 게이지 메트릭에 대한 데이터 포인트를 전송합니다.

Linux의 경우:

```shell
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

```shell
echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

```shell
echo -n "custom.metric.name:1|c"|nc -4u -w1 localhost 8125
```

Windows의 경우:

```powershell
PS C:\> .\send-statsd.ps1 "custom_metric:123|g|#shell"
```

파이썬(Python)이 있는 모든 플랫폼의 경우 (Windows에서는 에이전트의 내장 파이썬(Python) 인터프리터를 사용할 수 있으며, 에이전트 버전이 6.11 이하면 `%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe`에,  에이전트 버전 6.12 이상이면`%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe`에 위치 ):

### 파이썬 2

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

### 파이썬 3

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto(b"custom_metric:60|g|#shell", ("localhost", 8125))
```

{{% /tab %}}
{{% tab "Events" %}}

이벤트 전송 형식은 다음과 같습니다:

```text
_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<DATE_EVENT>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>.
```

아래 예시에서는 이벤트 제목과 본문의 크기를 계산합니다.

Linux의 경우:

```shell
$ title="셸의 이벤트"

$ text="Bash에서 보냈습니다!"

$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```

윈도우즈(Windows)의 경우:

```powershell
PS C:> $title = "셸의 이벤트"
PS C:> $text = "PowerShell에서 보냈습니다!!"
PS C:> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,PowerShell"
```

{{% /tab %}}
{{% tab "Service Checks" %}}

서비스 검사를 보내는 형식은 다음과 같습니다:

```text
_sc|<NAME>|<STATUS>|d:<TIMESTAMP>|h:<HOSTNAME>|#<TAG_KEY_1>:<TAG_VALUE_1>|m:<SERVICE_CHECK_MESSAGE>
```

Linux의 경우:

```shell
echo -n "_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s" >/dev/udp/localhost/8125
```

윈도우즈(Windows)의 경우:

```powershell
PS C:\> .\send-statsd.ps1 "_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s"
```

{{% /tab %}}
{{< /tabs >}}

컨테이너화된 환경에서 메트릭, 이벤트 또는 서비스 검사를 전송하려면, 설치 유형에 따라 [쿠버네티스에서 APM 설정하기][4] 및 [쿠버네티스의 DogStatsD][3]를 참조하세요. [도커 APM][5] 설명서도 도움이 될 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/community/libraries/#api-and-dogstatsd-client-libraries
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1
[3]: /ko/developers/dogstatsd/
[4]: /ko/agent/kubernetes/apm/
[5]: /ko/agent/docker/apm/