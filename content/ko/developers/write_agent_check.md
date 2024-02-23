---
algolia:
  tags:
  - 커스텀 에이전트 점검
aliases:
- /ko/agent/faq/how-do-i-change-the-frequency-of-an-agent-check/
- /ko/agent/faq/agent-5-custom-agent-check/
further_reading:
- link: /developers/integrations/new_check_howto/
  tag: 설명서
  text: 새로운 통합 만들기
kind: 설명서
title: 커스텀 Agent 점검
---

## 개요

여기서는 간단한 커스텀 Agent 점검과 `min_collection_interval`에 대해 설명하겠습니다. 표준 Agent 기반 통합과 마찬가지로 커스텀 점검도 일정 간격으로(기본값은 15초마다) 실행하도록 설정됩니다.

### Agent 점검이나 통합을 등록해야 하나요?

커스텀 점검은 커스텀 애플리케이션이나 고유 시스템에서 메트릭을 수집하는 경우에 적합합니다. 다만 일반적으로 이용 가능한 애플리케이션, 공개 서비스, 오픈 소스 프로젝트 등에서 메트릭을 수집하려는 경우에는 [완전한 Agent 통합을 생성][1]하는 편을 권장합니다.

Datadog Agent v6.4 이상의 버전을 사용하면 Datadog Agent 버전 업데이트와 상관없이 통합을 릴리스하거나 업데이트할 수 있습니다. 통합을 공유하기도 쉽고, 생성한 통합을 Datadog 커뮤니티에서 한층 폭넓게 이용할 수 있습니다.

통합 작성 방법은 [새로운 통합 생성][1]을 참조하세요. 이미 공유중인 통합은 [integrations-extras 깃허브 저장소][2]에서 찾아보시기 바랍니다.

## 설정

먼저 [Agent][3]가 정상적으로 설치되었는지 확인합니다. 구성에 문제가 있다면 [Datadog 지원팀으로 문의][4]해주세요.

**참조**: Agent v7 이상의 버전을 사용한다면 커스텀 Agent 점검이 파이썬(Python) 3과 호환되어야 합니다. 그 외의 경우는 Python 2.7 버전 이상과의 호환이 필요합니다.

## 커스텀 Agent 점검

<div class="alert alert-warning">
설정과 점검 파일은 이름이 일치해야 합니다. 점검이 <code>mycheck.py</code>라는 이름이라면 설정 파일의 이름은 <em>반드시</em> <code>mycheck.yaml</code>여야 합니다.
</div>

이번 예시에서 커스텀 점검은 메트릭 `hello.world`의 값 `1`을 전송합니다. 설정 파일에 실제 정보는 포함되지 않지만, 하나 이상의 매핑으로(이 매핑은 비어 있어도 됩니다) 이루어진 `instances`라는 이름의 시퀀스를 포함해야 합니다. `conf.d/hello.yaml`에서는 다음과 같습니다.

```yaml
instances: [{}]
```

점검이 자체적으로 `AgentCheck`에서 상속하고, 각 호출마다 `hello.world`의 게이지 `1`을 전송합니다. `checks.d/hello.py`에서는 다음과 같습니다.

{{< code-block lang="python" filename="hello.py" >}}
# 다음의 try/except 블록은 모든 Agent 버전과 호환되는 커스텀 점검을 생성합니다
try:
    # 먼저, Agent 신규 버전에서 베이스 클래스를 불러와보겠습니다...
    from datadog_checks.base import AgentCheck
except ImportError:
    # ...위의 조작이 실패하면 점검이 Agent 버전 6.6.0 이하를 실행 중인 것입니다
    from checks import AgentCheck

# 특수 변수 __version__의 내용은 Agent 상태 페이지에 표시됩니다
__version__ = "1.0.0"

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1, tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
{{< /code-block >}}

베이스 클래스를 자세히 알아보려면 [datadog_checks.base.checks.base.AgentCheck][5] 페이지를 참조하세요.

**참조**: 커스텀 점검 이름을 선택할 때는 기존 Datadog Agent 통합 이름과 충돌하지 않도록 이름 앞에 `custom_`를 붙여주세요. 예를 들어, 커스텀 Postfix 점검의 경우 점검 파일의 이름은 `postfix.py`나 `postfix.yaml`이 아닌 `custom_postfix.py`과 `custom_postfix.yaml`로 지어줄 수 있습니다.

### 수집 간격

점검의 수집 간격을 변경하려면 설정 파일에서 `min_collection_interval`을 사용하세요. 기본 값은 `15`입니다. 이는 클래스의 `check` 메소드가 Agent의 다른 통합과 동일한 간격으로 호출된다는 뜻입니다.

**참조**: `min_collection_interval` 파라미터는 표준 및 커스텀 통합 모두에서 사용 가능합니다.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
Agent 6에서 `min_collection_interval`는 인스턴스 수준에서 반드시 추가해야 하며, 인스턴스마다 개별적으로 설정해야 합니다.

```yaml
init_config:

instances:
  - min_collection_interval: 30
```

{{% /tab %}}
{{% tab "Agent v5" %}}
Agent 5에서 `min_collection_interval`는 `init_config` 섹션에 추가되어 점검을 글로벌하게 실행할 주기를 정의합니다.

```yaml
init_config:
  min_collection_interval: 30

instances: [{}]
```

{{% /tab %}}
{{< /tabs >}}

**참조**: `min_collection_interval`을 `30`으로 설정해도 메트릭이 30초마다 수집되지는 않습니다. 대신, 최소 30초마다 수집할 수 있다는 뜻이 됩니다. 컬렉터(Collector)는 30초마다 점검을 실행하고자 하지만, 동일한 Agent에서 활성화된 통합의 수에 따라 30초 이상 대기해야 할 수도 있습니다. 게다가 `check` 메소드가 종료되기까지 30초 이상 걸린 경우에는 Agent가 다음 간격까지 점검 실행을 건너뜁니다.

## 점검 확인하기

점검이 실행 중인지 확인하려면 다음 명령어를 사용하세요.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

```shell
sudo -u dd-agent -- datadog-agent check <CHECK_NAME>
```

{{% /tab %}}
{{% tab "Agent v5" %}}

```shell
sudo -u dd-agent -- dd-agent check <CHECK_NAME>
```

{{% /tab %}}
{{< /tabs >}}

확인한 후에는 Agent를 재시작해 이를 포함한 데이터를 Datadog로 보고하세요.

## 명령줄 프로그램을 실행하는 점검 등록하기

명령줄 프로그램을 실행하여 출력값을 커스텀 메트릭으로 가져오는 커스텀 점검을 생성할 수 있습니다. 예를 들어 `vgs` 명령을 실행하여 볼륨 그룹과 관련된 정보를 보고하는 점검를 생각할 수 있습니다. 다른 프로세스를 호출하여 그 출력값이나 종료 코드를 수집하는 상황을 피하기 위해, 편리한 래퍼(wrapper) 함수가 지원됩니다.

점검 내에서 서브프로세스를 실행하려면 모듈 `datadog_checks.base.utils.subprocess_output`에 있는 [`get_subprocess_output()` 함수][6]를 사용하세요. `get_subprocess_output()`에는 명령어와 인수를 목록 형식으로 전달합니다. 이 목록에서 명령어와 각 인수는 하나의 스트링이 됩니다. 예를 들어, 명령 프롬프트에서 다음과 같이 입력되는 명령어는

```text
$ vgs -o vg_free
```

다음과 같이 반드시 `get_subprocess_output()`로 전달해야 합니다.

```python
out, err, retcode = get_subprocess_output(["vgs", "-o", "vg_free"], self.log, raise_on_empty_output=True)
```

<div class="alert alert-warning">
    점검을 실행하는 파이썬(Python) 명령해석기(Interpreter)는 멀티스레드 Go 런타임에 임베딩되어 있습니다. 파이썬 표준 라이브러리의 <code>subprocess</code> 또는 <code>multithreading</code> 모듈 사용은 Agent 버전 6 이상에서 <em>지원되지 않습니다</em>.
</div>

명령줄 프로그램이 실행되면 점검은 터미널 명령줄에서 실행된 경우와 동일한 출력값을 가져옵니다. 해당 출력값에 대해 스트링 처리를 하고, 그 결과에 대해 `int()` 또는 `float()`을 호출하여 숫자 형태를 반환하도록 하는 것이 중요합니다.

서브프로세스 출력값을 스트링 처리하지 않았거나, 정수 또는 부동소수 값을 반환하지 않는 경우에는 점검이 정상적으로 작동하는 것처럼 보여도 아무런 데이터도 보고하지 않습니다.

명령줄 프로그램의 결과를 반환하는 점검 예시는 다음과 같습니다.

```python
# ...
from datadog_checks.base.utils.subprocess_output import get_subprocess_output

class LSCheck(AgentCheck):
    def check(self, instance):
        files, err, retcode = get_subprocess_output(["ls", "."], self.log, raise_on_empty_output=True)
        file_count = len(files.split('\n')) - 1  #len() returns an int by default
        self.gauge("file.count", file_count,tags=['TAG_KEY:TAG_VALUE'] + self.instance.get('tags', []))
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/integrations/new_check_howto/
[2]: https://github.com/DataDog/integrations-extras
[3]: http://app.datadoghq.com/account/settings#agent
[4]: /ko/help/
[5]: https://datadoghq.dev/integrations-core/base/api/#datadog_checks.base.checks.base.AgentCheck
[6]: https://datadog-checks-base.readthedocs.io/en/latest/datadog_checks.utils.html#module-datadog_checks.base.utils.subprocess_output
