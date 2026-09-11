---
description: Automatisez le routage des alertes de surveillance en utilisant des règles
  de notification prédéfinies basées sur des balises et des conditions pour rationaliser
  les notifications de l'équipe.
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
## Aperçu {#overview}

Les règles de notification de surveillance sont des ensembles de conditions prédéfinies qui automatisent le processus d'alerte de votre équipe en fonction des balises et de la logique des règles. Au lieu de configurer individuellement les destinataires pour chaque moniteur, les règles de notification vous permettent de définir une fois et d'acheminer automatiquement toutes les notifications de moniteur dont l'ensemble de balises de notification correspond à la portée de la règle.

<div class="alert alert-info">Il y a une limite par défaut de 1000 règles par organisation.</a>.</div>

## Configuration {#setup}

<div class="alert alert-danger">Vous devez avoir le <a href="/account_management/rbac/permissions/#monitors"><code>monitor_config_policy_write</code> autorisation</a> pour créer une règle.</div>

Pour créer une règle de notification de surveillance dans Datadog, procédez comme suit :

1. Allez à [**Règles de notification**][1].
2. Cliquez sur **New Rule**.
3. [Configurez la portée](#configure-the-scope) : Définissez les balises requises pour qu'une notification de surveillance soit routée vers cette règle.
4. [Configurez le routage et les destinataires](#configure-the-routing-and-recipients) : Choisissez comment router les notifications et spécifiez les destinataires.
5. Ajoutez un nom de règle clair et identifiable.

### Configurez la portée {#configure-the-scope}

Ajoutez les balises requises pour qu'une notification de surveillance soit routée vers cette règle. La correspondance évalue l'ensemble de balises de notification. En savoir plus dans [Comment fonctionne la correspondance](#how-matching-works).

<div class="alert alert-info">Les moniteurs créés ou mis à jour après que la règle de notification est enregistrée sont routés vers les destinataires définis s'ils correspondent à la portée de la règle.</div>

{{% collapse-content title="Syntaxe de la portée de la règle" level="h4" expanded=false %}}

La requête de portée de la règle de notification prend en charge la logique booléenne et suit la [syntaxe de recherche basée sur les événements][3] prise en charge par de nombreux autres produits de la plateforme.

| Élément de syntaxe | Description |
| -------------- | ----------- |
| **Opérateurs booléens** | Pris en charge : `AND`, `OR`, `NOT`<br>Opérateur implicite : `AND` |
| **Jokers** | Seul `key:*` est pris en charge (par exemple, `env:*`). Les jokers partiels comme `env:prod-*` ne sont pas pris en charge. `key:*` correspond si la clé existe n'importe où dans l'ensemble de balises de notification. |
| **Valeurs multiples pour la même clé** | Utilisez soit `env:(prod OR staging)` soit `env:prod OR env:staging`. |
| **Citations** | Enveloppez les valeurs contenant des espaces ou des caractères spéciaux entre guillemets, par exemple : `team:"data platform"`. |
{{% /collapse-content %}}


{{% collapse-content title="Exemples de portée" level="h4" expanded=false %}}

| Portée de la règle de notification | Explication |
| ------------------- | ---------------------- |
| `service:web-store`       | Acheminer toute notification concernant le service `web-store`. |
| `service:web-store AND env:prod`       | Acheminer toute notification concernant le service `web-store` fonctionnant sur l'environnement `prod`. |
| `service:webstore AND  NOT env:staging`       | Acheminer toute notification concernant le service `web-store` qui n'est **pas** en cours d'exécution sur l'environnement `staging`. |
| `env:*`       | Acheminer toute notification portant la balise `env:<value>` (soit des balises de moniteur, soit de groupe). |

{{% /collapse-content %}}

{{% collapse-content title="Limitations de la portée des règles" level="h4" expanded=false %}}

Les éléments suivants ne sont **pas pris en charge** :

* Les balises sans clé, telles que `prod AND service:(A or B)` ou `prod`, ne sont pas prises en charge. Les balises doivent avoir une clé, dans ce cas par exemple `env:prod`.
* Les jokers partiels (`service:web-*`) et les jokers de point d'interrogation `service:auth?` ne sont pas pris en charge. Le joker est autorisé uniquement s'il est utilisé seul comme `service:*`.
* Longueur de portée jusqu'à 3000 caractères.
{{% /collapse-content %}}


### Configurez le routage et les destinataires {#configure-the-routing-and-recipients}

Choisissez comment acheminer les notifications lorsqu'une alerte de moniteur correspond à la portée de la règle. Vous pouvez spécifier manuellement les destinataires ou utiliser le routage dynamique pour résoudre automatiquement les destinataires à partir de vos configurations d'équipe et de service.

#### Routage manuel {#manual-routing}

Spécifiez quels destinataires notifier lorsque une notification de moniteur correspond à la portée de la règle. Vous pouvez toujours notifier tous les destinataires, ou définir des destinataires conditionnels qui ne sont notifiés que lorsque certaines conditions sont remplies (par exemple, acheminer les alertes critiques vers votre destinataire d'astreinte et envoyer les avertissements vers un canal Slack).
Les conditions peuvent être basées sur l'état du moniteur ou des étiquettes :
- **Conditions basées sur l'état** : Notifiez les destinataires lorsque le moniteur passe à un état spécifique (Alerte, OK, Avertir ou Pas de données).
- **Conditions basées sur les étiquettes** : Notifiez les destinataires lorsqu'une clé d'étiquette spécifique a une valeur donnée (par exemple, `env:prod`). Chaque condition ne prend en charge qu'une seule clé d'étiquette.

Les notifications peuvent être envoyées par e-mail ou par tout canal d'intégration. Il y a une limite de 50 destinataires de notification par règle. Pour plus d'informations, voir [Notifications][2].

#### Routage dynamique {#dynamic-routing}

<div class="alert alert-danger">Le routage dynamique est en avant‐première. Pour demander l'accès, contactez votre équipe de compte Datadog ou contactez <a href="https://docs.datadoghq.com/help/">Datadog Support</a>.</div>

Le routage dynamique achemine automatiquement les alertes de moniteur vers la bonne équipe en fonction de vos configurations existantes [Équipes][4] et [Catalogue][5]. Au lieu de maintenir des listes de destinataires statiques, le routage dynamique utilise la `service` ou `team` balise sur le moniteur d'alerte pour déterminer où envoyer les notifications.

| Configuration | Description | Exigences |
| --- | --- | --- |
| **Basé sur le service** | : Vérifie la balise `service` du moniteur ou la balise de groupe, recherche quelle équipe gère ce service dans le Catalogue, puis envoie l'alerte aux canaux de notification configurés de cette équipe. | Le service doit avoir une équipe assignée dans le Catalogue. Si aucune équipe n'est assignée, l'alerte est envoyée aux destinataires de secours. |
| **Basé sur l'équipe** | : Vérifie directement la balise `team` du moniteur ou la balise de groupe, puis envoie l'alerte aux canaux de notification configurés de cette équipe. | Le moniteur doit avoir une balise `team`. |
| **Secours** | Si le routage ne peut pas être résolu (par exemple, le service n'a pas d'équipe assignée ou l'équipe n'a pas de canaux de notification configurés), l'alerte est envoyée aux destinataires de secours. Les destinataires de secours se comportent de la même manière que les destinataires de routage manuel. | Requis pour toutes les règles de routage dynamique. |

Le routage basé sur le service et le routage basé sur l'équipe prennent en charge Slack, email, PagerDuty et Microsoft Teams. Les équipes peuvent configurer leurs canaux de notification dans [Paramètres des équipes][4].

## Gestion des règles de notification {#managing-notification-rules}

### À partir des paramètres du moniteur {#from-monitor-settings}

{{< img src="/monitors/notifications/notification_rules/notification_rules_table.png" alt="Liste des règles de notification dans les paramètres du moniteur" style="width:100%;" >}}

La page [Règles de notification du moniteur][1] affiche un tableau de toutes vos règles de notification avec les colonnes suivantes :

- **Nom** : Nom de la règle de notification
- **Portée** : Montre les combinaisons de tags qui définissent quand cette règle s'applique (par exemple, `team:shopist service:web-store env:prod`).
- **Équipe** : Liste les équipes avec lesquelles cette règle de notification est associée (disponible uniquement lorsque le tag d'équipe est ajouté dans la portée)
- **Couverture** : Montre le nombre de moniteurs qui correspondent aux portées de cette règle. Utilisez ceci pour vérifier la couverture des règles et identifier les règles qui nécessitent des ajustements.
- **Notifie** : Liste les canaux de notification (comme Slack ou email) qui recevront des alertes lorsque cette règle correspond.

De plus, vous pouvez cliquer sur le menu vertical à trois points sur la règle de notification pour **Modifier** ou **Supprimer**.

### D'un moniteur individuel {#from-an-individual-monitor}
Dans votre configuration de moniteur, le **Résumé des destinataires** montre les destinataires associés au moniteur par les règles de notification correspondantes. Sur la page d'édition du **Moniteur**, vous pouvez également voir des règles qui _pourraient_ correspondre lorsque de nouveaux groupes rapportent (moniteurs d'alerte multiples). La page d'état du **Moniteur** montre les règles qui correspondent.

{{< img src="/monitors/notifications/notification_rules/monitor_matching_notification_rule.png" alt="Champ de résumé des destinataires montrant les destinataires de notification assignés par les règles de notification" style="width:100%;" >}}

## Comment fonctionne la correspondance {#how-matching-works}

- L'ensemble de balises de notification est l'union des balises de moniteur et des balises du groupe déclencheur (pour les moniteurs d'alerte multiples). Si une clé a plusieurs valeurs à travers le moniteur/groupe, toutes les valeurs sont prises en compte.
- Correspond actuellement : Une règle correspond si au moins un groupe de rapport, combiné avec les balises de moniteur, satisfait le champ d'application ; ou, si les balises de moniteur seules le font. NOT est évalué par ensemble de balises candidates, donc un groupe avec une valeur refusée ne correspond pas.
- Pourrait correspondre lorsque de nouveaux groupes rapportent (moniteurs d'alerte multiples, surface d'édition du Moniteur) : Traitez chaque clé de groupe comme présente avec n'importe quelle valeur, contrainte par les filtres d'autorisation/refus de la requête du moniteur.
- Si plusieurs règles correspondent à une seule notification, les destinataires de toutes les règles correspondantes sont fusionnés et dédupliqués.

{{< img src="/monitors/notifications/notification_rules/diagram_notification-rules.png" alt="Diagramme de flux montrant comment les règles de notification de Monitor correspondent aux tags, combinent les destinataires issus de Monitor et des règles, et suppriment les doublons avant d'envoyer des alertes" style="width:100%;" >}}

{{% collapse-content title="Exemple : Correspondance des règles de notification" level="h4" expanded=false %}}

Le tableau suivant démontre comment les Monitors dotés de différentes combinaisons de tags correspondent aux règles de notification et aux notifications qui en résultent. Ce tableau montre comment :
1. Plusieurs règles de notification peuvent correspondre à une seule notification de Monitor en fonction de ses tags.
2. La logique AND fonctionne pour plusieurs tags dans une règle.
3. Toutes les règles de notification correspondantes ajoutent leurs destinataires à la liste finale de notifications.
4. Les destinataires sont dédupliqués dans la liste finale de notifications.

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
            <td style="background-color:#E8E8E8;"><strong>MONITOR : ALERT TAGS ET NOTIFICATIONS</strong></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@slack-channel1</i><br><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@user@datadoghq.com</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8;"><strong>NOTIFIED HANDLES</strong></td>
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

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings/notifications
[2]: /fr/monitors/notify/#notifications
[3]: /fr/getting_started/search/#event-based-queries
[4]: /fr/account_management/teams/
[5]: /fr/internal_developer_portal/catalog/