---
categories:
- automation
- configuration & deployment
- log collection
- orchestration
- provisioning
custom_kind: integration
dependencies: []
description: 실패한 작업을 추적하고 이벤트 스트림에서 플레이북 실행을 확인하세요.
doc_link: https://docs.datadoghq.com/integrations/ansible/
draft: false
git_integration_title: ansible
has_logo: true
integration_id: ansible
integration_title: Ansible
integration_version: ''
is_public: true
manifest_version: '1.0'
name: ansible
public_title: Datadog-Ansible 통합
short_description: 실패한 작업을 추적하고 이벤트 스트림에서 플레이북 실행을 확인하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/ansible/ansibledashboard.png" alt="Ansible 대시보드" popup="true">}}

## 개요

Datadog Ansible 콜백 통합을 설치해 다음을 수행하세요.

- Ansible 서버 실행에 대한 실시간 보고서 받기
- 모든 서버에서 주요 Ansible 성능 메트릭 추적
- 실패한 Ansible 실행을 팀과 신속하게 식별하고 논의

Ansible과 Datadog 통합 사용에 대한 자세한 내용은 블로그 게시물 [Ansible + Datadog: Monitor your automation, automate your monitoring][1]을 읽어보세요.

## 설정

### 설치

1. 필수 Python 라이브러리가 서버에 설치되어 있는지 확인하세요.

    - datadogpy
    - pyyaml (`pip install pyyaml`와 설치)
    - Mac OS X 사용자: OS에 설치된 Python 2.7.10 이하를 실행하는 경우 최신 버전의 OpenSSL - `pip install pyopenssl idna`로 업그레이드합니다.

2. [ansible-datadog-callback GitHub 리포지토리][2]를 복제합니다.
3. 플레이북 콜백 디렉터리(기본값은 플레이북 루트 디렉터리에 있는 callback_plugins/)에 `datadog_callback.py`를 복사합니다. 디렉터리가 없으면 새로 생성합니다.
4. `datadog_callback.py`와 함께 `datadog_callback.yml` 파일을 생성하고 다음과 같이 API 키를 사용하여 해당 내용을 설정합니다.


        api_key: <YOUR_DATADOG_API_KEY>


5. 플레이북이 실행된 후 Datadog에 Ansible 이벤트 및 메트릭이 표시됩니다.

Ansible을 사용하여 Datadog Agent를 설치하려면 [Agent 설치 지침][3]을 참조하세요.

### 로그 수집

Ansible를 사용하여 로그 수집이 활성화된 Datadog Agent를 설치하는 방법은 [플레이북 예][4]를 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ansible" >}}


### 이벤트

[ansible-datadog-callback][2]은 플레이북 실행에서 Ansible 이벤트를 캡처합니다.

### 서비스 점검

Ansible 통합에는 서비스 검사가 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][6]에 연락하세요.

[1]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring
[2]: https://github.com/datadog/ansible-datadog-callback
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=ansible
[4]: https://github.com/DataDog/ansible-datadog#example-playbooks
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/ansible/ansible_metadata.csv
[6]: https://docs.datadoghq.com/ko/help/