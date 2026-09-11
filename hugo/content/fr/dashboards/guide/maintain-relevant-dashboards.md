---
aliases:
- /fr/graphing/faq/maintain-relevant-dashboards
- /fr/graphing/guide/maintain-relevant-dashboards
title: Pratiques recommandées pour conserver des dashboards pertinents
---

Une liste de dashboards trop encombrée risque de vous empêcher de trouver le contenu qui vous intéresse et de polluer vos recherches avec des résultats obsolètes ou non pertinents. En tirant parti de la fonction de suppression groupée et des [dashboards **récemment supprimés**][1], vous pourrez supprimer tous les dashboards dont vous n'avez plus besoin en quelques étapes et annuler toute suppression accidentelle. Ce guide aborde les sujets suivants :

- Règles générales pour identifier les dashboards non utilisés et les supprimer régulièrement
- Pratiques recommandées pour assurer la lisibilité de votre liste de dashboards

## Identifier les dashboards non utilisés

Trouver la totalité des dashboards que vous n'utilisez plus n'est pas une tâche facile : c'est pourquoi ces recommandations vous aideront à identifier la grande majorité du contenu dont vous n'avez plus besoin et à désencombrer votre liste de dashboards. Mais avant d'effectuer toute suppression, voici quelques conseils pour bien utiliser la liste des dashboards :

- Commencez par cocher l'option **All Custom** afin d'afficher la liste de tous les dashboards personnalisés. Seuls ces dashboards peuvent être supprimés.
- Vous pouvez sélectionner tous les dashboards affichés sur la page actuelle en cliquant sur la colonne des cases à cocher.
- Évitez de supprimer des dashboards partagés. Lorsqu'un dashboard dispose d'un lien de partage public ou avec authentification, le texte **SHARED** apparaît à proximité de son nom. Il est préférable de ne pas supprimer ces dashboards, car les personnes avec lesquelles il a été partagé ne pourront plus les consulter.

Pour restaurer un dashboard supprimé accidentellement, sélectionnez la liste **Recently Deleted**. Cette liste affiche les dashboards supprimés dans les 30 derniers jours, les suppressions les plus récentes étant affichées en premier. Vous pouvez également restaurer plusieurs dashboards à la fois [en utilisant l'API][2].

{{< img src="dashboards/guide/restore_deleted.png" alt="Restaurer des dashboards supprimés" style="width:80%;">}}

### Conseils pour les suppressions

#### 1. Triez les dashboard par ordre de popularité inverse

Cliquez sur la colonne **Popularity** pour trier vos dashboards par ordre de popularité inverse. Cette liste affiche automatiquement les dashboards les moins récemment modifiés en premier. Si ces dashboards sont peu populaires et n'ont pas été modifiés dans les trois derniers mois, il y a des chances que vous puissiez les supprimer.

**Datadog :** le référentiel public Datadog Miscellany (non officiel) propose un [script pour supprimer les dashboards et monitors][3] qui n'ont pas été modifiés dans les trois derniers mois.

#### 2. Recherchez les dashboards qui possèdent un titre par défaut

Vous pouvez par exemple rechercher les termes suivants :
- "'s timeboard"
- "'s screenboard"
- "'s dashboard"

La plupart des dashboards correspondant à ces termes (par exemple, “Stephanie's Dashboard Thu, Jun 3, 1:41:44 pm”) ont reçu un titre par défaut, ce qui peut être indicatif d'un dashboard de test qui a été créé rapidement et qui n'a jamais été renommé. Ces dashboards peuvent probablement être supprimés sans risque, surtout s'ils sont anciens ou peu utilisés. Par exemple, l'image qui suit affiche les résultats correspondant à la liste **All Custom** dont le titre contient “’s screenboard”, triés par ordre de popularité inverse.

**Datadog :** le référentiel public Datadog Miscellany (non officiel) propose un [script pour supprimer des dashboards en fonction de leur titre][4].

{{< img src="dashboards/guide/screenboard_search.jpeg" alt="Rechercher des dashboards dont le titre contient ''s screenboard'" style="width:80%;">}}

#### 3. Recherchez des mots-clés comme « test »

Recherchez des termes qui pourraient indiquer qu'un dashboard n'a été utilisé que temporairement, comme `test` ou `cloned`. Ces mots peuvent également être utilisés pour décrire des dashboards couramment utilisés, alors supprimez-les avec prudence en prenant soin de vérifier leur ancienneté ou leur popularité.

## Conseils pour bien gérer vos dashboards

Si un nettoyage régulier permet de réduire l'encombrement de vos dashboards, les conseils de gestion qui suivent peuvent s'avérer encore plus efficaces. En les appliquant, votre équipe pourra optimiser son utilisation des dashboards sur le long terme.

- Utilisez des listes personnalisées pour retrouver les dashboards dont vous avez besoin. Recherchez un mot-clé tel qu'un nom de service, puis sélectionnez plusieurs dashboards pour les ajouter à une liste.
- Privilégiez les notebooks ou les graphiques rapides pour les analyses ponctuelles. Lorsque vous explorez une métrique ou un graphique spécifique, utilisez les [notebooks][5] (qui ne sont pas enregistrés par défaut) ou les [graphiques rapides][6] au lieu de créer un dashboard qui devra ensuite être supprimé.
- Utilisez les [détails d'un dashboard][7] pour décrire son objectif et son fonctionnement. Votre équipe pourra ainsi mieux comprendre pourquoi un dashboard a été créé, et le dashboard pourra être utilisé par un plus grand nombre de personnes.

Vous pouvez également gérer vos dashboards en passant par l'API Dashboards, qui propose des endpoints pour effectuer des [suppressions groupées][8] et des [restaurations groupées][2].

## Annexe
**Remarque** : Datadog Miscellany est un référentiel public non officiel qui n'est pas tenu à jour par Datadog.

- [Documentation : Restaurer des dashboards supprimés depuis l'interface][1]
- [API : Endpoint de suppression de dashboards][8]
- [API : Endpoint de restauration de dashboards supprimés][2]
- [Datadog Miscellany : Supprimer les anciens dashboards et monitors][3]
- [Datadog Miscellany : Supprimer des dashboards en fonction de leur titre][4]

[1]: https://docs.datadoghq.com/fr/dashboards/list/#restore-deleted-dashboards
[2]: https://docs.datadoghq.com/fr/api/latest/dashboards/#restore-deleted-dashboards
[3]: https://github.com/DataDog/Miscellany/tree/master/remove_old_dash_monitors
[4]: https://github.com/DataDog/Miscellany/tree/master/delete_dashboards_by_text_search
[5]: https://docs.datadoghq.com/fr/notebooks/#overview
[6]: https://docs.datadoghq.com/fr/dashboards/guide/quick-graphs/#overview
[7]: https://www.datadoghq.com/blog/dashboard-details/
[8]: https://docs.datadoghq.com/fr/api/latest/dashboards/#delete-dashboards