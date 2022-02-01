---
title: Migration depuis le Forwarder Datadog vers l'extension Lambda Datadog
kind: guide
---
## Présentation


Ce guide explique comment migrer depuis le [Forwarder Datadog][1] vers l'extension Lambda Datadog.

L'[extension Lambda Datadog][2] est une version légère de l'Agent Datadog conçue pour s'exécuter en même temps que votre code, avec un impact minimal sur les performances.

Datadog vous recommande de configurer l'extension **avant** de supprimer le Forwarder. Durant la période où l'extension et le Forwarder sont tous les deux actifs, toutes les données de télémétrie sont envoyées deux fois. Une autre solution consiste à supprimer le Forwarder avant de configurer l'extension. Vous perdrez toutefois toute visibilité sur vos données pendant une certaine période. Choisissez l'une de ces deux approches en fonction des besoins spécifiques de votre organisation.

## Configuration de l'extension Lambda Datadog {#configuration-de-l-extension}

Consultez la [documentation relative à l'extension Lambda Datadog][2]. 

## Suppression du Forwarder Datadog

### Empêcher le Forwarder de s'activer pour les nouvelles fonctions {#empecher-le-forwarder}

Lorsque vous déployez une nouvelle fonction, le Forwarder Datadog détecte que celle-ci n'est pas abonnée, et crée donc automatiquement un abonnement. Si vous utilisez la configuration automatique du Forwarder et que l'extension Lambda est installée sur votre fonction, le Forwarder ne s'abonne pas automatiquement aux groupes de logs de cette fonction.

{{< tabs >}}
{{% tab "Framework Serverless" %}}

Supprimez le nom de ressource du Forwarder depuis le fichier `serverless.yml`.

{{% /tab %}}
{{% tab "AWS SAM" %}}

Supprimez le nom de ressource du Forwarder depuis le fichier `template.yml`.

{{% /tab %}}
{{% tab "AWS CDK" %}}

Supprimez le nom de ressource du Forwarder depuis votre pile CDK.

{{% /tab %}}
{{% tab "Zappa" %}}

Supprimez manuellement l'abonnement depuis la console AWS.

{{% /tab %}}
{{% tab "Chalice" %}}

Supprimez manuellement l'abonnement depuis la console AWS.

{{% /tab %}}
{{% tab "Interface de ligne de commande Datadog" %}}

Supprimez manuellement l'abonnement depuis la console AWS.

{{% /tab %}}
{{% tab "Image de conteneur" %}}

Supprimez manuellement l'abonnement depuis la console AWS.

{{% /tab %}}
{{% tab "Personnalisé" %}}

Supprimez manuellement l'abonnement depuis la console AWS.

{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la [documentation relative au Forwarder Datadog][1].

## Approche hybride

Vous pouvez également choisir de continuer à vous servir du Forwarder Datadog pour vos fonctions existantes et d'utiliser l'extension Lambda Datadog pour toutes vos nouvelles fonctions.

1. Vérifiez que le Forwarder [ne s'active pas automatiquement](#empecher-le-forwarder) pour les nouvelles fonctions.
2. Pour chaque nouvelle fonction déployée, [configurez l'extension](configuration-de-l-extension).

[1]: /fr/serverless/libraries_integrations/forwarder/
[2]: /fr/serverless/libraries_integrations/extension/