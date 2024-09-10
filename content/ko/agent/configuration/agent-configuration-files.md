---
algolia:
  category: guide
  rank: 80
  subcategory: Agent 설정 파일
  tags:
  - agent config
  - agent configuration
  - agent directory
aliases:
- /ko/agent/faq/agent-configuration-files
- /ko/agent/guide/agent-configuration-files
title: Agent 설정 파일
---

## Agent 주요 설정 파일

Agent v6 설정 파일은 **YAML**을 사용하여 복잡한 설정에 대한 더 나은 지원과 일관된 설정 환경을 제공합니다. 검사도 YAML 설정 파일을 사용하므로 `datadog.conf`(v5)는 `datadog.yaml`(v6)을 위해 폐기됩니다.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 플랫폼                             | 명령어                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| 플랫폼                             | 명령어                                                                    |
|:-------------------------------------|:---------------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |                                       |
| Windows 서버 2008, Vista 이상 | `%ProgramData%\Datadog\datadog.conf`                                       |
| Windows 서버 2003, XP 이전     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

{{% /tab %}}
{{< /tabs >}}

사용 가능한 모든 설정 옵션은 [샘플 `config_template.yaml` 파일][2]을 참조하세요.

## Agent 설정 디렉토리

이전 릴리스의 Datadog Agent는 `/dd-agent/conf.d/`에 설정 파일을 저장했습니다. 6.0 릴리스부터는 설정 파일이 `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`에 저장됩니다.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 플랫폼                             | 명령어                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `~/.datadog-agent/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| Source                               | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/datadog-agent/conf.d/`   |
| Windows                              | `%ProgramData%\Datadog\conf.d` |

### Agent 6에 대한 검사 설정 파일

각 Agent 검사 설정 파일에 대한 예시는 해당 `<CHECK_NAME>.d/` 폴더의 `conf.yaml.example` 파일에 있습니다. 이 파일의 이름을 `conf.yaml`로 변경하여 관련 검사를 활성화합니다. **참고**: Agent는 `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/` 폴더에 포함된 유효한 YAML 파일을 로드합니다. 이를 통해 복잡한 설정을 여러 파일로 나눌 수 있습니다. 예를 들어, `http_check`에 대한 설정은 다음과 같습니다:

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

특수한 경우는 접미사`.default`가 붙은 YAML 파일입니다. 이러한 파일은 Agent에 의해 기본적으로 로드되며 항상 실행되는 핵심 검사 집합(CPU, 메모리, 가동 시간 등)을 정의하는 데 도움이 됩니다. 해당 검사에 대한 다른 설정이 발견되면 무시되므로 안전하게 무시할 수 있습니다. 기본 검사 중 하나를 실행 중지하려면 해당 파일을 제거하세요. 이러한 검사를 설정하려면 `conf.yaml.example`를 기본으로 사용해야 합니다.

자동 탐지 템플릿 파일은 `auto_conf.yaml` 파일과 함께 설정 폴더에 저장됩니다. 예를 들어 Redis 검사의 경우 `redisdb.d/`의 설정은 다음과 같습니다.

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

로그 수집을 위해 Agent는 중복 로그가 Datadog으로 전송되지 않도록 동일한 로그 소스를 가리키는 여러 개의 YAML 파일을 허용하지 않습니다. 동일한 로그 소스를 가리키는 YAML 파일이 두 개 이상인 경우 Agent는 파일을 알파벳 순서로 고려하고 첫 번째 파일을 사용합니다.

이전 버전과의 호환성을 유지하기 위해 Agent는 여전히 `/etc/dd-agent/conf.d/<CHECK_NAME>.yaml` 형식의 설정 파일을 선택하지만 원활한 사용을 위해 새 레이아웃으로 마이그레이션할 것을 권장합니다.

{{% /tab %}}
{{% tab "Agent v5" %}}

| 플랫폼                             | 명령어                                                              |
|:-------------------------------------|:---------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              |
| Source                               | `/etc/dd-agent/conf.d/`                                              |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows 서버 2008, Vista 이상 | `%ProgramData%\Datadog\conf.d`                                       |
| Windows 서버 2003, XP 이전     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

{{% /tab %}}
{{< /tabs >}}

## JMX 설정 파일

JMX Agent 검사에는 설정 폴더에 추가 `metrics.yaml` 파일이 있습니다. 기본적으로 Datadog Agent가 수집하는 모든 빈(bean) 목록입니다. 이렇게 하면 [Docker 라벨 또는 k8s 어노테이션][1]을 통해 검사를 설정할 때 모든 빈(bean)을 수동으로 나열할 필요가 없습니다.

[1]: /ko/agent/kubernetes/integrations/#configuration
[2]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml