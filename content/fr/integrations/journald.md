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
name: journald
ddtype: check
supported_os:
  - linux
---
## Présentation

Systemd-journald est un service système qui recueille et stocke des données de journalisation. Il crée et entretient des journaux structurés et indexés à partir d'informations de journalisation envoyées par différentes sources.

## Implémentation

### Installation

Par défaut, les fichiers journaux appartiennent au groupe système `systemd-journal`, qui peut également les lire. Pour commencer à recueillir les logs de vos journaux, vous devez :

1. [Installer l'Agent][1] sur l'instance qui exécute le journal
2. Ajouter l'utilisateur `dd-agent` au groupe `systemd-journal` en exécutant la commande :

```
usermod -a -G systemd-journal dd-agent
```

### Configuration

Créez le fichier `journald.d/conf.yaml` dans le dossier `conf.d/` de l'Agent à la racine du répertoire de votre Agent.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` avec la commande :

```
logs_enabled: true
```

Ajoutez ensuite ce bloc de configuration à votre fichier `journald.d/conf.yaml` pour commencer à recueillir vos logs :

```
logs:
  - type: journald
```

Pour terminer, [redémarrez l'Agent][2].

#### Fonctions avancées

##### Changer l'emplacement du journal

Par défaut, l'Agent recherche le journal aux emplacements suivants :

* `/var/log/journal`
* `/var/run/journal`

Si votre journal est situé ailleurs, ajoutez un paramètre `path` en indiquant le chemin du journal correspondant.

##### Filtrer les unités de journal

Il est possible de filtrer des unités précises par inclusion ou exclusion grâce aux paramètres suivants :

* `include_units` : inclut toutes les unités précisées.
* `exclude_units`: exclut toutes les unités précisées.

Exemple :

```
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

Pour terminer, [redémarrez l'Agent][2].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

## Pour aller plus loin

Consultez [notre blog][4] pour en savoir plus sur la surveillance d'infrastructure et sur toutes les autres intégrations Datadog.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[3]: /fr/help
[4]: https://www.datadoghq.com/blog