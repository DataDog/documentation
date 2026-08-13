---
categories:
- aws
- cloud
- log collection
- network
- tracing
creates_events: false
dependencies: []
description: AWS App Mesh est un proxy de périmètre et de service open source.
display_name: AWS App Mesh
draft: false
further_reading:
- link: https://docs.datadoghq.com/integrations/envoy/
  tag: Documentation
  text: Intégration Envoy
git_integration_title: amazon_app_mesh
guid: 04669673-120b-48c9-a855-06d57d92c7cf
integration_id: amazon-app-mesh
integration_title: AWS App Mesh
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.stats.overflow
name: amazon_app_mesh
public_title: Intégration Datadog/AWS App Mesh
short_description: AWS App Mesh est un proxy de périmètre et de service open source.
support: core
supported_os:
- linux
- mac_os
- windows
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

[AWS App Mesh][1] est un maillage de services qui facilite la surveillance des communications entre les applications de micro-services s'exécutant sur des clusters Amazon ECS Fargate ou AWS EKS.


## Formule et utilisation

{{< tabs >}}
{{% tab "EKS" %}}

Utilisez les instructions suivantes pour activer la collecte de métrique pour le sidecar proxy AWS App Mesh, à savoir Envoy. Vous pouvez ajouter des sidecars avec l'une des trois méthodes suivantes : avec un déploiement, via la correction ultérieure d'un déploiement ou avec le contrôleur d'injecteur AWS App Mesh. Les étapes suivantes vous permettent d'appliquer ces trois méthodes.

#### Collecte de métriques

**Prérequis** : déployez les Agents Datadog en tant que DaemonSet dans votre cluster Kubernetes à l'aide de la documentation relative à l'[intégration EKS][1].

1. En raison des limites imposées par App Mesh, pour transmettre des métriques depuis EKS vers Datadog, vous devez définir le filtre Egress sur `Allow External Traffic`.

2. Créez une ConfigMap dans votre cluster pour découvrir automatiquement les sidecars Envoy de App Mesh ajoutés à chaque pod :

    ```yaml
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

3. Modifiez l'objet `volumeMounts` dans le fichier YAML DaemonSet de votre Agent Datadog :

    ```yaml
          volumeMounts:
           - name: datadog-config
             mountPath: /conf.d
    ```

4. Modifiez l'objet `volumes` dans le fichier YAML DaemonSet de votre Agent Datadog :

    ```yaml
         volumes:
          - name: datadog-config
            configMap:
              name: datadog-config
              items:
              - key: envoy
                path: envoy.yaml
    ```

#### APM

{{< site-region region="us3" >}}

La collecte de logs n'est plus prise en charge pour ce site.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Pour activer la collecte de logs, mettez à jour le DaemonSet de l'Agent en suivant les [instructions relatives à la collecte de logs Kubernetes][1].

[1]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/#log-collection

{{< /site-region >}}

#### Collecte de traces

Sélectionnez l'espace de nommage pour déployer `datadog-agent` et le service, par exemple : `monitoring`. Utilisez-le dans l'option avec laquelle déployer l'injecteur appmesh :

    ```shell
      helm upgrade -i appmesh-controller eks/appmesh-controller \
      --namespace appmesh-system \
      --set sidecar.logLevel=debug \
      --set tracing.enabled=true \
      --set tracing.provider=datadog \
      --set tracing.address=ref:status.hostIP \
      --set tracing.port=8126
    ```


Vous pouvez également déployer l'injecteur appmesh en suivant les instructions de la section [App Mesh avec EKS][2] (en anglais) et en utilisant l'option `enable-datadog-tracing=true` ou la variable d'environnement `ENABLE_DATADOG_TRACING=true`.


[1]: https://docs.datadoghq.com/fr/integrations/amazon_eks/
[2]: https://github.com/aws/aws-app-mesh-examples/blob/master/walkthroughs/eks/base.md#install-app-mesh--kubernetes-components
{{% /tab %}}
{{% tab "ECS Fargate" %}}

#### Collecte de métriques

**Prérequis** : ajoutez des Agents Datadog à chacune de vos définitions de tâche Fargate pour lesquelles App Mesh est activé (comme un sidecar Envoy injecté). Pour ce faire, consultez la documentation relative à l'[intégration ECS Fargate][1].

1. En raison des limites imposées par App Mesh, pour transmettre des métriques depuis une tâche ECS vers Datadog, vous devez définir le filtre Egress sur `Allow External Traffic`.

2. Modifiez toutes les définitions de tâche contenant le sidecar Envoy et l'Agent Datadog avec les étiquettes Docker suivantes. Pour en savoir plus, consultez la section [Configuration d'intégration pour ECS Fargate][2].

    ```text
        "dockerLabels": {
              com.datadoghq.ad.instances : [{"stats_url": "http://%%host%%:9901/stats"}]
              com.datadoghq.ad.check_names : ["envoy"]
              com.datadoghq.ad.init_configs : [{}]
            },
    ```

#### APM

{{< site-region region="us3" >}}

La collecte de logs n'est plus prise en charge pour ce site.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Activez la collecte de logs en suivant les instructions détaillées dans la documentation relative à [l'intégration ECS Fargate][1].

[1]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/#log-collection

{{< /site-region >}}

#### Collecte de traces

1. Activez la collecte de traces en suivant les instructions détaillées dans la documentation relative à [l'intégration ECS Fargate][3].

Définissez les paramètres AWS App Mesh `ENABLE_ENVOY_DATADOG_TRACING` et `DATADOG_TRACER_PORT` en tant que variables d'environnement dans la définition de la tâche ECS Fargate. Pour en savoir plus, consultez la documentation [AWS App Mesh][4].


[1]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/
[2]: https://docs.datadoghq.com/fr/integrations/faq/integration-setup-ecs-fargate/
[3]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/#trace-collection
[4]: https://docs.aws.amazon.com/app-mesh/latest/userguide/envoy.html
{{% /tab %}}
{{% tab "ECS EC2" %}}

#### Collecte de métriques

**Prérequis** : ajoutez des Agents Datadog à chacune de vos définitions de tâche ECS EC2 pour lesquelles App Mesh est activé (comme un sidecar Envoy injecté). Pour ce faire, consultez la documentation relative à l'[intégration ECS][1].

1. En raison des limites imposées par App Mesh, pour transmettre des métriques depuis une tâche ECS vers Datadog, vous devez définir le filtre Egress sur `Allow External Traffic`.

2. Modifiez toutes les définitions de tâche contenant le sidecar Envoy et l'Agent Datadog avec les étiquettes Docker suivantes. Pour en savoir plus, consultez la section [Configuration d'intégration pour ECS Fargate][2].

    ```text
        "dockerLabels": {
              com.datadoghq.ad.instances : [{"stats_url": "http://%%host%%:9901/stats"}]
              com.datadoghq.ad.check_names : ["envoy"]
              com.datadoghq.ad.init_configs : [{}]
            },
    ```

#### APM

{{< site-region region="us3" >}}

La collecte de logs n'est plus prise en charge pour ce site.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Activez la collecte de logs en suivant les instructions détaillées dans la documentation relative à [l'intégration ECS][1].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/#log-collection

{{< /site-region >}}

#### Collecte de traces

1. Activez la collecte de traces en suivant les instructions détaillées dans la documentation relative à [l'intégration ECS][3].

2. Définissez les paramètres AWS App Mesh `ENABLE_ENVOY_DATADOG_TRACING` et `DATADOG_TRACER_PORT` en tant que variables d'environnement dans la définition de la tâche ECS. Pour en savoir plus, consultez la documentation [AWS App Mesh][4].


[1]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/
[2]: https://docs.datadoghq.com/fr/integrations/faq/integration-setup-ecs-fargate/
[3]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/#trace-collection
[4]: https://docs.aws.amazon.com/app-mesh/latest/userguide/envoy.html
{{% /tab %}}
{{< /tabs >}}

## Real User Monitoring

### Analyse d'entonnoirs

Pour obtenir la liste des métriques, consultez la documentation sur l'[intégration Envoy][2].

### Aide

L'intégration AWS App Mesh n'inclut aucun événement.

### Aide

L'intégration AWS App Mesh n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/app-mesh
[2]: https://docs.datadoghq.com/fr/integrations/envoy/#metrics
[3]: https://docs.datadoghq.com/fr/help/