---
aliases:
- /ko/agent/guide/community-integrations-installation-with-docker-agent
further_reading:
- link: /agent/troubleshooting/
  tag: 설명서
  text: Agent 트러블슈팅
- link: /developers/integrations/new_check_howto
  tag: 설명서
  text: 새로운 통합(Integration)을 생성하기
title: 커뮤니티 통합 사용하기
---

## 개요

커뮤니티에서 Datadog Agent용으로 개발한 통합은 Datadog [integrations-extra][1] 깃허브 저장소에 저장됩니다. Agent 패키지로 제공되지는 않으나, 애드온으로 설치할 수는 있습니다.

## 구성

신규 사용자의 경우, [Datadog Agent][2]의 최신 버전을 다운로드해 설치하시기 바랍니다.

### 설치

사용하는 Agent 버전을 선택하세요.

{{< tabs >}}
{{% tab "Agent v7.21+ / v6.21+" %}}

Agent v7.21 / v6.21 이상인 경우:

1. 다음 명령어를 실행해 Agent 통합을 설치하세요.

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```

2. 통합을 코어 [통합][1]과 유사하게 설정하세요.
3. [Agent를 다시 시작합니다][2].

**참조**: 필요한 경우 설치 명령어에 `sudo -u dd-agent` 접두어를 덧붙이세요.

[1]: /ko/getting_started/integrations/
[2]: /ko/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "도커(Docker)" %}}

커뮤니티 통합과 도커(Docker) Agent를 사용할 때는 설치된 통합으로 Agent를 빌드하시길 권장합니다. 다음의 Dockerfile을 사용해, integrations-extras에서 `<INTEGRATION_NAME>`을 포함하도록 업데이트된 버전의 Agent를 빌드하세요

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

`agent integration install` 명령어는 도커 내부에서 실행되며 `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn`라는 경고 메시지를 표시합니다. 이 경고는 무해하므로 무시할 수 있습니다.

새 Agent 이미지와 [자동탐지][1]를 함께 사용해 `<INTEGRATION_NAME>`를 활성화합니다.

[1]: /ko/agent/autodiscovery/
{{% /tab %}}

{{% tab "이전 버전의 Agent" %}}

Agent v7.21 / v6.21 이하의 경우:

1. [integrations-extra 저장소][1]에서 `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/` 폴더 내의 파일을 다운로드합니다.
2. `<INTEGRATION_NAME>.py` 및 기타 파이썬(Python) 파일을 Agent `checks.d` 디렉터리에 위치시킵니다.
3. [Agent 설정 디렉터리][2]에 새 `<INTEGRATION_NAME>.d/` 폴더를 만듭니다.
4. `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/data/` 폴더에서 `conf.yaml.example` 파일을 만든 디렉터리에 위치시킵니다.
4. 파일의 이름을 `conf.yaml`로 바꿉니다.
5. 통합을 코어 [통합][3]과 유사하게 설정하세요.
6. [Agent를 다시 시작합니다][4].


[1]: https://github.com/DataDog/integrations-extras
[2]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ko/getting_started/integrations/
[4]: /ko/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

<br>

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
[2]: https://app.datadoghq.com/account/settings#agent
