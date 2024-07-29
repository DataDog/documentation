---
aliases: []
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- web
- Collecte de logs
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/traefik/README.md
display_name: Traefik
draft: false
git_integration_title: traefik
guid: 322c0b9d-3ec6-434e-918c-5740f2a114bf
integration_id: traefik
integration_title: Traefik
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: '@renaudhager'
manifest_version: 1.0.0
metric_prefix: traefik.
metric_to_check: traefik.total_status_code_count
name: traefik
public_title: Intégration Datadog/Traefik
short_description: recueille les métriques traefik
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Envoyez des métriques, logs et traces [Traefik][1] à Datadog pour surveiller vos services Traefik.

## Configuration

Le check Traefik n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Traefik sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-traefik==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Procédure à suivre

{{< tabs >}}
{{% tab "v2" %}}

#### À propos de la v2
Pour en savoir plus sur les modifications apportées entre la v1 et la v2, consultez le [guide de migration de Traefik][1]. Pour en savoir plus sur la dernière version, consultez la [documentation de Traefik][2] (en anglais).

#### Collecte de métriques

Pour envoyer des [métriques Traefik][4] à Datadog, consultez la [documentation de Traefik][3].

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

Par défaut, les [logs Traefik][5] sont envoyés à stdout. Nous vous déconseillons de modifier ce paramètre avec la version conteneurisée, car l'Agent Datadog peut recueillir directement les logs à partir du conteneur `stdout`/`stderr`.

1. Si vous souhaitez [configurer Traefik pour que les logs soient écrits dans un fichier][5], ajoutez le code suivant dans le fichier de configuration de Traefik :

   ```conf
    log:
      filePath: "/path/to/traefik.log"
    ```

   Le [format Apache Access standard][6] est utilisé par défaut et pris en charge par cette intégration.

2. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` avec :

   ```yaml
   logs_enabled: true
   ```

3. Ajoutez ce bloc de configuration à votre fichier `traefik.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos logs Traefik :

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

      Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

4. [Redémarrez l'Agent][8].

#### Collecte de traces

1. Si besoin, [activez l'APM][9] pour Datadog.
2. Pour envoyer des [traces][11] à Datadog, consultez la [documentation de Traefik][10].

[1]: https://doc.traefik.io/traefik/v2.0/migration/v1-to-v2/
[2]: https://doc.traefik.io/traefik/
[3]: https://doc.traefik.io/traefik/observability/metrics/datadog/
[4]: https://doc.traefik.io/traefik/observability/metrics/overview/
[5]: https://doc.traefik.io/traefik/observability/logs/#filepath
[6]: https://doc.traefik.io/traefik/observability/logs/#format
[7]: https://docs.datadoghq.com/fr/agent/faq/agent-configuration-files/#agent-configuration-directory
[8]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[9]: https://docs.datadoghq.com/fr/getting_started/tracing/#enable-apm
[10]: https://doc.traefik.io/traefik/observability/tracing/datadog/
[11]: https://doc.traefik.io/traefik/observability/tracing/overview/
{{% /tab %}}
{{% tab "v1" %}}

#### À propos de la v1

Pour en savoir plus sur la v1, consultez la [documentation de Traefik][1]. Pour en savoir plus sur les modifications apportées entre la v1 et la v2, consultez le [guide de migration de Traefik][2]. 

#### Collecte de métriques

1. Pour recueillir des [métriques][2] Traefik, ouvrez le fichier `traefik.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. 

2. Ajoutez cette configuration à votre fichier `traefik.d/conf.yaml` pour commencer à recueillir vos [métriques][2] :

    ```yaml
    init_config:

    instances:
    - host: 10.1.2.3
        port: "8080"
        path: "/health"
        scheme: "http"
    ```

    Options de configuration :

    - host : l'endpoint de Traefik à interroger. **Obligatoire**
    - port : l'écouteur d'API de l'endpoint Traefik. Valeur par défaut : `8080`. _Facultatif_
    - path : chemin de l'endpoint pour le check de santé de Traefik. Par défaut : `/health`. _Facultatif_
    - scheme : schéma de l'endpoint pour le check de santé de Traefik. Valeur par défaut : `http`. _Facultatif_

3. [Redémarrez l'Agent][4] pour commencer à envoyer vos métriques Traefik à Datadog.

Consultez le [fichier d'exemple traefik.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

Par défaut, les [logs Traefik][6] sont envoyés à stdout. Nous vous déconseillons de modifier ce paramètre avec la version conteneurisée, car l'Agent Datadog peut recueillir directement les logs à partir du conteneur `stdout`/`stderr`.

1. Si vous souhaitez [configurer Traefik pour que les logs soient écrits dans un fichier][6], ajoutez le code suivant dans le fichier de configuration de Traefik :

    ```conf
    [traefikLog]
    filePath = "/path/to/traefik.log"
    ```

   Le [format Apache Access standard][7] est utilisé par défaut et pris en charge par cette intégration.

2. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` avec :

   ```yaml
   logs_enabled: true
   ```

3. Ajoutez ce bloc de configuration à votre fichier `traefik.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos logs Traefik :

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

      Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

4. [Redémarrez l'Agent][4].

#### Collecte de traces

**Disponible pour Traefik v1.7+**

1. Si besoin, [activez l'APM][8] pour Datadog.
2. Pour envoyer des traces à Datadog, consultez la [documentation de Traefik][9].

[1]: https://doc.traefik.io/traefik/v1.7/
[2]: https://github.com/DataDog/integrations-extras/blob/master/traefik/metadata.csv
[3]: https://docs.datadoghq.com/fr/agent/faq/agent-configuration-files/#agent-configuration-directory
[4]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/traefik/datadog_checks/traefik/data/conf.yaml.example
[6]: https://doc.traefik.io/traefik/v1.7/configuration/logs/#traefik-logs
[7]: https://doc.traefik.io/traefik/v1.7/configuration/logs/#clf-common-log-format
[8]: https://docs.datadoghq.com/fr/getting_started/tracing/#enable-apm
[9]: https://doc.traefik.io/traefik/v1.7/configuration/tracing/#datadog
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `traefik` dans la section Checks.

## Compatibilité

Ce check est compatible avec toutes les principales plateformes.

**Métriques**

Pour la v2, consultez la liste des [métriques Traefik][6] envoyées à Datadog.

Pour la v1, consultez la liste des [métriques][7] fournies par l'intégration.

## Données collectées

### Métriques
{{< get-metrics-from-git "traefik" >}}


### Événements

Le check Traefik n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "traefik" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].


[1]: https://traefik.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[6]: https://doc.traefik.io/traefik/observability/metrics/overview/
[7]: https://docs.datadoghq.com/fr/integrations/traefik/#metrics
[8]: https://docs.datadoghq.com/fr/help