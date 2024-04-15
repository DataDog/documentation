---
description: Exécuter des tests API et Browser Synthetic à partir d'emplacements privés
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: Blog
  text: Surveiller vos emplacements privés Synthetic avec Datadog
- link: /getting_started/synthetics/private_location
  tag: Documentation
  text: Débuter avec les emplacements privés
- link: /synthetics/private_locations/monitoring
  tag: Documentation
  text: Surveiller vos emplacements privés
- link: /synthetics/private_locations/dimensioning
  tag: Documentation
  text: Dimensionner vos emplacements privés
- link: /synthetics/api_tests
  tag: Documentation
  text: Configurer un test API
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
  tag: Terraform
  text: Créer et gérer des emplacements privés Synthetic avec Terraform

title: Exécuter des tests Synthetic à partir d'emplacements privés
---

## Présentation

Les emplacements privés vous permettent de **surveiller des applications internes ou des endpoints privés** qui ne sont pas accessibles sur l’Internet public. Ils servent également à effectuer les actions suivantes :

* **Créer des emplacements Synthetic personnalisés** dans des zones stratégiques pour votre entreprise
* **Vérifier les performances des applications dans votre environnement de CI interne** avant de mettre en production de nouvelles fonctionnalités avec les [tests continus et le CI/CD][1]
* **Comparer les performances des applications** à l'intérieur et à l'extérieur de votre réseau interne

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Diagramme de l'architecture montrant le fonctionnement dʼun emplacement privé dans la surveillance Synthetic" style="width:100%;">}}

Les emplacements privés sont des conteneurs Docker ou des services Windows que vous pouvez installer au sein de votre réseau privé. Une fois que vous avez créé et installé un emplacement privé, vous pouvez lui assigner des [tests Synthetic][2], comme vous le feriez pour un emplacement géré.

Votre worker d'emplacement privé récupère vos configurations de test à partir des serveurs Datadog via HTTPS, exécute le test selon un programme ou à la demande et renvoie les résultats du test aux serveurs Datadog. Vous pouvez ensuite visualiser les résultats des tests effectués sur vos emplacements privés exactement de la même façon que pour les tests exécutés à partir d'emplacements gérés :

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Assigner un test Synthetic à un emplacement privé" style="width:100%;">}}

## Prérequis

Pour utiliser les emplacements privés pour des [tests continus][23], vous devez utiliser la version 1.27.0 ou une version ultérieure.

{{< tabs >}}
{{% tab "Docker" %}}

Les emplacements privés correspondent à des conteneurs Docker installables sur n'importe quelle entité au sein de votre réseau privé. Vous pouvez accéder à l'[image du worker de l'emplacement privé][101] sur Google Container Registry. L'image peut être exécutée sur Linux ou Windows si le [Docker Engine][102] est disponible sur votre host. Elle peut également être exécutée avec le mode de conteneurs de Linux.

[101]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[102]: https://docs.docker.com/engine/install/

{{% /tab %}}
{{% tab "Windows" %}}

Les emplacements privés sont des services Windows vous permettant dʼeffectuer des installations nʼimporte où au sein de votre réseau privé à lʼaide dʼun [fichier MSI][101]. Exécutez ce fichier à partir de la machine virtuelle ou physique sur laquelle vous souhaitez installer lʼemplacement privé.

Les exigences liées à cette machine sont indiquées dans le tableau ci-dessous. Les scripts PowerShell doivent être activés sur la machine sur laquelle vous installez le worker de lʼemplacement privé.

| Système | Prérequis |
|---|---|
| Système d'exploitation | Windows Server 2016, Windows Server 2019 ou Windows 10. |
| RAM | 4 Go minimum. 8 Go recommandés. |
| CPU | Processeur Intel ou AMD avec prise en charge 64-bit. Processeur de 2,8 GHz ou plus recommandé. |

**Remarque** : pour que Windows Private Locations exécute des tests de navigateurs, ces derniers (comme Chrome, Edge ou Firefox) doivent être installés sur lʼordinateur Windows.

Vous devez installer la version 4.7.2 ou ultérieure de .NET sur votre ordinateur avant de pouvoir utiliser le programme dʼinstallation de MSI.

{{< site-region region="gov" >}}

<div class="alert alert-danger">La conformité à la norme FIPS nʼest pas prise en charge pour les emplacements privés qui transmettent des données à <code>ddog-gov.com</code>. Pour désactiver ceci, utilisez lʼoption <a href"="https://docs.datadoghq.com/synthetics/private_locations/configuration/?tab=docker#all-configuration-options"><code>--disableFipsCompliance</code></a>.</div>

{{< /site-region >}}

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-1.43.0.amd64.msi

{{% /tab %}}
{{< /tabs >}}

### Endpoints des emplacements privés Datadog

Pour extraire les configurations de test et renvoyer les résultats de test, le worker d'emplacement privé doit avoir accès aux endpoints de l'API Datadog suivants.

{{< site-region region="us" >}}

| Port | Endpoint                               | Description                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.com`      | Utilisé par l'emplacement privé pour extraire les configurations de test et renvoyer les résultats de test à Datadog à l'aide d'un protocole interne basé sur le [protocole Signature Version 4 d'AWS][1]. |
| 443  | `intake-v2.synthetics.datadoghq.com` pour les versions >=0.2.0 et <=1.4.0   | Utilisé par l'emplacement privé pour renvoyer les artefacts de test Browser, comme les captures d'écran, les erreurs et les ressources.       |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="eu" >}}

| Port | Endpoint                           | Description                                                    |
| ---- | ---------------------------------- | -------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.eu`   | Utilisé par l'emplacement privé pour extraire les configurations de test et renvoyer les résultats de test à Datadog à l'aide d'un protocole interne basé sur le [protocole Signature Version 4 d'AWS][1]. |

**Remarque** : ces domaines pointent vers un ensemble d'adresses IP statiques. Vous pouvez trouver ces adresses sur la page https://ip-ranges.datadoghq.eu.

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us3" >}}

| Port | Endpoint                                | Description                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.us3.datadoghq.com`  | Utilisé par l'emplacement privé pour extraire les configurations de test et renvoyer les résultats de test à Datadog à l'aide d'un protocole interne basé sur le [protocole Signature Version 4 d'AWS][1]. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="ap1" >}}

| Port | Endpoint                                | Description                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.ap1.datadoghq.com`  | Utilisé par l'emplacement privé pour extraire les configurations de test et renvoyer les résultats de test à Datadog à l'aide d'un protocole interne basé sur le [protocole Signature Version 4 d'AWS][1]. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us5" >}}

| Port | Endpoint                              | Description                                                    |
| ---- | ------------------------------------- | -------------------------------------------------------------- |
| 443  | `intake.synthetics.us5.datadoghq.com` | Utilisé par l'emplacement privé pour extraire les configurations de test et renvoyer les résultats de test à Datadog à l'aide d'un protocole interne basé sur le [protocole Signature Version 4 d'AWS][1]. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="gov" >}}

| Port | Endpoint                         | Description                                                                                                                                                                                                                                                                       |
|------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 443  | `intake.synthetics.ddog-gov.com` | Utilisé par l'emplacement privé pour extraire les configurations de test et renvoyer les résultats de test à Datadog à l'aide d'un protocole interne basé sur le [protocole Signature Version 4 d'AWS][1]. Pour la version 1.32.0 et les versions ultérieures, ces requêtes sont conformes aux normes Federal Information Processing Standards (FIPS). |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

## Configurer votre emplacement privé

Seuls les utilisateurs disposant du rôle **Synthetics Private Locations Write** peuvent créer des emplacements privés. Pour en savoir plus, consultez la rubrique [Autorisations](#autorisations).

### Créer votre emplacement privé

Accédez à [**Synthetic Monitoring** > **Settings** > **Private Locations**][22], puis cliquez sur **Add Private Location**.

{{< img src="synthetics/private_locations/synthetics_pl_add_1.png" alt="Créer un emplacement privé" style="width:90%;">}}

Remplissez les détails de votre emplacement privé :

1. Indiquez le **nom** et la **description** de votre emplacement privé.
2. Ajoutez les **tags** que vous souhaitez associer à votre emplacement privé.
3. Choisissez l'une de vos **clés d'API** existantes. La sélection d'une clé d'API est nécessaire pour autoriser les communications entre votre emplacement privé et Datadog. Si vous ne possédez aucune clé d'API, cliquez sur **Generate API key** pour en créer une sur la page dédiée. Seuls les champs `Name` et `API key` sont requis.
4. Définissez les autorisations d'accès pour votre emplacement privé, puis cliquez sur **Save Location and Generate Configuration File**. Datadog crée alors votre emplacement privé et génère le fichier de configuration associé.

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="Ajouter des détails à un emplacement privé" style="width:85%;">}}

### Configurer votre emplacement privé

Configurez votre emplacement privé en personnalisant le fichier de configuration généré. Lorsque vous ajoutez des paramètres de configuration initiale, tels que des [proxies](#configuration-d-un-proxy) et des [IP réservées et bloquées](#bloquer-des-ip-reservees) dans la section **Step 3**, le fichier de configuration généré est automatiquement modifié dans la section **Step 4**.

Certaines options avancées vous permettent d'ajuster votre configuration à votre réseau interne. Pour en savoir plus sur la commande `help`, consultez la section relative à la [configuration][5].

#### Configuration d'un proxy

Si le trafic entre votre emplacement privé et Datadog doit passer par un proxy, spécifiez l'URL du proxy en question au format `http://<VOTRE_UTILISATEUR>:<VOTRE_MDP>@<VOTRE_IP>:<VOTRE_PORT>` pour ajouter le paramètre `proxyDatadog` associé à votre fichier de configuration généré.

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="Ajouter un proxy au fichier de configuration de votre emplacement privé" style="width:90%;">}}

#### Bloquer des IP réservées

Par défaut, les utilisateurs de Synthetic peuvent créer des tests Synthetic sur des endpoints avec n'importe quelle IP. Si vous souhaitez empêcher les utilisateurs de créer des tests sur des IP internes sensibles de votre réseau, activez le bouton **Block reserved IPs** pour bloquer un ensemble de plages d'IP réservées par défaut ([Registre d'adresses IPv4][6] et [Registre d'adresses IPv6][7]), puis définissez le paramètre `enableDefaultBlockedIpRanges` associé sur `true` dans le fichier de configuration généré.

Si certains des endpoints que vous voulez tester se trouvent dans une ou plusieurs des plages d'IP réservées bloquées, vous pouvez mettre leurs IP et/ou leurs CIDR sur liste blanche afin d'ajouter les paramètres `allowedIPRanges` associés à votre fichier de configuration généré.

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="Configurer des IP réservées" style="width:90%;">}}

### Afficher votre fichier de configuration

Après avoir ajouté les options appropriées au fichier de configuration de votre emplacement privé, vous pouvez copier ce fichier et le coller dans votre répertoire de travail. Le fichier de configuration contient les secrets utilisés pour l'authentification de l'emplacement privé, les configurations de test chiffrées ainsi que les résultats de test chiffrés.

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="Configurer des IP réservées" style="width:90%;">}}

Datadog ne stocke pas vos secrets. Vous devez donc les stocker localement avant de cliquer sur **View Installation Instructions**.

**Remarque :** vous devez pouvoir spécifier à nouveau ces secrets si vous décidez d’ajouter des workers, ou d’installer des workers sur un autre host.

### Installer votre emplacement privé

Vous pouvez utiliser les variables d'environnement `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` et `DATADOG_PRIVATE_KEY` dans la définition de votre tâche.

Lancez votre emplacement privé sur :

{{< tabs >}}

{{% tab "Docker" %}}

Exécutez cette commande pour démarrer votre worker d'emplacement privé en montant votre fichier de configuration dans le conteneur. Assurez-vous que votre fichier `<NOM_FICHIER_CONFIGURATION_WORKER>.json` est placé dans `/etc/docker` et non dans le dossier de base :

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**Remarque :** si vous avez bloqué des IP réservées, ajoutez les [capacités Linux][1] `NET_ADMIN` au conteneur de votre emplacement privé.

Cette commande lance un conteneur Docker et prépare votre emplacement privé à l'exécution de tests. **Datadog vous conseille d'exécuter le conteneur en mode détaché avec la stratégie de redémarrage adéquate.**

#### Certificats racine

Vous pouvez importer des certificats racine personnalisés dans vos emplacements privés afin que vos tests API et Browser effectue la liaison SSL via vos propres fichiers `.pem`.

Lorsque vous exécutez les conteneurs de vos emplacements privés, montez les fichiers de certificat `.pem` pertinents sur `/etc/datadog/certs`, comme vous le feriez pour le fichier de configuration de vos emplacements privés. Ces certificats font figure d'autorité de certification de confiance et sont utilisés lors de l'exécution des tests.

Pour en savoir plus sur les paramètres des emplacements privés réservés aux administrateurs, consultez la section relative à la [configuration][2].

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[2]: https://docs.datadoghq.com/fr/synthetics/private_locations/configuration/#private-locations-admin

{{% /tab %}}

{{% tab "Docker Compose" %}}

1. Créez un fichier `docker-compose.yml` avec :

    ```yaml
    version: "3"
    services:
        synthetics-private-location-worker:
            image: datadog/synthetics-private-location-worker:latest
            volumes:
                - PATH_TO_PRIVATE_LOCATION_CONFIG_FILE:/etc/datadog/synthetics-check-runner.json
    ```
    **Remarque :** si vous avez bloqué des IP réservées, ajoutez les [capacités Linux][1] `NET_ADMIN` au conteneur de votre emplacement privé.

2. Lancez votre conteneur avec :

    ```shell
    docker-compose -f docker-compose.yml up
    ```

#### Certificats racine

Vous pouvez importer des certificats racine personnalisés dans vos emplacements privés afin que vos tests API et Browser effectue la liaison SSL via vos propres fichiers `.pem`.

Lorsque vous exécutez les conteneurs de vos emplacements privés, montez les fichiers de certificat `.pem` pertinents sur `/etc/datadog/certs`, comme vous le feriez pour le fichier de configuration de vos emplacements privés. Ces certificats font figure d'autorité de certification de confiance et sont utilisés lors de l'exécution des tests.

Pour en savoir plus sur les paramètres des emplacements privés réservés aux administrateurs, consultez la section relative à la [configuration][2].

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[2]: https://docs.datadoghq.com/fr/synthetics/private_locations/configuration/#private-locations-admin

{{% /tab %}}

{{% tab "Podman" %}}

La configuration Podman est similaire à celle de Docker. Vous devez toutefois définir `NET_RAW` pour pouvoir prendre en charge les tests ICMP.

1. Exécutez `sysctl -w "net.ipv4.ping_group_range = 0 2147483647"` depuis le host sur lequel le conteneur s'exécute.
2. Exécutez la commande suivante pour démarrer votre worker d'emplacement privé en montant votre fichier de configuration sur le conteneur. Assurez-vous que votre fichier `<NOM_FICHIER_CONFIGURATION_WORKER>.json` peut être monté sur le conteneur :

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

   Si vous avez configuré le blocage des IP réservées, ajoutez les capacités Linux `NET_ADMIN` au conteneur de votre emplacement privé.

Cette commande lance un conteneur Podman et prépare votre emplacement privé à l'exécution de tests. Datadog vous conseille d'exécuter le conteneur en mode détaché avec la stratégie de redémarrage adéquate.


{{% /tab %}}

{{% tab "Déploiement Kubernetes" %}}

Pour déployer de façon sécurisée le worker des emplacements privés, définissez une ressource de secret Kubernetes et montez-la dans le conteneur à l'emplacement `/etc/datadog/synthetics-check-runner.json`.

1. Créez un secret Kubernetes avec le fichier JSON précédemment créé en exécutant la commande suivante :

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Utilisez les déploiements pour décrire le statut souhaité associé à vos emplacements privés. Créez le fichier `private-location-worker-deployment.yaml` suivant :

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: datadog-private-location-worker
      namespace: default
    spec:
      selector:
        matchLabels:
          app: private-location
      template:
        metadata:
          name: datadog-private-location-worker
          labels:
            app: private-location
        spec:
          containers:
          - name: datadog-private-location-worker
            image: datadog/synthetics-private-location-worker
            volumeMounts:
            - mountPath: /etc/datadog/synthetics-check-runner.json
              name: worker-config
              subPath: <MY_WORKER_CONFIG_FILE_NAME>
          volumes:
          - name: worker-config
            secret:
              secretName: private-location-worker-config
    ```

    **Remarque :** si vous avez bloqué des IP réservées, ajoutez les [capacités Linux][1] `NET_ADMIN` au conteneur de votre emplacement privé.

3. Appliquez la configuration :

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

Pour OpenShift, exécutez l'emplacement privé avec la SCC `anyuid`. Cette opération est requise pour garantir l'exécution de votre test Browser.

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{% tab "Chart Helm" %}}

Vous pouvez définir dans vos paramètres de configuration des variables d'environnement qui pointent vers des secrets existants que vous avez configurés. Pour créer des variables d'environnement avec des secrets, consultez la [documentation Kubernetes][3] (en anglais).

Méthode alternative :

1. Ajoutez l'[emplacement privé Datadog Synthetic][1] à vos référentiels Helm :

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. Installez le chart avec le nom de version `<NOM_VERSION>` à l'aide du fichier JSON précédemment créé :

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

**Remarque :** si vous avez bloqué des IP réservées, ajoutez les [capacités Linux][2] `NET_ADMIN` au conteneur de votre emplacement privé.

[1]: https://github.com/DataDog/helm-charts/tree/master/charts/synthetics-private-location
[2]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data

{{% /tab %}}

{{% tab "ECS" %}}

Créez une définition de tâche EC2 correspondant à celle indiquée ci-dessous. Remplacez chaque paramètre par la valeur correspondante figurant dans le fichier de configuration de l'emplacement privé que vous avez généré précédemment :

```yaml
{
    ...
    "containerDefinitions": [
        {
            "command": [
                "--site='...'",
                "--locationID='...'",
                "--accessKey='...'",
                "--datadogApiKey='...'",
                "--secretAccessKey='...'",
                "--privateKey='-----BEGIN RSA PRIVATE KEY-----XXXXXXXX-----END RSA PRIVATE KEY-----'",
                "--publicKey.pem='-----BEGIN PUBLIC KEY-----XXXXXXXX-----END PUBLIC KEY-----'",
                "--publicKey.fingerprint='...'"
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2"
    ],
    ...
}
```

**Remarques :**

- Si vous avez bloqué des IP réservées, configurez un [linuxParameters][1] afin d'octroyer les capacités `NET_ADMIN` aux conteneurs de vos emplacements privés.
- Si vous utilisez les variables d'environnement `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` et `DATADOG_PRIVATE_KEY`, vous n'avez pas besoin de les inclure à la section `"command": [ ]`.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{% /tab %}}

{{% tab "Fargate" %}}

Créez une définition de tâche Fargate correspondant à celle indiquée ci-dessous. Remplacez chaque paramètre par la valeur correspondante figurant dans le fichier de configuration de l'emplacement privé que vous avez généré précédemment :

```yaml
{
    ...
    "containerDefinitions": [
        {
            "command": [
                "--site='...'",
                "--locationID='...'",
                "--accessKey='...'",
                "--datadogApiKey='...'",
                "--secretAccessKey='...'",
                "--privateKey='-----BEGIN RSA PRIVATE KEY-----XXXXXXXX-----END RSA PRIVATE KEY-----'",
                "--publicKey.pem='-----BEGIN PUBLIC KEY-----XXXXXXXX-----END PUBLIC KEY-----'",
                "--publicKey.fingerprint='...'"
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2",
        "FARGATE"
    ],
    ...
}
```

**Remarque :** puisque l'option de pare-feu de l'emplacement privé n'est pas prise en charge sur AWS Fargate, le paramètre `enableDefaultBlockedIpRanges` ne peut pas être défini sur `true`.

{{% /tab %}}

{{% tab "EKS" %}}

Étant donné que Datadog s'intègre déjà à Kubernetes et AWS, la plateforme est prête pour la surveillance de EKS.

1. Créez un secret Kubernetes avec le fichier JSON précédemment créé en exécutant la commande suivante :

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Utilisez les déploiements pour décrire le statut souhaité associé à vos emplacements privés. Créez le fichier `private-location-worker-deployment.yaml` suivant :

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: datadog-private-location-worker
      namespace: default
    spec:
      selector:
        matchLabels:
          app: private-location
      template:
        metadata:
          name: datadog-private-location-worker
          labels:
            app: private-location
        spec:
          containers:
          - name: datadog-private-location-worker
            image: datadog/synthetics-private-location-worker
            volumeMounts:
            - mountPath: /etc/datadog/synthetics-check-runner.json
              name: worker-config
              subPath: <MY_WORKER_CONFIG_FILE_NAME>
          volumes:
          - name: worker-config
            configMap:
              name: private-location-worker-config
    ```

    **Remarque :** si vous avez bloqué des IP réservées, configurez un contexte de sécurité afin d'octroyer les [capacités Linux][1] `NET_ADMIN` aux conteneurs de vos emplacements privés.

3. Appliquez la configuration :

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}
{{% tab "Windows via GUI" %}}

1. Téléchargez le [fichier `datadog-synthetics-worker-<version>.amd64.msi`][101] et exécutez-le depuis la machine sur laquelle vous souhaitez installer lʼemplacement privé.
1. Cliquez sur **Next** sur la page dʼaccueil, lisez le texte de lʼEULA et acceptez les conditions dʼutilisation. Cliquez sur **Next**.
1. Changez lʼemplacement de lʼinstallation de lʼapplication ou conservez les réglages par défaut. Cliquez sur **Next**.
1. Pour configurer votre emplacement privé Windows, vous pouvez :
   - coller et saisir une configuration JSON pour le worker de votre emplacement privé Synthetics Datadog. Ce fichier est créé par Datadog lorsque vous [créez un emplacement privé][102].
   - parcourir ou saisir un chemin de fichier contenant une configuration JSON pour le worker de votre emplacement privé Synthetics Datadog.
   - Vous pouvez laisser ce champ vide et exécuter `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=<PathToYourConfiguration>` dans lʼinvite de ligne de commande de Windows une fois lʼinstallation terminée.

   {{< img src="synthetics/private_locations/configuration_selector_paste.png" alt="Assistant du worker de lʼemplacement privé Synthetics, programme dʼinstallation de MSI. Lʼoption 'Paste in a JSON configuration' est sélectionnée. Un champ de texte est affiché pour cette configuration JSON." style="width:80%;" >}}

1. Vous pouvez appliquer les options de configuration suivantes :

   {{< img src="synthetics/private_locations/settings.png" alt="Assistant du worker dʼemplacement privé Synthetics, programme dʼinstallation de MSI. Les réglages du pare-feu et des logs sont affichés." style="width:80%;" >}}

   Appliquer les règles du pare-feu nécessitées par ce programme au pare-feu Windows
   : Autorisez le programme dʼinstallation à appliquer les règles du pare-feu lors de lʼinstallation et à les supprimer lors de la désinstallation.

   Appliquer des règles pour bloquer les IP réservées dans le pare-feu Windows
   : Configurez des règles pour bloquer Chrome, Firefox et Edge (si installés) et ajoutez des règles pour bloquer des plages dʼadresses IP réservées sortantes dans le pare-feu Windows.

   Activer la journalisation de fichier
   : Autorisez le worker dʼemplacement privé Synthetics à logguer des fichiers dans le répertoire dʼinstallation.

   Jours de rotation des logs
   : indique le nombre de jours pendant lesquels les logs sont conservés avant leur suppression du système local.

   Verbosité des logs
   : indique la verbosité de la console et du logging de fichiers pour le worker de lʼemplacement privé Synthetics.

1. Cliquez sur **Next** et **Install** pour lancer le processus dʼinstallation.

Une fois que le processus est terminé, cliquez sur **Finish** dans la page signalant la fin de lʼinstallation.

<div class="alert alert-warning">Si vous avez saisi votre configuration JSON, le service Windows lance son exécution à lʼaide de cette configuration. Si vous nʼavez pas saisi votre configuration, exécutez <code>C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=< CheminVersVotreConfiguration ></code> depuis une invite de commande ou utilisez le raccourci du <code>menu Démarrer</code> pour lancer le worker de lʼemplacement privé Synthetics.</div>

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-1.43.0.amd64.msi
[102]: https://app.datadoghq.com/synthetics/settings/private-locations

{{% /tab %}}
{{% tab "Windows via CLI" %}}

1. Téléchargez le [fichier `datadog-synthetics-worker-<version>.amd64.msi`][101] et exécutez-le depuis la machine sur laquelle vous souhaitez installer lʼemplacement privé.
2. Exécutez lʼune des commandes suivantes dans le répertoire où vous avez téléchargé le programme dʼinstallation :

   - Dans un terminal PowerShell :

     ```powershell
     Start-Process msiexec "/i datadog-synthetics-worker-<version>-beta.amd64.msi /quiet /qn WORKERCONFIG_FILEPATH=C:\ProgramData\Datadog-Synthetics\worker-config.json";
     ```

   - Ou dans un terminal de commande :

     ```cmd
     msiexec /i datadog-synthetics-worker-1.43.0-beta.amd64.msi /quiet /qn WORKERCONFIG_FILEPATH=C:\ProgramData\Datadog-Synthetics\worker-config.json
     ```

Dʼautres paramètres peuvent être ajoutés :

| Paramètre facultatif | Définition | Valeur | Valeur par défaut | Type |
|---|---|---|---|---|
| APPLYDEFAULTFIREWALLRULES | Applique les règles du pare-feu nécessaires au programme. | 1 | S. O. | 0 : désactivé<br>1 : activé |
| APPLYFIREWALLDEFAULTBLOCKRULES | Bloquez des adresses IP réservées pour chaque navigateur que vous avez installé (Chrome, Edge et Firefox). Le blocage de connexions loopback nʼest pas possible dans le pare-feu Windows. | 0 | S. O. | 0 : désactivé<br>1 : activé |
| LOGGING_ENABLED | Lorsque cette option est activée, elle permet de configurer les logs de fichiers. Ces derniers sont stockés dans le répertoire de lʼinstallation, dans le dossier des logs. | 0 | `--enableFileLogging` | 0 : désactivé<br>1 : activé |
| LOGGING_VERBOSITY | Configure la verbosité de lʼenregistrement de logs pour le programme. Ceci impacte les logs de console et de fichiers. | Ceci impacte les logs de console et de fichiers. | `-vvv` | `-v`: Error<br>`-vv`: Warning<br>`-vvv`: Info<br>`vvvv` : debugging |
| LOGGING_MAXDAYS | La durée en jours pendant laquelle les logs sont conservés sur le système avant leur suppression. Il peut sʼagir de nʼimporte quel chiffre si lʼinstallation nʼest pas surveillée. | 7 | `--logFileMaxDays` | Nombre entier |
| WORKERCONFIG_FILEPATH | Ceci doit être remplacé par le chemin vers votre fichier de configuration JSON du worker de lʼemplacement privé Synthetics. Placez ce chemin entre guillemets sʼil contient des espaces. | <None> | `--config` | Chaîne |

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-1.43.0.amd64.msi

{{% /tab %}}
{{< /tabs >}}

#### Configurer des sondes d'activité et de disponibilité

Ajoutez une sonde d'activité ou de disponibilité pour permettre à votre orchestrateur de vérifier que les workers fonctionnent correctement.

Pour les sondes de disponibilité, vous aurez besoin d'activer les status probes d'emplacement privé sur le port `8080` dans le déploiement de votre emplacement privé. Pour en savoir plus, consultez la section [Configuration des emplacements privés][5].

{{< tabs >}}

{{% tab "Docker Compose" %}}

```yaml
healthcheck:
  retries: 3
  test: [
    "CMD", "wget", "-O", "/dev/null", "-q", "http://localhost:8080/liveness"
  ]
  timeout: 2s
  interval: 10s
  start_period: 30s
```

{{% /tab %}}

{{% tab "Déploiement Kubernetes" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}

{{% tab "Chart Helm" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}

{{% tab "ECS" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/usr/bin/wget", "-O", "/dev/null", "-q", "http://localhost:8080/liveness"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "Fargate" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "wget -O /dev/null -q http://localhost:8080/liveness || exit 1"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "EKS" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}

{{< /tabs >}}

#### Configurations supplémentaires pour les checks de santé

<div class="alert alert-danger">Cette méthode d'ajout de check de santé pour un emplacement privé n'est plus prise en charge. Datadog recommande d'utiliser des sondes d'activité et de disponibilité..</div>

Le fichier `/tmp/liveness.date` des conteneurs d'emplacement privé est mis à jour après chaque polling réussi auprès de Datadog (par défaut, toutes les 2 s). Le conteneur est considéré comme non sain si aucun polling n'a été effectué depuis un certain temps. Exemple : aucune récupération au cours de la dernière minute.

Utilisez la configuration ci-dessous pour créer des checks de santé sur vos conteneurs avec `livenessProbe` :

{{< tabs >}}

{{% tab "Docker Compose" %}}

```yaml
healthcheck:
  retries: 3
  test: [
    "CMD", "/bin/sh", "-c", "'[ $$(expr $$(cat /tmp/liveness.date) + 300000) -gt $$(date +%s%3N) ]'"
  ]
  timeout: 2s
  interval: 10s
  start_period: 30s
```

{{% /tab %}}

{{% tab "Déploiement Kubernetes" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{% tab "Chart Helm" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{% tab "ECS" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/bin/sh -c '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "Fargate" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/bin/sh -c '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "EKS" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{< /tabs >}}

### Mettre à niveau une image dʼemplacement privé

Pour mettre à niveau un emplacement privé existant, cliquez sur lʼicône **Gear** dans le volet latéral de lʼemplacement privé et cliquez sur **Installation instructions**.

{{< img src="synthetics/private_locations/pl_edit_config.png" alt="Accéder au workflow de configuration pour un emplacement privé" style="width:90%;" >}}

Exécutez ensuite la [commande de configuration correspondant à votre environnement](#installer-votre-emplacement-privé
) pour obtenir la dernière version de lʼimage de lʼemplacement privé.

**Remarque** : si vous utilisez `docker run` pour lancer votre image dʼemplacement privé et si vous avez déjà installé lʼimage dʼemplacement privé à lʼaide du tag `latest`, assurez-vous dʼajouter le tag `--pull=always` to the `docker run` command to make sure the newest version is pulled rather than relying on the cached version of the image that may exist locally with the same `latest`.

### Tester votre endpoint interne

Lorsqu'au moins un worker d'emplacement privé a commencé à envoyer des données à Datadog, le statut de l'emplacement privé devient vert :

{{< img src="synthetics/private_locations/pl_reporting.png" alt="Envoi de données par l'emplacement privé" style="width:90%;">}}

Le statut de santé `REPORTING` et un statut de monitor associé s'affiche dans la liste Private Locations de la page **Settings**.

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="Statut de santé et de monitor de lʼemplacement privé" style="width:100%;">}}

Commencez à tester votre premier endpoint interne en lançant un test rapide dessus. Vérifiez que vous obtenez la réponse attendue :

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="Test rapide sur un emplacement privé" video="true" width="90%">}}

**Remarque** : Datadog envoie uniquement le trafic sortant depuis votre emplacement privé. Le trafic entrant n'est pas transmis.

## Lancer des tests Synthetic à partir de votre emplacement privé

Créez un test API, API à plusieurs étapes ou Browser, puis sélectionnez les **emplacements privés** de votre choix.

{{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Assigner un test Synthetic à un emplacement privé" style="width:90%;">}}

Utilisez vos emplacements privés de la même manière que les emplacements gérés par Datadog : assignez des [tests Synthetic][2] à des emplacements privés, visualisez les résultats des tests, récupérez des [métriques Synthetic][11], etc.

## Redimensionner votre emplacement privé

Étant donné que vous pouvez exécuter plusieurs workers pour un seul emplacement privé avec un seul fichier de configuration, vous pouvez procéder à un **scaling horizontal** de vos emplacements privés en y ajoutant ou en supprimant des workers. Lorsque vous effectuez cette opération, assurez-vous de définir un paramètre `concurrency` et d'attribuer des ressources de worker qui conviennent aux types et au nombre de tests que vous souhaitez que votre emplacement privé exécute.

Vous pouvez également procéder à un **scaling vertical** de vos emplacements privés en augmentant la charge que les workers de vos emplacements privés peuvent gérer. Là encore, vous devez utiliser le paramètre `concurrency` pour ajuster le nombre maximum de tests que vos workers sont autorisés à exécuter et mettre à jour les ressources attribuées à vos workers.

Pour en savoir plus, consultez la section [Dimensionner vos emplacements privés][18].

Afin de pouvoir utiliser des emplacements privés pour des tests continus, définissez une valeur pour le paramètre `concurrency`. Vous pourrez ainsi contrôler la parallélisation. Pour en savoir plus, consultez la section relative aux [tests continus][23].

## Surveiller votre emplacement privé

La quantité de ressources allouées initialement doit être cohérente avec le nombre et le type de tests que vous souhaitez exécuter depuis votre emplacement privé. Toutefois, le meilleur moyen de savoir si vous devez redimensionner vos emplacements privés est de les surveiller attentivement. La [surveillance des emplacements privés][19] vous permet d'obtenir des insights à propos des performances et de la santé de vos emplacements privés, ainsi que des métriques et monitors prêts à l'emploi.

Pour en savoir plus, consultez la section [Surveillance des emplacements privés][19].

## Aide

Par défaut, seuls les utilisateurs disposant du rôle Admin Datadog peuvent créer des emplacements, les supprimer et consulter les directives d'installation connexes.

Les utilisateurs disposant des rôles [Admin ou Standard Datadog][20] peuvent consulter les emplacements privés, les rechercher et leur assigner des tests Synthetic. Pour permettre à un utilisateur d'accéder à la [page **Private Locations**][22], attribuez-lui l'un de ces deux [rôles par défaut][19].

SI vous utilisez des [rôles personnalisés][21], ajoutez votre utilisateur à un rôle disposant des autorisations `synthetics_private_location_read` et `synthetics_private_location_write`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_testing/cicd_integrations
[2]: /fr/synthetics/
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[4]: https://docs.docker.com/engine/install/
[5]: /fr/synthetics/private_locations/configuration/
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[10]: https://docs.docker.com/engine/reference/builder/#healthcheck
[11]: /fr/synthetics/metrics
[12]: /fr/synthetics/api_tests/
[13]: /fr/synthetics/multistep?tab=requestoptions
[14]: /fr/synthetics/browser_tests/?tab=requestoptions
[16]: /fr/agent/
[17]: /fr/synthetics/metrics/
[18]: /fr/synthetics/private_locations/dimensioning
[19]: /fr/synthetics/private_locations/monitoring
[20]: /fr/account_management/rbac/permissions
[21]: /fr/account_management/rbac#custom-roles
[22]: https://app.datadoghq.com/synthetics/settings/private-locations
[23]: /fr/continuous_testing/cicd_integrations/configuration
