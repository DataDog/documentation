---
aliases:
- /ko/integrations/faq/how-to-run-jmx-commands-in-windows
title: Windows에서 JMX 명령 실행하기
---

Windows 에이전트로 JMX 애플리케이션을 모니터링하는 중이라면 Linux에서 사용할 수 있는 [트러블슈팅 도구][1]를 사용할 수 있습니다.

경로에 Java가 있다면 명령 프롬프트에서 다음을 실행할 수 있습니다.

```text
java -Xms50m -Xmx200m -classpath "%ProgramFiles%\Datadog\Datadog Agent\files\jmxfetch\jmxfetch-0.7.0-jar-with-dependencies.jar" org.datadog.jmxfetch.App --check tomcat.yaml --conf_directory "C:\ProgramData\Datadog\conf.d" --log_level DEBUG --reporter console [collect, list_everything, list_collected_attributes, list_matching_attributes, list_not_matching_attributes, list_limited_attributes, help]
```

JMXFetch 버전이 에이전트 버전에 포함되어 있는 버전과 동일한 것인지 확인하세요.

다음은 list_matching_attributes 명령 출력의 하위 집합입니다.

```text
java -Xms50m -Xmx200m -classpath "%ProgramFiles%\Datadog\Datadog Agent\files\jmxfetch\jmxfe
tch-0.7.0-jar-with-dependencies.jar" org.datadog.jmxfetch.App --check tomcat.yaml --conf_directory "C:\ProgramData\Datad
og\conf.d" --log_level DEBUG --reporter console list_matching_attributes
Log location is not set, not logging to file

#####################################
Instance: localhost:9012
#####################################

       Matching: 1/350. Bean name: Catalina:j2eeType=Servlet,WebModule=//localhost/examples,name=numberwriter,J2EEApplication=none,J2EEServer=none - Attribute name: requestCount  - Attribute type: int
       Matching: 2/350. Bean name: Catalina:j2eeType=Servlet,WebModule=//localhost/examples,name=numberwriter,J2EEApplication=none,J2EEServer=none - Attribute name: processingTime  - Attribute type: long
       Matching: 3/350. Bean name: Catalina:j2eeType=Servlet,WebModule=//localhost/examples,name=numberwriter,J2EEApplication=none,J2EEServer=none - Attribute name: errorCount  - Attribute type: int
       Matching: 4/350. Bean name: Catalina:j2eeType=Servlet,WebModule=//localhost/host-manager,name=HostManager,J2EEApplication=none,J2EEServer=none - Attribute name: requestCount  - Attribute type: int
       Matching: 5/350. Bean name: Catalina:j2eeType=Servlet,WebModule=//localhost/host-manager,name=HostManager,J2EEApplication=none,J2EEServer=none - Attribute name: processingTime  - Attribute type: long
       Matching: 6/350. Bean name: Catalina:j2eeType=Servlet,WebModule=//localhost/host-manager,name=HostManager,J2EEApplication=none,J2EEServer=none - Attribute name: errorCount  - Attribute type: int
       Matching: 7/350. Bean name: Catalina:j2eeType=Servlet,WebModule=//localhost/manager,name=default,J2EEApplication=none,J2EEServer=none - Attribute name: requestCount  - Attribute type: int
       Matching: 8/350. Bean name: Catalina:j2eeType=Servlet,WebModule=//localhost/manager,name=default,J2EEApplication=none,J2EEServer=none - Attribute name: processingTime  - Attribute type: long
       Matching: 9/350. Bean name: Catalina:j2eeType=Servlet,WebModule=//localhost/manager,name=default,J2EEApplication=none,J2EEServer=none - Attribute name: errorCount  - Attribute type: int
[...]
```

[1]: /ko/integrations/java/