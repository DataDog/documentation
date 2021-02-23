---
title: Autodiscovery avec JMX
kind: guide
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
---
Tirez profit des annotations Autodiscovery pour les intégrations ou utilisez les identificateurs de conteneur Autodiscovery afin de recueillir les métriques de vos applications JMX à partir de vos pods Kubernetes. Bien que les annotations Autodiscovery constituent la solution recommandée pour configurer l'intégration Datadog/JMX, si l'ensemble des paramètres de configuration est trop long pour rentrer dans des annotations, utilisez plutôt les [identificateurs de conteneur Autodiscovery](#identificateurs-de-conteneur-autodiscovery).

## Annotations Autodiscovery

Les annotations Autodiscovery reposent sur une logique précise. Elles appliquent les éléments de configuration du check JMX à votre pod. L'Agent peut ainsi les découvrir automatiquement et configurer son check JMX en conséquence :

1. [Lancez l'Agent dans votre cluster Kubernetes][1] **avec le nom d'image `gcr.io/datadoghq/agent:latest-jmx`**, au lieu du nom `gcr.io/datadoghq/agent:latest` standard.

2. Appliquez les annotations Autodiscovery aux conteneurs comprenant votre application JMX :

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

      Vous devez créer la variable d'environnement `JAVA_OPTS`, afin que votre serveur JMX autorise l'Agent à se connecter au registre RMI.

      **Remarque** :
      - `<JMX_PORT>` désigne le port qui expose les métriques JMX.
      - Dans l'exemple ci-dessus, la connexion vers le registre RMI ne s'effectue pas via SSL. Si vous souhaitez bénéficier d'une connexion SSL, indiquez `"rmi_registry_ssl": true` dans l'annotation `ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.instances` et supprimez l'option `Dcom.sun.management.jmxremote` correspondante de `JAVA_OPTS`.

Voici la liste des valeurs autorisées par JMX pour le nom d'intégration `<INTEGRATION_NAME>` :

- [activemq][2]
- [cassandra][3]
- [confluent_platform][4]
- [hive][5]
- [jboss_wildfly][6]
- [kafka][7]
- [solr][8]
- [presto][9]
- [tomcat][10]

Ainsi, si vous exécutez une intégration Tomcat qui expose ses métriques JMX sur le port `9012`, vous devez utiliser ce qui suit :

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

## Identificateurs de conteneur Autodiscovery

Si vous devez transmettre une configuration plus complexe pour votre intégration Datadog/JMX, utilisez les [identificateurs de conteneur Autodiscovery][11] pour envoyer un fichier de configuration d'intégration personnalisé ou un fichier `metrics.yaml` personnalisé.

### Préparation de l'Agent

Sélectionnez l'un des onglets ci-dessous selon que votre Agent s'exécute en tant que conteneur dans votre cluster ou directement sur votre host :

{{< tabs >}}
{{% tab "Agent de conteneur" %}}

Si votre Agent s'exécute dans votre cluster et que vous souhaitez découvrir automatiquement votre conteneur afin de recueillir des métriques JMX :

1. Assurez-vous d'exécuter l'image **`gcr.io/datadoghq/agent:latest-jmx`** de l'Agent, et non l'image `gcr.io/datadoghq/agent:latest` standard.

2. Récupérez les fichiers de configuration `conf.yaml` et `metrics.yaml` associés à votre intégration. Vous trouverez ci-dessous la liste des intégrations Datadog basées sur JMX, ainsi que leurs fichiers associés :

    | Nom de l'intégration             | Fichier de métriques       | Fichier de configuration      |
    | ----------------------- | ------------------ | ----------------------- |
    | [activemq][1]           | [metrics.yaml][2]  | [conf.yaml.example][3]  |
    | [cassandra][4]          | [metrics.yaml][5]  | [conf.yaml.example][6]  |
    | [confluent_platform][7] | [metrics.yaml][8]  | [conf.yaml.example][9] |
    | [hive][10]              | [metrics.yaml][11] | [conf.yaml.example][12] |
    | [jboss_wildfly][13]     | [metrics.yaml][14] | [conf.yaml.example][15] |
    | [kafka][16]             | [metrics.yaml][17] | [conf.yaml.example][18] |
    | [solr][19]              | [metrics.yaml][20] | [conf.yaml.example][21] |
    | [presto][22]            | [metrics.yaml][23] | [conf.yaml.example][24] |
    | [tomcat][16]            | [metrics.yaml][25] | [conf.yaml.example][26] |

3. Remplacez le nom du fichier `conf.yaml.example` par `conf.yaml`.

4. Remplacez les valeurs des paramètres du fichier `conf.yaml` en suivant la logique de la fonction Autodiscovery de l'Agent. Les fichiers de configuration possèdent des valeurs de paramètre de host par défaut. Utilisez plutôt la logique des [template variables Autodiscovery][27]. Dans l'exemple de check Tomcat suivant, la valeur `localhost` du paramètre `host` a été remplacée par `%%host%%` :

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

5. Pour indiquer à l'Agent que vous souhaitez appliquer ce fichier de configuration à votre conteneur d'application, définissez un paramètre `ad_identifiers` au début de votre fichier `conf.yaml` :

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

     **Remarque** : l'exemple ci-dessus utilise une valeur personnalisée pour `ad_identifers`, mais vous pouvez définir le [nom raccourci de l'image du conteneur][28] sur `ad_identifiers` si vous le souhaitez.

6. Montez ces fichiers de configuration (`conf.yaml` et `metrics.yaml`) dans le dossier `conf.d/<NOM_INTÉGRATION>.d/` de votre Agent.

7. (Facultatif) Si vous ne pouvez pas monter ces fichiers dans le conteneur de l'Agent (par exemple si vous utilisez AWS ECS), créez une nouvelle image Docker de l'Agent en y intégrant ces deux fichiers de configuration :

    ```conf
    FROM gcr.io/datadoghq/agent:latest-jmx
    COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
    COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
    ```

     Ensuite, utilisez cette nouvelle image personnalisée en tant qu'Agent conteneurisé classique.

[1]: /fr/integrations/activemq/
[2]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[4]: /fr/integrations/cassandra/
[5]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[7]: /fr/integrations/confluent_platform/
[8]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[10]: /fr/integrations/hive/
[11]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[13]: /fr/integrations/jboss_wildfly/
[14]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[16]: /fr/integrations/tomcat/
[17]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[19]: /fr/integrations/solr/
[20]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[21]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[22]: /fr/integrations/presto/
[23]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[24]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[25]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[26]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[27]: /fr/agent/faq/template_variables/
[28]: /fr/agent/guide/ad_identifiers/#short-image-container-identifiers
{{% /tab %}}
{{% tab "Agent de host" %}}

Si votre Agent s'exécute sur un host et que vous souhaitez découvrir automatiquement votre conteneur afin de recueillir des métriques JMX :

1. [Activez Autodiscovery sur votre Agent][1].

2. Activez l'intégration JMX à utiliser en remplaçant le nom du fichier `conf.yaml.example` correspondant par `conf.yaml` dans le [répertoire de l'intégration de l'Agent][2]. Par exemple, pour Tomcat, remplacez le nom `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml.example` par `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml`.

3. Remplacez les valeurs des paramètres du fichier `conf.yaml` en suivant la logique de la fonction Autodiscovery de l'Agent. Les fichiers de configuration possèdent des valeurs de paramètre de host par défaut. Utilisez plutôt la logique des [template variables Autodiscovery][3]. Dans l'exemple de configuration Tomcat suivant, la valeur `localhost` du paramètre `host` a été remplacée par `%%host%%` :

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

4. Pour indiquer à l'Agent que vous souhaitez appliquer ce fichier de configuration à vos conteneurs d'application, définissez un paramètre `ad_identifiers` au début de votre fichier `conf.yaml` :

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

     **Remarque** : l'exemple ci-dessus utilise une valeur personnalisée pour `ad_identifers`, mais vous pouvez définir le [nom raccourci de l'image du conteneur][4] sur `ad_identifiers` si vous le souhaitez.
5. [Redémarrez votre Agent][5].

[1]: /fr/getting_started/agent/autodiscovery/#with-the-agent-on-a-host
[2]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /fr/agent/faq/template_variables/
[4]: /fr/agent/guide/ad_identifiers/#short-image-container-identifiers
[5]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### Préparation du conteneur

#### Docker

Une fois l'Agent configuré et exécuté, utilisez l'étiquette `com.datadoghq.ad.check.id:"<IDENTIFICATEUR_AD_PERSONNALISÉ>"` pour votre conteneur d'application afin d'appliquer la configuration du check via Autodiscovery :

**Dockerfile** :

```yaml
LABEL "com.datadoghq.ad.check.id"= '<IDENTIFICATEUR_AD_PERSONNALISÉ>'
```

**docker-compose.yaml** :

```yaml
labels:
    com.datadoghq.ad.check.id: '<IDENTIFICATEUR_AD_PERSONNALISÉ>'
```

**Commande d'exécution Docker** :

```shell
-l com.datadoghq.ad.check.id= '<IDENTIFICATEUR_AD_PERSONNALISÉ>'
```

**Docker Swarm** :

Pour utiliser le mode Swarm avec Docker Cloud, les étiquettes doivent être appliquées à l'image :

```yaml
version: '1.0'
services:
# ...
project:
    image: '<NOM_IMAGE>'
    labels:
        com.datadoghq.ad.check.id: '<IDENTIFICATEUR_AD_PERSONNALISÉ>'
```

**Remarque** : si l'Agent et votre conteneur JMX se trouvent sur le même pont réseau, vous devez instancier votre serveur JMX avec `-Djava.rmi.server.hostname=<NOM_CONTENEUR>"`, en remplaçant `<NOM_CONTENEUR>` par le nom de votre conteneur d'application JMX.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/
[2]: /fr/integrations/activemq/
[3]: /fr/integrations/cassandra/
[4]: /fr/integrations/confluent_platform/
[5]: /fr/integrations/hive/
[6]: /fr/integrations/jboss_wildfly/
[7]: /fr/integrations/kafka/
[8]: /fr/integrations/solr/
[9]: /fr/integrations/presto/
[10]: /fr/integrations/tomcat/
[11]: /fr/agent/guide/ad_identifiers/