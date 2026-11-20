---
description: Créez des compétences réutilisables qui fournissent à Bits AI et aux
  agents IA externes des connaissances et des instructions propres au domaine de l'organisation.
further_reading:
- link: /bits_ai/bits_chat/
  tag: Documentation
  text: Bits Chat
- link: /actions/agents/
  tag: Documentation
  text: Bits Agent Builder
- link: /mcp_server/
  tag: Documentation
  text: Datadog MCP Server
title: Bibliothèque de compétences
---
## Présentation {#overview}

Utilisez la bibliothèque de compétences pour définir des connaissances du domaine et des instructions réutilisables pour les agents IA. Les compétences donnent aux agents un contexte spécifique à la tâche sans que vous ayez à répéter les mêmes informations dans chaque invite.

Par exemple, créez une compétence qui décrit le processus de réponse aux incidents d'une organisation, les conventions de propriété de service ou les exigences pour résumer une enquête.

Les compétences fonctionnent avec [Bits Chat][1], [Bits Agent Builder][2], l'application Datadog pour Slack et des agents externes tels que Claude Code, Codex et Cursor qui se connectent via le [Datadog MCP Server][3].

## Créer une compétence {#create-a-skill}

Créez une compétence directement dans la bibliothèque de compétences, ou demandez à Bits Chat d'en créer une pour vous.

### Créer une compétence dans la bibliothèque de compétences {#create-a-skill-in-the-skills-library}

1. Ouvrez la [{{< ui >}}Skills Library{{< /ui >}}][4] dans Datadog.
2. Créez une compétence ou importez un fichier `SKILL.md` existant.
3. Ajoutez les connaissances du domaine et les instructions que l'agent doit suivre.
4. Sélectionnez la visibilité de la compétence :
    - **Private** : Gardez la compétence privée.
    - **Public** : Partagez la compétence avec l'organisation Datadog.
5. Enregistrez la compétence.

Utilisez des instructions ciblées et donnez à la compétence un nom descriptif. Un nom clair rend la compétence plus facile à découvrir et à invoquer avec une commande slash.

### Créer une compétence avec Bits Chat {#create-a-skill-with-bits-chat}

Demandez à Bits Chat de créer une compétence :

```text
Create a new Skills Library skill
```

Pour créer une compétence à partir du contexte d'une conversation Bits Chat existante, saisissez :

```text
Turn this conversation into a skill
```

Vous pouvez également créer une compétence à partir d'un fil de discussion Slack existant. Dans le fil de discussion, saisissez :

```text
@Datadog turn this conversation into a skill
```

## Utiliser une compétence dans Bits Chat {#use-a-skill-in-bits-chat}

Pour rendre une compétence disponible dans Bits Chat :

1. Ouvrez **Settings** dans Bits Chat.
2. Sélectionnez **Skills**.
3. Activez la compétence.

Une fois que vous avez activé une compétence, Bits Chat l'utilise automatiquement lorsqu'elle est pertinente pour une requête.

Invoquez explicitement une compétence en saisissant sa commande slash dans la conversation :

```text
/my-skill
```

Vous pouvez inclure un contexte supplémentaire dans le même message ou poursuivre la conversation après avoir invoqué la compétence.

## Utiliser une compétence dans Bits Agent Builder {#use-a-skill-in-bits-agent-builder}

Dans la configuration de l'agent, sélectionnez chaque compétence dont l'agent a besoin. L'agent charge automatiquement les compétences sélectionnées.

Pour invoquer explicitement une compétence au cours d'une conversation, saisissez sa commande slash :

```text
/my-skill
```

Pour plus d'informations sur la création et le test d'agents, consultez [Bits Agent Builder][2].

## Utiliser une compétence dans Slack {#use-a-skill-in-slack}

Après avoir connecté l'application Datadog pour Slack, mentionnez `@Datadog` et ajoutez la commande slash de la compétence :

```text
@Datadog /my-skill
```

Ajoutez tous les détails spécifiques à la tâche après la commande.

## Utiliser des compétences avec un agent externe {#use-skills-with-an-external-agent}

Les agents IA externes qui se connectent via le Datadog MCP Server peuvent découvrir et charger des compétences depuis la bibliothèque de compétences.

Le Datadog MCP Server fournit les outils suivants :

- `list_datadog_skills()` : Liste les compétences disponibles pour l'agent.
- `load_datadog_skill()` : Charge une compétence sélectionnée dans le contexte de l'agent.

Un workflow typique d'agent externe est :

1. Connectez l'agent au Datadog MCP Server.
2. Découvrez les compétences disponibles avec `list_datadog_skills()` ou MCP Resources.
3. Chargez la compétence nécessaire pour la tâche avec `load_datadog_skill()`.
4. Demandez à l'agent d'effectuer la tâche en utilisant les instructions et les connaissances chargées.

Pour les instructions de connexion, consultez la documentation [Datadog MCP Server][3].

## Disponibilité {#availability}

La bibliothèque de compétences est disponible dans Bits Chat, Bits Agent Builder, Slack et les agents externes qui se connectent via le Datadog MCP Server.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_chat/
[2]: /fr/actions/agents/
[3]: /fr/mcp_server/
[4]: https://app.datadoghq.com/actions/skills