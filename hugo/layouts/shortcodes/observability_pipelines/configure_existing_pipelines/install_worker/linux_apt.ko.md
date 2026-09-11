
1. **API 키 선택**을 클릭해 사용하고 싶은 Datadog API 키를 선택하세요.
1. UI에 제공된 원스텝 명령을 실행하여 Worker를 다시 설치합니다.

    **참고**:  `/etc/default/observability-pipelines-worker`에서 Worker가 사용하는 환경 변수는 설치 스크립트를 실행할 때 업데이트되지 않습니다. 변경이 필요한 경우 파일을 수동으로 업데이트하고 Worker를 다시 시작하세요.

한 줄 설치 스크립트를 사용하지 않으려면 다음 단계별 지침을 따르세요.
1. 다음 명령을 실행하여 로컬 `apt` 리포지토리를 업데이트하고 최신 Worker 버전을 설치하세요.
    ```shell
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```
1. Worker의 환경 파일에 키, 사이트(예: US1의 경우 `datadoghq.com` ), 소스 및 대상 환경 변수를 추가합니다.
    ```shell
    sudo cat <<EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<DATADOG_API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<DATADOG_SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Worker를 다시 시작합니다.
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. 관측 가능성 파이프라인으로 돌아가 파이프라인 페이지를 편집하려면 **뒤로 탐색**을 클릭하세요.
1.  **배포 변경 사항**을 클릭하세요.