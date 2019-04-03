---
categories:
  - sécurité
  - monitoring
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/aqua/README.md'
display_name: Aqua
git_integration_title: aqua
guid: c269dad1-8db2-4e91-b25d-af646e80dbbf
integration_id: aqua
integration_title: Aqua
is_public: true
kind: integration
maintainer: oran.moshai@aquasec.com
manifest_version: 1.0.0
metric_prefix: aqua.
metric_to_check: ''
name: aqua
public_title: Intégration Datadog/Aqua
short_description: 'Solution complète de sécurité pour les applications cloud natives et conteneurs, du développement à la production'
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille [Aqua][1].

Le check Aqua prévient l'utilisateur lorsque le niveau global de vulnérabilité dépasse un seuil élevé ou si un conteneur s'exécute au sein d'un host non enregistré par Aqua. Aqua envoit également des alertes de données relatives aux événements bloqués durant l'exécution. Vous pouvez également déclencher un webhook afin de faire évoluer votre infrastructure si jamais d'autres scanneurs Aqua sont requis.

## Implémentation

Le check Aqua n'est pas inclus avec le paquet de l'[Agent Datadog][2] : vous devez donc
l'installer.

### Installation

Pour installer le check Aqua sur votre host :

1. Installez le [kit de développement][8] sur n'importe quelle machine.
2. Exécutez `ddev release build aqua` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][2].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w path/to/aqua/dist/<NOM_ARTEFACT>.whl`.

### Configuration

1. Modifiez le fichier `aqua.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent] (https://docs.datadoghq.com/agent/faq/agent-configuration-files/#agent-configuration-directory) pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Aqua.
  Consultez le [fichier d'exemple conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques

1. Ajoutez ce bloc de configuration à votre fichier `aqua.d/conf.yaml` pour commencer à recueillir vos [métriques Aqua](#metriques) :

```
instances:
  - url: http://votre-instance-aqua.com
    api_user: <nomutilisateur_api>
    password: <motdepasse_utilisateur_api>
```

Modifiez les valeurs des paramètres `api_user` et `password` et configurez-les pour votre environnement.

[Redémarrez l'Agent][4].

#### Collecte de logs

Aqua génère deux types de logs :

* Des logs d'audit
* Des logs d'exécution

Pour recueillir des logs d'audit Aqua :

1. Connectez-vous à votre compte Aqua.
2. Accédez à la section `Log Management` de la page `Integration`.
3. Activez l'intégration Webhook.
4. Ajoutez ensuite l'endpoint suivant : `https://http-intake.logs.datadoghq.com/v1/input/<CLÉ_API_DATADOG>?ddsource=aqua`.

* Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog](https://app.datadoghq.com/account/settings#api).
* *Remarque* : pour les pays de l'UE, remplacez `.com` par `.eu` dans l'endpoint.

Pour les logs d'exécution Aqua (**Disponible à partir des versions > 6.0 de l'Agent**) :

* La collecte des logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans votre [configuration DaemonSet](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/#log-collection) :

```
(...)
  env:
    (...)
    - name: DD_LOGS_ENABLED
        value: "true"
    - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
        value: "true"
(...)
```

* Assurez-vous que le socket Docker est monté sur l'Agent Datadog comme dans [ce manifeste](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/#create-manifest).

* [Redémarrez l'Agent][4].


### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `aqua` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "aqua" >}}


### Checks de service

**aqua.can_connect**:

Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à Aqua pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

### Événements

Aqua ne comprend aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://www.aquasec.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/aqua/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/
[8]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit


{{< get-dependencies >}}