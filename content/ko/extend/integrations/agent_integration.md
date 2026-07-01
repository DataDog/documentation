---
aliases:
- /ko/developers/integrations/integration_sdk/
- /ko/developers/integrations/testing/
- /ko/integrations/datadog_checks_dev/
- /ko/guides/new_integration/
- /ko/developers/integrations/new_check_howto/
- /ko/developers/integrations/agent_integration/
description: Datadog Agent 통합을 개발하고 게시하는 방법을 알아보세요.
further_reading:
- link: /extend/integrations/
  tag: 설명서
  text: 통합 만들기
- link: /extend/integrations/python/
  tag: 설명서
  text: Agent 기반 통합 개발을 위한 Python 활용
- link: /extend/
  tag: 설명서
  text: Datadog 플랫폼에서 개발하는 방법 알아보기
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: 학습 센터
  text: Agent 통합 만들기
title: Agent 기반 통합 만들기
---
## 개요 {#overview}

이 페이지는 기술 파트너가 공식 Datadog Agent 통합을 만드는 과정을 안내합니다. 

Agent 기반 통합은 Datadog Agent가 설치되어 있거나 네트워크를 통해 접근할 수 있는 고객 관리 인프라에서 실행되는 소프트웨어 또는 시스템의 텔레메트리 데이터를 수집하도록 설계되었습니다. 이 통합은 승인된 기술 파트너가 개발한 사용자 지정 Agent 검사를 통해 [Datadog Agent][1]가 데이터를 수집하고 제출할 수 있도록 합니다. 

Agent 검사는 고객의 Datadog 계정에 [메트릭][2], [이벤트][3], [로그][5]를 전송할 수 있습니다. 각 Agent 기반 통합은 Datadog Agent를 기반으로 빌드된 Python 패키지로 고객이 Datadog Agent를 통해 쉽게 [설치][6]할 수 있습니다. 다만 트레이스는 Agent 검사 외부에서 Datadog의 SDK 중 하나를 사용해 수집됩니다. 자세한 내용은 [애플리케이션 계측 설명서][25]를 참고하세요.

## Agent 기반 통합 빌드하기 {#building-an-agent-based-integration}
시작하기 전에 [Datadog 파트너 네트워크][7]에 가입하고, 파트너 개발자 조직에 접근할 수 있으며, [개발자 플랫폼에 목록 만들기][8]를 했는지 확인하세요.

다음 단계를 따라 Agent 기반 통합을 만드세요.

1. [필요한 개발 도구를 설치합니다](#prerequisites).
2. [Datadog Agent 통합 개발자 도구를 구성합니다](#configure-the-datadog-agent-integration-developer-tool).
3. [통합 스캐폴딩을 생성합니다](#generate-your-scaffolding).
4. [에이전트 검사를 개발합니다](#develop-your-agent-check).
5. [통합을 테스트합니다](#test-your-agent-check).
6. [검토를 위해 코드를 제출합니다](#submit-your-code-for-review).

### 전제 조건 {#prerequisites}

다음 도구가 설치되어 있는지 확인하세요.

- 개발 도구 및 종속성 설치를 위한 [pipx][9]
- 스캐폴딩을 생성하고 통합 개발을 관리하기 위한 [Datadog Agent 통합 개발자 도구][10](`ddev`)
- 전체 테스트 모음을 실행하기 위한 [Docker][11]
- Git([명령줄][12] 또는 [GitHub 데스크톱 클라이언트][13])

### Datadog Agent 통합 개발자 도구 구성{#configure-the-datadog-agent-integration-developer-tool}
Datadog Agent 개발자 도구를 사용하여 통합을 빌드하고 테스트하세요. 설정 단계는 [기본 제공(OOTB) 통합 또는 Marketplace 통합][23]을 개발하는지에 따라 다릅니다. 아래에서 적절한 탭을 선택하세요.

{{< tabs >}}

{{% tab "OOTB 통합" %}}

1. 작업 디렉터리를 만듭니다. 개발자 도구는 작업이 `$HOME/dd/`에 있다고 가정합니다.

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. [Datadog/integrations-extras][101] 저장소를 GitHub 계정으로 포크합니다.

3. 포크한 저장소를 `dd` 디렉터리에 복제합니다.

   ```shell
   git clone git@github.com:<YOUR_USERNAME>/integrations-extras.git
   ```

4. 통합을 위한 새 브랜치를 만들고 해당 브랜치로 전환합니다.

   ```shell
   cd integrations-extras
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

5. `extras`를 기본 작업 저장소로 설정합니다. 

   ```shell
   ddev config set repo extras
   ```

   저장소가 `$HOME/dd/` 외부에 저장된 경우 기본값으로 설정하기 전에 경로를 지정합니다.

   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ddev config set repo extras 
   ```

[101]: https://github.com/Datadog/integrations-extras

{{% /tab %}}

{{% tab "Marketplace 통합" %}}

1. 작업 디렉터리를 만듭니다. 개발자 도구는 작업이 `$HOME/dd/`에 있다고 가정합니다.

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. [Datadog/marketplace][101] 저장소를 복제합니다. 접근 권한이 없는 경우 Datadog 담당자에게 요청하세요.

   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

3. 통합을 위한 새 브랜치를 만들고 해당 브랜치로 전환합니다.

   ```shell
   cd marketplace
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

4. `marketplace`를 기본 작업 저장소로 설정합니다.

   ```shell
   ddev config set repo marketplace
   ```

   저장소가 `$HOME/dd/` 외부에 저장된 경우 기본값으로 설정하기 전에 경로를 지정합니다.

   ```shell
   ddev config set repos.marketplace "/path/to/marketplace"
   ddev config set repo marketplace
   ```

[101]: https://github.com/DataDog/marketplace

{{% /tab %}}

{{< /tabs >}}

### 스캐폴딩 생성{#generate-your-scaffolding}

`ddev create` 명령을 사용해 Agent 기반 통합에 필요한 초기 파일 및 디렉터리 구조를 생성하세요.

<div class="alert alert-info">통합에 대한 정확한 명령은 개발자 플랫폼의 구성 방법 탭을 참고하세요.</div>

1. **드라이 런 실행(권장)**

    `-n` 또는 `--dry-run` 플래그를 사용하면 실제로 파일을 생성하지 않고 생성될 파일을 미리 확인할 수 있습니다. 출력 경로가 예상된 저장소 위치와 일치하는지 확인하세요.

    ```shell
    ddev create -nt check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

2. **파일 생성** 

    디렉터리 위치를 확인한 후, `-n` 없이 동일한 명령을 실행하여 스캐폴딩을 만듭니다. 프롬프트에 따라 통합 상세 정보를 입력하세요.

    ```shell
    ddev create -t check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

### Agent 검사 개발 {#develop-your-agent-check}

각 Agent 기반 통합의 핵심은 Agent 검사입니다. Agent 검사는 텔레메트리 데이터를 주기적으로 수집하여 Datadog으로 전송하는 Python 클래스입니다.

Agent [검사][16]는 `AgentCheck` 기본 클래스를 상속받으며 다음 요구 사항을 충족해야 합니다.

- **Python 호환성**:
    - Datadog Agent v7 이상용 통합은 Python 3을 지원해야 합니다. 모든 신규 통합은 v7 이상을 대상으로 개발해야 합니다.
    - Datadog Agent v5~v6용 통합은 Python 2.7을 사용합니다.
- **클래스 상속**: 각 검사는 `AgentCheck`를 서브클래싱해야 합니다.
- **진입점**: 각 검사는 `check(self, instance)` 메서드를 구현해야 합니다.
- **패키지 구조**: 검사는 `datadog_checks` 네임스페이스 아래에 배치됩니다. 예를 들어, 이름이 `<INTEGRATION_NAME>`인 통합은`<integration_name>/datadog_checks/<integration_name>/`에 위치합니다.
- **이름 지정**:
    -  패키지 이름은 검사 이름과 일치해야 합니다.
    - 패키지 내의 Python 모듈 및 클래스 이름은 자유롭게 선택할 수 있습니다.

#### 검사 로직 구현 {#implement-check-logic}

다음 예시는 `Awesome`라는 통합의 로직을 보여줍니다.

이 검사는 `awesome.search`라는 [서비스 검사][4]를 정의하며 웹페이지에서 특정 문자열을 검색합니다.
- 문자열을 찾으면 `OK`를 반환합니다.
- 페이지는 로드되었지만 문자열이 없으면 `WARNING`을 반환합니다.
- 페이지에 연결할 수 없으면 `CRITICAL`을 반환합니다.

검사에서 추가 데이터를 제출하는 방법에 대한 내용은 다음을 참고하세요.

- [사용자 지정 Agent 검사][17]에서는 메트릭 제출을 설명합니다.
- [Agent 통합 로그 수집][5]에서는 `send_log`를 사용해 Agent 검사에서 로그를 수집하는 방법을 설명합니다. 단일 소스 로그 전송에 가장 적합합니다.
- [HTTP 크롤러 튜토리얼][24]은 여러 로그 소스에서 로그를 수집하는 방법을 설명합니다. 예를 들어 여러 엔드포인트나 외부 HTTP API를 폴링할 때 사용됩니다.

파일 `awesome/datadog_checks/awesome/check.py`은 다음과 같을 수 있습니다.

{{< code-block lang="python" filename="check.py" collapsible="true" >}}

import requests
import time

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
            # Submit an error log
            self.send_log({
                'message': f'Failed to access {url}: {str(e)}',
                'timestamp': time.time(),
                'status': 'error',
                'service': 'awesome',
                'url': url
            })
        # Page is accessible
        else:
            # search_string is present
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
                # Submit an info log
                self.send_log({
                    'message': f'Successfully found "{search_string}" at {url}',
                    'timestamp': time.time(),
                    'status': 'info',
                    'service': 'awesome',
                    'url': url,
                    'search_string': search_string
                })
            # search_string was not found
            else:
                self.service_check('awesome.search', self.WARNING)
                # Submit a warning log
                self.send_log({
                    'message': f'String "{search_string}" not found at {url}',
                    'timestamp': time.time(),
                    'status': 'warning',
                    'service': 'awesome',
                    'url': url,
                    'search_string': search_string
                })
{{< /code-block >}}

기본 Python 클래스에 대한 자세한 내용은 [Python 검사 구조][18]를 참고하세요.

### 유효성 테스트 작성 {#write-validation-tests}

테스트에는 두 가지 유형이 있습니다.

- [특정 기능을 위한 단위 테스트](#write-a-unit-test)
- [`check` 메서드를 실행하고 적절한 메트릭 수집을 검증하는 통합 테스트](#write-an-integration-test)

[pytest][19]와 [hatch][20]는 테스트를 실행하는 데 사용됩니다. 통합을 게시하려면 테스트가 필수입니다.

#### 단위 테스트 작성 {#write-a-unit-test}

Awesome의 `check` 메서드 첫 부분에서는 구성 파일의 두 가지 요소를 가져와 검증합니다. 이 부분은 단위 테스트를 작성하기에 적합합니다.

`awesome/tests/test_awesome.py`에 있는 파일을 열고 내용을 다음과 같이 변경하세요.

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

`pytest`에는 테스트를 카테고리별로 묶는 데 사용할 수 있는 마커 개념이 있습니다. `test_config`가 `unit` 테스트로 마킹된 것을 확인하세요.

`awesome/tests`에 있는 모든 테스트를 실행하도록 스캐폴딩이 설정되어 있습니다. 테스트를 실행하려면 다음 명령을 실행하세요.

```
ddev test awesome
```

#### 통합 테스트 작성 {#write-an-integration-test}

[위의 단위 테스트](#write-a-unit-test)는 수집 로직을 검사하지 않습니다. 로직을 테스트하려면 [통합 테스트를 위한 환경 만들기](#create-an-environment-for-the-integration-test)와 [통합 테스트 작성](#add-an-integration-test)이 필요합니다.

##### 통합 테스트를 위한 환경 만들기 {#create-an-environment-for-the-integration-test}

툴킷은 `docker`를 사용해 NGINX 컨테이너를 가동하고 검사가 시작 페이지를 가져올 수 있도록 지원합니다.

통합 테스트를 위한 환경을 만들려면 `awesome/tests/docker-compose.yml`에 docker-compose 파일을 만들고 다음 내용을 추가하세요.

{{< code-block lang="yaml" filename="docker-compose.yml" collapsible="true" >}}
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"

{{< /code-block >}}

다음으로 `awesome/tests/conftest.py`에 있는 파일을 열고 내용을 다음과 같이 변경합니다.

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

    # This does 3 things:
    #
    # 1. Spins up the services defined in the compose file
    # 2. Waits for the url to be available before running the tests
    # 3. Tears down the services when the tests are finished
    with docker_run(compose_file, endpoints=[URL]):
        yield INSTANCE


@pytest.fixture
def instance():
    return INSTANCE.copy()
{{< /code-block >}}

#### 통합 테스트 추가 {#add-an-integration-test}

통합 테스트를 위한 환경을 설정한 후 `awesome/tests/test_awesome.py` 파일에 통합 테스트를 추가하세요.

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

개발 속도를 높이려면 `-m/--marker` 옵션을 사용해 통합 테스트만 실행하세요.
   ```
   ddev test -m integration awesome
   ```

## Agent 검사 테스트 {#test-your-agent-check}

Agent 기반 통합은 고객이 Datadog Agent를 통해 설치하는 Python 휠(.whl) 파일로 배포됩니다. 통합을 게시하기 전에 휠 패키지를 수동으로 빌드하고 설치해 로컬에서 테스트할 수 있습니다.

### 휠 빌드하기 {#build-the-wheel}

`pyproject.toml` 파일은 휠을 패키징하고 빌드하는 데 사용되는 메타데이터를 제공합니다. 휠에는 Agent 검사, 구성 예시 파일 및 휠 빌드 중 생성된 아티팩트 등 통합 자체의 기능 작동에 필요한 파일이 포함되어 있습니다.

Python 패키징에 대해 자세히 알아보려면 [Python 프로젝트 패키징][21]을 참조하세요.

`pyproject.toml`이 준비되면 다음 옵션 중 하나를 사용해 휠을 만듭니다.

- (권장) `ddev` 도구를 사용 시: `ddev release build <INTEGRATION_NAME>`.
- `ddev` 도구 미사용 시: `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`.

### 휠 설치하기 {#install-the-wheel}

휠은 [Agent v6.10.0 이상][1]에서 사용할 수 있는 Agent `integration` 명령을 사용하여 설치됩니다. 환경에 따라 특정 사용자로 또는 특정 권한으로 이 명령을 실행해야 할 수 있습니다:

**Linux**(`dd-agent`로 실행):

```bash
sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl
```

**OSX**(관리자로 실행):

```bash
sudo datadog-agent integration install -w /path/to/wheel.whl
```

**Windows PowerShell**(셸 세션에 _관리자_ 권한이 있는지 확인):

{{% collapse-content title="Agent v6.11 또는 이전 버전" level="h4" expanded=false %}}

```ps
& "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl
```

{{% /collapse-content %}}

{{% collapse-content title="Agent v6.12 또는 이후 버전" level="h4" expanded=true %}}

```ps
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl
```

{{% /collapse-content %}}

Kubernetes 환경에서 테스트하기 위해 휠을 설치하는 방법은 다음과 같습니다.
1.  `.whl` 파일을 initContainer에 마운트합니다.
2. initContainer에서 휠 설치를 실행합니다.
3. 실행 중인 Agent 컨테이너에 initContainer를 마운트합니다.

호스트 및 컨테이너 환경 모두에 대한 고객 설치 명령은 [Community 및 Marketplace Integrations 설명서][22]를 참조하세요.

## 리뷰용 코드 제출 {#submit-your-code-for-review}

적절한 저장소([Datadog/integrations-extras][14] 또는 [Datadog/marketplace][15])에 통합 디렉터리를 포함해 풀 리퀘스트를 오픈하세요. 풀 리퀘스트 리뷰는 개발자 플랫폼 제출과 병행하여 진행됩니다.

## 통합 업데이트 {#updating-your-integration}

통합이 게시된 후에는 개발자 플랫폼을 통해 업데이트를 출시할 수 있습니다.

### 통합 버전 상향 {#bumping-an-integration-version}
기능을 추가, 제거 또는 수정할 때마다 버전 상향이 필요합니다(예: 새 메트릭 도입, 대시보드 업데이트, 통합 코드 변경 시). 텍스트 콘텐츠 변경, 브랜딩, 로고 또는 이미지 변경 등의 비기능적 업데이트에는 필요하지 않습니다.

다음 형식을 따라 개발자 플랫폼에서 **릴리스 노트** 탭에 새 항목을 포함하세요.
    

```
## Version Number / Date (YYYY-MM-DD)

***Added***:

* Description of new feature
* Description of new feature

***Fixed***:

* Description of fix
* Description of fix

***Changed***:

* Description of update or improvement
* Description of update or improvement

***Removed***:

* Description of removed feature
* Description of removed feature
```

통합 관련 설명서 및 설치 지침 전반에 걸쳐 버전 번호의 모든 참조를 업데이트하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/agent/
[2]: https://docs.datadoghq.com/ko/metrics/
[3]: https://docs.datadoghq.com/ko/service_management/events/
[4]: /ko/extend/service_checks/
[5]: https://docs.datadoghq.com/ko/logs/log_collection/agent_checks/
[6]: https://docs.datadoghq.com/ko/agent/guide/integration-management/?tab=linux#install
[7]: /ko/extend/integrations/?tab=integrations#join-the-datadog-partner-network
[8]: /ko/extend/integrations/build_integration/#create-a-listing
[9]: https://github.com/pypa/pipx
[10]: /ko/extend/integrations/python/
[11]: https://docs.docker.com/get-docker/
[12]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[13]: https://desktop.github.com/
[14]: https://github.com/Datadog/integrations-extras
[15]: https://github.com/DataDog/marketplace
[16]: https://docs.datadoghq.com/ko/glossary/#check
[17]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=count
[18]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[19]: https://docs.pytest.org/en/latest
[20]: https://github.com/pypa/hatch
[21]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[22]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[23]: /ko/extend/integrations/?tab=integrations#out-of-the-box-integrations-vs-marketplace-offerings
[24]: https://datadoghq.dev/integrations-core/tutorials/logs/http-crawler/
[25]: /ko/tracing/trace_collection/