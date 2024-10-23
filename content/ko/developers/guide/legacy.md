---
aliases:
- /ko/developers/integrations/legacy
description: Datadog 에이전트 5용 에이전트 점검 생성 방법을 알아봅니다.
title: Datadog 에이전트 5용 에이전트 점검 생성하기
---
이 문서는 에이전트 v6로 대체된 Datadog 에이전트 v5를 위한 에이전트 검사 생성 방법을 설명합니다. v5에 대한 자체 로컬 검사 작성이 가능은 하지만 v5에 대한 새로운 통합은 업스트림으로 간주되지 않습니다. 에이전트 v6에 대한 통합을 만드려면 [새 통합 만들기][1]를 참조하세요.

## 요구 사항

[Ruby][2] 작업 환경이 필요합니다. Ruby 설치에 대한 자세한 내용은 [Ruby 설치하기][3]를 참조하세요.

[Wget][4]도 필요합니다. Wget은 대부분의 Linux 시스템에 이미 설치되어 있습니다. Mac에서는 [Homebrew][5], Windows에서는 [Chocolatey][6]를 사용하세요.

## 설정

[gem][7]과 스크립트 세트를 사용하여 설정, 개발 및 테스트를 쉽게 수행할 수 있습니다. 이를 시작하려면:

1. Github에서 [통합-외부 리포지토리][8]를 선택하고 리포지토리를 개발 환경에 복제합니다.
2. `gem install bundler`을 실행합니다.
3. `bundle install`을 실행합니다.

Bundler에서 필요한 Ruby gems를 설치한 후 Python 환경을 생성합니다.

1. `rake setup_env`을 실행합니다. 이렇게 하면 통합 개발에 필요한 모든 구성 요소(통합에 사용되는 핵심 에이전트 포함)와 함께 Python 가상 환경이 설치됩니다. `gcc` 및 `libssl-dev`와 같은 Python 종속성을 설치하려면 몇 가지 기본 소프트웨어가 필요할 수 있습니다.

2. `source venv/bin/activate`를 실행하여 설치된 Python 가상 환경을 활성화합니다. 가상 환경을 종료하려면 `deactivate`을 실행합니다. Python 가상 환경에 대한 자세한 내용은 [Virtualenv 설명서][9]를 참조하세요.

## 통합 구축하기

`rake generate:skeleton[my_integration]`을 실행하여 rake를 통해 새 통합을 위한 뼈대를 만듭니다. 여기서 _my_integration_은 새 통합의 이름입니다 (참고: 통합 이름을 대괄호로 묶습니다).

이렇게 하면 새 통합에 필요한 모든 파일이 포함된 새 디렉토리인 `my_integration`이 생성됩니다. 또한 새 빌드가 생성될 때마다 테스트가 실행되도록 하기 위해 계속되는 통합 파일 `.travis.yml` 및 `circle.yml` 에 새 통합에 대한 항목이 만들어집니다.

### 통합 파일

새 통합에는 다음 파일이 포함되어야 합니다:

#### `README.md`

README 파일은 다음 섹션을 제공해야 합니다:

- **개요**(필수): 다른 사용자들이 통합을 통해 무엇을 기대할 수 있는지 작성합니다.
- **설치** (필수): 통합 설치 방법에 대한 정보를 입력합니다.
- **설정**(필수): 통합 및 통합하려는 서비스 설정에 필요한 모든 단계를 자세히 설명합니다.
- **유효성 검사**(필수): 통합이 제대로 작동하는지 확인하는 방법입니다.
- **문제 해결**: 자주 발생하는 문제에 대한 해결책을 공유합니다.
- **호환성** (필수): 통합을 테스트하고 검증한 애플리케이션 또는 서비스의 버전을 나열합니다.
- **메트릭**(필수): 통합이 제공하는 메트릭 목록을 포함합니다.
- **이벤트**: 통합에서 제공하는 이벤트 목록을 포함합니다.
- **서비스 검사**: 통합에서 제공하는 서비스 검사 목록을 포함합니다.

자세한 내용을 확인하려면 [에이전트 기반 통합 생성하기][1]를 참조하세요.

#### `check.py`

검사 로직이 있어야 하는 파일입니다. 스켈레톤 함수는 검사 로직을 배치할 `check` 메서드를 포함하여 통합을 위한 통합 클래스를 표준화합니다.

예시:

```python

# Example check.py
import time
from checks import AgentCheck

class MyIntegrationCheck(AgentCheck):
  def __init__(self, name, init_config, agentConfig, instances=None):
    AgentCheck.__init__(self, name, init_config, agentConfig, instances)

  def check(self, instance):
    # Send a custom event.
    self.event({
      'timestamp': int(time.time()),
      'source_type_name': 'my_integration',
      'msg_title': 'Custom event',
      'msg_text': 'My custom integration event occurred.',
      'host': self.hostname,
      'tags': [
          'action:my_integration_custom_event',
      ]
    })
```

Datadog 에이전트로 통합을 작성하고 메트릭을 전송하는 방법에 대한 자세한 내용은 [에이전트 기반 통합 소개][11]를 참조하세요.

타사 라이브러리를 가져와야 하는 경우 해당 라이브러리를 `requirements.txt` 파일에 추가합니다.

##### `ci/my_integration.rake`

테스트에 테스트 환경이 필요한 경우 `install` 및 `cleanup` 작업을 사용하여 각각 테스트 환경을 설정하고 해제하세요.

예시:

```ruby
# my_integration.rake 예시
namespace :ci do
  namespace :my_integration do |flavor|
    task install: ['ci:common:install'] do

      # Python 가상 환경을 사용하여 패키지 설치
      use_venv = in_venv
      install_requirements('my_integration/requirements.txt',
                           "--cache-dir #{ENV['PIP_CACHE']}",
                           "#{ENV['VOLATILE_DIR']}/ci.log",
                           use_venv)

      # 도커 테스트 컨테이너 설정
      $(docker run -p 80:80 --name my_int_container -d my_docker)
```

통합 테스트 작성에 대한 자세한 내용은 [Datadog 에이전트 리포지토리][12] 설명서를 참조하세요. 또한 [CI 공통 라이브러리][13]에서 `install_requirements` 와 `sleep_for` 같은 헬퍼 함수를 참조할 수도 있습니다.

**참고**: 이 파일과 다른 테스트 영역에서 `flavor` 변수를 발견할 수 있습니다. _Flavor_는 통합 소프트웨어의 변형(일반적으로 버전)을 나타내는 데 사용되는 용어입니다. 이를 통해 하나의 테스트 세트를 작성하되 통합하려는 소프트웨어의 서로 다른 _flavors_, 변형 또는 버전을 대상으로 할 수 있습니다.

#### `conf.yaml.example`

통합을 설치하려면 특정 인스턴스에 맞게 설정해야 합니다. 이렇게 하려면 `conf.yaml.example` 파일을 에이전트의 `conf.d` 디렉토리에 복사한 다음 해당 인스턴스 정보로 업데이트합니다.

`conf.yaml.example` 파일은 두 개의 섹션을 제공해야 합니다:

- 전반적으로 설정된 매개 변수에 대한 `init_config`
- 특정 인스턴스를 통합하기 위한 `instances`. 여기에는 인증 정보, 추가 태그, 환경 설정과 같은 추가 매개 변수가 있는 서버 또는 호스트 주소가 포함되는 경우가 많습니다.

##### `manifest.json`

이 JSON 파일은 통합에 대한 메타데이터를 제공하며 다음을 포함해야 합니다:

- **`maintainer`**: 이 통합과 관련하여 연락할 수 있는 유효한 이메일 주소를 입력하세요.
- **`manifest_version`**: 이 매니페스트 파일의 버전입니다.
- **`max_agent_version`**: 통합과 호환되는 Datadog 에이전트의 최대 버전입니다. Datadog은 주요 버전 내에서 통합 안정성을 유지하려고 노력하므로 이 숫자를 생성된 번호 그대로 두어야 합니다. Datadog 에이전트의 새 릴리스에서 통합이 중단되는 경우, 이 숫자를 설정하고 [Datadog 에이전트 프로젝트에 이슈를 제출][14]하세요.
- **`min_agent_version`**: 통합과 호환되는 Datadog 에이전트의 최소 버전입니다.
- **`name`**: 통합의 이름입니다.
- **`short_description`**: 통합에 대한 간략한 설명입니다.
- **`support`**: 커뮤니티에서 기여한 통합이므로 "contrib"로 설정해야 합니다. Datadog 직원이 지시한 경우에만 다른 값으로 설정하세요.
- **`version`**: 통합의 현재 버전입니다.
- **`is_public`**: 공개된 통합인 경우 Boolean을 true로 설정합니다.
- **`has_logo`**: `/src/images/integrations_logo`에 통합에 대한 로고가 있으면 Boolean을 true로 설정합니다.
- **`type`**: **검사**
- **`categories`**: Datadog 설명서에서 [통합][15]을 분류할 카테고리를 선택합니다.

[매니페스트 파일의 예][16]는 기존 통합 중 하나를 참조하세요.

#### `metadata.csv`

메타데이터 CSV에는 통합이 제공하는 메트릭 목록과 메트릭에 어떤 그래프와 알림이 제공되는지 Datadog 웹 애플리케이션에 알려주기 위한 기본 정보가 포함되어 있습니다.

CSV에는 헤더 행과 다음 열이 포함되어야 합니다:

**`metric_name`** (필수): 대시보드 또는 모니터를 만들 때 Datadog 사이트에 표시되어야 하는 메트릭의 이름입니다. 이 이름은 종종 공급자, 서비스 및 메트릭의 마침표로 구분된 조합 (예: `aws.ec2.disk_write_ops`) 또는 애플리케이션, 애플리케이션 기능 및 메트릭의 조합 (예: `apache.net.request_per_s`)입니다.

**`metric_type`**(필수): 보고하는 메트릭의 유형입니다. 이는 Datadog 웹 애플리케이션이 데이터를 처리하고 표시하는 방식에 영향을 줍니다. 허용되는 값은 `count`, `gauge`, `rate`입니다.

  - `count`: 카운트는 발생한 특정 이벤트의 수를 말합니다. 카운트를 보고할 때는 이전 제출 이후 기록된 새로운 이벤트(델타) 수만 제출해야 합니다. 예를 들어 `aws.apigateway.5xxerror` 메트릭은 서버 측 오류 수의 `count`입니다.
  - `gauge`: 게이지란 특정 시점의 값을 추적하는 메트릭입니다. 예를 들어, `docker.io.read_bytes`는 초당 읽은 바이트 수의 `gauge`입니다.
  - `rate`: 시간 경과에 따른 메트릭 속도 (따라서 일반적으로 `per_unit_name` 값을 포함)입니다. 예를 들어, `lighttpd.response.status_2xx`는 초당 생성되는 2xx개의 상태 코드 수를 캡처하는 `rate` 메트릭입니다.

**`interval`**: 속도와 카운트 간의 변환에 사용되는 간격입니다. `metric_type`이 `rate` 유형으로 설정된 경우 필수입니다.

**`unit_name`**: 수집 중인 측정 단위에 대한 라벨입니다. 다음 단위 (유형별로 그룹화)를 사용할 수 있습니다:

  - **바이트**: `bit`, `byte`, `kibibyte`, `mebibyte`, `gibibyte`, `tebibyte`, `pebibyte`, `exbibyte`
  - **캐쉬**: `eviction`, `get`,  `hit`,  `miss`,  `set`
  - **데이터베이스**: `assertion`, `column`, `command`, `commit`, `cursor`, `document`, `fetch`, `flush`, `index`, `key`, `lock`, `merge`, `object`, `offset`, `query`, `question`, `record`, `refresh`, `row`, `scan`, `shard`, `table`, `ticket`, `transaction`, `wait`
  - **디스크**: `block`, `file`, `inode`, `sector`
  - **빈도**: `hertz`, `kilohertz`, `megahertz`, `gigahertz`
  - **일반**: `buffer`, `check`, `email`, `error`, `event`, `garbage`,  `collection`, `item`, `location`, `monitor`, `occurrence`, `operation`, `read`, `resource`, `sample`, `stage`, `task`, `time`, `unit`, `worker`, `write`
  - **메모리**: `page`, `split`
  - **화폐**: `cent`, `dollar`
  - **네트워크**: `connection`, `datagram`, `message`, `packet`, `payload`, `request`, `response`, `segment`, `timeout`
  - **백분율**: `apdex`, `fraction`, `percent`, `percent_nano`
  - **시스템**: `core`, `fault`, `host`, `instance`, `node`, `process`, `service`, `thread`
  - **시간**: `microsecond`, `millisecond`, `second`, `minute`, `hour`, `day`, `week`

단위 이름이 위에 나열되지 않은 경우 이 값을 비워둡니다. 이 목록에 단위를 추가하려면 [이슈][17]를 제출하세요.

**`per_unit_name`**: 단위당 메트릭을 수집하는 경우 여기에 추가 단위 이름을 입력할 수 있으며, 이 단위 이름은 `unit_name`과 결합됩니다. 예를 들어 "요청"의 `unit_name`과 "초"의 `per_unit_name`을 입력하면 "초당 요청 수"라는 메트릭이 생성됩니다. 제공된 단위는 위에 나열된 사용 가능한 값이어야 합니다.

**`description`**: 이 메트릭이 나타내는 정보에 대한 기본 설명(400자 제한)입니다.

**`orientation`** (필수):  `-1`, `0`, or `1`의 정수입니다.

  - 적은 개수가 바람직한 경우는 `-1` indicates that smaller values are better. For example, `mysql.performance.slow_queries` or `varnish.fetch_failed` 입니다.
  - `0`은 값에 고유한 기본 설정이 없음을 나타냅니다. 예를 들어, 값의 크기에 대한 기본 설정이 없거나 시스템의 비즈니스 목표에 따라 기본 설정이 달라지는 `rabbitmq.queue.messages` 또는 `postgresql.rows_inserted`의 경우입니다.
  - `1`은 값이 클수록 좋다는 것을 나타냅니다. 예를 들어, 더 높은 가동 시간 `mesos.stats.uptime_secs` 또는 더 많은 캐시 히트가 필요한 `mysql.performance.key_cache_utilization` 경우입니다.

**`integration`** (필수): my_integration"처럼 통합 이름과 일치해야 합니다. 

**`short_name`**: 사람이 읽기 쉽게 축약된 버전의 메트릭 이름입니다. 예를 들어, `postgresql.index_blocks_read`를 `idx blks read`로 설정할 수 있습니다. 사람이 읽기 쉽고 이해하기 쉬워야 합니다. 통합 이름을 반복하지 마세요. `metric_name` 보다 더 짧고 이해하기 쉬운 `short_name`을 만들 수 없는 경우 이 필드를 비워 두세요.

**`curated_metric`**: 특정 유형에 대해 주목할 만한 통합 메트릭을 표시합니다(`cpu` 및 `memory` 둘 다 허용됨). 이러한 메트릭은 다른 통합 메트릭 위에 UI에 표시됩니다.

#### `requirements.txt`

추가 Python 라이브러리가 필요하면 `requirements.txt`에 나열합니다. 다른 사용자가 통합을 사용할 때 pip를 사용하여 라이브러리가 자동으로 설치됩니다.

#### `test_my_integration.py`

통합 테스트는 Datadog 에이전트가 통합 중인 소프트웨어로부터 메트릭을 올바르게 수신하고 기록하는지 확인합니다.

통합에서 수집하는 각 메트릭에 대해 테스트가 반드시 필요한 것은 아니지만, Datadog은 가능한 한 많은 커버리지를 제공할 것을 권장합니다. 테스트에서 `self.coverage_report()` 메서드를 실행하여 어떤 메트릭이 포함되는지 확인하세요.

`test_my_integration.py`에 대한 예시입니다:

```
# Example test_my_integration.py
from nose.plugins.attrib import attr
from checks import AgentCheck
from tests.checks.common import AgentCheckTest

@attr(requires='my_integration')
Class TestMyIntegration(AgentCheckTest):

  def testMyIntegration(self):
    self.assertServiceCheck('my_integration.can_connect', count=1, status=AgentCheck.OK, tags=[host:localhost', 'port:80'])
    self.coverage_report()
```

테스트 및 사용 가능한 테스트 방법에 대한 자세한 내용은 [Datadog 에이전트 리포지토리의 AgentCheckTest 클래스][18]를 참조하세요.

## 라이브러리

[Datadog 에이전트][19]는 [`utils` 디렉토리][20]에서 몇 가지 유용한 라이브러리를 제공합니다. 이러한 라이브러리는 통합을 구축할 때 유용할 수 있지만, Datadog Agent v6에서 이동된다는 점에 유의하세요.

## 통합 테스트하기

검사 및 테스트 코드를 작성할 때 다음을 사용하여 테스트를 실행하세요:

- `rake lint`: 코드에서 잠재적 오류를 찾아보세요.
- `rake ci:run[my_integration]`: `@attr(requires='my_integration')` 어노테이션과 함께 `test_my_integration.py` 파일에 작성한 테스트를 실행합니다.
- `rake ci:run[default]`: `@attr(requires='my_integration')` 어노테이션 없이 `test_my_integration.py` 파일에 작성한 테스트와 몇 가지 일반 테스트를 실행합니다.

Travis CI는 풀 리퀘스트를 만들 때 자동으로 테스트를 실행합니다. 풀 리퀘스트를 제출하기 전에 테스트 커버리지가  완벽한지와 모든 테스트를 통과했는지를 확인하세요.

전체 도커 테스트 환경이 필요한 테스트 클래스 또는 메서드에 `@attr(requires='my_integration')` 어노테이션을 추가하세요 (다음 섹션 참조).
단위 및 모의 테스트에 이 어노테이션을 추가하지 말고 Travis CI에서 `rake ci:run[default]`와 실행하세요.

`rake ci:run[default]`를 사용하여 모든 테스트를 실행하는 대신 단위 및 모의 테스트를 빠르게 반복하려면:

```
# 가상 환경에서 단위 테스트 및 모의 테스트를 실행합니다.
$ bundle exec rake exec["nosetests my_integration/test/test_*.py -A 'not requires'"]
```

### 도커 테스트 환경

Datadog은 환경을 테스트할 때 도커 컨테이너 사용을 권장합니다. 컨테이너는 가볍고 관리하기 쉬우며 각 테스트 실행에 일관되고 표준화된 환경을 제공합니다.

예를 들어, Datadog MySQL 통합 [`ci/mysql.rake` 파일][21]의 경우, [공식 MySQL 컨테이너][22]를 사용하며, 다음 네 가지 주요 작업이 포함됩니다.

1. `before_install` - 새 Docker 테스트 환경을 시작하기 전에 이전 Docker 테스트 환경이 모두 중지되고 제거되었는지 확인합니다.
2. `install` - 설치 타스크는 MySQL 테스트 서버를 시작하는 도커 `run`을 수행합니다.
3. `before_script` - 이 작업은 먼저 MySQL 서버가 실행 중인지 확인한 다음 서버에 연결하여 몇 가지 설정 작업을 수행합니다. 가능하면 `test_integration.py` 파일에서 설정 작업을 유지하지만 Python 테스트 스크립트 전에 설정 및 구성을 수행해야 하는 경우도 있습니다.
4. `cleanup` - 테스트가 완료되면 도커 테스트 환경이 중지되고 제거됩니다.

### 로컬로 통합 설치하기

통합이 `integrations-extras` 리포지토리에 병합되면 다른 사용자가 통합을 쉽게 설치할 수 있도록 Datadog에서 패키지를 생성합니다. 그러나 통합이 병합되기 전에 로컬로 통합을 설치하는 것이 좋을 수 있습니다.

로컬로 실행하려면 먼저 `check.py` 파일을 Datadog 에이전트의 `checks.d` 디렉토리에 복사하고 이름을 `my_integration.py` (실제 통합 이름 사용)으로 바꿉니다.

그런 다음, `conf.yaml.example` 파일을 Datadog 에이전트의 `conf.d` 디렉토리에 복사하고 이름을 `my_integration.yaml`(다시 통합의 실제 이름을 사용)로 바꿉니다.

Datadog 에이전트 디렉토리 구조에 대한 자세한 내용은 [새 통합 만들기][1]를 참조하세요.

### 해체 및 정리

통합 빌드가 완료되면 `rake clean_env`를 실행하여 Python 가상 환경을 제거합니다.

## 통합 제출하기

통합 개발을 완료한 후에는 [풀 리퀘스트][23]를 제출하여 Datadog에서 통합을 검토하도록 합니다. 통합이 검토되면 Datadog에서 풀 리퀘스트를 승인하고 병합하거나 승인에 필요한 피드백 및 다음 단계를 제공합니다.

### 기타 고려 사항

테스트를 작성할 때 다음 사항을 고려하세요:

* 클러스터를 테스트하세요. 소프트웨어의 단일 인스턴스를 테스트하는 것이 더 쉬운 경우가 많지만 실제 사용을 대표하는 설정에 대해 실행할 때 테스트가 더 유용합니다. 예를 들어, MongoDB는 일반적으로 샤딩 및 레플리카 셋 기능과 함께 사용되므로 [테스트][24]는 이를 반영합니다.
* 원시 메트릭 외에 계산된 메트릭을 생성하는 것도 고려해 보세요. 예를 들어, 많은 데이터베이스에는 느리지만 실행 빈도가 낮은 쿼리가 있습니다. 따라서 백분위수를 살펴보는 것이 유용할 때가 많습니다. 예를 들어, Datadog MySQL 통합에는 [95번째 백분위수 쿼리 실행 시간][2]에 대해 계산된 메트릭이 포함되어 있습니다.

[1]: https://docs.datadoghq.com/ko/developers/integrations/agent_integration
[2]: https://www.ruby-lang.org
[3]: https://www.ruby-lang.org/en/documentation/installation
[4]: https://www.gnu.org/software/wget
[5]: https://brew.sh
[6]: https://chocolatey.org
[7]: https://rubygems.org/gems/datadog-sdk-testing
[8]: https://github.com/DataDog/integrations-extras
[9]: https://virtualenv.pypa.io/en/stable
[11]: https://docs.datadoghq.com/ko/developers/integrations/
[12]: https://github.com/DataDog/dd-agent/blob/master/tests/README.md#integration-tests
[13]: https://github.com/DataDog/dd-agent/blob/master/ci/common.rb
[14]: https://github.com/DataDog/dd-agent/blob/master/CONTRIBUTING.md#submitting-issues
[15]: /ko/integrations
[16]: https://github.com/DataDog/integrations-core/blob/master/activemq/manifest.json
[17]: https://github.com/DataDog/integrations-extras/issues
[18]: https://github.com/DataDog/dd-agent/blob/master/tests/checks/common.py
[19]: https://github.com/DataDog/dd-agent
[20]: https://github.com/DataDog/dd-agent/tree/master/utils
[21]: https://github.com/DataDog/integrations-core/blob/5.19.x/mysql/ci/mysql.rake
[22]: https://hub.docker.com/_/mysql
[23]: https://github.com/DataDog/integrations-extras/compare
[24]: https://github.com/DataDog/integrations-core/tree/5.22.x/mongo/test/ci