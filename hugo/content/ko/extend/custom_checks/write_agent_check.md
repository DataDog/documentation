---
aliases:
- /ko/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
- /ko/agent/faq/agent-5-custom-agent-check/
- /ko/developers/write_agent_check/
- /ko/developers/custom_checks/write_agent_check/
further_reading:
- link: /extend/
  tag: 설명서
  text: Datadog 확장
title: 사용자 지정 Agent 검사 작성
---
## 개요 {#overview}

이 페이지에서는 기본적인 “Hello world!” 사용자 지정 Agent 검사를 만드는 과정을 설명합니다. 또한 검사의 최소 수집 간격을 변경하는 방법도 설명합니다.

## 설정 {#setup}

### 설치 {#installation}

사용자 지정 Agent 검사를 만들기 전에 [Datadog Agent][1]를 설치하세요.

<div class="alert alert-danger">최신 버전의 Agent에서 작업하려면 사용자 지정 Agent 검사는 Python 3를 지원해야 합니다.</div>

### 구성 {#configuration}

1. 시스템의 `conf.d` 디렉터리로 이동합니다. `conf.d` 디렉터리 위치에 대한 자세한 내용은 [Agent 구성 파일][2]을 참조하세요.
2. `conf.d` 디렉터리에 새 Agent 검사용 구성 파일을 생성합니다. 파일 이름은 `custom_checkvalue.yaml`로 지정합니다.
3. 파일을 편집하여 다음 내용을 포함합니다.
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:
instances:
  [{}]
{{< /code-block >}}
4. `checks.d` 디렉터리에 Check 파일을 생성합니다. 파일 이름은 `custom_checkvalue.py`로 지정합니다.
   
   <div class="alert alert-info">
     <strong>검사 이름 지정:</strong>
     <ul>
       <li>기존 Datadog Agent 통합의 이름과 충돌하는 것을 방지하기 위해 <code>custom_</code> 로 검사 이름에 접두사를 추가하는 것이 좋습니다. 예를 들어 사용자 지정 Postfix 검사가 있는 경우 검사 파일 이름을 <code>custom_postfix.py</code> 및 <code>custom_postfix.yaml</code> 로 지정하고, <code>postfix.py</code> 및 <code>postfix.yaml</code>은 사용하지 않는 것이 좋습니다.</li>
       <li>구성 파일 이름과 검사 파일 이름은 일치해야 합니다. 검사 이름이 <code>custom_checkvalue.py</code>라면 구성 파일 이름은 <i>반드시</i> <code>custom_checkvalue.yaml</code>로 지정해야 합니다.</li>
     </ul>
   </div>
5. 파일을 편집하여 다음 내용을 포함합니다.
   {{< code-block lang="python" filename="checks.d/custom_checkvalue.py" >}}
from checks import AgentCheck
class HelloCheck(AgentCheck):
  def check(self, instance):
    self.gauge('hello.world', 1)
{{< /code-block >}}
6. [Agent를 재시작][3]한 후 [Metric Summary][4]에 `hello.world`라는 새 메트릭이 표시될 때까지 기다립니다.

사용자 지정 검사가 제대로 작동하지 않는 경우 파일 권한을 확인하세요. 검사 파일은 Agent 사용자에게 읽기 및 실행 권한이 있어야 합니다. 추가 문제 해결 단계는 [Agent Check 문제 해결][7]을 참조하세요.

### 수집 간격 업데이트 {#updating-the-collection-interval}

검사의 수집 간격을 변경하려면 `custom_checkvalue.yaml` 파일에서 `min_collection_interval` 설정을 사용하여 초 단위 값을 지정합니다. 기본값은 15초입니다. `min_collection_interval`은 인스턴스 수준에서 추가해야 합니다. 사용자 지정 검사가 여러 인스턴스를 모니터링하도록 구성된 경우 인스턴스별로 간격을 개별 설정해야 합니다.

`min_collection_interval`을 `30`으로 설정하더라도 메트릭이 정확히 30초마다 수집되는 것은 보장되지 않습니다. Agent 수집기는 30초마다 검사를 실행하려고 시도하지만, 동일한 Agent에서 활성화된 통합 및 검사 수에 따라 다른 통합 및 검사 뒤에서 대기열에 들어갈 수 있습니다. `check` 메서드가 완료되는 데 30초 이상 걸리는 경우 Agent는 검사가 아직 실행 중임을 감지하고 다음 간격까지 실행을 건너뜁니다.

#### 수집 간격 설정 {#set-a-collection-interval}

단일 인스턴스의 경우 다음 구성을 사용하여 수집 간격을 30초로 설정합니다.

{{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - min_collection_interval: 30
{{< /code-block >}}

다음 예시는 두 개의 서로 다른 서버에서 `my_service`라는 서비스를 모니터링하는 가상의 사용자 지정 검사에 대해 간격을 변경하는 방법을 보여줍니다.

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

### 검사 확인 {#verifying-your-check}

검사가 실행 중인지 확인하려면 다음 명령을 사용합니다.

{{< code-block lang="shell" >}}
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
{{< /code-block >}}

실행 중임을 확인한 후 [Agent를 재시작][3]하여 검사를 포함시키고 데이터 보고를 시작합니다.

## 명령줄 프로그램을 실행하는 검사 작성 {#writing-checks-that-run-command-line-programs}

명령줄 프로그램을 실행하고 그 출력을 사용자 지정 메트릭으로 수집하는 사용자 지정 검사를 만들 수 있습니다. 예를 들어 검사는 `vgs` 명령을 실행하여 볼륨 그룹 정보를 보고할 수 있습니다.

검사를 실행하는 Python 인터프리터는 멀티스레드 Go 런타임에 내장되어 있으므로 Python 표준 라이브러리의 `subprocess` 또는 `multithreading` 모듈 사용은 지원되지 않습니다. 검사 내에서 하위 프로세스를 실행하려면 `datadog_checks.base.utils.subprocess_output` 모듈의 [`get_subprocess_output()` 함수][5]를 사용하세요. 명령과 인수는 목록 형태로 `get_subprocess_output()`에 전달되며, 명령과 각 인수는 목록 내 문자열로 전달됩니다.

예를 들어 명령 프롬프트에서 다음과 같이 입력하는 명령은

{{< code-block lang="shell" >}}
vgs -o vg_free
{{< /code-block >}}

다음과 같이 `get_subprocess_output()`에 전달되어야 합니다.

{{< code-block lang="python" >}}
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
{{< /code-block >}}

명령줄 프로그램을 실행하면 검사는 터미널에서 직접 실행한 것과 동일한 출력을 수집합니다. 출력 결과를 문자열 처리한 후 `int()` 또는 `float()`를 호출하여 숫자형 값을 반환하세요.

하위 프로세스 출력에 대해 문자열 처리를 하지 않거나 결과가 정수 또는 부동소수점 수가 아닌 경우 검사는 오류 없이 실행되는 것처럼 보이지만 메트릭이나 이벤트를 보고하지 않습니다. 또한 Agent 사용자에게 명령에서 참조하는 파일이나 디렉터리에 대한 적절한 권한이 없거나 `get_subprocess_output()`에 전달된 명령을 실행할 권한이 없는 경우에도 검사는 메트릭이나 이벤트를 반환하지 못합니다.

다음은 명령줄 프로그램의 결과를 반환하는 검사 예시입니다.

{{< code-block lang="python" >}}
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() returns an int by default
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## 로드 밸런서에서 데이터 전송 {#sending-data-from-a-load-balancer}

사용자 지정 Agent 검사를 작성하는 일반적인 사용 사례 중 하나는 로드 밸런서에서 Datadog 메트릭을 전송하는 것입니다. 시작하기 전에 [구성](#configuration)의 단계를 따르세요.

로드 밸런서에서 데이터를 전송하도록 파일을 확장하려면 다음을 수행합니다.

1. `custom_checkvalue.py`의 코드를 다음 내용으로 교체합니다(`lburl` 값은 로드 밸런서 주소로 대체).
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

1. `custom_checkvalue.yaml` 파일을 업데이트합니다(`ipaddress`는 로드 밸런서의 IP 주소로 대체).
   {{< code-block lang="yaml" filename="conf.d/custom_checkvalue.yaml" >}}
init_config:

instances:
  - ipaddress: 1.2.3.4
{{< /code-block >}}

1. [Agent를 재시작][3]합니다. 1분 이내에 [Metric Summary][4]에 `coreapp.update.value`라는 새 메트릭이 표시됩니다. 이 메트릭은 로드 밸런서의 메트릭을 전송합니다.
1. 이 메트릭용 [대시보드 생성][6]을 수행합니다.

## Agent 버전 호환성 {#agent-versioning}

사용자 지정 검사를 모든 Agent 버전과 호환되도록 하려면 다음 try/except 블록을 사용하세요.

{{< code-block lang="python" >}}
try:
    # first, try to import the base class from new versions of the Agent
    from datadog_checks.base import AgentCheck
except ImportError:
    # if the above failed, the check is running in Agent version < 6.6.0
    from checks import AgentCheck

# content of the special variable __version__ will be shown in the Agent status page
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent/configuration/agent-configuration-files/#check-configuration-files
[3]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://app.datadoghq.com/metric/summary
[5]: https://github.com/DataDog/integrations-core/blob/9414403b361e583e8f1ebcdee2f006c384c61045/datadog_checks_base/datadog_checks/base/utils/subprocess_output.py#L22
[6]: /ko/dashboards/
[7]: /ko/agent/troubleshooting/agent_check_status/