---
title: Guides d'utilisation de la surveillance sans serveur
kind: guide
---
Utilisez ces guides pour configurer les métriques, les traces et les logs dans votre écosystème sans serveur.

- Premièrement, nous allons configurer les **métriques Lambda optimisées de Datadog** pour découvrir comment représenter graphiquement les démarrages à froid dans votre infrastructure Lambda.
- Deuxièmement, nous activerons l'**ingestion de logs** Lambda et nous verrons comment parcourir les logs d'erreurs Lambda. Troisièmement, nous présenterons des outils conçus pour vous permettre d'identifier rapidement la cause réelle d'un problème en activant le **tracing distribué** Lambda.
- Enfin, nous verrons comment surveiller des **métriques custom** et des services dans votre écosystème sans serveur.

# Choisissez votre langage

{{< partial name="serverless/serverless-guide.html" >}}

<br></br>  
Pour les autres langages, la [documentation sur l'intégration AWS Lambda][1] offre des instructions de configuration plus détaillées.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/#overview