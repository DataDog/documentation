---
kind: faq
title: JMX를 통한 JBoss EAP 7 및 Datadog 모니터링
---

## 개요

KP JBoss EAP 7 클라우드 이미지에서 Datadog를 설치하고 설정하는 방법 및 JMX를 통해 JVM을 모니터링하는 방법을 설명하는 지침입니다.

## 설정

### 전제 조건

Datadog를 설치하고 JBoss EAP 7과 통합하려면 다음 조건을 충족하는지 확인해야 합니다.

* KP의 JBoss EAP 7/RHEL7.5 번들 이미지(C2C 또는 BTO)가 설치되었습니다.
* JBoss EAP 7이 설정되었고 기능합니다.
* NTPD가 설치 및 설정되었으며 사용될 각 시스템에서 실행 중입니다.

### Datadog 에이전트 설치

[CentOS/RedHat에 대한 에이전트 설치 지침을 따릅니다][1].

### JBoss EAP 7 편집

`domain.xml` 파일에 다음 줄을 추가합니다.

사용 중인 프로파일 내에 이러한 줄을 추가하도록 합니다.

`<subsystem xmlns="urn:jboss:domain:jmx:1.3">`의 경우 다음을 추가합니다.

```text
<remoting-connector use-management-endpoint="false"/>
```

`<subsystem xmlns="urn:jboss:domain:remoting:4.0">`의 경우 다음을 추가합니다.

```text
<connector name="remoting-connector" socket-binding="remoting" securityrealm="ApplicationRealm"/>
```

`<socket-binding-group name="full-ha-sockets" default-interface="public">`의 경우 다음을 추가합니다.

```text
<socket-binding name="remoting" port="4447"/>
```

Application Realm에 대해 애플리케이션 사용자 추가

```text
JBoss_EAP_INSTALL_DIR/bin/add_user.sh
```

**참고**: Application Realm에 추가하도록 합니다.

jboss 프로세스를 시작/재시작합니다. `server.log` 파일에서 다음 메시지를 찾습니다.

```text
2018-08-08 16:01:53,354 INFO [org.jboss.as.remoting] (MSC service thread 1-4) WFLYRMT0001: Listening on
xx.xx.xx.xx:4447
```

도메인 설정을 가정하고 `JBoss_EAP_INSTALL_DIR/domain/configuration/application.keystore`가 Datadog ID(644 perms 이상)로 읽기 액세스 권한을 가지고 있도록 합니다.

###Datadog 편집

`/etc/datadog-agent/datadog.yaml` 파일을 편집해 프로세스 수집을 활성화합니다.

```yaml
process_config:
  enabled: "true"
```

`/etc/datadog-agent/conf.d/jmx.d/conf.yaml` 파일을 편집해 jmx 통합을 활성화합니다.

```yaml
init_config:

  custom_jar_paths:
    - JBoss_EAP_INSTALL_LOCATION/bin/client/jboss-cli-client.jar

instances:
  - jmx_url: "service:jmx:remote://{FQDN or IP}:4447"
    user: xxxxxxxx (userid created via jboss add_user.sh)
    password: yyyyyyyy (created via jboss add_user.sh)
    java_bin_path: /etc/alternatives/java
    name: jboss_jmx_instance
    trust_store_path: /apps/jboss/jboss-eap-7.1/domain/configuration/application.keystore
    trust_store_password: password (use password found in domain.xml)
    conf:
      - include:
        domain: my_domain
        bean:
```

그런 다음 Datadog 에이전트를 `Start/restart`합니다][2]. 

마지막으로 [Datadog 에이전트 상태 명령][3]을 실행해 Datadog가 JMX를 통해 JBoss JVM에 연결될 수 있도록 합니다. 다음 출력을 얻어야 합니다.

```text
========
JMXFetch
========
 Initialized checks
08/10/2018 4
 ==================
 jmx
 instance_name : jboss_jmx_instance
 message :
 metric_count : 13
 service_check_count : 0
 status : OK
 Failed checks
 =============
 no checks
```

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=centos
[2]: /ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: /ko/agent/guide/agent-commands/#agent-status-and-information