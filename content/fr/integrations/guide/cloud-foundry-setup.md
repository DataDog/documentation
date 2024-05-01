---
aliases:
- /fr/integrations/guide/pivotal-cloud-foundry-manual-setup
description: Étapes de configuration de l'intégration Cloud Foundry
further_reading:
- link: https://www.datadoghq.com/blog/monitor-tanzu-application-service/
  tag: Blog
  text: Surveiller les applications exécutées sur VMware Tanzu Application Service
kind: guide
title: Guide de configuration de Cloud Foundry
---

## Présentation

Les déploiements Cloud Foundry peuvent envoyer des métriques et des événements à Datadog. Vous pouvez suivre l'état de santé et la disponibilité de tous les nœuds du déploiement, surveiller les tâches qu'ils exécutent, recueillir les métriques du Loggregator Firehose, et plus encore. Sur cette page, vous découvrirez comment configurer la surveillance de votre environnement Cloud Foundry.

Quatre composants principaux interviennent dans le processus d'intégration de Cloud Foundry à Datadog.

- **Le buildpack Cloud Foundry :** permet de recueillir des métriques custom, des logs, des traces et des profils à partir de vos applications Cloud Foundry.
- **La version BOSH de l'Agent :** permet de recueillir des événements et des métriques à partir des machines virtuelles BOSH et de les envoyer à Datadog.
- **La version BOSH de l'Agent de cluster :** permet de recueillir des métadonnées au niveau du cluster et de l'application à partir des API CAPI et BSS, et des tags de conteneur.
- **Le Firehose Nozzle :** permet de recueillir toutes les autres métriques du Loggregator Firehose au sein de votre infrastructure.

Consultez le guide relatif à l'[architecture du Datadog VMware Tanzu Application Service][32] pour en savoir plus.

## Surveiller vos applications

Utilisez le **buildpack Cloud Foundry Datadog** pour surveiller votre application Cloud Foundry. Il s'agit d'un [buildpack de ressources][2] pour Cloud Foundry qui installe l'Agent de conteneur Datadog (une version légère de l'Agent), l'Agent de trace Datadog pour APM, ainsi que le fichier binaire DogStatsD Datadog dans le conteneur sur lequel votre application s'exécute.

### Plusieurs buildpacks (recommandé)

1. Téléchargez la [dernière version du buildpack Datadog][7] et importez-la dans votre environnement Cloud Foundry.

    ```shell
    cf create-buildpack datadog-cloudfoundry-buildpack ./datadog-cloudfoundry-buildpack-latest.zip
    ```

2. Appliquez le buildpack Datadog et vos buildpacks standard à votre application. Le processus d'application des différents buildpacks est décrit dans la documentation de Cloud Foundry, sous la section [Pushing an App with Multiple Buildpacks][3] (en anglais).

    ```shell
    cf push <YOUR_APP> --no-start -b binary_buildpack
    cf v3-push <YOUR_APP> -b datadog-cloudfoundry-buildpack -b <YOUR-BUILDPACK-1> -b <YOUR-FINAL-BUILDPACK>
    ```

      **Remarque** : si vous utilisiez un seul buildpack, celui-ci doit être chargé en dernier pour agir en tant que buildpack final. Pour en savoir plus, consultez la section [How Buildpacks Work de la documentation de Cloud Foundry][6] (en anglais).

### Multi-Buildpack (obsolète)

Le buildpack Datadog utilise la fonctionnalité [Pushing an App with Multiple Buildpacks][3] de Cloud Foundry qui a été ajoutée dans la version `1.12`.

Pour les versions antérieures, Cloud Foundry propose une version rétrocompatible de cette fonctionnalité sous la forme d'un [multi-buildpack][4]. Vous devez installer et configurer cette version afin d'utiliser le buildpack de Datadog.

1. Téléchargez la dernière version multi-buildpack et importez-la dans votre environnement Cloud Foundry.

    ```shell
    cf create-buildpack multi-buildpack ./multi-buildpack-v-x.y.z.zip 99 --enable
    ```

2. Ajoutez un manifeste multi-buildpack à votre application. Comme expliqué dans la [section Usage][5] (en anglais) du référentiel multi-buildpack, créez un fichier `multi-buildpack.yml` à la racine de votre application et configurez-le pour votre environnement. Ajoutez un lien vers le buildpack Cloud Foundry Datadog et vers le buildpack standard :

    ```yaml
    buildpacks:
      - "https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-4.36.0.zip"
      - "https://github.com/cloudfoundry/ruby-buildpack#v1.7.18" # Replace this with your regular buildpack
    ```

      Les URL du buildpack Datadog sont les suivantes :
      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip`
      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-x.y.z.zip`

      N'utilisez pas la version `latest` ici : remplacez `x.y.z` par la version que vous souhaitez utiliser.

      **Remarque** : votre buildpack standard doit être le dernier répertorié dans le manifeste. Pour en savoir plus, consultez la section [How Buildpacks Work de la documentation de Cloud Foundry][6] (en anglais).

3. Appliquez la fonctionnalité multi-buildpack à votre application. Assurez-vous que Cloud Foundry sélectionne le buildpack `multi-buildpack` pour votre application :

    ```shell
    cf push <YOUR_APP> -b multi-buildpack
    ```

### Meta-buildpack **(obsolète)**

Si vous utilisez un [meta-buildpack][8], le buildpack de Datadog peut être utilisé en tant que décorateur par défaut.

**Remarque** : Cloud Foundry ne prend plus en charge le meta-buildpack et privilégie le multi-buildpack.

## Surveiller votre cluster Cloud Foundry

Il existe trois points d'intégration avec Datadog. Chacun a son propre objectif :

- **Version Bosh de l'Agent Datadog** : installez l'Agent Datadog sur chaque nœud de votre déploiement pour surveiller les métriques système, réseau et disque. Vous pouvez également activer n'importe quel autre check de l'Agent qui vous intéresse.
- **La version BOSH de l'Agent de cluster Datadog** : déployez une tâche de l'Agent de cluster Datadog. La tâche interroge les API CAPI et BBS pour récupérer des métadonnées au niveau du cluster et de l'application et ainsi fournir des fonctionnalités de tagging améliorées au sein de vos applications et de vos conteneurs.
- **Firehose Nozzle de Datadog** : déployez une ou plusieurs tâches Firehose Nozzle de Datadog. Les tâches puisent dans le Loggregator Firehose de votre déploiement et envoient toutes les métriques hors conteneur à Datadog.

<div class="alert alert-warning">
Ces intégrations sont destinées aux administrateurs du déploiement Cloud Foundry, et non aux utilisateurs finaux.
</div>

### Prérequis

Vous devez disposer d'un déploiement Cloud Foundry fonctionnel et d'un accès au Director BOSH associé. Notez aussi qu'il est indispensable d'utiliser l'interface de ligne de commande BOSH pour déployer chaque intégration. Vous pouvez utiliser l'une des deux versions majeures de l'interface de ligne de commande : la [v1][15] ou la [v2][16].

### Installer la version BOSH de l'Agent Datadog

Datadog met à disposition une version BOSH de l'Agent sous forme de tarball. Importez la dernière version dans votre Director BOSH, puis installez-la sur chaque nœud de votre déploiement en tant que [plug-in][17] (de la même façon qu'un Director déploie l'Agent BOSH sur tous les nœuds).

#### Importer la version de Datadog dans votre Director BOSH

```text
# v1 de l'interface de ligne de commande BOSH
bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
# v2 de l'interface de ligne de commande BOSH
bosh upload-release -e <ENV_BOSH> https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
```

Si vous souhaitez créer votre propre version, consultez le [référentiel de la version BOSH de l'Agent Datadog][18].

#### Configurer l'Agent en tant que complément dans votre Director BOSH

Ajoutez ce qui suit au fichier de configuration de runtime de votre Director BOSH (`runtime.yml`) :

```text
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
      api_key: <CLÉ_API_DATADOG>
      tags: ["<KEY:VALUE>"]       # tags de votre choix
      generate_processes: true    # pour activer le check de processus
```

Pour vérifier quelle version de `datadog-agent` a été importée, exécutez `bosh releases`.

#### Charger le fichier runtime.yml

Exécutez ce qui suit pour vérifier si vous avez déjà configuré `runtime-config` :

```text
# v1 de l'interface de ligne de commande BOSH
`bosh runtime-config`
# v2 de l'interface de ligne de commande BOSH
bosh -e <ENV_BOSH> runtime-config
```

Pour la v2 de BOSH, si le fichier `runtime.yml` est vide, la réponse suivante s'affiche : `No runtime config`.

#### Activer des checks supplémentaires de l'Agent

Effectuez la configuration de chaque check supplémentaire de l'Agent à activer lors de votre déploiement sous la clé `properties.dd.integrations`. Par exemple :

```yaml
properties:
    dd:
        integrations:
            directory:
                init_config: {}
                instances:
                    directory: '.'
            #process:
            #  init_config: {}
            #...
```

La configuration sous chaque nom de check suit le même format que la configuration d'un check dans son propre fichier dans le répertoire `conf.d` de l'Agent.

Tout ce que vous configurez dans `runtime.yml` s'applique à chaque nœud. Vous ne pouvez pas configurer un check pour un sous-ensemble de nœuds de votre déploiement.

Pour personnaliser la configuration pour les checks par défaut (système, réseau, disque et NTP), consultez la [liste complète des options de configuration][19] de la version BOSH de l'Agent Datadog.

#### Synchroniser la configuration de runtime pour le Director BOSH

```text
# v1 de l'interface de ligne de commande BOSH
bosh update runtime-config runtime.yml
# v2 de l'interface de ligne de commande BOSH
bosh update-runtime-config -e <ENV_BOSH> runtime.yml
```

#### Redéployer votre déploiement Cloud Foundry

```text
# v1 de l'interface de ligne de commande BOSH
bosh deployment <MANIFESTE_DE_DÉPLOIEMENT>.yml
bosh -n deploy --recreate
# v2 de l'interface de ligne de commande BOSH
bosh -n -d <VOTRE_DÉPLOIEMENT> -e <ENV_BOSH> deploy --recreate <MANIFESTE_DE_DÉPLOIEMENT>.yml
```

Comme la configuration de runtime est appliquée de manière globale, BOSH redéploie chaque nœud dans votre déploiement. Si vous comptez plusieurs déploiements, redéployez-les tous afin d'installer l'Agent Datadog partout.

#### Vérifier que l'Agent est installé partout

Afin de vérifier que l'Agent a bien été installé partout, accédez à la page [Host Map][20] et appliquez le filtre `cloudfoundry`. La version BOSH de l'Agent Datadog applique un tag `cloudfoundry` à chaque host. Il est possible de regrouper les hosts par tag, par exemple `bosh_job`, comme sur la capture d'écran suivante :

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map.png" alt="La hostmap dans Datadog avec le tag cloudfoundry saisi dans la section Filter et le tag bosh_job dans la section Group" >}}

Cliquez sur n'importe quel host pour afficher les détails, puis sur **system** dans l'hexagone pour vérifier que Datadog reçoit bien les métriques système :

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map-detail.png" alt="La vue des détails d'un host sur la hostmap Datadog avec l'intégration système sélectionnée et plusieurs graphiques affichant des données" >}}

#### Recueillir les métadonnées CAPI et les tags de l'Agent de cluster dans les conteneurs Cloud Foundry

Dans la version `7.40.1` et les versions ultérieures de l'Agent Datadog, vous pouvez recueillir les métadonnées CAPI et les tags de l'Agent de cluster Datadog à partir des conteneurs Cloud Foundry. Les étiquettes et annotations d'application figurent dans les logs, métriques et traces d'application.

### Installer la version BOSH de l'Agent de cluster Datadog

La version BOSH de l'Agent de cluster Datadog est un package BOSH qui permet d'exécuter l'Agent de cluster Datadog sur Cloud Foundry.

Ce package doit être utilisé conjointement à la [version BOSH de l'Agent Datadog][18].
Il fournit un lien BOSH exploité par la version BOSH de l'Agent Datadog afin de découvrir automatiquement des intégrations pour vos applications et de les planifier, ainsi qu'un tagging amélioré pour les conteneurs d'application et la découverte de processus. Consultez les [spécifications dans GitHub][33] pour en savoir plus.

#### Importer la version de l'Agent de cluster de Datadog dans votre Director BOSH

```text
# v1 de l'interface de ligne de commande BOSH
bosh upload release https://cloudfoundry.datadoghq.com/datadog-cluster-agent/datadog-cluster-agent-boshrelease-latest.tgz
# v2 de l'interface de ligne de commande BOSH
bosh upload-release -e <ENV_BOSH> https://cloudfoundry.datadoghq.com/datadog-cluster-agent/datadog-cluster-agent-boshrelease-latest.tgz
```

#### Déploiement
Utilisez l'exemple de modèle de déploiement de manifeste ci-dessous pour déployer l'Agent de cluster Datadog et l'exposer à l'Agent Datadog. Consultez les [spécifications dans GitHub][33] pour découvrir les propriétés disponibles.

```yaml
jobs:
- name: datadog-cluster-agent
  release: datadog-cluster-agent
  properties:
    cluster_agent:
      token: <TOKEN>  # Minimum 32 caractères 
      bbs_poll_interval: 10
      warmup_duration: 5
      log_level: INFO
      bbs_ca_crt: <CERTIFICATE_AUTORITÉ_CERTIFICATION>
      bbs_client_crt: <CERTIFICAT_CLIENT>
      bbs_client_key: <CLÉ_PRIVÉE_CLIENT>
  provides:
    datadog-cluster-agent:
      aliases:
        - domain: <NOM_DNS (ex. agent-de-cluster-datadog)>
```

Remplacez `<TOKEN>` par le [token de votre Agent de cluster[34].

**Remarque** : cette opération entraîne la création d'un alias DNS pour le service de l'Agent de cluster Datadog, ce qui permet de le joindre via un alias statique. Consultez la section [Aliases to services](https://bosh.io/docs/dns/#aliases-to-services (en anglais) de la documentation BOSH pour en savoir plus sur les alias DNS BOSH.

Cet alias DNS est spécifié dans la propriété de tâche [`cluster_agent.address`](https://bosh.io/jobs/dd-agent?source=github.com/DataDog/datadog-agent-boshrelease&version=4.0.0#p%3dcluster_agent.address) de la configuration du runtime de l'Agent Datadog, comme indiqué dans le modèle d'exemple ci-dessous :

```yaml
jobs:
- name: datadog-agent
  release: datadog-agent
  properties: 
    ...
    cluster_agent:
      address: <NOM_DNS>
    ...
```

#### Découverte des configurations des intégrations
L'Agent de cluster Datadog découvre les intégrations en fonction d'une variable d'environnement `AD_DATADOGHQ_COM` définie dans vos applications.
Cette variable d'environnement est un objet JSON contenant les modèles de configuration Autodiscovery de votre application. L'Agent de cluster Datadog peut découvrir et fournir deux types de configurations :
  1. Les configurations de services liés à votre application, qu'ils soient fournis par l'utilisateur ou par un courtier.
  2. Les configurations de services exécutés au sein de votre application, comme un serveur web.

L'objet JSON doit correspondre à un dictionnaire associant un nom de service à son modèle Autodiscovery :
```
{
    "<NOM_DU_SERVICE>": {
        "check_names": [<LISTE_DE_NOMS_D_INTÉGRATION_À_CONFIGURER>],
        "init_configs": [<LISTE_DES_CONFIGURATIONS_INITIALES>],
        "instances": [<LISTE_DES_INSTANCES>],
        "variables": [<LISTE_DES_DÉFINITIONS_DE_VARIABLES>]
    }
}
```

Pour les services liés à l'application, le `<NOM_DU_SERVICE>` doit correspondre au nom du service tel qu'il apparaît dans la sortie de commande `cf services`. Pour les services exécutés au sein de l'application, vous pouvez choisir la valeur de votre choix pour `<NOM_DU_SERVICE>`.

Utilisée uniquement pour les services liés, la clé `variables` résout les template variables au sein du modèle de configuration et doit contenir le chemin JSON de la valeur souhaitée pour la variable d'environnement `VCAP_SERVICES`. Vous pouvez inspecter cela avec la commande `cf env <NOM_APPLICATION>`.

**Remarque :** l'Agent de cluster Datadog peut résoudre uniquement les identifiants des services directement disponibles dans la variable d'environnement `VCAP_SERVICES` pour Autodiscovery.

##### Exemple

Cette configuration Autodiscovery dans la variable d'environnement `AD_DATADOGHQ_COM` décrit une application Cloud Foundry exécutant un serveur web lié à un service PostgreSQL :

```
AD_DATADOGHQ_COM: '{
    "web_server": {
        "check_names": ["http_check"],
        "init_configs": [{}],
        "instances": [
            {
                "name": "My Nginx",
                "url": "http://%%host%%:%%port_p8080%%",
                "timeout": 1
            }
        ]
    }
    "postgres-service-name": {
        "check_names": ["postgres"],
        "init_configs": [{}],
        "instances": [
            {
                "host": "%%host%%",
                "port": 5432,
                "username": "%%username%%",
                "dbname": "%%dbname%%",
                "password": "%%password%%"
            }
        ],
        "variables": {
            "host": "$.credentials.host",
            "username": "$.credentials.Username",
            "password": "$.credentials.Password",
            "dbname": "$.credentials.database_name"
        }
    }
}'
```

Cet exemple montre la variable d'environnement `VCAP_SERVICES` associée :

```
VCAP_SERVICES: '{
    "my-postgres-service": [
        {
            "credentials": {
                Password: "1234",
                Username: "User1234",
                host: "postgres.example.com",
                database_name: "my_db",
            },
            "name": "postgres-service-name",
        }
    ]
}'
```

Dans l'exemple ci-dessus, le premier élément, `web_server`, représente une configuration pour un service exécuté au sein de l'application.
Il ne comprend pas de `variables` et utilise les template variables `%%host%%` et `%%port%%` disponibles via Autodiscovery.

Le deuxième élément, `postgres-service-name`, représente une configuration pour un service lié à l'application.
Pour résoudre les template variables, il utilise le dictionnaire `variables` afin de définir les valeurs utilisées dans la configuration de l'instance.
Le dictionnaire contient un objet JSONPath qui indique l'emplacement des valeurs des variables du service `postgres-service-name` défini dans la variable d'environnement `VCAP_SERVICES`.

Consultez la section [Checks de cluster][35] pour en savoir plus sur Autodiscovery via l'Agent de cluster Datadog.

#### Améliorer les performances de CCCache relatives au miss du cache

Pour la version `7.40.1` et les versions ultérieures de l'Agent Datadog, vous pouvez ajouter plus de flags pour mieux contrôler le comportement de CCCache ainsi que le nombre d'appels d'API :

- `refresh_on_cache_miss` pour contrôler le comportement de miss du cache
- Décomposez `advanced_tags` en `sidecars_tags` et `isolation_segments_tags`

#### Tagging amélioré pour les conteneurs d'application et la découverte de processus

Une fois les deux versions liées, l'Agent de cluster Datadog fournit automatiquement des métadonnées au niveau du cluster que les Agents de nœud joignent en tant que tags à leurs conteneurs d'application Cloud Foundry correspondants.

### Déployer le Firehose Nozzle de Datadog

Datadog propose une version BOSH du Firehose Nozzle de Datadog. Après avoir importé la version dans votre Director, ajoutez le Nozzle à un déploiement existant, ou créez un nouveau déploiement qui inclut uniquement le Nozzle. Les instructions ci-dessous s'appliquent dans le cas d'un ajout à un déploiement Cloud Foundry existant qui dispose d'un Loggregator Firehose fonctionnel.

#### Importer la version de Datadog dans votre Director BOSH

```text
# v1 de l'interface de ligne de commande BOSH
bosh upload release http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
# v2 de l'interface de ligne de commande BOSH
bosh upload-release -e <ENV_BOSH> http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
```

Si vous souhaitez créer votre propre version, consultez le [référentiel du Firehose Nozzle de Datadog][21].

#### Configurer un client UAA

Dans le manifeste qui contient votre configuration UAA, ajoutez un nouveau client au Nozzle de Datadog pour que les tâches puissent accéder au Firehose :

```yaml
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

Effectuez un redéploiement pour ajouter l'utilisateur.

#### Ajouter des tâches Firehose Nozzle

Configurez une ou plusieurs tâches Nozzle dans votre manifeste principal de déploiement Cloud Foundry (`cf-manifest.yml`) :

```yaml
jobs:
#- instances: 4
#  name: une_autre_tache
#  ...
# ajouter plus d'instances si une seule tâche ne tient pas le rythme de Firehose
- instances: 1
  name: datadog_nozzle_z1
  networks:
    # un réseau que vous avez configuré ailleurs dans le manifeste
    - name: cf1
  # un resource_pool que vous avez configuré ailleurs dans le manifeste
  resource_pool: small_z1
  templates:
    - name: datadog-firehose-nozzle
      release: datadog-firehose-nozzle
  properties:
    datadog:
      api_key: "<VOTRE_CLÉ_API_DATADOG>"
      api_url: https://api.datadoghq.com/api/v1/series
      #  intervalle en secondes entre les transmissions vers Datadog. Valeur par défaut : 15.
      flush_duration_seconds: 15
    loggregator:
      # ne PAS ajouter '/firehose' ni même une barre oblique à la fin de l'URL : 'ws://<host>:<port>' fonctionne
      # par exemple, ws://traffic-controller.your-cf-domain.com:8081
      traffic_controller_url: "<URL_LOGGREGATOR>"
    nozzle:
      # ajouter le tag 'deployment:<NOM_DÉPLOIEMENT>' à chaque métrique Firehose
      deployment: "<NOM_DÉPLOIEMENT>"
      #  valeur de votre choix (firehose diffuse uniformément les données entre les tâches avec le même subscription_id)
      subscription_id: datadog-nozzle
      # pour le développement uniquement
      # disable_access_control: true
      # pour le développement uniquement ; activer si votre UAA n'utilise pas de certificat vérifiable
      # insecure_ssl_skip_verify: true
    uaa:
      client: datadog-firehose-nozzle # le nom du client que vous venez de configurer
      client_secret: "<SECRET_TOUT_JUSTE_CONFIGURÉ>"
      url: <URL_UAA> # par exemple, https://uaa.votre-domaine-cf.com:8443
```

Pour passer en revue toutes les options de configuration disponibles, consultez le [référentiel Firehose Nozzle de Datadog][22].

Dans le même manifeste, ajoutez le nom et la version du Nozzle de Datadog :

```yaml
releases:
    # - name: "<UNE_AUTRE_VERSION>"
    #   version: <x.y.z>
    # ...
    - name: datadog-firehose-nozzle
      version: '<VERSION_DÉJÀ_IMPORTÉE>' # préciser le numéro de la version (x.y.z et non 'latest')
```

Pour vérifier quelle version de `datadog-firehose-nozzle` a été importée, exécutez `bosh releases`.

#### Redéployer le déploiement

```text
# v1 de l'interface de ligne de commande BOSH
bosh deployment cf-manifest.yml
bosh -n deploy --recreate
# v2 de l'interface de ligne de commande BOSH
bosh -n -d cf-manifest -e <BOSH_ENV> deploy --recreate cf-manifest.yml
```

#### Vérifier que le Firehose Nozzle recueille des données

Dans [Metrics Explorer][23], recherchez des métriques qui commencent par `cloudfoundry.nozzle`.

{{< img src="integrations/cloud_foundry/cloud-foundry-nozzle-metrics.png" alt="Le Metrics Explorer dans Datadog avec cloudfoundry.nozzle saisi dans la barre de recherche" >}}

#### Contrôler le préfixe des métadonnées de l'application

Vous pouvez activer ou désactiver le préfixe des métadonnées de l'application dans les métriques d'application Firehose Nozzle.

{{< img src="integrations/cloud_foundry/enable_metadata_app_prefix.png" alt="Les paramètres du carré d'intégration dans Datadog avec la case Enable Metadata App Metrics Prefix décochée" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[2]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[3]: https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html
[4]: https://github.com/cloudfoundry/multi-buildpack
[5]: https://github.com/cloudfoundry/multi-buildpack#usage
[6]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html
[7]: https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip
[8]: https://github.com/cf-platform-eng/meta-buildpack
[15]: https://bosh.io/docs/bosh-cli.html
[16]: https://bosh.io/docs/cli-v2.html#install
[17]: https://bosh.io/docs/runtime-config.html#addons
[18]: https://github.com/DataDog/datadog-agent-boshrelease
[19]: https://github.com/DataDog/datadog-agent-boshrelease/blob/master/jobs/dd-agent/spec
[20]: https://app.datadoghq.com/infrastructure/map
[21]: https://github.com/DataDog/datadog-firehose-nozzle-release
[22]: https://github.com/DataDog/datadog-firehose-nozzle-release/blob/master/jobs/datadog-firehose-nozzle/spec
[23]: https://app.datadoghq.com/metric/explorer
[24]: /fr/integrations/system/#metrics
[25]: /fr/integrations/network/#metrics
[26]: /fr/integrations/disk/#metrics
[27]: /fr/integrations/ntp/#metrics
[28]: https://github.com/cloudfoundry/loggregator-api
[29]: https://docs.cloudfoundry.org/running/all_metrics.html
[30]: /fr/profiler/enabling/
[32]: /fr/integrations/faq/pivotal_architecture
[33]: https://github.com/DataDog/datadog-cluster-agent-boshrelease/blob/master/jobs/datadog-cluster-agent/spec
[34]: /fr/containers/cluster_agent/setup/?tab=daemonset#secure-cluster-agent-to-agent-communication
[35]: /fr/containers/cluster_agent/clusterchecks/