---
categories:
  - cloud
  - aws
  - log collection
  - web
creates_events: false
ddtype: check
dependencies: []
description: "Amazon\_App\_Mesh est un proxy de périmètre et de service open source."
display_name: "Amazon\_App\_Mesh"
further_reading:
  - link: 'https://docs.datadoghq.com/integrations/envoy/'
    tag: Documentation
    text: Intégration Envoy
git_integration_title: amazon_app_mesh
guid: 04669673-120b-48c9-a855-06d57d92c7cf
integration_title: "Amazon\_App\_Mesh"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.stats.overflow
name: amazon_app_mesh
public_title: "Intégration Datadog/Amazon\_App\_Mesh"
short_description: "Amazon\_App\_Mesh est un proxy de périmètre et de service open source."
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[Amazon App Mesh][1] est un maillage de service qui fournit une mise en réseau au niveau de l'application à vos microservices s'exécutant sur des clusters AWS EKS ou AWS ECS Fargate

## Implémentation

{{< tabs >}}
{{% tab "EKS" %}}

Utilisez les instructions suivantes pour activer la collecte de métrique pour le sidecar proxy AWS App Mesh, à savoir Envoy. Vous pouvez ajouter des sidecars avec l'une des trois méthodes suivantes : avec un déploiement, via la correction ultérieure d'un déploiement ou avec le contrôleur d'injecteur AWS App Mesh. Les étapes suivantes vous permettent d'appliquer ces trois méthodes.

#### Collecte de métriques

**Prérequis** : déployez les Agents Datadog en tant que DaemonSet dans votre cluster Kubernetes à l'aide de la documentation relative à l'[intégration EKS][1].

1. Créez une ConfigMap dans votre cluster pour découvrir automatiquement les sidecars Envoy de App Mesh ajoutés à chaque pod :
    ```
      apiVersion: v1
      kind: ConfigMap
      metadata:
      name: datadog-config
      data:
      envoy: |-
        ad_identifiers:
        - aws-appmesh-envoy
        init_config:
        instances:
        - stats_url: http://%%host%%:9901/stats
          tags:
            - <TAG_KEY>:<TAG_VALUE>  # Example - cluster:eks-appmesh
    ```

2. Modifiez l'objet `volumeMounts` dans le fichier YAML DaemonSet de votre Agent Datadog :
    ```
           volumeMounts:
            - name: datadog-config
              mountPath: /conf.d
    ```

3. Modifiez l'objet `volumes` dans le fichier YAML DaemonSet de votre Agent Datadog :
    ```
         volumes:
          - name: datadog-config
            configMap:
              name: datadog-config
              items:
              - key: envoy
                path: envoy.yaml
    ```

#### Collecte de logs

Pour activer la collecte de logs, mettez à jour le DaemonSet de l'Agent en suivant les [instructions relatives à la collecte de logs Kubernetes][2].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_eks
[2]: /fr/agent/kubernetes/daemonset_setup/#log-collection
{{% /tab %}}
{{% tab "ECS Fargate" %}}

#### Collecte de métriques

**Prérequis** : ajoutez des Agents Datadog à chacune de vos définitions de tâche Fargate en prenant soin d'activer App Mesh (p. ex., un sidecar Envoy injecté). Pour ce faire, consultez la documentation relative à l'[intégration ECS Fargate][1].

1. Pour envoyer des métriques à Datadog depuis une tâche ECS avec App Mesh, suivez le modèle AWS App Mesh suggéré. Cette approche crée un service externe sous la forme d'un nœud virtuel afin d'acheminer le trafic sortant.

    * Dans la console App Mesh, accédez à votre maillage.
    * Créez un nœud virtuel avec les caractéristiques suivantes :

        | Paramètre              | Valeur                                     |
        |------------------------|-------------------------------------------|
        | Virtual node name      | `datadog`                                 |
        | Service discovery type | `DNS`                                     |
        | Hostname               | `app.datadoghq.com` ou `app.datadoghq.eu` |
        | Listener port          | `443`                                     |
        | Listener protocol      | `tcp`                                     |

    * Créez un service virtuel avec les caractéristiques suivantes :

        | Paramètre              | Valeur                                     |
        |----------------------|-------------------------------------------|
        | Virtual service name | `app.datadoghq.com` ou `app.datadoghq.eu` |
        | Provider             | `Virtual node`                            |
        | Virtual node         | `datadog`                                 |

2. Modifiez toutes les définitions de tâche contenant le sidecar Envoy et l'Agent Datadog avec les étiquettes Docker suivantes. Pour en savoir plus, consultez la section [Configuration d'intégration pour ECS Fargate][2].

    ```
        "dockerLabels": {
              com.datadoghq.ad.instances : [{"stats_url": "http://%%host%%:9901/stats"}]
              com.datadoghq.ad.check_names : ["envoy"]
              com.datadoghq.ad.init_configs : [{}]
            },
    ```

#### Collecte de logs

Activez la collecte de logs en suivant les instructions détaillées dans la documentation relative à [l'intégration ECS Fargate][3].

#### Collecte de traces

La disponibilité des services APM est limitée. Contactez [l'assistance Datadog][4] pour en savoir plus.

[1]: https://docs.datadoghq.com/fr/integrations/ecs_fargate
[2]: https://docs.datadoghq.com/fr/integrations/faq/integration-setup-ecs-fargate
[3]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/#log-collection
[4]: /fr/help
{{% /tab %}}
{{% tab "ECS EC2" %}}

#### Collecte de métriques

**Prérequis** : ajoutez des Agents Datadog à chacune de vos définitions de tâche ECS EC2 en prenant soin d'activer App Mesh (p. ex., un sidecar Envoy injecté). Pour ce faire, consultez la documentation relative à l'[intégration ECS][1].

1. Pour envoyer des métriques à Datadog depuis une tâche ECS avec App Mesh, suivez le modèle AWS App Mesh suggéré. Cette approche crée un service externe sous la forme d'un nœud virtuel afin d'acheminer le trafic sortant.

    * Dans la console App Mesh, accédez à votre maillage.
    * Créez un nœud virtuel avec les caractéristiques suivantes :

        | Paramètre              | Valeur                                     |
        |------------------------|-------------------------------------------|
        | Virtual node name      | `datadog`                                 |
        | Service discovery type | `DNS`                                     |
        | Hostname               | `app.datadoghq.com` ou `app.datadoghq.eu` |
        | Listener port          | `443`                                     |
        | Listener protocol      | `tcp`                                     |

    * Créez un service virtuel avec les caractéristiques suivantes :

        | Paramètre              | Valeur                                     |
        |----------------------|-------------------------------------------|
        | Virtual service name | `app.datadoghq.com` ou `app.datadoghq.eu` |
        | Provider             | `Virtual node`                            |
        | Virtual node         | `datadog`                                 |

2. Modifiez toutes les définitions de tâche contenant le sidecar Envoy et l'Agent Datadog avec les étiquettes Docker suivantes. Pour en savoir plus, consultez la section [Configuration d'intégration pour ECS Fargate][2].

    ```
        "dockerLabels": {
              com.datadoghq.ad.instances : [{"stats_url": "http://%%host%%:9901/stats"}]
              com.datadoghq.ad.check_names : ["envoy"]
              com.datadoghq.ad.init_configs : [{}]
            },
    ```

#### Collecte de logs

Activez la collecte de logs en suivant les instructions détaillées dans la documentation relative à [l'intégration ECS][3].

#### Collecte de traces

La disponibilité des services APM est limitée. Contactez [l'assistance Datadog][4] pour en savoir plus.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_ecs
[2]: https://docs.datadoghq.com/fr/integrations/faq/integration-setup-ecs-fargate
[3]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/#log-collection
[4]: /fr/help
{{% /tab %}}
{{< /tabs >}}

## Données collectées
### Métriques
Pour obtenir la liste des métriques, consultez la documentation sur l'[intégration Envoy][2].

### Événements
L'intégration Amazon App Mesh n'inclut aucun événement.

### Checks de service
L'intégration Amazon App Mesh n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



{{< get-dependencies >}}
[1]: https://aws.amazon.com/app-mesh
[2]: https://docs.datadoghq.com/fr/integrations/envoy/#metrics
[3]: https://docs.datadoghq.com/fr/help
