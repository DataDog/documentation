---
description: En savoir plus sur le pack AWS Lambda.
title: AWS Lambda
---
## Présentation {#overview}

{{< img src="observability_pipelines/packs/aws_lambda.png" alt="Le pack AWS Lambda" style="width:25%;" >}}

Les journaux AWS Lambda capturent les invocations, les erreurs et les démarrages à froid.

Ce que fait ce pack :

- Analyse les lignes REPORT pour obtenir des métriques clés
- Supprime les lignes START et END
- Marque les démarrages à froid et les timeouts