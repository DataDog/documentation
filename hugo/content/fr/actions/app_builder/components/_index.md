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
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

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

Étiquette
: Le texte qui s'affiche sur le bouton.<br>
**Valeur**: chaîne ou expression

#### Apparence {#appearance}

Intent
: Contrôle la couleur du bouton, les couleurs représentant l'intention du bouton.<br>
**Valeurs fournies**: default, danger, success, warning

Est primaire
: Conçu pour attirer l'attention de l'utilisateur sur la ou les actions les plus importantes pour une page ou un workflow donné.<br>
**Valeurs fournies**: on, off

Est sans bordure
: Supprime la bordure de tout bouton. Au survol, il obtient un remplissage d'arrière-plan.<br>
**Valeurs fournies**: on, off

Est en chargement
: Affiche un indicateur de chargement.<br>
**Valeurs fournies** : on, off

Est désactivé
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events}

Événement
: **Valeur** : click

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

#### Inspecter les données {#inspect-data}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Valeur de l'appel" level="h3" %}}
Les composants de valeur d'appel possèdent les propriétés suivantes.

#### Général {#general-1}

Étiquette
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Valeur
: La valeur mise en évidence par le callout.<br>
**Valeur**: chaîne ou expression

Unité
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

Est en chargement
: Affiche un indicateur de chargement.<br>
**Valeurs fournies** : on, off

Est désactivé
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Est visible
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

Étiquette
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

Est multiligne
: Détermine si le texte de la case à cocher doit passer à la ligne ou être tronqué par des points de suspension.<br>
**Valeurs fournies** : on, off

Est désactivé
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-1}

Événement
: **Valeur** : change<br>

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

#### Inspecter les données {#inspect-data-2}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-2}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}



{{% collapse-content title="Conteneur" level="h3" %}}
Les composants conteneurs possèdent les propriétés suivantes.

#### Apparence {#appearance-3}

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-3}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-3}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}



{{% collapse-content title="Custom chart" level="h3" %}}
Les Custom chart components possèdent les propriétés suivantes.

#### Général {#general-3}

Spécification Vega
: Une chaîne représentant une spécification JSON Vega-Lite ou Vega valide.

#### Apparence {#appearance-4}

Est en chargement
: Affiche un indicateur de chargement.<br>
**Valeurs fournies**: on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-4}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-4}

Pour un exemple montrant comment utiliser ce composant, voir [Custom charts][10].

{{% /collapse-content %}}


{{% collapse-content title="Date picker" level="h3" %}}
Les composants Date picker possèdent les propriétés suivantes.

#### Général {#general-4}

Étiquette
: L'étiquette affichée en haut du Date picker.<br>
**Valeur**: chaîne ou expression

Info-bulle
: L'info-bulle à afficher lors du survol de l'étiquette de saisie. L'info-bulle peut contenir du markdown.<br>
**Valeur**: chaîne ou expression

Valeur par défaut
: La date par défaut du Date picker, affichée sous forme d'horodatage UNIX en millisecondes.<br>
**Valeur**: entier

Autoriser les dates futures
: Détermine si la date peut être définie après la date du jour.<br>
**Valeurs fournies**: on, off

#### Apparence {#appearance-5}

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-2}

Événement
: **Valeur**: change

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple** : Voir [State functions][9].

#### Inspecter les données {#inspect-data-5}

Affiche les propriétés et les valeurs au format JSON. Les valeurs sont affichées à la fois sous forme d'horodatage UNIX en millisecondes et au format ISO (année, mois, jour, heure, minutes, secondes et millisecondes).

{{% /collapse-content %}}


{{% collapse-content title="Outil de sélection de la plage de dates" level="h3" %}}
Les composants de sélection de plage de dates possèdent les propriétés suivantes.

#### Général {#general-5}

Période par défaut
: La période par défaut affichée par le sélecteur de date.<br>
**Valeurs fournies**: 5 dernières minutes, 30 dernières minutes, 1 dernière heure, 4 dernières heures, 1 dernier jour

#### Apparence {#appearance-6}

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies**: on, off

#### Événements {#events-3}

Événement
: **Valeur**: change

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

#### Inspecter les données {#inspect-data-6}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-5}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Séparateur" level="h3" %}}
Les composants séparateurs ont les propriétés suivantes.

#### Apparence {#appearance-7}

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-7}

Affiche les propriétés au format JSON.

{{% /collapse-content %}}


{{% collapse-content title="Entrée de fichier" level="h3" %}}
Les composants d'entrée de fichier ont les propriétés suivantes.

#### Général {#general-6}

Types de fichiers acceptés
: Détermine les types de fichiers que le composant d'entrée de fichier accepte.<br>
**Valeurs**: .csv, .json

#### Apparence {#appearance-8}

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies**: on, off

#### Événements {#events-4}

Événement
: **Valeur**: change

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

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

Ajustement
: Détermine les dimensions de l'image dans les limites du composant image.<br>
**Valeurs fournies**: fill, contain, cover, none

Remplissage
: Détermine la largeur de l'espace entre les limites de l'image et les limites du composant image.<br>
**Valeurs fournies**: none, small, medium, large

Alignement vertical
: Détermine la position verticale de l'image dans les limites du composant image.<br>
**Valeurs fournies**: aligner en haut, aligner au centre, aligner en bas

Alignement horizontal 
: Détermine la position horizontale de l'image dans les limites du composant image.<br>
**Valeurs fournies** : aligner à gauche, aligner au centre, aligner à droite

Bordure
: Détermine si le composant image possède une bordure visuelle autour de ses bords.<br>
**Valeurs fournies** : on, off

Arrière-plan transparent
: Détermine si l'arrière-plan à l'intérieur du composant image est transparent.<br>
**Valeurs fournies** : on, off

Est en chargement
: Détermine si une icône de chargement est affichée pendant le chargement de l'image.<br>
**Valeurs fournies** : on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-9}

Affiche les propriétés au format JSON.

{{% /collapse-content %}}


{{% collapse-content title="Logo d'intégration" level="h3" %}}
Les composants de logo d'intégration possèdent les propriétés suivantes.

#### Général {#general-8}

Identifiant d'intégration
: Spécifie l'icône de logo d'intégration à afficher.<br>
**Valeur**: chaîne ou expression<br>
**Exemples**: datadog, amazon-s3, postgres, okta

#### Apparence {#appearance-10}

Alignement horizontal
: Contrôle le positionnement horizontal du logo dans le composant.<br>
**Valeurs fournies**: aligner à gauche, aligner au centre, aligner à droite

Alignement vertical
: Contrôle le positionnement vertical du logo dans le composant.<br>
**Valeurs fournies** : aligner en haut, aligner au centre, aligner en bas

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

Est en chargement
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

Valeur par défaut
: La valeur par défaut que l'application renseigne dans le formulaire. Pour renseigner un champ spécifique, vous pouvez utiliser la notation JSON, par exemple `{"org":"frontend"}` pour renseigner le champ `org` avec la valeur `frontend`.<br>
**Valeur**: chaîne ou expression

#### Champs {#fields}

Chaque élément représente un champ dans le formulaire. Les champs ont chacun l'un des types suivants: `textInput`, `select`, `textArea` ou `text`.

Les champs possèdent certaines ou toutes les propriétés suivantes selon leur type de champ :

Nom du champ
: L'identifiant unique d'un champ. Vous pouvez utiliser cet identifiant pour référencer le champ dans une expression.<br>
**Valeur**: chaîne ou expression

Étiquette
: L'étiquette qui s'affiche au-dessus du champ.<br>
**Valeur**: chaîne ou expression

Contenu
: Le contenu qui s'affiche dans un champ `text`.<br>
**Valeur**: chaîne ou expression

Options
: Les options disponibles dans un champ `select`. Les options doivent être un tableau d'objets, avec une clé `const` pour la valeur de l'option et une clé `title` facultative pour l'étiquette de l'option.<br>**Valeur**: La `label` et le `value` de chaque objet peuvent être une chaîne ou une expression.<br>
Vous pouvez remplir chaque objet à l'aide de l'interface graphique (par défaut), ou basculer {{< ui >}}Raw{{< /ui >}} pour utiliser une saisie JSON brute afin de fournir l'ensemble du tableau d'objets.

Texte d'espace réservé
: Le texte qui s'affiche dans un champ `textInput` ou `textArea` lorsqu'aucune valeur n'est saisie.<br>
**Valeur**: chaîne ou expression

Est désactivé
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Est visible
: Détermine si le champ est visible dans le formulaire.<br>
**Valeurs fournies** : on, off

Est requis
: Détermine si le champ est requis pour soumettre le formulaire.<br>
**Valeurs fournies** : on, off

#### Apparence {#appearance-11}

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

Est désactivé
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

#### Événements {#events-5}

Événement
: **Valeur** : submit, change, validate

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

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

Étiquette
: Le texte qui s'affiche en haut du composant.

Valeur par défaut
: La valeur JSON par défaut que le composant affiche.

#### Apparence {#appearance-12}

Est en lecture seule
: Détermine si le composant est en lecture seule.<br>
**Valeurs fournies**: on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies**: on, off

#### Événements {#events-6}

Événement
: **Valeur**: change

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

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

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies**: on, off

#### Événements {#events-7}

Événement
: **Valeurs**: toggleOpen, close, open

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

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

Étiquette
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Valeur par défaut
: La valeur par défaut que l'application renseigne dans la zone de saisie.<br>
**Valeur**: nombre ou expression qui s'évalue en un nombre

Texte d'espace réservé
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

Est désactivé
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-8}

Événement
: **Valeur**: change

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

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

Étiquette
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
           "value": « production »
       }
     ]}
     ```

Valeur par défaut
: La valeur qui est sélectionnée lors du chargement de la radio.<br>
**Valeur** : chaîne ou expression

#### Apparence {#appearance-15}

Est désactivé
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-9}

Événement
: **Valeur**: change

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

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

Définition du composant React
: Le code qui est exécuté pour créer un composant React.<br>

Props d'entrée du composant
: Les props qui sont transmises au composant React et qui sont accessibles dans l'objet props du composant.

État initial du composant
: Définit les valeurs d'état initiales pour votre composant. Cet état est utilisé lors du premier rendu du composant ou si aucun état n'a encore été défini. Le composant peut accéder à ces données via <code>props.state</code>.<br>

#### Apparence {#appearance-16}

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies**: on, off

#### Événements {#events-10}
Événement
: **Valeurs**: définir l'état du composant, fonction de rappel

Nom de la fonction
: **Valeur**: <code>props.customFunctionName</code>

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

#### Inspecter les données {#inspect-data-16}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Relations {#relationships}

Affiche les dépendances de données entre le React renderer et les composants de l'application.

#### Exemple {#example-8}

Pour un exemple montrant comment utiliser ce composant, consultez [React renderer][11].

{{% /collapse-content %}}



{{% collapse-content title="Rechercher des monitors" level="h3" %}}
Les composants de recherche possèdent les propriétés suivantes.

#### Général {#general-14}

Valeur par défaut
: La valeur par défaut que l'application renseigne dans la zone de recherche.<br>
**Valeur**: chaîne ou expression

Texte d'espace réservé
: Le texte qui s'affiche lorsqu'aucune valeur n'est saisie.<br>
**Valeur**: chaîne ou expression

#### Apparence {#appearance-17}

Size
: L'échelle du composant de recherche.<br>
**Valeurs fournies**: sm, md, lg

Est en chargement
: Affiche un indicateur de chargement.<br>
**Valeurs fournies**: on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-11}

Événement
: **Valeurs** : change, submit

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

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

{{% collapse-content title="Sélectionner" level="h3" %}}
Les composants Select ont les propriétés suivantes.

#### Général {#general-15}

Étiquette
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Texte d'espace réservé
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
            "value": « production »
        }
      ]}
      ```

Valeur par défaut
: La valeur qui est sélectionnée lors du chargement du Select.<br>
**Valeur** : chaîne ou expression

Multiselect
: Détermine si l'utilisateur peut sélectionner plus d'une option à la fois.<br>
**Valeurs fournies** : on, off

#### Apparence {#appearance-18}

Est désactivé
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-12}

Événement
: **Valeur**: change

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

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
Les composants du panneau latéral ont les propriétés suivantes.

#### Général {#general-16}

Title
: Le titre du panneau latéral.<br>
**Valeur**: chaîne

#### Apparence {#appearance-19}

Largeur
: Détermine la largeur du panneau latéral. Un signe de pourcentage (`%`) doit être inclus après la valeur.<br>
**Valeur**: entier

Masquer le bouton de fermeture
: Détermine si le panneau latéral affiche un X pour fermer le panneau.<br>
**Valeurs fournies**: on, off

#### Événements {#events-13}

Événement
: **Valeurs** : toggle open, close, open

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setIsOpen<br>
**Exemple** : `sidePanel0.setIsOpen(true)` définit l'état de `sidePanel0` sur open.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-19}

Affiche les propriétés et les valeurs au format JSON.

{{% /collapse-content %}}


{{% collapse-content title="Onglet" level="h3" %}}

Les composants Tabs ont les propriétés suivantes.

#### Tabs {#tabs}

Une liste de vues d'onglets. Utilisez le ({{< ui >}}+{{< /ui >}}) pour ajouter des vues supplémentaires.


#### Style {#style-1}

Style
: Le style de coloration utilisé pour le composant d'onglet.<br>
**Valeurs fournies**: Par défaut, violet, rose, orange, rouge, vert

Alignement
: La manière dont les Tabs sont alignés au sein du composant Tabs.<br>
**Provided values**: Horizontal (→), vertical (↓)

Impact
: Contrôle si l'arrière-plan du Tabs sélectionné est entièrement coloré ou si seule une petite bande en bas est colorée.<br>
**Provided values**: High, low


#### Apparence {#appearance-20}

Masquer Tabs
: Contrôle si les tab markers sont affichés.<br>
**Valeurs fournies**: on, off

Masquer Body
: Contrôle si le Body des Tabs est affiché.<br>
**Valeurs fournies** : on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-14}

Événement
: **Valeur**: change

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setTabIndex<br>
**Exemple** : `tab0.setTabIndex(0)` définit la valeur du composant `tab0` sur le premier onglet.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-20}

Affiche les paires de propriétés et de valeurs au format JSON.

{{% /collapse-content %}}

{{% collapse-content title="Table (Tableau)" level="h3" %}}

Les composants de tableau possèdent les propriétés suivantes.

#### Général {#general-17}

Title
: Un titre pour le tableau. Sélectionnez {{< ui >}}Markdown{{< /ui >}} pour un formatage personnalisé.<br>
**Valeur**: chaîne

Source de données
: Le tableau d'objets à afficher dans un tableau.<br>
**Valeurs**: requête, données de démonstration, composants

#### Colonnes {#columns}

Chaque colonne de données provenant de la source de données est représentée ici et possède les propriétés suivantes :

Étiquette
: Le texte qui s'affiche en haut de la colonne.<br>
**Valeur**: chaîne ou expression

Chemin de données
: Chemin JSON pour accéder aux valeurs imbriquées dans les objets et les tableaux d'une colonne donnée.<br>
**Valeur**: chaîne ou expression

Formatage
: Le type de format que prend la colonne.<br>
**Valeurs fournies**: chaîne, lien, pastille de statut, date / heure, markdown, tags, barre de pourcentage, nombre, barre de score, avatar

Triable
: Détermine si l'utilisateur peut effectuer un tri par colonne.<br>

Copiable
: Détermine si l'utilisateur peut cliquer pour copier le contenu de la colonne.<br>
**Valeurs fournies**: on, off

Filtrable
: Détermine si une option de filtrage est disponible pour la colonne.<br>
**Valeurs fournies**: on, off

Certaines colonnes possèdent des propriétés supplémentaires basées sur leur propriété {{< ui >}}Formatting{{< /ui >}}.

#### Pagination {#pagination}

Possède un résumé
: Détermine s'il faut afficher un résumé de pagination directement au-dessus du tableau.<br>
**Valeurs fournies**: on, off

Taille de page
: Nombre de lignes à afficher par page.<br>
**Valeur**: nombre ou expression qui s'évalue en un nombre

Nombre total
: Nombre total de lignes à afficher dans le tableau.<br>
**Valeur**: nombre ou expression qui s'évalue en un nombre

Type
: Détermine le type de pagination.<br>
**Valeurs fournies**: côté client, côté serveur

#### Tri {#sorting}

Sélectionnez la colonne et la direction pour le tri par défaut du tableau.
Colonne
: La colonne selon laquelle effectuer le tri.<br>
**Valeur**: nom de colonne

Direction
: La direction du tri.<br>
**Valeurs fournies**: croissant, décroissant

#### Actions sur les lignes {#row-actions}

L'ajout d'une action de ligne ajoute une colonne {{< ui >}}Actions{{< /ui >}} au tableau, qui contient des boutons d'action définis par l'utilisateur. Les lignes peuvent avoir plusieurs actions. Les actions possèdent les propriétés suivantes :

Étiquette
: Le texte qui s'affiche sur le bouton d'action.<br>
**Valeur**: chaîne ou expression

Primaire
: Conçu pour attirer l'attention de l'utilisateur sur la ou les actions les plus importantes pour une page ou un workflow donné.<br>
**Valeurs fournies**: on, off

Sans bordure
: Supprime la bordure de tout bouton. Au survol, il obtient un remplissage d'arrière-plan.<br>
**Valeurs fournies**: on, off

Disabled
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies** : on, off

Niveau
: Contrôle la couleur du bouton en fonction de son intention.<br>
**Valeurs fournies** : default, danger, success, warning

Réactions
: Les réactions que le bouton déclenche. Un bouton peut avoir plusieurs réactions.<br>
**Valeurs fournies** : download file, open modal, close modal, open side panel, close side panel, open URL, set component state, set state variable value, toast notification, trigger action, custom<br>
Certains types de réaction possèdent des propriétés supplémentaires.

#### Apparence {#appearance-21}

Défilable
: Détermine les manières dont le tableau est défilable.<br>
**Valeurs fournies** : both, vertical

Est en chargement
: Affiche un indicateur de chargement.<br>
**Valeurs fournies** : on, off

Retour à la ligne
: Détermine si le texte de la cellule revient à la ligne.<br>
**Valeurs fournies** : on, off

A des sous-lignes
: Active les sous-lignes pour chaque ligne. Incluez la propriété `subRows` dans la source de données.<br>
**Valeurs fournies** : on, off

Est interrogeable
: Détermine s'il faut ajouter une barre de recherche au tableau. <br>
**Valeurs fournies** : on, off

Afficher les options de tri
: Ajoute un bouton {{< ui >}}Sort{{< /ui >}} au tableau qui offre aux utilisateurs des options de tri.<br>
**Valeurs fournies** : on, off

Afficher les options de colonne
: Ajoute un bouton {{< ui >}}Columns{{< /ui >}} au tableau pour afficher, masquer ou réorganiser les colonnes du tableau.<br>
**Valeurs fournies** : on, off

Possède un filtre de plage de dates
: Ajoute un filtre de plage de dates au tableau.<br>
**Valeurs fournies** : on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-15}

Événement
: **Valeurs** : pageChange, tableRowClick

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

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

Contenu
: Le contenu affiché par le composant.<br>
**Valeur**: chaîne ou expression

Type de contenu
: Détermine comment le texte est rendu. Lorsque {{< ui >}}Markdown{{< /ui >}} est sélectionné, le composant texte prend en charge la [syntaxe Markdown de base][8], y compris les images que vous hébergez ailleurs.<br>
**Valeurs fournies**: texte brut, Markdown

#### Apparence {#appearance-22}

Alignement du texte
: Détermine l'alignement horizontal du texte au sein du composant.<br>
**Valeurs fournies** : aligner à gauche, aligner au centre, aligner à droite

Alignement vertical
: Détermine l'alignement vertical du texte au sein du composant.<br>
**Valeurs fournies** : aligner en haut, aligner au centre, aligner en bas

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Inspecter les données {#inspect-data-22}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Relations {#relationships-1}

Affiche les dépendances de données entre les données de table et les composants de l'application.

#### Exemple {#example-12}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


{{% collapse-content title="Zone de texte" level="h3" %}}
Les composants de zone de texte possèdent les propriétés suivantes.

Étiquette
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Valeur par défaut
: La valeur qui est sélectionnée au chargement de la zone de texte.<br>
**Valeur**: chaîne ou expression

Texte d'espace réservé
: Le texte qui s'affiche lorsqu'aucune valeur n'est saisie.<br>
**Valeur**: chaîne ou expression

#### Apparence {#appearance-23}

Est désactivé
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies**: on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-16}

Événement
: **Valeurs** : change, submit

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple** : `textArea0.setValue("text")` définit la valeur du composant `textArea0` sur `"text"`.<br>
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-23}

Affiche les paires de propriétés et de valeurs au format JSON.
{{% /collapse-content %}}


{{% collapse-content title="Saisie de texte" level="h3" %}}
Les composants de saisie de texte possèdent les propriétés suivantes.

Étiquette
: Le texte qui s'affiche en haut du composant.<br>
**Valeur**: chaîne ou expression

Valeur par défaut
: La valeur sélectionnée au chargement de la saisie de texte.<br>
**Valeur**: chaîne ou expression

Texte d'espace réservé
: Le texte qui s'affiche lorsqu'aucune valeur n'est saisie.<br>
**Valeur**: chaîne ou expression

#### Apparence {#appearance-24}

Est désactivé
: Applique un style désactivé et supprime les interactions.<br>
**Valeurs fournies**: on, off

Est visible
: Détermine si le composant est visible pour l'utilisateur final. En mode édition, tous les composants restent visibles.<br>
**Valeurs fournies** : on, off

#### Événements {#events-17}

Événement
: **Valeurs** : change, submit

Réaction
: **Valeurs** : les exemples incluent open modal, trigger action et set component state<br>
Consultez [Events][1] pour obtenir la liste complète des réactions disponibles.

State Function
: setValue<br>
**Exemple** : `textInput0.setValue("text")` définit la valeur du composant `textInput0` sur `"text"`.
Voir [Fonctions d'état][9] pour plus d'informations.

#### Inspecter les données {#inspect-data-24}

Affiche les paires de propriétés et de valeurs au format JSON.

#### Exemple {#example-13}

Pour voir ce composant en contexte, consultez le plan d'application [Metrics Explorer & Monitors Builder][2].
{{% /collapse-content %}}


## Lectures complémentaires {#further-reading}

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