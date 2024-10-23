---

title: Instrumenter des applications .NET sans serveur avec le Forwarder Datadog
---
## Présentation

<div class="alert alert-warning">
Si vous commencez tout juste à utiliser la surveillance sans serveur Datadog, suivez plutôt les <a href="/serverless/installation/dotnet">instructions d'instrumentation des fonctions Lambda avec l'extension Lambda Datadog</a>. Si vous avez configuré la surveillance sans serveur Datadog avec le Forwarder Datadog avant que les fonctionnalités Lambda clés en main ne soient proposées, consultez ce guide pour gérer votre instance.
</div>

## Prérequis

Pour ingérer des métriques optimisées, métriques custom et logs AWS Lambda, vous devez utiliser la [fonction Lambda du Forwarder Datadog][1].

## Activer le tracing X-Ray

1. Activez [le tracing actif AWS X-Ray][2] pour votre fonction Lambda.
2. Installez le [SDK AWS X-Ray pour .NET][3].

## Abonner le Forwarder Datadog à des groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, [abonnez][4] la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

## Et ensuite ?

- Vous pouvez désormais visualiser des métriques, logs et traces sur la [page d'accueil Serverless][5].
- Consultez l'exemple de code pour [surveiller une logique opérationnelle personnalisée](#surveiller-une-logique-operationnelle-personnalisee).
- Consultez le [guide de dépannage][6] si vous ne parvenez pas à recueillir les données de télémétrie.

## Surveiller une logique opérationnelle personnalisée

Si vous souhaitez envoyer une [métrique custom][7] à l'aide du Forwarder Datadog, consultez l'exemple de code ci-dessous :

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```


[1]: /fr/serverless/forwarder
[2]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[4]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[5]: https://app.datadoghq.com/functions
[6]: /fr/serverless/guide/troubleshoot_serverless_monitoring/
[7]: /fr/serverless/custom_metrics