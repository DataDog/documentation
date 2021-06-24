---
title: Configurer l'APM Datadog
kind: documentation
description: Débuter avec l'APM Datadog
aliases:
  - /fr/tracing/setup
  - /fr/tracing/send_traces/
  - /fr/tracing/setup/
  - /fr/tracing/environments/
  - /fr/tracing/setup/environment
  - /fr/tracing/setup/first_class_dimensions
  - /fr/tracing/getting_further/first_class_dimensions/
  - /fr/agent/apm/
---
Dans la plupart des environnements, la configuration de votre application pour envoyer des [traces][1] à Datadog repose sur deux étapes :

1. Configuration de l'Agent Datadog pour l'APM.

2. Ajout de la bibliothèque de tracing Datadog à votre code.

Les traces sont envoyées depuis votre application instrumentée via une bibliothèque de tracing Datadog à l'Agent Datadog, et depuis l'Agent Datadog à Datadog.

Dans les environnements conteneurisés, les environnements sans serveur et certains autres environnements, des étapes de configuration spécifiques à l'APM peuvent être requises sur le traceur et l'Agent pour que les traces soient correctement reçues. Assurez-vous donc de suivre les instructions pour les deux composants.

## Pour obtenir les instructions de configuration, sélectionnez votre langage :

{{< partial name="apm/apm-languages.html" >}}

<br>

Pour instrumenter une application écrite dans un langage qui n'est pas encore pris en charge par une bibliothèque officielle, consultez la liste des [bibliothèques de tracing de notre communauté][2].

[1]: /fr/tracing/visualization/#trace
[2]: /fr/developers/community/libraries/#apm-tracing-client-libraries