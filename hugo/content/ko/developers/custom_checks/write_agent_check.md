---
aliases:
- /ko/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
- /ko/agent/faq/agent-5-custom-agent-check/
- /ko/developers/write_agent_check/
further_reading:
- link: /developers/
  tag: 설명서
  text: Datadog에서 개발
title: 커스텀 에이전트 점검 작성
---

## 개요

이 페이지에서는 기본적인 "Hello world!" 사용자 정의 Agent 점검을 만드는 과정을 안내합니다. 또한 점검의 최소 수집 간격을 변경하는 방법도 보여줍니다.

## 설정

### 설치

사용자 정의 Agent 점검을 생성하기 전에 [Datadog Agent][1]를 설치하세요.

<div class="alert alert-danger">최신 버전의 Agent를 사용하려면 사용자 정의 Agent 점검이 Python 3와 호환되어야 합니다.</div>

### 구성

1. 시스템에서 `conf.d` 디렉터리로 이동합니다. `conf.d` 디렉터리 위치에 대한 자세한 내용은 [Agent 구성 파일][2]을 참고하세요.
2. `conf.d` 디렉토리에서 새 에이전트 검사를 위한 새 config 파일을 생성합니다. `custom_checkvalue.yaml`로 파일 이름을 지정합니다.
3. 다음을 포함하도록 파일을 편집합니다:
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. `checks.d` 디렉터리에 점검 파일을 만듭니다. 파일 이름을 `custom_checkvalue.py`로 지정합니다.

   <div class="alert alert-info">
     <strong>Naming your checks:</strong>
     <ul>
       <li>It's a good idea to prefix your check with <code>custom_</code> to avoid conflicts with the name of a pre-existing Datadog Agent integration. For example, if you have a custom Postfix check, name your check files <code>custom_postfix.py</code> and <code>custom_postfix.yaml</code> instead of <code>postfix.py</code> and <code>postfix.yaml</code>.</li>
       <li>The names of the configuration and check files must match. If your check is called <code>custom_checkvalue.py</code>, your configuration file <i>must</i> be named <code>custom_checkvalue.yaml</code>.</li>
     </ul>
   </div>
5. 다음을 포함하도록 파일을 편집합니다:
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Agent를 다시 시작][3]하고 [Metric Summary][4]에 `hello.world`라는 새 메트릭이 표시될 때까지 기다립니다.

사용자 정의 점검이 제대로 작동하지 않는 경우 파일 권한을 확인하세요. 점검 파일은 Agent 사용자가 읽고 실행할 수 있어야 합니다. 자세한 문제 해결 방법은 [Agent 점검 문제 해결][7]을 참고하세요.

### 수집 간격 업데이트

점검 수집 간격을 변경하려면 `custom_checkvalue.yaml` 파일의 `min_collection_interval` 설정을 사용하고 초 단위로 지정하세요. 기본값은 15초입니다. `min_collection_interval`을 인스턴스 수준에서 추가해야 합니다. 사용자 정의 점검이 여러 인스턴스를 모니터링하도록 설정된 경우 인스턴스별로 간격을 개별적으로 설정해야 합니다.

`min_collection_interval`을 `30`으로 설정한다고 해서 메트릭이 30초마다 수집된다는 보장은 없습니다. Agent 수집기는 30초마다 점검을 실행하려고 하지만, 동일한 Agent에서 활성화된 통합 및 점검 수에 따라 점검이 다른 통합 및 점검 뒤 대기열에 포함될 수 있습니다.`check` 메서드가 완료되는데 30초 이상 걸리는 경우, Agent는 점검이 아직 실행 중임을 감지하고 다음 간격까지 실행을 건너뜁니다.

#### 수집 간격 설정

단일 인스턴스의 경우 이 구성을 사용하여 수집 간격을 30초로 설정합니다.

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

아래 예는 두 개의 별도 서버에서 `my_service`라는 서비스를 모니터링하는 가상 사용자 정의 점검의 간격 변경 방법을 보여줍니다.

{{< code-block lang="yaml" >}}
init_config:

instances:
  - host: "http://localhost/"
    service: my_service
    min_collection_interval: 30

  - host: "http://my_server/"
    service: my_service
    min_collection_interval: 30
{{< /code-block >}}

### 점검 확인하기

검사가 실행 중인지 확인하려면 다음 명령어를 사용하세요.

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

점검이 실행 중인지 확인한 후 [Agent를 다시 시작][3]하여 점검을 포함하고 데이터 보고를 시작합니다.

## 명령줄 프로그램을 실행하는 검사 작성

명령줄 프로그램을 실행하고 출력을 커스텀 메트릭으로 캡처하는 커스텀 검사를 생성할 수 있습니다. 예를 들어, 검사는 볼륨 그룹에 대한 정보를 보고하는 `vgs` 명령을 실행할 수 있습니다.

점검을 실행하는 Python 인터프리터가 다중 스레드 Go 런타임에 내장되어 있으므로 Python 표준 라이브러리의 `subprocess` 또는 `multithreading` 모듈을 사용할 수 없습니다. 점검 내에서 하위 프로세스를 실행하려면 `datadog_checks.base.utils.subprocess_output` 모듈의 [`get_subprocess_output()` 함수][5]를 사용합니다. 명령과 인수는 목록 형태로 `get_subprocess_output()`에 전달되며, 명령과 인수는 목록 내의 문자열로 표시됩니다.

예를 들어, 명령 프롬프트에서 다음과 같은 명령을 입력합니다:

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

다음과 같이 반드시 `get_subprocess_output()`로 전달해야 합니다.

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

명령줄 프로그램을 실행할 때 검사는 터미널의 명령줄에서 실행되는 것과 동일한 출력을 캡처합니다. 숫자 유형을 반환하기 위해 출력에서 문자열 처리를 수행하고 결과에서 `int()` 또는 `float()`를 호출하세요.

하위 프로세스의 출력에 문자열 처리를 하지 않거나 정수 또는 부동 소수점을 반환하지 않으면 점검은 오류 없이 실행되는 것처럼 보이지만 메트릭이나 이벤트를 보고하지 않습니다. 또한 Agent 사용자에게 명령에서 참조되는 파일이나 디렉터리에 대한 올바른 권한이 없거나, 인수로 `get_subprocess_output()`에 전달된 명령을 실행할 수 있는 올바른 권한이 없는 경우에도 점검은 메트릭이나 이벤트를 반환하지 않습니다.

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

## 로드 밸런서에서 데이터 보내기

사용자 정의 Agent 점검을 작성하는 일반적인 사용 사례는 로드 밸런서에서 Datadog 메트릭을 전송하는 것입니다. 시작하기 전에 [구성](#configuration) 단계를 따르세요.

로드 밸런서에서 데이터를 전송하기 위해 파일을 확장하는 방법:

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

1. [Agent를 다시 시작합니다.][3] 1분 이내에 로드 밸런서에서 메트릭을 전송하는 `coreapp.update.value`라는 새 메트릭이 [Metric Summary][4]에 표시됩니다.
1. 이 메트릭에 대한 [대시보드를 생성][6]합니다.

## Agent 버전 관리

다음 try/except 블록을 사용하여 커스텀 검사가 모든 에이전트 버전과 호환되도록 설정합니다:

{{< code-block lang="python" >}}
try:
    # 먼저, Agent의 새 버전에서 기본 클래스를 가져오려고 시도합니다.
    from datadog_checks.base import AgentCheck
except ImportError:
    # 위의 방법이 실패하면 점검은 Agent 6.6.0 미만 버전에서 실행 중입니다.
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
[2]: /ko/agent/configuration/agent-configuration-files/#check-configuration-files
[3]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /ko/dashboards/
[7]: /ko/agent/troubleshooting/agent_check_status/