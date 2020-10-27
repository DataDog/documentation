---
integration_title: Journald
kind: integration
public_title: Intégration Datadog/Journald
categories:
  - log collection
description: Transférer vos logs du journal à Datadog
short_description: Transférer vos logs du journal à Datadog
has_logo: true
is_public: true
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/journald.md'
name: journald
ddtype: check
supported_os:
  - linux
further_reading:
  - link: logs/guide/docker-logs-collection-troubleshooting-guide
    tag: Documentation
    text: Collecte de logs avec Docker
---
## Présentation

Systemd-journald est un service système qui recueille et stocke des données de journalisation. Il crée et entretient des journaux structurés et indexés à partir d'informations de journalisation envoyées par différentes sources.

## Configuration

### Installation

Par défaut, les fichiers journal appartiennent au groupe système `systemd-journal`, qui peut également les lire. Pour commencer à recueillir vos logs journal, vous devez :

1. [Installer l'Agent][1] sur l'instance qui exécute le journal
2. Ajouter l'utilisateur `dd-agent` au groupe `systemd-journal` en exécutant la commande :

```text
usermod -a -G systemd-journal dd-agent
```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

Modifiez le fichier `journald.d/conf.yaml` dans le dossier `conf.d/` de l'Agent à la racine du répertoire de votre Agent.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

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

Pour renseigner les attributs `source` et `service`, l'Agent recueille `SYSLOG_IDENTIFIER` , `_SYSTEMD_UNIT` et `_COMM` puis les définit sur la première valeur non vide. Pour tirer parti des pipelines d'intégration, Datadog recommande de définir le paramètre `SyslogIdentifier` directement dans le fichier du service `systemd` ou dans un fichier de remplacement du service `systemd`. Le fichier du service `systemd` dépend de votre distribution, mais vous pouvez le localiser avec la commande `systemctl show -p FragmentPath <nom_unité>`.

**Remarque** : pour l'Agent 7.17+, si `container_mode` est défini sur `true`, le comportement par défaut change pour les logs provenant de conteneurs Docker. L'attribut `source` de vos logs est automatiquement défini sur le nom raccourci de l'image correspondante du conteneur au lieu de simplement prendre pour valeur `docker`.

Pour terminer, [redémarrez l'Agent][1].

[1]: /fr/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                                  |
| -------------- | ------------------------------------------------------ |
| `<CONFIG_LOG>` | `{"source": "journald", "service": "<NOM_VOTRE_APPLICATION>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}



#### Fonctions avancées

##### Changer l'emplacement du journal

Par défaut, l'Agent recherche le journal aux emplacements suivants :

- `/var/log/journal`
- `/var/run/journal`

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

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/help/