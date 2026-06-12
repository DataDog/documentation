---

title: Comprendre la différence entre le host de l'Agent et le host du traceur
---

## Présentation

Dans la solution APM de Datadog, le tag `host` permet de mettre en corrélation les spans et les traces avec les données de surveillance de votre infrastructure : les métriques de host sont donc associées aux hosts des spans et des traces.

## Hostname de l'Agent Datadog et hostname du traceur

Le **host de l'Agent** correspond au host sur lequel l'Agent Datadog est exécuté. Le **host du traceur** est le host sur lequel l'application instrumentée et la bibliothèque de tracing sont exécutées.

Selon la façon dont vous avez déployé l'Agent Datadog sur votre infrastructure, le host de l'Agent et le host du traceur peuvent être différents :


Lorsque l'Agent est déployé sur le même host que l'application (par exemple via un [DaemonSet][1]), le host de l'Agent et le host du traceur sont identiques.

{{< img src="/tracing/guide/agent_tracer_hostnames/agent_host.png" alt="Agent déployé sur le même host que l'application" style="width:80%;" >}}

Lorsque l'Agent est déployé sur un host distant, le host de l'Agent est différent du host du traceur.

{{< img src="/tracing/guide/agent_tracer_hostnames/remote_host.png" alt="Agent déployé sur un host distant autre que celui de l'application" style="width:80%;" >}}

### Dans quels cas les hosts du traceur et de l'Agent sont-ils définis sur les spans ?

- Le hostname de l'Agent Datadog est toujours défini sur les spans.
- Le hostname du traceur est défini sur les spans si `DD_TRACE_REPORT_HOSTNAME` est défini sur `true` (par défaut, ce paramètre est défini sur `false`).

 Langage | Configuration | Variable d'environnement
----------|--------|---------------------
Ruby | `tracing.report_hostname` | `DD_TRACE_REPORT_HOSTNAME`
C++ | `dd.trace.report-hostname` | `DD_TRACE_REPORT_HOSTNAME`
Node.js | `reportHostname` | `DD_TRACE_REPORT_HOSTNAME`
Go | - | `DD_TRACE_REPORT_HOSTNAME`
Python | - | `DD_TRACE_REPORT_HOSTNAME`
PHP | `datadog.trace.report_hostname` | `DD_TRACE_REPORT_HOSTNAME`
Java |  `dd.trace.report-hostname` | `DD_TRACE_REPORT_HOSTNAME`

### Quand les informations sur le host sont-elles utilisées par APM ?

APM utilise les informations sur le host lorsque vous créez des [filtres de rétention][2], générez des [métriques à partir de spans][3] ou créez des [règles dans le scanner de données sensibles][4] avec des filtres basés sur des tags de host dans des requêtes. Par exemple, les filtres basés sur des tags de host tels que `availability-zone` et `cluster-name` reçoivent les informations sur le host de l'Agent Datadog.






[1]: /fr/containers/kubernetes/apm/?tab=daemonset
[2]: /fr/tracing/trace_pipeline/trace_retention
[3]: /fr/tracing/trace_pipeline/generate_metrics
[4]: /fr/sensitive_data_scanner/