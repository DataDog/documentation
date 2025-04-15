
## Prérequis

<div class="alert alert-info"><strong>Activation en un seul clic</strong><br>
Si votre service est exécuté avec <a href="/agent/guide/how_rc_works/#activer-la-configuration-a-distance">un Agent disposant d'une configuration à distance et d'une version de la bibliothèque de tracing prenant en charge cette fonctionnalité</a>, passez votre curseur sur l'option <strong>Not Enabled</strong> dans la colonne ASM Status, puis cliquez sur <strong>Enable ASM</strong>. Il n'est pas nécessaire de relancer le service avec le flag <code>DD_APPSEC_ENABLED=true</code> ou le flag <code>--enable-appsec</code>.</div>

- L'[Agent Datadog][101] est installé et configuré pour le système d'exploitation ou le conteneur de votre application, le cloud ou l'environnement virtuel. 
- [L'APM Datadog][103] est configuré pour votre application ou service, et les traces sont reçues par Datadog. 
- Si votre service fonctionne avec [un Agent dont la configuration à distance est activée et une version de la bibliothèque de tracing qui le prend en charge][104], vous pouvez bloquer les auteurs d'attaques à partir de l'interface de Datadog sans configuration supplémentaire de l'Agent ni des bibliothèques de tracing.

[101]: https://app.datadoghq.com/account/settings#agent
[102]: https://app.datadoghq.com/services?lens=Security
[103]: /tracing/trace_collection/dd_libraries/
[104]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration