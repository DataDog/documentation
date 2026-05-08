---
algolia:
  tags:
  - JMX
  - JMX 메트릭
  - 누락된 웹 로직
  - JMX 제한
  - Cassandra
  - Kafka
  - Tomcat
  - WebLogic
aliases:
- /ko/agent/guide/autodiscovery-with-jmx
description: Autodiscovery 템플릿을 사용하여 컨테이너화된 Java 애플리케이션용 JMX 기반 통합 구성
further_reading:
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 자동탐지 통합 템플릿 생성 및 불러오기
- link: /agent/guide/ad_identifiers/
  tag: 설명서
  text: 해당하는 통합 템플릿과 컨테이너 매치하기
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: Agent 자동탐지에 포함할 컨테이너 관리하기
- link: /agent/kubernetes/tag/
  tag: 설명서
  text: 애플리케이션에서 동적으로 태그를 할당하고 수집하기
title: JMX를 활용한 자동탐지
---

컨테이너 환경에서는 Agent가 JMX 서버에 연결하는 방식에 몇 가지 차이점이 있습니다. Autodiscovery 기능을 사용하면 이러한 통합을 동적으로 설정할 수 있습니다. Datadog의 JMX 기반 통합을 사용하여 Kubernetes 포드에서 JMX 애플리케이션 메트릭을 수집하세요.

애플리케이션에 Java 트레이서를 사용하는 경우 [Java 런타임 메트릭][2] 기능을 활용하여 해당 메트릭을 Agent로 보낼 수도 있습니다.

## 설치

### JMX 지원 Agent 사용
JMX 유틸리티는 기본적으로 Agent에 설치되지 않습니다. JMX 통합을 설정하려면 Agent의 이미지 태그에 `-jmx`을 추가하세요. (예: `gcr.io/datadoghq/agent:latest-jmx`)

Datadog Operator 또는 Helm을 사용하는 경우 다음과 같이 구성하면 Agent의 이미지 태그에 `-jmx`를 추가할 수 있습니다.

{{< tabs >}}
{{% tab "Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      image:
        jmxEnabled: true
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
agents:
  image:
    tagSuffix: jmx
```
{{% /tab %}}
{{< /tabs >}}



## 설정

다음 메서드 중 하나를 사용하세요.

- [Autodiscovery 주석](#autodiscovery-annotations)(권장)
- [Autodiscovery 구성 파일](#autodiscovery-configuration-files): 구성 파라미터를 세부적으로 조정

### 자동탐지 어노테이션

이 메서드에서는 Java 기반 포드에 주석을 사용하여 JMX 점검 구성을 적용합니다. 이를 통해 Agent는 새 컨테이너가 시작될 때 JMX 점검을 자동으로 구성할 수 있습니다. 이러한 주석은 포드를 생성하는 객체(Deployment, DaemonSet 등)가 아니라 생성된 포드에 있어야 합니다.

Autodiscovery 주석에는 다음 템플릿을 사용하세요.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: <POD_NAME>
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": {
            "is_jmx": true,
            "collect_default_metrics": true
          },
          "instances": [{
            "host": "%%host%%",
            "port": "<JMX_PORT>"
          }]
        }
      }
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
      # (...)
      env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        - name: JAVA_OPTS
          value: >-
            -Dcom.sun.management.jmxremote
            -Dcom.sun.management.jmxremote.authenticate=false
            -Dcom.sun.management.jmxremote.ssl=false
            -Dcom.sun.management.jmxremote.local.only=false
            -Dcom.sun.management.jmxremote.port=<JMX_PORT>
            -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
            -Djava.rmi.server.hostname=$(POD_IP)
```

이 예시에서:
- `<POD_NAME>`은 포드 이름입니다.
- `<CONTAINER_NAME>`는 포드 내의 원하는 컨테이너와 일치합니다.
- `<INTEGRATION_NAME>`는 원하는 JMX 통합의 이름입니다. [사용 가능한 JMX 통합](#available-jmx-integrations) 목록을 확인하세요.
- 주석과 `JAVA_OPTS` 사이에 일치한다면 원하는 대로 `<JMX_PORT>`를 설정하세요.

이 구성을 사용하면 Datadog Agent가 해당 포드를 검색하고 `%%host%%`[Autodiscovery 템플릿 변수][3]를 기준으로 JMX 서버에 요청을 보냅니다. 이 요청은 검색된 포드의 IP 주소로 확인됩니다. 따라서 `java.rmi.server.hostname`이 이전에 [Kubernetes Downward API][5]를 통해 입력된 `POD_IP` 주소로 설정됩니다.

**참고**: `JAVA_OPTS` 환경 변수는 Java 기반 컨테이너 이미지에서 시작 파라미터로 일반적으로 사용됩니다(예: `java $JAVA_OPTS -jar app.jar`). 사용자 지정 애플리케이션을 사용하거나 애플리케이션이 이 패턴을 따르지 않는 경우 이러한 시스템 속성을 수동으로 설정하세요.


#### 예제 주석: Tomcat
다음 구성은 포트 `9012`에 [Tomcat][81] JMX 통합을 실행합니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: tomcat-test
  annotations:
    ad.datadoghq.com/tomcat.checks: |
      {
        "tomcat": {
          "init_config": {
            "is_jmx": true,
            "collect_default_metrics": true
          },
          "instances": [{
            "host": "%%host%%",
            "port": "9012"
          }]
        }
      }
spec:
  containers:
    - name: tomcat
      image: tomcat:8.0
      imagePullPolicy: Always
      ports:
        - name: jmx-metrics
          containerPort: 9012
      env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        - name: JAVA_OPTS
          value: >-
            -Dcom.sun.management.jmxremote
            -Dcom.sun.management.jmxremote.authenticate=false
            -Dcom.sun.management.jmxremote.ssl=false
            -Dcom.sun.management.jmxremote.local.only=false
            -Dcom.sun.management.jmxremote.port=9012
            -Dcom.sun.management.jmxremote.rmi.port=9012
            -Djava.rmi.server.hostname=$(POD_IP)
```

#### 사용자 정의 메트릭 주석 템플릿
이 통합에서 추가 메트릭을 수집해야 하는 경우 `init_config` 섹션에 추가하세요.

```yaml
ad.datadoghq.com/<CONTAINER_NAME>.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": {
        "is_jmx": true,
        "collect_default_metrics": true,
        "conf": [{
          "include": {
            "domain": "java.lang",
            "type": "OperatingSystem",
            "attribute": {
               "FreePhysicalMemorySize": {
                 "metric_type": "gauge",
                 "alias": "jvm.free_physical_memory"
               } 
            }
          }
        }]
      },
      "instances": [{
        "host": "%%host%%",
        "port": "<JMX_PORT>"
      }]
    }
  }
```          

이 메트릭의 형식에 관한 자세한 내용은 [JMX 통합][6] 문서를 참고하세요.

### Autodiscovery 구성 파일

Datadog-JMX 통합에 보다 복잡한 사용자 정의 구성을 전달해야 하는 경우 [Autodiscovery Container Identifiers][1]를 사용하여 사용자 정의 `metrics.yaml` 파일뿐만 아니라 사용자 정의 통합 구성 파일도 전달할 수 있습니다.

#### 1. 구성 파일 작성

이 메서드를 사용하려면 Agent에 구성 파일과 메트릭 수집을 위한 `metrics.yaml` 파일(선택 사항)이 필요합니다. 이러한 파일은 Agent 포드에 마운트하거나 컨테이너 이미지에 포함시킬 수 있습니다.

구성 파일 명명 규칙은 먼저 [사용 가능한 통합의 필수 단계](#available-jmx-integrations)에서 원하는 통합 이름을 식별하는 것입니다. 이 이름이 확정되면 해당 통합과 관련된 이름의 구성 파일 _또는_ 통합의 설정 디렉터리 내에 있는 구성 파일이 Agent에 필요합니다.

예를 들어, [Tomcat][81] 통합은 다음  _둘 중 하나_를 생성합니다.
- `/etc/datadog-agent/conf.d/tomcat.yaml` 또는
- `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml`

사용자 정의 `metrics.yaml` 파일을 사용하는 경우 통합의 config 디렉터리에 포함하세요. (예: `/etc/datadog-agent/conf.d/tomcat.d/metrics.yaml`.)

이 구성 파일에는 `ad_identifiers`가 포함되어야 합니다.

```yaml
ad_identifiers:
  - <CONTAINER_IMAGE>

init_config:
  is_jmx: true
  conf:
    <METRICS_TO_COLLECT>

instances:
  - host: "%%host%%"
    port: "<JMX_PORT>"
```

`<CONTAINER_IMAGE>`를 원하는 컨테이너의 짧은 이미지 이름으로 바꾸세요. 예를 들어, 컨테이너 이미지 `gcr.io/CompanyName/my-app:latest`의 짧은 이미지 이름은 `my-app`입니다. Datadog Agent는 해당 컨테이너를 발견하면 이 파일에 설명된 대로 JMX 구성을 설정합니다.

짧은 이미지 이름을 기준으로 하지 않으려면, [컨테이너에 사용자 지정 식별자][4]를 지정하여 참조할 수 있습니다.

Kubernetes 주석과 마찬가지로 구성 파일도 [Autodiscovery 템플릿 변수][3]를 사용할 수 있습니다. 이 경우 `host` 구성은 검색된 컨테이너의 IP 주소를 확인하기 위해 `%%host%%`를 사용합니다.

`<METRICS_TO_COLLECT>`의 `init_config` 및 `instances` 구성을 구조화하는 방법은 [JMX 통합][6] 문서(및 [사전 제공된 통합 예시 구성](#available-jmx-integrations)을 참고하세요.

#### 2. 구성 파일 마운트
{{< tabs >}}
{{% tab "Operator" %}}

Datadog Operator를 사용하는 경우 재정의를 추가하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      image:
        jmxEnabled: true
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IMAGE>

            init_config:
              is_jmx: true

            instances:
              - host: "%%host%%"
                port: "<JMX_PORT>"
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm에서는 `datadog.confd` 옵션을 사용하세요.

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |
      ad_identifiers:
        - <CONTAINER_IMAGE>

      init_config:
        is_jmx: true

      instances:
        - host: "%%host%%"
          port: "<JMX_PORT>"
```

{{% /tab %}}
{{% tab "사용자 정의 이미지" %}}
이러한 파일을 Agent 컨테이너(예: Amazon ECS)에 마운트할 수 없다면, 원하는 구성 파일이 포함된 Agent Docker 이미지를 빌드할 수 있습니다.

예시:

```Dockerfile
FROM gcr.io/datadoghq/agent:latest-jmx
COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
```

그런 다음 이 새로운 커스텀 이미지를 일반 컨테이너화된 Agent로 사용하세요.
{{% /tab %}}

{{< /tabs >}}

#### 3. JMX 서버 노출
Agent가 액세스할 수 있도록 JMX 서버를 설정합니다.

```yaml
spec:
  containers:
    - # (...)
      env:
      - name: POD_IP
        valueFrom:
          fieldRef:
            fieldPath: status.podIP
      - name: JAVA_OPTS
        value: >-
          -Dcom.sun.management.jmxremote
          -Dcom.sun.management.jmxremote.authenticate=false
          -Dcom.sun.management.jmxremote.ssl=false
          -Dcom.sun.management.jmxremote.local.only=false
          -Dcom.sun.management.jmxremote.port=<JMX_PORT>
          -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
          -Djava.rmi.server.hostname=$(POD_IP)   
```          

## 사용 가능한 JMX 통합
Datadog Agent에는 미리 구성된 여러 JMX 통합이 포함되어 있습니다.

| 통합 이름         | 메트릭 파일       | 설정 파일      |
|--------------------------|--------------------|-------------------------|
| [activemq][41]           | [metrics.yaml][42] | [conf.yaml.example][43] |
| [cassandra][44]          | [metrics.yaml][45] | [conf.yaml.example][46] |
| [confluent_platform][47] | [metrics.yaml][48] | [conf.yaml.example][49] |
| [hazelcast][50]          | [metrics.yaml][51] | [conf.yaml.example][52] |
| [hive][53]               | [metrics.yaml][54] | [conf.yaml.example][55] |
| [hivemq][56]             | [metrics.yaml][57] | [conf.yaml.example][58] |
| [hudi][59]               | [metrics.yaml][60] | [conf.yaml.example][61] |
| [ignite][62]             | [metrics.yaml][63] | [conf.yaml.example][64] |
| [jboss_wildfly][66]      | [metrics.yaml][67] | [conf.yaml.example][68] |
| [kafka][69]              | [metrics.yaml][70] | [conf.yaml.example][71] |
| [presto][72]             | [metrics.yaml][73] | [conf.yaml.example][74] |
| [solr][75]               | [metrics.yaml][76] | [conf.yaml.example][77] |
| [sonarqube][78]          | [metrics.yaml][79] | [conf.yaml.example][80] |
| [tomcat][81]             | [metrics.yaml][82] | [conf.yaml.example][83] |
| [weblogic][84]           | [metrics.yaml][85] | [conf.yaml.example][86] |

위 표의 각 통합에는 애플리케이션별로 반환되는 JMX 메트릭의 예상 패턴과 일치하도록 미리 정의된 `metrics.yaml` 파일이 있습니다. 안내된 통합의 이름을 Autodiscovery 주석이나 구성 파일에서 `<INTEGRATION_NAME>`으로 사용하세요.

또는 `jmx`를 `<INTEGRATION_NAME>`으로 사용하여 기본 JMX 통합을 설정하고 기본 `jvm.*` 메트릭만 수집할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/guide/ad_identifiers/?tab=kubernetes
[2]: /ko/tracing/metrics/runtime_metrics/java/
[3]: /ko/containers/guide/template_variables/
[4]: /ko/containers/guide/ad_identifiers/?tab=kubernetes#custom-autodiscovery-container-identifiers
[5]: https://kubernetes.io/docs/concepts/workloads/pods/downward-api/
[6]: /ko/integrations/java/
[41]: /ko/integrations/activemq/
[42]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[43]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[44]: /ko/integrations/cassandra/
[45]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[46]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[47]: /ko/integrations/confluent_platform/
[48]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[49]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[50]: /ko/integrations/hazelcast/
[51]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/metrics.yaml
[52]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[53]: /ko/integrations/hive/
[54]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[55]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[56]: /ko/integrations/hivemq/
[57]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/metrics.yaml
[58]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[59]: /ko/integrations/hudi/
[60]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/metrics.yaml
[61]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example
[62]: /ko/integrations/ignite/
[63]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/metrics.yaml
[64]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[66]: /ko/integrations/jboss_wildfly/
[67]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[68]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[69]: /ko/integrations/kafka/
[70]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[71]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[72]: /ko/integrations/presto/
[73]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[74]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[75]: /ko/integrations/solr/
[76]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[77]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[78]: /ko/integrations/sonarqube/
[79]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/metrics.yaml
[80]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/conf.yaml.example
[81]: /ko/integrations/tomcat/
[82]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[83]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[84]: /ko/integrations/weblogic/
[85]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/metrics.yaml
[86]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/conf.yaml.example