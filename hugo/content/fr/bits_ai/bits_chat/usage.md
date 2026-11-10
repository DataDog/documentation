---
description: Ouvrez Bits Chat depuis l'application web Datadog, l'application mobile
  ou Slack.
further_reading:
- link: /bits_ai/bits_chat/
  tag: Documentation
  text: Bits Chat
- link: /bits_ai/bits_code/slack_code_channels/
  tag: Documentation
  text: Canaux de code avec Bits Code
title: Utilisez Bits Chat
---
Bits Chat dispose d'un contexte sur la documentation publique, la télémétrie et la propriété de Datadog. Utilisez Bits Chat pour poser des questions sur votre système ou sur un incident actif. Bits Chat est disponible dans l'application web Datadog, l'application mobile et Slack.

## Application web {#web-application}
Il existe plusieurs façons d'ouvrir Bits Chat dans l'application Web Datadog :
- Accédez directement à [Bits Chat][1].
- En haut à droite de la barre de navigation, cliquez sur {{< ui >}}Ask Bits{{< /ui >}}.
- Dans un produit Datadog intégré à Bits Chat, cliquez sur le bouton de déclenchement de l'IA (par exemple, {{< ui >}}Ask Bits{{< /ui >}}) ou {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px" alt="">}} (l'icône d'étoiles scintillantes).
- Appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.
- Dans le panneau de navigation de gauche, cliquez sur {{< ui >}}Bits AI{{< /ui >}}, puis sélectionnez {{< ui >}}Bits Chat{{< /ui >}}.

## Application mobile {#mobile-application}

Posez des questions à Bits sur votre système ou sur un incident actif depuis l'[application mobile][2]. 

1. Sur l'écran d'accueil, appuyez sur {{< ui >}}Bits Chat{{< /ui >}}.
1. Commencez à discuter avec Bits Chat par voix ou par texte.
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="Vue du dashboard de la page d'accueil de l'application mobile avec Bits AI" style="width:40%;" >}}

## Slack {#slack}
Posez des questions à Bits, déclarez des incidents, déclenchez des enquêtes ou effectuez des modifications de code. Bits Chat répond dans le fil de discussion afin que votre équipe puisse conserver la question, le contexte et la réponse au même endroit.

1. Sélectionnez votre espace de travail Slack dans les [paramètres de Bits Chat][3].
2. Cliquez sur **Connect Slack account** pour autoriser Datadog à vous reconnaître dans les deux produits.
3. (Facultatif) Cliquez sur **Grant permissions** à votre espace de travail afin que Bits Chat puisse lire les conversations Slack pertinentes.

Une fois la configuration terminée, vous pouvez envoyer des requêtes à `@Datadog` en langage naturel vers les canaux de votre espace de travail avec l'application Datadog. 

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Résultat d'un exemple de requête de dépendance de service dans Slack" style="width:60%;">}}

### Canaux de code avec Bits Code {#code-channels-with-bits-code}

Demandez à Bits Chat d'effectuer une modification de code, et il crée un [canal de code][4] dédié à la tâche. Dans le canal de code, [Bits Code][5] travaille sur la modification avec vous et votre équipe.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ask
[2]: /fr/mobile/#installing
[3]: https://app.datadoghq.com/ask/settings
[4]: /fr/bits_ai/bits_code/slack_code_channels/
[5]: /fr/bits_ai/bits_code/