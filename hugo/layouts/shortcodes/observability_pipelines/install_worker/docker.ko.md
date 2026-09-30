1. **API 키 선택**을 클릭해 사용하고 싶은 Datadog API 키를 선택하세요.
1. 안내된 명령을 UI에 실행해 Worker를 설치하세요. 이 명령을 사용하면 이전에 입력한 환경 변수가 자동으로 채워집니다.
    ```shell
    docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
        -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
        -e DD_SITE=<DATADOG_SITE> \
        -e <SOURCE_ENV_VARIABLE> \
        -e <DESTINATION_ENV_VARIABLE> \
        -p 8088:8088 \
        datadog/observability-pipelines-worker run
    ```   
    **참고**: 기본적으로 `docker run` 명령은 작업자가 수신 중인 포트와 동일한 포트를 노출시킵니다. 작업자의 컨테이너 포트를 도커(Docker) 호스트의 다른 포트에 매핑하려면 명령에 `-p | --publish` 옵션을 사용하세요:
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
1. 관측 가능성 파이프라인 설치 페이지로 돌아가서 **배포**를 클릭하세요.

파이프라인 설정을 변경하려면 [기존 파이프라인 업데이트][8001]를 참조하세요.

[8001]: /ko/observability_pipelines/update_existing_pipelines