1. **API 키 선택**을 클릭해 사용하고 싶은 Datadog API 키를 선택하세요.
1. 안내된 명령을 UI에 실행해 Worker를 설치하세요. 이 명령을 사용하면 내가 이전에 입력한 환경 변수가 자동으로 채워집니다.
    ```shell
    docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
        -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
        -e DD_SITE=<DATADOG_SITE> \
        -e <SOURCE_ENV_VARIABLE> \
        -e <DESINATION_ENV_VARIABLE> \
        -p 8088:8088 \
        datadog/observability-pipelines-worker run
    ```
    **참고**: 기본적으로 `docker run` 명령은 Worker가 수신 중인 포트와 동일한 포트를 노출합니다. Worker의 컨테이너 포트를 도커(Docker) 호스트의 다른 포트에 매핑하려면 `-p | --publish` 옵션을 사용하세요.
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
1. Observability Pipelines로 돌아가 파이프라인 페이지를 편집하려면 **Navigate Back**을 클릭하세요.
1.  **Deploy Changes**를 클릭하세요.
