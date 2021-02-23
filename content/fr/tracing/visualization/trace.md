---
title: Vue Trace
kind: documentation
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: Configurer le tracing d'APM avec votre application
  - link: /tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: /tracing/visualization/service/
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: /tracing/visualization/resource/
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: /tracing/visualization/trace/
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
---
Affichez une [trace][1] individuelle pour voir toutes ses [spans][2] et métadonnées associées. Chaque trace peut être affichée sous forme de graphique de performances ou de liste (regroupée par [service][3] ou host).

{{< img src="tracing/visualization/trace/trace.png" alt="Trace"  style="width:90%;">}}

Calculez les détails du temps d'exécution et ajustez le jeu de couleurs par **service** ou **host**.

{{< img src="tracing/visualization/trace/service_host_display.png" alt="Affichage de host de service" style="width:40%;">}}

Utilisez la molette de la souris pour zoomer sur le graphique :

{{< img src="tracing/visualization/trace/trace_zoom.mp4" alt="Erreur de trace" video="true" width="90%" >}}

L'affichage sous forme de liste regroupe les [ressources][4] par [service][3] et les trie en fonction du nombre de spans correspondant. Les services sont triés en fonction du pourcentage de temps d'exécution relatif associé à la trace dans chaque service :

{{< img src="tracing/visualization/trace/trace_list.png" alt="liste de Trace"  style="width:90%;">}}

### Plus d'informations

{{< tabs >}}
{{% tab "Tags de span" %}}

Cliquez sur une span dans le graphique de performances pour afficher ses métadonnées en dessous du graphique. En cas d'erreur, la stack trace est fournie :

{{< img src="tracing/visualization/trace/trace_error.png" alt="Erreur de trace" style="width:90%;">}}

Si vous analysez une [trace][1] qui signale une erreur et que les règles de tags à signification particulière sont appliquées, l'erreur s'affiche de façon distincte. Lors de l'envoi de vos traces, vous pouvez ajouter des attributs au paramètre `meta`. 

Certains attributs ont des significations particulières qui se traduisent par un mode d'affichage spécial ou un comportement spécifique dans Datadog :

| Attribut     | Description                                                                                                                                                                        |
| ----          | ------                                                                                                                                                                             |
| `sql.query`   | Permet l'affichage des requêtes SQL dans un format spécial dans l'interface de Datadog.                                                                                                                     |
| `error.msg`   | Permet l'affichage des messages d'erreur dans un format spécial.                                                                                                                                        |
| `error.type`  | Permet l'affichage des types d'erreur dans un format spécial. Exemples de types disponibles : `ValueError` ou `Exception` dans Python, et `ClassNotFoundException` ou `NullPointerException` dans Java. |
| `error.stack` | Permet un affichage plus clair de la stack trace d'une exception dans l'interface de Datadog (zones rouges, etc.)                                                                                         |

{{< img src="tracing/visualization/trace/trace_error_formating.png" alt="Formatage des erreurs"  >}}

[1]: /fr/tracing/visualization/#trace
{{% /tab %}}
{{% tab "Informations sur le host" %}}

Affichez les informations sur le host qui sont associées à la trace, notamment les tags et les graphiques de host au moment où la trace s'est produite.

{{< img src="tracing/visualization/trace/trace_host_info.png" alt="Informations sur le host de la trace"  style="width:90%;">}}

{{% /tab %}}
{{% tab "Logs" %}}

Consultez les logs associés à votre service au moment où la trace s'est produite. Lorsque vous passez le curseur sur un log, une ligne montrant son timestamp est affichée sur le graphique de performances de la trace. Cliquez sur le log pour accéder à la [recherche du Log Explorer][1].

{{< img src="tracing/visualization/trace/trace_logs.png" alt="Logs de trace"  style="width:90%;">}}


[1]: /fr/logs/explorer/search/
{{% /tab %}}
{{% tab "Processus" %}}

Cliquez sur la span d'un service pour voir les processus qui s'exécutent sur son infrastructure sous-jacente. Les processus d'une span de service sont mis en corrélation avec les hosts ou pods sur lesquels le service s'exécute au moment de la requête. Vous pouvez analyser des métriques de processus, comme le processeur et la mémoire RSS, avec des erreurs au niveau du code. Vous pourrez ainsi distinguer les problèmes spécifiques à l'application des problèmes d'infrastructure globaux. Lorsque vous cliquez sur un processus, vous êtes redirigé vers la [page Live Processes][1]. Pour afficher des processus spécifiques à une span, activez la [collecte de processus][2]. Les processus associés ne sont actuellement pas pris en charge pour les traces sans serveur et Browser. 

{{< img src="tracing/visualization/trace/trace_processes.png" alt="Processus de trace"  style="width:90%;">}}

[1]: https://docs.datadoghq.com/fr/infrastructure/process/?tab=linuxwindows
[2]: https://docs.datadoghq.com/fr/infrastructure/process/?tab=linuxwindows#installation
{{% /tab %}}

{{% tab "Réseau" %}}

Cliquez sur la span d'un service pour voir les dépendances réseau du service à l'origine de la requête. Utilisez des métriques de performances réseau clés comme le volume, les erreurs (retransmissions TCP) et la latence réseau (temps d'aller-retour TCP) pour différencier les problèmes spécifiques à une application et les problèmes qui touchent l'ensemble du réseau, en particulier lorsqu'aucune erreur de code n'a été générée. Par exemple, vous pouvez utiliser la télémétrie réseau pour déterminer si une latence de requête élevée est due à une élévation soudaine du trafic de l'application concernée ou à des dépendances défectueuses avec un pod en aval, un groupe de sécurité ou tout autre endpoint tagué. Cliquez sur un processus pour accéder à la [vue d'ensemble du réseau][1]. Pour voir les processus spécifiques à une span, activez la [surveillance des performances réseau][2].

**Remarque** : les données de télémétrie associées ne sont pas actuellement prises en charge pour les traces sans serveur.

{{< img src="tracing/visualization/trace/trace_networks.png" alt="Tracer les dépendances réseau" style="width:90%;">}}

[1]: /fr/network_monitoring/performance/network_page
[2]: /fr/network_monitoring/performance/setup
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#trace
[2]: /fr/tracing/visualization/#spans
[3]: /fr/tracing/visualization/#services
[4]: /fr/tracing/visualization/#resources