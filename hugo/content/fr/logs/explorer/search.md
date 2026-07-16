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

## Présentation

Bien que les listes de logs puissent vous fournir des informations précieuses, il est parfois préférable d'analyser les données en agrégeant les logs. Pour consulter ces agrégations, recherchez des logs dans le [Log Explorer][5] et affichez les données sous forme de séries temporelles, de top lists, de cartes proportionnelles, de graphiques circulaires ou de tableaux.

La fonctionnalité de recherche du Log Explorer vous permet de définir un intervalle ainsi qu'une requête de recherche. Vous pouvez rechercher des paires `key:value` tout comme du texte intégral.

## Requête de recherche

Par exemple, pour filtrer les logs qui possèdent un certain statut d'erreur et ont été générés par un service de boutique en ligne spécifique au cours des cinq dernières minutes, vous pouvez créer une requête personnalisée comme `service:payment status:error rejected`, puis définir l'intervalle sur `Past 15 minutes` :

{{< img src="logs/explorer/search_filter.png" alt="Créer une requête de recherche dans le Log Explorer qui filtre les logs d'erreur associés aux paiements rejetés pour un service de boutique en ligne" style="width:100%;" >}}

Les [logs indexés][1] prennent en charge les recherches de texte intégral ainsi que les recherches de paires `key:value`.

**Remarque** : pour effectuer une recherche `key:value`, vous n'avez **pas besoin** de [déclarer une facette][5].

## Saisie automatique

Utilisez la fonctionnalité de saisie automatique de la barre de recherche pour compléter votre requête en utilisant :
- Des clés et des valeurs existantes dans vos logs
- Vos recherches récentes (les recherches récentes des autres utilisateurs ne sont pas affichées)
- Vues enregistrées

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="La barre de recherche des logs affichant service: comme requête et emailer, balancer-checker, ad-server et vpc comme options de saisie automatique" style="width:80%;">}}

### Complétion automatique des facettes et valeurs

La barre de recherche suggère automatiquement des facettes en fonction de votre saisie. Ces facettes s'affichent dans le même ordre que celui du [volet des facettes][5]. Si une facette a un nom d'affichage défini, celui-ci est affiché sur le côté droit du menu déroulant. Les facettes qui ne sont pas configurées pour être affichées dans le volet des facettes ne sont pas suggérées automatiquement dans la barre de recherche.

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="Barre de recherche de logs affichant `network` comme requête et les facettes @network.bytes_written, @network.client.ip et @network.interface comme options d'autocomplétion." style="width:80%;">}}

Après avoir sélectionné une facette et saisi le caractère `:`, la barre de recherche propose automatiquement des valeurs. Ces valeurs sont affichées par ordre décroissant en fonction du nombre de logs contenant cette paire `facette:valeur` au cours des 15 dernières minutes. Le nombre estimé de logs contenant cette valeur est affiché dans la partie droite du menu déroulant. Par exemple, le service `balance-checker` apparaît en premier dans la liste des valeurs suggérées automatiquement pour la facette `service`, car son nombre de logs `2.66M` est le plus élevé :

{{< img src="logs/explorer/search/log_value_autocomplete.png" alt="Barre de recherche de logs affichant `service:` comme requête et les valeurs balance-checker, ad-server, fraud-detector et trade-executor comme options de complétion automatique." style="width:80%;">}}

### Complétion automatique des recherches récentes

Le Log Explorer conserve vos 100 recherches les plus récentes. Les recherches récentes effectuées par d'autres utilisateurs ne sont ni conservées ni affichées. La barre de recherche propose automatiquement les quatre recherches les plus récentes en fonction de votre saisie, la recherche la plus récente étant affichée en premier. Elle indique également à quand remonte chaque recherche récente. Par exemple, si vous saisissez `service:web-store status:error` dans la barre de recherche, les quatre recherches les plus récentes contenant ces termes apparaissent en fonction de leur ancienneté, chacune spécifiant une erreur différente :

{{< img src="logs/explorer/search/log_recent_searches.png" alt="Barre de recherche de logs affichant `service:web-store status:error` comme requête ainsi que les recherches récentes pour les différentes erreurs du service de boutique en ligne comme options de complétion automatique" style="width:80%;">}}

### Complétion automatique des vues enregistrées

Vous pouvez créer des vues enregistrées dans le Log Explorer pour enregistrer des requêtes et des données de contexte supplémentaires et ainsi les retrouver facilement plus tard. La barre de recherche suggère automatiquement les vues enregistrées qui correspondent à votre saisie. Les vues enregistrées apparaissent dans le même ordre que celui du volet des vues enregistrées, vos vues préférées étant affichées en premier. Le nom de la vue enregistrée, la requête enregistrée et la photo de profil de l'utilisateur qui l'a mise à jour pour la dernière fois sont affichés dans le menu déroulant. Si la requête d'une vue enregistrée est trop longue pour être affichée dans le menu déroulant, la requête complète apparaît lorsque vous passez votre curseur dessus. L'adresse e-mail du dernier utilisateur ayant mis à jour la vue enregistrée s'affiche également lorsque vous passez votre curseur sur sa photo de profil.

{{< img src="logs/explorer/search/log_autocomplete_saved_views.png" alt="Barre de recherche de logs affichant `service:web-store status:error` comme requête ainsi que les vues enregistrées pour les différentes erreurs du service de boutique en ligne comme options de complétion automatique" style="width:80%;">}}

## Syntaxe de recherche

La syntaxe est mise en forme de façon à différencier clairement les types de saisies, telles que les clés (par exemple, l'attribut `@merchant_name`), les valeurs (par exemple, le nom d'un marchand spécifique), le texte libre (par exemple, les mots-clés dans les messages de log tels que `responded 500`), ainsi que les caractères de contrôle (par exemple, les parenthèses et les deux-points). Les attributs de statut sont également mis en évidence dans des couleurs spécifiques, comme le rouge pour `error` et le bleu pour `info`.

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="Barre de recherche de logs affichant `service:auth-dotnet status:error 500 (check-token OR create-user)` comme requête, les différents éléments de la syntaxe étant mis en forme de façon à les distinguer" style="width:100%;">}}

Les statuts d'erreur vous indiquent clairement la partie de la requête qui présente une erreur de syntaxe et la façon d'y remédier. Par exemple :
- Si vous saisissez la requête `service:` sans valeur, le message `Missing value in key:value pair` s'affiche lorsque vous survolez la requête avec votre souris.
- Si vous saisissez des parenthèses pour indiquer une plage dans votre requête mais que vous ne spécifiez pas les valeurs haute et basse, le message `Expected term but end of input found` s'affiche.
- Si vous saisissez plusieurs valeurs pour un champ de log mais que vous oubliez la parenthèse fermante, comme `service:(web-store OR auth-dotnet`, le message `Missing closing parenthesis character` s'affiche.

{{< img src="logs/explorer/search/log_error_states.png" alt="Barre de recherche de logs affichant `service:(web-store OR auth-dotnet` comme requête avec le message `Missing closing parenthesis character`" style="width:50%;">}}

Pour commencer à rechercher des logs et à personnaliser l'intervalle dans le Log Explorer, consultez les sections [Syntaxe de recherche][3] et [Intervalles personnalisés][4].

## Désactiver la mise en forme et la complétion automatique dans la barre de recherche

Cliquez sur le bouton à droite de la barre de recherche pour effectuer une recherche en mode brut et ainsi désactiver la coloration syntaxique, la mise en forme des boutons de recherche et la complétion automatique :

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="Barre de recherche de logs affichant `service:auth-dotnet status:error 500 (check-token OR create-user)` comme requête en mode de recherche brute" style="width:100%;">}}

Vous pouvez interagir avec la barre de recherche à l'aide de la souris, mais aussi avec des raccourcis clavier. Par exemple, utilisez `CMD-A` pour sélectionner le texte, `CMD-C` pour copier le texte, `CMD-X` pour couper le texte, et `CMD-V` pour coller le texte.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/indexes
[2]: /fr/logs/explorer/facets/
[3]: /fr/logs/search-syntax
[4]: /fr/dashboards/guide/custom_time_frames
[5]: /fr/logs/explorer/