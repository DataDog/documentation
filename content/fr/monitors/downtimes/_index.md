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
  text: Mettez en sourdine les alertes grâce aux temps d'arrêt.
- link: /monitors/guide/scoping_downtimes
  tag: Guide
  text: Définition des calendriers de temps d'arrêt.
- link: /monitors/quality/
  tag: Documentation
  text: Voir les moniteurs qui sont mis en sourdine pendant une période prolongée
- link: /monitors/
  tag: Documentation
  text: Créer des monitors
- link: /monitors/notify/
  tag: Documentation
  text: Notifications des monitors
title: Downtimes
---
## Aperçu {#overview}

Planifiez des temps d'arrêt pour les arrêts système, la maintenance hors ligne ou les mises à niveau sans déclencher vos moniteurs. Les temps d'arrêt mettent en sourdine toutes les alertes et notifications des moniteurs, mais n'empêchent pas les transitions d'état des moniteurs.

{{< img src="/monitors/downtimes/downtime_overview.png" alt="Exemple d'un temps d'arrêt" style="width:100%;" >}}

## Configuration {#setup}

### Créer un calendrier de temps d'arrêt {#create-a-downtime-schedule}

Pour planifier un temps d'arrêt d'un moniteur dans Datadog, accédez à la page [**Gérer les temps d'arrêt**][1]. Ensuite, cliquez sur le bouton **Planifier un temps d'arrêt** en haut à droite.

Pour mettre en sourdine un moniteur individuel, cliquez sur le bouton **Mettre en sourdine** en haut de la page d'état du moniteur. Cela crée un calendrier de temps d'arrêt pour ce moniteur particulier.

Choisissez ce qu'il faut mettre en sourdine.

Appliquez des calendriers de temps d'arrêt à des moniteurs spécifiques par nom ou à un large éventail de moniteurs par étiquettes de moniteur. Appliquez des filtres supplémentaires via le [*champ de groupe*](#downtime-scope). Cliquez sur **Aperçu des moniteurs affectés** pour voir les moniteurs inclus. Pour plus d'exemples et de cas d'utilisation, voir [Définir les horaires des temps d'arrêt][2].

**Remarque** : Tout moniteur créé ou modifié après la planification du temps d'arrêt est automatiquement inclus dans le temps d'arrêt s'il correspond à la portée.

{{< tabs >}}
{{% tab "Par nom de moniteur" %}}

Recherchez ou utilisez le menu déroulant pour choisir quels moniteurs mettre en sourdine. Si le champ est laissé vide, tous les moniteurs sont mis en sourdine par défaut. Vous pouvez également sélectionner un champ pour restreindre votre temps d'arrêt à un hôte, un appareil ou une étiquette arbitraire spécifiques. Seuls les moniteurs ayant **TOUS les champs sélectionnés** sont mis en sourdine.
{{% /tab %}}
{{% tab "Par étiquettes de moniteur" %}}

Planifiez un temps d'arrêt basé sur une ou plusieurs [étiquettes de moniteur][3]. Le nombre maximum d'étiquettes pouvant être sélectionnées pour un seul temps d'arrêt est de 32. Chaque étiquette peut avoir un maximum de 256 caractères. Seuls les moniteurs ayant **TOUTES les étiquettes sélectionnées** sont mis en sourdine. Vous pouvez également sélectionner des champs pour des contraintes supplémentaires.

[3]: /fr/monitors/manage/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

#### Champ de temps d'arrêt {#downtime-scope}
Utilisez le champ de groupe pour appliquer des filtres supplémentaires à votre temps d'arrêt et avoir plus de contrôle sur les moniteurs à mettre en sourdine. Le champ de groupe d'un temps d'arrêt est associé après la cible spécifique du moniteur. Si vous ciblez plusieurs moniteurs en utilisant des étiquettes de moniteur, cela trouve les moniteurs qui sont étiquetés avant de faire correspondre le champ de groupe.

Par exemple, un moniteur qui examine la latence moyenne de tous vos services peut rencontrer des demandes lentes et des erreurs potentielles lors de la mise à niveau du `web-store` service.

Vous souhaitez vous assurer que les notifications `service:web-store` associées sont mises en sourdine et que d'autres alertes critiques pour les services restants sont livrées comme d'habitude. Entrez `service:web-store` dans le champ de groupe du temps d'arrêt après avoir sélectionné les cibles des moniteurs.

**Remarque** : cela fonctionne également avec des groupes ayant plusieurs dimensions, par exemple `service` et `host`. Créer un temps d'arrêt sur `service:web-store` mettrait en sourdine tous les groupes qui incluent ledit service, par exemple `service:web-store,host:a` ou `service:web-store,host:b`.

#### Syntaxe du champ de temps d'arrêt {#downtime-scope-syntax}
La requête de champ de temps d'arrêt suit la même [Syntaxe de recherche][3] commune que de nombreux autres produits de la plateforme prennent en charge. Pour inclure tous les groupes dans la portée d'un temps d'arrêt, tapez `*` pour le `Group scope`. D'autres exemples de champs de groupe incluent :

| Champ de groupe de Temps d'Arrêt | Explication |
| ------------------- | ---------------------- |
| `service:web-store`       | Met en sourdine toutes les notifications concernant le service `web-store`. |
| `service:web-store AND env:dev`       | Met en sourdine toutes les notifications concernant le service `web-store` fonctionnant sur l'environnement `dev`. |
| `env:(dev OR staging)`       | Met en sourdine toute notification liée à l'environnement `dev` ou à l'environnement `staging`. |
| `service:web-store AND env:(dev OR staging)`       | Met en sourdine toute notification liée au service `web-store` fonctionnant dans l'environnement `dev` ou `staging`. |
| `host:authentication-*`       | Met en sourdine toute notification concernant un hôte dont le nom est préfixé par `authentication-`. |
| `host:*-prod-cluster`       | Met en sourdine toute notification concernant un hôte dont le nom est suffixé par `-prod-cluster`. |
| `host:*-prod-cluster`       | Met en sourdine toute notification concernant un hôte dont le nom est suffixé par `-prod-cluster`. |
| `service:webstore AND -env:prod`       | Met en sourdine toute notification concernant le service `web-store` qui **n'est** pas en cours d'exécution sur l'environnement `prod`. |

#### Limitations du champ de Temps d'Arrêt {#downtime-scope-limitations}
Il existe quelques limitations qui ne sont **pas prises en charge** et qui incluent :

* Plus de deux niveaux d'imbrication, tels que `team:app AND (service:auth OR (service:graphics-writer AND (env:prod OR (type:metric AND status:ok))))`, ne sont pas pris en charge. Au maximum, les temps d'arrêt acceptent deux niveaux d'imbrication. Utilisez plutôt des temps d'arrêt séparés pour décomposer la logique.
* La négation n'est prise en charge que pour les paires clé/valeur et les étiquettes avec `OR`. Par exemple, `-key:value` et `-key(A OR B)`. Les champs tels que `-service:(A AND B)`, `service:(-A OR -B)` ou `-service(A B)` ne sont pas supportés.
* Les OR de niveau supérieur ne sont pas supportés. Par exemple, `service:A OR service:B` est valide, mais `service:A OR host:X` ne fonctionne pas. Un `OR` entre deux balises de niveau supérieur différentes nécessite deux temps d'arrêt séparés.
* Les balises sans clé, telles que `prod AND service:(A or B)` ou simplement `prod`, ne sont pas prises en charge. Les balises doivent avoir une clé, dans ce cas par exemple `env:prod`.
* Les caractères génériques avec un point d'interrogation : `service:auth?` ne sont pas pris en charge. Utilisez `*` à la place si vous devez utiliser des caractères génériques.
* Les caractères invalides dans la clé : `en&v:prod` ne constituent pas un champ de temps d'arrêt valide et seront rejetés.

### Définir un calendrier de temps d'arrêt {#set-a-downtime-schedule}

#### Une fois {#one-time}

Définissez un temps d'arrêt unique en entrant la date de début, l'heure et le fuseau horaire. Optionnellement, définissez une date et une heure de fin.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="champs pour planifier un temps d'arrêt unique" style="width:90%;">}}

#### Récurrent {#recurring}

Les downtimes récurrents sont utiles pour les périodes de maintenance récurrentes. Définissez un temps d'arrêt récurrent en entrant la date de début, l'heure, le fuseau horaire, la répétition et la durée. Optionnellement, spécifiez une date de fin ou un nombre d'occurrences.

Lorsqu'un temps d'arrêt unique d'un temps d'arrêt récurrent se termine, le temps d'arrêt unique est annulé et un nouveau temps d'arrêt est créé avec les mêmes contraintes et des heures de début et de fin mises à jour. <br>
**Remarque** : Le créateur original est associé à tous les nouveaux temps d'arrêt créés.

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="Configuration des temps d'arrêt utilisant un calendrier récurrent pour mettre en sourdine les alertes en dehors des heures de bureau et pendant le week-end." style="width:100%;" >}}

Utilisez [règles de récurrence][4] (RRULEs) pour définir les calendriers de temps d'arrêt. Utilisez le [générateur RRULE officiel][5] comme outil pour générer des règles récurrentes. Un cas d'utilisation courant consiste à utiliser des RRULES pour définir des temps d'arrêt à des jours spécifiques du mois, par exemple, le troisième lundi de chaque mois. Pour d'autres cas d'utilisation concernant la récurrence, consultez le guide sur [Supprimer les alertes avec les temps d'arrêt][6].

**Remarque** : Les attributs spécifiant la durée dans RRULE ne sont pas pris en charge (par exemple, `DTSTART`, `DTEND`, `DURATION`).

## Notifications {#notifications}
### Ajouter un message {#add-a-message}

Entrez un message pour alerter votre équipe à propos de ce temps d'arrêt. Le champ de message permet un formatage markdown standard et la syntaxe de Datadog `@-notification`. Consultez la [page des notifications][7] pour plus d'informations sur les options de formatage.

### Configurer les notifications et les automatisations {#configure-notifications-and-automations}

Configurez les notifications et les automatisations en spécifiant les membres de l'équipe ou en envoyant le message à un service [intégration][8]. Datadog envoie des notifications aux destinations spécifiées chaque fois qu'un temps d'arrêt est programmé, commencé, annulé ou expiré. Ces notifications d'audit permettent à votre équipe d'être informée des temps d'arrêt dans votre système.

### Désactiver la première notification de récupération {#disable-first-recovery-notification}

Par défaut, Datadog envoie une notification de récupération pour les moniteurs qui déclenchent **avant** un temps d'arrêt et finissent par se rétablir **pendant** un temps d'arrêt. Ceci est utile lors de l'utilisation d'intégrations tierces pour fermer automatiquement les incidents ouverts. Sélectionner la case à cocher désactive ces notifications.

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="désactiver la première notification de récupération" style="width:80%;">}}

L'option de désactiver la première notification de récupération est additive entre plusieurs temps d'arrêt. Par exemple, si plusieurs temps d'arrêt se chevauchent et désactivent le même moniteur, la première notification de récupération est désactivée si **au moins un** temps d'arrêt a coché l'option pour la désactiver.

**Remarque** : Cette option désactive la **première** notification de récupération. Si un moniteur déclenche et se rétablit à nouveau pendant un temps d'arrêt, alors les notifications correspondantes sont toujours mises en sourdine, indépendamment des paramètres de cette option.

## Gérer {#manage}

La [Manage Downtime page][1] affiche la liste des temps d'arrêt actifs et programmés. Sélectionnez un temps d'arrêt pour voir les détails, modifier ou le supprimer. Les détails incluent son créateur, son étendue et une liste des moniteurs auxquels il s'applique.
Utilisez le panneau des facettes et la barre de recherche pour filtrer la liste selon les paramètres `Creator`, `Scope`, `Monitor Tags`, `Active`, `Automuted` et `Recurring`.

{{< img src="monitors/downtimes/downtime_manage.png" alt="Manage Downtime page" style="width:100%;">}}

### Historique {#history}

L'historique des temps d'arrêt est consultable sur la page [Monitor Status][9] en superposition sur l'historique de transition de groupe, et sur l'[Events explorer][10] en recherchant `tags:audit downtime`, ou un temps d'arrêt spécifique par ID avec `tags:audit downtime_id:<DOWNTIME_ID>`.

### Mise en sourdine {#muting}

Les moniteurs déclenchent des événements lorsqu'ils changent entre les états possibles : `ALERT`, `WARNING`, `RESOLVED` et `NO DATA`. Lorsqu'un moniteur est mis en sourdine ou a un temps d'arrêt programmé, les transitions de `RESOLVED` à un autre état ne déclenchent **pas** d'événements ou de notifications.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="Graphique d'état du moniteur montrant la transition d'état vers une alerte pendant un temps d'arrêt, ne créera pas d'événement d'alerte" style="width:80%;">}}

**Remarque** : Désactiver ou réactiver un moniteur depuis la page Monitor Status ne supprime pas les temps d'arrêt programmés associés au moniteur. Pour modifier ou supprimer un temps d'arrêt, utilisez la page [Manage Downtime][1] ou l'[API][11].

### Expiration {#expiration}

Par défaut, si un moniteur est dans un état nécessitant une alerte (`ALERT`, `WARNING` ou `NO DATA`) lorsque le temps d'arrêt expire, le moniteur déclenche une nouvelle notification. Cela s'applique aux moniteurs qui changent d'état pendant un temps d'arrêt (comme de `OK` à `ALERT`, `WARNING` ou `NO DATA`), et aux moniteurs qui ont déjà un état nécessitant une alerte lorsque le temps d'arrêt commence. Si un temps d'arrêt est annulé manuellement, les notifications ne sont pas envoyées, même si le moniteur est entré dans un état nécessitant une alerte.

Pour remplacer le comportement par défaut, spécifiez quelles notifications doivent être envoyées à la fin des temps d'arrêt avec les options dans la section **Configure notifications and automations**. Pour les temps d'arrêt créés avec l'API, le comportement par défaut est d'exclure l'option `Is cancelled`.

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="La section Configure notifications and automations d'un moniteur avec des conditions de temps d'arrêt spécifiques" style="width:100%;">}}

**Exemple 1 :** Si un moniteur est dans un état d'alerte *avant* le début du temps d'arrêt et *continue* pendant la durée du temps d'arrêt :
1. Pendant le temps d'arrêt, les notifications pour cette alerte sont supprimées.
2. Le moniteur reste dans un état d'alerte (car les conditions sont toujours remplies).
3. Le temps d'arrêt se termine.
4. Les conditions d'alerte sont toujours remplies, donc une notification est envoyée.

**Exemple 2 :** Si un moniteur est dans un état d'alerte *avant* qu'un temps d'arrêt commence et se rétablit *pendant* ce temps d'arrêt :
1. L'état passe de `ALERT` à `OK`.
2. La notification de récupération est envoyée pendant le temps d'arrêt, mais seulement pour la première récupération pendant ce temps d'arrêt.

### Rapport de moniteur {#monitor-report}

Tous les états alertés sont inclus dans le [weekly monitor report][12] même si le moniteur est en temps d'arrêt.

## Mise en sourdine automatique {#auto-muting}

Datadog peut mettre en sourdine proactivement les moniteurs liés à l'arrêt manuel de certaines charges de travail dans le cloud. Les scénarios suivants de mise en sourdine automatique pour l'arrêt sont pris en charge :

- **[Amazon EC2 instances][13]** et terminaison d'instance par l'autoscaling AWS basé sur les statuts des hôtes provenant de l'API CloudWatch.
- **[Google Compute Engine (GCE)][14]** et terminaison d'instance déclenchée par l'autoscaling GCE basé sur les statuts des hôtes provenant de l'API GCE.
- **[Azure VMs][15]**, que l'arrêt ait été déclenché manuellement ou par l'autoscaling Azure, basé sur les statuts de santé disponibles via l'API Azure Resource Health.

## Lectures complémentaires {#further-reading}

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