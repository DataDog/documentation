---
aliases:
- /fr/logs/search
description: Filtrez les logs pour retrouver des logs précis ou généraux, ou pour
  vous concentrer sur un groupe spécifique de logs pertinents.
further_reading:
- link: logs/explorer/analytics
  tag: Documentation
  text: Apprendre à regrouper les logs
- link: logs/explorer/visualize
  tag: Documentation
  text: Créer des visualisations à partir de logs
- link: /logs/explorer/export
  tag: Documentation
  text: Exporter des vues depuis le Log Explorer
title: Rechercher des logs
---
## Présentation {#overview}

Le [Log Explorer][1] vous permet de rechercher et d'afficher des logs individuels sous forme de liste. Cependant, les informations les plus précieuses proviennent souvent de l'agrégation des logs à grande échelle. À l'aide de la fonctionnalité de recherche, vous pouvez filtrer les logs et les visualiser sous forme de graphiques de séries temporelles, de listes top, de treemaps, de graphiques circulaires ou de tableaux pour mieux comprendre les tendances, les modèles et les valeurs aberrantes dans vos données de log.

## Requêtes en langage naturel {#natural-language-queries}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
Les requêtes en langage naturel ne sont pas disponibles sur le <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}
Utilisez les requêtes en langage naturel (NLQ) pour décrire ce que vous recherchez en anglais simple. Datadog traduit automatiquement votre demande en une requête de log structurée, ce qui facilite l'exploration des logs sans avoir à écrire une syntaxe complexe. Pour accéder à cette fonctionnalité, cliquez sur {{< ui >}}Ask{{< /ui >}} dans le champ de recherche.

{{< img src="/logs/explorer/search/log_explorer_nlq.mp4" alt="Requête en langage naturel dans le Log Explorer montrant comment rechercher des logs à l'aide d'expressions en anglais simple" video=true >}}

Le système traduit les entrées en langage naturel en requêtes Datadog et comprend le contexte tel que les services, les attributs, les tags et les plages temporelles. Il détecte également automatiquement les champs pertinents et permet aux utilisateurs de créer des visualisations à l'aide de descriptions simples, par exemple : « Top 20 des services par erreurs » ou « Afficher les erreurs du service X au cours des 24 dernières heures ».

Pour désactiver NLQ, vous devez disposer des [`org_management` autorisations][2]. Accédez à [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Preferences{{< /ui >}}][3] et désactivez la fonctionnalité Requêtes en langage naturel.

## Requête de recherche {#search-query}

Une recherche dans le Log Explorer se compose d'une plage temporelle et d'une requête de recherche, combinant `key:value` et [recherche plein texte][4]. Vous pouvez choisir une fenêtre temporelle pour votre recherche à l'aide du sélecteur de plage temporelle situé en haut à droite du Log Explorer. Pour plus de détails sur la définition d'une plage temporelle personnalisée, consultez la [documentation sur les plages temporelles personnalisées][5].

Pour filtrer les logs produits par un service de boutique en ligne, avec un statut d'erreur, au cours des quinze dernières minutes, créez une requête personnalisée comme `service:payment status:error rejected` et définissez la plage temporelle sur `Past 15 minutes` :

{{< img src="logs/explorer/search_filter.png" alt="Créez une requête de recherche dans le Log Explorer qui filtre les logs d'erreur des paiements rejetés pour un service de boutique en ligne" style="width:100%;" >}}

[Indexed Logs][6] prennent en charge à la fois la [recherche plein texte][4] et les requêtes de recherche `key:value`.

**Remarque** : les requêtes `key:value` **ne** nécessitent pas que vous [déclariez une facette][7] au préalable.

Pour une référence complète sur la syntaxe des requêtes, consultez la [documentation sur la syntaxe de recherche][8].

## Fonctionnalités de la barre de recherche {#search-bar-features}

La barre de recherche du Log Explorer inclut plusieurs fonctionnalités pour vous aider à rédiger des requêtes plus efficacement et avec plus de précision.

### Coloration syntaxique et validation des erreurs {#syntax-highlighting-and-error-validation}

La coloration syntaxique différencie clairement les types d'entrée : clés, valeurs, texte libre et caractères de contrôle. Par exemple, `service` et `status` sont des clés, `auth-dotnet` et `error` sont des valeurs, `500` et `check-token` sont du texte libre, et les parenthèses sont des caractères de contrôle. Les attributs de statut sont codés par couleur selon le statut (rouge pour `error`, bleu pour `info`).

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="La barre de recherche du Log Explorer affichant `service:auth-dotnet status:error 500 (check-token OR create-user)` comme requête avec une coloration syntaxique différenciable" style="width:100%;">}}

La validation des erreurs identifie les erreurs de syntaxe et suggère des corrections, telles que des valeurs manquantes dans les paires `key:value`, des requêtes de plage incomplètes ou des parenthèses non fermées.

{{< img src="logs/explorer/search/log_error_states.png" alt="La barre de recherche du Log Explorer affichant `service:(web-store OR auth-dotnet` comme requête avec le message `Caractère de parenthèse fermante manquant`" style="width:50%;">}}

### Saisie semi-automatique {#autocomplete}

La fonctionnalité de saisie semi-automatique de la barre de recherche vous aide à compléter vos requêtes en utilisant les clés et valeurs existantes dans vos logs, vos recherches récentes et vos vues enregistrées.

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="La barre de recherche du Log Explorer affichant service: comme requête et emailer, balancer-checker, ad-server et vpc comme options de saisie semi-automatique" style="width:80%;">}}

La saisie semi-automatique suggère des facettes et des valeurs en fonction de votre saisie, affichées dans l'ordre dans lequel elles apparaissent dans le [panneau des facettes][7]. Après avoir sélectionné une facette et saisi `:`, les valeurs apparaissent par ordre décroissant selon le nombre de logs des 15 dernières minutes.

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="La barre de recherche du Log Explorer affichant `network` comme requête et les facettes @network.bytes_written, @network.client.ip et @network.interface comme options de saisie semi-automatique" style="width:80%;">}}

Vos 100 recherches les plus récentes sont conservées et suggérées au fur et à mesure que vous tapez. Les vues enregistrées qui correspondent à votre requête sont également suggérées, affichées dans le même ordre que dans le panneau Saved Views.

{{< img src="logs/explorer/search/log_recent_searches.png" alt="La barre de recherche des logs affichant `service:web-store status:error` comme requête et des recherches récentes pour différentes erreurs du service web-store comme options de saisie semi-automatique" style="width:80%;">}}


## Désactiver le style et la saisie semi-automatique pour la barre de recherche {#disable-styling-and-autocomplete-for-search-bar}

Cliquez sur le bouton à droite de la barre de recherche pour effectuer une recherche en mode brut et ainsi désactiver la coloration syntaxique, la mise en forme des boutons de recherche et la complétion automatique :

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="La barre de recherche des logs affichant `service:auth-dotnet status:error 500 (check-token OR create-user)` comme requête en mode de recherche brute" style="width:100%;">}}

Vous pouvez interagir avec la barre de recherche à l'aide de votre souris, ainsi qu'en utilisant des commandes clavier. Par exemple, utilisez `CMD-A` pour sélectionner du texte, `CMD-C` pour copier du texte, `CMD-X` pour couper du texte et `CMD-V` pour coller du texte.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/
[2]: /fr/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/preferences
[4]: /fr/logs/explorer/search_syntax/#full-text-search
[5]: /fr/dashboards/guide/custom_time_frames
[6]: /fr/logs/indexes
[7]: /fr/logs/explorer/facets/
[8]: /fr/logs/search-syntax