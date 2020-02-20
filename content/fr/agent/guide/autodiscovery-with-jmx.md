---
title: Autodiscovery avec JMX
kind: guide
further_reading:
  - link: /agent/autodiscovery/integrations
    tag: Documentation
    text: Créer et charger un modèle d'intégration Autodiscovery
  - link: /agent/autodiscovery/ad_identifiers
    tag: Documentation
    text: Associer un conteneur au modèle d'intégration correspondant
  - link: /agent/autodiscovery/management
    tag: Documentation
    text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
  - link: /agent/autodiscovery/tag
    tag: Documentation
    text: Assigner et recueillir dynamiquement des tags depuis votre application
---
Lorsque l'Agent Datadog utilise des configurations d'intégration basées sur JMX, ces dernières sont parfois trop lourdes pour être incluses dans des étiquettes/annotations Autodiscovery. Il convient alors d'utiliser les [identificateurs de conteneur Autodiscovery][1].

L'exemple d'intégration Datadog/Kafka ci-dessous fait appel à JMX pour recueillir les métriques et à l'Agent Datadog pour les envoyer à Datadog.

### Préparation de l'Agent

{{< tabs >}}
{{% tab "Agent de host" %}}

1. Activez l'intégration Kafka en renommant `conf.yaml.example` en `conf.yaml` dans le [répertoire de l'intégration Kafka][1] : `/etc/datadog-agent/conf.d/kafka.d`

2. Remplacez les valeurs des paramètres dans `conf.yaml` pour adapter la configuration à la logique Autodiscovery :
   Par défaut, les valeurs des paramètres dans les fichiers de configuration correspondent à celles du host. Si vous utilisez l'Agent avec Autodiscovery, faites appel aux [template variables Autodiscovery][2].
   Dans l'exemple suivant, modifiez la valeur du paramètre `host` en la faisant passer de `localhost` à `%%host%%` :

    ```yaml
      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

3. Pour indiquer à l'Agent que vous souhaitez appliquer ce fichier de configuration à vos conteneurs Kafka, configurez le paramètre `ad_identifiers` au début de votre fichier `conf.yaml` :

    ```yaml
      ad_identifiers:
        - CUSTOM_AD_IDENTIFIER

      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

    **Remarque** : l'exemple ci-dessus utilise une valeur personnalisée pour `ad_identifers`, mais vous pouvez spécifier le [nom raccourci de l'image du conteneur][3] si vous le souhaitez.

4. [Activez Autodiscovery sur votre Agent][4].

[1]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: /fr/agent/autodiscovery/template_variables
[3]: https://docs.datadoghq.com/fr/agent/autodiscovery/ad_identifiers/#short-image-container-identifiers
[4]: /fr/agent/autodiscovery/?tab=agent#docker-autodiscovery
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

1. Récupérez les fichiers de configuration `conf.yaml` et `metrics.yaml` associés à l'intégration Datadog/Kafka. Pour ce faire, accédez à votre [répertoire de configuration des intégrations][1]. Vous trouverez ci-dessous la liste des intégrations basées sur JMX ainsi que de leurs fichiers associés :

    | Intégration         | Fichier des métriques        | Fichier de configuration      |
    |---------------------|--------------------|-------------------------|
    | [ActiveMq][2]       | [metrics.yaml][3]  | [conf.yaml.example][4]  |
    | [Cassandra][5]      | [metrics.yaml][6]  | [conf.yaml.example][7]  |
    | [Hive][8]           | [metrics.yaml][9]  | [conf.yaml.example][10] |
    | [Jboss Wildfly][11] | [metrics.yaml][12] | [conf.yaml.example][13] |
    | [Kafka][14]         | [metrics.yaml][15] | [conf.yaml.example][16] |
    | [Solr][17]          | [metrics.yaml][18] | [conf.yaml.example][19] |
    | [Presto][20]        | [metrics.yaml][21] | [conf.yaml.example][22] |
    | [Tomcat][23]        | [metrics.yaml][24] | [conf.yaml.example][25] |

2. Renommez `conf.yaml.example` en `conf.yaml`.
3. Remplacez les valeurs des paramètres dans `conf.yaml` pour adapter la configuration à la logique Autodiscovery :
   Par défaut, les valeurs des paramètres dans les fichiers de configuration correspondent à celles du host. Si vous utilisez l'Agent avec Autodiscovery, faites appel aux [template variables Autodiscovery][26] à la place.
   Dans l'exemple suivant, modifiez la valeur du paramètre `host` en la faisant passer de `localhost` à `%%host%%` :

    ```yaml
      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

4. Pour indiquer à l'Agent que vous souhaitez appliquer ce fichier de configuration à vos conteneurs Kafka, configurez le paramètre `ad_identifiers` au début de votre fichier `conf.yaml` :

    ```yaml
      ad_identifiers:
        - CUSTOM_AD_IDENTIFIER

      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

    **Remarque** : l'exemple ci-dessus utilise une valeur personnalisée pour `ad_identifers`, mais vous pouvez spécifier le [nom raccourci de l'image du conteneur][27] si vous le souhaitez.

5. [Une fois Autodiscovery activé sur votre Agent][28], montez ces fichiers de configuration (`conf.yaml` et `metrics.yaml`) dans le dossier `conf.d/kafka.d/` de votre Agent.
6. (Facultatif) Si vous ne pouvez pas monter ces fichiers dans le conteneur de l'Agent (par exemple si vous utilisez AWS ECS), créez une nouvelle image Docker de l'Agent en y intégrant ces deux fichiers de configuration :

    ```conf
    FROM datadog/agent:latest
    COPY <PATH_JMX_CONF_FILE> conf.d/kafka.d/
    COPY <PATH_JMX_METRICS_FILE> conf.d/kafka.d/
    ```

   Ensuite, utilisez cette nouvelle image personnalisée en tant qu'Agent conteneurisé classique.

[1]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: /fr/integrations/activemq
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[5]: /fr/integrations/cassandra
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[8]: /fr/integrations/hive
[9]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[11]: /fr/integrations/jboss_wildfly
[12]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[14]: /fr/integrations/kafka
[15]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[17]: /fr/integrations/solr
[18]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[20]: /fr/integrations/presto
[21]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[22]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[23]: /fr/integrations/tomcat
[24]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[26]: /fr/agent/autodiscovery/template_variables
[27]: https://docs.datadoghq.com/fr/agent/autodiscovery/ad_identifiers/#short-image-container-identifiers
[28]: /fr/agent/autodiscovery/?tab=containerizedagent#docker-autodiscovery
{{% /tab %}}
{{< /tabs >}}

### Préparation du conteneur

Une fois l'Agent configuré et lancé, utilisez l'étiquette/l'annotation `com.datadoghq.ad.check.id: IDENTIFICATEUR_AD_PERSONNALISÉ` pour votre conteneur Kafka afin d'appliquer la configuration du check via Autodiscovery :

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<NOM_POD>'
  annotations:
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.check.id: 'IDENTIFICATEUR_AD_PERSONNALISÉ'
    # (...)
spec:
  containers:
    - name: '<IDENTIFICATEUR_CONTENEUR>'
# (...)
```

**Remarques** :

* Pour appliquer une configuration spécifique à un conteneur donné, Autodiscovery identifie les conteneurs via leur **nom**, et _non_ via leur image. II cherche à faire correspondre `<IDENTIFICATEUR_CONTENEUR>` à `.spec.containers[0].name`, et non à `.spec.containers[0].image`.
* Si vous définissez directement vos pods Kubernetes (avec `kind: Pod`), ajoutez les annotations de chaque pod directement dans sa section `metadata`. Si vous définissez indirectement les pods avec des ReplicationControllers, des ReplicaSets ou des Deployments, ajoutez les annotations de pod dans `.spec.template.metadata`.

{{% /tab %}}
{{% tab "Docker" %}}

**Dockerfile** :

```yaml
LABEL "com.datadoghq.ad.check.id"= 'IDENTIFICATEUR_AD_PERSONNALISÉ'
```

**docker-compose.yaml** :

```yaml
labels:
  com.datadoghq.ad.check.id: IDENTIFICATEUR_AD_PERSONNALISÉ
```

**Commande d'exécution Docker** :

```shell
-l com.datadoghq.ad.check.id= 'IDENTIFICATEUR_AD_PERSONNALISÉ'
```

**Docker Swarm** :

Pour utiliser le mode Swarm avec Docker Cloud, les étiquettes doivent être appliquées à l'image :

```yaml
version: "1.0"
services:
...
  project:
    image: '<NOM_IMAGE>'
    labels:
      com.datadoghq.ad.check.id: IDENTIFICATEUR_AD_PERSONNALISÉ
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/autodiscovery/ad_identifiers