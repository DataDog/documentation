---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - exceptions
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/rookout/README.md'
display_name: Rookout
draft: false
git_integration_title: rookout
guid: ad342dd9-4fe8-44e6-8bee-1e1cc64b1d28
integration_id: rookout
integration_title: Rookout
is_public: true
kind: integration
maintainer: support@rookout.com
manifest_version: 1.0.0
name: rookout
public_title: Intégration Datadog/Rookout
short_description: 'Alertes, logging et debugging de production'
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques custom pour votre application en quelques clics et envoyez-les vers Datadog. Aucun code, redéploiement ni redémarrage de votre application nécessaire.

- Améliorez la surveillance et accélérez le debugging de production avec la collecte de données à la demande de Rookout
- Recueillez des métriques custom ad-hoc depuis Rookout sans nouvelle instrumentation requise

**Remarque : étant donné que cette intégration vous permet de recueillir des métriques custom, une facturation supplémentaire peut s'appliquer en fonction du nombre de métriques custom recueillies. [Cliquez ici][1] pour en savoir plus sur les métriques custom.**

## Configuration

### Installation

Rookout envoie des données à Datadog via le service DogStatsD disponible à partir de l'Agent Datadog.

1. Installez l'[Agent Datadog][2] et [Rookout][3]

2. Connectez-vous à [l'application Web du shell Rookout][4]

3. Dans le volet de droite (Rules), cliquez sur le bouton du menu

    ![Menu des actions de règle][5]

4. Cliquez sur _Create new template_ pour créer un modèle de règle

    ![Bouton Create new template][6]

5. Copiez le modèle de règle de métrique custom Datadog [disponible ici][7] dans l'éditeur et remplacez le modèle de règle par défaut

    ![Modèle de règle de métrique custom Datadog][8]

6. Cliquez sur l'icône Enregistrer pour enregistrer le modèle

    ![Icône Enregistrer][9]

7. Ajoutez la règle nouvellement créée à n'importe quelle application comme vous le feriez habituellement

### Configuration

Vous pouvez configurer la règle afin d'utiliser des actions spécifiques. Chaque règle doit comprendre ces attributs dans l'objet `processing.operations` :

```json
{
  "name": "dogstatsd",
  "action": "<ACTION>",
  "metric": "<NOM_MÉTRIQUE>",
  "target": {
    "host": "<NOM_HOST>",
    "port": 8125
  }
}
```

En fonction des actions définies, des attributs supplémentaires sont nécessaires :

| Action Datadog |  Attributs |
|----------------|-------------|
|    increment   | value       |
|    decrement   | value       |
|      event     | title, text |
|      gauge     | value       |
|    histogram   | value       |
|     timing     | value       |
|  distribution  | value       |

Pour en savoir plus sur ces actions, consultez la [documentation relative à Dogstatsd][10]

Tous les attributs doivent être formatés de la manière suivante afin d'être acceptés par notre règle :

```json
"value": {
    "name": "calc",
    "path": "123"
}
```

```json
"value": {
    "name": "calc",
    "path": "\"string\""
}
```

## Données collectées

Vous pouvez recueillir des métriques custom et des événements en créant une sortie Datadog dans votre règle Rookout. Exemples de modèles couramment utilisés :

- Compter le nombre de fois qu'une méthode est invoquée (increment)
- Documenter le processus démarré dans Datadog (event)
- Enregistrer les tailles de lot (histogram)

## Dépannage

Si vous avez des questions, contactez-nous à l'adresse support@rookout.com.

[1]: https://docs.datadoghq.com/fr/getting_started/custom_metrics/
[2]: https://docs.datadoghq.com/fr/agent/
[3]: https://docs.rookout.com/docs/getting-started.html
[4]: https://app.rookout.com
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rookout/images/click_rule_action.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rookout/images/click_new_template.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rookout/rule-template.json
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rookout/images/datadog_rule_template.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rookout/images/click_save.png
[10]: https://docs.datadoghq.com/fr/developers/dogstatsd/