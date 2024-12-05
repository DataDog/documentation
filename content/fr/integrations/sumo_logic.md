---
aliases:
- /fr/integrations/sumologic/
categories:
- notifications
dependencies: []
description: Envoyez des logs Sumo Logic à Datadog et des notifications Datadog à
  Sumo Logic.
doc_link: https://docs.datadoghq.com/integrations/sumologic/
draft: false
git_integration_title: sumo_logic
has_logo: true
integration_id: ''
integration_title: Sumo Logic
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: sumo_logic
public_title: Intégration Datadog/Sumo Logic
short_description: Envoyez des logs Sumo Logic à Datadog et des notifications Datadog
  à Sumo Logic.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Datadog s'intègre à Sumo Logic de deux façons : vous pouvez transférer des données de log Sumo Logic vers votre flux d'événements Datadog, ou utiliser Sumo Logic en tant que canal de notification pour vos alertes et événements Datadog. En d'autres termes, chaque service peut transmettre des informations à l'autre.

## Formule et utilisation

### Liste des infrastructures

#### Datadog vers Sumo Logic

1. Connectez-vous à Sumo Logic en tant qu'utilisateur disposant de droits d'administrateur.
2. Dans le menu principal, choisissez **Manage** -> **Collection**.
3. Cliquez sur le lien **Add Collector** en haut à gauche. {{< img src="integrations/summologic/integrations-sumo-hostedcollector.png" alt="Collection hébergée" popup="true">}}
4. Choisissez **Hosted Collector**.
5. Saisissez un nom et éventuellement une description, une catégorie et un fuseau horaire. Cliquez sur **Save**.
6. Cliquez sur **HTTP** dans la section correspondant aux API Cloud. Remplissez le formulaire en fonction des informations du collecteur. Cliquez sur **Save**.
7. Copiez l'URL fournie dans la boîte de dialogue suivante.
8. Accédez à l'écran relatif aux [paramètres d'intégration Sumo Logic][1] dans Datadog.
9. Saisissez le nom que vous souhaitez attribuer au collecteur et l'URL fournie ci-dessus.
10. La prochaine fois que vous souhaitez envoyer un message à partir de Datadog vers Sumo Logic, utilisez **@sumologic-{NOM DE VOTRE COLLECTEUR}**.

#### Sumo Logic vers Datadog

1. Connectez-vous à Sumo Logic en tant qu'utilisateur disposant de droits d'administrateur.
2. Dans le menu principal, choisissez **Manage** -> **Connections**.
3. Cliquez sur le bouton **Add**.
4. Cliquez sur le bouton **Datadog**. {{< img src="integrations/summologic/integrations-sumo-connectiontype.png" alt="Cliquez sur le bouton Datadog" popup="true">}}
5. Donnez un nom à la connexion et éventuellement une description. Pour l'URL, saisissez :

    ```text
    https://app.datadoghq.com/api/v1/events?api_key=<DATADOG_API_KEY>
    ```

6. Personnalisez la charge utile en fonction de vos besoins. Cliquez sur le lien **Help** pour découvrir les variables disponibles.
7. Cliquez sur **Test Connection**. Vous devriez voir apparaître un nouvel élément dans votre flux d'événements, similaire à ce qui suit : {{< img src="integrations/summologic/integrations-sumo-event.png" alt="Événement test" popup="true">}}
8. Si tout semble correct, cliquez sur **Save**.
9. Dans Sumo Logic, enregistrez la recherche de votre choix et choisissez de planifier la recherche.
10. Sélectionnez la valeur Webhook pour **Alert Type**. Choisissez votre nouvelle connexion Datadog dans la liste des webhooks. Vous pouvez personnaliser la charge utile et modifier la condition de l'alerte dans le champ **Alert Condition** de façon à envoyer une notification uniquement lorsque le nombre de résultats est supérieur à 0. {{< img src="integrations/summologic/integrations-sumo-savesearch.png" alt="Collection hébergée" popup="true">}}

[1]: https://app.datadoghq.com/integrations/sumo_logic