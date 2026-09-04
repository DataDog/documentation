---
further_reading:
- link: /integrations/google-cloud-run/
  tag: Documentation
  text: Intégration de Google Cloud Run
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recueillir des traces, logs et métriques custom à partir de services Cloud Run
- link: /serverless/google_cloud_run/containers/in_container/
  tag: Documentation
  text: Instrumentez votre conteneur avec l'approche In-Container
- link: /serverless/google_cloud_run/containers/sidecar/
  tag: Documentation
  text: Instrumentez votre conteneur avec l'approche Sidecar
- link: https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/
  tag: Blog
  text: Instrumentez les applications Google Cloud Run avec le nouveau sidecar de
    Datadog Agent.
- link: /mcp_server/tools/#serverless_onboarding
  tag: Documentation
  text: 'Datadog MCP Server : serverless_onboarding tool'
title: Choisir une méthode d'instrumentation pour les conteneurs
---
## Configuration avec l'onboarding assisté par agent {#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Cette fonctionnalité n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog sélectionné</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utilisez l'onboarding assisté par agent pour configurer la surveillance de vos conteneurs Cloud Run avec l'assistance de l'IA. L'onboarding assisté par agent détecte les frameworks de votre projet, applique la configuration requise sur place et vérifie que les données circulent. Deux chemins complémentaires utilisent le même compte Datadog :

- **AI Setup CLI** : un outil de terminal autonome. Utilisez-le lorsque vous ne souhaitez pas installer de serveur MCP.
- **MCP Server** : Configurez-le depuis votre IDE via un assistant de codage tel que Claude Code ou Cursor.

{{< tabs >}}
{{% tab "AI Setup CLI" %}}

Exécutez la CLI dans le répertoire de votre projet (nécessite Node.js 22+). Il lie votre compte Datadog, puis instrumente votre service Cloud Run :

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run
```

Omettez `--product` pour exécuter de manière interactive, ou ajoutez `--site` pour cibler votre site Datadog.

{{% /tab %}}
{{% tab "MCP Server" %}}

Utilisez l'outil [`serverless_onboarding`](https://docs.datadoghq.com/fr/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) du serveur Datadog MCP pour configurer la surveillance de vos conteneurs Cloud Run avec l'assistance de l'IA. Une fois connecté, essayez une invite telle que :

```
Help me monitor my GCP Cloud Run services with Datadog using Terraform.
```

{{% /tab %}}
{{< /tabs >}}

## Instrumentation manuelle {#manual-instrumentation}
Pour instrumenter vos conteneurs Google Cloud Run avec Datadog, choisissez l'une des deux options :

{{% gcr-container-options %}}

- [**In-Container**][1] : encapsule votre conteneur d'application avec Datadog Agent. Choisissez cette option pour une configuration plus simple, un coût réduit et un transfert direct des logs.
- [**Sidecar**][2] : déploie Datadog Agent dans un conteneur séparé aux côtés de votre conteneur d'application. Choisissez cette option si vous avez plusieurs conteneurs dans un seul service, si vous préférez une isolation stricte de Datadog Agent ou si vous avez des charges de travail sensibles aux performances.

### Comparaison : instrumentation In-Container versus Sidecar {#comparison-in-container-versus-sidecar-instrumentation}

| Aspect                        | In-Container                                               | Sidecar                                                                                                                                                      |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Déploiement                    | Un conteneur (votre application, encapsulée avec Datadog Agent) | Deux conteneurs (votre application, Datadog Agent) |
| Modifications d'image                 | Augmente la taille de l'image de l'application.                                | Aucune modification de l'image de l'application.                                                                                                                                      |
| Coût supplémentaire                 | Moins élevé que le Sidecar (pas de conteneur supplémentaire).                  | vCPU/mémoire supplémentaire. Surallouer le Sidecar entraîne un gaspillage de coûts ; le sous-allouer conduit à une mise à l'échelle prématurée.                                                       |
| Journalisation                       | Accès direct à stdout/stderr.                             | Volume partagé + routage de la bibliothèque de logs vers un fichier log. Les erreurs non interceptées nécessitent un traitement supplémentaire, car elles ne sont pas automatiquement gérées par votre bibliothèque de journalisation. |
| Isolation des pannes             | Dans de rares cas, les bugs de Datadog Agent peuvent affecter votre application.   | Les pannes de Datadog Agent sont isolées.                                                                                                                           |

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/google_cloud_run/containers/in_container
[2]: /fr/serverless/google_cloud_run/containers/sidecar
[3]: /fr/agentic_onboarding/setup