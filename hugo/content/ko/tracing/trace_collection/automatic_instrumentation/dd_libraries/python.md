---
aliases:
- /ko/tracing/python/
- /ko/tracing/languages/python/
- /ko/agent/apm/python/
- /ko/tracing/setup/python
- /ko/tracing/setup_overview/python
- /ko/tracing/setup_overview/setup/python
- /ko/tracing/trace_collection/dd_libraries/python/
code_lang: 파이썬(Python)
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: 소스 코드
  text: 소스 코드
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: 외부 사이트
  text: API 설명서
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스 및 트레이스 탐색
- link: tracing/
  tag: 설명서
  text: 고급 사용
title: 파이썬(Python) 애플리케이션 추적
type: multi-code-lang
---
## 호환성 요구 사항
Datadog의 파이썬(Python) 버전과 프레임워크 지원(레거시 및 유지 보수 버전 포함) 전체 목록을 확인하려면 [호환성 요구사항][1] 페이지를 참고하세요.

## 시작하기

시작하기 전에 먼저 [에이전트를 설치하고 구성][13]했는지 확인하세요.

### 애플리케이션의 계측

Datadog Agent를 설치하고 구성한 후 다음 단계는 추적 라이브러리를 애플리케이션에 직접 추가하여 계측하는 것입니다. [호환성 정보][1]에 대해 자세히 알아보세요.

Python으로 작성된 애플리케이션 추적을 시작하려면 pip를 사용하여 Datadog Tracing 라이브러리를 설치하세요.

```python
pip install ddtrace
```

**참고**: 해당 명령을 실행하려면 pip `18.0.0` 버전 이상이 필요합니다. 우분투(Ubuntu) , 데비안(Debian) 또는 다른 패키지 매니저의 경우 아래의 명령으로 pip 버전을 업데이트합니다.

```python
pip install --upgrade pip
```

그런 다음 포함된 `ddtrace-run` 명령을 사용하여 파이썬(Python) 애플리케이션을 계측합니다. 해당 기능을 사용하려면 파이썬(Python) 엔트리 포인트 명령어 앞에 `ddtrace-run`을 붙입니다.

예를 들어, 애플리케이션이 `python app.py`로 시작되는 경우 다음을 참조합니다.

```shell
ddtrace-run python app.py
```

설정을 완료한 후 애플리케이션에서 트레이서를 실행하는 도중 `ddtrace-run --info`을 실행하여 해당 설정이 예상대로 작동하는지 점검할 수 있습니다. 해당 명령 출력에 런타임 중 코드에서 변경된 설정 변경 사항은 반영되지 않는다는 점에 유의하세요.

## 구성

필요한 경우 통합 서비스 태깅 설정을 포함하여 필요에 따라 애플리케이션 성능 원격 측정 데이터를 전송하도록 추적 라이브러리를 설정합니다. 자세한 내용을 확인하려면 [라이브러리 설정][3]을 참조하세요.

트레이스 연결은 다음과 같은 코드로도 설정할 수 있습니다.

```python
from ddtrace import tracer

# 네트워크 소켓
tracer.configure(
    https=False,
    hostname="custom-hostname",
    port="1234",
)

# Unix 도메인 소켓 설정
tracer.configure(
    uds_path="/var/run/datadog/apm.socket",
)
```

스탯 연결은 다음과 같은 코드로도 설정할 수 있습니다.

```python
from ddtrace import tracer

# 네트워크 소켓
tracer.configure(
  dogstatsd_url="udp://localhost:8125",
)

# Unix 도메인 소켓 설정
tracer.configure(
  dogstatsd_url="unix:///var/run/datadog/dsd.socket",
)
```

### v1로 업그레이드

ddtrace v1으로 업그레이드하려면, 자세한 내용은 라이브러리 문서의 [업그레이드 지침][4] 및 [릴리스 노트][5]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /ko/tracing/trace_collection/library_config/python/
[4]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[5]: https://ddtrace.readthedocs.io/en/v1.0.0/release_notes.html
[11]: /ko/tracing/trace_collection/library_injection_local/
[13]: /ko/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent