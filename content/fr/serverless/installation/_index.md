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
### Installer l'intégration Datadog/AWS

Installez [l'intégration AWS][1]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS CloudWatch.

### Instrumenter votre application sans serveur

Sélectionnez un runtime Lambda ci-dessous pour découvrir comment instrumenter votre application sans serveur.

   {{< partial name="serverless/getting-started-languages.html" >}}

[1]: /fr/integrations/amazon_web_services/#setup