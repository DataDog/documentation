---
description: Découvrez Error Tracking Assistant.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentation
  text: Découvrez comment utiliser le Contexte d'exécution dans Error Tracking
- link: /tracing/error_tracking
  tag: Documentation
  text: En savoir plus sur Error Tracking pour les services backend
is_beta: true
private: true
title: Error Tracking Assistant
---
{{< callout url="#" btn_hidden="true" >}}
Error Tracking Assistant pour APM Error Tracking est en préversion. Pour demander l'accès, contactez le Support à support@datadoghq.com.
{{< /callout >}}

## Présentation {#overview}

L'Error Tracking Assistant dans APM Error Tracking fournit un résumé de vos erreurs et vous aide à les résoudre à l'aide de cas de test et de correctifs suggérés. 

{{< img src="tracing/error_tracking/error_tracking_assistant.mp4" video="true" alt="Contexte d'exécution de l'Error Tracking Explorer" style="width:100%" >}}

## Exigences et configuration {#requirements-and-setup}
Langues prises en charge
: Python, Java

L'Error Tracking Assistant nécessite l'[Intégration du code source][3]. Pour activer l'Intégration du code source :

1. Accédez à {{< ui >}}Integrations{{< /ui >}} et choisissez {{< ui >}}Link Source Code{{< /ui >}} dans la barre de navigation supérieure.
2. Suivez les étapes pour associer un commit à votre télémétrie et configurer votre dépôt GitHub.

{{< img src="tracing/error_tracking/apm_source_code_integration.png" alt="Configuration de l'Intégration du code source APM" style="width:80%" >}}

### Configuration supplémentaire recommandée {#recommended-additional-setup}
- Pour améliorer les suggestions pour Python en fournissant des valeurs de variables de production réelles à l'Assistant, inscrivez-vous à la [bêta du contexte d'exécution Python][1].
- Pour envoyer des cas de test et des correctifs à votre IDE, cliquez sur {{< ui >}}Apply in VS Code{{< /ui >}} sur toute suggestion générée et suivez la configuration guidée pour installer l'extension Datadog VS Code.

## Mise en route {#getting-started}
1. Accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][4].
2. Cliquez sur n'importe quel problème Error Tracking pour afficher la nouvelle section {{< ui >}}Generate test & fix{{< /ui >}}.

{{< img src="tracing/error_tracking/error_tracking_assistant.png" alt="Error Tracking Assistant" style="width:80%" >}}

## Dépannage {#troubleshooting}

Si vous ne voyez pas de suggestions générées :

1. Assurez-vous que l'[Intégration du code source][2] avec l'intégration GitHub est correctement configurée.
2. Améliorez les suggestions de l'Error Tracking Assistant en vous inscrivant à la [bêta du contexte d'exécution Python][1].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/error_tracking/executional_context
[2]: https://app.datadoghq.com/source-code/setup/apm
[3]: /fr/integrations/guide/source-code-integration
[4]: https://app.datadoghq.com/apm/error-tracking