1. Google GKE용 [Helm 차트 값 파일][6001]을 다운로드하세요.
1. **API 키 선택**을 클릭해 사용하고 싶은 Datadog API 키를 선택하세요.
1. Helm에 Datadog 차트 리포지토리를 추가하세요.
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
   이미 Datadog 차트 리포지토리를 가지고 있는 경우에는 다음 명령을 실행해 리포지토리가 최신 버전인지 확인하세요.
    ```shell
    helm repo update
    ```
1. 안내된 명령을 UI에 실행해 Worker를 설치하세요. 이 명령을 사용하면 내가 이전에 입력한 환경 변수가 자동으로 채워집니다.
    ```shell
    helm upgrade --install opw \
        -f google_gke.yaml \
        --set datadog.apiKey=<DATADOG_API_KEY> \
        --set datadog.pipelineId=<PIPELINE_ID> \
        --set <SOURCE_ENV_VARIABLES> \
        --set <DESTINATION_ENV_VARIABLES> \
        --set service.ports[0].protocol=TCP,service.ports[0].port=<SERVICE_PORT>,service.ports[0].targetPort=<TARGET_PORT> \
        datadog/observability-pipelines-worker
    ```
   **참고**: 기본적으로 Kubernetes Service에서는 수신 포트 `<SERVICE_PORT>`를 Worker 포트가 수신 중인 포트(`<TARGET_PORT>`)에 매핑합니다. Worker 포드 포트를 Kubernetes Service의 다른 수신 포트로 매핑하고 싶으면 다음 `service.ports[0].port`와 `service.ports[0].targetPort` 값을 사용하세요.
    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```
1. Observability Pipelines로 돌아가 파이프라인 페이지를 편집하려면 **Navigate Back**을 클릭하세요.
1.  **Deploy Changes**를 클릭하세요.

[6001]: /resources/yaml/observability_pipelines/v2/setup/google_gke.yaml
