---
aliases:
- /fr/llm_observability/cluster_map
- /fr/llm_observability/monitoring/cluster_map
description: Découvrez et analysez les modèles de trafic de production dans votre
  agent grâce au regroupement automatique par sujets.
further_reading:
- link: /llm_observability/
  tag: Documentation
  text: En savoir plus sur Agent Observability
- link: /llm_observability/terms/
  tag: Documentation
  text: En savoir plus sur les termes et concepts clés de Agent Observability
- link: /llm_observability/experiments/datasets
  tag: Documentation
  text: En savoir plus sur les jeux de données
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centre d'apprentissage
  text: Enquêter avec le LLM Observability
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: Centre d'apprentissage
  text: Traçage des applications LLM
title: Patterns
---
## Présentation {#overview}

Patterns regroupe automatiquement le trafic de production de votre application LLM en sujets significatifs, vous aidant à comprendre ce que demandent les utilisateurs, à identifier les lacunes de couverture et à diagnostiquer les modes de défaillance.

Vous pouvez créer plusieurs Patterns nommés, chacun étant limité à une application, un type d'étendue ou un cas d'utilisation différent.

## Fonctionnement {#how-it-works}

Patterns utilise une combinaison d'appels à votre [compte de fournisseur LLM connecté][1] et de plongements de texte pour vous offrir une vue interprétable du comportement en production sans étiquetage manuel.

Lorsque vous exécutez un Pattern, il :

1. Extrait les interactions LLM de votre trafic de production en fonction de votre configuration de filtrage et d'échantillonnage
2. Résume chaque interaction avec du texte généré par IA
3. Calcule le plongement de texte de ces résumés à l'aide d'un modèle open source auto-hébergé
4. Forme des clusters à l'aide de l'apprentissage automatique (UMAP et HDBSCAN)
5. Examine chaque cluster et génère des sujets significatifs avec du texte généré par IA
6. Attribue chaque interaction à un seul sujet
7. Construit une hiérarchie à l'aide de l'IA en regroupant les sujets similaires

Chaque sujet affiche son volume d'interactions et sa part du trafic total. Les interactions qui ne correspondent à aucun cluster sont regroupées dans un groupe Valeurs aberrantes.

## Configurer un Pattern {#set-up-a-pattern}

1. Dans Datadog, accédez à **AI Observability** > **Agent Observability** > [**Patterns**][4].
1. Cliquez sur **+ Nouveau Pattern**.
1. Saisissez un **Nom**.
1. Cliquez sur **Sélectionner un Pattern**. La fenêtre de configuration du modèle s'ouvre, où vous pouvez ajouter des détails qu'Agent Observability utilise pour générer des noms de sujets, des résumés, une hiérarchie de sujets et pour attribuer chaque interaction à un sujet :
   - **Fournisseur LLM** : Les fournisseurs pris en charge sont OpenAI, Amazon Bedrock et Azure OpenAI
   - **Compte**
   - **Modèle**
1. Cliquez sur **Confirmer** pour enregistrer vos modifications et fermer la fenêtre.
1. Sous **S'exécute sur** :
   1. Utilisez le sélecteur multiple **Application** pour choisir une ou plusieurs applications LLM pour lesquelles inclure des spans. La sélection d'applications met automatiquement à jour la requête de filtre de span sous-jacente, et la modification de la requête met à jour les applications sélectionnées. Pour une définition de périmètre plus précise, cliquez sur l'icône de filtre à côté du sélecteur pour ouvrir la fenêtre contextuelle **Avancé**, qui expose :
      - **Quels spans souhaitez-vous regrouper ?** La requête brute de filtre de span pour définir le périmètre par environnement, type de span ou autres tags.
      - **Fenêtre temporelle :** La période de rétrospection pour les interactions à analyser.
   1. Définissez le **Taux d'échantillonnage** : Le pourcentage d'interactions correspondantes à inclure. Patterns traite jusqu'à 10 000 enregistrements par exécution ; si votre filtre en fait correspondre davantage, Agent Observability échantillonne aléatoirement les enregistrements jusqu'à atteindre ce nombre.
1. Sous **Sur quoi devons-nous détecter les Patterns ?**, saisissez un modèle qui définit ce qui est envoyé au modèle pour analyse. Utilisez `{{variable}}` syntax to reference any span field; for example, `{{meta.input.value}}` to analyze patterns by user input, or `{{meta.span.kind}}` pour analyser par type de span. Cliquez sur {{< ui >}}Template Examples{{< /ui >}} pour voir les configurations courantes. À mesure que vous tapez, le panneau de droite prévisualise les spans correspondants et indique le pourcentage d'interactions ayant des valeurs pour les variables que vous avez référencées.
1. Sous **À quelle fréquence devons-nous exécuter les Patterns ?**, choisissez comment le Pattern s'exécute. Les exécutions planifiées utilisent votre préférence de fuseau horaire Datadog. Les exécutions planifiées utilisent le même pipeline qu'une exécution manuelle ; les résultats apparaissent donc au même endroit et la page Patterns affiche toujours votre exécution la plus récente.
   - **À la demande** (par défaut) : exécutez le Pattern manuellement.
   - **Quotidien**, **En semaine** ou **Hebdomadaire** : exécutez automatiquement à l'heure (et, pour l'hebdomadaire, le jour) de votre choix.
   - **Personnalisé** : exécutez automatiquement tous les 1 à 7 jours.
1. Cliquez sur **Créer et exécuter le Pattern** ou sur **Créer le Pattern** pour le créer sans l'exécuter.

## Explorer vos Patterns {#explore-your-patterns}

Utilisez le menu déroulant dans l'en-tête pour basculer entre vos Patterns nommés. Chaque Pattern affiche les résultats de sa plus récente exécution.

### Lire les métriques récapitulatives {#read-the-summary-metrics}

Le haut de la page Patterns affiche trois métriques issues de votre plus récente exécution :
- {{< ui >}}Total interactions{{< /ui >}} : nombre d'interactions analysées
- {{< ui >}}Identified topics{{< /ui >}} : nombre total de sujets distincts trouvés, incluant les sujets parents et enfants
- {{< ui >}}Classified{{< /ui >}} : Le pourcentage d'interactions analysées attribuées à un sujet nommé — les interactions dans les Outliers sont comptabilisées comme non classées

### Visualisez les modèles par dimension {#visualize-patterns-by-dimension}

Au-dessus du tableau des sujets, un nuage de points compare vos modèles les uns aux autres. Chaque bulle représente un sujet, l'axe Y indiquant le nombre d'interactions et l'axe X indiquant la métrique sélectionnée dans la liste déroulante Dimension (par exemple, le total des erreurs). Utilisez ce graphique pour repérer les Outliers — les sujets présentant des taux d'erreur ou une latence anormalement élevés par rapport à leur volume.

{{< img src="llm_observability/patterns_landing_page.png" alt="La page modèles affichant un graphique à bulles avec une bulle par sujet. L'axe Y indique le nombre d'interactions et l'axe X indique la dimension métrique sélectionnée." style="width:100%;" >}}

### Naviguez dans la liste des sujets {#navigate-the-topic-list}

Le tableau des sujets fournit une vue hiérarchique de tous les sujets découverts. Chaque sujet affiche :

- {{< ui >}}Pattern{{< /ui >}} — nom et description générés automatiquement en fonction des interactions dans le cluster
- {{< ui >}}Interactions{{< /ui >}} — nombre et pourcentage du trafic total
- {{< ui >}}Cost{{< /ui >}} — coût LLM estimé pour les interactions dans ce sujet
- {{< ui >}}Tokens{{< /ui >}} — utilisation des jetons pour les interactions dans ce sujet
- {{< ui >}}Errors{{< /ui >}} — nombre et taux d'erreurs
- {{< ui >}}Latency{{< /ui >}} — latence médiane pour les interactions dans ce sujet
- {{< ui >}}Online Evals{{< /ui >}} — résultats d'évaluation si des évaluations en ligne sont configurées
 

Développez les sujets parents pour voir leurs sous-sujets et examiner des zones spécifiques du trafic de votre application.

### Approfondir un sujet {#drill-into-a-topic}

Cliquez sur n'importe quel nom de sujet pour ouvrir la vue détaillée. La vue détaillée affiche un résumé de ce que représente le sujet, le nombre total d'interactions et un tableau des interactions avec l'étiquette du sujet enfant, le texte saisi et l'horodatage pour chaque interaction. Recherchez dans le tableau par mot-clé pour trouver des exemples spécifiques.


{{< img src="llm_observability/patterns_topic_details.png" alt="La vue détaillée du sujet affiche un résumé du sujet, le nombre total d'interactions et un tableau des interactions avec l'étiquette du sujet enfant, le texte saisi et l'horodatage." style="width:100%;" >}}

### Exporter et agir sur les interactions {#export-and-act-on-interactions}
Depuis le tableau des interactions dans la vue détaillée d'un sujet, vous pouvez agir sur les interactions de ce cluster :

- **Télécharger au format CSV :** Exporter les interactions sous forme de fichier CSV.
- **Ajouter au jeu de données :** Envoyer les interactions vers un [Jeu de données][2] pour créer des cas de test d'évaluation à partir du trafic de production réel.
- **Ajouter à la file d'attente :** Envoyer les interactions vers une [File d'attente d'annotation][3] pour examen et étiquetage par un humain.

## Déclencher une nouvelle exécution {#trigger-a-new-run}

Pour analyser votre trafic de production, cliquez sur {{< ui >}}Run analysis{{< /ui >}} dans l'en-tête Patterns. Le pipeline s'exécute en arrière-plan et prend de 5 à 10 minutes. Vous pouvez fermer la page et revenir plus tard — l'en-tête affiche la date de la dernière exécution et la période de rétrospection une fois l'exécution terminée.

Si une exécution échoue, une fenêtre modale explique la cause et l'action à entreprendre. La page continue d'afficher les résultats de la dernière exécution réussie tandis que l'exécution ayant échoué est indiquée dans l'en-tête.

## Utilisez les sujets pour améliorer votre application {#use-topics-to-improve-your-application}

### Comprenez votre trafic de production {#understand-your-production-traffic}

Utilisez la liste des sujets pour voir ce que les utilisateurs font réellement avec votre application.

Utilisez le pourcentage de trafic pour identifier vos cas d'utilisation les plus courants. La hiérarchie parent-enfant vous aide à passer d'un modèle de haut niveau aux sous-modèles spécifiques sous-jacents.

### Identifiez les lacunes de couverture de l'évaluation {#find-evaluation-coverage-gaps}

Comparez votre distribution de sujets avec ce que couvrent réellement vos jeux de données de référence. Examinez les sujets qui représentent un volume de production élevé mais qui n'ont pas de cas d'évaluation correspondants : c'est là que votre couverture de test présente des lacunes, et là où les régressions du modèle sont les moins susceptibles d'être détectées avant d'atteindre les utilisateurs.

### Diagnostiquez les modèles d'échec {#diagnose-failure-patterns}

Limitez le filtre de votre Pattern aux spans présentant des scores de qualité faibles ou des évaluations échouées, puis exécutez l'analyse. La taxonomie de sujets résultante montre quels types de requêtes échouent le plus, vous offrant un moyen structuré de prioriser les correctifs au lieu de déboguer trace par trace.

### Suivez l'évolution du trafic {#track-how-traffic-evolves}

Relancez votre Pattern périodiquement et utilisez le {{< ui >}}Compare to{{< /ui >}} dropdown pour comparer les distributions de sujets entre les exécutions. Lorsqu'un sujet marqué {{< ui >}}NEW{{< /ui >}} apparaît en haut, cela indique que vos utilisateurs ont découvert un nouveau cas d'utilisation ou un nouveau mode de défaillance.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account/
[2]: /fr/llm_observability/experiments/datasets/
[3]: /fr/llm_observability/annotation_queues/
[4]: https://app.datadoghq.com/llm/patterns