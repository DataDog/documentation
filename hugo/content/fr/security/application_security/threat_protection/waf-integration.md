---
aliases:
- /fr/security/application_security/waf-integration/
- /fr/security/application_security/threats/waf-integration
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Surveiller les applications WAF AWS avec Datadog
title: Intégrations WAF
---
La protection des applications web et des API nécessite une approche multicouche combinant surveillance intégrée à l'application et défenses périmétriques. Ces stratégies complémentaires vous permettent d'avoir une approche de *défense en profondeur* pour la protection des applications et des API, qui tire parti d'AWS Web Application Firewall (WAF) comme première ligne de défense, suivie de la prévention des exploits pour bloquer les attaques qui passent outre le WAF.

Pour plus de détails sur la manière dont Exploit Prevention diffère d'In-App WAF, consultez [Exploit Prevention vs. In-App WAF][5].

### Surveillance intégrée à l'application : visibilité approfondie avec traçage distribué {#in-app-monitoring-deep-visibility-with-distributed-tracing}

Au niveau de l'application, Datadog AAP tire parti du traçage distribué pour surveiller les microservices en temps réel. L'approche AAP fournit des informations détaillées et riches en contexte sur le comportement des requêtes à mesure qu'elles traversent divers services. Ces informations permettent de détecter des menaces sophistiquées telles que :

- Tentatives d'injection SQL (SQLi) et d'inclusion de fichiers locaux (LFI).
- Abus de logique applicative, comme le contournement de règles métier ou l'exploitation de cas limites.
- Utilisation abusive d'endpoints exposés.

### Défense périmétrique : blocage des menaces à la périphérie avec AWS WAF {#perimeter-defense-blocking-threats-at-the-edge-with-aws-waf}

Au niveau du périmètre, AWS Web Application Firewall (WAF) agit comme première ligne de défense, filtrant le trafic avant qu'il n'atteigne l'application. Ces solutions sont essentielles pour bloquer :

- Attaques de botnets à grande échelle ou attaques par déni de service distribué (DDoS).
- Bots malveillants tentant du credential stuffing ou du scraping.

### L'importance d'une protection contextuelle et adaptative {#the-importance-of-contextual-adaptive-protection}

Selon la nature de la menace, les contrôles de protection doivent être appliqués à la couche appropriée : soit dans l'application, soit au niveau du périmètre. Exemple :

- Cas d'utilisation de la protection périmétrique : blocage d'IP malveillantes ou d'attaques volumétriques pouvant être atténuées efficacement à la périphérie du réseau.
- Cas d'utilisation de la protection intégrée à l'application : détection et blocage d'exploits de vulnérabilités, d'abus de logique métier ou d'anomalies subtiles dans l'utilisation des API.

Cette approche multicouche garantit que les menaces sont neutralisées le plus tôt possible sans sacrifier la précision nécessaire pour protéger le trafic légitime.


## Intégration d'AWS WAF avec AAP {#aws-waf-integration-with-aap}

Pour des instructions de configuration détaillées, consultez [Activation de la protection des applications et des API pour AWS WAF][6].

Il existe deux cas d'utilisation principaux pris en charge par cette [intégration][1] :

1. Obtenez une visibilité sur les actions AWS WAF dans Datadog AAP. Exemple :
   1. Métriques telles que le nombre total de requêtes autorisées par rapport à celles bloquées par AWS WAF.
   2. Approfondissez et visualisez les logs AWS WAF individuels (nécessite que vous [ingériez les logs AWS WAF dans Datadog][2]).
   3. Comment AWS WAF a inspecté la requête : règles appliquées et décision prise (autoriser, bloquer ou compter).

   <div class="alert alert-info">AAP convertit les logs AWS WAF en traces AAP, vous permettant de visualiser l'activité des applications (traces) et l'activité AWS WAF (logs convertis en traces AAP) dans l'AAP Trace Explorer.</div>

   <!-- {{< img src="security/application_security/threats/aws-waf-int-asm.png" alt="Détails de l'intégration AWS WAF dans l'interface utilisateur Datadog" style="width:100%;" >}} -->

2. Tirez parti d'AWS WAF pour bloquer les attaquants :
   1. Connectez vos ensembles d'adresses IP AWS WAF avec Datadog AAP. Vous pouvez utiliser un ensemble existant ou en créer un nouveau. Datadog ajoutera les adresses IP bloquées à cet ensemble d'adresses IP. Vous pouvez bloquer les attaquants depuis les Explorers de [Signaux][3] ou de [Traces][4] d'AAP.

   <!-- {{< img src="/security/application_security/threats/aws-waf-blocked-ips.png" alt="Liste de refus AAP des adresses IP bloquées" style="width:100%;" >}} -->

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/protection?use-case=amazon_waf
[2]: /fr/integrations/amazon_waf/#log-collection
[3]: https://app.datadoghq.com/security/appsec/signals?query=@workflow.rule.type:%22Application%20Security%22
[4]: https://app.datadoghq.com/security/appsec/traces
[5]: /fr/security/application_security/#exploit-prevention-vs-in-app-waf
[6]: /fr/security/application_security/setup/aws/waf/