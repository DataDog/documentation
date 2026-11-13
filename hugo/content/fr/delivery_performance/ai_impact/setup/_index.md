---
description: Configurez les sources de détection d'IA et les paramètres d'AI Impact
  afin que Datadog puisse classer les pull requests comme assistées par IA.
further_reading:
- link: /delivery_performance/ai_impact/
  tag: Documentation
  text: En savoir plus sur AI Impact
- link: /delivery_performance/dora_metrics/setup/
  tag: Documentation
  text: Configurer DORA Metrics
- link: /ai_agents_console/setup/
  tag: Documentation
  text: Configurez Agent Console pour les agents de codage
title: Configurez AI Impact
---
{{< callout url="#" btn_hidden="true" header="Rejoignez la Preview !" >}}
AI Impact est disponible pour tous les clients Datadog en version Preview.
{{< /callout >}}

[AI Impact][1] classe chaque pull request comme {{< ui >}}AI-assisted{{< /ui >}} ou {{< ui >}}non-AI{{< /ui >}} en fonction des sources qu'il détecte pour vos outils de codage IA. Une source est un signal indiquant qu'un outil de codage IA a contribué à un commit ou à une PR. 

Configurez vos outils de codage IA et vos sources sur [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Delivery Performance{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}AI Impact{{< /ui >}}][2]. Datadog vous indique la source recommandée pour la classification la plus précise pour chaque assistant de codage, et des règles de mappage prédéfinies aident à détecter l'activité des agents de revue courants et des agents autonomes.

## Prérequis {#prerequisites}

AI Impact nécessite la configuration de [DORA Metrics][3] avec des données de déploiement, de commit et de pull request.

Aucune configuration spécifique à l'IA n'est requise pour voir les données initiales, telles que les commits co-écrits par une IA et certaines activités attribuées aux revues par IA et aux agents autonomes. Pour une mesure plus complète, configurez vos outils de codage IA et vos sources comme décrit ci-dessous.

## Comment fonctionne la détection d'IA {#how-ai-detection-works}

Datadog classe l'activité d'IA à partir des types d'outils d'IA suivants :

| Outils d'IA | Comment fonctionne la détection |
|---|---|
| [Assistants de codage](#set-up-coding-assistants) | Détectés par des modèles de co-auteur, des intégrations configurées, des étiquettes de pull request ou d'autres données indiquant des contributions d'un outil d'IA. L'attribution à l'IA peut être [directe ou déduite](#ai-attribution-modes-for-coding-assistants), selon la source de l'outil. |
| [Agents de revue](#set-up-review-agents) | Détectés à l'aide de règles de mappage pour les commentaires de pull request et les réactions GitHub. Un agent de revue est attribué à une pull request lorsqu'une règle fait correspondre un auteur de revue à un agent nommé. |
| [Agents autonomes](#set-up-autonomous-agents) | Détectés à l'aide de règles de mappage pour les identifiants d'auteur, les adresses e-mail d'auteur ou les trailers de commit. Un agent autonome est attribué à une pull request lorsqu'il crée le premier commit de la PR. |

### Modes d'attribution de l'IA pour les assistants de codage {#ai-attribution-modes-for-coding-assistants}

AI Impact classe chaque pull request comme assistée par l'IA ou non, et chaque métrique est construite sur cette classification. Une PR est assistée par l'IA lorsqu'au moins l'un de ses commits est assisté par l'IA.

Chaque source émet des signaux qui fournissent une **attribution directe**, une attribution **déduite de l'activité de l'utilisateur**, ou les deux.

| | Attribution directe | Déduite de l'activité de l'utilisateur |
|---|---|---|
| Un commit est assisté par l'IA lorsque | L'outil signale une contribution de l'IA à ce commit spécifique, par exemple, l'intégration de Cursor signalant des lignes générées par l'IA | L'auteur du commit a créé des lignes de code avec l'outil d'IA le jour où le commit a été créé |
| La preuve est liée à | Le commit | L'auteur et le jour calendaire |
| Ce que les métriques vous disent | Comment le code assisté par l'IA se comporte par rapport au code écrit sans IA, et comment les utilisateurs d'un outil se comparent aux utilisateurs d'un autre | Comment les développeurs travaillant avec l'IA se comportent par rapport à ceux travaillant sans elle, et comment les utilisateurs d'un outil se comparent aux utilisateurs d'un autre |

L'attribution directe est plus précise, car le signal est attaché à la modification elle-même. L'attribution déduite couvre les outils qui signalent l'utilisation sans détail par commit, et classe chaque commit effectué par un auteur actif ce jour-là comme assisté par l'IA. Un utilisateur n'est actif que les jours où l'outil signale des lignes de code créées par cet utilisateur.

Par défaut, le [dashboard AI Impact][1] affiche des métriques utilisant le mode d'attribution le plus précis que tous les [outils intégrés](#supported-ai-coding-assistants-and-sources) ont en commun, afin que les métriques soient comparables entre les outils sur une base égale. Par exemple, si vous utilisez uniquement Cursor, les métriques utilisent l'attribution directe car c'est la méthode la plus précise disponible. Si vous utilisez à la fois Cursor et Claude Code, les métriques sont déduites de l'activité de l'utilisateur car l'attribution directe n'est pas disponible pour Claude Code.

Pour sélectionner le mode d'attribution utilisé par vos métriques dans le [dashboard AI Impact][1], définissez le {{< ui >}}Default AI attribution UI filter{{< /ui >}} dans les paramètres d'AI Impact. Le paramètre affecte uniquement la façon dont les données sont affichées dans l'interface utilisateur d'AI Impact, et non ce que Datadog ingère. Les deux modes continuent de collecter des données, quel que soit le mode que vous sélectionnez.

## Configurer les assistants de codage {#set-up-coding-assistants}

[{{< ui >}}AI Impact Settings{{< /ui >}}][2] montrent quels assistants de codage et quelles sources Datadog détecte. Certains assistants de codage sont détectés automatiquement lorsqu'ils s'ajoutent en tant que [co-auteur](#co-author-signatures) aux commits qu'ils génèrent. Pour capturer plus complètement l'activité d'un assistant de codage IA, configurez une source pour celui-ci.

### Assistants de codage IA et sources pris en charge {#supported-ai-coding-assistants-and-sources}

Chaque assistant de codage pris en charge dispose d'une source recommandée par contexte, répertoriée dans le tableau suivant. La source recommandée est la plus précise que la plupart des utilisateurs peuvent configurer sans travail manuel par demande de tirage (pull request), et elle ingère les données automatiquement après la configuration.

| Assistant de codage | Source recommandée | Mode d'attribution |
|------------------|--------|-------------|
| Claude Code (API ou plateforme) | [Intégration Utilisation et coûts Anthropic][4] | Inferred |
| Claude Code (plan Entreprise) | [Intégration Analyse utilisateur Claude Enterprise][5] | Inferred |
| Claude Code (plan Teams) | [OpenTelemetry](#opentelemetry) | Inferred |
| Claude Code (Amazon Bedrock ou Google Vertex AI) | [OpenTelemetry](#opentelemetry) | Inferred |
| Codex | [Intégration OpenAI Codex][6] | Inferred |
| Cursor | [Intégration Cursor][7] | Direct |
| GitHub Copilot | [Intégration GitHub Copilot][8] | Inferred |

Pour suivre d'autres assistants de codage ou utiliser une source différente pour un assistant de codage pris en charge, les sources suivantes sont disponibles pour tous les assistants de codage :

- [Libellés de PR](#pr-label-detection) : (Attribution directe) Les PR avec un libellé désigné sont marqués comme assistés par l'IA.
- [API publique](#datadog-public-api) : (Déduit de l'activité de l'utilisateur) Envoyez vos propres données d'événement via l'[API publique Datadog][11], et Datadog en déduit l'attribution de l'IA.

### Configurer une source pour un assistant de codage {#configure-a-source-for-a-coding-assistant}

1. Dans [{{< ui >}}AI Impact Settings{{< /ui >}}][2], ouvrez l'onglet {{< ui >}}Coding assistants{{< /ui >}}. L'onglet répertorie les outils d'IA détectés automatiquement via la détection de co-auteur, ainsi que tout autre assistant configuré.
1. Si l'assistant de codage que vous souhaitez suivre est déjà répertorié, sélectionnez-le pour configurer une source. Sinon, cliquez sur {{< ui >}}Add a coding assistant{{< /ui >}} et sélectionnez l'assistant de codage.
1. Pour Claude Code, sélectionnez le plan que vous utilisez ou la passerelle par laquelle vous passez. La [source recommandée](#supported-ai-coding-assistants-and-sources) diffère pour chacun.
1. Suivez les conseils de l'interface utilisateur pour configurer la source. Développez les sections suivantes pour plus de détails sur chaque type de source :

{{% collapse-content title="Intégrations Datadog" level="h4" id="datadog-integrations" %}}
Dans de nombreux cas, la source recommandée est une intégration Datadog pour l'outil de codage, qui signale l'utilisation de l'IA directement à Datadog. Parmi celles-ci, seule l'intégration Cursor signale la contribution de l'IA directement par commit. Les autres intégrations signalent l'activité de l'utilisateur, que Datadog utilise pour déduire l'assistance IA pour les commits créés par un auteur actif ce jour-là.

Lors de la configuration d'un assistant de codage dans {{< ui >}}AI Impact Settings{{< /ui >}}, cliquez sur le bouton approprié dans la section {{< ui >}}Integration{{< /ui >}} pour ouvrir la tuile d'intégration dans Datadog et terminer la configuration.
{{% /collapse-content %}}

{{% collapse-content title="OpenTelemetry" level="h4" id="opentelemetry" %}}
Utilisez OpenTelemetry pour signaler les données d'utilisation de l'IA à partir de certains déploiements d'assistants de codage, tels que le plan Teams de Claude Code. Une configuration supplémentaire est requise pour Claude Code s'exécutant via une passerelle externe telle qu'Amazon Bedrock ou Google Vertex AI.

1. Configurez Claude Code pour envoyer des données OpenTelemetry à Datadog, en suivant soit [Option 2 : OpenTelemetry (OTLP)][9], soit [Option 3 : Transférer les données via le Datadog Agent][10].
1. Amazon Bedrock ou Google Vertex AI : définissez un attribut de ressource par utilisateur dans votre fichier de paramètres Claude Code, par exemple `~/.claude/settings.json` :

   ```json
   "OTEL_RESOURCE_ATTRIBUTES": "user.email=user@company.com"
   ```

   AI Impact a besoin de `user.email` pour lier l'activité à un développeur individuel et déduire l'assistance IA pour les commits de ce développeur.
1. Redémarrez Claude Code.

Comme `user.email` diffère pour chaque développeur, il ne peut pas être fourni dans un fichier de configuration partagé unique. Distribuez le fichier de paramètres avec un système de gestion des appareils mobiles (MDM) ou un script de provisionnement qui écrit la valeur lors de la connexion.
{{% /collapse-content %}}

{{% collapse-content title="Détection des étiquettes de PR" level="h4" id="pr-label-detection" %}}
Les étiquettes de pull request permettent une attribution directe pour tout assistant de codage, y compris les assistants sans intégration Datadog. Datadog marque chaque commit dans une pull request étiquetée comme assisté par IA.

1. Lors de la configuration d'un assistant de codage dans {{< ui >}}AI Impact Settings{{< /ui >}}, cliquez sur {{< ui >}}Set Up{{< /ui >}} dans la section {{< ui >}}PR Labels{{< /ui >}}.
1. Saisissez une ou plusieurs étiquettes que votre équipe utilise pour identifier les pull requests assistées par IA, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

Chaque règle s'applique à l'ensemble de la pull request ; ainsi, si des commits ont été écrits sans assistance IA, ils sont classés comme étant assistés par IA. La détection d'étiquettes dépend d'un étiquetage cohérent par votre équipe, ce qui peut être difficile à maintenir au sein d'une grande organisation. Utilisez-la pour un assistant de codage sans intégration Datadog, ou pour une seule équipe capable de maintenir cette pratique.
{{% /collapse-content %}} 

{{% collapse-content title="API publique Datadog" level="h4" id="datadog-public-api" %}}
Utilisez l'[API publique Datadog][11] pour envoyer vos propres données d'utilisation de l'IA à Datadog lorsque votre organisation achemine les outils de codage IA via une passerelle interne. L'API est également une option pour suivre un assistant de codage qui ne dispose d'aucune intégration Datadog. Datadog déduit l'assistance IA à partir de l'activité utilisateur que vous signalez.
{{% /collapse-content %}}

{{% collapse-content title="Signatures de co-auteur" level="h4" id="co-author-signatures" %}}
Certains assistants de codage s'ajoutent en tant que co-auteur aux commits qu'ils génèrent. Datadog détecte automatiquement ces signatures de co-auteur ; aucune configuration supplémentaire n'est requise. Comme la signature est jointe au commit, la détection de co-auteur fournit une attribution directe.

La détection de co-auteur peut sous-estimer l'activité de l'IA, car tous les assistants de codage ne s'ajoutent pas en tant que co-auteurs, et un rebase ou un squash peut supprimer la signature de co-auteur. Pour mesurer plus complètement un assistant de codage, configurez une autre source pour celui-ci.
{{% /collapse-content %}}

## Configurer des agents de revue {#set-up-review-agents}

Les agents de revue examinent les pull requests plutôt que d'écrire le code qu'elles contiennent. Datadog détecte les agents de revue à partir des commentaires de pull request et des réactions GitHub, et attribue un agent de revue à une pull request lorsqu'une règle de mappage fait correspondre un auteur de revue à un agent nommé.

Pour suivre un agent de revue avec une règle de mappage :

1. Ouvrez l'onglet {{< ui >}}Review agents{{< /ui >}} dans les paramètres d'AI Impact.
1. Cliquez sur {{< ui >}}Add Review Agent{{< /ui >}}.
1. Saisissez un {{< ui >}}Agent name{{< /ui >}} pour identifier l'agent de revue dans l'interface utilisateur.
1. Définissez une ou plusieurs règles qui correspondent au login de l'auteur de l'agent associé aux commentaires de revue ou aux réactions sur les PR.

## Configurer des agents autonomes {#set-up-autonomous-agents}

Les agents autonomes ouvrent des pull requests par eux-mêmes plutôt que d'assister un développeur dans un éditeur. Datadog détecte la plupart des agents autonomes automatiquement à partir de modèles d'agents connus. Vous pouvez également définir des règles de mappage pour identifier les agents que Datadog ne détecte pas automatiquement.

Pour suivre un agent avec une règle de mappage :

1. Ouvrez l'onglet {{< ui >}}Autonomous agents{{< /ui >}} dans les paramètres d'AI Impact.
1. Cliquez sur {{< ui >}}Add Autonomous Agent{{< /ui >}}.
1. Saisissez un {{< ui >}}Agent name{{< /ui >}} pour identifier l'agent autonome dans l'interface utilisateur.
1. Définissez une ou plusieurs règles qui identifient les pull requests de l'agent.

### Identifier les bots d'automatisation {#identify-automation-bots}

Les bots d'automatisation, tels que les outils de mise à jour des dépendances et les bots de version, ne sont pas des agents IA, et leur activité n'est pas pertinente pour AI Impact. L'identification d'un bot empêche son activité d'affecter vos métriques AI Impact.

Pour détecter les commits et les PR créés par des bots d'automatisation, activez la détection automatique des bots (pour GitHub) et définissez des règles de mappage personnalisées dans les [paramètres généraux de Delivery Performance][12].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora/ai-impact
[2]: https://app.datadoghq.com/ci/settings/dora/integrations
[3]: /fr/delivery_performance/dora_metrics/setup/
[4]: /fr/integrations/anthropic-usage-and-costs/
[5]: /fr/integrations/claude-enterprise-user-analytics/
[6]: /fr/integrations/openai-codex/
[7]: /fr/integrations/cursor/?tab=cursorintegrationindatadog#overview
[8]: /fr/integrations/github-copilot/
[9]: /fr/ai_agents_console/setup/#option-2-opentelemetry-otlp
[10]: /fr/ai_agents_console/setup/#option-3-forward-data-through-the-datadog-agent
[11]: /fr/api/latest/dora-metrics/send-ai-tool-user-activity/
[12]: https://app.datadoghq.com/ci/settings/dora