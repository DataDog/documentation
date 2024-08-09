---
integration_title: Hdfs
is_public: true
custom_kind: integration
short_description: 클러스터 디스크 사용, 볼륨 실패, 데드 DataNodes 추적 more.
---


## HDFS DataNode 통합

![HDFS 대시보드][1]

## 개요

각 HDFS DataNodes에서 디스크 사용과 실패한 볼륨을 추적하세요. 이 에이전트 점검에서는 이와 같은 메트릭은 물론 블록과 캐시 관련 메트릭도 수집합니다.

예전 투인원 점검(hdfs) 말고 이 점검(hdfs_datanode)과 그에 대응하는 점검(hdfs_namenode)을 사용하세요. 이전 점검은 이제 사용되지 않습니다. 

## 구성

호스트에서 실행 중인 에이전트의 경우 다음 지침에 따라 설치하고 구성하세요. 컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][2]에 다음 지침을 적용하는 방법이 안내되어 있습니다.

### 설치

HDFS DataNode 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있기 때문에 DataNodes에 추가 설치가 필요 없습니다.

### 설정

#### 에이전트 연결

<!-- xxx tabs xxx -->
<!-- xxx tab "호스트" xxx -->

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. [에이전트 구성 디렉터리][4] 루트에 있는 `conf.d/` 폴더에서 `hdfs_datanode.d/conf.yaml` 파일을 편집합니다. 사용할 수 있는 구성 옵션 전체를 보려면 [hdfs_datanode.d/conf.yaml 샘플][5]을 참고하세요.

   ```yaml
   init_config:

   instances:
     ## @param hdfs_datanode_jmx_uri - string - required
     ## The HDFS DataNode check retrieves metrics from the HDFS DataNode's JMX
     ## interface via HTTP(S) (not a JMX remote connection). This check must be installed on a HDFS DataNode. The HDFS
     ## DataNode JMX URI is composed of the DataNode's hostname and port.
     ##
     ## The hostname and port can be found in the hdfs-site.xml conf file under
     ## the property dfs.datanode.http.address
     ## https://hadoop.apache.org/docs/r3.1.3/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_datanode_jmx_uri: http://localhost:9864
   ```

2. [에이전트를 재시작합니다][6].

<!-- xxz tab xxx -->
<!-- xxx tab "컨테이너화된 환경" xxx -->

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][2]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                               |
| -------------------- | --------------------------------------------------- |
| `<INTEGRATION_NAME>` | `hdfs_datanode`                                     |
| `<INIT_CONFIG>`      | 비워두거나 `{}`                                       |
| `<INSTANCE_CONFIG>`  | `{"hdfs_datanode_jmx_uri": "http://%%host%%:9864"}` |

#### 로그 수집

**에이전트 >6.0에서 사용 가능**

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 사용하도록 설정합니다.

    ```yaml
      logs_enabled: true
    ```

2. DataNode 로그 수집을 시작하려면 `hdfs_datanode.d/conf.yaml` 파일에 다음 구성 블록을 추가합니다.

    ```yaml
      logs:
        - type: file
          path: /var/log/hadoop-hdfs/*.log
          source: hdfs_datanode
          service: <SERVICE_NAME>
    ```

   `path`와 `service` 파라미터 값을 내 환경에 맞도록 변경합니다.

3. [에이전트를 재시작합니다][6].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### 검증

[에이전트 상태 하위 명령을 실행][7]하고 점검 섹션에서 `hdfs_datanode`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "hdfs_datanode" >}}


### 이벤트

HDFS-datanode 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "hdfs_datanode" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원센터][8]로 연락하세요.

## 참고 자료

- [Hadoop 아키텍처 개요][9]
- [Hadoop 메트릭 모니터링하는 방법][10]
- [Hadoop 메트릭 수집하는 방법][11]
- [Datadog로 Hadoop 모니터링하는 방법][12]




## HDFS NameNode 통합

![HDFS 대시보드][13]

## 개요

주 HDFS NameNodes_와_ 대기 HDFS NameNodes를 모니터링하면 클러스터가 위험한 상태가 될 때 이를 알 수 있습니다. 즉, NameNode가 하나만 남아 있을 때나 클러스터 용량을 추가해야 할 때 등을 알 수 있습니다. 이 에이전트 점검은 남은 용량, 손상되거나 누락된 블록, 데드 DataNodes, 파일 시스템 로드, 적게 복제된 블록, 총 볼륨 실패 수(전체 DataNodes에서) 등과 같은 메트릭을 수집합니다.

예전 투인원 점검(hdfs) 말고 이 점검(hdfs_namenode)과 그에 대응하는 점검(hdfs_datanode)을 사용하세요. 이전 점검은 이제 사용되지 않습니다. 

## 구성

호스트에서 실행 중인 에이전트의 경우 다음 지침에 따라 설치하고 구성하세요. 컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][2]에 다음 지침을 적용하는 방법이 안내되어 있습니다.

### 설치

HDFS NameNode 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있기 때문에 DataNodes에 추가 설치가 필요 없습니다.

### 설정

#### 에이전트 연결

<!-- xxx tabs xxx -->
<!-- xxx tab "호스트" xxx -->

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. [에이전트 구성 디렉터리][4] 루트에 있는 `conf.d/` 폴더에서 `hdfs_namenode.d/conf.yaml` 파일을 편집합니다. 사용할 수 있는 구성 옵션 전체를 보려면 [hdfs_namenode.d/conf.yaml 샘플][14]을 참고하세요.

   ```yaml
   init_config:

   instances:
     ## @param hdfs_namenode_jmx_uri - string - required
     ## The HDFS NameNode check retrieves metrics from the HDFS NameNode's JMX
     ## interface via HTTP(S) (not a JMX remote connection). This check must be installed on
     ## a HDFS NameNode. The HDFS NameNode JMX URI is composed of the NameNode's hostname and port.
     ##
     ## The hostname and port can be found in the hdfs-site.xml conf file under
     ## the property dfs.namenode.http-address
     ## https://hadoop.apache.org/docs/r3.1.3/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_namenode_jmx_uri: http://localhost:9870
   ```

2. [에이전트를 재시작합니다][6].

<!-- xxz tab xxx -->
<!-- xxx tab "컨테이너화된 환경" xxx -->

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][2]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `hdfs_namenode`                                      |
| `<INIT_CONFIG>`      | 비워두거나 `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"hdfs_namenode_jmx_uri": "https://%%host%%:9870"}` |

#### 로그 수집

**에이전트 >6.0에서 사용 가능**

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 사용하도록 설정합니다.

    ```yaml
      logs_enabled: true
    ```

2. NameNode 로그 수집을 시작하려면 `hdfs_namenode.d/conf.yaml` 파일에 다음 구성 블록을 추가합니다.

    ```yaml
      logs:
        - type: file
          path: /var/log/hadoop-hdfs/*.log
          source: hdfs_namenode
          service: <SERVICE_NAME>
    ```

   `path`와 `service` 파라미터 값을 내 환경에 맞도록 변경합니다.

3. [에이전트를 재시작합니다][6].

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### 검증

[에이전트 상태 하위 명령을 실행][7]하고 점검 섹션에서 `hdfs_namenode`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "hdfs_namenode" >}}


### 이벤트

HDFS-namenode 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "hdfs_namenode" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원센터][8]로 연락하세요.

## 참고 자료

- [Hadoop 아키텍처 개요][9]
- [Hadoop 메트릭 모니터링하는 방법][10]
- [Hadoop 메트릭 수집하는 방법][11]
- [Datadog로 Hadoop 모니터링하는 방법][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_datanode/images/hadoop_dashboard.png
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/hdfs_datanode/datadog_checks/hdfs_datanode/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ko/help/
[9]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[10]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[11]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[12]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
[13]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_namenode/images/hadoop_dashboard.png
[14]: https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/datadog_checks/hdfs_namenode/data/conf.yaml.example