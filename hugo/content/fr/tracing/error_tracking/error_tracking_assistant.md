---
description: En savoir plus sur l'assistant de suivi des erreurs.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentation
  text: En savoir plus sur l'utilisation du contexte d'exécution pour le suivi des
    erreurs
- link: /tracing/error_tracking
  tag: Documentation
  text: En savoir plus sur le suivi des erreurs pour les services backend
is_beta: true
private: true
title: Assistant de suivi des erreurs
---

{{< beta-callout url="#" btn_hidden="true" >}}
L'assistant de suivi des erreurs pour le suivi des erreurs APM est disponible en bêta privé. Pour en bénéficier, contactez l'assistance à l'adresse support@datadoghq.com.
{{< /beta-callout >}}

## Présentation

L'assistant de suivi des erreurs pour le suivi des erreurs APM fournit une synthèse de vos erreurs et vous propose des suggestions de scénarios de test et de correctifs pour faciliter leur remédiation.

{{< img src="tracing/error_tracking/error_tracking_assistant.mp4" video="true" alt="Contexte d'exécution dans l'Explorer du suivi des erreurs" style="width:100%" >}}

## Prérequis et configuration
Langages pris en charge
: Python, Java

L'assistant de suivi des erreurs requiert l'[intégration du code source][3]. Pour activer cette intégration, procédez comme suit :

1. Accédez à **Integrations** et sélectionnez **Link Source Code** dans la barre de navigation supérieure.
2. Suivez les instructions pour associer un commit à vos données de télémétrie et configurer votre référentiel GitHub.

{{< img src="tracing/error_tracking/apm_source_code_integration.png" alt="Configuration de l'intégration du code source APM" style="width:80%" >}}

### Configuration supplémentaire recommandée
- Pour améliorer les suggestions pour le langage Python, participez à la [bêta du contexte d'exécution Python][1]. Cela vous permet de fournir de véritables valeurs de variable en production à l'assistant.
- Pour intégrer des scénarios de test et des correctifs à votre IDE, cliquez sur l'option **Apply in VS Code** associée à la suggestion générée de votre choix, puis suivez les instructions de configuration afin d'installer l'extension Datadog/VS Code.

## Prise en main
1. Accédez à [**APM** > **Error Tracking**][4].
2. Cliquez sur un problème détecté par le suivi des erreurs pour afficher la nouvelle section **Generate test & fix**.

{{< img src="tracing/error_tracking/error_tracking_assistant.png" alt="Assistant de suivi des erreurs" style="width:80%" >}}

## Dépannage

Si aucune suggestion ne s'affiche :

1. Vérifiez que l'[intégration du code source][2] à l'intégration GitHub a été correctement configurée.
2. Améliorez les suggestions de l'assistant de suivi des erreurs en participant à la [bêta du contexte d'exécution Python][1].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/error_tracking/executional_context
[2]: https://app.datadoghq.com/source-code/setup/apm
[3]: /fr/integrations/guide/source-code-integration
[4]: https://app.datadoghq.com/apm/error-tracking