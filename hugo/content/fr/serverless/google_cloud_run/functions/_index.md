---
further_reading:
- link: https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions
  tag: Blog
  text: Cloud Functions est désormais Cloud Run functions — programmation événementielle
    sur une plateforme sans serveur unifiée.
- link: /mcp_server/tools/#serverless_onboarding
  tag: Documentation
  text: 'Serveur Datadog MCP : outil serverless_onboarding.'
title: Instrumentation des fonctions Cloud Run.
type: multi-code-lang
---
<div class="alert alert-info">
<strong>Vous cherchez des fonctions Cloud Run de 1ère génération ?</strong> Si vous utilisez des fonctions Cloud Run (1ère génération), auparavant connues sous le nom de Cloud Functions (1ère génération), consultez <a href="/serverless/google_cloud_run/functions_1st_gen">Instrumentation des fonctions Cloud Run de 1ère génération</a>.
</div>

## Utilisez le serveur Datadog MCP {#use-the-datadog-mcp-server}

Utilisez le [serveur Datadog MCP][2] pour configurer la surveillance de vos conteneurs Cloud Run avec l'assistance de l'IA. Après vous être connecté, essayez une commande comme :

```shell
Help me monitor my GCP Cloud Run functions with Datadog using Terraform.
```

## Instrumentation manuelle {#manual-instrumentation}

Tout d'abord, configurez l'[intégration Datadog-Google Cloud Platform][1] pour collecter des métriques et des journaux des services Google Cloud. N'oubliez pas d'ajouter le rôle `cloud asset viewer` à votre compte de service et d'activer l'API Cloud Asset Inventory dans Google Cloud.

Ensuite, sélectionnez votre environnement d'exécution ci-dessous pour des instructions sur la façon d'instrumenter votre application :

{{% container-languages path="google_cloud_run/functions" functions="true" %}}



## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/google-cloud-platform/
[2]: /fr/agentic_onboarding/setup