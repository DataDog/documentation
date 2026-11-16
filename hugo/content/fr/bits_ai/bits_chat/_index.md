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
- link: https://www.datadoghq.com/blog/bits-chat-slack-incident-response/
  tag: Blog
  text: 'De l''alerte à la résolution : gérez les incidents avec Bits Chat dans Slack'
title: Bits Chat
---
## Présentation {#overview}

Bits Chat vous aide à rechercher et à agir dans Datadog en utilisant le langage naturel. Demandez-lui d'enquêter sur un incident, d'explorer votre télémétrie, de créer un dashboard ou d'interroger vos données avec DDSQL, et il vous répond via un chat conversationnel, au lieu de vous inviter à construire la requête vous-même.

Bits Chat est disponible dans l'application web Datadog, l'application mobile et Slack. Consultez [Utiliser Bits Chat][1] pour l'ouvrir depuis chaque interface.

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Interface Bits Chat pleine page avec des tâches suggérées" style="width:100%;">}}

Posez des questions à Bits Chat telles que :
- `Why is the error rate spiking on the web-store service?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Investigate why EC2 costs changed between January and February`

## Autorisations {#permissions}

### Accès à Bits Chat {#access-to-bits-chat}

Pour utiliser Bits Chat, votre rôle doit disposer de l'autorisation **Bits Chat Access**. Cette autorisation est activée par défaut pour les trois rôles Datadog standard : Datadog Admin, Datadog Standard et Datadog Read Only.

Pour gérer cette autorisation pour les rôles personnalisés, vous pouvez [mettre à jour le rôle][2] afin d'activer **l'accès à Bits Chat**. 

### Accès aux données via Bits Chat {#data-access-through-bits-chat}

Bits Chat utilise votre rôle Datadog pour récupérer des données ; il ne peut donc accéder qu'aux ressources que vous avez l'autorisation de consulter ou de modifier. Par exemple, si votre rôle restreint l'accès à un ensemble spécifique d'index de logs, Bits Chat ne peut interroger que les logs de ces index. De même, si vous n'avez pas l'autorisation de modifier un dashboard, Bits Chat ne peut pas modifier ce dashboard en votre nom.

## Historique des discussions {#chat-history}

Bits Chat enregistre vos conversations. Pour voir les discussions passées, ouvrez {{< ui >}}History{{< /ui >}} dans [Bits Chat][3], ou cliquez sur {{< img src="bits_ai/icons/clock_historical.svg" inline="true" style="width:16px;" alt="Icône Historique" >}} dans le panneau Bits Chat.

### Gérer et partager des discussions {#manage-and-share-chats}

Cliquez sur {{< ui >}}...{{< /ui >}} à côté d'une discussion dans {{< ui >}}History{{< /ui >}}, ou dans l'en-tête d'une discussion ouverte, pour la {{< ui >}}Rename{{< /ui >}}, la {{< ui >}}Share{{< /ui >}} ou la {{< ui >}}Delete{{< /ui >}}. La suppression d'une discussion ne peut pas être annulée.

Les discussions sont privées par défaut. Pour en partager une, cliquez sur {{< ui >}}...{{< /ui >}} > {{< ui >}}Share{{< /ui >}} > {{< ui >}}Shared Chat{{< /ui >}}, puis cliquez sur {{< ui >}}Copy Link{{< /ui >}}. Toute personne disposant du lien peut voir la discussion, y compris les nouveaux messages, mais vous seul pouvez répondre.

<div class="alert alert-warning">Les discussions partagées affichent les données récupérées avec vos autorisations. Vérifiez la discussion avant de la partager.</div>

Les liens partagés expirent automatiquement (consultez la date d'expiration dans la boîte de dialogue {{< ui >}}Share Chat{{< /ui >}}). Pour arrêter le partage, ouvrez {{< ui >}}Share Chat{{< /ui >}} et sélectionnez {{< ui >}}Private Chat{{< /ui >}}.

## Rapports {#reports}

La page Reports de Bits Chat offre une visibilité sur la manière dont votre organisation utilise Bits Chat. Accédez à [**Bits AI** > **Chat** > **Rapports**][4] pour afficher :

- **Utilisateurs principaux** : Voir quels membres de l'équipe utilisent le plus Bits Chat, classés par nombre de conversations.
- **Usage trends** : Suivez le volume de conversations au fil du temps pour comprendre l'adoption et identifier les modèles d'utilisation.
- **Répartition des intentions des conversations** : Voyez comment les conversations se répartissent par catégorie d'intention, telles que l'investigation de problèmes, l'exploration de la télémétrie, l'apprentissage des concepts Datadog et la configuration de l'observabilité.

Utilisez ces informations pour comprendre les modèles d'adoption, identifier les utilisateurs les plus actifs pour le partage des meilleures pratiques et évaluer quels cas d'utilisation apportent le plus de valeur à votre organisation.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_chat/usage/
[2]: /fr/account_management/rbac/?tab=datadogapplication#update-a-role
[3]: https://app.datadoghq.com/ask
[4]: https://app.datadoghq.com/ask/usage