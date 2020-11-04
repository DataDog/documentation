---
title: Instrumenter des applications .NET
kind: documentation
further_reading:
  - link: serverless/serverless_tagging/
    tag: Informatique sans serveur
    text: Tagging d'applications sans serveur
  - link: serverless/distributed_tracing/
    tag: Informatique sans serveur
    text: Tracing d'applications sans serveur
  - link: serverless/custom_metrics/
    tag: Informatique sans serveur
    text: Envoyer des métriques custom depuis des applications sans serveur
---
Après avoir installé l'[intégration AWS][1] et le [Forwarder Datadog][2], suivez les étapes ci-dessous pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

## Configuration

### Configurer la fonction

1. Activez [le tracing actif AWS X-Ray][3] pour votre fonction Lambda.
2. Installez le [SDK AWS X-Ray pour .NET][4].

### Abonner le Forwarder Datadog aux groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, vous devez abonner la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][2].
2. [Vérifiez que l'option DdFetchLambdaTags est activée][5].
3. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][6].

## Explorer la surveillance sans serveur de Datadog

Après avoir configuré votre fonction en suivant la procédure ci-dessus, vous devriez pouvoir visualiser vos métriques, logs et traces sur la [page Serverless principale][7].

Si vous souhaitez envoyer une métrique custom, consultez l'exemple de code ci-dessous :

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/#1-install-the-cloud-integration
[2]: https://docs.datadoghq.com/fr/serverless/forwarder/
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[5]: https://docs.datadoghq.com/fr/serverless/forwarder/#experimental-optional
[6]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://app.datadoghq.com/functions