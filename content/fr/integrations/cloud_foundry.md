---
integration_title: "Cloud\_Foundry"
name: cloudfoundry
kind: integration
git_integration_title: cloud_foundry
newhlevel: true
updated_for_agent: 6
description: "Surveillez l'état de santé de vos machines virtuelles Cloud\_Foundry et des tâches qu'elles exécutent."
is_public: true
public_title: "Intégration Datadog/Cloud\_Foundry"
short_description: "Surveillez l'état de santé de vos machines virtuelles Cloud\_Foundry et des tâches qu'elles exécutent."
categories:
  - provisioning
  - configuration & deployment
  - log collection
doc_link: /integrations/cloud_foundry/
ddtype: check
---
## Présentation

Tous les déploiements Cloud Foundry peuvent envoyer des métriques et des événements à Datadog. Les données vous aident à surveiller l'état de santé et la disponibilité de tous les nœuds du déploiement, à surveiller les tâches qu'ils exécutent, à recueillir les métriques du Loggregator Firehose, et plus encore. Utilisez cette page pour apprendre à surveiller votre [application sur Cloud Foundry](#surveiller-vos-applications-sur-cloud-foundry) et votre [cluster Cloud Foundry](#surveiller-votre-cluster-cloud-foundry).

Il existe trois composants principaux pour l'intégration de Cloud Foundry avec Datadog. Commencez par utiliser le Buildpack pour recueillir des métriques custom depuis vos applications. Utilisez ensuite la version BOSH pour recueillir des métriques à partir de la plateforme. Enfin, lancez le Loggregator Firehose Nozzle pour recueillir toutes les autres métriques de votre infrastructure.

Pour Pivotal Cloud Foundry, vous pouvez installer les carrés d'intégration de Datadog avec le gestionnaire d'opérations :

* [Surveillance de cluster Datadog pour PCF][1]
* [Surveillance d'application Datadog pour PCF][2]

## Surveiller vos applications sur Cloud Foundry

Utilisez le **buildpack Cloud Foundry Datadog** pour surveiller votre application Cloud Foundry. Il s'agit d'un [buildpack de ressources][3] pour Cloud Foundry qui installe un [binaire DogStatsD Datadog][4] ainsi que l'Agent Datadog dans le conteneur sur lequel votre app s'exécute.

### Implémentation

#### Cloud Foundry < 1.12

Notre buildpack utilise la fonctionnalité [multi-buildpack][5] de Cloud Foundry qui a été ajoutée dans la version `1.12`.

Pour les versions antérieures, Cloud Foundry propose un rétroportage de cette fonctionnalité sous la forme d'un [buildpack][6]. Vous devez installer et configurer ce rétroportage afin d'utiliser le buildpack de Datadog :

1. **Importez le rétroportage multi-buildpack.**
  Téléchargez la dernière [version multi-buildpack][6] et importez-la dans votre environnement Cloud Foundry.

    ```shell
    cf create-buildpack multi-buildpack ./multi-buildpack-v-x.y.z.zip 99 --enable
    ```

2. **Ajoutez un manifeste multi-buildpack à votre application.**
  Comme expliqué [sur le référentiel du rétroportage multi-buildpack][7], créez un fichier `multi-buildpack.yml` à la racine de votre application et configurez-le pour votre environnement. Ajoutez un lien vers le buildpack Cloud Foundry Datadog et vers le buildpack standard :

      ```yaml
      buildpacks:
        - "https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-3.1.0.zip"
        - "https://github.com/cloudfoundry/ruby-buildpack#v1.7.18" # Replace this with your regular buildpack
      ```

    Les URL du buildpack Datadog sont les suivantes :

    - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip`
    - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-x.y.z.zip`

    N'utilisez pas la `latest` version ici (remplacez `x.y.z` par la version que vous souhaitez utiliser).

    **Important** : votre buildpack standard doit être le dernier manifeste à agir en tant que buildpack final. Pour en savoir plus, consultez la [documentation Cloud Foundry][8] relative aux buildpacks (en anglais).

3. **Appliquer la fonctionnalité multi-buildpack à votre application.**
  Assurez-vous que Cloud Foundry sélectionne le buildpack `multi-buildpack` pour votre application :

    ```shell
    cf push <YOUR_APP> -b multi-buildpack
    ```

#### Cloud Foundry >= 1.12

1. **Importez le buildpack Cloud Foundry Datadog.**
  Téléchargez la dernière [version du buildpack][9] Datadog et importez-la dans votre environnement Cloud Foundry.

    ```shell
    cf create-buildpack datadog-cloudfoundry-buildpack ./datadog-cloudfoundry-buildpack-latest.zip
    ```

2. **Appliquez le buildpack Datadog et vos buildpacks à votre application.**
  Le processus d'application des différents buildpacks à votre application est décrit dans la [documentation Cloud Foundry][8] (en anglais).

    ```shell
    cf push <YOUR_APP> --no-start -b binary_buildpack
    cf v3-push <YOUR_APP> -b datadog-cloudfoundry-buildpack -b <YOUR-BUILDPACK-1> -b <YOUR-FINAL-BUILDPACK>
    ```

  **Important** : Si vous utilisiez un seul buildpack, celui-ci doit être chargé en dernier pour agir en tant que buildpack final. Pour en savoir plus, consultez la [documentation Cloud Foundry][8] relative aux buildpacks (en anglais).

#### Meta-buildpack **(obsolète)**

Si vous utilisez un [meta-buildpack][10], le buildpack de Datadog peut être utilisé en tant qu'élément décoratif par défaut.

**Remarque** : le [meta-buildpack][10] est obsolète et a été remplacé par le [multi-buildpack][6]. Il est possible que Datadog prenne en charge cet ancien buildpack dans une prochaine version.

### Configuration

#### Collecte de métriques

**Définir une clé d'API dans votre environnement pour activer le buildpack** :

```shell
# définir la variable d'environnement
cf set-env <VOTRE_APP> DD_API_KEY <CLÉ_API_DD>
# paramétrer l'application pour qu'elle recueille la nouvelle variable d'environnement et utilise le buildpack
cf restage <VOTRE_APP>
```

#### Collecte de traces

L'Agent de trace Datadog (APM) est activé par défaut. Consultez la [documentation relative à la configuration de l'APM][11] pour découvrir comment effectuer la configuration en fonction de votre langage. 

#### Collecte de logs

##### Activer la collecte de logs

Pour commencer à recueillir des logs depuis votre application dans Cloud Foundry, vous devez activer la collecte de logs ainsi que l'Agent contenu dans le buildpack.

```
cf set-env <NOM_VOTRE_APPLICATION> RUN_AGENT true
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

Vous pouvez utiliser les paramètres suivants pour configurer la collecte de logs :

| Paramètre                 | Description                                                                                                                                |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `STD_LOG_COLLECTION_PORT` | Doit être utilisé lors de la collecte de logs depuis `stdout`/`stderr`. Cela redirige le flux `stdout`/`stderr` vers la valeur du port local correspondant. |
| `LOGS_CONFIG`             | Utilisez cette option pour configurer l'Agent afin d'effectuer une écoute sur un port TCP local et pour définir la valeur des paramètres `service` et `source`.          |

**Exemple** :

Une application Java appelée `app01` s'exécute dans Cloud Foundry. La configuration suivante redirige le conteneur `stdout`/`stderr` vers le port local `10514`. L'Agent est alors configuré de façon à recueillir les logs de ce port tout en définissant la valeur correcte de `service` et `source` :

```
# Rediriger Stdout/Stderr vers le port 10514
cf set-env app01 STD_LOG_COLLECTION_PORT 10514
# Configurer l'Agent pour effectuer une écoute sur le port 10514
cf set-env app01 LOGS_CONFIG '[{"type":"tcp","port":"10514","source":"java","service":"app01"}]'
```

##### Notification en cas de proxy mal configuré

Avec la version 6.12+ de l'Agent, lorsque vous utilisez une [configuration de proxy][12] avec le buildpack, une vérification est effectuée pour déterminer si la connexion peut être établie. La collecte de logs démarre en fonction du résultat de ce test.

Si la connexion ne peut pas être établie et que la collecte de logs ne démarre pas, un événement semblable à celui illustré ci-dessous est envoyé à votre flux d'événements Datadog. Configurez un monitor pour suivre ces événements et recevoir des notifications lorsqu'un buildpack mal configuré est déployé :

{{< img src="integrations/cloud_foundry/logs_misconfigured_proxy.png" alt="proxy mal configuré log cloud foundry"  >}}

### Générer le buildpack

Pour générer ce buildpack, modifiez les fichiers pertinents et lancez le script `./build`. Pour l'importer, exécutez `./upload`.

### DogStatsD

Consultez la [documentation relative à DogStatsD][13] pour en savoir plus. Vous y trouverez [la liste des bibliothèques DogStatsD][14] qui sont compatibles avec un grand nombre d'applications.

## Surveiller votre cluster Cloud Foundry

Il existe deux points d'intégration avec Datadog. Chacun a son propre objectif :

* **Version Bosh de l'Agent Datadog** : installez l'Agent Datadog sur chaque nœud de votre déploiement pour surveiller les métriques système, réseau et disque. Vous pouvez également activer n'importe quel autre check de l'Agent qui vous intéresse.
* **Firehose Nozzle de Datadog** : déployez une ou plusieurs tâches Firehose Nozzle de Datadog. Les tâches puisent dans le Loggregator Firehose de votre déploiement et envoient toutes les métriques hors conteneur à Datadog.

<div class="alert alert-warning">
Ces intégrations sont destinées aux administrateurs du déploiement Cloud Foundry, et non aux utilisateurs finaux.
</div>

### Prérequis

Vous devez disposer d'un déploiement Cloud Foundry fonctionnel et d'un accès au Director BOSH associé. Notez aussi qu'il est indispensable d'utiliser l'interface de ligne de commande BOSH pour déployer chaque intégration. Vous pouvez utiliser l'une des deux versions majeures de l'interface de ligne de commande : la [v1][15] ou la [v2][16].

### Installer la version BOSH de l'Agent Datadog

Datadog met à disposition une version BOSH de l'Agent sous forme de tarball. Importez la dernière version dans votre Director BOSH, puis installez-la sur chaque nœud de votre déploiement en tant que [plug-in][17] (de la même façon qu'un Director déploie l'Agent BOSH sur tous les nœuds).

#### Importer la version de Datadog dans votre Director BOSH

```
# v1 de l'interface de ligne de commande BOSH
bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

# v2 de l'interface de ligne de commande BOSH
bosh upload-release -e <ENV_BOSH> https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
```

Si vous souhaitez créer votre propre version, consultez le [référentiel de la version BOSH de l'Agent Datadog][18].

#### Configurer l'Agent en tant que complément dans votre Director BOSH

Ajoutez ce qui suit au fichier de configuration de runtime de votre Director BOSH (par exemple, `runtime.yml`) :

```
---
releases:
  - name: datadog-agent
    version: <VERSION_DÉJÀ_IMPORTÉE> # préciser le numéro de la version (x.y.z et non 'latest')

 addons:
- name: datadog
  jobs:
  - name: dd-agent
    release: datadog-agent
  properties:
    dd:
      use_dogstatsd: true
      dogstatsd_port: 18125       # de nombreux déploiements CF comprennent déjà StatsD sur le port 8125
      api_key: <CLÉ_API_DD>
      tags: ["<KEY:VALUE>"]       # n'importe quels tags
      generate_processes: true    # pour activer le check de processus 
```

Pour vérifier quelle version de `datadog-agent` a été importée, exécutez `bosh releases`.

#### Charger le fichier runtime.yml

Exécutez ce qui suit pour vérifier si vous avez déjà configuré `runtime-config` :

```
# v1 de l'interface de ligne de commande BOSH
`bosh runtime-config`

# v2 de l'interface de ligne de commande BOSH
bosh -e <ENV_BOSH> runtime-config
```

Pour la v2 de BOSH, si le fichier `runtime.yml` est vide, la réponse suivante s'affiche : `No runtime config`.

#### Activer des checks supplémentaires de l'Agent

Effectuez la configuration de chaque check supplémentaire de l'Agent que vous souhaitez activer lors de votre déploiement sous la clé `properties.dd.integrations`. Par exemple :

```
  properties:
    dd:
      integrations:
        directory:
          init_config: {}
          instances:
            directory: "."
        #process:
        #  init_config: {}
        #...
```

La configuration sous chaque nom de check doit suivre la même méthode que la configuration d'un check dans son propre fichier dans le répertoire conf.d de l'Agent.

Tout ce que vous configurez dans `runtime.yml` s'applique à chaque nœud. Vous ne pouvez pas configurer un check pour un sous-ensemble de nœuds de votre déploiement.

Pour personnaliser la configuration pour les checks par défaut (système, réseau, disque et NTP), consultez la [liste complète des options de configuration][19] de la version BOSH de l'Agent Datadog.

#### Synchroniser la configuration de runtime pour le Director

```
# v1 de l'interface de ligne de commande BOSH
bosh update runtime-config runtime.yml

# v2 de l'interface de ligne de commande BOSH
bosh update-runtime-config -e <ENV_BOSH> runtime.yml
```

#### Redéployer votre déploiement Cloud Foundry

```
# v1 de l'interface de ligne de commande BOSH
bosh deployment <MANIFESTE_VOTRE_DÉPLOIEMENT>.yml
bosh -n deploy --recreate

# v2 de l'interface de ligne de commande BOSH
bosh -n -d <VOTRE_DÉPLOIEMENT> -e <ENV_BOSH> deploy --recreate <MANIFESTE_VOTRE_DÉPLOIEMENT>.yml
```

Comme la configuration de runtime est appliquée de manière globale, BOSH redéploie chaque nœud dans votre déploiement. Si vous comptez plusieurs déploiements, redéployez-les tous afin d'installer l'Agent Datadog partout.

#### Vérifier que l'Agent est installé partout

Afin de vérifier que l'Agent a bien été installé, accédez à la page [Hostmap][20] de Datadog et appliquez le filtre `cloudfoundry`. La version BOSH de l'Agent applique un tag `cloudfoundry` générique à chaque host. Il est possible de regrouper les hosts par tag, par exemple `bosh_job`, comme sur la capture d'écran suivante :

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map.png" alt="hostmap-cloud-foundry"  >}}

Cliquez sur n'importe quel host pour afficher les détails, puis sur **system** dans l'hexagone pour vérifier que Datadog reçoit bien les métriques :

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map-detail.png" alt="details-hostmap-cloud-foundry"  >}}

### Déployer le Firehose Nozzle de Datadog

Datadog propose une version BOSH du Firehose Nozzle de Datadog. Après avoir importé la version dans votre Director, ajoutez le Nozzle à un déploiement existant, ou créez un nouveau déploiement qui inclut uniquement le Nozzle. Les instructions ci-dessous s'appliquent dans le cas d'un ajout à un déploiement Cloud Foundry existant qui dispose d'un Loggregator Firehose fonctionnel.

#### Importer la version de Datadog dans votre Director BOSH

```
# v1 de l'interface de ligne de commande BOSH
bosh upload release http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz

# v2 de l'interface de ligne de commande BOSH
bosh upload-release -e <ENV_BOSH> http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
```

Si vous souhaitez créer votre propre version, consultez le [référentiel du Firehose Nozzle de Datadog][21].

#### Configurer un client UAA

Dans le manifeste qui contient votre configuration UAA, ajoutez un nouveau client au Nozzle de Datadog pour que les tâches puissent accéder au Firehose :

```
uaa:
  clients:
    datadog-firehose-nozzle:
      access-token-validity: 1209600
      authorities: doppler.firehose,cloud_controller.admin_read_only
      authorized-grant-types: client_credentials
      override: true
      scope: doppler.firehose,cloud_controller.admin_read_only
      secret: <VOTRE_SECRET>
```

Redéployez le déploiement pour ajouter l'utilisateur.

#### Ajouter des tâches Nozzle

Configurez une ou plusieurs tâches Nozzle dans votre manifeste principal de déploiement Cloud Foundry (par exemple, cf-manifest.yml) :

```
jobs:
#- instances: 4
#  name: une_autre_tache
#  ...
- instances: 1            # ajouter plus d'instances si une seule tâche ne tient pas le rythme de Firehose
  name: datadog_nozzle_z1
  networks:
    - name: cf1           # un réseau que vous avez configuré ailleurs dans le manifeste
  resource_pool: small_z1 # un resource_pool que vous avez configuré ailleurs dans le manifeste
  templates:
    - name: datadog-firehose-nozzle
      release: datadog-firehose-nozzle
  properties:
    datadog:
      api_key: <VOTRE_CLÉ_API_DATADOG>
      api_url: https://api.datadoghq.com/api/v1/series
      flush_duration_seconds: 15 # intervalle en secondes entre les transmissions vers Datadog. Valeur par défaut : 15.
    loggregator:
      # ne PAS ajouter '/firehose' ni même une barre oblique à la fin de l'URL ; « ws://<host>:<port> » fonctionne
      traffic_controller_url: <URL_LOGGREGATOR> # par exemple, ws://traffic-controller.your-cf-domain.com:8081
    nozzle:
      deployment: <NOM_DÉPLOIEMENT>    # ajouter le tag 'deployment:<NOM_DÉPLOIEMENT>' à chaque métrique Firehose
      subscription_id: datadog-nozzle  # valeur de votre choix (firehose diffuse uniformément les données entre les tâches avec le même subscription_id)
      # disable_access_control: true   # pour le développement uniquement
      # insecure_ssl_skip_verify: true # pour le développement uniquement ; activer si votre UAA n'utilise pas de certificat vérifiable
    uaa:
      client: datadog-firehose-nozzle # le nom du client que vous venez de configurer
      client_secret: <SECRET_TOUT_JUSTE_CONFIGURÉ>
      url: <UAA_URL> # par exemple, https://uaa.your-cf-domain.com:8443
```

Pour passer en revue toutes les options de configuration disponibles, consultez le [référentiel Firehose Nozzle de Datadog][22].

Dans le même manifeste, ajoutez le nom et la version du Nozzle de Datadog :

```
releases:
# - name: <UNE_AUTRE_VERSION>
#   version: <x.y.z>
# ...
  - name: firehose-nozzle-datadog
    version: <VERSION_DÉJÀ_IMPORTÉE> # préciser le numéro de la version (x.y.z et non 'latest')
```

Pour vérifier quelle version de `datadog-firehose-nozzle` a été importée, exécutez `bosh releases`.

#### Redéployer le déploiement

```
# v1 de l'interface de ligne de commande BOSH
bosh deployment cf-manifest.yml
bosh -n deploy --recreate

# v2 de l'interface de ligne de commande BOSH
bosh -n -d cf-manifest -e <ENV_BOSH> deploy --recreate cf-manifest.yml
```

#### Vérifier que le Nozzle effectue la collecte

Depuis la page [Metrics Explorer][23] de Datadog, recherchez des métriques qui commencent par `cloudfoundry.nozzle` :

{{< img src="integrations/cloud_foundry/cloud-foundry-nozzle-metrics.png" alt="métriques.nozzle.cloudfoundry"  >}}

## Données collectées

### Métriques

Les métriques suivantes sont envoyées par le Firehose Nozzle de Datadog (`cloudfoundry.nozzle`). L'Agent Datadog n'envoie pas de métriques spéciales, mais uniquement les métriques habituelles des checks d'Agent que vous avez définis dans la configuration de runtime du Director (et, par défaut, les métriques [système][24], [réseau][25], [disque][26] et [NTP][27]).

Le Firehose Nozzle de Datadog recueille uniquement les CounterEvents (en tant que métriques et non en tant qu'événements), les ValueMetrics et les ContainerMetrics. Il ignore les LogMessages et les Errors.

{{< get-metrics-from-git "cloud_foundry">}}

[1]: https://network.pivotal.io/products/datadog
[2]: https://network.pivotal.io/products/datadog-application-monitoring
[3]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[4]: /fr/developers/metrics/dogstatsd_metrics_submission
[5]: https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html
[6]: https://github.com/cloudfoundry/multi-buildpack
[7]: https://github.com/cloudfoundry/multi-buildpack#usage
[8]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html
[9]: https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip
[10]: https://github.com/cf-platform-eng/meta-buildpack
[11]: /fr/tracing/setup
[12]: https://docs.datadoghq.com/fr/agent/logs/proxy
[13]: /fr/developers/metrics/dogstatsd_metrics_submission
[14]: /fr/libraries
[15]: https://bosh.io/docs/bosh-cli.html
[16]: https://bosh.io/docs/cli-v2.html#install
[17]: https://bosh.io/docs/runtime-config.html#addons
[18]: https://github.com/DataDog/datadog-agent-boshrelease
[19]: https://github.com/DataDog/datadog-agent-boshrelease/blob/master/jobs/dd-agent/spec
[20]: https://app.datadoghq.com/graphing/infrastructure/hostmap
[21]: https://github.com/DataDog/datadog-firehose-nozzle-release
[22]: https://github.com/DataDog/datadog-firehose-nozzle-release/blob/master/jobs/datadog-firehose-nozzle/spec
[23]: https://app.datadoghq.com/metric/explorer
[24]: /fr/integrations/system/#metrics
[25]: /fr/integrations/network/#metrics
[26]: /fr/integrations/disk/#metrics
[27]: /fr/integrations/ntp/#metrics