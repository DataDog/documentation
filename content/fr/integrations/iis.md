---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
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
short_description: Surveillez des métriques globales ou par site ainsi que le statut de disponibilité de chaque site. status.
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

1. [Installez l'Agent][3] sur vos serveurs IIS.

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

Modifiez le fichier `iis.d/conf.yaml` dans le [dossier `conf.d/` de l'Agent][4] à la racine du [répertoire de configuration de votre Agent][5].

#### Préparer IIS

Sur vos serveurs IIS, commencez par resynchroniser les compteurs WMI.

Sur Windows <= 2003 (ou équivalent), exécutez le code suivant dans cmd.exe :

```
C:/> winmgmt /clearadap
C:/> winmgmt /resyncperf
```

Sur Windows >= 2008 (ou équivalent), exécutez plutôt ce qui suit :

```
C:/> winmgmt /resyncperf
```

#### Collecte de métriques

 * Ajoutez ce bloc de configuration à votre fichier `iis.d/conf.yaml` pour commencer à recueillir vos [métriques IIS](#metriques) :

```
init_config:

instances:
  - host : . # « . » correspond au host actuel
  # sites :  # pour surveiller des sites précis ou pour recueillir des métriques par site
  #   - exemple.com
  #   - dev.exemple.com
```

Utilisez l'option `sites` pour recueillir des métriques par site. Lors de la configuration, l'Agent recueille des métriques pour chaque site de votre liste et indique le nom du site correspondant dans un tag. Si vous ne configurez pas `sites`, l'Agent recueille les mêmes métriques, mais leurs valeurs correspondent aux totaux de l'ensemble des sites.

Vous pouvez également surveiller des sites sur des serveurs IIS distants. Consultez le [fichier d'exemple iis.d/conf.yaml][6] pour découvrir les options de configuration pertinentes. Par défaut, ce check est exécuté sur une seule instance : la machine actuelle sur laquelle l'Agent s'exécute. Il vérifie les compteurs de performance WMI pour IIS sur cette machine.

Si vous souhaitez vérifier également d'autres machines à distance, vous pouvez ajouter une instance par host.
Remarque : si vous tenez également à vérifier les compteurs sur la machine actuelle, vous devrez créer une instance avec des paramètres vides.

Le paramètre facultatif `provider` permet d'ajouter un fournisseur WMI (défini sur `32` par défaut pour l'Agent Datadog 32 bits ou `64` pour la version 64 bits). Il est utilisé pour demander des données WMI auprès du fournisseur choisi. Options disponibles : `32` ou `64`. Pour en savoir plus, [consultez cet article MSDN][7].

Le paramètre `sites` vous permet de préciser la liste des sites pour lesquels vous souhaitez lire les métriques. Si vous précisez des sites, un tag correspondant au nom du site sera ajouté aux métriques. Si vous ne définissez aucun site, le check extraira les valeurs agrégées sur tous les sites.

Voici un exemple de configuration qui vérifie la machine actuelle ainsi qu'une machine à distance du nom de MONSERVEURDISTANT. Pour le host à distance, nous extrayons uniquement les métriques du site par défaut.

```
- host: .
  tags:
    - myapp1
  sites:
    - Site Web par défaut
- host: MONSERVEURDISTANT
  username: MONSERVEURDISTANT\fred
  password: monmotdepassesecret
  is_2008: false
```

* `is_2008` (facultatif) - REMARQUE : en raison d'une faute de frappe dans IIS6/7 (généralement dans W2K8) où TotalBytesTransferred est écrit TotalBytesTransfered par perfmon, vous devrez peut-être activer cette option pour récupérer les métriques IIS dans cet environnement.

* Consultez le [fichier d'exemple iis.yaml][6] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][8] pour commencer à envoyer vos métriques IIS à Datadog.

#### Collecte de logs

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
   Consultez le [fichier d'exemple iis.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `iis` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "iis" >}}


### Événements
Le check IIS n'inclut aucun événement.

### Checks de service

**iis.site_up** :<br>
L'Agent envoie ce check de service pour chaque site configuré dans `iis.yaml`. Il renvoie `Critical` si l'uptime du site est à zéro, et `OK` dans les autres cas.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/iis/images/iisgraph.png
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/windows/#agent-check-directory-structure
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[7]: https://msdn.microsoft.com/en-us/library/aa393067.aspx
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/iis/metadata.csv
[12]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}