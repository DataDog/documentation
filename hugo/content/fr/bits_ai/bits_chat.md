---
aliases:
- /fr/bits_ai/getting_started/
- /fr/bits_ai/chat_with_bits_ai
- /fr/bits_ai/bits_assistant/
- /fr/tracing/guide/latency_investigator/
description: Utilisez Bits Chat dans Datadog pour explorer et agir sur vos données
  d'observabilité en utilisant le langage naturel.
further_reading:
- link: bits_ai/
  tag: Documentation
  text: Présentation de Bits AI
- link: /incident_response/incident_management/investigate/incident_ai
  tag: Documentation
  text: Coordonnez les incidents avec Incident AI
- link: /cloud_cost_management/cloud_cost_skill/
  tag: Documentation
  text: Cloud Cost Skill dans Bits Chat
- link: /account_management/billing/ai_credits/
  tag: Documentation
  text: AI Credits
- link: https://www.datadoghq.com/blog/datadog-mcp-apps/
  tag: Blog
  text: 'Datadog MCP Apps : expériences interactives dans les AI workflows'
- link: https://www.datadoghq.com/blog/introducing-bits-chat/
  tag: Blog
  text: Recherchez et agissez dans Datadog pour résoudre les problèmes plus rapidement
    avec Bits Chat
- link: https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/
  tag: Blog
  text: Répondez plus rapidement à toute question sur les coûts avec la compétence
    Cloud Cost dans Bits Chat
title: Bits Chat
---
## Présentation {#overview}
Bits Chat vous aide à rechercher et à agir dans Datadog en utilisant le langage naturel. Bits Chat est disponible dans l'application web, l'application mobile et Slack.

Posez des questions à Bits Chat dans ces catégories :

### Enquêtez sur les problèmes et remédiez-y {#investigate-issues-and-remediate}
- `Summarize high severity incidents that have occurred in the last day`
- `What's causing 400 errors on the checkout endpoint in the last hour?`
- `Why is the error rate spiking on the web-store service?`
- `What is the root cause of this error? How did it propagate and what is the impact on users?`
- `What could cause 500 errors on this API endpoint?`

### Explorez et analysez la télémétrie {#explore-and-analyze-telemetry}
- `Which services have the most errors right now?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `What's the success rate for my top API endpoints over the past week?`
- `Show me error rates for the checkout service over the last 24 hours`
- `Are there any incidents related to Kafka lag?`

### Apprenez les concepts et les procédures Datadog {#learn-datadog-concepts-and-how-to}
- `How do I configure log collection for the Datadog Agent?`
- `What is the difference between a metric monitor and an anomaly monitor?`
- `What permission do I need to create a new connection?`
- `Can I set the timepicker on a notebook to read-only?`

### Configurez et optimisez l'observabilité {#set-up-and-optimize-observability}
- `Do we already have monitors for high latency on the payments service?`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `How can I put a team tag on this monitor?`
- `Add a timeseries widget for request count over time to this notebook`

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Interface Bits Chat pleine page avec des tâches suggérées" style="width:100%;">}}

### Autorisations{#permissions}

#### Accès à Bits Chat {#access-to-bits-chat}

Pour utiliser Bits Chat, votre rôle doit disposer de l'autorisation **Bits Chat Access**. Cette autorisation est activée par défaut pour les trois rôles Datadog standard : Datadog Admin, Datadog Standard et Datadog Read Only.

Pour gérer cette autorisation pour les rôles personnalisés, accédez à **Paramètres de l'organisation** > **Rôles**, sélectionnez un rôle et activez **Bits Chat Access** sous **Autorisations générales**.

#### Accès aux données via Bits Chat {#data-access-through-bits-chat}

Bits Chat utilise votre rôle Datadog pour récupérer des données ; il ne peut donc accéder qu'aux ressources que vous avez l'autorisation de consulter ou de modifier. Par exemple, si votre rôle restreint l'accès à un ensemble spécifique d'index de logs, Bits Chat ne peut interroger que les logs de ces index. De même, si vous n'avez pas l'autorisation de modifier un dashboard, Bits Chat ne peut pas modifier ce dashboard en votre nom.

### Skills {#skills}
Bits Chat dispose d'une gamme de compétences spécialisées pour des tâches dans Datadog. Les compétences les plus couramment utilisées sont décrites ci-dessous.

#### Dashboards {#dashboards}
Créez des [dashboards][5] et des widgets à partir de descriptions en langage naturel.

Exemples de prompts :
- `Show me a dashboard of high-impact alerts from the past week and which services they affected`
- `Add a widget about CPU usage in the payments service`

#### Notebooks {#notebooks}
Créez des [notebooks][6] d'investigation et améliorez ceux existants avec des résumés et des analyses.

Exemples de prompts :
- `Create an investigation for the recent spike of errors in the checkout service`
- `Add an executive summary for this cost spike report`

#### APM {#apm}

##### Analyse de trace {#trace-analysis}
Analysez une [trace][3] individuelle pour diagnostiquer ce qui a échoué, où et pourquoi.

Exemples de prompts :
- `Why did this request fail?`
- `Summarize this trace and identify the root cause of the error`

##### Latency investigations {#latency-investigations}
Analysez la latence d'un service pour identifier les ressources goulots d'étranglement et ce qui a changé dans ses traces lentes.

Exemples de prompts :
- `What caused the latency spike for this service?`
- `What's the latency bottleneck for this service?`

#### Cloud Cost Management {#cloud-cost-management}
Analysez les changements de [cloud cost][4] et identifiez les équipes ou les ressources responsables. Consultez le [Cloud Cost Skill in Bits Chat][9].

Exemples de prompts :
- `Investigate why EC2 costs changed between January and February`
- `Which teams are responsible for the highest S3 storage costs this month?`

#### DDSQL {#ddsql}
Générez et exécutez des requêtes [DDSQL][7] sur les [données de télémétrie][8] Datadog en utilisant le langage naturel.

Exemples de prompts :
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Query average request latency for the payments service broken down by status code`
- `Show me a DDSQL query for the number of RUM sessions by country over the past day`

### Reports {#reports}

La page Reports de Bits Chat offre une visibilité sur la manière dont votre organisation utilise Bits Chat. Accédez à [**Bits AI** > **Chat** > **Reports**][10] pour voir :

- **Utilisateurs principaux** : Voir quels membres de l'équipe utilisent le plus Bits Chat, classés par nombre de conversations.
- **Usage trends** : Suivez le volume de conversations au fil du temps pour comprendre l'adoption et identifier les modèles d'utilisation.
- **Répartition des intentions des conversations** : Voyez comment les conversations se répartissent par catégorie d'intention, telles que l'investigation de problèmes, l'exploration de la télémétrie, l'apprentissage des concepts Datadog et la configuration de l'observabilité.

Utilisez ces informations pour comprendre les modèles d'adoption, identifier les utilisateurs les plus actifs pour le partage des meilleures pratiques et évaluer quels cas d'utilisation apportent le plus de valeur à votre organisation.

### Web application {#web-application}
Il existe plusieurs façons d'ouvrir Bits Chat dans l'application Web Datadog :
- Accédez à [Bits Chat][11].
- En haut à droite de la barre de navigation, cliquez sur {{< ui >}}Ask Bits{{< /ui >}}.
- Dans un produit Datadog intégré à Bits Chat, cliquez sur {{< ui >}}Ask Bits{{< /ui >}} ou {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (l'icône d'étoiles scintillantes).
- Appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.
- Dans le panneau de navigation de gauche, cliquez sur {{< ui >}}Bits AI{{< /ui >}}.

{{< img src="bits_ai/getting_started/bits_assistant_side_panel.png" alt="Panneau Bits Chat ouvert à côté de la liste des Dashboards" style="width:40%;">}}

### Mobile application {#mobile-application}

Posez des questions à Bits sur votre système ou sur un incident actif. Bits dispose d'un contexte sur la documentation publique, la télémétrie et la propriété de Datadog.

1. [Téléchargez l'application mobile et connectez-vous][2].
2. Sur l'écran d'accueil, appuyez sur {{< ui >}}Bits Chat{{< /ui >}}.
3. Commencez à discuter avec Bits Chat par voix ou par texte.
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="Vue du dashboard de la page d'accueil de l'application mobile avec Bits AI" style="width:40%;" >}}

### Slack {#slack}
1. [Connectez votre compte Datadog à votre espace de travail Slack][1].
1. Dans Slack, utilisez la commande `/dd connect` pour afficher une liste de comptes auxquels vous connecter.
1. Dans le menu déroulant, choisissez le nom de votre compte Datadog.
1. Autorisez les autorisations supplémentaires requises par Bits AI.

Une fois la configuration terminée, vous pouvez envoyer des requêtes à `@Datadog` en langage naturel: `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Résultat d'un exemple de requête de dépendance de service dans Slack" style="width:60%;">}}

## Pour aller plus loin {#further-reading}
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
[11]: https://app.datadoghq.com/ask