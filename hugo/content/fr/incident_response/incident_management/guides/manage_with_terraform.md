---
description: Utilisez Terraform pour gérer la configuration d'Incident Management,
  y compris les types d'incidents, les champs de propriétés, les rôles des intervenants,
  les règles de notification, les modèles de post-mortem et les modèles de notification.
disable_toc: false
further_reading:
- link: /incident_response/incident_management/
  tag: Documentation
  text: En savoir plus Incident Management
- link: /incident_response/incident_management/guides/test_incidents/
  tag: Documentation
  text: Utilisation d'incidents de test pour la formation et les tests
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
  tag: Documentation
  text: Fournisseur Terraform pour Datadog
title: Gérez Incident Management avec Terraform
---
## Présentation {#overview}

Vous pouvez utiliser Terraform pour gérer votre configuration d'Incident Management via la Datadog API. Ce guide couvre les ressources d'Incident Management disponibles dans le [registre Terraform][1] et renvoie à la documentation Datadog correspondante pour chacune d'elles.

La configuration manuelle des types d'incidents, des champs, des rôles et des règles de notification dans l'interface utilisateur fonctionne bien pour un petit nombre d'équipes. Il devient plus difficile de passer à l'échelle à mesure que votre organisation se développe, par exemple, lors de la standardisation de la configuration entre des centaines d'équipes ou de la migration depuis un autre outil de gestion des incidents. Terraform vous permet de définir cette configuration sous forme de code, afin que vous puissiez la créer et la mettre à jour par programmation et la maintenir cohérente dans toute votre organisation.

Vous pouvez également [importer][2] vos configurations existantes de types d'incidents, de notifications et de modèles de post-mortem dans Terraform, et référencer les configurations existantes en tant que [sources de données][3] Terraform.

### Ce que vous pouvez gérer avec Terraform {#what-you-can-manage-with-terraform}

| Ressource | Objectif |
| --- | --- |
| [Types d'incidents](#incident-types) (`datadog_incident_type`) | La catégorie d'incident (par exemple, « Security Incident » ou « Customer Impacting »). Inclut également les paramètres de la page [Informations][19], tels que les incidents privés et la suppression d'incidents. Ancre tout le reste dans ce tableau. |
| [Champs de propriété](#property-fields) (`datadog_incident_user_defined_field`) | Données structurées que les intervenants remplissent lors d'un incident, telles que la cause première ou la région affectée. Également utilisé pour configurer les niveaux de gravité et de statut sur la page [Informations][19]. |
| [Rôles des intervenants](#responder-roles) (`datadog_incident_user_defined_role`) | Rôles personnalisés au-delà des rôles intégrés de commandant d'incident et d'intervenant. |
| [Règles de notification](#notification-rules) (`datadog_incident_notification_rule`) | Règles qui déterminent quand et qui est averti lorsque les incidents changent. |
| [Modèles de post-mortem](#postmortem-templates) (`datadog_incident_postmortem_template`) | Où et comment un document de post-mortem est généré pour un type d'incident. |
| [Modèles de notification](#notification-templates) (`datadog_incident_notification_template`) | Contenu de message réutilisable pour les notifications d'incident. |

## Configurez le fournisseur Terraform Datadog {#set-up-the-datadog-terraform-provider}

Si ce n'est pas déjà fait, configurez le [fournisseur Terraform Datadog][4] pour interagir avec les API Datadog via une configuration Terraform.

## Types d'incidents {#incident-types}

Les types d'incidents vous permettent d'appliquer différents paramètres, champs, rôles et comportements de notification à différentes classes d'incidents, comme les incidents de sécurité par rapport aux incidents ayant un impact sur les clients. Toutes les autres ressources de cette page sont limitées à un type d'incident, définissez donc d'abord vos types d'incidents. Utilisez le bloc `configuration` sur la [ressource de type d'incident][6] pour créer des types d'incident et définir les options trouvées sur la page [Informations][19], telles que la suppression d'incident, les [incidents de test][7] et les [incidents privés][8]. Les niveaux de gravité et de statut, également trouvés sur la page [Informations][19], sont configurés avec la [ressource de champ défini par l'utilisateur pour les incidents][10].

Pour savoir comment cela fonctionne dans Datadog, consultez [Types d'incident][5].

## Champs de propriété {#property-fields}

Les champs de propriété permettent aux intervenants de saisir des données structurées sur un incident, par exemple la cause première ou la région affectée. Utilisez la [ressource de champ défini par l'utilisateur pour les incidents][10] pour créer des champs de propriété et les limiter à un type d'incident.

Pour savoir comment cela fonctionne dans Datadog, consultez [Champs de propriété][9].

## Rôles des intervenants {#responder-roles}

Les rôles des intervenants définissent les rôles pouvant être attribués aux personnes lors d'un incident. Parmi les exemples, citons le commandant d'incident ou un rôle personnalisé, par exemple « Comms Lead ». Utilisez la [ressource de rôle défini par l'utilisateur pour les incidents][12] pour créer des rôles d'intervenant personnalisés. Limitez chacun d'eux à un type d'incident.

Pour savoir comment cela fonctionne dans Datadog, consultez [Rôles des intervenants][11].

## Règles de notification {#notification-rules}

Les règles de notification déterminent quand une notification est déclenchée, à qui elle est envoyée et quel modèle elle utilise. Utilisez la [ressource de règle de notification d'incident][16] pour créer des règles basées sur des déclencheurs tels que la création d'un incident ou une modification enregistrée. Les conditions d'une règle peuvent inclure la gravité ou les services affectés.

Pour savoir comment cela fonctionne dans Datadog, consultez [Règles de notification][15].

## Modèles de post-mortem {#postmortem-templates}

Les modèles de post-mortem contrôlent l'endroit où un document de post-mortem est généré pour un type d'incident. Les modèles standardisent le contenu qu'un rédacteur de post-mortem doit renseigner en définissant des sections et des en-têtes spécifiques dans le document. Utilisez la [ressource de modèle de post-mortem d'incident][18] pour configurer cela par type d'incident.

Pour savoir comment cela fonctionne dans Datadog, consultez [Modèles de post-mortem][17].

## Modèles de notification {#notification-templates}

Les modèles de notification définissent un contenu de message réutilisable pour les notifications d'incident. Utilisez la [ressource de modèle de notification d'incident][14] pour créer des modèles limités à un type d'incident.

Pour savoir comment cela fonctionne dans Datadog, consultez [Modèles de notification][13].

## Exemple de configuration complète{#full-configuration-example}

L'exemple suivant combine plusieurs de ces ressources dans une seule configuration :

- Un `datadog_incident_type` avec un bloc `configuration` qui désactive la suppression d'incident et active les incidents de test
- Un `datadog_incident_user_defined_field` et `datadog_incident_user_defined_role`, tous deux limités à ce type
- Un `datadog_incident_notification_template`
- Un `datadog_incident_notification_rule` qui utilise le modèle

{{< code-block lang="terraform" >}}
resource "datadog_incident_type" "customer_impacting" {
  name        = "Customer Impacting"
  description = "Incidents that impact customers"
  configuration = {
    private_incidents            = false
    private_incidents_by_default = false
    allow_workflows              = true
    allow_incident_deletion      = false
    editable_timestamps          = false
    test_incidents               = true
    create_message               = ""
    slug_source                  = "default"
  }
}

resource "datadog_incident_user_defined_field" "root_cause" {
  name          = "root_cause"
  type          = "dropdown"
  incident_type = datadog_incident_type.customer_impacting.id

  valid_value {
    display_name = "Service Bug"
    value        = "service_bug"
  }
}

resource "datadog_incident_user_defined_role" "tech_lead" {
  name          = "Tech Lead"
  incident_type = datadog_incident_type.customer_impacting.id
}

resource "datadog_incident_notification_template" "sev1_alert" {
  name          = "SEV-1 Customer Impact Template"
  subject       = "SEV-1 Incident: {{incident.title}}"
  category      = "alert"
  incident_type = datadog_incident_type.customer_impacting.id
  content       = "SEV-1 declared: {{incident.title}}. Status: {{incident.status}}."
}

resource "datadog_incident_notification_rule" "sev1_sev2_created" {
  enabled               = true
  trigger               = "incident_created_trigger"
  visibility            = "organization"
  handles               = ["@pagerduty-on-call"]
  incident_type         = datadog_incident_type.customer_impacting.id
  notification_template = datadog_incident_notification_template.sev1_alert.id

  conditions {
    field  = "severity"
    values = ["SEV-1", "SEV-2"]
  }
}
{{< /code-block >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://developer.hashicorp.com/terraform/cli/import
[3]: https://developer.hashicorp.com/terraform/language/data-sources
[4]: /fr/integrations/terraform/
[5]: /fr/incident_response/incident_management/setup_and_configuration/#incident-types
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_type
[7]: /fr/incident_response/incident_management/guides/test_incidents/
[8]: /fr/incident_response/incident_management/setup_and_configuration/information/#private-incidents-incident-visibility
[9]: /fr/incident_response/incident_management/setup_and_configuration/property_fields/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_user_defined_field
[11]: /fr/incident_response/incident_management/setup_and_configuration/responder_roles/
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_user_defined_role
[13]: /fr/incident_response/incident_management/setup_and_configuration/templates/#messages
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_notification_template
[15]: /fr/incident_response/incident_management/setup_and_configuration/notification_rules/
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_notification_rule
[17]: /fr/incident_response/incident_management/setup_and_configuration/templates/#postmortems
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_postmortem_template
[19]: /fr/incident_response/incident_management/setup_and_configuration/information/