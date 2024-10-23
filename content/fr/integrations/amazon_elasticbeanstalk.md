---
aliases:
- /fr/integrations/awsbeanstalk/
- /fr/developers/faq/i-want-my-application-deployed-in-a-container-through-elasticbeanstalk-to-talk-to-dogstatsd/
categories:
- aws
- cloud
- configuration & deployment
- log collection
- network
- provisioning
dependencies: []
description: Surveillez des métriques clés d'AWS Elastic Beanstalk.
doc_link: https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/deploy-datadog-aws-elastic-beanstalk
  tag: Blog
  text: Déployer Datadog sur AWS Elastic Beanstalk
git_integration_title: amazon_elasticbeanstalk
has_logo: true
integration_id: ''
integration_title: AWS Elastic Beanstalk
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_elasticbeanstalk
public_title: Intégration Datadog/AWS Elastic Beanstalk
short_description: Surveillez des métriques clés d'AWS Elastic Beanstalk.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

AWS Elastic Beanstalk est un service simple à prendre en main permettant de déployer et de mettre à l'échelle des applications et services Web développés avec Java, .NET, PHP, Node.js, Python, Ruby, Go et Docker sur des serveurs couramment utilisés, comme Apache, Nginx, Passenger et IIS.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord l'[intégration Amazon Web Services][1]. Pour recevoir des métriques Elastic Beanstalk, vous devez [activer la création de rapports d'intégrité améliorée][2] pour votre environnement et configurer ce dernier de façon à ce qu'il [publie des métriques de santé améliorées sur CloudWatch][3].

**Remarque** : ces paramètres augmentent les frais relatifs à vos métriques custom CloudWatch.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "amazon_elasticbeanstalk" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Aide

L'intégration AWS Elastic Beanstalk n'inclut aucun événement.

### Aide

L'intégration AWS Elastic Beanstalk n'inclut aucun check de service.

## Configuration de l'Agent Datadog

Les étapes décrites ci-dessous permettent de déployer l'Agent Datadog sur vos VM Elastic Beanstalk, afin que ces dernières transmettent des métriques de host. Ces métriques viennent compléter les métriques récupérées par l'intégration AWS. Lisez la section [Pourquoi installer l'Agent Datadog sur mes instances cloud ?][4] pour en savoir plus.

Sélectionnez votre méthode d'installation pour configurer l'Agent dans votre environnement Elastic Beanstalk :

{{< tabs >}}

{{% tab "Aucun conteneur (Linux)" %}}

Pour une configuration sans conteneurs, installez l'Agent Datadog dans Elastic Beanstalk à l'aide de la [personnalisation d'environnement avancée avec fichiers de configuration][1] (.ebextensions) :

1. Créez un dossier intitulé `.ebextensions` à la racine du [bundle des fichiers source de l'application][2].
2. Téléchargez [99datadog.config][3] et placez cette configuration dans le dossier `.ebextensions`.
3. Remplacez la valeur de `api_key` dans le modèle de fichier pour `/etc/datadog-agent/datadog.yaml` par votre [clé d'API Datadog][4].
4. Remplacez la valeur de `site` dans `/etc/datadog-agent/datadog.yaml` par votre région Datadog (par exemple {{< region-param key="dd_site" code="true" >}}) pour vous assurer que l'Agent envoie les données au bon site Datadog.
5. Imposez une version spécifique de l'Agent en définissant `DD_AGENT_VERSION` dans `option_settings`. Ainsi, tous les hosts exécuteront la même version de l'Agent.
6. Déployez votre application avec la [console Elastic Beanstalk][5], [l'interface de ligne de commande EB][6] ou [l'interface de ligne de commande AWS][7].

Vous pouvez ajouter des paramètres d'Agent supplémentaires dans `/etc/datadog-agent/datadog.yaml`.

Par exemple, pour activer la surveillance des live processes, définissez ce qui suit :

```text
process_config:
  enabled: "true"
```

#### Collecte de traces

Lorsque l'application n'est pas conteneurisée et que l'Agent Datadog est configuré avec `99datadog.config`, le tracing est activé sans aucune configuration supplémentaire requise, à condition que l'application soit instrumentée avec la [configuration de bibliothèques de tracing][8].



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[3]: https://docs.datadoghq.com/fr/config/99datadog.config
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[8]: https://docs.datadoghq.com/fr/tracing/setup/
{{% /tab %}}

{{% tab "Aucun conteneur (Windows)" %}}

Pour une configuration sans conteneurs, installez l'Agent Datadog dans Elastic Beanstalk à l'aide de la [personnalisation d'environnement avancée avec fichiers de configuration][1] (.ebextensions) :

1. Créez un dossier intitulé `.ebextensions` à la racine du [bundle des fichiers source de l'application][2].
2. Téléchargez [99datadog-windows.config][3] et déplacez cette configuration vers le dossier `.ebextensions`.
3. Dans `99datadog-windows.config`, remplacez la valeur `APIKEY` par votre [clé d'API Datadog][4].
4. (Facultatif) Le fichier `99datadog-windows.config` ajoute la bibliothèque de tracing APM .NET afin de générer des traces. Si vous ne souhaitez pas activer APM dans votre environnement, supprimez les sections `packages`, `02_setup-APM1` et `03_setup-APM2`.
5. (Facultatif) Pour ajouter des variables d'environnement, définissez-les à la section `00_setup-env1` du fichier `99datadog-windows.config`. Si vous n'avez pas besoin d'utiliser de variables d'environnement, vous êtes libre de supprimer cette section.
6. Déployez votre application avec la [console Elastic Beanstalk][5], [l'interface de ligne de commande EB][6] ou [l'interface de ligne de commande AWS][7].

#### Collecte de traces

Lorsque l'application n'est pas conteneurisée et que l'Agent Datadog est configuré avec `99datadog-windows.config`, le tracing est activé sans aucune configuration supplémentaire. Pour en savoir plus sur l'instrumentation du tracing, consultez la documentation relative à la [configuration de la solution APM Datadog][8].



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[3]: https://docs.datadoghq.com/fr/config/99datadog-windows.config
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[8]: https://docs.datadoghq.com/fr/tracing/setup/
{{% /tab %}}

{{% tab "Conteneur unique" %}}

Pour une configuration sur un conteneur Docker unique, installez l'Agent Datadog dans Elastic Beanstalk à l'aide de la [personnalisation d'environnement avancée avec fichiers de configuration][1] (.ebextensions).

**Remarque** : pour définir cette configuration, vous devez placer votre clé d'API dans votre répertoire .ebextensions, qui fait partie du code source. Utilisez [AWS Secret Manager][2] ou une autre solution de gestion de secrets pour protéger votre clé d'API.

1. Créez un dossier intitulé `.ebextensions` à la racine du [bundle des fichiers source de l'application][3].
2. Téléchargez [99datadog.config][4] et placez cette configuration dans le dossier `.ebextensions`.
3. Remplacez la valeur de `api_key` dans le modèle de fichier pour `/etc/datadog-agent/datadog.yaml` par votre [clé d'API Datadog][5].
4. Remplacez la valeur de `site` dans `/etc/datadog-agent/datadog.yaml` par votre région Datadog (par exemple {{< region-param key="dd_site" code="true" >}}) pour vous assurer que l'Agent envoie les données au bon site Datadog.
5. Imposez une version spécifique de l'Agent en définissant `DD_AGENT_VERSION` dans `option_settings`. Ainsi, tous les hosts exécuteront la même version de l'Agent.
6. Déployez votre application avec la [console Elastic Beanstalk][6], [l'interface de ligne de commande EB][7] ou [l'interface de ligne de commande AWS][8].

Vous pouvez ajouter des paramètres d'Agent supplémentaires dans `/etc/datadog-agent/datadog.yaml`.

Par exemple, pour activer la surveillance des live processes, définissez ce qui suit :

```text
process_config:
  enabled: "true"
```

#### Collecte de traces

Pour activer le tracing pour des conteneurs Docker uniques :

1. Modifiez la section `/etc/datadog-agent/datadog.yaml` du fichier `99datadog.config` en ajoutant `apm_non_local_traffic` avec le format suivant :

    ```
    apm_config:
      enabled: "true"
      apm_non_local_traffic: "true"
    ```

2. Configurez les bibliothèques de tracing de manière à faire passer les traces par l'[IP de passerelle du pont][9], qui correspond par défaut à `172.17.0.1` à l'intérieur du conteneur d'application. Si vous n'êtes pas sûr de l'IP de passerelle, exécutez la commande `docker inspect <id conteneur>` pour la vérifier.

Pour tous les langages, définissez la variable d'environnement `DD_AGENT_HOST` sur l'IP de passerelle. Pour les langages ci-dessous, vous pouvez également définir le nom du host par programmation comme suit :

##### Collecte d'erreurs du navigateur

```python
from ddtrace import tracer

tracer.configure(hostname="172.17.0.1")
```

##### .NET

```javascript
const tracer = require('dd-trace');

tracer.init({ hostname: "172.17.0.1" });
```

##### Modifier des données et leur contexte

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracer hostname: "172.17.0.1")
end
```

##### Données collectées

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
  tracer.Start(tracer.WithAgentAddr("172.17.0.1"))
  defer tracer.Stop()

  // ...
}
```



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://aws.amazon.com/secrets-manager/
[3]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[4]: https://docs.datadoghq.com/fr/config/99datadog.config
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[8]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[9]: https://docs.docker.com/network/network-tutorial-standalone/
{{% /tab %}}

{{% tab "Plusieurs conteneurs" %}}

Si vous avez plusieurs conteneurs Docker, utilisez l'Agent Datadog conteneurisé pour surveiller l'utilisation de Docker avec un fichier intitulé `Dockerrun.aws.json`.

Un fichier `Dockerrun.aws.json` est un fichier JSON propre à Elastic Beanstalk qui décrit comment déployer un ensemble de conteneurs Docker sous la forme d'une application Elastic Beanstalk. Vous pouvez utiliser ce fichier pour un environnement Docker à conteneurs multiples. `Dockerrun.aws.json` décrit les conteneurs à déployer sur chaque instance de conteneur dans l'environnement et les volumes de données à créer sur l'instance du host, qui seront montés par les conteneurs.

Un fichier `Dockerrun.aws.json` peut être utilisé de façon autonome ou compressé avec du code source supplémentaire dans une archive unique. Le code source archivé dans `Dockerrun.aws.json` est déployé dans les instances de conteneur et accessible dans le répertoire `/var/app/current/`. Utilisez la section `volumes` de la configuration pour fournir des points de montage aux conteneurs s'exécutant sur l'instance. Utilisez la section `mountPoints` des définitions de conteneurs intégrés pour les monter depuis les conteneurs.

L'exemple de code suivant correspond à un `Dockerrun.aws.json` déclarant l'Agent Datadog. Mettez à jour la section `containerDefinitions` en ajoutant votre [clé d'API Datadog][1], vos tags (facultatif) et toutes les définitions de conteneur supplémentaires. Si besoin, ce fichier peut être compressé avec du contenu supplémentaire, comme décrit ci-dessus. Pour obtenir plus d'informations sur la syntaxe de ce fichier, consultez [Configuration Docker multi-conteneurs][5].

**Remarques** :

- En cas d'utilisation intense des ressources, il se peut que vous ayez besoin de rehausser la limite de mémoire.
- Pour vous assurer que tous les hosts exécutent la même version de l'Agent, nous vous conseillons de remplacer `agent:7` par une version mineure spécifique de [l'image Docker][3].
{{< site-region region="us3,eu,gov" >}}
- Définissez `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.
{{< /site-region >}}

```json
{
    "AWSEBDockerrunVersion": 2,
    "volumes": [
        {
            "name": "docker_sock",
            "host": {
                "sourcePath": "/var/run/docker.sock"
            }
        },
        {
            "name": "proc",
            "host": {
                "sourcePath": "/proc/"
            }
        },
        {
            "name": "cgroup",
            "host": {
                "sourcePath": "/cgroup/"
            }
        }
    ],
    "containerDefinitions": [
        {
            "name": "dd-agent",
            "image": "gcr.io/datadoghq/agent:7",
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<VOTRE_CLÉ_API_DD>"
                },
                {
                    "name": "DD_SITE",
                    "value": "<VOTRE_SITE_DD>"
                },
                {
                    "name": "DD_TAGS",
                    "value": "<TAG_SIMPLE>, <TAG_KEY:VALUE>"
                }
            ],
            "memory": 256,
            "mountPoints": [
                {
                    "sourceVolume": "docker_sock",
                    "containerPath": "/var/run/docker.sock",
                    "readOnly": false
                },
                {
                    "sourceVolume": "proc",
                    "containerPath": "/host/proc",
                    "readOnly": true
                },
                {
                    "sourceVolume": "cgroup",
                    "containerPath": "/host/sys/fs/cgroup",
                    "readOnly": true
                }
            ]
        }
    ]
}
```

#### Création de l'environnement

Une fois la définition du conteneur prête, envoyez-la à Elastic Beanstalk. Pour obtenir des instructions précises, consultez [Environnements Docker multi-conteneurs][4] dans la documentation AWS Elastic Beanstalk.

#### Aide

Pour recueillir des métriques custom depuis le conteneur de votre application en utilisant DogStatsD dans l'[environnement Docker à conteneurs multiples][4], ajoutez les éléments suivants à votre fichier `Dockerrun.aws.json` :

1. Ajoutez la variable d'environnement `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` sous le conteneur `dd-agent` :

    ```json
    {
      "name": "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
      "value": "true"
    }
    ```

2. Ajoutez un lien vers le conteneur `dd-agent` sous le conteneur de votre application :

    ```text
    "links": [ "dd-agent:dd-agent"]
    ```

Consultez la section [DogStatsD et Docker][5] pour en savoir plus.



[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html
[3]: https://gcr.io/datadoghq/agent
[4]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecstutorial.html
[5]: https://docs.datadoghq.com/fr/integrations/faq/dogstatsd-and-docker/
{{% /tab %}}

{{< /tabs >}}

#### Conteneurs Docker multiples

1. Dans le même fichier `Dockerrun.aws.json` que celui de l'application, ajoutez un conteneur de l'Agent Datadog à l'aide de l'image `datadog/agent`. Ajoutez ensuite ce qui suit :
    - Sous la section `portMappings`, ajoutez un `hostPort` 8126 avec le `containerPort` 8126.
    - Sous la section `environment`, définissez `DD_APM_ENABLED` et `DD_APM_NON_LOCAL_TRAFFIC` sur `true`.
2. Sous le conteneur de votre application, qui a été instrumenté avec la [configuration de bibliothèques de tracing][14], ajoutez ce qui suit :
    - Sous la section `environment`, ajoutez une variable d'environnement `DD_AGENT_HOST` ayant pour valeur le nom du conteneur de l'Agent Datadog.
    - Sous la section `links` section, définissez le conteneur de l'Agent afin de l'utiliser comme une variable d'environnement.

Vous trouverez un exemple ci-dessous :

```text
 "containerDefinitions": [    {
      "name": "dd-agent",
      "image": "datadog/agent:latest",
      "environment": [
          {
              "name": "DD_API_KEY",
              "value": "<clé api>"
          },
          {
              "name": "DD_APM_ENABLED",
              "value": "true"
          },
          {
             "name": "DD_APM_NON_LOCAL_TRAFFIC",
             "value": "true"
          },
         # toute autre variable d'environnement requise 
      ],
      "portMappings": [
        {
          "hostPort": 8126,
          "containerPort": 8126
        }
      ],
      "memory": 256,
      "mountPoints": [
          # tout autre mountpoint requis
         }
      ]
    },
    {
      "name": "application-container",
      "image": "<nom image application>",
      "environment": [
        {
          "name": "DD_AGENT_HOST",
          "value": "dd-agent",
          # toute autre variable d'environnement requise
        }
      ],
      "links": [
        "dd-agent:dd-agent"
      ],

```

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html
[3]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced-cloudwatch.html#health-enhanced-cloudwatch-console
[4]: https://docs.datadoghq.com/fr/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[5]: https://docs.datadoghq.com/fr/help/