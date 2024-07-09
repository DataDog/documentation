---
aliases:
- /ko/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
- /ko/agent/faq/agent-5-custom-agent-check/
further_reading:
- link: /developers/
  tag: 설명서
  text: Datadog에서 개발
title: 커스텀 에이전트 검사 작성
---

## 개요

이 페이지에서는 `min_collection_interval`을 사용하여 샘플 커스텀 Agent 검사를 만드는 과정을 안내하며 샘플 커스텀 검사를 확장하는 사용 사례 예제를 제공합니다. 커스텀 검사는 기본값이 매 15초인 Agent 기반 통합과 동일하게 고정된 간격으로 실행됩니다.

## 설정

### 설치

커스텀 에이전트 검사를 생성하려면 [Datadog Agent][1]를 먼저 설치하세요.

**참고**: Agent v7+를 실행 중인 경우 커스텀 에이전트 검사는 Python 3와 호환되어야 합니다. 또는 Python 2.7+와 호환되어야 합니다.

### 구성

1. 시스템에서 `conf.d` 디렉토리로 변경합니다. `conf.d` 디렉토리를 찾을 위치에 대한 자세한 내용은 [Agent 설정 파일][2]을 참조하세요.
2. `conf.d` 디렉토리에서 새 에이전트 검사를 위한 새 config 파일을 생성합니다. `custom_checkvalue.yaml`로 파일 이름을 지정합니다.
3. 다음을 포함하도록 파일을 편집합니다:
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. `checks.d` 디렉토리에 검사 파일을 만듭니다. `custom_checkvalue.py` 파일 이름을 지정합니다.
5. 다음을 포함하도록 파일을 편집합니다:
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Agent를 재시작하세요][3]. 1분 이내에`hello.world`라는 [메트릭 요약][4]에서 새 메트릭이 표시됩니다.

**참고**: 설정과 검사 파일의 이름이 일치해야 합니다. 검사 이름이 `custom_checkvalue.py`인 경우 설정 파일의 이름을 *반드시* `custom_checkvalue.yaml`로 지정해야 합니다.

### 결과

1분 이내에 `1` 값을 전송하는 `hello.world`라는 [메트릭 요약][4]에 새 메트릭이 표시됩니다.

**참고**: 커스텀 검사 이름을 선택할 때 기존 Datadog Agent 통합의 이름과 겹치지 않도록 `custom_`를 접두사로 추가해야 합니다. 예를 들어 커스텀 Postfix 검사가 있는 경우 검사 파일의 이름을 `postfix.py` 및 `postfix.yaml` 대신 `custom_postfix.py`및 `custom_postfix.yaml`로 지정합니다.

### 수집 간격 업데이트

검사의 수집 간격을 변경하려면 `custom_checkvalue.yaml` 파일에서 `min_collection_interval`을 사용합니다. 기본값은 `15`입니다. Agent v6의 경우 인스턴스 레벨에서 `min_collection_interval`를 추가하고 인스턴스 당 개별적으로 설정해야 합니다. 예:

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

**참고**: `min_collection_interval`이 `30`로 설정되어 있으면 메트릭이 30초마다 수집되는 것이 아니라 30초마다 가능한 자주 수집되는 것입니다. 컬렉터는 30초마다 검사를 실행하나 동일한 Agent에 활성화되어 있는 통합과 검사 수에 따라 대기해야 할 수도 있습니다.  또한 `check` 방식이 완료되는 데 30초 이상 걸릴 경우 Agent는 검사가 실행 중임을 인지하고 다음 간격까지 실행을 건너뜁니다.

### 검사 확인하기

검사가 실행 중인지 확인하려면 다음 명령어를 사용하세요.

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

검사가 실행 중인 것을 확인하면 [Agent를 다시 시작][3]하여 검사를 포함시키고 데이터를 Datadog에 보고하기 시작합니다.

## 명령줄 프로그램을 실행하는 검사 작성

명령줄 프로그램을 실행하고 출력을 커스텀 메트릭으로 캡처하는 커스텀 검사를 생성할 수 있습니다. 예를 들어, 검사는 볼륨 그룹에 대한 정보를 보고하는 `vgs` 명령을 실행할 수 있습니다.

검사 내에서 하위 프로세스를 실행하려면 `datadog_checks.base.utils.subprocess_output` 모듈의 [ `get_subprocess_output()`기능][5]을 사용합니다. 명령과 해당 인수는 목록 내의 문자열 형태로 `get_subprocess_output()`에 전달됩니다.

### 예시

예를 들어, 명령 프롬프트에서 다음과 같은 명령을 입력합니다:

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

다음과 같이 반드시 `get_subprocess_output()`로 전달해야 합니다.

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

**참고**: 검사를 실행하는 파이썬(Python) 인터프리터는 멀티스레드 Go 런타임에 내장되어 있으므로 파이썬(Python) 표준 라이브러리의 `subprocess` 또는 `multithreading` 모듈은 Agent 버전 6 이상에서 지원되지 않습니다.

### 결과

명령줄 프로그램을 실행할 때 검사는 터미널의 명령줄에서 실행되는 것과 동일한 출력을 캡처합니다. 숫자 유형을 반환하기 위해 출력에서 문자열 처리를 수행하고 결과에서 `int()` 또는 `float()`를 호출하세요.

하위 프로세스의 출력에 대해 문자열 처리를 수행하지 않거나 정수 또는 부동 소수점을 반환하지 않으면 검사는 오류 없이 실행되는 것처럼 보이나 데이터는 보고하지 않습니다.

다음은 명령줄 프로그램 결과를 반환하는 검사 예시입니다:

{{< code-block lang="python" >}}
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() returns an int by default
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## 로드 밸런서에서 데이터 전송

커스텀 에이전트 검사를 작성할 때 일반적으로 로드 밸런서에서 Datadog 메트릭을 전송합니다. 시작하기 전 [설정](#configuration) 단계를 따르세요.

로드 밸런서에서 데이터를 보낼 파일을 확장하려면:

1. `custom_checkvalue.py`의 코드를 다음 항목으로 대체합니다. (`lburl`의 값을 로드 밸런서의 주소로 대체):
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
import urllib2
import simplejson
from checks import AgentCheck

class CheckValue(AgentCheck):
  def check(self, instance):
    lburl = instance['ipaddress']
    response = urllib2.urlopen("http://" + lburl + "/rest")
    data = simplejson.load(response)

    self.gauge('coreapp.update.value', data["value"])
{{< /code-block >}}

1. `custom_checkvalue.yaml` 파일을 업데이트합니다 (`ipaddress`를 로드 밸런서의 IP 주소로 대체):
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - ipaddress: 1.2.3.4
{{< /code-block >}}

1. [Agent를 다시 시작합니다][3]. 1분 이내에 로드 밸런서에서 메트릭을 전송하는`coreapp.update.value` [메트릭 요약][4]에 새 메트릭이 표시됩니다.
1. 이 메트릭에 대한 [대시보드를 생성][6]합니다.

## Agent 버전 지정

다음 try/except 블록을 사용하여 커스텀 검사가 모든 에이전트 버전과 호환되도록 설정합니다:

{{< code-block lang="python" >}}
try:
    # 먼저 새 버전의 Agent에서 기본 클래스를 가져옵니다.
    from datadog_checks.base import AgentCheck
except ImportError:
    # 위에서 실패한 경우 Agent 버전 6.6.0 미만에서 검사가 실행 중입니다.
    from checks import AgentCheck

# 특수 변수 __version__의 내용은 Agent 상태 페이지에 표시됩니다
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/configuration/agent-configuration-files#agent-configuration-directory
[3]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /ko/dashboards/