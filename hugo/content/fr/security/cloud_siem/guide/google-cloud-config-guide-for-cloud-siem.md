---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentation
  text: Explorer les règles de détection par défaut de Cloud SIEM
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentation
  text: En savoir plus sur le Security Signals Explorer
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: Documentation
  text: Créer des règles de détection personnalisées
- link: /integrations/google_cloud_platform/#log-collection
  tag: Documentation
  text: Recueillir des logs à partir de Google Cloud Platform
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: Blog
  text: Évaluez, optimisez et sécurisez votre pile d'IA Google Cloud avec Datadog.
- link: https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/
  tag: Blog
  text: Visualiser l'activité de votre environnement Google Cloud avec l'outil Investigator
    de Datadog Cloud SIEM
title: Guide de configuration de Google Cloud pour Cloud SIEM
---
## Présentation {#overview}

[Datadog Cloud SIEM][1] applique des règles de détection à tous les logs traités dans Datadog pour détecter les menaces, telles qu'une attaque ciblée, une communication entre vos systèmes et une adresse IP répertoriée dans les flux de renseignement sur les menaces, ou une modification non sécurisée d'une ressource. Les menaces sont présentées sous forme de Security Signals dans Security Signals Explorer pour le triage.

Utilisez [Google Cloud Dataflow][2] et le [modèle Datadog][3] pour transférer les logs de vos services Google Cloud vers Datadog. Ce guide détaille les étapes à suivre afin de commencer à détecter les menaces à l'aide de vos logs d'audit Google Cloud :

1. [Activez les Data Access audit logs](#enable-data-access-audit-logs)
1. [Créez un sujet Pub/Sub Google Cloud et un abonnement Pull](#create-a-google-cloud-publishsubscription-pubsub-system) pour recevoir les logs d'un récepteur de logs configuré
1. [Créez un compte de service personnalisé pour les workers Dataflow](#create-a-custom-dataflow-worker-service-account)
1. [Créez un récepteur de logs pour publier les logs dans Pub/Sub](#create-a-log-sink-to-publish-logs-to-the-pubsub)
1. [Créez et exécutez le job Dataflow](#create-and-run-the-dataflow-job)
1. [Utilisez Cloud SIEM pour trier les Security Signals](#use-cloud-siem-to-triage-security-signals)

<div class="alert alert-warning">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">La collecte des logs Google Cloud avec un abonnement Pub/Sub Push</a> est progressivement abandonnée pour les raisons suivantes :

- Si vous disposez d'un VPC Google Cloud, l'abonnement Push ne peut pas accéder aux endpoints en dehors du VPC.
- L'abonnement Push ne permet ni la compression ni le regroupement des événements en lots, et ne convient donc qu'à un faible volume de logs.

La documentation relative à l'abonnement <strong>Push</strong> n'est maintenue que pour dépanner ou modifier les configurations héritées. Utilisez plutôt un abonnement <strong>Pull</strong> avec le modèle Dataflow de Datadog pour transférer vos logs Google Cloud vers Datadog.
</div>

## Activez les Data Access audit logs {#enable-data-access-audit-logs}

1. Accédez à IAM & Admin Console > [Audit Log][4].
1. Sélectionnez les services pour lesquels vous souhaitez activer les logs d'accès aux données.
1. Dans le panneau **Log Types**, activez {{< ui >}}Admin Read{{< /ui >}}, {{< ui >}}Data Read{{< /ui >}} et {{< ui >}}Data Write{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

### Modifiez la configuration par défaut pour les nouveaux services {#change-default-configuration-for-new-services}

Si un nouveau service Google Cloud est ajouté, il hérite de votre [configuration d'audit par défaut][5].

Pour veiller à ce que les logs d'audit d'accès aux données soient capturés pour les nouveaux services Google Cloud, modifiez votre configuration d'audit par défaut :

1. Accédez à **IAM & Admin Console > [Audit Log][4]**.
1. Activez {{< ui >}}Admin Read{{< /ui >}}, {{< ui >}}Data Read{{< /ui >}} et {{< ui >}}Data Write{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Créez un système de publication/abonnement (Pub/Sub) Google Cloud {#create-a-google-cloud-publishsubscription-pubsub-system}

1. Accédez à Pub/Sub > [Topics][5].
1. Cliquez sur {{< ui >}}Create Topic{{< /ui >}}.
1. Saisissez un nom de rubrique descriptif. Par exemple, `export-audit-logs-to-datadog`.
1. Laissez **Add a default subscription** sélectionné, ce qui crée un abonnement avec des valeurs de configuration par défaut. Le nom de l'abonnement est généré automatiquement sous la forme de votre nom de rubrique avec « -sub » ajouté à la fin. Ce nom d'abonnement est utilisé ultérieurement lors de la création de votre [job Dataflow](#create-and-run-the-dataflow-job).
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

### Créez une rubrique et un abonnement supplémentaires pour le paramètre outputDeadletterTopic {#create-an-additional-topic-and-subscription-for-outputdeadlettertopic-parameter}
Créez une rubrique et un abonnement par défaut supplémentaires pour gérer les messages de log rejetés par la Datadog API. Ce topic est utilisé ultérieurement lors de la configuration du [job Dataflow](#create-and-run-the-dataflow-job).

1. Revenez à Pub/Sub > [Topics][5]
1. Cliquez sur {{< ui >}}Create Topic{{< /ui >}}.
1. Saisissez un nom de rubrique descriptif.
1. Laissez **Add a default subscription** sélectionné.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

**Avertissement** : les systèmes Pub/Sub sont soumis aux [quotas et limitations de Google Cloud][6]. Si le nombre de logs dont vous disposez est supérieur à ces limitations, Datadog vous recommande de répartir vos logs sur plusieurs rubriques. Consultez [Surveiller le transfert de logs][7] pour savoir comment configurer un monitor afin d'être averti lorsque vous approchez de ces limites.

### Créez un secret dans Secret Manager {#create-a-secret-in-secret-manager}

Datadog recommande de créer un secret dans [Secret Manager][8] avec la valeur valide de votre clé d'API Datadog. Ce secret est utilisé lorsque vous configurez le [job Dataflow](#create-and-run-the-dataflow-job) ultérieurement.

1. Accédez à Security > [Secret Manager][8].
1. Cliquez sur {{< ui >}}Create Secret{{< /ui >}}.
1. Saisissez un nom pour le secret.
1. Copiez votre [clé d'API Datadog][9] et collez-la dans la section **Secret value**.
1. Optionnellement, définissez les autres configurations en fonction de votre cas d'utilisation.
1. Cliquez sur {{< ui >}}Create Secret{{< /ui >}}.

## Créez un compte de service personnalisé pour les workers Dataflow {#create-a-custom-dataflow-worker-service-account}

Par défaut, les workers du pipeline Dataflow utilisent le [compte de service Compute Engine par défaut][10] de votre projet, auquel sont accordées des autorisations sur toutes les ressources du projet. Si vous transférez des logs depuis un environnement de production, créez un compte de service de worker personnalisé avec uniquement les rôles et autorisations nécessaires, et attribuez ce compte de service à vos workers de pipeline Dataflow.

**Remarque** : Si vous ne créez pas de compte de service personnalisé pour les workers de pipeline Dataflow, assurez-vous que le compte de service Compute Engine par défaut dispose des [autorisations requises](#required-permissions) ci-dessous.

1. Accédez à la page [Service Account][11] de Google Cloud.
1. Sélectionnez votre projet.
1. Cliquez sur {{< ui >}}Create Service Account{{< /ui >}}.
1. Saisissez un nom descriptif pour le compte de service.
1. Cliquez sur {{< ui >}}Create and Continue{{< /ui >}}.
1. Ajoutez les rôles suivants :
##### Autorisations requises
    | Rôle | Chemin | Description |
    | -------------  | ----------- | ----------- |
    | [Dataflow Admin][12] | `roles/dataflow.admin` |  Autoriser ce compte de service à effectuer des tâches administratives Dataflow
    | [Dataflow Worker][13] | `roles/dataflow.worker` |  Autoriser ce compte de service à effectuer des opérations sur les jobs Dataflow
    | [Pub/Sub Viewer][14] | `roles/pubsub.viewer` | Autoriser ce compte de service à consulter les messages de l'abonnement Pub/Sub contenant vos logs Google Cloud
    | [Pub/Sub Subscriber][15] | `roles/pubsub.subscriber` | Autoriser ce compte de service à consommer les messages de l'abonnement Pub/Sub contenant vos logs Google Cloud
    | [Pub/Sub Publisher][16] | `roles/pubsub.publisher` | Autoriser ce compte de service à publier les messages ayant échoué dans un abonnement distinct, ce qui permet d'analyser ou de renvoyer les logs
    | [Secret Manager Secret Accessor][17] | `roles/secretmanager.secretAccessor` | Autoriser ce compte de service à accéder à la clé d'API Datadog dans Secret Manager
    | [Storage Object Admin][18] | `roles/storage.objectAdmin` | Autoriser ce compte de service à lire et à écrire dans le bucket Cloud Storage indiqué pour les fichiers de préparation |
7. Cliquez sur {{< ui >}}Continue{{< /ui >}}.
8. Cliquez sur {{< ui >}}Done{{< /ui >}}.

##  Créez un récepteur de logs pour publier les logs dans Pub/Sub {#create-a-log-sink-to-publish-logs-to-the-pubsub}

1. Accédez à [Logs Explorer][19] dans Google Cloud.
1. Sélectionnez {{< ui >}}Log Router{{< /ui >}} dans le menu de gauche.
1. Cliquez sur {{< ui >}}Create Sink{{< /ui >}}.
1. Saisissez un nom descriptif pour le récepteur.
1. Cliquez sur {{< ui >}}Next{{< /ui >}}.
1. Dans le menu déroulant **Select Sink Service**, sélectionnez {{< ui >}}Cloud Pub/Sub topic{{< /ui >}}.
    **Remarque** : Le sujet Cloud Pub/Sub peut se trouver dans un projet différent.
1. Dans **Select a Cloud Pub/Sub topic**, sélectionnez le topic Pub/Sub créé précédemment.
1. Cliquez sur {{< ui >}}Next{{< /ui >}}.
1. Saisissez un filtre d'inclusion pour les logs que vous souhaitez envoyer à Datadog.
1. Cliquez sur {{< ui >}}Next{{< /ui >}}.
1. Vous pouvez éventuellement saisir un filtre d'exclusion pour exclure les logs que vous ne souhaitez pas envoyer à Datadog.
1. Cliquez sur {{< ui >}}Create Sink{{< /ui >}}.

**Remarque** : Vous pouvez créer plusieurs exportations depuis Google Cloud Logging vers le même sujet Pub/Sub avec différents récepteurs.

## Créez et exécutez le job Dataflow {#create-and-run-the-dataflow-job}

1. Accédez à Google Cloud [Dataflow][20].
1. Cliquez sur {{< ui >}}Create job from template{{< /ui >}}.
1. Saisissez un nom pour le job.
1. Sélectionnez un endpoint régional.
1. Dans le menu déroulant **Dataflow template**, sélectionnez {{< ui >}}Pub/Sub to Datadog{{< /ui >}}.
1. Dans la section **Required Parameters** :
   1. Dans le menu déroulant **Pub/Sub input subscription**, sélectionnez l'abonnement par défaut créé précédemment lorsque vous avez créé un nouveau [Pub/Sub system](#create-a-google-cloud-publishsubscription-pubsub-system).
   1. Saisissez ce qui suit dans le champ **Datadog Logs API URL** :
      ```
      https://{{< region-param key="http_endpoint" code="true" >}}
      ```
      **Note**: Ensure that the Datadog site selector on the right of this documentation page is set to your Datadog site before copying the URL above.
   1. Dans le champ **Output deadletter Pub/Sub topic**, sélectionnez le [sujet supplémentaire](#create-an-additional-topic-and-subscription-for-outputdeadlettertopic) que vous avez créé précédemment pour recevoir les messages rejetés par la Datadog API.
   1. Spécifiez un chemin pour les fichiers temporaires dans votre bucket de stockage dans le champ **Temporary location**.
1. Si vous avez [créé plus tôt un secret dans Secret Manager](#create-a-secret-in-secret-manager) pour la valeur de votre clé d'API Datadog :
   1. Cliquez sur {{< ui >}}Optional Parameters{{< /ui >}} pour voir les champs supplémentaires.
   1. Saisissez le nom de la ressource du secret dans le champ **Google Cloud Secret Manager ID**.<br />
      Pour obtenir le nom de la ressource, accédez à votre secret dans [Secret Manager][8]. Cliquez sur votre secret. Cliquez sur les trois points sous **Action** et sélectionnez {{< ui >}}Copy resource name{{< /ui >}}.
   1. Saisissez `SECRET_MANAGER` dans le champ **Source of the API key passed**.
1. Si vous n'utilisez pas de secret pour la valeur de votre clé d'API Datadog :
    - **Recommandé** :
        - Définissez `Source of API key passed` sur `KMS`.
        - Définissez `Google Cloud KMS  key for the API key` sur votre ID de clé Cloud KMS.
        - Définissez `Logs API Key` sur la clé d'API chiffrée.
    - **Non recommandé** : `Source of API key passed` défini sur `PLAINTEXT` avec `Logs API Key` défini sur la clé d'API en texte clair.
1. Consultez les [paramètres de modèle][21] dans le modèle Dataflow pour plus de détails sur les autres options disponibles.
1. Si vous avez créé un compte de service de nœud de calcul personnalisé, sélectionnez-le dans le menu déroulant **Service account email**.
1. Cliquez sur {{< ui >}}Run Job{{< /ui >}}.

Consultez les nouveaux événements de journalisation transmis au sujet Cloud Pub/Sub dans le [Datadog Log Explorer][22].

## Utilisez Cloud SIEM pour trier les Security Signals {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM applique des règles de détection prêtes à l'emploi à tous les logs traités, y compris les logs d'audit Google Cloud que vous venez de configurer. Lorsqu'une règle de détection détecte une menace, un Security Signal est généré et peut être consulté dans Security Signals Explorer.

- Accédez à [Cloud SIEM Signals Explorer][23] pour afficher et analyser les menaces. Consultez Security Signals Explorer pour plus de détails.
- Vous pouvez également utiliser le [Google Cloud Audit Log dashboard][24] pour enquêter sur les activités anormales.
- Consultez les [règles de détection prêtes à l'emploi][25] qui sont appliquées à vos logs.
- Créez de [nouvelles règles][26] pour détecter les menaces qui correspondent à votre cas d'utilisation spécifique.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/
[2]: https://cloud.google.com/dataflow?hl=en
[3]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[4]: https://console.cloud.google.com/iam-admin/audit
[5]: https://console.cloud.google.com/cloudpubsub/topic
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: /fr/logs/guide/google-cloud-log-forwarding/#monitor-the-cloud-pubsub-log-forwarding
[8]: https://console.cloud.google.com/security/secret-manager
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[11]: https://console.cloud.google.com/iam-admin/serviceaccounts
[12]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[13]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[14]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[15]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[16]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[17]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[18]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[19]: https://console.cloud.google.com/logs/
[20]: https://console.cloud.google.com/dataflow/
[21]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[22]: https://app.datadoghq.com/logs/
[23]: https://app.datadoghq.com/security/siem/signals?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc
[24]: https://app.datadoghq.com/dash/integration/30509/google-cloud-audit-log
[25]: /fr/security/default_rules/#cat-cloud-siem
[26]: /fr/security/detection_rules/