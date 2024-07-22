---
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-opentracing-cpp
  tag: Github
  text: Code source
- link: /tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: /tracing/trace_collection/trace_context_propagation/cpp/
  tag: Documentation
  text: Propager le contexte de traces
title: Configurer la bibliothèque de traçage C++
type: multi-code-lang
---

Après avoir configuré la bibliothèque de tracing avec votre code ainsi que l'Agent de façon à recueillir des données APM, vous pouvez ajuster sa configuration selon vos besoins, notamment en configurant le [tagging de service unifié][1].

Il est conseillé d'utiliser `DD_SERVICE`, `DD_ENV` et `DD_VERSION` pour définir les paramètres `env`, `service` et `version` pour vos services. Consultez la documentation sur le [tagging de service unifié][1] pour en savoir plus sur les valeurs à configurer pour les variables d'environnement.

## Variables d'environnement
Pour configurer le traceur à l'aide de variables d'environnement, définissez-les avant le lancement de l'application instrumentée.

`DD_SERVICE` 
: **Depuis** : v0.1.0 <br>
Définit le nom de service.

`DD_ENV`
: **Depuis** : v0.1.0 <br>
**Exemple** : `prod`, `pre-prod` ou `staging` <br> 
Ajoute le tag `env` avec la valeur spécifiée à toutes les spans générées.

`DD_VERSION` 
: **Depuis** : v0.1.0 <br>
**Exemple** : `1.2.3`, `6c44da20`, `2020.02.13` <br>
Définit la version du service.

`DD_TAGS` 
: **Depuis** : v0.1.0 <br>
**Exemple** : `team:intake,layer:api,foo:bar` <br>
Un liste séparée par des virgules de paires `key:value` à ajouter à toutes les spans générées.

`DD_AGENT_HOST` 
: **Depuis** : v0.1.0 <br>
**Valeur par défaut** : `localhost` <br>
Définit le host vers lequel les traces sont envoyées (le host qui exécute l'Agent). Il peut s'agir d'un hostname ou d'une adresse IP. Ce paramètre est ignoré si `DD_TRACE_AGENT_URL` est défini.

`DD_TRACE_AGENT_PORT` 
: **Depuis** : v0.1.0 <br>
**Valeur par défaut** : `8126` <br>
Définit le port sur lequel les traces sont envoyées (le port sur lequel lʼAgent détecte les connexions). Ignoré si `DD_TRACE_AGENT_URL` est défini. Si la [configuration de lʼAgent][3] définit `receiver_port` ou `DD_APM_RECEIVER_PORT` sur une valeur autre que la valeur par défaut `8126`, alors `DD_TRACE_AGENT_PORT` ou `DD_TRACE_AGENT_URL` doit correspondre à cette valeur.

`DD_TRACE_AGENT_URL` 
: **Depuis** : v0.1.0 <br>
**Valeur par défaut** : `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>` si définis, ou `http://localhost:8126`.
**Exemples** : <br>
URL HTTP : `http://localhost:8126` <br>
Socket de domaine Unix : `unix:///var/run/datadog/apm.socket` <br><br>
Définit lʼendpoint de l'URL où les traces sont envoyées. Remplace `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` si défini. Cette URL prend en charge les schémas d'adresses HTTP, HTTPS et Unix. <br>
Si la [configuration de lʼAgent ][3] définit `receiver_port` ou `DD_APM_RECEIVER_PORT` sur une valeur autre que la valeur par défaut `8126`, alors `DD_TRACE_AGENT_PORT` ou `DD_TRACE_AGENT_URL` doit correspondre à cette valeur.

`DD_TRACE_RATE_LIMIT`
: **Depuis** : 0.1.0 <br>
**Valeur par défaut** : `200` <br>
Nombre maximum dʼenvoi de traces autorisé par seconde.

`DD_TRACE_SAMPLE_RATE`
: **Depuis** : 0.1.0 <br>
**Valeur par défaut** : Le taux par défaut de lʼAgent Datadog ou `1.0`. <br>
Définit le taux d'échantillonnage pour toutes les traces générées. La valeur doit être comprise entre `0.0` et `1.0` (inclus). Par défaut, le taux d'échantillonnage est délégué à lʼAgent Datadog. Si aucun taux d'échantillonnage n'est défini par lʼAgent Datadog, la valeur par défaut est `1.0`.

`DD_TRACE_SAMPLING_RULES` 
: **Depuis** : v0.1.0 <br>
**Valeur par défaut** : `null` <br>
**Exemples :**<br>
Définir le taux d'échantillonnage sur 20 % : `[{"sample_rate": 0.2}]` <br>
Définir le taux d'échantillonnage de spans sur 50 % pour le service `my-service` et le nom de l'opération `http.request`, jusqu'à 50 traces par seconde : `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'` <br><br>
Un tableau d'objets JSON. Chaque objet doit avoir un `sample_rate`, et les champs `name` et `service` sont facultatif. La valeur de `sample_rate` doit être comprise entre 0.0 et 1.0 (inclus). Les règles sont appliquées dans un ordre configuré pour déterminer la fréquence d'échantillonnage de la trace. <br>
Pour en savoir plus, consultez la section [Mécanismes d'ingestion][2].<br>

`DD_SPAN_SAMPLING_RULES`
: **Version** : v0.1.0 <br>
**Valeur par défaut** : `null`<br>
Un tableau d'objets JSON. Les règles sont appliquées dans un ordre configuré pour déterminer la fréquence d'échantillonnage de la span. La valeur de `sample_rate` doit être comprise entre `0.0` et `1.0` (inclus).

`DD_SPAN_SAMPLING_RULES_FILE`
: **Depuis** : 0.1.0 <br>
Dirige vers un fichier JSON qui contient les règles d'échantillonnage de la span. Consultez `DD_SPAN_SAMPLING_RULES` pour obtenir le format des règles.

`DD_PROPAGATION_STYLE`
: **Depuis** : 0.1.0 <br>
Liste séparée par des virgules des styles de propagation à utiliser lors de l'extraction et de l'injection du contexte de tracing. <br>
Lorsque plusieurs valeurs sont données, l'ordre de la correspondance est basé sur l'ordre des valeurs.

`DD_TRACE_PROPAGATION_STYLE_INJECT` 
: **Depuis** : v0.1.6 <br>
**Valeur par défaut** : `datadog,tracecontext` <br>
**Valeurs acceptées** : `datadog`, `tracecontext`, `b3` <br>
Liste séparée par des virgules des styles de propagation à utiliser lors de l'injection du contexte de tracing.
Lorsque plusieurs valeurs sont données, l'ordre de la correspondance est basé sur l'ordre des valeurs.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT` 
: **Depuis** : v0.1.6 <br>
**Valeur par défaut** : `datadog,tracecontext` <br>
**Valeurs acceptées** : `datadog`, `tracecontext`, `b3` <br>
Liste séparée par des virgules des styles de propagation à utiliser lors de l'extraction du contexte de tracing. 
Lorsque plusieurs valeurs sont données, l'ordre de la correspondance est basé sur l'ordre des valeurs.

`DD_TRACE_ENABLED`
: **Depuis** : 0.1.0 <br>
**Valeur par défaut** : `true` <br>
Envoyer ou non des traces à lʼAgent Datadog. <br>
Lorsque la valeur est `false`, la bibliothèque cesse d'envoyer des traces à lʼAgent Datadog. Cependant, la bibliothèque continue à générer des traces, à transmettre des données télémétriques et à rechercher des mises à jour de la configuration à distance.

`DD_TRACE_REPORT_HOSTNAME`
: **Depuis** : 0.1.0 <br>
**Valeur par défaut** : `false` <br>
Ajoute le tag `hostname` avec le résultat de `gethostname`.

`DD_TRACE_STARTUP_LOGS`
: **Depuis** : 0.1.0 <br>
**Valeur par défaut** : `true` <br>
Enregistrez la configuration du traceur une fois quʼil est entièrement initialisé. <br>

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **Depuis** : 0.1.6 <br>
**Valeur par défaut** : `true` <br>
Si la valeur est `true`, le traceur génère des ID de trace de 128 bits. <br>
Si la valeur est `false`, le traceur génère des ID de trace historiques de 64 bit.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **Depuis** : 0.1.12 <br>
**Valeur par défaut** : `true` <br>
Datadog peut collecter des [informations environnementales et de diagnostics sur votre système][4] afin d'améliorer le produit. Lorsque la valeur est `false`, les données de télémétrie ne sont pas collectées.

`DD_REMOTE_CONFIGURATION_ENABLED`
: **Depuis** : 0.2.0 <br>
**Valeur par défaut** : `true` <br>
Active la capacité qui permet de configurer et de modifier à distance le comportement du traceur. <br>
Lorsque la valeur est `false`, cette fonction est désactivée. <br>
Pour obtenir plus d'informations, consultez la section [Configuration à distance][5].

`DD_REMOTE_CONFIG_POLL_INTERVAL_SECONDS`
: **Depuis** : 0.2.0 <br>
**Valeur par défaut** : `5` <br>
Définit la fréquence, en secondes, à laquelle lʼAgent Datadog est interrogé sur les mises à jour de la configuration à distance.

`DD_TRACE_DELEGATE_SAMPLING`
: **Version** : 0.2.0 <br>
**Valeur par défaut** : `false` <br>
Si la valeur est `true`, délègue la décision d'échantillonnage de trace à un service enfant et favorise la décision résultante à la sienne, le cas échéant.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging/
[2]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /fr/agent/configuration/network/#configure-ports
[4]: /fr/tracing/configure_data_security#telemetry-collection
[5]: /fr/agent/remote_config