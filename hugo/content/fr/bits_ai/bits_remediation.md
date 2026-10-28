---
aliases:
- /fr/bits_ai/bits_ai_sre/remediate_issues/
- /fr/bits_ai/bits_investigation/remediate_issues/
- /fr/bits_ai/bits_ai_sre/take_action/
- /fr/bits_ai/bits_investigation/take_action/
description: Découvrez comment Bits fournit des étapes de remédiation exploitables
  pour les enquêtes sur les causes profondes.
site_support_id: bits_remediation
title: Bits Remediation
---
{{< callout url="https://www.datadoghq.com/product-preview/bits-remediation/" >}}
  Bits Remediation inclut des fonctionnalités en version préliminaire. Cliquez sur <strong>Request Access</strong> pour rejoindre le programme de version préliminaire.
{{< /callout >}}

## Automatisez les correctifs de code {#automate-code-fixes}

Une fois que Bits vous aide à identifier une cause profonde à partir d'une enquête, il peut également vous aider à agir aussi rapidement que possible.

Bits Investigation s'intègre à [Bits Code][2] pour générer des correctifs de code. Bits se connecte à votre fournisseur de code source pour créer, mettre à jour et itérer sur des pull requests prêtes pour la production, basées sur les problèmes existants détectés par Datadog.

Par défaut, Bits génère automatiquement des correctifs de code pour les enquêtes dont les causes profondes sont liées au code. Pour générer manuellement des correctifs de code à la place, désactivez la génération automatique de correctifs de code dans [Paramètres][3].

Pour commencer à utiliser les correctifs de code :
1. [Set up Bits Code][1]. Une fois que Bits a déterminé une cause profonde liée au code, Bits génère par défaut une suggestion de correctif de code dans Next Steps.
1. Si les correctifs de code automatiques sont désactivés, générez manuellement un correctif de code depuis Next Steps.
1. Discutez avec Bits au cours de la session de code pour mettre à jour le correctif de code suggéré.
1. Créez une pull request pour révision et fusionnez-la lorsque vous êtes prêt.

Avec les correctifs de code activés, vous pouvez boucler la boucle et résoudre les problèmes directement à partir de Bits Investigation.

{{< img src="bits_ai/bits_remediation/suggested_code_fix.png" alt="Arborescence d'hypothèses de Bits Investigation montrant une conclusion de cause profonde avec un correctif de code suggéré et d'autres Next Steps." style="width:100%;" >}}

## Exécutez des actions de triage {#run-triage-actions}

Depuis le chat, vous pouvez déclencher des actions de triage sans quitter le workflow d'enquête.

Les actions prises en charge incluent :
- Envoi de messages Slack et Microsoft Teams
- Création d'incidents dans Datadog et PagerDuty
- Appel d'ingénieurs via Datadog On-Call
- Création d'éléments de travail dans Datadog Work Management
- Ouverture de tickets Jira

Bits peut extraire le contexte pertinent de l'investigation et de vos intégrations connectées pour préremplir les messages, les descriptions d'incidents et les métadonnées des tickets. Cela réduit l'effort manuel, aide à garantir la cohérence et accélère le temps de réponse.

## Agissez sur votre infrastructure {#take-action-on-your-infrastructure}

{{< callout >}} Les actions en un clic sont en Preview. {{< /callout >}}

Pour les problèmes liés à l'infrastructure, Bits peut recommander une action de remédiation, telle que la mise à l'échelle d'un déploiement, le redémarrage d'un pod ou l'application d'un patch à une ressource.

- **Recommandations manuelles** : Copiez la commande suggérée (par exemple, une commande `kubectl patch`) et exécutez-la dans votre propre interface de ligne de commande.
- **One-click actions (Preview)** : Cliquez sur **Run** pour laisser Bits exécuter l'action de remédiation suggérée directement depuis le contexte de l'investigation.

{{< img src="bits_ai/bits_remediation/one_click_action.png" alt="Une action de remédiation suggérée avec des instructions pour redémarrer un déploiement et un bouton Run." style="width:100%;" >}}

Les actions Kubernetes sont prises en charge en Preview. Consultez le [Action Catalog][4] pour obtenir la liste complète des actions prises en charge et savoir comment les activer dans Datadog.

Pour exécuter des actions Kubernetes en un clic, votre organisation a besoin de :
- Un [Private Action Runner][5] avec un accès réseau à votre cluster Kubernetes, associé à une [connexion][6] à l'intégration Kubernetes.
- Un rôle utilisateur avec l'autorisation d'exécuter des actions et de résoudre la connexion Kubernetes.

## Déterminez comment Bits prend des mesures de remédiation{#govern-how-bits-takes-remediation-action}

{{< callout >}} Bits Guardrails sont en Preview.{{< /callout >}}

[Bits Guardrails][8] permettent aux administrateurs de définir les actions de remédiation que Bits peut entreprendre, où ces actions s'appliquent et qui doit les approuver.

Les garde-fous nécessitent les autorisations `Guardrails Read` et `Guardrails Write`, qui peuvent être activées dans [Organizational Settings > Roles][7]. 

Pour créer un garde-fou :
1. **Choisir les actions à cibler** : Sélectionnez une ou plusieurs actions disponibles pour une intégration (par exemple, Kubernetes) que le garde-fou doit cibler.
1. **Définir le périmètre du garde-fou** : Spécifiez l'environnement, le service et les tags de ressource auxquels le garde-fou s'applique.
1. **Définir le niveau d'application** : Pour les actions et le périmètre sélectionnés, décidez quand Bits peut agir.
    - **Ask** : Nécessite l'approbation de l'utilisateur avant que Bits n'exécute des actions. Choisissez quelles équipes, quels rôles ou quelles personnes peuvent approuver.
    - **Deny** : Bits peut recommander une action mais ne peut pas l'exécuter.

## Valider que les problèmes sont résolus {#validate-that-issues-are-resolved}

Bits peut vérifier si une action de remédiation a été appliquée avec succès et si le problème initial a été résolu. Cliquez sur **Verify Resolution** pour valider le statut de l'action de remédiation et du problème.

[1]: /fr/bits_ai/bits_code/setup/
[2]: /fr/bits_ai/bits_code
[3]: https://app.datadoghq.com/bits-ai/settings/source-code-integration
[4]: /fr/actions/actions_catalog/
[5]: /fr/actions/private_actions/
[6]: /fr/actions/connections/
[7]: https://app.datadoghq.com/organization-settings/roles
[8]: https://app.datadoghq.com/bits-ai/settings/remediation-guardrails