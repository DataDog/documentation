---
aliases:
- /fr/synthetics/private_locations
description: Exécuter des tests API et de navigateur Synthetic à partir d'emplacements
  privés
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
- link: https://www.datadoghq.com/architecture/protect-sensitive-data-with-synthetics-private-location-runners/
  tag: Architecture Center
  text: Protégez les données sensibles avec Synthetics Private Location Runners
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
  tag: Site externe
  text: Créer et gérer des emplacements privés Synthetic avec Terraform
title: Exécuter des tests Synthetic à partir d'emplacements privés
---
## Présentation {#overview}

Les emplacements privés vous permettent de **surveiller des applications internes ou tout endpoint privé** qui ne sont pas accessibles depuis l'Internet public. Ils peuvent également être utilisés pour :

* **Créer des emplacements Synthetic personnalisés** dans des zones cruciales pour votre activité.
* **Vérifier les performances des applications dans votre environnement CI interne** avant de publier de nouvelles fonctionnalités en production avec [Continuous Testing et CI/CD][28].
* **Comparer les performances des applications** depuis l'intérieur et l'extérieur de votre réseau interne.
* **[Authentifier les tests de Synthetic Monitoring à l'aide de Kerberos SSO][33]** pour les sites et API internes basés sur Windows.

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Schéma d'architecture du fonctionnement d'un emplacement privé dans Synthetic Monitoring" style="width:100%;">}}

Les emplacements privés se présentent sous forme de conteneurs Docker ou de services Windows que vous pouvez installer au sein de votre réseau privé. Après avoir créé et installé un emplacement privé, vous pouvez lui attribuer des [tests Synthetic][29], comme pour n'importe quel emplacement géré.

Votre agent d'emplacement privé récupère vos configurations de test depuis les serveurs de Datadog via HTTPS, exécute le test selon une planification ou à la demande, et renvoie les résultats du test aux serveurs de Datadog. Vous pouvez ensuite visualiser les résultats des tests de vos emplacements privés exactement de la même manière que vous visualiseriez des tests exécutés depuis des emplacements gérés :

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Attribuer un test Synthetic à un emplacement privé" style="width:100%;">}}

## Prérequis {#prerequisites}

Pour utiliser les emplacements privés pour des [tests Continuous Testing][23], vous devez utiliser la version 1.27.0 ou une version ultérieure.

{{< tabs >}}
{{% tab "Docker" %}}

Les emplacements privés sont des conteneurs Docker que vous pouvez installer n'importe où au sein de votre réseau privé. Vous pouvez accéder à l'[image de l'agent d'emplacement privé][101] sur Docker Hub. Il peut s'exécuter sur un système d'exploitation Linux ou Windows si le [moteur Docker][102] est disponible sur votre hôte et peut fonctionner en mode conteneurs Linux.*****

{{< site-region region="gov,gov2" >}}

Si vous avez besoin de la prise en charge FIPS, utilisez l'[image conforme FIPS][26] sur Docker Hub.

[26]: https://hub.docker.com/r/datadog/synthetics-private-location-worker-fips

{{< /site-region >}}

***** **L'utilisation et le fonctionnement de ce logiciel sont régis par le contrat de licence utilisateur final disponible [ici][103].**

[101]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[102]: https://docs.docker.com/engine/install/
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Helm" %}}

Les emplacements privés sont des déploiements Kubernetes que vous pouvez installer sur votre cluster Kubernetes avec Helm. Le [chart Helm][101] peut s'exécuter sur Kubernetes basé sur Linux.

**Remarque** : L'utilisation et le fonctionnement de ce logiciel sont régis par le [Contrat de licence utilisateur final][103].

[101]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Windows" %}}

Les emplacements privés sont des services Windows que vous pouvez installer n'importe où au sein de votre réseau privé à l'aide d'un [fichier MSI][101]. Exécutez ce fichier depuis la machine virtuelle ou physique sur laquelle vous souhaitez installer l'emplacement privé.*****

***** **L'utilisation et le fonctionnement de ce logiciel sont régis par le contrat de licence utilisateur final disponible [ici][102].**

Les exigences de cette machine sont listées dans le tableau ci-dessous. Les scripts PowerShell doivent être activés sur la machine où vous installez le worker d'emplacement privé.

| Configuration | requise |
|---|---|
| Système d'exploitation | Windows Server 2025, Windows Server 2022, Windows Server 2019, Windows Server 2016, Windows 11 ou Windows 10. |
| RAM | 4 Go minimum. 8 Go recommandés. |
| Processeur | Processeur Intel ou AMD avec prise en charge 64 bits. Processeur 2,8 GHz ou plus rapide recommandé. |

**Remarque** Les tests de navigateur nécessitent des navigateurs installés sur le serveur Windows :
- Windows Private Location 1.71.0 et versions ultérieures : Chrome et Firefox sont inclus. Installez Edge séparément.
- Windows Private Location 1.70.0 et versions antérieures : Installez Chrome, Edge et Firefox.

Vous devez installer la version 4.7.2 ou ultérieure de .NET sur votre ordinateur avant de pouvoir utiliser le programme dʼinstallation de MSI.

**Activer le mode cryptographique FIPS 140-2** : </br>
Activez les modules cryptographiques conformes aux normes FIPS pour les communications sécurisées. L'hôte Windows doit fonctionner en mode FIPS Windows pour utiliser cette option. Disponible dans l'emplacement privé `v1.63.0` et versions ultérieures.

{{< img src="synthetics/private_locations/synthetics_pl_windows_fips.png" alt="Assistant Synthetics Private Location Worker, programme d'installation MSI. Le paramètre du mode cryptographique FIPS 140-2 est affiché." style="width:80%;" >}}

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{< /tabs >}}

### Endpoints des emplacements privés Datadog {#datadog-private-locations-endpoints}

Pour extraire les configurations de test et renvoyer les résultats de test, le worker d'emplacement privé doit avoir accès aux endpoints de Datadog API suivants.

| Port | Endpoint                               | Description                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------- |
| 443  | {{< region-param key=synthetics_intake_endpoint code="true" >}} | Utilisé par l'emplacement privé pour récupérer les configurations de test et envoyer les résultats de test à Datadog en utilisant un protocole interne basé sur le [protocole AWS Signature Version 4][1].{{< site-region region="gov,gov2" >}} Pour les versions `1.32.0` et ultérieures, les requêtes provenant des **emplacements privés conteneurisés Linux** sont conformes aux normes FIPS (Federal Information Processing Standards). Pour les **emplacements privés Windows**, le chiffrement conforme aux normes FIPS est pris en charge à partir de la version `1.63.0`.{{< /site-region >}} |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< site-region region="eu" >}}

**Remarque** : Ces domaines pointent vers un ensemble d'adresses IP statiques. Ces adresses sont disponibles sur https://ip-ranges.datadoghq.eu.

{{< /site-region >}}

## Configurer votre emplacement privé {#set-up-your-private-location}

Seuls les utilisateurs disposant du rôle **Synthetics Private Locations Write** peuvent créer des emplacements privés. Pour plus d'informations, consultez [Autorisations](#permissions).

### Créez votre emplacement privé {#create-your-private-location}

Accédez à [{{< ui >}}Synthetic Monitoring{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Private Locations{{< /ui >}}][22] et cliquez sur {{< ui >}}Add Private Location{{< /ui >}}.

{{< img src="synthetics/private_locations/synthetics_pl_add_1.png" alt="Créez un emplacement privé" style="width:90%;">}}

Remplissez les détails de votre emplacement privé :

1. Spécifiez le {{< ui >}}Name{{< /ui >}} et le {{< ui >}}Description{{< /ui >}} de votre emplacement privé.
2. Ajoutez les {{< ui >}}Tags{{< /ui >}} que vous souhaitez associer à votre emplacement privé.
3. Choisissez l'une de vos {{< ui >}}API Keys{{< /ui >}} existantes. La sélection d'une clé d'API permet la communication entre votre emplacement privé et Datadog. Si vous n'avez pas de clé d'API existante, cliquez sur {{< ui >}}Generate API key{{< /ui >}} pour en créer une sur la page dédiée. Seuls les champs `Name` et `API key` sont obligatoires.
4. Définissez l'accès à votre emplacement privé et cliquez sur {{< ui >}}Save Location and Generate Configuration File{{< /ui >}}. Datadog crée votre emplacement privé et génère le fichier de configuration associé.

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="Ajouter des détails à l'emplacement privé" style="width:85%;">}}

### Configurez votre emplacement privé {#configure-your-private-location}

Configurez votre emplacement privé en personnalisant le fichier de configuration généré. Lorsque vous ajoutez des paramètres de configuration initiaux tels que [proxies](#proxy-configuration) et [adresses IP réservées bloquées](#blocking-reserved-ips) à l' **étape 3**, votre fichier de configuration généré se met à jour automatiquement à l' **étape 4**.

Vous pouvez accéder aux options avancées pour ajuster la configuration en fonction de votre configuration réseau interne. Pour plus d'informations sur la commande `help`, consultez [Configuration][5].

#### Configuration du proxy {#proxy-configuration}

Si le trafic entre votre emplacement privé et Datadog doit passer par un proxy, spécifiez votre URL de proxy comme `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` pour ajouter le paramètre `proxyDatadog` associé à votre fichier de configuration généré.

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="Ajouter un proxy à votre fichier de configuration d'emplacement privé" style="width:90%;">}}

#### Blocage des IP réservées {#blocking-reserved-ips}

Par défaut, les utilisateurs Synthetic peuvent créer des tests Synthetic sur des endpoints en utilisant n'importe quelle IP. Si vous souhaitez empêcher les utilisateurs de créer des tests sur des IP internes sensibles de votre réseau, activez le bouton {{< ui >}}Block reserved IPs{{< /ui >}} pour bloquer un ensemble par défaut de plages d'IP réservées ([registre d'adresses IPv4][6] et [registre d'adresses IPv6][7]) et définissez le paramètre `enableDefaultBlockedIpRanges` associé sur `true` dans votre fichier de configuration généré.

Si certains des endpoints que vous souhaitez tester sont situés dans une ou plusieurs des plages d'IP réservées bloquées, vous pouvez ajouter leurs IP et/ou CIDR aux listes autorisées pour ajouter les paramètres `allowedIPRanges` associés à votre fichier de configuration généré.

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="Configurer les IP réservées" style="width:90%;">}}

### Afficher votre fichier de configuration {#view-your-configuration-file}

Après avoir ajouté les options appropriées à votre fichier de configuration d'emplacement privé, vous pouvez copier et coller ce fichier dans votre répertoire de travail. Le fichier de configuration contient des secrets pour l'authentification de l'emplacement privé, le déchiffrement de la configuration des tests et le chiffrement des résultats des tests.

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="Configurer les IP réservées" style="width:90%;">}}

Datadog ne stocke pas vos secrets ; vous devez donc les stocker localement avant de cliquer sur {{< ui >}}View Installation Instructions{{< /ui >}}.

**Remarque :** Vous devez être en mesure de référencer à nouveau ces secrets si vous décidez d'ajouter d'autres workers ou d'en installer sur un autre hôte.

### Installer votre emplacement privé {#install-your-private-location}

Vous pouvez utiliser les variables d'environnement `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` et `DATADOG_PRIVATE_KEY` dans votre définition de tâche.

Lancez votre emplacement privé sur :

{{< tabs >}}
{{% tab "Docker" %}}

Exécutez cette commande pour démarrer votre worker d'emplacement privé en montant votre fichier de configuration dans le conteneur. Le `$PWD` dans la commande ci-dessous fait référence au répertoire depuis lequel vous exécutez la commande ; remplacez-le donc par le chemin d'accès à l'emplacement où votre fichier `<MY_WORKER_CONFIG_FILE_NAME>.json` est stocké. Le chemin avant les deux-points (l'emplacement sur votre machine hôte) peut être n'importe quel répertoire ; seul le chemin après les deux-points (`/etc/datadog/synthetics-check-runner.json`) doit correspondre exactement, car c'est là que le worker s'attend à trouver sa configuration à l'intérieur du conteneur :

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**Remarque :** Si vous avez bloqué des IP réservées, ajoutez les `NET_ADMIN` [capacités Linux][26] à votre conteneur d'emplacement privé.

Cette commande démarre un conteneur Docker et prépare votre emplacement privé à exécuter des tests. **Datadog recommande d'exécuter le conteneur en mode détaché avec une politique de redémarrage appropriée.**

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Docker Compose" %}}

1. Créez un fichier `docker-compose.yml` avec :

    ```yaml
    version: "3"
    services:
        synthetics-private-location-worker:
            image: datadog/synthetics-private-location-worker:latest
            volumes:
                - PATH_TO_PRIVATE_LOCATION_CONFIG_FILE:/etc/datadog/synthetics-check-runner.json
    ```
    **Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][26] to your private location container.

2. Démarrez votre conteneur avec :

    ```shell
    docker-compose -f docker-compose.yml up
    ```
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Podman" %}}
La configuration de Podman est très similaire à celle de Docker, cependant, vous devez définir `NET_RAW` comme capacité supplémentaire pour prendre en charge les tests ICMP.

1. Exécutez `sysctl -w "net.ipv4.ping_group_range = 0 2147483647"` depuis l'hôte où le conteneur s'exécute.
2. Exécutez cette commande pour démarrer votre worker d'emplacement privé en montant votre fichier de configuration sur le conteneur. Assurez-vous que votre fichier `<MY_WORKER_CONFIG_FILE_NAME>.json` est accessible pour être monté sur le conteneur :

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

   Si vous avez configuré des adresses IP réservées bloquées, ajoutez les capacités Linux `NET_ADMIN` à votre conteneur d'emplacement privé.

Cette commande démarre un conteneur Podman et rend votre emplacement privé prêt à exécuter des tests. Datadog recommande d'exécuter le conteneur en mode détaché avec une politique de redémarrage appropriée.
{{< /tab >}}

{{% tab "Déploiement Kubernetes" %}}

Pour déployer le worker d'emplacements privés de manière sécurisée, configurez et montez une ressource Secret Kubernetes dans le conteneur sous `/etc/datadog/synthetics-check-runner.json`.

1. Créez un Secret Kubernetes avec le fichier JSON précédemment créé en exécutant la commande suivante :

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Utilisez des déploiements pour décrire l'état souhaité associé à vos emplacements privés. Créez le fichier `private-location-worker-deployment.yaml` suivant :

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

    **Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][26] to your private location container.

3. Appliquez la configuration :

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

Pour OpenShift, exécutez l'emplacement privé avec le SCC `anyuid`. Ceci est requis pour que votre test de navigateur puisse s'exécuter.

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Helm Chart" %}}

Vous pouvez définir des variables d'environnement dans vos paramètres de configuration qui pointent vers des secrets que vous avez déjà configurés. Pour créer des variables d'environnement avec des secrets, consultez la [documentation Kubernetes][3].

Méthode alternative :

1. Ajoutez le [Datadog Synthetics Private Location][2] à vos dépôts Helm :

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. Installez le chart avec le nom de release `<RELEASE_NAME>` en utilisant le fichier JSON précédemment créé :

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

**Remarque :** Si vous avez bloqué des IP réservées, ajoutez les `NET_ADMIN` [capacités Linux][26] à votre conteneur d'emplacement privé.

[2]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "ECS" %}}

Créez une nouvelle définition de tâche EC2 qui correspond à ce qui suit. Remplacez chaque paramètre par la valeur correspondante trouvée dans votre fichier de configuration d'emplacement privé généré précédemment :

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
**Remarques :**

- Si vous avez bloqué des adresses IP réservées, configurez un [linuxParameters][31] pour accorder des capacités `NET_ADMIN` à vos conteneurs d'emplacement privé.
- Si vous utilisez les variables d'environnement `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` et `DATADOG_PRIVATE_KEY`, vous n'avez pas besoin de les inclure dans la section `"command": [ ]`.

[31]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{< /tab >}}

{{% tab "Fargate" %}}

Créez une nouvelle définition de tâche Fargate qui correspond à ce qui suit. Remplacez chaque paramètre par la valeur correspondante trouvée dans votre fichier de configuration d'emplacement privé généré précédemment :

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

**Remarque :** Étant donné que l'option de pare-feu d'emplacement privé n'est pas prise en charge sur AWS Fargate, le paramètre `enableDefaultBlockedIpRanges` ne peut pas être défini sur `true`.

{{< /tab >}}

{{% tab "Fargate avec AWS Secrets Manager" %}}

Créez un secret dans AWS Secrets Manager pour stocker tout ou partie de la configuration d'emplacement privé générée précédemment. Gardez à l'esprit que le `publicKey` ne peut pas être conservé tel quel dans le fichier de configuration. Par exemple :

```json
{
    "datadogApiKey": "...",
    "id": "...",
    "site": "...",
    "accessKey": "...",
    "secretAccessKey": "...",
    "privateKey": "...",
    "pem": "...",
    "fingerprint": "..."
}
```

Des autorisations sont requises pour permettre à la définition de tâche et à l'instance AWS Fargate de lire depuis le gestionnaire de secrets. Consultez [Specifying sensitive data using Secrets Manager secrets in Amazon ECS][25] pour plus d'informations.

Créez une définition de tâche Fargate qui correspond à l'exemple suivant, en remplaçant les valeurs dans la liste des secrets par l'ARN du secret que vous avez créé à l'étape précédente. Par exemple : `arn:aws:secretsmanager:<region>:<account-id>:secret:<secret_arn>:<secret_key>::`.

Si vous n'avez pas enregistré toute la configuration dans Secrets Manager, vous pouvez toujours transmettre la valeur sous forme d'arguments de chaîne codés en dur.

```yaml
{
    ...
    "containerDefinitions": [
        {
            "entryPoint": [
                "/bin/bash",
                "-c"
            ],
            "command": [
                "/home/dog/scripts/entrypoint.sh --locationID=$locationID --publicKey.fingerprint=$fingerprint"
            ],
            "secrets": [
              {
                "name": "DATADOG_ACCESS_KEY",
                "valueFrom": "..."
              },
              {
                "name": "DATADOG_API_KEY",
                "valueFrom": "...",
              },
              {
                "name": "fingerprint",
                "valueFrom": "...",
              },
              {
                "name": "locationID",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_PUBLIC_KEY_PEM",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_PRIVATE_KEY",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_SECRET_ACCESS_KEY",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_SITE",
                "valueFrom": "...",
              }
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

**Remarque :** Étant donné que l'option de pare-feu d'emplacement privé n'est pas prise en charge sur AWS Fargate, le paramètre `enableDefaultBlockedIpRanges` ne peut pas être défini sur `true`.

[25]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html

{{< /tab >}}

{{% tab "EKS" %}}

Étant donné que Datadog s'intègre déjà à Kubernetes et AWS, la plateforme est prête pour la surveillance de EKS.

1. Créez un Secret Kubernetes avec le fichier JSON précédemment créé en exécutant la commande suivante :

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Utilisez des déploiements pour décrire l'état souhaité associé à vos emplacements privés. Créez le fichier `private-location-worker-deployment.yaml` suivant :

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

    **Note:** If you have blocked reserved IPs, configure a security context to grant `NET_ADMIN` [Linux capabilities][26] to your private location containers.

3. Appliquez la configuration :

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Windows via l'interface graphique" %}}

1. Téléchargez le fichier [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi`][101] et exécutez ce fichier depuis la machine sur laquelle vous souhaitez installer l'emplacement privé.
1. Cliquez sur {{< ui >}}Next{{< /ui >}} sur la page de bienvenue, lisez l'EULA et acceptez les conditions générales. Cliquez sur {{< ui >}}Next{{< /ui >}}.
1. Modifiez l'emplacement où l'application sera installée, ou conservez les paramètres par défaut. Cliquez sur {{< ui >}}Next{{< /ui >}}.
1. Pour configurer votre emplacement privé Windows, vous pouvez soit :
   - Collez et saisissez une configuration JSON pour votre Datadog Synthetics Private Location Worker. Ce fichier est généré par Datadog lorsque vous [créez un emplacement privé][102].
   - Parcourez ou saisissez un chemin d'accès vers un fichier contenant une configuration JSON pour votre Datadog Synthetics Private Location Worker.
   - Vous pouvez laisser ce champ vide et exécuter `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=<PathToYourConfiguration>` dans l'invite de commande Windows une fois l'installation terminée.

   {{< img src="synthetics/private_locations/configuration_selector_paste.png" alt="Assistant Synthetics Private Location Worker, programme d'installation MSI. L'option « Coller une configuration JSON » est sélectionnée. Un champ de texte pour cette configuration JSON s'affiche." style="width:80%;" >}}

1. Vous pouvez appliquer les options de configuration suivantes :

   {{< img src="synthetics/private_locations/synthetics_pl_windows_fips.png" alt="Assistant Synthetics Private Location Worker, programme d'installation MSI. Le paramètre du mode cryptographique FIPS 140-2 est affiché." style="width:80%;" >}}

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

   Activer le mode cryptographique FIPS 140-2
   : Activer les modules cryptographiques conformes à la norme FIPS pour des communications sécurisées. L'hôte Windows doit fonctionner en mode FIPS Windows pour utiliser cette option. Disponible dans Private Location v1.63.0 et versions ultérieures.

1. Cliquez sur {{< ui >}}Next{{< /ui >}} et {{< ui >}}Install{{< /ui >}} pour démarrer le processus d'installation.

Une fois le processus terminé, cliquez sur {{< ui >}}Finish{{< /ui >}} sur la page de fin d'installation.

<div class="alert alert-danger">Si vous avez saisi votre configuration JSON, le service Windows démarre en utilisant cette configuration. Si vous n'avez pas saisi votre configuration, exécutez <code>C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=< PathToYourConfiguration ></code> depuis une invite de commande ou utilisez le <code>start menu</code> raccourci pour démarrer le Synthetics Private Location Worker.</div>

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://app.datadoghq.com/synthetics/settings/private-locations

{{< /tab >}}

{{% tab "Windows via CLI" %}}

1. Téléchargez le fichier [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi`][101] et exécutez ce fichier depuis la machine sur laquelle vous souhaitez installer l'emplacement privé.
2. Exécutez l'une des commandes suivantes dans le répertoire où vous avez téléchargé l'installateur :

   - Dans un terminal PowerShell :

     ```powershell
     Start-Process msiexec "/i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn CONFIG_FILEPATH=<path_to_your_worker_config_file>";
     ```

   - Ou dans un terminal de commande :

     ```cmd
     msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn CONFIG_FILEPATH=<path_to_your_worker_config_file>
     ```

Dʼautres paramètres peuvent être ajoutés :

| Paramètre optionnel | Définition | Valeur | Valeur par défaut | Type |
|---|---|---|---|---|
| APPLYDEFAULTFIREWALLRULES | Applique les règles de pare-feu nécessaires au programme. | 1 | N/A | 0: Désactivé<br>1: Activé |
| APPLYFIREWALLDEFAULTBLOCKRULES | Bloque les adresses IP réservées pour chaque navigateur installé (Chrome, Edge et Firefox). Le blocage des connexions de bouclage n'est pas possible dans le Pare-feu Windows. | 0 | N/A | 0: Désactivé<br>1: Activé |
| LOGGING_ENABLED | Lorsqu'il est activé, cela configure la journalisation des fichiers. Ces logs sont stockés dans le répertoire d'installation sous le dossier logs. | 0 | `--enableFileLogging` | 0: Désactivé<br>1: Activé |
| LOGGING_VERBOSITY | Configure la verbosité de la journalisation pour le programme. Ceci impacte les logs de console et de fichiers. | Cela affecte les logs de la console et des fichiers. | `-vvv` | `-v`: Erreur<br>`-vv`: Avertissement<br>`-vvv`: Info<br>`vvvv`: Débogage |
| LOGGING_MAXDAYS | Nombre de jours pour conserver les logs de fichiers sur le système avant de les supprimer. Peut être n'importe quel nombre lors de l'exécution d'une installation sans assistance. | 7 | `--logFileMaxDays` | Entier |
| CONFIG_FILEPATH | Ceci doit être remplacé par le chemin d'accès à votre fichier de configuration JSON pour Synthetics Private Location Worker. Entourez ce chemin de guillemets si votre chemin contient des espaces. | <None> | `--config` | Chaîne |

Pour activer le mode cryptographique FIPS 140-2, définissez la variable d'environnement `ENABLE_FIPS=1` avant d'exécuter l'exécutable du worker. L'hôte Windows doit fonctionner en mode FIPS Windows pour utiliser cette option. Disponible dans Private Location v1.63.0 et versions ultérieures.

Exemple :

```cmd
set ENABLE_FIPS=1 && .\synthetics-pl-worker.exe --config "<PathToYourConfiguration>"
```

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi

{{< /tab >}}
{{< /tabs >}}

Pour plus d'informations sur les paramètres des emplacements privés pour les administrateurs, consultez [Configuration][32].

#### Certificats racine {#root-certificates}

Vous pouvez téléverser des certificats racine personnalisés sur vos emplacements privés afin que vos tests d'API et de navigateur effectuent la négociation SSL en utilisant vos propres fichiers `.pem`.

{{< tabs >}}
{{% tab "Conteneur Linux" %}}

Lors du démarrage de vos conteneurs d'emplacement privé, montez les fichiers de certificat `.pem` pertinents vers `/etc/datadog/certs` de la même manière que vous montez votre fichier de configuration d'emplacement privé. Ces certificats sont considérés comme des autorités de certification approuvées et sont utilisés lors de l'exécution des tests.

<div class="alert alert-info">Si vous combinez tous vos <code>.pem</code> fichiers en un seul, l'ordre des certificats dans le fichier est important. Il est nécessaire que le certificat intermédiaire précède le certificat racine pour établir avec succès une chaîne de confiance.</div>

{{% /tab %}}

{{% tab "Service Windows" %}}

Pour installer des certificats racine pour des emplacements privés sur un service Windows, suivez les étapes suivantes :

1. Ouvrez l'application Éditeur du Registre.
2. Accédez à l'entrée `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\synthetics-private-location`.
3. Créez une clé de Registre nommée `Environment` avec le type de valeur `Multi-string`.

<div class="alert alert-info">Votre certificat doit se trouver dans le même dossier que votre service Synthetic Monitoring :
par défaut : <code>C:\Program Files\Datadog-Synthetics\Synthetics</code>.</div>

4. Définissez la valeur `NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem`

   {{< img src="synthetics/private_locations/windows_pl_set_service.png" alt="Description de votre image" style="width:100%;" >}}

5. Ouvrez l'application Services et rechargez le service Datadog Synthetic Monitoring Private Location.

{{% /tab %}}

{{% tab "Windows autonome" %}}

Pour installer des certificats racine pour des emplacements privés sur un processus Windows autonome avec `synthetics-private-location.exe`, suivez les étapes suivantes :

1. Ouvrez votre invite de commande Windows ou PowerShell.

2. Définissez la variable d'environnement et appelez l'exécutable.

Exemple :

```text
set NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem && .\synthetics-private-location.exe --config "C:\ProgramData\Datadog-Synthetics\Synthetics\worker-config.json"
```

Pour activer le mode cryptographique FIPS 140-2, incluez `ENABLE_FIPS=1` :

```text
set ENABLE_FIPS=1 && set NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem && .\synthetics-private-location.exe --config "C:\ProgramData\Datadog-Synthetics\Synthetics\worker-config.json"
```

L'hôte Windows doit fonctionner en mode FIPS Windows pour utiliser cette option. Disponible dans Private Location v1.63.0 et versions ultérieures.

{{% /tab %}}
{{< /tabs >}}

#### Configurer des sondes de vivacité et de préparation {#set-up-liveness-and-readiness-probes}

Ajoutez une sonde d'activité ou de disponibilité pour permettre à votre orchestrateur de vérifier que les workers fonctionnent correctement.

Pour les sondes de préparation, vous devez activer les sondes d'état de l'emplacement privé sur le port `8080` dans votre déploiement d'emplacement privé. Pour plus d'informations, consultez [Configuration des emplacements privés][5].

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

{{% tab "Helm Chart" %}}

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

#### Configurations supplémentaires de vérification de l'état de santé {#additional-health-check-configurations}

<div class="alert alert-warning">Cette méthode d'ajout de vérifications de l'état de santé des emplacements privés n'est plus prise en charge. Datadog recommande d'utiliser des sondes de vivacité et de préparation.</div>

Le fichier `/tmp/liveness.date` des conteneurs d'emplacement privé est mis à jour après chaque interrogation réussie de Datadog (2s par défaut). Le conteneur est considéré comme non sain si aucune interrogation n'a été effectuée depuis un certain temps, par exemple : aucune récupération au cours de la dernière minute.

Utilisez la configuration ci-dessous pour configurer les vérifications de l'état de santé sur vos conteneurs avec `livenessProbe` :

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

{{% tab "Helm Chart" %}}

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

### Mettre à niveau une image d'emplacement privé {#upgrade-a-private-location-image}

Pour mettre à niveau un emplacement privé existant, cliquez sur l'icône {{< ui >}}Gear{{< /ui >}} dans le panneau latéral de l'emplacement privé et cliquez sur {{< ui >}}Installation instructions{{< /ui >}}.

{{< img src="synthetics/private_locations/pl_edit_config.png" alt="Accéder au wokflow de configuration pour un emplacement privé" style="width:90%;" >}}

Ensuite, exécutez la [commande de configuration en fonction de votre environnement](#install-your-private-location) pour obtenir la dernière version de l'image de l'emplacement privé.

**Remarque** : Si vous utilisez `docker run` pour lancer votre image d'emplacement privé et que vous avez précédemment installé l'image d'emplacement privé en utilisant le tag `latest`, assurez-vous d'ajouter `--pull=always` à la commande `docker run` pour vous assurer que la version la plus récente est extraite plutôt que de vous fier à la version mise en cache de l'image qui peut exister localement avec le même tag `latest`.

#### Mettre à niveau un emplacement privé Windows {#upgrade-a-windows-private-location}

1. Sauvegardez votre fichier de configuration (`C:\ProgramData\Datadog Synthetics Private Location\config.json`) avant de le mettre à niveau ou de le modifier.
2. Téléchargez le dernier [programme d'installation MSI][34], exécutez-le et suivez les instructions. Si vous êtes invité à modifier ou à mettre à jour votre configuration, utilisez toujours votre fichier sauvegardé.
3. Si vous utilisez l'option **Modifier** du programme d'installation, sélectionnez votre fichier de configuration existant. Laisser le champ vide ou générer une nouvelle configuration remplace votre configuration actuelle.
4. Confirmez que le service du Private Location Worker est en cours d'exécution et qu'il fait référence au bon fichier de configuration.

### Exécutez les dernières versions de navigateur {#run-the-latest-browser-versions}

Les versions de Chrome, Edge et Firefox dans l'image `latest` sont mises à jour à chaque version d'emplacement privé après avoir été testées. Par conséquent, elles peuvent être plus anciennes que les versions les plus récentes publiées par les fournisseurs de navigateurs. Utilisez l'image `browsers-latest` pour exécuter les navigateurs les plus récents et leurs correctifs de sécurité plus rapidement, ce qui réduit les vulnérabilités de navigateur (CVE) signalées pour votre emplacement privé.

L'image `browsers-latest` est reconstruite chaque semaine. Pour l'utiliser, récupérez le tag `browsers-latest` au lieu de `latest` :

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:browsers-latest
```

Pour épingler un agent à une version hebdomadaire spécifique, utilisez le tag daté et immuable publié avec celui-ci, sous la forme `X.Y.Z-rc.N-browsers-YYYY-MM-DD`. Une image conforme à la norme FIPS est publiée sous la forme `datadog/synthetics-private-location-worker-fips:browsers-latest`.

**Remarque** : les navigateurs `browsers-latest` ne sont pas validés sur les emplacements gérés par Datadog, les tests de navigateur peuvent donc être moins stables que sur l'image `latest`. Ce canal privilégie les versions de navigateur les plus récentes au détriment de la stabilité.

### Testez votre endpoint interne {#test-your-internal-endpoint}

Lorsqu'au moins un worker d'emplacement privé a commencé à envoyer des données à Datadog, le statut de l'emplacement privé devient vert :

{{< img src="synthetics/private_locations/pl_reporting.png" alt="Rapports d'emplacement privé" style="width:90%;">}}

Vous pouvez voir un état de santé `REPORTING` et un état de monitor associé affichés dans la liste des emplacements privés sur la page {{< ui >}}Settings{{< /ui >}}.

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="État de santé et état du monitor de l'emplacement privé" style="width:100%;">}}

Commencez à tester votre premier endpoint interne en lançant un test rapide dessus. Vérifiez que vous obtenez la réponse attendue :

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="Test rapide sur emplacement privé" video="true" width="90%">}}

**Remarque :** Datadog envoie uniquement le trafic sortant depuis votre emplacement privé, aucun trafic entrant n'est transmis.

## Lancez des tests Synthetic depuis votre emplacement privé {#launch-synthetic-tests-from-your-private-location}

Créez un test API, API multi-étapes ou de navigateur, et sélectionnez votre {{< ui >}}Private Locations{{< /ui >}} d'intérêt.

{{< img src="synthetics/private_locations/assign-test-pl_3.png" alt="Attribuer un test Synthetic à un emplacement privé" style="width:90%;">}}

Utilisez les emplacements privés tout comme vos emplacements gérés par Datadog : attribuez des [tests Synthetic][29] aux emplacements privés, visualisez les résultats des tests, récupérez des [métriques Synthetic][11], et plus encore.

## Mettez à l'échelle votre emplacement privé {#scale-your-private-location}

Comme vous pouvez exécuter plusieurs agents pour un seul emplacement privé avec un seul fichier de configuration, vous pouvez **mettre à l'échelle horizontalement** vos emplacements privés en ajoutant ou en supprimant des agents. Pour ce faire, assurez-vous de définir un paramètre `concurrency` et d'allouer des ressources aux agents, en accord avec les types et le nombre de tests que vous souhaitez que votre emplacement privé exécute.

Vous pouvez également **mettre à l'échelle verticalement** vos emplacements privés en augmentant la charge que vos agents d'emplacement privé peuvent gérer. De même, vous devez utiliser le paramètre `concurrency` pour ajuster le nombre maximal de tests que vos agents sont autorisés à exécuter et mettre à jour les ressources allouées à vos agents.

Pour en savoir plus, consultez la section [Dimensionner vos emplacements privés][18].

Afin d'utiliser des emplacements privés pour le Continuous Testing, définissez une valeur dans le paramètre `concurrency` pour contrôler votre parallélisation. Pour plus d'informations, consultez [Continuous Testing][23].

## Surveillez votre emplacement privé {#monitor-your-private-location}

Bien que vous ajoutiez initialement des ressources cohérentes avec le nombre et le type de tests à exécuter depuis votre emplacement privé, le moyen le plus simple de savoir si vous devez réduire ou augmenter la capacité de votre emplacement privé est de les surveiller de près. [Private Location Monitoring][19] fournit des informations sur les performances et l'état de votre emplacement privé ainsi que des métriques et des monitors prêts à l'emploi.

Pour en savoir plus, consultez la section [Surveillance des emplacements privés][19].

## Autorisations {#permissions}

Par défaut, seuls les utilisateurs disposant du rôle Datadog Admin peuvent créer des emplacements, les supprimer et consulter les directives d'installation connexes.

Les utilisateurs disposant des [rôles Datadog Admin et Datadog Standard][20] peuvent afficher les emplacements privés, rechercher des emplacements privés et attribuer des tests Synthetic aux emplacements privés. Accordez l'accès à la [page **Emplacements privés**][22] en mettant à niveau votre utilisateur vers l'un de ces deux [rôles par défaut][19].

Si vous utilisez la [fonctionnalité de rôle personnalisé][21], ajoutez votre utilisateur à un rôle personnalisé qui inclut les autorisations `synthetics_private_location_read` et `synthetics_private_location_write`.

<div class="alert alert-warning">Si un test inclut des emplacements privés restreints, la mise à jour du test supprime ces emplacements du test.</div>

## Restreindre l'accès {#restrict-access}

Utilisez le [contrôle d'accès granulaire][24] pour limiter les personnes ayant accès à votre test en fonction des rôles, des équipes ou des utilisateurs individuels :

1. Ouvrez la section des autorisations du formulaire.
2. Cliquez sur {{< ui >}}Edit Access{{< /ui >}}.
  {{< img src="synthetics/settings/grace_2.png" alt="Définissez les autorisations pour votre test à partir du formulaire de configuration des emplacements privés" style="width:100%;" >}}
3. Cliquez sur {{< ui >}}Restrict Access{{< /ui >}}.
4. Sélectionnez des équipes, des rôles ou des utilisateurs.
5. Cliquez sur {{< ui >}}Add{{< /ui >}}.
6. Sélectionnez le niveau d'accès que vous souhaitez associer à chacun d'eux.
7. Cliquez sur {{< ui >}}Done{{< /ui >}}.

<div class="alert alert-info">Vous pouvez consulter les résultats d'un emplacement privé même sans accès Viewer à cet emplacement privé. <br><br>
Restreindre un emplacement privé peut empêcher d'autres utilisateurs de l'ajouter à un test ou de le modifier, mais ils peuvent toujours voir le nom de l'emplacement s'il a été ajouté à un test par un utilisateur autorisé.</div>

| Access level | View PL instructions | View PL metrics | Use PL in test | Edit PL configuration  |
| ------------ | ---------------------| --------------- | -------------- | ---------------------- |
| Aucun accès    |                      |                 |                |                        |
| Viewer       | {{< X >}}            | {{< X >}}       | {{< X >}}      |                        |
| Editor       | {{< X >}}            | {{< X >}}       | {{< X >}}      | {{< X >}}              |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

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
[24]: /fr/account_management/rbac/granular_access
[25]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[26]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[27]: https://docs.datadoghq.com/fr/synthetics/private_locations/configuration/#private-locations-admin
[28]: /fr/continuous_testing/cicd_integrations
[29]: /fr/synthetics/
[30]: https://github.com/DataDog/helm-charts/tree/master/charts/synthetics-private-location
[31]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html
[32]: /fr/synthetics/platform/private_locations/configuration
[33]: /fr/synthetics/guide/kerberos-authentication/
[34]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi