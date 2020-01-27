---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/iis/README.md'
display_name: IIS
git_integration_title: iis
guid: 6ad932f0-8816-467a-8860-72af44d4f3ba
integration_id: iis
integration_title: IIS
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: iis.
metric_to_check: iis.uptime
name: iis
public_title: Intégration Datadog/IIS
short_description: Surveillez des métriques globales ou par site ainsi que le statut de disponibilité de chaque site.
support: core
supported_os:
  - windows
---
![Graphique IIS][1]

## Présentation

Recueillez les métriques IIS agrégées par site ou sur l'ensemble vos sites. Le check de l'Agent IIS recueille des métriques sur les connexions actives, les octets envoyés et reçus, le nombre de requêtes par méthode HTTP, et plus encore. Il envoie également un check de service pour chaque site, pour vous informer de sa disponibilité.

## Implémentation

### Installation

Le check IIS est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques IIS, suivez les étapes suivantes :

1. [Installez l'Agent][2] sur vos serveurs IIS.

2. La classe WMI `Win32_PerfFormattedData_W3SVC_WebService` doit être installée sur vos serveurs IIS.
  Pour vous en assurer, utilisez la commande suivante :
  ```
  Get-WmiObject -List -Namespace root\cimv2 | select -Property name | where name -like "*Win32_PerfFormattedData_W3SVC*"
  ```

  Cette classe doit être installée avec la fonctionnalité Windows web-http-common :

  ```
  PS C:\Users\vagrant> Get-WindowsFeature web-* | where installstate -eq installed | ft -AutoSize

  Display Name                       Name               Install State
  ------------                       ----               -------------
  [X] Web Server (IIS)               Web-Server             Installed
  [X] Web Server                     Web-WebServer          Installed
  [X] Common HTTP Features           Web-Common-Http        Installed
  [X] Default Document               Web-Default-Doc        Installed
  [X] Directory Browsing             Web-Dir-Browsing       Installed
  [X] HTTP Errors                    Web-Http-Errors        Installed
  [X] Static Content                 Web-Static-Content     Installed
  ```

  Vous pouvez ajouter les fonctionnalités manquantes avec `install-windowsfeature web-common-http`. Cette opération nécessite un redémarrage du système pour garantir son bon fonctionnement.


### Configuration

Sur vos serveurs IIS, commencez par resynchroniser les compteurs WMI. Sur Windows <= 2003 (ou équivalent), exécutez les commandes suivantes dans cmd.exe :

```
C:/> winmgmt /clearadap
C:/> winmgmt /resyncperf
```

Sur Windows >= 2008 (ou équivalent), exécutez plutôt ce qui suit :

```
C:/> winmgmt /resyncperf
```

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `iis.d/conf.yaml` dans le [dossier `conf.d` de l'Agent][3] à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos données de site IIS. Consultez le [fichier d'exemple iis.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6] pour commencer à envoyer vos métriques IIS à Datadog.

##### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `iis.d/conf.yaml` pour commencer à recueillir vos logs IIS :

    ```yaml
      logs:
          - type: file
            path: C:\inetpub\logs\LogFiles\W3SVC1\u_ex*
            service: myservice
            source: iis
            sourcecategory: http_web_access
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
   Consultez le [fichier d'exemple iis.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][6].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][7] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                  |
|----------------------|------------------------|
| `<NOM_INTÉGRATION>` | `iis`                  |
| `<CONFIG_INIT>`      | vide ou `{}`          |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%"}` |

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][8].

| Paramètre      | Valeur                                            |
|----------------|--------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "iis", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `iis` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "iis" >}}


### Événements
Le check IIS n'inclut aucun événement.

### Checks de service

**iis.site_up** :<br>
L'Agent envoie ce check de service pour chaque site configuré dans `iis.yaml`. Il renvoie `Critical` si l'uptime du site est à zéro, et `OK` dans les autres cas.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/iis/images/iisgraph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/windows/#agent-check-directory-structure
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[8]: https://docs.datadoghq.com/fr/agent/docker/log/
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/iis/metadata.csv
[11]: https://docs.datadoghq.com/fr/help


