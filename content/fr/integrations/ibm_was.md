---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    IBM_WAS: assets/dashboards/overview.json
  logs:
    source: ibm_was
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- web
- os & system
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_was/README.md
display_name: IBM WAS
draft: false
git_integration_title: ibm_was
guid: ba177bb7-1bad-4ea8-ac59-1bc8a016f4f7
integration_id: ibm-was
integration_title: IBM WAS
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ibm_was.
metric_to_check: ibm_was.can_connect
name: ibm_was
public_title: Intégration Datadog/IBM WAS
short_description: IBM Websphere Application Server est un framework utilisé pour
  héberger des applications Java.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [IBM Websphere Application Server (WAS)][1] avec l'Agent Datadog. Il est compatible avec IBM WAS versions >= 8.5.5.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

L'intégration Datadog/IBM WAS permet de recueillir les compteurs PMI activés depuis l'environnement WebSphere Application Server. Son implémentation nécessite d'activer le servlet PerfServlet, qui offre un moyen à Datadog de récupérer les données de performance issues de WAS.

Par défaut, ce check recueille les métriques associées à JDBC, à la JVM, au pool de threads et au gestionnaire de sessions du servlet. Il est également possible de recueillir des métriques supplémentaires en les spécifiant dans la section « custom_queries ». Consultez le [fichier d'exemple de configuration du check][3] pour découvrir des exemples.

### Installation

Le check IBM WAS est inclus avec le package de l'[Agent Datadog][4].

#### Activer `PerfServlet`

Le fichier .ear du servlet (PerfServletApp.ear) est situé dans le répertoire `<WAS_HOME>/installableApps`, où `<WAS_HOME>` correspond au chemin d'installation de WebSphere Application Server.

Le servlet de performance se déploie de la même manière que tout autre servlet. Déployez-le sur une instance unique du serveur d'application au sein du domaine.

**Remarque** : depuis la version 6.1, vous devez activer la sécurité des applications pour faire fonctionner PerfServlet.

### Modifier l'ensemble de statistiques surveillé

Par défaut, votre serveur d'application est uniquement configuré pour la surveillance « Basic ». Pour gagner en visibilité sur votre JVM, vos connexions JDBC et vos connexions servlet, remplacez la valeur de l'ensemble de statistiques surveillé pour votre serveur d'application « Basic » par « All ».

Depuis la console d'administration de WebSphere, vous pouvez accéder à ce réglage depuis `Application servers > <VOTRE_SERVEUR_APP> > Performance Monitoring Infrastructure (PMI)`.

Une fois ce changement effectué, cliquez sur « Apply » pour enregistrer la configuration et redémarrer votre serveur d'application. Les métriques JDBC, JVM et servlet supplémentaires apparaissent quelques instants plus tard dans Datadog.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `ibm_was.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance IBM WAS. Consultez le [fichier d'exemple ibm_was.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Modifiez ensuite `ibm_was.d/conf.yaml` en supprimant la mise en commentaire des lignes `logs` en bas du fichier. Mettez à jour la ligne `path` en indiquant le bon chemin vers vos fichiers de log WAS.

   ```yaml
   logs:
     - type: file
       path: /opt/IBM/WebSphere/AppServer/profiles/InfoSphere/logs/server1/*.log
       source: ibm_was
       service: websphere
   ```

3. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `ibm_was`                                                                     |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                 |
| `<CONFIG_INSTANCE>`  | `{"servlet_url": "http://%%host%%:%%port%%/wasPerfTool/servlet/perfservlet"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                                |
| -------------- | ---------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "ibm_was", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `ibm_was` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ibm_was" >}}


### Événements

IBM WAS n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "ibm_was" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].


[1]: https://www.ibm.com/cloud/websphere-application-platform
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/help/