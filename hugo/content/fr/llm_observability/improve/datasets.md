---
aliases:
- /fr/llm_observability/experiments/datasets/
description: Utilisation des jeux de données dans Agent Observability Experiments,
  comprenant la création, la récupération et la gestion de jeux de données, ainsi
  que des informations sur le versionnage.
further_reading:
- link: /llm_observability/configure/automation_rules
  tag: Documentation
  text: Acheminez automatiquement les traces vers des jeux de données avec Automation
    Rules.
title: Jeux de données
---
Dans Agent Observability Experiments, un _jeu de données_ est une collection d'_inputs_, de _expected outputs_ et de _metadata_ qui représentent des scénarios sur lesquels vous souhaitez tester votre agent. Chaque jeu de données est associé à un _projet_.  

Chaque enregistrement dans un jeu de données contient :
- **entrée** (requis) : représente toutes les informations auxquelles l'agent peut accéder dans une tâche.
- **sortie attendue** (optionnel) : également appelée _ground truth_, représente la réponse idéale que l'agent devrait produire. Vous pouvez utiliser _sortie attendue_ pour stocker la sortie réelle de l'application, ainsi que tout résultat intermédiaire que vous souhaitez évaluer. 
- **métadonnées** (optionnel) : contient toute information utile pour catégoriser l'enregistrement et l'utiliser pour une analyse ultérieure. Par exemple : sujets, tags, descriptions, notes.
- **id** (optionnel) : un identifiant défini par l'utilisateur pour l'enregistrement. Doit comporter 128 caractères ou moins et ne contenir que des lettres, des chiffres, `_`, `-` ou `.`. S'il n'est pas fourni, le SDK en génère un automatiquement.

Les jeux de données permettent de réaliser des tests systématiques et la détection de régressions en fournissant des scénarios d’évaluation cohérents dans Agent Observability Experiments.

### Création d'un jeu de données {#creating-a-dataset}

Vous pouvez créer des jeux de données à partir de données de production, de fichiers CSV, ou les construire manuellement par programmation.

{{< tabs >}}

{{% tab "À partir de fichiers CSV" %}}

Pour créer un jeu de données à partir d'un fichier CSV, utilisez `LLMObs.create_dataset_from_csv()` :

```python
# Create dataset from CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="questions.csv",
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",              # Optional: defaults to the project name from LLMObs.enable
    description="Geography quiz dataset",         # Optional: Dataset description
    input_data_columns=["question", "category"],  # Columns to use as input
    expected_output_columns=["answer"],           # Optional: Columns to use as expected output
    metadata_columns=["difficulty"],              # Optional: Additional columns as metadata
    id_column="record_id",                        # Optional: Column to use as record IDs
    csv_delimiter=","                             # Optional: Defaults to comma
)

# Example "questions.csv":
# record_id,question,category,answer,difficulty
# japan-capital,What is the capital of Japan?,geography,Tokyo,medium
# brazil-capital,What is the capital of Brazil?,geography,Brasília,medium

```

**Remarques** :
- Les fichiers CSV doivent comporter une ligne d'en-tête
- La taille maximale du champ est de 10 Mo
- Toutes les colonnes non spécifiées dans `input_data_columns`, `expected_output_columns` ou `id_column` sont automatiquement traitées comme des métadonnées
- Le jeu de données est automatiquement envoyé à Datadog après sa création

{{% /tab %}}

{{% tab "Création manuelle" %}}

Pour créer manuellement un jeu de données, utilisez `LLMObs.create_dataset()` :

```python
from ddtrace.llmobs import LLMObs

dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
            "id": "china-capital",                                             # optional, user-defined record ID
            "input_data": {"question": "What is the capital of China?"},       # required, JSON or string
            "expected_output": "Beijing",                                      # optional, JSON or string
            "metadata": {"difficulty": "easy"}                                 # optional, JSON
        },
        {
            "input_data": {"question": "Which city serves as the capital of South Africa?"},
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"}
        }
    ]
)
# View dataset in Datadog UI
print(f"View dataset: {dataset.url}")
```
{{% /tab %}}

{{% tab "À partir des traces de production" %}}
Ajoutez manuellement des traces de production aux jeux de données via l'UI ou automatiquement avec Automations.

**Sélection manuelle (UI)** :
1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][2]. Vous pouvez également ajouter une nouvelle Automation depuis [Settings > Automations][3].
2. Trouvez une trace que vous souhaitez inclure dans un jeu de données.
3. Cliquez sur {{< ui >}}Add to Dataset{{< /ui >}}.
4. Choisissez un jeu de données existant ou créez-en un.
5. L'entrée, la sortie et les métadonnées de la trace sont automatiquement extraites.

**Automatic routing (Automations)** :

<div class="alert alert-info">Les Automations s'appliquent à l'avenir : les nouvelles traces correspondant à votre règle sont acheminées vers le jeu de données à mesure qu'elles arrivent. Les traces existantes correspondant au filtre ne sont pas ajoutées rétroactivement.</div>

Les Automations vous permettent d'acheminer en continu des traces de production vers des jeux de données en fonction de règles configurables, en maintenant vos jeux de données à jour avec le comportement de production sans intervention manuelle.

Pour configurer les mises à jour automatiques des jeux de données :
1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][2].
2. Appliquez des filtres pour identifier les traces que vous souhaitez acheminer (échecs d'évaluation, seuils de latence, applications spécifiques). Consultez [Automation Rules > Supported filter fields][5] pour connaître les éléments autorisés.
3. Cliquez sur {{< ui >}}Automate Query{{< /ui >}}.
4. Configurez le taux d'échantillonnage (par exemple, 10 % des traces correspondantes).
5. Sélectionnez {{< ui >}}Add to Dataset{{< /ui >}} comme action.
6. Choisissez un jeu de données existant ou créez-en un.

Après avoir créé une Automation, gérez-la depuis [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][3] :
- {{< ui >}}Enable/disable{{< /ui >}} : Contrôlez si de nouvelles traces sont ajoutées au jeu de données.
- {{< ui >}}Edit{{< /ui >}} : Modifiez les filtres, les taux d'échantillonnage ou les jeux de données cibles selon l'évolution de vos besoins.
- {{< ui >}}Delete{{< /ui >}}: Supprimez les Automations dont vous n'avez plus besoin.

**Limites des jeux de données :**
- Les jeux de données alimentés par des Automations sont limités à 20 000 enregistrements.
- Ces jeux de données sont en lecture seule pour éviter toute modification accidentelle des données automatisées.
- Pour modifier des enregistrements, clonez d'abord le jeu de données.

**Exemples de cas d'utilisation pour les Automations :**
- Échantillonnez 10 % des traces avec des échecs d'évaluation pour créer un jeu de données d'échecs.
- Collectez les cas limites où la latence dépasse les seuils.
- Maintenez un jeu de données diversifié avec un échantillonnage stratifié sur les segments d'utilisateurs.
- Capturez automatiquement les nouveaux modèles d'échec à mesure qu'ils apparaissent en production.

[2]: https://app.datadoghq.com/llm/traces
[3]: https://app.datadoghq.com/llm/settings/automations
[5]: /fr/llm_observability/configure/automation_rules/#supported-filter-fields
{{% /tab %}}
{{< /tabs >}}

### Récupération d'un jeu de données {#retrieving-a-dataset}

Pour récupérer le jeu de données existant d'un projet depuis Datadog :

```python
dataset = LLMObs.pull_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project", # optional, defaults to the project name from LLMObs.enable
    version=1 # optional, defaults to the latest version
)

# Get dataset length
print(len(dataset))
```

#### Exportation d'un jeu de données vers pandas {#exporting-a-dataset-to-pandas}

La classe Dataset fournit également la méthode `as_dataframe()`, qui vous permet de transformer un jeu de données en [pandas DataFrame][1].

<div class="alert alert-info"><a href="https://pandas.pydata.org/docs/index.html">Pandas</a> est requis pour cette opération. Pour installer pandas, <code>pip install pandas</code>.</div>

```python
# Convert dataset to pandas DataFrame
df = dataset.as_dataframe()
print(df.head())

# DataFrame output with MultiIndex columns:
#                                   input_data     expected_output  metadata
#    question                       category       answer           difficulty
# 0  What is the capital of Japan?  geography      Tokyo            medium
# 1  What is the capital of Brazil? geography      Brasília         medium
```

Le DataFrame possède une structure MultiIndex avec les colonnes suivantes :
- `input_data`: Contient tous les champs d'entrée de `input_data_columns`
- `expected_output`: Contient tous les champs de sortie de `expected_output_columns`
- `metadata`: Contient tous les champs supplémentaires de `metadata_columns`


### Gestion des versions du jeu de données {#dataset-versioning}

Les jeux de données sont automatiquement versionnés pour suivre les modifications au fil du temps. Les informations de versionnage permettent la reproductibilité et autorisent les expériences à référencer des versions spécifiques de jeux de données. 

L'objet `Dataset` possède un champ, `current_version`, qui correspond à la dernière version ; les versions précédentes sont soumises à une fenêtre de rétention de 90 jours. 

Les versions des jeux de données commencent à `0`, et chaque nouvelle version incrémente la version de 1.

#### Lorsque de nouvelles versions de jeux de données sont créées {#when-new-dataset-versions-are-created}

Une nouvelle version de jeu de données est créée lorsque :
- Ajout d'enregistrements
- Mise à jour d'enregistrements (modifications des champs `input`, `expected_output` ou `metadata`)
- Suppression d'enregistrements

Les versions des jeux de données **NE SONT PAS** créées lors de la mise à jour du nom ou de la description du jeu de données.

#### Conservation des versions {#version-retention}

- La version active d'un jeu de données est conservée pendant 3 ans.
- Les versions précédentes (**PAS** le contenu de `current_version`) sont conservées pendant 90 jours. 
- La période de conservation de 90 jours est réinitialisée lorsqu'une version précédente est utilisée — par exemple, lorsqu'une expérience lit une version.
- Après 90 jours consécutifs sans utilisation, une version précédente est éligible à une suppression permanente et peut ne plus être accessible.

**Exemple de comportement de conservation des versions**

Après avoir publié `12`, `11` devient une version précédente avec une fenêtre de 90 jours. Après 25 jours, vous exécutez une expérience avec la version `11`, ce qui entraîne le **redémarrage** de la fenêtre de 90 jours. Après 90 jours supplémentaires, durant lesquels vous n'avez pas utilisé la version `11`, la version `11` peut être supprimée.

### Accès et gestion des enregistrements de jeux de données {#accessing-and-managing-dataset-records}

Vous pouvez accéder aux enregistrements de jeux de données en utilisant l'indexation Python standard :

```python
# Get a single record
record = dataset[0]

# Get multiple records
records = dataset[1:3]

# Iterate through records
for record in dataset:
    print(record["input_data"])
```
  
La classe Dataset fournit des méthodes pour gérer les enregistrements : `append()`, `update()`, `delete()`. Vous devez `push()` les modifications pour enregistrer les changements dans Datadog.

```python
# Add a new record
dataset.append({
    "id": "switzerland-capital",
    "input_data": {"question": "What is the capital of Switzerland?"},
    "expected_output": "Bern",
    "metadata": {"difficulty": "easy"}
})

# Update an existing record
dataset.update(0, {
    "input_data": {"question": "What is the capital of China?"},
    "expected_output": "Beijing",
    "metadata": {"difficulty": "medium"}
})

# Delete a record
dataset.delete(1)  # Deletes the second record

# Save changes to Datadog
dataset.push()
```

### Personnalisation du tableau de jeu de données {#customizing-the-dataset-table}

Lors de la consultation des enregistrements d'un jeu de données, vous pouvez personnaliser le tableau pour analyser et comparer rapidement les enregistrements sans avoir à développer chacun d'eux individuellement.

#### Sélecteur de colonnes {#column-picker}

Utilisez le sélecteur de colonnes pour activer ou désactiver des colonnes et faites-les glisser pour les réorganiser.

#### Colonnes personnalisées {#custom-columns}

Extrayez des champs spécifiques de vos enregistrements de jeu de données et affichez-les sous forme de colonnes de tableau dédiées. Pour ajouter une colonne personnalisée, saisissez un chemin de champ dans l'entrée {{< ui >}}Add Column{{< /ui >}} en haut du tableau. Vous pouvez ajouter plusieurs colonnes personnalisées et les réorganiser par glisser-déposer. La configuration des colonnes est enregistrée dans le stockage local de votre navigateur par projet.

[1]: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html