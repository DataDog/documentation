---
aliases:
- /fr/bits_ai/getting_started/
- /fr/bits_ai/chat_with_bits_ai
- /fr/bits_ai/bits_assistant/
- /fr/tracing/guide/latency_investigator/
description: Utilisez Bits Chat dans Datadog pour explorer et agir sur vos données
  d'observabilité en utilisant un langage naturel.
further_reading:
- link: bits_ai/
  tag: Documentation
  text: Aperçu de Bits AI
- link: /incident_response/incident_management/investigate/incident_ai
  tag: Documentation
  text: Coordonnez les incidents avec Incident AI
- link: /cloud_cost_management/cloud_cost_skill/
  tag: Documentation
  text: Compétence Cloud Cost dans Bits Chat
- link: /account_management/billing/ai_credits/
  tag: Documentation
  text: Crédits AI
title: Bits Chat
---
## Aperçu {#overview}
Bits Chat vous aide à rechercher et à agir dans Datadog en utilisant un langage naturel. Bits Chat est disponible sur l'application web, l'application mobile et Slack.

Posez des questions à Bits Chat dans ces catégories :

### Enquêtez sur les problèmes et remédiez-les {#investigate-issues-and-remediate}
- `Summarize high severity incidents that have occurred in the last day`
- `What's causing 400 errors on the checkout endpoint in the last hour?`
- `Why is the error rate spiking on the web-store service?`
- `What is the root cause of this error? How did it propagate and what is the impact on users?`
- `What could cause 500 errors on this API endpoint?`

### Explorer et analyser la télémétrie {#explore-and-analyze-telemetry}
- `Which services have the most errors right now?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `What's the success rate for my top API endpoints over the past week?`
- `Show me error rates for the checkout service over the last 24 hours`
- `Are there any incidents related to Kafka lag?`

### Découvrez les concepts de Datadog et comment les utiliser {#learn-datadog-concepts-and-how-to}
- `How do I configure log collection for the Datadog Agent?`
- `What is the difference between a metric monitor and an anomaly monitor?`
- `What permission do I need to create a new connection?`
- `Can I set the timepicker on a notebook to read-only?`

### Configurez et optimisez l'observabilité {#set-up-and-optimize-observability}
- `Do we already have monitors for high latency on the payments service?`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `How can I put a team tag on this monitor?`
- `Add a timeseries widget for request count over time to this notebook`

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Interface Bits Chat en pleine page avec des tâches suggérées" style="width:100%;">}}

### Permissions {#permissions}

#### Accès à Bits Chat {#access-to-bits-chat}

Pour utiliser Bits Chat, votre rôle doit avoir la permission **Accès à Bits Chat**. Cette permission est activée par défaut pour les trois rôles standard Datadog : Datadog Admin, Datadog Standard et Datadog Read Only.

Pour gérer cette permission pour des rôles personnalisés, allez dans **Organization Settings** > **Roles**, sélectionnez un rôle et activez **Bits Chat Access** sous **General Permissions**.

#### Accès aux données via Bits Chat {#data-access-through-bits-chat}

Bits Chat utilise votre rôle Datadog pour récupérer des données ; il ne peut accéder qu'aux ressources auxquelles vous êtes autorisé à consulter ou modifier. Par exemple, si votre rôle limite l'accès à un ensemble spécifique d'indexes de logs, Bits Chat ne peut interroger que les logs de ces indexes. De même, si vous n'avez pas la permission de modifier un tableau de bord, Bits Chat ne peut pas modifier ce tableau de bord en votre nom.

### Compétences {#skills}
Bits Chat dispose d'un éventail de compétences spécialisées pour des tâches dans Datadog. Les compétences les plus couramment utilisées sont décrites ci-dessous.

#### Tableaux de bord {#dashboards}
Créez des [tableaux de bord][5] et des widgets à partir de descriptions en langage naturel.

Exemples de requêtes :
- `Show me a dashboard of high-impact alerts from the past week and which services they affected`
- `Add a widget about CPU usage in the payments service`

#### Cahiers {#notebooks}
Créez des [cahiers][6] d'investigation et améliorez ceux existants avec des résumés et des analyses.

Exemples de requêtes :
- `Create an investigation for the recent spike of errors in the checkout service`
- `Add an executive summary for this cost spike report`

#### APM {#apm}

##### Analyse des traces {#trace-analysis}
Examinez une [trace][3] individuelle pour diagnostiquer ce qui a échoué, où et pourquoi.

Exemples de requêtes :
- `Why did this request fail?`
- `Summarize this trace and identify the root cause of the error`

##### Investigations sur la latence {#latency-investigations}
Examinez la latence d'un service pour identifier les ressources de goulot d'étranglement et ce qui a changé dans ses traces lentes.

Exemples de requêtes :
- `What caused the latency spike for this service?`
- `What's the latency bottleneck for this service?`

#### Cloud Cost Management {#cloud-cost-management}
Examinez les changements de [Cloud Cost][4] et identifiez les équipes ou les ressources responsables. Voir [Cloud Cost Skill in Bits Chat][9].

Exemples de requêtes :
- `Investigate why EC2 costs changed between January and February`
- `Which teams are responsible for the highest S3 storage costs this month?`

#### DDSQL {#ddsql}
Générez et exécutez des requêtes [DDSQL][7] contre les [données de télémétrie][8] de Datadog en utilisant un langage naturel.

Exemples de requêtes :
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Query average request latency for the payments service broken down by status code`
- `Show me a DDSQL query for the number of RUM sessions by country over the past day`

### Rapports {#reports}

La page des rapports de Bits Chat offre une visibilité sur l'utilisation de Bits Chat par votre organisation. Allez à [**Bits AI** > **Chat** > **Rapports**][10] pour voir :

- **Utilisateurs principaux** : Découvrez quels membres de l'équipe utilisent le plus Bits Chat, classés par nombre de conversations.
- **Tendances d'utilisation** : Suivez le volume des conversations au fil du temps pour comprendre l'adoption et identifier les modèles d'utilisation.
- **Distribution de l'intention de conversation** : Voyez comment les conversations se répartissent par catégorie d'intention, comme l'investigation de problèmes, l'exploration de la télémétrie, l'apprentissage des concepts de Datadog et la configuration de l'observabilité.

Utilisez ces informations pour comprendre les modèles d'adoption, identifier les utilisateurs avancés pour le partage des meilleures pratiques et évaluer quels cas d'utilisation apportent le plus de valeur à votre organisation.

### Application web {#web-application}
Il existe plusieurs façons d'ouvrir Bits Chat dans l'application web de Datadog :
- Dans le coin supérieur droit de la barre de navigation, cliquez sur {{< ui >}}Ask Bits{{< /ui >}}
- Dans un produit Datadog intégré à Bits Chat, cliquez sur {{< ui >}}Ask Bits{{< /ui >}} ou {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (l'icône des étoiles scintillantes)
- Appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>
- Dans le panneau de navigation à gauche, cliquez sur {{< ui >}}Bits AI{{< /ui >}}

{{< img src="bits_ai/getting_started/bits_assistant_side_panel.png" alt="Panneau Bits Chat ouvert à côté de la liste des tableaux de bord" style="width:40%;">}}

### Application mobile {#mobile-application}

Posez des questions à Bits sur votre système ou incident actif. Bits a des informations sur la documentation publique de Datadog, la télémétrie et la propriété.

1. [Téléchargez l'application mobile et connectez-vous][2].
2. Sur l'écran d'accueil, appuyez sur {{< ui >}}Bits Assistant{{< /ui >}}.
3. Commencez à discuter avec Bits Chat par voix ou par texte.
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="Vue du tableau de bord de l'application mobile avec Bits AI" style="width:40%;" >}}

### Slack {#slack}
1. [Connectez votre compte Datadog à votre espace de travail Slack][1].
1. Dans Slack, utilisez la commande `/dd connect` pour afficher une liste de comptes à connecter.
1. Dans le menu déroulant, choisissez le nom de votre compte Datadog.
1. Autorisez les autorisations supplémentaires nécessaires pour Bits AI.

Une fois la configuration terminée, vous pouvez envoyer des requêtes à `@Datadog` en langage naturel : `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Sortie d'une requête d'exemple sur les dépendances de service dans Slack" style="width:60%;">}}

## Lectures complémentaires {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/slack/?tab=applicationforslack
[2]: /fr/mobile/#installing
[3]: /fr/tracing/trace_explorer/
[4]: /fr/cloud_cost_management/
[5]: /fr/dashboards/
[6]: /fr/notebooks/
[7]: /fr/ddsql_editor/
[8]: /fr/ddsql_reference/data_directory/
[9]: /fr/cloud_cost_management/cloud_cost_skill/
[10]: https://app.datadoghq.com/ask/usage