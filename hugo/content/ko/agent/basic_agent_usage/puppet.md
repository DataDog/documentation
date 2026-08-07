---
dependencies:
- https://github.com/DataDog/puppet-datadog-agent/blob/main/README.md
title: Puppet
---
이 모듈은 Datadog Agent를 설치하고 Puppet 보고서를 Datadog에 보냅니다.

### 요구 사항

Datadog Puppet 모듈은 Linux 및 Windows를 지원하며 Puppet 4.6.x 이상 또는 Puppet Enterprise 버전 2016.4 이상과 호환됩니다. 호환성에 대한 자세한 내용은 [Puppet Forge의 모듈 페이지][1]를 확인하세요.

### 설치

Puppet 마스터 모듈 경로에 [datadog_agent][1] Puppet 모듈을 설치합니다.

```shell
puppet module install datadog-datadog_agent
```

#### 업그레이드하기

- 기본적으로 Datadog Agent v7.x가 설치됩니다. 이전 Agent 버전을 사용하려면 `agent_major_version` 설정을 변경하세요.
- `agent5_enable` 더 이상 사용되지 않으며, 대신 `agent_major_version`이 사용됩니다.
- `agent6_extra_options`는 Agent v6 및 v7 모두에 적용되므로 이름이 `agent_extra_options`로 변경되었습니다.
- `agent6_log_file`는 Agent v6 및 v7 모두에 적용되므로 이름이 `agent_log_file`로 변경되었습니다.
- `agent5_repo_uri`와 `agent6_repo_uri`은 모든 Agent 버전에서 `agent_repo_uri`이 됩니다.
- `conf_dir`와 `conf6_dir`는 모든 Agent 버전에서 `conf_dir`가 됩니다.
- Linux에서 생성된 리포지토리 파일은 `datadog5`/`datadog6` 대신 모든 Agent 버전에 대해 `datadog`으로 이름이 지정됩니다.

### 구성

`datadog_agent` 모듈이 `puppetserver`/`puppetmaster` (또는 마스터리스 호스트)에 설치되면 다음 구성 단계를 따르세요.

1. [Datadog API 키][2]를 받습니다.
2. 노드 매니페스트에 Datadog 클래스를 추가합니다(예:`/etc/puppetlabs/code/environments/production/manifests/site.pp`).

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
    }
    ```

   기본 'datadoghq.com'이 아닌 Datadog 사이트를 사용하는 경우 여기에서도 설정하세요.

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
        datadog_site => "datadoghq.eu",
    }
    ```

   CentOS/RHEL 버전 7.0 미만 및 Ubuntu 15.04 미만의 경우 서비스 공급자를 `upstart`로 지정합니다.

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
        service_provider => 'upstart'
    }
    ```

   여기에서 사용할 수 있는 인수 목록은 [구성 변수](#configuration-variables) 섹션을 참조하세요.

4. (선택 사항) Agent와 함께 사용하려는 통합을 포함합니다. 다음 예에서는 mongo 통합을 설치합니다.

    ```conf
    class { 'datadog_agent::integrations::mongo':
        # integration arguments go here
    }
    ```

   특정 통합에 사용할 수 있는 모든 인수는 [코드의 주석][6]을 참조하세요.

   통합에 [전용 클래스가 있는 매니페스트][7]가 없는 경우에도 이에 대한 구성을 추가할 수 있습니다. 다음은 `ntp` 검사에 대한 예입니다.

    ```conf
    class { 'datadog_agent':
        api_key      => "<YOUR_DD_API_KEY>",
        integrations => {
            "ntp" => {
                init_config => {},
                instances => [{
                    offset_threshold => 30,
                }],
            },
        },
    }
    ```

5. (선택 사항) Puppet 자체에 대한 메트릭과 이벤트를 수집하려면 [보고](#reporting) 섹션을 참조하세요.

### 통합 업그레이드하기

특정 통합 버전을 설치하고 고정하려면 `datadog_agent::install_integration`을 사용합니다. 이는 특정 통합이 설치 또는 제거되었는지 확인하기 위해 `datadog-agent integration` 명령을 호출합니다. 예를 들면 다음과 같습니다.

```conf
datadog_agent::install_integration { "mongo-1.9":
    ensure => present,
    integration_name => 'datadog-mongo',
    version => '1.9.0',
    third_party => false,
}
```

`ensure` 인수는 두 가지 값을 취할 수 있습니다.

- `present` (기본값)
- `absent` (이전에 고정된 통합 버전 제거)

타사 통합을 설치하려면(예: 마켓플레이스에서) `third_party` 인수를 `true`로 설정합니다.

Agent와 함께 번들로 제공되는 버전보다 이전 버전으로 통합을 다운그레이드하는 것은 불가능합니다.

### 보고

Datadog 타임라인에 대한 Puppet 실행 보고를 활성화하려면 Puppet 마스터에서 보고 프로세서를 활성화하고 클라이언트에 대해 보고합니다. 클라이언트는 체크인할 때마다 실행 보고서를 마스터로 보냅니다.

1. 마스터의 노드 구성 매니페스트에서 `puppet_run_reports` 옵션을 true로 설정합니다.

    ```ruby
    class { 'datadog-agent':
      api_key            => '<YOUR_DD_API_KEY>',
      puppet_run_reports => true
      # ...
    }
    ```

   dogapi gem이 자동으로 설치됩니다. 설치를 사용자 정의하려면 `manage_dogapi_gem`를 false로 설정합니다.

2. Puppet 마스터 구성에 다음 구성 옵션을 추가합니다(예: `/etc/puppetlabs/puppet/puppet.conf`).

    ```ini
    [main]
    # No modification needed to this section
    # ...

    [master]
    # Enable reporting to Datadog
    reports=datadog_reports
    # If you use other reports, add datadog_reports to the end,
    # for example: reports=store,log,datadog_reports
    # ...

    [agent]
    # ...
    report=true
    ```

[`ini_setting` 모듈](https://forge.puppet.com/modules/puppetlabs/inifile) 사용:

```puppet
  ini_setting { 'puppet_conf_master_report_datadog_puppetdb':
    ensure  => present,
    path    => '/etc/puppetlabs/puppet/puppet.conf',
    section => 'master',
    setting => 'reports',
    value   => 'datadog_reports,puppetdb',
    notify  => [
      Service['puppet'],
      Service['puppetserver'],
    ],
  }
```

3. 모든 Puppet 클라이언트 노드에서 동일한 위치에 다음을 추가합니다.

    ```ini
    [agent]
    # ...
    report=true
    ```

[`ini_setting` 모듈](https://forge.puppet.com/modules/puppetlabs/inifile) 사용:

```puppet
  ini_setting { 'puppet_conf_agent_report_true':
    ensure  => present,
    path    => '/etc/puppetlabs/puppet/puppet.conf',
    section => 'agent',
    setting => 'report',
    value   => 'true',
    notify  => [
      Service['puppet'],
    ],
  }
```

4. (선택 사항) 팩트가 포함된 보고서에 태그 지정 활성화

   Datadog에 이벤트로 전송되는 보고서에 태그를 추가할 수 있습니다. 이러한 태그는 보고서와 관련된 특정 노드에 대한 Puppet 팩트에서 제공될 수 있습니다. 이는 1:1이어야 하며 가독성을 보장하기 위해 구조화된 팩트(해시, 배열 등)을 포함하지 않아야 합니다. 정기적인 팩트 태그 지정을 활성화하려면 `datadog_agent::reports::report_fact_tags` 파라미터를 팩트의 배열 값(예: `["virtual","operatingsystem"]`)으로 설정합니다. 신뢰할 수 있는 팩트 태그 지정을 활성화하려면 `datadog_agent::reports::report_trusted_fact_tags` 파라미터를 팩트의 배열 값(예:  `["certname","extensions.pp_role","hostname"]`)으로 설정합니다.

   참고: 이러한 설정을 변경하고 보고 프로세서를 다시 읽으려면 pe-puppetserver(또는 puppetserver)를 다시 시작해야 합니다. 서비스를 다시 시작하기 전에 변경 사항이 배포되었는지 확인하세요.

   팁:
    - 대상 팩트를 지정하려면 점 인덱스를 사용하세요. 그렇지 않으면 전체 팩트 데이터 세트가 문자열 값이 됩니다(별로 유용하지 않음).
    - 호스트 이름, 가동 시간, 메모리 등과 같은 모니터링에서 공통 데이터를 복제하지 마세요.
    - 역할, 소유자, 템플릿, 데이터 센터 등과 같은 핵심 팩트를 조정하면 메트릭에서 동일한 태그에 대한 의미 있는 상관 관계를 구축하는 데 도움이 됩니다.

5. [Event Stream][5]에서 `sources:puppet`을 검색하여 Puppet 데이터가 Datadog에 있는지 확인하세요.

### NPM 설정

Datadog Agent Network Performance Monitoring (NPM) 기능을 활성화하려면 다음 단계를 따르세요.

1. (Windows만 해당) Agent가 이미 설치되어 있는 경우 `win_ensure => absent`를 기본 클래스에 전달하고 다른 클래스의 정의를 삭제해 제거합니다.
2. (Windows에만 해당) `true` 값이 포함된 `windows_npm_install` 옵션을 `datadog::datadog_agent` 클래스에 전달합니다. 이전 단계에서 추가한 경우 `win_ensure`을 제거합니다.
3. `datadog_agent::system_probe` 클래스를 사용해 설정 파일을 올바르게 생성합니다.

```conf
class { 'datadog_agent::system_probe':
    network_enabled => true,
}
```

### USM 설정

Datadog Agent Universal Service Monitoring(USM)을 활성화하려면 `datadog_agent::system_probe` 클래스를 사용하여 구성 파일을 올바르게 생성하세요.

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true,
}
```

### 트러블슈팅

Puppet Agent를 수동으로 실행하여 출력에서 ​​오류를 확인할 수 있습니다.

    ```shell
    sudo systemctl restart puppetserver
    sudo puppet agent --onetime --no-daemonize --no-splay --verbose
    ```

     Example response:

    ```text
    info: Retrieving plugin
    info: Caching catalog for alq-linux.dev.datadoghq.com
    info: Applying configuration version '1333470114'
    notice: Finished catalog run in 0.81 seconds
    ```

다음 오류가 표시되면 `reports=datadog_reports`가 `[main]`이 아닌 `[master]`에 정의되어 있는지 확인하세요.

    ```text
    err: Could not send report:
    Error 400 on SERVER: Could not autoload datadog_reports:
    Class Datadog_reports is already defined in Puppet::Reports
    ```

들어오는 보고서가 표시되지 않으면 Puppet 서버 로그를 확인하세요.

### 마스터 없는 Puppet

1. Datadog 모듈과 해당 종속성은 마스터 없이 실행되는 모든 노드에 설치되어야 합니다.
2. 각 노드의 `site.pp` 파일에 다음을 추가합니다.
    ```conf
    class { "datadog_agent":
        api_key            => "<YOUR_DD_API_KEY>",
        puppet_run_reports => true
    }
   ```

3. 마스터 없는 구성에서 Puppet을 실행합니다.
    ```shell
    puppet apply --modulepath <path_to_modules> <path_to_site.pp>
    ```

### 클라이언트 노드에 태그 지정

Datadog Agent 구성 파일은 Puppet이 실행될 때마다 템플릿에서 다시 생성됩니다. 노드에 태그를 지정해야 하는 경우 Hiera에 배열 항목을 추가하세요.

```conf
datadog_agent::tags:
- 'keyname:value'
- 'anotherkey:%{factname}'
```
커스텀 팩트에서 태그를 생성하려면 Puppet Enterprise 콘솔 또는 Hiera를 통해 Puppet 팩트가 포함된 노드를 ```facts_to_tags``` 파라미터에 대한 배열로 분류합니다. 예는 다음과 같습니다.

```conf
class { "datadog_agent":
  api_key            => "<YOUR_DD_API_KEY>",
  facts_to_tags      => ["os.family","networking.domain","my_custom_fact"],
}
```

팁:

1. 구조화된 팩트의 경우 특정 팩트 값으로 인덱싱됩니다. 그렇지 않으면 전체 배열이 문자열로 나타나 사용하기 어렵습니다.
2. CPU 사용량, 가동 시간 및 각 실행 시 변경될 것으로 예상되는 기타 사항과 같은 동적 팩트는 태그를 지정하기에 적합하지 않습니다. 노드 수명 동안 유지될 것으로 예상되는 정적 팩트가 태그 지정에 적합합니다.

### 구성 변수

이러한 변수는 `datadog_agent` 클래스에서 설정되어 Agent의 설정을 제어할 수 있습니다. 지원되는 인수의 전체 목록은 [코드의 주석][8]을 참조하세요.

| 변수 이름                           | 설명                                                                                                                                                                                      |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`                   | 설치할 Agent 버전: 5, 6 또는 7(기본값: 7)                                                                                                                              |
| `agent_version`                         | 설치할 Agent 의 특정 마이너 버전을 고정할 수 있습니다(예: `1:7.16.0-1`). 최신 버전을 설치하려면 비워 두세요.                                                             |
| `collect_ec2_tags`                      | `true`를 사용하여 인스턴스의 커스텀 EC2 태그를 Agent 태그로 수집합니다.                                                                                                                             |
| `collect_instance_metadata`             | `true`를 사용하여 인스턴스의 EC2 메타데이터를 Agent 태그로 수집합니다.                                                                                                                                |
| `datadog_site`                          | 보고할 Datadog 사이트입니다(Agent v6 및 v7에만 해당). 기본값은 `datadoghq.com`입니다. 예: `datadoghq.eu` 또는 `us3.datadoghq.com`.                                                          |
| `dd_url`                                | Datadog 인테이크 서버 URL입니다. 대부분의 경우 이를 변경하지 않습니다. `datadog_site`를 대체합니다.                                                                                                 |
| `host`                                  | 노드의 호스트 이름을 대체합니다.                                                                                                                                                                  |
| `local_tags`                            | 노드의 태그로 설정된 `<KEY:VALUE>` 문자열 배열입니다.                                                                                                                             |
| `non_local_traffic`                     | 다른 노드가 이 노드를 통해 트래픽을 릴레이할 수 있도록 허용합니다.                                                                                                                                      |
| `apm_enabled`                           | APM Agent를 활성화하는 부울입니다(기본값은 false).                                                                                                                                           |
| `process_enabled`                       | Agent 프로세스를 활성화하는 부울입니다(기본값은 false).                                                                                                                                       |
| `scrub_args`                            | 프로세스 cmdline 스크러빙을 활성화하는 부울입니다(기본값은 true).                                                                                                                            |
| `custom_sensitive_words`                | 스크러빙 기능에 사용되는 기본 단어 외에 더 많은 단어를 추가하기 위한 배열입니다(기본값은 `[]`).                                                                                             |
| `logs_enabled`                          | 로그 Agent를 활성화하는 부울입니다(기본값은 false).                                                                                                                                          |
| `windows_npm_install`                   | Windows NPM 드라이버 설치를 활성화하는 부울입니다(기본값은 false).                                                                                                                     |
| `win_ensure`                            | Windows에서 Datadog Agent의 존재 여부를 확인하는 이넘(present/absent)입니다(기본값은 present).                                                                                    |
| `container_collect_all`                 | 모든 컨테이너에 대한 로그 수집을 활성화하는 부울입니다.                                                                                                                                          |
| `agent_extra_options`<sup>1</sup>       | 추가 구성 옵션을 제공하기 위한 해시입니다(Agent v6 및 v7에만 해당).                                                                                                                       |
| `hostname_extraction_regex`<sup>2</sup> | Puppet 노드 이름을 보고하는 대신 Datadog에서 실행을 보고하기 위해 호스트 이름 캡처 그룹을 추출하는 데 사용되는 정규식 (예: <br>`'^(?<hostname>.*\.datadoghq\.com)(\.i-\w{8}\..*)?`) |

(1) `agent_extra_options`은 추가 Agent v6/v7 구성 옵션을 세부적으로 제어하는 ​​데 사용됩니다. `datadog_agent` 클래스 파라미터에 제공된 옵션을 재정의할 수 있는 심층 병합이 수행됩니다. 예:

```
class { "datadog_agent":
    < your other arguments to the class >,
    agent_extra_options => {
        use_http => true,
        use_compression => true,
        compression_level => 6,
    },
}
```

(2) `hostname_extraction_regex`는 Puppet 모듈과 Datadog Agent가 인프라스트럭처 목록의 동일한 호스트에 대해 서로 다른 호스트 이름을 보고할 때 유용합니다.

[1]: https://forge.puppet.com/datadog/datadog_agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://github.com/DataDog/dogapi-rb
[4]: https://app.datadoghq.com/account/settings#integrations
[5]: https://app.datadoghq.com/event/stream
[6]: https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/integrations/mongo.pp
[7]: https://github.com/DataDog/puppet-datadog-agent/tree/master/manifests/integrations
[8]: https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/init.pp