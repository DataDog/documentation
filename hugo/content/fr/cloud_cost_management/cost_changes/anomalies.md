---
aliases:
- /fr/cloud_cost_management/reporting/anomalies
- /fr/cloud_cost_management/anomalies
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Découvrez Cloud Cost Management.
- link: /cloud_cost_management/cost_changes/monitors
  tag: Monitors
  text: Créez des Cost Monitors
title: Page Anomalies
---
## Présentation {#overview}

Datadog Cloud Cost Management (CCM) surveille en continu votre environnement pour détecter et hiérarchiser les variations de coûts inattendues, ce qui vous permet de partager les anomalies, de les examiner et de les résoudre. Les anomalies de coûts sont disponibles pour AWS, Azure, Google Cloud, Oracle Cloud, Datadog, Anthropic, OpenAI, Cursor, Amazon Bedrock, Vertex AI, Gemini et Databricks et ne nécessitent aucune configuration supplémentaire une fois CCM configuré.

{{< img src="cloud_cost/anomalies/anomalies-overview.png" alt="Liste des anomalies de coûts affichant les noms des services, les types d'utilisation et les impacts sur les coûts" style="width:80;" >}}

Un workflow typique pourrait être le suivant :

1. **Affichez** les anomalies dans l'onglet {{< ui >}}Anomalies{{< /ui >}}
2. **Examinez** les anomalies à l'aide de Watchdog Explains pour comprendre l'origine des variations de coûts
3. **Partagez les anomalies avec les équipes d'ingénierie** qui peuvent agir en examinant les détails, en approfondissant l'analyse ou en mettant en place une surveillance
4. **Résolvez** les anomalies attendues ou peu significatives

## Comment les anomalies sont définies {#how-anomalies-are-defined}

Les anomalies sont des changements significatifs et inattendus qui se distinguent des modèles habituels. Datadog identifie automatiquement les anomalies à l'aide de techniques d'apprentissage automatique qui s'adaptent à vos modèles d'utilisation spécifiques.

Pour distinguer les véritables anomalies des fluctuations attendues, l'algorithme de Datadog :
- Reconnaît les pics et les baisses de coûts récurrents, tels qu'une augmentation des coûts chaque lundi ou un pic le quatrième jour de chaque mois
- Se concentre sur la consommation des équipes d'ingénierie (exclut les taxes, les crédits, les remboursements et les frais de Reserved Instance)
- Filtre les anomalies à faible impact pour réduire le bruit

## Personnalisez la détection des anomalies {#customize-anomaly-detection}

Par défaut, Datadog détecte automatiquement les anomalies de coûts pour chaque fournisseur cloud. Si vous disposez de l'autorisation `cloud_cost_management_write`, vous pouvez personnaliser la façon dont Datadog détecte les anomalies pour chaque fournisseur afin de mieux tenir compte de la structure de coûts de votre organisation. La détection d'anomalies personnalisée est disponible pour AWS, Azure, Google Cloud, Datadog, Oracle Cloud, Anthropic, OpenAI, Cursor, Amazon Bedrock, Vertex AI et Gemini.

Pour personnaliser la détection d'anomalies :

1. Dans l'onglet [{{< ui >}}Anomalies{{< /ui >}}][1], cliquez sur {{< ui >}}Configure{{< /ui >}}.
1. Dans le panneau {{< ui >}}Configure Cost Anomalies{{< /ui >}}, sélectionnez un fournisseur. Une coche indique que le fournisseur utilise des paramètres personnalisés et un cercle vide indique qu'il utilise les paramètres par défaut de Datadog.
1. Ajustez les paramètres suivants pour le fournisseur sélectionné :
   - **Detection dimension** : la dimension sur laquelle Datadog détecte les anomalies de coûts (par exemple, le service ou la description des frais). Ce paramètre est obligatoire.
   - **Minimum daily cost** : le coût quotidien minimum qu'un changement doit atteindre avant d'être signalé comme une anomalie (au moins 5, dans la devise de votre organisation). Augmentez cette valeur pour réduire le bruit provenant des changements à faible coût.
   - **Breakdown tags** : jusqu'à cinq tags supplémentaires utilisés pour ventiler les anomalies détectées, afin d'aider le [Cloud Cost skill dans Bits Chat][5] à identifier ce qui est à l'origine de chaque anomalie. Un ensemble de tags par défaut est toujours inclus et ne peut pas être supprimé.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}. Les modifications s'appliquent aux anomalies détectées à l'avenir.

Pour rétablir les paramètres par défaut de Datadog pour un fournisseur, sélectionnez le fournisseur, cliquez sur {{< ui >}}Revert{{< /ui >}}, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

## Affichez les anomalies de coûts {#view-cost-anomalies}

Sur l'[onglet Anomalies de la page Cloud Cost dans Datadog][1], vous pouvez afficher et filtrer les anomalies :

- {{< ui >}}Active{{< /ui >}} : anomalies du dernier jour complet de données de coût (qui remonte généralement à 2-3 jours).
- {{< ui >}}Past{{< /ui >}} : Anomalies qui ont duré plus de 7 jours ou qui ne sont plus détectées comme anormales. Les anomalies passées peuvent être utiles pour établir des rapports, mais sont souvent moins urgentes et exploitables.
- {{< ui >}}Resolved{{< /ui >}} : anomalies que vous avez marquées comme résolues en fournissant des précisions.

Chaque carte d'anomalie affiche :
- Nom du service (`rds`, par exemple)
- Type d'utilisation
- Comptes cloud affectés
- Coûts prévus par rapport aux coûts réels
- Graphique de tendance des coûts (1 mois écoulé)

Les anomalies sont triées par impact sur les coûts, avec les changements les plus significatifs en haut.

## Examinez les anomalies {#investigate-anomalies}

### Comprenez les causes des anomalies {#understand-what-drives-anomalies}

CCM utilise automatiquement [Watchdog Explains][2], un assistant d'investigation, pour vous aider à identifier ce qui entraîne les anomalies de coûts. Watchdog Explains analyse et identifie les éléments spécifiques suivants :

- comptes
- équipes
- services
- clusters Kubernetes ou ECS
- régions

où l'anomalie s'est produite, ce qui réduit les étapes d'investigation manuelle. En survolant le graphique de l'anomalie, vous pouvez voir deux graphiques : l'un avec et l'autre sans les tags identifiés par Watchdog Explains. Cela montre comment la suppression de tags spécifiques aplatit le pic, ce qui confirme leur impact sur le coût.

### Agissez face aux anomalies {#take-action-on-anomalies}

Suivez ces étapes pour examiner et résoudre les anomalies :

1. Survolez une anomalie pour voir les facteurs à l'origine de l'anomalie ou cliquez sur {{< ui >}}See more{{< /ui >}} pour ouvrir le panneau latéral.

   {{< img src="cloud_cost/anomalies/anomalies-watchdog.png" alt="Cliquez sur See More pour afficher le panneau latéral présentant les détails de l'anomalie, les options d'examen et les boutons d'action" style="width:80;" >}}

1.  Examinez les détails concernant les services affectés, les équipes impliquées, les environnements impactés, les ID de ressource ou la façon dont l'utilisation et le prix unitaire peuvent être à l'origine de l'anomalie de coûts.
1. **Approfondissez l'examen** : Affichez l'anomalie dans Cost Explorer ou dans un Datadog Notebook pour examiner plus en détail les anomalies en utilisant des dimensions supplémentaires. Vous pouvez ensuite envoyer l'anomalie, le lien Explorer ou le Notebook aux propriétaires de service ou aux équipes identifiés par Watchdog Explains. Cela permet aux équipes de résoudre les anomalies en sachant pourquoi elles se sont produites et si elles étaient attendues.

   {{< img src="cloud_cost/anomalies/anomalies-take-action.png" alt="Cliquez sur Take Action pour afficher l'anomalie dans Cost Explorer ou l'ajouter à un Notebook" style="width:80;" >}}
1. **Configurez la surveillance** : créez un monitor d'anomalies de coûts pour des tendances similaires ou configurez des alertes pour les futures anomalies.
   {{< img src="cloud_cost/anomalies/anomalies-create-monitor.png" alt="Créez un monitor d'anomalies de coûts" style="width:80;" >}}

## Résolvez les anomalies {#resolve-anomalies}

Lors de l'examen des anomalies, vous pourriez en trouver certaines qui ne sont pas significatives, qui correspondaient en fait à des coûts attendus ou qui, pour d'autres raisons, ne sont pas considérées comme des anomalies.

Pour résoudre une anomalie :

1. Cliquez sur {{< ui >}}Resolve Anomaly{{< /ui >}} pour ouvrir la fenêtre contextuelle de résolution.
1. Sélectionnez l'une des résolutions suivantes :
   - {{< ui >}}The anomaly amount was too small{{< /ui >}}
   - {{< ui >}}This is an unexpected increase{{< /ui >}}
   - {{< ui >}}This is an expected increase{{< /ui >}}
1. Ajoutez du contexte sur la raison pour laquelle il s'agit ou non d'une anomalie.
1. Cliquez sur {{< ui >}}Resolve{{< /ui >}} pour la déplacer vers l'onglet {{< ui >}}Resolved{{< /ui >}}.

Voici un exemple de la façon de marquer une anomalie de coûts comme significative et d'expliquer pourquoi il s'agit d'une anomalie :

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-unexpected-1.png" alt="Formulaire pour marquer une anomalie comme inattendue avec un champ d'explication" style="width:80;" >}}

## Dépannage {#troubleshooting}

Si vous ne voyez pas les anomalies attendues :
- Vérifiez que CCM est [correctement configuré][3]
- Vérifiez que vous disposez des autorisations nécessaires pour AWS, Azure, Google Cloud ou Oracle Cloud
- Examinez la plage temporelle de votre vue des anomalies

Pour obtenir davantage d'aide, contactez [Datadog Support][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/anomalies
[2]: /fr/dashboards/graph_insights/watchdog_explains
[3]: /fr/cloud_cost_management/setup/
[4]: /fr/help/
[5]: /fr/cloud_cost_management/cloud_cost_skill/