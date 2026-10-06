---
further_reading:
- link: https://opentelemetry.io/docs/collector/troubleshooting/
  tag: Site externe
  text: Dépannage d'OpenTelemetry
title: Dépannage
---
Si vous rencontrez un comportement inattendu lors de l'utilisation d'OpenTelemetry avec Datadog, ce guide peut vous aider à résoudre le problème. Si vous continuez à rencontrer des difficultés, contactez le [support Datadog][1] pour obtenir de l'aide.

## Noms d'hôte incorrects ou inattendus {#incorrect-or-unexpected-hostnames}

Lors de l'utilisation d'OpenTelemetry avec Datadog, vous pourriez rencontrer divers problèmes liés au nom d'hôte. Les sections suivantes couvrent les scénarios courants et leurs solutions.

### Différence entre le nom d'hôte Kubernetes et le nom du nœud {#different-kubernetes-hostname-and-node-name}

**Symptôme** : Lors du déploiement dans Kubernetes, le nom d'hôte signalé par Datadog ne correspond pas au nom de nœud attendu.

**Cause** : Ceci est généralement le résultat de balises `k8s.node.name` (et éventuellement `k8s.cluster.name`) manquantes.

**Résolution** :

1. Configurez l'attribut `k8s.pod.ip` pour votre déploiement d'application : 

   ```yaml
   env:
     - name: MY_POD_IP
       valueFrom:
         fieldRef:
           apiVersion: v1
           fieldPath: status.podIP
     - name: OTEL_RESOURCE_ATTRIBUTES
       value: k8s.pod.ip=$(MY_POD_IP)
   ```

2. Activez le processeur `k8sattributes` dans votre collecteur :

   ```yaml
   k8sattributes:
   [...]
   processors:
     - k8sattributes
   ```

Alternativement, vous pouvez remplacer le nom d'hôte en utilisant l'attribut `datadog.host.name` :

   ```yaml
   processors:
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.name"], "${NODE_NAME}")
   ```

Pour plus d'informations sur les attributs d'identification d'hôte, consultez [Mapping OpenTelemetry Semantic Conventions to Hostnames][2]. Pour la configuration de nom d'hôte recommandée pour votre installation, consultez [Hostname and Tagging][9].

### Noms d'hôte inattendus avec un déploiement AWS Fargate {#unexpected-hostnames-with-aws-fargate-deployment}

**Symptôme** : Dans les environnements AWS Fargate, un nom d'hôte incorrect peut être signalé pour les traces.

**Cause** : Dans les environnements Fargate, la détection de ressource par défaut peut ne pas identifier correctement les métadonnées ECS, ce qui conduit à une attribution de nom d'hôte incorrecte.

**Résolution** :

Configurez le processeur `resourcedetection` dans la configuration de votre collecteur et activez le détecteur `ecs` :

```yaml
processors:
  resourcedetection:
    detectors: [env, ecs]
    timeout: 2s
    override: false
```

### Le collecteur de passerelle ne transfère pas les métadonnées de l'hôte {#gateway-collector-not-forwarding-host-metadata}

**Symptôme** : Dans un déploiement de passerelle, la télémétrie provenant de plusieurs hôtes semble provenir d'un seul hôte, ou les métadonnées de l'hôte ne sont pas correctement transférées.

**Cause** : Cela se produit lorsque la configuration du collecteur de passerelle ne préserve pas ou ne transfère pas correctement les attributs de métadonnées de l'hôte provenant des collecteurs d'agent.

**Résolution** :

1. Configurez les collecteurs d'agent pour collecter et transférer les métadonnées de l'hôte :

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true
   ```

2. Configurez le collecteur de passerelle pour extraire et transférer les métadonnées nécessaires :

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.use_as_metadata"], true)
   
   exporters:
     datadog:
       hostname_source: resource_attribute
   ```

Pour plus d'informations, consultez [Mapping OpenTelemetry Semantic Conventions to Infrastructure List Host Information][3].

### Le même hôte apparaît plusieurs fois sous des noms différents {#the-same-host-shows-up-multiple-times-under-different-names}

**Symptôme** : Un seul hôte apparaît sous plusieurs noms dans Datadog. Par exemple, vous pourriez voir une entrée provenant du Collecteur OpenTelemetry (avec le logo OTel) et une autre provenant de Datadog Agent.

**Cause** : Lorsqu'un hôte est surveillé via plusieurs méthodes d'ingestion (par exemple, OTLP + Datadog Agent, ou DogStatsD + OTLP) sans s'aligner sur un attribut de ressource de nom d'hôte unique, Datadog traite chaque chemin comme un hôte distinct.

**Résolution** :
1. Identifiez tous les chemins d'ingestion de télémétrie actifs envoyant des données de la même machine vers Datadog.
2. Choisissez une source de nom d'hôte unique et décidez si vous souhaitez vous appuyer sur le nom d'hôte du Datadog Agent ou sur un attribut de ressource spécifique (par exemple, `k8s.node.name`).
3. Configurez chaque chemin (Agent, Collecteur, etc.) afin qu'ils signalent un nom d'hôte cohérent. Par exemple, si vous définissez le nom d'hôte avec des attributs OTLP, configurez votre processeur de transformation :
    ```yaml
    processors:
      transform:
        trace_statements:
          - context: resource
            statements:
              - set(attributes["datadog.host.name"], "shared-hostname")
    ```
4. Validez dans Datadog (Liste d'infrastructure, carte des hôtes, etc.) pour confirmer que l'hôte apparaît désormais sous un nom unique.

## Retards des tags d'hôte après le démarrage {#host-tag-delays-after-startup}

**Symptôme** : Vous pouvez constater un délai dans l'apparition des tags d'hôte sur vos données de télémétrie après le démarrage du Datadog Agent ou de l'OpenTelemetry Collector. Ce délai dure généralement moins de 10 minutes, mais peut s'étendre jusqu'à 40-50 minutes dans certains cas.

**Cause** : Ce délai survient car les métadonnées de l'hôte doivent être traitées et indexées par le backend de Datadog avant que les tags puissent être associés aux données de télémétrie.

**Résolution** :

Les tags d'hôte configurés soit dans la configuration de l'exportateur Datadog (`host_metadata::tags`), soit dans la section `tags` du Datadog Agent ne sont pas immédiatement appliqués aux données de télémétrie. Les tags apparaissent finalement après que le backend a résolu les métadonnées de l'hôte.

Choisissez votre configuration pour des instructions spécifiques :

{{< tabs >}}
{{% tab "Ingestion OTLP du Datadog Agent" %}}

Configurez `expected_tags_duration` dans `datadog.yaml` pour combler l'écart jusqu'à ce que les tags d'hôte soient résolus :

```yaml
expected_tags_duration: "15m"
```

Cette configuration ajoute les tags attendus à toute la télémétrie pour la durée spécifiée (dans cet exemple, 15 minutes).

{{% /tab %}}

{{% tab "Collector OpenTelemetry" %}}

Utilisez le processeur `transform` pour définir vos tags d'hôte en tant qu'attributs OTLP. Par exemple, pour ajouter des tags d'environnement et d'équipe :

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          # OpenTelemetry semantic conventions
          - set(attributes["deployment.environment.name"], "prod")
          # Datadog-specific host tags
          - set(attributes["ddtags"], "env:prod,team:backend")
...
```

Cette approche combine les conventions sémantiques OpenTelemetry avec les tags d'hôte spécifiques à Datadog pour assurer un fonctionnement correct dans les environnements OpenTelemetry et Datadog.

{{% /tab %}}
{{< /tabs >}}

## Les tags d'infrastructure sont manquants dans la télémétrie {#infrastructure-tags-are-missing-from-telemetry}

**Symptôme** : Vous avez activé le processeur `infraattributes` dans votre configuration de collecteur DDOT, mais les tags au niveau Kubernetes (comme `k8s.pod.name`, `k8s.namespace.name` ou pod labels) n'apparaissent pas sur vos traces, métriques ou logs.

**Cause** : Le processeur `infraattributes` nécessite des attributs de ressource spécifiques sur la télémétrie entrante pour identifier le conteneur source.

Si l'attribut de ressource `container.id` n'est pas présent sur l'entrée, le processeur tente de le détecter automatiquement. Les méthodes suivantes sont essayées, par ordre de priorité décroissante :

| Attributs de ressource                              | Méthode de détection                  |
|--------------------------------------------------|-----------------------------------|
| `process.pid` (int)                              | Basé sur le PID externe du conteneur |
| `datadog.container.cgroup_inode` (int)           | Basé sur l'inode cgroup du conteneur |
| `k8s.pod.uid` (str) + `k8s.container.name` (str) | Basé sur le pod et le nom du conteneur |

Si votre télémétrie ne fournit pas d'attributs pour l'une de ces méthodes de détection, le processeur ne peut pas rechercher les métadonnées Kubernetes correspondantes.

**Résolution** :

Assurez-vous que votre télémétrie inclut les attributs requis en suivant ces étapes dans l'ordre :

1.  **Utilisez l'auto-instrumentation du SDK (préféré)** : passez à une version récente de l'auto-instrumentation OpenTelemetry de votre langage. Il s'agit de la première étape privilégiée, car elle permet souvent d'obtenir `container.id` ou `process.pid` automatiquement. Si ces attributs ne sont pas ajoutés automatiquement, consultez la documentation de votre SDK. Certains SDK (comme Go) fournissent un paramètre spécifique (tel que [resource.WithContainerID][8]) pour activer cette fonctionnalité.

2.  **Définissez manuellement les attributs de ressource** : si l'instrumentation automatique n'ajoute pas les attributs nécessaires, définissez-les manuellement à l'aide de `OTEL_RESOURCE_ATTRIBUTES`. Cela permet au processeur d'utiliser les méthodes de détection `k8s.pod.uid` et `k8s.container.name`. Exemple :
    ```yaml
    env:
      - name: OTEL_SERVICE_NAME
        value: {{ .Chart.Name }}
      - name: OTEL_K8S_NAMESPACE
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.namespace
      - name: OTEL_K8S_NODE_NAME
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: spec.nodeName
      - name: OTEL_K8S_POD_NAME
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.name
      - name: OTEL_K8S_POD_ID
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.uid
      - name: OTEL_RESOURCE_ATTRIBUTES
        value: >-
          service.name=$(OTEL_SERVICE_NAME),
          k8s.namespace.name=$(OTEL_K8S_NAMESPACE),
          k8s.node.name=$(OTEL_K8S_NODE_NAME),
          k8s.pod.name=$(OTEL_K8S_POD_NAME),
          k8s.pod.uid=$(OTEL_K8S_POD_ID),
          k8s.container.name={{ .Chart.Name }},
          host.name=$(OTEL_K8S_NODE_NAME),
          deployment.environment.name=$(OTEL_K8S_NAMESPACE)
    ```
3. **Utilisez le processeur `resourcedetection` du Collector** : Si vous ne pouvez pas définir les attributs de ressource au niveau du SDK ou de l'application, vous pouvez utiliser le processeur `resourcedetection` du Collector. Placez-le avant `infraattributes`.

4.  **Vérifiez les attributs** : utilisez l'exportateur `debug` dans votre pipeline DDOT Collector pour confirmer que les attributs de ressource requis (tels que `container.id`, `process.pid` ou `k8s.pod.uid`) sont présents sur votre télémétrie.

Pour plus de détails sur les attributs utilisés par ce processeur, consultez la [documentation du processeur d'attributs d'infrastructure][7].

## Impossible de mapper l'attribut « team » au tag d'équipe Datadog {#unable-to-map-team-attribute-to-datadog-team-tag}

**Symptôme** : Le tag d'équipe n'apparaît pas dans Datadog pour les logs et les traces, bien qu'il soit défini comme attribut de ressource dans les configurations OpenTelemetry.

**Cause** : Cela se produit parce que les attributs de ressource OpenTelemetry nécessitent un mappage explicite vers le format de tag de Datadog en utilisant l'attribut `ddtags`.

**Résolution** :

Utilisez le processeur de transformation du collecteur OpenTelemetry pour mapper l'attribut de ressource d'équipe à l'attribut `ddtags` :

```yaml
processors:
  transform/datadog_team_tag:
    metric_statements:
      - context: datapoint
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
    log_statements:
      - context: log
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
    trace_statements:
      - context: span
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
```

<div class="alert alert-info">Remplacez <code>resource.attributes["team"]</code> par le nom d'attribut réel s'il est différent dans votre configuration (par exemple, <code>resource.attributes["arm.team.name"]</code>).</div>

Pour vérifier la configuration :

1. Redémarrez le collecteur OpenTelemetry pour appliquer les modifications.
2. Générez des logs et des traces de test.
3. Vérifiez si la balise d'équipe apparaît dans vos logs et traces Datadog.
4. Vérifiez que la balise d'équipe fonctionne comme prévu dans le filtrage et les dashboards.

## Les balises de conteneur n'apparaissent pas sur la page Conteneurs {#container-tags-not-appearing-on-containers-page}

**Symptôme** : Les balises de conteneur n'apparaissent pas sur la page Containers dans Datadog, ce qui affecte les capacités de surveillance et de gestion des conteneurs.

**Cause** : Cela se produit lorsque les attributs de ressource de conteneur ne sont pas correctement mappés au format de métadonnées de conteneur attendu par Datadog.

**Résolution** :

Lors de l'utilisation de l'ingestion OTLP dans Datadog Agent, vous devez définir des attributs de ressource spécifiques pour garantir une association correcte des métadonnées de conteneur. Pour plus d'informations, consultez [Mappage des attributs de ressource][4].

Pour vérifier la configuration :

1. Vérifiez les données de trace brutes pour confirmer que les ID et les balises de conteneur sont correctement traduits au format Datadog (par exemple, `container.id` devrait devenir `container_id`).
2. Vérifiez que les métadonnées de conteneur apparaissent sur la page Containers.

## Métriques manquantes dans le Catalogue et les dashboards {#missing-metrics-in-catalog-and-dashboards}

**Symptôme** : Les métriques n'apparaissent pas dans le Catalogue et les dashboards bien qu'elles soient correctement collectées.

**Cause** : Cela se produit généralement en raison de conventions sémantiques incorrectes ou mal mappées.

**Résolution** :

Pour vérifier la configuration :

1. Vérifiez que vos métriques contiennent les [conventions sémantiques][4] requises.
2. Vérifiez que les noms des métriques respectent les conventions de nommage d'OpenTelemetry.
3. Confirmez que les métriques sont correctement traduites au format Datadog en utilisant la [référence de mappage des métriques][5].

<div class="alert alert-info">Lorsque vous travaillez avec des conventions sémantiques, assurez-vous de suivre la dernière spécification OpenTelemetry pour le nommage des métriques et les attributs.</div>

## Erreurs de liaison de port et échecs de connexion {#port-binding-errors-and-connection-failures}

**Symptôme** : Vous rencontrez des conflits de port ou des problèmes de liaison lors du déploiement du collecteur DDOT, ou les applications ne parviennent pas à se connecter au collecteur DDOT.

**Cause** : Cela se produit généralement en raison de conflits de nommage de port, de configurations de port incorrectes ou lorsque plusieurs services tentent d'utiliser les mêmes ports.

**Résolution** :

Datadog Operator lie automatiquement le collecteur OpenTelemetry aux ports `4317` (nommés `otel-grpc`) et `4318` (nommés `otel-http`) par défaut.

Pour remplacer explicitement les ports par défaut, utilisez le paramètre `features.otelCollector.ports` :

```yaml
# Enable Features
features:
  otelCollector:
    enabled: true
    ports:
      - containerPort: 4317
        hostPort: 4317
        name: otel-grpc
      - containerPort: 4318
        hostPort: 4318
        name: otel-http
```

<div class="alert alert-danger">Lors de la configuration des ports <code>4317</code> et <code>4318</code>, vous devez utiliser les noms par défaut <code>otel-grpc</code> et <code>otel-http</code> respectivement pour éviter les conflits de ports.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/opentelemetry/schema_semantics/hostname/
[3]: /fr/opentelemetry/schema_semantics/host_metadata/
[4]: /fr/opentelemetry/schema_semantics/semantic_mapping/
[5]: /fr/opentelemetry/schema_semantics/metrics_mapping/#metrics-mappings
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#readme
[7]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[8]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainerID
[9]: /fr/opentelemetry/config/hostname_tagging/#hostname-recommendations