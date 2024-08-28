---
categories:
- collaboration
- developer tools
- issue tracking
- source control
custom_kind: 통합
dependencies: []
description: 내 자체 호스팅 GIt 서버에서 Datadog로 커밋을 전송하고 풀 요청하기.
doc_link: https://docs.datadoghq.com/integrations/git/
draft: false
git_integration_title: git
has_logo: true
integration_id: git
integration_title: Git
integration_version: ''
is_public: true
manifest_version: '1.0'
name: git
public_title: Datadog-Git 통합
short_description: 내 자체 호스팅 GIt 서버에서 Datadog로 커밋을 전송하고 풀 요청하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/git/git_event.png" alt="Git 이벤트" popup="true">}}

## 개요

Git 서버에서 바로 Git 커밋을 캡처하면 다음을 할 수 있습니다.

- 실시간으로 코드 변경 추적
- 대시보드 전체에 코드 변경 마커 추가
- 팀과 코드 변경 논의

## 설정

### 설치

1. Git용 새 애플리케이션 키를 생성하세요. [애플리케이션 키 생성][1]

2. Datadog Git 웹훅을 다운로드 받으세요.

    ```shell
    sudo easy_install dogapi
    curl -L https://raw.github.com/DataDog/dogapi/master/examples/git-post-receive-hook > post-receive
    ```

3. [Datadog 키][1]로 Git을 설정하세요.

    ```shell
    git config datadog.api <YOUR_DATADOG_API_KEY>
    git config datadog.application <YOUR_DATADOG_APP_KEY>
    ```

4. `<GIT_REPOSITORY_NAME>`으로 Git 리포지토리에 후크를 활성화하세요.

    ```shell
    install post-receive <GIT_REPOSITORY_NAME>/.git/hooks/post-receive
    ```

5. [Datadog-Git 통합을 설치][2]

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/integrations/git