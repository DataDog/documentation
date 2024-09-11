---
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: Guides d'utilisation de la surveillance sans serveur
disable_toc: true

private: true
title: Guides d'utilisation de la surveillance sans serveur
---

## Guides généraux sur la surveillance sans serveur

{{< whatsnext desc="Meilleures pratiques pour la surveillance de vos applications sans serveur" >}}
    {{< nextlink href="/serverless/guide/connect_invoking_resources" >}}Bénéficier d'une visibilité accrue sur les ressources appelant des fonctions Lambda{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_warnings" >}}Avertissements de la surveillance sans serveur{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tagging" >}}Tagging de fonctions sans serveur{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/agent_configuration" >}}Configuration de l'Agent sans serveur{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/opentelemetry" >}}Surveillance sans serveur et OpenTelemetry{{< /nextlink >}}{{< /whatsnext >}}

## Effectuer l'installation avec le Forwarder Datadog

{{< whatsnext desc="Instructions d'installation pour les applications précédemment configurées pour être surveillées avec le Forwarder Datadog" >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_node" >}}Instrumenter des applications Node.js sans serveur avec le Forwarder Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_python" >}}Instrumenter des applications Python sans serveur avec le Forwarder Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_java" >}}Instrumenter des applications Java sans serveur avec le Forwarder Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_go" >}}Instrumenter des applications Go sans serveur avec le Forwarder Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_dotnet" >}}Instrumenter des applications .NET sans serveur avec le Forwarder Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/extension_motivation" >}}Choisir s'il est pertinent de migrer vers l'extension Lambda Datadog{{< /nextlink >}}
{{< /whatsnext >}}

## Dépanner votre installation

{{< whatsnext desc="Problèmes d'installation courants et conseils de dépannage" >}}
    {{< nextlink href="/serverless/troubleshooting" >}}Dépannage de la surveillance sans serveur{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tracing_and_webpack" >}}Tracing Lambda Node.js et compatibilité de Webpack{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_package_too_large" >}}Correction des erreurs de package sans serveur trop volumineux{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/handler_wrapper" >}}Incorporer la fonction Lambda du gestionnaire dans le code{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/layer_not_authorized" >}}Dépannage des erreurs relatives aux couches non autorisées{{< /nextlink >}}
{{< /whatsnext >}}