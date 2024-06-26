---
aliases:
- /ko/guides/chef/
categories:
- automation
- configuration & deployment
- issue tracking
- log collection
- provisioning
dependencies: []
description: Chef 클라이언트 실행을 추적하여 실패, 성공 및 큰 변화가 있는지 확인하세요.
doc_link: https://docs.datadoghq.com/integrations/chef/
draft: false
git_integration_title: chef
has_logo: true
integration_id: chef
integration_title: Chef
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: chef
public_title: Datadog-Chef 통합
short_description: Chef 클라이언트 실행을 추적하여 실패, 성공 및 큰 변화가 있는지 확인하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/chef/chefdashboard.png" alt="Chef Event" popup="true">}}

## 개요

Chef는 루비(Ruby) 및 Erlang으로 작성된 인기 있는 설정 관리 툴입니다.

Chef를 사용해 Datadog를 배포하는 것은 매우 단순할 뿐만 아니라 인프라스트럭처 전반의 모니터링도 간단하게 해줍니다.

Datadog는 또한 업데이트된 리소스 및 타이밍 등 Chef 실행과 관련된 메트릭과 `chef-client` 오류를 캡처하는 Chef [실행 및 보고서 핸들러][1]를 제공합니다.  

## 설정

### 에이전트 배포

[Datadog Chef 쿡북][2]을 사용해 Datadog 에이전트 설치 및 설정을 자동화할 수 있습니다.

나이프(Knife)를 사용해 [슈퍼마켓][2]에서 Datadog Chef 쿡북 최신 릴리스 버전을 설치하고 Chef 서버로 업로드해 보세요.

```text
knife cookbook site install datadog
knife cookbook upload datadog
```

또한 툴을 위한 다음 지침에 따라 쿡북을 Chef 서버에 업로드하세요.

노드의 `run_list`에 쿡북 레시피를 추가하기 전, Chef 속성을 사용해 API 키 등 Datadog 계정 자격 증명을 추가해야 합니다.

일반적으로 `role` 또는 환경 파일을 사용하거나 속성을 정의하는 다른 쿡북을 사용해 이뤄집니다.

`base.rb` 역할 파일의 예시입니다. 일반적으로 조직의 모든 호스트에 적용됩니다.

```ruby
name 'base'
description 'base role, runs on every node'
run_list(
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "PUT_YOUR_API_KEY_HERE",
    'application_key' => "PUT_YOUR_APPLICATION_KEY_HERE"
  }
)
```

**참고**: 두 개의 키가 필요합니다. Datadog [API 키][3] 및 [애플리케이션 키][4]입니다.

위에 표시된 대로 속성에서 양 값을 제공합니다.

그런 다음에 Chef 서버에 역할 파일을 업로드합니다.

```text
knife role from file roles/base.rb
```

다음 번 Chef가 실행되면 에이전트가 설치되고 API와 애플리케이션 키로 설정 파일이 설정됩니다.

**참고:** 또 다른 쿡북을 사용해 이러한 속성을 정의하는 경우 `default`보다 더 높은 수준의 속성을 사용합니다.

### 보고서 핸들러

Datadog는 Chef 실행에서 Datadog로 메트릭와 이벤트를 보고하는 Chef 보고서 핸들러를 제공합니다. 설치되면 보고서 핸들러는 Chef 실행 타이밍과 리소스 변경 사항에서 메트릭을 제출합니다. 이벤트도 생성되어 Chef 실행 성공과 실패 비율을 추적합니다.

Chef 실행의 출력을 다시 Datadog 이벤트 스트림으로 내보내는 부가적인 가치가 있습니다. 그러므로 실패가 빠르게 하이라이트되고 팀 내 논의를 통해 해결될 수 있습니다.

성공은 "낮음" 우선순위에서 찾아볼 수 있으며 실패는 "보통" 우선순위에서 찾아볼 수 있습니다. 동일한 노드가 Chef 실행을 통과하면 "낮음" 우선순위로 돌아갑니다.

이 역할 스니펫에서 볼 수 있듯이 핸들러 추가는 매우 단순합니다.

```ruby
name 'base'
description 'base role, runs on every node'
run_list(
  'datadog::dd-handler',
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "<DATADOG_API_KEY>",
    'application_key' => "<DATADOG_APPLICATION>"
  }
)
```

이 예에서 `datadog::dd-handler` 레시피가 노드의 실행 목록 시작부에 추가되었습니다. 시작부에 추가하면 핸들러가 호출된 후 관찰된 모든 상세 정보를 캡처할 수 있습니다. 그러므로 `run_list` 마지막에 추가하고 실행 전 실패가 발생하면 전체 출력을 받지 못할 수 있습니다.

설정되면 Chef 서버에 역할을 업로드합니다. Chef가 몇몇 호스트에서 실행된 후 관련 Chef 메트릭으로 새로운 자동 대시보드가 생성됩니다. 오른쪽의 [대시보드 목록]에서 찾아볼 수 있습니다.

### Datadog에 Chef 메트릭을 보냅니다.

1. Berkshelf를 사용하는 경우 Berkfile에 쿡북을 추가합니다.

    ```text
    cookbook 'datadog'
    ```

   그렇지 않으면 나이프(Knife)를 사용해 리포지토리에 쿡북을 설치합니다.

    ```text
    knife cookbook site install datadog
    ```

2. 역할이나 환경, 아니면 다른 레시피로 Datadog 지정 속성 설정

    ```conf
    # Make sure you replace the API and application key below
    # with the ones for your account

    node.default['datadog']['<API_KEY>'] = "<DATADOG_API_KEY>"

    # Use an existing application key or create a new one for Chef
    node.default['datadog']['<APPLICATION_KEY>] ="<DATADOG_APP_KEY>"
    ```

3. Chef 서버에 업데이트된 쿡북 업로드

    ```bash
    berks upload
    # or
    knife cookbook upload datadog

    knife cookbook list | grep datadog && \
    echo -e "\033[0;32mdatadog cookbook - OK\033[0m" || \
    echo -e "\033[0;31mmissing datadog cookbook - OK\033[0m"
    ```

   쿡북을 노드에 적용할 수 있습니다.

4. 업로드되면 노드의 run_list나 역할에 추가합니다.

    ```conf
    "run_list": [
      "recipe[datadog::dd-handler]"
    ]
    ```

5. 다음 예정된 chef-client 실행을 기다립니다.

### 로그 수집

에이전트 v6.0 이상에서 로그 수집을 사용할 수 있습니다. [attributes/default.rb][6]를 참조해 활성화합니다. 자세한 정보는 아래의 [설정 예시](#customizations)를 확인하세요.

### 검증

[이벤트 스트림][7]에서 검색 바에 `sources:chef`를 입력합니다. Chef 실행이 나타납니다.

## 수집한 데이터

### 메트릭

{{< get-metrics-from-git >}}

## 참고 자료

### 커스터마이제이션

Datadog Chef 쿡북은 통합별 레시피를 제공합니다.

실행 목록에서 이러한 레시피 중 하나를 포함하면 모니터링 종속성을 설치합니다. 예를 들어 파이썬(Python) 모듈은 해당 서비스를 모니터링하고 올바른 설정 파일을 작성하는 데 사용됩니다. 

`webserver.rb` 역할 파일을 확장하여 Datadog를 사용해 자동으로 Apache를 모니터링하는 예입니다.

```ruby
name 'webserver'
description 'Webserver role, runs apache'
run_list(
  'apache2',
  'datadog::apache',
)
default_attributes(
  'apache' => {
    'ext_status' => true,
  }
  'datadog' => {
    'apache' => {
      'instances' => [
        { 'status_url' => 'http://localhost:8080/server-status/',
          'tags' => ['extra_tag', 'env:example'] }
      ],
      'logs' => [
        { 'type' => 'file',
          'path' => '/var/log/apache2/access.log',
          'source' => 'apache',
          'service' => 'myapp',
          'sourcecategory' => 'http_web_access',
          'tags' => ['extra_tag', 'env:example'] },
        { 'type' => 'file',
          'path' => '/var/log/apache2/error.log',
          'source' => 'apache',
          'service' => 'myapp',
          'sourcecategory' => 'http_web_access',
          'tags' => ['extra_tag', 'env:example'] }
      ]
    }
  }
)
```

이 예에서 `datadog::apache` 레시피가 실행 목록과 일부 속성에 추가되어 어떤 Apache 인스턴스가 Datadog로 모니터링될지 제어합니다.

속성의 `instances` 부분으로 전달할 통합 값의 실세 상세 정보에 대한 각 레시피 파일을 읽습니다. 

[1]: https://docs.chef.io/handlers.html
[2]: https://supermarket.chef.io/cookbooks/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: https://app.datadoghq.com/dashboard/lists
[6]: https://github.com/DataDog/chef-datadog/blob/v2.15.0/attributes/default.rb#L383-L388
[7]: https://app.datadoghq.com/event/stream