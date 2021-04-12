---
"categories":
- "monitoring"
- "notification"
"ddtype": "crawler"
"dependencies": []
"description": "Consultez les données de disponibilité, les délais de réponse et les alertes recueillis par Pingdom dans Datadog."
"doc_link": "https://docs.datadoghq.com/integrations/pingdom/"
"draft": false
"git_integration_title": "pingdom"
"has_logo": true
"integration_title": "Pingdom"
"is_public": true
"kind": "integration"
"manifest_version": "1.0"
"name": "pingdom"
"public_title": "Intégration Datadog/Pingdom"
"short_description": "Consultez les données de disponibilité, les délais de réponse et les alertes recueillis par Pingdom dans Datadog."
"version": "1.0"
---

## Présentation

Surveillez les métriques de performance axées sur l'utilisateur de Pingdom dans Datadog, afin de les corréler avec d'autres événements et métriques pertinents.

Datadog surveille la métrique `response_time` pour tous les sites que vous configurez sur le site Web de Pingdom.

Les événements de Pingdom peuvent être ajoutés en configurant le [monitor de statut d'intégration][1] adéquat.

<div class="alert alert-info">
Les métriques peuvent uniquement être importées pour les clients Pingdom de niveau Starter ou supérieur.
</div>

## Configuration

### Installation

1. Ouvrez le carré d'intégration Pingdom.
2. Saisissez le nom d'utilisateur et le mot de passe de votre compte Pingdom. Si vous possédez un compte d'équipe, vous pouvez utiliser vos propres identifiants et spécifier le compte à partir duquel vous souhaitez effectuer des vérifications.
3. Vous pouvez ignorer certains checks en les décochant ou en ajoutant des tags aux événements qui seront générés.

## Données collectées

### Métriques
{{< get-metrics-from-git "pingdom" >}}


### Événements

L'intégration Pingdom n'inclut aucun événement.

### Checks de service

L'intégration Pingdom récupère les checks de transaction et les signale en tant que checks de service.

Pour le check `pingdom.status`, le tableau suivant présente les corrélations entre les checks de transaction Pingdom et les checks de service Datadog.

| Statut Datadog | Statut Pingdom      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`, `paused` |

## Dépannage

### Je rencontre une erreur lors de la mise à jour de l'utilisateur ou du mot de passe. Pourquoi ?

Vous avez peut-être déjà rencontré l'erreur suivante lors de l'enregistrement de vos identifiants Pingdom :

`“There was an issue while testing your Pingdom configuration: Not permitted for account type”`.

Ajoutez l'adresse e-mail du propriétaire de votre compte Pingdom dans le champ **(Optional) Account to query**, puis enregistrez-la.

[1]: https://app.datadoghq.com/monitors#create/integration
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/pingdom/pingdom_metadata.csv

