---
description: Ruby, Rails, Python, JavaScript 테스트 스위트에 대한 테스트 병렬화 계획 및 테스트 검색을 최적화하세요.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: 설명서
  text: 테스트 병렬화 설정
- link: /tests/test_parallelization/configuration/
  tag: 설명서
  text: 테스트 병렬화 구성
- link: /tests/test_parallelization/troubleshooting/
  tag: 설명서
  text: 테스트 병렬화 문제 해결
title: 테스트 병렬화 모범 사례
---
## 계획 단계 최적화 {#optimize-the-planning-step}

테스트 병렬화 작업은 실행 전에 테스트를 검색하는 계획 단계를 추가합니다. 예를 들어, RSpec 프로젝트는 dry-run 검색, pytest 프로젝트는 collection, Jest 프로젝트는 `--listTests`를 사용합니다. 병렬 실행으로 절약한 시간이 계획 오버헤드로 상쇄되지 않도록 이 단계를 간단하게 유지하세요.

### Docker를 통해 시스템 종속성 사전 설치{#preinstall-system-dependencies-with-docker}

테스트에 운영 체제 패키지가 필요한 경우, CI 실행 시 매번 설치하는 대신 CI 기본 이미지에 포함합니다.

{{< code-block lang="dockerfile" filename="ci/Dockerfile.test" >}}
FROM ruby:3.3
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    apt-get install -y --no-install-recommends imagemagick libpq-dev \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
{{< /code-block >}}

### 프로젝트 종속성 캐시{#cache-project-dependencies}

CI 제공업체 종속성 캐시를 사용하세요. 예를 들어, GitHub Actions는 `ruby/setup-ruby`를 통해 Bundler 종속성 캐시를 실행할 수 있습니다.

{{< code-block lang="yaml" >}}
- uses: ruby/setup-ruby@v1
  with:
    ruby-version: 3.3
    bundler-cache: true
{{< /code-block >}}

Python 프로젝트에서는 pip 캐싱과 함께 `actions/setup-python`을 사용하세요.

{{< code-block lang="yaml" >}}
- uses: actions/setup-python@v5
  with:
    python-version: "3.12"
    cache: pip
{{< /code-block >}}

JavaScript 프로젝트에서는 npm 캐싱과 함께 `actions/setup-node`을 사용하세요.

{{< code-block lang="yaml" >}}
- uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
{{< /code-block >}}

### 검색 중 데이터베이스 설정 건너뛰기{#skip-database-setup-during-discovery}

검색 중 테스트가 실행되지 않으므로 계획 단계에서는 데이터베이스 설정, 마이그레이션, 시드 및 픽스처가 불필요한 경우가 많습니다.

검색 중에 `DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED`는 `1`로 설정됩니다. 이 변수를 사용하여 계획 단계에서 비용이 많이 드는 설정 코드를 건너뜁니다.

예를 들어, Rails에서는 다음과 같습니다.

{{< code-block lang="ruby" >}}
# in seeds.rb
return if ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
# your seeds here

# in rails_helper.rb
ActiveRecord::Migration.maintain_test_schema! unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?

RSpec.configure do |config|
  unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
    config.use_transactional_fixtures = true
  else
    config.use_transactional_fixtures = false
    config.use_active_record = false
  end
end
{{< /code-block >}}

이 변경 사항을 적용한 후 테스트 검색이 더욱 빠르게 실행될 수 있고, 계획 단계에서 데이터베이스를 사용할 수 없을 때 발생하는 오류를 방지할 수 있습니다.

### 테스트 검색 캐시{#cache-test-discovery}

전체 테스트 검색에 시간이 많이 소요되는 경우, CI 실행 간에 `ddtest` 검색 파일을 캐시합니다. 계획 전에 CI 캐시를 복원하고 복원된 파일을 `ddtest`로 전달합니다.

{{< code-block lang="bash" >}}
DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE=.ddtest-cache/tests-discovery.json ddtest plan
{{< /code-block >}}

계획을 완료하면 새로고침된 내부 검색 파일을 CI 캐시에 다시 저장합니다.

{{< code-block lang="bash" >}}
if [ -f .testoptimization/tests-discovery/tests.json ]; then
  mkdir -p .ddtest-cache
  cp .testoptimization/tests-discovery/tests.json .ddtest-cache/tests-discovery.json
fi
{{< /code-block >}}

`ddtest`는 테스트 파일이 변경되면 캐시를 무효화합니다. 테스트 파일 세트는 `--tests-location` 및 `--tests-exclude-pattern`에 의해 결정됩니다.

### Ruby에서 스위트 수준 건너뛰기 사용{#use-suite-level-skipping-for-ruby}

이러한 최적화를 적용한 후에도 Ruby 테스트 검색이 병목 현상으로 남아 있다면, 테스트 영향 분석(Test Impact Analysis) 도구가 스위트 수준 건너뛰기를 사용하도록 구성하세요. 이 모드를 사용하면 `ddtest plan`에서 모든 개별 테스트를 검색하는 대신 테스트 파일 검색을 실행할 수 있습니다. 또한 이 모드는 Test Impact Analysis가 전체 스위트를 건너뛰거나 실행하므로, 테스트 수준 건너뛰기의 정밀도를 낮추는 대신 계획 오버헤드를 줄입니다.

스위트 수준 건너뛰기를 사용하려면 `datadog-ci >= 1.34.0`이 필요합니다. 계획 및 테스트 실행에 대해 `DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite`를 설정합니다.

{{< code-block lang="bash" >}}
DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite ddtest plan
DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite ddtest run
{{< /code-block >}}

다른 명령으로 테스트를 실행하는 경우 해당 명령에 대해 동일한 환경 변수를 설정합니다. 테스트 계획과 실행 작업이 별도로 이루어지는 CI 워크플로에서는 두 작업에 대해 변수를 설정합니다.

## pytest 구성{#configure-pytest}

`ddtest`는 기본적으로 `python -m pytest`로 pytest를 실행하고 선택한 테스트 파일을 추가합니다. 1.7.0 이상 버전에서는 `--command`를 설정하여 기본 명령을 재정의합니다. 예를 들어, `--command pytest`는 `python -m pytest`대신 `pytest` 콘솔 스크립트를 실행합니다. `ddtest`는 `<command> <files>`를 실행하며 `-m pytest`를 추가하지 않습니다. `--ddtrace`를 `PYTEST_ADDOPTS`에 추가하여 기존 값을 보존하므로, `ddtrace` pytest 구성 변경 없이 pytest 플러그인이 로드됩니다. 기본 명령을 변경하지 않고 추가 pytest 플래그를 전달하려면 `PYTEST_ADDOPTS`를 사용합니다.

테스트 검색 시 `ddtest`는 `pytest.ini`, `pyproject.toml`, `tox.ini`, `setup.cfg`에서 `testpaths` 및 `python_files`를 읽어옵니다. pytest 구성에서 해당 설정을 정의하지 않으면 `ddtest`는 `**/{test_*,*_test}.py`를 사용합니다.

검색 중에 `DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED`는 `1`로 설정됩니다. [검색 중 데이터베이스 설정 건너뛰기](#skip-database-setup-during-discovery)와 유사하게, 계획 단계에서 비용이 많이 드는 설정 코드를 건너뛰려면 이 변수를 사용합니다.

## Jest 구성 {#configure-jest}

`ddtest`는 로컬 `node_modules/.bin/jest` 실행 파일이 존재할 경우 이를 통해 Jest를 실행하고, 그렇지 않으면 `npx jest`를 통해 Jest를 실행합니다. 프로젝트에서 패키지 관리자나 래퍼를 통해 Jest를 실행할 때는 `--command`를 사용합니다.

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework jest --command "pnpm jest --runInBand"
{{< /code-block >}}

명령어에 테스트 파일이나 `--` 구분 기호를 포함하지 마세요. `ddtest`는 파일 목록과 Jest 플래그 자체를 추가합니다.

`ddtest` 작업자 프로세스의 `-r dd-trace/ci/init`를 `NODE_OPTIONS` 앞에 추가합니다(추가하지 않은 경우). `ddtest`가 실행되는 프로젝트에서 `dd-trace`를 확인할 수 있는지 확인하세요.

`ddtest` 개별 Jest 테스트가 아닌 테스트 파일 및 스위트를 검색하고 분할합니다.

## Rails 외 프로젝트에서 Minitest 구성 {#configure-minitest-in-non-rails-projects}

Rails 외 Minitest 프로젝트의 경우, `ddtest`는 `bundle exec rake test`를 사용하고 `TEST_FILES` 환경 변수에서 선택한 파일을 전달합니다. `Rake::TestTask`에서 `TEST_FILES`를 읽도록 구성합니다.

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}