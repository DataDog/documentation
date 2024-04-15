---

title: RasberryPI에서 에이전트 배포하기
---

**Raspbian 사용하기**

1. 먼저 로컬 캐시를 업데이트합니다.

    ```shell
    sudo apt-get update
    ```

2. 그리고 `sysstat`을 설치합니다.

    ```text
    sudo apt-get install sysstat
    ```

3. Datadog에서 [에이전트 설치 화면으로 이동][1]한 뒤 "소스로부터"를 선택합니다.
4. 설치 명령을 실행합니다.

    ```shell
    DD_API_KEY=<YOUR-API-KEY> sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
    ```

**참고**: 일부 Raspberry PI 모델에서는 설치 프로세스가 최대 30분까지 걸릴 수 있습니다.

설치 완료 후 출력 예시:

![RaspberryPI Install](https://raw.githubusercontent.com/DataDog/documentation/master/static/images/developers/faq/rasberypi_install.png)

에이전트가 포그라운드에서 실행됩니다. 일부 사용자에게는 다음과 같이 에이전트에 `systemd`을 생성하는 것이 도움이 될 수 있습니다.

```text
#/etc/systemd/system/datadog.service

[Unit]
Description=Datadog Agent

[Service]
ExecStart=/path/to/.datadog-agent/bin/agent

[Install]
WantedBy=multi-user.target
```

그리고 다음을 실행합니다:

```shell
systemctl daemon-reload
sudo systemctl enable datadog
systemctl start datadog
```

설치 명령을 실행한 작업 디렉토리에 Datadog 에이전트가 설치됩니다 (예: `/home/pi/.datadog-agent/`).

Rasberry PI 장치에서 수집된 메트릭 예시:

![RaspberryPI Dashboard](https://raw.githubusercontent.com/DataDog/documentation/master/static/images/developers/faq/rasberry_dashboard.png)

**참고**: Datadog은 공식적으로 Raspbian을 지원하지 않습니다.

[1]: https://app.datadoghq.com/account/settings#agent/source
