---
"categories":
- Gestion des événements
- Alertes
- Monitoring
"ddtype": "webhook"
"dependencies": []
"description": "Activez l'ingestion d'alertes SolarWinds Orion dans votre flux d'événements Datadog."
"doc_link": "https://docs.datadoghq.com/integrations/solarwinds/"
"draft": false
"git_integration_title": "solarwinds"
"has_logo": true
"integration_id": ""
"integration_title": "SolarWinds"
"integration_version": ""
"is_public": true
"kind": "integration"
"manifest_version": "1.0"
"name": "solarwinds"
"public_title": "Intégration Datadog/SolarWinds"
"short_description": "Activez l'ingestion d'alertes de SolarWinds Orion dans votre flux d'événements Datadog."
"version": "1.0"
---

## Présentation

Recevez des alertes SolarWinds Orion de façon à centraliser l'agrégation et le triage de vos alertes.

Pour que cette intégration fonctionne, vous devez abonner Datadog à toutes vos notifications d'alerte SolarWinds.

## Configuration

### Créer des actions de déclenchement

Pour créer une action de déclenchement dans SolarWinds :

1. Accédez à Alerts > Manage Alerts.
2. Sélectionnez une alerte et cliquez sur Edit Alert, ou créez une alerte si vous n'en avez aucune.
3. Accédez à Trigger Actions > Add Action.
4. Sélectionnez Send a GET or POST Request to a Web Server.
5. Cliquez sur Configure Action.
6. Remplissez le volet Action avec les informations suivantes :

        a. Name of Action : Envoyer une alerte à Datadog (ou le nom de votre choix)
        b. URL : https://app.datadoghq.com/intake/webhook/solarwinds?api_key=<CLÉ_API_DATADOG>
        c. Select : utilisez HTTP/S POST
        d. Body to Post : copiez/collez le modèle d'alerte ci-dessous
        e. Time of Day : laissez la valeur par défaut
        f. Execution Settings : laissez la valeur par défaut

7. Cliquez sur Add Action.
8. Cliquez sur l'étape Reset Actions, puis répétez les étapes 4 à 7 en utilisant le modèle Reset Action au lieu du modèle Trigger Action.
9. Cliquez sur Next.
10. Cliquez sur Submit sur la page de résumé.

### Attribuer des actions à des alertes

1. Dans la vue du gestionnaire des alertes, sélectionnez toutes les alertes que vous souhaitez envoyer à Datadog, puis accédez à Assign Action > Assign Trigger Action.
2. Sélectionnez l'action de déclenchement « Envoyer une alerte à Datadog », puis cliquez sur Assign.
3. Répétez cette procédure pour Assign Action > Assign Reset Action en utilisant l'action de réinitialisation « Envoyer une alerte à Datadog ».

### Body to post de l'action de déclenchement
``` 
{
    "acknowledged": "${N=Alerting;M=Acknowledged}",
    "acknowledged_by": "${N=Alerting;M=AcknowledgedBy}",
    "alert_description": "${N=Alerting;M=AlertDescription}",
    "alert_details_url": "${N=Alerting;M=AlertDetailsUrl}",
    "alert_id": "${N=Alerting;M=AlertDefID}",
    "alert_message": "${N=Alerting;M=AlertMessage}",
    "alert_name": "${N=Alerting;M=AlertName}",
    "alert_severity": "${N=Alerting;M=Severity}",
    "application": "${N=Generic;M=Application}",
    "device_type": "${N=SwisEntity;M=Router.Nodes.CustomProperties.Device_Type}",
    "host": "${N=SWQL;M=SELECT TOP 1 RelatedNodeCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "host_url": "${N=SWQL;M=SELECT TOP 1 RelatedNodeDetailsUrl FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "ip": "${N=SwisEntity;M=IP_Address}",
    "location": "${N=SwisEntity;M=Router.Nodes.CustomProperties.City}",
    "object": "${N=SWQL;M=SELECT TOP 1 EntityCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "object_type": "${N=Alerting;M=ObjectType}",
    "timestamp": "${N=SWQL;M=SELECT GETUTCDATE() as a1 FROM Orion.Engines}"
}
``` 

### Body to post de l'action de réinitialisation
``` 
{
    "acknowledged": "${N=Alerting;M=Acknowledged}",
    "acknowledged_by": "${N=Alerting;M=AcknowledgedBy}",
    "alert_description": "${N=Alerting;M=AlertDescription}",
    "alert_details_url": "${N=Alerting;M=AlertDetailsUrl}",
    "alert_id": "${N=Alerting;M=AlertDefID}",
    "alert_message": "${N=Alerting;M=AlertMessage}",
    "alert_name": "${N=Alerting;M=AlertName}",
    "alert_severity": "${N=Alerting;M=Severity}",
    "application": "${N=Generic;M=Application}",
    "device_type": "${N=SwisEntity;M=Router.Nodes.CustomProperties.Device_Type}",
    "host": "${N=SWQL;M=SELECT TOP 1 RelatedNodeCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "host_url": "${N=SWQL;M=SELECT TOP 1 RelatedNodeDetailsUrl FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "ip": "${N=SwisEntity;M=IP_Address}",
    "location": "${N=SwisEntity;M=Router.Nodes.CustomProperties.City}",
    "object": "${N=SWQL;M=SELECT TOP 1 EntityCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "object_type": "${N=Alerting;M=ObjectType}",
    "timestamp": "${N=SWQL;M=SELECT GETUTCDATE() as a1 FROM Orion.Engines}",
    "reset": "true"
}
``` 

## Données collectées

### Métriques

L'intégration SolarWinds n'inclut aucune métrique.

### Événements

L'intégration SolarWinds recueille des alertes SolarWinds dans le flux d'événements.

### Checks de service

L'intégration SolarWinds n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'assistance Datadog.

