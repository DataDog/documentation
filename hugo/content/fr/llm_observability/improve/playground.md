---
aliases:
- /fr/llm_observability/playground/
description: Utilisez l'Agent Observability Playground pour tester des invites de
  manière interactive avec n'importe quel fournisseur de modèle connecté et mener
  des expériences avec des évaluateurs depuis une interface basée sur un navigateur.
further_reading:
- link: /llm_observability/improve/experiments
  tag: Documentation
  text: Agent Observability Experiments
- link: /llm_observability/improve/datasets
  tag: Documentation
  text: Jeux de données
- link: /llm_observability/improve/experiments/analyzing_results
  tag: Documentation
  text: 'Analyse des résultats d''expérience :'
title: Playground
---
Le [Playground][1] est une interface basée sur un navigateur pour tester et évaluer les invites LLM. Vous pouvez tester une invite avec une entrée arbitraire auprès de n'importe quel fournisseur de modèle connecté, ou charger un jeu de données, joindre des évaluateurs, prévisualiser les résultats et enregistrer la configuration en tant qu'expérience reproductible, le tout sans écrire de code.

Le Playground prend en charge deux flows :
- **[Tester une invite avec une entrée arbitraire](#test-a-prompt-with-arbitrary-input)** : Envoyez une seule invite avec des valeurs d'entrée personnalisées et inspectez la réponse du modèle.
- **[Exécutez une expérience depuis le Playground ](#run-an-experiment-from-the-playground)** : Exécutez votre invite sur un jeu de données, notez chaque ligne avec des évaluateurs et enregistrez le résultat en tant qu'[expérience][2].

## Prérequis {#prerequisites}

Connectez au moins une intégration de fournisseur de modèle dans [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][3] avant d'utiliser le Playground.

Fournisseurs pris en charge :
- OpenAI
- Anthropic
- Azure OpenAI
- Amazon Bedrock
- Vertex AI
- Fournisseur personnalisé

## Tester une invite avec une entrée arbitraire {#test-a-prompt-with-arbitrary-input}

{{< img src="llm_observability/playground/playground-arbitrary-input.png" alt="Agent Observability Playground affichant un message utilisateur avec des espaces réservés pour les variables {{category}} et {{approach}}, et la réponse du modèle dans le panneau de sortie." style="width:100%;" >}}

Utilisez le mode Prompts pour itérer sur une invite avec un ensemble fixe d'entrées.

1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Playground{{< /ui >}}][1].
1. Rédigez vos invites système et utilisateur dans l'éditeur de message. Pour paramétrer les entrées, utilisez `{{variable_name}}` dans n'importe quel message.
1. Ouvrez le panneau {{< ui >}}Model configuration{{< /ui >}} en utilisant la barre supérieure.
1. Dans le panneau de configuration, sélectionnez un {{< ui >}}Provider{{< /ui >}}, un {{< ui >}}Account{{< /ui >}} et un {{< ui >}}Model{{< /ui >}}.
1. (Facultatif) Cliquez sur {{< ui >}}Edit Response Structure{{< /ui >}} pour demander une sortie structurée au modèle.
1. (Facultatif) Cliquez sur {{< ui >}}Model Parameters{{< /ui >}} pour spécifier les paramètres du modèle.
1. (Facultatif) Cliquez sur {{< ui >}}Add New{{< /ui >}} à côté de {{< ui >}}Tools{{< /ui >}} pour ajouter des définitions d'outils au format de schéma de fonction JSON. Utilisez les exemples fournis (Météo, Recherche Web, E-mail, Cours de bourse) comme points de départ.
1. Vous pouvez saisir des valeurs pour chaque variable dans la section {{< ui >}}Variables{{< /ui >}} afin de remplacer les paramètres que vous avez définis dans vos invites utilisateur et système.
1. Cliquez sur {{< ui >}}Done{{< /ui >}} pour enregistrer la configuration et fermer la fenêtre modale.
1. Cliquez sur {{< ui >}}Run{{< /ui >}} pour envoyer l'invite et afficher la réponse du modèle.

Modifiez les messages, les valeurs des variables ou les paramètres du modèle, puis cliquez à nouveau sur {{< ui >}}Run{{< /ui >}} pour itérer.

## Exécutez une expérience depuis le Playground {#run-an-experiment-from-the-playground}

{{< img src="llm_observability/playground/playground-experiment-preview.png" alt="Agent Observability Playground en mode expérience avec toutes les étapes complétées et l'option Save and Run as experiment activée. Le tableau de prévisualisation de l'expérience affiche les colonnes OUTPUT, EVAL_EXPECTED_OUTPUT, INPUT et EXPECTEDOUTPUT avec des badges PASS et FAIL par ligne et une bannière récapitulative indiquant que 6 enregistrements sur 20 ont réussi." style="width:100%;" >}}

Utilisez le mode Experiments pour tester votre invite sur un jeu de données, noter les résultats avec des évaluateurs et enregistrer la configuration en tant qu'expérience reproductible.

### Configurez votre invite {#configure-your-prompt}

Rédigez votre invite en utilisant `{{variable_name}}` placeholders where dataset values will be substituted. Use dot notation to reference nested dataset fields—for example, `{{input.question}}` to reference a field named `question` dans la section d'entrée d'un enregistrement.

### 1. Ajoutez un jeu de données {#1-add-a-dataset}

Sélectionnez un jeu de données depuis votre projet. Le jeu de données fournit les enregistrements sur lesquels le Playground exécute votre prompt.

Pour créer un jeu de données, consultez [Datasets][4].

### 2. Ajoutez des variables {#2-add-variables}

Mappez les colonnes du jeu de données aux sections disponibles dans votre prompt :

| Section | Description |
|---------|-------------|
| {{< ui >}}Input{{< /ui >}} | Colonnes de la section d'entrée de chaque enregistrement, utilisées pour remplir `{{input.*}}` variables. If the input value is a JSON object, its top-level keys are exposed as individual variables (for example, `{{input.question}}` and `{{input.category}}`). If the input value is a plain string or number, the whole field is available as `{{input}}`. |
| {{< ui >}}Expected Output{{< /ui >}} | Valeurs de vérité terrain utilisées par les évaluateurs pour noter la sortie du modèle. Si la valeur est un objet JSON, les clés de premier niveau sont exposées individuellement (par exemple, `{{expected_output.answer}}`). Available as `{{expected_output}}` for plain values. |
| {{< ui >}}Metadata{{< /ui >}} | Colonnes de contexte supplémentaires. Les clés de premier niveau d'un objet JSON sont disponibles sous la forme `{{metadata.*}}` variables. |

Cliquez sur {{< ui >}}Use this dataset{{< /ui >}} pour passer à la phase de prévisualisation.

<div class="alert alert-warning">Si une variable fait référence à un chemin qui n'existe pas dans le jeu de données — par exemple, <code>{{question}}</code> au lieu de <code>{{input.question}}</code>— le modèle reçoit la chaîne de modèle littérale. Revenez à votre invite et corrigez les chemins des variables pour qu'ils correspondent aux colonnes indiquées dans le tableau ci-dessus.</div>

### 3. Ajoutez des évaluateurs {#3-add-evaluators}

Les évaluateurs notent chaque ligne après une exécution de prévisualisation. Cliquez sur {{< ui >}}Add Evaluators{{< /ui >}} dans la barre d'outils pour ouvrir la fenêtre de configuration de l'évaluateur.

Le Playground prend en charge {{< ui >}}String Check{{< /ui >}} évaluateurs. Ajoutez plusieurs évaluateurs pour noter différents aspects de la sortie en une seule exécution.

{{% collapse-content title="Options de l'évaluateur de check de chaîne" level="h4" expanded=false %}}

| Champ | Description |
|-------|-------------|
| {{< ui >}}Operator{{< /ui >}} | La comparaison à appliquer : `equals`, `not equals` ou `contains`. |
| {{< ui >}}Case sensitive{{< /ui >}} | Lorsqu'elle est activée, la comparaison est sensible à la casse. |
| {{< ui >}}Strip whitespace{{< /ui >}} | Lorsqu'elle est activée, les espaces de début et de fin sont supprimés avant la comparaison. |
| {{< ui >}}Left operand{{< /ui >}} | La valeur à évaluer — par défaut, la sortie du modèle (`output`). |
| {{< ui >}}Right operand{{< /ui >}} | La valeur à comparer — par défaut, la sortie attendue. Prend en charge la notation par points pour les champs imbriqués. |
| {{< ui >}}Name{{< /ui >}} | Un alias affiché comme en-tête de colonne dans le tableau des résultats. |

{{% /collapse-content %}}

### 4. Exécutez une prévisualisation {#4-run-a-preview}

Cliquez sur {{< ui >}}Run Preview{{< /ui >}} pour exécuter l'invite sur un maximum de 20 enregistrements de jeu de données.

Une fois l'aperçu terminé :
- Chaque ligne affiche un badge {{< ui >}}PASS{{< /ui >}} ou {{< ui >}}FAIL{{< /ui >}} pour chaque évaluateur.
- L'en-tête de colonne affiche le nombre total de réussites et d'échecs.
- Une bannière récapitulative affiche le résultat global.

Cliquez sur un badge {{< ui >}}FAIL{{< /ui >}} pour développer une fenêtre contextuelle affichant la sortie réelle, l'opérateur, la valeur attendue et une indication contextuelle. Par exemple, lorsqu'un check `equals` échoue parce que la sortie contient la valeur attendue en tant que sous-chaîne, la fenêtre contextuelle suggère de passer à `contains`.

### Itérez sur la configuration de l'invite et de l'évaluateur {#iterate-on-prompt-and-evaluator-configuration}

{{< img src="llm_observability/playground/playground-stale-preview.png" alt="Agent Observability Playground montrant un état d'aperçu obsolète après une modification de l'invite. Une bannière d'avertissement indique « L'invite ou les paramètres ont été modifiés depuis le dernier aperçu. Exécutez à nouveau l'aperçu avant d'exécuter le jeu de données complet. » avec un bouton Relancer l'aperçu. Le tableau des résultats affiche des badges PASS et FAIL de la précédente exécution." style="width:100%;" >}}

Après avoir examiné les résultats, modifiez la configuration de l'invite ou de l'évaluateur pour améliorer les scores. Toute modification marque les résultats de l'aperçu comme obsolètes. Cliquez sur {{< ui >}}Re-run Preview{{< /ui >}} pour exécuter à nouveau avec la configuration mise à jour.

Modèles d'itération courants :
- Si la plupart des lignes échouent `equals`, vérifiez si `contains` ou une comparaison insensible à la casse reflète mieux la tâche.
- Si les valeurs des variables apparaissent sous forme de littéraux dans la sortie (par exemple, `{{input.question}}`), corrigez le chemin de la variable dans l'invite.
- Ajustez la formulation de l'invite et relancez pour observer l'effet sur les taux de réussite.

### 5. Enregistrez l'expérience {#5-save-the-experiment}

Lorsque les résultats de l'aperçu répondent à vos attentes, cliquez sur {{< ui >}}Save & Run as experiment{{< /ui >}} dans la barre d'outils supérieure pour exécuter l'expérience sur l'ensemble du jeu de données.

Dans la boîte de dialogue :

1. Saisissez un {{< ui >}}Experiment name{{< /ui >}}.
1. Sélectionnez un {{< ui >}}Project{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

L'expérience s'exécute sur tous les enregistrements du jeu de données — et pas seulement sur l'échantillon d'aperçu de 20 enregistrements. Une fois terminé, affichez les résultats dans [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}}][2].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/playground
[2]: https://app.datadoghq.com/llm/testing/experiments
[3]: https://app.datadoghq.com/llm/settings/integrations
[4]: /fr/llm_observability/improve/datasets