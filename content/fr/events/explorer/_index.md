---
further_reading:
- link: /api/v1/events/
  tag: Documentation
  text: API d'événements Datadog
- link: https://www.datadoghq.com/blog/datadog-events/
  tag: Blog
  text: Dépannage plus rapide grâce aux événements Datadog améliorés
kind: documentation
title: Events Explorer
---
{{< site-region region="us,eu" >}}
<div class="alert alert-warning">
  L'Events Explorer est en cours de déploiement. Tous les utilisateurs pourront y accéder au cours du 1er trimestre 2022.
</div>
{{< /site-region >}}

{{< img src="events/explorer/events-overview.png" alt="Events Explorer" style="width:100%;" >}}

L'Events Explorer affiche les événements les plus récents générés par votre infrastructure et vos services, y compris pour les déploiements de code, la santé des services, les changements de configuration et les alertes de surveillance.

## Parcourir l'Events Explorer

{{< img src="events/explorer/navigate.png" alt="Comment parcourir l'Events Explorer" style="width:100%;" >}}

Par défaut, tous les types d'événements sont affichés dans l'Events Explorer. Vous pouvez filtrer vos événements en fonction de facettes ou de requêtes de recherche.

### Volet latéral d'événement

{{< img src="events/explorer/side-panel.mp4" alt="Cliquer sur une ligne de l'Events Explorer pour ouvrir le volet latéral d'événement" style="width:100%;" video=true >}}

Cliquez sur une ligne de l'Events Explorer pour ouvrir le volet latéral d'événement. Ce dernier contient les tags et messages associés à l'événement en question.

### Onglet Event Attributes

{{< img src="events/explorer/event-attribute.png" alt="Un exemple d'onglet Event Attributes" style="width:100%;" >}}

L'onglet Event Attributes du volet latéral répertorie les attributs de l'événement au format JSON. Cliquez sur un attribut pour l'ajouter à la requête existante, l'exclure ou ajouter une colonne pour cet attribut.

Les attributs d'événement peuvent être normalisés ou enrichis lors de l'admission, grâce à des pipelines de traitement.

## Options

Cliquez sur **Options** pour personnaliser votre Events Explorer :

- Ajustez les colonnes affichées.
- Sélectionnez la taille de la liste (options compact ou expanded).
- Affichez des timestamps absolus ou relatifs. Un timestamp absolu affiche l'heure de l'événement pour le fuseau UTC (par exemple, `Aug 11 15:58.08.000`). Un timestamp relatif affiche le temps écoulé depuis l'événement (par exemple, `20 seconds ago`).
- Affichez ou masquez les tags dans vos résultats.
- Affichez ou masquez le graphique en haut de la page représentant la chronologie.

## Intervalle

Le sélecteur d'intervalle détermine la plage des événements affichés dans l'Events Explorer ou dans les analyses. Il définit également l'intervalle de la chronologie sous la barre de recherche.

Pour modifier l'intervalle, sélectionnez un intervalle prédéfini depuis la liste déroulante ou saisissez un intervalle personnalisé.

Tous les paramètres de recherche sont inclus dans l'URL. Ainsi, pour partager votre vue, il vous suffit d'envoyer son URL.

## Syntaxe de recherche

La recherche d'événements est basée sur la [syntaxe de recherche de logs][1].

Tout comme les logs, la recherche d'événements prend en charge ce qui suit :

- Opérateurs `AND`, `OR` et `-`
- Wildcards
- Caractères d'échappement
- Recherche de tags et de facettes au format `key:value`
- Recherche dans des attributs avec le préfixe `@`

Exemples de requêtes :

`source:(github OR chef)`
: Affiche les événements provenant de GitHub OU de Chef.

`host:(i-0ade23e6 AND db.myapp.com)`
: Affiche les événements provenant de `i-0ade23e6` ET de `db.myapp.com`.

`service:kafka`
: Affiche les événements provenant du service `kafka`.

`status:error`
: Affiche les événements avec un statut `error` (valeurs autorisées : `error`, `warning`, `info` et `ok`).

`availability-zone:us-east-1a`
: Affiche les événements de la zone d'accessibilité AWS `us-east-1a`.

`container_id:foo*`
: Affiche les événements provenant de tous les conteneurs dont l'ID commence par `foo`.

`@evt.name:foo`
: Affiche les événements dont l'attribut `evt.name` a pour valeur `foo`.

Consultez la [syntaxe de recherche des logs][1] pour en savoir plus.

### Facettes

Datadog indexe les attributs d'événement sous la forme de facettes ou de mesures accessibles depuis le volet latéral des facettes de l'Events Explorer, les analyses et les monitors.

Une facette présente les membres distincts d'un attribut ou d'un tag, en plus de proposer des analyses de base, comme le nombre d'événements représentés. Les facettes vous permettent d'effectuer des pivotements ou de filtrer vos ensembles de données en fonction d'un attribut donné. Pour filtrer vos données, sélectionnez les valeurs que vous souhaitez afficher.

{{< img src="events/explorer/facets-location.png" alt="Volet latéral des facettes" style="width:100%;" >}}

### Créer une facette

Pour créer une facette, cliquez sur le bouton Add a facet dans le volet latéral de gauche.

Une fois votre facette créée, la valeur de cet attribut est stockée pour toutes les nouvelles vues. Vous pouvez donc l'utiliser dans la barre de recherche et dans les volets latéraux des facettes. Il est également possible de regrouper les données des monitors d'événement et des widgets de graphique en fonction de cette facette.

## Notifications

Datadog prend en charge la syntaxe `@notifications` dans les messages des événements publiés par l'API. Exemple :

`@all`
: Envoie une notification à tous les membres de votre organisation.

`@test@example.com`
: Envoie un e-mail à `test@example.com`.

`@slack-<COMPTE_SLACK>-<NOM_CANAL>`
: Publie l'événement ou le graphique sur la chaîne Slack spécifiée.

`@webhook`
: Envoie une alerte ou déclenche le webhook. Consultez l'[article de blog sur les webhooks][2] (en anglais).

Consultez la section [Notifications][3] pour en savoir plus.

## Analyse d'événements

La fonctionnalité d'analyse d'événements renforce l'utilité de la page Events Explorer en proposant des vues, des agrégations de données et des outils de regroupement pour faciliter le dépannage et la surveillance. Vous pouvez ainsi contrôler :

- la requête utilisée pour filtrer l'ensemble de logs à analyser ;
- les dimensions à partir desquelles les données doivent être regroupées ;
- la méthode de visualisation des données agrégées et regroupées.

Vous pouvez exporter des visualisations d'analyse pour créer des widgets dans un dashboard ou un notebook.

### Créer une requête d'analyse

Créez une requête pour contrôler les données affichées dans votre analyse d'événements :

1. Choisissez l'attribut ou le tag que vous souhaitez représenter, puis ajoutez-le en tant que facette. La facette affiche le total de valeurs uniques de la variable.
    {{< img src="events/explorer/facet-to-graph.png" alt="Liste des facettes pouvant être représentées" style="width:100%;" >}}
2. Regroupez les données de votre graphique en fonction d'une facette. Vous devez ajouter un attribut en tant que facette pour pouvoir l'utiliser.
    {{< img src="events/explorer/split-graph.png" alt="Liste des facettes à partir desquelles les données peuvent être regroupées" style="width:100%;" >}}
3. Choisissez l'intervalle de votre graphique. Si vous changez l'intervalle global, cela modifie la liste des laps de temps disponibles. Vous pouvez afficher les résultats sous la forme d'une série temporelle, d'un tableau ou d'une top list.
    {{< img src="events/explorer/time-interval.png" alt="Liste des intervalles disponibles, avec la valeur par défaut de 5 secondes" style="width:100%;" >}}
4. Choisissez d'afficher les valeurs les plus élevées ou les plus faibles en fonction de la mesure sélectionnée.
    {{< img src="events/explorer/display-values.png" alt="Choisir d'afficher les valeurs les plus faibles ou les plus élevées" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/logs/explorer/search_syntax/
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /fr/monitors/notify/