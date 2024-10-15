---
aliases:
- /ko/integrations/guide/pivotal-cloud-foundry-manual-setup
description: Cloud Foundry 통합 설정 단계
further_reading:
- link: https://www.datadoghq.com/blog/monitor-tanzu-application-service/
  tag: 블로그
  text: VMware Tanzu Application Service에서 실행되는 애플리케이션 모니터링

title: Cloud Foundry 설치 가이드
---

## 개요

Cloud Foundry 배포는 Datadog로 메트릭과 이벤트를 전송할 수 있습니다. 배포 환경의 모든 노드의 상태와 가용성을 추적하고, 실행하는 작업을 모니터링하고, Loggregator Firehose에서 메트릭을 수집하는 등의 작업이 가능합니다. 이 페이지에서는 Cloud Foundry 환경 모니터링을 설정하는 방법에 대한 안내를 제공합니다.

Cloud Foundry 및 Datadog 통합을 위한 4가지 주요 구성 요소가 있습니다.

- **Cloud Foundry 빌드팩 -** Cloud Foundry 애플리케이션에서 커스텀 메트릭, 로그, 트레이스 및 프로필을 수집하는 데 사용됩니다.
- **에이전트 BOSH 릴리스 -** BOSH VM에서 이벤트와 메트릭을 수집하고 Datadog에 전송하는 데 사용됩니다.
- **클러스터 에이전트 BOSH 릴리스 -**  CAPI 및 BBS, 컨테이너 태그에서 클러스터 수준 및 애플리케이션 수준 메타데이터를 수집하는 데 사용됩니다.
- **Firehose 노즐 -** 인프라스트럭처의 Loggregator Firehose에서 모든 기타 메트릭을 수집합니다.

자세한 정보는 [Datadog VMware Tanzu 애플리케이션 서비스 아키텍처][32] 가이드를 읽어보세요.

## 애플리케이션 모니터링

**Datadog Cloud Foundry 빌드팩**을 사용해 Cloud Foundry 애플리케이션을 모니터링합니다. 이는 앱이 실행되는 컨테이너에 Datadog 컨테이너 에이전트(에이전트의 저용량 버전), 애플리케이션 성능 모니터링(APM)용 Datadog 트레이스 에이전트, Datadog DogStatsD 바이너리 파일을 설치하는 Cloud Foundry [공급 빌드팩][2]입니다.

### 다수의 빌드팩(권장)

1. [최신 Datadog 빌드팩 릴리스][7]를 다운로드하고 Cloud Foundry 환경에 업로드합니다.

    ```shell
    cf create-buildpack datadog-cloudfoundry-buildpack ./datadog-cloudfoundry-buildpack-latest.zip
    ```

2. Datadog 빌드팩 및 정규 빌드팩을 포함하는 애플리케이션을 푸시합니다. 다수의 빌드팩을 사용해 애플리케이션을 푸시하는 프로세스는 [다수의 빌드팩으로 앱 푸시하기][3]에 설명되어 있습니다.

    ```shell
    cf push <YOUR_APP> --no-start -b binary_buildpack
    cf v3-push <YOUR_APP> -b datadog-cloudfoundry-buildpack -b <YOUR-BUILDPACK-1> -b <YOUR-FINAL-BUILDPACK>
    ```

   **참고**: 이전에도 단일 빌드팩을 사용한 경우, 해당 빌드팩은 마지막 빌드팩으로 작동하도록, 로딩된 마지막 빌드팩이어야 합니다. 자세한 내용은 [Cloud Foundry의 빌드팩 작동 방법][6]을 참조하세요.

### 멀티 빌드팩(지원 중단됨)

Datadog 빌드팩은 `1.12` 버전에 도입된 Cloud Foundry [멀티 빌드팩을 사용하여 앱 푸시하기][3] 기능을 사용합니다. 

이전 버전을 위해, Cloud Foundry는 [멀티 빌드팩][4] 형태로 이 기능의 역호환 가능한 버전을 제공합니다. 이 버전을 설치하고 설정하여 Datadog 빌드팩을 사용할 수 있습니다.

1. 최신 멀티 빌드팩 릴리스를 다운로드하고 Cloud Foundry 환경에 업로드합니다.

    ```shell
    cf create-buildpack multi-buildpack ./multi-buildpack-v-x.y.z.zip 99 --enable
    ```

2. 애플리케이션에 멀티 빌드팩 매니페스트를 추가합니다. 멀티 빌드팩 리포지토리의 [사용량 섹션][5]에서 상세 기술된 대로 애플리케이션 루트에 `multi-buildpack.yml` 파일을 생성하고 환경에 맞게 설정합니다. Datadog Cloud Foundry 빌드팩과 정규 빌드팩에 링크를 추가합니다.

    ```yaml
    buildpacks:
      - "https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-4.36.0.zip"
      - "https://github.com/cloudfoundry/ruby-buildpack#v1.7.18" # Replace this with your regular buildpack
    ```

   Datadog 빌드팩 URL은 다음과 같습니다.
      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip`
      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-x.y.z.zip`

      여기서 `latest` 버전을 사용하지 마세요(`x.y.z`를 사용하려는 특정 버전으로 교체).

      **참고**: 정규 빌드팩은 매니페스트에 나와 있는 마지막 빌드팩이어야 합니다. 자세히 알아보려면 [Cloud Foundry의 빌드팩 작동 방법][6]을 참조하세요.

3. 멀티 빌드팩을 사용해 애플리케이션을 푸시합니다. `multi-buildpack`이 애플리케이션에 대해 Cloud Foundry에서 선택한 빌드팩이 맞는지 확인하세요.

    ```shell
    cf push <YOUR_APP> -b multi-buildpack
    ```

### 메타 빌드팩 **(지원 중단됨)**

[메타-빌드팩][8] 사용자인 경우 Datadog 빌드팩을 즉시 사용 가능한 데코레이터로 사용할 수 있습니다.

**참고**: Cloud Foundry에서 멀티 빌드팩을 위해 메타 빌드팩에 대한 지원을 중단했습니다.

## Cloud Foundry 클러스터 모니터링

Datadog와의 통합 3요소가 있습니다. 각각의 목표는 다릅니다.

- **Datadog 에이전트 BOSH 릴리스** - 배포 환경의 모든 노드에 Datadog 에이전트를 설치하여 시스템, 네트워크 및 디스크 메트릭을 추적합니다. 원하는 다른 모든 에이전트 점검을 활성화합니다.
- **Datadog 클러스터 에이전트 BOSH 릴리스** - 단일 Datadog 클러스터 에이전트 작업을 배포합니다. 작업은 CAPI 및 BBS API를 쿼리해 클러스터 수준 및 애플리케이션 수준의 메타데이터를 수집하여 애플리케이션과 컨테이너에서 향상된 태깅 기능을 제공합니다.
- **Datadog Firehose Nozzle** - 하나 이상의 Datadog Firehose Nozzle 작업을 배포합니다. 작업은 배포 환경의 Loggregator Firehose를 작동시켜 모든 컨테이너 외 메트릭을 Datadog에 전송합니다.

<div class="alert alert-warning">
이러한 통합은 최종 사용자가 아니라 Cloud Foundry 배포 관리자를 대상으로 합니다.
</div>

### 전제 조건

작동하는 Cloud Foundry 배포 환경이 있어야 하며 이를 관리하는 BOSH Director에 액세스해야 합니다. 또한, 각 통합을 배포하는 데 BOSH CLI가 필요합니다. CLI -- [v1][15] 또는 [v2][16] 주 버전 중 하나를 사용할 수 있습니다.

### Datadog 에이전트 BOSH 릴리스 설치

Datadog는 BOSH 릴리스로 패키지된 Datadog 에이전트의 타르볼을 제공합니다. BOSH Director에 최신 릴리스를 업로드한 다음 배포 환경의 모든 노드에 [애드온][17]으로 설치합니다(동일한 방법으로 Director는 BOSH 에이전트를 모든 노드에 배포함).

#### BOSH Director에 Datadog 릴리스 업로드

```text
# BOSH CLI v1
bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
```

자체적인 릴리스를 생성하려면 [Datadog 에이전트 BOSH 릴리스 리포지토리][18]를 참조하세요.

#### BOSH Director에 애드온으로 에이전트 설정

다음을 BOSH Director의 런타임 설정 파일(`runtime.yml`)에 추가:

```text
---
releases:
  - name: datadog-agent
    version: <VERSION_YOU_UPLOADED> # specify the real version (x.y.z not 'latest')
addons:
- name: datadog
  jobs:
  - name: dd-agent
    release: datadog-agent
  properties:
    dd:
      use_dogstatsd: true
      dogstatsd_port: 18125       # Many CF deployments have a StatsD already on port 8125
      api_key: <DATADOG_API_KEY>
      tags: ["<KEY:VALUE>"]       # any tags you wish
      generate_processes: true    # to enable the process check
```

어느 `datadog-agent` 릴리스 버전이 이전에 업로드되었는지 확인하려면 `bosh releases`를 실행합니다.

#### runtime.yml 로드

다음을 실행하여 이전에 `runtime-config`를 설정하였는지 확인합니다.

```text
# BOSH CLI v1
`bosh runtime-config`
# BOSH CLI v2
bosh -e <BOSH_ENV> runtime-config
```

BOSH v2에서 `runtime.yml` 파일이 비어 있는 경우 `No runtime config` 응답을 참조해야 합니다.

#### 추가 에이전트 점검 활성화

각 추가 에이전트 점검이 배포 환경 전반에서 활성화되도록 하려면 `properties.dd.integrations` 키 아래 설정을 추가합니다. 예는 다음과 같습니다.

```yaml
properties:
    dd:
        integrations:
            directory:
                init_config: {}
                instances:
                    directory: '.'
            #process:
            #  init_config: {}
            #...
```

각 점검 이름 아래 설정은 에이전트의 `conf.d` 디렉터리에 있는 자체적인 파일에서 점검을 설정할 때와 동일한 형식을 사용합니다.

`runtime.yml`에서 설정한 모든 것은 모든 노드에 적용됩니다. 배포 환경의 노드 하위 집합에 대한 점검을 설정할 수 없습니다.

기본 점검(시스템, 네트워크, 디스크 및 NTP)에 대한 설정을 커스터마이즈하려면, Datadog 에이전트 BOSH 릴리스에 대한 [전체 설정 옵션 목록]을 참조하세요.

#### BOSH Director에 런타임 설정 동기화

```text
# BOSH CLI v1
bosh update runtime-config runtime.yml
# BOSH CLI v2
bosh update-runtime-config -e <BOSH_ENV> runtime.yml
```

#### Cloud Foundry 배포 환경 재배포

```text
# BOSH CLI v1
bosh deployment <YOUR_DEPLOYMENT_MANIFEST>.yml
bosh -n deploy --recreate
# BOSH CLI v2
bosh -n -d <YOUR_DEPLOYMENT> -e <BOSH_ENV> deploy --recreate <YOUR_DEPLOYMENT_MANIFEST>.yml
```

런타임 설정은 전 세계적으로 적용되므로 BOSH는 배포 환경에 있는 모든 노드를 재배포합니다. 하나 이상의 배포 환경을 보유한 경우 모든 배포 환경을 재배포에 모든 곳에 Datadog 에이전트를 설치합니다.

#### 에이전트가 모든 곳에 설치되었는지 확인

에이전트 설치가 성공적인 경우 [호스트 맵][20]에서 `cloudfoundry`별로 필터링합니다. Datadog 에이전트 BOSH 릴리스는 `cloudfoundry`를 사용해 모든 호스트를 태깅합니다. 선택적으로, 다음 스크린샷에서 `bosh_job` 등 모든 태그별로 호스트를 그룹화할 수 있습니다.

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map.png" alt="그룹 섹션의 bosh_job 및 필터 섹션에 입력한 CloudFoundry를 사용하는 Datadog 호스트 맵" >}}

호스트를 클릭하여 확대합니다. 그런 다음 육각형 안에 있는 **시스템**을 클릭하여 Datadog가 시스템 메트릭을 수신하고 있는지 확인합니다.

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map-detail.png" alt="시스템 통합이 선택되어 있고 데이터를 표시하는 여러 그래프가 있는 Datadog 호스트 맵의 호스트에 대한 상세 정보 보기" >}}

#### Cloud Foundry 컨테이너에서 CAPI 메타데이터 및 클러스터 에이전트 태그 수집

Datadog 에이전트 버전 `7.40.1` 이상의 경우 Cloud Foundry 컨테이너에서 CAPI 메타데이터 및 DCA(Datadog Cluster 에이전트) 태그를 수집할 수 있습니다. 애플리케이션 레이블과 주석은 애플리케이션 로그, 메트릭, 트레이스에 표시됩니다.

### Datadog 클러스터 에이전트 (DCA) BOSH 릴리스 설치

Datadog 클러스터 에이전트 BOSH 릴리스는 Cloud Foundry에서 Datadog 클러스터 에이전트를 실행하기 위한 BOSH 패키지입니다.

이 패키지는 [Datadog 에이전트 BOSH 릴리스][18]와 함께 사용됩니다. 
Datadog 에이전트 BOSH 릴리스에서 사용하는 BOSH 링크를 제공하여, 자동 검색 및 앱 통합 예약을 이용할 수 있습니다. 또한, 애플리케이션 컨테이너와 프로세스 탐지를 위해 향상된 태깅을 제공합니다. 자세한 내용은 [GitHub의 사양][33]을 참조하세요.

#### Datadog의 클러스터 에이전트 릴리스를 BOSH Director에 업로드

```text
# BOSH CLI v1
bosh upload release https://cloudfoundry.datadoghq.com/datadog-cluster-agent/datadog-cluster-agent-boshrelease-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> https://cloudfoundry.datadoghq.com/datadog-cluster-agent/datadog-cluster-agent-boshrelease-latest.tgz
```

#### 배포
아래 예제 배포 매니페스트 템플릿을 사용하여 Datadog 클러스터 에이전트를 배포하고 이를 Datadog 에이전트에 노출합니다. 사용 가능한 속성은 [GitHub의 사양][33]을 참조하세요.

```yaml
jobs:
- name: datadog-cluster-agent
  release: datadog-cluster-agent
  properties:
    cluster_agent:
      token: <TOKEN>  # 32 or more characters in length 
      bbs_poll_interval: 10
      warmup_duration: 5
      log_level: INFO
      bbs_ca_crt: <CA_CERTIFICATE>
      bbs_client_crt: <CLIENT_CERTIFICATE>
      bbs_client_key: <CLIENT_PRIVATE_KEY>
  provides:
    datadog-cluster-agent:
      aliases:
        - domain: <DNS_NAME (e.g. datadog-cluster-agent)>
```

`<TOKEN>`를 [클러스터 에이전트 토큰][34]으로 교체하세요.

**참고**: 이렇게 하면 Datadog 클러스터 에이전트 서비스에 대한 DNS 별칭이 생성되어 고정 별칭을 통해 주소를 지정할 수 있습니다. BOSH DNS 별칭에 대한 자세한 내용은 BOSH 설명서의 [서비스 별칭](https://bosh.io/docs/dns/#aliases-to-services)을 참조하세요.

이 DNS 별칭은 아래 예제 템플릿에 표시된 대로 Datadog 에이전트 런타임 설정의 [`cluster_agent.address`](https://bosh.io/jobs/dd-agent?source=github.com/DataDog/datadog-agent-boshrelease&version=4.0.0#p%3dcluster_agent.address) 작업 속성에 지정됩니다.

```yaml
jobs:
- name: datadog-agent
  release: datadog-agent
  properties: 
    ...
    cluster_agent:
      address: <DNS_NAME>
    ...
```

#### 통합 설정 탐지
Datadog 클러스터 에이전트는 애플리케이션에 설정된 `AD_DATADOGHQ_COM` 환경 변수를 기반으로 통합을 검색합니다. 
이 환경 변수는 애플리케이션의 자동탐지 설정 템플릿을 포함하는 JSON 개체입니다. Datadog 클러스터 에이전트는 두 가지 유형의 설정을 검색하고 렌더링할 수 있습니다.
  1. 애플리케이션에 바인딩된 서비스에 대한 설정으로 사용자나 서비스 브로커가 제공할 수 있습니다.
  2. 애플리케이션 내에서 실행되는 서비스 설정입니다. 예를 들어 웹 서버입니다.

JSON 개체는 서비스 이름을 자동탐지 템플릿에 연결하는 사전이어야 합니다.
```
{
    "<SERVICE_NAME>": {
        "check_names": [<LIST_OF_INTEGRATION_NAMES_TO_CONFIGURE>],
        "init_configs": [<LIST_OF_INIT_CONFIGS>],
        "instances": [<LIST_OF_INSTANCES>],
        "variables": [<LIST_OF_VARIABLES_DEFINITIONS>]
    }
}
```

애플리케이션에 바인드된 서비스의 경우 `<SERVICE_NAME>`은 `cf services` 명령 출력에 나타나는 서비스 이름이어야 합니다. 애플리케이션 내부에서 실행되는 서비스의 경우 `<SERVICE_NAME>`은 무엇이든 될 수 있습니다.

`variables` 키는 구성 템플릿 내에서 템플릿 변수를 확인하기 위해 바인딩된 서비스에만 사용되며 `VCAP_SERVICES` 환경 변수에 대해 원하는 값의 JSON 경로를 포함해야 합니다. `cf env <APPLICATION_NAME>` 명령을 사용하여 이를 검사할 수 있습니다.

**참고:** Datadog 클러스터 에이전트는 자동탐지를 위한 `VCAP_SERVICES` 환경 변수에서 직접 사용할 수 있는 서비스의 자격 증명만 확인할 수 있습니다.

##### 예시

`AD_DATADOGHQ_COM` 환경 변수의 이 자동탐지 구성은 PostgreSQL 서비스에 바인딩된 웹 서버를 실행하는 Cloud Foundry 애플리케이션을 보여줍니다.

```
AD_DATADOGHQ_COM: '{
    "web_server": {
        "check_names": ["http_check"],
        "init_configs": [{}],
        "instances": [
            {
                "name": "My Nginx",
                "url": "http://%%host%%:%%port_p8080%%",
                "timeout": 1
            }
        ]
    }
    "postgres-service-name": {
        "check_names": ["postgres"],
        "init_configs": [{}],
        "instances": [
            {
                "host": "%%host%%",
                "port": 5432,
                "username": "%%username%%",
                "dbname": "%%dbname%%",
                "password": "%%password%%"
            }
        ],
        "variables": {
            "host": "$.credentials.host",
            "username": "$.credentials.Username",
            "password": "$.credentials.Password",
            "dbname": "$.credentials.database_name"
        }
    }
}'
```

이 예에서는 수반되는 `VCAP_SERVICES` 환경 변수를 보여줍니다.

```
VCAP_SERVICES: '{
    "my-postgres-service": [
        {
            "credentials": {
                Password: "1234",
                Username: "User1234",
                host: "postgres.example.com",
                database_name: "my_db",
            },
            "name": "postgres-service-name",
        }
    ]
}'
```

위의 예에서 첫 번째 항목 `web_server`은 애플리케이션 내부에서 실행되는 서비스에 대한 설정입니다.
`variables`은 없으며 자동탐지를 통해 사용 가능한 `%%host%%` 및 `%%port%%` 템플릿 변수를 사용합니다.

두 번째 항목 `postgres-service-name`은 애플리케이션에 바인딩된 서비스에 대한 설정입니다.
템플릿 변수를 확인하기 위해 `variables` 사전을 사용하여 인스턴스 설정에 사용되는 값을 정의합니다.
이 사전에는 `VCAP_SERVICES` 환경 변수에 정의된 `postgres-service-name` 서비스에 대한 변수 값을 찾을 수 있는 위치를 나타내는 JSONPath 개체가 포함되어 있습니다.

DCA를 통한 자동탐지에 대한 자세한 내용은 [클러스터 점검][35]을 참조하세요.

#### 캐시 실패에 대한 CCCache 성능 향상

Datadog 에이전트 버전 `7.40.1` 이상의 경우 더 많은 플래그를 추가하여 CCCache 동작 및 API 호출 수에 대한 제어를 강화할 수 있습니다.

- `refresh_on_cache_miss`를 통해 캐시 실패 동작 제어
- `advanced_tags`를 `sidecars_tags` 및 `isolation_segments_tags`로 분리

#### 애플리케이션 컨테이너 및 프로세스 탐지를 위한 향상된 태깅

두 릴리스가 연결되면 Datadog 클러스터 에이전트는 노드 에이전트가 해당 Cloud Foundry 애플리케이션 컨테이너에 태그로 연결하는 클러스터 수준 메타 데이터를 자동으로 제공합니다.

### Datadog Firehose Nozzle 배포

Datadog는 Datadog Firehose Nozzle의 BOSH 릴리스를 제공합니다. 디렉터에 릴리스를 업로드한 후 기존 배포에 노즐을 추가하거나 노즐만 포함하는 새 배포를 만듭니다. 다음 지침에서는 작동 중인 Loggregator Firehose가 있는 기존 Cloud Foundry 배포에 이를 추가한다고 가정합니다.

#### BOSH Director에 Datadog 릴리스 업로드

```text
# BOSH CLI v1
bosh upload release http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
```

자체적인 릴리스를 생성하려면 [Datadog Firehose Nozzle 릴리스 리포지토리][21]를 참조하세요.

#### UAA 클라이언트 설정

UAA 설정이 포함된 매니페스트에서 작업이 Firehose에 액세스할 수 있도록 Datadog Nozzle용 새 클라이언트를 추가합니다.

```yaml
uaa:
    clients:
        datadog-firehose-nozzle:
            access-token-validity: 1209600
            authorities: doppler.firehose,cloud_controller.admin_read_only
            authorized-grant-types: client_credentials
            override: true
            scope: doppler.firehose,cloud_controller.admin_read_only
            secret: <YOUR_SECRET>
```

재배포해 사용자를 추가합니다.

#### Firehose Nozzle 작업 추가

기본 Cloud Foundry 배포 매니페스트(`cf-manifest.yml`)에서 하나 이상의 노즐 작업을 구성합니다.

```yaml
jobs:
#- instances: 4
#  name: some_other_job
#  ...
# add more instances if one job cannot keep up with the Firehose
- instances: 1
  name: datadog_nozzle_z1
  networks:
    # some network you've configured elsewhere in the manifest
    - name: cf1
  # some resource_pool you've configured elsewhere in the manifest
  resource_pool: small_z1
  templates:
    - name: datadog-firehose-nozzle
      release: datadog-firehose-nozzle
  properties:
    datadog:
      api_key: "<YOUR_DATADOG_API_KEY>"
      api_url: https://api.datadoghq.com/api/v1/series
      # seconds between flushes to Datadog. Default is 15.
      flush_duration_seconds: 15
    loggregator:
      # do NOT append '/firehose' or even a trailing slash to the URL; 'ws://<host>:<port>' works
      # for example, ws://traffic-controller.your-cf-domain.com:8081
      traffic_controller_url: "<LOGGREGATOR_URL>"
    nozzle:
      # tags each firehose metric with 'deployment:<DEPLOYMENT_NAME>'
      deployment: "<DEPLOYMENT_NAME>"
      # can be anything (firehose streams data evenly to all jobs using the same subscription_id)
      subscription_id: datadog-nozzle
      # for development only
      # disable_access_control: true
      # for development only; enable if your UAA does not use a verifiable cert
      # insecure_ssl_skip_verify: true
    uaa:
      client: datadog-firehose-nozzle # client name you just configured
      client_secret: "<SECRET_YOU_JUST_CONFIGURED>"
      url: <UAA_URL> # for example, https://uaa.your-cf-domain.com:8443
```

사용 가능한 모든 설정 옵션을 보려면 [Datadog Firehose Nozzle 리포지토리][22]를 점검하세요.

동일한 매니페스트에서 Datadog 노즐 릴리스 이름과 버전을 추가합니다.

```yaml
releases:
    # - name: "<SOME_OTHER_RELEASE>"
    #   version: <x.y.z>
    # ...
    - name: datadog-firehose-nozzle
      version: '<VERSION_YOU_UPLOADED>' # specify the real version (x.y.z not 'latest')
```

어느 `datadog-firehose-nozzle` 릴리스 버전이 이전에 업로드되었는지 확인하려면 `bosh releases`를 실행합니다.

#### 배포 환경 재배포

```text
# BOSH CLI v1
bosh deployment cf-manifest.yml
bosh -n deploy --recreate
# BOSH CLI v2
bosh -n -d cf-manifest -e <BOSH_ENV> deploy --recreate cf-manifest.yml
```

#### Firehose Nozzle이 데이터를 수집하는지 확인

[메트릭 탐색기][23]에서 `cloudfoundry.nozzle`로 시작하는 메트릭을 검색합니다.

{{< img src="integrations/cloud_foundry/cloud-foundry-nozzle-metrics.png" alt="검색창에 cloudfoundry.nozzle이 입력된 Datadog의 메트릭 탐색기" >}}

#### 애플리케이션 메타데이터 접두어 제어

Firehose Nozzle 앱 메트릭에서 애플리케이션 메타데이터 접두어를 활성화하거나 비활성화할 수 있습니다.

{{< img src="integrations/cloud_foundry/enable_metadata_app_prefix.png" alt="메타데이터 앱 메트릭 접두어 활성화가 선택 취소된 Datadog의 통합 타일 설정" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[2]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[3]: https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html
[4]: https://github.com/cloudfoundry/multi-buildpack
[5]: https://github.com/cloudfoundry/multi-buildpack#usage
[6]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html
[7]: https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip
[8]: https://github.com/cf-platform-eng/meta-buildpack
[15]: https://bosh.io/docs/bosh-cli.html
[16]: https://bosh.io/docs/cli-v2.html#install
[17]: https://bosh.io/docs/runtime-config.html#addons
[18]: https://github.com/DataDog/datadog-agent-boshrelease
[19]: https://github.com/DataDog/datadog-agent-boshrelease/blob/master/jobs/dd-agent/spec
[20]: https://app.datadoghq.com/infrastructure/map
[21]: https://github.com/DataDog/datadog-firehose-nozzle-release
[22]: https://github.com/DataDog/datadog-firehose-nozzle-release/blob/master/jobs/datadog-firehose-nozzle/spec
[23]: https://app.datadoghq.com/metric/explorer
[24]: /ko/integrations/system/#metrics
[25]: /ko/integrations/network/#metrics
[26]: /ko/integrations/disk/#metrics
[27]: /ko/integrations/ntp/#metrics
[28]: https://github.com/cloudfoundry/loggregator-api
[29]: https://docs.cloudfoundry.org/running/all_metrics.html
[30]: /ko/profiler/enabling/
[32]: /ko/integrations/faq/pivotal_architecture
[33]: https://github.com/DataDog/datadog-cluster-agent-boshrelease/blob/master/jobs/datadog-cluster-agent/spec
[34]: /ko/containers/cluster_agent/setup/?tab=daemonset#secure-cluster-agent-to-agent-communication
[35]: /ko/containers/cluster_agent/clusterchecks/