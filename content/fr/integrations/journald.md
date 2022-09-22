---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/journald/README.md'
display_name: journald
draft: false
git_integration_title: journald
guid: 845431ef-9092-4254-a188-138fc9273fa5
integration_id: journald
integration_title: journald
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: journald.
metric_to_check: ''
name: journald
public_title: journald
short_description: Surveillez vos logs systemd-journald avec Datadog.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Systemd-journald est un service système qui recueille et stocke des données de journalisation.
Il crée et entretient des journaux structurés et indexés à partir d'informations de journalisation provenant de différentes sources.

## Configuration

### Installation

Le check journalid est inclus avec le package de l'[Agent Datadog][1].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Par défaut, les fichiers journal appartiennent au groupe système systemd-journal, qui peut également les lire. Pour commencer à recueillir vos logs journal, suivez les étapes suivantes :

1. [Installez l'Agent][2] sur l'instance qui exécute le journal.
2. Ajoutez l'utilisateur `dd-agent` au groupe `systemd-journal` en exécutant la commande :
    ```text
     usermod -a -G systemd-journal dd-agent
    ```

{{< tabs >}}
{{% tab "Host" %}}

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

Modifiez le fichier `journald.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos logs.

#### Collecte de logs

La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` avec la commande :

```yaml
logs_enabled: true
```

Ajoutez ensuite ce bloc de configuration à votre fichier `journald.d/conf.yaml` pour commencer à recueillir vos logs :

```yaml
logs:
    - type: journald
      container_mode: true
```

Pour renseigner les attributs `source` et `service`, l'Agent recueille `SYSLOG_IDENTIFIER`, `_SYSTEMD_UNIT` et `_COMM`, puis les définit sur la première valeur non vide. Pour tirer parti des pipelines d'intégration, Datadog recommande de définir le paramètre `SyslogIdentifier` directement dans le fichier du service `systemd` ou dans un fichier de remplacement du service `systemd`. Leur emplacement dépend de votre distribution. Toutefois, vous pouvez localiser le fichier du service `systemd` avec la commande `systemctl show -p FragmentPath <nom_unité>`.

**Remarque** : pour l'Agent 7.17+, si `container_mode` est défini sur `true`, le comportement par défaut change pour les logs provenant de conteneurs Docker. L'attribut `source` de vos logs est automatiquement défini sur le nom raccourci de l'image correspondante du conteneur, au lieu de simplement prendre pour valeur `docker`.

[Redémarrez l'Agent][2].


{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][5] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

#### Collecte de logs


La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][6].

| Paramètre      | Valeur                                                  |
| -------------- | ------------------------------------------------------ |
| `<CONFIG_LOG>` | `{"source": "journald", "service": "<NOM_VOTRE_APPLICATION>"}` |

{{% /tab %}}
{{< /tabs >}}


#### Fonctions avancées

##### Changer l'emplacement du journal

Par défaut, l'Agent recherche le journal aux emplacements suivants :

- `/var/log/journal`
- `/run/log/journal`

Si votre journal est situé ailleurs, ajoutez un paramètre `path` en indiquant le chemin du journal correspondant.

##### Filtrer les unités de journal

Il est possible d'inclure ou d'exclure des unités spécifiques à l'aide des paramètres suivants :

- `include_units` : inclut toutes les unités précisées.
- `exclude_units` : exclut toutes les unités précisées.

Exemple :

```yaml
logs:
    - type: journald
      path: /var/log/journal/
      include_units:
          - docker.service
          - sshd.service
```

##### Recueillir des tags de conteneur

Il est essentiel d'utiliser des tags pour trouver des informations dans des environnements conteneurisés particulièrement dynamiques. C'est pourquoi l'Agent peut recueillir des tags de conteneur dans des logs journald.

Cette collecte est automatique lorsque l'Agent est exécuté à partir du host. Si vous utilisez la version conteneurisée de l'Agent Datadog, montez le chemin de votre journal et le fichier suivant :

- `/etc/machine-id` : cette commande permet à l'Agent d'interroger le journal stocké sur le host.

### Validation

Lancez la [sous-commande status][3] de l'Agent et cherchez `journald` dans la section Logs Agent.

## Données collectées

### Métriques

journald n'inclut aucune métrique.

### Checks de service

journald n'inclut aucun check de service.

### Événements

journald n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/