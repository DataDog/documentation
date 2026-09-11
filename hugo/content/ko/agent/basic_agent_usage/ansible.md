---
dependencies:
- https://github.com/ansible-collections/Datadog/blob/main/README.md
title: Ansible
---
## 개요

Datadog Ansible 컬렉션 `datadog.dd`는 Ansible 관련 Datadog 콘텐츠의 공식 컬렉션입니다. 현재는 [Ansible Datadog 역할](https://github.com/DataDog/ansible-datadog/)만 포함되어 있습니다. 이 역할은 Datadog Agent 및 통합을 설치하고 구성할 수 있도록 `datadog.dd.agent`로 액세스할 수 있습니다. Agent 버전 7이 기본적으로 설치됩니다.

## 설정

### 요구 사항

- Ansible v2.10 이상
- 대부분의 Debian, RHEL 기반 및 SUSE 기반 Linux 배포판, macOS 및 Windows 지원
- Windows 호스트 관리에 사용 시 `ansible.windows` 컬렉션을 설치해야 합니다.

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
- openSUSE/SLES 호스트 관리에 사용 시 `community.general` 컬렉션을 설치해야 합니다.

  ```shell
  ansible-galaxy collection install community.general
  ```

### 설치

Ansible Galaxy에서 설치하려면 다음을 실행하세요.

```shell
ansible-galaxy collection install datadog.dd
```

Datadog Ansible 컬렉션은 Red Hat의 공식 인증을 받은 [Red Hat Automation Hub](https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/)를 통해서도 제공됩니다. .

### 사용량

Datadog Agent를 호스트에 배포하려면 Datadog 역할과 API 키를 플레이북에 추가합니다.

```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

Ansible Automation Hub를 통해 컬렉션을 설치하는 사용자를 위한 참고 사항: OpenSUSE/SLES 기능은 커뮤니티 컬렉션 `community.general`에 따라 다릅니다. Red Hat 고객지원은 커뮤니티 콘텐츠 관련 문제 지원을 제공하지 않습니다. 따라서 OpenSUSE/SLES에 대한 모든 관련 문제는 Datadog 지원팀에 문의해야 합니다.

### 컬렉션 역할 목록

- `datadog.dd.agent`: Datadog Agent 설치 및 구성
  - [해당 역할에 대한 공식 문서](https://docs.datadoghq.com/agent/guide/ansible_standalone_role/#setup)를 참조하세요.
  - [독립형 역할에 대한 리포지토리](https://github.com/DataDog/ansible-datadog#readme)를 참조하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Ansible 컬렉션을 사용하여 Agent 설치 자동화](https://www.datadoghq.com/blog/datadog-ansible-collection/)