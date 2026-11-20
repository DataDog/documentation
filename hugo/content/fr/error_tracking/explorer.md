---
description: En savoir plus sur l'Error Tracking Explorer.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentation
  text: En savoir plus sur les Monitors Error Tracking
title: Error Tracking Explorer
---
## Présentation {#overview}

{{< img src="error_tracking/error-tracking-overview-3.png" alt="Les détails d'un problème dans l'Error Tracking Explorer" style="width:100%;" >}}

L'Error Tracking Explorer vous permet d'afficher, de filtrer et d'étudier les problèmes. Un problème est un groupe d'erreurs similaires liées au même bug. Datadog crée des problèmes en calculant une empreinte pour chaque erreur à l'aide de certains de ses attributs, tels que le type d'erreur, le message d'erreur ou la trace de pile. Les erreurs ayant la même empreinte sont regroupées dans le même problème.

## Explorez vos problèmes {#explore-your-issues}

Chaque élément répertorié dans l'Error Tracking Explorer correspond à un problème et affiche des informations générales sur l'erreur, comme par exemple :

-   Le type d'erreur et le message d'erreur
-   Le chemin d'accès au fichier dans lequel les erreurs sous-jacentes se produisent
-   Informations importantes sur la durée de vie du problème :
    -   Date de première et de dernière apparition
    -   Graphique des occurrences au fil du temps
    -   Nombre d'occurrences sur la période sélectionnée

Les problèmes portent également les tags suivants :
- `New` si le problème a été détecté pour la première fois il y a moins de deux jours et qu'il est à l'état {{< ui >}}FOR REVIEW{{< /ui >}} (voir [États des problèmes][5])
- `Regression` si le problème a été {{< ui >}}RESOLVED{{< /ui >}} et s'est reproduit dans une version plus récente (voir [Regression Detection][6])
- `Crash` si l'application a subi un crash
- Présentant une [Suspected Cause][3]

### Plage de temps {#time-range}

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Plage temporelle d'Error Tracking" style="width:80%;" >}}

La plage temporelle apparaît en haut à droite de l'Explorer sous forme de chronologie. Cette fonctionnalité vous permet d'afficher les problèmes ayant des occurrences d'erreurs au cours de la période sélectionnée. Modifiez la plage temporelle en sélectionnant une plage prédéfinie dans le menu déroulant.

### Tri {#sorting}

Triez les problèmes dans la liste en utilisant l'une de ces options :
-   {{< ui >}}Relevance{{< /ui >}} combine plusieurs caractéristiques des problèmes pour donner la priorité aux problèmes liés au code, récents ou connaissant une forte hausse des occurrences. Error Tracking analyse l'ancienneté des problèmes, leurs occurrences au cours de la dernière journée, toute hausse notable des occurrences au cours de la dernière heure et les éventuels plantages de l'application qu'ils ont provoqués.
-   {{< ui >}}Count{{< /ui >}} trie les problèmes en fonction du nombre total d'occurrences sur la période sélectionnée.
-   {{< ui >}}Newest{{< /ui >}} ordonne les problèmes selon leur date de première apparition.
-   {{< ui >}}Impacted Sessions{{< /ui >}} trie les problèmes selon le nombre de [sessions RUM][4] impactées.

### Facettes {#facets}

{{< img src="/error_tracking/facets-panel-2.png" alt="Facettes d'Error Tracking" style="width:100%;" >}}

Error Tracking indexe automatiquement une liste prédéfinie d'attributs à partir de vos problèmes et en crée des facettes. Une facette affiche toutes les valeurs distinctes d'un attribut pour la période sélectionnée et fournit des analyses de base, telles que le nombre de problèmes représentés. Les facettes vous permettent de changer de perspective ou de filtrer vos problèmes en fonction de l'attribut donné.

Voici quelques attributs d'erreur couramment utilisés :
| Attribut | Description |
|-----------|-------------|
| `error.message`| Le message associé à l'erreur. |
| `error.type` | Le type ou la classe de l'erreur. |
| `error.stack` | La trace de pile associée à l'erreur. |
| `error.handling` | Indique si l'erreur a été gérée. Les erreurs APM sont considérées comme `handled` si un span parent signale une opération réussie (`HTTP 200`, `gRPC OK`) ou une gestion d'erreur réussie (`HTTP 400`, `gRPC NOT_FOUND`). Les erreurs RUM sont `unhandled` si elles ne sont pas capturées manuellement dans le code. |

Cliquez sur l'icône Edit pour voir la liste des facettes disponibles que vous pouvez afficher ou masquer.

{{< img src="/error_tracking/error-tracking-facets.png" alt="Cliquez sur l'icône crayon pour afficher ou masquer les facettes Error Tracking disponibles." style="width:100%;" >}}

### Filtres au niveau des problèmes {#issue-level-filters}

En plus des événements d'erreur, Error Tracking propose des filtres au niveau des problèmes pour affiner la liste des problèmes affichés.

{{< img src="error_tracking/issue-level-filters-2.png" alt="Filtres au niveau des problèmes dans Error Tracking" style="width:100%;" >}}

#### Sources {#sources}

Error Tracking consolide les erreurs provenant de plusieurs produits Datadog (RUM, Logs, APM) dans une vue unifiée, vous permettant de surveiller et de diagnostiquer les erreurs sur l'ensemble de votre stack. Vous pouvez choisir d'afficher les problèmes {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} ou {{< ui >}}Backend{{< /ui >}} dans l'Explorer.

Pour un filtrage plus précis, vous pouvez restreindre la liste des problèmes à des sources de logs spécifiques, ou filtrer par SDK et limiter les résultats à un langage de programmation.

#### Fix available {#fix-available}

Affichez uniquement les problèmes pour lesquels un correctif généré par l'IA est disponible afin de les résoudre rapidement.

#### Filtres d'équipes {#teams-filters}

[Issue Team Ownership][2] vous aide à identifier rapidement les problèmes qui concernent votre équipe à l'aide de Git `CODEOWNERS` et des responsables de services.

#### Assigned to {#assigned-to}

Suivez les problèmes et attribuez-les à vous-même ou aux membres de l'équipe les plus compétents, puis affinez facilement la liste des problèmes selon la personne à qui ils sont attribués.

#### Suspected Cause {#suspected-cause}

[Suspected Cause][3] permet de filtrer et de hiérarchiser plus rapidement les erreurs, afin que les équipes puissent traiter plus efficacement les causes profondes potentielles.

## Inspectez un problème {#inspect-an-issue}

Cliquez sur un problème pour afficher plus de détails dans un volet dédié.

{{< img src="real_user_monitoring/error_tracking/issue_summary_2.png" alt="Partie supérieure du panneau d'un problème dans Error Tracking, offrant une vue d'ensemble du problème" style="width:80%;" >}}

Les informations essentielles au diagnostic d'un problème se trouvent dans la partie supérieure du panneau. Vous pouvez y consulter son cycle de vie : les dates de première et de dernière occurrence, le nombre total d'occurrences et leur évolution au fil du temps.

{{< img src="real_user_monitoring/error_tracking/error_sample_2.png" alt="Partie inférieure du panneau d'un problème Error Tracking présentant des exemples d'erreurs" style="width:80%;" >}}

Les informations affichées dans le panneau de problème varient en fonction de la source de l'erreur. Par exemple, un problème créé à partir d'erreurs APM affiche les tags du span d'erreur, tels que le nom de la ressource ou de l'opération, avec un accès direct à la trace associée ou aux logs qui y sont liés.

La partie inférieure du panneau du problème vous permet de parcourir les exemples d'erreurs associés à ce problème. Chaque exemple d'erreur vous fournit des informations de dépannage, telles que la trace de pile de l'erreur et les caractéristiques des utilisateurs touchés.

## Recevez des alertes en cas d'erreurs nouvelles ou à fort impact {#get-alerted-on-new-or-impactful-errors}

Être informé d'un nouveau problème dès qu'il survient vous permet de l'identifier et de le corriger de manière proactive avant qu'il ne devienne critique. Les Error Tracking Monitors vous permettent de suivre tout nouveau problème ou tout problème ayant un impact important sur vos systèmes ou vos utilisateurs (voir [Error Tracking Monitors][7])

Vous pouvez exporter directement votre requête de recherche depuis l'Explorer pour créer un Error Tracking Monitor sur le périmètre concerné :

{{< img src="/error_tracking/create-monitor.mp4" alt="Exportez votre requête de recherche vers un monitor Error Tracking" video=true >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/events
[2]: /fr/error_tracking/issue_team_ownership
[3]: /fr/error_tracking/suspected_causes
[4]: /fr/real_user_monitoring/explorer/search/#event-types
[5]: /fr/error_tracking/issue_states
[6]: /fr/error_tracking/regression_detection
[7]: /fr/monitors/types/error_tracking