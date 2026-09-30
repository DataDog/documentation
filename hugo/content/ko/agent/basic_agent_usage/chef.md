---
dependencies:
- https://github.com/DataDog/chef-datadog/blob/main/README.md
title: Chef
---
Datadog Chef 레시피는 Datadog의 구성 요소를 자동으로 배포하고 구성할 때 사용됩니다. 쿡북은 다음을 지원합니다.

* Datadog 에이전트 v7.x(기본값)
* Datadog 에이전트 v6.x
* Datadog 에이전트 v5.x

**참고**: 이 페이지에서는 일부 버전에서 사용할 수 없는 기능이 있습니다. git 태그의 README나 내 버전 설명서의 gem 버전을
확인하세요.

## 설정

### 필수 조건

Datadog Chef 쿡북은 `chef-client` >=12.7과 호환됩니다. Chef <12.7에서 지원이 필요한 경우 [쿡북 릴리즈 2.x][2]를 이용하세요. 자세한 내용은 [CHANGELOG][3]를 참고하세요.

#### 플랫폼

지원되는 플랫폼은 다음과 같습니다.

* AlmaLinux(Chef 16 >= 16.10.8 또는 Chef >= 17.0.69 필요)
* Amazon Linux
* CentOS
* Debian
* RedHat(RHEL 8에서 Chef >= 15 필요)
* Rocky(Chef 16 >= 16.17.4 또는 Chef >= 17.1.35 필요)
* Scientific Linux
* Ubuntu
* Windows
* SUSE(Chef >= 13.3 필요)

#### 쿡북

다음 Opscode 쿡북은 종속성 쿡북입니다.

* `apt`
* `chef_handler`
* `yum`

**참고**: Debian 9+에 에이전트를 설치하려면 `apt` 쿡북 v7.1+가 필요합니다.

#### Chef

**Chef 13 사용자**: Chef 13과 `chef_handler` 1.x를 사용하는 경우 `dd-handler` 레시피를 사용할 때 문제가 생길 수 있습니다. 이 경우 종속성을 `chef_handler` >= 2.1로 업데이트하면 문제가 해결됩니다.

### 설치

1. [Berkshelf][5]나 [Knife][6]를 사용해 Chef에 쿡북을 추가합니다.
    ```text
    # Berksfile
    cookbook 'datadog', '~> 4.0'
    ```

    ```shell
    # Knife
    knife cookbook site install datadog
    ```

2. 역할, 환경, 또는 다른 레시피에 [Datadog 지정 속성](#datadog-attributes)을 설정합니다.
    ```text
    node.default['datadog']['api_key'] = "<YOUR_DD_API_KEY>"

    node.default['datadog']['application_key'] = "<YOUR_DD_APP_KEY>"
    ```

3. 업데이트된 쿡북을 Chef 서버에 업로드합니다.
    ```shell
    berks upload
    # or
    knife cookbook upload datadog
    ```

4. 업로드한 후 쿡북을 내 노드의 `run_list`나 `role`에 추가합니다.
    ```text
    "run_list": [
      "recipe[datadog::dd-agent]"
    ]
    ```

5. 다음 `chef-client` 실행 일정까지 기다리거나 수동으로 트리거합니다.

#### Datadog 속성

[Datadog API와 애플리케이션 키][4]를 추가할 때 다음 방법을 사용할 수 있습니다.

* `environment`나 `role`과 연결해 노드를 속성으로 추가합니다.
* 키를 다른 쿡북의 상위 선행 수준에 선언하여 노드 속성으로 추가합니다.
* `run_list`에 Datadog 레시피를 선행하도록 다른 쿡북에 `node.run_state['datadog']['api_key']`를 설정하여 `run_state` 노드에 추가합니다. 이 방법은 자격 증명을 Chef Server에 일반 텍스트 형식으로 저장하지 않습니다.

**참고**: run state를 사용해 API와 애플리케이션 키를 저장할 경우 실행 목록에서 `datadog::dd-handler` 전에 컴파일 시간으로 설정하세요.

#### 추가 구성

에이전트 구성 파일(일반적으로 `datadog.yaml`)에 쿡북에서 속성으로 바로 사용할 수 없는 추가 구성 요소를 더하려면 `node['datadog']['extra_config']` 속성을 사용하세요. 이는 해시 속성이며 적절하게 구성 파일로 마샬링됩니다.

##### 예시

다음 코드 속성을 사용하면 구성 파일 `datadog.yaml`의 `secret_backend_command` 필드를 설정합니다.

```ruby
 default_attributes(
   'datadog' => {
     'extra_config' => {
       'secret_backend_command' => '/sbin/local-secrets'
     }
   }
 )
```

다음을 사용해 `secret_backend_command`을 설정할 수도 있습니다.

```text
default['datadog']['extra_config']['secret_backend_command'] = '/sbin/local-secrets'
```

중첩 속성일 경우에는 개체 구문을 사용하세요. 다음 코드를 사용하면 구성 파일 `datadog.yaml`의 `logs_config` 필드를 설정합니다.

```ruby
default['datadog']['extra_config']['logs_config'] = { 'use_port_443' => true }
```

#### AWS OpsWorks Chef 배포

 Chef로 AWS OpsWorks에 Datadog 에이전트를 배포하려면 다음 단계를 따르세요.

1. Chef 커스텀 JSON 추가:
  ```json
  {"datadog":{"agent_major_version": 7, "api_key": "<API_KEY>", "application_key": "<APP_KEY>"}}
  ```

2. `install-lifecycle` 레시피에 레시피를 포함합니다.
  ```ruby
  include_recipe '::dd-agent'
  ```

### 통합

역할 실행 목록과 속성에 [레시피](#recipes)와 구성 상세 정보를 포함하여 에이전트 통합을 활성화합니다.
**참고**: 레시피 없이 에이전트 통합을 활성화하려면 `datadog_monitor` 리소스를 사용하세요.

레시피를 원하는 `roles`와 연결합니다(예: `role:chef-client`의 경우 `datadog::dd-handler`를 포함해야 하고 `role:base`는 `datadog::dd-agent`로 에이전트를 시작해야 함). 다음은 `dd-handler`, `dd-agent`, `mongo` 역할 예시입니다.

```ruby
name 'example'
description 'Example role using DataDog'

default_attributes(
  'datadog' => {
    'agent_major_version' => 7,
    'api_key' => '<YOUR_DD_API_KEY>',
    'application_key' => '<YOUR_DD_APP_KEY>',
    'mongo' => {
      'instances' => [
        {'host' => 'localhost', 'port' => '27017'}
      ]
    }
  }
)

run_list %w(
  recipe[datadog::dd-agent]
  recipe[datadog::dd-handler]
  recipe[datadog::mongo]
)
```

**참고**: 이 레시피의 경우 애플리케이션 키 하나에 여러 API 키가 있을 확률이 적기 때문에 `data_bags`가 포함되지 않습니다.

## 버전

이 쿡북의 현재 주요 버전에서는 기본적으로 에이전트 v7을 설치합니다. 설치된 에이전트 버전을 제어하고 싶은 경우 다음 속성을 사용할 수 있습니다.

| 파라미터              | 설명                                                                                                                                                                         |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`  | 에이전트 메인 버전을 5, 6, 7(기본값)으로 고정하세요.                                                                                                                         |
| `agent_version`        | 특정 에이전트 버전 고정(추천).                                                                                                                                         |
| `agent_package_action` | (Linux 전용) 기본값은 `'install'`(추천)이고 `'upgrade'`로 설정하면 에이전트가 자동으로 업데이트됩니다(추천하지 않음, 기본값으로 설정하고 업그레이드하려면 고정된 `agent_version`을 바꾸는 것이 좋음). |
| `agent_flavor` | (Linux 전용) Datadog-agent를 설치하려면 기본값을 `'datadog-agent'`로 설정하고, IOT 에이전트를 설치하려면 `'datadog-iot-agent'`로 설정할 수 있습니다. |

사용할 수 있는 속성 전체의 쿡북 버전을 보려면 샘플 [attributes/default.rb][1]를 참고하세요.

### 업그레이드

쿡북 버전 3.x에서 4.x까지 일부 속성 이름이 변경되었습니다. 구성을 업데이트하려면 다음 표를 참조하세요.

| 작업                | 쿡북 3.x                                          | 쿡북 4.x                              |
|-----------------------|-------------------------------------------------------|-------------------------------------------|
| 에이전트 7.x 설치     | 지원되지 않음                                         | `'agent_major_version' => 7`              |
| 에이전트 6.x 설치     | `'agent6' => true`                                    | `'agent_major_version' => 6`              |
| 에이전트 5.x 설치     | `'agent6' => false`                                   | `'agent_major_version' => 5`              |
| 에이전트 버전 고정     | `'agent_version'` 또는 `'agent6_version'`               | 모든 버전에서 `'agent_version'`        |
| package_action 변경 | `'agent_package_action'` 또는 `'agent6_package_action'` | 모든 버전에서 `'agent_package_action'` |
| APT 레포 URL 변경   | `'aptrepo'` 또는 `'agent6_aptrepo'`                     | 모든 버전에서 `'aptrepo'`              |
| APT 레포 분포 변경  | `'aptrepo_dist'` 또는 `'agent6_aptrepo_dist'`   | 모든 버전에서 `'aptrepo_dist'`         |
| YUM 레포 변경       | `'yumrepo'` 또는 `'agent6_yumrepo'`                     | 모든 버전에서 `'yumrepo'`              |
| SUSE 레포 변경      | `'yumrepo_suse'` 또는 `'agent6_yumrepo_suse'`           | 모든 버전에서 `'yumrepo_suse'`         |

에이전트 v6에서 v7으로 업그레이드하려면 다음 방법 중 하나를 사용하세요.

* `agent_major_version`을 `7`로, `agent_package_action`을 `install`로 설정하고 특정 v7 버전을 `agent_version`(추천)으로 고정하세요.
* `agent_major_version`을 `7`로, `agent_package_action`을 `upgrade`로 설정하세요.

다음 예시에서는 에이전트를 v6에서 v7로 업그레이드합니다. 에이전트를 v5에서 v6으로 업그레이드할 때도 동일합니다.

```ruby
default_attributes(
  'datadog' => {
    'agent_major_version' => 7,
    'agent_version' => '7.25.1',
    'agent_package_action' => 'install',
  }
)
```

### 다운그레이드

에이전트 버전을 다운그레이드하려면 `'agent_major_version'`, `'agent_version'`, `'agent_allow_downgrade'`를 설정하세요.

에이전트 v6로 다운그레이드하려면 다음 예시를 따르세요. 에이전트 v6로 다운그레이드할 때도 동일합니다.

```ruby
  default_attributes(
    'datadog' => {
      'agent_major_version' => 6,
      'agent_version' => '6.10.0',
      'agent_allow_downgrade' => true
    }
  )
```

### 설치 제거

에이전트를 설치 제거하려면 `dd-agent` 레시피를 제거하고 `remove-dd-agent`를 속성 없이 추가하세요.

### 커스텀 에이전트 리포지토리

커스텀 리포지토리에서 에이전트를 사용하려면 `aptrepo` 옵션을 설정하세요.

기본적으로 이 옵션은 `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] apt.datadoghq.com`로 설정되어 있습니다. 커스텀 값이 설정되면 `signed-by` 키링도 `[signed-by=custom-repo-keyring-path] custom-repo`로 설정될 수 있습니다.

다음 예시에서는 스테이징 리포지토리를 사용합니다.

```ruby
  default_attributes(
    'datadog' => {
      'aptrepo' => '[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] apt.datad0g.com',
    }
  }
```

## 레시피

[GitHub의 Datadog Chef 레시피][7]에 액세스하세요.

### 기본값

[기본 레시피][8]는 자리표시자입니다.

### 에이전트

[dd-agent 레시피][9]는 대상 시스템에 Datadog 에이전트를 설치하고, [Datadog API 키][4]를 설정하며, 로컬 시스템 메트릭을 보고 서비스를 시작합니다.

**참고**: 버전 <= 5.10.1에서 >= 5.12.0로 업그레이드하는 Windows 사용자의 경우, `windows_agent_use_exe` 속성을 `true`로 설정하세요. 자세한 내용은 [dd-agent 위키][10]를 참고하세요.

### 핸들러

[dd-handler 레시피][11]는 [chef-handler-datadog][12] gem을 설치하고 Chef 실행 말미에 핸들러를 호출하여 뉴스 피드 상세 정보를 보고합니다.

### DogStatsD

DogStatsD와 통신하는 언어 지정 라이브러리를 설치하는 방법:

- Ruby: [dogstatsd-ruby 레시피][13]
- Python: `poise-python` 쿡북의 종속성을 커스텀/래퍼 쿡북에 추가하고 아래 리소스를 사용하세요. 자세한 내용은 [poise-python 리포지토리][14]를 참고하세요.
    ```ruby
    python_package 'dogstatsd-python' # assumes python and pip are installed
    ```

### 추적

애플리케이션 추적(APM)용 언어 지정 라이브러리를 설치하는 방법:

- Ruby: [ddtrace-ruby 레시피][15]
- Python: `poise-python` 쿡북의 종속성을 커스텀/래퍼 쿡북에 추가하고 아래 리소스를 사용하세요. 자세한 내용은 [poise-python 리포지토리][14]를 참고하세요.
    ```ruby
    python_package 'ddtrace' # assumes python and pip are installed
    ```

### 통합

에이전트 통합 구성 파일과 종속성을 배포하는 데 도움이 되는 [레시피][7]가 많이 있습니다.

### 시스템 프로브

[시스템 프로브 레시피][17]는 기본적으로 자동 포함되고 `system-probe.yaml` 파일에 씁니다. 이 동작을 비활성화하려면 `node['datadog']['system_probe']['manage_config']`를 false로 지정하세요.

`system-probe.yaml`에서 NPM([Network Performance Monitoring)][7]을 활성화하려면 `node['datadog']['system_probe']['network_enabled']`을 true로 설정하세요.

`system-probe.yaml`에서 USM([Universal Service Monitoring][7])을 활성화하려면 `node['datadog']['system_probe']['service_monitoring_enabled']`을 true로 설정하세요.

**Windows 사용자용 참고 사항**: NPM은 에이전트 v6.27+ 및 v7.27+이 설치된 Windows에서 지원됩니다. 에이전트를 설치하거나 업그레이드할 때 `node['datadog']['system_probe']['network_enabled']`가 true로 설정된 경우에만 선택적 구성 요소로 제공됩니다. 이 때문에 에이전트를 업그레이드하지 않는 한 기존 설치에서는 NPM 구성 요소를 설치하기 위해 에이전트를 한 번 제거한 후 다시 설치해야 할 수 있습니다.

## 리소스

### 레시피 없는 통합

레시피 없이 통합을 활성화하려면 `datadog_monitor` 리소스를 사용하세요.

#### 작업

- `:add`: (기본값) 구성 파일을 설정해 통합을 활성화합니다. 올바른 권한을 파일에 추가하고 에이전트를 재시작합니다.
- `:remove`: 통합을 비활성화합니다.

#### 구문

```ruby
datadog_monitor 'name' do
  init_config                       Hash # default value: {}
  instances                         Array # default value: []
  logs                              Array # default value: []
  use_integration_template          true, false # default value: false
  action                            Symbol # defaults to :add
end
```

#### 속성

| 속성                   | 설명                                                                                                                                                                                                                                                                                    |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `'name'`                   | 구성하고 활성화할 에이전트 이름                                                                                                                                                                                                                                     |
| `instances`                | 통합 구성 파일 `instances` 섹션 아래 값을 채울 필드                                                                                                                                                                                            |
| `init_config`              | 통합 구성 파일 `init_config` 섹션 아래에 있는 값을 채울 필드                                                                                                                                                                                      |
| `logs`                     | 통합 구성 파일 `logs` 섹션 아래 값을 채울 필드                                                                                                                                                                                             |
| `use_integration_template` | 기본 템플릿을 사용하려면 `true`(추천)으로 설정합니다. 그러면 YAML 내 해당 키에 `instances`, `init_config`, `logs` 파일을 씁니다. 이 때, 이전 버전과의 호환성은 `false`로 기본 설정되나, 향후 쿡북 주 버전에서는 이 기본 설정이 `true`로 설정될 수 있습니다. |

#### 예시

이 예시에서는 `datadog_monitor` 리소스를 사용해 ElasticSearch 통합을 활성화합니다. 이를 통해 인스턴스 구성을 제공하고(이 예시에서는 URL과 ElasticSearch를 연결) `use_integration_template` 플래그가 기본 구성 템플릿을 사용하도록 설정됩니다. 또 `service[datadog-agent]` 리소스에 에이전트를 재시작하도록 알림을 보냅니다.

**참고**: 실행 목록에서 에이전트 설치가 레시피 위와 같아야 합니다.

```ruby
include_recipe '::dd-agent'

datadog_monitor 'elastic' do
  instances  [{'url' => 'http://localhost:9200'}]
  use_integration_template true
  notifies :restart, 'service[datadog-agent]' if node['datadog']['agent_start']
end
```

추가 예시를 보려면 [Datadog 통합 Chef 레시피][7]를 참고하세요.

### 통합 버전

Datadog 통합의 구체적인 버전을 보려면 `datadog_integration` 리소스를 사용하세요.

#### 작업

- `:install`: (기본값) 특정 버전의 통합 설치
- `:remove`: 통합 제거

#### 구문

```ruby
datadog_integration 'name' do
  version                      String         # version to install for :install action
  action                       Symbol         # defaults to :install
  third_party                  [true, false]  # defaults to :false
end
```

#### 속성

- `'name'`: 설치할 에이전트 통합 이름(예: `datadog-apache`)
- `version`: 설치할 통합 버전(`:install` 작업에만 필요)
- `third_party`: Datadog 통합을 설치할 시 false로 설정되며 그 외에는 true로 설정됨. Datadog 에이전트 버전 6.21/7.21 이상에서만 사용 가능 

#### 예시

이 예시에서는 `datadog_integration` 리소스를 사용해 ElasticSearch 통합 `1.11.0` 버전을 설치합니다.

**참고**: 실행 목록에서 에이전트 설치가 위 레시피와 같아야 합니다.

```ruby
include_recipe '::dd-agent'

datadog_integration 'datadog-elastic' do
  version '1.11.0'
end
```

사용 가능한 통합 버전을 보려면 [통합 코어 리포지토리][16]에서 특정 통합 `CHANGELOG.md`을 참고하세요.

**참고**: Chef Windows 사용자의 경우, 이 리소스가 노드에서 사용 가능한 `datadog-agent` 이진을 사용 중이라면 `chef-client`에 `datadog.yaml` 파일 읽기 액세스가 있어야 합니다.

## 개발

### 도커화된 환경

키친 테스트에 사용할 도커 환경을 빌드하려면 `docker_test_env` 아래 파일을 사용하세요.

```
cd docker_test_env
docker build -t chef-datadog-test-env .
```

컨테이너 사용을 실행하는 방법:

```
docker run -d -v /var/run/docker.sock:/var/run/docker.sock chef-datadog-test-env
```

그 후 콘솔을 컨테이너에 연결하거나 VS 코드 원격-컨테이너 기능을 사용해 컨테이너 내 개발을 할 수 있습니다.

컨테이너 내 키친-도커 테스트를 실행하는 방법:

```
# 참고: MacOS나 Windows 환경일 경우 KITCHEN_DOCKER_HOSTNAME=host.docker.internal를 설정
# 로그인 셸 아래에서 다음 실행(실행하지 않으면 `bundle`을 찾을 수 없음)
KITCHEN_LOCAL_YAML=kitchen.docker.yml bundle exec rake circle
```

[1]: https://github.com/DataDog/chef-datadog/blob/master/attributes/default.rb
[2]: https://github.com/DataDog/chef-datadog/releases/tag/v2.18.0
[3]: https://github.com/DataDog/chef-datadog/blob/master/CHANGELOG.md
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.chef.io/berkshelf/
[6]: https://docs.chef.io/knife/
[7]: https://github.com/DataDog/chef-datadog/tree/master/recipes
[8]: https://github.com/DataDog/chef-datadog/blob/master/recipes/default.rb
[9]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dd-agent.rb
[10]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation
[11]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dd-handler.rb
[12]: https://rubygems.org/gems/chef-handler-datadog
[13]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dogstatsd-ruby.rb
[14]: https://github.com/poise/poise-python
[15]: https://github.com/DataDog/chef-datadog/blob/master/recipes/ddtrace-ruby.rb
[16]: https://github.com/DataDog/integrations-core
[17]: https://github.com/DataDog/chef-datadog/blob/master/recipes/system-probe.rb