---
title: Tagging de service unifié
kind: documentation
aliases:
  - /fr/getting_started/tagging/unified_service_tagging
further_reading:
  - link: /getting_started/tagging/using_tags
    tag: Documentation
    text: Apprendre à utiliser les tags dans l'application Datadog
  - link: /tracing/version_tracking
    tag: Documentation
    text: Utiliser des tags version dans l'APM Datadog pour surveiller les déploiements
  - link: 'https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/'
    tag: Blog
    text: En savoir plus sur Autodiscovery
---
## Présentation
Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois [tags réservés][1] : `env`, `service` et `version`.

Avec ces trois tags, vous pouvez :

- déterminer l'impact d'un déploiement grâce à des métriques de trace et de conteneur filtrées par version ;
- explorer facilement vos traces, métriques et logs à l'aide de tags cohérents ;
- consulter les données de service en fonction de l'environnement ou de la version de manière unifiée dans l'application Datadog.

{{< img src="tagging/unified_service_tagging/overview.gif" alt="Tagging de service unifié"  >}}

### Prérequis

- Vous devez configurer la version 6.19.x/7.19.x ou une version ultérieure de l'[Agent Datadog][2] pour pouvoir utiliser le tagging de service unifié.

- Le tagging de service unifié nécessite une version du traceur qui prend en charge les nouvelles configurations des [tags réservés][1]. Vous trouverez davantage d'informations pour chaque langage dans les [instructions de configuration][3].

- Vous devez maîtriser la configuration de tags pour pouvoir utiliser le tagging de service unifié. En cas de doute sur la configuration de tags, consultez la documentation [Débuter avec les tags][4] et [Assigner des tags][5] avant de procéder à la configuration.

## Configuration

Pour commencer la configuration du tagging de service unifié, choisissez votre environnement :

- [Environnement conteneurisé](#containerized-environment)
- [Environnement non conteneurisé](#non-containerized-environment)

### Environnement conteneurisé

Dans les environnements conteneurisés, les tags `env`, `service` et `version` sont définis via les variables d'environnement du service ou à l'aide d'étiquettes (par exemple, les étiquettes de pod et de déploiement Kubernetes ou encore les étiquettes des conteneurs Docker). L'Agent Datadog détecte cette configuration de tagging et l'applique aux données recueillies à partir des conteneurs.

Pour configurer le tagging de service unifié dans un environnement conteneurisé :

1. Activez [Autodiscovery][6] pour permettre à l'Agent Datadog d'identifier automatiquement les services qui s'exécutent sur un conteneur donné et de recueillir des données à partir de ces services afin de mapper les variables d'environnement avec les tags `env`, `service` et `version`.

2. Si vous utilisez [Docker][7], assurez-vous que l'Agent peut accéder au [socket Docker][8] de votre conteneur. Cela permet à l'Agent de détecter les variables d'environnement et de les mapper avec les tags standard.

4. Configurez votre environnement en suivant la procédure de configuration complète ou partielle détaillée ci-dessous.

#### Configuration

{{< tabs >}}
{{% tab "Kubernetes" %}}

##### Configuration complète

Pour exploiter tout le potentiel du tagging de service unifié lorsque vous utilisez Kubernetes, ajoutez les variables d'environnement au niveau de l'objet de déploiement et au niveau des spécifications du modèle de pod :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "<ENV>"
    tags.datadoghq.com/service: "<SERVICE>"
    tags.datadoghq.com/version: "<VERSION>"
...
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
  containers:
  -  ...
     env:
          - name: DD_ENV
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/env']
          - name: DD_SERVICE
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/service']
          - name: DD_VERSION
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/version']
```

##### Configuration partielle

###### Métriques au niveau du pod

Pour configurer les métriques au niveau du pod, ajoutez les étiquettes standard suivantes (`tags.datadoghq.com`) aux spécifications de pod d'un déploiement, d'un StatefulSet ou d'une tâche :

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
```
Ces étiquettes couvrent les métriques de processeur, de mémoire, de réseau et de disque de Kubernetes au niveau du pod, et peuvent être utilisées pour injecter `DD_ENV`, `DD_SERVICE` et `DD_VERSION` dans le conteneur de votre service via l'[API Downward de Kubernetes][1].

Si vous avez plusieurs conteneurs par pod, vous pouvez spécifier des étiquettes standard par conteneur :

```yaml
tags.datadoghq.com/<nom-conteneur>.env
tags.datadoghq.com/<nom-conteneur>.service
tags.datadoghq.com/<nom-conteneur>.version
```

###### Métriques State

Pour configurer des [métriques Kubernetes State][2], procédez comme suit :

1. Définissez `join_standard_tags` sur `true` dans votre [fichier de configuration][3].

2. Ajoutez les mêmes étiquettes standard à la collection d'étiquettes pour la ressource parente (par exemple, Deployment).

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
  spec:
    template:
      metadata:
        labels:
          tags.datadoghq.com/env: "<ENV>"
          tags.datadoghq.com/service: "<SERVICE>"
          tags.datadoghq.com/version: "<VERSION>"
  ```

###### Traceur de l'APM et client StatsD

Pour configurer les variables d'environnement du [traceur de l'APM][4] et du [client StatsD][5], utilisez l'[API Downward de Kubernetes][1] en suivant le format ci-dessous :

```yaml
containers:
-  ...
    env:
        - name: DD_ENV
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/env']
        - name: DD_SERVICE
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/service']
        - name: DD_VERSION
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/version']
```

[1]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[2]: /fr/agent/kubernetes/data_collected/#kube-state-metrics
[3]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example#L70
[4]: /fr/tracing/send_traces/
[5]: /fr/integrations/statsd/
{{% /tab %}}

{{% tab "Docker" %}}
##### Configuration complète

Définissez les variables d'environnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION` ainsi que les étiquettes Docker correspondantes pour votre conteneur afin d'exploiter tout le potentiel du tagging de service unifié.

Les valeurs pour `service` et `version` peuvent être spécifiées dans le Dockerfile :

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION>

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>"
```

Comme `env` est probablement déterminé au moment du déploiement, vous pouvez injecter la variable d'environnement et l'étiquette ultérieurement :

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

Si vous préférez, vous pouvez également définir tous les éléments au moment du déploiement :

```shell
docker run -e DD_ENV="<ENV>" \
           -e DD_SERVICE="<SERVICE>" \
           -e DD_VERSION="<VERSION>" \
           -l com.datadoghq.tags.env="<ENV>" \
           -l com.datadoghq.tags.service="<SERVICE>" \
           -l com.datadoghq.tags.version="<VERSION>" \
           ...
```

##### Configuration partielle

Si votre service n'a pas besoin des variables d'environnement Datadog (par exemple, les logiciels tiers comme Redis, PostgreSQL, NGINX et les applications non tracées par l'APM), vous pouvez simplement utiliser les étiquettes Docker :

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version
```

Comme expliqué pour la configuration complète, ces étiquettes peuvent être définies dans un Dockerfile ou comme arguments pour lancer le conteneur.

{{% /tab %}}

{{% tab "ECS" %}}
##### Configuration complète

Définissez les variables d'environnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION` ainsi que les étiquettes Docker correspondantes dans l'environnement runtime de votre conteneur pour exploiter tout le potentiel du tagging de service unifié. Par exemple, vous pouvez définir tous ces éléments au même endroit via la définition de votre tâche ECS :

```
"environment": [
  {
    "name": "DD_ENV",
    "value": "<ENV>"
  },
  {
    "name": "DD_SERVICE",
    "value": "<SERVICE>"
  },
  {
    "name": "DD_VERSION",
    "value": "<VERSION>"
  }

"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
  }
]
```

##### Configuration partielle

Si votre service n'a pas besoin des variables d'environnement Datadog (par exemple, les logiciels tiers comme Redis, PostgreSQL, NGINX et les applications non tracées par l'APM), vous pouvez simplement utiliser les étiquettes Docker dans la définition de votre tâche ECS :

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

{{% /tab %}}
{{< /tabs >}}

### Environnement non conteneurisé

Selon la façon dont vous créez et déployez les binaires ou les exécutables de vos services, plusieurs options peuvent s'offrir à vous pour définir les variables d'environnement. Étant donné que vous pouvez exécuter un ou plusieurs services par host, il est conseillé de limiter ces variables d'environnement à un seul processus.

Afin de former un point de configuration unique pour l'ensemble des données de télémétrie émises directement depuis le runtime de votre service pour les [traces][9], les [logs][10] et les [métriques StatsD][11], vous pouvez :

1. Exporter les variables d'environnement dans la commande de votre exécutable :

    `DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service`

2. Ou utiliser [Chef][12], [Ansible][13] ou un autre outil d'orchestration pour ajouter les variables d'environnement `DD` au fichier de configuration systemd ou initd d'un service. De cette façon, le processus du service aura accès à ces variables une fois lancé.

{{< tabs >}}
{{% tab "Traces" %}}

Lors de la configuration de vos traces pour le tagging de service unifié :

1. Configurez le [Traceur de l'APM][1] avec `DD_ENV` pour que la définition de `env` soit plus proche de l'application qui génère les traces. Cette méthode permet au tag `env` de provenir automatiquement d'un tag dans les métadonnées de span.

2. Configurez des spans avec `DD_VERSION` pour ajouter un tag version à toutes les spans relevant du service qui appartient au traceur (généralement `DD_SERVICE`). Ainsi, si votre service crée des spans avec le nom d'un service externe, ces spans ne recevront pas de tag `version`.

    Tant que le tag version figure dans les spans, il sera ajouté aux métriques de trace générées à partir de ces spans. Le tag version peut être ajouté manuellement dans le code ou automatiquement par le traceur de l'APM. Une fois les spans configurées, elles seront au moins utilisées par l'APM et les [clients Dogstatsd][2] pour appliquer les tags `env`, `service` et `version` aux données de trace et aux métriques StatsD. S'il est activé, le traceur de l'APM injectera également les valeurs de ces variables dans vos logs.

    **Remarque : il ne peut y avoir qu'un seul service par span**. Les métriques de trace sont généralement associées à un seul service également. Toutefois, si un service différent est défini dans les tags de vos hosts, ce tag service configuré apparaîtra dans toutes les métriques de trace émises par ce host.

[1]: /fr/tracing/setup/
[2]: /fr/developers/dogstatsd/
{{% /tab %}}

{{% tab "Logs" %}}

Si vous [associez vos logs à vos traces][1], activez l'injection automatique dans les logs si cette fonctionnalité est prise en charge par votre traceur d'APM. Le traceur d'APM injectera alors automatiquement les tags `env`, `service` et `version` dans vos logs, éliminant ainsi le besoin de configurer manuellement ces champs ailleurs. 

**Remarque** : le traceur PHP ne prend pas actuellement en charge la configuration du tagging de service unifié pour les logs.

[1]: /fr/tracing/connect_logs_and_traces/
{{% /tab %}}

{{% tab "Métriques custom" %}}

Les tags sont ajoutés en mode append-only pour les [métriques custom statsd][1]. Par exemple, si vous avez deux valeurs différentes pour `env`, les métriques seront taguées avec les deux environnements. L'ordre dans lequel un tag remplacera un autre du même nom est aléatoire.

Si votre service a accès à `DD_ENV`, `DD_SERVICE` et `DD_VERSION`, alors le client DogStatsD ajoutera automatiquement les tags correspondants à vos métriques custom.

**Remarque** : les clients Datadog DogStatsD pour .NET et PHP ne prennent pas encore en charge cette fonctionnalité.

[1]: /fr/developers/metrics/
{{% /tab %}}

{{% tab "Métriques système" %}}

Les tags `env` et `service` peuvent également être ajoutés aux métriques de votre infrastructure.

La configuration du tagging des métriques de service est plus proche de l'Agent dans les environnements non conteneurisés.
Étant donné que cette configuration ne change pas à chaque fois que le processus d'un service est invoqué, l'ajout du tag `version` à la configuration est déconseillé.

##### Service unique par host

Définissez la configuration suivante dans le [fichier de configuration principal][1] de l'Agent :

```yaml
env: <ENV>
tags:
    - service:<SERVICE>
```

Avec cette configuration, les tags `env` et `service` resteront cohérents pour toutes les données émises par l'Agent.

##### Plusieurs services par host

Définissez la configuration suivante dans le [fichier de configuration principal][1] de l'Agent :

```yaml
env: <ENV>
```

Pour obtenir des tags `service` uniques sur les métriques de processeur, de mémoire et d'E/S disque au niveau du processus, vous pouvez configurer un [check de processus][2] :

```yaml
init_config:
instances:
    - name: web-app
      search_string: ["/bin/web-app"]
      exact_match: false
      service: web-app
    - name: nginx
      search_string: ["nginx"]
      exact_match: false
      service: nginx-web-app
```

**Remarque** : si vous avez déjà un tag `service` défini globalement dans le fichier de configuration principal de votre Agent, les métriques de processus seront taguées avec deux services. Puisque cela peut nuire à l'interprétation des métriques, il est conseillé de configurer le tag `service` uniquement dans la configuration du check de processus.

[1]: /fr/agent/guide/agent-configuration-files
[2]: /fr/integrations/process
{{% /tab %}}
{{< /tabs >}}

### Environnement sans serveur

#### Fonctions Lambda AWS

Selon la méthode que vous employez pour concevoir et déployer vos applications sans serveur basées sur des fonctions Lambda AWS, il existe plusieurs options pour appliquer les tags `env`, `service` et `version` aux métriques, traces et logs.

*Remarque* : ces tags sont fournis à l'aide des tags de ressource AWS, et non via les variables d'environnement. Ainsi, les variables d'environnement `DD_ENV`, `DD_SERVICE` et `DD_VERSION` ne sont pas prises en charge.

{{< tabs >}}

{{% tab "Framework sans serveur" %}}

Ajoutez des tags à vos fonctions Lambda à l'aide de l'option [tags][1] :

```yaml
# serverless.yml
service: service-name
provider:
  name: aws
  # pour appliquer les tags à l'ensemble des fonctions
  tags:
    env: "<ENV>"
    service: "<SERVICE>"
    version: "<VERSION>"

functions:
  hello:
    # cette fonction hérite des tags de service configurés ci-dessus
    handler: handler.hello
  world:
    # cette fonction remplace les tags
    handler: handler.users
    tags:
      env: "<ENV>"
      service: "<SERVICE>"
      version: "<VERSION>"
```

Si vous avez installé le [plug-in Serverless Datadog][2], celui-ci ajoute automatique les tags `service` et `env` aux fonctions Lambda. Le plug-in se base sur les valeurs `service` et `stage` de la définition de l'application sans serveur, sauf si un tag `service` ou `env` existe déjà.

[1]: https://www.serverless.com/framework/docs/providers/aws/guide/functions#tags
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/plugin
{{% /tab %}}

{{% tab "AWS SAM" %}}

Ajoutez des tags à vos fonctions Lambda à l'aide de l'option [Tags][1] :

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  MyLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      Tags:
        env: "<ENV>"
        service: "<SERVICE>"
        version: "<VERSION>"
```

Si vous avez installé la [macro Serverless Datadog][2], vous pouvez également spécifier des tags `service` et `env` en tant que paramètres :

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      service: "<SERVICE>"
      env: "<ENV>"
```


[1]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html#sam-function-tags
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
{{% /tab %}}

{{% tab "AWS CDK" %}}

Ajoutez des tags à votre app, votre pile ou à une fonction Lambda à l'aide de la [classe Tags][1]. Si vous avez installé la [macro Serverless Datadog][2], vous pouvez également spécifier des tags `service` et `env` en tant que paramètres :

```javascript
import * as cdk from "@aws-cdk/core";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.addTransform("DatadogServerless");

    new cdk.CfnMapping(this, "Datadog", {
      mapping: {
        Parameters: {
          service: "<SERVICE>",
          env: "<ENV>",
        },
      },
    });
  }
}
```


[1]: https://docs.aws.amazon.com/cdk/latest/guide/tagging.html
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/macro
{{% /tab %}}

{{% tab "Méthode personnalisée" %}}

Suivez les instructions AWS concernant le [tagging des fonctions Lambda][1] pour appliquer les tags `env`, `service` et `version`.


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-tags.html
{{% /tab %}}

{{< /tabs >}}

Vérifiez que l'option `DdFetchLambdaTags` est définie sur `true` sur la pile CloudFormation de votre [Forwarder Datadog][14]. Depuis la version `3.19.0`, cette option est par défaut définie sur `true`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/getting_started/tagging/#defining-tags
[2]: /fr/getting_started/agent
[3]: /fr/tracing/setup
[4]: /fr/getting_started/tagging/
[5]: /fr/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments
[6]: /fr/getting_started/agent/autodiscovery
[7]: /fr/agent/docker/integrations/?tab=docker
[8]: /fr/agent/docker/?tab=standard#optional-collection-agents
[9]: /fr/getting_started/tracing/
[10]: /fr/getting_started/logs/
[11]: /fr/integrations/statsd/
[12]: https://www.chef.io/
[13]: https://www.ansible.com/
[14]: /fr/serverless/forwarder/