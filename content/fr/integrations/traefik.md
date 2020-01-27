---
aliases: []
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - web
  - Collecte de logs
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/traefik/README.md'
display_name: Traefik
git_integration_title: traefik
guid: 322c0b9d-3ec6-434e-918c-5740f2a114bf
integration_id: traefik
integration_title: Traefik
is_public: true
kind: integration
maintainer: '@renaudhager'
manifest_version: 1.0.0
metric_prefix: traefik.
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

Cette intégration recueille les données de [Traefik][1] afin de vérifier sa santé et de surveiller :

- Les logs d'erreurs (codes 4xx, codes 5xx)
- Le nombre de requêtes
- Le nombre d'octets échangés

## Implémentation

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Traefik sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `traefik`, exécutez :

    ```
    ddev -e release build traefik
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_TRAEFIK_ARTIFACT_>/<TRAEFIK_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

### Configuration

1. Modifiez le fichier `traefik.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][8] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Traefik.
  Consultez le [fichier d'exemple traefik.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

#### Collecte de métriques

Ajoutez cette configuration à votre fichier `traefik.yaml` pour commencer à recueillir vos [métriques][11] :

```
init_config:

instances:
  - host: 10.1.2.3
    port: "8080"
    path: "/health"
```

Options de configuration :

- host : l'endpoint de Traefik à interroger. __Obligatoire__
- port : l'écouteur d'API de l'endpoint Traefik. Valeur par défaut : `8080`. _Facultatif_
- path : chemin de l'endpoint pour le check de santé de Traefik. Par défaut : `/health`. _Facultatif_

[Redémarrez l'Agent][10] pour commencer à envoyer vos métriques Traefik à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

Par défaut, les [logs Traefik][12] sont envoyés à stdout. Nous déconseillons de passer à la version conteneurisée, car l'Agent Datadog peut recueillir directement les logs à partir du conteneur `stdout`/`stderr`.

Pour configurer Traefik et activer l'écriture des logs dans un fichier, ajoutez le code suivant dans le fichier de configuration de Traefik :

```
[traefikLog]
  filePath = "/chemin/vers/traefik.log"
```

Le [format Apache Access standard][13] est utilisé par défaut et pris en charge par cette intégration.

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` avec :

      ```yaml
      logs_enabled: true
      ```


2.  Ajoutez ce bloc de configuration à votre fichier `traefik.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][8] pour commencer à recueillir vos logs Traefik :

      ```yaml
      logs:
        - type: file
          path: /path/to/traefik.log
          source: traefik
          service: traefik
      ```

* Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

* [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande `status` de l'Agent][14] et cherchez `traefik` dans la section Checks.

## Compatibilité

Ce check est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "traefik" >}}


### Événements

Le check Traefik n'inclut aucun événement.

### Checks de service

Lorsque vous interrogez Traefik, le code de statut renvoyé doit être `200`.

## Développement

Consultez la [documentation principale sur les outils de développement][15] pour découvrir comment tester et développer des intégrations reposant sur l'Agent.

[1]: https://traefik.io
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations
[8]: https://docs.datadoghq.com/fr/agent/faq/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/traefik/datadog_checks/traefik/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[11]: https://github.com/DataDog/integrations-extras/blob/master/traefik/metadata.csv
[12]: https://docs.traefik.io/configuration/logs/#traefik-logs
[13]: https://docs.traefik.io/configuration/logs/#clf-common-log-format
[14]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[15]: https://docs.datadoghq.com/fr/developers


