---
dependencies:
- https://github.com/DataDog/chef-datadog/blob/main/README.md
title: Chef
---
Datadog Chef 레시피는 Datadog의 구성과 구성 요소를 자동으로 배포하는 데 사용됩니다. 쿡북에는 다음과 같은 지원 서비스가 포함됩니다.

* Datadog 에이전트 v7.x (기본)
* Datadog 에이전트 v6.x
* Datadog 에이전트 v5.x

**참고**: 이 페이지에는 선택한 버전에 없는 기능에 관한 설명이 있을 수 있습니다. 내 버전에 맞는 설명서를 보려면 git 태그나 
gem 버전의 README를 확인하세요.

## 구성

### 요건

Datadog Chef 쿡북은 `chef-client`>=12.7과 호환됩니다. Chef < 12.7용 지원 서비스가 필요한 경우 [쿡북 2.x 릴리스][2]를 참고하세요. 더 자세한 정보는 [변경 로그][3]를 참고하세요.

#### 플랫폼

다음 플랫폼에서 지원됩니다.

* AlmaLinux(Chef 16 >= 16.10.8 또는 Chef >= 17.0.69 필요)
* Amazon Linux
* CentOS
* Debian
* RedHat(RHEL 8에서는 Chef >= 15 필요)
* Rocky(Chef 16 >= 16.17.4 또는 Chef >= 17.1.35 필요)
* Scientific Linux
* Ubuntu
* Windows
* SUSE(Chef >= 13.3 필요)

#### 쿡북

다음 Opscode 쿡북은 종속성입니다.

* `apt`
* `chef_handler`
* `yum`

**참고**: Debian 9+에서 설치하려면 `apt` 쿡북 v7.1+이 필요합니다.

#### Chef

**Chef 13 사용자**: Chef 13과 `chef_handler` 1.x을 사용하는 경우 `dd-handler` 레시피를 사용할 때 문제가 발생할 수 있습니다. 종속성을 `chef_handler` >= 2.1로 업데이트하면 문제가 해결됩니다.

### 설치

1. 쿡북을 [Berkshelf][5]나 [Knife][6]와 함께 Chef 서버에 추가합니다.
    ```text
    # Berksfile
    cookbook 'datadog', '~> 4.0'
    ```

    ```shell
    # Knife
    knife cookbook site install datadog
    ```

2. 역할, 환경, 기타 레시피에 [Datadog용 속성](#datadog-attributes)을 설정합니다.
    ```text
    node.default['datadog']['api_key'] = "<YOUR_DD_API_KEY>"

    node.default['datadog']['application_key'] = "<YOUR_DD_APP_KEY>"
    ```

3. Chef 서버에 업데이트된 쿡북을 업로드합니다.
    ```shell
    berks upload
    # or
    knife cookbook upload datadog
    ```

4. 업로드한 후, 노드의 `run_list`나 `role`에 쿡북을 추가합니다.
    ```text
    "run_list": [
      "recipe[datadog::dd-agent]"
    ]
    ```

5. 다음 예약된 `chef-client` 실행을 기다리거나 수동으로 트리거합니다.

### 도커화된 환경

도커 환경을 구축하려면 `docker_test_env` 아래에 있는 파일을 사용합니다.

```
cd docker_test_env
docker build -t chef-datadog-container .
```

컨테이너를 실행하려면 다음을 사용합니다.

```
docker run -d -v /dev/vboxdrv:/dev/vboxdrv --privileged=true chef-datadog-container
```

그리고 컨테이너에 콘솔을 연결하거나 VScode 원격 컨테이너 기능을 사용해 컨테이너 내부를 개발합니다.

#### Datadog 속성

다음 방법을 사용해 [Datadog API 애플리케이션 키][4]를 추가할 수 있습니다.

* `environment`나 `role`을 노드 속성으로 사용.
* 상위 우선순위 수준에 있는 다른 쿡북에 키를 선언하여 노드 속성으로 사용.
* `run_list`에서 Datadog의 레시피보다 우선하는 다른 쿡북에 `node.run_state['datadog']['api_key']`를 설정해 `run_state` 노드에 추가.

**참고**: API와 애플리케이션을 저장하기 위해 실행 상태를 사용할 경우 실행 리스트에서 `datadog::dd-handler` 전 컴파일 시간에서 설정하세요.

#### 추가 구성

에이전트 구성 파일(보통 `datadog.yaml`)에 쿡북 속성으로 바로 사용할 수 없는 추가 구성 요소를 추가하려면 `node['datadog']['extra_config']` 속성을 사용하세요. 이는 해시 속성으로, 속성 설정에 따라 구성 파일로 마샬링됩니다.

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

다음을 사용해 `secret_backend_command` 또한 설정할 수 있습니다.

```text
default['datadog']['extra_config']['secret_backend_command'] = '/sbin/local-secrets'
```

중첩된 속성에는 개체 구문을 사용하세요. 다음 코드를 사용하면 구성 파일 `datadog.yaml`의 `logs_config` 필드를 설정합니다.

```ruby
default['datadog']['extra_config']['logs_config'] = { 'use_port_443' => true }
```

#### AWS OpsWorks Chef 배포

AWS OpsWorks에서 Chef를 사용해 Datadog 에이전트를 배포하려면 다음 단계를 따르세요.

1. Chef 커스텀 JSON 추가:
  ```json
  {"datadog":{"agent_major_version": 7, "api_key": "<API_KEY>", "application_key": "<APP_KEY>"}}
  ```

2. `install-lifecycle` 레시피에 레시피 포함:
  ```ruby
  include_recipe '::dd-agent'
  ```

### 통합

역할의 실행 목록과 속성에 [레시피](#recipes)와 구성 세부 사항을 포함해 에이전트 통합을 활성화합니다.
**참고**: `datadog_monitor` 리소스를 사용해 레시피 없이 에이전트 통합을 활성화할 수 있습니다.

원하는 `roles`에 레시피를 연결합니다. 예를 들어, `role:chef-client`에는 `datadog::dd-handler`가 포함되어야 하고, `role:base`는 `datadog::dd-agent`로 에이전트를 시작해야 합니다. 다음은 `dd-handler`, `dd-agent`, `mongo` 레시피를 사용한 역할 예시입니다.

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

**참고**: 애플리케이션 키 하나에 API 키 여러 개가 사용되는 경우는 드물기 때문에 이 레시피에서는 `data_bags`가 사용되지 않았습니다.

## 버전

이 쿡북의 현재 주요 버전에서는 기본적으로 에이전트 v7을 설치합니다. 설치된 에이전트 버전을 제어하고 싶은 경우 다음 속성을 사용할 수 있습니다.

| 파라미터              | 설명                                                                                                                                                                         |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`  | 에이전트 주요 버전을 5, 6, 7(기본)으로 고정                                                                                                                         |
| `agent_version`        | 특정 에이전트 버전 고정(추천).                                                                                                                                         |
| `agent_package_action` | (Linux에만 해당) 기본값을 `'install'`(권고)로 설정, 에이전트 자동 업데이트를 받으려면 `'upgrade'`로 설정(권고하지 않음, 기본값을 사용하고 고정된 `agent_version`을 업그레이드로 변경). |
| `agent_flavor` | (Linux에만 해당) Datadog 에이전트를 설치하려면 `'datadog-agent'`를 기본값으로 설정, IOT 에이전트를 설치하려면 `'datadog-iot-agent'`로 설정 가능. |

내 쿡북 버전에서 사용할 수 있는 모든 속성을 보려면 [attributes/default.rb][1] 샘플을 보세요.

### 업그레이드

쿡북 3.x에서 4.x 버전까지 일부 속성 이름이 바뀌었습니다. 구성을 업데이트하려면 다음을 참조하세요.

| 작업                | 쿡북 3.x                                          | 쿡북 4.x                              |
|-----------------------|-------------------------------------------------------|-------------------------------------------|
| 에이전트 7.x 설치     | 지원되지 않음                                         | `'agent_major_version' => 7`              |
| 에이전트 6.x 설치     | `'agent6' => true`                                    | `'agent_major_version' => 6`              |
| 에이전트 5.x 설치     | `'agent6' => false`                                   | `'agent_major_version' => 5`              |
| 에이전트 버전 고정     | `'agent_version'` 또는 `'agent6_version'`               | 모든 버전에서 `'agent_version'`        |
| package_action 변경 | `'agent_package_action'` 또는 `'agent6_package_action'` | 모든 버전에서 `'agent_package_action'` |
| APT 리포 URL 변경   | `'aptrepo'` 또는 `'agent6_aptrepo'`                     | 모든 버전에서 `'aptrepo'`              |
| APT 리포 분포 변경  | `'aptrepo_dist'` 또는 `'agent6_aptrepo_dist'`   | 모든 버전에서 `'aptrepo_dist'`         |
| YUM 리포 변경       | `'yumrepo'` 또는 `'agent6_yumrepo'`                     | 모든 버전에서 `'yumrepo'`              |
| SUSE 리포 변경      | `'yumrepo_suse'` 또는 `'agent6_yumrepo_suse'`           | 모든 버전에서 `'yumrepo_suse'`         |

에이전트 v6에서 v7으로 업그레이드하려면 다음 방법 중 하나를 사용하세요.

* `agent_major_version`을 `7`로, `agent_package_action`을 `install`로, 특정 v7 버전을 `agent_version`으로 설정합니다(권고).
* `agent_major_version`을 `7`로, `agent_package_action`을 `upgrade`로 설정합니다.

다음은 에이전트 v6에서 v7로 업그레이드하는 예시입니다. 이 예시를 에이전트 v5에서 v6로 업그레이드할 때도 적용할 수 있습니다.

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

에이전트 버전을 다운그레이드하려면 `'agent_major_version'`, `'agent_version'`, `'agent_allow_downgrade'`를 설정합니다.

다음은 에이전트 v6로 다운그레이드하는 예시입니다. 이 예시를 에이전트 v5로 다운그레이드할 때도 적용할 수 있습니다.

```ruby
  default_attributes(
    'datadog' => {
      'agent_major_version' => 6,
      'agent_version' => '6.10.0',
      'agent_allow_downgrade' => true
    }
  )
```

### 삭제

에이전트를 제거하려면 `dd-agent` 레시피를 제거하고 속성 없이 `remove-dd-agent` 레시피를 추가합니다.

## 레시피

[GitHub Datadog Chef 레시피][7]에 액세스합니다.

### 기본 설정

[기본값 레시피][8]는 자리표시자입니다.

### 에이전트

 [dd-agent recipe][9]을 사용하면 Datadog 에이전트가 대상 시스템에 설치되고, [Datadog API 키][4]가 설정되며, 로컬 시스템 메트릭에서 보고 서비스를 시작합니다.

**참고**: 에이전트 버전 <= 5.10.1에서  >= 5.12.0로 업그레이드하는 Windows 사용자의 경우 `windows_agent_use_exe` 속성을 `true`로 설정하세요. 더 자세한 정보는 [dd-agent wiki][10]를 참고하세요.

### 처리기

[dd-handler recipe][11]을 사용하면 [chef-handler-datadog][12] gem이 설치되고, Chef 실행 마지막에 처리기 호출을 통해 뉴스 피드 세부 정보가 보고됩니다.

### DogStatsD

DogStatsD와 상호 작용하는 언어별 라이브러리를 설치하려면 다음을 실행합니다.

- Ruby: [dogstatsd-ruby 레시피][13]
- Python: `poise-python` 쿡북에 있는 종속성을 커스텀/래퍼 쿡북에 추가하고 아래 리소스를 사용하세요. 자세한 정보는 [poise-python 리포지토리][14]를 참고하세요.
    ```ruby
    python_package 'dogstatsd-python' # assumes python and pip are installed
    ```

### 추적

애플리케이션 추적을 위한 언어별 라이브러리를 설치하려면 다음을 실행합니다.

- Ruby: [ddtrace-ruby 레시피][15]
- Python: `poise-python` 쿡북에 있는 종속성을 커스텀/래퍼 쿡북에 추가하고 아래 리소스를 사용하세요. 자세한 정보는 [poise-python 리포지토리][14]를 참고하세요.
    ```ruby
    python_package 'ddtrace' # assumes python and pip are installed
    ```

### 통합

에이전트 통합 구성 파일과 종속성을 배포하는 것을 도와주는 [레시피][7]가 많이 있습니다.

### 시스템-프로브

[시스템-프로브 레시피][17]은 자동으로 기본값에 포함됩니다. 이 레시피는 `system-probe.yaml` 파일을 씁니다. `node['datadog']['system_probe']['manage_config']`을 false로 설정하면 이 동작이 비활성화됩니다.

`system-probe.yaml`에서 [네트워크 성능 모니터링][7](NPM)을 활성화하려면 `node['datadog']['system_probe']['network_enabled']`을 true로 설정합니다.

`system-probe.yaml`에서 [유니버설 서비스 모니터링][7](USM)을 활성화하려면 `node['datadog']['system_probe']['service_monitoring_enabled']`를 true로 설정하세요.

**Windows 사용자 참고**: Windows에서 NPM은 에이전트 v6.27+와 v7.27+에서 지원됩니다. 에이전트가 설치되거나 업그레이드된 상태에서 `node['datadog']['system_probe']['network_enabled']`가 true로 설정된 경우에만 선택적 구성 요소로 사용할 수 있습니다. 이 때문에 NPM 구성 요소를 설치하려면 기존에 설치된 에이전트를 동시에 업그레이드하거나 제거하고 재설치해야 할 수 있습니다.

## 리소스

### 레시피 없는 통합

`datadog_monitor` 리소스를 사용해 레시피 없는 통합을 활성화합니다.

#### 작업

- `:add`: (기본값) 구성 파일을 설정하고, 올바른 권한을 파일에 부여하고, 에이전트를 재시작해 통합을 활성화.
- `:remove`: 통합을 비활성화.

#### Syntax

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
| `'name'`                   | 구성하고 활성화할 에이전트 통합 이름.                                                                                                                                                                                                                                     |
| `instances`                | 통합 구성 파일 `instances` 섹션 아래에 있는 값을 채울 필드                                                                                                                                                                                            |
| `init_config`              | 통합 구성 파일 `init_config` 섹션 아래에 있는 값을 채울 필드                                                                                                                                                                                      |
| `logs`                     | 통합 구성 파일 `logs` 섹션 아래에 있는 값을 채울 필드                                                                                                                                                                                             |
| `use_integration_template` | 기본 템플릿을 사용하려면 `true`(권고)로 설정합니다. 기본 템플릿을 사용하면 YAML의 `instances`, `init_config`, `logs` 각 키에 해당하는 값을 씁니다. 여기에는 역호환 기본값이 `false`로 설정되어 있는데 향후 쿡북 주 버전에서는 기본값이 `true`로 변경될 수 있습니다. |

#### 예시

이 예시에서는 `datadog_monitor` 리소스를 사용해 ElasticSearch 통합을 활성화합니다. 이렇게 하면 인스턴스를 구성(이 경우 ElasticSearch로 연결된 URL)할 수 있고 `use_integration_template` 플래그에서 기본 구성 템플릿을 사용하도록 할 수 있습니다. 또한 `service[datadog-agent]` 리소스에게 알림을 보내 에이전트를 재시작하도록 합니다.

**참고**: 실행 목록에서 에이전트 설치가 이보다 상위여야 합니다.

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

Datadog 통합 특정 버전을 설치하려면 `datadog_integration` 리소스를 사용하세요.

#### 작업

- `:install`: (기본값) 특정 버전 통합 설치.
- `:remove`: 통합 제거.

#### Syntax

```ruby
datadog_integration 'name' do
  version                      String         # version to install for :install action
  action                       Symbol         # defaults to :install
  third_party                  [true, false]  # defaults to :false
end
```

#### 속성

- `'name'`: 설치할 에이전트 통합 이름(예: `datadog-apache`).
- `version`: 설치할 통합 버전(`:install` 작업에만 필요).
- `third_party`: Datadog 통합을 설치할 때 false로 설정하고, 그 외에는 true로 설정. Datadog 에이전트 버전 6.21/7.21 이상에서만 사용 가능.

#### 예시

이 예시에서는 `datadog_integration` 리소스를 사용해  ElasticSearch 통합 버전 `1.11.0`을 설치합니다.

**참고**: 실행 목록에서 에이전트 설치가 이보다 상위여야 합니다.

```ruby
include_recipe '::dd-agent'

datadog_integration 'datadog-elastic' do
  version '1.11.0'
end
```

사용 가능한 통합 버전을 알아보려면 [통합-코어 리포지토리][16]에서 통합별 `CHANGELOG.md`를 참고하세요.

**참고**: Chef Windows 사용자의 경우, 이 리소스가 노드에서 사용할 수 있는 `datadog-agent` 이진을 사용할 때 `chef-client`에 `datadog.yaml`파일을 읽을 수 있는 접근 권한이 있어야 합니다.


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