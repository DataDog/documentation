---

title: Diagnostics simplifiés grâce à la mise en corrélation entre produits
---

## Présentation

Le [tagging de service unifié][1] permet d'effectuer une mise en corrélation globale. Toutefois, pour résoudre un problème, il est parfois nécessaire de commencer par analyser un simple log, une trace précise, une certaine vue ou un test Synthetic. La mise en corrélation des logs, traces et vues avec d'autres données vous offre le contexte dont vous avez besoin pour identifier l'impact métier de votre problème et comprendre son origine en quelques clics.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/full-stack-cover.png" alt="Mise en corrélation de toute la pile" style="width:80%;" >}}

Ce guide présente les étapes à suivre pour mettre en corrélation les données de toute votre pile :

1. [Corréler des logs côté serveur avec des traces](#correler-des-logs-cote-serveur-avec-des-traces)
   * [Corréler des logs d'application](#correler-des-logs-d-application)
   * [Corréler des logs de proxy](#correler-des-logs-de-proxy)
   * [Corréler des logs de base de données](#correler-des-logs-de-base-de-donnees)
2. [Corréler des produits frontend](#correler-des-produits-frontend)
   * [Corréler des logs Browser avec RUM](#correler-des-logs-browser-avec-rum)
3. [Corréler des expériences utilisateur avec un comportement de serveur](#correler-des-experiences-utilisateur-avec-un-comportement-de-serveur)
   * [Corréler des vues RUM avec des traces](#correler-des-vues-rum-avec-des-traces)
   * [Tirer profit de la mise en corrélation des traces pour diagnostiquer des tests Synthetic](#tirer-profit-de-la-mise-en-correlation-des-traces-pour-diagnostiquer-des-tests-synthetic)

**Remarque** : selon vos besoins, vous pouvez ignorer certaines des étapes ci-dessous. Les étapes interdépendantes sont clairement identifiées.

## Corréler des logs côté serveur avec des traces

Lorsque vos utilisateurs rencontrent des erreurs ou souffrent d'une latence élevée dans votre application, il peut s'avérer utile de consulter certains logs d'une requête problématique afin d'identifier clairement l'origine de l'erreur. En visualisant tous les logs associés à une requête donnée, vous bénéficiez d'informations détaillées de bout en bout, ce qui accélère le diagnostic du problème.

La mise en corrélation de vos logs avec vos traces réduit la nécessité d'employer [des stratégies d'échantillonnage agressives, sans perdre la cohérence au niveau des entités][2], grâce à l'identifiant `trace_id`.

La [mise en corrélation des logs d'application](correler-des-logs-d-application) vous permet de bénéficier d'une visibilité complète sur toute votre pile. Toutefois, dans certaines situations, il est nécessaire d'étendre la corrélation à d'autres ressources de votre pile. Cliquez sur les liens ci-dessous pour accéder à la configuration de votre choix, selon vos besoins : 

* [Corréler des logs de proxy](#correler-des-logs-de-proxy)
* [Corréler des logs de base de données](#correler-des-logs-de-base-de-donnees)

### Corréler des logs d'application

#### Pourquoi ?

Les logs d'application contextualisent le plus la plupart des erreurs liées au code et à la logique métier. Ils peuvent même vous aider à résoudre des problèmes concernant d'autres services. Par exemple, la plupart des ORM enregistre des erreurs de base de données.

#### Comment ?

Tirez parti de l'une des nombreuses [solutions de corrélation clé en main][3]. Si vous utilisez un traceur personnalisé, ou si vous rencontrez un problème, consultez la [FAQ sur la mise en corrélation][4].

### Corréler des logs de proxy

#### Pourquoi ?

Les logs de proxy contiennent davantage d'informations que les logs d'application. En effet, ils englobent un plus grand nombre de points d'entrées et rassemblent des informations sur le contenu statique et les redirections.

#### Comment ?

Le traceur d'une application génère par défaut des ID de trace. Ce comportement peut être modifié en injectant `x-datadog-trace-id` dans les en-têtes de requêtes HTTP.

#### NGINX

##### Configurer OpenTracing

Suivez les instructions pour [intégrer le tracing NGINX][5].

##### Injecter l'ID des traces dans les logs

L'ID de trace est stocké dans la variable `opentracing_context_x_datadog_trace_id`. Pour modifier le format des logs NGINX, ajoutez le bloc de configuration suivant dans la section HTTP de votre fichier de configuration NGINX `/etc/nginx/nginx.conf` :

```conf
http {
  log_format main '$remote_addr - $opentracing_context_x_datadog_trace_id $http_x_forwarded_user [$time_local] "$request" '
          '$status $body_bytes_sent "$http_referer" '
          '"$http_user_agent" "$http_x_forwarded_for" ';

  access_log /var/log/nginx/access.log;
}
```

##### Parser l'ID des traces dans les pipelines

1. Dupliquez le pipeline NGINX.

2. Personnalisez le premier [parser grok][6] :
   - Dans **Parsing rules**, remplacez la première règle de parsing par :
   ```text
   access.common %{_client_ip} %{_ident} %{_trace_id} %{_auth} \[%{_date_access}\] "(?>%{_method} |)%{_url}(?> %{_version}|)" %{_status_code} (?>%{_bytes_written}|-)
   ```
   - Dans **Advanced settings**, sous **Helper Ruler**, ajoutez la ligne suivante :
   ```text
   _trace_id %{notSpace:dd.trace_id:nullIf("-")}
   ```

3. Ajoutez un [remapper d'ID de trace][7] sur l'attribut `dd.trace_id`.

### Corréler des logs de base de données

#### Pourquoi ?

Les logs de base de données sont plus difficiles à contextualiser, en raison des similarités entre les requêtes, de l'anonymisation des variables et de leur forte utilisation.

Par exemple, les requêtes lentes en production peuvent difficilement être reproduites et analysées : cela nécessiterait beaucoup de temps et de ressources. Vous trouverez ci-dessous un exemple de corrélation d'une analyse de requête lente avec des traces.

#### Comment ?

#### PostgreSQL

##### Enrichir vos logs de base de données

Par défaut, les logs PostgreSQL ne sont pas détaillés. Suivez les instructions de [ce guide][8] pour les enrichir.

Pour gérer au mieux les requêtes lentes, il est conseillé de journaliser automatiquement les plans d'exécution des déclarations lentes, afin de ne pas avoir à exécuter manuellement `EXPLAIN`. Pour exécuter `EXPLAIN` automatiquement, modifiez le fichier `/etc/postgresql/<VERSION>/main/postgresql.conf` en indiquant ce qui suit :

```conf
session_preload_libraries = 'auto_explain'
auto_explain.log_min_duration = '500ms'
```

Les requêtes de plus de 500 ms enregistrent leur plan d'exécution.

**Remarque** : `auto_explain.log_analyze = 'true'` fournit encore plus d'informations, mais réduit considérablement les performances. Pour en savoir plus, consultez la [documentation officielle][9] (en anglais).

##### Injecter trace_id dans vos logs de base de données

Vous pouvez injecter `trace_id` dans la plupart de vos logs de base de données avec des [commentaires SQL][10]. Voici un exemple avec Flask et SQLAlchemy :

```python
if os.environ.get('DD_LOGS_INJECTION') == 'true':
    from ddtrace import tracer
    from sqlalchemy.engine import Engine
    from sqlalchemy import event

    @event.listens_for(Engine, "before_cursor_execute", retval=True)
    def comment_sql_calls(conn, cursor, statement, parameters, context, executemany):
        trace_ctx = tracer.get_log_correlation_context()
        statement = f"{statement} -- dd.trace_id=<{trace_ctx['trace_id']}>"
        return statement, parameters
```

**Remarque** : cet exemple met uniquement en corrélation les logs qui comprennent une instruction de requête. Les logs d'erreur tels que `ERROR:  duplicate key value violates unique constraint "<CLÉ_TABLEAU>"` ne sont pas contextualisés. Dans la majorité des cas, vous pouvez tout de même obtenir des informations sur l'erreur dans vos logs d'application.

Dupliquez et personnalisez le pipeline PostgreSQL :

1. Ajoutez un nouveau [parser grok][6] :
   ```text
   extract_trace %{data}\s+--\s+dd.trace_id=<%{notSpace:dd.trace_id}>\s+%{data}
   ```

2. Ajoutez un [remapper d'ID de trace][7] sur l'attribut `dd.trace_id`.

Voici un exemple de plan d'exécution de requête lente provenant d'une trace lente :

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/slow-query-root-cause.png" alt="Corrélation des logs de requête lente" style="width:80%;" >}}

## Corréler des produits frontend

### Corréler des logs Browser avec RUM

#### Pourquoi ?

Les [logs Browser][11] au sein d'un événement RUM fournissent plus de contexte et de renseignements sur un problème. Dans l'exemple ci-dessous, les logs Browser indiquent qu'un ID utilisateur non valide est à l'origine de la requête problématique.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/browser-logs-in-rum.png" alt="Logs Browser dans une action RUM" style="width:80%;" >}}

La mise en corrélation de vos logs Browser avec la solution RUM réduit la nécessité d'employer [des stratégies d'échantillonnage agressives, sans perdre la cohérence au niveau des entités][2], grâce à des attributs comme `session_id` et `view.id`.

#### Comment ?

Les logs Browser et les événements RUM sont automatiquement mis en corrélation, tel qu'expliqué dans la [FAQ sur la facturation RUM][12]. Pour bénéficier de cette corrélation, les [configurations des SDK de la solution RUM et des logs doivent être similaires][13].

## Corréler des expériences utilisateur avec un comportement de serveur

Habituellement, la surveillance du frontend et celle du backend se font de façon indépendante, avec des workflow distincts, afin de pouvoir diagnostiquer les problèmes dans toute la pile. Grâce à ses corrélations dans toute la pile, Datadog vous permet d'identifier l'origine de vos problèmes (une erreur liée au navigateur, une défaillance de la base de données, etc.) et d'estimer l'impact pour les utilisateurs.

Cette section vous présente les étapes à suivre pour activer ce type de corrélation :

* [Corréler des vues RUM avec des traces](#correler-des-vues-rum-avec-des-traces)
* [Tirer profit de la mise en corrélation des traces pour diagnostiquer des tests Synthetic](#tirer-profit-de-la-mise-en-correlation-des-traces-pour-diagnostiquer-des-tests-synthetic)

### Corréler des vues RUM avec des traces

#### Pourquoi ?

Les solutions APM et RUM vous permettent conjointement de visualiser toutes vos données frontend et backend sous un seul angle.

Tirez profit des corrélations RUM pour :

* Identifier rapidement vos problèmes, peu importe leur origine, dans votre pile, même pour le frontend
* Comprendre réellement les expériences de vos utilisateurs

#### Comment ?

Suivez les instructions de la section [Associer RUM à vos traces][14]. Les informations sur les vues RUM figurent dans la [vue Trace][15], tandis que les informations sur les traces se trouvent dans la [vue Session][16].

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/trace-details-rum.png" alt="Informations RUM dans une trace" style="width:80%;" >}}

**Remarque** : il n'y a aucune corrélation directe entre les vues RUM et les logs de serveur. Vous pouvez néanmoins visualiser un événement RUM depuis des logs, et inversement, en étudiant les aperçus des traces.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/rum-action-server-logs.png" alt="Logs dans un aperçu de trace d'une action RUM" style="width:80%;" >}}

### Tirer profit de la mise en corrélation des traces pour diagnostiquer des tests Synthetic

#### Pourquoi ?

L'intégration de l'APM avec la surveillance Synthetic vous permet d'identifier la cause de l'échec d'un test en visualisant les traces générées par ce test.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/synthetic-trace-root-cause.png" alt="Origine d'un échec de test Synthetic" style="width:80%;" >}}

En accédant à des données réseau (grâce à votre test), à des informations sur le backend, l'infrastructure et les logs (grâce à votre trace), ainsi qu'à des événements RUM (pour les [tests Browser][17] uniquement), vous avez la possibilité d'analyser en détail le comportement de votre application, tel que constaté par vos utilisateurs.

#### Comment ?

Pour tirer profit de cette fonctionnalité, suivez les instructions de la documentation relative à l'[activation de l'intégration de l'APM dans les réglages Synthetic][18].


[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: /fr/logs/indexes/#sampling-consistently-with-higher-level-entities
[3]: /fr/tracing/connect_logs_and_traces
[4]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
[5]: /fr/tracing/setup_overview/proxy_setup/?tab=nginx
[6]: /fr/logs/log_configuration/processors/#grok-parser
[7]: /fr/logs/log_configuration/processors/#trace-remapper
[8]: /fr/integrations/postgres/?tab=host#log-collection
[9]: https://www.postgresql.org/docs/13/auto-explain.html
[10]: https://www.postgresql.org/docs/13/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
[11]: /fr/logs/log_collection/javascript/
[12]: /fr/account_management/billing/rum/#can-i-view-logs-from-the-browser-collector-in-rum
[13]: /fr/real_user_monitoring/browser/#initialization-parameters
[14]: /fr/real_user_monitoring/connect_rum_and_traces
[15]: https://app.datadoghq.com/apm/traces
[16]: https://app.datadoghq.com/rum/explorer
[17]: /fr/synthetics/browser_tests/
[18]: /fr/synthetics/apm