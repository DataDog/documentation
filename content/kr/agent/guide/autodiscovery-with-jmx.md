---
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
kind: 가이드
title: JMX를 활용한 자동탐지
---

통합 자동탐지 어노테이션을 활용하거나 자동탐지 컨테이너 식별자를 사용하여 쿠버네티스(Kubernetes)의 팟에서 JMX 애플리케이션 메트릭을 수집할 수 있습니다. Datadog-JMX 통합을 구성할 때는 자동탐지 어노테이션을 사용하시길 권장합니다. 설정 파라미터 세트가 너무 길어서 어노테이션에 들어가지 않을 경우, [자동탐지 컨테이너 식별자](#autodiscovery-container-identifiers) 메소드를 사용합니다.

## 자동탐지 어노테이션

Agent가 JMX 점검 설정 요소를 "자동으로 탐지"하고 그에 따라 JMX 점검을 설정할 수 있도록, 자동탐지 어노테이션 로직은 어노테이션을 통해 JMX 점검 설정 요소를 팟에 적용합니다.

1. 일반 `gcr.io/datadoghq/agent:latest`이 아닌 **`gcr.io/datadoghq/agent:latest-jmx` 이미지 네임**을 사용하여 [쿠버네티스 클러스터에서 Agent를 시작][1]합니다.

2. JMX 애플리케이션을 포함한 컨테이너에 자동탐지 어노테이션을 적용합니다.

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
        name: <POD_NAME>
        annotations:
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '["<INTEGRATION_NAME>"]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[{"is_jmx": true, "collect_default_metrics": true}]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[{"host": "%%host%%","port":"<JMX_PORT>"}]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[{"source":"<INTEGRATION_NAME>","service":"<INTEGRATION_NAME>"}]'
        # (...)

    spec:
        containers:
            - name: '<CONTAINER_IDENTIFIER>'
            # (...)
              env:
              - name: POD_IP
                valueFrom:
                  fieldRef:
                    fieldPath: status.podIP

              - name: JAVA_OPTS
                value: >-
                  -Xms256m -Xmx6144m
                  -Dcom.sun.management.jmxremote
                  -Dcom.sun.management.jmxremote.authenticate=false
                  -Dcom.sun.management.jmxremote.ssl=false
                  -Dcom.sun.management.jmxremote.local.only=false
                  -Dcom.sun.management.jmxremote.port=<JMX_PORT>
                  -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
                  -Djava.rmi.server.hostname=$(POD_IP)
    ```

   JMX 서버가 Agent의 RMI 레지스트리 접속을 허용하도록 `JAVA_OPTS` 환경 변수를 만들어야 합니다.

      **참조**:
      - `<JMX_PORT>`는 JMX 메트릭을 공개하는 포트를 참조합니다.
      - 위의 사례에서 RMI 레지스트리 접속은 SSL 연결이 아닙니다. SSL을 사용하고 싶은 경우,`ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances` 어노테이션에서 `"rmi_registry_ssl": true`를 사용하고, 대응하는 `Dcom.sun.management.jmxremote`를 `JAVA_OPTS`에서 삭제하세요.

JMX에 대응하는 통합명 `<INTEGRATION_NAME>`의 목록은 다음과 같습니다.

- [activemq][2]
- [cassandra][3]
- [confluent_platform][4]
- [hive][5]
- [jboss_wildfly][6]
- [kafka][7]
- [solr][8]
- [presto][9]
- [tomcat][10]

예를 들어 포트 `9012`에서 JMX 메트릭을 공개하는 tomcat이 있는 경우 다음이 가능합니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: tomcat-test
    annotations:
        ad.datadoghq.com/tomcat.check_names: '["tomcat"]'
        ad.datadoghq.com/tomcat.init_configs: '[{"is_jmx": true, "collect_default_metrics": true}]'
        ad.datadoghq.com/tomcat.instances: '[{"host": "%%host%%","port":"9012"}]'
        ad.datadoghq.com/tomcat.logs: '[{"source":"Tomcat","service":"Tomcat"}]'

spec:
    containers:
        - name: tomcat
          image: tomcat:8.0
          imagePullPolicy: Always
          ports:
              - containerPort: 9012
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP

            - name: JAVA_OPTS
              value: >-
                -Xms256m -Xmx6144m
                -Dcom.sun.management.jmxremote
                -Dcom.sun.management.jmxremote.authenticate=false
                -Dcom.sun.management.jmxremote.ssl=false
                -Dcom.sun.management.jmxremote.local.only=false
                -Dcom.sun.management.jmxremote.port=9012
                -Dcom.sun.management.jmxremote.rmi.port=9012
                -Djava.rmi.server.hostname=$(POD_IP)
```

## 자동탐지 컨테이너 식별자

Datadog-JMX 통합의 복잡한 설정을 전송해야 하는 경우, [자동탐지 컨테이너 식별자][11]를 이용하여 커스텀 통합 설정 파일 또는 커스텀 `metrics.yaml` 파일을 전달합니다.

### Agent 준비

클러스터에서 컨테이너로서 Agent를 실행 중인지, 호스트에서 바로 실행 중인지 선택하세요.

{{< tabs >}}
{{% tab "컨테이너 Agent" %}}

Agent를 클러스터에서 실행 중이며, JMX 메트릭을 수집하기 위해 컨테이너를 자동탐지하는 경우:

1. 일반 `gcr.io/datadoghq/agent:latest` 이미지가 아닌, Agent 이미지 **`gcr.io/datadoghq/agent:latest-jmx`**를 실행하세요.

2. 통합과 관련된 설정 파일 `conf.yaml` 및 `metrics.yaml`을 얻습니다. Datadog-JMX 기반 통합과 관련된 파일 목록은 다음과 같습니다.

    | 통합 이름             | 메트릭 파일       | 설정 파일      |
    | ----------------------- | ------------------ | ----------------------- |
    | [activemq][1]           | [metrics.yaml][2]  | [conf.yaml.example][3]  |
    | [cassandra][4]          | [metrics.yaml][5]  | [conf.yaml.example][6]  |
    | [confluent_platform][7] | [metrics.yaml][8]  | [conf.yaml.example][9] |
    | [hive][10]              | [metrics.yaml][11] | [conf.yaml.example][12] |
    | [jboss_wildfly][13]     | [metrics.yaml][14] | [conf.yaml.example][15] |
    | [kafka][29]             | [metrics.yaml][17] | [conf.yaml.example][18] |
    | [solr][19]              | [metrics.yaml][20] | [conf.yaml.example][21] |
    | [presto][22]            | [metrics.yaml][23] | [conf.yaml.example][24] |
    | [tomcat][16]            | [metrics.yaml][25] | [conf.yaml.example][26] |

3. `conf.yaml.example` 파일 이름을 `conf.yaml`으로 바꿉니다.

4. Agent 자동탐지 로직에 적합하도록 `conf.yaml` 파라미터 값을 대체합니다. 설정 파일에는 기본 호스트 파라미터 값이 있으나, 그 대신 [자동탐지 템플릿 변수][27] 로직을 사용하세요. 다음 Tomcat 점검 예시에서는 `host` 파라미터 값이 `localhost`에서 `%%host%%`로 변경되었습니다.

    ```yaml
    init_config:
        ## @param is_jmx - boolean - required
        ## Whether or not this file is a configuration for a JMX integration.
        #
        is_jmx: true

        ## @param collect_default_metrics - boolean - required
        ## Whether or not the check should collect all default metrics.
        #
        collect_default_metrics: true

    instances:
        ## @param host - string - required
        ## Tomcat JMX hostname to connect to.
        #
        - host: '%%host%%'

          ## @param port - integer - required
          ## Tomcat JMX port to connect to.
          #
          port: 9012
    ```

5. `conf.yaml` 파일의 첫 부분에 `ad_identifiers` 파라미터를 설정하면 해당 설정 파일을 애플리케이션 컨테이너에 적용할 Agent가 지정됩니다.

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

     **참조**: 위의 사례에서는 커스텀 `ad_identifers` 값을 사용하고 있습니다. 단, 필요에 따라서 [컨테이너 숏 이미지][28]를 `ad_identifiers`로 지정할 수 있습니다.

6. 설정 파일(`conf.yaml` 및 `metrics.yaml`)을 `conf.d/<INTEGRATION_NAME>.d/` 폴더에 있는 Agent에 마운트합니다.

7. (선택 사항) - Agent 컨테이너(AWS ECS 등)에 위의 파일을 마운트할 수 없다면 설정 파일 2개를 사용하여 Agent 도커(Docker) 이미지를 재구성해야 합니다.

    ```conf
    FROM gcr.io/datadoghq/agent:latest-jmx
    COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
    COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
    ```

     다음으로 이 새로운 커스텀 이미지를 일반 컨테이너화 Agent로 사용하세요.

[1]: /kr/integrations/activemq/
[2]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[4]: /kr/integrations/cassandra/
[5]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[7]: /kr/integrations/confluent_platform/
[8]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[10]: /kr/integrations/hive/
[11]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[13]: /kr/integrations/jboss_wildfly/
[14]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[16]: /kr/integrations/tomcat/
[17]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[19]: /kr/integrations/solr/
[20]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[21]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[22]: /kr/integrations/presto/
[23]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[24]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[25]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[26]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[27]: /kr/agent/faq/template_variables/
[28]: /kr/agent/guide/ad_identifiers/#short-image-container-identifiers
[29]: /kr/integrations/kafka/
{{% /tab %}}
{{% tab "호스트 Agent" %}}

Agent를 호스트에서 실행 중이며, JMX 메트릭을 수집하기 위해 컨테이너를 자동탐지하는 경우:

1. [Agent에서 자동탐지를 활성화합니다][1].

2. [Agent 통합 디렉터리][2]가 지원하는 `conf.yaml.example` 파일의 이름을 `conf.yaml`로 변경하여 사용하는 JMX 통합을 활성화하세요. 예를 들어 Tomcat의 경우 `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml.example`의 이름을 `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml`로 변경합니다.

3. Agent 자동탐지 로직에 적합하도록 `conf.yaml` 파라미터 값을 대체합니다. 설정 파일에는 기본 호스트 파라미터 값이 있으나, 그 대신 [자동탐지 템플릿 변수][3]를 사용하세요. 다음 Tomcat 설정 예시에서는 `host` 파라미터 값이 `localhost`에서 `%%host%%`로 변경되었습니다.

    ```yaml
    init_config:
        ## @param is_jmx - boolean - required
        ## Whether or not this file is a configuration for a JMX integration.
        #
        is_jmx: true

        ## @param collect_default_metrics - boolean - required
        ## Whether or not the check should collect all default metrics.
        #
        collect_default_metrics: true

    instances:
        ## @param host - string - required
        ## Tomcat JMX hostname to connect to.
        #
        - host: '%%host%%'

          ## @param port - integer - required
          ## Tomcat JMX port to connect to.
          #
          port: 9012
    ```

4. `conf.yaml` 파일의 첫 부분에 `ad_identifiers` 파라미터를 설정하면 해당 설정 파일을 애플리케이션 컨테이너에 적용할 Agent가 지정됩니다.

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

     **참조**: 위의 사례에서는 커스텀 `ad_identifers` 값을 사용하고 있습니다. 단, 필요에 따라서 [컨테이너 숏 이미지][4]를 `ad_identifiers`로 지정할 수 있습니다.
5. [Agent를 재시작합니다][5].

[1]: /kr/getting_started/agent/autodiscovery/#with-the-agent-on-a-host
[2]: /kr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /kr/agent/faq/template_variables/
[4]: /kr/agent/guide/ad_identifiers/#short-image-container-identifiers
[5]: /kr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### 컨테이너 준비

#### 도커(Docker)

Agent를 설정하고 실행한 후, 애플리케이션 컨테이너 `com.datadoghq.ad.check.id:"<CUSTOM_AD_IDENTIFIER>"` 라벨을 사용하여 자동탐지에서 점검 설정을 적용합니다.

**Dockerfile**:

```yaml
LABEL "com.datadoghq.ad.check.id"= '<CUSTOM_AD_IDENTIFIER>'
```

**docker-compose.yaml**:

```yaml
labels:
    com.datadoghq.ad.check.id: '<CUSTOM_AD_IDENTIFIER>'
```

**docker run command**:

```shell
-l com.datadoghq.ad.check.id= '<CUSTOM_AD_IDENTIFIER>'
```

**Docker Swarm**:

도커 클라우드(Docker Cloud)에서 Swarm 모드를 사용한다면 라벨을 이미지에 적용해야 합니다.

```yaml
version: '1.0'
services:
# ...
project:
    image: '<IMAGE_NAME>'
    labels:
        com.datadoghq.ad.check.id: '<CUSTOM_AD_IDENTIFIER>'
```

**참조**: Agent 와 JMX 컨테이너가 같은 네트워크 브리지에 있는 경우, JMX 서버를 `-Djava.rmi.server.hostname=<CONTAINER_NAME>"로 인스턴스화할 필요가 있습니다.여기서 `<CONTAINER_NAME>`는 JMX 애플리케이션 컨테이너명입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/agent/kubernetes/
[2]: /kr/integrations/activemq/
[3]: /kr/integrations/cassandra/
[4]: /kr/integrations/confluent_platform/
[5]: /kr/integrations/hive/
[6]: /kr/integrations/jboss_wildfly/
[7]: /kr/integrations/kafka/
[8]: /kr/integrations/solr/
[9]: /kr/integrations/presto/
[10]: /kr/integrations/tomcat/
[11]: /kr/agent/guide/ad_identifiers/