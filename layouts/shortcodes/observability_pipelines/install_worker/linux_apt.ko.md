1. **API 키 선택**을 클릭해 사용하고 싶은 Datadog API 키를 선택하세요.
1. UI에 제공된 원스텝 명령을 실행하여 Worker를 설치합니다.

    **참고**: `/etc/default/observability-pipelines-worker`에서 Worker가 사용하는 환경 변수는 설치 스크립트를 실행할 때 업데이트되지 않습니다. 변경이 필요한 경우 파일을 수동으로 업데이트하고 Worker를 다시 시작하세요.

한 줄 설치 스크립트를 사용하지 않으려면 다음 단계별 지침을 따르세요.
1. HTTPS를 사용하여 다운로드할 수 있도록 APT 전송을 설정합니다:
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```
1. 다음 명령을 실행하여 시스템에 Datadog `deb` 리포지토리를 설정하고 Datadog 아카이브 키링을 생성합니다:
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-2' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```
1. 다음 명령을 실행하여 로컬 `apt` 리포지토리를 업데이트하고 Worker를 설치합니다:
    ```shell
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```
1. Worker의 환경 파일에 키, 사이트(예: US1의 경우 `datadoghq.com`), 소스 및 대상 환경 변수를 추가합니다.
    ```shell
    sudo cat <<EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<DATADOG_API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<DATADOG_SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Worker를 시작합니다.
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

파이프라인의 설정을 변경하려면 [기존 파이프라인 업데이트][9001]를 참조하세요.

[9001]: /ko/observability_pipelines/update_existing_pipelines
