---
aliases:
- /fr/service_management/app_builder/expressions
description: Utilisez des expressions JavaScript dans App Builder pour créer des interactions
  personnalisées entre les composants, les requêtes et l'état de l'application.
further_reading:
- link: /actions/app_builder/build/
  tag: Documentation
  text: Créer des applications
- link: /actions/app_builder/components/
  tag: Documentation
  text: Composants
title: Expressions JavaScript
---
Vous pouvez utiliser des expressions JavaScript (JS) n'importe où dans App Builder pour créer des interactions personnalisées entre les différentes parties de votre application. Lorsque vous commencez une expression, App Builder propose des suggestions de saisie semi-automatique basées sur les requêtes et les composants existants dans votre application. Cliquez sur une suggestion de saisie semi-automatique pour l'utiliser dans votre expression, ou utilisez les touches fléchées de votre clavier et effectuez une sélection avec la touche Entrée.

{{< img src="actions/app_builder/app-builder-variable.png" alt="Si vous n'êtes pas sûr de ce qu'il faut saisir comme expression, tapez ${ pour ouvrir un menu de suggestions avec toutes les expressions disponibles" style="width:70%;" >}}

Certains champs, comme [transformation post-requête][1], affichent un éditeur de code par défaut et acceptent du JS brut. Dans tous les autres champs, entourez vos expressions JS de `${}`. Par exemple, pour interpoler les valeurs de deux composants de saisie de texte nommés `textInput0` et `textInput1` dans la propriété {{< ui >}}Content{{< /ui >}} d'un composant texte (et ajouter un point d'exclamation), utilisez l'expression `${textInput0.value} ${textInput1.value}!`.

{{< img src="actions/app_builder/interpolation-2.png" alt="Le composant texte se remplit avec les mots 'Hello' et 'World', chacun interpolé à partir d'une valeur de composant de saisie de texte" style="width:70%;" >}}

App Builder accepte la syntaxe JavaScript standard, avec les mises en garde suivantes :
- Le résultat de l'expression doit correspondre au résultat attendu par la propriété du composant ou de la requête. Par exemple, la propriété {{< ui >}}Is Visible{{< /ui >}} du composant texte attend un booléen. Pour savoir quel type de données une propriété de composant attend, consultez [Afficher les propriétés du composant](#view-component-properties).
- Votre code dispose d'un accès en lecture seule à l'état de l'application, mais App Builder exécute le code dans un environnement isolé sans accès au Document Object Model (DOM) ou aux API du navigateur.

Vous pouvez également utiliser Bits AI pour travailler avec des expressions JS :
   1. Cliquez sur l'icône {{< ui >}}Build with AI{{< /ui >}} (**<i class="icon-bits-ai"></i>**).
   1. Saisissez une invite personnalisée ou essayez l'invite `How can you help me with JavaScript expressions?`.

## Afficher les propriétés du composant {#view-component-properties}

Avant de créer une expression, il est utile de connaître les propriétés disponibles ainsi que les valeurs par défaut ou actuelles du composant avec lequel vous souhaitez interagir.

Vous pouvez afficher les propriétés et les valeurs disponibles pour un composant de la manière suivante :
- {{< ui >}}App State{{< /ui >}} : Fournit les propriétés et les valeurs de tous les composants et requêtes de votre application, ainsi que des variables globales telles que les variables d'état ou les variables de modèle de dashboard.
- {{< ui >}}Inspect Data{{< /ui >}} : Fournit les propriétés et les valeurs d'un composant ou d'une requête spécifique dans votre application.
- L'onglet {{< ui >}}Admin Console{{< /ui >}} : {{< ui >}}Data{{< /ui >}} du {{< ui >}}Admin Console{{< /ui >}} fournit les propriétés et les valeurs de tous les composants et requêtes de votre application.

{{% collapse-content title="État de l'application" level="h3" %}}
Pour accéder à {{< ui >}}App State{{< /ui >}} :
1. Cliquez sur {{< ui >}}App Properties{{< /ui >}} dans le panneau latéral gauche.
1. Faites défiler jusqu'à la section {{< ui >}}App State{{< /ui >}}.

{{< img src="actions/app_builder/app-state-2.png" alt="La section App State dans App Properties" style="width:50%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Inspect Data" level="h3" %}}
Pour accéder à {{< ui >}}Inspect Data{{< /ui >}} :
1. Cliquez sur la requête ou le composant que vous souhaitez inspecter.
1. Faites défiler jusqu'à la section {{< ui >}}Inspect Data{{< /ui >}}.

{{< img src="actions/app_builder/inspect-data-2.png" alt="La section App State dans App Properties" style="width:80%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Admin Console" level="h3" %}}
Pour accéder à l'{{< ui >}}Admin Console{{< /ui >}} :
1. Cliquez sur l'icône en forme de roue dentée ({{< ui >}}Settings{{< /ui >}}) et sélectionnez {{< ui >}}Admin Console{{< /ui >}}.
1. Cliquez sur {{< ui >}}Data{{< /ui >}}.

{{< img src="actions/app_builder/admin-console-2.png" alt="La section App State dans App Properties" style="width:50%;" >}}
{{% /collapse-content %}}

## Interactions de composants personnalisés {#custom-component-interactions}

La plupart des composants d'interface utilisateur offrent des options intégrées, telles que des bascules et l'alignement du texte, qui couvrent l'utilisation de base de l'application. Pour ajouter une interaction personnalisée à un composant, cliquez sur le symbole de l'éditeur de code ({{< ui >}}</>{{< /ui >}}) et saisissez une expression JS.

### Visibilité conditionnelle {#conditional-visibility}

Vous pouvez rendre la visibilité d'un composant dépendante d'autres composants.

Par exemple, si vous souhaitez qu'un composant texte ne soit visible que lorsque deux composants de saisie de texte nommés `textInput0` et `textInput1` contiennent des valeurs, utilisez l'expression `${textInput0.value && textInput1.value}` dans la propriété {{< ui >}}Is Visible{{< /ui >}}.

### Désactiver un composant de manière conditionnelle {#disable-a-component-conditionally}

Tout comme pour la visibilité, vous pouvez désactiver un composant à moins que certaines conditions ne soient remplies par d'autres aspects de votre application, tels que d'autres composants ou le contexte de l'application.

#### Désactiver un composant en fonction de la visibilité {#disable-a-component-based-on-visibility}

Si votre application possède un bouton qui utilise le contenu d'un composant texte pour envoyer un message, vous pouvez désactiver le bouton à moins que le composant texte ne soit visible :
1. Cliquez sur le composant bouton sur votre canevas.
1. Cliquez sur le symbole de l'éditeur de code ({{< ui >}}</>{{< /ui >}}) à côté de la propriété {{< ui >}}Is Disabled{{< /ui >}}.
1. Ajoutez l'expression `${!text0.isVisible}`.

Le composant texte est invisible et le bouton est désactivé à moins que les deux champs de saisie de texte ne soient remplis.

{{< img src="actions/app_builder/is-disabled.png" alt="Le composant texte est invisible et le bouton est désactivé à moins que les deux champs de saisie de texte ne soient remplis." style="width:100%;" >}}

#### Désactiver un composant en fonction du contexte de l'application {#disable-a-component-based-on-the-app-context}

Vous pouvez également désactiver un composant en fonction du contexte de l'application, comme l'équipe à laquelle appartient l'utilisateur.

Par exemple, vous pouvez activer un composant uniquement pour les utilisateurs qui font partie de l'équipe Gestion de produits :
1. Cliquez sur le composant bouton sur votre canevas.
1. Cliquez sur le symbole de l'éditeur de code ({{< ui >}}</>{{< /ui >}}) à côté de la propriété {{< ui >}}Is Disabled{{< /ui >}}.
1. Ajoutez l'expression `${global.user.teams[0].name == 'Product Management'}`.

### Désactiver un composant pendant le chargement {#disable-a-component-while-loading}

Un autre cas d'utilisation courant consiste à désactiver un composant pendant qu'une requête est en cours de chargement. Dans le [plan de gestion EC2][3], le composant de sélection `instanceType` est désactivé pendant que la requête `listInstances` est en cours de chargement. Pour ce faire, la propriété {{< ui >}}Is Disabled{{< /ui >}} utilise l'expression `${listInstances.isLoading}`.

{{< img src="actions/app_builder/isloading.png" alt="Le composant Select 'instanceType' est désactivé pendant que la requête 'listInstances' est en cours de chargement." style="width:100%;" >}}

## Interactions de requête personnalisées {#custom-query-interactions}

Tout comme pour les composants, vous pouvez utiliser des expressions JS pour modifier vos requêtes en fonction de l'interaction de l'utilisateur.

### Filtrer les résultats de requête selon les entrées utilisateur {#filter-query-results-on-user-input}

Le [modèle de plannings d'astreinte PagerDuty][4] filtre le résultat de la requête `listSchedules` en fonction des entrées de l'utilisateur. L'utilisateur sélectionne une équipe et un utilisateur à partir des composants de sélection `team` et `user`.

Dans la requête `listSchedules`, la transformation post-requête suivante filtre les résultats en fonction des valeurs de `team` et `user` :

{{< code-block lang="js" disable_copy="true" >}}
return outputs.body.schedules.map( s => {
    return {
        ...s,
        users: s.users.map(u => u.summary),
        teams: s.teams.map(u => u.summary)
    }
}).filter(s => {

        const matchesName = !name.value.length ? true : s.name.toLowerCase().includes(name.value.toLowerCase());
        const matchesTeam = team.value === 'Any Team' ? true : s.teams.includes(team.value);
        const matchesUser = user.value === 'Any User' ? true : s.users.includes(user.value);

        return matchesName && matchesUser && matchesTeam ;
    }) || []
{{< /code-block >}}

Définir le {{< ui >}}Run Settings{{< /ui >}} de la requête sur {{< ui >}}Auto{{< /ui >}} permet à la requête de s'exécuter chaque fois qu'un utilisateur modifie une valeur dans les composants `team` ou `user`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/app_builder/queries/#post-query-transformation
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ec2_instance_manager
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=pagerduty_oncall_manager