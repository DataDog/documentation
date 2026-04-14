---
disable_toc: false
private: true
title: Agent 6 구성 파일
---

## Agent 기본 구성 파일

Agent 점검 및 통합을 위한 구성 파일은 `conf.d` 디렉터리에 저장됩니다.

**YAML**이 복잡한 구성을 지원하는 데 더 효율적이기 때문에 Agent v6 구성 파일에 사용됩니다. Checks 또한 YAML 구성 파일을 사용하기 때문에 일관된 구성 경험을 제공할 수 있습니다. 따라서 `datadog.conf`(v5)이 `datadog.yaml`(v6)으로 대체됩니다.

`conf.d` 디렉터리의 위치는 운영체제에 따라 다릅니다.

| 플랫폼                             | 명령어                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| 윈도우즈(Windows)                              | `%ProgramData%\Datadog\datadog.yaml` |

사용 가능한 모든 구성 옵션은 [샘플 `config_template.yaml` 파일][1]을 참고하세요.

## Agent 구성 디렉터리

이전 버전의 Datadog Agent에서는 구성 파일을 `/dd-agent/conf.d/`에 저장했습니다. 6.0 릴리스부터 구성 파일은 `conf.d` 디렉터리에 저장됩니다. 디렉터리의 위치는 운영 체제에 따라 다릅니다.

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
| 윈도우즈(Windows)                              | `%ProgramData%\Datadog\conf.d` |

### 점검 구성 파일

각 Agent 점검 구성 파일의 예는 해당 `<CHECK_NAME>.d/` 폴더의 `conf.yaml.example` 파일에서 확인할 수 있습니다. 관련 점검을 활성화하려면 이 파일의 이름을 `conf.yaml`로 변경하세요. **참고**: Agent는 `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`폴더에 있는 유효한 YAML 파일을 로드합니다. 이를 통해 복잡한 구성을 여러 파일로 나눌 수 있습니다. 예를 들어, `http_check`의 구성은 다음과 같습니다.

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

접미사가 `.default`인 YAML 파일은 특별한 경우입니다. 이러한 파일은 Agent가 기본적으로 로드하는 파일이며, 항상 활성화되는 핵심 점검 세트(CPU, 메모리, 가동 시간 등)를 정의하는 데 도움이 됩니다. 해당 점검에 다른 구성이 발견되면 무시되기 때문에 안심하고 무시해도 됩니다. 기본 점검 중 하나를 비활성화하려면 해당 파일을 제거하세요. 이러한 점검을 구성하려면 `conf.yaml.example`를 기반으로 사용해야 합니다.

Autodiscovery  템플릿 파일은 `auto_conf.yaml` 파일과 함께 구성 폴더에 저장됩니다. 예를 들어, Redis 점검이라면 `redisdb.d/`에서의 구성은 다음과 같습니다.

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

로그 수집 시, Agent는 동일한 로그 소스를 가리키는 여러 YAML 파일을 허용하지 않습니다. 이는 중복된 로그가 Datadog으로 전송되는 것을 방지하기 위함입니다. 동일한 로그 소스를 가리키는 YAML 파일이 두 개 이상 있는 경우, Agent는 파일을 알파벳순으로 정렬하여 첫 번째 파일을 사용합니다.

이전 버전과의 호환성을 유지하기 위해 Agent는 여전히 `/etc/dd-agent/conf.d/<CHECK_NAME>.yaml` 형식의 구성 파일을 선택하지만 새 레이아웃으로 마이그레이션하는 것이 좋습니다.

## JMX 설정 파일

JMX Agent 점검에는 구성 폴더에 추가 `metrics.yaml` 파일이 있습니다. 이 파일은 Datadog Datadog Agent가 기본적으로 수집하는 전체 bean 목록입니다. 이렇게 하면 [Docker 레이블 또는 k8s 어노테이션][2]을 통해 점검을 구성할 때 bean의 전체 목록을 수동으로 작성할 필요가 없습니다.

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /ko/agent/kubernetes/integrations/#configuration