---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentation
  text: Fonctionnement de la protection des applications et des API
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
- link: /security/application_security/threats/
  tag: Documentation
  text: App and API protection
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: Datadog Security propose davantage de fonctionnalités de conformité et de
    protection contre les menaces pour Google Cloud
title: Activation de la protection des applications et des API pour les fonctions
  Google Cloud Run en Ruby
---
<div class="alert alert-info">La prise en charge d'AAP pour Google Cloud Run est en version préliminaire.</a></div>

## Fonctionnement {#how-it-works}

L'application `serverless-init` encapsule votre processus et l'exécute en tant que sous-processus. Il démarre un DogStatsD listener pour les métriques et un Trace Agent listener pour les traces. Il collecte les logs en encapsulant les flux stdout/stderr de votre application. Après l'amorçage, `serverless-init` lance ensuite votre commande en tant que sous-processus.

Pour obtenir une instrumentation complète, assurez-vous d'appeler `datadog-init` comme première commande exécutée dans votre conteneur Docker. Vous pouvez le faire en le définissant comme point d'entrée, ou en le définissant comme premier argument dans CMD.

## Compatibilité {#compatibility}

<div class="alert alert-info">La prise en charge de Google Cloud Run pour la protection sans serveur des applications et des API est en version préliminaire.</div>

**Remarque** : la protection contre les menaces via Remote Configuration n'est pas prise en charge. Utilisez [Workflows][5] pour bloquer les adresses IP dans votre [WAF][6].

## Démarrez {#get-started}

[Installez manuellement][1] le traceur Ruby avant de déployer votre application. Consultez l'[exemple d'application][2].

Ajoutez les instructions et arguments suivants à votre fichier Docker.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

### Explication {#explanation}

1. Copiez le Datadog `serverless-init` dans votre image Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (Facultatif) ajoutez des tags Datadog
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_APPSEC_ENABLED=1
   ENV DD_VERSION=1
   ```

3. Cette variable d'environnement est nécessaire pour que la propagation des traces fonctionne correctement dans Cloud Run. Assurez-vous de définir cette variable pour tous les services en aval instrumentés par Datadog.
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Modifiez le point d'entrée pour encapsuler votre application dans le processus Datadog `serverless-init`.
   **Remarque** : si vous avez déjà défini un point d'entrée dans votre Dockerfile, consultez la [configuration alternative](#alt-ruby).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Exécutez votre application binaire encapsulée dans le point d'entrée. Adaptez cette ligne à vos besoins.
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
### Configuration alternative {#alt-ruby}
Si vous avez déjà défini un point d'entrée dans votre fichier Docker, vous pouvez choisir de modifier lʼargument CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

Si vous avez également besoin que votre point d'entrée soit instrumenté, vous pouvez inverser votre point d'entrée et vos arguments CMD. Pour plus d'informations, consultez [Comment fonctionne `serverless-init`](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

Tant que votre commande à exécuter est transmise en tant qu'argument à `datadog-init`, vous bénéficierez d'une instrumentation complète.

[1]: /fr/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /fr/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /fr/security/application_security/serverless/compatibility
[5]: /fr/actions/workflows/
[6]: /fr/security/application_security/waf-integration/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/