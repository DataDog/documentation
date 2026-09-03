---
title: Logs d'audit Kubernetes
name: kubernetes_audit_logs
custom_kind: integration
description: Effectuez le suivi de tous les événements ce qui se produisent dans vos clusters Kubernetes
short_description: Surveillez vos clusters Kubernetes
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes_audit_logs.md
categories:
  - log collection
  - containers
  - orchestration
doc_link: /integrations/kubernetes_audit_logs/
aliases:
  - /fr/logs/log_collection/kubernetes_audit_logs
has_logo: true
integration_title: Logs d'audit Kubernetes
is_public: true
public_title: Intégration Datadog/Logs d'audit Kubernetes
supported_os:
  - linux
  - mac_os
  - windows
further_reading:
  - link: logs/
    tag: Documentation
    text: Log Management
  - link: https://www.datadoghq.com/blog/key-kubernetes-audit-logs-for-monitoring-cluster-security/
    tag: Blog
    text: Logs d'audit Kubernetes clés pour la surveillance de la sécurité du cluster
integration_id: kubernetes-audit-logs
---
## Présentation

Recueillez des [logs d'audit Kubernetes][1] pour effectuer le suivi de tous les événements qui se produisent dans vos clusters Kubernetes, y compris tous les appels effectués vers l'API Kubernetes par vos services. Cela inclut le plan de contrôle (les contrôleurs intégrés et le scheduler), les daemons de nœud (le kubelet, kube-proxy, etc.), les services de cluster (comme l'autoscaler de cluster), les utilisateurs qui effectuent des requêtes `kubectl`, et même l'API Kubernetes.

L'intégration Logs d'audit Kubernetes vous permet de diagnostiquer les problèmes d'autorisation, d'identifier les politiques RBAC qui doivent être mises à jour, et d'effectuer le suivi de requêtes API lentes qui ont un impact sur l'ensemble de vos clusters. Plongez au cœur de ces sujets en regardant la [conférence donnée par Datadog à l'occasion du KubeCon 2019][2].

## Configuration

Cette intégration est **disponible à partir des versions > 6.0 de l'Agent**

### Configuration

Pour en savoir plus sur la configuration des logs d'audit Kubernetes, consultez la section [Audits de la documentation Kubernetes][3] (en anglais).

Pour activer les logs d'audit dans Kubernetes :

1. Les logs d'audit sont désactivés par défaut dans Kubernetes. Pour les activer dans la configuration de votre serveur d'API, vous devez spécifier un chemin de fichier de politique d'audit :

    ```conf
    kube-apiserver
      [...]
      --audit-log-path=/var/log/kubernetes/apiserver/audit.log
      --audit-policy-file=/etc/kubernetes/audit-policies/policy.yaml
    ```

2. Créez le fichier de politique à l'emplacement `/etc/kubernetes/audit-policies/policy.yaml` pour spécifier les types de requêtes d'API que vous souhaitez enregistrer dans vos logs d'audit. Les règles de politique d'audit sont évaluées selon l'ordre dans lequel elles ont été spécifiées. Le serveur d'API exécute la première règle applicable qu'il trouve pour chaque type d'opération ou ressource. Exemple de politique d'audit :

```yaml
# /etc/kubernetes/audit-policies/policy.yaml

apiVersion: audit.k8s.io/v1
kind: Policy
rules:
    # ne pas loguer les requêtes suivantes
    - level: None
      nonResourceURLs:
          - '/healthz*'
          - '/logs'
          - '/metrics'
          - '/swagger*'
          - '/version'

    # limiter le niveau à Metadata de sorte que le token ne soit pas inclus dans les spécifications/statuts
    - level: Metadata
      omitStages:
          - RequestReceived
      resources:
          - group: authentication.k8s.io
            resources:
                - tokenreviews

    # audit étendu de la délégation d'authentification
    - level: RequestResponse
      omitStages:
          - RequestReceived
      resources:
          - group: authorization.k8s.io
            resources:
                - subjectaccessreviews

    # loguer les modifications sur les pods au niveau RequestResponse
    - level: RequestResponse
      omitStages:
          - RequestReceived
      resources:
          # groupe d'API principal ; ajouter des services d'API tiers et vos services d'API au besoin
          - group: ''
            resources: ['pods']
            verbs: ['create', 'patch', 'update', 'delete']

    # loguer tous les autres événements au niveau Metadata
    - level: Metadata
      omitStages:
          - RequestReceived
```

Cet exemple de fichier de politique configure le serveur d'API de façon à loguer au niveau de détail le plus élevé certains types d'opérations qui entraînent une modification du cluster (mise à jour, patch, création, suppression). Il suit également les requêtes envoyées à la ressource `subjectaccessreviews` au niveau le plus élevé pour aider à dépanner des problèmes de délégation d'authentification.

Vous pouvez réduire le niveau de détail sur `Metadata` pour les endpoints qui contiennent des données sensibles, comme la ressource `tokenreviews`. Datadog omet également l'étape `RequestReceived` des logs.

Dans la dernière section, la politique est configurée de façon à loguer tous les éléments non couverts explicitement par les règles précédentes au niveau `Metadata`. Les logs d'audit étant parfois très détaillés, vous pouvez choisir d'exclure des actions/verbes moins importantes, par exemple les opérations qui ne modifient pas l'état du cluster comme list, watch et get.

### Collecte de logs

1. [Installez l'Agent][1] sur votre environnement Kubernetes.
2. La collecte de logs est désactivée par défaut. Vous devez l'activer dans la section `env` de votre [DaemonSet][4] :

    ```yaml
    env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: 'true'
    ```

3. Montez le répertoire des logs d'audit ainsi qu'un répertoire que l'Agent utilise pour stocker un pointeur pour savoir le dernier log qui a été envoyé à partir de ce fichier. Pour ce faire, ajoutez ce qui suit dans la section `volumeMounts` du daemonset :

    ```yaml
     # (...)
        volumeMounts:
          # (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
          - name: auditdir
            mountPath: /var/log/kubernetes/apiserver
          - name: dd-agent-config
            mountPath: /conf.d/kubernetes_audit.d
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
        - hostPath:
            path: /var/log/kubernetes/apiserver
          name: auditdir
        - name: dd-agent-config
            configMap:
              name: dd-agent-config
              items:
                - key: kubernetes-audit-log
                  path: conf.yaml
      # (...)
    ```

      Cela monte également le dossier `conf.d` qui est utilisé pour configurer l'Agent de façon à recueillir les logs à partir du fichier de logs d'audit.

4. Configurez l'Agent de façon à recueillir les logs provenant de ce fichier avec une ConfigMap :

    ```yaml
    kind: ConfigMap
    apiVersion: v1
    metadata:
        name: dd-agent-config
        namespace: default
    data:
        kubernetes-audit-log: |-
            logs:
              - type: file
                path: /var/log/kubernetes/apiserver/audit.log
                source: kubernetes.audit
                service: audit
    ```

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `Logs` dans la section Checks.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/#installation
[2]: https://www.youtube.com/watch?v=raJRLmGb9Is&t=1s
[3]: https://kubernetes.io/docs/tasks/debug-application-cluster/audit/
[4]: /fr/agent/kubernetes/log/
[5]: /fr/agent/guide/agent-commands/#agent-status-and-information
[6]: /fr/help/