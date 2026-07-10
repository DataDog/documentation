1. **API 키 선택**을 클릭해 사용하고 싶은 Datadog API 키를 선택하세요.
1. UI에 제공된 원스텝 명령을 실행하여 Worker를 설치합니다.

    **참고**: `/etc/default/observability-pipelines-worker`에서 Worker가 사용하는 환경 변수는 설치 스크립트를 실행할 때 업데이트되지 않습니다. 변경이 필요한 경우 파일을 수동으로 업데이트하고 Worker를 다시 시작하세요.

한 줄 설치 스크립트를 사용하지 않으려면 다음 단계별 지침을 따르세요.
1. 아래 명령어로 시스템에 Datadog `rpm` 리포지토리를 설정합니다. **참고**: RHEL 8.1 또는 CentOS 8.1을 실행하는 경우, 아래 설정 에서 `repo_gpgcheck=1` 대신 `repo_gpgcheck=0` 을 사용하세요.
    ```shell
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-2/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
        https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
    EOF
    ```
1. 패키지를 업데이트하고 Worker를 설치합니다.
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. Worker의 환경 파일에 키, 사이트(예: US1의 경우 `datadoghq.com`), 소스 및 대상 환경 변수를 추가합니다.
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Worker를 시작합니다.
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. 관측 가능성 파이프라인 설치 페이지로 돌아가서 **배포**를 클릭하세요.

파이프라인의 설정을 변경하려면 [기존 파이프라인 업데이트][9001]를 참조하세요.

[9001]: /ko/observability_pipelines/update_existing_pipelines