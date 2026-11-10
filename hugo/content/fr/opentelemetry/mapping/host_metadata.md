---
aliases:
- /fr/opentelemetry/guide/host_metadata/
- /fr/opentelemetry/schema_semantics/host_metadata/
further_reading:
- link: /opentelemetry/
  tag: Documentation
  text: Prise en charge d'OpenTelemetry dans Datadog
title: Informations sur le host dans la liste d'infrastructure
---
<div class="alert alert-info">
Cette fonctionnalité est en préversion. Si vous avez des commentaires, contactez <a href="/help/">le support Datadog</a>.
</div>

## Présentation {#overview}

La configuration recommandée du collecteur OpenTelemetry collecte les métadonnées de host avec le récepteur de métriques de host et le processeur de détection de ressources, puis signale le collecteur via l'extension Datadog. Vous pouvez afficher ces hosts dans la [Liste d'infrastructure][6]. Pour la plupart des déploiements, comme l'exécution du collecteur en tant qu'agent sur chaque host, les informations de host sont renseignées automatiquement et vous n'avez pas besoin de suivre la configuration manuelle sur cette page.

<div class="alert alert-info">La configuration manuelle décrite sur cette page est principalement destinée aux <a href="https://opentelemetry.io/docs/collector/deployment/gateway/">déploiements de passerelle</a>, où le collecteur qui exporte vers Datadog s'exécute séparément des hosts sur lesquels il fait rapport. Dans ces configurations, taguez explicitement vos ressources afin que les métadonnées de host correctes atteignent Datadog. Si vous exécutez le collecteur en tant qu'agent sur chaque host, les métadonnées de host sont collectées par défaut et vous pouvez ignorer cette configuration.</div>

Envoyez des informations système sur les hosts en OTLP via le champ [`Resource`][1] dans le cadre de tout signal. Datadog prend en charge ces informations sous n'importe quel [modèle de déploiement][9], y compris les déploiements de passerelle.

Datadog utilise les [conventions sémantiques OpenTelemetry][2] pour reconnaître les informations système sur vos hosts. Suivez les instructions pour [la configuration des métriques de host][3] afin d'envoyer les métriques et les attributs de ressource nécessaires à Datadog. Alternativement, vous pouvez envoyer manuellement ces informations de la manière qui convient le mieux à votre infrastructure.

## Activation de la fonctionnalité {#opting-in-to-the-feature}

Pour les déploiements de passerelle, ou pour contrôler manuellement quelles ressources sont utilisées pour les métadonnées de host, définissez l'attribut de ressource `datadog.host.use_as_metadata` sur `true` dans toutes les charges utiles OTLP qui contiennent des informations sur les hosts.

Les ressources renseignent les informations de la liste d'infrastructure si elles possèdent un [attribut d'identification de host][10] et l'attribut `datadog.host.use_as_metadata` défini sur `true`.

Pour déclarer explicitement quelles ressources utiliser pour les métadonnées, ajoutez l'attribut de ressource booléen `datadog.host.use_as_metadata` à toutes les ressources qui contiennent des informations de host pertinentes.

Par exemple, pour définir cela pour toutes les ressources dans les métriques, les traces et les logs, utilisez le [processeur de transformation][7] avec la configuration suivante :

```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
```

Ajoutez ce processeur à la liste `processors` de tous vos pipelines.

Vous devez explicitement taguer toutes vos ressources avec un attribut d'identification de host. Cela est effectué par défaut par la [configuration recommandée pour les métriques de host][3].

## Conventions prises en charge {#supported-conventions}

Datadog prend en charge à la fois les conventions sémantiques au niveau des attributs de ressource et celles au niveau des métriques système. Les conventions sémantiques d'attributs de ressource prises en charge se trouvent principalement sous [l'espace de noms `host.`][4] et [l'espace de noms `os.`][8]. Toutes les conventions sémantiques au niveau des métriques système prises en charge se trouvent sous [l'espace de noms `system.`][5].

### Conventions système générales {#general-system-conventions}

| Convention sémantique                         | Type               | Champ dans l'application |
|---------------------------------------------|--------------------|--------------|
| [*Divers attributs d'identification de host*][10] | Attribut de ressource | Nom de host     |
| `os.description`                            | Attribut de ressource | OS           |

### Conventions CPU {#cpu-conventions}

| Convention sémantique         | Type               | Champ dans l'application       |
|-----------------------------|--------------------|--------------------|
| `host.cpu.vendor.id`        | Attribut de ressource | ID du fournisseur          |
| `host.cpu.model.name`       | Attribut de ressource | Nom du modèle         |
| `host.cpu.cache.l2.size`    | Attribut de ressource | Taille du cache         |
| `host.cpu.family`           | Attribut de ressource | Famille             |
| `host.cpu.model.id`         | Attribut de ressource | Modèle              |
| `host.cpu.stepping`         | Attribut de ressource | Stepping           |
| `system.cpu.logical.count`  | Métrique système      | Processeurs logiques |
| `system.cpu.physical.count` | Métrique système      | Cœurs              |
| `system.cpu.frequency`      | Métrique système      | MHz                |

### Conventions réseau {#network-conventions}

| Convention sémantique | Type               | Champ dans l'application              |
|---------------------|--------------------|---------------------------|
| `host.ip`           | Attribut de ressource | Adresse IP et adresse IPv6 |
| `host.mac`          | Attribut de ressource | Adresse MAC               |

### Collecte de ces conventions avec le Collecteur OpenTelemetry {#collecting-these-conventions-with-the-opentelemetry-collector}

Pour collecter ces conventions avec le Collecteur OpenTelemetry, configurez la [configuration recommandée pour les métriques de host][3]. Le récepteur de métriques de host collecte toutes les métriques pertinentes, tandis que le processeur de détection de ressources collecte tous les attributs de ressource pertinents.

**Remarque:** Vous devez ajouter ces processeurs et récepteurs dans le Collecteur s'exécutant sur le host que vous souhaitez surveiller. Un host passerelle ne collecte pas ces informations à partir de hosts distants.


## ID de ressource cloud canoniques {#canonical-cloud-resource-ids}

Les ID de ressource cloud canoniques (CCRID) sont des ID de ressource attribués par le fournisseur cloud qui identifient de manière unique une ressource cloud. Après avoir ajouté des CCRID à vos différents types d'observabilité, vous pouvez les utiliser pour lier de manière cohérente différents types de données pour une ressource cloud donnée. Vous pouvez ajouter des CCRID dans le même format pour tous les types de ressources cloud. L'ajout et l'adoption généralisés des CCRID vous donnent accès à une variété de cas d'utilisation pour les clients et les équipes internes.

Activez les CCRIDs pour passer d'une ressource à ses métriques, traces et logs associés pour tous les types de ressources, éliminant ainsi le changement de contexte et vous offrant une vue de bout en bout de vos ressources au sein du même workflow.

Pour utiliser cette fonctionnalité, définissez l'attribut de ressource `datadog.ccrid` sur la valeur du CCRID dans toutes les charges utiles OTLP.

Voir ci-dessous la liste des formats d'identifiant par cloud :
| Cloud   | Type d'identifiant    | Exemple                                                                                                                                      |
|---------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| AWS     | ARN                | `arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi`                                                                                    |
| Azure   | ID de ressource        | `/subscriptions/12345678-1234-5678-1234-567891234567/resourcegroups/exampleResourceGroup/Microsoft.Compute/virtualMachines/exampleVM`        |
| GCP     | Nom de ressource CAI  | `//compute.googleapis.com/projects/example-project/locations/us-central1/instances/my-instance`                                              |
| OCI     | OCID               | `ocid1.instance.oc1.eu-frankfurt-1.exampleuniqueid`                                                                                          |

Comment former un CCRID :
 * [AWS (EC2 Instance)][13] : `arn:aws:ec2:{region}:{accountId}:instance/{instanceId}`. 
    Utilisez cette commande pour récupérer le `instanceId` :
    ```shell
    ec2metadata --instance-id
    ```
 * [Azure][11] : `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}`
 * GCP : `//compute.googleapis.com/projects/{projectID}/zones/{zoneName}/instances/{instanceName}"`
 * OCI/Oracle : Le CCRID peut être obtenu en [envoyant une requête][12] à : `http://169.254.169.254/opc/v2/instance/id`


Par exemple, pour définir un CCRID AWS pour toutes les ressources dans les métriques, les traces et les logs, utilisez le [processeur de transformation][2] avec la configuration suivante :

```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.ccrid"], "arn:aws:ec2:us-east-1:123456789012:instance/i-abcdefghi")
```

Les conventions sémantiques OpenTelemetry définissent également l'attribut [cloud.resource_id][14], qui peut être mappé dans la configuration en utilisant le [processeur d'attributs][15].

Exemple : 

```yaml
processors:
  attributes/example:
    actions:
      - key: datadog.ccrid
        from_attribute: cloud.resource_id
        action: upsert
```


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/glossary/#resource
[2]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[3]: /fr/opentelemetry/collector_exporter/host_metrics
[4]: https://opentelemetry.io/docs/specs/semconv/resource/host/
[5]: https://opentelemetry.io/docs/specs/semconv/system/system-metrics/
[6]: /fr/infrastructure/list/
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#transform-processor
[8]: https://opentelemetry.io/docs/specs/semconv/resource/os/
[9]: https://opentelemetry.io/docs/collector/deployment/
[10]: /fr/opentelemetry/schema_semantics/hostname/
[11]: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription?tabs=azure-cli
[12]: https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/gettingmetadata.htm
[13]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-for-amazon-ec2.html#policy-syntax
[14]: https://opentelemetry.io/docs/specs/semconv/registry/attributes/cloud/#cloud-resource-id
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor