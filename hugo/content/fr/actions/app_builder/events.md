---
aliases:
- /fr/app_builder/events
- /fr/service_management/app_builder/events
description: Configurez les déclencheurs d'événements et les réactions des composants
  de l'interface utilisateur, y compris les fonctions d'état pour les interactions
  et comportements dynamiques de l'application.
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: Documentation
  text: Créer des applications
- link: /actions/app_builder/components/
  tag: Documentation
  text: Composants
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: Centre d'apprentissage
  text: Créez des applications en libre-service avec App Builder pour les intégrations
    tierces.
title: Events
---
Les composants de l'interface utilisateur peuvent déclencher des réactions sur un {{< ui >}}Event{{< /ui >}}. Les déclencheurs d'événements diffèrent selon le composant. Par exemple, un composant bouton peut déclencher une réaction sur un événement de clic, et un composant tableau peut déclencher une réaction sur un changement de page ou un événement de clic sur une ligne de tableau. Pour voir quels déclencheurs d'événements sont disponibles pour un composant donné, consultez [Composants][1].

Un événement peut définir l'état d'un composant d'interface utilisateur, ouvrir ou fermer une fenêtre modale, déclencher une autre requête ou même exécuter du JavaScript personnalisé.

Par exemple, le blueprint [Résumé de PR GitHub][2] utilise un bouton {{< ui >}}Summarize{{< /ui >}} avec un événement qui se déclenche lors d'un clic. L'événement utilise la réaction {{< ui >}}Trigger Query{{< /ui >}} qui exécute la requête `summarizePulls`.

En plus de travailler manuellement avec les événements, vous pouvez utiliser Bits AI pour configurer des gestionnaires d'événements, configurer des actions pilotées par les événements et optimiser la logique événementielle :
   1. Cliquez sur l'icône {{< ui >}}Build with AI{{< /ui >}} (**<i class="icon-bits-ai"></i>**).
   1. Saisissez une invite personnalisée pour un événement, ou essayez l'invite `How can you help me with events?`.


## Événements et réactions {#events-and-reactions}

Dans App Builder, les événements et les réactions fonctionnent ensemble pour déterminer le comportement des composants. 

Les composants (tels que les clics sur un bouton ou les soumissions de formulaire) et les actions (telles que l'exécution terminée) peuvent tous deux déclencher des événements. Les événements diffèrent selon le composant que vous utilisez. Pour les détails des événements spécifiques aux composants, consultez [Composants][1].

Les réactions spécifient ce qui se passe lorsqu'un événement est déclenché. Tout composant capable de déclencher un événement dispose des réactions suivantes: 
- {{< ui >}}Close Modal{{< /ui >}}
- {{< ui >}}Custom{{< /ui >}}
- {{< ui >}}Download File{{< /ui >}}
- {{< ui >}}Open Modal{{< /ui >}}
- {{< ui >}}Open Side Panel{{< /ui >}}
- {{< ui >}}Close Side Panel{{< /ui >}}
- {{< ui >}}Open URL{{< /ui >}}
- {{< ui >}}Set Component State{{< /ui >}}
- {{< ui >}}Set State Variable Value{{< /ui >}}
- {{< ui >}}Toast Notification{{< /ui >}}
- {{< ui >}}Trigger Action{{< /ui >}}

### Réactions personnalisées {#custom-reactions}

Les réactions personnalisées permettent des cas d'utilisation plus avancés ou un comportement personnalisé au-delà des réactions intégrées. Par exemple, vous pouvez exécuter des actions de manière conditionnelle en fonction d'autres données dans l'application. L'exemple suivant déclenche différentes actions en fonction de l'équipe de l'utilisateur actuel :

```javascript
${() => {
    console.log("Trigger actions by team")
    const teams = global?.user?.teams ?? []
    if (teams.some(t => t?.name === "team1")) {
        makeRequest0?.fetch()
    } else if (teams.some(t => t?.name === "team2")) {
        makeRequest1?.fetch()
    } else {
        makeRequest2?.fetch()
    }
}}
```

## Fonctions d'état {#state-functions}

App Builder fournit des fonctions pour certains types de changements d'état de l'application. Ces fonctions sont disponibles avec la réaction {{< ui >}}Set Component State{{< /ui >}} pour des composants spécifiques et dans les hooks post-requête.

setIsOpen
: Définit le statut d'une modale sur ouvert ou fermé en fonction de la valeur booléenne que vous fournissez.<br>
**Exemple**: Consultez la section de la page de documentation [Composants][1] pour le composant **modal**.

setPageIndex
: Définit la propriété `pageIndex` du composant de table sur la page que vous spécifiez. Fonctionne avec le type de pagination côté serveur.<br>
**Exemple**: Consultez la section de la page de documentation [Composants][1] pour le composant **table**.

setSelectedRow
: Définit la propriété `selectedRow` du composant de table sur la ligne que vous spécifiez.<br>
**Exemple** : Consultez la section de la page de documentation [Composants][1] pour le composant **table**.

setTabIndex
: Définit la propriété `selectedTabIndex` du composant de table sur l'index d'onglet que vous spécifiez.<br>
**Exemple** : Consultez la section de la page de documentation [Composants][1] pour le composant **tab**.

setValue
: Définit la valeur d'un élément sur la valeur que vous fournissez à la fonction.<br>
**Exemples** : Consultez les sections de la page de documentation [Composants][1] pour les composants **form**, **number input**, **radio button**, **search**, **select**, **text area** et **text input**.

Pour voir quelles fonctions d'état sont disponibles pour un composant donné, consultez [Composants][1].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [Datadog Community Slack][8].

[1]: /fr/actions/app_builder/components
[2]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[8]: https://chat.datadoghq.com/