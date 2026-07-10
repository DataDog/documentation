---
assets:
  dashboards:
    LambdaTest: assets/dashboards/overview.json
  logs:
    source: lambdatest
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- Suivi des problèmes
- Automatisation
- Test
- Cloud
- Collaboration
- Conteneurs
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lambdatest/README.md
display_name: LambdaTest
draft: false
git_integration_title: lambdatest
guid: 082d56cc-f4f3-4de4-93d4-4601a0767c27
integration_id: lambdatest
integration_title: LambdaTest
integration_version: ''
is_public: true
custom_kind: integration
maintainer: prateeksaini@lambdatest.com
manifest_version: 1.0.0
metric_prefix: lambdatest.
metric_to_check: ''
name: lambdatest
public_title: Intégration Datadog/LambdaTest
short_description: La plus puissante plateforme de test d'automatisation
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Intégrez LambdaTest à votre environnement pour permettre à vos équipes de collaborer efficacement et d'effectuer des tests concluants. LambdaTest est une plateforme de test dans le cloud permettant aux utilisateurs de tester manuellement et automatiquement leurs sites et applications Web sur plus de 2 000 navigateurs, versions de navigateur et systèmes d'exploitation.

LambdaTest prend en charge des tests manuels ainsi que des frameworks de test d'automatisation comme Selenium, Cypress, TestCafe, etc.

Grâce à l'intégration LambdaTest et à la plateforme dédiée, vous pouvez enregistrer des bugs pendant que vous testez vos sites (et applications) Web sur plusieurs navigateurs. LambdaTest inclut automatiquement des données détaillées sur l'environnement de test, notamment la version du navigateur, le système d'exploitation, la résolution, les commentaires associés ainsi que les captures d'écran dans Datadog.

Bénéficiez de toutes les fonctionnalités suivantes de LambdaTest :

- Tests interactifs en temps réel sur plus de 2 000 navigateurs et machines réelles hébergées sur une infrastructure cloud
- Grille de test d'automatisation en ligne prenant en charge les tests Selenium et Cypress avec n'importe quel pipeline de CI/CD, afin d'aider les équipes d'AQ à valider et à livrer plus rapidement des builds de qualité
- Navigateur dernier cri optimisé pour les développeurs permettant de concevoir en peu de temps des sites Web rapides et réactifs
- Plus de 100 intégrations à des outils tiers axés sur la gestion de projet, la communication, l'automatisation sans code, les processus CI/CD, et plus encore
- Assistance 24 h sur 24, 7 jours sur 7
- Accès à vie et gratuit à la plateforme, avec 100 minutes de test d'automatisation offertes

## Configuration

Toutes les étapes de configuration s'effectuent sur le dashboard LambdaTest. Consultez la documentation sur la configuration de l'[intégration LambdaTest/Datadog][1] pour en savoir plus.

### Configuration

Voici la marche à suivre pour surveiller des incidents dans Datadog avec LambdaTest :

1. Connectez-vous à votre compte LambdaTest sur le site dédié.
2. Sélectionnez les paramètres depuis la barre de menu.
3. Cliquez sur Integrations sous les paramètres.
4. Pour intégrer Datadog, cliquez sur Install en regard de l'option Push to Datadog.
5. Saisissez votre [clé d'API et d'application Datadog][2].
6. Vous recevez alors un e-mail de confirmation. Suivez les instructions de confirmation qui y sont indiquées.
7. Une fois que Datadog a été intégré à votre compte LambdaTest, vous pouvez commencer à enregistrer des bugs et à effectuer des tests sur plusieurs navigateurs.

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez LambdaTest aux coordonnées suivantes :

E-mail : support@lambdatest.com
Téléphone : +1 (866) 430-7087
Site Web : https://www.lambdatest.com/

[1]: https://www.lambdatest.com/support/docs/datadog-integration/
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/