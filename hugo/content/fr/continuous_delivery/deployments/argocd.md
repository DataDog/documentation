---
description: Découvrez comment surveiller les déploiements depuis Argo CD dans Datadog
  CD Visibility.
further_reading:
- link: /continuous_delivery/deployments
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrez comment interroger et visualiser les exécutions de déploiement.
is_beta: true
title: Surveiller les déploiements Argo CD.
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la Preview !" >}}
CD Visibility pour Argo CD est en version préliminaire. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

[Argo CD][1] est un outil de livraison continue (CD) GitOps déclaratif pour Kubernetes. Il suit le modèle GitOps en utilisant des dépôts Git pour définir l'état souhaité de l'application, et automatise le déploiement des applications dans des environnements cibles spécifiés.

Datadog CD Visibility s'intègre à Argo CD en utilisant [Argo CD Notifications][2]. Les notifications Argo CD se composent de deux éléments principaux :
1. [Déclencheurs][3], qui définissent _quand_ envoyer une notification.
2. [Modèles][4], qui définissent _ce qu'il faut_ envoyer dans une notification.

## Configuration minimale {#minimal-setup}

La configuration ci-dessous utilise le [service de notification Webhook][5] d'Argo CD pour envoyer des notifications à Datadog.

Tout d'abord, ajoutez votre [clé d'API Datadog][11] dans le secret `argocd-notifications-secret` avec la clé `dd-api-key`. Consultez [le guide Argo CD][2] pour plus d'informations sur la modification du `argocd-notifications-secret`.

Choisissez l'une des méthodes de configuration suivantes en fonction de la manière dont vous avez installé Argo CD :

- **Configuration standard (kubectl apply)** : Pour les installations Argo CD standard utilisant `kubectl apply`
- **Helm** : Pour les déploiements Argo CD basés sur Helm

### Configuration standard (kubectl apply) {#regular-setup-kubectl-apply}

Modifiez le ConfigMap `argocd-notifications-cm` pour créer le service de notification, le modèle et le déclencheur afin d'envoyer des notifications à Datadog :

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  service.webhook.cd-visibility-webhook: |
    url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
    headers:
    - name: "DD-CD-PROVIDER-ARGOCD"
      value: "true"
    - name: "DD-API-KEY"
      value: $dd-api-key
    - name: "Content-Type"
      value: "application/json"
  template.cd-visibility-template: |
    webhook:
      cd-visibility-webhook:
        method: POST
        body: |
            {
              "app": {{toJson .app}},
              "context": {{toJson .context}},
              "service_type": {{toJson .serviceType}},
              "recipient": {{toJson .recipient}},
              "commit_metadata": {{toJson (call .repo.GetCommitMetadata .app.status.operationState.syncResult.revision)}}
            }
  trigger.cd-visibility-trigger: |
    - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error'] and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
    - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
```

### Configuration Helm {#helm-setup}

Si vous avez utilisé Helm pour installer Argo CD, ajoutez la configuration suivante à votre `values.yaml` :

```yaml
notifications:
  notifiers:
    service.webhook.cd-visibility-webhook: |
      url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
      headers:
        - name: "DD-CD-PROVIDER-ARGOCD"
          value: "true"
        - name: "Content-Type"
          value: "application/json"
        - name: "DD-API-KEY"
          value: $dd-api-key
  templates:
    template.cd-visibility-template: |
      webhook:
        cd-visibility-webhook:
          method: POST
          body: |
            {
              "app": {{toJson .app}},
              "context": {{toJson .context}},
              "service_type": {{toJson .serviceType}},
              "recipient": {{toJson .recipient}},
              "commit_metadata": {{toJson (call .repo.GetCommitMetadata .app.status.operationState.syncResult.revision)}}
            }
  triggers:
    trigger.cd-visibility-trigger: |
      - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error'] and app.status.health.status in ['Healthy', 'Degraded']
        send: [cd-visibility-template]
      - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
        send: [cd-visibility-template]
```

### Résumé de la configuration {#configuration-summary}

Les ressources suivantes ont été ajoutées :
1. Le service `cd-visibility-webhook` cible l'ingestion Datadog et configure les en-têtes corrects pour la requête. L'en-tête `DD-API-KEY` fait référence à l'entrée `dd-api-key` ajoutée précédemment dans le `argocd-notifications-secret`.
2. Le `cd-visibility-template` définit ce qu'il faut envoyer dans la requête pour le service `cd-visibility-webhook`.
3. Le `cd-visibility-trigger` définit quand envoyer la notification, et il fait référence au `cd-visibility-template`.

Le champ `commit_metadata` est facultatif et peut être utilisé pour enrichir le déploiement avec des informations Git. Il doit être supprimé (avec la virgule de la ligne précédente) dans les cas suivants :
- Vous synchronisez déjà vos informations de référentiel vers Datadog (voir [Synchroniser les métadonnées du référentiel vers Datadog][20]).
- Votre source d'application Argo CD n'a pas de SHA de commit défini (par exemple, si vous utilisez des référentiels Helm).

Une fois le service de notification, le déclencheur et le modèle ajoutés à la config map, vous pouvez abonner n'importe laquelle de vos applications Argo CD à l'intégration.
Modifiez les annotations de l'application Argo CD soit en utilisant l'interface utilisateur d'Argo CD, soit en modifiant la définition de l'application avec les annotations suivantes :

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_service: <YOUR_SERVICE>
    dd_customtags: "region:us1-east, team:backend"
```

À partir de l'extrait ci-dessus :
1. L'annotation de notifications abonne l'application Argo CD à la configuration de notification créée ci-dessus. Consultez le [guide officiel d'Argo CD][12] pour plus de détails sur les abonnements aux applications.
2. Vous pouvez utiliser l'annotation `dd_env` pour configurer l'environnement de l'application. Remplacez `YOUR_ENV` ci-dessus par l'environnement
   vers lequel cette application se déploie (par exemple : `staging` ou `prod`). Si vous ne définissez pas cette annotation,
   L'environnement par défaut est `none`.
3. Vous pouvez utiliser l'annotation `dd_service` pour configurer le service de l'application. Remplacez `YOUR_SERVICE` ci-dessus par le service
   que l'application Argo CD déploie (par exemple : `transaction-service`). Lorsque cette annotation est utilisée, le service
   Son nom est ajouté à toutes les exécutions de déploiement générées à partir de l'application. De plus, si votre service est
   enregistré dans [Catalog][13], le nom de l'équipe est également ajouté à toutes les exécutions de déploiement. Si votre application Argo CD
   Si votre application Argo CD est configurée pour déployer plus d'un service, consultez [Taguez une application Argo CD déployant plusieurs services](#tag-an-argo-cd-application-deploying-multiple-services).
4. Vous pouvez utiliser l'annotation `dd_customtags` pour ajouter facultativement des tags personnalisés aux exécutions de déploiement générées pour cette application Argo CD.
   La valeur doit être définie sous forme d'une liste de tags séparés par des virgules, structurée en paires `key:value`.

Une fois que vous avez souscrit votre application Argo CD en ajoutant les annotations ci-dessus, les nouveaux déploiements de l'application commenceront à apparaître dans Datadog.

La section [Configuration recommandée](#recommended-setup) ci-dessous contient des actions recommandées pour améliorer la surveillance signalée dans CD Visibility.

## Configuration recommandée {#recommended-setup}

### Modifier la durée d'attente pour l'état de santé des ressources {#change-duration-to-wait-for-resources-health}
La durée signalée dans les événements de déploiement correspond à la durée de synchronisation dans Argo CD. Cependant, la durée de synchronisation représente généralement le temps passé par Argo CD à synchroniser l'état du dépôt Git et l'état du cluster Kubernetes.
Cela signifie que ce qui se passe après la synchronisation (par exemple, le temps passé par les ressources Kubernetes à démarrer) n'est pas inclus dans la durée.

Pour modifier la durée signalée afin d'attendre que les ressources configurées aient démarré et atteint un état sain, ajoutez une nouvelle ressource no-op surveillée par votre application Argo CD, avec une annotation [PostSync Hook][19].
Le hook PostSync s'exécutera une fois que toutes les ressources auront atteint un état sain, et la synchronisation Argo CD attendra le résultat du hook PostSync pour mettre à jour le statut de l'application comme étant « Healthy ».

Ci-dessous est représenté un exemple de Job PostSync Hook qui exécute une simple commande `echo`.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: cdvisibility-postsync-job # Ensures that the Argo CD sync duration waits for resources health
  annotations:
    argocd.argoproj.io/hook: PostSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      containers:
        - name: noop-echo
          image: alpine:latest
          command: ["echo", "all the sync resources have reached a healthy state"]
      restartPolicy: Never
  backoffLimit: 0
```

### Corréler les déploiements avec les pipelines CI {#correlate-deployments-with-ci-pipelines}

Par défaut, les métadonnées Git rapportées dans les événements de déploiement sont associées au dépôt qu'Argo CD surveille. Cependant, une configuration courante consiste à :
- Avoir un dépôt d'application, stockant le code source, et un dépôt de configuration, stockant les manifestes Kubernetes. Ensuite, configurez Argo CD pour surveiller le dépôt de configuration, comme indiqué sur la [page des meilleures pratiques Argo CD][17].
- Lorsqu'un changement se produit dans le dépôt d'application, effectuez un commit automatisé qui met à jour le dépôt de configuration (par exemple, en modifiant l'image actuelle d'une ressource Kubernetes).

Le diagramme suivant représente un exemple de ce type de configuration :

{{< img src="ci/diagram_argo-cd-deployment_240910.png" alt="Déclenchement des déploiements Argo CD via git" style="width:100%;">}}

<div class="alert alert-info">La corrélation d'images nécessite Argo CD v3.1.0 ou une version ultérieure.</div>

La [`datadog-ci deployment correlate-image` commande][14] peut être utilisée pour corréler une image avec un commit de dépôt d'application. Lorsqu'un déploiement Argo CD se produit, les informations de commit de configuration dans l'événement de déploiement sont remplacées par le commit de dépôt d'application associé, obtenu en examinant les images déployées, le cas échéant.

Pour activer cette corrélation, vous devez également ajouter l'annotation `dd_k8s_cluster` à votre application Argo CD, en spécifiant le nom du cluster Kubernetes vers lequel l'application se déploie. Le nom doit correspondre au nom indiqué dans le [produit Datadog Kubernetes][16]. Le nom de l'image doit également contenir le nom du service auquel elle se rapporte. Cela nous aide à écarter les images non pertinentes lors d'un déploiement.

Voici un exemple de la façon dont vous pouvez exécuter la commande lors de la génération de l'image qui sera ultérieurement déployée par Argo CD :

```yaml
 steps:
    - name: Correlate image with Datadog
      shell: bash
      run: |
        echo "Correlating image: ${{ inputs.image-name }} with Datadog"
        datadog-ci deployment correlate-image --image ${{ inputs.image-name }} --repository-url ${{ inputs.repository-url }} --commit-sha ${{ inputs.commit-sha }}
        echo "Successfully correlated ${{ inputs.image-name }} with Datadog"
```


Cette commande corrèle les images à partir des ressources de déploiement. Lorsque Datadog reçoit un déploiement, si plusieurs images sont présentes et que plus d'une image est corrélée, Datadog prend l'image qui contient le nom du service. La corrélation ne fonctionne que pour les ressources de déploiement.



#### Validation {#validation}

Si la commande a été correctement exécutée, les déploiements contiennent les métadonnées Git du dépôt d'application au lieu du dépôt de configuration. De plus, la vue des exécutions de déploiement contient désormais un nouvel onglet {{< ui >}}Pipeline{{< /ui >}} représentant la trace du pipeline CI associé.

## Taguez une application Argo CD déployant plusieurs services {#tag-an-argo-cd-application-deploying-multiple-services}

Si votre application Argo CD déploie plus d'un service, Datadog peut automatiquement déduire les services déployés à partir d'une synchronisation d'application. Datadog déduit les services en fonction des ressources Kubernetes qui ont été modifiées.

<div class="alert alert-danger">
La découverte automatique de service n'est pas prise en charge lorsque <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#server-side-apply">Server-Side Apply</a> est utilisé.
</div>

Pour activer le tagging automatique des services, vous devez [surveiller votre infrastructure Kubernetes à l'aide du Datadog Agent][15] et vos ressources Kubernetes doivent comporter les étiquettes suivantes :
- `tags.datadoghq.com/service` (requis) : spécifie le service Datadog de cette ressource. Pour plus d'informations, consultez [Unified Service Tagging][18].
- `team` (optionnel) : spécifie l'équipe Datadog de cette ressource. Si ce libellé est omis, l'équipe est automatiquement récupérée depuis [Catalog][13] en fonction du libellé de service.

Seules les ressources Kubernetes des types suivants sont éligibles : `Deployment`, `Rollout`, `ReplicaSet`, `StatefulSet`, `Service`, `DaemonSet`, `Pod`, `Job` et `CronJob`.

Ajoutez les annotations suivantes à votre application Argo CD :
- `dd_multiservice` : `true`. Cette annotation spécifie si Datadog déduit automatiquement les services déployés lors d'une synchronisation en fonction des ressources Kubernetes modifiées.
- `dd_k8s_cluster` : doit être défini sur le nom du cluster Kubernetes vers lequel l'application Argo CD est déployée. Le nom doit correspondre au nom indiqué dans le [produit Datadog Kubernetes][16].

Exemple :

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_multiservice: true
    dd_k8s_cluster: example-cluster
```

## Visualisez les déploiements dans Datadog {#visualize-deployments-in-datadog}

Les pages [**Déploiements**][6] et [**Exécutions**][7] sont remplies de données une fois qu'un déploiement est terminé. Pour plus d'informations, consultez [Explore CD Visibility Deployments][10].

## Dépannage {#troubleshooting}

Si les notifications ne sont pas envoyées, examinez les logs du `argocd-notification-controller` pod. Le contrôleur enregistre lorsqu'il envoie une notification (par exemple : `Sending notification ...`) et lorsqu'il ne parvient pas à notifier un destinataire
(par exemple : `Failed to notify recipient ...`). Pour d'autres scénarios de dépannage, consultez la [documentation officielle d'Argo CD][8].

### Discrépances de statut entre Argo CD et Datadog {#status-discrepancies-between-argo-cd-and-datadog}

Vous pourriez remarquer une divergence dans la façon dont le statut d'un déploiement est rapporté, où il est réussi dans Argo CD mais affiché comme une erreur dans Datadog. La différence clé réside dans la façon dont chaque plateforme évalue le succès du déploiement :
- **Argo CD** considère qu'une synchronisation est réussie tant qu'il peut appliquer les modifications aux manifestes Kubernetes, indépendamment de l'état d'exécution des ressources.
- **Datadog CD Visibility** évalue le résultat du déploiement de manière plus complète. Si l'une des ressources modifiées pendant la synchronisation se retrouve dans un état dégradé (par exemple, en raison d'une image incorrecte ou d'un problème de configuration), le déploiement est marqué comme ayant échoué ou étant dégradé dans Datadog, même si Argo CD le signale comme réussi.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://argo-cd.readthedocs.io/en/stable/
[2]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/
[3]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/triggers/
[4]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/templates/
[5]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/services/webhook/
[6]: https://app.datadoghq.com/ci/deployments
[7]: https://app.datadoghq.com/ci/deployments/executions
[8]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/troubleshooting/
[9]: /fr/continuous_delivery/search
[10]: /fr/continuous_delivery/explorer
[11]: https://app.datadoghq.com/organization-settings/api-keys
[12]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/subscriptions/
[13]: /fr/internal_developer_portal/catalog/
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[15]: /fr/containers/kubernetes
[16]: https://app.datadoghq.com/orchestration/explorer
[17]: https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/#separating-config-vs-source-code-repositories
[18]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[19]: https://argo-cd.readthedocs.io/en/stable/user-guide/resource_hooks/#resource-hooks
[20]: /fr/continuous_delivery/features/code_changes_detection#synchronize-repository-metadata-to-datadog