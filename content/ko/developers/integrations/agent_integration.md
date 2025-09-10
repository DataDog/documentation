---
aliases:
- /ko/developers/integrations/integration_sdk/
- /ko/developers/integrations/testing/
- /ko/integrations/datadog_checks_dev/
- /ko/guides/new_integration/
- /ko/developers/integrations/new_check_howto/
description: Datadog Agent 통합을 개발하고 게시하는 방법을 알아보세요.
further_reading:
- link: /developers/integrations/
  tag: 설명서
  text: 통합 생성하기
- link: /developers/integrations/python/
  tag: 설명서
  text: 에이전트 기반 통합 개발을 위한 Python
- link: /developers/
  tag: 설명서
  text: Datadog 플랫폼에서 개발하는 방법에 대해 알아보세요.
title: 에이전트 기반 통합 생성
---
## 개요

이 페이지에서는 Technology Partners가 Datadog Agent 통합을 생성하는 방법에 대해 알아봅니다. 이 통합은 [Integrations 페이지][23]에서 기본 제공 항목으로 공개하거나 [Marketplace 페이지][24]에서 유료로 공개할 수 있습니다.

Agent 기반 통합은 [Datadog Agent][17]를 사용하여 개발자가 작성한 사용자 지정 점검을 통해 데이터를 제출합니다. 이러한 점검은 [메트릭][34], [이벤트][18], [서비스 점검][25]을 고객의 Datadog 계정으로 전송할 수 있습니다. Agent 자체도 [로그][26]를 제출할 수 있지만, 이는 점검 외부에서 구성됩니다.

## Agent 기반 통합은 언제 사용하나요?

Agent 통합은 다음을 실행하는 시스템이나 애플리케이션에서 데이터를 수집하는 데 가장 적합합니다.
- 근거리 통신망(LAN)
- 가상 프라이빗 클라우드(VPC)
Agent 기반 통합은 Python wheel(.whl)로 게시하고 배포해야 합니다.


## 개발 프로세스

Agent 기반 통합을 만드는 프로세스는 다음과 같습니다.

1. Datadog Partner Network에 가입하기
   - [Datadog Partner Network][32]에 지원하세요. 지원이 승인되면 Datadog Technology Partner 팀 담당자와의 오리엔테이션 콜 일정이 예약됩니다.
2. 개발 환경 설정
   - Datadog Partner Network 포털을 통해 Datadog 샌드박스 계정을 요청합니다.
   - 필수 개발 도구를 설치합니다.
3. 통합 생성
   - Datadog 샌드박스에서 **Developer Platform** > **add a new listing**으로 이동합니다.
   - 통합을 설명하는 세부 정보를 입력합니다.
4. Agent 점검 구축 및 통합 테스트
   - Agent 점검을 [단계]((#write-an-agent-check)를 따라 생성합니다.
4. 리뷰를 위해 제출
   - Developer Platform을 통해 통합 콘텐츠를 제출합니다.
   - 해당 코드를 사용하여 Agent 점검에 대한 GitHub 풀 요청을 엽니다.
   - Datadog 팀에서 통합 리뷰를 위해 최종 데모 일정을 예약합니다.

## 사전 필수 조건

필수 Datadog 에이전트 통합 개발 도구에는 다음이 포함됩니다:

- Python v3.12, [pipx][2], Agent Integration Developer Tool(`ddev`). 설치 지침은 [Datadog Agent Integration Developer Tool 설치][3]에서 확인하세요.
- [도커][4]를 통해 전체 테스트 스위트를 실행합니다.
- git [명령줄][5] 또는 [GitHub 데스크톱 클라이언트][19].

<div class="alert alert-info"> 통합 페이지에서 즉시 사용 가능한 에이전트 기반 통합 구축 방법 또는 마켓플레이스 페이지에서의 에이전트 기반 통합 구축 방법을 확인하려면 탭을 선택합니다. </div>

{{< tabs >}}
{{% tab "즉시 사용 가능한 통합 구축" %}}

즉시 사용 가능한 통합을 구축하려면:

`dd` 디렉토리를 생성합니다:

```shell
mkdir $HOME/dd && cd $HOME/dd
```

   Datadog Development Toolkit은`$HOME/dd/` 디렉터리에서 작업하는 것이 좋습니다. 필수 사항은 아니지만, 다른 디렉터리에서 작업하려면 추가 구성 단계가 필요합니다.

1. [`integrations-extras` 리포지토리][101]를 포크합니다.

1. `dd` 디렉토리에 포크를 복제합니다:
   ```shell
   git clone git@github.com:<YOUR USERNAME>/integrations-extras.git
   ```

1. 작업할 기능 브랜치를 만듭니다:
   ```shell
   git switch -c <YOUR INTEGRATION NAME> origin/master
   ```

## 개발자 도구 설정

에이전트 통합 개발자 도구를 사용하면 통합 타일의 에셋 및 메타데이터의 골격을 생성하여 통합을 개발할 때 스캐폴딩을 만들 수 있습니다. 도구 설치에 대한 자세한 내용은 [Datadog 에이전트 통합 개발자 도구 설치하기][102]를 참조하세요.

`integrations-extras` 리포지토리를 위한 도구를 설정하려면:

1. 선택 사항으로, `integrations-extras` 리포지토리가 `$HOME/dd/`가 아닌 다른 곳에 있는 경우 `ddev` 설정 파일을 조정합니다:
   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ```

1. `integrations-extras`를 기본 작업 리포지토리로 설정합니다:
   ```shell
   ddev config set repo extras
   ```

[101]: https://github.com/Datadog/integrations-extras
[102]: https://docs.datadoghq.com/ko/developers/integrations/python

{{% /tab %}}

{{% tab "마켓플레이스 통합 구축" %}}

통합을 구축하려면:

1. [마켓플레이스 오퍼링 구축][102]을 참조하여 [마켓플레이스 리포지토리][101]에 대한 액세스를 요청하세요.
1. `dd` 디렉토리를 생성합니다:

   ```shell
   mkdir $HOME/dd```

   Datadog 개발 툴킷 명령은 사용자가 `$HOME/dd/` 디렉토리에서 작업할 것으로 예상합니다. 필수는 아니지만 다른 디렉토리에서 작업하려면 추가 설정 단계가 필요합니다.

1. 마켓플레이스 리포지토리에 대한 액세스 권한이 부여되면 `dd` 디렉토리를 생성하고 `marketplace` 리포지토리를 복제합니다:

   ```shell
   git clone git@github.com:DataDog/marketplace.git```

1. 작업할 기능 브랜치를 만듭니다:

   ```shell
   git switch -c <YOUR INTEGRATION NAME> origin/master```

## Datadog 개발 툴킷 설치 및 설정

에이전트 통합 개발자 도구를 사용하면 통합 타일의 에셋 및 메타데이터의 골격을 생성하여 통합을 개발할 때 스캐폴딩을 만들 수 있습니다. 도구 설치에 대한 자세한 내용은 [Datadog 에이전트 통합 개발자 도구 설치하기][102]를 참조하세요.

에이전트 통합 개발자 도구를 설치한 후에는 마켓플레이스 리포지토리에 맞게 설정합니다.

1. `marketplace`를 기본 작업 리포지토리로 설정합니다:

   ```shell

   ddev config set repos.marketplace $HOME/dd/marketplace
   ddev config set repo marketplace
   ```

1. `marketplace` 디렉토리 복제를 위해 `$HOME/dd` 이외의 다른 디렉토리를 사용한 경우 다음 명령을 사용하여 작업 리포지토리를 설정하세요:

   ```shell

   ddev config set repos.marketplace <PATH/TO/MARKETPLACE>
   ddev config set repo marketplace
   ```

[101]: https://github.com/Datadog/marketplace
[102]: https://docs.datadoghq.com/ko/developers/integrations/marketplace_offering
[103]: https://docs.datadoghq.com/ko/developers/integrations/python

{{% /tab %}}

{{< /tabs >}}

## 통합 생성

Docker를 다운로드하고, 적절한 버전의 Python을 설치하고, 개발 환경을 준비하면 Agent 기반 통합을 만들 수 있습니다.

다음 지침에서는 `Awesome`이라는 통합 예제를 사용합니다. Awesome의 코드를 사용하거나, Awesome을 직접 작성한 코드로 바꾸고 명령 내에서 통합 이름을 입력하세요. 예를 들어 `ddev create Awesome` 대신 `ddev create <your-integration-name>`을 사용합니다.

### 통합을 위한 스캐폴딩 만들기

`ddev create` 명령은 에이전트 기반 통합에 필요한 기본 파일 및 경로 구조 (또는 "스캐폴딩")를 만드는 대화형 도구를 실행합니다.

1. 첫 번째 통합 디렉토리를 만들기 전에 디스크에 아무것도 쓰지 않는 `-n/--dry-run` 플래그를 사용하여 드라이 런을 시도해 보세요:
   ```shell
   ddev create -n Awesome
   ```

   이 명령은 파일이 작성되었을 경로와 구조를 표시합니다. 출력 첫 줄의 경로가 리포지토리 위치와 일치하는지 확인하세요.

1. `-n` 플래그 없이 명령을 실행합니다. 도구에서 이메일과 이름을 입력하면 통합을 시작하는 데 필요한 파일을 생성합니다.

   <div class="alert alert-info">Datadog 마켓플레이스용 통합을 만드는 경우, 디렉토리가 {파트너 이름}_{통합 이름}의 패턴을 따르는지 확인하세요.</div>

   ```shell
   ddev create Awesome
   ```

## 에이전트 검사 작성

모든 Agent 기반 통합의 핵심은 주기적으로 정보를 수집하고 Datadog에 전송하는 *Agent Check*입니다.

[검사][30]는 `AgentCheck` 기본 클래스에서 로직을 이어 받고, 다음과 같은 요구 사항을 갖습니다:

- Datadog 에이전트 v7 이상에서 실행되는 통합은 Python 3과 호환되어야 하지만, 에이전트 v5 및 v6에서 실행되는 통합은 여전히 Python 2.7을 사용합니다.
- 검사는 반드시 `AgentCheck`에서 파생되어야 합니다.
- 검사는 서명 `check(self, instance)`이 포함된 방식을 제공해야 합니다.
- 검사는 `datadog_checks` 네임스페이스 아래의 일반 Python 패키지에 구성됩니다. 예를 들어, Awesome의 코드는 `awesome/datadog_checks/awesome/` 디렉토리에 있습니다.
- 패키지 이름은 검사 이름과 동일해야 합니다.
- 해당 패키지 내의 Python 모듈 이름이나 검사를 구현하는 클래스 이름에는 제한이 없습니다.

### 검사 로직 구현

Awesome의 경우 Agent Check는 `awesome.search`라는 [서비스 점검][25]으로 구성되며, 이 점검은 웹 페이지에서 문자열을 검색합니다. 문자열이 존재하면 `OK`, 페이지에 접근할 수 있지만 문자열을 찾을 수 없다면 `WARNING`, 페이지에 접근할 수 없다면 `CRITICAL`을 표시합니다.

에이전트 검사로 메트릭을 제출하는 방법을 알아보려면 [커스텀 에이전트 검사][7]를 참조하세요.

`awesome/datadog_checks/awesome/check.py` 안에 포함된 코드는 다음과 같습니다:

{{< code-block lang="python" filename="check.py" collapsible="true" >}}

import requests

from datadog_checks.base import AgentCheck, ConfigurationError


class AwesomeCheck(AgentCheck):
    """AwesomeCheck derives from AgentCheck, and provides the required check method."""

    def check(self, instance):
        url = instance.get('url')
        search_string = instance.get('search_string')

        # It's a very good idea to do some basic sanity checking.
        # Try to be as specific as possible with the exceptions.
        if not url or not search_string:
            raise ConfigurationError('Configuration error, please fix awesome.yaml')

        try:
            response = requests.get(url)
            response.raise_for_status()
        # Something went horribly wrong
        except Exception as e:
            # Ideally we'd use a more specific message...
            self.service_check('awesome.search', self.CRITICAL, message=str(e))
        # Page is accessible
        else:
            # search_string is present
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
            # search_string was not found
            else:
                self.service_check('awesome.search', self.WARNING)
{{< /code-block >}}

기본 Python 클래스에 대해 자세히 알아보려면 [Python 검사의 구조][8]를 참조하세요.

## 유효성 테스트 작성

테스트에는 두 가지 유형이 있습니다:

- [특정 기능에 대한 단위 테스트입니다.](#write-a-unit-test)
- [`check` 방식을 실행하고 적절한 메트릭 수집을 확인하는 통합 테스트입니다.](#write-an-integration-test)

[pytest][9] 및 [hatch][10]는 테스트를 실행하는 데 사용됩니다. 통합을 게시하려면 테스트가 필요합니다.

### 단위 테스트 작성

Awesome용 `check` 메서드의 첫 번째 부분은 구성 파일에서 두 요소를 검색하고 검증합니다. 이는 단위 테스트를 작성하기에 적합한 대상입니다.

`awesome/tests/test_awesome.py`에서 파일을 열고 내용을 다음으로 바꿉니다:

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
import pytest

    # Don't forget to import your integration

from datadog_checks.awesome import AwesomeCheck
from datadog_checks.base import ConfigurationError


@pytest.mark.unit
def test_config():
    instance = {}
    c = AwesomeCheck('awesome', {}, [instance])

    # empty instance
    with pytest.raises(ConfigurationError):
        c.check(instance)

    # only the url
    with pytest.raises(ConfigurationError):
        c.check({'url': 'http://foobar'})

    # only the search string
    with pytest.raises(ConfigurationError):
        c.check({'search_string': 'foo'})

    # this should not fail
    c.check({'url': 'http://foobar', 'search_string': 'foo'})
{{< /code-block >}}

`pytest`에는 테스트를 카테고리로 그룹화하는 데 사용할 수 있는 마커라는 개념이 있습니다. `test_config`이  `unit` 테스트로 표시된 것을 주목하세요.

`awesome/tests`에 있는 모든 테스트를 실행하도록 스캐폴딩이 설정되어 있습니다. 테스트를 실행하려면 다음 명령을 실행하세요:
```
ddev test awesome
```

### 통합 테스트 작성

[위의 단위 테스트](#write-a-unit-test)는 수집 로직을 확인하지 않습니다. 로직을 테스트하려면 [통합 테스트를 위한 환경을 생성](#create-an-environment-for-the-integration-test)하고 [통합 테스트를 작성](#add-an-integration-test)해야 합니다.

#### 통합 테스트를 위한 환경 만들기

툴킷은 NGINX 컨테이너를 스핀업하는 데 `docker`를 사용하며 검사가 시작 페이지를 검색할 수 있도록 합니다.

통합 테스트를 위한 환경을 만들려면 다음 내용으로 `awesome/tests/docker-compose.yml`에서 docker-compose 파일을 생성합니다:

{{< code-block lang="yaml" filename="docker-compose.yml" collapsible="true" >}}
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"

{{< /code-block >}}

그런 다음 `awesome/tests/conftest.py`에서 파일을 열고 내용을 다음으로 바꿉니다:

{{< code-block lang="python" filename="conftest.py" collapsible="true" >}}
import os

import pytest

from datadog_checks.dev import docker_run, get_docker_hostname, get_here

URL = 'http://{}:8000'.format(get_docker_hostname())
SEARCH_STRING = 'Thank you for using nginx.'
INSTANCE = {'url': URL, 'search_string': SEARCH_STRING}


@pytest.fixture(scope='session')
def dd_environment():
    compose_file = os.path.join(get_here(), 'docker-compose.yml')

    # 이렇게 하면 세 가지 작업이 수행됩니다:
    #
    # 1. compose 파일에 정의된 서비스를 스핀업
    # 2. 테스트를 실행하기 전에 URL을 사용할 수 있을 때까지 대기
    # 3. 테스트가 완료되면 서비스 중단
    with docker_run(compose_file, endpoints=[URL]):
        yield INSTANCE


@pytest.fixture
def instance():
    return INSTANCE.copy()
{{< /code-block >}}

#### 통합 테스트 추가

통합 테스트를 위한 환경을 설정한 후 `awesome/tests/test_awesome.py` 파일에 통합 테스트를 추가합니다:

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
@pytest.mark.integration
@pytest.mark.usefixtures('dd_environment')
def test_service_check(aggregator, instance):
    c = AwesomeCheck('awesome', {}, [instance])

    # the check should send OK
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.OK)

    # the check should send WARNING
    instance['search_string'] = 'Apache'
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.WARNING)
{{< /code-block >}}

개발 속도를 높이려면 `-m/--marker` 옵션을 사용하여 통합 테스트만 실행하세요:
   ```
   ddev test -m integration awesome
   ```
통합이 거의 완료되었습니다. 샌드박스의  Developer Platform으로 돌아가서 제출을 완료하세요.

## 휠 구축하기

`pyproject.toml` 파일은 휠을 패키징하고 구축하는 데 사용되는 메타데이터를 제공합니다. 휠에는 통합 기능에 필요한 파일이 포함되어 있으며, 여기에는 에이전트 검사, 설정 예제 파일 및 휠 빌드 중에 생성된 아티팩트가 포함됩니다.

메타데이터 파일 등 모든 추가 요소는 wheel 내에 포함되지 않으며, Datadog 플랫폼과 에코시스템의 다른 곳에서 사용됩니다.

Python 패키징에 대해 자세히 알아보려면 [Python 프로젝트 패키징][16]을 참조하세요.

`pyproject.toml` 준비가 완료되면 다음 옵션 중 하나를 사용하여 휠을 만듭니다:

- (권장) `ddev` 툴링 사용 시: `ddev release build <INTEGRATION_NAME>`.
- `ddev` 툴링 미사용 시: `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`.

## 휠 설치하기

휠은 [에이전트 v6.10.0 이상][17]에서 사용할 수 있는 에이전트 `integration` 명령을 사용하여 설치됩니다. 환경에 따라 특정 사용자 또는 특정 권한으로 이 명령을 실행해야 할 수도 있습니다:

**Linux** (`dd-agent`로 표시):
```bash
sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl
```

**OSX** (어드민으로 표시):
```bash
sudo datadog-agent integration install -w /path/to/wheel.whl
```

**Windows PowerShell**(셸 세션에 _administrator_ 권한이 있는지 확인하세요):

<details>
  <summary>에이전트<code>v6.11</code> 또는 이전 </summary>

  ```ps
  & "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl
  ```

</details>

<details open>
  <summary>에이전트<code>v6.12</code> 또는 이후 </summary>

  ```ps
  & "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl
  ```
</details>

Kubernetes 환경에서 테스트 목적으로 wheel을 설치하려면 다음 단계를 따르세요.
1. `.whl` 파일을 initContainer에 마운트합니다.
2. initContainer에서 wheel 설치를 실행합니다.
3. Agent 컨테이너가 실행되는 동안 initContainer를 마운트합니다.

호스트 및 컨테이너 환경에 대한 고객 설치 명령은 [Community 및 Marketplace 통합 문서][35]를 참고하세요.

## 리뷰를 위해 코드를 제출합니다.

Developer Platform에 안내된 단계를 따라 GitHub에서 리뷰할 수 있도록 Agent 점검 코드를 제출합니다. 승인되면 통합과 함께 풀 리퀘스트가 공개됩니다.

## 통합 업그레이드
* 새로운 통합 코드를 편집하거나 추가하려면 버전 업그레이드가 필요합니다.

* README 콘텐츠, 매니페스트 정보, 자산(대시보드 및 모니터 템플릿)을 편집하거나 추가하는 경우 버전을 올릴 필요가 없습니다.

### 통합 버전 올리기
통합 버전을 변경할 때는 코드 변경 외에도 다음 사항이 필요합니다.
1. 새 버전 번호를 반영하도록 `__about__.py`를 업데이트합니다. 이 파일은 `/datadog_checks/<your_check_name>/__about__.py`의 통합 디렉터리에서 찾을 수 있습니다.
2. Developer Platform의 *Release Notes**에 다음 형식을 따르는 항목을 추가합니다.
   ```
   ## Version Number / Date in YYYY-MM-DD

   ***Added***:

   * New feature
   * New feature

   ***Fixed***:

   * Bug fix
   * Bug fix

   ***Changed***:

   * Feature update
   * Feature update

   ***Removed***:

   * Feature removal
   * Feature removal
   ```
3. 설치 지침과 다른 모든 곳에서 언급된 버전 번호를 모두 업데이트하세요. 설치 지침에는 보통 버전 번호가 포함되어 있으므로, 해당 번호를 업데이트해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/developers/#creating-your-own-solution
[2]: https://github.com/pypa/pipx
[3]: https://docs.datadoghq.com/ko/developers/integrations/python/
[4]: https://docs.docker.com/get-docker/
[5]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[6]: https://github.com/datadog/integrations-extras
[7]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=count
[8]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[9]: https://docs.pytest.org/en/latest
[10]: https://github.com/pypa/hatch
[11]: https://datadoghq.dev/integrations-core/meta/config-specs/
[12]: /ko/developers/integrations/check_references/#configuration-file
[13]: /ko/developers/integrations/check_references/#manifest-file
[14]: /ko/developers/integrations/check_references/#metrics-metadata-file
[15]: /ko/developers/integrations/check_references/#service-check-file
[16]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[17]: https://docs.datadoghq.com/ko/agent/
[18]: https://docs.datadoghq.com/ko/service_management/events/
[19]: https://desktop.github.com/
[20]: https://docs.datadoghq.com/ko/developers/integrations/
[21]: https://github.com/Datadog/integrations-extras
[22]: https://github.com/Datadog/marketplace
[23]: https://app.datadoghq.com/integrations
[24]: https://app.datadoghq.com/marketplace
[25]: https://docs.datadoghq.com/ko/developers/service_checks/
[26]: https://docs.datadoghq.com/ko/logs/
[27]: https://docs.datadoghq.com/ko/monitors/
[28]: https://docs.datadoghq.com/ko/dashboards/
[29]: https://docs.datadoghq.com/ko/logs/log_configuration/pipelines/
[30]: https://docs.datadoghq.com/ko/glossary/#check
[31]: https://docs.datadoghq.com/ko/developers/integrations/
[32]: https://partners.datadoghq.com/
[33]: https://docs.datadoghq.com/ko/developers/integrations/check_references/
[34]: https://docs.datadoghq.com/ko/metrics/
[35]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/