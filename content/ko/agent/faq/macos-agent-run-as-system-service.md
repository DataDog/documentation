---
further_reading:
- link: /agent/
  tag: 설명서
  text: Datadog 에이전트에 대해 자세히 알아보기
kind: faq
title: MacOS에서 에이전트를 시스템 서비스로 실행하도록 설정하려면 어떻게 해야 하나요?
---

MacOS에서는 설치 명령을 실행하는 경우 Datadog 에이전트가 사용자 서비스로 설치됩니다. 이 때문에 설치를 실행한 사용자로 MacOS GUI에 로그인한 경우 Datadog 에이전트 시스템 트레이 애플리케이션을 실행할 수 있습니다. 이 경우 단점은 설치를 실행한 사용자가 macOS GUI를 사용해 로그인한 경우에만 에이전트를 실행할 수 있다는 것입니다.

따라서 macOS 호스트의 GUI 액세스를 사용할 수 없는 경우에는 기본적으로 Datadog 에이전트가 실행되지 않습니다. GUI 액세스 없이 macOS Datadog 에이전트를 설치하고 실행하려면 추가 단계가 필요합니다.

## 설치

1. 호스트에 연결하고 [에이전트 설치 지침서][1]을 따라 macOS Datadog 에이전트를 설치합니다.

2. 설치를 실행한 사용자로 다음 배시 스크립트를 실행하세요.

    ```sh
    #!/bin/bash

    echo "Moving the Datadog Agent service for the $USER user to a system service"
    # Move the per-user service definition installed by the Agent to a system service
    sudo mv /Users/$USER/Library/LaunchAgents/com.datadoghq.agent.plist /Library/LaunchDaemons/com.datadoghq.agent.plist

    echo "Setting the Datadog Agent service to run as the $USER user"
    # By default, system services run as root.
    # This plist file modification is needed to make the Agent not run as root, but as the current user.
    sudo plutil -insert UserName -string "$USER" /Library/LaunchDaemons/com.datadoghq.agent.plist

    echo "Setting permissions on the Datadog Agent service file"
    # Put the correct permissions on the plist file.
    # Otherwise launchctl will refuse running commands for this service.
    sudo chown root:staff /Library/LaunchDaemons/com.datadoghq.agent.plist

    echo "Enabling the Datadog Agent service"
    # Enable the service: makes sure it runs on reboot
    sudo launchctl enable system/com.datadoghq.agent

    echo "Loading & launching the Datadog Agent service"
    # Load the service: this starts the Agent
    sudo launchctl load /Library/LaunchDaemons/com.datadoghq.agent.plist
    ```

이 스크립트는 다음 속성을 사용해 Datadog 에이전트 서비스를 런치 데몬으로 실행하도록 재설정합니다.
- 호스트가 시작되면 서비스가 자동으로 시작됩니다.
- 위 스크립트를 실행한 사용자로 에이전트 프로세스가 실행됩니다(루트로 실행되지 않도록 하기 위해).
- Datadog 에이전트 GUI 시스템 트레이 애플리케이션을 사용할 수 없습니다.


## 운영

Datadog 에이전트 서비스는 `launchctl`로 관리됩니다. 위의 설치 지침이 실행되면 다음 명령으로 에이전트 서비스를 관리하세요.

| 설명                   | 명령어                                                                                                                   |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| 에이전트 서비스 시작           | `sudo launchctl start com.datadoghq.agent`                                                                                |
| 에이전트 서비스 실행 중지    | `sudo launchctl stop com.datadoghq.agent`                                                                                 |
| 에이전트 서비스 상태       | `sudo launchctl list com.datadoghq.agent`                                                                                 |
| 에이전트 서비스 사용 안 함         | `sudo launchctl disable system/com.datadoghq.agent`                                                                       |
| 에이전트 서비스 사용          | `sudo launchctl enable system/com.datadoghq.agent && sudo launchctl load /Library/LaunchDaemons/com.datadoghq.agent.plist`|


에이전트를 실행 중지하면 `list`, `start`, `stop` 명령이 작동하지 않으며 재부팅 시 에이전트 서비스가 시작되지 않습니다.

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos