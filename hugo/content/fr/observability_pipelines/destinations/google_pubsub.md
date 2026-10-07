---
description: Apprenez à publier des logs dans le système de messagerie Google Pub/Sub
  à l'aide de l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Google Pub/Sub
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Google Pub/Sub d'Observability Pipelines pour publier des logs dans le système de messagerie Google Pub/Sub, afin que les logs puissent être envoyés vers des services en aval, des lacs de données ou des applications personnalisées.

### Quand utiliser cette destination : {#when-to-use-this-destination}

Scénarios courants où vous pourriez utiliser cette destination :
- Pour les pipelines d'analyse : acheminez les logs en aval vers Google BigQuery, Data Lake ou des workflows d'apprentissage automatique personnalisés.
- Pour le traitement piloté par les événements : publiez les logs dans un sujet Pub/Sub afin que Google Cloud Functions, les fonctions Cloud Run et les tâches Dataflow puissent effectuer des actions en temps réel basées sur les données de log.

## Prérequis {#prerequisites}

Avant de configurer la destination, vous avez besoin des éléments suivants :

- Abonnement Pub/Sub : créez un sujet Pub/Sub et au moins un abonnement pour consommer les messages.
- Authentification : configurez une [méthode d'authentification Google Cloud standard][2]. Ces options incluent :
	- Une clé de compte de service (fichier JSON)
	- Une identité de charge de travail (Google Kubernetes Engine (GKE))
- Rôles IAM :
	- `roles/pubsub.publisher` est requis pour la publication d'événements.
	- `roles/pubsub.viewer` est recommandé pour les contrôles d'état.
		- Si le rôle est manquant, l'erreur `Healthcheck endpoint forbidden` est enregistrée et le Worker continue comme d'habitude.
	- Consultez [Rôles Pub/Sub disponibles][3] pour plus d'informations.

### Configurez un compte de service pour le Worker {#set-up-a-service-account-for-the-worker}

Un compte de service dans Google Cloud est un type de compte utilisé uniquement par des applications ou des services.
- Il possède sa propre identité et ses propres identifiants (un fichier de clé JSON).
- Vous lui attribuez des rôles IAM afin qu'il puisse accéder à des ressources spécifiques.
- Dans ce cas, l'Observability Pipelines Worker utilise un compte de service pour s'authentifier et envoyer des logs à Pub/Sub en votre nom.

Pour vous authentifier à l'aide d'un compte de service :

1. Dans la console Google Cloud, accédez à **IAM et administration** > **[Comptes de service][4]**.
1. Cliquez sur **+ Créer un compte de service**.
1. Saisissez un nom et cliquez sur **Créer et continuer**.
1. Attribuez des rôles :
	- **Éditeur Pub/Sub**
	- **Lecteur Pub/Sub**
1. Cliquez sur **Terminé**.

#### Méthodes d'authentification {#authentication-methods}

Une fois le compte de service créé avec les rôles appropriés, configurez l'une des méthodes d'authentification suivantes :

##### Option A : méthode Workload Identity (pour GKE, recommandée) {#option-a-workload-identity-method-for-gke-recommended}

1. Associez le compte de service à un compte de service Kubernetes (KSA).
1. Autorisez l'usurpation d'identité du compte de service par ce KSA.
1. Annotez le KSA afin que GKE sache quel compte de service utiliser.
1. L'authentification provient alors du serveur de métadonnées de GCP.

##### Option B : attachez le GSA directement à une VM (pour Google Compute Engine) {#option-b-attach-the-gsa-directly-to-a-vm-for-google-compute-engine}

Utilisez cette méthode d'authentification si vous exécutez l'Observability Pipelines Worker sur une VM Google Compute Engine (GCE).
- Lorsque vous créez ou modifiez la VM, spécifiez le compte de service Google sous **Identité et accès aux API** > **Compte de service**.

##### Option C : Exécuter le service en tant que GSA (pour Cloud Run ou Cloud Functions) {#option-c-run-the-service-as-the-gsa-for-cloud-run-or-cloud-functions}

Utilisez cette méthode d'authentification si vous déployez le Worker en tant que service Cloud Run ou Cloud Function.
- Dans les paramètres de déploiement de Cloud Run ou Cloud Functions, définissez le **Compte de service d'exécution** sur le compte de service Google que vous avez créé.

##### Option D : Méthode de clé JSON (tout environnement sans liaisons d'identité) {#option-d-json-key-method-any-environment-without-identity-bindings}

1. Ouvrez le nouveau compte de service et accédez à **Clés** > **Ajouter une clé** > **Créer une nouvelle clé**.
1. Choisissez le format JSON.
1. Enregistrez le fichier JSON téléchargé dans un emplacement sécurisé.
1. Après avoir installé le Worker, copiez ou montez le fichier JSON dans `DD_OP_DATA_DIR/config/`.
Vous référencez ce fichier dans le champ {{< ui >}}Credentials path{{< /ui >}} lorsque vous [configurez la destination](#set-up-the-destination) dans l'interface utilisateur des pipelines.

## Configuration {#setup}

Configurez la destination Google Pub/Sub lorsque vous [configurez un pipeline][9]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][1], en utilisant l'[API][10] ou avec [Terraform][11]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination Google Pub/Sub dans l'interface utilisateur du pipeline :

1. Saisissez le nom du projet de destination.
	- Il s'agit du projet GCP où se trouve votre sujet Pub/Sub.
1. Saisissez le sujet.
	- Il s'agit du sujet Pub/Sub vers lequel publier les logs.
1. Dans le menu déroulant {{< ui >}}Encoding{{< /ui >}}, sélectionnez si vous souhaitez encoder la sortie de votre pipeline en {{< ui >}}JSON{{< /ui >}} ou {{< ui >}}Raw message{{< /ui >}}.
	- {{< ui >}}JSON{{< /ui >}} : Les journaux sont structurés au format JSON (recommandé si les outils en aval ont besoin de données structurées).
	- {{< ui >}}Raw{{< /ui >}} : Les journaux sont envoyés sous forme de chaînes brutes (préserve le format d'origine).
1. Si vous disposez d'un fichier JSON d'identifiants, saisissez le chemin d'accès à votre fichier JSON d'identifiants.
	- Si vous utilisez un fichier JSON de compte de service : saisissez le chemin `DD_OP_DATA_DIR/config/<your-service-account>.json`.
	- Ou définissez la variable d'environnement `GOOGLE_APPLICATION_CREDENTIALS`.
	- Les identifiants sont gérés automatiquement si vous utilisez [l'identité de charge de travail][7] sur GKE.

### Paramètres optionnels {#optional-settings}

#### Activer TLS {#enable-tls}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant du mot de passe de la clé TLS. Ne <b>saisissez pas</b> la valeur réelle.</div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

#### Mise en mémoire tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

{{< img src="observability_pipelines/destinations/google_pubsub_settings.png" alt="La destination Google Pub/Sub avec des exemples de valeurs" style="width:30%;" >}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- (Facultatif) Identifiant de l'URL d'endpoint Google Pub/Sub :
	- Par défaut, le Worker envoie les données vers l'endpoint global : `https://pubsub.googleapis.com`.
	- Si votre sujet Pub/Sub est spécifique à une région, configurez l'URL d'endpoint Google Pub/Sub alternative avec l'endpoint régional. Consultez [À propos des points de terminaison Pub/Sub][1] pour plus d'informations. Saisissez l'URL d'endpoint configurée dans votre gestionnaire de secrets.
	- L'identifiant par défaut est `DESTINATION_GCP_PUBSUB_ENDPOINT_URL`.
- Identifiant du mot de passe TLS Google Pub/Sub (lorsque TLS est activé) :
	- L'identifiant par défaut est `DESTINATION_GCP_PUBSUB_KEY_PASS`.

[1]: https://docs.cloud.google.com/pubsub/docs/reference/service_apis_overview#pubsub_endpoints

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

#### Points de terminaison Pub/Sub alternatifs facultatifs {#optional-alternative-pubsub-endpoints}

{{< img src="observability_pipelines/destinations/google_pubsub_env_var.png" alt="La page d'installation affichant le champ de variable d'environnement Google Pub/Sub" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

## Dépannage {#troubleshooting}

Problèmes courants et solutions :
- Vérification de l'état interdite
	- Vérifiez le rôle IAM `roles/pubsub.viewer`.
- Autorisation refusée
	- Assurez-vous que le compte de service dispose de `roles/pubsub.publisher`.
- Erreurs d'authentification
	- Vérifiez le chemin d'accès au JSON des identifiants ou la configuration de l'identité de charge de travail GKE.
- Événements abandonnés
	- Vérifiez les métriques `pipelines.component_discarded_events_total` et `pipelines.buffer_discarded_events_total`.
	- Augmentez la taille du tampon ou corrigez les filtres mal configurés si nécessaire pour résoudre le problème.
- Latence élevée
	- Réduisez la taille du tampon et le délai d'attente, ou mettez à l'échelle vos Workers.
- Aucun log n'arrive
	- Dans la configuration de votre destination Google Pub/Sub, vérifiez le nom du sujet, le projet et l'endpoint Pub/Sub (global ou régional).

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][8] et les [métriques de tampon de destination][12] émises par toutes les destinations, consultez la documentation sur les [métriques d'utilisation des pipelines][13]. Pour filtrer ou regrouper par métriques de destination Google Pub/Sub, utilisez le tag `component_type:gcp_pubsub`.

### Traitement par lots d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Lot d'événements des destinations][6] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'attente (secondes)   |
|----------------|-------------------|---------------------|
| 1 000          | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://cloud.google.com/docs/authentication#auth-flowchart
[3]: https://cloud.google.com/pubsub/docs/access-control#roles
[4]: https://console.cloud.google.com/iam-admin/serviceaccounts
[6]: /fr/observability_pipelines/destinations/#event-batching
[7]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[8]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[9]: /fr/observability_pipelines/configuration/set_up_pipelines/
[10]: /fr/api/latest/observability-pipelines/
[11]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[12]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[13]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/