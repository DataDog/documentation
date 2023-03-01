---
aliases:
- /fr/security_platform/guide/how-appsec-works/
further_reading:
- link: /security_platform/application_security/setup_and_configure/#compatibilite
  tag: Documentation
  text: En savoir plus sur les langages et frameworks compatibles
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: GitHub
  text: Présentation de la solution Application Security Datadog
- link: /security_platform/application_security/getting_started/
  tag: Documentation
  text: Débuter avec Application Security Management
kind: documentation
title: Fonctionnement d'Application Security Management dans Datadog
---

## Présentation

La solution Application Security Management (ASM) de Datadog vous permet de gagner en visibilité sur les attaques ciblant vos applications et cherchant à exploiter des vulnérabilités au niveau du code, ainsi que sur les personnes malveillantes ciblant vos systèmes.

ASM enregistre des informations à propos de chaque requête d'application (à savoir des « traces »). Cette solution utilise la même bibliothèque qu'APM pour surveiller votre trafic et signale les tentatives d'attaque en analysant les requêtes suspectes qui correspondent à des schémas d'attaque connus. Chaque fois que Datadog détecte des attaques ciblant votre application et pouvant affecter vos services, un signal de sécurité est automatiquement créé. Comme les signaux identifient les menaces sérieuses, il vous suffit de les examiner au lieu d'évaluer chaque tentative d'attaque. Selon les réglages que vous avez définis pour ces signaux de sécurité, vous pouvez recevoir des notifications sur Slack, par e-mail ou via PagerDuty.

Les pare-feu d'application Web (WAF) traditionnels sont généralement déployés à la périphérie du réseau et n'offrent donc aucune information de contexte sur le comportement des applications. Pour optimiser le fonctionnement d'ASM, la solution doit être intégrée à votre application afin de pouvoir accéder à ses données. Tout comme les pare-feu d'application Web, ASM se base sur les schémas d'attaque connus. Cette solution tient toutefois compte du contexte autour de l'application afin de limiter les faux positifs et les alertes inutiles.

Pour identifier les personnes malveillantes, la solution ASM de Datadog recueille les adresses IP des clients et les tags ajoutés manuellement par les utilisateurs sur toutes les requêtes.

## Identifier les services exposés aux attaques ciblant les applications

La solution ASM de Datadog se base sur les informations déjà recueillies par APM pour identifier les traces correspondant à des tentatives d'attaque. Les services exposés aux attaques sont directement mis en évidence dans les pages de la section APM ([catalogue de services][1], [page Service][2] et [Traces][3]).

Étant donné qu'APM recueille un échantillon du trafic de votre application, vous devez activer ASM dans la bibliothèque de tracing pour surveiller et protéger efficacement vos services.

## Compatibilité

Pour intégrer la solution ASM à votre configuration Datadog, vous devez avoir activé APM et [envoyer des traces à Datadog][4]. ASM utilise les mêmes bibliothèques qu'APM : vous n'avez donc pas besoin de déployer et de gérer une nouvelle bibliothèque. La procédure à suivre pour activer ASM varie en fonction du langage de votre environnement d'exécution. Vérifiez si votre langage est pris en charge par ASM dans les [prérequis de la solution][5].

### Surveillance sans serveur

<div class="alert alert-info">La surveillance sans serveur des menaces est en version bêta privée. Remplissez <a href="https://docs.google.com/forms/d/e/1FAIpQLScB3uSccf9lSAh7GcA8NZ8SsmUGQ5mi09DnDgZmqXcbiYfMzA/viewform">ce formulaire</a> pour rejoindre la bêta.</div>

ASM prend en charge les fonctions déployées sur AWS Lambda. La détection s'effectue via l'[extension Lambda][6].

La solution offre un système complet de gestion des menaces sur vos fonctions Lambda : vous pouvez détecter les acteurs malveillants qui ciblent vos fonctions, retracer le chemin utilisé lors de l'attaque via une analyse approfondie du code, puis mettre en place des mesures de remédiation.


## Performance

La solution ASM Datadog repose sur des processus déjà inclus avec l'Agent et APM. Son utilisation a donc un impact négligeable sur les performances. Lorsqu'APM est activé, la bibliothèque Datadog génère des traces distribuées. ASM se base sur des schémas d'attaque connus pour signaler les activités de sécurité suspectes au sein de traces. Les traces distribuées mettent en corrélation les schémas d'attaque et le contexte d'exécution, ce qui permet de déclencher des signaux de sécurité en fonction des règles de détection définies.

{{< img src="security_platform/application_security/How_Application_Security_Works_d1.png" alt="Schéma illustrant le fonctionnement de la bibliothèque de tracing Datadog au niveau du service de l'application. La bibliothèque envoie des traces au backend Datadog, qui identifie alors les signaux de sécurité exploitables et envoie une notification via l'application pertinente, par exemple PagerDuty, Jira ou Slack." >}}

## Échantillonnage et rétention des données

Dans la bibliothèque de tracing, ASM recueille l'ensemble des traces qui incluent des données de sécurité. Un [filtre de rétention][7] par défaut permet de garantir que toutes les traces liées à la sécurité sont conservées dans la plateforme Datadog.

Les données associées aux requêtes suspectes sont conservées pendant 90 jours. Les données des traces sous-jacentes sont conservées pendant 15 jours.

## Confidentialité des données

Vous pouvez empêcher l'indexation de vos données sensibles de plusieurs façons, notamment en configurant des [outils de nettoyage statiques et personnalisés][8] et en utilisant des [filtres d'exclusion][9].


**Remarque :** la solution ASM Datadog n'obfusque pas automatiquement les données sensibles ou informations à caractère personnel. Si vous ne souhaitez pas les envoyer à Datadog, [configurez l'Agent Datadog ou le traceur pour assurer la sécurité des données][8].

Contactez l'assistance si vous avez besoin de supprimer des données sensibles qui ont déjà été indexées.

## Méthodes de détection des menaces

Les schémas utilisés par Datadog proviennent de plusieurs sources, notamment le [jeu de règles ModSecurity OWASP][10]. Ils permettent de détecter les menaces et vulnérabilités connues dans les requêtes HTTP. Lorsqu'une requête HTTP correspond à l'une des [règles de détection par défaut][11], Datadog génère un signal de sécurité.

Chaque fois que Datadog détecte des attaques sérieuses ciblant vos services de production, un signal de sécurité est automatiquement créé. Celui-ci vous permet d'obtenir de précieux renseignements sur les entités à l'origine de l'attaque et les services ciblés. Vous pouvez définir des règles de détection personnalisées avec des seuils, afin de déterminer les attaques pour lesquelles vous souhaitez recevoir une notification.

## Protection intégrée

<div class="alert alert-info">Le blocage des IP en un clic est en version bêta privée. Utilisez <a href="https://dashcon.io/appsec" target="_blank">ce formulaire</a> pour rejoindre la bêta.</div>

La solution ASM de Datadog intègre des fonctionnalités de protection permettant de ralentir les attaques et leurs auteurs. 

Le blocage des IP est assuré via les [bibliothèques de tracing][9], ce qui évite de créer de nouvelles dépendances dans votre stack. Les IP bloquées sont enregistrées dans la plateforme Datadog avant d'être récupérées automatiquement et en toute sécurité par l'[Agent Datadog][12]. Elles sont ensuite déployées dans votre infrastructure et appliquées à votre application.

Vous pouvez bloquer temporairement ou définitivement les adresses IP des acteurs malveillants identifiés par les signaux de sécurité ASM d'un simple clic sur un bouton dans l'interface Datadog.

Une fois une IP bloquée, tous les services déjà protégés par ASM bloquent les requêtes provenant de cette IP pendant la durée choisie. Le tag `security_response.block_ip` est appliqué à toutes les traces bloquées, et ces traces sont affichées sur le [Trace Explorer][14]. Les services pour lesquels ASM est désactivé ne sont pas protégés.


{{< img src="/security_platform/application_security/asm-blocking-ui.png" alt="Un volet de signal de sécurité dans ASM Datadog, permettant de bloquer les IP des acteurs malveillants" width="75%">}}

## Portée

La solution ASM Datadog attribue un type à chaque tentative d'attaque :

* **Unqualified attacks** : ce type d'attaque indique que des requêtes HTTP entrantes correspondent à des schémas d'attaque connus. Par exemple, le processus de mise en corrélation avec le contexte d'exécution fourni par une trace peut révéler qu'aucun lien n'existe avec la logique métier du service.
* **Contextualized attacks** : ces tentatives d'attaque envers un service sont mises en corrélation avec une logique métier correspondante. Il peut par exemple s'agir de schémas d'injection SQL sur un service exécutant des instructions SQL.
* **Vulnerability is triggered** : ASM a détecté qu'une vulnérabilité a été exploitée après comparaison avec des schémas d'attaque connus.

La solution ASM Datadog analyse plus de 100 schémas d'attaque afin de détecter [de nombreux types d'attaques][15], notamment les exploitations de vulnérabilités suivantes :

* Injections SQL
* Injections de code
* Injections de commandes
* Injections NoSQL
* Scripts intersites (XSS)
* Falsification de requête côté serveur (SSRF)

## Protection fournie par ASM contre la vulnérabilité Log4Shell

 La solution ASM Datadog identifie les charges utiles des attaques Log4Shell Log4j et renforce la visibilité sur les tentatives de chargement à distance de code malveillant par des applications vulnérables. Lorsque cette solution est utilisée conjointement avec le reste des fonctionnalités [Cloud SIEM de Datadog][16], vous pouvez identifier et étudier les activités courantes qui se sont produites après l'exploitation d'une vulnérabilité, et corriger de façon proactive les services Web Java potentiellement vulnérables qui constituent un vecteur d'attaque.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/service_catalog/#security-view
[2]: /fr/tracing/services/service_page/#security
[3]: /fr/tracing/trace_explorer/trace_view/?tab=security#more-information
[4]: /fr/tracing/trace_collection/
[5]: /fr/security_platform/application_security/getting_started/#prerequisites
[6]: /fr/serverless/installation/java/?tab=serverlessframework
[7]: /fr/tracing/trace_pipeline/trace_retention/
[8]: /fr/tracing/configure_data_security/?tab=http
[9]: /fr/security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
[10]: https://owasp.org/www-project-modsecurity-core-rule-set/
[11]: /fr/security_platform/default_rules/#cat-application-security
[12]: /fr/tracing/
[13]: /fr/agent/
[14]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[15]: https://app.datadoghq.com/security/appsec/event-rules
[16]: /fr/security_platform/cloud_siem/