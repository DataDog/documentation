---
aliases:
- /fr/serverless/troubleshooting/connect_invoking_resources/

title: Bénéficier d'une visibilité accrue sur les ressources appelant des fonctions
  Lambda
---

{{< img src="serverless/serverless-view.png" alt="Vue Serverless" >}}

Par défaut, la vue Serverless regroupe vos ressources sans serveur par service, afin que vous puissiez visualiser facilement les performances de chaque aspect de votre application. Chaque service répertorie les fonctions associées, ainsi que les ressources qui ont appelé ces fonctions (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis).

Bien que les ressources soient par défaut regroupées par service, vous pouvez également les rassembler selon le nom de la pile AWS CloudFormation, ou selon tout autre tag que vous avez configuré (pour regrouper vos ressources par équipe, projet ou environnement)

## Configuration

Pour instrumenter pour la première fois vos fonctions Lambda, suivez les [instructions d'installation de la surveillance sans serveur][1].

Les ressources gérées sont automatiquement connectées à vos fonctions AWS Lambda si toutes les affirmations suivantes se vérifient :
- Vos fonctions sont rédigées avec un runtime Lambda Node.js ou Python.
- La solution APM est configurée sur vos fonctions [avec l'intégration X-Ray Datadog][2] et la [bibliothèque Lambda Datadog est configurée de façon à enrichir les segments AWS X-RAY][3], **OU** la solution APM est configurée sur vos fonctions avec les [bibliothèques de tracing Datadog][2] (`dd-trace`). 
- La ressource gérée appelant votre fonction correspond à l'un des éléments suivants : API Gateway, SQS, SNS, EventBridge, Kinesis, DynamoDB ou S3.
- Vos fonctions sont instrumentées avec une version récente de la bibliothèque Lambda Datadog (>= `v3.46.0` pour Node, >= `v28` pour Python).

[1]: /fr/serverless/installation
[2]: /fr/serverless/distributed_tracing#choose-your-tracing-library
[3]: /fr/integrations/amazon_xray/#enriching-xray-segments-with-datadog-libraries