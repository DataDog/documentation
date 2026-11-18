---
description: Créez des incidents ServiceNow à partir des Pages On-Call, maintenez-les
  synchronisés et déclenchez des Pages à partir des incidents ServiceNow.
further_reading:
- link: /integrations/servicenow/
  tag: Documentation
  text: Installez l'intégration ServiceNow
- link: /integrations/guide/servicenow-itom-itsm-setup
  tag: Documentation
  text: Configurer ServiceNow ITOM et ITSM
- link: /incident_response/on-call/routing_rules/
  tag: Documentation
  text: Règles de routage
- link: /incident_response/on-call/integrations/
  tag: Documentation
  text: Intégrations On-Call
title: Intégrer ServiceNow avec Datadog On-Call
---
{{< callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" btn_hidden="false" header="Rejoignez la préversion">}}
L'intégration ServiceNow pour Datadog On-Call est en Preview.
{{< /callout >}}

## Présentation {#overview}

L'intégration ServiceNow pour Datadog On-Call connecte les Pages On-Call aux incidents ServiceNow. Elle prend en charge deux flux :

- **[Synchroniser les Pages avec ServiceNow](#sync-pages-to-servicenow-incidents)** : Lorsqu'une règle de routage crée une Page, Datadog crée un incident ServiceNow et le maintient synchronisé avec la Page. Le statut, l'urgence et les commentaires sont synchronisés en fonction des mappages que vous configurez.
- **[Déclencher des Pages depuis ServiceNow](#trigger-pages-from-servicenow-incidents)** : Lorsqu'un enregistrement ServiceNow correspond à une règle métier, la règle déclenche une Page pour une équipe ou un utilisateur Datadog On-Call.

## Prérequis {#prerequisites}

- Assurez-vous de disposer de l'autorisation [On-Call Admin (`on_call_admin`)][1], nécessaire pour créer des connexions ServiceNow dans les paramètres On-Call.
- Terminez la [configuration ServiceNow ITOM/ITSM][2] :
  1. Configurez la tuile ServiceNow et installez la version 2.9.3 ou ultérieure de l'ITOM/ITSM Integration for Datadog.
  1. Suivez les étapes de [Synchronisation bidirectionnelle des données entre ServiceNow et Datadog][3]. Les deux flux sur cette page utilisent les identifiants de cette configuration.

## Synchroniser les Pages avec les incidents ServiceNow {#sync-pages-to-servicenow-incidents}

### Créer une connexion ServiceNow {#create-a-servicenow-connection}

Une connexion définit quelle instance ServiceNow reçoit les incidents et comment les Pages et les incidents restent synchronisés. Vous pouvez créer plusieurs connexions, par exemple une pour chaque groupe d'affectation.

1. Dans Datadog, accédez à [**On-Call > Settings > Integrations**][4].
1. Sélectionnez **ServiceNow** et cliquez sur **Add Connection**.
1. Configurez la connexion :
   - **ServiceNow instance** : Sélectionnez l'instance ServiceNow configurée dans la tuile ServiceNow. Pour ajouter une instance, cliquez sur **Manage accounts**.
   - **Assignment group** (facultatif): Sélectionnez le groupe d'affectation ServiceNow pour les incidents créés à partir des Pages.
   - **Automatically create ServiceNow incidents from Pages** : Activez ce bouton bascule pour créer un incident ServiceNow chaque fois qu'une règle de routage utilisant cette connexion crée une Page.
   - **Sync methods and mappings** : Choisissez comment chaque champ se synchronise entre la Page et l'incident ServiceNow, et définissez la correspondance de ses valeurs. Vous pouvez synchroniser le statut de la Page avec le champ **State** de l'incident, son urgence avec les champs **Impact** et **Urgency** de l'incident, et ses commentaires avec le champ **Work Notes** de l'incident.
1. Enregistrez la connexion.

### {#sync-pages-from-a-routing-rule}

Après avoir créé une connexion, ajoutez la synchronisation ServiceNow aux [règles de routage][5] d'une équipe :

1. Accédez à [**On-Call > Teams**][6] et sélectionnez une équipe.
1. Recherchez la section **Page Routing** et cliquez sur **Edit**.
1. Ajoutez ou modifiez une règle de routage.
1. Sous **Set targets**, cliquez sur **Add**, sélectionnez **Sync with a ServiceNow Incident**, puis sélectionnez la connexion à utiliser.
1. Enregistrez la règle de routage.

Lorsqu'une alerte correspond à la règle, Datadog crée la Page et un incident ServiceNow en même temps. L'incident reste synchronisé avec la Page en fonction des paramètres de la connexion.

## Déclencher des Pages à partir d'incidents ServiceNow {#trigger-pages-from-servicenow-incidents}

L'ITOM/ITSM Integration for Datadog inclut un script `PublishOnCallPage`. Appelez-le depuis une règle métier ServiceNow pour déclencher une Page On-Call, par exemple, lorsqu'un incident est créé.

1. Dans ServiceNow, accédez à **System Definition > Business Rules** et cliquez sur **New**.
1. Configurez la table de la règle métier, son moment d'exécution et ses conditions de filtrage pour définir quels enregistrements déclenchent une Page. Cochez la case **Advanced** pour activer les scripts.
1. Dans l'onglet **Advanced**, appelez `PublishOnCallPage` dans le script. Par exemple, pour déclencher une Page pour l'équipe `database` avec un niveau d'urgence élevé :

   ```javascript
   (function executeRule(current, previous /* null when async */) {
       new PublishOnCallPage("team_handle", "database", "high").execute(current);
   })(current, previous);
   ```

   Pour les types de cibles pris en charge, l'argument d'urgence et les périmètres de clé d'application requis par le script, consultez [Créer une Page Datadog On-Call depuis ServiceNow][7].
1. Cliquez sur **Submit**.

Lorsque la règle métier s'exécute, Datadog déclenche une Page pour l'équipe ou l'utilisateur cible.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/#on-call
[2]: /fr/integrations/guide/servicenow-itom-itsm-setup/
[3]: /fr/integrations/guide/servicenow-itom-itsm-setup/#sync-bidirectionally
[4]: https://app.datadoghq.com/on-call/settings/integrations
[5]: /fr/incident_response/on-call/routing_rules/
[6]: https://app.datadoghq.com/on-call/teams
[7]: /fr/integrations/guide/servicenow-itom-itsm-setup/#create-on-call-page