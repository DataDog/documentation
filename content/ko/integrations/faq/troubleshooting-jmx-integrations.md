---
further_reading:
- link: /integrations/java/
  tag: 설명서
  text: Java 통합

title: JMX 통합 트러블슈팅
---

JMX에 액세스 인증을 하려면, JConsole이나 이와 유사한 도구를 이용해 테스트하는 것이 좋습니다. JConsole을 이용해 연결할 수 없는 경우 [이 설명서][1]를 참고해 문제를 해결하세요. 또 내 YAML에 있는 메트릭 목록이 JConsole에 있는 목록과 1:1로 매칭이 되지 않는다면 이를 해결해야 합니다.

<div class="alert alert-warning">
<strong>에이전트 v5.32.8 이상</strong> 버전 전체의 경우, <code>jmxterm</code> JAR이 에이전트에 포함되어 있지 않습니다. <code>jmxterm</code>을 다운로드하고 사용하려면 <a href="https://github.com/jiaqi/jmxterm">업스트림 프로젝트</a>를 참고하세요. 아래 예시에서 <code>/opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar</code>을 업스트림 프로젝트에서 다운로드 받은 <code>jmxterm</code> JAR 경로로 변경하세요.
</div>

JConsole을 이용해 연결할 수 있는 경우에는 다음을 실행하세요.

```text
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:<PORT> -u <USER> -p <PASSWORD>
```

위 명령을 사용해 연결할 수 있는 경우, `beans`을 실행한 후 그 결과 사본을 다음 정보와 함께 [Datadog 지원팀][2]으로 보내주세요.

{{< tabs >}}
{{% tab "에이전트 v6 & v7" %}}

* 다음을 포함한 [에이전트 플레어][1]:
  * [상태 명령][2] 출력.
  * `/var/log/datadog/agent.log` 내용
  * `/var/log/datadog/jmxfetch.log` 내용
  * YAML 통합 복사본.
* `ps aux | grep jmxfetch` 출력
* `sudo -u dd-agent datadog-agent jmx list everything -l debug` 출력(`--flare` 추가에는 버전 6.26.x/7.26.x 플레어 출력 포함).

[1]: /ko/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[2]: /ko/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

* 다음을 포함한 [에이전트 플레어][1]:
  * [정보 명령][2] 출력.
  * `/var/log/datadog/jmxfetch.log` 내용
  * YAML 통합 복사본.
* `ps aux | grep jmxfetch` 출력
* `sudo /etc/init.d/datadog-agent jmx list_everything` 출력

[1]: /ko/agent/troubleshooting/send_a_flare/?tab=agentv5
[2]: /ko/agent/guide/agent-commands/?tab=agentv5#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

**참고**: `jvm.heap_memory`, `jvm.non_heap_memory` 등과 같은 일부 메트릭을 볼 수 있는 경우, JMXFetch가 정상적으로 실행되고 있다는 신호입니다. 다른 애플리케이션을 대상으로 하고 있는데 관련 메트릭을 볼 수 없는 경우에는 YAML이 잘못 구성되었을 가능성이 큽니다.

## 에이전트 트러블슈팅

{{< tabs >}}
{{% tab "에이전트>= v6.2" %}}

다음 명령은 v6.2.0부터 사용할 수 있습니다.

| 명령어                                                | 설명                                                                                                                                                             |
|:-------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo -u dd-agent datadog-agent jmx list matching`     | 인스턴스 구성 중 최소 한 개와 일치하는 속성을 나열합니다.                                                                                                |
| `sudo -u dd-agent datadog-agent jmx list limited`      | 인스턴스 구성 중 하나와 일치하나 수집할 수 있는 메트릭 수 초과 문제로 수집되지 않는 속성을 나열합니다. |
| `sudo -u dd-agent datadog-agent jmx list collected`    | 현재 인스턴스 구성에서 실제로 수집된 속성을 나열합니다.                                                                                    |
| `sudo -u dd-agent datadog-agent jmx list not-matching` | 인스턴스 구성과 일치하지 않는 속성을 나열합니다.                                                                                                   |
| `sudo -u dd-agent datadog-agent jmx list everything`   | JMXFetch에서 지원하는 유형에 해당하며 사용 가능한 속성을 모두 나열합니다.                                                                                                  |
| `sudo -u dd-agent datadog-agent jmx collect`           | 현재 구성을 기반으로 메트릭 수집을 시작하여 콘솔에 표시합니다.                                                                    |

**참조**:

- 기본적으로 이와 같은 명령은 구성된 JMX 점검 모두에서 실행됩니다. 특정 점검에서만 실행되도록 명령을 제한하려면 `--checks`를 사용하세요. 다음 예를 참고하세요.

  ```shell
  sudo -u dd-agent datadog-agent jmx list collected --checks tomcat
  ```

- 에이전트 v6.26.+/ v7.26+의 경우, `--flare`는 위 명령의 출력을 `/var/log/datadog/jmxinfo/` 아래에 쓰며, 플레어에 포함됩니다.

  ```shell
  sudo -u dd-agent datadog-agent jmx list everything -l debug --flare
  ```

{{% /tab %}}
{{% tab "에이전트 v6.0 및 v6.1" %}}

에이전트 6에는 JMXFetch가 포함되어 있고, 아래를 제외한 관련 기능 모두를 지원합니다.

에이전트는 JMXFetch 전체 기능을 모두 갖추고 있지 않기 때문에 JVM 등 수집된 빈(bean) 목록을 디버그하려면 일부 명령을 수동으로 실행해야 합니다. 보통 수동 요청에는 다음과 같은 형식을 이용합니다.

```shell
/usr/bin/java -Xmx200m -Xms50m -classpath /usr/lib/jvm/java-8-oracle/lib/tools.jar:/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch-0.18.2-jar-with-dependencies.jar org.datadog.jmxfetch.App --check <CHECK_LIST> --conf_directory /etc/datadog-agent/conf.d --log_level INFO --log_location /var/log/datadog/jmxfetch.log --reporter console <COMMAND>
```

`<COMMAND>` 위치에는 다음 중 하나가 옵니다.

* `list_everything`
* `list_collected_attributes`
* `list_matching_attributes`
* `list_not_matching_attributes`
* `list_limited_attributes`
* `list_jvms`

또 `<CHECK_LIST>`는 `/etc/datadog-agent/conf.d/` 내 유효한 `yaml` 구성 목록을 나타냅니다. 다음을 예를 참고하세요.

* `cassandra.d/conf.yaml`
* `kafka.d/conf.yaml`
* `jmx.d/conf.yaml`

예시:

```text
/usr/bin/java -Xmx200m -Xms50m -classpath /usr/lib/jvm/java-8-oracle/lib/tools.jar:/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch-0.18.2-jar-with-dependencies.jar org.datadog.jmxfetch.App --check cassandra.d/conf.yaml jmx.d/conf.yaml --conf_directory /etc/datadog-agent/conf.d --log_level INFO --log_location /var/log/datadog/jmxfetch.log --reporter console list_everything
```

**참조**:

- JRE tools.jar 위치의 경우(예시에서는 `/usr/lib/jvm/java-8-oracle/lib/tools.jar`) 시스템 다른 곳에 있을 수 있습니다. `sudo find / -type f -name 'tools.jar'`로 찾을 수 있습니다.
- 대체 JVM 힙 파라미터 `-Xmx`, `-Xms`를 지정하고 싶을 경우, 예시에서 사용된 값이 JMXFetch 기본값이니 참고하세요.

{{% /tab %}}
{{% tab "Agent v5" %}}

| 명령어                                                           | 설명                                                                                                                                                             |
|:------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo /etc/init.d/datadog-agent jmx list_matching_attributes`     | 인스턴스 구성 최소 하나와 일치하는 속성을 나열합니다.                                                                                                |
| `sudo /etc/init.d/datadog-agent jmx list_limited_attributes`      | 인스턴스 구성 중 하나와 일치하나 수집할 수 있는 메트릭 수 초과 문제로 수집되지 않는 속성을 나열합니다. |
| `sudo /etc/init.d/datadog-agent jmx list_collected_attributes`    | 현재 인스턴스 구성 중에서 실제로 수집된 속성을 나열합니다.                                                                                    |
| `sudo /etc/init.d/datadog-agent jmx list_not_matching_attributes` | 인스턴스 구성과 일치하지 않는 속성을 나열합니다.                                                                                                   |
| `sudo /etc/init.d/datadog-agent jmx list_everything`              | JMXFetch에서 지원하는 유형에 해당하며 사용 가능한 속성을 전부 나열합니다.                                                                                                  |
| `sudo /etc/init.d/datadog-agent jmx collect`                      | 현재 구성을 기반으로 메트릭 수집을 시작하여 콘솔에 표시합니다.                                                                    |

{{% /tab %}}
{{% tab "Docker 에이전트" %}}

자동탐지가 JMX 기반 점검을 불러오는지 확인하려면 다음을 사용하세요.

```shell
$ docker exec -it <AGENT_CONTAINER_NAME> agent configcheck
```

에이전트에서 JMX 기반 점검 상태를 확인하려면 다음을 사용하세요.

```shell
$ docker exec -it <AGENT_CONTAINER_NAME> agent status
```

{{% /tab %}}
{{< /tabs >}}

## FAQ

### 메트릭 제한 수 350개

Datadog에서는 최대 350개 메트릭을 수용합니다.
필터를 생성해 수집한 메트릭을 필터링하여 메트릭 수를 350개 이하로 제한하는 것이 좋습니다. 350개보다 더 많은 메트릭이 필요할 경우에는 JMX 구성 파일에서 파라미터를 수정해 이 제한 수를 늘릴 수 있습니다.

[이 제한 수를 늘리려면 Datadog 지원팀에 문의하세요.][2]

### Java 경로

기본 에이전트 설치 파일에는 JVM 번들이 포함되어 있지 않고 시스템에 설치되어 있는 것을 사용합니다. 따라서 에이전트를 실행하는 사용자 경로에 Java 홈 디렉터리가 있는지 확인해야 합니다.

**참고**:

- `gcr.io/datadoghq/agent:latest-jmx` Docker 이미지에는 에이전트가 jmxfetch를 실행하는 데 필요한 JVM이 포함되어 있지 않습니다. 대신 `java_bin_path` 파라미터로 통합 구성 파일에서 JVM 경로를 지정할 수 있습니다.
- JMXFetch에는 유효한 Java 경로 하나만 지정하면 됩니다.

### JVM 메트릭

Datadog의 Java APM 라이브러리는 JMX 통합 없이도 JVM 메트릭을 수집할 수 있습니다. 자세한 정보는 [런타임 메트릭][3]을 참고하세요.

### JBoss 또는 WildFly 애플리케이션 모니터링

다음 지침은 에이전트 v5.6.0+에 적용됩니다.

JBoss/WildFly 애플리케이션은 특정 프로토콜(원격 JMX)을 통해 JMX를 노출하는데, 이 프로토콜은 JMXFetch 기본 번들에 포함되어 있지 않습니다. JMXFetch를 이와 같은 애플리케이션에 연결하려면 다음과 같이 구성하세요.

* JBoss/WildFly 서버에서 `jboss-cli-client.jar` 파일을 찾습니다(기본 경로는 `$JBOSS_HOME/bin/client/jboss-cli-client.jar`).
* JBoss/WildFly 애플리케이션 외 다른 호스트에서 JMXFetch를 실행 중이라면, `jboss-cli-client.jar`를 JMXFetch를 실행 중인 호스트로 복사하세요.
* 구성 `init_config` 섹션에 jar 경로를 추가합니다.

```yaml
  # Datadog Agent >= 5.6.0

  init_config:
    custom_jar_paths:
      - /path/to/jboss-cli-client.jar
```

* 구성 `instances` 섹션에서 JMXFetch를 연결하려는 커스텀 URL을 지정합니다.

```yaml
  # Datadog Agent >= 5.6.0

  # The jmx_url may be different depending on the version of JBoss/WildFly you're using
  # and the way you've set up JMX on your server
  # Refer to the relevant documentation of JBoss/WildFly for more information
  instances:
    - jmx_url: "service:jmx:remote://localhost:4447"
      name: jboss-application  # Mandatory, but can be set to any value,
                               # is used to tag the metrics pulled from that instance
 ```

* [에이전트를 다시 시작합니다][4].

**참고**: `Unable to instantiate or initialize instance <instance_name> for an unknown reason.Parameter 'name' may not be null`와 같은 경고 메시지가 나타나는 경우, Wildfly 사용자를 `$WILDFLY_HOME/bin/add-user.sh -a -u <user> -p <password>`로 설정하고 구성 `instances` 섹션에서 `user`와 `password`를 지정합니다.
```yaml
instances:
  - jmx_url: <jmx_url>
    name: <instance_name>
    user: <username>
    password: <password>
```

### JMX 원격 수명 리스너를 활성화한 상태에서 Tomcat 모니터링하기

다음 지침은 에이전트 v5.6.0+에 적용됩니다.

JMX 원격 수명 리스너를 활성화한 상태에서 Tomcat을 사용하는 중인 경우(자세한 내용은 [Tomcat 설명서][5] 참고), Tomcat 애플리케이션에 연결하기 위해 JMXFetch 추가 설정이 필요합니다.

* Tomcat 서버에서 `catalina-jmx-remote.jar` 파일을 찾습니다(기본 경로는 `$CATALINA_HOME/lib`).
* Tomcat 애플리케이션 외 다른 호스트에서 JMXFetch를 실행 중이라면, `catalina-jmx-remote.jar`를 JMXFetch를 실행 중인 호스트로 복사하세요.
* 구성 `init_config` 섹션에 jar 경로를 추가합니다.

```yaml
# Datadog Agent >= 5.6.0

init_config:
  custom_jar_paths:
    - /path/to/catalina-jmx-remote.jar
```

* 구성 `instances` 섹션에서 JMXFetch를 연결하려는 커스텀 URL을 지정합니다.

```yaml
# Datadog Agent >= 5.6.0

# The jmx_url may be different depending on the way you've set up JMX on your Tomcat server
instances:
  - jmx_url: "service:jmx:rmi://:10002/jndi/rmi://:10001/jmxrmi"
    name: tomcat-application  # Mandatory, but can be set to any arbitrary value,
                              # is used to tag the metrics pulled from that instance
```

* [에이전트를 다시 시작합니다][4].

### SSL 트러블슈팅

JMX가 활성화되고 에이전트 점검에서 Datadog로 메트릭이 잘 전송되면 SSL Socket을 통해 원격 연결을 확보할 수 있습니다.

**참고**: SSL을 통한 JMX 연결 확보에는 JMX 원격 사용자/비밀번호 인증 파일이 반드시 필요합니다. 애플리케이션을 실행할 때 시스템 수준 권한을 사용 중이라면 이 파일을 추가하고 시작할 때 실행하세요.

다음은 [Tomcat 통합][6]의 Datadog 구성 예시입니다.

* [Java 앱 키스토어][7]에 적용할 인증서와 키를 구축합니다.
* `conf.d/tomcat.d`에 있는 Datadog Tomcat `conf.yaml` 파일을 업데이트합니다.

```yaml
instances:
  - host: localhost
    port: 9000
    user: tomcat
    password: tomcat
    name: tomcat_webapp
    trust_store_path: <KEYSTORE_PATH>
    trust_store_password: <KEY_PASSWORD>
```

* [에이전트를 다시 시작합니다][4].

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/faq.html
[2]: /ko/help/
[3]: /ko/tracing/metrics/runtime_metrics/java/
[4]: /ko/agent/guide/agent-commands/#restart-the-agent
[5]: https://tomcat.apache.org/tomcat-7.0-doc/config/listeners.html#JMX_Remote_Lifecycle_Listener_-_org.apache.catalina.mbeans.JmxRemoteLifecycleListener
[6]: https://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html#SSL_and_Tomcat
[7]: http://docs.oracle.com/javase/1.5.0/docs/guide/management/agent.html
