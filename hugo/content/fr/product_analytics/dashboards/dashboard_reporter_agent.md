---
algolia:
  tags:
  - dashboard reporter
  - agentic reporting
  - scheduled report
  - product analytics agent
description: Recevez à intervalles réguliers des rapports générés par IA sur vos dashboards
  Product Analytics dans Slack, Microsoft Teams ou par e-mail.
disable_toc: false
further_reading:
- link: /product_analytics/dashboards/
  tag: Documentation
  text: Dashboards Product Analytics
- link: /actions/agents/
  tag: Documentation
  text: Bits Agent Builder
- link: /account_management/billing/ai_credits/
  tag: Documentation
  text: Crédits IA
- link: /bits_ai/bits_chat/usage/#slack
  tag: Documentation
  text: Utilisez Bits Chat dans Slack
- link: /monitors/
  tag: Documentation
  text: Monitors
title: Dashboard Reporter Agent
---
{{< callout url="https://www.datadoghq.com/product-preview/product-analytics-dashboard-reporter-agent/" btn_hidden="false" header="Rejoignez la Preview !">}}
Dashboard Reporter Agent est en préversion. Remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

Dashboard Reporter Agent surveille les dashboards Product Analytics que vous choisissez et envoie à votre équipe un rapport programmé dans Slack, Microsoft Teams ou par e-mail. Chaque rapport résume ce qui a changé, ce qui nécessite une attention particulière et ce qu'il faut faire ensuite, afin que vous n'ayez pas à ouvrir chaque dashboard pour vérifier. À mesure que vous déployez plus de fonctionnalités, un agent peut surveiller de nombreux dashboards, y compris les dashboards pour les lancements passés qui ne font plus l'objet d'une attention régulière.

Les agents Dashboard Reporter sont basés sur [Bits Agent Builder][1].

<div class="alert alert-info">Les agents Dashboard Reporter consomment des <a href="/account_management/billing/ai_credits/">AI Credits</a>.</div>

Les rapports sont des résumés textuels envoyés selon un planning. Pour être averti lorsqu'une métrique dépasse un seuil, utilisez un [monitor][2].

## Cas d'utilisation {#use-cases}

Utilisez Dashboard Reporter Agent pour :

- **Surveiller plusieurs fonctionnalités à la fois** : un agent peut couvrir de nombreux dashboards.
- **Garder les lancements visibles** : abonnez un dashboard de lancement pour qu'il continue d'être examiné une fois l'attention portée au lancement retombée.
- **Partager un point hebdomadaire sur l'état du produit** : publiez un rapport hebdomadaire sur le canal de votre équipe afin que tout le monde voie les mêmes signaux.
- **Informer la direction** : communiquez les indicateurs clés et l'état général du produit sans préparer de présentation.
- **Détecter les régressions tôt** : un rapport quotidien fait apparaître les baisses et les pics d'erreurs peu après leur apparition.

## Comment l'agent génère un rapport {#how-the-agent-builds-a-report}

- **Couverture complète** : l'agent examine chaque graphique des dashboards auxquels vous êtes abonné, pas seulement ceux en haut de la page.
- **Comparaison période sur période** : chaque rapport compare la période actuelle à la précédente. Un rapport quotidien couvre les dernières 24 heures, un rapport hebdomadaire couvre les 7 derniers jours et un rapport mensuel couvre le dernier mois.
- **Indicateurs clés en premier** : les indicateurs clés apparaissent en haut de chaque rapport, afin que votre équipe puisse suivre les progrès d'une période à l'autre.
- **Priorisés par gravité** : l'agent classe les problèmes du plus grave au moins grave afin que vous puissiez vous concentrer sur les plus importants.
- **Uniquement les changements significatifs** : Si aucun changement significatif n'a eu lieu, le rapport l'indique au lieu de lister les changements mineurs.
- **Sources liées** : Chaque indicateur et problème dans le rapport renvoie à son graphique sous-jacent.

L'agent lit les données du dashboard avec les autorisations de l'utilisateur qui a créé l'agent. Si cet utilisateur perd l'accès à un dashboard, celui-ci n'est plus inclus dans le rapport.

## Prérequis {#prerequisites}

- Accès à Product Analytics et aux dashboards que vous souhaitez surveiller.
- Pour envoyer des rapports vers Slack, l'[intégration Datadog à Slack][3] doit être installée dans votre organisation.
- Pour envoyer des rapports vers Microsoft Teams, l'[intégration Microsoft Teams][4] doit être installée dans votre organisation.

## Créez un agent Dashboard Reporter {#create-a-dashboard-reporter-agent}

Vous pouvez commencer à partir d'un dashboard ou depuis la page Agents dans Product Analytics.

{{< tabs >}}
{{% tab "Depuis un dashboard" %}}

1. Ouvrez le dashboard Product Analytics que vous souhaitez surveiller.
2. Cliquez sur {{< ui >}}Set Up Report{{< /ui >}}. Si le dashboard est déjà inclus dans les rapports d'autres agents, ils sont listés ici.

   {{< img src="product_analytics/dashboards/dashboard_reporter_agent/from-dashboard.png" alt="Un en-tête de dashboard Product Analytics avec le bouton Set Up Report mis en évidence." style="width:100%;" >}}

**Remarque** : Si plusieurs agents surveillent le même dashboard, leurs rapports peuvent différer, car chaque agent rédige son rapport indépendamment.

{{% /tab %}}
{{% tab "Depuis la page Agents" %}}

1. Dans Datadog, accédez à [**Product Analytics > Agents**][1].
2. Cliquez sur {{< ui >}}\+ New Agent{{< /ui >}}.
3. Sélectionnez le modèle {{< ui >}}Dashboard Reporter{{< /ui >}}.

{{< img src="product_analytics/dashboards/dashboard_reporter_agent/from-agents.png" alt="La nouvelle page de l'agent avec le modèle Dashboard Reporter mis en évidence sous Start from blueprint." style="width:60%;" >}}

[1]: https://app.datadoghq.com/product-analytics/agents
{{% /tab %}}
{{< /tabs >}}

### Configurez l'agent {#configure-the-agent}

1. Saisissez un nom qui indique aux lecteurs ce que couvre le rapport, tel que « Checkout Weekly Health ». Le nom apparaît dans le titre de chaque rapport.
2. Sélectionnez un ou plusieurs dashboards à surveiller. Vous pouvez ajouter d'autres dashboards ultérieurement.
3. Sélectionnez un format de rapport prédéfini, tel que Team Update ou Leadership Update, ou rédigez le vôtre. Pour un format personnalisé, décrivez les questions auxquelles le rapport doit répondre à chaque exécution ainsi que toute exigence de formatage.
4. Sélectionnez un canal Slack, un canal Microsoft Teams ou une adresse e-mail pour recevoir les rapports.
5. Choisissez la fréquence d'exécution de l'agent (quotidienne, hebdomadaire ou mensuelle), l'heure à laquelle il envoie le rapport et le fuseau horaire.
6. Cliquez sur {{< ui >}}Create{{< /ui >}}.

## Lisez les rapports {#read-reports}

Les rapports arrivent à la destination que vous avez configurée. Chaque exécution est également enregistrée sur la page de l'agent, afin que vous puissiez consulter les rapports passés.

### Posez des questions de suivi sur un rapport {#ask-follow-up-questions-about-a-report}

Vous pouvez ouvrir un rapport dans Datadog et poser des questions de suivi à l'agent. Par exemple, demandez quel segment a entraîné un changement ou ce qui a changé d'autre au même moment.

1. Ouvrez le rapport :
   - **Depuis le message de rapport** : Dans le message Slack, Microsoft Teams ou e-mail, cliquez sur {{< ui >}}Chat with this report{{< /ui >}}.
   - **Depuis Datadog** : Accédez à la page Agents et sélectionnez l'agent.
2. Saisissez votre question dans la zone de message et appuyez sur <kbd>Enter</kbd>.

### Interrogez Bits AI dans Slack {#ask-bits-ai-in-slack}

Si vos rapports sont envoyés vers Slack et que Bits AI est activé pour l'intégration Slack de Datadog, vous pouvez interroger Bits Chat sur un rapport sans quitter Slack. Mentionnez `@Datadog` avec votre question, par exemple `@Datadog Why did checkout conversion drop this week?` Pour la configuration, consultez [Utilisez Bits Chat dans Slack][5].


## Gérez les agents Dashboard Reporter {#manage-dashboard-reporter-agents}

Pour voir vos agents, accédez à [**Product Analytics > Agents**][6].

### Modifiez un agent {#edit-an-agent}

Vous pouvez modifier les dashboards, le format de rapport, la destination ou la fréquence d'un agent.

1. Depuis la page Agents, cliquez sur l'agent.
2. Effectuez vos modifications de l'une des manières suivantes :
   - **Demandez à l'agent** : Décrivez la modification dans le chat. Par exemple : `Add the Checkout Funnel dashboard and send reports on Mondays at 9:00 AM.`
   - **Modifiez les instructions** : Pour changer les dashboards, le format de rapport ou la destination, cliquez sur le panneau {{< ui >}}Instructions{{< /ui >}} et modifiez les instructions au format Markdown. Pour changer la fréquence, développez le panneau {{< ui >}}Automation{{< /ui >}}.

### Suspendez ou reprenez un agent {#pause-or-resume-an-agent}

Suspendez un agent pour arrêter temporairement les rapports, par exemple pendant une période creuse ou pendant la reconstruction d'un dashboard. Un agent suspendu conserve sa configuration.

- **Pour suspendre un agent** : Sur la page Agents, survolez l'agent et cliquez sur {{< ui >}}Pause{{< /ui >}}. Dans la fenêtre de confirmation, cliquez à nouveau sur {{< ui >}}Pause{{< /ui >}}.
- **Pour reprendre un agent** : sur la page Agents, survolez l'agent et cliquez sur {{< ui >}}Resume{{< /ui >}}. Dans la fenêtre de confirmation, cliquez sur {{< ui >}}Resume{{< /ui >}}.

### Supprimez un agent {#delete-an-agent}

Pour interrompre temporairement l'envoi des rapports, [mettez plutôt l'agent en pause](#pause-or-resume-an-agent).

<div class="alert alert-warning">La suppression d'un agent est définitive. L'agent cesse d'envoyer des rapports, son workflow sous-jacent dans <a href="/actions/workflows/">Workflow Automation</a> est également supprimé, et vous ne pouvez restaurer ni l'un ni l'autre.</div>

Pour supprimer un agent, accédez à la page Agents, survolez l'agent et cliquez sur {{< ui >}}Delete{{< /ui >}}.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/agents/
[2]: /fr/monitors/
[3]: /fr/integrations/slack/?tab=datadogforslack
[4]: /fr/integrations/microsoft_teams/
[5]: /fr/bits_ai/bits_chat/usage/#slack
[6]: https://app.datadoghq.com/product-analytics/agents