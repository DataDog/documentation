---
description: Déployez un exécuteur d'actions privé dans l'Agent Datadog avec l'Opérateur
  Datadog, puis exécutez votre première action en utilisant les politiques d'exécution
  par défaut de Datadog.
further_reading:
- link: actions/private_actions
  tag: Documentation
  text: Présentation des Private Actions
- link: actions/private_actions/reference
  tag: Documentation
  text: Référence de l'exécuteur d'actions privées
title: Débuter avec Private Actions
---
## Présentation {#overview}

Suivez ce guide pour déployer un exécuteur d'actions privé dans l'Agent Datadog avec l'Opérateur Datadog, puis exécutez une action en lecture seule que Datadog autorise automatiquement pour vous.

C'est le chemin recommandé pour commencer. Il utilise la configuration suivante :

- **Exécutez l'exécuteur dans l'Agent Datadog**, plutôt qu'en tant que processus host autonome.
- **Installez avec l'Opérateur Datadog** sur Kubernetes.
- **Inscrivez-vous avec une clé d'API**, afin que l'exécuteur soit autorisé avec des politiques d'exécution.
- **Appuyez-vous sur les politiques d'exécution par défaut de Datadog**, que Datadog provisionne pour vous, afin d'autoriser des actions Kubernetes en lecture seule ainsi que des Remote Action en lecture seule sur vos exécuteurs sans aucune configuration.

À la fin de ce guide, vous disposerez d'un exécuteur inscrit et d'une action en lecture seule fonctionnelle.

## Prérequis {#prerequisites}

- Un cluster Kubernetes géré par le [Datadog Operator][1] v1.28.0 ou version ultérieure, exécutant l'Agent Datadog 7.81.0 ou version ultérieure.
- [Remote Configuration][2] activée pour votre organisation.
- Autorisation de créer des clés d'API dans les [Paramètres de l'organisation][3].
- Accès réseau à Datadog sur `https://{{< region-param key=dd_site >}}`.

## Étape 1 : Créer une clé d'API avec la fonctionnalité Private Action Runner {#step-1-create-an-api-key-with-the-private-action-runner-capability}

Un exécuteur sans propriétaire s'inscrit avec une clé d'API dotée de la fonctionnalité Private Action Runner. Il n'a pas besoin de clé d'application.

1. Dans Datadog, accédez à **[Paramètres de l'organisation > Clés d'API][3]** et créez ou sélectionnez une clé d'API.
1. Sur la clé, à côté de **PAR** (la fonctionnalité Private Action Runner), cliquez sur **Activer**.
   {{< img src="actions/private_actions/getting_started/api_key_par_capability.png" alt="Un panneau de détails de clé d'API avec la fonctionnalité PAR activée, à côté du paramètre Configuration à distance" style="width:60%;" >}}
1. Stockez la valeur de la clé dans un secret Kubernetes que l'Agent lit :
   ```bash
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```

## Étape 2 : Déployer l'exécuteur avec l'Opérateur Datadog {#step-2-deploy-the-runner-with-the-datadog-operator}

Activez l'exécuteur sur votre ressource `DatadogAgent` via les annotations de l'Opérateur. L'exemple suivant active l'exécuteur à la fois dans le node Agent et le Cluster Agent, l'inscrit comme sans propriétaire avec votre clé d'API et autorise un petit ensemble d'actions en lecture seule.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/private-action-runner-enabled: "true"
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.remoteaction.*"
          - "com.datadoghq.script.*"
    cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
    cluster-agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.script.*"
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    site: {{< region-param key=dd_site >}}
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
```

Appliquez le manifeste :

```bash
kubectl apply -f datadog-agent.yaml
```

Comme `api_key_only_enrollment` est défini et que vous ne fournissez qu'une clé d'API, chaque exécuteur s'inscrit automatiquement comme **sans propriétaire** au démarrage, ce qui signifie qu'il est autorisé avec des politiques d'exécution. Ce manifeste est la configuration minimale de l'Opérateur pour ce guide ; pour la configuration complète de l'exécuteur, les autres méthodes d'installation (host, Windows, Helm) et la référence complète des champs, consultez [Set up a private action runner in the Datadog Agent][4]. Pour en savoir plus sur l'inscription, consultez [Enrollment and ownership][5].

Les entrées `actions_allowlist` dans l'exemple utilisent des caractères génériques de bundle pour autoriser les actions utilisées par ce guide. Pour utiliser plutôt les actions en lecture seule intégrées de l'exécuteur, laissez `actions_allowlist` vide. L'exécuteur active alors son ensemble d'actions par défaut, qui comprend des Remote Action réseau et shell en lecture seule, ainsi qu'un ensemble d'actions Kubernetes en lecture seule sur le Cluster Agent.

## Étape 3 : Confirmez que l'exécuteur est inscrit {#step-3-confirm-the-runner-is-enrolled}

Dans Datadog, accédez à [Private Action Runners][6]. Vérifiez que votre nouvel exécuteur apparaît dans la liste.

Vous pouvez également consulter les logs du Cluster Agent pour confirmer que l'exécuteur a démarré :

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

Pour les logs du node Agent et d'autres plateformes, consultez [Debugging with logs][12].

Datadog provisionne des **politiques d'exécution par défaut** dans votre organisation. Ces politiques utilisent un sélecteur de cible `*`, elles couvrent donc automatiquement chaque Agent qui exécute un exécuteur d'actions privé, y compris celui que vous avez déployé. C'est ce qui autorise les actions en lecture seule sans configuration de politique d'exécution de votre part. Consultez [Datadog Default Execution Policies][7].

## Étape 4 : Exécutez votre première action {#step-4-run-your-first-action}

Exécutez une action Kubernetes en lecture seule sur votre nouvel exécuteur depuis l'Action Catalog. L'Action Catalog exécute une action de la même manière qu'une étape de workflow ; vous choisissez un Agent cible, fournissez des entrées et exécutez l'action.

1. Dans le Datadog Action Catalog, ouvrez [List Pods][8] (`com.datadoghq.kubernetes.core.listPod`).
1. Sous **Configurer la connexion**, sélectionnez l'onglet **Cible** (au lieu de **Connexion**).
1. Définissez **Orch Cluster ID** sur l'ID du cluster d'orchestration du cluster exécutant votre runner. Vous pouvez trouver l'ID du cluster d'orchestration parmi les tags de votre cluster dans [Fleet Automation's Fleet View][11].
1. Sous **Configure inputs**, saisissez le **Namespace** à partir duquel lister les pods. Vous pouvez également définir **Sélecteur de champ**, **Sélecteur d'étiquette** ou **Limite**.
1. Cliquez sur **Run** . Les résultats apparaissent dans le panneau.
  {{< img src="actions/private_actions/getting_started/run_action_action_catalog.png" alt="L'action List Pods dans l'Action Catalog, avec la connexion définie sur Cible et un identifiant de cluster Orch renseigné." style="width:80%;" >}}

L'action s'exécute sur votre runner et renvoie son résultat. Pour exécuter la même action à partir d'un workflow, ajoutez une étape d'action privée dans Workflow Automation et choisissez **Target** dans son sélecteur de connexion. Consultez [Use an Execution Policy in a workflow][9].

## Étapes suivantes {#next-steps}

Ce guide utilise les politiques d'exécution par défaut de Datadog, qui autorisent uniquement les actions en lecture seule. Pour exécuter des actions en écriture, ou pour limiter l'accès à des équipes ou des environnements spécifiques, créez votre propre politique d'exécution. Consultez [Execution Policies][10].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/containers/datadog_operator/
[2]: /fr/remote_configuration
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/actions/private_actions/set_up_agent_based/
[5]: /fr/actions/private_actions/enroll_runner/
[6]: https://app.datadoghq.com/actions/private-action-runners
[7]: /fr/actions/private_actions/execution_policies/#default-execution-policies
[8]: https://app.datadoghq.com/actions/action-catalog#com.datadoghq.kubernetes/com.datadoghq.kubernetes.core/com.datadoghq.kubernetes.core.listPod
[9]: /fr/actions/private_actions/execution_policies/#use-an-execution-policy-in-a-workflow
[10]: /fr/actions/private_actions/execution_policies/
[11]: https://app.datadoghq.com/fleet?view_by=clusters
[12]: /fr/actions/private_actions/set_up_agent_based/#debugging-with-logs