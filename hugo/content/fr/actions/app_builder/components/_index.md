---
aliases:
- /fr/service_management/app_builder/components
description: Référence complète des composants d'interface utilisateur d'App Builder,
  incluant les boutons, formulaires, tableaux, graphiques et éléments interactifs.
disable_toc: true
further_reading:
- link: /actions/app_builder/components/tables/
  tag: Documentation
  text: Tables
- link: /actions/app_builder/build/
  tag: Documentation
  text: Créer des applications
- link: /actions/app_builder/expressions/
  tag: Documentation
  text: Expressions JavaScript
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: Centre d'apprentissage
  text: Créez des applications en libre-service avec App Builder pour les intégrations
    tierces.
title: Composants
---
## Présentation {#overview}
Cette page fournit une liste de composants d'interface utilisateur que vous pouvez utiliser lors de la création d'applications dans App Builder.

De nombreuses propriétés de composant vous permettent de choisir parmi des valeurs fournies. Si vous souhaitez utiliser une expression pour la valeur d'une propriété, cliquez sur {{< ui >}}&lt;/&gt;{{< /ui >}} à côté de la propriété pour utiliser l'éditeur de code. 

Tout composant capable de déclencher un événement dispose d'une liste de réactions disponibles dans [événements et réactions][13]. Ces composants peuvent également utiliser des [réactions personnalisées][14].

Pour plus d'informations sur l'utilisation de JavaScript dans App Builder, consultez [JavaScript Expressions][7]. Pour plus d'informations sur l'enregistrement de vos composants en tant que modèle, consultez [Reusable Modules][12].
<br>

## Composants disponibles {#available-components}

{{% collapse-content title="Bouton" level="h3" %}}
Les composants de bouton possèdent les propriétés suivantes.

#### Général {#general}

Label
: Le texte qui s'affiche sur le bouton.<br>
**Valeur**: chaîne ou expression

#### Apparence {#appearance}

Intent
: Contrôle la couleur du bouton, les couleurs représentant l'intention du bouton.<br>
**Valeurs fournies**: default, danger, success, warning

Is Primary
: Conçu pour attirer l'attention de l'utilisateur sur la ou les actions les plus importantes pour une page ou un workflow donné.<br>
**Valeurs fournies**: on, off

Is Borderless
: Supprime la bordure de tout bouton. Au survol, il obtient un remplissage d'arrière-plan.<br>
**Valeurs fournies**: on, off

Is Loading
: Affiche un indicateur de chargement.<br>
**Valeurs fournies** : on, off

Is Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events}

Event
: **Valeur** : click

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

#### Inspecter les données {#inspect-data}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Valeur d'appel" level="h3" %}}
Les composants de valeur d'appel possèdent les propriétés suivantes.

#### Général {#general-1}

Label
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Value
: La valeur mise en évidence par l'appel.<br>
**Valeur**: chaîne ou expression

Unit
: L'unité associée à la valeur.<br>
**Valeur**: chaîne ou expression

#### Style {#style}

Style
: Le style visuel du composant.<br>
**Valeurs fournies**: default, success, warning, danger, blue, purple, pink, orange, yellow, red, green, gray, vivid blue, vivid purple, vivid pink, vivid orange, vivid yellow, vivid red, vivid green

Size
: Dimensionne la métrique de manière réactive afin qu'elle soit proportionnelle à la taille de la valeur.<br>
**Valeurs fournies** : sm, md, lg, xl

#### Apparence {#appearance-1}

Is Loading
: Affiche un indicateur de chargement.<br>
**Valeurs fournies** : on, off

Is Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-1}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-1}

Pour voir ce composant en contexte, consultez le plan d'application [EC2 Instance Manager][3].
{{% /collapse-content %}}



{{% collapse-content title="Case à cocher" level="h3" %}}
Les composants de case à cocher ont les propriétés suivantes.

#### Général {#general-2}

Label
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Options
: La liste des cases à cocher parmi lesquelles un utilisateur peut choisir. Le format est un tableau d'objets où chaque objet se compose d'une paire clé-valeur `label` et `value`. Le nombre minimal d'options est de 1.<br>
**Valeur**: expression<br>
**Exemple**:<br>
:     ```json
      ${[
        {
            "label": "Staging",
            "value": "staging"
        },
        {
            "label": "Production",
            "value": "production"
        }
      ]}
      ```

#### Apparence {#appearance-2}

Is Multiline
: Détermine si le texte de la case à cocher doit passer à la ligne ou être tronqué par des points de suspension.<br>
**Valeurs fournies** : on, off

Is Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-1}

Event
: **Valeur** : change<br>

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

#### Inspecter les données {#inspect-data-2}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-2}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}



{{% collapse-content title="Conteneur" level="h3" %}}
Les composants conteneurs possèdent les propriétés suivantes.

#### Apparence {#appearance-3}

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-3}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-3}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}



{{% collapse-content title="Graphique personnalisé" level="h3" %}}
Les composants de graphique personnalisé possèdent les propriétés suivantes.

#### Général {#general-3}

Vega Specification
: Une chaîne représentant une spécification JSON Vega-Lite ou Vega valide.

#### Apparence {#appearance-4}

Is Loading
: Affiche un indicateur de chargement.<br>
**Valeurs fournies**: on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-4}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-4}

Pour un exemple montrant comment utiliser ce composant, voir [Graphiques personnalisés][10].

{{% /collapse-content %}}


{{% collapse-content title="Sélecteur de date" level="h3" %}}
Les composants de sélecteur de date possèdent les propriétés suivantes.

#### Général {#general-4}

Label
: L'étiquette affichée en haut du sélecteur de date.<br>
**Valeur**: chaîne ou expression

Tooltip
: L'info-bulle à afficher lors du survol de l'étiquette de saisie. L'info-bulle peut contenir du markdown.<br>
**Valeur**: chaîne ou expression

Default Value
: La date par défaut du sélecteur de date, affichée sous forme d'horodatage UNIX en millisecondes.<br>
**Valeur**: entier

Allow Future Dates
: Détermine si la date peut être définie après la date du jour.<br>
**Valeurs fournies**: on, off

#### Apparence {#appearance-5}

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-2}

Event
: **Valeur**: change

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple** : Voir [Fonctions d'état][9].

#### Inspecter les données {#inspect-data-5}

Affiche les propriétés et les valeurs au format JSON. Les valeurs sont affichées à la fois sous forme d'horodatage UNIX en millisecondes et au format ISO (année, mois, jour, heure, minutes, secondes et millisecondes).

{{% /collapse-content %}}


{{% collapse-content title="Outil de sélection de la plage de dates" level="h3" %}}
Les composants de sélection de plage de dates possèdent les propriétés suivantes.

#### Général {#general-5}

Default timeframe
: La période par défaut affichée par le sélecteur de date.<br>
**Valeurs fournies**: 5 dernières minutes, 30 dernières minutes, 1 dernière heure, 4 dernières heures, 1 dernier jour

#### Apparence {#appearance-6}

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies**: on, off

#### Événements {#events-3}

Event
: **Valeur**: change

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

#### Inspecter les données {#inspect-data-6}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-5}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Séparateur" level="h3" %}}
Les composants séparateurs ont les propriétés suivantes.

#### Apparence {#appearance-7}

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-7}

Affiche les propriétés au format JSON.

{{% /collapse-content %}}


{{% collapse-content title="Entrée de fichier" level="h3" %}}
Les composants d'entrée de fichier ont les propriétés suivantes.

#### Général {#general-6}

Accepted File Types
: Détermine les types de fichiers que le composant d'entrée de fichier accepte.<br>
**Valeurs**: .csv, .json

#### Apparence {#appearance-8}

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies**: on, off

#### Événements {#events-4}

Event
: **Valeur**: change

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

#### Inspecter les données {#inspect-data-8}

Affiche les paires de propriétés et de valeurs au format JSON.

{{% /collapse-content %}}


{{% collapse-content title="Image" level="h3" %}}
Les composants image ont les propriétés suivantes.

#### Général {#general-7}

Source
: L'image à afficher. Les formats pris en charge sont JPG, PNG et GIF. La taille de téléchargement maximale est de 4 Mo.<br>
**Valeurs**: URL ou fichier

#### Apparence {#appearance-9}

Fit
: Détermine les dimensions de l'image dans les limites du composant image.<br>
**Valeurs fournies**: fill, contain, cover, none

Padding
: Détermine la largeur de l'espace entre les limites de l'image et les limites du composant image.<br>
**Valeurs fournies**: none, small, medium, large

Vertical Alignment
: Détermine la position verticale de l'image dans les limites du composant image.<br>
**Valeurs fournies**: aligner en haut, aligner au centre, aligner en bas

Horizontal Alignment 
: Détermine la position horizontale de l'image dans les limites du composant image.<br>
**Valeurs fournies** : aligner à gauche, aligner au centre, aligner à droite

Border
: Détermine si le composant image possède une bordure visuelle autour de ses bords.<br>
**Valeurs fournies** : on, off

Transparent Background
: Détermine si l'arrière-plan à l'intérieur du composant image est transparent.<br>
**Valeurs fournies** : on, off

Is Loading
: Détermine si une icône de chargement est affichée pendant le chargement de l'image.<br>
**Valeurs fournies** : on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-9}

Affiche les propriétés au format JSON.

{{% /collapse-content %}}


{{% collapse-content title="Logo d'intégration" level="h3" %}}
Les composants de logo d'intégration possèdent les propriétés suivantes.

#### Général {#general-8}

Integration Id
: Spécifie l'icône de logo d'intégration à afficher.<br>
**Valeur**: chaîne ou expression<br>
**Exemples**: datadog, amazon-s3, postgres, okta

#### Apparence {#appearance-10}

Horizontal Alignment
: Contrôle le positionnement horizontal du logo dans le composant.<br>
**Valeurs fournies**: aligner à gauche, aligner au centre, aligner à droite

Vertical Alignment
: Contrôle le positionnement vertical du logo dans le composant.<br>
**Valeurs fournies** : aligner en haut, aligner au centre, aligner en bas

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

Is Loading
: Affiche un indicateur de chargement.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-10}

Affiche les paires de propriétés et de valeurs au format JSON.

{{% /collapse-content %}}


{{% collapse-content title="Formulaire" level="h3" %}}
Les composants de formulaire possèdent les propriétés suivantes.

#### Général {#general-9}

Title
: Le titre du formulaire.<br>
**Valeur**: chaîne ou expression

Default value
: La valeur par défaut que l'application renseigne dans le formulaire. Pour renseigner un champ spécifique, vous pouvez utiliser la notation JSON, par exemple `{"org":"frontend"}` pour renseigner le champ `org` avec la valeur `frontend`.<br>
**Valeur**: chaîne ou expression

#### Champs {#fields}

Chaque élément représente un champ dans le formulaire. Les champs ont chacun l'un des types suivants: `textInput`, `select`, `textArea` ou `text`.

Les champs possèdent certaines ou toutes les propriétés suivantes selon leur type de champ :

Field name
: L'identifiant unique d'un champ. Vous pouvez utiliser cet identifiant pour référencer le champ dans une expression.<br>
**Valeur**: chaîne ou expression

Label
: L'étiquette qui s'affiche au-dessus du champ.<br>
**Valeur**: chaîne ou expression

Content
: Le contenu qui s'affiche dans un champ `text`.<br>
**Valeur**: chaîne ou expression

Options
: Les options disponibles dans un champ `select`. Les options doivent être un tableau d'objets, avec une clé `const` pour la valeur de l'option et une clé `title` facultative pour l'étiquette de l'option.<br>**Valeur**: La `label` et le `value` de chaque objet peuvent être une chaîne ou une expression.<br>
Vous pouvez remplir chaque objet à l'aide de l'interface graphique (par défaut), ou basculer {{< ui >}}Raw{{< /ui >}} pour utiliser une saisie JSON brute afin de fournir l'ensemble du tableau d'objets.

Placeholder text
: Le texte qui s'affiche dans un champ `textInput` ou `textArea` lorsqu'aucune valeur n'est saisie.<br>
**Valeur**: chaîne ou expression

Is Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Is Visible
: Détermine si le champ est visible dans le formulaire.<br>
**Valeurs fournies** : on, off

Is Required
: Détermine si le champ est requis pour soumettre le formulaire.<br>
**Valeurs fournies** : on, off

#### Apparence {#appearance-11}

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

Is Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

#### Événements {#events-5}

Event
: **Valeur** : submit, change, validate

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple** : `form0.setValue({name: 'node-group-1'})` définit la valeur du composant `form0` sur `{name: 'node-group-1'}`.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-11}

Affiche les paires de propriétés et de valeurs au format JSON.

{{% /collapse-content %}}


{{% collapse-content title="Entrée JSON" level="h3" %}}
Les composants d'entrée JSON ont les propriétés suivantes.

#### Général {#general-10}

Label
: Le texte qui s'affiche en haut du composant.

Default value
: La valeur JSON par défaut que le composant affiche.

#### Apparence {#appearance-12}

Is Read Only
: Détermine si le composant est en lecture seule.<br>
**Valeurs fournies**: on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies**: on, off

#### Événements {#events-6}

Event
: **Valeur**: change

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

#### Inspecter les données {#inspect-data-12}

Affiche les paires de propriétés et de valeurs au format JSON.
{{% /collapse-content %}}



{{% collapse-content title="Fenêtre modale" level="h3" %}}
Les composants modaux ont les propriétés suivantes.

#### Général {#general-11}

Title
: Le titre de la modale.<br>
**Valeur**: chaîne ou expression

#### Apparence {#appearance-13}

Size
: L'échelle de la modale.<br>
**Valeurs fournies**: sm, md, lg

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies**: on, off

#### Événements {#events-7}

Event
: **Valeurs**: toggleOpen, close, open

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setIsOpen<br>
**Exemple**: `modal0.setIsOpen(true)` définit l'état de `modal0` sur ouvert.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-13}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-6}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}



{{% collapse-content title="Saisie numérique" level="h3" %}}
Les composants de saisie numérique ont les propriétés suivantes.

Label
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Default value
: La valeur par défaut que l'application renseigne dans la zone de saisie.<br>
**Valeur**: nombre ou expression qui s'évalue en un nombre

Placeholder text
: Le texte qui s'affiche lorsqu'aucune valeur n'est saisie.<br>
**Valeur**: chaîne ou expression

#### Validation {#validation}

Min
: La valeur minimale que la saisie numérique accepte.<br>
**Valeur**: nombre ou expression qui s'évalue en un nombre

Max
: La valeur maximale que la saisie numérique accepte.<br>
**Valeur**: nombre ou expression qui s'évalue en un nombre

#### Apparence {#appearance-14}

Is Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-8}

Event
: **Valeur**: change

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple** : `numberInput0.setValue(3)` définit la valeur du composant `numberInput0` sur `3`.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-14}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-7}

Pour voir ce composant en contexte, consultez le modèle d'application [ECS Task Manager][4].
{{% /collapse-content %}}




{{% collapse-content title="Radio" level="h3" %}}
Les composants radio ont les propriétés suivantes.

#### Général {#general-12}

Label
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Options
: La liste des options de bouton radio parmi lesquelles un utilisateur peut choisir. Le format est un tableau d'objets où chaque objet se compose d'une paire clé-valeur `label` et `value`.<br>
**Valeur**: expression<br>
**Exemple**:<br>
:    ```json
     ${[
       {
           "label": "Staging",
           "value": "staging"
       },
       {
           "label": "Production",
           "value": "production"
       }
     ]}
     ```

Default value
: La valeur qui est sélectionnée lors du chargement de la radio.<br>
**Valeur** : chaîne ou expression

#### Apparence {#appearance-15}

Is Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-9}

Event
: **Valeur**: change

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple** : `radioButtons0.setValue("production")` définit la valeur du composant `radioButtons0` sur `"production"`.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-15}

Affiche les paires de propriétés et de valeurs au format JSON.
{{% /collapse-content %}}



{{% collapse-content title="React renderer" level="h3" %}}
Les composants React renderer possèdent les propriétés suivantes.

#### Général {#general-13}

React Component Definition
: Le code qui est exécuté pour créer un composant React.<br>

Component Input Props
: Les props qui sont transmises au composant React et qui sont accessibles dans l'objet props du composant.

Initial Component State
: Définit les valeurs d'état initiales pour votre composant. Cet état est utilisé lors du premier rendu du composant ou si aucun état n'a encore été défini. Le composant peut accéder à ces données via <code>props.state</code>.<br>

#### Apparence {#appearance-16}

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies**: on, off

#### Événements {#events-10}
Event
: **Valeurs**: définir l'état du composant, fonction de rappel

Function Name
: **Valeur**: <code>props.customFunctionName</code>

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

#### Inspecter les données {#inspect-data-16}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Relations {#relationships}

Affiche les dépendances de données entre le React renderer et les composants de l'application.

#### Exemple {#example-8}

Pour un exemple montrant comment utiliser ce composant, consultez [React renderer][11].

{{% /collapse-content %}}



{{% collapse-content title="Recherche" level="h3" %}}
Les composants de recherche possèdent les propriétés suivantes.

#### Général {#general-14}

Default value
: La valeur par défaut que l'application renseigne dans la zone de recherche.<br>
**Valeur**: chaîne ou expression

Placeholder text
: Le texte qui s'affiche lorsqu'aucune valeur n'est saisie.<br>
**Valeur**: chaîne ou expression

#### Apparence {#appearance-17}

Size
: L'échelle du composant de recherche.<br>
**Valeurs fournies**: sm, md, lg

Is Loading
: Affiche un indicateur de chargement.<br>
**Valeurs fournies**: on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-11}

Event
: **Valeurs** : change, submit

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple** : `search0.setValue("search query")` définit la valeur du composant `search0` sur `"search query"`.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

Pour plus d'informations sur les événements, consultez [Events][1].

#### Inspecter les données {#inspect-data-17}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-9}

Pour voir ce composant en contexte, consultez le plan d'application [EC2 Instance Manager][3].
{{% /collapse-content %}}

{{% collapse-content title="Sélection" level="h3" %}}
Les composants de sélection ont les propriétés suivantes.

#### Général {#general-15}

Label
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Placeholder text
: Le texte qui s'affiche lorsqu'aucune valeur n'est saisie.<br>
**Valeur**: chaîne ou expression

Options
: La liste des options de sélection parmi lesquelles un utilisateur peut choisir. Le format est un tableau d'objets où chaque objet se compose d'une paire clé-valeur `label` et `value`. <br>
**Valeur**: expression<br>
**Exemple**:<br>
:     ```json
      ${[
        {
            "label": "Staging",
            "value": "staging"
        },
        {
            "label": "Production",
            "value": "production"
        }
      ]}
      ```

Default value
: La valeur qui est sélectionnée lors du chargement du Select.<br>
**Valeur** : chaîne ou expression

Is Multiselect
: Détermine si l'utilisateur peut sélectionner plus d'une option à la fois.<br>
**Valeurs fournies** : on, off

#### Apparence {#appearance-18}

Is Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-12}

Event
: **Valeur**: change

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple**: `select0.setValue("staging")` définit la valeur du composant `select0` sur `"staging"`.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-18}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-10}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Panneau latéral" level="h3" %}}
Les composants de panneau latéral ont les propriétés suivantes.

#### Général {#general-16}

Title
: Le titre du panneau latéral.<br>
**Valeur**: chaîne

#### Apparence {#appearance-19}

Width
: Détermine la largeur du panneau latéral. Un signe de pourcentage (`%`) doit être inclus après la valeur.<br>
**Valeur**: entier

Masquer le bouton de fermeture
: Détermine si le panneau latéral affiche un X pour fermer le panneau.<br>
**Valeurs fournies**: on, off

#### Événements {#events-13}

Event
: **Valeurs** : toggle open, close, open

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setIsOpen<br>
**Exemple** : `sidePanel0.setIsOpen(true)` définit l'état de `sidePanel0` sur open.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-19}

Affiche les propriétés et les valeurs au format JSON.

{{% /collapse-content %}}


{{% collapse-content title="Onglet" level="h3" %}}

Les composants d'onglet ont les propriétés suivantes.

#### Tabs {#tabs}

Une liste de vues d'onglets. Utilisez le ({{< ui >}}\+{{< /ui >}}) pour ajouter des vues supplémentaires.


#### Style {#style-1}

Style
: Le style de coloration utilisé pour le composant d'onglet.<br>
**Valeurs fournies**: Default, purple, pink, orange, red, green

Alignment
: La manière dont les onglets sont alignés au sein du composant d'onglet.<br>
**Valeurs fournies**: Horizontal (→), vertical (↓)

Impact
: Contrôle si l'arrière-plan de l'onglet sélectionné est entièrement coloré ou si seule une petite bande en bas est colorée.<br>
**Valeurs fournies**: High, low


#### Apparence {#appearance-20}

Hide Tabs
: Contrôle si les marqueurs d'onglet sont affichés.<br>
**Valeurs fournies**: on, off

Hide Body
: Contrôle si le corps des onglets est affiché.<br>
**Valeurs fournies** : on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-14}

Event
: **Valeur**: change

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setTabIndex<br>
**Exemple** : `tab0.setTabIndex(0)` définit la valeur du composant `tab0` sur le premier onglet.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-20}

Affiche les paires de propriétés et de valeurs au format JSON.

{{% /collapse-content %}}

{{% collapse-content title="Tableau" level="h3" %}}

Les composants de tableau possèdent les propriétés suivantes.

#### Général {#general-17}

Title
: Un titre pour le tableau. Sélectionnez {{< ui >}}Markdown{{< /ui >}} pour un formatage personnalisé.<br>
**Valeur**: chaîne

Data source
: Le tableau d'objets à afficher dans un tableau.<br>
**Valeurs**: requête, données de démonstration, composants

#### Colonnes {#columns}

Chaque colonne de données provenant de la source de données est représentée ici et possède les propriétés suivantes :

Label
: Le texte qui s'affiche en haut de la colonne.<br>
**Valeur**: chaîne ou expression

Data path
: Chemin JSON pour accéder aux valeurs imbriquées dans les objets et les tableaux d'une colonne donnée.<br>
**Valeur**: chaîne ou expression

Formatting
: Le type de format que prend la colonne.<br>
**Valeurs fournies**: chaîne, lien, pastille de statut, date / heure, markdown, tags, barre de pourcentage, nombre, barre de score, avatar

Sortable
: Détermine si l'utilisateur peut effectuer un tri par colonne.<br>

Copyable
: Détermine si l'utilisateur peut cliquer pour copier le contenu de la colonne.<br>
**Valeurs fournies**: on, off

Filterable
: Détermine si une option de filtrage est disponible pour la colonne.<br>
**Valeurs fournies**: on, off

Certaines colonnes possèdent des propriétés supplémentaires basées sur leur propriété {{< ui >}}Formatting{{< /ui >}}.

#### Pagination {#pagination}

Has summary
: Détermine s'il faut afficher un résumé de pagination directement au-dessus du tableau.<br>
**Valeurs fournies**: on, off

Page size
: Nombre de lignes à afficher par page.<br>
**Valeur**: nombre ou expression qui s'évalue en un nombre

Total count
: Nombre total de lignes à afficher dans le tableau.<br>
**Valeur**: nombre ou expression qui s'évalue en un nombre

Type
: Détermine le type de pagination.<br>
**Valeurs fournies**: côté client, côté serveur

#### Tri {#sorting}

Sélectionnez la colonne et la direction pour le tri par défaut du tableau.
Column
: La colonne selon laquelle effectuer le tri.<br>
**Valeur**: nom de colonne

Direction
: La direction du tri.<br>
**Valeurs fournies**: croissant, décroissant

#### Actions sur les lignes {#row-actions}

L'ajout d'une action de ligne ajoute une colonne {{< ui >}}Actions{{< /ui >}} au tableau, qui contient des boutons d'action définis par l'utilisateur. Les lignes peuvent avoir plusieurs actions. Les actions possèdent les propriétés suivantes :

Label
: Le texte qui s'affiche sur le bouton d'action.<br>
**Valeur**: chaîne ou expression

Primary
: Conçu pour attirer l'attention de l'utilisateur sur la ou les actions les plus importantes pour une page ou un workflow donné.<br>
**Valeurs fournies**: on, off

Borderless
: Supprime la bordure de tout bouton. Au survol, il obtient un remplissage d'arrière-plan.<br>
**Valeurs fournies**: on, off

Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Level
: Contrôle la couleur du bouton en fonction de son intention.<br>
**Valeurs fournies** : default, danger, success, warning

Reactions
: Les réactions que le bouton déclenche. Un bouton peut avoir plusieurs réactions.<br>
**Valeurs fournies** : download file, open modal, close modal, open side panel, close side panel, open URL, set component state, set state variable value, toast notification, trigger action, custom<br>
Certains types de réaction possèdent des propriétés supplémentaires.

#### Apparence {#appearance-21}

Scrollable
: Détermine les manières dont le tableau est défilable.<br>
**Valeurs fournies** : both, vertical

Is Loading
: Affiche un indicateur de chargement.<br>
**Valeurs fournies** : on, off

Has text wrapping
: Détermine si le texte de la cellule revient à la ligne.<br>
**Valeurs fournies** : on, off

Has subrows
: Active les sous-lignes pour chaque ligne. Incluez la propriété `subRows` dans la source de données.<br>
**Valeurs fournies** : on, off

Is searchable
: Détermine s'il faut ajouter une barre de recherche au tableau. <br>
**Valeurs fournies** : on, off

Show sort options
: Ajoute un bouton {{< ui >}}Sort{{< /ui >}} au tableau qui offre aux utilisateurs des options de tri.<br>
**Valeurs fournies** : on, off

Show column options
: Ajoute un bouton {{< ui >}}Columns{{< /ui >}} au tableau pour afficher, masquer ou réorganiser les colonnes du tableau.<br>
**Valeurs fournies** : on, off

Has date range filter
: Ajoute un filtre de plage de dates au tableau.<br>
**Valeurs fournies** : on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-15}

Event
: **Valeurs** : pageChange, tableRowClick

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setSelectedRow<br>
**Exemples** : <ul><li>`table0.setSelectedRow(0)` définit la propriété `selectedRow` de `table0` sur la première ligne.</li><li>`table0.setSelectedRow(null)` efface la propriété `selectedRow`.</li></ul>
: setPageIndex<br>
**Exemple** : `table0.setPageIndex(0)` définit la propriété `pageIndex` de `table0` sur la première page.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-21}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-11}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].

Pour des exemples montrant comment utiliser les fonctionnalités avancées des tables, consultez [Tables][6].

{{% /collapse-content %}}



{{% collapse-content title="Texte" level="h3" %}}
Les composants texte possèdent les propriétés suivantes.

#### Général {#general-18}

Content
: Le contenu affiché par le composant.<br>
**Valeur**: chaîne ou expression

Content type
: Détermine comment le texte est rendu. Lorsque {{< ui >}}Markdown{{< /ui >}} est sélectionné, le composant texte prend en charge la [syntaxe Markdown de base][8], y compris les images que vous hébergez ailleurs.<br>
**Valeurs fournies**: texte brut, Markdown

#### Apparence {#appearance-22}

Text alignment
: Détermine l'alignement horizontal du texte au sein du composant.<br>
**Valeurs fournies** : aligner à gauche, aligner au centre, aligner à droite

Vertical alignment
: Détermine l'alignement vertical du texte au sein du composant.<br>
**Valeurs fournies** : aligner en haut, aligner au centre, aligner en bas

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-22}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Relations {#relationships-1}

Affiche les dépendances de données entre les données de tableau et les composants de l'application.

#### Exemple {#example-12}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Zone de texte" level="h3" %}}
Les composants de zone de texte possèdent les propriétés suivantes.

Label
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Default value
: La valeur qui est sélectionnée au chargement de la zone de texte.<br>
**Valeur**: chaîne ou expression

Placeholder text
: Le texte qui s'affiche lorsqu'aucune valeur n'est saisie.<br>
**Valeur**: chaîne ou expression

#### Apparence {#appearance-23}

Is Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies**: on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-16}

Event
: **Valeurs** : change, submit

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple** : `textArea0.setValue("text")` définit la valeur du composant `textArea0` sur `"text"`.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-23}

Affiche les paires de propriétés et de valeurs au format JSON.
{{% /collapse-content %}}


{{% collapse-content title="Saisie de texte" level="h3" %}}
Les composants de saisie de texte possèdent les propriétés suivantes.

Label
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Default value
: La valeur sélectionnée au chargement de la saisie de texte.<br>
**Valeur**: chaîne ou expression

Placeholder text
: Le texte qui s'affiche lorsqu'aucune valeur n'est saisie.<br>
**Valeur**: chaîne ou expression

#### Apparence {#appearance-24}

Is Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies**: on, off

Is Visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-17}

Event
: **Valeurs** : change, submit

Reaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Evénements][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple** : `textInput0.setValue("text")` définit la valeur du composant `textInput0` sur `"text"`.
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-24}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-13}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal {{< ui >}}#app-builder{{< /ui >}} sur le [Datadog Community Slack][5].


[1]: /fr/actions/app_builder/events
[2]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=datadog_metrics_and_monitors&viewMode=preview
[3]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ec2_instance_manager&viewMode=preview
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ecs_task_manager&viewMode=preview
[5]: https://chat.datadoghq.com/
[6]: /fr/actions/app_builder/components/tables/
[7]: /fr/actions/app_builder/expressions
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /fr/actions/app_builder/events/#state-functions
[10]: /fr/actions/app_builder/components/custom_charts/
[11]: /fr/actions/app_builder/components/react_renderer/
[12]: /fr/actions/app_builder/components/reusable_modules/
[13]: /fr/actions/app_builder/events/#events-and-reactions
[14]: /fr/actions/app_builder/events/#custom-reactions