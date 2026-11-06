---
aliases:
- /fr/llm_observability/cluster_map
- /fr/llm_observability/monitoring/cluster_map
- /fr/llm_observability/investigate/cluster_map
- /fr/llm_observability/monitoring/patterns/
description: Découvrez et analysez les schémas de trafic de production dans votre
  agent grâce au regroupement automatique par Patterns.
further_reading:
- link: /llm_observability/
  tag: Documentation
  text: En savoir plus sur Agent Observability.
- link: /llm_observability/quickstart/terms/
  tag: Documentation
  text: En savoir plus sur les termes et concepts clés d'Agent Observability.
- link: /llm_observability/improve/datasets
  tag: Documentation
  text: En savoir plus sur les jeux de données
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centre d'apprentissage
  text: Enquêter avec le LLM Observability
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: Centre d'apprentissage
  text: Traçage des applications LLM
- link: https://www.datadoghq.com/blog/patterns-agent-observability/
  tag: Blog
  text: Comprendre le comportement des LLM en production avec Patterns dans Agent
    Observability.
title: Patterns
---
## Présentation {#overview}

Patterns regroupe automatiquement le trafic de production de votre application LLM en sujets significatifs, vous aidant à comprendre ce que demandent les utilisateurs, à identifier les lacunes de couverture et à diagnostiquer les modes de défaillance.

Vous pouvez créer plusieurs Patterns nommés, chacun restreint à une application, à un type de span ou à un cas d'utilisation différent.

## Fonctionnement {#how-it-works}

Patterns utilise une combinaison d'appels à votre [connected LLM provider account][1] et de text embeddings pour vous offrir une vue interprétable du comportement en production sans étiquetage manuel.

Lorsqu'un Pattern est exécuté, il :

1. Extrait les interactions LLM de votre trafic de production en fonction de votre configuration de filtrage et d'échantillonnage
2. Résume chaque interaction avec du texte généré par IA
3. Calcule le text embedding de ces résumés à l'aide d'un modèle open source auto-hébergé.
4. Forme des clusters à l'aide de l'apprentissage automatique (UMAP et HDBSCAN)
5. Examine chaque cluster et génère des sujets significatifs avec du texte généré par IA
6. Attribue chaque interaction à un seul sujet
7. Construit une hiérarchie à l'aide de l'IA en regroupant les sujets similaires

Chaque sujet affiche son volume d'interactions et sa part du trafic total. Les interactions qui ne correspondent à aucun cluster sont collectées dans un groupe de valeurs aberrantes.

## Configurer un Pattern {#set-up-a-pattern}

1. Dans Datadog, accédez à **AI Observability** > **Agent Observability** > [**Patterns**][4].
1. Cliquez sur **+ New Pattern**.
1. Saisissez un **Name**.
1. Utilisez le sélecteur multiple **Application** pour choisir une ou plusieurs applications LLM pour lesquelles inclure des spans. La sélection d'applications met automatiquement à jour la requête de filtre de span sous-jacente, et la modification de la requête met à jour les applications sélectionnées.
1. Sous **Configuration** :
  1. Sélectionnez ce que vous souhaitez **Analyser** avec Patterns, des **Spans** individuels ou des **Traces**.
  1. (Facultatif) Rédigez une courte **Instruction de clustering** pour fournir des conseils libres sur la manière dont Patterns doit regrouper les interactions et générer des sujets, tels que l'intention de l'utilisateur, la tâche de l'agent ou le produit utilisé. Par exemple, pour regrouper selon l'intention de l'utilisateur, vous pouvez écrire « Cluster based on the user intent ». Modifier ce champ après une première exécution réussie **supprimera les sujets trouvés et conservés** lors des exécutions précédentes de Patterns. Laissez ce champ vide pour regrouper les interactions par objectif principal de chaque interaction.
  1. Sélectionnez les variables de votre interaction sur lesquelles vous souhaitez que Patterns **effectue le clustering**. Utilisez `{{variable}}` syntax to reference any span field; for example, `{{meta.input.value}}` to analyze patterns by user input, or `{{meta.span.kind}}` à analyser par type de span.
  1. Ajoutez des **Filtres** précis pour mieux sélectionner les interactions que vous souhaitez regrouper avec Patterns.
  1. Définissez la **Fenêtre temporelle** pour déterminer la période de rétrospection des interactions à analyser.
  1. **L'échantillonnage** des interactions correspondantes est accessible en cliquant sur le bouton **Change**. Il est limité à 10 000 spans et 5 000 traces. Si votre filtre correspond à un nombre supérieur, Agent Observability échantillonne aléatoirement les interactions jusqu'à atteindre ce nombre. 
  1. Cliquez sur **Select a model**. La fenêtre de configuration du Model s'ouvre, où vous pouvez ajouter des détails qu'Agent Observability utilise pour générer des noms de sujets, des résumés, une hiérarchie de sujets et pour attribuer chaque interaction à un sujet :
    - **Fournisseur LLM** : Les fournisseurs pris en charge sont OpenAI, Anthropic, Amazon Bedrock, Azure OpenAI et Vertex AI.
    - **Compte**
    - **Modèle** : Préférez l'utilisation des modèles recommandés et étiquetés, pour des exigences de performance et de coût.
    Cliquez sur **Confirm** pour enregistrer vos modifications et fermer la fenêtre.
1. (Facultatif) Sous **Jeux de données** :
  1. Activez le bouton radio pour comparer votre trafic de production avec vos jeux de données d'évaluation hors ligne.
  1. Utilisez le sélecteur **Jeux de données** pour sélectionner le ou les jeux de données que vous utilisez pour évaluer votre agent IA hors ligne.
  1. (Facultatif) Activez le bouton radio **Automatic curation** pour combler automatiquement les lacunes de couverture détectées par Patterns. Une fois activé, Datadog crée un projet géré (`Patterns-coverage`) et un Dataset par Pattern (`{pattern-name}-pattern-curated`) pour recevoir les interactions suggérées après chaque exécution. Le commutateur est **activé** par défaut pour les nouveaux Patterns. 
1. Sous **Planification**, choisissez la fréquence d'exécution du Pattern. Les heures planifiées utilisent votre préférence de fuseau horaire Datadog. Les exécutions planifiées utilisent le même pipeline qu'une exécution manuelle, les résultats apparaissent donc au même endroit, et la page Patterns affiche toujours votre exécution la plus récente.
   - **Quotidien**, **Jours de semaine**, ou **Hebdomadaire (Par défaut)** : Exécutez automatiquement à une heure (et, pour hebdomadaire, un jour) que vous choisissez.
   - **À la demande** : Exécutez le Pattern manuellement.
   - **Personnalisé** : exécutez automatiquement tous les 1 à 7 jours.
1. Sous **Notifications** Entrez les e-mails et/ou les intégrations de messagerie externe que vous avez activés dans Datadog (voir [**Intégrations**][5] pour activer les intégrations externes dans Datadog) pour être averti lorsque les résultats des Patterns sont disponibles.
1. Cliquez sur **Créer et exécuter le Pattern**, ou **Créer le Pattern** pour le créer sans l'exécuter.

## Explorez vos Patterns {#explore-your-patterns}

Utilisez le menu déroulant dans l'en-tête pour basculer entre vos Patterns nommés. Chaque Pattern affiche les résultats de sa plus récente exécution.

### Lisez les métriques récapitulatives {#read-the-summary-metrics}

Le haut de la page Patterns affiche trois métriques issues de votre plus récente exécution :
- {{< ui >}}Total interactions{{< /ui >}} : Combien d'interactions ont été analysées ?
- {{< ui >}}Identified topics{{< /ui >}} : Le nombre total de sujets distincts trouvés, incluant les sujets parents et enfants
- {{< ui >}}Classified{{< /ui >}} : Le pourcentage d'interactions analysées attribuées à un sujet nommé — les interactions dans les Outliers sont comptabilisées comme non classées

### Visualiser les Patterns par dimension {#visualize-patterns-by-dimension}

Au-dessus du tableau des sujets, un nuage de points compare vos Patterns les uns aux autres. Chaque bulle représente un sujet, l'axe Y indiquant le nombre d'interactions et l'axe X indiquant la métrique sélectionnée dans le menu déroulant Dimension (par exemple, le nombre total d'erreurs). Utilisez ce graphique pour repérer les Outliers — les sujets présentant des taux d'erreur ou une latence anormalement élevés par rapport à leur volume.

{{< img src="llm_observability/patterns_landing_page.png" alt="La page Patterns affichant un graphique à bulles avec une bulle par sujet. L'axe Y affiche le nombre d'interactions et l'axe X affiche la dimension métrique sélectionnée." style="width:100%;" >}}

### Naviguer dans la liste des sujets {#navigate-the-topic-list}

Le tableau des sujets fournit une vue hiérarchique de tous les sujets découverts. Chaque sujet affiche :

- {{< ui >}}Pattern{{< /ui >}} — nom et description générés automatiquement en fonction des interactions dans le cluster
- {{< ui >}}Interactions{{< /ui >}} — nombre et pourcentage du trafic total
- {{< ui >}}Cost{{< /ui >}} — coût LLM estimé pour les interactions dans ce sujet
- {{< ui >}}Tokens{{< /ui >}} — utilisation des jetons pour les interactions dans ce sujet
- {{< ui >}}Errors{{< /ui >}} — nombre et taux d'erreurs
- {{< ui >}}Latency{{< /ui >}} — latence médiane pour les interactions dans ce sujet
- {{< ui >}}Evaluations{{< /ui >}} — résultats d'évaluation si des évaluateurs en ligne sont configurés
 

Développez les sujets parents pour voir leurs sous-sujets et examiner des zones spécifiques du trafic de votre application.

### Approfondir un sujet {#drill-into-a-topic}

Cliquez sur n'importe quel nom de sujet pour ouvrir sa vue détaillée. Utilisez le fil d'Ariane ou cliquez sur un nœud dans le {{< ui >}}Topic Map{{< /ui >}} pour naviguer dans la hiérarchie des sujets. La carte met en évidence la branche sélectionnée et affiche le nombre d'interactions de chaque sujet et, lorsqu'il est disponible, le changement de trafic depuis la précédente exécution.

{{< img src="llm_observability/patterns_topic_details.png" alt="La vue détaillée du sujet montrant un résumé du pattern et une carte interactive des sujets avec les nombres d'interactions et les changements de trafic." style="width:100%;" >}}

La vue détaillée comprend :

- {{< ui >}}Pattern Summary{{< /ui >}} : Met en évidence les tendances du trafic, l'état de santé de l'évaluation en ligne, les valeurs aberrantes opérationnelles, les lacunes de couverture des jeux de données et les prochaines étapes recommandées.
- {{< ui >}}Scorecard{{< /ui >}} : Résume le volume et la part du trafic, le coût, le taux d'erreur, la latence médiane et la couverture des jeux de données.
- {{< ui >}}Dataset Coverage Detail{{< /ui >}} : Affiche le statut de couverture et l'attribution par jeu de données. Examinez les cas recommandés pour combler les lacunes de couverture, ou ouvrez le jeu de données géré lorsque la curation automatique des jeux de données est activée.
- {{< ui >}}Evaluations{{< /ui >}} : Résume chaque évaluateur en ligne avec son résultat clé et un graphique dans le temps. Ouvrez les spans correspondants pour étudier des résultats spécifiques.
- {{< ui >}}Interactions{{< /ui >}} : Liste les entrées et sorties assignées au sujet, ainsi que leur sous-sujet, horodatage, statut de recommandation et résultats d'évaluation. Filtrez avec une requête en texte intégral ou à facettes, configurez les colonnes d'évaluation, ou cliquez sur une ligne pour ouvrir les détails de sa trace.

{{< img src="llm_observability/patterns_topic_details_scorecard.png" alt="La vue détaillée du sujet montrant la fiche d'évaluation, les détails de couverture des jeux de données et le tableau des interactions." style="width:100%;" >}}

### Exporter et agir sur les interactions {#export-and-act-on-interactions}
Sélectionnez une ou plusieurs lignes dans le tableau des interactions pour agir sur ces interactions :

- **Télécharger au format CSV :** Exporter les interactions sous forme de fichier CSV.
- **Ajouter au Dataset:** Envoyer les interactions vers un [Dataset][2] pour créer des cas de test d'évaluation à partir du trafic de production réel.
- **Ajouter à la file d'attente:** Envoyer les interactions vers un [Annotation Queue][3] pour examen et étiquetage par un humain.

## Déclencher une nouvelle exécution {#trigger-a-new-run}

Pour analyser votre trafic de production, cliquez sur {{< ui >}}Run analysis{{< /ui >}} dans l'en-tête Patterns. Le pipeline s'exécute en arrière-plan et affiche ses étapes terminées, en cours et en attente. Une exécution prend environ 5 à 10 minutes. Cliquez sur **Notify me** pour être averti par e-mail une fois que le pipeline est terminé. Vous pouvez fermer la page et revenir plus tard — l'en-tête affiche la date de la dernière exécution et la période de rétrospection une fois l'exécution terminée.

Si une exécution échoue, une fenêtre modale explique la cause et l'action à entreprendre. La page continue d'afficher les résultats de la dernière exécution réussie tandis que l'exécution ayant échoué est indiquée dans l'en-tête.

## Utilisez les sujets pour améliorer votre application {#use-topics-to-improve-your-application}

### Comprenez votre trafic de production {#understand-your-production-traffic}

Utilisez la liste des sujets pour voir ce que les utilisateurs font réellement avec votre application.

Utilisez le pourcentage de trafic pour identifier vos cas d'utilisation les plus courants. La hiérarchie parent-enfant vous aide à passer d'un Pattern de haut niveau aux sub-patterns spécifiques.

### Identifiez les lacunes de couverture de l'évaluation {#find-evaluation-coverage-gaps}

Comparez la répartition de vos sujets avec ce que couvrent réellement vos jeux de données de référence. Examinez les sujets qui représentent un volume de production élevé mais qui ne disposent d'aucun cas d'évaluation correspondant : c'est là que votre couverture de test présente des lacunes, et là où les régressions du modèle sont le moins susceptibles d'être détectées avant d'atteindre les utilisateurs.

### Organisez automatiquement les jeux de données d'évaluation {#automatically-curate-evaluation-datasets}

Lorsque la curation automatique des jeux de données est activée, chaque exécution de Patterns ajoute des suggestions d'interactions pour les sujets insuffisamment couverts directement dans un jeu de données géré (`{pattern-name}-pattern-curated` dans le projet `Patterns-coverage`). Une fois l'exécution terminée, ouvrez la vue détaillée d'un sujet et cliquez sur **Access dataset** pour examiner les enregistrements organisés et les utiliser comme cas de test d'évaluation.

### Diagnostiquez les modèles de défaillance {#diagnose-failure-patterns}

Définissez le filtre de votre Pattern sur les spans ayant des scores de qualité médiocres ou des évaluations ayant échoué, puis lancez l'analyse. La taxonomie des sujets qui en résulte montre quels types de requêtes échouent le plus, vous offrant un moyen structuré de prioriser les correctifs au lieu de déboguer trace par trace.

### Suivez l'évolution du trafic {#track-how-traffic-evolves}

Relancez votre Pattern périodiquement et utilisez le menu déroulant {{< ui >}}Compare to{{< /ui >}} pour comparer les répartitions des sujets entre les exécutions. Lorsqu'un sujet marqué {{< ui >}}NEW{{< /ui >}} apparaît près du haut, cela indique que vos utilisateurs ont trouvé un nouveau cas d'utilisation ou un nouveau mode de défaillance.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account/
[2]: /fr/llm_observability/improve/datasets/
[3]: /fr/llm_observability/investigate/annotation_queues/
[4]: https://app.datadoghq.com/llm/patterns
[5]: /fr/integrations/#cat-notifications