---
description: Découvrez comment surveiller des déploiements Argo CD dans la solution
  CD Visibility de Datadog.
further_reading:
- link: /continuous_delivery/deployments
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Découvrir comment interroger et visualiser des exécutions de déploiement
is_beta: true
title: Surveiller des déploiements Argo CD
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la version Preview !" >}}
CD Visibility pour Argo CD est en version Preview. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation

[Argo CD][1] est un outil déclaratif GitOps de livraison continue (CD) pour Kubernetes. Il suit le modèle GitOps en utilisant des référentiels Git pour définir l'état souhaité des applications, et automatise le déploiement des applications dans les environnements cibles spécifiés.

La solution CD Visibility de Datadog s'intègre à Argo CD à l'aide des [notifications Argo CD][2]. Celles-ci comprennent deux composants principaux :
1. Des [déclencheurs][3], qui définissent _à quels moments_ une notification doit être envoyée
2. Des [modèles][4], qui définissent le _contenu_ de la notification envoyée

## Configuration minimale

La configuration ci-dessous utilise le [service de notification Webhook][5] d'Argo CD pour envoyer des notifications à Datadog.

Commencez par ajouter votre [clé d'API Datadog][11] dans le secret `argocd-notifications-secret` avec la clé `dd-api-key`. Consultez [le guide Argo CD][2] (en anglais) pour en savoir plus sur la modification du secret `argocd-notifications-secret`.

Choisissez l'une des méthodes de configuration suivantes, en fonction de votre type d'installation Argo CD :

- **Regular setup (kubectl apply)** : pour les installations standard d'Argo CD reposant sur `kubectl apply`
- **Helm** : pour les déploiements d'Argo CD basés sur Helm

### Configuration standard (kubectl apply)

Modifiez la ConfigMap `argocd-notifications-cm` afin de créer le service de notification, le modèle et le déclencheur permettant d'envoyer des notifications à Datadog :

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

### Configuration Helm

Si vous avez utilisé Helm pour installer Argo CD, ajoutez la configuration suivante à votre fichier `values.yaml` :

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

### Synthèse de la configuration

Les ressources suivantes ont été ajoutées :
1. Le service `cd-visibility-webhook` cible l'entrée Datadog et configure les en-têtes corrects pour la requête. L'en-tête `DD-API-KEY` fait référence à l'entrée `dd-api-key` ajoutée précédemment dans le secret `argocd-notifications-secret`.
2. Le modèle `cd-visibility-template` définit le contenu à envoyer dans la requête pour le service `cd-visibility-webhook`.
3. Le déclencheur `cd-visibility-trigger` définit à quels moments la notification doit être envoyée et fait référence au modèle `cd-visibility-template`.

Le champ `commit_metadata` est facultatif. Il permet d'enrichir le déploiement avec des informations Git. Il doit être supprimé (ainsi que la virgule de la ligne précédente) dans les cas suivants :
- Vous synchronisez déjà vos informations de référentiel avec Datadog (voir la rubrique [Synchroniser les métadonnées de référentiel avec Datadog][20]).
- Aucun SHA de commit n'a été défini pour la source de votre application Argo CD (par exemple, si vous utilisez des référentiels Helm).

Une fois que le service de notification, le déclencheur et le modèle ont été ajoutés à la ConfigMap, vous pouvez abonner n'importe laquelle de vos applications Argo CD à l'intégration. Modifiez les annotations de l'application Argo CD en utilisant l'IU Argo CD ou en modifiant la définition de l'application avec les annotations suivantes :

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

D'après l'extrait ci-dessus :
1. L'annotation « notifications » abonne l'application Argo CD à la configuration de notification créée ci-dessus. Consultez le [guide officiel d'Argo CD][12] (en anglais) pour obtenir plus de détails sur les abonnements des applications.
2. Vous pouvez utiliser l'annotation `dd_env` pour configurer l'environnement de l'application. Remplacez `YOUR_ENV` ci-dessus par l'environnement
   vers lequel cette application est déployée (par exemple, `staging` ou `prod`). Si vous ne définissez pas cette annotation,
   l'environnement est défini par défaut sur `none`.
3. Vous pouvez utiliser l'annotation `dd_service` pour configurer le service de l'application. Remplacez `YOUR_SERVICE` ci-dessus par le service
   que l'application Argo CD déploie (par exemple, `transaction-service`). Lorsque cette annotation est utilisée, le nom
   du service est ajouté à toutes les exécutions de déploiement générées par l'application. De plus, si votre service est
   enregistré dans le [Software Catalog][13], le nom de l'équipe est également ajouté à toutes les exécutions de déploiement. Si votre application
   Argo CD est configurée pour déployer plusieurs services, consultez la rubrique [Taguer une application Argo CD déployant plusieurs services] (#taguer-une-application-argo-cd-deployant-plusieurs-services).
4. Vous pouvez utiliser l'annotation `dd_customtags` pour ajouter, si vous le souhaitez, des tags personnalisés aux exécutions de déploiement générées pour cette application Argo CD.
   La valeur doit correspondre à une liste de tags séparés par des virgules, structurée sous la forme de paires `key:value`.

Après avoir abonné votre application Argo CD en ajoutant l'annotation ci-dessus, les nouveaux déploiements de l'application commenceront à s'afficher dans Datadog.

La rubrique [Configuration recommandée](#configuration-recommandee) ci-dessous décrit des actions recommandées pour améliorer les données de surveillance transmises dans CD Visibility.

## Configuration recommandée

### Modifier la durée afin de tenir compte de la santé des ressources
La durée transmise dans les événements de déploiement correspond à la durée de synchronisation dans Argo CD. Cependant, la durée de synchronisation représente généralement le temps qu'Argo CD consacre à la synchronisation de l'état des référentiels Git et des clusters Kubernetes. Cela signifie que cette durée ne tient pas compte de ce qui se produit après la synchronisation (par exemple, le lancement des ressources Kubernetes).

Pour modifier la durée transmise afin d'attendre jusqu'au lancement des ressources configurées et à l'obtention d'un état sain, ajoutez une nouvelle ressource no-op surveillée par votre application Argo CD, avec une annotation de [hook PostSync][19]. Le hook PostSync s'exécutera après que toutes les ressources ont atteint un état sain, et le processus de synchronisation d'Argo CD attendra d'obtenir le résultat du hook avant d'indiquer que l'état de l'application est sain.

Vous trouverez ci-dessous un exemple de job de hook PostSync qui exécute une simple commande `echo`.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: cdvisibility-postsync-job # Vérifie que la durée de synchronisation Argo CD inclut l'obtention d'un état sain pour les ressources
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

### Corréler des déploiements avec des pipelines de CI

Par défaut, les métadonnées Git transmises dans les événements de déploiement sont associées au référentiel qu'Argo CD surveille. La configuration suivante est néanmoins généralement appliquée :
- Deux référentiels sont utilisés : le référentiel d'application stocke le code source, tandis que le référentiel de configuration stocke les manifestes Kubernetes. Argo CD est ensuite configuré de façon à surveiller le référentiel de configuration, tel qu'indiqué sur la [page des meilleures pratiques d'Argo CD][17] (en anglais).
- Lorsqu'un changement est appliqué au référentiel d'application, un commit est automatisé afin de mettre à jour le référentiel de configuration (par exemple, en modifiant l'image actuelle d'une ressource Kubernetes).

Le diagramme suivant représente un exemple de ce type de configuration :

{{< img src="ci/diagram_argo-cd-deployment_240910.png" alt="Déclenchement de déploiements Argo CD avec git" style="width:100%;">}}

La [commande `datadog-ci deployment correlate-image`][14] permet de corréler une image avec un commit de référentiel d'application. Lors d'un déploiement Argo CD, les informations sur le commit de configuration incluses dans l'événement de déploiement sont remplacées par celles du commit du référentiel d'application correspondant, qui sont obtenues en analysant les images déployées, le cas échéant.

Pour activer cette corrélation, vous devez également ajouter l'annotation `dd_k8s_cluster` à votre application Argo CD, en spécifiant le nom du cluster Kubernetes vers lequel l'application est déployée. Le nom doit correspondre au nom indiqué dans la [solution Kubernetes Datadog][16]. Le nom de l'image doit également contenir le nom du service auquel elle se rapporte. Cela permet d'ignorer les images non pertinentes pour un déploiement.

Voici un exemple d'exécution de la commande lors de la génération de l'image ultérieurement déployée par Argo CD :
```yaml
 steps:
    - name: Correlate image with Datadog
      shell: bash
      run: |
        echo "Correlating image: ${{ inputs.image-name }} with Datadog"
        datadog-ci deployment correlate-image --image ${{ inputs.image-name }} --repository-url ${{ inputs.repository-url }} --commit-sha ${{ inputs.commit-sha }}
        echo "Successfully correlated ${{ inputs.image-name }} with Datadog"
```


Cette commande met en corrélation les images des ressources de déploiement. Lorsque Datadog reçoit un déploiement, si plusieurs images sont présentes et que certaines d'entre elles sont corrélées, Datadog considère l'image comportant le nom du service. La corrélation ne fonctionne que pour les ressources de déploiement.



#### Validation

Si la commande a été correctement exécutée, les déploiements contiennent les métadonnées Git du référentiel d'application au lieu de celles du référentiel de configuration. De plus, la vue des exécutions de déploiement contient à présent un nouvel onglet **Pipeline** représentant la trace du pipeline de CI pertinent.

## Taguer une application Argo CD déployant plusieurs services

Si votre application Argo CD déploie plusieurs services, Datadog peut automatiquement déduire les services déployés à partir d'une synchronisation d'application. Datadog procède à cette déduction en se basant sur les ressources Kubernetes qui ont été modifiées.

<div class="alert alert-danger">
La découverte automatique des services n'est pas prise en charge lorsque l'option <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#server-side-apply">Server-Side Apply</a> est utilisée.
</div>

Pour activer le tagging automatique des services, vous devez [surveiller votre infrastructure Kubernetes à l'aide de l'Agent Datadog][15], et vos ressources Kubernetes doivent comporter les étiquettes suivantes :
- `tags.datadoghq.com/service` (obligatoire) : spécifie le service Datadog de cette ressource. Pour en savoir plus, consultez la rubrique [Tagging de service unifié][18].
- `team` (facultatif) : spécifie l'équipe Datadog associée à la ressource. Si cette étiquette est omise, l'équipe est automatiquement récupérée à partir de l'étiquette service du [Software Catalog][13].

Seules les ressources Kubernetes avec les types suivants sont acceptées : `Deployment`, `Rollout`, `ReplicaSet`, `StatefulSet`, `Service`, `DaemonSet`, `Pod`, `Job` et `CronJob`.

Ajoutez les annotations suivantes à votre application Argo CD :
- `dd_multiservice`: `true`. Cette annotation spécifie si Datadog déduit automatiquement les services déployés dans une synchronisation en fonction des ressources Kubernetes modifiées.
- `dd_k8s_cluster` : définit le nom du cluster Kubernetes vers lequel l'application Argo CD est déployée. Le nom doit correspondre au nom indiqué dans la [solution Kubernetes Datadog][16].

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

## Visualiser les déploiements dans Datadog

Lorsqu'un déploiement est terminé, les pages [**Deployments**][6] et [**Executions**][7] affichent des données à son sujet. Pour en savoir plus, consultez la section [Explorer les déploiements CD Visibility][10].

## Dépannage

Si les notifications ne sont pas envoyées, examinez les logs du pod `argocd-notification-controller`. Le contrôleur crée une entrée de log lorsqu'il envoie une notification (par exemple, `Sending notification ...`) et lorsqu'il ne parvient pas à prévenir un destinataire (par exemple, `Failed to notify recipient ...`). Pour consulter d'autres scénarios de dépannage, référez-vous à la [documentation officielle d'Argo CD][8] (en anglais).

### Divergences de statut entre Argo CD et Datadog

Vous remarquerez peut-être des divergences de statut : un déploiement peut être considéré comme réussi dans Argo CD, mais avoir un statut d'erreur dans Datadog. Cela provient des différents critères d'évaluation appliqués par chaque plateforme pour identifier le succès d'un déploiement :
- **Argo CD** considère qu'une synchronisation est réussie tant qu'il est possible d'appliquer les changements aux manifestes Kubernetes, quel que soit l'état d'exécution des ressources.
- La solution **CD Visibility de Datadog** tient compte de davantage de données pour évaluer le résultat d'un déploiement. Si l'une des ressources modifiées pendant la synchronisation possède un état final dégradé (par exemple, en raison d'une mauvaise image ou d'un problème de configuration), le déploiement est considéré comme un échec ou comme une dégradation dans Datadog, même si Argo CD indique que le déploiement est réussi.

## Pour aller plus loin

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
[13]: /fr/tracing/software_catalog
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[15]: /fr/containers/kubernetes
[16]: https://app.datadoghq.com/orchestration/explorer
[17]: https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/#separating-config-vs-source-code-repositories
[18]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[19]: https://argo-cd.readthedocs.io/en/stable/user-guide/resource_hooks/#resource-hooks
[20]: /fr/continuous_delivery/features/code_changes_detection#synchronize-repository-metadata-to-datadog