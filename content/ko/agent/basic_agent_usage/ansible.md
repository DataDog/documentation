---
dependencies:
- https://github.com/DataDog/ansible-datadog/blob/main/README.md
title: Ansible
---
Datadog 에이전트 Ansible 역할을 이용해 Datadog 에이전트와 통합을 설치하고 설정합니다.

## Ansible 역할 vs Ansible 수집

Datadog 에이전트 Ansible 역할은 두 개 채널을 통해 사용할 수 있습니다.

* Datadog 수집의 일부로 Ansible 갤럭시에서 [datadog.dd](https://galaxy.ansible.com/DataDog/dd)이름(권장)으로 액세스할 수 있습니다.
* 독립 실행형 역할로 Ansible 갤럭시(레거시)에서 [datadog.datadog](https://galaxy.ansible.com/DataDog/datadog) 이름으로 액세스할 수 있습니다.

역할 버전 `4`와 수집 버전 `5`는 기본적으로 Datadog 에이전트 v7을 설치합니다.

## 설정

이 문서에서는 독립 실행형 Datadog 역할 설치에 관해 설명합니다. Datadog 수집의 설치 지침은 [README 파일 수집](https://github.com/ansible-collections/Datadog/blob/main/README.md)을 참고하세요. 독립 실행형 역할뿐만 아니라 수집을 통해 액세스하는 역할에서도 설정 변수는 동일합니다.

### 필수 요건

- Ansible 버전 2.6+가 필요합니다.
- Debian, RHEL 기반 Linux 분포, macOS, Windows 대부분에서 지원됩니다.
- Ansible 2.10+를 사용해 Windows 호스트를 관리하는 경우 `ansible.windows` 수집을 설치해야 합니다.

  ```shell
  ansible-galaxy collection install ansible.windows
  ```

### 설치

Ansible 갤럭시의 [Datadog 역할][1]을 Ansible 서버에 설치합니다.

```shell
ansible-galaxy install datadog.datadog
```

호스트에 Datadog 에이전트를 배포하려면 Datadog 역할과 API 키를 플레이북에 추가합니다.

```text
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

## 역할 변수

| 변수                                    | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog_api_key`                           | Datadog API 키입니다.|
| `datadog_site`                              | 에이전트 데이터를 보낼 Datadog 데이터 수신 사이트입니다. 기본값은 `datadoghq.com`으로 설정되어 있으며 EU 사이트로 데이터를 보내도록 `datadoghq.eu`이 설정되어 있습니다. 이 옵션은 에이전트 버전 >= 6.6.0에서만 사용할 수 있습니다.|
| `datadog_agent_flavor`                      | RPI의 IOT 설치에 기본 Debian/RedHat 패키지를 재정의합니다. 기본값은 "datadog-agent" RPI에 "datadog-iot-agent"를 사용합니다.|
| `datadog_agent_version`                     | 예를 들어, 설치할 에이전트의 고정 버전은 `7.16.0`입니다(선택 사항이나 권장됨). `datadog_agent_version`를 사용하는 경우 `datadog_agent_major_version` 설정이 필요하지 않습니다.|
| `datadog_agent_major_version`               | 설치할 에이전트의 주요 버전입니다. 가능한 값은 5, 6 또는 7(기본값)입니다. `datadog_agent_version`이 설정된 경우, 이 버전이 우선적으로 적용되며, 그렇지 않으면 지정된 주 버전의 최신 버전이 설치됩니다. `datadog_agent_version`을 사용하는 경우에는 `datadog_agent_major_version`을 설정할 필요가 없습니다.|
| `datadog_checks`                            | 에이전트 점검이 에이전트 v6 및 v7의 경우 <br>`/etc/datadog-agent/conf.d/<check_name>.d/conf.yaml`로, 에이전트 v5의 경우 <br>`/etc/dd-agent/conf.d`로 드롭할 YAML 설정입니다.|
| `datadog_disable_untracked_checks`          | `true`로 설정해 `datadog_checks`와 `datadog_additional_checks`에 없는 점검을 제거합니다.|
| `datadog_additional_checks`                 | `datadog_disable_untracked_checks`가 `true`로 설정된 경우 제거되지 않는 추가 점검 목록입니다.|
| `datadog_disable_default_checks`            | 모든 기본 점검을 제거하려면 `true`으로 설정합니다.|
| `datadog_config`                            | Datadog 에이전트 구성을 설정합니다. 역할은 [운영 체제에 따라 올바른 위치](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)에 설정을 쓰세요. 설정 옵션의 전체 목록은 [datadog-에이전트 GitHub 리포지토리의 `datadog.yaml`템플릿 파일](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml)을 참고하세요.|
| `datadog_config_ex`                         | (선택 사항) `/etc/dd-agent/datadog.conf`에 들어갈 추가 INI 섹션(에이전트 v5만 해당).|
| `datadog_apt_repo`                          | 기본 Datadog `apt` 리포지토리를 재정의합니다. Datadog의 서명 키를 사용하여 리포지토리 메타데이터가 서명된 경우 이 `signed-by` 옵션을 사용하세요(예:`deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://yourrepo`),|
| `datadog_apt_cache_valid_time`              | 기본 적절한 캐시 만료 시간(기본값은 1시간)을 재정의합니다.|
| `datadog_apt_key_url_new`                   | Datadog `apt`키를 가져올 위치를 재정의합니다(사용하지 않는 `datadog_apt_key_url`변수는 역할에서 만료되고 제거된 키를 의미). `382E94DE`,`F14F620E`, `C0962C7D` 키가 포함된 GPG 키링이 URL이 됩니다.| 
| `datadog_yum_repo`                          | 기본 Datadog `yum` 리포지토리를 재정의합니다.|
| `datadog_yum_repo_gpgcheck`                 | 기본 `repo_gpgcheck` 값을 재정의합니다(비어 있음). 비어 있으면 커스텀 `datadog_yum_repo`가 사용되지 않고 시스템이 RHEL/CentOS 8.1이 아닌 경우(dnf에 있는 (https://bugzilla.redhat.com/show_bug.cgi?id=1792506) [버그]로 인해) 값이 동적으로 `yes`로 설정되고 그렇지 않으면 `no`로 설정됩니다. **참고**: 레포데이터 서명 확인은 에이전트 5에서 항상 해제됩니다.|
| `datadog_yum_gpgcheck`                      | 기본 `gpgcheck` 값 재정의(`yes`) - 패키지 GPG 서명을 끄려면 `no`로 설정하세요.|
| `datadog_yum_gpgkey`                        | **버전 4.18.0에서 제거됨** 기본 URL을 에이전트 v5 및 v6(최대 6.13) 패키지(키 ID`4172A230`)를 확인하는 데 사용되는 Datadog `yum` 키로 재정의합니다.|
| `datadog_yum_gpgkey_e09422b3`               | 기본 URL을 에이전트 v6.14+ 패키지(키 ID`E09422B3`)를 확인하는 데 사용되는 Datadog `yum`키로 재정의합니다.|
| `datadog_yum_gpgkey_e09422b3_sha256sum`     | `datadog_yum_gpgkey_e09422b3` 키의 기본 체크섬을 재정의합니다.|
| `datadog_zypper_repo`                       | 기본 Datadog `zypper` 리포지토리를 재정의합니다.|
| `datadog_zypper_repo_gpgcheck`              | 기본 `repo_gpgcheck`값을 재정의합니다(비어 있음). 비어 있으면 커스텀 `datadog_zypper_repo`를 사용하지 않을 때 값이 동적으로 `yes`로 설정되며 그렇지 않으면 `no`로 설정됩니다. **참고**: 에이전트 5의 경우 레포데이터 서명 확인이 항상 해제됩니다.|
| `datadog_zypper_gpgcheck`                   | 기본 `gpgcheck` 값 재정의(`yes`) - 패키지 GPG 서명을 끄려면 `no`로 설정하세요.|
| `datadog_zypper_gpgkey`                     | **버전 4.18.0에서 제거됨** 기본 URL을 에이전트 v5 및 v6(최대 6.13) 패키지(키 ID`4172A230`)를 확인하는 데 사용되는 Datadog `zypper` 키로 재정의합니다.|
| `datadog_zypper_gpgkey_sha256sum`           | **버전 4.18.0에서 제거됨** `datadog_zypper_gpgkey`키의 기본 체크섬을 재정의합니다.|
| `datadog_zypper_gpgkey_e09422b3`            | 기본 URL을 에이전트 버전 6.14+ 패키지(키 ID`E09422B3`)를 확인하는 데 사용되는 Datadog `zypper` 키로 재정의합니다.|
| `datadog_zypper_gpgkey_e09422b3_sha256sum`  | `datadog_zypper_gpgkey_e09422b3` 키의 기본 체크섬을 재정의합니다.|
| `datadog_agent_allow_downgrade`             | 에이전트 다운그레이드를 허용하도록 `yes`로 설정합니다(자세한 내용은 `defaults/main.yml`참조). **참고**: Windows 플랫폼에서는 다운그레이드가 지원되지 않습니다.|
| `datadog_enabled`                           | `datadog-agent` 서비스가 시작되지 않도록 하려면 `false`으로 설정합니다(기본값은 `true`로 함).|
| `datadog_additional_groups`                 | 목록 또는 `datadog_user`의 추가 그룹이 쉼표로 구분된 목록을 포함하는 문자열입니다(Linux 전용).|
| `datadog_windows_ddagentuser_name`          | 생성/사용할 Windows사용자 이름, `<domain>\<user>`형식입니다(Windows 전용).|
| `datadog_windows_ddagentuser_password`      | 사용자 및/또는 서비스를 등록하는 데 사용되는 비밀번호입니다(Windows 전용).|
| `datadog_apply_windows_614_fix`             | `datadog_windows_614_fix_script_url`에서 참조하는 파일을 다운로드하여 적용할지 여부입니다(Windows전용). 자세한 내용은 https://dtdg.co/win-614-fix을 참고하세요. 호스트에서 Datadog 에이전트6.14.\*를 실행하지 않는 경우 `false`로 설정할 수 있습니다.|
| `datadog_macos_user`                        | 에이전트를 실행할 사용자의 이름입니다. 존재하는 사용자여야 합니다. 자동으로 생성되지 않습니다. 기본값은 `ansible_user`(macOS 전용)입니다.|
| `datadog_macos_download_url`                | URL을 재정의하여 DMG 설치 관리자를 다운로드합니다(macOS만 해당).|
| `datadog_apm_instrumentation_enabled`       | APM 호스트 주입을 설정합니다. 사용 가능한 값은 다음과 같습니다. <br/> -  `host`: 에이전트와 서비스가 모두 호스트에서 실행 중일 때 사용합니다 <br/> - `docker`: 에이전트와 서비스가 동일한 호스트에서 별도의 Docker 컨테이너에서 실행 중일 때 사용합니다. <br/>- `all`: 이전의 모든 시나리오에 동시에 지원되도록 APM 삽입을 설정합니다.|
| `datadog_apm_instrumentation_languages`     | 호스트 또는 Docker 삽입이 활성화된 경우 설치할 애플리케이션 성능 모니터링(APM) 라이브러리 목록입니다(기본값 `["all"]`). 공식 문서(https://docs.datadoghq.com/tracing/trace_collection/library_injection_local)에서 사용 가능한 값을 확인할 수 있습니다|
| `datadog_apm_instrumentation_docker_config` | Docker 애플리케이션 성능 모니터링(APM) 주입을 설정합니다. 자세한 내용은 https://docs.datadoghq.com/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers#configure-docker-injection을 참고하세요.|

### 통합

Datadog 통합(점검)을 설정하려면 `datadog_checks` 섹션에 항목을 추가합니다. 첫 번째 수준 키는 점검 이름이고, 값은 설정 파일을 작성할 YAML 플레이로드입니다. 아래 예시를 참고하세요.

통합 장치를 설치 또는 제거하려면 `datadog_integrations`[단락][22]을 참고하세요.

#### 프로세스 점검

`process` 점검을 위해 인스턴스 두 개를 정의하려면 아래 설정을 사용합니다. 그러면 해당 설정 파일이 생성됩니다.

* 에이전트 v6 v7: `/etc/datadog-agent/conf.d/process.d/conf.yaml`
* 에이전트 v5: `/etc/dd-agent/conf.d/process.yaml`

```yml
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']
          - name: syslog
            search_string: ['rsyslog']
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
```

#### 커스텀 점검

커스텀 점검을 설정하려면 아래 설정을 사용합니다. 그러면 해당 설정 파일이 생성됩니다.

- 에이전트 v6 v7: `/etc/datadog-agent/conf.d/my_custom_check.d/conf.yaml`
- 에이전트 v5: `/etc/dd-agent/conf.d/my_custom_check.yaml`

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
```

##### 커스텀 Python 점검

Python 점검을 플레이북에 전달하려면 아래 설정을 사용합니다.

이 설정에는 Datadog [플레이 및 역할][12]이 더 큰 플레이북에 속해 있어야 합니다. 즉, 전달되는 값이 [Linux][13]나 [Windows][14]에서 실행되는 실제 작업의 상대 경로 파일입니다.

에이전트 v6 이상에서만 사용할 수 있습니다.

키는 점검 디렉터리`checks.d/{{ item }}.py`에 생성된 파일의 이름이어야 합니다.

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
    datadog_custom_checks:
      my_custom_check: '../../../custom_checks/my_custom_check.py'
```

#### 자동탐지

자동탐지를 사용할 경우, YAML의 전처리나 후처리가 없습니다. 이는 `autodiscovery identifiers`을 포함한 모든 최종 설정 파일에 YAML 섹션이 추가된다는 뜻입니다.

아래는 **Autodiscovery**를 통해 PostgreSQL 점검을 설정하는 예시입니다.

```yml
    datadog_checks:
      postgres:
        ad_identifiers:
          - db-master
          - db-slave
        init_config:
        instances:
          - host: %%host%%
            port: %%port%%
            username: username
            password: password
```

Datadog 설명서에서 [자동탐지][3]에 대해 자세히 알아보세요.

### 추적

에이전트 v6 또는 v7에서 트레이스 수집을 사용하도록 설정하려면 다음 설정을 사용합니다.

```yaml
datadog_config:
  apm_config:
    enabled: true
```

에이전트 v5에서 트레이스 수집을 사용하려면 다음 설정을 사용합니다.

```yaml
datadog_config:
  apm_enabled: "true" # has to be a string
```

### 실시간 프로세스

에이전트 v6 또는 v7에서 [실시간 프로세스][6] 수집을 활성화하려면 다음 설정을 사용합니다.

```yml
datadog_config:
  process_config:
    enabled: "true" # type: string
```

`enabled`에서 가능한 값은 `"true"`, `"false"`(컨테이너 수집만 가능), 또는 `"disabled"`(실시간 프로세스 전체 사용 안 함)입니다.

#### 변수

실시간 프로세스에서는 다음 변수를 사용할 수 있습니다.

* `scrub_args`: 프로세스 명령줄에서 중요한 인수를 스크러빙할 수 있습니다(기본값 `true`).
* `custom_sensitive_words`: 명령줄 스크러버에서 사용하는 중요 단어의 기본 목록을 확장합니다.

#### 시스템 프로브

시스템 프로브는 `system_probe_config`변수 아래에 설정됩니다. 아래에 중첩된 변수는 `system_probe_config` 섹션의 `system-probe.yaml`에 기록됩니다.

[네트워크 성능 모니터링][7](NPM)은 `network_config`변수 아래에 설정됩니다. 아래에 중첩된 변수는 `network_config`섹션의 `system-probe.yaml`에 기록됩니다.

[클라우드 워크로드 보안][8]은 `runtime_security_config`변수 아래에 구성됩니다. 아래에 중첩된 변수는 `runtime_security_config`섹션의 `system-probe.yaml`및 `security-agent.yaml`에 기록됩니다.

[일반적인 서비스 모니터링][17](USM)은 `service_monitoring_config`변수 아래에 구성됩니다. 아래에 중첩된 변수는 `service_monitoring_config`섹션의 `system-probe.yaml`에 기록됩니다.

[규칙 준수][18]는 `compliance_config`변수 아래에 설정됩니다. 아래에 중첩된 변수는 `compliance_config` 섹션의 `security-agent.yaml`에 기록됩니다.

**Windows 사용자를 위한 참고**: NPM은 에이전트 v6.27+ 및 v7.27+이 설치된 Windows에서 지원됩니다. 에이전트를 설치하거나 업그레이드할 때 `network_config.enabled`가 true로 설정된 경우에만 선택적 구성 요소로 제공됩니다. 이 때문에 에이전트를 업그레이드하지 않는 한 기존 설치에서는 NPM 구성 요소를 설치하기 위해 에이전트를 한 번 제거한 후 다시 설치해야 할 수 있습니다.

#### 구성 예시

```yml
datadog_config:
  process_config:
    enabled: "true" # type: string
    scrub_args: true
    custom_sensitive_words: ['consul_token','dd_api_key']
system_probe_config:
  sysprobe_socket: /opt/datadog-agent/run/sysprobe.sock
network_config:
  enabled: true
service_monitoring_config:
  enabled: true
runtime_security_config:
  enabled: true
```

**참고**: 이 설정은 에이전트 6.24.1+ 및 7.24.1+에서 사용할 수 있습니다. 이전 에이전트 버전의 경우 [네트워크 성능 모니터링][9] 설명서에서 시스템 프로브를 활성화하는 방법을 참고하세요.

Linux에서 6.18.0나 7.18.0 이전 에이전트 버전을 설치한 경우, 이 수정이 완료된 후 다음 단계를 따르세요.

1. 시스템 프로브를 시작하세요(`sudo service datadog-agent-sysprobe start`). **참고**: 시스템에서 서비스 래퍼를 사용할 수 없는 경우 대신 `sudo initctl start datadog-agent-sysprobe` 명령을 실행하세요.
2. [에이전트 재시작][10]합니다(`sudo service datadog-agent restart`).
3. 부팅 시 시스템 프로브가 시작되도록 설정합니다(`sudo service enable datadog-agent-sysprobe`).

수동 설정은 [NPM][9] 설명서를 참고하세요.

#### 에이전트 v5

에이전트 버전 5에서 [실시간 프로세스][6] 수집을 활성화하려면 다음 설정을 사용합니다.

```yml
datadog_config:
  process_agent_enabled: true
datadog_config_ex:
  process.config:
    scrub_args: true
    custom_sensitive_words: "<FIRST_WORD>,<SECOND_WORD>"
```

## 버전

기본적으로 현재 주요 버전의 Datadog Ansible 역할은 에이전트 v7을 설치합니다. 변수`datadog_agent_version` 및 `datadog_agent_major_version`은 설치된 에이전트 버전을 제어하는 데 사용할 수 있습니다.

이 역할의 버전 4+에서는 `datadog_agent_version`이 특정 에이전트 버전을 고정하는 데 사용되는 경우, 지원되는 운영 체제의 버전 이름 지정 체계를 준수하도록 OS별 버전 이름을 도출합니다.

- Debian 및 SUSE 기반의 `1:7.16.0-1`
- RedHat 기반의 `7.16.0-1`
- macOS용 `7.16.0-1`
- Windows용 `7.16.0`

이를 통해 동일한 Ansible 실행에서 다른 운영 체제를 실행하는 호스트를 대상으로 지정할 수 있습니다. 다음 예를 참고하세요.

| 제공됨                            | 설치     | 시스템                |
|-------------------------------------|--------------|-----------------------|
| `datadog_agent_version: 7.16.0`     | `1:7.16.0-1` | Debian 및 SUSE 기반 |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | RedHat 기반          |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | macOS                 |
| `datadog_agent_version: 7.16.0`     | `7.16.0`     | Windows               |
| `datadog_agent_version: 1:7.16.0-1` | `1:7.16.0-1` | Debian 및 SUSE 기반 |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0-1`   | RedHat 기반          |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0`     | Windows               |

**참고**: 버전이 제공되지 않은 경우 역할에서 `1`를 Epoch로, `1`를 릴리스 번호로 사용합니다.

**에이전트 v5(이전 버전)**:

Datadog Ansible 역할에는 Linux용 Datadog 에이전트 v5만 지원됩니다. 에이전트 v5 최신 버전을 설치하려면 `datadog_agent_major_version: 5`을 사용하거나 `datadog_agent_version`을 설정해 특정 버전을 설치할 수 있습니다. **참고**: `datadog_agent5`변수는 더 이상 사용되지 않으며 제거되었습니다.

### 리포지토리

#### Linux

`datadog_apt_repo`, `datadog_yum_repo`, `datadog_zypper_repo`변수가 설정되지 않으면 `datadog_agent_major_version`에 설정된 주 버전의 공식 Datadog 리포지토리가 사용됩니다.

| # | 기본 apt 리포지토리                    | 기본 yum 리포지토리             | 기본 zypper 리포지토리               |
|---|-------------------------------------------|------------------------------------|-----------------------------------------|
| 5 | deb https://apt.datadoghq.com stable main | https://yum.datadoghq.com/rpm      | https://yum.datadoghq.com/suse/rpm      |
| 6 | deb https://apt.datadoghq.com stable 6    | https://yum.datadoghq.com/stable/6 | https://yum.datadoghq.com/suse/stable/6 |
| 7 | deb https://apt.datadoghq.com stable 7    | https://yum.datadoghq.com/stable/7 | https://yum.datadoghq.com/suse/stable/7 |

기본 동작을 재정의하려면 이 변수를 빈 문자열이 아닌 다른 것으로 설정하세요.

이전에 에이전트 v5 변수를 사용한 경우 `datadog_agent_major_version`이 `5`로 설정된 아래 **새** 변수를 사용하거나 에이전트 v5 특정 버전으로 고정된 `datadog_agent_version`을 사용하세요.

| 기존 버전                          | 새 버전                   |
|------------------------------|-----------------------|
| `datadog_agent5_apt_repo`    | `datadog_apt_repo`    |
| `datadog_agent5_yum_repo`    | `datadog_yum_repo`    |
| `datadog_agent5_zypper_repo` | `datadog_zypper_repo` |

버전 4.9.0부터는 APT 키를 https://keys.datadoghq.com에서 가져오므로 `use_apt_backup_keyserver`변수가 제거되었습니다.

#### Windows

`datadog_windows_download_url`변수가 설정되지 않으면 `datadog_agent_major_version`에 해당하는 공식 Windows MSI 패키지가 사용됩니다.

| 에이전트 버전 | 기본 Windows MSI 패키지 URL                                                  |
|---------------|----------------------------------------------------------------------------------|
| 6             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi |
| 7             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi |

기본 동작을 재정의하려면 이 변수를 빈 문자열이 아닌 다른 것으로 설정합니다.

#### macOS

`datadog_macos_download_url` 변수가 설정되지 않은 경우 `datadog_agent_major_version`에 해당하는 공식 macOS DMG 패키지가 사용됩니다.

| 에이전트 버전 | 기본 macOS DMG 패키지 URL                                |
|---------------|--------------------------------------------------------------|
| 6             | https://s3.amazonaws.com/dd-agent/datadog-agent-6-latest.dmg |
| 7             | https://s3.amazonaws.com/dd-agent/datadog-agent-7-latest.dmg |

기본 동작을 재정의하려면 이 변수를 빈 문자열이 아닌 다른 것으로 설정합니다.

### 업그레이드

에이전트 v6에서 v7로 업그레이드하려면 `datadog_agent_major_version: 7`를 사용해 최신 버전을 설치하거나 `datadog_agent_version`을 설정해 특정 버전을 설치할 수 있습니다. 에이전트 v5에서 v6으로 업그레이드할 때와 유사한 로직을 적용하세요.

#### 통합 설치

**에이전트 v6.8+에서 사용 가능**

`datadog_integration` 리소스를 사용해 Datadog 통합 특정 버전을 설치할 수 있습니다. 에이전트에는 [코어 통합][19]이 이미 설치되어 있습니다. 이 명령은 전체 에이전트를 업그레이드하지 않고 특정 통합을 업그레이드하는 데 유용합니다. 자세한 내용은 [통합 관리][4]를 참고하세요.

통합을 설정하려면 `datadog_checks` [단락][21]을 참고하세요.

사용 가능한 작업:

- `install`: 특정 버전의 통합을 설치합니다.
- `remove`: 통합을 제거합니다.

##### 타사 통합

`datadog_integration`리소스를 이용해 [Datadog 커뮤니티][20]와 [Datadog 마켓플레이스][15] 통합을 설치할 수 있습니다. **참고**: 이 통합은 "제3자"로 간주되기 때문에 `third_party: true`로 설정해야 합니다. 아래 예를 참고하세요.

##### 구문

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <ACTION>
      version: <VERSION_TO_INSTALL>
```

타사 통합을 설치하려면 `third_party`을 true로 설정합니다.

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <ACTION>
      version: <VERSION_TO_INSTALL>
      third_party: true
```

##### 예시

이 예시에서는 ElasticSearch 통합 버전 `1.11.0`을 설치하고 `postgres`통합을 제거합니다.

```yml
 datadog_integration:
   datadog-elastic:
     action: install
     version: 1.11.0
   datadog-postgres:
     action: remove
```

Datadog 통합의 사용 가능한 버전을 보려면 [통합-코어 레포지토리][5]에서 해당 `CHANGELOG.md`파일을 참고하세요.

### 다운그레이드

에이전트의 이전 버전으로 다운그레이드하려면 다음을 따르세요.

1. `datadog_agent_version`을 특정 버전으로 설정합니다(예: `5.32.5`).
2. `datadog_agent_allow_downgrade`을 `yes`로 설정합니다.

**참고**:

- Windows 플랫폼에서는 다운그레이드가 지원되지 않습니다.

## 플레이북

아래는 Datadog Ansible 역할을 사용하는 데 도움이 되는 플레이북 예시입니다.

다음은 데이터를 Datadog US(기본값)로 전송하고 로그, NPM을 활성화하며 몇 가지 점검을 설정하는 예시입니다.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
    datadog_agent_version: "7.16.0"
    datadog_config:
      tags:
        - "<KEY>:<VALUE>"
        - "<KEY>:<VALUE>"
      log_level: INFO
      apm_config:
        enabled: true
      logs_enabled: true  # available with Agent v6 & v7
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd' ]
          - name: syslog
            search_string: ['rsyslog' ]
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
      ssh_check:
        init_config:
        instances:
          - host: localhost
            port: 22
            username: root
            password: <YOUR_PASSWORD>
            sftp_check: True
            private_key_file:
            add_missing_keys: True
      nginx:
        init_config:
        instances:
          - nginx_status_url: http://example.com/nginx_status/
            tags:
              - "source:nginx"
              - "instance:foo"
          - nginx_status_url: http://example2.com:1234/nginx_status/
            tags:
              - "source:nginx"
              - "<KEY>:<VALUE>"

        #Log collection is available on Agent 6 and 7
        logs:
          - type: file
            path: /var/log/access.log
            service: myapp
            source: nginx
            sourcecategory: http_web_access
          - type: file
            path: /var/log/error.log
            service: nginx
            source: nginx
            sourcecategory: http_web_access
    # datadog_integration is available on Agent 6.8+
    datadog_integration:
      datadog-elastic:
        action: install
        version: 1.11.0
      datadog-postgres:
        action: remove
    network_config:
      enabled: true
```

### 에이전트 v6

다음은 에이전트 v6을 설치하는 예시입니다.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_agent_major_version: 6
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### 사이트 설정

기본값 `datadoghq.com`이 아닌 다른 사이트를 사용하는 경우 `datadog_site` 변수를 해당 URL(예: `datadoghq.eu`, `us3.datadoghq.com`)로 설정합니다.

다음은 EU 사이트로 데이터를 보내는 예시입니다.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_site: "datadoghq.eu"
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### Windows

Windows를 사용할 경우, 역할이 실패하지 않도록 `become: yes` 옵션을 제거합니다. Windows 호스트에서  예시 플레이북을 작동시키는 데는 다음 두 가지 방법이 있습니다.

#### 인벤토리 파일

권장 방법은 인벤토리 파일을 사용하는 것입니다. 각 Windows 호스트의 인벤토리 파일에서 `ansible_become` 옵션을 `no`로 설정합니다.

```ini
[servers]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2
windows1 ansible_host=127.0.0.3 ansible_become=no
windows2 ansible_host=127.0.0.4 ansible_become=no
```

Windows 호스트에 모두에서 동일한 설정을 반복하지 않으려면 해당 호스트를 그룹화하고 변수를 그룹 수준으로 설정하세요.

```ini
[linux]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2

[windows]
windows1 ansible_host=127.0.0.3
windows2 ansible_host=127.0.0.4

[windows:vars]
ansible_become=no
```

#### 플레이북 파일

또는 플레이북 **Windows 호스트에서만 실행되는** 경우 플레이북 파일에서 다음을 사용하세요.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog }
  vars:
    ...
```

**참고**: 이 설정은 Linux 호스트에서 실패합니다. Windows 전용 플레이북을 사용하는 호스트인 경우에만 이 설정을 사용하세요. 그 외에는 [인벤토리 파일 방법](#inventory-file)을 사용하세요.

### 삭제

Windows의 경우 Ansible 역할에서 다음 코드를 사용해 에이전트를 제거할 수 있습니다.

```yml
- name: Check If Datadog Agent is installed
  win_shell: |
    (get-wmiobject win32_product -Filter "Name LIKE '%datadog%'").IdentifyingNumber
  register: agent_installed_result
- name: Set Datadog Agent installed fact
  set_fact:
    agent_installed: "{{ agent_installed_result.stdout | trim }}"
- name: Uninstall the Datadog Agent
  win_package:
    product_id: "{{ agent_installed }}"
    state: absent
  when: agent_installed != ""
```

그러나 다음 코드를 사용해 제거 파라미터를 효과적으로 제어할 수도 있습니다.
이 예시에서는'/norestart' 플래그가 추가되고 제거 로그의 커스텀 위치가 지정됩니다.

```yml
- name: Check If Datadog Agent is installed
  win_stat:
  path: 'c:\Program Files\Datadog\Datadog Agent\bin\agent.exe'
  register: stat_file
- name: Uninstall the Datadog Agent
  win_shell: start-process msiexec -Wait -ArgumentList ('/log', 'C:\\uninst.log', '/norestart', '/q', '/x', (Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
  when: stat_file.stat.exists == True
```

## 문제 해결

### Debian 스트레치

**참고:** 이 정보는 4.9.0 이전 역할 버전에 적용됩니다. 4.9.0 이후로 `apt_key` 모듈은 더 이상 역할에서 사용되지 않습니다.

Debian Stretch에서 역할이 사용하는 `apt_key` 모듈이 올바르게 작동하려면 추가적인 시스템 종속성이 필요합니다. 종속성(`dirmngr`)은 모듈에서 제공하지 않습니다. 플레이북에 다음 설정을 추가하여 현재 역할을 활용하세요.

```yml
---
- hosts: all
  pre_tasks:
    - name: Debian Stretch requires the dirmngr package to use apt_key
      become: yes
      apt:
        name: dirmngr
        state: present
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### Python 3 인터프리터 및 Ansible 2.10.x 이하를 지원하는 CentOS 6/7

이 역할에서 CentOS 기반 호스트에 에이전트를 설치하는 데 사용되는 `yum` Python 모듈의 경우, Ansible 2.10.x 이하일 때만 Python 2를 사용할 수 있습니다. 이 경우 `dnf` 패키지 관리자를 대신 사용해야 합니다.

그러나 `dnf` 및 `dnf` Python 모듈은 CentOS 8 이전의 CentOS 기반 호스트에는 기본적으로 설치되지 않습니다. 이 경우에는 Python 3 인터프리터를 사용해도 에이전트를 설치할 수 없습니다.

이와 같은 조건이 감지되면 이 역할은 초기에 실패하고 CentOS/RHEL < 8에 에이전트를 설치할 때 Ansible 2.11+ 또는 Python 2 인터프리터가 필요하다는 메시지가 나타납니다.

이 초기 장애 감지(예: `dnf` 및 `python3-dnf`패키지를 호스트에서 사용할 수 있는 경우)를 무시하려면 `datadog_ignore_old_centos_python3_error`변수를 `true`로 설정합니다.

### Windows

Windows에서 에이전트 버전 `6.14.0`과 `6.14.1`의 심각한 버그로 인해 이 버전을 설치하는 것이 차단되었습니다(이 역할의 `3.3.0`버전부터 시작).

**참고:** `datadog_agent_version`을 `6.14.0` 또는 `6.14.1`로 설정하면 Windows에서 Ansible이 실패합니다. `6.14.2` 버전 이상을 사용하세요.

**Windows에서 6.14.0 또는 6.14.1**부터 업데이트하는 경우 다음 단계를 실행합니다.

1. 기존 `datadog.datadog` Ansible 역할을 최신 버전(`>=3.3.0`)으로 업그레이드합니다.
2. `datadog_agent_version`을 `6.14.2` 버전 이상으로 설정합니다(기본값은 최신).

자세한 내용은 [Windows의 Datadog 에이전트 6.14.0 및 6.14.1 제거 프로그램의 중요 버그][11]를 참고하세요.

### service_facts로 인해 끊어진 Ubuntu 20.04

Ubuntu 20.04에서 `service_facts` 모듈을 실행하면 다음 오류가 발생합니다.

```
localhost | FAILED! => {
    "changed": false,
    "msg": "Malformed output discovered from systemd list-unit-files: accounts-daemon.service                    enabled         enabled      "
}
```

이를 해결하려면 [Ansible을 `v2.9.8`이나 그 이상 버전으로 업데이트합니다][16].

[1]: https://galaxy.ansible.com/Datadog/datadog
[2]: https://github.com/DataDog/ansible-datadog
[3]: https://docs.datadoghq.com/ko/agent/autodiscovery
[4]: https://docs.datadoghq.com/ko/agent/guide/integration-management/
[5]: https://github.com/DataDog/integrations-core
[6]: https://docs.datadoghq.com/ko/infrastructure/process/
[7]: https://docs.datadoghq.com/ko/network_performance_monitoring/
[8]: https://docs.datadoghq.com/ko/security_platform/cloud_workload_security/getting_started/
[9]: https://docs.datadoghq.com/ko/network_performance_monitoring/installation/?tab=agent#setup
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#restart-the-agent
[11]: https://app.datadoghq.com/help/agent_fix
[12]: https://docs.ansible.com/ansible/latest/reference_appendices/playbooks_keywords.html#playbook-keywords
[13]: https://github.com/DataDog/ansible-datadog/blob/main/tasks/agent-linux.yml
[14]: https://github.com/DataDog/ansible-datadog/blob/main/tasks/agent-win.yml
[15]: https://www.datadoghq.com/blog/datadog-marketplace/
[16]: https://github.com/ansible/ansible/blob/stable-2.9/changelogs/CHANGELOG-v2.9.rst#id61
[17]: https://docs.datadoghq.com/ko/tracing/universal_service_monitoring/?tab=configurationfiles#enabling-universal-service-monitoring
[18]: https://docs.datadoghq.com/ko/security/cspm/setup/?tab=docker
[19]: https://github.com/DataDog/integrations-core
[20]: https://github.com/DataDog/integrations-extras
[21]: https://github.com/DataDog/ansible-datadog/tree/nschweitzer/readme#integrations
[22]: https://github.com/DataDog/ansible-datadog/tree/nschweitzer/readme#integrations-installation