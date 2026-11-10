---
description: Apprenez à créer et à travailler dans des canaux de code temporaires
  dans Slack, où vous pouvez piloter Bits Code, afficher les différences de code et
  créer des pull requests.
further_reading:
- link: /bits_ai/bits_code/
  tag: Documentation
  text: Bits Code
- link: /bits_ai/bits_chat/#slack
  tag: Documentation
  text: Bits Chat dans Slack
- link: /integrations/slack/
  tag: Documentation
  text: Intégration Slack
- link: https://slack.com/features/code-channels
  tag: Documentation Slack
  text: Canaux de code
title: Canaux de code dans Slack avec Bits Code
---
## Présentation {#overview}

Les canaux de code sont des canaux Slack temporaires dédiés au travail avec un agent de code sur une tâche spécifique. Lorsque vous demandez à [Bits Chat][1] dans Slack d'effectuer une modification de code, [Bits Code][3] crée un canal de code pour cette tâche. Vous et votre équipe pouvez suivre le travail, le piloter et examiner le résultat dans le canal, sans encombrer la conversation initiale.

{{< img src="bits_ai/dev_agent/slack_code_channels/code_channel.png" alt="Un canal de code Slack montrant une conversation avec Bits Code à côté d'une vue des différences des modifications de code proposées" style="width:100%;" >}}

En savoir plus sur les canaux de code dans la [documentation Slack][6].

## Créer un canal de code {#create-a-code-channel}

Après avoir [configuré Bits Code et activé les canaux de code][4], créez un canal de code en mentionnant `@Datadog` dans Slack et en décrivant une modification de code que vous souhaitez effectuer. Si Bits Chat détermine que la demande nécessite des modifications de code, il confie la tâche à Bits Code, qui crée un canal de code. Bits publie un lien vers le nouveau canal de code à l'endroit où il a été initialement sollicité.

{{< img src="bits_ai/dev_agent/slack_code_channels/code_channel_creation.png" alt="Un message Slack mentionnant @Datadog, suivi d'une carte montrant le canal de code résultant qui a été créé" style="width:100%;" >}}

Bits Code nomme automatiquement le canal de code en fonction de votre demande initiale. Trouvez vos canaux de code dans une section {{< ui >}}Code channels{{< /ui >}} dédiée dans votre barre latérale Slack.

### Autorisations et accès {#permissions-and-access}

Seul l'utilisateur qui a sollicité `@Datadog` est automatiquement ajouté au nouveau canal de code. Les canaux de code correspondent à la visibilité du canal à partir duquel ils sont créés (c'est-à-dire que si vous avez mentionné `@Datadog` dans un canal public, le canal de code résultant est également public).

<div class="alert alert-warning">Bits Code peut accéder aux dépôts de code source avec les autorisations de l'utilisateur qui a sollicité <code>@Datadog</code> et créé le canal. Il peut accéder à toute la télémétrie Datadog (avec les restrictions <a href="/account_management/rbac/data_access/">Data Access Control</a> appliquées) de tous les utilisateurs du canal. Bits Code peut intégrer ces données de dépôt et cette télémétrie dans le canal de code. En tant que créateur d'un canal de code, il est de votre responsabilité de vous assurer que toute personne pouvant voir un canal de code est autorisée à en voir le contenu, et que toute personne pouvant rejoindre un canal de code est autorisée à piloter Bits Code.</div>

Tout utilisateur souhaitant piloter l'agent doit disposer d'un compte Datadog connecté à Slack. (Si vous publiez un message dans un canal de code mais que vous n'avez pas de compte Datadog connecté, Bits ignore votre message.)

## Travaillez dans un canal de code {#work-in-a-code-channel}

Dans les autres canaux Slack, lorsque vous souhaitez obtenir une réponse de Bits Chat, vous devez mentionner `@` à chaque fois. Un canal de code fonctionne différemment : Bits Code écoute chaque message publié. Vous n'avez pas besoin de mentionner `@Datadog` à nouveau pour continuer à piloter l'agent.

Pendant que Bits Code travaille, le canal de code affiche :

- Une vue diff des modifications de code proposées
- Des widgets de graphique Datadog, lorsque cela est pertinent pour la tâche
- Un bouton {{< ui >}}Create PR{{< /ui >}} pour ouvrir une pull request à partir des modifications

Une fois que Bits Code a généré un diff de code, vous pouvez commenter des lignes spécifiques directement dans le canal de code.

{{< img src="bits_ai/dev_agent/slack_code_channels/commenting_on_code.png" alt="Une question est rédigée pour des lignes de code spécifiques" style="width:100%;" >}}

Le travail dans chaque canal de code est également reflété dans une [session Bits Code][2] dans Datadog. Pour l'afficher, dans le coin inférieur droit du canal de code, cliquez sur {{< ui >}}</> Code session{{< /ui >}}.

Apprenez-en davantage sur la façon de travailler dans un canal de code dans la [documentation Slack][6].

### Comment fonctionne l'auto-push dans les canaux de code {#how-auto-push-works-in-code-channels}

Lorsque le [paramètre auto-push][7] est défini sur {{< ui >}}Always allow auto-push{{< /ui >}}, Bits Code peut transmettre les modifications de manière agentique, c'est-à-dire sans qu'un humain n'ait à cliquer sur un bouton. Lors d'un push agentique, Bits utilise l'identité de code source du créateur du canal de code pour créer les commits et la pull request.

Bits Code ne peut push du code agentiquement depuis un canal de code que lorsque le créateur du canal ainsi que chaque utilisateur ayant envoyé un message dans le canal dispose d'un compte de contrôle de source lié à Datadog avec :

- Un accès en écriture à chaque dépôt faisant l'objet d'une pull request dans le canal, et à tout dépôt recevant des modifications
- Un accès en lecture à tous les autres dépôts associés au canal

(Ces autorisations ne sont pas vérifiées pour les utilisateurs qui ont rejoint le canal mais n'ont pas envoyé de message.)

Si un utilisateur ayant envoyé un message dans le canal de code ne dispose pas des autorisations de dépôt requises, ou si Bits ne peut pas les vérifier, Bits ne push pas les modifications agentiquement. Dans ce scénario, un utilisateur disposant des autorisations requises peut toujours cliquer sur {{< ui >}}Create PR{{< /ui >}} ou {{< ui >}}Update PR{{< /ui >}}. Ces boutons vérifient uniquement les autorisations de cet utilisateur sur les dépôts associés au canal de code. L'utilisateur qui clique sur {{< ui >}}Create PR{{< /ui >}} est l'auteur de la demande de tirage ou de fusion résultante.

## Limitations {#limitations}

Les [limitations globales de Bits Code][5] s'appliquent également aux canaux de code.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_chat/#slack
[2]: /fr/bits_ai/bits_code/#sessions
[3]: https://app.datadoghq.com/code
[4]: /fr/bits_ai/bits_code/setup/
[5]: /fr/bits_ai/bits_code/#limitations
[6]: https://slack.com/help/articles/54310833022355-Build-with-AI-as-a-team-using-Slack-Code
[7]: /fr/bits_ai/bits_code/setup/#enable-auto-push