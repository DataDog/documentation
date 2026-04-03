---
code_lang: python
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: Code source
  text: Code source
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Pypi
  text: Documentation relative à l'API
- link: /tracing/trace_collection/trace_context_propagation/python/
  tag: Documentation
  text: Propager le contexte de traces
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: tracing/
  tag: Documentation
  text: Utilisation avancée
title: Configurer la bibliothèque de tracing Python
type: multi-code-lang
---

Après avoir configuré la bibliothèque de tracing avec votre code ainsi que l'Agent de façon à recueillir des données APM, vous pouvez ajuster sa configuration selon vos besoins, notamment en configurant le [tagging de service unifié][1].

Lorsque vous utilisez **ddtrace-run**, les [variables d'environnement][2] suivantes sont disponibles :

`DD_TRACE_DEBUG`
: **Valeur par défaut** : `false`<br>
Active les logs de debugging dans le traceur.

`DD_PATCH_MODULES`
: Remplace les modules patchés pour l'exécution de cette application. Format à utiliser : `DD_PATCH_MODULES=module:patch,module:patch...`.

Il est conseillé d'utiliser `DD_ENV`, `DD_SERVICE` et `DD_VERSION` pour définir les paramètres `env`, `service` et `version` pour vos services. Consultez la documentation sur le [tagging de service unifié][1] pour en savoir plus sur la configuration de ces variables d'environnement.

`DD_ENV`
: Définit l'environnement d'une application, p. ex. `prod`, `pre-prod` ou `staging`. Découvrez [comment configurer votre environnement][3]. Disponible à partir de la version 0.38.

`DD_SERVICE`
: Le nom de service à utiliser pour cette application. La valeur est transmise lorsque vous configurez un middleware pour les intégrations de framework Web comme Pylons, Flask ou Django. Si vous n'utilisez pas d'intégration Web pour le tracing, il est conseillé de définir le nom de service dans le code ([par exemple, voir la documentation Django][4]). Disponible à partir de la version 0.38.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Valeur par défaut** : `tracecontext,Datadog`<br>
Styles de propagation à utiliser lors de l'injection des en-têtes de tracing. Par exemple, utilisez `DD_TRACE_PROPAGATION_STYLE_INJECT=Datadog,B3` pour injecter à la fois les en-têtes au format Datadog et B3.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Valeur par défaut** : valeur de `DD_TRACE_PROPAGATION_STYLE_INJECT` (`tracecontext,Datadog`)<br>
Styles de propagation à utiliser lors de l'extraction des en-têtes de tracing. Si vous indiquez plusieurs valeurs, la première correspondance d'en-tête est utilisée. Par exemple, `DD_TRACE_PROPAGATION_STYLE_EXTRACT=B3,Datadog` recherche en priorité les en-têtes `B3`, puis utilise les en-têtes `Datadog` si aucun en-tête B3 n'est disponible.

`DD_SERVICE_MAPPING`
: Permet de définir des mappages de nom de service afin de renommer des services dans les traces, par exemple : `postgres:postgresql,defaultdb:postgresql`. Disponible à partir de la version 0.47.

`DD_VERSION`
: Définit la version de votre application, p. ex. `1.2.3`, `6c44da20` ou `2020.02.13`. Disponible à partir de la version 0.38.

`DD_TRACE_SAMPLE_RATE`
: Active le contrôle du volume de traces.

`DD_TRACE_SAMPLING_RULES`
: **Valeur par défaut** : `[]`<br>
Un tableau JSON d'objets. Chaque objet doit comporter un `"sample_rate"`. Les champs `"name"` et `"service"` sont facultatifs. La valeur de `"sample_rate"` doit être comprise entre `0.0` et `1.0` (inclus). Pour déterminer le taux d'échantillonnage de la trace, les règles sont appliquées dans l'ordre configuré.

`DD_TRACE_RATE_LIMIT`
: Le nombre maximal de spans à échantillonner par processus Python et par seconde. Par défaut, sa valeur correspond à `100` lorsque `DD_TRACE_SAMPLE_RATE` est défini. Si ce n'est pas le cas, c'est l'Agent Datadog qui doit définir les limites de taux.

`DD_SPAN_SAMPLING_RULES`
: **Par défaut** : `[]`<br>
Un tableau JSON d'objets. Pour déterminer le taux d'échantillonnage de la span, les règles sont appliquées dans l'ordre configuré. La valeur de `sample_rate` doit être comprise entre 0.0 et 1.0 (inclus). Pour en savoir plus, consultez la section [Mécanismes d'ingestion][5].<br>
**Exemple** :<br>
  - Pour définir le taux d'échantillonnage de la span sur 50 % pour le service `my-service` et le nom d'opération `http.request`, avec jusqu'à 50 traces par seconde, utilisez la variable d'environnement suivante : `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`.


`DD_TAGS`
: La liste des tags par défaut à ajouter à chaque span et profil. Exemple : `layer:api,team:intake,key:value`. Disponible à partir de la version 0.38.

`DD_TRACE_HEADER_TAGS`
: **Valeur par défaut** : `null`<br>
Liste de noms d'en-tête séparés par des virgules qui sont ajoutés à la span racine en tant que tags. Exemple : `DD_TRACE_HEADER_TAGS="User-Agent:http.user_agent,Referer:http.referer,Content-Type:http.content_type,Etag:http.etag"`.

`DD_TRACE_ENABLED`
: **Valeur par défaut** : `true`<br>
Active l'instrumentation des frameworks web et des bibliothèques. Lorsqu'elle est définie sur `false`, le code de l'application ne génère aucune trace.

`DD_AGENT_HOST`
: **Valeur par défaut** : `localhost`<br>
Remplace l'adresse du host de l'Agent de trace utilisée par le traceur par défaut pour l'envoi des traces.

`DD_AGENT_PORT`
: **Valeur par défaut** : `8126`<br>
Définit le port sur lequel le traceur par défaut envoie les traces. Si la [configuration de l'Agent][13] définit `receiver_port` ou `DD_APM_RECEIVER_PORT` sur une valeur autre que le port `8126` par défaut, alors la valeur de `DD_AGENT_PORT` ou de `DD_TRACE_AGENT_URL` doit correspondre au port en question.

`DD_TRACE_AGENT_URL`
: L'URL de l'Agent de trace auquel le traceur transmet des données. Lorsque ce paramètre est défini, il est utilisé à la place du hostname et du port. Prend en charge les sockets de domaine Unix (UDS) grâce au paramètre `apm_config.receiver_socket` de votre fichier `datadog.yaml` ou à la variable d'environnement `DD_APM_RECEIVER_SOCKET`, définie sur l'Agent Datadog. Par exemple, `DD_TRACE_AGENT_URL=http://localhost:8126` pour une URL HTTP et `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket` pour UDS. Si la [configuration de l'Agent][13] définit `receiver_port` ou `DD_APM_RECEIVER_PORT` sur une valeur autre que le port `8126` par défaut, alors la valeur de `DD_AGENT_PORT` ou de `DD_TRACE_AGENT_URL` doit correspondre au port en question.

`DD_DOGSTATSD_URL`
: L'URL utilisée afin de se connecter à l'Agent Datadog pour les métriques DogStatsD. Si cette variable est définie, elle est utilisée à la place du hostname et du port. Prend en charge les sockets de domaine Unix (UDS) grâce au paramètre `dogstatsd_socket` de votre fichier `datadog.yaml` ou à la variable d'environnement `DD_DOGSTATSD_SOCKET`, définie sur l'Agent Datadog Par exemple, `DD_DOGSTATSD_URL=udp://localhost:8126` pour une URL HTTP et `DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket` pour UDS. Si la [configuration de l'Agent][13] définit `dogstatsd_port` ou `DD_DOGSTATSD_PORT` sur une valeur autre que le port `8125` par défaut, alors la valeur de `DD_DOGSTATSD_URL` ou de `DD_DOGSTATSD_PORT` pour cette bibliothèque de tracing doit correspondre au port en question.

`DD_DOGSTATSD_HOST`
: **Valeur par défaut** : `localhost`<br>
Remplace l'adresse du host de l'Agent de trace utilisée par le traceur par défaut pour l'envoi des métriques DogStatsD. Utiliser `DD_AGENT_HOST` pour remplacer `DD_DOGSTATSD_HOST`.

`DD_DOGSTATSD_PORT`
: **Valeur par défaut** : `8125`<br>
Définit le port sur lequel le traceur par défaut envoie les métriques DogStatsD. Si la [configuration de l'Agent][13] définit `dogstatsd_port` ou `DD_DOGSTATSD_PORT` sur une valeur autre que le port `8125` par défaut, alors la valeur de `DD_DOGSTATSD_PORT` ou de `DD_DOGSTATSD_URL` pour cette bibliothèque de tracing doit correspondre au port en question.

`DD_LOGS_INJECTION`
: **Valeur par défaut** : `false`<br>
Active la [mise en relation des logs et des traces injectées][6].



## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /fr/tracing/guide/setting_primary_tags_to_scope/
[4]: https://ddtrace.readthedocs.io/en/stable/integrations.html#django
[5]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[6]: /fr/tracing/other_telemetry/connect_logs_and_traces/python/
[13]: /fr/agent/configuration/network/#configure-ports