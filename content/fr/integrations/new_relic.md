---
"categories":
- "monitoring"
- "notification"
"ddtype": "crawler"
"dependencies": []
"description": "Consultez les métriques et événements de New Relic dans Datadog."
"doc_link": "https://docs.datadoghq.com/integrations/new_relic/"
"draft": false
"git_integration_title": "new_relic"
"has_logo": true
"integration_title": "New Relic"
"is_public": true
"kind": "integration"
"manifest_version": "1.0"
"name": "new_relic"
"public_title": "Intégration Datadog/New Relic"
"short_description": "Consultez les métriques et événements de New Relic dans Datadog."
"version": "1.0"
---

{{< img src="integrations/new_relic/newrelicdashboard.png" alt="Dashboard New Relic" popup="true">}}

## Présentation

Associez New Relic pour :

- Visualiser les métriques New Relic clés (comme le délai de réponse et le score Apdex) en contexte avec le reste de vos métriques Datadog<br> **(fonctionne uniquement avec les comptes New Relic Pro et formules supérieures)**
- Configurer des alertes New Relic dans votre flux d'événements

## Configuration

### Installation

#### Alertes New Relic dans le flux d'événements

1. Depuis l'onglet Webhook de la page des paramètres de notification d'alerte de New Relic, saisissez l'URL de webhook suivante :

    ```text
    https://app.datadoghq.com/intake/webhook/newrelic?api_key=<DATADOG_API_KEY>
    ```

2. Pour l'option « Custom Payload », définissez « Payload Type » sur JSON.

#### Collecte de métriques New Relic avec l'APM

1. Repérez votre clé d'API REST sur la page Des clés d'API de New Relic (**Account Settings** -> **Integrations** -> **API Keys**) et saisissez-la dans le formulaire sur la page de l'[intégration Datadog/New Relic][1].
2. Pour taguer toutes les métriques avec le numéro de votre compte New Relic, ajoutez un tag account.
3. Choisissez si vous souhaitez recueillir vos métriques par host ou sur l'ensemble de votre app
   _Remarque : si vous activez ces options, cela importera les hosts New Relic dans Datadog._

<div class="alert alert-warning">
Vous devrez peut-être attendre 5 à 10 minutes avant que les métriques New Relic custom apparaissent dans Datadog.
<br>
Les 5 000 premières métriques custom sont automatiquement proposées lors de la saisie.
</div>

## Données collectées

### Métriques
{{< get-metrics-from-git "new_relic" >}}


### Événements

L'intégration New Relic n'inclut aucun événement.

### Checks de service

L'intégration New Relic n'inclut aucun check de service.

## Dépannage

### Comment fonctionne l'option « Collect metrics by host » ?

Lorsque cette option est définie, Datadog recueille les métriques pour chacun des hosts associés au lieu de calculer une moyenne globale en fonction du débit de chaque host.

Cela s'avère utile lorsque vous utilisez ces métriques de façon distincte. Par exemple, vous pouvez déterminer que le host X présente un taux d'erreur Y aberrant qui est problématique, bien que l'application Z affiche globalement un taux d'erreur acceptable sur de nombreux hosts.

Les hosts New Relic sont alors également importés dans la section Infrastructure de Datadog.

### J'ai activé l'option « Collect metrics by host » chez moi. Pourquoi mes métriques d'application affichent-elles des valeurs différentes dans New Relic et Datadog ?

Lorsque New Relic calcule la valeur agrégée au niveau de l'application pour les métriques qui sont mesurées au niveau des hosts (par exemple, le délai de réponse), une moyenne pondérée est calculée à partir du débit mesuré sur chaque host.

La mesure la plus proche dans Datadog est celle fournie par l'agrégateur `avg`, qui calcule la moyenne arithmétique des valeurs. Il s'agit également de l'agrégateur par défaut. Vous pouvez l'obtenir avec une requête très simple, comme `new_relic.web_transaction.average_response_time{*}`. Si vos hosts présentent tous approximativement le même débit, l'agrégation moyenne de Datadog et l'agrégation pondérée en fonction du débit de New Relic génèrent des résultats similaires. Cependant, si le débit n'est pas équilibré, vous verrez des différences de valeurs agrégées au niveau de l'application dans New Relic et Datadog.

Par exemple, imaginez que vous avez une application avec trois hosts. Ces hosts
présentent les valeurs suivantes à un moment t :

```text
           débit    délai de réponse
hostA         305 rpm           240 ms
hostB         310 rpm           250 ms
hostC          30 rpm            50 ms
```

New Relic calcule alors le délai de réponse au niveau de l'application comme suit :

```text
hostA : 240 ms * 305 rpm = durée totale de 73 200
hostB : 250 ms * 310 rpm = durée totale de 77 500
hostC :  50 ms *  30 rpm =  durée totale de 1 500

débit total = 305 + 310 + 30 = 645 rpm
délai de réponse moyen = (73 200 + 77 500 + 1 500) / 645 = 236,0 ms
```

De son côté, Datadog calcule la moyenne arithmétique :

```text
délai de réponse moyen = (240 + 250 + 50) / 3 = 180,0 ms
```

### Beta Alerts : comment inclure des tags personnalisés ?

Vous pouvez inclure des tags personnalisés en utilisant l'option « Use Custom Payload » via la fonction Beta Alerts de New Relic. Pour les configurer, accédez à votre compte New Relic, puis cliquez sur le bouton « Alerts Beta » dans le coin supérieur droit de l'écran. Sélectionnez ensuite la section « Notification channels » et repérez le Webhook que vous avez configuré pour Datadog. Sélectionnez la section « Use Custom Payload » pour la développer et afficher une charge utile JSON. Vous devez modifier cette charge utile en ajoutant un attribut « tags ». Voici un exemple de charge utile modifiée :

```json
{
    "account_id": "$ACCOUNT_ID",
    "account_name": "$ACCOUNT_NAME",
    "condition_id": "$CONDITION_ID",
    "condition_name": "$CONDITION_NAME",
    "current_state": "$EVENT_STATE",
    "details": "$EVENT_DETAILS",
    "event_type": "$EVENT_TYPE",
    "incident_acknowledge_url": "$INCIDENT_ACKNOWLEDGE_URL",
    "incident_id": "$INCIDENT_ID",
    "incident_url": "$INCIDENT_URL",
    "owner": "$EVENT_OWNER",
    "policy_name": "$POLICY_NAME",
    "policy_url": "$POLICY_URL",
    "runbook_url": "$RUNBOOK_URL",
    "severity": "$SEVERITY",
    "targets": "$TARGETS",
    "timestamp": "$TIMESTAMP",
    "tags": ["application:yourapplication", "host:yourhostname", "sometag"]
}
```

Une fois vos modifications terminées, assurez-vous de sélectionner « Update Chanel » pour enregistrer vos changements.

[1]: https://app.datadoghq.com/account/settings#integrations/new_relic
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/new_relic/new_relic_metadata.csv

