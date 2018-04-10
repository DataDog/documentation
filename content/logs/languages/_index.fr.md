---
title: Collecte de log depuis vos languages
kind: Documentation
description: Configurez votre Agent Datadog pour rassembler les logs de vos languages.
---

## Comment tirer le meilleur parti de vos logs

Lors du logging des stack traces, il existe des attributs spécifiques dotés d'une interface utilisateur dédiée dans votre application Datadog, tels que le nom du logger, le thread en cours, le type d'erreur et bien sûr la stack trace.

{{< img src="logs/languages/stack_trace.png" style="width:80%;" alt="Stack trace" responsive="true" popup="true" >}}

Pour activer ces fonctionnalités, utilisez les noms d'attribut suivants:

* `logger.name`: Nom du logger
* `logger.thread_name`: Nom du thread courrant
* `error.stack`: La stack trace
* `error.message`: Message d'erreur contenu dans la stack trace
* `error.kind`: Le type ou "kind" d'une erreur (i.e "Exception", "OSError", ...)

**Note**: Par défaut, [les pipelines d'intégration][1] tentent de remapper les paramètres par défaut de la bibliothèque de logging sur ces attributs spécifiques et analysent les traces ou traceback pour extraire automatiquement les erreurs `error.msg` et `error.kind`.

## Envoyez vos logs en JSON

Pour les frameworks d'intégration, nous fournissons des instructions sur la façon de logger en JSON dans un fichier. Les logs au format JSON permettent de mieux gérer les logs d'application multilignes et sont automatiquement analysés par Datadog.

{{< whatsnext desc="Select your framework in the list below:" >}}
    {{< nextlink href="/logs/languages/csharp" >}}Csharp{{< /nextlink >}}
    {{< nextlink href="/logs/languages/go" >}}Go{{< /nextlink >}}
    {{< nextlink href="/logs/languages/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/logs/languages/nodejs" >}}Nodejs{{< /nextlink >}}
    {{< nextlink href="/logs/languages/php" >}}PHP{{< /nextlink >}}
    {{< nextlink href="/logs/languages/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/logs/languages/ruby" >}}Ruby{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /logs/processing
