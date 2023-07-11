---
aliases:
- /ko/developers/integrations/integration_sdk/
- /ko/developers/integrations/testing/
- /ko/integrations/datadog_checks_dev/
- /ko/guides/new_integration/
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/new_check_howto.md
kind: 설명서
title: 에이전트 통합 생성
---
## 개요

이 가이드는 `integrations-extras` 리포지토리에서 Datadog 에이전트 통합을 생성하기 위한 지침을 제공합니다. 에이전트 기반 통합을 생성하는 이유에 대한 자세한 내용은 [자체 솔루션 만들기][1]를 참조하세요.

## 전제 조건

필요한 Datadog 에이전트 통합 개발 도구는 다음과 같습니다:

- Python v3.8, [pipx][2] 및 에이전트 통합 개발자 도구 (`ddev`)입니다. 설치 지침은 [Datadog 에이전트 통합 개발자 도구 설치][3]를 참조하세요.
- 전체 테스트 스위트를 실행하기 위한 [도커][4].
- git [명령줄][5] 또는 [GitHub 데스크톱 클라이언트][19].

## 통합 설정 - 추가 리포지토리

다음 지침에 따라 통합 개발을 위한 리포지토리를 설정하세요:

1. `dd` 디렉토리를 생성합니다:

   Datadog 개발 툴킷은 사용자가 `$HOME/dd/` 디렉토리에서 작업할 것으로 예상합니다. 필수는 아니지만 다른 디렉토리에서 작업하려면 추가 설정 단계가 필요합니다.

   `dd` 디렉토리를 만들고 `integrations-extras` 리포지토리를 복제합니다:
   ```
   mkdir $HOME/dd && cd $HOME/dd
   ```

1. [`integrations-extras` 리포지토리][6]를 포크합니다.

1. `dd` 디렉토리에 포크를 복제합니다:
   ```
   git clone git@github.com:<YOUR USERNAME>/integrations-extras.git
   ```

1. 작업할 기능 브랜치를 만듭니다:
   ```
   git switch -c <YOUR INTEGRATION NAME> origin/master
   ```

## 개발자 도구 설정

[에이전트 통합 개발자 도구][3]를 설치했다고 가정하고 `integrations-extras` 리포지토리에 대한 도구를 설정합니다:

1. 선택 사항으로, `integrations-extras` 리포지토리가 `$HOME/dd/`가 아닌 다른 곳에 있는 경우 `ddev` 설정 파일을 조정합니다:
   ```
   ddev config set extras "/path/to/integrations-extras"
   ```

1. `integrations-extras`를 기본 작업 리포지토리로 설정합니다:
   ```
   ddev config set repo extras
   ```

## 통합 생성

도커를 다운로드하고 적절한 버전의 Python을 설치한 후 개발 환경이 준비되면 에이전트 기반 통합을 만들 수 있습니다. 아래 지침에서는 `Awesome`이라는 통합 예시를 사용합니다. Awesome의 코드를 사용하거나 Awesome을 사용자 자체 코드로 대체할 수 있습니다.

### 통합을 위한 스캐폴딩 만들기

`ddev create` 명령은 새로운 에이전트 기반 통합에 필요한 기본 파일 및 경로 구조(또는 "스캐폴딩")를 만드는 대화형 도구를 실행합니다.

1. 첫 번째 통합 디렉토리를 만들기 전에 디스크에 아무것도 쓰지 않는 `-n/--dry-run` 플래그를 사용하여 드라이 런을 시도해 보세요:
   ```
   ddev create -n Awesome
   ```

   이 명령은 파일이 작성되었을 경로와 구조를 표시합니다. 출력 첫 줄의 경로가 `integrations-extras` 리포지토리 위치와 일치하는지 확인하세요.

1. `-n` 플래그 없이 명령을 실행합니다. 도구에서 이메일과 이름을 입력하면 통합을 시작하는 데 필요한 파일을 생성합니다.
   ```
   ddev create Awesome
   ```

## 에이전트 검사 작성

각 에이전트 기반 통합의 핵심은 주기적으로 정보를 수집하여 Datadog으로 전송하는 *에이전트 검사*입니다. 검사는 `AgentCheck` 기본 클래스에서 로직을 이어 받고 다음과 같은 요구 사항을 가집니다:

- Datadog 에이전트 v7 이상에서 실행되는 통합은 Python 3과 호환되어야 하지만, 에이전트 v5 및 v6은 여전히 Python 2.7을 사용합니다.
- 검사는 반드시 `AgentCheck`에서 파생되어야 합니다.
- 검사는 서명 `check(self, instance)`가 포함된 방식을 제공해야 합니다.
- 검사는 `datadog_checks` 네임스페이스 아래의 일반 Python 패키지에 구성됩니다. 예를 들어, Awesome의 코드는 `awesome/datadog_checks/awesome/` 디렉토리에 있습니다.
- 패키지 이름은 검사 이름과 동일해야 합니다.
- 해당 패키지 내의 Python 모듈 이름이나 검사를 구현하는 클래스 이름에는 제한이 없습니다.

### 검사 로직 구현

Awesome의 경우 에이전트 검사는 웹 페이지에서 문자열을 검색하는 `awesome.search` 이름의 서비스 검사로 구성됩니다. 문자열이 있는 경우 `OK`, 페이지에 액세스할 수 있지만 문자열을 찾을 수 없는 경우 `WARNING`, 페이지에 액세스할 수 없는 경우 `CRITICAL`이라는 결과가 나옵니다. 에이전트 검사로 메트릭을 제출하는 방법에 대한 자세한 내용은 [커스텀 에이전트 검사][7]를 참조하세요.

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

기본 Python 클래스에 대해 자세히 알아보려면 [Python 검사의 구조][8]을 참조하세요.

## 유효성 테스트 작성

테스트에는 두 가지 기본 유형이 있습니다:

- [특정 기능에 대한 단위 테스트입니다.](#write-a-unit-test)
- [`check` 방식을 실행하고 적절한 메트릭 수집을 확인하는 통합 테스트입니다.](#write-an-integration-test)

[pytest][9] 및 [hatch][10]는 테스트를 실행하는 데 사용됩니다. 통합을 `integrations-extras` 리포지토리에 포함하려면 테스트가 필요합니다.

### 단위 테스트 작성

Awesome을 위한 `check` 방식의 첫 번째 부분은 설정 파일에서 두 가지 요소를 검색하고 확인하는 것입니다. 이것은 단위 테스트에 좋은 후보입니다. `awesome/tests/test_awesome.py`에서 파일을 열고 내용을 다음과 같이 바꿉니다:

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

`awesome/tests`에 있는 모든 테스트를 실행하도록 스캐폴딩이 설정되어 있습니다.

테스트를 위해 다음을 실행합니다:
```
ddev test awesome
```

### 통합 테스트 작성

[위의 단위 테스트](#write-a-unit-test)는 수집 로직을 확인하지 않습니다. 로직을 테스트하려면 통합 테스트를 위한 환경을 생성하고 통합 테스트를 작성해야 합니다.

#### 통합 테스트를 위한 환경 만들기

툴킷은 Nginx 컨테이너를 스핀업하는 데 `docker`를 사용하며 검사가 시작 페이지를 검색할 수 있도록 합니다.

통합 테스트를 위한 환경을 만들려면 다음 내용으로 `awesome/tests/docker-compose.yml`에서 docker-compose 파일을 생성합니다:

{{< code-block lang="yaml" filename="docker-compose.yml" collapsible="true" >}}
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"

{{< /code-block >}}

그리고 `awesome/tests/conftest.py`에서 파일을 열고 내용을 다음으로 바꿉니다:

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

    # 이렇게 하면 다음 세 가지 작업이 수행됩니다:
    #
    # 1. compose 파일에 정의된 서비스를 스핀업합니다
    # 2. 테스트를 실행하기 전에 URL을 사용할 수 있을 때까지 기다립니다
    # 3. 테스트가 완료되면 서비스를 중단합니다
    with docker_run(compose_file, endpoints=[URL]):
        yield INSTANCE


@pytest.fixture
def instance():
    return INSTANCE.copy()
{{< /code-block >}}

#### 통합 테스트 추가

통합 테스트를 위한 환경을 설정한 후 `awesome/tests/test_awesome.py`파일에 통합 테스트를 추가합니다:

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

통합이 거의 완료되었습니다. 다음으로 필요한 검사 에셋을 추가합니다.

## 검사 에셋 생성

`integrations-extras`에서 검사를 진행하려면 `ddev` 스캐폴딩에 의해 생성된 에셋 집합을 채워야 합니다:

`README.md`
: 에이전트 검사에 대한 도움말, 설정 방법, 수집하는 데이터 및 지원 정보가 포함되어 있습니다.

`spec.yaml`
: `ddev` 툴링을 사용하여 `conf.yaml.example`을 생성하는 데 사용됩니다(아래의 **설정 템플릿** 탭 참조). 자세한 내용은 [설정 사양][11]을 참조하세요.

`conf.yaml.example`
: 에이전트 검사에 대한 기본(또는 예시) 설정 옵션이 포함되어 있습니다. **이 파일을 직접 편집하지 마세요!** 이 파일은 `spec.yaml`의 내용에서 생성됩니다. 자세한 내용은 [설정 파일 참조][12]에서 확인하세요.

`manifest.json`
: 여기에는 제목 및 카테고리와 같은 에이전트 검사의 메타데이터가 포함되어 있습니다. 자세한 내용은 [매니페스트 파일 참조][13]에서 확인하세요.

`metadata.csv`
: 여기에는  에이전트 검사에서 수집한 모든 메트릭 목록이 포함되어 있습니다. 자세한 내용은 [메트릭 메타데이터 파일 참조][14]에서 확인하세요.

`service_check.json`
: 에이전트 검사에서 수집한 모든 서비스 검사 목록이 포함되어 있습니다. 자세한 내용은 [서비스 검사 파일 참조][15]에서 확인하세요.

{{< tabs >}}
{{% tab "Configuration template" %}}

이 예제에서는 `awesome/datadog_checks/awesome/data/conf.yaml.example` 생성에 사용된 `awesome/assets/configuration/spec.yaml`이 다음과 같이 표시됩니다:
```yaml
name: Awesome
files:
- name: awesome.yaml
  options:
  - template: init_config
    options:
    - template: init_config/default
  - template: instances
    options:
    - name: url
      required: true
      description: The URL to check.
      value:
        type: string
        example: http://example.org
    - name: search_string
      required: true
      description: The string to search for.
      value:
        type: string
        example: Example Domain
    - name: flag_follow_redirects
      # required: false is implicit; comment it to see what happens!
      required: false
      description: Follow 301 redirects.
      value:
        type: boolean
        example: false
    # Try transposing these templates to see what happens!
    #- template: instances/http
    - template: instances/default
```

`ddev`를 사용하여 `conf.yaml.example`를 생성하려면 다음을 실행하세요:
```bash
ddev validate config --sync awesome
```

{{% /tab %}}
{{% tab "Manifest" %}}

이 예제에서는 Awesome 서비스 검사에 대한 `awesome/manifest.json`이 다음과 같은 형식으로 표시됩니다:
```json
{
  "manifest_version": "2.0.0",
  "app_uuid": "79eb6e54-2110-4d50-86c3-f7037d1a9daa", // Do not use this example UUID. UUIDs must be unique and valid.
  "app_id": "awesome",
  "classifier_tags": [
    "Supported OS::Linux",
    "Supported OS::macOS",
    "Supported OS::Windows"
  ],
  "display_on_public_website": false,
  "tile": {
    "overview": "README.md#Overview",
    "configuration": "README.md#Setup",
    "support": "README.md#Support",
    "changelog": "CHANGELOG.md",
    "description": "",
    "title": "Awesome",
    "media": []
  },
  "author": {
    "support_email": "email@example.org"
  },
  "oauth": {},
  "assets": {
    "integration": {
      "source_type_name": "Awesome",
      "configuration": {
        "spec": "assets/configuration/spec.yaml"
      },
      "events": {
        "creates_events": false
      },
      "metrics": {
        "prefix": "awesome.",
        "check": "",
        "metadata_path": "metadata.csv"
      },
      "service_checks": {
        "metadata_path": "assets/service_checks.json"
      }
    }
  }
}
```

{{% /tab %}}
{{% tab "Metadata" %}}

이 예제에서는 Awesome 통합이 메트릭을 제공하지 않으므로 생성된 `awesome/metadata.csv`에는 열 이름이 있는 행만 포함됩니다.

{{% /tab %}}
{{% tab "Service Check" %}}

이 예제에서는 Awesome 통합에 서비스 검사가 포함되어 있으므로 `awesome/assets/service_checks.json` 파일에 추가해야 합니다:
```json
[
  {
    "agent_version": "6.0.0",
    "integration": "awesome",
    "check": "awesome.search",
    "statuses": ["ok", "warning", "critical"],
    "groups": [],
    "name": "Awesome search!",
    "description": "Returns `CRITICAL` if the check can't access the page, `WARNING` if the search string was not found, or `OK` otherwise."
  }
]
```

{{% /tab %}}
{{< /tabs >}}

## 휠 구축하기

`pyproject.toml` 파일은 휠을 패키징하고 구축하는 데 사용되는 메타데이터를 제공합니다. 휠에는 통합 자체의 기능에 필요한 파일이 포함되어 있으며, 여기에는 검사, 설정 예제 파일 및 휠 빌드 중에 생성된 아티팩트가 포함됩니다.

메타데이터 파일을 포함한 모든 추가 요소는 휠 내에 포함되지 않으며 Datadog 플랫폼 및 에코시스템에 의해 다른 곳에서 사용됩니다. Python 패키징에 대해 자세히 알아보려면 [Python 프로젝트 패키징][16]을 참조하세요.

`pyproject.toml`가 준비되면, 휠을 생성합니다:

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

## 통합 게시를 위한 체크리스트 검토

에이전트 기반 통합을 만든 이후에는 이 목록을 참조하여 필요한 모든 파일과 유효성 검사가 통합에 포함되어 있는지 확인하세요:

- 올바른 형식과 내용이 있는 `README.md` 파일.
- 메트릭 수집을 검증하는 일련의 테스트.
- 수집된 모든 메트릭이 나열된 `metadata.csv` 파일.
- 완전한 `manifest.json` 파일.
- 통합에서 서비스 검사를 수집하는 경우 `service_checks.json`도 완료해야 합니다.

풀 리퀘스트를 열기 전에 다음 명령을 실행하여 통합 관련 문제를 파악하세요:
```
ddev validate all <INTEGRATION_NAME>
```

풀 리퀘스트를 만든 후에는 자동 검사가 실행되어 풀 리퀘스트의 상태가 양호하고 업데이트에 필요한 모든 콘텐츠가 포함되어 있는지 확인합니다.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [API 호출을 통한 통합 관리][18]
- [에이전트 기반 통합 개발을 위한 Python][3]

[1]: https://docs.datadoghq.com/ko/developers/#creating-your-own-solution
[2]: https://github.com/pypa/pipx
[3]: /ko/developers/integrations/python/
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
[18]: https://www.datadoghq.com/blog/programmatically-manage-your-datadog-integrations/
[19]: https://desktop.github.com/