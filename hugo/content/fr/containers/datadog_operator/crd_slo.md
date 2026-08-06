---
description: Créer et gérer les objectifs de niveau de service (SLO) Datadog en utilisant
  la définition de ressource personnalisée DatadogSLO
title: CRD DatadogSLO
---

Pour créer un [objectif de niveau de service][1] (SLO), vous pouvez utiliser le Datadog Operator et la définition de ressource personnalisée (CRD) `DatadogSLO`.

### Prérequis
- [Helm][2]
- [`kubectl` CLI][3]
- [Datadog Operator][4] v0.6+

### Configuration

1. Créez un fichier avec les spécifications de votre configuration de déploiement `DatadogSLO`.

   **Exemple** : SLO [basé sur un Monitor][5]

   {{< code-block lang="yaml" filename="datadog-slo.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogSLO
   metadata:
     name: example-slo-monitor3
     namespace: system 
   spec:
     name: example-slo-monitor3
     description: "This is an example monitor SLO from datadog-operator"
     monitorIDs:
       - 1234
     tags:
       - "service:example"
       - "env:prod"
     targetThreshold: "99.9"
     timeframe: "7d"
     type: "monitor"
   {{< /code-block >}}

   **Example**: [Metric-based][6] SLO

   {{< code-block lang="yaml" filename="datadog-slo.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogSLO
   metadata:
     name: example-slo
     namespace: system 
   spec:
     name: example-slo
     description: "This is an example metric SLO from datadog-operator"
     query:
       denominator: "sum:requests.total{service:example,env:prod}.as_count()"
       numerator: "sum:requests.success{service:example,env:prod}.as_count()"
     tags:
       - "service:example"
       - "env:prod"
     targetThreshold: "99.9"
     timeframe: "7d"
     type: "metric"
   {{< /code-block >}}

   Pour découvrir toutes les options de configuration disponibles, consultez la section [Référence de l'API de création d'un objet SLO][4].

2. Déployez votre `DatadogSLO` :

   ```shell
   kubectl apply -f /path/to/your/datadog-slo.yaml
   ```

### Autres exemples
[SLO basé sur une métrique avec Universal Service Monitoring][8]

[1]: /fr/service_management/service_level_objectives/
[2]: https://helm.sh/
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: /fr/api/latest/service-level-objectives/#create-an-slo-object
[5]: /fr/service_management/service_level_objectives/monitor/
[6]: /fr/service_management/service_level_objectives/metric/
[7]: /fr/api/latest/service-level-objectives/#create-an-slo-object
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogslo/metric-usm-example.yaml