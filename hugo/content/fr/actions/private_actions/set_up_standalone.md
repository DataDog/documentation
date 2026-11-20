---
description: Installez, connectez, gérez et mettez à jour un private action runner
  autonome que vous déployez et gérez vous-même avec Docker ou Helm.
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: Documentation
  text: Présentation des Private Actions
- link: actions/private_actions/set_up_agent_based
  tag: Documentation
  text: Configurer un private action runner dans le Datadog Agent
- link: actions/connections
  tag: Documentation
  text: Connexions
title: Configurez un private action runner autonome
---
## Présentation {#overview}

Le private action runner autonome est un conteneur dédié que vous pouvez installer et gérer indépendamment du Datadog Agent avec Docker ou Helm. Il est pris en charge et en mode maintenance : il continue de recevoir des mises à jour de sécurité et de stabilité, et aucune nouvelle fonctionnalité n'est prévue. Pour les nouveaux déploiements, et pour utiliser les politiques d'exécution, exécutez plutôt le runner dans le Datadog Agent. Consultez [Configurer un private action runner dans le Datadog Agent][1].

La configuration du private action runner se fait en trois étapes :

1. [**Installez**](#install-the-runner) le runner avec Docker, Docker Compose ou Kubernetes.
1. [**Connectez**](#connect-the-runner) le runner à Datadog avec une connexion.
1. [**Mettez à jour**](#update-the-runner) le runner à mesure que de nouvelles versions sont publiées.

Un runner autonome est toujours **propriétaire** : en créant un, via l'une des méthodes ci-dessous, il est toujours enregistré sous l'utilisateur créateur, autorisé avec [Connections][2].

## Prérequis {#prerequisites}

- Docker ou un cluster Kubernetes.
- Accès réseau à Datadog sur `https://{{< region-param key=dd_site >}}` and `https://config.{{< region-param key=dd_site >}}`.

## Installez le private action runner {#install-the-runner}

1. Dans Datadog, accédez à [**Action Catalog > Private Action Runners**][3], puis cliquez sur **New Private Action Runner**.
1. Saisissez un nom pour votre runner et sélectionnez les actions autorisées.
1. Créez un répertoire sur votre host où le runner peut stocker sa configuration, tel que `./config`.
1. Déployez votre runner en suivant les étapes correspondant à votre plateforme de conteneurs :

{{< tabs >}}
{{% tab "Docker" %}}

1. Cliquez sur **Docker**.
1. Exécutez la commande `docker run` fournie sur votre host, en remplaçant `./config` par le chemin d'accès au répertoire que vous avez créé pour la configuration du runner.

**Remarque** : Vous pouvez ignorer sans risque l'erreur `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

{{% /tab %}}
{{% tab "Docker Compose" %}}

1. Cliquez sur **Docker Compose**.
1. Créez un fichier `docker-compose.yaml` et ajoutez le YAML fourni, ou ajoutez la section `runner` à un fichier Docker Compose existant.
1. Remplacez `./config` par le chemin d'accès au répertoire que vous avez créé pour la configuration du runner.
1. Exécutez `docker compose up -d`.

**Remarque** : Vous pouvez ignorer sans risque l'erreur `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

1. Cliquez sur **Kubernetes**.
1. Confirmez que `kubectl` et `helm` sont installés, et que vous disposez des autorisations suffisantes pour créer des ressources Kubernetes dans votre cluster.
1. Suivez les instructions fournies dans l'application pour inscrire le runner, générer la configuration, ajouter le dépôt Helm Private Action Runner et installer le chart.
1. Exécutez `kubectl get pods -w` et vérifiez que le statut du pod du private action runner devient **Prêt**.

{{% /tab %}}
{{< /tabs >}}

## Alternative : installation par programmation {#alternative-programmatic-installation}

Comme alternative à la configuration via l'interface utilisateur ci-dessus, vous pouvez inscrire et configurer un runner autonome par programmation en utilisant votre clé d'API et votre clé d'application. Cette approche est adaptée aux déploiements automatisés, aux pipelines CI/CD et aux workflows d'infrastructure en tant que code. Comme pour la configuration via l'interface utilisateur, cela crée toujours un runner propriétaire. Malgré le nom de l'indicateur `--with-api-key`, ce chemin nécessite toujours une clé d'application : le runner utilise les deux identifiants ensemble pour s'inscrire et attribuer le propriétaire de la clé d'application en tant qu'éditeur du runner.

Pour configurer le runner par programmation :

1. Fournissez vos clés d'API et d'application Datadog via les variables d'environnement `DD_API_KEY` et `DD_APP_KEY`.
1. Passez l'indicateur `--with-api-key` au conteneur du runner.

{{< tabs >}}
{{% tab "Docker" %}}

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run -d \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

```yaml
services:
  private-runner:
    image: gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
    command: ["--with-api-key"]
    environment:
      DD_API_KEY: ${DD_API_KEY}
      DD_APP_KEY: ${DD_APP_KEY}
      DD_BASE_URL: https://{{< region-param key=dd_site >}}
      DD_PRIVATE_RUNNER_CONFIG_DIR: /etc/dd-action-runner/config
      RUNNER_NAME: my-compose-runner
    volumes:
      - "./config:/etc/dd-action-runner/config"
```

Exécutez avec :

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"
docker compose up -d
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Générez la configuration du runner :

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME="my-runner" \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key --enroll -f helm-values > values.yaml
```

Déployez le chart Helm :

```bash
helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

Lorsque le runner indique **Prêt à l'emploi**, créez une connexion pour celui-ci ou affichez-le sur la page **Private Action Runners**.

## Certificats d'autorité de certification personnalisés {#custom-ca-certificates}

Si votre organisation utilise une autorité de certification (CA) personnalisée pour émettre des certificats pour des services internes, tels que des endpoints HTTP ou Jenkins, vous pouvez configurer un private action runner autonome pour qu'il fasse confiance à cette autorité de certification.

{{< tabs >}}
{{% tab "Docker" %}}

Ajoutez la variable d'environnement `SSL_CERT_DIR` et montez votre certificat sur la commande `docker run`, en remplaçant `<PATH_TO_YOUR_CA_CERTIFICATE>` par le chemin d'accès à votre fichier de certificat d'autorité de certification :

{{< highlight bash "hl_lines=7 9" >}}
docker run -d \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -e SSL_CERT_DIR=/etc/dd-action-runner/config/ca-certificates \
  -v ./config:/etc/dd-action-runner/config \
  -v <PATH_TO_YOUR_CA_CERTIFICATE>:/etc/dd-action-runner/config/ca-certificates/ca.crt \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key
{{< /highlight >}}

{{% /tab %}}
{{% tab "Docker Compose" %}}

Ajoutez la variable d'environnement `SSL_CERT_DIR` et montez votre certificat dans votre fichier `docker-compose.yaml`, en remplaçant `<PATH_TO_YOUR_CA_CERTIFICATE>` par le chemin d'accès à votre fichier de certificat d'autorité de certification :

```yaml
services:
  private-runner:
    environment:
      SSL_CERT_DIR: /etc/dd-action-runner/config/ca-certificates
    volumes:
      - "<PATH_TO_YOUR_CA_CERTIFICATE>:/etc/dd-action-runner/config/ca-certificates/ca.crt"
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Créez une ConfigMap contenant votre certificat d'autorité de certification :

   ```bash
   kubectl create configmap my-ca-cert --from-file=ca.crt=./my-custom-ca.pem
   ```

1. Dans votre fichier Helm `values.yaml`, référencez la ConfigMap :

   ```yaml
   runner:
     customCaCert:
       configMapName: my-ca-cert
   ```

1. Appliquez les valeurs mises à jour :

   ```bash
   helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f values.yaml
   ```

{{% /tab %}}
{{< /tabs >}}

## Connectez le runner {#connect-the-runner}

Un runner autonome est toujours propriétaire et utilise le modèle d'autorisation Connections. Une connexion stocke les identifiants d'un service et les associe au runner. Pour créer une connexion et l'associer à votre runner, consultez [Connections][2]. Pour savoir comment fonctionnent les autorisations sur le runner lui-même, consultez [Gérer l'accès aux runners avec propriétaire][4].

## Gérer le runner {#manage-the-runner}

### Modifier les connexions ou supprimer un runner {#edit-connections-or-delete-a-runner}

Depuis la page **Private Action Runner** dans Action Catalog, vous pouvez afficher tous vos runners privés ainsi que les workflows ou applications qui utilisent chacun d'eux. Pour modifier les connexions d'un runner, cliquez sur **View Details**. Cliquez sur l'icône de corbeille pour supprimer un runner.

### Modifier la liste d'autorisation {#change-the-allowlist}

Pour modifier la liste d'autorisation d'un runner autonome, modifiez la section `actionsAllowlist` du fichier `config.yaml` dans l'environnement de votre runner, puis redémarrez le runner en redémarrant votre conteneur ou votre déploiement.

## Mettez à jour le runner {#update-the-runner}

Choisissez l'onglet qui correspond à la façon dont vous avez installé le runner. Utilisez la version actuelle `v`{{< private-action-runner-version "private-action-runner" >}}Utilisez la version actuelle plutôt qu'un tag codé en dur.

{{< tabs >}}
{{% tab "Docker" %}}

Trouvez l'ID actuel de votre conteneur :

```bash
docker ps
```

Arrêtez le conteneur :

```bash
docker stop <id>
```

Démarrez un nouveau conteneur avec [la dernière image][101]. Les variables d'environnement ne sont pas nécessaires : tout est configuré dans le fichier `config/config.yaml`.

```bash
docker run -d \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

Après avoir confirmé que la nouvelle version fonctionne, supprimez l'ancien conteneur :

```bash
docker rm <id>
```

[101]: https://api.datadoghq.com/api/v2/on-prem-management-service/runner/latest-image

{{% /tab %}}
{{% tab "Docker Compose" %}}

Accédez au répertoire contenant votre fichier `docker-compose.yaml` et mettez à jour la version de l'image :

```yaml
services:
  private-actions-runner:
    image: gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

Redémarrez le conteneur :

```bash
docker compose up -d
```

{{% /tab %}}
{{% tab "Helm" %}}

Il existe deux options pour effectuer une mise à niveau avec Helm :

1. **(Recommandé)** Mettez à jour le chart, ce qui utilise la dernière version du runner. Il peut y avoir des changements dans le chart ; consultez [le log des modifications][101].
1. Mettez à jour le runner uniquement, sans mettre à jour le chart.

**Mise à jour du chart (recommandé) :**

```bash
helm repo update
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

**Mise à jour du runner uniquement :** spécifiez la version du runner dans `values.yaml` sous la clé `common.image.tag` avec une valeur provenant du [fichier de valeurs du chart][102] :

```yaml
common:
  image:
    tag: v{{< private-action-runner-version "private-action-runner" >}}
```

Exécutez ensuite :

```bash
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

[101]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/CHANGELOG.md
[102]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/private_actions/set_up_agent_based/
[2]: /fr/actions/connections/
[3]: https://app.datadoghq.com/actions/private-action-runners
[4]: /fr/actions/private_actions/enroll_runner/#manage-access-to-owned-runners