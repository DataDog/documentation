---
kind: guide
title: Fonctionnement d'Application Security Monitoring dans Datadog
---

## Présentation

La solution Application Security Monitoring (ASM) de Datadog vous permet de gagner en visibilité sur les attaques ciblant vos applications et cherchant à exploiter des vulnérabilités au niveau du code.

ASM enregistre des informations à propos de chaque requête HTTP (à savoir des « traces »). Cette solution se base sur les données précédemment recueillies par APM et signale les tentatives d'attaque en analysant les requêtes suspectes qui correspondent à des schémas d'attaque connus. Ces requêtes suspectes sont ensuite agrégées au sein de signaux de sécurité. Selon les réglages que vous avez définies pour ces signaux, vous pouvez recevoir des notifications sur Slack, par e-mail ou via PagerDuty.

Les pare-feu d'application Web standard sont généralement déployés dans le périmètre du réseau. Ils n'offrent donc aucune information de contexte sur le comportement des applications. Pour optimiser le fonctionnement d'ASM, la solution doit être intégrée à votre application, afin de pouvoir accéder à ses données. Tout comme les pare-feu d'application Web, ASM se base sur les schémas d'attaque connus. Cette solution fournit cependant des informations de contexte supplémentaires sur les applications, afin d'améliorer le rapport signal sur bruit et de réduire le nombre de faux positifs.

### Compatibilité

Pour intégrer la solution ASM à votre configuration Datadog, vous devez avoir activé APM et [envoyer des traces à Datadog][1]. ASM utilise les mêmes bibliothèques qu'APM : vous n'avez donc pas besoin de déployer et de gérer une nouvelle bibliothèque. La procédure à suivre pour activer ASM varie en fonction du langage de votre environnement d'exécution. Vérifiez si votre langage est pris en charge par ASM dans les [prérequis de la solution][2].

### Performances

La solution ASM Datadog repose sur des processus déjà inclus avec l'Agent et APM. Son utilisation a donc un impact négligeable sur les performances. Lorsqu'APM est activé, la bibliothèque Datadog génère des traces distribuées. ASM se base sur des schémas d'attaque connus pour signaler les activités de sécurité suspectes au sein de traces. Les traces distribuées mettent en corrélation les schémas d'attaque et le contexte d'exécution, ce qui permet de déclencher des signaux de sécurité en fonction des règles de détection définies.

{{< img src="security_platform/guide/How_Application_Security_Works_d1.png" alt="Schéma illustrant le fonctionnement de la bibliothèque du traceur Datadog au niveau du service de l'application. La bibliothèque envoie des traces au backend Datadog, qui identifie à son tour les signaux de sécurité exploitables et envoie une notification via l'application pertinente, par exemple PagerDuty, Jira ou Slack." >}}

### Confidentialité des données

Vous pouvez empêcher l'indexation de vos données sensibles de plusieurs façons, notamment en configurant des [outils de nettoyage statiques et personnalisés][3] et en utilisant des [filtres d'exclusion][4].


**Remarque** : la solution ASM Datadog n'obfusque pas automatiquement les données sensibles ou informations à caractère personnel. Si vous ne souhaitez pas les envoyer à Datadog, [configurez l'Agent Datadog ou le traceur pour assurer la sécurité des données][3].

Contactez l'assistance si vous avez besoin de supprimer des données sensibles qui ont déjà été indexées.

## Méthodes de détection des menaces

Les schémas utilisés par Datadog proviennent de plusieurs sources, notamment l'[ensemble de règles de base ModSecurity OWASP][5]. Ils permettent de détecter les menaces et vulnérabilités connues dans les requêtes HTTP. Lorsqu'une requête HTTP correspond à l'une des [règles de détection prêtes à l'emploi][6], Datadog génère un signal de sécurité.

Chaque fois que Datadog détecte des attaques sérieuses ciblant vos services de production, un signal de sécurité est automatiquement créé. Celui-ci vous permet d'obtenir de précieux renseignements sur les entités à l'origine de l'attaque et les services ciblés. Vous pouvez définir des règles de détection personnalisées avec des seuils, afin de déterminer les attaques pour lesquelles vous souhaitez recevoir une notification.

## Portée

La solution ASM Datadog attribue un type à chaque tentative d'attaque :

* **Unqualified attacks** : ce type d'attaque indique que des requêtes HTTP entrantes correspondent à des schémas d'attaque connus. Par exemple, le processus de mise en corrélation avec le contexte d'exécution fourni par une trace peut révéler qu'aucun lien n'existe avec la logique métier du service.
* **Contextualized attacks** : ces tentatives d'attaque envers un service sont mises en corrélation avec une logique métier correspondante. Il peut par exemple s'agir de schémas d'injection SQL sur un service exécutant des instructions SQL.
* **Vulnerability is triggered** : ASM a détecté qu'une vulnérabilité a été exploitée après comparaison avec des schémas d'attaque connus.

La solution ASM Datadog analyse plus de 100 schémas d'attaque afin de détecter [de nombreux types d'attaques][7], notamment les exploitations de vulnérabilités suivantes :

* Injections SQL
* Injections de code
* Injections de commandes
* Injections NoSQL
* Scripts intersites (XSS)
* Falsification de requête côté serveur (SSRF)

### Protection fournie par ASM contre la vulnérabilité Log4Shell

 La solution ASM Datadog identifie les charges utiles des attaques Log4Shell Log4j et renforce la visibilité sur les tentatives de chargement à distance de code malveillant par des applications vulnérables. Lorsque cette solution est utilisée conjointement avec le reste des fonctionnalités [Cloud SIEM][8], vous pouvez identifier et étudier les activités courantes qui se sont produites après l'exploitation d'une vulnérabilité, et corriger de façon proactive les services Web Java potentiellement vulnérables qui constituent un vecteur d'attaque.

[1]: /fr/tracing/setup_overview/
[2]: /fr/security_platform/application_security/getting_started/#prerequisites
[3]: /fr/tracing/setup_overview/configure_data_security/?tab=http
[4]: /fr/security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
[5]: https://owasp.org/www-project-modsecurity-core-rule-set/
[6]: /fr/security_platform/default_rules/#cat-application-security
[7]: https://app.datadoghq.com/security/appsec/event-rules
[8]: /fr/security_platform/cloud_siem/