---
aliases:
- /fr/llm_observability/evaluations/annotation_queues/
description: Activez l'examen humain systématique des traces LLM pour identifier les
  modes de défaillance, valider les évaluations automatisées et constituer des jeux
  de données de référence.
further_reading:
- link: /llm_observability/investigate/evaluations/
  tag: Documentation
  text: En savoir plus sur les types d'évaluation
- link: /llm_observability/configure/automation_rules
  tag: Documentation
  text: Acheminez automatiquement les traces vers des files d'attente avec les règles
    d'automatisation
- link: /llm_observability/improve/experiments
  tag: Documentation
  text: Exécutez des expériences pour tester les améliorations
- link: https://www.datadoghq.com/blog/automations-annotation-queues
  tag: Blog
  text: Annotez les traces pour améliorer la qualité des LLM avec Datadog LLM Observability
- link: /api/latest/agent-observability/
  tag: API
  text: Référence de l'API Agent Observability
title: Files d'attente d'annotation
---
## Présentation {#overview}

Les files d'attente d'annotation offrent un workflow structuré pour l'examen humain des traces LLM. Utilisez les files d'attente d'annotation pour :
- Examinez les traces avec un contexte complet, incluant les spans, les métadonnées, les appels d'outils, les entrées, les sorties et les résultats d'évaluation
- Appliquez des étiquettes structurées et des observations libres aux traces
- Identifiez et catégorisez les modèles de défaillance
- Validez la précision de l'évaluation LLM-as-a-Judge
- Constituez des jeux de données de référence avec des étiquettes vérifiées par des humains pour les tests et la validation


## Création d'une file d'attente d'annotation {#creating-an-annotation-queue}

### Étape 1: Configurer les paramètres de la file d'attente {#step-1-configure-queue-settings}

1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] et sélectionnez votre projet.
2. Cliquez sur {{< ui >}}Create Queue{{< /ui >}}.
3. Dans l'onglet {{< ui >}}About{{< /ui >}}, configurez :
   - {{< ui >}}Name{{< /ui >}} : Nom descriptif reflétant l'objectif de la file d'attente (par exemple, « Failed Evaluations Review - Q1 2026 »)
   - {{< ui >}}Project{{< /ui >}} : Projet Agent Observability auquel appartient cette file d'attente
   - {{< ui >}}Description{{< /ui >}} (facultatif) : Expliquez l'objectif de la file d'attente et toute instruction particulière pour les annotateurs

4. Cliquez ensuite sur {{< ui >}}Next{{< /ui >}}.
5. Dans l'onglet {{< ui >}}Schema{{< /ui >}}, définissez le schéma d'étiquetage de votre nouvelle file d'attente. Utilisez le volet de prévisualisation pour voir comment les étiquettes apparaissent aux annotateurs au fur et à mesure que vous les configurez. Chaque étiquette peut être marquée comme obligatoire et peut éventuellement inclure :
   - {{< ui >}}Assessment criteria{{< /ui >}} : Permettre aux annotateurs d'indiquer Pass/Fail pour cette valeur d'étiquette
   - {{< ui >}}Reasoning{{< /ui >}} : Permettre aux annotateurs d'ajouter une courte explication
6. Vérifiez la configuration de votre file d'attente et cliquez sur {{< ui >}}Create{{< /ui >}} pour créer la file d'attente.

   {{< img src="llm_observability/evaluations/annotation_queues/schema_edit.png" alt="La fenêtre modale Modifier la file d'attente affichant l'onglet Schéma avec la configuration des étiquettes à gauche et un volet de prévisualisation à droite. Le panneau de gauche affiche des champs pour configurer une étiquette catégorielle nommée failure_type avec trois catégories : hallucination, formatting_error et refusal. Des cases à cocher permettent d'activer les options Critères d'évaluation et Raisonnement. Le volet de prévisualisation de droite montre comment l'étiquette apparaît aux annotateurs avec des cases à cocher pour chaque catégorie, des boutons Pass/Fail pour l'évaluation et un champ de texte pour le raisonnement." style="width:100%;" >}}

### Étape 2: Sélectionner les traces pour l'annotation {#step-2-select-traces-for-annotation}

Vous pouvez ajouter manuellement des traces à une file d'attente depuis le Trace Explorer ou remplir les files d'attente automatiquement à l'aide de règles d'automatisation.

{{< tabs >}}

{{% tab "Manuellement depuis le Trace Explorer" %}}
Ajouter manuellement des traces à une file d'attente depuis le Trace Explorer :
1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1]
2. Filtrer les traces à l'aide des facettes disponibles (résultats d'évaluation, état d'erreur, application, plage temporelle)
3. Sélectionner des traces individuelles ou sélectionner plusieurs traces en bloc
4. Cliquez sur {{< ui >}}Flag for Annotation{{< /ui >}}
5. Choisissez {{< ui >}}Create New Queue{{< /ui >}} ou sélectionnez une file d'attente existante

[1]: https://app.datadoghq.com/llm/traces
{{% /tab %}}

{{% tab "Utilisation des règles d'automatisation" %}}
Au lieu de sélectionner manuellement les traces, utilisez les règles d'automatisation pour acheminer automatiquement les traces vers des files d'attente d'annotation en fonction de filtres et de critères d'échantillonnage. Cela permet une alimentation continue et automatique de la file d'attente sans nécessiter de sélection manuelle des traces. Consultez [Automation Rules][5] pour obtenir la référence complète de la fonctionnalité, y compris les champs de filtre pris en charge et les limites.

<div class="alert alert-info">Les automatisations s'appliquent à l'avenir : les nouvelles traces correspondant à votre règle sont acheminées vers la file d'attente dès leur arrivée. Les traces existantes correspondant au filtre ne sont pas ajoutées rétroactivement.</div>

Pour ajouter une action de file d'attente d'annotation à une règle d'automatisation :
1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1]
2. Appliquez des filtres pour identifier les traces que vous souhaitez acheminer (échecs d'évaluation, seuils de latence, applications spécifiques). Consultez [Automation Rules > Supported filter fields][6] pour connaître les options autorisées.
3. Cliquez sur {{< ui >}}Automate Query{{< /ui >}}
4. Configurez le taux d'échantillonnage (jusqu'à 5 % pour les files d'attente d'annotation ; par exemple, 2 % des traces correspondantes).
5. Sous {{< ui >}}Actions{{< /ui >}}, sélectionnez {{< ui >}}Add to Annotation Queue{{< /ui >}}.
6. Choisissez la file d'attente cible.
7. Enregistrez la règle.

Les traces correspondant aux filtres de la règle sont ajoutées à la file d'attente dès leur arrivée. Les files d'attente d'annotation peuvent contenir jusqu'à 1 000 enregistrements ; l'automatisation se met en pause lorsque la file d'attente atteint cette limite.

[1]: https://app.datadoghq.com/llm/traces
[5]: /fr/llm_observability/configure/automation_rules/
[6]: /fr/llm_observability/configure/automation_rules/#supported-filter-fields
{{% /tab %}}
{{< /tabs >}}


## Annotation des traces {#annotating-traces}

### Accès à vos files d'attente {#accessing-your-queues}

Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2] pour voir toutes les files d'attente d'annotation disponibles. Cliquez sur une file d'attente pour voir la liste des traces, puis cliquez sur {{< ui >}}Review{{< /ui >}} pour commencer l'annotation.

**Remarque** : lorsqu'une tâche d'annotation vous est nouvellement assignée, Datadog envoie un e-mail avec le nom de la file d'attente, l'utilisateur qui l'a assignée et un lien direct pour ouvrir l'interaction assignée. Pour vous désinscrire, désactivez les e-mails d'assignation d'annotation Agent Observability dans [Paramètres personnels abonnements aux e-mails][15].

Le mode Révision affiche :
- {{< ui >}}Full trace context{{< /ui >}} (panneau de droite) :
  - Arborescence complète des spans avec entrées, sorties, métadonnées
  - Appels d'outils et étapes de raisonnement intermédiaires
  - Résultats d'évaluation sur la trace et les spans individuels

- {{< ui >}}Annotation controls{{< /ui >}} (panneau de gauche) :
  - Libellés configurés pour cette file d'attente
  - Indicateur de progression affichant la position dans la file d'attente
  - Commandes de navigation (Précédent, Suivant)
  
   {{< img src="llm_observability/evaluations/annotation_queues/review.png" alt="L'interface de révision d'annotation affichant le panneau d'annotation à gauche et les détails de la trace à droite. Le panneau de gauche affiche les contrôles de libellés, notamment les cases à cocher failure_type pour hallucination, formatting_error et refusal, ainsi qu'une évaluation requires_escalation avec des boutons Pass et Fail et un bouton Save en bas. Le panneau de droite affiche les détails de la trace pour citizen_agent avec une arborescence de spans, les résultats d'évaluation et des sections extensibles pour Input et Output affichant des données au format JSON concernant une requête d'informations météorologiques." style="width:100%;" >}}

### Application des libellés {#applying-labels}

Pour chaque trace :
1. **Examinez le contexte complet de la trace** : développez les spans si nécessaire pour comprendre les entrées, les sorties, les appels d'outils et les résultats d'évaluation.
2. **Appliquez les libellés** : remplissez les libellés configurés en fonction de votre évaluation.
3. Les annotations sont enregistrées automatiquement.
    
### Meilleures pratiques pour l'annotation {#best-practices-for-annotation}

**Soyez cohérent** :
- Examinez la description de la file d'attente et les définitions des libellés avant de commencer.
- Lorsque plusieurs annotateurs travaillent sur la même file d'attente, établissez une compréhension commune des critères.
- Documentez le raisonnement dans les notes pour les cas limites.

**Fournissez un raisonnement** :
- Utilisez des notes libres pour documenter pourquoi vous avez appliqué des étiquettes spécifiques.
- Notez les modèles que vous observez à travers plusieurs traces.
- Le raisonnement aide à affiner les critères d'évaluation et à comprendre les modes de défaillance.

## Gestion des files d'attente {#managing-queues}

### Suivi de la progression des files d'attente {#tracking-queue-progress}

La page de liste des annotations affiche une barre de progression pour chaque file d'attente indiquant le rapport entre les interactions examinées et le nombre total d'interactions. Utilisez ceci pour surveiller l'achèvement des annotations dans les files d'attente en un coup d'œil.

### Gestion de l'accès aux files d'attente {#managing-queue-access}

Les propriétaires de files d'attente gèrent la liste des examinateurs, les paramètres d'accès et les attributions à partir des détails de la file d'attente. Seul le propriétaire de la file d'attente peut modifier la liste des examinateurs, les paramètres d'accès ou les attributions.

Les restrictions d'accès s'appliquent indépendamment, vous pouvez donc activer l'une ou l'autre restriction, ou les deux :
- La restriction des examinateurs limite les interactions non attribuées aux examinateurs désignés.
- La restriction des assignataires limite les interactions attribuées à leurs assignataires.
- Lorsque les deux restrictions sont activées, les examinateurs peuvent annoter les interactions non assignées et les assignataires peuvent annoter les interactions qui leur sont assignées.

Le propriétaire de la file d'attente conserve l'accès et peut annoter toutes les interactions.

### Filtrage des traces par étiquettes d'annotation {#filtering-traces-by-annotation-labels}

utilisez la facette {{< ui >}}Annotation Labels{{< /ui >}} pour filtrer les traces par étiquettes appliquées dans les files d'attente d'annotation. Cela vous permet de :
- Trouver toutes les traces marquées avec un mode de défaillance spécifique (par exemple, `failure_type: hallucination`)
- Constituer des échantillons ciblés pour une révision ultérieure, la création de jeux de données ou l'exportation CSV pour l'analyse de données
  
### Modification du schéma de file d'attente {#editing-queue-schema}

Vous pouvez modifier le schéma d'étiquettes d'une file d'attente après sa création :
1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Ouvrez la file d'attente.
3. Si le panneau Détails est masqué, cliquez sur {{< ui >}}View Details{{< /ui >}}.
4. Cliquez sur {{< ui >}}Edit{{< /ui >}}.
5. Ajoutez, supprimez ou modifiez des étiquettes.
6. Cliquez sur {{< ui >}}Save Changes{{< /ui >}}.

<div class="alert alert-info">La modification du schéma n'affecte pas les étiquettes déjà appliquées, mais les annotateurs verront le schéma mis à jour par la suite.</div>

### Exportation de données annotées {#exporting-annotated-data}

Exportez les traces annotées pour analyse ou pour une utilisation dans d'autres workflows :

1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Ouvrez la file d'attente.
3. Sélectionnez des traces (ou sélectionnez tout).
4. Cliquez sur {{< ui >}}Export{{< /ui >}}.

Le fichier se télécharge sous le nom `annotations_<queue-id>.csv`. Vous pouvez également récupérer les données de span par programmation en utilisant l'[Export API][5].

{{% collapse-content title="Format CSV" level="h4" expanded=false id="csv-format" %}}

Chaque ligne représente une interaction annotée. Le fichier commence par ces colonnes fixes :

| Colonne | Description |
|--------|-------------|
| `Content ID` | ID du contenu annoté (par exemple, un ID de trace ou un ID de session) |
| `Type` | Type d'interaction : `trace`, `experiment_trace` ou `session` |
| `Input` | Résumé de l'entrée (vide pour les interactions de session) |
| `Output` | Résumé de la sortie (vide pour les interactions de session) |
| `Expected Output` | Uniquement présent lorsque {{< ui >}}Include Expected Output{{< /ui >}} est activé ; renseigné pour les traces d'expérience uniquement |

Après les colonnes fixes, il y a un ensemble de colonnes par évaluateur par étiquette. Les évaluateurs sont triés par ordre alphabétique selon leur nom d'affichage (les espaces sont remplacés par des traits de soulignement). Les étiquettes suivent l'ordre défini dans le schéma de la file d'attente :

| Colonne | Description |
|--------|-------------|
| `{reviewer}_{label}` | Valeur de l'étiquette (chaîne, nombre, booléen ou tableau JSON) |
| `{reviewer}_{label}_assessment` | `pass` ou `fail`, si les critères d'évaluation sont activés pour cette étiquette |
| `{reviewer}_{label}_reasoning` | Raisonnement en texte libre, si le raisonnement est activé pour cette étiquette |

Si un évaluateur n'a pas annoté une ligne donnée, ces cellules sont vides.

**Exemple** : une file d'attente avec les évaluateurs Alice Johnson et Bob Smith et les étiquettes `quality` (score) et `failure_type` (catégorielle) produit ces en-têtes de colonne :

```
Content ID,Type,Input,Output,Alice_Johnson_quality,Alice_Johnson_quality_assessment,Alice_Johnson_quality_reasoning,Alice_Johnson_failure_type,Alice_Johnson_failure_type_assessment,Alice_Johnson_failure_type_reasoning,Bob_Smith_quality,...
```

{{% /collapse-content %}}

#### Récupérez les spans par ID de trace ou ID de session {#retrieve-spans-by-trace-id-or-session-id}

Après avoir exporté les données d'annotation, utilisez l'[Export API][5] pour récupérer les données complètes des spans des traces ou des sessions dans le CSV et joignez-les à vos étiquettes d'annotation.

**Par ID de trace** :

{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
  --data-urlencode "filter[trace_id]=<TRACE_ID>"
{{< /code-block >}}

**Par ID de session** :

{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
  --data-urlencode "filter[query]=@session_id:<SESSION_ID>"
{{< /code-block >}}

### Ajout aux jeux de données {#adding-to-datasets}

Transférez les traces annotées vers des jeux de données pour l'évaluation de l'expérience :

1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Ouvrez la file d'attente.
3. Sélectionnez les traces à transférer.
4. Cliquez sur {{< ui >}}Add to Dataset{{< /ui >}}.
5. Définissez le {{< ui >}}expected output{{< /ui >}} du jeu de données :
   - {{< ui >}}From interaction{{< /ui >}} : utilisez la sortie réelle de chaque trace. Pour les traces d'expérience, vous pouvez également choisir {{< ui >}}Expected output{{< /ui >}} pour utiliser la sortie attendue originale du jeu de données source de l'expérience.
   - {{< ui >}}From annotation label{{< /ui >}} : utilisez les valeurs appliquées par les annotateurs. Sélectionnez une ou plusieurs étiquettes. La `expected_output` de l'enregistrement est construite à partir de votre sélection.
6. Choisissez un jeu de données existant ou créez un jeu de données.

Lorsque la **sortie attendue** est construite à partir d'étiquettes d'annotation, la valeur exportée est un objet JSON indexé par nom d'étiquette, par exemple `{ "is_harmful": false, "tone": ["neutral"], "topics": ["safety", "policy"] }`. Le même format s'applique, que vous sélectionniez une ou plusieurs étiquettes. Les étiquettes catégorielles sont toujours exportées sous forme de tableaux d'options sélectionnées, que l'étiquette soit à sélection unique ou multiple.

{{% collapse-content title="Comment les valeurs d'annotation sont agrégées entre les annotateurs" level="h4" expanded=false id="annotation-aggregation" %}}

Lorsque plusieurs annotateurs ont annoté la même trace, la valeur de chaque étiquette est agrégée entre eux par consensus :

| Type d'étiquette   | Agrégation                                                                |
| ------------ | -------------------------------------------------------------------------- |
| Booléen      | Vote majoritaire (les égalités sont tranchées en faveur de `true`)                              |
| Catégoriel  | Intersection : l'ensemble trié des options que chaque annotateur a sélectionnées      |
| Score        | Moyenne                                                                    |
| Texte         | Liste des réponses                                                          |

Pour les étiquettes catégorielles (sélection unique ou multiple), la valeur agrégée est le tableau trié des options que *chaque* annotateur a sélectionnées. Si la sélection d'un annotateur diffère, la valeur est un tableau vide. Le résultat est toujours un tableau, même lorsqu'un seul annotateur a annoté la trace.

**Exemple : catégoriel (consensus).** Trois annotateurs évaluent `tone` et sont tous d'accord :

- Annotateur A : `polite`
- Annotateur B : `polite`
- Annotateur C : `polite`

Agrégé : `["polite"]`.

**Exemple : catégoriel (désaccord).** Trois annotateurs évaluent `tone` et l'un d'eux diffère :

- Annotateur A : `polite`
- Annotateur B : `rude`
- Annotateur C : `polite`

Agrégé : `[]`. L'intersection est vide car `rude` ne figure pas dans l'ensemble de chaque annotateur.

**Exemple : catégoriel (sélection multiple).** Trois annotateurs attribuent des tags à `topics` (chacun peut choisir plusieurs options) :

- Annotateur A : `["safety", "policy"]`
- Annotateur B : `["safety", "billing"]`
- Annotateur C : `["safety", "policy"]`

Agrégé : `["safety"]`. Seul `safety` apparaît dans l'ensemble de chaque annotateur ; `policy` est absent de la sélection de B et `billing` est absent de celles de A et C.

**Exemple : texte.** Deux annotateurs laissent des notes :

- Annotateur A : `"Confusing phrasing"`
- Annotateur B : `"Tone too casual"`

Agrégé : `["Confusing phrasing", "Tone too casual"]`. La valeur de chaque annotateur est conservée.

Les valeurs brutes par annotateur sont conservées dans les métadonnées de chaque enregistrement, ainsi que l'identité de l'annotateur. Si le consensus par défaut ne correspond pas à votre workflow, vous pouvez le recalculer avec une stratégie différente (par exemple, médiane, vote pondéré ou choix du réviseur).

{{% /collapse-content %}}

Les étiquettes non sélectionnées comme sortie attendue sont également incluses avec chaque trace en tant que métadonnées.

Voir [Jeux de données][3] pour plus d'informations sur l'utilisation des jeux de données dans les expériences.

### Suppression des files d'attente {#deleting-queues}

Pour supprimer une file d'attente :
1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2].
2. Ouvrez la file d'attente.
3. Cliquez sur {{< ui >}}Delete{{< /ui >}} dans le panneau Détails.

<div class="alert alert-info">La suppression d'une file d'attente supprime la file d'attente et les associations d'étiquettes, mais ne supprime pas les traces sous-jacentes d'Agent Observability. Les traces restent accessibles dans Trace Explorer.</div>

## Utilisation de l'API {#using-the-api}

Vous pouvez gérer les files d'attente d'annotation par programmation. Les endpoints suivants sont disponibles dans la [référence de l'API Agent Observability][4] :

| Endpoint | Description |
|----------|-------------|
| [Lister les files d'attente d'annotation][6] | Listez toutes les files d'attente d'annotation de votre organisation. |
| [Créer une file d'attente d'annotation][7] | Créez une file d'attente d'annotation. `name` et `project_id` sont requis. Incluez un `annotation_schema` facultatif pour définir des étiquettes lors de la création. |
| [Mettre à jour une file d'attente d'annotation][8] | Mettez partiellement à jour le `name`, le `description` ou le `annotation_schema` d'une file d'attente. |
| [Supprimer une file d'attente d'annotation][9] | Supprimez une file d'attente d'annotation par ID. |
| [Ajouter des interactions à une file d'attente][10] | Ajoutez une ou plusieurs interactions à une file d'attente d'annotation pour examen. |
| [Supprimer des interactions d'une file d'attente][11] | Supprimez des interactions spécifiques d'une file d'attente par ID d'interaction. |
| [Obtenir les interactions annotées][12] | Récupérez toutes les interactions et leurs étiquettes d'annotation appliquées pour une file d'attente. |
| [Obtenir le schéma d'étiquette][13] | Récupérez le schéma d'étiquette configuré pour une file d'attente. |
| [Mettre à jour le schéma d'étiquette][14] | Créez ou remplacez le schéma d'étiquette pour une file d'attente. |

## Rétention des données {#data-retention}


| Données              | Période de conservation                                    |
| ----------------- | ----------------------------------------------------|
| Traces dans les files d'attente  | Limitées par la période de conservation des traces de votre organisation|
| Étiquettes d'annotation | Indéfinies                                          |


## Exemples de workflows {#example-workflows}

{{% collapse-content title="Analyse des erreurs et découverte des modes de défaillance" level="h3" expanded=true id="example-error-analysis-and-failure-mode-discovery" %}}
Examinez les traces ayant échoué pour identifier les modèles récurrents et catégoriser la manière dont votre application échoue en production.

1. Filtrez les traces dans Trace Explorer pour les évaluations ayant échoué ou pour des modèles d'erreur spécifiques
2. Sélectionnez manuellement les traces et ajoutez-les à une file d'attente d'annotation
3. Les annotateurs examinent les traces et documentent les types de défaillance dans des notes libres
4. Des modèles courants émergent : hallucinations dans des contextes spécifiques, problèmes de formatage, refus inappropriés
5. Créez des étiquettes catégorielles pour les modes de défaillance identifiés et recodez les traces
6. Utilisez la distribution des modes de défaillance pour prioriser les correctifs

#### Configuration de la file d'attente {#queue-configuration}

- **Étiquettes**a: Notes libres, étiquette `failure_type` catégorielle, évaluation réussite/échec
- **Annotateurs**a: Chefs de produit, ingénieurs, experts du domaine

{{% /collapse-content %}}

{{% collapse-content title="Validation des évaluations LLM-as-a-Judge" level="h3" expanded=true id="example-validating-llm-as-a-judge-evaluations" %}}

Trouvez les traces pour lesquelles les évaluateurs automatisés peuvent être incertains ou incorrects, puis demandez à des humains de fournir une vérité terrain.

1. Échantillonnez les résultats d'évaluation : tous les résultats, ou un score/seuil donné
2. Ajoutez les traces sélectionnées à une file d'attente d'annotation
3. Les annotateurs examinent les traces et fournissent des scores humains pour les mêmes critères
4. Comparez les étiquettes humaines aux scores d'évaluation automatisés
5. Identifiez les désaccords systématiques (juge trop strict, trop indulgent ou mauvaise compréhension des critères)
6. Affinez les prompts d'évaluation en fonction des désaccords

#### Configuration de la file d'attente {#queue-configuration-1}

- **Étiquettes**: Scores numériques correspondant aux critères d'évaluation (0-10), `judge_accuracy`étiquette catégorielle, notes de raisonnement
- **Annotateurs**: Experts en la matière qui comprennent les critères d'évaluation

{{% /collapse-content %}}

{{% collapse-content title="Création d'un jeu de données de référence" level="h3" expanded=true id="example-golden-dataset-creation" %}}

Construisez des jeux de données de référence avec des étiquettes vérifiées par des humains pour les tests de régression et la validation continue.

1. Échantillonnez diverses traces de production depuis Trace Explorer (exemples bons et mauvais)
2. Ajoutez des traces à la file d'attente d'annotation
3. Les annotateurs examinent et étiquettent les traces selon plusieurs dimensions de qualité
4. Ajoutez des exemples bien étiquetés et à haute confiance au jeu de données de référence
5. Utilisez le jeu de données pour les tests de régression CI/CD des modifications de prompts
6. Élargissez continuellement le jeu de données avec de nouveaux cas limites

#### Configuration de la file d'attente {#queue-configuration-2}

- **Étiquettes**: Plusieurs étiquettes catégorielles couvrant les dimensions de qualité, scores numériques, évaluation réussite/échec, notes
- **Annotateurs**: Équipe d'experts du domaine pour la cohérence
{{% /collapse-content %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/annotations/queues
[3]: /fr/llm_observability/improve/datasets
[4]: /fr/api/latest/agent-observability/
[5]: /fr/llm_observability/investigate/export_api/?tab=model#api-standards
[6]: /fr/api/latest/agent-observability/#list-agent-observability-annotation-queues
[7]: /fr/api/latest/agent-observability/#create-an-agent-observability-annotation-queue
[8]: /fr/api/latest/agent-observability/#update-an-agent-observability-annotation-queue
[9]: /fr/api/latest/agent-observability/#delete-an-agent-observability-annotation-queue
[10]: /fr/api/latest/agent-observability/#add-annotation-queue-interactions
[11]: /fr/api/latest/agent-observability/#delete-annotation-queue-interactions
[12]: /fr/api/latest/agent-observability/#get-annotated-queue-interactions
[13]: /fr/api/latest/agent-observability/#get-annotation-queue-label-schema
[14]: /fr/api/latest/agent-observability/#update-annotation-queue-label-schema
[15]: /fr/account_management/#email-subscriptions