---
description: Apprenez à envoyer des logs Azure Event Hubs vers Observability Pipelines
  en utilisant la source Kafka.
disable_toc: false
title: Envoyez des logs Azure Event Hubs vers Observability Pipelines
---
## Présentation {#overview}

Ce document explique comment envoyer des logs Azure Event Hubs vers Observability Pipelines en utilisant la source Kafka. Les étapes de configuration incluent la configuration d'Azure Event Hubs pour la source Kafka :

- [Créer un espace de noms Event Hubs](#create-an-azure-event-hubs-namespace)
- [Créer un Event Hub (topic Kafka)](#create-an-event-hub-kafka-topic)
- [Configurer la stratégie d'accès partagé](#configure-shared-access-policy)
- [Configurer les paramètres de diagnostic](#set-up-diagnostic-settings)
- [Configurer la connexion compatible Kafka pour l'Event Hub](#configure-kafka-compatible-connection-for-the-event-hub)

Une fois Azure Event Hubs configuré, vous [configurez un pipeline avec la source Kafka](#set-up-a-pipeline-with-the-kafka-source) pour envoyer les logs Azure Event Hubs vers Observability Pipelines.

## Configurez Azure Event Hubs pour la source Kafka {#set-up-azure-event-hubs-for-the-kafka-source}

### Créez un espace de noms Azure Event Hubs {#create-an-azure-event-hubs-namespace}

1. Dans le portail Azure, accédez à [Event Hubs](https://portal.azure.com/#browse/Microsoft.EventHub%2Fnamespaces).
1. Cliquez sur **Créer**.
1. Remplissez les **Détails du projet** (abonnement, groupe de ressources) et les **Détails de l'instance** (nom de l'espace de noms, région, sélectionnez le niveau Standard, Premium ou Dédié).
1. Assurez-vous que la région correspond à vos ressources Azure (par exemple, `westus`).
1. Cliquez sur **Vérifier + créer**.

**Remarque** : L'endpoint Kafka est automatiquement activé pour les niveaux standard et supérieurs.

### Créez un Event Hub (topic Kafka) {#create-an-event-hub-kafka-topic}

1. Dans l'espace de noms que vous avez créé, sélectionnez **Event Hubs** et cliquez sur **+ Event Hub**.
1. Entrez un nom (par exemple, `datadog-topic`) et configurez les paramètres (par exemple, 4 partitions et une durée de rétention de 7 jours).
1. Cliquez sur **Vérifier + créer**. Cet Event Hub agit comme un topic Kafka.

### Configurez la stratégie d'accès partagé {#configure-shared-access-policy}

1. Dans l'Event Hub que vous avez créé, accédez à **Paramètres** > **Stratégies d'accès partagé**.
1. Cliquez sur **+ Ajouter**.
1. Entrez un nom de stratégie (par exemple, `DatadogKafkaPolicy`).
1. Cochez la case **Gérer**, ce qui devrait automatiquement cocher les cases **Envoyer** et **Écouter**.
1. Cliquez sur **Créer**.
1. La **Clé primaire** et la **Chaîne de connexion principale** sont nécessaires pour l'authentification Kafka lorsque vous configurez la source Kafka d'Observability Pipelines.

### Configurez les paramètres de diagnostic {#set-up-diagnostic-settings}

1. Configurez les ressources Azure (par exemple, des machines virtuelles, des services d'application) ou les logs d'activité au niveau de l'abonnement pour diffuser les logs vers l'Event Hub.
1. Pour les ressources :
    1. Accédez à la ressource, puis à **Surveillance** > **Paramètres de diagnostic**.
    1. Cliquez sur **+ Ajouter un paramètre de diagnostic**.
    1. Sélectionnez les catégories de logs souhaitées (par exemple, AuditLogs, SignInLogs pour Microsoft Entra ID).
    1. Dans **Détails de la destination** :
        1. Cochez la case **Diffuser vers un Event Hub**.
        1. Sélectionnez l'espace de noms et l'Event Hub (`datadog-topic`).
    1. Cliquez sur **Enregistrer**.
1. Pour les logs d'activité :
    1. Accédez à **Microsoft Entra ID** > **Surveillance** > **Journaux d'audit** > **Paramètres d'exportation des données**.
    1. Cochez la case **Diffuser vers l'Event Hub**.
1. Répétez l'opération pour chaque région. Les logs doivent être diffusés vers des Event Hubs situés dans la même région.

### Configurez une connexion compatible Kafka pour l'Event Hub {#configure-kafka-compatible-connection-for-the-event-hub}

Azure Event Hubs expose un endpoint Kafka à `NAMESPACE.servicebus.windows.net:9093`, qu'Observability Pipelines utilise comme source Kafka.

#### Obtenez l'endpoint Kafka {#get-the-kafka-endpoint}

1. Dans le portail Azure, accédez à votre espace de noms Event Hubs (par exemple, `myeventhubns`).
1. Sur la page **Vue d'ensemble**, sous la section **Essentials**, localisez le **Nom d'host** ou le **Nom de domaine complet (FQDN)**. Il se présente sous le format : `<NAMESPACE>.servicebus.windows.net` (par exemple, `myeventhubns.servicebus.windows.net`).
1. Ajoutez le port Kafka `:9093` pour former la valeur des Bootstrap Servers : `<NAMESPACE>.servicebus.windows.net:9093`
    - Par exemple, si votre espace de noms est `myeventhubns`, le Bootstrap Servers est `myeventhubns.servicebus.windows.net:9093`.
    - Vous aurez besoin de ces informations lors de la configuration de la source Kafka d'Observability Pipelines.

#### Configurez l'authentification {#set-up-authentication}

1. Azure Event Hubs utilise SASL_SSL avec le mécanisme PLAIN pour l'authentification Kafka.
1. La chaîne de connexion est formatée pour Observability Pipelines :
    ```
    Username: $$ConnectionString
    Password: Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>
    ```

## Mettez en place un pipeline avec la source Kafka {#set-up-a-pipeline-with-the-kafka-source}

Sélectionnez votre plateforme.

{{< tabs >}}
{{% tab "Kubernetes" %}}
1. Accédez à [Observability Pipelines](https://app.datadoghq.com/observability-pipelines).
1. Sélectionnez la source Kafka.
    1.  Dans le champ {{< ui >}}Group ID{{< /ui >}}, spécifiez ou créez un groupe de consommateurs unique (par exemple, `datadog-consumer-group`).
    1.  Dans le {{< ui >}}Topics{{< /ui >}} champ, saisissez `datadog-topic` ou le topic que vous avez configuré précédemment pour votre Event Hub.
    1.  Activez le commutateur pour autoriser l'authentification SASL.
    1.  Dans le menu déroulant {{< ui >}}Mechanism{{< /ui >}}, sélectionnez {{< ui >}}PLAIN{{< /ui >}}.
    1.  Activez TLS.
        1. Configurez votre fichier `values.yaml` pour utiliser le certificat qui fonctionne dans le cadre de l'image de conteneur :
            ```
            initContainers:
            - name: copy-config
            image: gcr.io/datadoghq/observability-pipelines-worker:latest
            imagePullPolicy: IfNotPresent
            command: ['/bin/sh', '-c', 'mkdir -p /config-volume/observability-pipelines-worker/config/ && cp /etc/ssl/certs/ca-certificates.crt /config-volume/observability-pipelines-worker/config/ca-certificates.crt']
            volumeMounts:
            - name: config-volume
                mountPath: /config-volume
            extraVolumes:
            - name: config-volume
            emptyDir: {}
            extraVolumeMounts:
            - name: config-volume
            mountPath: /config-volume
            ```
            **Note**: When install the Worker with the install command you need to add:
            ```
            --set env[0].name=DD_OP_DATA_DIR,env[0].value='/config-volume/observability-pipelines-worker/'
            ```
        Dans le 1. In the {{< ui >}}Certificate path{{< /ui >}} champ, saisissez `/ca-certificates.crt` si vous avez utilisé l'exemple ci-dessus. Sinon, saisissez le nom de votre certificat.
    {{< img src="observability_pipelines/sources/kafka_settings.png" alt="Les paramètres de la source Kafka avec des exemples de valeurs" style="width:45%;" >}}
1. Cliquez sur {{< ui >}}Next: Select Destination{{< /ui >}}.
1. Une fois vos destinations et processeurs configurés, cliquez sur {{< ui >}}Next: Install{{< /ui >}}.
1. Sélectionnez votre plateforme dans le menu déroulant {{< ui >}}Choose your installation platform{{< /ui >}}.
1. Saisissez les variables d'environnement pour votre source Kafka :
    1.  Pour {{< ui >}}Kafka Bootstrap Servers{{< /ui >}}, saisissez `<NAMESPACE>.servicebus.windows.net:9093` (par exemple, `myeventhubns.servicebus.windows.net:9093`).
    1.  Pour {{< ui >}}Kafka SASL Username{{< /ui >}}, saisissez `$$$$ConnectionString`. **Remarque** : Vous devez avoir `$$$$` devant `ConnectionString` car `$$$$` finit par être `$$` lorsqu'il est transposé dans l'environnement.
    1.  Pour {{< ui >}}Kafka SASL Password{{< /ui >}}, saisissez la chaîne de connexion complète. Par exemple, `Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>`.
        - Il s'agit de la **chaîne de connexion principale** dans les [stratégies d'accès partagé](#configure-shared-access-policy) de votre instance Event Hub.
    1. Saisissez votre phrase secrète TLS Kafka.
        - Il s'agit de la **clé principale** dans les [stratégies d'accès partagé](#configure-shared-access-policy) de votre instance Event Hub.
    {{< img src="observability_pipelines/sources/kafka_env_vars.png" alt="La page d'installation avec des exemples de valeurs pour les variables d'environnement Kafka" style="width:60%;" >}}
1. Saisissez les variables d'environnement pour vos destinations, le cas échéant.
1. Suivez le reste des instructions sur la page pour installer le Worker en fonction de votre plateforme.
{{% /tab %}}
{{% tab "Machine virtuelle (VM)" %}}

1. Accédez à [Observability Pipelines](https://app.datadoghq.com/observability-pipelines).
1. Sélectionnez la source Kafka.
    1.  Dans le champ {{< ui >}}Group ID{{< /ui >}}, spécifiez ou créez un groupe de consommateurs unique (par exemple, `datadog-consumer-group`).
    1.  Saisissez `datadog-topic` dans le champ {{< ui >}}Topics{{< /ui >}}.
    1.  Activez le commutateur pour autoriser l'authentification SASL.
    1.  Dans le menu déroulant {{< ui >}}Mechanism{{< /ui >}}, sélectionnez {{< ui >}}PLAIN{{< /ui >}}.
    1.  Activez TLS. Pour le certificat, copiez le certificat depuis son emplacement d'origine vers le répertoire de configuration de données par défaut d'Observability Pipelines :
        1. Comme l'Observability Pipelines Worker n'a pas encore été installé, exécutez cette commande pour créer le répertoire du certificat :
            ```
            sudo mkdir -p /var/lib/observability-pipelines-worker/config
            ```
        1. Run this command to copy the certificate to the directory you created:
            ```
            sudo cp /etc/ssl/certs/ca-certificates.crt /var/lib/observability-pipelines-worker/config/
            ```
        1. In the {{< ui >}}Certificate path{{< /ui >}} champ, saisissez `/ca-certificates.crt`.
    {{< img src="observability_pipelines/sources/kafka_settings_vm.png" alt="Les paramètres de la source Kafka avec des exemples de valeurs" style="width:45%;" >}}
1. Cliquez sur {{< ui >}}Next: Select Destination{{< /ui >}}.
1. Une fois vos destinations et processeurs configurés, cliquez sur {{< ui >}}Next: Install{{< /ui >}}.
1. Sélectionnez votre plateforme dans le menu déroulant {{< ui >}}Choose your installation platform{{< /ui >}}.
1. Saisissez les variables d'environnement pour votre source Kafka :
    1.  Pour {{< ui >}}Kafka Bootstrap Servers{{< /ui >}}, saisissez `<NAMESPACE>.servicebus.windows.net:9093` (par exemple, `myeventhubns.servicebus.windows.net:9093`).
    1.  Pour {{< ui >}}Kafka SASL Username{{< /ui >}}, saisissez `\$\$ConnectionString`. **Remarque** : Vous devez échapper le `$` devant `ConnectionString`, sinon la variable d'environnement ne sera pas chargée.
    1.  Pour {{< ui >}}Kafka SASL Password{{< /ui >}}, saisissez la chaîne de connexion complète entre guillemets (`"`). Par exemple, `"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`.
        - Il s'agit de la **chaîne de connexion principale** dans les [stratégies d'accès partagé](#configure-shared-access-policy) de votre instance Event Hub.
    1. Saisissez votre phrase secrète TLS Kafka.
        - Il s'agit de la **clé principale** dans les [stratégies d'accès partagé](#configure-shared-access-policy) de votre instance Event Hub.
    {{< img src="observability_pipelines/sources/kafka_env_vars_vm.png" alt="La page d'installation avec des exemples de valeurs pour les variables d'environnement Kafka" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes après l'installation du Worker, vérifiez votre fichier d'environnement Observability Pipelines (`/etc/default/observability-pipelines-worker`) pour vous assurer que les variables d'environnement sont correctement définies :

- `DD_OP_SOURCE_KAFKA_SASL_USERNAME="$$ConnectionString"`
- `DD_OP_SOURCE_KAFKA_BOOTSTRAP_SERVERS=<NAMESPACE>.servicebus.windows.net:9093`
- `DD_OP_SOURCE_KAFKA_SASL_PASSWORD=<Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>>`
- `DD_OP_SOURCE_KAFKA_KEY_PASS=password`

### Variable d'environnement manquante {#missing-environment-variable}

Si vous voyez l'erreur `Missing environment variable DD_OP_SOURCE_KAFKA_SASL_PASSWORD` et que vous exécutez le Worker dans une VM, assurez-vous que la variable est entre guillemets (`"`) lorsque vous exécutez le script d'installation du Worker. Exemple :

```
DD_OP_SOURCE_KAFKA_SASL_PASSWORD=`"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`
```

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][1] et les [métriques de tampon source][2] émises par toutes les sources, consultez la documentation [Pipelines Usage Metrics][3]. Puisque vous utilisez la source Kafka pour envoyer des logs d'Azure Event Hubs vers Observability Pipelines, utilisez le tag `component_type:kafka` pour filtrer les métriques pertinentes.

[1]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[2]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/