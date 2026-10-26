---
aliases:
- /fr/service_management/incident_management/integrations/servicenow/
- /fr/incident_response/incident_management/integrations/servicenow/
further_reading:
- link: integrations/servicenow/
  tag: Documentation
  text: Installez l'intégration ServiceNow
- link: /integrations/guide/servicenow-itom-itsm-setup
  tag: Documentation
  text: Configurer ServiceNow ITOM et ITSM
- link: https://app.datadoghq.com/integrations/servicenow
  tag: App
  text: Tuile d'intégration ServiceNow
title: Intégrez ServiceNow à Datadog Incident Management
---
## Présentation {#overview}

ServiceNow est une plateforme de gestion des services informatiques qui fournit des solutions pour gérer les workflows numériques, les opérations informatiques et les processus métier. L'intégration Datadog ServiceNow vous permet de créer des incidents dans ServiceNow à partir d'incidents Datadog et de synchroniser les données de manière bidirectionnelle entre les deux plateformes.

L'intégration ServiceNow avec Datadog Incident Management vous offre les avantages suivants :
- **Visibilité améliorée** : Assurez-vous que toutes les parties prenantes sont immédiatement informées des incidents, ce qui facilite une réponse plus rapide.
- **Synchronisation bidirectionnelle** : Synchronisez automatiquement l'état de l'incident, la gravité (impact et urgence) et toute mise à jour de statut entre Datadog et ServiceNow.
- **Prise en charge des workflows existants** : Intégrez de manière transparente vos processus actuels, facilitant ainsi la gestion des incidents au sein de vos workflows ServiceNow établis.

## Prérequis {#prerequisites}

Pour utiliser la création automatique d'incidents et la synchronisation bidirectionnelle avec ServiceNow :

1. Installez l'[intégration ServiceNow][1] via la tuile d'intégration ServiceNow et assurez-vous que la [tuile ServiceNow est configurée][2] avec votre instance ServiceNow dans Datadog.
2. Installez l'[intégration ITOM/ITSM pour Datadog][3] (recommandé) à partir du ServiceNow Store, ou téléchargez le dernier Update Set ([Datadog-Snow_Update_Set_v2.8.0.xml][4]) et importez-le manuellement sur votre instance ServiceNow.
3. Créez une [clé d'application de compte de service][5] dans Datadog pour une authentification sécurisée. **Remarque** : Datadog recommande de créer une clé de compte de service plutôt que d'utiliser une clé personnelle, ce qui risquerait d'interrompre la synchronisation ServiceNow si le compte de l'utilisateur est désactivé ou si ses autorisations changent.

## Configuration {#setup}

### Configurez la création automatique d'incidents {#configure-automatic-incident-creation}

1. Accédez aux [Paramètres d'intégration][6].
1. Dans le menu de gauche, cliquez sur **Integrations**.
1. Recherchez et cliquez sur la tuile d'intégration **ServiceNow** pour ouvrir la configuration.
2. Cliquez sur le bouton pour **Activer la création d'incidents ServiceNow**.
3. Cliquez sur le bouton pour **Créer automatiquement un incident ServiceNow**.
4. Ajoutez une condition pour définir quand créer automatiquement un incident ServiceNow. Si cette condition est laissée vide, l'intégration crée un incident ServiceNow lorsque Datadog crée un incident.

### Configurez la synchronisation bidirectionnelle {#configure-bidirectional-sync}

Dans ServiceNow, vous pouvez synchroniser l'état, l'impact et l'urgence de manière bidirectionnelle avec Incident Management.

1. Dans ServiceNow, cliquez sur l'icône en forme de globe dans le coin supérieur droit, puis assurez-vous que le **Périmètre de l'application** est défini sur **ITOM/ITSM Integration for Datadog**.
2. Dans le menu de navigation en haut à gauche, cliquez sur **Tout**.
3. Saisissez **ITOM/ITSM Integration for Datadog** dans le filtre.
4. Cliquez sur le lien **Configuration** parmi les résultats filtrés, puis saisissez les paramètres requis :
   1. Sélectionnez votre **centre de données Datadog**.
   2. Collez votre **clé d'API Datadog**.
   3. Collez votre **clé d'application du compte de service** que vous avez créée.
   4. Cochez la case **Enabled**.
5. Cliquez sur **Enregistrer**.

Avec la synchronisation bidirectionnelle, lorsqu'un incident est créé dans Datadog, un incident correspondant est également créé dans l'instance ServiceNow liée. Cet incident ServiceNow inclut une référence à l'incident Datadog et reste synchronisé en fonction des [mappages de champs](#field-mappings) définis.

## Mappages de champs {#field-mappings}

Les mappages de champs définissent comment les informations des incidents Datadog sont transférées vers, et synchronisées avec, les champs des incidents ServiceNow. Cela garantit que les détails clés de l'incident, tels que le statut, la gravité et les descriptions, sont cohérents et à jour dans les deux systèmes.

Vous trouverez ci-dessous les mappages de champs par défaut utilisés dans l'intégration. Vous pouvez personnaliser les mappages dans ServiceNow en utilisant son mécanisme [transform map][7] si votre workflow nécessite une configuration de champ avancée.

Les champs suivants sont synchronisés entre Datadog Incident Management et ServiceNow :

| **Incident Management** | **Tableau des cas ServiceNow** | **Incident ServiceNow** | **Statut de synchronisation**                         |
| ----------------------- | -------------------------- | ----------------------- | --------------------------------------- |
| Titre                   | Titre - Chaîne             | Description courte       | Synchronisation unidirectionnelle de Datadog → ServiceNow |
| Ce qui s'est passé           | Description - Chaîne       | Description             | Synchronisation unidirectionnelle de Datadog → ServiceNow |
| État                   | État - Chaîne             | État                   | Synchronisé de manière bidirectionnelle                 |
| URL d'incident DD         | URL d'incident - Chaîne      | Notes de travail              | Synchronisation unidirectionnelle de Datadog → ServiceNow |
| Sévérité                | Urgence d'incident (int)     | Urgence                 | Synchronisé de manière bidirectionnelle                 |
| Sévérité                | Impact d'incident (int)      | Impact                  | Synchronisé de manière bidirectionnelle                 |

### Mappage d'état d'incident {#incident-state-mapping}

| **État du monitor Datadog**                    | **État d'incident ServiceNow** |
|----------------------------------------------|------------------------------|
| Actif                                      | En cours                  |
| Avertissement                                        | En cours                  |
| OK                                          | Résolu                     |
| Terminé _(facultatif, configuré dans les paramètres)_ | Résolu                  |

### Mappage de la sévérité d'incident Datadog vers la priorité ServiceNow {#datadog-incident-severity-to-servicenow-priority-mapping}

| **Sévérité d'incident Datadog** | **Urgence ServiceNow** | **Impact ServiceNow** | **Priorité ServiceNow** |
|-------------------------------|------------------------|-----------------------|-------------------------|
| SEV-1                         | 1                      | 1                     | 1 - Critique            |
| SEV-2                         | 1                      | 2                     | 2 - Élevé                |
| SEV-2                         | 2                      | 1                     | 2 - Élevé                |
| SEV-3                         | 1                      | 3                     | 3 - Modéré            |
| SEV-3                         | 2                      | 2                     | 3 - Modéré            |
| SEV-3                         | 3                      | 1                     | 3 - Modéré            |
| SEV-4                         | 2                      | 3                     | 4 - Faible                 |
| SEV-4                         | 3                      | 2                     | 4 - Faible                 |
| SEV-5 (Mineur)                 | 3                      | 3                     | 5 - Planification            |
| Inconnu                       | 3                      | 3                     | 5 - Planification            |

**Remarque** : Si `Start at SEV-0` est activé dans les paramètres d'Incident Management, les valeurs dans `ServiceNow Urgency`, `ServiceNow Impact` et `ServiceNow Priority` restent toutes identiques, mais le `Datadog Incident Severity` est décalé d'un rang vers le bas. Par exemple, dans la première ligne de ce tableau, le `Datadog Incident Severity` serait `0`, mais le reste des valeurs dans le reste de la ligne resterait identique.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/servicenow
[2]: /fr/integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[3]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[4]: /fr/resources/xml/Datadog-Snow_Update_Set_v2.8.0.xml
[5]: /fr/account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[6]: https://app.datadoghq.com/incidents/settings#Integrations
[7]: /fr/integrations/guide/servicenow-itom-itsm-setup/#tranform-maps