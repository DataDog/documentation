---
description: Un guide sur l'utilisation de la propriété basée sur les vues dans le
  Real User Monitoring pour filtrer les données d'événement pour les vues dont votre
  équipe est propriétaire.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentation
  text: En savoir plus sur RUM
- link: https://www.datadoghq.com/blog/simplify-micro-frontend-observability-with-datadog-rum/
  tag: Blog
  text: Simplifiez l'observabilité des micro-frontends avec Datadog RUM
title: Propriété des vues
---
## Présentation {#overview}

La propriété des vues vous permet de voir uniquement les métriques et les événements RUM pour les parties de votre application dont votre équipe est propriétaire. Une fois que vous avez configuré la propriété des vues, chaque événement et métrique RUM associé à ces vues est **marqué** avec le nom de votre équipe. Utilisez le [filtre d'équipe][2] pour définir le périmètre de votre vue en fonction des équipes que vous sélectionnez. Il apparaît sur les pages {{< ui >}}Summary{{< /ui >}}, {{< ui >}}Optimization{{< /ui >}} et {{< ui >}}Session Explorer{{< /ui >}}.

{{< img src="/real_user_monitoring/ownership_of_views/ownership-sessions-explorer-1.png" alt="Vue du Sessions Explorer, où vous pouvez filtrer les sessions utilisateur en fonction des équipes assignées dans la propriété d'équipe, facilitant ainsi la recherche de replays pertinents pour votre équipe." >}}

La sélection d'équipes restreint les métriques et les données d'événement aux vues dont ces équipes sont propriétaires. Si vous appartenez à plusieurs équipes, vous pouvez sélectionner n'importe quelle combinaison de celles-ci. Pour arrêter de filtrer par équipe, effacez votre sélection. Les équipes propriétaires d'une vue sont également listées dans le coin supérieur droit de tous les panneaux latéraux d'événement.

## Règles de propriété {#ownership-rules}

Il existe deux types de règles pour configurer la propriété des vues :

1. **Règles exactes**, qui correspondent un à un au nom d'une vue 
2. **Règles de préfixe**, qui capturent toutes les vues contenant le préfixe dans leur nom

{{< img src="/real_user_monitoring/ownership_of_views/ownership-rule-type.png" alt="Panneau latéral affichant les deux types de règles pour définir la propriété des vues." >}}

Chaque règle doit avoir au moins une **équipe** et un **périmètre** définis. Deux types de périmètre sont pris en charge :
- Pour l'**application RUM actuelle** sur tous les services
- Pour un **service spécifique** sur toutes les applications

## Configuration {#setup}

<div class="alert alert-info">Pour utiliser cette fonctionnalité, votre organisation doit avoir des équipes activées et configurées.</div>

Pour configurer la propriété d'équipe pour les vues de votre application :

1. Dans Datadog, accédez à la page [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][1] et sélectionnez votre application.
2. Dans le menu de navigation de gauche, sélectionnez {{< ui >}}Ownership{{< /ui >}}.
3. Pour chaque vue, cliquez sur {{< ui >}}Missing Ownership{{< /ui >}} et créez une règle pour la vue.
4. Cliquez sur l'onglet {{< ui >}}All Rules{{< /ui >}} pour examiner toutes les règles créées et leurs vues associées.

Après avoir associé une vue à une équipe, Datadog attribue automatiquement les nouvelles données d'événement à cette équipe.

<div class="alert alert-danger">Si vous modifiez un mappage d'équipe et de vue, les métriques ou événements passés ne sont pas rétroactivement tagués avec la nouvelle équipe.</div>

{{< img src="/real_user_monitoring/ownership_of_views/ownership-application-management-2.png" alt="Vue de la page Propriété d'équipe, où vous pouvez affecter différentes pages de votre application à des équipes spécifiques." >}}

<div class="alert alert-info">Vous pouvez également configurer la propriété des vues avec l'<a href="https://docs.datadoghq.com/api/latest/rum-teams-ownership/">API Datadog</a>.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /fr/account_management/teams/#team-filter