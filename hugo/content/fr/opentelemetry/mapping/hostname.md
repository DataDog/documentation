---
aliases:
- /fr/opentelemetry/schema_semantics/hostname/
further_reading:
- link: /opentelemetry/
  tag: Documentation
  text: Prise en charge d'OpenTelemetry dans Datadog
title: Mappage des conventions sémantiques OpenTelemetry aux noms d'hôte
---
## Présentation {#overview}

OpenTelemetry définit certaines conventions sémantiques pour les attributs de ressource liés aux noms d'hôte. Si une charge utile du protocole OpenTelemetry (OTLP) pour tout type de signal possède des attributs de ressource de nom d'hôte connus, Datadog respecte ces conventions et tente d'utiliser sa valeur comme nom d'hôte. L'algorithme de résolution de nom d'hôte par défaut est conçu dans un souci de compatibilité avec le reste des produits Datadog, mais vous pouvez le remplacer si nécessaire.

Cet algorithme est utilisé dans l'ingestion OTLP de Datadog, l'[exportateur Datadog][3], le [pipeline d'ingestion OTLP dans Datadog Agent][2] et le [collecteur DDOT][5]. Lorsque vous exécutez un collecteur, le [processeur de détection de ressources][1] ajoute les attributs de ressource dont l'algorithme a besoin. Pour des conseils par chemin, consultez [Nom d'hôte et marquage][4].

## Conventions utilisées pour déterminer le nom d'hôte {#conventions-used-to-determine-the-hostname}

Les conventions sont vérifiées dans les attributs de ressource dans l'ordre suivant, et le premier nom d'hôte valide est utilisé. Si aucune convention valide n'est présente, la logique de nom d'hôte de secours est utilisée. Cette logique de secours varie selon le produit.

1. Vérifiez les conventions spécifiques à Datadog : `host` et `datadog.host.name`.
1. Vérifiez les conventions spécifiques aux fournisseurs cloud : AWS, Azure et GCP.
1. Vérifiez les conventions spécifiques à Kubernetes.
1. Si aucune convention spécifique n'est trouvée, revenez à `host.id` et `host.name`.

Les sections suivantes expliquent chaque ensemble de conventions plus en détail.

### Conventions sémantiques générales de nom d'hôte {#general-hostname-semantic-conventions}

Les conventions `host` et `datadog.host.name` sont des conventions spécifiques à Datadog. Elles sont examinées en premier et peuvent être utilisées pour remplacer le nom d'hôte détecté à l'aide des conventions sémantiques OpenTelemetry habituelles. `host` est vérifié en premier, puis `datadog.host.name` est vérifié si `host` n'a pas été défini.

Préférez l'utilisation de la convention `datadog.host.name` car elle est basée sur des espaces de noms et est moins susceptible d'entrer en conflit avec d'autres comportements spécifiques au fournisseur.

Lors de l'utilisation du collecteur OpenTelemetry, vous pouvez utiliser le processeur `transform` pour définir la convention `datadog.host.name` dans vos pipelines. Par exemple, pour définir le nom d'hôte comme `my-custom-hostname` dans toutes les métriques, traces et logs sur un pipeline donné, utilisez la configuration suivante :

```yaml
transform:
  metric_statements: &statements
    - context: resource
      statements:
        - set(attributes["datadog.host.name"], "my-custom-hostname")
  trace_statements: *statements # Use the same statements as in metrics
  log_statements:   *statements # Use the same statements as in metrics
```

N'oubliez pas d'ajouter le processeur `transform` à vos pipelines.

En raison de la manière dont les backends traitent la déduplication des noms d'hôte, vous pouvez occasionnellement voir un alias pour votre hôte. Si cela vous pose problème, veuillez contacter le support.

### Conventions spécifiques au fournisseur cloud {#cloud-provider-specific-conventions}

L'attribut de ressource `cloud.provider` est utilisé pour déterminer le fournisseur cloud. D'autres attributs de ressource sont utilisés pour déterminer le nom d'hôte pour chaque plateforme spécifique. Si `cloud.provider` ou l'un des attributs de ressource attendus est manquant, l'ensemble de conventions suivant est vérifié.

#### Amazon Web Services {#amazon-web-services}

Si `cloud.provider` a la valeur `aws`, les conventions suivantes sont vérifiées :

1. Vérifiez `aws.ecs.launchtype` pour déterminer si la charge utile provient d'une tâche ECS Fargate. Si tel est le cas, utilisez `aws.ecs.task.arn` comme identifiant avec le nom de balise `task_arn`.
1. Sinon, utilisez `host.id` comme nom d'hôte. Cela correspond à l'identifiant d'instance EC2.

#### Google Cloud {#google-cloud}

Si `cloud.provider` a la valeur `gcp`, les conventions suivantes sont vérifiées :

1. Vérifiez que `host.name` et `cloud.account.id` sont tous deux disponibles et ont le format attendu, supprimez le préfixe de `host.name` et fusionnez les deux en un nom d'hôte.

#### Azure {#azure}

Si `cloud.provider` a la valeur `azure`, les conventions suivantes sont vérifiées :

1. Utilisez `host.id` comme nom d'hôte s'il est disponible et a le format attendu.
1. Sinon, revenez à `host.name`.

### Conventions spécifiques à Kubernetes {#kubernetes-specific-conventions}

Si `k8s.node.name` et le nom du cluster sont disponibles, le nom d'hôte est défini sur `<node name>-<cluster name>`. Si seul `k8s.node.name` est disponible, le nom d'hôte est défini sur le nom du nœud.

Pour obtenir le nom du cluster, les conventions suivantes sont vérifiées :

1. Vérifiez `k8s.cluster.name` et utilisez-le s'il est présent.
2. Si `cloud.provider` est défini sur `azure`, extrayez le nom du cluster de `azure.resourcegroup.name`.
3. Si `cloud.provider` est défini sur `aws`, extrayez le nom du cluster du premier attribut de ressource commençant par `ec2.tag.kubernetes.io/cluster/`.

### `host.id` et `host.name` {#hostid-and-hostname}

Si aucune des conventions ci-dessus n'est présente, les attributs de ressource `host.id` et `host.name` sont utilisés tels quels pour déterminer le nom d'hôte. `host.id` est vérifié en premier, puis `host.name` est vérifié si `host.id` n'a pas été défini.

**Remarque :** La spécification OpenTelemetry permet à `host.id` et `host.name` d'avoir des valeurs qui peuvent ne pas correspondre à celles utilisées par d'autres produits Datadog dans un environnement donné. Si vous utilisez plusieurs produits Datadog pour surveiller le même hôte, vous devrez peut-être remplacer le nom d'hôte en utilisant `datadog.host.name` pour assurer la cohérence.

## Processeur d'attributs d'infrastructure {#infra-attributes-processor}

Le [processeur d'attributs d'infrastructure][6] automatise l'extraction des tags Kubernetes basés sur des étiquettes ou des annotations et attribue ces tags en tant qu'attributs de ressource sur les traces, les métriques et les logs. Le processeur d'attributs d'infrastructure nécessite que les [attributs][7] suivants (tels que `container.id`) soient définis pour extraire les attributs et le nom d'hôte corrects.

Le processeur d'attributs d'infrastructure peut également être configuré pour remplacer le nom d'hôte extrait des attributs par le nom d'hôte de l'Agent :

```
processors:
 infraattributes:
   allow_hostname_override: true
```

**Remarque** : ce paramètre est uniquement disponible pour le collecteur DDOT. 

## Logique de nom d'hôte de secours {#fallback-hostname-logic}

Si aucun nom d'hôte valide n'est trouvé dans les attributs de ressource, le comportement varie en fonction du chemin d'ingestion. 

{{< tabs >}}
{{% tab "Exportateur Datadog" %}}

La logique de nom d'hôte de secours est utilisée. Cette logique génère un nom d'hôte pour la machine où 
le Datadog Exporter est en cours d'exécution, ce qui est compatible avec le reste des produits Datadog, en vérifiant les sources suivantes :

1. Le champ `hostname` dans la configuration du Datadog Exporter.
1. API du fournisseur cloud.
1. Nom d'hôte Kubernetes.
1. Nom de domaine complet.
1. Nom d'hôte du système d'exploitation.

Cela peut entraîner des noms d'hôte incorrects dans les [déploiements de passerelle][1]. Pour éviter cela, utilisez le processeur `resource detection` dans vos pipelines afin de garantir une résolution précise du nom d'hôte.

[1]: https://opentelemetry.io/docs/collector/deployment/gateway/
{{% /tab %}}
{{% tab "Pipeline d'ingestion OTLP dans le Datadog Agent" %}}

Le nom d'hôte de Datadog Agent est utilisé. Consultez [Comment Datadog détermine-t-il le nom d'hôte de l'Agent ?][1] pour plus d'informations.

[1]: /fr/agent/faq/how-datadog-agent-determines-the-hostname/
{{% /tab %}}
{{< /tabs >}}

## Noms d'hôte non valides {#invalid-hostnames}

Les noms d'hôte suivants sont considérés comme non valides et ignorés :
- `0.0.0.0`
- `127.0.0.1`
- `localhost`
- `localhost.localdomain`
- `localhost6.localdomain6`
- `ip6-localhost`

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor
[2]: /fr/opentelemetry/interoperability/otlp_ingest_in_the_agent
[3]: /fr/opentelemetry/setup/collector_exporter/datadog_exporter/
[4]: /fr/opentelemetry/config/hostname_tagging/#hostname-recommendations
[5]: /fr/opentelemetry/migrate/ddot_collector/
[6]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor
[7]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#expected-attributes