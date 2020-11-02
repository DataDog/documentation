---
title: Exécuter des tests Synthetic à partir d'emplacements privés
kind: documentation
description: Exécuter des tests API et Browser Synthetic à partir d'emplacements privés
further_reading:
  - link: /getting_started/synthetics/private_location
    tag: Documentation
    text: Débuter avec les emplacements privés
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: synthetics/api_tests
    tag: Documentation
    text: Configurer un test API
---
<div class="alert alert-warning">
L'accès à cette fonctionnalité est restreint. Si vous n'êtes pas autorisé à y accéder, contactez l'<a href="https://docs.datadoghq.com/help/">assistance Datadog</a>.
</div>

## Présentation

Les emplacements privés vous permettent de **surveiller des applications internes ou des URL privées** qui ne sont pas accessibles sur l’Internet public. Ils servent également à effectuer les actions suivantes :

* **Créer des emplacements Synthetic personnalisés** dans des zones stratégiques pour votre entreprise
* **Vérifier les performances des applications dans votre environnement d'intégration continue interne** avant de mettre en production de nouvelles fonctionnalités avec les [tests CI/CD Synthetic][1].
* **Comparer les performances des applications** à l'intérieur et à l'extérieur de votre réseau interne

Les emplacements privés sont des conteneurs Docker que vous pouvez installer partout où cela s'avère judicieux dans votre réseau privé. Une fois créés et installés, vous pouvez assigner des [tests Synthetic][2] à vos emplacements privés, comme vous le feriez pour un emplacement géré standard.

Votre worker d'emplacement privé récupère vos configurations de test à partir des serveurs Datadog via HTTPS, exécute le test selon un programme ou à la demande et renvoie les résultats du test aux serveurs Datadog. Vous pouvez ensuite visualiser les résultats des tests effectués sur vos emplacements privés exactement de la même façon que pour les tests exécutés à partir d'emplacements gérés :

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Assigner un test Synthetic à un emplacement privé"  style="width:100%;">}}

## Prérequis

### Docker

Le worker de l'emplacement privé est envoyé en tant que conteneur Docker. L'[image Docker][3] officielle est disponible sur Docker Hub. Le worker peut s'exécuter sur un système d'exploitation basé sur Linux ou Windows si le [Docker Engine][4] est disponible sur votre host. Il peut également s'exécuter avec le mode conteneurs de Linux.

### Endpoints des emplacements privés Datadog

Pour extraire les configurations de test et renvoyer les résultats de test, le worker d'emplacement privé doit avoir accès aux endpoints de l'API Datadog ci-dessous.

{{< site-region region="us" >}}

| Port | Endpoint                                                                                             | Description                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.com` pour les versions 0.1.6+, `api.datadoghq.com` pour les versions <0.1.5   | Utilisé par l'emplacement privé pour extraire les configurations de test et renvoyer les résultats de test à Datadog à l'aide d'un protocole interne basé sur le [protocole Signature Version 4 d'AWS][1]. |
| 443  | `intake-v2.synthetics.datadoghq.com` pour les versions >0.2.0                                             | Utilisé par l'emplacement privé pour renvoyer les artefacts de test Browser (captures d'écran, erreurs, ressources)                                                                         |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="eu" >}}

| Port | Endpoint                                               | Description                                                                                   |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `api.datadoghq.eu`                                | Utilisé par l'emplacement privé pour extraire les configurations de test et renvoyer les résultats de test à Datadog à l'aide d'un protocole interne basé sur le [protocole Signature Version 4 d'AWS][1]. |
| 443  | `intake-v2.synthetics.datadoghq.eu` pour les versions >0.2.0| Utilisé par l'emplacement privé pour renvoyer les artefacts de test Browser (captures d'écran, erreurs, ressources)                                                                            |

**Remarque** : ces domaines pointent vers un ensemble d'adresses IP statiques. Ces adresses sont disponibles sur https://ip-ranges.datadoghq.eu, plus spécifiquement sur https://ip-ranges.datadoghq.eu/api.json pour `api.datadoghq.eu` et sur https://ip-ranges.datadoghq.eu/synthetics-private-locations.json pour `intake-v2.synthetics.datadoghq.eu`.

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

## Configurer votre emplacement privé

### Créer votre emplacement privé

Accédez à _Synthetic Monitoring_ -> _Settings_ -> _Private Locations_ et cliquez sur **Add Private Location** :

{{< img src="synthetics/private_locations/add_pl.png" alt="créer un emplacement privé"  style="width:100%;">}}

**Remarque** : seuls les **administrateurs** peuvent créer des emplacements privés.

Renseignez les détails liés à votre emplacement privé : spécifiez son **nom** et sa **description**, ajoutez les **tags** à appliquer, et choisissez l'une de vos **clés d'API** existantes. La sélection d'une clé d'API est nécessaire pour autoriser les communications entre votre emplacement privé et Datadog. Si vous ne possédez aucune clé d'API, vous pouvez cliquer sur **Generate API key** et en créer une sur la page dédiée.

**Remarque :** seuls les champs `Name` et `API key` sont obligatoires.

Cliquez ensuite sur **Save Location and Generate Configuration File** pour créer votre emplacement privé et générer le fichier de configuration associé (visible à la **3e étape**).

{{< img src="synthetics/private_locations/pl_creation.png" alt="Ajouter les détails de l'emplacement privé"  style="width:90%;">}}

### Configurer votre emplacement privé

Configurez votre emplacement privé en personnalisant le fichier de configuration généré. Les paramètres de configuration initiaux comme le [proxy](#configuration-du-proxy) et les [IP réservées bloquées](#bloquer-des-ip-reservees) sont ajoutés à l'**Étape 2** et sont automatiquement reportés dans le fichier de configuration de l'**Étape 3**. Selon la configuration de votre réseau interne, vous pouvez configurer votre emplacement privé avec des [options avancées](#configuration-avancee).

#### Configuration du proxy

Si le trafic entre votre emplacement privé et Datadog doit passer par un proxy, spécifiez l'URL du proxy en question au format `http://<VOTRE_UTILISATEUR>:<VOTRE_MDP>@<VOTRE_IP>:<VOTRE_PORT>` pour ajouter le paramètre `proxyDatadog` associé à votre fichier de configuration généré.

{{< img src="synthetics/private_locations/pl_proxy.png" alt="Ajouter un proxy au fichier de configuration de votre emplacement privé"  style="width:90%;">}}

[Des options de configuration de proxy avancées][5] sont disponibles.

#### Bloquer des IP réservées

Par défaut, les utilisateurs de Synthetic peuvent créer des tests Synthetic sur des endpoints avec n'importe quelle IP. Si vous souhaitez empêcher les utilisateurs de créer des tests sur des IP internes sensibles de votre réseau, activez le bouton **Block reserved IPs** pour bloquer un ensemble de plages d'IP réservées par défaut ([Registre d'adresses IPv4][6] et [Registre d'adresses IPv6][7]), puis définissez le paramètre `enableDefaultBlockedIpRanges` associé sur `true` dans le fichier de configuration généré.

Si certains des endpoints que vous voulez tester se trouvent dans une ou plusieurs des plages d'IP réservées bloquées, vous pouvez mettre leurs IP et/ou leurs CIDR sur liste blanche afin d'ajouter les paramètres `allowedIPRanges` associés à votre fichier de configuration généré.

{{< img src="synthetics/private_locations/pl_reserved_ips.png" alt="Configurer les IP réservées"  style="width:90%;">}}

[Des options avancées pour la configuration d'IP réservées][8] sont disponibles.

#### Configuration avancée

[Des options de configuration avancées][9] sont disponibles. Pour les afficher, exécutez la commande `help` ci-dessous :

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```

### Afficher votre fichier de configuration

Après avoir ajouté les options appropriées au fichier de configuration de votre emplacement privé, vous pouvez copier-coller le fichier dans votre répertoire de travail.

{{< img src="synthetics/private_locations/pl_view_file.png" alt="Configurer les IP réservées"  style="width:90%;">}}

**Remarque** : le fichier de configuration contient des secrets pour l'authentification de l'emplacement privé, le déchiffrement de la configuration de test et le chiffrement des résultats de test. Datadog ne conserve pas les secrets, veillez donc à les stocker localement avant de quitter l'écran Private Locations. **Vous devez pouvoir spécifier à nouveau ces secrets si vous décidez d’ajouter des workers, ou d’installer des workers sur un autre host.**

### Installer votre emplacement privé

Lancez votre emplacement privé sur :

{{< tabs >}}

{{% tab "Docker" %}}

Exécutez cette commande pour démarrer votre worker d'emplacement privé en montant votre fichier de configuration dans le conteneur. Assurez-vous que votre fichier `<NOM_FICHIER_CONFIGURATION_WORKER>.json` est placé dans `/etc/docker` et non dans le dossier de base :

```shell
docker run --rm -v $PWD/<NOM_FICHIER_CONFIGURATION_WORKER>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**Remarque :** si vous avez bloqué des IP réservées, assurez-vous d'ajouter les [capacités Linux][1] `NET_ADMIN` au conteneur de votre emplacement privé.

Cette commande lance un conteneur Docker et prépare votre emplacement privé à l'exécution de tests. **Nous vous conseillons d'exécuter le conteneur en mode détaché avec la politique de redémarrage adéquate.**

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities

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
    **Remarque :** si vous avez bloqué des IP réservées, assurez-vous d'ajouter les [capacités Linux][1] `NET_ADMIN` au conteneur de votre emplacement privé.

2. Lancez votre conteneur avec :

```shell
docker-compose -f docker-compose.yml up
```

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Créez une ConfigMap Kubernetes avec le fichier JSON précédemment créé en exécutant la commande suivante :

    ```shell
    kubectl create configmap private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Profitez des déploiements pour décrire le statut souhaité associé à vos emplacements privés. Créez le fichier `private-location-worker-deployment.yaml` suivant :

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

    **Remarque :** si vous avez bloqué des IP réservées, assurez-vous d'ajouter les [capacités Linux][1] `NET_ADMIN` au conteneur de votre emplacement privé.

3. Appliquez la configuration :

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{% tab "ECS" %}}

Créez une définition de tâche EC2 correspondant à celle indiquée ci-dessous. Pensez à remplacer chaque paramètre par la valeur correspondante figurant dans le fichier de configuration de l'emplacement privé que vous avez généré précédemment :

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

**Remarque :** si vous avez bloqué des IP réservées, assurez-vous de configurer un [linuxParameters][1] afin d'octroyer les capacités `NET_ADMIN` aux conteneurs de vos emplacements privés.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{% /tab %}}

{{% tab "Fargate" %}}

Créez une nouvelle définition de tâche Fargate correspondant à celle indiquée ci-dessous. Pensez à remplacer chaque paramètre par la valeur correspondante figurant dans le fichier de configuration de l'emplacement privé que vous avez généré précédemment :

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

**Remarque :** l'option de pare-feu de l'emplacement privé n'est pas prise en charge sur AWS Fargate. Par conséquent, le paramètre `enableDefaultBlockedIpRanges` ne peut pas être défini sur `true`.

{{% /tab %}}

{{% tab "EKS" %}}

Étant donné que Datadog s'intègre déjà à Kubernetes et AWS, la plateforme est prête pour la surveillance de EKS.

1. Créez une ConfigMap Kubernetes avec le fichier JSON précédemment créé en exécutant la commande suivante :

    ```shell
    kubectl create configmap private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Tirez parti des déploiements pour décrire le statut souhaité associé à vos emplacements privés. Créez le fichier `private-location-worker-deployment.yaml` suivant :

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

    **Remarque :** si vous avez bloqué des IP réservées, assurez-vous de configurer un contexte de sécurité afin d'octroyer les [capacités Linux][1] `NET_ADMIN` aux conteneurs de vos emplacements privés.

3. Appliquez la configuration :

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{< /tabs >}}

#### Configurer des checks de santé

Ajoutez un check de santé pour permettre à votre orchestrateur de vérifier que les workers fonctionnent correctement.

Le fichier `/tmp/liveness.date` des conteneurs d'emplacement privé est mis à jour après chaque polling réussi auprès de Datadog (500 ms par défaut). Le conteneur est considéré comme non sain si aucun polling n'a été effectué depuis un certain temps. Exemple : aucune récupération au cours de la dernière minute.

Utilisez la configuration ci-dessous pour créer des checks de santé sur vos conteneurs :

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

{{% tab "Kubernetes" %}}

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
    "/bin/sh", "-c", "'[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
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
    "/bin/sh", "-c", "'[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
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

{{< img src="synthetics/private_locations/pl_reporting.png" alt="Envoi de données par l'emplacement privé"  style="width:90%;">}}

Vous pouvez ensuite commencer à tester votre premier endpoint interne en lançant un test rapide sur l'un de vos endpoints internes et en vérifiant que vous obtenez la réponse attendue :

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="Test rapide sur un emplacement privé" video="true" width="80%">}}

## Lancer des tests Synthetic à partir de vos emplacements privés

Si votre emplacement privé communique normalement avec Datadog, le statut de santé `OK` devrait s'afficher dans la liste de vos emplacements privés sur la page **Settings** :

{{< img src="synthetics/private_locations/pl_health.png" alt="Santé de l'emplacement privé"  style="width:90%;">}}

Vous pouvez ensuite vous rendre sur n'importe quel formulaire de création de tests API ou Browser, et cocher les **emplacements privés** qui vous intéressent afin qu'ils exécutent votre test Synthetic en temps et en heure :

{{< img src="synthetics/private_locations/assign_test_pl.png" alt="Assigner un test Synthetic à un emplacement privé"  style="width:80%;">}}

Vos emplacements privés peuvent être utilisés de la même manière que les autres emplacements gérés par Datadog : assignez des [tests Synthetic][2] à des emplacements privés, visualisez les résultats des tests, récupérez des [métriques Synthetic][10], etc.

## Redimensionner vos emplacements privés

Vous pouvez facilement procéder à un **scaling horizontal** de vos emplacements privés en y ajoutant ou en supprimant des workers. Il est possible d'exécuter plusieurs conteneurs pour un même emplacement privé avec un seul fichier de configuration. Chaque worker demande alors à exécuter `N` tests en fonction du nombre de tests autorisés. Lorsque le worker 1 traite des tests, le worker 2 demande les tests suivants, etc.

Vous pouvez également utiliser la valeur du [paramètre `concurrency`][11] pour ajuster le nombre de tests que les workers de vos emplacements privés peuvent exécuter simultanément.

### Configuration matérielle requise

#### Processeur/mémoire

* Exigence de base : 150 mCores/150 MiB

* Exigences supplémentaires par slot :

| Type de test de l'emplacement privé                          | Plage de simultanéité conseillée | Recommandations processus/mémoire |
| --------------------------------------------------- | ----------------------------- | ------------------------- |
| Emplacement privé exécutant des tests API et Browser | Entre 1 et 50                  | 150 mCores/1 GiB par slot   |
| Emplacement privé exécutant uniquement des tests API             | Entre 1 et 200                 | 20 mCores/5 MiB par slot    |
| Emplacement privé exécutant uniquement des tests Browser         | Entre 1 et 50                  | 150 mCores/1 GiB par slot   |

**Exemple :** pour un emplacement privé exécutant à la fois des tests API et Browser, et dont la valeur [`concurrency`][11] est définie par défaut sur `10`, les exigences recommandées sont les suivantes : environ 1,5 core `(150 mCores + (150 mCores * 10 slots))` et 10 GiB de mémoire `(150 M + (1 G * 10 slots))`.

#### Disk

Concernant l'espace disque, nous vous conseillons d'allouer environ 10 MiB/slot (1 MiB/slot pour les emplacements privés exécutant uniquement des tests API).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/ci
[2]: /fr/synthetics/
[3]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[4]: https://docs.docker.com/engine/install/
[5]: /fr/synthetics/private_locations/configuration/#proxy-configuration
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[8]: /fr/synthetics/private_locations/configuration/#reserved-ips-configuration
[9]: /fr/synthetics/private_locations/configuration/
[10]: /fr/synthetics/metrics
[11]: /fr/synthetics/private_locations/configuration/#parallelization-configuration