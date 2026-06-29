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
  text: Instrumentez votre conteneur avec l'approche in-container
- link: /serverless/google_cloud_run/containers/sidecar/
  tag: Documentation
  text: Instrumentez votre conteneur avec l'approche sidecar
- link: https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/
  tag: Blog
  text: Instrumentez les applications Google Cloud Run avec le nouveau sidecar Datadog
    Agent
- link: /mcp_server/tools/#serverless_onboarding
  tag: Documentation
  text: 'Serveur Datadog MCP : outil serverless_onboarding'
title: Choisir une méthode d'instrumentation pour les conteneurs
---
## Utilisez le Datadog MCP Server {#use-the-datadog-mcp-server}

Utilisez le [Datadog MCP Server][3] pour configurer la surveillance de vos conteneurs Cloud Run avec l'assistance de l'IA. Après vous être connecté, essayez une invite comme :

```shell
Help me monitor my GCP Cloud Run services with Datadog using Terraform.
```

## Instrumentation manuelle {#manual-instrumentation}
Pour instrumenter vos conteneurs Google Cloud Run avec Datadog, choisissez l'une des deux options :

{{% gcr-container-options %}}

- [**in-container**][1] : Enveloppe votre conteneur d'application avec le Datadog Agent. Choisissez cette option pour une configuration plus simple, un coût réduit et un acheminement direct des journaux.
- [**Sidecar**][2] : Déploie le Datadog Agent dans un conteneur séparé à côté de votre conteneur d'application. Choisissez cette option si vous avez plusieurs conteneurs dans un seul service, si vous préférez une isolation stricte du Datadog Agent, ou si vous avez des charges de travail sensibles à la performance.

### Comparaison : Instrumentation in-container versus sidecar {#comparison-in-container-versus-sidecar-instrumentation}

| Aspect                        | in-container                                               | Sidecar |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Déploiement                    | Un conteneur (votre application, enveloppée avec le Datadog Agent) | Deux conteneurs (votre application, Datadog Agent)                                                                                                                    |
| Changements d'image                 | Augmente la taille de l'image de l'application.                                | Aucun changement à l'image de l'application.                                                                                                                                      |
| Coût supplémentaire                 | Moins qu'un sidecar (pas de conteneur supplémentaire).                  | vCPU/mémoire supplémentaires. Une surallocation du sidecar entraîne un gaspillage de coûts ; une sous-allocation conduit à un dimensionnement prématuré.                                                       |
| Journalisation                       | Accès direct à stdout/stderr.                             | Volume partagé + routage de la bibliothèque de journalisation vers un fichier journal. Les erreurs non interceptées nécessitent un traitement supplémentaire, car elles ne sont pas gérées automatiquement par votre bibliothèque de journalisation. |
| Isolation des pannes             | Dans de rares cas, des bugs de l'Agent Datadog peuvent affecter votre application.   | Les défauts de l'Agent Datadog sont isolés.                                                                                                                           |

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/google_cloud_run/containers/in_container
[2]: /fr/serverless/google_cloud_run/containers/sidecar
[3]: /fr/agentic_onboarding/setup