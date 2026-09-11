---
algolia:
  category: guide
  rank: 80
  subcategory: Agent Configuration Files
  tags:
  - agent config
  - agent configuration
  - agent directory
aliases:
- /ko/agent/faq/agent-configuration-files
- /ko/agent/guide/agent-configuration-files
description: Datadog Agent 구성 파일의 위치, 구조 및 검사와 통합을 구성하는 방법 안내
title: Agent 구성 파일
---
## 기본 구성 파일 {#main-configuration-file}

Agent 구성 파일의 위치는 운영 체제에 따라 다릅니다.

| 플랫폼                             | 명령                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

사용 가능한 모든 구성 옵션은 [샘플 `config_template.yaml` 파일][1]을 참조하세요.

## Agent 구성 디렉터리 {#agent-configuration-directory}

Agent 검사 및 통합에 대한 구성 파일은 `conf.d` 디렉터리에 저장됩니다. 이 디렉터리의 위치는 운영 체제에 따라 다릅니다.

| 플랫폼                             | 명령                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `~/.datadog-agent/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| Source                               | `/etc/datadog-agent/conf.d/`   |
| SUSE                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/datadog-agent/conf.d/`   |
| Windows                              | `%ProgramData%\Datadog\conf.d` |

**참고**: 이 디렉터리에 있는 길이가 0인 파일은 Agent에서 무시됩니다. 이를 통해 빈 템플릿 출력 건너뛰기를 지원하지 않는 프로비저닝 시스템도 사용할 수 있습니다.

### 검사 구성 파일 {#check-configuration-files}

각 Agent 검사 구성 파일의 예제는 해당 `<CHECK_NAME>.d/` 폴더의 `conf.yaml.example` 파일에 있습니다. 연관된 검사를 활성화하려면 이 파일의 이름을 `conf.yaml`로 변경합니다. **참고**: Agent는 `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/` 폴더에 포함된 유효한 YAML 파일을 로드합니다. 이를 통해 복잡한 구성을 여러 파일로 분리할 수 있습니다. 예를 들어 `http_check`에 대한 구성은 다음과 같을 수 있습니다.

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

접미사가 `.default`인 YAML 파일은 특별한 경우입니다. 이러한 파일은 기본적으로 Agent에 의해 로드되며, 항상 활성화되는 핵심 검사(CPU, 메모리, 가동 시간 등)를 정의하는 데 사용됩니다. 특정 검사에 대해 다른 구성이 발견되면 이러한 파일은 무시되므로 안전하게 무시할 수 있습니다. 기본 검사 중 하나를 비활성화하려면 해당 파일을 제거하세요. 이러한 검사를 구성할 때는 `conf.yaml.example`를 기본 템플릿으로 사용해야 합니다.

Autodiscovery 템플릿 파일은 구성 폴더에 `auto_conf.yaml` 파일로 저장됩니다. 예를 들어 Redis 검사에 대한 `redisdb.d/` 구성은 다음과 같습니다.

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

로그 수집의 경우 중복 로그가 Datadog으로 전송되는 것을 방지하기 위해 Agent는 동일한 로그 소스를 가리키는 여러 YAML 파일을 허용하지 않습니다. 동일한 로그 소스를 가리키는 YAML 파일이 둘 이상인 경우 Agent는 파일을 알파벳 순으로 검토하고 첫 번째 파일을 사용합니다.

## JMX 구성 파일 {#jmx-configuration-file}

JMX Agent 검사에는 해당 구성 폴더에 추가로 `metrics.yaml` 파일이 있습니다. 이 파일에는 Datadog Agent가 기본적으로 수집하는 모든 Bean 목록이 포함되어 있습니다. 따라서 [Docker 레이블 또는 Kubernetes 주석][2]을 통해 검사를 구성할 때 모든 Bean을 수동으로 나열할 필요가 없습니다.

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /ko/agent/kubernetes/integrations/#configuration