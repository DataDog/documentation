---
description: En savoir plus sur le contexte d'exécution pour le suivi des erreurs
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentation
  text: En savoir plus sur les monitors de suivi des erreurs
- link: /tracing/error_tracking
  tag: Documentation
  text: En savoir plus sur le suivi des erreurs pour les services backend
is_beta: true
kind: documentation
private: true
title: Contexte d'exécution pour le suivi des erreurs
---

{{< beta-callout url="#" btn_hidden="true" >}}
Le contexte d'exécution pour le suivi des erreurs APM est disponible en bêta privé. Pour en bénéficier, contactez l'assistance à l'adresse support@datadoghq.com.
{{< /beta-callout >}}

## Présentation

Le contexte d'exécution pour le suivi des erreurs APM capture automatiquement les valeurs de variable en production. Cela vous permet de reproduire des exceptions provenant de problèmes détectés par le suivi des erreurs.

{{< img src="tracing/error_tracking/error_tracking_executional_context.mp4" video="true" alt="Contexte d'exécution dans l'Explorer du suivi des erreurs" style="width:100%" >}}

## Prérequis
Langages pris en charge
: Python

- Vous devez avoir configuré l'Agent Datadog pour la solution APM.
- Votre application doit être instrumentée avec `ddtrace`.

Le contexte d'exécution est uniquement disponible pour le suivi des erreurs APM. Le suivi des erreurs pour les logs et RUM ne prend pas en charge cette fonctionnalité.

## Configuration

1. Installez la version `7.44.0` ou une version ultérieure de l'Agent.
2. Vérifiez que vous utilisez la version `1.16.0` ou une version ultérieure de `ddtrace`.
3. Définissez la variable d'environnement `DD_EXCEPTION_DEBUGGING_ENABLED` sur `true` pour exécuter votre service en activant le contexte d'exécution du suivi des erreurs.

### Masquer les données sensibles

Pour effacer les informations personnelles dans les données des variables, créez une règle avec le [scanner de données sensibles][1], puis appliquez-la aux logs renvoyés par la requête `dd_source:debugger`.

## Prise en main

1. Accédez à [**APM** > **Error Tracking**][2].
2. Cliquez sur un problème détecté par le suivi des erreurs Python, puis faites défiler vers le bas jusqu'à atteindre le composant relatif à la stack trace.
3. Développez les stack frames pour passer en revue les valeurs de variable capturées.

{{< img src="tracing/error_tracking/error_tracking_executional_context.png" alt="Contexte d'exécution dans l'Explorer du suivi des erreurs" style="width:80%" >}}

## Dépannage

### Trace d'erreur Python spécifique sans valeur de variable
Pour limiter l'impact de la fonctionnalité sur les performances, le processus de capture des erreurs est plafonné : les données sur les variables sont incluses dans une erreur par seconde. Si vous ne voyez pas de valeurs de variable dans une trace spécifique, procédez comme suit :

1. Cliquez sur **View Similar Errors**.
2. Augmentez l'intervalle afin de trouver une autre instance de l'exception pour laquelle des valeurs de variable ont été capturées.

[1]: /fr/sensitive_data_scanner/
[2]: https://app.datadoghq.com/apm/error-tracking

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}