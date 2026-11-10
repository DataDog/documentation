---
code_lang: azure_apim
code_lang_weight: 70
further_reading:
- link: /integrations/guide/azure-integrations/
  tag: Documentation
  text: Intégrations Azure
- link: /tracing/guide/ignoring_apm_resources/
  tag: Documentation
  text: Ignorer les ressources non désirées dans APM
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentation
  text: Propagation du contexte de traces
- link: https://www.datadoghq.com/blog/trace-azure-managed-services-dotnet/
  tag: Blog
  text: Tracez les services gérés par Azure dans les applications .NET avec Datadog
title: Instrumentation d'Azure API Management
type: multi-code-lang
---
Datadog APM peut créer des **spans déduits** pour les requêtes qui transitent par Azure API Management vers vos services backend. Ces spans permettent d'obtenir des traces de bout en bout, des cartes de services et un échantillonnage basé sur la passerelle API Management.

Les spans déduits pour Azure API Management sont pris en charge uniquement pour **.NET**, **JavaScript** (Node.js), **Python** et **Java**. Les autres runtimes (par exemple Go ou PHP) n'émettent pas de spans déduits pour Azure API Management, même s'ils prennent en charge les spans déduits pour d'autres passerelles.

## Prérequis {#prerequisites}

- `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true` est défini dans les paramètres de votre application.
- Votre backend utilise un **runtime pris en charge**, une **version minimale du traceur** et un **framework web** figurant dans le tableau ci-dessous.

### Runtimes et frameworks web pris en charge {#supported-runtimes-and-web-frameworks}

| Runtime | Traceur Datadog | Version minimale du traceur | Frameworks |
| ------- | -------------- | ---------------------- | ---------- |
| Node.js | `dd-trace-js` | v5.87.0+ | express, fastify, hapi, koa, microgateway-core, next, paperplane, restify, router, apollo |
| Python | `dd-trace-py` | v4.6.0+ | aiohttp, asgi, bottle, cherrypy, django, djangorestframework, falcon, fastapi, flask, molten, pyramid, sanic, starlette, tornado, wsgi |
| .NET | `dd-trace-dotnet` | v3.39.0+ | ASP.NET, ASP.NET Core |
| Java | `dd-trace-java` | v1.64.0 | Servlet, Spring Web MVC, Spring WebFlux, Netty, Jetty, Tomcat, Undertow, Vert.x Web, Akka HTTP, Play, Ratpack, Grizzly, Liberty, Restlet, Synapse, Spray, Apache CXF, Axway API Gateway, Azure Functions |

## Configuration {#setup}

Pour créer des spans déduits, Azure API Management doit transmettre les en-têtes suivants à vos services backend :

| En-tête | Valeur |
| ------ | ----- |
| `x-dd-proxy` | `azure-apim` |
| `x-dd-proxy-request-time-ms` | Horodatage de la requête en millisecondes Unix |
| `x-dd-proxy-httpmethod` | Méthode HTTP (par exemple, depuis `context.Operation.Method`) |
| `x-dd-proxy-path` | Modèle d'URL (par exemple, depuis `context.Operation.UrlTemplate`) |
| `x-dd-proxy-region` | Région de déploiement (par exemple, depuis `context.Deployment.Region`) |
| `x-dd-proxy-domain-name` | Host de la requête (par exemple, depuis `context.Request.OriginalUrl.Host`) |

### Stratégie entrante {#inbound-policy}

Ajoutez la stratégie suivante à la section {{< ui >}}inbound{{< /ui >}} de votre API dans Azure API Management afin que ces en-têtes soient définis sur les requêtes vers votre backend :

```xml
<set-header name="x-dd-proxy" exists-action="override">
    <value>azure-apim</value>
</set-header>
<set-header name="x-dd-proxy-request-time-ms" exists-action="override">
    <value>@(new DateTimeOffset(context.Timestamp).ToUnixTimeMilliseconds().ToString())</value>
</set-header>
<set-header name="x-dd-proxy-httpmethod" exists-action="override">
    <value>@(context.Operation.Method)</value>
</set-header>
<set-header name="x-dd-proxy-path" exists-action="override">
    <value>@(context.Operation.UrlTemplate)</value>
</set-header>
<set-header name="x-dd-proxy-region" exists-action="override">
    <value>@(context.Deployment.Region)</value>
</set-header>
<set-header name="x-dd-proxy-domain-name" exists-action="override">
    <value>@(context.Request.OriginalUrl.Host)</value>
</set-header>
```

Vous pouvez ajouter cette stratégie au niveau de l'API dans le portail Azure sous {{< ui >}}API Management{{< /ui >}} > votre API > {{< ui >}}Design{{< /ui >}} → {{< ui >}}Inbound processing{{< /ui >}} → {{< ui >}}Code view{{< /ui >}} (voir [Définir ou modifier des stratégies Azure API Management][4]), en utilisant l'API REST Azure API Management, ou des stratégies dans votre définition d'API.

## Mettre à jour les règles d'échantillonnage {#update-sampling-rules}

L'échantillonnage basé sur l'en-tête s'applique toujours lors de l'utilisation du suivi Azure API Management. Comme le span déduit devient la nouvelle racine de trace, mettez à jour vos règles afin que la valeur du service corresponde au nom du service API Management affiché dans Datadog.

Par exemple, si la règle d'échantillonnage d'origine est :

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"service":"my-backend","sample_rate":0.5}]'
{{< /code-block >}}

Mettez à jour la règle afin que la valeur `service` corresponde au nom de votre API API Management tel qu'il apparaît dans Datadog, ou supprimez la clé `service` pour appliquer la règle à tous les spans racines :

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"service":"my-azure-apim-api","sample_rate":0.5}]'
{{< /code-block >}}

Ou appliquez à tous les spans racines :

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"sample_rate":0.5}]'
{{< /code-block >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://learn.microsoft.com/en-us/azure/api-management/set-edit-policies