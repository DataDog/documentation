---
app_id: ozcode
app_uuid: 02e228a6-15e4-4c00-822d-42e8e5a2fef7
assets:
  dashboards:
    Ozcode - Errors: assets/dashboards/errors.json
    Ozcode - Tracepoints: assets/dashboards/tracepoints.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: datadog.marketplace.ozcode.agent
      metadata_path: metadata.csv
      prefix: ozcode.agent
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: ozcode
author:
  homepage: https://www.oz-code.com
  name: Ozcode
  sales_email: support@oz-code.com
  support_email: support@oz-code.com
  vendor_id: ozcode
categories:
  - marketplace
classifier_tags:
  - Supported OS::Windows
  - Category::Marketplace
  - Offering::Software License
  - Offering::Integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: ozcode
integration_id: ozcode
integration_title: Ozcode
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: ozcode
oauth: {}
pricing:
  - billing_type: tag_count
    includes_assets: true
    metric: datadog.marketplace.ozcode.agent
    product_id: agent
    short_description: Outil complet de debugging temporel en temps réel pour .Net
    tag: host
    unit_label: Hosts d'Agent Ozcode
    unit_price: 1
public_title: Ozcode
short_description: Outil complet de debugging temporel en temps réel pour .Net
supported_os:
  - windows
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Outil complet de debugging temporel en temps réel pour .Net
  media:
    - caption: "Ozcode est une solution qui révolutionne le debugging en temps réel basé sur des logs. Grâce à l'enregistrement automatique des exceptions et à l'activation dynamique du logging grâce à des tracepoints, Ozcode fournit aux développeurs les données en temps réel afin qu'ils puissent effectuer un debugging temporel. Résultat\_: ils travaillent bien plus efficacement et résolvent les incidents jusqu'à 5\_fois plus rapidement."
      image_url: images/VideoThumbnail.jpg
      media_type: video
      vimeo_id: 619368255
    - caption: Les exceptions sont automatiquement enregistrées et affichées dans votre dashboard. Grâce à ce processus d'enregistrement autonome, vous n'avez plus besoin de reproduire vos erreurs de production.
      image_url: images/1-Ozcode-LiveDebugger-ExceptionDashboard.png
      media_type: image
    - caption: Grâce aux données ultraprécises de debugging temporel que vous recueillez, vous bénéficiez d'une visibilité inédite sur le code de vos erreurs de production. Vous pouvez visualiser les variables, les variables locales, les paramètres de méthode et les valeurs renvoyées, les requêtes réseau, les requêtes de base de données ou encore les logs pertinents dans l'ensemble de la call stack, afin de consulter tout le flux d'exécution des erreurs.
      image_url: images/2-Ozcode-LiveDebugger-TimeTravelDebugging.png
      media_type: image
    - caption: Les tracepoints vous permettent d'ajouter à la volée des logs dynamiques sans avoir à générer ou à déployer à nouveau votre application. Ils fournissent des données exhaustives de debugging temporel sur toute la call stack, et peuvent même inclure des conditions.
      image_url: images/3-Ozcode-LiveDebugger-Tracepoint.png
      media_type: image
    - caption: "Transmettez la sortie des logs dynamiques à la solution Log\_Management Datadog afin de l'analyser. Cliquez sur l'entrée d'un log dynamique dans Datadog pour accéder au tracepoint à son origine dans Ozcode."
      image_url: images/4-Ozcode-LiveDebugger-PipeLogsToDD.png
      media_type: image
    - caption: Veillez au respect des réglementations en matière de confidentialité grâce à la censure des informations personnelles. Les données censurées ne quittent jamais l'environnement de production et peuvent être contrôlées de façon granulaire à l'aide d'expressions régulières, d'identifiants, de classes et d'espaces de nommage.
      image_url: images/5-Ozcode-LiveDebugger-ConfigPIIRedaction.png
      media_type: image
    - caption: Les données censurées ne quittent jamais l'environnement de production et sont masquées lors du debugging.
      image_url: images/6-Ozcode-LiveDebugger-PIIRedaction.png
      media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Ozcode
---
## Présentation

L'outil Ozcode Production Debugger vous permet de procéder à un debugging en temps réel sans avoir à modifier le code. Lorsqu'une erreur est détectée, Ozcode fournit des données ultraprécises de debugging temporel et vous permet d'accéder au code du flux d'exécution des erreurs. Cela facilite le travail des développeurs et réduit le délai de résolution.

### CI/CD plus rapide

Grâce aux processus de debugging en temps réel dans les environnements intermédiaires ou de test, ou dans des déploiements Canary, Ozcode fournit directement aux développeurs les données dont ils ont besoin. Il n'est plus nécessaire de faire remonter les informations depuis les environnements de production vers les environnements de développement. De plus, aucune modification de code n'est requise.

### Réduction du délai de résolution des incidents

Ozcode identifie de façon proactive les erreurs et fournit aux développeurs pertinents toutes les données nécessaires pour comprendre et corriger les bugs. Cela améliore ainsi vos métriques MTTD, MTTF et MTTR.

### Vue d'ensemble des exceptions

Ozcode enregistre les exceptions et les affiche dans le dashboard Ozcode Datadog. Il vous suffit de cliquer sur une exception pour procéder à son debugging.

### Debugging des exceptions

L'écran de debugging rassemble des données ultraprécises de debugging temporel, y compris les variables locales, les paramètres de méthode et les valeurs renvoyées, les déclarations conditionnelles codées par couleur, les requêtes réseau et les requêtes de base de données sur toute la call stack. Grâce à toutes ces informations sur le code, vous pouvez déterminer facilement la cause à l'origine de vos bugs et procéder rapidement à leur correction.

### Debugging en temps réel avec les logs dynamiques et les tracepoints

Modifier votre code, le générer, le tester, le publier, et enfin déployer une nouvelle version… avec Ozcode, il n'est plus nécessaire de suivre toutes ces étapes chronophages pour ajouter des métriques, traces et logs en temps réel . En effet, vous pouvez enregistrer toutes les variables d'un tracepoint sans avoir à modifier le code.

### Transmettre les logs, métriques et traces à Datadog

Transmettez directement les logs, métriques et traces à Datadog et corrélez-les grâce aux ID de trace et de span. Les frameworks de logging populaires, notamment SeriLog, nLog et log4net, sont tous pris en charge. Ozcode vous fournit des liens ponctuels vous permettant d'ouvrir l'interface dans un nouvel onglet, afin de visualiser toutes les données de debugging temporel relatives à une exception.

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez Ozcode aux coordonnées suivantes :

- Assistance : support@oz-code.com
- Service commercial : sales@oz-code.com
- Téléphone : +1 781-708-2561

Vous pouvez également consulter les liens suivants pour obtenir des informations supplémentaires :

[Documentation][5]
[FAQ][6]
[Notes de version][7]


---
Développé avec passion en Israël

---

Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici][4] pour l'acheter.

[1a]: https://docs.datadoghq.com/tracing/setup_overview/setup/dotnet-core/?tab=windows
[1b]: https://docs.datadoghq.com/tracing/setup_overview/setup/dotnet-core/?tab=windows
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/marketplace/app/ozcode/pricing
[5]: https://oz-code.com/knowledge-base/production-debugger/documentation 
[6]: https://oz-code.com/knowledge-base/production-debugger/pd-q-and-a
[7]: https://oz-code.com/knowledge-base/production-debugger/pd-release-notes