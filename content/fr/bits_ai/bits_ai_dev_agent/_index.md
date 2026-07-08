---
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-dev-agent/
  tag: Blog
  text: Identifiez automatiquement les problèmes et générez des corrections avec Bits
    Code
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: Blog
  text: Présentation de Bits Code pour la sécurité du code
- link: /account_management/billing/ai_credits/
  tag: Documentation
  text: Crédits IA
title: Bits Code
---
## Aperçu {#overview}

Bits Code est un assistant de codage IA génératif qui utilise les données d'observabilité de Datadog pour diagnostiquer et corriger automatiquement les problèmes dans votre code. Il s'intègre à GitHub pour créer des pull requests prêtes pour la production, puis itère sur les modifications en utilisant les journaux CI et les retours des développeurs.

{{< img src="bits_ai/dev_agent/sessions_overview.png" alt="Un onglet intitulé 'Sessions' affiche un champ de texte avec des suggestions en dessous" style="width:100%;" >}}

Chaque fois que Bits Code examine un problème ou génère une correction, il crée une [session](#sessions), qui capture l'analyse de l'agent, les actions et les modifications de code résultantes à travers les produits Datadog pris en charge. Configurez des [automatisations][28] pour que Bits Code exécute des sessions selon un calendrier ou en réponse à des signaux d'autres produits Datadog, tels qu'un nouvel APM Recommendation ou un flaky test.

Pour commencer avec Bits Code, [configurez l'intégration GitHub][6] et complétez toute configuration supplémentaire. Ensuite, [démarrez votre première session](#start-a-session).

Découvrez comment votre utilisation de Bits Code est facturée sur [Crédits IA][27].

## Sessions {#sessions}
Une session capture un segment de travail avec Bits Code, y compris son analyse et les modifications de code. Démarrez, visualisez et gérez vos sessions à **Bits AI** > **Bits Code** > [**Sessions**][7].

{{< img src="bits_ai/dev_agent/code_fix.png" alt="Une session montrant un résumé de Bits AI et une liste de tâches à gauche et un diff de code à droite" style="width:100%;" >}}

### Démarrer une session {#start-a-session}
Après [avoir complété la configuration][6], faites l'une des actions suivantes pour démarrer une session Bits Code :
- Entrez une invite libre à [**Sessions**][7] : entrez une invite personnalisée ou générez-en une en cliquant sur une carte d'invite suggérée.
- Invoquez Bits Code dans un [produit Datadog pris en charge](#supported-datadog-products)
- Configurez une automatisation Bits Code [automation][28]

Une session peut également être créée lorsqu'un autre agent Bits AI (comme [Bits Chat][16] ou [Bits Investigation][17]) transmet une tâche de codage à Bits Code.

### Voir et gérer les sessions {#view-and-manage-sessions}
Sur **[Sessions][7]**, consultez vos sessions passées dans le panneau **Mes Sessions**. Une session apparaît ici si vous l'avez initiée ou si vous avez interagi avec elle d'une manière ou d'une autre, comme en participant à la conversation ou en créant une PR associée.

Cliquez sur une session pour voir ses détails et continuer à travailler avec Bits Code. Pour retirer une session de votre liste **Mes Sessions**, cliquez sur <i class="icon-archive-wui"></i> (**Archiver pour tout le monde**) ou <i class="icon-eye-slashed-wui"></i> (**Ne plus suivre la session**).

## Produits Datadog pris en charge {#supported-datadog-products}

Bits Code peut suggérer des améliorations de code dans plusieurs produits Datadog, y compris les suivants :

| Produit                   | Capacités                                                       |
|---------------------------|--------------------------------------------------------------------|
| [APM][20]                 | Propose des modifications de code pour les [APM Recommendations][21]|
| [Bits Investigation][17]         | Génère des remédiations de code basées sur les enquêtes Bits |
| [Bits Chat][16]   | Suggère des modifications de code découlant des conversations de Bits Chat |
| [Cloud Cost][22]          | Génère des modifications de code pour les [Cloud Cost Recommendations][23] |
| [Error Tracking][1]       | Diagnostique des problèmes et génère des corrections de code à la demande ou de manière autonome |
| [Code Security][2]        | Remédie aux [SAST vulnerabilities][15], [IaC vulnerabilities][25], et [SCA vulnerabilities][26] (individuellement ou en masse)  |
| [Test Optimization][4]    | Fournit des corrections de code pour les [flaky tests][24] et vérifie que les tests restent stables  |
| [Continuous Profiler][3]  | Fournit des modifications de code pour les insights d'[Automated Analysis][10]   |
| [Containers][12]          | Fournit des modifications de code pour les [Kubernetes Remediations][13]  |

## Principales capacités{#key-capabilities}

### Corrections de code et optimisations mises en évidence par les produits Datadog{#code-fixes-and-optimizations-surfaced-by-datadog-products}

Dans les [produits Datadog pris en charge](#supported-datadog-products), utilisez Bits Code pour mettre en œuvre des optimisations et des corrections – par exemple, [Cloud Cost Recommendations][23], les problèmes de [Error Tracking][1] et les [SAST vulnerabilities][15]. Dans certains produits, [Bits Chat][16] explore et enquête sur les problèmes, puis transmet ses conclusions à Bits Code pour mettre en œuvre un changement de code.

{{< img src="bits_ai/dev_agent/fix_with_bits.png" alt="Un bouton étiqueté avec le texte 'Fix with Bits.'" style="width:25%" >}}

Vous pouvez solliciter manuellement Bits Code pour appliquer des modifications visant à corriger un constat donné, ou configurer une [automation][28] afin qu'il le fasse de manière autonome. 

### Tâches de codage générales {#general-coding-tasks}

Utilisez le champ de saisie libre à [**Sessions**][7] pour travailler avec Bits Code sur des tâches de codage générales.

### Automatisations {#automations}

[Les automatisations][28] exécutent automatiquement des sessions Bits Code, selon un calendrier ou en réponse à des signaux provenant de produits Datadog tels que le Suivi des erreurs, APM ou la Sécurité du code. Après qu'une session soit terminée, Bits Code livre les résultats sous forme de demande de tirage, de brouillon de PR ou de notification Slack.

Vous pouvez créer des automatisations à partir de déclencheurs (un constat de produit, une invite personnalisée, un calendrier ou une combinaison) et configurer une ou plusieurs sorties. Des modèles fournis par Datadog sont également disponibles pour vous aider à démarrer. Créez et gérez des automatisations à **Bits AI** > **Bits Code** > [**Automatisations**][29].

### Collaboration sur les pull requests {#pull-request-collaboration}

Bits Code s'intègre à GitHub pour :
- Créer des pull requests, générant des titres et des descriptions basés sur le modèle de pull request de votre dépôt
- Itérez sur les pull requests en réponse aux commentaires ; mentionnez `@Datadog` dans un commentaire pour demander à Bits des mises à jour
- Surveillez les journaux CI et corrigez les échecs

Bits Code ne fusionne jamais automatiquement les pull requests (PR). Consultez toutes les pull requests (PR) sur lesquelles Bits Code travaille dans **Bits AI** > **Bits Code** > **[Sessions][7]**

## Limitations {#limitations}

- Bits Code est un produit d'IA, ce qui signifie qu'il peut faire des erreurs. Utilisez les meilleures pratiques lors de la révision et des tests du code généré par l'agent.  
- Bits Code ne prend pas en charge les enquêtes multi-dépôts.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/error_tracking
[2]: /fr/security/code_security
[3]: /fr/profiler/
[4]: /fr/tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /fr/bits_ai/bits_ai_dev_agent/setup/
[7]: https://app.datadoghq.com/code
[8]: /fr/bits_ai/bits_ai_sre/
[10]: /fr/profiler/automated_analysis/
[12]: /fr/containers/
[13]: /fr/containers/bits_ai_kubernetes_remediation
[14]: https://app.datadoghq.com/code/settings
[15]: /fr/security/code_security/static_analysis/ai_enhanced_sast/#remediation
[16]: /fr/bits_ai/bits_chat/
[17]: /fr/bits_ai/bits_ai_sre/
[20]: /fr/tracing/
[21]: /fr/tracing/recommendations/
[22]: /fr/cloud_cost_management/
[23]: /fr/cloud_cost_management/recommendations
[24]: /fr/tests/flaky_management#bits-ai-powered-flaky-test-fixes
[25]: /fr/security/code_security/iac_security/
[26]: /fr/security/code_security/software_composition_analysis/
[27]: /fr/account_management/billing/ai_credits/
[28]: /fr/bits_ai/bits_ai_dev_agent/automations/
[29]: https://app.datadoghq.com/code/automations