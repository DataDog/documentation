---
dependencies:
- https://github.com/DataDog/puppet-datadog-agent/blob/main/README.md
title: Puppet
---
이 모듈은 Datadog 에이전트를 설치하고 Puppet 보고서를 Datadog으로 보냅니다.

### 요건

Datadog Puppet 모듈은 Linux 및 Windows를 지원하며 Puppet >= 4.6.x 또는 Puppet 엔터프라이즈 버전 >= 2016.4와 호환됩니다. 호환성에 관한 자세한 내용은 [Puppet 구축의 모듈 페이지][1]를 참고하세요.

### 설치

Puppet 마스터 모듈 경로에 [datadog_agent][1] Puppet 모듈을 설치합니다.

```shell
puppet module install datadog-datadog_agent
```

#### 업그레이드

- 기본적으로 Datadog 에이전트 버전 7.x가 설치되어 있습니다. 이전 버전의 에이전트를 사용하려면 `agent_major_version`설정을 변경합니다.
- `agent_major_version`로 대체되었기 때문에 이제 `agent5_enable`를 사용하지 않습니다.
- 에이전트 v6 및 v7에 모두 적용되므로 `agent6_extra_options`이 `agent_extra_options`으로 이름이 변경되었습니다.
- 에이전트 v6 및 v7에 모두 적용되므로 `agent6_log_file`이 `agent_log_file`로 이름이 변경되었습니다.
- 모든 에이전트 버전에서 `agent5_repo_uri`와 `agent6_repo_uri`이 `agent_repo_uri`가 됩니다.
- 모든 에이전트 버전에서 `conf_dir`과 `conf6_dir`이 `conf_dir`가 됩니다.
- 모든 에이전트 버전에서 Linux 상 생성된 리포지토리 파일의 이름은 `datadog5`/`datadog6` 대신 `datadog`가 됩니다.

### 설정

`datadog_agent` 모듈이 `puppetserver`/`puppetmaster`(또는 마스터리스 호스트)에 설치되면 다음 설정 단계를 따릅니다.

1. [Datadog API 키][2]를 가져옵니다.
2. 노드 매니페스트에 Datadog 클래스를 추가합니다(예: `/etc/puppetlabs/code/environments/production/manifests/site.pp`).

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
    }
    ```

   기본값 'datadoghq.com' 외의 Datadog 사이트를 사용하는 경우 여기서도 설정합니다.

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
        datadog_site => "datadoghq.eu",
    }
    ```

   CentOS/RHEL 버전 < 7.0과 Ubuntu < 15.04의 경우 서비스 공급자를 `upstart`로 지정합니다.

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
        service_provider => 'upstart'
    }
    ```

   여기서 사용할 수 있는 인수 목록은 [설정 변수](#configuration-variables) 섹션을 참고하세요.

4. (선택 사항) 에이전트와 사용할 통합을 포함합니다. 다음은 Mongo 통합을 설치하는 예시입니다.

    ```conf
    class { 'datadog_agent::integrations::mongo':
        # integration arguments go here
    }
    ```

    주어진 통합에 사용할 수 있는 모든 인수를 보려면 [코드 코멘트][6]를 참고하세요.

    통합에 [전용 클래스가 있는 매니페스트][7]가 없는 경우에도 해당 클래스에 설정을 추가할 수 있습니다. 다음은 `ntp` 점검 예시입니다.

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

5. (선택 사항) Puppet 자체의 메트릭과 이벤트를 수집하려면 [보고서](#reporting)에 관한 섹션을 참고하세요.

### 통합 업그레이드

특정 통합 버전을 설치하고 고정하려면 `datadog_agent::install_integration`을 사용하세요. 그러면 `datadog-agent integration` 명령을 호출해 특정 통합이 설치나 제거되었는지 확인할 수 있습니다. 다음 예를 참고하세요.

```conf
datadog_agent::install_integration { "mongo-1.9":
    ensure => present,
    integration_name => 'datadog-mongo',
    version => '1.9.0',
    third_party => false,
}
```

`ensure`인수는 다음 두 가지 값일 수 있습니다.

- `present`(기본값)
- `absent`(이전에 고정된 통합 버전 제거)

타사 통합(예: 마켓플레이스에서)을 설치하려면 `third_party`인수를 `true`로 설정합니다.

에이전트 번들로 제공된 버전의 이전 버전으로 통합을 다운그레이드할 수 없습니다.

### 보고

Puppet 실행을 Datadog 타임라인으로 보고하려면 Puppet 마스터에서 보고서 프로세서를 사용하도록 설정하고 클라이언트를 보고합니다. 클라이언트는 체크인할 때마다 실행 보고서를 마스터로 다시 보냅니다.

1. 마스터의 노드 구성 매니페스트에서 `puppet_run_reports` 옵션을 true로 설정합니다.

    ```ruby
    class { 'datadog-agent':
      api_key            => '<YOUR_DD_API_KEY>',
      puppet_run_reports => true
      # ...
    }
    ```

    dogapi gem이 자동으로 설치됩니다. 설치를 사용자 지정하려면 `manage_dogapi_gem`를 false로 설정하세요.

2. Puppet 마스터 설정(예: `/etc/puppetlabs/puppet/puppet.conf`)에 다음 설정 옵션을 추가합니다.

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

[`ini_setting`모듈](https://forge.puppet.com/modules/puppetlabs/inifile):

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

3. Puppet 클라이언트 노드 모두에서 동일한 위치에 다음을 추가합니다.

    ```ini
    [agent]
    # ...
    report=true
    ```

[`ini_setting`모듈](https://forge.puppet.com/modules/puppetlabs/inifile):

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

4. (선택 사항) 팩트가 포함된 보고서 태깅을 활성화합니다.

   이벤트로 Datadog에 전송되는 보고서에 태그를 추가할 수 있습니다. 보고서와 관련된 특정 노드의 Puppet 팩트에서 이 보고서를 가져올 수 있습니다. 태그는 1:1이어야 하며 가독성을 보장하기 위해 구조화된 사실(해시, 어레이 등)을 포함하지 않아야 합니다. 일반 팩트 태깅을 활성화하려면 `datadog_agent::reports::report_fact_tags`파라미터를 팩트 배열 값으로 설정합니다(예: `["virtual","operatingsystem"]`). 신뢰할 수 있는 팩트 태깅을 활성화하려면 `datadog_agent::reports::report_trusted_fact_tags` 파라미터를 팩트 배열 값으로 설정합니다(예: `["certname","extensions.pp_role","hostname"]`).

    참고: 설정을 변경한 후에는 pe-puppet 서버(또는 Puppet 서버)를 재시작해야 보고서 프로세서를 다시 읽을 수 있습니다. 서비스를 다시 시작하기 전에 변경 사항이 배포되었는지 확인하세요.

   팁:
    - 대상 팩트를 지정할 때 점 색인을 사용하세요. 그러지 않으면 전체 팩트 데이터 집합이 문자열 값이 됩니다(유용하지 않음).
    - 호스트 이름, 가동 시간, 메모리 등과 같은 모니터링에서 공통 데이터를 복제하지 마세요.
    - 메트릭 내 같은 태그에 의미 있는 상관 관계를 구축하는 데 도움이 되는 역할, 소유자, 템플릿, 데이터 센터 등과 같은 핵심 팩트를 조정하세요.

5. [이벤트 스트림][5]에서 `sources:puppet`을 검색하여 Puppet 데이터가 Datadog에 있는지 확인합니다.

### NPM 설정

Datadog 에이전트 네트워크 성능 모니터링(NPM) 기능을 활성화하려면 다음 단계를 따르세요.

1. (Windows만 해당) 에이전트가 이미 설치되어 있는 경우 기본 클래스로 `win_ensure => absent`을 전달해 에이전트와 다른 클래스의 정의를 제거하세요.
2. (Windows 전용) `datadog::datadog_agent`클래스에 `true`값이 있는 `windows_npm_install` 옵션을 전달합니다. 이전 단계에서 추가된 경우 `win_ensure`를 제거합니다.
3. `datadog_agent::system_probe` 클래스를 사용해 설정 파일을 올바르게 생성합니다.

```conf
class { 'datadog_agent::system_probe':
    network_enabled => true, 
}
```

### USM 설치

Datadog 에이전트 일반적인 서비스 모니터링(USM)을 활성화하려면 `datadog_agent::system_probe` 클래스를 사용하여 설정 파일을 적절하게 만듭니다.

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true, 
}
```

### 트러블슈팅

Puppet 에이전트를 수동으로 실행해 출력 오류를 점검할 수 있습니다.

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

다음 오류가 나타나면 `reports=datadog_reports`가 `[main]`이 아니라 `[master]`에 정의되어 있는지 확인하세요.

    ```text
    err: Could not send report:
    Error 400 on SERVER: Could not autoload datadog_reports:
    Class Datadog_reports is already defined in Puppet::Reports
    ```

들어오는 보고서가 없으면 Puppet 서버 로그를 점검합니다.

### 마스터리스 Puppet

1. 마스터리스를 실행하는 모든 노드에 Datadog 모듈과 그 종속성을 설치해야 합니다.
2. 각 노드의 `site.pp` 파일에 추가합니다.
    ```conf
    class { "datadog_agent":
        api_key            => "<YOUR_DD_API_KEY>",
        puppet_run_reports => true
    }
   ```

3. 마스터리스 설정에서 Puppet을 실행합니다.
    ```shell
    puppet apply --modulepath <path_to_modules> <path_to_site.pp>
    ```

### 클라이언트 노드 태깅

Datadog 에이전트 설정 파일은 Puppet이 실행될 때마다 템플릿에서 재생성됩니다. 노드에 태그를 지정해야 하는 경우 Hiera에 배열 항목을 추가합니다.

```conf
datadog_agent::tags:
- 'keyname:value'
- 'anotherkey:%{factname}'
```
커스텀 팩트로부터 태그를 생성하려면 Puppet 팩트가 있는 노드를 Puppet 엔터프라이스 콘솔이나 Hiera를 통해  ```facts_to_tags``` 파라미터 배열로 분류합니다. 다음 예를 참고하세요.

```conf
class { "datadog_agent":
  api_key            => "<YOUR_DD_API_KEY>",
  facts_to_tags      => ["osfamily","networking.domain","my_custom_fact"],
}
```

팁:

1. 구조화된 팩트의 경우 특정 팩트 값으로 인덱스를 지정하세요. 그러지 않으면 전체 배열이 문자열로 인식되어 사용하기 어려워집니다.
2. CPU 사용량, 가동 시간 등 각 실행이 변경될 것으로 예상되는 동적 팩트를 태깅에 사용하는 것은 좋지 않습니다. 노드의 수명 동안 유지될 것으로 예상되는 정적 팩트를 태깅으로 사용하는 것이 좋습니다.

### 설정 변수

`datadog_agent`클래스에서 이 변수를 설정해 에이전트 설정을 제어할 수 있습니다. 지원되는 인수 전체 목록은 [코드][8]를 참고하세요.

| 변수 이름                           | 설명                                                                                                                                                                                      |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`                   | 설치할 에이전트 버전: 5, 6, 또는 7(기본값: 7).                                                                                                                              |
| `agent_version`                         | 설치할 에이전트의 특정 하위 버전을 고정할 수 있습니다(예: `1:7.16.0-1`). 최신 버전을 설치하려면 비워 둡니다.                                                             |
| `collect_ec2_tags`                      | `true`로 설정하면 인스턴스의 커스텀 EC2 태그를 에이전트 태그로 수집합니다.                                                                                                                             |
| `collect_instance_metadata`             | `true`로 설정하면 인스턴스의 EC2 메타데이터를 에이전트 태그로 수집합니다.                                                                                                                                |
| `datadog_site`                          | 보고할 Datadog 사이트입니다(에이전트 v6 및 v7에만 해당). 기본값은 `datadoghq.com`입니다(예: `datadoghq.eu` 또는`us3.datadoghq.com`).                                                          |
| `dd_url`                                | Datadog 데이터 수집 서버 URL입니다. 변경할 필요가 없습니다. `datadog_site`를 재정의합니다.                                                                                                 |
| `host`                                  | 노드의 호스트 이름을 재정의합니다.                                                                                                                                                                  |
| `local_tags`                            | 노드 태그로 설정된 `<KEY:VALUE>` 문자열 배열입니다.                                                                                                                             |
| `non_local_traffic`                     | 이 노드는 다른 노드가 여기를 통해 트래픽을 중계하도록 허용합니다.                                                                                                                                      |
| `apm_enabled`                           | 애플리케이션 성능 모니터링(APM) 에이전트를 활성화하는 부울입니다(기본값은 false).                                                                                                                                           |
| `process_enabled`                       | 에이전트 프로세스를 활성화하는 boolean (기본값은 false)입니다.                                                                                                                                       |
| `scrub_args`                            | 프로세스 cmdline 스크러빙을 활성화하는 부울입니다(기본값은 true).                                                                                                                            |
| `custom_sensitive_words`                | 스크러빙 기능에 사용하는 기본 단어보다 더 많은 단어를 추가할 때 사용하는 배열(기본값 `[]`).                                                                                             |
| `logs_enabled`                          | 로그 에이전트를 활성화하는 부울입니다(기본값은 false).                                                                                                                                          |
| `windows_npm_install`                   | Windows NPM 드라이버 설치를 활성화하는 부울입니다(기본값은 false).                                                                                                                     |
| `win_ensure`                            | Windows에서 Datadog 에이전트의 유무를 확인하기 위한 열거형(present/absent)입니다(기본값은 present).                                                                                    |
| `container_collect_all`                 | 모든 컨테이너에서 로그 수집을 활성화하는 부울입니다.                                                                                                                                          |
| `agent_extra_options`<sup>1</sup>       | 추가 설정 옵션을 제공하는 해시입니다(에이전트 v6 및 v7에만 해당).                                                                                                                       |
| `hostname_extraction_regex`<sup>2</sup> | Puppet 노드 이름을 보고하는 대신 Datadog에서 실행을 보고하기 위해 호스트 이름 캡처 그룹을 추출하는 데 사용되는 정규식입니다(예: <br> ` '^(?<hostname>.*\.datadoghq\.com)(\.i-\w{8}\..*)?`) |

(1) `agent_extra_options`는 추가 에이전트 v6/v7 설정 옵션의 세밀하게 제어할 때 사용합니다. 심층 병합이 실행되고 `datadog_agent` 클래스 파라미터에 제공된 옵션을 재정의할 수 있습니다. 다음 예를 참고하세요.

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

(2) `hostname_extraction_regex`는 Puppet 모듈과 Datadog 에이전트가 인프라스트럭처 목록에서 동일한 호스트에 서로 다른 호스트 이름을 보고하는 경우에 유용합니다.

[1]: https://forge.puppet.com/datadog/datadog_agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://github.com/DataDog/dogapi-rb
[4]: https://app.datadoghq.com/account/settings#integrations
[5]: https://app.datadoghq.com/event/stream
[6]: https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/integrations/mongo.pp
[7]: https://github.com/DataDog/puppet-datadog-agent/tree/master/manifests/integrations
[8]: https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/init.pp