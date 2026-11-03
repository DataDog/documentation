---
description: Agent Observability Insights identifie les problèmes récurrents de coût
  et de fiabilité dans les traces existantes et recommande des correctifs.
further_reading:
- link: /llm_observability/investigate/cost/
  tag: Documentation
  text: Surveiller les coûts des LLM
- link: /llm_observability/investigate/evaluations/
  tag: Documentation
  text: Évaluer vos applications LLM
- link: /llm_observability/build_with_ai/mcp_server/
  tag: Documentation
  text: Connecter des agents IA à Agent Observability
title: Insights
---
## Présentation {#overview}

Agent Observability Insights analyse automatiquement les traces qu'Agent Observability reçoit de votre application pour trouver les problèmes récurrents de coût et de fiabilité. Utilisez Insights pour hiérarchiser ce qui doit être corrigé sans examiner les traces une par une.

Chaque insight comprend :

- Une cause profonde qui décrit le comportement récurrent
- Une évaluation de l'impact basée sur les appels ou sessions affectés
- Des preuves de trace et de span qui étayent la conclusion
- Un correctif recommandé et un moyen de le valider

<div class="alert alert-info">Les Insights ne nécessitent aucune configuration supplémentaire. Datadog analyse les traces que votre application a déjà envoyées à Agent Observability.</div>

## Fonctionnement d'Insights {#how-insights-works}

Datadog analyse les traces récentes sur plusieurs appels ou sessions pour identifier les problèmes récurrents de coût et de fiabilité. Il vérifie le comportement attendu, tel que les tentatives réussies ou les réponses longues requises par la tâche.

Datadog regroupe les conclusions ayant la même cause profonde dans un insight. Les analyses ultérieures mettent à jour l'insight et le résolvent automatiquement lorsque le problème n'apparaît plus. Si le problème réapparaît, Datadog le signale à nouveau.

### Types d'insights {#insight-types}

| Catégorie | Type d'insight | Ce qu'il identifie |
|---|---|---|
| Coût | Mise en cache inefficace des prompts | Contenu de prompt réutilisable qui manque le cache du fournisseur et augmente le coût des jetons d'entrée. |
| Coût | Résultats d'outils volumineux | Résultats d'outils qui ajoutent du contenu inutile aux requêtes ultérieures du modèle et augmentent l'utilisation des jetons ou la pression sur le contexte. |
| Coût | Sortie de modèle verbeuse | Réponses ou raisonnements du modèle qui utilisent plus de jetons de sortie que la tâche ne l'exige. |
| Fiabilité | Boucles de nouvelle tentative d'appel d'outil | Appels répétés au même outil qui utilisent des arguments presque identiques et ne progressent pas. |
| Fiabilité | Violations des règles de prompt | Comportement de l'Agent qui enfreint une règle explicite dans une description de prompt, de compétence ou d'outil. |

## Comprendre l'impact et les preuves {#understand-impact-and-evidence}

Selon le type, un Insight de coût affiche les dépenses récupérables estimées ou le coût exact du travail du modèle qui n'a pas produit de résultat utilisable. Les Insights de fiabilité affichent les appels ou sessions confirmés affectés par le problème.

Ouvrez les traces et les spans associés pour comparer les preuves avec la cause première indiquée. Le fil d'investigation montre les étapes et les preuves justificatives qui ont conduit à ce constat.

## Examiner et agir sur les insights {#review-and-act-on-insights}

1. Dans Datadog, accédez à [**AI Observability > Agent Observability > Insights**][1].
2. Utilisez la vue d'ensemble et les filtres pour hiérarchiser les Insights par application, type, gravité, statut ou impact.
3. Ouvrez un Insight pour examiner la constatation.
4. Appliquez et validez le correctif recommandé. Vous pouvez utiliser **Fix with Bits** ou un agent de codage compatible MCP. Avec un accès en lecture et écriture à Work Management, vous pouvez également créer ou lier un ticket Jira ou un problème Linear.
5. Définissez le statut sur **For Review**, **In Progress**, **Completed** ou **Ignored** pour enregistrer votre décision. Datadog définit le statut sur **Automatically Resolved** lorsque l'analyse ultérieure ne détecte plus le problème.

Les Insights apparaissent sur la page de présentation d'une application. Les Cost Insights apparaissent également sur la page **Coût** à côté des dépenses associées.

## Utilisez les Insights avec un agent de codage {#use-insights-with-a-coding-agent}

Connectez le [Datadog MCP Server][2] à un agent de codage compatible MCP. L'agent peut récupérer la cause première, les preuves, le correctif recommandé et les conseils de validation d'un insight pour mettre en œuvre et tester une modification.

### Automatisez l'examen et la correction des insights {#automate-insight-reviews-and-fixes}

Configurez un workflow récurrent dans votre agent de codage pour examiner et corriger les insights. Exemple :

```text
Use Datadog MCP to list Agent Observability insights with status `for_review` for `<ML_APP>`. Prioritize the returned Insights by severity. For each Insight, review the evidence, implement and validate the recommended fix, and update the insight status based on the result.
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/insights
[2]: /fr/llm_observability/build_with_ai/mcp_server/