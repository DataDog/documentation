---
title: Tagging de fonctions sans serveur
kind: documentation
---

{{< img src="serverless/serverless_tagging.mp4" video="true" alt="Tagging unifié sans serveur" >}}

## Présentation

Tout tag appliqué à votre fonction Lambda AWS devient automatiquement une nouvelle dimension que vous pouvez utiliser pour filtrer vos traces.

Les tags sont particulièrement utiles lorsqu'ils sont cohérents sur toute la plateforme Datadog. Les tags `env` et `service` bénéficient notamment d'une prise en charge étendue.

Avec ces deux tags, vous pouvez :

- explorer facilement vos métriques, traces et logs à l'aide de tags cohérents ;
- consulter les données de service en fonction de l'environnement ou de la version de manière unifiée dans l'application Datadog ;
- filtrer vos fonctions sur la page d'accueil sans serveur.

Datadog vous conseille d'adopter certaines bonnes pratiques pour le tagging dans votre environnement sans serveur afin d'harmoniser les tags de vos traces, métriques et logs.

## Taguer directement vos fonctions serverless

Pour détecter les tags provenant de vos fonctions Lambda dans les métriques, traces et logs, Datadog vous recommande de taguer directement vos fonctions Lambda avec les tags `env` et `service` appropriés. Vous trouverez ci-dessous quelques exemples de configurations de tagging pour des outils de développement sans serveur courants :

{{< tabs >}}
{{% tab "Serverless Framework" %}}

Si vous utilisez Serverless Framework, plusieurs options s'offrent à vous pour appliquer des tags dans Datadog :

1. Les tags directement ajoutés au contexte du fournisseur seront appliqués dans tout Datadog :

  ```yaml
  provider:
    name: aws
    runtime: nodejs12.x
    tags:
    service: shopist-cart-confirmation
        env: prod
        version: 1.01
  ```

2. Les tags directement ajoutés à chaque ressource Lambda seront appliqués dans tout Datadog :

  ```yaml
  functions:
    confirmCart:
      handler: cart.confirm
      tags:
        service: shopist-cart-confirmation
        env: prod
        version: 1.01
      events:
        - http:
            path: ping
            method: get

  ```

3. Si vous utilisez le plugin Serverless Framework de Datadog, les tags `service` et `stage` natifs de Serverless Framework seront récupérés en tant que `service` et `env` dans Datadog :

  ```yaml
  service: shopist-cart-confirmation

  provider:
    name: aws
    runtime: nodejs12.x
    stage: prod
  ```

{{% /tab %}}
{{% tab "AWS SAM" %}}

Si vous utilisez AWS SAM, plusieurs options s'offrent à vous pour appliquer des tags dans Datadog :


1. Les tags directement ajoutés à chaque ressource Lambda seront appliqués dans tout Datadog :

  ```yaml
  Resources:
    confirmCart:
      Type: AWS::Serverless::Function
      Properties:
        Handler: src/handlers/cart.confirm
        Tags:
          env: prod
          service: shopist-cart-confirmation
  ```

2. Si vous utilisez la macro CloudFormation Datadog, les tags directement ajoutés dans le contexte `Transform` seront appliqués dans tout Datadog :

  ```yaml
  Transform:
    - AWS::Serverless-2016-10-31
    - Name: DatadogServerless
      Parameters: 
          nodeLayerVersion: 25
          forwarderArn: "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
          stackName: !Ref "AWS::StackName"
          service: "shopist-cart-confirmation"
          env: "prod"
  ```

{{% /tab %}}
{{< /tabs >}}


### Importer des tags de ressources à partir de vos fonctions serverless

Datadog vous recommande vivement d'activer l'option `DdFetchLambdaTags` sur le Forwarder Datadog. Définissez le paramètre `DdFetchLambdaTags` sur `true` sur la pile CloudFormation du Forwarder pour vous assurer que vos traces reçoivent les tags de ressources sur la fonction Lambda d'origine.

Les tags de ressources de la fonction Lambda sont automatiquement récupérés en tant que traces X-Ray dans Datadog sans aucune configuration supplémentaire.

## Organiser votre Service Map

{{< img src="serverless/serverless_service_map.png" alt="Service Map" >}}

### Tag « env »

Utilisez le tag `env` pour faire la distinction entre vos environnements de staging, de développement et de production. Ce tag peut être utilisé pour tout type d'infrastructure, et non pas uniquement pour vos fonctions sans serveur. Par exemple, vous pouvez ajouter le tag `env:prod-eu` à vos fonctions Lambda de production pour la région Europe.

Par défaut, les fonctions AWS Lambda reçoivent le tag `env:none` dans Datadog. Ajoutez votre propre tag pour le remplacer.

### Tag « service »

Ajoutez le tag `service` afin de regrouper les fonctions Lambda correspondant à un même service. La Service Map et la liste des services utilisent ce tag pour représenter les relations entre les différents services et la santé de leurs monitors. Chaque service correspond à un nœud individuel de la Service Map.

Le comportement par défaut pour les nouveaux clients de Datadog consiste à regrouper toutes les fonctions Lambda sous le service `aws.lambda` et à les représenter comme un seul nœud sur la Service Map. Taguez vos fonctions par service pour modifier ce comportement.

**Remarque :** pour certains clients de Datadog, chaque fonction Lambda est considérée comme un service distinct. Ajoutez votre propre tag pour modifier ce comportement ou contactez l'assistance Datadog si vous souhaitez que votre compte adopte le nouveau comportement.
