---
aliases:
- /fr/integrations/cloud_foundry/
- /fr/integrations/pivotal_platform/
categories:
- provisioning
- configuration & deployment
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/vmware_tanzu_application_service.md
description: Surveillez l'intégrité de vos machines virtuelles VMware Tanzu Application
  Service (anciennement Pivotal Cloud Foundry) et des tâches qu'elles exécutent.
doc_link: /integrations/vmware_tanzu_application_service/
further_reading:
- link: https://www.datadoghq.com/blog/pcf-monitoring-with-datadog/
  tag: Blog
  text: Surveillance de Pivotal Platform avec Datadog
- link: /integrations/guide/application-monitoring-vmware-tanzu/
  tag: documentation
  text: Datadog Application Monitoring for VMware Tanzu
- link: /integrations/guide/cluster-monitoring-vmware-tanzu/
  tag: documentation
  text: Datadog Cluster Monitoring for VMware Tanzu
integration_id: pivotal-platform
integration_title: VMware Tanzu Application Service
is_public: true
name: vmware_tanzu_application_service
newhlevel: true
public_title: Intégration Datadog/VMware Tanzu Application Service (Pivotal Cloud
  Foundry)
short_description: Surveillez l'intégrité de vos machines virtuelles VMware Tanzu
  Application Service et des tâches qu'elles exécutent.
updated_for_agent: 6.0
---

## Présentation

Tous les déploiements VMware Tanzu Application Service (anciennement Pivotal Cloud Foundry, voir l'[annonce de VMware][1] pour en savoir plus) peuvent envoyer des métriques et des événements à Datadog. Vous pouvez surveiller la santé et la disponibilité de tous les nœuds des déploiements, suivre les tâches qu'ils exécutent, recueillir les métriques provenant de Loggregator Firehose, et plus encore. 

Pour une expérience optimale, poursuivez votre lecture afin de configurer automatiquement la surveillance via Tanzu Ops Manager pour votre application sur VMware Tanzu Application Service et votre cluster VMware Tanzu Application Service. Pour configurer manuellement la surveillance, consultez les instructions du [guide de configuration manuelle de VMware Tanzu Application Service][2].

Il existe trois composants principaux pour l'intégration Datadog/VMware Tanzu Application Service. Le buildpack permet tout d'abord de recueillir des métriques custom depuis vos applications. De plus, la version BOSH sert à recueillir des métriques à partir de la plateforme. Enfin, le Loggregator Firehose Nozzle recueille toutes les autres métriques provenant de votre infrastructure. Lisez le guide [Architecture de l'intégration Datadog/VMware Tanzu Application Service Datadog][3] pour en savoir plus.

## Surveiller vos applications

Référez-vous au [guide d'installation et de configuration de VMware Tanzu][4] (en anglais) pour installer l'intégration via Tanzu Ops Manager. Pour obtenir les instructions de configuration manuelle, consultez la rubrique [Surveiller vos applications][5] du guide de configuration manuelle.

### Configuration

#### Collecte de métriques

Pour activer le buildback, configurez une clé d'API dans votre environnement :

```shell
# définir la variable d'environnement
cf set-env <VOTRE_APP> DD_API_KEY <CLÉ_API_DATADOG>
# paramétrer l'application pour qu'elle recueille la nouvelle variable d'environnement et utilise le buildpack
cf restage <VOTRE_APP>
```

#### Collecte des traces et profils

L'Agent de trace Datadog (APM) est activé par défaut. Consultez la documentation relative à la [configuration d'APM][6] et à la [configuration du profiling][7] pour découvrir comment effectuer la configuration en fonction de votre langage.

#### Dépannage

{{< site-region region="us3" >}}

La collecte de logs n'est plus prise en charge pour ce site.

{{< /site-region >}}

{{% site-region region="us,us5,eu,gov,ap1" %}}

##### Activer la collecte de logs

Pour commencer à recueillir des logs depuis votre application dans VMware Tanzu Application Service, vous devez activer la collecte de logs ainsi que l'Agent contenu dans le buildpack.

```shell
cf set-env <NOM_VOTRE_APPLICATION> DD_LOGS_ENABLED true
# Désactiver les checks de base de l'Agent pour désactiver la collecte des métriques système
cf set-env <NOM_VOTRE_APPLICATION> DD_ENABLE_CHECKS false
# Rediriger le conteneur Stdout/Stderr vers un port local pour que l'Agent recueille les logs
cf set-env <NOM_VOTRE_APPLICATION> STD_LOG_COLLECTION_PORT <PORT>
# Configurer l'Agent pour qu'il recueille les logs à partir du port souhaité et définir la valeur de la source et du service
cf set-env <NOM_VOTRE_APPLICATION> LOGS_CONFIG '[{"type":"tcp","port":"<PORT>","source":"<SOURCE>","service":"<SERVICE>"}]'
# Paramétrer l'application pour qu'elle recueille la nouvelle variable d'environnement et utilise le buildpack
cf restage <NOM_VOTRE_APPLICATION>
```

##### Configurer la collecte de logs

Le tableau suivant décrit comment utiliser les paramètres ci-dessus pour configurer la collecte de logs :

| Paramètre                 | Description                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `DD_LOGS_ENABLED`         | Définissez ce paramètre sur `true` pour activer la collecte de logs avec l'Agent Datadog.                                                                                      |
| `DD_ENABLE_CHECKS`        | Définissez ce paramètre sur `false` pour désactiver la collecte de métriques système de l'Agent via les checks de base.                                                       |
| `STD_LOG_COLLECTION_PORT` | Ce paramètre doit être utilisé lorsque les logs provenant de `stdout` ou `stderr` sont recueillis. Il redirige le flux `stdout` ou `stderr` vers la valeur du port local correspondant. |
| `LOGS_CONFIG`             | Utilisez cette option pour configurer l'Agent afin d'effectuer une écoute sur un port TCP local et pour définir la valeur des paramètres `service` et `source`.          |

**Exemple :**

Une application Java appelée `app01` s'exécute dans VMware Tanzu Application Service. La configuration suivante redirige le conteneur `stdout`/`stderr` vers le port local `10514`. L'Agent est alors configuré de façon à recueillir les logs de ce port tout en définissant la valeur correcte de `service` et `source` :

```shell
# Rediriger Stdout/Stderr vers le port 10514
cf set-env app01 STD_LOG_COLLECTION_PORT 10514
# Configurer l'Agent pour effectuer une écoute sur le port 10514
cf set-env app01 LOGS_CONFIG '[{"type":"tcp","port":"10514","source":"java","service":"app01"}]'
```

##### Notification en cas de proxy mal configuré

Avec la version 6.12+ de l'Agent, lorsque vous utilisez une [configuration de proxy][101] avec le buildpack, une vérification est effectuée pour déterminer si la connexion peut être établie. La collecte de logs démarre en fonction du résultat de ce test.

Si la connexion ne peut pas être établie et que la collecte de logs ne démarre pas, un événement semblable à celui illustré ci-dessous s'affiche dans l'[Events Explorer][102]. Configurez un monitor pour suivre ces événements et recevoir des notifications lorsqu'un buildpack mal configuré est déployé :

{{< img src="integrations/cloud_foundry/logs_misconfigured_proxy.png" alt="Un événement dans Datadog dont le titre est « Log endpoint cannot be reached - Log collection not started » et un message indiquant qu'une connexion TCP n'a pas pu être établie" >}}

### Tags

Pour ajouter des tags personnalisés à votre application, définissez la variable d'environnement `DD_TAGS` via le fichier `manifest.yml` ou la commande de l'interface de ligne de commande CF :

```shell
# définir la variable d'environnement
cf set-env <VOTRE_APPLICATION> DD_TAGS key1=value1,key2=value2
# paramétrer l'application pour qu'elle recueille la nouvelle variable d'environnement et utilise les nouveaux tags
cf restage <VOTRE_APPLICATION>
```

[101]: /fr/agent/logs/proxy/
[102]: /fr/events/explorer/

{{< /site-region >}}

### Paramètres d'organisation

[DogStatsD][10] vous permet d'envoyer des métriques d'application personnalisées à Datadog. Consultez la section [Envoi de métriques : DogStatsD][11] pour en savoir plus. Vous pouvez également vous référer à la liste des [bibliothèques DogStatsD][12] compatibles avec un grand nombre d'applications.

## Surveiller votre cluster VMware Tanzu Application Service

Référez-vous au [guide d'installation et de configuration de VMware Tanzu][13] (en anglais) pour installer l'intégration via Tanzu Ops Manager. Pour découvrir les instructions de configuration manuelle, consultez la rubrique relative à la [surveillance du cluster VMware Tanzu Application Service][14] du guide de configuration manuelle.

## Données collectées

### Métriques

Les métriques suivantes sont envoyées par le Firehose Nozzle de Datadog. Le préfixe `cloudfoundry.nozzle` est ajouté à ces métriques. L'Agent Datadog envoie les métriques de tous les checks d'Agent que vous avez configurés dans la configuration du runtime de Director, ainsi que, par défaut, les métriques [système][15], [réseau][16], [disque][17] et [NTP][18].

Le Firehose Nozzle de Datadog recueille uniquement les CounterEvents (en tant que métriques et non en tant qu'événements), les ValueMetrics et les ContainerMetrics. Il ignore les LogMessages et les Errors.

Les métriques disponibles peuvent varier en fonction de la version de PCF et du déploiement. Datadog recueille les métriques counter et gauge générées par l'[API Loggregator v2][19]. Consultez la section [Métriques du composant Cloud Foundry][20] (en anglais) pour obtenir la liste des métriques générées par défaut.

{{< get-metrics-from-git "cloud_foundry">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://tanzu.vmware.com/pivotal#:~:text=Pivotal%20Cloud%20Foundry%20%28PCF%29%20is%20now%20VMware%20Tanzu%20Application%20Service
[2]: /fr/integrations/guide/pivotal-cloud-foundry-manual-setup
[3]: /fr/integrations/faq/pivotal_architecture
[4]: /fr/integrations/guide/application-monitoring-vmware-tanzu/
[5]: /fr/integrations/guide/pivotal-cloud-foundry-manual-setup#monitor-your-applications
[6]: /fr/tracing/setup/
[7]: /fr/profiler/enabling/
[8]: /fr/agent/logs/proxy/
[9]: /fr/events/explorer/
[10]: /fr/developers/dogstatsd/
[11]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[12]: /fr/libraries/
[13]: /fr/integrations/guide/cluster-monitoring-vmware-tanzu/#installation
[14]: /fr/integrations/guide/cloud-foundry-setup/#monitor-your-cloud-foundry-cluster
[15]: /fr/integrations/system/#metrics
[16]: /fr/integrations/network/#metrics
[17]: /fr/integrations/disk/#metrics
[18]: /fr/integrations/ntp/#metrics
[19]: https://github.com/cloudfoundry/loggregator-api
[20]: https://docs.cloudfoundry.org/running/all_metrics.html