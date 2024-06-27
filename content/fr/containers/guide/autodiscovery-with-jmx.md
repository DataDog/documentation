---
aliases:
- /fr/agent/guide/autodiscovery-with-jmx
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Créer et charger un modèle d'intégration Autodiscovery
- link: /agent/guide/ad_identifiers/
  tag: Documentation
  text: Associer un conteneur au modèle d'intégration correspondant
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Assigner et recueillir dynamiquement des tags depuis votre application
kind: guide
title: Autodiscovery avec JMX
---

Dans les environnements conteneurisés, il existe quelques différences dans la façon dont lʼAgent se connecte au serveur JMX. La fonctionnalité Autodiscovery permet de configurer ces intégrations de façon dynamique. Utilisez les intégrations basées sur JMX de Datadog pour collecter des métriques sur les applications JMX de vos pods dans Kubernetes. 

Si vous utilisez le traceur Java pour vos applications, vous pouvez également tirer parti de la fonctionnalité de [métriques sur le runtime Java][2] pour envoyer ces métriques à lʼAgent.

## Installation

### Utiliser un Agent compatible avec JMX 
Les utilitaires JMX ne sont pas installés par défaut sur lʼAgent. Pour mettre en place une intégration JMX, ajoutez `-jmx` to your Agent's image tag. For example, `gcr.io/datadoghq/agent:latest-jmx`.

Si vous utilisez Datadog Operator ou Helm, les configurations suivantes ajoutent `-jmx` au tag de l'image de votre Agent :

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



## Configuration

Utilisez l'une des méthodes suivantes :

- [Annotations dʼAutodiscovery](#annotations-d-Autodiscovery) (conseillé)
- [Fichiers de configuration dʼAutodiscovery](#Fichiers-de-configuration-d-autodisovery) : pour une personnalisation poussée des paramètres de configuration.

### Annotations Autodiscovery

Dans cette méthode, une configuration de check JMX est appliquée à vos Pods basés sur Java par le biais d'annotations. Cela permet à lʼAgent de configurer automatiquement le check JMX lorsqu'un nouveau conteneur démarre. Assurez-vous que ces annotations se trouvent sur le Pod créé et non sur l'objet (Deployment, DaemonSet, etc.) qui crée le Pod. 

Utilisez le modèle suivant pour les annotations dʼAutodiscovery :

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: <POD_NAME>
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
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
    - name: '<CONTAINER_IDENTIFIER>'
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

Dans cet exemple :
- `<POD_NAME>` est le nom de votre pod.
- `<CONTAINER_IDENTIFIER>` correspond au conteneur souhaité dans votre pod.
- `<INTEGRATION_NAME>` est le nom de l'intégration JMX souhaitée. Référez-vous à la liste des [intégrations JMX disponibles] (#integrations-JMX-disponibles).
- Définissez `<JMX_PORT>` comme vous le souhaitez, en veillant à ce quʼil y ait une correspondance entre les annotations et `JAVA_OPTS`.

Avec cette configuration, lʼAgent Datadog découvre ce pod et envoie une requête au serveur JMX relative à la [variable de modèle Autodiscovery][3] `%%host%%`. Cette requête se résout en l'adresse IP du module découvert. C'est pourquoi `java.rmi.server.hostname` est défini sur l'adresse `POD_IP` précédemment renseignée avec la [downward API Kubernetes][5].

**Remarque** : la variable dʼenvironnement `JAVA_OPTS` est couramment utilisée dans les images de conteneur basées sur Java comme paramètre de démarrage (par exemple, `java $JAVA_OPTS -jar app.jar`). Si vous utilisez une application personnalisée ou si votre application ne suit pas ce modèle, définissez manuellement ces propriétés du système.


#### Exemple d'annotation : Tomcat
La configuration suivante exécute lʼintégration JMX [Tomcat][81] sur le port `9012` :

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

#### Modèle d'annotation de métrique personnalisée
Si vous devez collecter d'autres métriques à partir de ces intégrations, ajoutez-les à la section `init_config` :

```yaml
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
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

Référez-vous à la documentation relative à [lʼintégration JMX][6] pour en savoir plus sur le formatage de ces métriques.

### Fichiers de configuration Autodiscovery

Si vous devez transmettre une configuration personnalisée plus complexe pour votre intégration Datadog/JMX, vous pouvez utiliser les [identificateurs de conteneur Autodiscovery][1] pour envoyer un fichier de configuration d'intégration personnalisé ou un fichier `metrics.yaml` personnalisé.

#### 2. Composer le fichier de configuration

Pour cette méthode, lʼAgent a besoin d'un fichier de configuration et d'un fichier `metrics.yaml` facultatif afin que les métriques puissent collecter les données. Ces fichiers peuvent être montés dans le pod de lʼAgent ou intégrés dans l'image de conteneur. 

En matière de dénomination du fichier de configuration, on cherche tout d'abord à identifier lʼintégration souhaitée à partir des [étapes préalables des intégrations disponibles] (#integrations-jmx-disponibles). Une fois ce nom déterminé, lʼAgent a besoin d'un fichier de configuration nommé en rapport avec lʼintégration _ou_ dans le répertoire de configuration de lʼintégration. 

Par exemple, pour lʼintégration [Tomcat][81], créez _soit_ :
- `/etc/datadog-agent/conf.d/tomcat.yaml` ou
- `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml`

Si vous utilisez un fichier `metrics.yaml` personnalisé, incluez-le dans le répertoire de configuration de lʼintégration. Par exemple : `/etc/datadog-agent/conf.d/tomcat.d/metrics.yaml`.

Ce fichier de configuration doit inclure `ad_identifiers` :

```yaml
ad_identifiers:
  - "<SHORT_IMAGE>"

init_config:
  is_jmx: true
  conf:
    <METRICS_TO_COLLECT>

instances:
  - host: "%%host%%"
    port: "<JMX_PORT>"
```

Remplacez `<SHORT_IMAGE>` par le nom dʼimage court du conteneur de votre choix. Par exemple, lʼimage de conteneur `gcr.io/CompanyName/my-app:latest` a pour nom dʼimage court `my-app`. Lorsque lʼAgent Datadog découvre ce conteneur, il établit la configuration JMX comme décrit dans ce fichier.

Vous pouvez également spécifier [des identifiants personnalisés pour vos conteneurs][4] et y faire référence si vous ne souhaitez pas vous baser sur le nom court de l'image.

Comme les annotations Kubernetes, les fichiers de configuration peuvent utiliser [les template variables Autodiscovery][3]. Dans ce cas, la configuration `host` utilise `%%host%%` pour résoudre l'adresse IP du conteneur découvert.

Référez-vous à la documentation relative à [lʼintégration JMX][6], ainsi quʼaux [exemples pré-fournis de configurations pour les intégrations](#integrations-jmx-disponibles) pour en savoir plus sur la structuration de votre configuration `init_config` et `instances` pour que la`<METRICS_TO_COLLECT>`.

#### 2. Monter le fichier de configuration
{{< tabs >}}
{{% tab "Operator" %}}

Si vous utilisez Datadog Operator, ajoutez un override :

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
              - "<SHORT_IMAGE>"

            init_config:
              is_jmx: true

            instances:
              - host: "%%host%%"
                port: "<JMX_PORT>"
```

{{% /tab %}}
{{% tab "Helm" %}}

Dans Helm, utilisez l'option `datadog.confd` :

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |
      ad_identifiers:
        - "<SHORT_IMAGE>"

      init_config:
        is_jmx: true

      instances:
        - host: "%%host%%"
          port: "<JMX_PORT>"
```

{{% /tab %}}
{{% tab "Custom image" %}}
Si vous ne pouvez pas monter ces fichiers dans le conteneur de lʼAgent (par exemple, sur Amazon ECS), vous pouvez créer une image Docker de lʼAgent contenant les fichiers de configuration souhaités.

Par exemple :

```Dockerfile
FROM gcr.io/datadoghq/agent:latest-jmx
COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
```

Ensuite, utilisez cette nouvelle image personnalisée comme votre Agent conteneurisé classique.
{{% /tab %}}

{{< /tabs >}}

#### 3. Exposer le serveur JMX
Configurez le serveur JMX de manière à permettre à lʼAgent d'y accéder :

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

## Intégrations JMX disponibles
LʼAgent Datadog est fourni avec plusieurs intégrations JMX préconfigurées.

| Nom de l'intégration         | Fichier de métriques       | Fichier de configuration      |
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

Chaque intégration du tableau ci-dessus possède un fichier `metrics.yaml` prédéfini pour correspondre au modèle attendu des métriques JMX renvoyées par chaque application. Utilisez les intégrations listées comme `<INTEGRATION_NAME>` dans vos annotations ou fichiers de configuration Autodiscovery.

Vous pouvez également utiliser `jmx` comme `<INTEGRATION_NAME>` pour mettre en place une intégration JMX basique et collecter les métriques `jvm.*` par défaut uniquement.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/guide/ad_identifiers/?tab=kubernetes
[2]: /fr/tracing/metrics/runtime_metrics/java/
[3]: /fr/containers/guide/template_variables/
[4]: /fr/containers/guide/ad_identifiers/?tab=kubernetes#custom-autodiscovery-container-identifiers
[5]: https://kubernetes.io/docs/concepts/workloads/pods/downward-api/
[6]: /fr/integrations/java/
[41]: /fr/integrations/activemq/
[42]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[43]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[44]: /fr/integrations/cassandra/
[45]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[46]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[47]: /fr/integrations/confluent_platform/
[48]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[49]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[50]: /fr/integrations/hazelcast/
[51]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/metrics.yaml
[52]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[53]: /fr/integrations/hive/
[54]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[55]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[56]: /fr/integrations/hivemq/
[57]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/metrics.yaml
[58]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[59]: /fr/integrations/hudi/
[60]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/metrics.yaml
[61]: https://github.com/DataDog/integrations-core/blob/master/hudi/datadog_checks/hudi/data/conf.yaml.example
[62]: /fr/integrations/ignite/
[63]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/metrics.yaml
[64]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[66]: /fr/integrations/jboss_wildfly/
[67]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[68]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[69]: /fr/integrations/kafka/
[70]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[71]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[72]: /fr/integrations/presto/
[73]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[74]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[75]: /fr/integrations/solr/
[76]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[77]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[78]: /fr/integrations/sonarqube/
[79]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/metrics.yaml
[80]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/conf.yaml.example
[81]: /fr/integrations/tomcat/
[82]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[83]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[84]: /fr/integrations/weblogic/
[85]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/metrics.yaml
[86]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/conf.yaml.example