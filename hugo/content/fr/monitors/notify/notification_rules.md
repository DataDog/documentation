---
description: Automatisez le routage des alertes de moniteur à l'aide de règles de
  notification prédéfinies basées sur des tags et des conditions pour rationaliser
  les notifications d'équipe.
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications du monitor
- link: /monitors/settings/
  tag: Documentation
  text: Paramètres des monitors
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirigez vos alertes de monitor avec les règles de notification des monitors
    Datadog
title: Règles de notification
---
## Présentation {#overview}

Les règles de notification de moniteur sont des ensembles prédéfinis de conditions qui automatisent le processus d'alerte de votre équipe en fonction de tags et d'une logique de règle. Au lieu de configurer individuellement les destinataires pour chaque moniteur, les règles de notification vous permettent de définir les destinataires une seule fois et de router automatiquement toutes les notifications de moniteur dont l'ensemble de tags de notification correspond à la portée de la règle.

<div class="alert alert-info">Il existe une limite par défaut de 1000 règles par organisation.</a>.</div>

## Configuration {#setup}

<div class="alert alert-danger">Vous devez disposer de la <a href="/account_management/rbac/permissions/#monitors"><code>monitor_config_policy_write</code> ou <code>monitor_notification_rules_write</code> autorisation</a> pour créer une règle. Le format <code>monitor_notification_rules_write</code> L'autorisation est en Preview.</div>

Pour créer une règle de notification de moniteur dans Datadog, procédez comme suit :

1. Accédez à [{{< ui >}}Notification Rules{{< /ui >}}][1].
2. Cliquez sur {{< ui >}}New Rule{{< /ui >}}.
3. [Configurez la portée](#configure-the-scope) : définissez les tags requis pour qu'une notification de moniteur soit routée vers cette règle.
4. [Configurez le routage et les destinataires](#configure-the-routing-and-recipients) : choisissez comment router les notifications et spécifiez les destinataires.
5. Ajoutez un nom de règle clair et identifiable.

### Configurez la portée {#configure-the-scope}

Ajoutez les tags requis pour qu'une notification de moniteur soit routée vers cette règle. La correspondance est évaluée à partir de l'ensemble de tags de notification. Pour en savoir plus, consultez [Comment fonctionne la correspondance](#how-matching-works).

<div class="alert alert-info">Les notifications des moniteurs créés ou mis à jour après l'enregistrement de la règle de notification sont routées vers les destinataires définis si elles correspondent à la portée de la règle.</div>

{{% collapse-content title="Syntaxe de la portée de la règle" level="h4" expanded=false %}}

La requête de portée de la règle de notification prend en charge la logique booléenne et suit la [syntaxe de recherche basée sur les événements][3] prise en charge par de nombreux autres produits de la plateforme.

| Élément de syntaxe | Description |
| -------------- | ----------- |
| **Opérateurs booléens** | Pris en charge : `AND`, `OR`, `NOT`<br>Opérateur implicite : `AND` |
| **Caractères génériques** | Seul `key:*` est pris en charge (par exemple, `env:*`). Les caractères génériques partiels comme `env:prod-*` ne sont pas pris en charge. `key:*` correspond si la clé existe n'importe où dans l'ensemble de tags de notification. |
| **Valeurs multiples pour la même clé** | Utilisez `env:(prod OR staging)` ou `env:prod OR env:staging`. |
| **Utilisation de guillemets** | Placez les valeurs contenant des espaces ou des caractères spéciaux entre guillemets, par exemple : `team:"data platform"`. |
{{% /collapse-content %}}


{{% collapse-content title="Exemples de portée" level="h4" expanded=false %}}

| Portée de la règle de notification | Explication |
| ------------------- | ---------------------- |
| `service:web-store`       | Acheminez toute notification concernant le service `web-store`. |
| `service:web-store AND env:prod`       | Acheminez toute notification concernant le service `web-store` s'exécutant dans l'environnement `prod`. |
| `service:webstore AND  NOT env:staging`       | Acheminez toute notification concernant le service `web-store` qui **ne s'exécute pas** dans l'environnement `staging`. |
| `env:*`       | Acheminez toute notification portant le tag `env:<value>` (provenant des tags du moniteur ou du groupe). |

{{% /collapse-content %}}

{{% collapse-content title="Limitations de la portée des règles" level="h4" expanded=false %}}

Les éléments suivants **ne sont pas pris en charge** :

* Les tags sans clé, tels que `prod AND service:(A or B)` ou `prod`, ne sont pas pris en charge. Les tags doivent avoir une clé, dans ce cas par exemple `env:prod`.
* Les caractères génériques partiels (`service:web-*`) et les caractères génériques point d'interrogation `service:auth?` ne sont pas pris en charge. Le caractère générique n'est autorisé que s'il est utilisé seul comme `service:*`.
* La portée est limitée à 3 000 caractères.
{{% /collapse-content %}}


### Configurez le routage et les destinataires {#configure-the-routing-and-recipients}

Choisissez comment acheminer les notifications lorsqu'une alerte de moniteur correspond à la portée de la règle. Vous pouvez spécifier manuellement les destinataires ou utiliser le routage dynamique pour résoudre automatiquement les destinataires à partir des configurations de votre équipe et de votre service.

#### Routage manuel {#manual-routing}

Spécifiez les destinataires à notifier lorsqu'une notification de moniteur correspond à la portée de la règle. Vous pouvez toujours notifier tous les destinataires, ou définir des destinataires conditionnels qui ne sont notifiés que lorsque certaines conditions sont remplies (par exemple, acheminer les alertes critiques vers votre destinataire d'astreinte et envoyer des avertissements vers un canal Slack).
Les conditions peuvent être basées sur le statut du moniteur ou sur des tags :
- **Conditions basées sur le statut** : Notifiez les destinataires lorsque le moniteur passe à un statut spécifique (Alert, OK, Warn ou No data).
- **Conditions basées sur les tags** : Notifiez les destinataires lorsqu'une clé de tag spécifique possède une valeur donnée (par exemple, `env:prod`). Chaque condition ne prend en charge qu'une seule clé de tag.

Les notifications peuvent être envoyées par e-mail ou via n'importe quel canal d'intégration. Il existe une limite de 50 destinataires de notification par règle. Pour plus d'informations, consultez [Notifications][2].

#### Routage dynamique {#dynamic-routing}

<div class="alert alert-danger">Le routage dynamique est en Preview. Pour demander l'accès, contactez l'équipe chargée de votre compte Datadog ou adressez-vous à <a href="https://docs.datadoghq.com/help/">Datadog Support</a>.</div>

Le routage dynamique achemine automatiquement les alertes de moniteur vers la bonne équipe en fonction de vos configurations [Teams][4] et [Catalog][5] existantes. Au lieu de maintenir des listes de destinataires statiques, le routage dynamique utilise le tag `service` ou `team` sur le moniteur qui déclenche l'alerte pour déterminer où envoyer les notifications.

| Configuration | Description | Exigences |
| --- | --- | --- |
| {{< ui >}}Service-based{{< /ui >}} | Vérifie le tag `service` du moniteur ou le tag du groupe, recherche dans Catalog l'équipe qui gère ce service, puis envoie l'alerte aux canaux de notification configurés pour cette équipe. | Une équipe doit être affectée au service dans Catalog. Si aucune équipe n'est affectée, l'alerte est transmise aux destinataires de secours. |
| {{< ui >}}Team-based{{< /ui >}} | Vérifie directement le tag `team` du moniteur ou le tag du groupe, puis envoie l'alerte aux canaux de notification configurés pour cette équipe. | Le moniteur doit avoir un tag `team`. |
| {{< ui >}}Fallback{{< /ui >}} | Si le routage ne peut pas être résolu (par exemple, si aucune équipe n'est affectée au service ou si l'équipe n'a configuré aucun canal de notification), l'alerte est envoyée aux destinataires de secours. Les destinataires de secours se comportent de la même manière que les destinataires de routage manuel. | Requis pour toutes les règles de routage dynamique. |

Les routages Service-based et Team-based prennent tous deux en charge Slack, l'e-mail, PagerDuty et Microsoft Teams. Les équipes peuvent configurer leurs canaux de notification dans [Teams settings][4].

## Gestion des règles de notification {#managing-notification-rules}

### Depuis Monitor Settings {#from-monitor-settings}

{{< img src="/monitors/notifications/notification_rules/notification_rules_table.png" alt="Liste des règles de notification dans Monitor Settings" style="width:100%;" >}}

La page [Monitor Notification Rules][1] affiche un tableau de toutes vos règles de notification avec les colonnes suivantes :

- {{< ui >}}Name{{< /ui >}} : Nom de la règle de notification
- {{< ui >}}Scope{{< /ui >}} : Affiche les combinaisons de tags qui définissent quand cette règle s'applique (par exemple, `team:shopist service:web-store env:prod`).
- {{< ui >}}Team{{< /ui >}} : Liste les équipes auxquelles cette règle de notification est associée (disponible uniquement lorsque le tag d'équipe est ajouté dans la portée)
- {{< ui >}}Coverage{{< /ui >}} : Affiche le nombre de moniteurs qui correspondent aux portées de cette règle. Utilisez ces informations pour vérifier la couverture des règles et repérer celles qui doivent être ajustées.
- {{< ui >}}Notifies{{< /ui >}} : Liste les canaux de notification (tels que Slack ou e-mail) qui recevront des alertes lorsque cette règle s'applique.

De plus, vous pouvez cliquer sur le menu à trois points verticaux de la règle de notification pour {{< ui >}}Edit{{< /ui >}} ou {{< ui >}}Delete{{< /ui >}}.

### Depuis un moniteur individuel {#from-an-individual-monitor}
Dans la configuration de votre moniteur, {{< ui >}}Recipient Summary{{< /ui >}} affiche les destinataires ajoutés au moniteur par les règles de notification correspondantes. Sur la page de modification **Monitor**, vous pouvez également voir les règles qui _pourraient_ correspondre lorsque de nouveaux groupes transmettent des données (moniteurs à alertes multiples). La page d'état **Monitor** affiche les règles qui correspondent.

{{< img src="/monitors/notifications/notification_rules/monitor_matching_notification_rule.png" alt="Champ de résumé des destinataires affichant les destinataires de notification appliqués par les règles de notification" style="width:100%;" >}}

## Fonctionnement de la correspondance {#how-matching-works}

- L'ensemble des tags de notification réunit les tags du moniteur et ceux du groupe ayant déclenché l'alerte (pour les moniteurs à alertes multiples). Si une clé possède plusieurs valeurs dans le moniteur ou le groupe, toutes ces valeurs sont prises en compte.
- Correspondance actuelle : une règle correspond si au moins un groupe transmettant des données satisfait la portée lorsqu'il est combiné aux tags du moniteur, ou si les tags du moniteur la satisfont à eux seuls. NOT est évalué pour chaque ensemble de tags candidat : un groupe comportant une valeur exclue ne correspond donc pas.
- Correspondance possible lorsque de nouveaux groupes transmettent des données (moniteurs à alertes multiples, page de modification du moniteur) : considérez que chaque clé de regroupement est présente avec une valeur quelconque, sous réserve des filtres d'inclusion et d'exclusion de la requête du moniteur.
- Si plusieurs règles correspondent à une seule notification, les destinataires de toutes les règles correspondantes sont fusionnés et dédoublonnés.

{{< img src="/monitors/notifications/notification_rules/diagram_notification-rules.png" alt="Organigramme montrant comment les règles de notification de Monitor correspondent aux tags, regroupent les destinataires des moniteurs et des règles, puis éliminent les doublons avant d'envoyer les alertes" style="width:100%;" >}}

{{% collapse-content title="Exemple : correspondance des règles de notification" level="h3" expanded=false %}}

Le tableau suivant montre comment les moniteurs dotés de différentes combinaisons de tags correspondent aux règles de notification et quelles notifications en résultent. Ce tableau montre comment :
1. Plusieurs règles de notification peuvent correspondre à une seule notification de moniteur en fonction de ses tags.
2. La logique AND s'applique à plusieurs tags au sein d'une même règle.
3. Toutes les règles de notification correspondantes ajoutent leurs destinataires à la liste de notification finale.
4. Les destinataires sont dédoublonnés dans la liste de notification finale.

<table>
    <thead>
        <tr>
            <th></th>
            <th colspan="5" style="text-align: center; border-bottom: 1px solid #ddd; background-color:rgb(98, 92, 92);">Règles de notification</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th style="background-color:#E8E8E8;"></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>team:shopist,<br>service:web-store</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>team:shopist</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store<br>env:prod</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store<br>env:dev</code></th>
            <th style="background-color:#E8E8E8;"></th>
        </tr>
        <tr>
            <td style="background-color:#E8E8E8;"><strong>TAGS D'ALERTE DE MONITEUR ET NOTIFICATIONS</strong></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@slack-channel1</i><br><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@user@datadoghq.com</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8;"><strong>HANDLES NOTIFIÉS</strong></td>
        </tr>
        <tr>
            <td><code>team:shopist, service:web-store</code><br><i>@user@datadoghq.com</i></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@slack-channel1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>team:shopist</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>service:web-store</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>service:web-store, env:prod</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>service:web-store, env:dev</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>team:shopist and service:web-store, env:prod</code><br><i>@slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@slack-channel1</i><br><i>@slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
    </tbody>
</table>

{{% /collapse-content %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings/notifications
[2]: /fr/monitors/notify/#notifications
[3]: /fr/getting_started/search/#event-based-queries
[4]: /fr/account_management/teams/
[5]: /fr/internal_developer_portal/catalog/