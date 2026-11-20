---
aliases:
- /fr/monitors/notify/downtimes/
cascade:
  algolia:
    subcategory: Downtimes
    tags:
    - downtimes
    - mute monitors
description: Planifiez des downtimes pour que vos monitors Datadog n'émettent pas
  d'alertes durant certaines périodes.
further_reading:
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: Guide
  text: Mettre les alertes en sourdine avec les downtimes
- link: /monitors/guide/scoping_downtimes
  tag: Guide
  text: Définir le périmètre des plannings de downtime
- link: /monitors/quality/
  tag: Documentation
  text: Afficher les monitors mis en sourdine sur une période prolongée
- link: /monitors/
  tag: Documentation
  text: Créer des monitors
- link: /monitors/notify/
  tag: Documentation
  text: Notifications des monitors
title: Downtimes
---
## Présentation {#overview}

Planifiez des downtimes pour les arrêts système, la maintenance hors ligne ou les mises à niveau sans déclencher vos monitors. Les downtimes mettent en sourdine toutes les alertes et notifications des monitors, mais n'empêchent pas les transitions d'état des monitors.

{{< img src="/monitors/downtimes/downtime_overview.png" alt="Exemple de downtime" style="width:100%;" >}}

## Configuration {#setup}

### Créer un planning de downtime {#create-a-downtime-schedule}

Pour planifier un downtime de monitor dans Datadog, accédez à la page [{{< ui >}}Manage Downtime{{< /ui >}}][1]. Ensuite, cliquez sur le bouton {{< ui >}}Schedule Downtime{{< /ui >}} en haut à droite.

Pour mettre un monitor individuel en sourdine, cliquez sur l'icône de mise en sourdine (<i class="icon-volume-wui"></i>) en haut de la page d'état du monitor. Cela crée un planning de downtime pour ce monitor précis. Si vous n'avez pas l'autorisation de mettre le monitor en sourdine, l'icône de mise en sourdine est désactivée. Voir [Permissions](#permissions).

### Choisir les éléments à mettre en sourdine {#choose-what-to-silence}

Appliquez des plannings de downtime à des monitors précis par leur nom ou à un large éventail de monitors par leurs tags de monitor. Appliquez des filtres supplémentaires via [{{< ui >}}Group scope{{< /ui >}}](#downtime-scope). Cliquez sur {{< ui >}}Preview affected monitors{{< /ui >}} pour voir les monitors inclus. Si votre organisation utilise [des contrôles d'accès aux downtimes](#permissions-and-access-controls), l'aperçu répertorie uniquement les monitors que vous êtes autorisé à mettre en sourdine. Pour plus d'exemples et de cas d'utilisation, consultez [Définir le périmètre des plannings de downtime][2].

**Remarque** : tout monitor créé ou modifié après la planification du downtime y est automatiquement inclus s'il correspond au périmètre défini.

{{< tabs >}}
{{% tab "Par nom de monitor" %}}

Recherchez ou utilisez le menu déroulant pour choisir les monitors à mettre en sourdine. Si le champ est laissé vide, tous les monitors sont mis en sourdine par défaut. Vous pouvez également sélectionner un périmètre pour limiter votre downtime à un host, un appareil ou un tag de votre choix. Seuls les monitors qui correspondent à **TOUS les périmètres sélectionnés** sont mis en sourdine.
{{% /tab %}}
{{% tab "Par tags de monitor" %}}

Planifiez un downtime en fonction d'un ou de plusieurs [tags de monitor][3]. Le nombre maximal de tags pouvant être sélectionnés pour un même downtime est de 32. Chaque tag peut comporter au maximum 256 caractères. Seuls les monitors qui possèdent **TOUS les tags sélectionnés** sont mis en sourdine. Vous pouvez également sélectionner des périmètres pour appliquer des contraintes supplémentaires.

[3]: /fr/monitors/manage/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

#### Périmètre du downtime {#downtime-scope}
Utilisez le périmètre de groupe pour appliquer des filtres supplémentaires à votre downtime et mieux contrôler les monitors à mettre en sourdine. Le périmètre de groupe d'un downtime est évalué après la cible propre au monitor. Si vous ciblez plusieurs monitors à l'aide de tags de monitor, le système repère d'abord les monitors portant ces tags, puis évalue le périmètre de groupe.

Par exemple, un monitor qui surveille la latence moyenne de tous vos services peut détecter des requêtes lentes et d'éventuelles erreurs pendant la mise à niveau du service `web-store`.

Vous souhaitez vous assurer que les notifications liées à `service:web-store` sont mises en sourdine et que les autres alertes critiques concernant les autres services sont envoyées comme d'habitude. Saisissez `service:web-store` dans le périmètre de groupe du downtime après avoir sélectionné les monitors cibles.

**Remarque** : cela fonctionne également avec des groupes ayant plusieurs dimensions, par exemple `service` et `host`. La création d'un downtime pour `service:web-store` mettrait en sourdine tous les groupes comprenant ce service, par exemple `service:web-store,host:a` ou `service:web-store,host:b`.

#### Syntaxe du périmètre du downtime {#downtime-scope-syntax}
La requête de périmètre du downtime utilise la même [syntaxe de recherche][3] que celle prise en charge par de nombreux autres produits de la plateforme. Pour inclure tous les groupes dans le périmètre d'un downtime, saisissez `*` pour le `Group scope`. Voici d'autres exemples de périmètres de groupe :

| Périmètre de groupe du downtime | Explication |
| ------------------- | ---------------------- |
| `service:web-store`       | Met en sourdine toutes les notifications concernant le service `web-store`. |
| `service:web-store AND env:dev`       | Met en sourdine toutes les notifications concernant le service `web-store` exécuté dans l'environnement `dev`. |
| `env:(dev OR staging)`       | Met en sourdine toute notification relative à l'un ou l'autre des environnements `dev` et `staging`. |
| `service:web-store AND env:(dev OR staging)`       | Met en sourdine toute notification relative au service `web-store` exécuté dans l'un ou l'autre des environnements `dev` et `staging`. |
| `host:authentication-*`       | Met en sourdine toute notification relative à un host dont le nom est préfixé par `authentication-`. |
| `host:*-prod-cluster`       | Met en sourdine toute notification relative à un host dont le nom est suffixé par `-prod-cluster`. |
| `host:*-prod-cluster`       | Met en sourdine toute notification relative à un host dont le nom est suffixé par `-prod-cluster`. |
| `service:webstore AND -env:prod`       | Met en sourdine toute notification concernant le service `web-store` qui **ne s'exécute pas** dans l'environnement `prod`. |

#### Limitations du périmètre du downtime {#downtime-scope-limitations}
Certaines constructions **ne sont pas prises en charge**, notamment :

* Plus de deux niveaux d'imbrication, tels que `team:app AND (service:auth OR (service:graphics-writer AND (env:prod OR (type:metric AND status:ok))))`, ne sont pas pris en charge. Les Downtimes acceptent au maximum deux niveaux d'imbrication. Utilisez plutôt des Downtimes distincts pour décomposer la logique.
* La négation n'est prise en charge que pour les paires clé/valeur et les tags avec `OR`. Par exemple, `-key:value` et `-key(A OR B)`. Les périmètres tels que `-service:(A AND B)`, `service:(-A OR -B)` ou `-service(A B)` ne sont pas pris en charge.
* Les opérateurs OR de niveau supérieur ne sont pas pris en charge. Par exemple, `service:A OR service:B` est valide, mais `service:A OR host:X` ne fonctionne pas. Un `OR` entre deux tags de niveau supérieur différents nécessite deux Downtimes distincts.
* Les tags sans clé, tels que `prod AND service:(A or B)` ou simplement `prod`, ne sont pas pris en charge. Les tags doivent avoir une clé, dans ce cas par exemple `env:prod`.
* Les caractères génériques de type point d'interrogation, comme `service:auth?`, ne sont pas pris en charge. Utilisez `*` à la place si vous devez utiliser des caractères génériques.
* Caractères non valides dans la clé : `en&v:prod` n'est pas un périmètre de downtime valide et sera rejeté.

### Définir un planning de downtime {#set-a-downtime-schedule}

#### Ponctuel {#one-time}

Définissez un downtime ponctuel en saisissant la date de début, l'heure et le fuseau horaire. Vous pouvez également définir une date et une heure de fin.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="champs pour la planification d'un downtime ponctuel" style="width:90%;">}}

#### Récurrent {#recurring}

Les downtimes récurrents sont utiles pour les périodes de maintenance récurrentes. Définissez un downtime récurrent en saisissant la date de début, l'heure, le fuseau horaire, la fréquence de répétition et la durée. Vous pouvez également spécifier une date de fin ou un nombre d'occurrences.

Lorsqu'une occurrence d'un downtime récurrent prend fin, elle est annulée et un nouveau downtime est créé avec les mêmes contraintes et des heures de début et de fin mises à jour. <br>
**Remarque** : le créateur d'origine est associé à tous les downtimes nouvellement créés.

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="Configuration des downtimes à l'aide d'un planning récurrent pour mettre les alertes en sourdine en dehors des heures de bureau et pendant le week-end" style="width:100%;" >}}

Utilisez des [règles de récurrence][4] (RRULE) pour définir les plannings de downtime. Utilisez le [générateur RRULE][5] officiel comme outil pour générer des règles de récurrence. Un cas d'utilisation courant consiste à utiliser des RRULE pour définir des downtimes certains jours du mois, par exemple le troisième lundi de chaque mois. Pour plus de cas d'utilisation de la récurrence, consultez le guide [Mettre les alertes en sourdine avec les downtimes][6].

**Remarque** : Les attributs spécifiant la durée dans une RRULE ne sont pas pris en charge (par exemple, `DTSTART`, `DTEND`, `DURATION`).

## Notifications {#notifications}
### Ajoutez un message {#add-a-message}

Saisissez un message pour alerter votre équipe au sujet de ce downtime. Le champ de message autorise le formatage markdown standard et la syntaxe `@-notification` de Datadog. Consultez la [page Notifications][7] pour plus d'informations sur les options de formatage.

### Configurer les notifications et les automatisations {#configure-notifications-and-automations}

Configurez les notifications et les automatisations en spécifiant les membres de l'équipe ou en envoyant le message à une [intégration][8] de service. Datadog envoie des notifications aux destinations spécifiées chaque fois qu'un downtime est planifié, commence, est annulé ou expire. Ces notifications d'audit permettent à votre équipe d'être informée des downtimes dans votre système.

### Désactiver la première notification de rétablissement {#disable-first-recovery-notification}

Par défaut, Datadog envoie une notification de rétablissement pour les monitors qui se déclenchent **avant** un downtime et se rétablissent **pendant** ce downtime. Cela permet aux intégrations tierces de fermer automatiquement les incidents ouverts. Cochez la case pour mettre ces notifications en sourdine.

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="mettre en sourdine la première notification de rétablissement" style="width:80%;">}}

L'option permettant de désactiver la première notification de rétablissement est cumulative entre plusieurs downtimes. Par exemple, si plusieurs downtimes se chevauchent et mettent en sourdine le même monitor, la première notification de rétablissement est mise en sourdine si l'option permettant de la désactiver a été cochée pour **au moins un** downtime.

**Remarque** : Cette option met en sourdine la **première** notification de rétablissement. Si un monitor se déclenche et se rétablit à nouveau pendant un downtime, les notifications correspondantes sont toujours mises en sourdine, quel que soit le réglage de cette option.

## Autorisations et contrôles d'accès {#permissions-and-access-controls}

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Le niveau d'accès Muter et les contrôles d'accès aux downtimes sont en Preview.
{{< /callout >}}

Pour planifier, modifier ou annuler des downtimes, vous avez besoin de l'[autorisation Manage Downtimes][16].

Avec les contrôles d'accès aux downtimes, un downtime ne met en sourdine que les monitors pour lesquels vous avez l'autorisation de mise en sourdine ([niveau d'accès][17] **Muter** ou **Editor**). Les équipes peuvent déléguer la mise en sourdine à des ingénieurs d'astreinte ou à des comptes de service sans risquer qu'un downtime ne mette en sourdine des monitors qu'ils ne possèdent pas.

**Remarque** : Un downtime s'exécute avec les accès de son créateur, et vous ne pouvez pas les modifier une fois le downtime créé. Si une équipe centrale planifie des downtimes pour des monitors restreints à d'autres équipes, accordez à cette équipe l'accès Muter sur ces monitors.

## Gérer {#manage}

La page [{{< ui >}}Manage Downtime{{< /ui >}}][1] affiche la liste des downtimes actifs et planifiés. Sélectionnez un downtime pour en afficher les détails, le modifier ou le supprimer. Les détails incluent son créateur, son périmètre et une liste des monitors auxquels elle s'applique.
Utilisez le panneau des facettes et la barre de recherche pour filtrer la liste selon les paramètres {{< ui >}}Creator{{< /ui >}}, {{< ui >}}Scope{{< /ui >}}, {{< ui >}}Monitor Tags{{< /ui >}} ou {{< ui >}}Active{{< /ui >}}, {{< ui >}}Automuted{{< /ui >}}, {{< ui >}}Recurring{{< /ui >}}.

{{< img src="monitors/downtimes/downtime_manage.png" alt="page de gestion des downtimes" style="width:100%;">}}

### Historique {#history}

L'historique des downtimes est consultable sur la page [Monitor Status][9], en superposition sur l'historique des transitions de groupe, ainsi que dans l'[Events explorer][10], en recherchant `tags:audit downtime` ou un downtime précis par son identifiant avec `tags:audit downtime_id:<DOWNTIME_ID>`.

### Mise en sourdine {#muting}

Les monitors déclenchent des événements lorsqu'ils changent d'état : `ALERT`, `WARNING`, `RESOLVED` et `NO DATA`. Lorsqu'un monitor est mis en sourdine ou fait l'objet d'un downtime planifié, les transitions de `RESOLVED` vers un autre état ne déclenchent **pas** d'événements ou de notifications.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="Graphique d'état du monitor montrant qu'une transition vers l'état d'alerte pendant un downtime ne crée pas d'événement d'alerte" style="width:80%;">}}

**Remarque** : Mettre en sourdine ou réactiver un monitor depuis la page d'état du monitor ne supprime pas les downtimes planifiés associés au monitor. Pour modifier ou supprimer un downtime, utilisez la page [{{< ui >}}Manage Downtime{{< /ui >}}][1] ou l'[API][11].

### Expiration {#expiration}

Par défaut, si un monitor est dans un état nécessitant une alerte (`ALERT`, `WARNING` ou `NO DATA`) lorsqu'un downtime expire, le monitor déclenche une nouvelle notification. Cela s'applique aux monitors qui changent d'état pendant le downtime (par exemple de `OK` à `ALERT`, `WARNING` ou `NO DATA`), et aux monitors qui sont déjà dans un état nécessitant une alerte au début du downtime. Si un downtime est annulé manuellement, les notifications ne sont pas envoyées, même si le monitor est entré dans un état nécessitant une alerte.

Pour remplacer le comportement par défaut, spécifiez quelles notifications doivent être envoyées à la fin des downtimes avec les options de la section {{< ui >}}Configure notifications and automations{{< /ui >}}. Pour les downtimes créés avec l'API, le comportement par défaut consiste à exclure l'option `Is cancelled`.

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="La section Configure notifications and automations d'un monitor avec des conditions de downtime spécifiques" style="width:100%;">}}

**Exemple 1 :** Si un monitor est dans un état d'alerte *avant* le début du downtime et *le reste* pendant toute la durée du downtime :
1. Pendant le downtime, les notifications pour cette alerte ne sont pas envoyées.
2. Le monitor reste dans un état d'alerte (car les conditions sont toujours remplies).
3. Le downtime se termine.
4. Les conditions d'alerte sont toujours remplies, donc une notification est envoyée.

**Exemple 2 :** Si un monitor est dans un état d'alerte *avant* le début d'un downtime et se rétablit *pendant* ce downtime :
1. L'état passe de `ALERT` à `OK`.
2. La notification de rétablissement est envoyée pendant le downtime, mais uniquement pour le premier rétablissement durant ce downtime.

### Rapport de monitor {#monitor-report}

Tous les états d'alerte sont inclus dans le [rapport hebdomadaire de monitor][12] même si le monitor est en downtime.

## Mise en sourdine automatique {#auto-muting}

Datadog peut mettre de manière proactive en sourdine les monitors liés à l'arrêt manuel de certaines charges de travail cloud. Les scénarios suivants de mise en sourdine automatique lors de l'arrêt sont pris en charge :

- **[Instances Amazon EC2][13]** et terminaison d'instances par l'autoscaling AWS, en fonction des états des hosts fournis par l'API CloudWatch.
- **[Instances Google Compute Engine (GCE)][14]** et terminaison d'instances déclenchée par l'autoscaling GCE, en fonction des états des hosts fournis par l'API GCE.
- **[Azure VMs][15]**, que l'arrêt ait été déclenché manuellement ou par l'autoscaling Azure, en fonction des états de santé disponibles via l'API Azure Resource Health.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/downtimes
[2]: /fr/monitors/guide/scoping_downtimes
[3]: /fr/logs/explorer/search_syntax/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html
[6]: /fr/monitors/guide/suppress-alert-with-downtimes/
[7]: /fr/monitors/notify/#overview
[8]: /fr/integrations/#cat-notification
[9]: /fr/monitors/status/
[10]: /fr/events/explorer
[11]: /fr/api/latest/downtimes/#cancel-a-downtime
[12]: /fr/account_management/#preferences
[13]: /fr/integrations/amazon_ec2/#ec2-automuting
[14]: /fr/integrations/google_compute_engine/#gce-automuting
[15]: /fr/integrations/azure_vm/#automuting-monitors
[16]: /fr/account_management/rbac/permissions/#monitors
[17]: /fr/monitors/configuration/#access-levels