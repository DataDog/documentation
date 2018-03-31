---
title: Comment exécuter les commandes JMX dans Windows?
kind: faq
---

Si vous monitorez une application JMX avec un agent Windows, vous pouvez accéder aux mêmes [outils de dépannage](/integrations/java/) que ceux disponibles sur Linux.

Si java est dans votre chemin de fichier, à partir d'un terminal, vous devriez pouvoir exécuter:
```
java -Xms50m -Xmx200m -classpath "C:\Program Files (x86)\Datadog\Datadog Agent\files\jmxfetch\jmxfetch-0.7.0-jar-with-dependencies.jar" org.datadog.jmxfetch.App --check tomcat.yaml --conf_directory "C:\ProgramData\Datadog\conf.d" --log_level DEBUG --reporter console [collect, list_everything, list_collected_attributes, list_matching_attributes, list_not_matching_attributes, list_limited_attributes, help]
```

Assurez-vous que la version de JMXFetch est la même que celle fournie avec votre version de l'agent.

Voici un sous-ensemble du résultat de la commande list_matching_attributes:
```
java -Xms50m -Xmx200m -classpath "C:\Program Files (x86)\Datadog\Datadog Agent\files\jmxfetch\jmxfe
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
