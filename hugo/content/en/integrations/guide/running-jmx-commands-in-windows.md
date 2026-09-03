---
title: Running JMX commands in Windows

aliases:
  - /integrations/faq/how-to-run-jmx-commands-in-windows
---

If you are monitoring a JMX application with a Windows Agent, you can get access to the same [troubleshooting tools][1] that are available on Linux.

If java is in your path, from a command prompt you should be able to run:

```text
java -Xms50m -Xmx200m -classpath "%ProgramFiles%\Datadog\Datadog Agent\files\jmxfetch\jmxfetch-0.7.0-jar-with-dependencies.jar" org.datadog.jmxfetch.App --check tomcat.yaml --conf_directory "C:\ProgramData\Datadog\conf.d" --log_level DEBUG --reporter console [collect, list_everything, list_collected_attributes, list_matching_attributes, list_not_matching_attributes, list_limited_attributes, help]
```

Make sure that the JMXFetch version is the same as the one that ships with your version of the Agent.

Here is a subset of the output from the list_matching_attributes command:

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

[1]: /integrations/java/
