---
further_reading:
- link: https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions
  tag: Blog
  text: 'Cloud Functions devient Cloud Run functions : la programmation événementielle
    sur une plateforme serverless unifiée'
- link: /mcp_server/tools/#serverless_onboarding
  tag: Documentation
  text: 'Datadog MCP Server : serverless_onboarding tool'
title: Instrumentation de Cloud Run functions
type: multi-code-lang
---
<div class="alert alert-info">
<strong>Vous recherchez Cloud Run functions de 1re génération ?</strong> Si vous utilisez Cloud Run functions de 1re génération, anciennement appelées Cloud Functions de 1re génération, consultez <a href="/serverless/google_cloud_run/functions_1st_gen">Instrumentation Cloud Run functions de 1re génération</a>
</div>

## Configuration avec l'onboarding assisté par agent {#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Cette fonctionnalité n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog sélectionné</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utilisez l'onboarding assisté par agent pour configurer la surveillance de vos Cloud Run functions avec l'assistance de l'IA. L'onboarding assisté par agent détecte les frameworks de votre projet, applique la configuration requise sur place et vérifie que les données circulent. Deux chemins complémentaires utilisent le même compte Datadog :

- **AI Setup CLI** : un outil de terminal autonome. Utilisez-le lorsque vous ne souhaitez pas installer de serveur MCP.
- **MCP Server** : Configurez-le depuis votre IDE via un assistant de codage tel que Claude Code ou Cursor.

{{< tabs >}}
{{% tab "AI Setup CLI" %}}

Exécutez la CLI dans le répertoire de votre projet (nécessite Node.js 22+). Il lie votre compte Datadog, puis instrumente vos Cloud Run functions :

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions
```

Omettez `--product` pour exécuter de manière interactive, ou ajoutez `--site` pour cibler votre site Datadog.

{{% /tab %}}
{{% tab "MCP Server" %}}

Utilisez l'outil [`serverless_onboarding`](https://docs.datadoghq.com/fr/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) du serveur Datadog MCP pour configurer la surveillance de vos Cloud Run functions avec l'assistance de l'IA. Une fois connecté, essayez une invite telle que :

```
Help me monitor my GCP Cloud Run functions with Datadog using Terraform.
```

{{% /tab %}}
{{< /tabs >}}

## Instrumentation manuelle {#manual-instrumentation}

Tout d'abord, configurez l'[Datadog-Google Cloud Platform integration][1] pour collecter les métriques et les logs des services Google Cloud. N'oubliez pas d'ajouter le rôle `cloud asset viewer` à votre compte de service et d'activer l'API Cloud Asset Inventory dans Google Cloud.

Ensuite, sélectionnez votre runtime ci-dessous pour obtenir des instructions sur la manière d'instrumenter votre application :

{{% container-languages path="google_cloud_run/functions" functions="true" %}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/google-cloud-platform/
[2]: /fr/agentic_onboarding/setup