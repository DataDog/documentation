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
kind: documentation
title: Exécuter des tests Synthetic à partir d'emplacements privés
---

<div class="alert alert-info">
Pour être ajouté à la version bêta des emplacements privés Windows, contactez l'<a href="https://docs.datadoghq.com/help/">assistance Datadog</a>.
</div>

## Présentation

Les emplacements privés vous permettent de **surveiller des applications internes ou des endpoints privés** qui ne sont pas accessibles sur l’Internet public. Ils servent également à effectuer les actions suivantes :

* **Créer des emplacements Synthetic personnalisés** dans des zones stratégiques pour votre entreprise
* **Vérifier les performances des applications dans votre environnement de CI interne** avant de mettre en production de nouvelles fonctionnalités avec les [tests continus et le CI/CD][1]
* **Comparer les performances des applications** à l'intérieur et à l'extérieur de votre réseau interne

Les emplacements privés sont des conteneurs Docker que vous pouvez installer partout où cela s'avère judicieux dans votre réseau privé. Une fois créés et installés, vous pouvez assigner des [tests Synthetic][2] à vos emplacements privés, comme vous le feriez pour un emplacement géré.

Votre worker d'emplacement privé récupère vos configurations de test à partir des serveurs Datadog via HTTPS, exécute le test selon un programme ou à la demande et renvoie les résultats du test aux serveurs Datadog. Vous pouvez ensuite visualiser les résultats des tests effectués sur vos emplacements privés exactement de la même façon que pour les tests exécutés à partir d'emplacements gérés :

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Assigner un test Synthetic à un emplacement privé" style="width:100%;">}}

## Prérequis

### Tests continus

Pour utiliser les emplacements privés pour des [tests continus][23], vous devez utiliser la version 1.27.0 ou une version ultérieure.

### Docker

Les emplacements privés correspondent à des conteneurs Docker installables sur n'importe quelle entité au sein de votre réseau privé. Vous pouvez accéder à l'[image du worker de l'emplacement privé][3] sur Google Container Registry. L'image peut être exécutée sur Linux ou Windows si le [Docker Engine][4] est disponible sur votre host. Elle peut également être exécutée avec le mode de conteneurs de Linux.

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

**Remarque** : ces domaines pointent vers un ensemble d'adresses IP statiques. Ces adresses sont disponibles sur https://ip-ranges.datadoghq.eu, plus spécifiquement sur https://ip-ranges.datadoghq.eu/api.json pour `api.datadoghq.eu` et sur https://ip-ranges.datadoghq.eu/synthetics-private-locations.json pour `intake-v2.synthetics.datadoghq.eu`.

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

Seuls les utilisateurs disposant du rôle **Admin** peuvent créer des emplacements privés. Pour en savoir plus, consultez la rubrique [Autorisations](#autorisations).

### Créer votre emplacement privé

Accédez à [**Synthetic Monitoring** > **Settings** > **Private Locations**][22], puis cliquez sur **Add Private Location**.

{{< img src="synthetics/private_locations/synthetics_pl_add.png" alt="Créer un emplacement privé" style="width:90%;">}}

Remplissez les détails de votre emplacement privé :

1. Indiquez le **nom** et la **description** de votre emplacement privé.
2. Ajoutez les **tags** que vous souhaitez associer à votre emplacement privé. Si vous configurez un emplacement privé pour Windows, cochez la case **This is a Windows Private Location**.
3. Choisissez l'une de vos **clés d'API** existantes. La sélection d'une clé d'API est nécessaire pour autoriser les communications entre votre emplacement privé et Datadog. Si vous ne possédez aucune clé d'API, cliquez sur **Generate API key** pour en créer une sur la page dédiée. Seuls les champs `Name` et `API key` sont requis.
4. Définissez les autorisations d'accès pour votre emplacement privé, puis cliquez sur **Save Location and Generate Configuration File**. Datadog crée alors votre emplacement privé et génère le fichier de configuration associé.

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="Ajouter les détails de l'emplacement privé" style="width:85%;">}}
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
docker run --rm -v $PWD/<NOM_FICHIER_CONFIGURATION_WORKER>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
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

### Tester votre endpoint interne

Lorsqu'au moins un conteneur d'emplacement privé a commencé à envoyer des données à Datadog, le statut de l'emplacement privé devient vert :

{{< img src="synthetics/private_locations/pl_reporting.png" alt="Envoi de données par l'emplacement privé" style="width:90%;">}}

Le statut de santé `REPORTING` s'affiche également dans la liste Private Locations de la page **Settings** :

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting.png" alt="Santé de l'emplacement privé" style="width:95%;">}}

Commencez à tester votre premier endpoint interne en lançant un test rapide dessus. Vérifiez que vous obtenez la réponse attendue :

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="Test rapide sur un emplacement privé" video="true" width="90%">}}

**Remarque** : Datadog envoie uniquement le trafic sortant depuis votre emplacement privé. Le trafic entrant n'est pas transmis.

## Lancer des tests Synthetic à partir de votre emplacement privé

Créez un test API, API à plusieurs étapes ou Browser, puis sélectionnez les **emplacements privés** de votre choix.

{{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Assigner un test Synthetic à un emplacement privé" style="width:90%;">}}

Utilisez vos emplacements privés de la même manière que les emplacements gérés par Datadog : assignez des [tests Synthetic][2] à des emplacements privés, visualisez les résultats des tests, récupérez des [métriques Synthetic][11], etc.

## Redimensionner votre emplacement privé

Étant donné que vous pouvez exécuter plusieurs conteneurs pour un seul emplacement privé avec un seul fichier de configuration, vous pouvez procéder à un **scaling horizontal** de vos emplacements privés en y ajoutant ou en supprimant des workers. Lorsque vous effectuez cette opération, assurez-vous de définir un paramètre `concurrency` et d'attribuer des ressources de worker qui conviennent aux types et au nombre de tests que vous souhaitez que votre emplacement privé exécute.

Vous pouvez également procéder à un **scaling vertical** de vos emplacements privés en augmentant la charge que les conteneurs de vos emplacements privés peuvent gérer. Là encore, vous devez utiliser le paramètre `concurrency` pour ajuster le nombre maximum de tests que vos workers sont autorisés à exécuter et mettre à jour les ressources attribuées à vos workers.

Pour en savoir plus, consultez la section [Dimensionner vos emplacements privés][18].

Afin de pouvoir utiliser des emplacements privés pour des tests continus, définissez une valeur pour le paramètre `concurrency`. Vous pourrez ainsi contrôler la parallélisation. Pour en savoir plus, consultez la section relative aux [tests continus][23].

## Surveiller votre emplacement privé

La quantité de ressources allouées initialement doit être cohérente avec le nombre et le type de tests que vous souhaitez exécuter depuis votre emplacement privé. Toutefois, le meilleur moyen de savoir si vous devez redimensionner vos emplacements privés est de les surveiller attentivement. La [surveillance des emplacements privés][19] vous permet d'obtenir des insights à propos des performances et de la santé de vos emplacements privés, ainsi que des métriques et monitors prêts à l'emploi.

Pour en savoir plus, consultez la section [Surveillance des emplacements privés][19].

## Autorisations

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