---
dependencies:
- https://github.com/DataDog/ansible-datadog/blob/main/README.md
title: 독립 실행형 Datadog 역할을 사용하여 Ansible 설정하기
---
Datadog 에이전트 Ansible 역할은 Datadog 에이전트 및 통합을 설치하고 설정합니다.

## Ansible 역할과 Ansible 컬렉션 비교

Datadog 에이전트 Ansible 역할은 두 가지 채널을 통해 제공됩니다.

* Datadog 컬렉션의 일부로, Ansible Galaxy(권장)에서 [Datadog.dd](https://galaxy.ansible.com/ui/repo/published/Datadog/dd/) 이름으로 액세스할 수 있습니다.
* 독립 실행형 역할로, Ansible Galaxy(레거시)에서 [Datadog.Datadog](https://galaxy.ansible.com/ui/standalone/roles/Datadog/Datadog/) 이름으로 액세스할 수 있습니다.

역할의 버전 `4` 및 컬렉션의 버전 `5`는 기본적으로 Datadog 에이전트 v7을 설치합니다.

## 설정

이 설명서의 설치 지침은 독립형 Datadog 역할을 설치하는 방법에 대해 설명합니다. Datadog 컬렉션의 설치 지침은 [컬렉션 README 파일](https://github.com/ansible-collections/Datadog/blob/main/README.md)을 참조하세요. 설정 변수는 독립형 역할과 컬렉션을 통해 액세스하는 역할 모두에 대해 동일합니다.

### 요구 사항

- Ansible v2.6 이상이 필요합니다.
- 대부분의 데비안(Debian) 및 RHEL 기반 Linux 배포 버전, macOS 및 윈도우즈(Windows)를 지원합니다.
- Ansible 2.10 이상과 함께 사용하여 윈도우즈 호스트를 관리하는 경우, `ansible.windows` 컬렉션이 설치되어 있어야 합니다.

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
- Ansible 2.10 이상과 함께 사용하여 openSUSE/SLES 호스트를 관리하는 경우, `community.general` 컬렉션이 설치되어 있어야 합니다:

  ```shell
  ansible-galaxy collection install community.general
  ```

### 설치

Ansible 서버에 있는 Ansible Galaxy에서 [Datadog 역할][1]을 설치합니다.

```shell
ansible-galaxy install datadog.datadog
```

Datadog Agent를 호스트에 배포하려면 Datadog 역할과 API 키를 플레이북에 추가합니다.

```text
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

API 키는 필수이며 이 키가 없으면 역할이 실패합니다. Ansible이 제어할 수 없는 다른 방법을 통해 제공하려는 경우 자리표시자 키를 지정하고 나중에 키를 대체하세요.

## 역할 변수

이러한 변수는 Datadog 에이전트를 설치하는 동안 설정을 추가로 제공합니다. 플레이북의 `vars` 섹션에서 지정해야 합니다.

| 변수                                    | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog_api_key`                           | Datadog API 키입니다. **이 변수는 4.21**부터 필수입니다.|
| `datadog_site`                              | 에이전트 데이터를 전송할 Datadog 인테이크 사이트입니다. 기본값은 `datadoghq.com`이며, `datadoghq.eu` 으로 설정하면 EU 사이트로 데이터를 전송합니다. 이 옵션은 에이전트 버전 6.6.0 이상에서만 사용할 수 있습니다.|
| `datadog_agent_flavor`                      | RPI에서 IOT 설치에 대해 데비안(Debian)/RedHat 패키지 기본값을 재정의합니다. 기본값은 "datadog-agent"이며, RPI에 대해 "datadog-iot-agent"를 사용합니다.|
| `datadog_agent_version`                     | 예를 들어, 설치할 에이전트의 고정 버전은 `7.16.0`입니다(선택 사항이나 권장됨). `datadog_agent_version`를 사용하는 경우 `datadog_agent_major_version` 설정이 필요하지 않습니다.|
| `datadog_agent_major_version`               | 설치할 에이전트 의 주요 버전입니다. 사용 가능한 값은 5, 6 또는 7(기본값)입니다. `datadog_agent_version` 을 설정하면 지정된 메이저의 최신 버전이 우선적으로 설치됩니다. `datadog_agent_version` 을 사용하는 경우 `datadog_agent_major_version` 설정은 필요하지 않습니다.|
| `datadog_checks`                            | 에이전트 점검에 대한 YAML 설정 위치: <br> - 에이전트 v6 및 v7의 경우 `/etc/datadog-agent/conf.d/<check_name>.d/conf.yaml`, <br> - 에이전트 v5의 경우 `/etc/dd-agent/conf.d`|
| `datadog_disable_untracked_checks`          | `true`로 설정해 `datadog_checks`와 `datadog_additional_checks`에 없는 점검을 제거합니다.|
| `datadog_additional_checks`                 | `datadog_disable_untracked_checks`가 `true`로 설정된 경우 제거되지 않는 추가 점검 목록입니다.|
| `datadog_disable_default_checks`            | 기본값 점검 모두를 제거하려면 `true`로 설정합니다.|
| `datadog_config`                            | Datadog 에이전트에 대한 설정을 구성합니다. 역할은 [운영 체제(https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file) 기반 올바른 위치]에 설정을 작성합니다. 전체 설정 옵션 목록은 [datadog-agent GitHub 리포지토리의 `datadog.yaml` 템플릿 파일](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml)을 참조하세요.|
| `datadog_config_ex`                         | (선택 사항) 추가 INI 섹션은 `/etc/dd-agent/datadog.conf`(에이전트 v5에만 해당)으로 이동합니다.|
| `datadog_apt_repo`                          | 기본 Datadog `apt` 리포지토리를 재정의합니다. 리포지토리 메타데이터가 Datadog 서명 키를 사용하여 서명된 경우 `signed-by` 옵션을 사용해야 합니다. `deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://yourrepo`|
| `datadog_apt_cache_valid_time`              | 기본 apt 캐시 만료 시간을 재정의합니다(기본값은 1시간).|
| `datadog_apt_key_url_new`                   | Datadog `apt` 키를 가져오는 위치를 재정의합니다(사용되지 않는 `datadog_apt_key_url` 변수는 역할에서 제거된 만료된 키를 참조합니다). URL은 `382E94DE`, `F14F620E` 및 `C0962C7D` 키가 포함된 GPG 키링이 될 것으로 예상됩니다.|
| `datadog_yum_repo_config_enabled`           | Datadog `yum` 리포지토리의 설정을 방지하려면 `false`로 설정합니다(기본값은 `true`). 경고: GPG 키의 자동 업데이트를 비활성화합니다.|
| `datadog_yum_repo`                          | 기본 Datadog `yum` 리포지토리를 재정의합니다.|
| `datadog_yum_repo_proxy`                    | Datadog `yum` 리포지토리 설정에서 사용할 프록시 URL을 설정합니다.|
| `datadog_yum_repo_proxy_username`           | Datadog `yum` 리포지토리 설정에서 사용할 프록시 사용자 이름을 설정합니다.|
| `datadog_yum_repo_proxy_password`           | Datadog `yum` 리포지토리 설정에서 사용할 프록시 비밀번호를 설정합니다.|
| `datadog_yum_repo_gpgcheck`                 | 기본값 `repo_gpgcheck` 값을 재정의합니다(비어 있음). 비어 있으면 커스텀 `datadog_yum_repo`가 사용되지 않고 시스템이 RHEL/CentOS 8.1이 아닌 경우 값이 `yes`로 동적으로 설정됩니다(이유: dnf의 [버그](https://bugzilla.redhat.com/show_bug.cgi?id=1792506). 그렇지 않으면 `no`로 설정됩니다. **참고**: 에이전트 5의 경우 repodata 서명 확인은 항상 꺼져 있습니다.|
| `datadog_yum_gpgcheck`                      | 기본 `gpgcheck` 값 재정의(`yes`) - `no`를 사용하여 패키지 GPG 서명 확인을 해제합니다.|
| `datadog_yum_gpgkey`                        | **버전 4.18.0에서 제거** 에이전트 v5 및 v6(최대 6.13) 패키지를 확인하는 데 사용되는 Datadog `yum` 키(키 ID `4172A230`)로 기본 URL을 재정의합니다.|
| `datadog_yum_gpgkey_e09422b3`               | 기본 URL을 에이전트 v6.14+ 패키지를 확인하는 데 사용되는 Datadog `yum` 키(키 ID `E09422B3`)로 재정의합니다.|
| `datadog_yum_gpgkey_e09422b3_sha256sum`     | `datadog_yum_gpgkey_e09422b3` 키의 기본 체크섬을 재정의합니다.|
| `datadog_zypper_repo`                       | 기본 Datadog `zypper` 리포지토리를 재정의합니다.|
| `datadog_zypper_repo_gpgcheck`              | 기본값인 `repo_gpgcheck` 값을 재정의합니다(비어 있음). 비어 있는 경우, 커스텀 `datadog_zypper_repo`가 사용되지 않는 경우, 값이 `yes`로 동적으로 설정되고, 그렇지 않으면 `no`로 설정됩니다. **참고**: 에이전트 5에 대해서는 항상 repodata 서명 확인이 꺼져 있습니다.|
| `datadog_zypper_gpgcheck`                   | 기본 `gpgcheck` 값(`yes`) 재정의 - `no`를 사용하여 패키지 GPG 서명 확인을 끕니다.|
| `datadog_zypper_gpgkey`                     | **버전 4.18.0에서 제거** 에이전트 v5 및 v6(최대 6.13) 패키지를 확인하는 데 사용되는 Datadog `zypper` 키(키 ID `4172A230`)로 기본 URL을 재정의합니다.|
| `datadog_zypper_gpgkey_sha256sum`           | **버전 4.18.0에서 제거** `datadog_zypper_gpgkey` 키의 기본 체크섬을 재정의합니다.|
| `datadog_zypper_gpgkey_e09422b3`            | 기본 URL을 에이전트 6.14 버전 이상의 패키지를 확인하는 데 사용되는 Datadog `zypper` 키(키 ID `E09422B3`)로 재정의합니다.|
| `datadog_zypper_gpgkey_e09422b3_sha256sum`  | `datadog_zypper_gpgkey_e09422b3` 키의 기본 체크섬을 재정의합니다.|
| `datadog_agent_allow_downgrade`             | 에이전트 다운그레이드를 허용하려면 `yes`로 설정합니다. 주의해서 사용하시기 바랍니다. 자세한 내용은 `defaults/main.yml`을 참조하세요. **참고**: 윈도우즈 플랫폼에서는 다운그레이드가 지원되지 않습니다.|
| `datadog_enabled`                           | `datadog-agent` 서비스가 시작되지 않도록 하려면 `false`으로 설정합니다(기본값은 `true`로 함).|
| `datadog_additional_groups`                 | 목록 또는 쉼표로 구분된 목록(리눅스(Linux)만 해당)의 추가 그룹이 포함된 문자열(`datadog_user`)입니다.|
| `datadog_windows_ddagentuser_name`          | `<domain>\<user>`(윈도우즈만) 형식의 생성/사용할 윈도우즈 사용자의 이름입니다.|
| `datadog_windows_ddagentuser_password`      | 사용자 생성 및/또는 서비스 등록(윈도우즈만)에 사용되는 비밀번호입니다.|
| `datadog_apply_windows_614_fix`             | `datadog_windows_614_fix_script_url`(윈도우즈만)에서 참조한 파일을 다운로드하여 적용할지 여부를 결정합니다. 자세한 내용은 https://dtdg.co/win-614-fix를 참조하세요. `false`로 설정하여 호스트가 Datadog 에이전트 6.14.\*를 실행하지 않는다고 가정할 수 있습니다.|
| `datadog_macos_user`                        | 에이전트를 실행할 사용자의 이름입니다. 사용자가 존재해야 하며 자동으로 생성되지 않습니다. 기본값은 `ansible_user`(macOS만)입니다.|
| `datadog_macos_download_url`                | DMG 설치 관리자를 다운로드할 URL을 재정의합니다(macOS만).|
| `datadog_apm_instrumentation_enabled`       | 애플리케이션 성능 모니터링(APM) 계측을 설정합니다. 가능한 값은 다음과 같습니다: <br/> - `host`: 에이전트 및 서비스 모두가 호스트에서 실행됩니다. <br/> - `docker`: 에이전트 및 서비스가 동일한 호스트에 있는 별도의 도커(Docker) 컨테이너에서 실행됩니다.<br/>- `all`: `host` 및 `docker`에 대한 모든 이전 시나리오를 동시에 지원합니다.|
| `datadog_apm_instrumentation_libraries`     | 목록 `host` 또는 `docker` 주입이 활성화된 경우 설지할 애플리케이션 성능 모니터링(APM) 라이브러리입니다(기본값은 `["java", "js", "dotnet", "python", "ruby"]`).  [로컬에서 라이브러리 주입][24]에서 사용 가능한 값을 확인할 수 있습니다.|
| `datadog_apm_instrumentation_docker_config` | 도커 APM 설정을 재정의합니다. 자세한 내용은 [도커 주입 설정][23]을 읽어보세요.|
| `datadog_remote_updates`                    | Datadog-installer를 통해 원격 설치 및 업데이트를 활성화합니다.|

### 통합

Datadog 통합 점검을 설정하려면, `datadog_checks` 섹션에 항목을 추가합니다. 첫 번째 레벨 키는 점검의 이름이고 값은 설정 파일을 작성하기 위한 YAML 페이로드입니다. 예제는 아래에 나와 있습니다.

통합을 설치 또는 제거하려면 `datadog_integration`[단락](#integration-installation)을 참조하세요.

#### 프로세스 점검

`process` 점검에 대한 두 개의 인스턴스를 정의하려면 아래의 설정을 사용합니다. 그러면 해당 설정 파일이 생성됩니다.

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

커스텀 점검을 설정하려면 아래 설정을 사용하세요. 그러면 해당 설정 파일이 생성됩니다.

- 에이전트 v6 v7: `/etc/datadog-agent/conf.d/my_custom_check.d/conf.yaml`
- 에이전트 v5: `/etc/dd-agent/conf.d/my_custom_check.yaml`

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
```

##### 커스텀 파이썬(Python) 점검

파이썬(Python) 점검을 플레이북에 전달하려면 아래 설정을 사용하세요.

이 설정을 위해서는 Datadog [플레이 및 역할][12]이 플레이북의 일부여야 하며, 여기서 전달된 값은 [리눅스][13] 또는 [윈도우즈][14]의 실제 작업에 대한 상대 파일 경로여야 합니다.

에이전트 v6 이상에서만 사용할 수 있습니다.

키는 점검 디렉터리 `checks.d/{{ item }}.py`에 생성된 파일 이름이어야 합니다:

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

자동탐지를 사용하는 경우 YAML에서 선처리 또는 후처리가 없습니다. 즉, `autodiscovery identifiers`를 포함한 모든 YAML 섹션이 최종 설정 파일에 추가됩니다.

아래 예시는 **자동탐지**를 통해 PostgreSQL 점검을 설정하는 방법을 보여줍니다.

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

에이전트 v6 또는 v7에서 트레이스 수집을 사용하려면 다음 설정을 사용하세요.

```yaml
datadog_config:
  apm_config:
    enabled: true
```

에이전트 v5에서 트레이스 수집을 활성화하려면 다음 설정을 사용하세요.

```yaml
datadog_config:
  apm_enabled: "true" # has to be a string
```

### 실시간 프로세스

에이전트 v6 또는 v7에서 [라이브 프로세스][6] 수집을 사용하려면 다음 설정을 사용하세요.

```yml
datadog_config:
  process_config:
    enabled: "true" # type: string
```

`enabled`에서 가능한 값은 `"true"`, `"false"`(컨테이너 수집만) 또는 `"disabled"`(실시간 프로세스 전면 비활성화)입니다.

#### 변수

다음 변수는 실시간 프로세스에 사용할 수 있습니다.

* `scrub_args`: 프로세스 명령줄에서 민감한 인수를 스크러빙하는 것을 활성화합니다(기본값은 `true`).
* `custom_sensitive_words`: 명령줄 스크러버에서 사용하는 민감한 단어의 기본값 목록을 확장합니다.

#### 시스템 프로브

시스템 프로브는 `system_probe_config` 변수 아래에 설정됩니다. 그 아래에 중첩된 모든 변수는 `system_probe_config` 섹션의 `system-probe.yaml`에 기록됩니다.

[네트워크 성능 모니터링][7](NPM)은 `network_config` 변수 아래에 설정됩니다. 그 아래에 중첩된 모든 변수는 `network_config` 섹션의 `system-probe.yaml`에 기록됩니다.

[클라우드 워크로드 보안][8]은 `runtime_security_config` 변수 아래에 설정됩니다. 그 아래에 중첩된 모든 변수는 `runtime_security_config` 섹션의 `system-probe.yaml` 및 `security-agent.yaml`에 기록됩니다.

[범용 서비스 모니터링][17](USM)은 `service_monitoring_config` 변수 아래에 설정됩니다. 그 아래에 중첩된 모든 변수는 `service_monitoring_config` 섹션의 `system-probe.yaml`에 작성됩니다.

[컴플라이언스][18]는 `compliance_config` 변수 아래에 설정됩니다. 그 아래에 중첩된 모든 변수는 `compliance_config` 섹션의 `security-agent.yaml`에 작성됩니다.

**Windows 사용자를 위한 참고**: NPM은 에이전트 v6.27+ 및 v7.27+이 설치된 Windows에서 지원됩니다. 에이전트를 설치하거나 업그레이드할 때 `network_config.enabled`가 true로 설정된 경우에만 선택적 구성 요소로 제공됩니다. 이 때문에 에이전트를 업그레이드하지 않는 한 기존 설치에서는 NPM 구성 요소를 설치하기 위해 에이전트를 한 번 제거한 후 다시 설치해야 할 수 있습니다.

#### 설정 예시

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

**참고**: 이 설정은 에이전트 6.24.1 및 7.24.1 이상에서 작동합니다. 이전 에이전트 버전의 경우 시스템 프로브를 활성화하는 방법에 대한 [네트워크 성능 모니터링][9] 설명서를 참조하세요.

리눅스에서 6.18.0 또는 7.18.0 이전 버전( 에이전트)을 설치한 경우 이 수정이 완료되면 아래 단계를 따르세요.

1. 시스템 프로브를 시작합니다. `sudo service datadog-agent-sysprobe start` **참고**: 시스템에서 서비스 래퍼를 사용할 수 없는 경우 다음 명령을 대신 실행하세요. `sudo initctl start datadog-agent-sysprobe`
2. [에이전트 다시 시작][10]: `sudo service datadog-agent restart`
3. 부팅 시 시스템 프로브 시작 활성화: `sudo service enable datadog-agent-sysprobe`

수동 설정의 경우 [NPM][9] 설명서를 참조하세요.

#### Agent v5

에이전트 v5에서 [실시간 프로세스][6] 수집을 사용하려면 다음 설정을 사용하세요.

```yml
datadog_config:
  process_agent_enabled: true
datadog_config_ex:
  process.config:
    scrub_args: true
    custom_sensitive_words: "<FIRST_WORD>,<SECOND_WORD>"
```

## 버전

기본적으로 현재 주요 버전인 Datadog Ansible 역할은 에이전트 v7을 설치하는 것입니다. `datadog_agent_version` 및 `datadog_agent_major_version` 변수를 사용하여 설치된 에이전트 버전을 제어할 수 있습니다.

이 역할의 v4 이상에서 `datadog_agent_version`을 사용하여 특정 에이전트 버전을 고정하는 경우 이 역할은 지원되는 운영 체제의 버전 명명 체계를 준수하기 위해 OS별 버전 이름을 파생시킵니다(예: 지원되는 운영 체제의 버전 명명 체계).

- `1:7.16.0-1` 데비안 및 SUSE 기반
- `7.16.0-1` 레드햇 기반
- `7.16.0-1` macOS용
- `7.16.0` 윈도우즈용

예를 들어, 동일한 Ansible 실행에서 서로 다른 운영 체제를 실행하는 호스트를 대상으로 지정할 수 있습니다.

| 제공                            | 설치     | 시스템                |
|-------------------------------------|--------------|-----------------------|
| `datadog_agent_version: 7.16.0`     | `1:7.16.0-1` | 데비안 및 SUSE-기반 |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | 레드햇 기반          |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | macOS                 |
| `datadog_agent_version: 7.16.0`     | `7.16.0`     | Windows               |
| `datadog_agent_version: 1:7.16.0-1` | `1:7.16.0-1` | 데비안 및 SUSE-기반 |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0-1`   | 레드햇 기반          |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0`     | Windows               |

**참고**: 버전이 제공되지 않은 경우 역할에서 `1`를 Epoch로, `1`를 릴리스 번호로 사용합니다.

**에이전트 v5 (이전 버전)**:

Datadog Ansible 역할에는 리눅스용 Datadog 에이전트 v5에 대한 지원만 포함됩니다. 에이전트 v5를 설치하려면 `datadog_agent_major_version: 5`를 사용하여 최신 버전의 에이전트 v5를 설치하거나 `datadog_agent_version` 을 특정 버전의 에이전트 v5로 설정하세요. **참고**: `datadog_agent5` 변수는 더 이상 사용되지 않으며, 제거되었습니다.

### 리포지토리

#### Linux

`datadog_apt_repo`, `datadog_yum_repo`, `datadog_zypper_repo` 변수가 설정되지 않은 경우 `datadog_agent_major_version`에 설정된 주요 버전에 대한 공식 Datadog 리포지토리가 사용됩니다.

| # | 기본 apt 리포지토리                    | 기본 yum 리포지토리             | 기본 zypper 리포지토리               |
|---|-------------------------------------------|------------------------------------|-----------------------------------------|
| 5 | deb https://apt.datadoghq.com stable main | https://yum.datadoghq.com/rpm      | https://yum.datadoghq.com/suse/rpm      |
| 6 | deb https://apt.datadoghq.com stable 6    | https://yum.datadoghq.com/stable/6 | https://yum.datadoghq.com/suse/stable/6 |
| 7 | deb https://apt.datadoghq.com stable 7    | https://yum.datadoghq.com/stable/7 | https://yum.datadoghq.com/suse/stable/7 |

기본 동작을 재정의하려면 이러한 변수를 빈 문자열이 아닌 다른 값으로 설정하세요.

이전에 에이전트 v5 변수를 사용했다면 `datadog_agent_major_version`을 `5` 또는 `datadog_agent_version`으로 설정하고 특정 에이전트 v5 버전에 고정된 아래의 **new** 변수를 사용하세요.

| Old                          | New                   |
|------------------------------|-----------------------|
| `datadog_agent5_apt_repo`    | `datadog_apt_repo`    |
| `datadog_agent5_yum_repo`    | `datadog_yum_repo`    |
| `datadog_agent5_zypper_repo` | `datadog_zypper_repo` |

버전 4.9.0부터 APT 키를 https://keys.datadoghq.com에서 가져오므로 `use_apt_backup_keyserver` 변수가 제거되었습니다.

#### Windows

`datadog_windows_download_url` 변수가 설정되어 있지 않으면 `datadog_agent_major_version`에 해당하는 공식 윈도우즈 MSI 패키지가 사용됩니다.

| 에이전트 버전 | 기본값 윈도우즈 MSI 패키지 URL                                                  |
|---------------|----------------------------------------------------------------------------------|
| 6             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi |
| 7             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi |

기본 동작을 재정의하려면 이 변수를 빈 문자열이 아닌 다른 값으로 설정하세요.

#### macOS

`datadog_macos_download_url` 변수가 설정되지 않은 경우 `datadog_agent_major_version`에 해당하는 공식 macOS DMG 패키지가 사용됩니다.

| 에이전트 버전 | 기본 macOS DMG 패키지 URL                                |
|---------------|--------------------------------------------------------------|
| 6             | https://install.datadoghq.com/datadog-agent-6-latest.dmg |
| 7             | https://install.datadoghq.com/datadog-agent-7-latest.dmg |

기본 동작을 재정의하려면 이 변수를 빈 문자열이 아닌 다른 값으로 설정하세요.

### 업그레이드

에이전트 v6에서 v7로 업그레이드하려면 `datadog_agent_major_version: 7`을 사용하여 최신 버전을 설치하거나 `datadog_agent_version`을 특정 버전(에이전트 v7)으로 설정하세요. 에이전트 v5에서 v6으로 업그레이드하려면 비슷한 논리를 사용합니다.

#### 통합 설치

**에이전트 v6.8 이상에서 사용 가능**

`datadog_integration` 리소스를 사용하여 Datadog 통합의 특정 버전을 설치하세요. 에이전트에는 [코어 통합][19]이 이미 설치되어 있다는 점에 유의하세요. 이 명령은 전체 에이전트를 업그레이드하지 않고 특정 통합을 업그레이드할 때 유용합니다. 자세한 내용은 [통합 관리][4]를 참조하세요.

통합을 설정하려면, `datadog_checks` [단락](#integrations)을 참조하세요.

사용 가능한 작업:

- `install`: 통합의 특정 버전을 설치합니다.
- `remove`: 통합을 제거합니다.

##### 타사 통합

[Datadog 커뮤니티 ][20] 및 [Datadog 마켓플레이스][15] 통합은 `datadog_integration` 리소스를 사용하여 설치할 수 있습니다. **참고**: 이러한 통합 은 "타사 통합"으로 간주되므로 `third_party: true`를 설정해야 합니다(아래 예시 참조).

##### 구문

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <ACTION>
      version: <VERSION_TO_INSTALL>
```

타사 통합을 설치하려면 `third_party`를 true로 설정합니다.

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

Datadog 통합의 사용 가능한 버전을 확인하려면 [통합-핵심 저장소][5]의 `CHANGELOG.md` 파일을 참조하세요.

### 다운그레이드

에이전트 이전 버전으로 다운로드하려면,

1. `datadog_agent_version`을 특정 버전으로 설정합니다(예: `5.32.5`).
2. `datadog_agent_allow_downgrade`를 `yes`로 설정합니다.

**참조**:

- 윈도우즈 플랫폼에서는 다운그레이드가 지원되지 않습니다.

## 플레이북

다음은 Datadog Ansible 역할을 사용하는 데 도움이 되는 몇 가지 샘플 플레이북입니다.

다음 예제는 Datadog US(기본값)로 데이터를 전송하고 로그, NPM을 활성화한 다음 몇 가지 점검을 설정하는 방법을 보여줍니다.

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
      logs_enabled: true  # available with Agent v6 and v7
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

이 예시에서는 최신 에이전트 v6을 설치합니다.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_agent_major_version: 6
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### 사이트 설정

기본값 `datadoghq.com`이 아닌 사이트를 사용하는 경우, `datadog_site` var를 적절한 URL(예: `datadoghq.eu`, `us3.datadoghq.com`)로 설정합니다.

이 예시에서는 데이터를 EU 사이트로 전송합니다.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_site: "datadoghq.eu"
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### Windows

윈도우즈에서 `become: yes` 옵션을 제거하여 역할이 실패하지 않도록 합니다. 다음은 예제 플레이북이 윈도우즈 호스트에서 작동하도록 하는 두 가지 방법을 보여줍니다.

#### 인벤토리 파일

인벤토리 파일을 사용하는 방법이 권장됩니다. 각 윈도우즈 호스트에 대한 인벤토리 파일에서 `ansible_become` 옵션을 `no`로 설정합니다.

```ini
[servers]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2
windows1 ansible_host=127.0.0.3 ansible_become=no
windows2 ansible_host=127.0.0.4 ansible_become=no
```

모든 윈도우즈 호스트 에 대해 동일한 설정을 반복하지 않으려면 이를 그룹화하고 그룹 수준에서 변수를 설정합니다.

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

또는 **플레이북이 윈도우즈 호스트 **에서만 실행되는 경우 플레이북 파일에 다음을 사용하세요.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog }
  vars:
    ...
```

**참고**: 이 설정은 리눅스 호스트에서 실패합니다. 플레이북이 윈도우즈 호스트에 해당되는 경우에만 사용하세요. 그렇지 않으면 [인벤토리 파일 메서드](#inventory-file)를 사용하세요.

### 삭제

윈도우즈에서는, Ansible 역할에서 다음 코드를 사용하여 에이전트를 제거할 수 있습니다.

```yml
- name: Check If Datadog Agent is installed
  win_shell: |
    (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
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

## 트러블슈팅

### 데비안 스트레치

**참고:** 이 정보는 4.9.0 이전 버전의 역할에 적용됩니다. 4.9.0부터는 `apt_key` 모듈이 더 이상 역할에서 사용되지 않습니다.

데비안 스트레치에서 역할이 사용하는 `apt_key` 모듈이 올바르게 작동하려면 추가 시스템 종속성이 필요합니다. 해당 종속성(`dirmngr`)은 모듈에서 제공하지 않습니다. 현재 역할을 사용하려면 플레이북에 다음 설정을 추가하세요.

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

### CentOS 6/7(파이썬(Python) 3 Interpreter 및 Ansible 2.10.x 이하 사용)

이 역할에서, CentOS 기반 호스트에 에이전트를 설치하는 데 사용되는 `yum` 파이썬 모듈은, 파이썬 2에서만 사용할 수 있습니다. Ansible 2.10.x 이하가 사용되는 경우입니다. 그러한 경우 `dnf` 패키지 관리자를 대신 사용해야 합니다.

단, CentOS 기반 호스트 이전 CentOS 8에는 `dnf` 및 `dnf` 파이썬(Python) 모듈이 기본적으로 설치되지 않습니다. 이 경우 파이썬(Python) 3 Interpreter 사용하면 에이전트를 설치할 수 없습니다.

이 역할은 CentOS / RHEL <8에 에이전트를 설치할 때 Ansible 2.11+ 또는 파이썬 2 Interpreter가 필요하다는 상황이 감지되면 조기에 실패합니다.

이 조기 장애 감지를 우회하려면(예를 들어 `dnf` 및 `python3-dnf` 패키지를 호스트에서 사용할 수 있는 경우) `datadog_ignore_old_centos_python3_error` 변수를 `true`로 설정합니다.

### Windows

윈도우즈에서 에이전트 버전 `6.14.0` 및 `6.14.1`의 심각한 버그로 인해 해당 버전의 설치가 차단되었습니다(이 역할의 버전 `3.3.0` 부터 시작).

**참고: `datadog_agent_version`이 `6.14.0` 또는 `6.14.1`로 설정된 경우 윈도우즈에서 Ansible이 실패합니다. `6.14.2` 이상을 사용하세요.

**윈도우즈에서 **6.14.0 또는 6.14.1로 업데이트하는 경우** 다음 단계를 따르세요.

1. 현재 `datadog.datadog` Ansible 역할을 최신 버전(`>=3.3.0`)으로 업그레이드합니다.
2. `datadog_agent_version` 을 `6.14.2` 이상으로 설정합니다(기본값은 최신).

자세한 내용은 [윈도우즈에서 운용되는 Datadog 에이전트 6.14.0 및 6.14.1용 제거 프로그램의 치명적인 버그]를 참조하세요[11].

### service_facts별 우분투(Ubuntu) 20.04 상세 내용

우분투 20.04에서 `service_facts` 모듈을 실행하면 다음 오류가 발생합니다.

```
localhost | FAILED! => {
    "changed": false,
    "msg": "Malformed output discovered from systemd list-unit-files: accounts-daemon.service                    enabled         enabled      "
}
```

이 문제를 해결하려면 [Ansible을 `v2.9.8` 이상으로 업데이트][16]하세요.

### API 키 누락

역할 `4.21`부터 API 키는 역할을 진행하기 위해 필수적입니다.

Ansible을 통해 에이전트를 설치해야 하지만 API 키를 지정하고 싶지 않은 경우(예를 들어 컨테이너/VM 이미지로 베이킹하는 경우) 가능합니다.
* 더미 API 키를 지정하고 나중에 교체합니다.
* managed_config 비활성화(`datadog_manage_config: false`)

[1]: https://galaxy.ansible.com/ui/standalone/roles/DataDog/datadog/
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
[23]: https://docs.datadoghq.com/ko/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers#configure-docker-injection
[24]: https://docs.datadog.com/tracing/trace_collection/library_injection_local