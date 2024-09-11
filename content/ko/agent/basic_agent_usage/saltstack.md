---
dependencies:
- https://github.com/DataDog/datadog-formula/blob/main/README.md
title: SaltStack
---
Datadog SaltStack 공식은 Datadog Agent와 Agent 기반 통합(점검)을 설치할 때 사용합니다. SaltStack 공식을 자세히 알아보려면 [Salt 공식 설치 및 사용 가이드][1]를 참조하시기 바랍니다.

## 구성

### 요건

Datadog SaltStack 공식은 데비안(Debian) 기반 및 레드햇(RedHat) 기반 시스템에서만 설치가 지원됩니다.

### 설치

다음의 안내에 따라 Datadog 공식을 `base` Salt 환경에 추가할 수 있습니다. 다른 Salt 환경에 추가하려면 `base` 참조값을 사용하는 Salt 환경 이름으로 변경하세요.

#### 옵션 1

Salt 마스터 노드의 베이스 환경에 [Datadog 공식][6]을 설치합니다. Salt 마스터 설정 파일(기본 설정은 `/etc/salt/master`)에서 `gitfs_remotes` 옵션을 사용합니다.

```text
fileserver_backend:
  - roots # Active by default, necessary to be able to use the local salt files we define in the next steps
  - gitfs # Adds gitfs as a fileserver backend to be able to use gitfs_remotes

gitfs_remotes:
  - https://github.com/DataDog/datadog-formula.git:
    - saltenv:
      - base:
        - ref: 3.0 # Pin the version of the formula you want to use
```

Salt Master 서비스를 재시작해 설정 변경을 적용합니다.

```shell
systemctl restart salt-master
# OR
service salt-master restart
```

#### 옵션 2

또는, Datadog 공식을 Salt 마스터 노드에 복제할 수 있습니다.

```shell
mkdir -p /srv/formulas && cd /srv/formulas
git clone https://github.com/DataDog/datadog-formula.git
```

다음으로 Salt 마스터 설정 파일(기본 설정은 `/etc/salt/master`)의 `file_roots` 베이스 환경에 추가하세요.

```text
file_roots:
  base:
    - /srv/salt/
    - /srv/formulas/datadog-formula/
```

### 배포

호스트에 Datadog Agent를 배포하는 방법은 다음과 같습니다.

1. Top 파일(기본 설정은 `/srv/salt/top.sls`)에 Datadog 공식을 추가합니다.

    ```text
    base:
      '*':
        - datadog
    ```

2. Pillar 디렉터리(기본 설정은 `/srv/pillar/`)에 `datadog.sls` 를 생성합니다. 다음을 추가하고 [Datadog API 키][2]를 업데이트하세요.

    ```
    datadog:
      config:
        api_key: <YOUR_DD_API_KEY>
      install_settings:
        agent_version: <AGENT7_VERSION>
    ```

3. Top Pillar 파일에(기본 설정은 `/srv/pillar/top.sls`) `datadog.sls`를 추가합니다.

    ```text
    base:
      '*':
        - datadog
    ```

### 설정

공식 설정은 Pillar 파일의 `datadog` 키로 작성해야 합니다. 이는 `config`, `install_settings`, `checks` 세 부분으로 구성됩니다.

#### 설정

`config`에서 설정 옵션을 추가해 minion의 Agent 설정 파일(Agent v6 & v7은 `datadog.yaml`, Agent v5는 `datadog.conf`)을 작성합니다.

설치된 Agent 버전에 따라 다양한 옵션을 설정할 수 있습니다.

- Agent v6 & v7: Agent 설정 파일에서 제공하는 모든 옵션을 지원합니다.
- Agent v5: `api_key` 옵션만 지원합니다.

아래 예시는 Datadog API 키를 설정하고, Datadog 사이트를 `datadoghq.eu`로 설정합니다(Agent v6 & v7에서 사용 가능).

```text
  datadog:
    config:
      api_key: <YOUR_DD_API_KEY>
      site: datadoghq.eu
```

#### 설치 설정

`install_settings`에서 Agent 설치 옵션을 설정합니다.

- `agent_version`: 설치할 Agent 버전(기본 설정은 최신 Agent v7입니다).

아래 예시는 Agent v6.14.1을 설치합니다.

```text
  datadog:
    install_settings:
      agent_version: 6.14.1
```

#### 점검

호스트에 Agent 통합을 추가하려면 `checks` 변수와 점검 이름을 키로 사용하세요. 각 점검에는 두 가지 옵션이 있습니다.

| 옵션    | 설명                                                                                                                                                             |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `config`  | 설정 옵션을 추가해 점검 설정 파일을 작성합니다.<br>Agent v6 & v7: `<confd_path>/<check>.d/conf.yaml`<br>Agent v5: `<confd_path>/<check>.yaml` |
| `version` | Agent v6 & v7의 경우, 설치할 점검의 버전(기본 설정은 Agent에 해당하는 버전을 설치합니다).                                                                |
| `third_party` | Agent v6 & v7의 경우(버전 v6.21.0/v7.21.0 이상만 해당합니다), 불 방식(Boolean)으로 설치할 통합이 서드파티 통합임을 표시합니다. 반드시 `version` 옵션과 함께 사용해야 합니다.                                                                |

아래 예시는 [디렉터리][3] 통합 모니터링의 v1.4.0 버전을 사용해 `/srv/pillar` 디렉터리를 모니터링하는 사례를 보여줍니다.

```text
datadog:
  config:
    api_key: <YOUR_DD_API_KEY>
  install_settings:
    agent_version: <AGENT7_VERSION>
  checks:
    directory:
      config:
        instances:
          - directory: "/srv/pillar"
            name: "pillars"
      version: 1.4.0
```

아래 예시는 "third-party-integration"이라는 이름의 샘플 서드파티 통합의 v1.0.0 버전을 사용합니다.

```
datadog:
  config:
    api_key: <YOUR_DD_API_KEY>
  install_settings:
    agent_version: <AGENT7_VERSION>
  checks:
    third-party-integration:
      config:
        instances:
          - some_config: "some value"
      version: 1.0.0
      third_party: true
```

##### 로그

로그 수집을 활성화하려면 주요 설정에서 `logs_enabled`를 `true`로 설정하세요.
```text
datadog:
  config:
    logs_enabled: true
```

Datadog로 로그를 전송하려면 점검에서 `logs` 키를 사용합니다(기존 점검에서 통합용 로그를 설정하거나, 커스텀 점검에서 커스텀 로그 수집을 설정하세요). 다음 예시는 `system_logs`라는 이름의 커스텀 점검을 사용하는 사례를 보여줍니다.

이번 점검에서 `config:`의 콘텐츠는 `/etc/datadog-agent/conf.d/<check_name>.d/conf.yaml` 파일로 작성됩니다(이번 예시에서는 `/etc/datadog-agent/conf.d/system_logs.d/conf.yaml`입니다).

수집할 로그의 목록을 작성하려면 커스텀 로고 수집 설정 파일의 `conf.yaml` 파일을 채울 때와 동일하게 `config` 섹션을 채우세요(공식 문서의 [커스텀 로고 수집](https://docs.datadoghq.com/agent/logs/?tab=tailfiles#custom-log-collection) 가이드를 참조하시기 바랍니다).

예를 들어 `/var/log/syslog`와 `/var/log/auth.log`에서 로그를 수집하려면 다음과 같이 설정해야 합니다.

```text
datadog:
[...]
  checks:
    system_logs:
      config:
        logs:
          - type: file
            path: "/var/log/syslog"
            service: "system"
          - type: file
            path: "/var/log/auth.log"
            service: "system"
```


## State

Salt 공식은 사전에 작성된 Salt State입니다. Datadog 공식에서 사용할 수 있는 State는 다음과 같습니다.

| State               | 설명                                                                                             |
|---------------------|---------------------------------------------------------------------------------------------------------|
| `datadog`           | Datadog Agent 서비스를 설치, 설정, 부팅합니다.                                             |
| `datadog.install`   | 정확한 저장소를 설정하고 Datadog Agent를 설치합니다.                                             |
| `datadog.config`    | Pillar 데이터를 사용해 Datadog Agent와 통합을 설정합니다([pillar.example][4]를 참조하세요).              |
| `datadog.service`   | Agent 및 점검의 설정 파일에서 변경 사항을 감시하는 Datadog Agent 서비스를 실행합니다. |
| `datadog.uninstall` | 서비스를 중지하고 Datadog Agent를 삭제합니다.                                                     |

**참조**: `datadog.config`를 사용해 다양한 점검 인스턴스를 서로 달느 머신에서 설정하는 경우, Salt 마스터 설정 또는 (마스터 없는 환경에서 실행 중이라면) Salt minion 설정에서 [pillar_merge_lists][5]를 `True`로 설정해야 합니다.

[1]: http://docs.saltstack.com/en/latest/topics/development/conventions/formulas.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/ko/integrations/directory/
[4]: https://github.com/DataDog/datadog-formula/blob/master/pillar.example
[5]: https://docs.saltstack.com/en/latest/ref/configuration/master.html#pillar-merge-lists
[6]: https://github.com/DataDog/datadog-formula
