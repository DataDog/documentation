---
title: Installation de la surveillance sans serveur
kind: documentation
aliases:
  - /fr/serverless/installation/installing_the_library/
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Installer la surveillance sans serveur Node.js
  - link: serverless/installation/ruby
    tag: Documentation
    text: Installer la surveillance sans serveur Ruby
---
### Installer l'intégration AWS

Installez [l'intégration AWS][1]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS CloudWatch.
### Installer le Forwarder Datadog

Installez la [fonction Lambda du Forwarder Datadog][2], qui est nécessaire pour l'ingestion des traces, des métriques optimisées, des métriques custom et des logs AWS Lambda.

**Remarque** : ignorez cette étape si vous avez déjà installé la fonction du Forwarder avec la pile CloudFormation de l'[intégration AWS][1}.
### Instrumenter votre application

3. Sélectionnez un runtime Lambda ci-dessous pour découvrir comment instrumenter votre application sans serveur.

   {{< partial name="serverless/getting-started-languages.html" >}}

[1]: /fr/integrations/amazon_web_services/#setup
[2]: /fr/serverless/forwarder