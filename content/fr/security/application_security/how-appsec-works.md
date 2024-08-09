---
aliases:
- /fr/security_platform/guide/how-appsec-works/
- /fr/security_platform/application_security/how-appsec-works/
- /fr/security/guide/how-appsec-works/
further_reading:
- link: /security/application_security/enabling/compatibility
  tag: Documentation
  text: En savoir plus sur les langages et frameworks compatibles
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: GitHub
  text: Présentation de la solution Application Security Datadog
- link: /security/application_security/enabling/
  tag: Documentation
  text: Activer Application Security Management
title: Fonctionnement d'Application Security Management dans Datadog
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management nʼest pas pris en charge pour le site <a href="/getting_started/site">Datadog que vous avez sélectionné</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

La solution Application Security Management (ASM) de Datadog vous permet de gagner en visibilité sur les personnes malveillantes ciblant vos systèmes ainsi que sur les attaques ciblant vos applications et cherchant à exploiter des vulnérabilités au niveau du code ou à utiliser de façon abusive la logique opérationnelle de vos applications.

En outre, ASM détecte les risques susceptibles de survenir au sein de vos applications, notamment par le biais des bibliothèques et dépendances vulnérables utilisées par les applications lors de leur exécution.

APM Datadog enregistre des informations (des « traces ») à propos de chaque requête d'application. ASM utilise les mêmes bibliothèques de tracing qu'APM pour surveiller votre trafic. ASM signale les tentatives d’attaque en analysant les requêtes suspectes qui correspondent à des schémas d’attaque connus, ou [tague les informations d'une logique opérationnelle][25]. Chaque fois que Datadog détecte des attaques ciblant votre application ou des utilisations abusives d'une logique opérationnelle qui affectent vos services, un signal de sécurité est automatiquement créé. Comme les signaux identifient les menaces sérieuses, il vous suffit de les examiner au lieu d’évaluer chaque tentative d’attaque. Selon les réglages que vous avez définis pour ces signaux de sécurité, vous pouvez recevoir des notifications sur Slack, par e-mail ou via PagerDuty.

Les pare-feu d'application Web (WAF) traditionnels sont généralement déployés à la périphérie du réseau et n'offrent donc aucune information de contexte sur le comportement des applications. Étant donné que la solution ASM est intégrée à l'application, elle a accès aux données de trace, ce qui lui permet d'identifier et de classifier plus efficacement les menaces. Tout comme les pare-feu d'application Web, ASM se base sur les schémas d'attaque connus, mais la solution tient compte du contexte autour de l'application afin de limiter les faux positifs et les alertes inutiles.

### Identifier les services exposés aux attaques ciblant les applications

La solution ASM de Datadog se base sur les informations déjà recueillies par APM pour identifier les traces correspondant à des tentatives d'attaque. Les services exposés aux attaques sont directement mis en évidence dans les pages de la section APM ([catalogue de services][2], [page Service][3] et [Traces][4]).

Étant donné qu'APM recueille un échantillon du trafic de votre application, vous devez activer ASM dans la bibliothèque de tracing pour surveiller et protéger efficacement vos services.

Pour identifier les personnes malveillantes, la solution Threat Monitoring and Detection de Datadog recueille les adresses IP des clients et les tags ajoutés manuellement par les utilisateurs sur toutes les requêtes.

<div class="alert alert-info"><strong>Activation en un clic</strong><br>
Si votre service est exécuté avec <a href="/agent/remote_config/#enabling-remote-configuration">un Agent sur lequel la fonctionnalité de configuration à distance est activée et avec une version de la bibliothèque de tracing qui prend en charge cette fonctionnalité</a>, vous pouvez <a href="/security/application_security/enabling/">activer ASM</a> depuis l'interface Datadog sans aucune configuration supplémentaire de l'Agent ou des bibliothèques de tracing.</div>

### Identifier les services vulnérables

La solution [Software Composition Analysis][5] de Datadog se sert de différentes sources de données sur les vulnérabilités connues affectant les bibliothèques logicielles open source, ainsi que d'informations fournies par l'équipe de sécurité de Datadog, afin vérifier la présence de vulnérabilités potentielles dans les bibliothèques dont dépend votre application lors de son exécution et de formuler des recommandations de remédiation.

## Compatibilité

Pour intégrer la solution ASM à votre configuration Datadog, vous devez avoir activé APM et [envoyer des traces à Datadog][6]. ASM utilise les mêmes bibliothèques qu'APM : vous n'avez donc pas besoin de déployer et de gérer une nouvelle bibliothèque. La procédure à suivre pour activer ASM varie en fonction du langage de votre environnement d'exécution. Vérifiez si votre langage est pris en charge par ASM dans les [prérequis de la solution][7].

### Surveillance sans serveur

ASM Datadog pour AWS Lambda permet d'obtenir des informations détaillées sur les acteurs malveillants qui ciblent vos fonctions. En outre, le tracing distribué offre une vue d'ensemble détaillée et contextualisée de l'attaque qui vous permet d'évaluer la menace et de prendre des mesures de remédiation efficaces.

Consultez la section [Activer ASM pour les fonctions sans serveur][8] pour découvrir les différentes étapes de configuration de la solution.

## Performances

La solution ASM Datadog repose sur des processus déjà inclus avec l'Agent et APM. Son utilisation a donc un impact négligeable sur les performances. Lorsqu'APM est activé, la bibliothèque Datadog génère des traces distribuées. ASM se base sur des schémas d'attaque connus pour signaler les activités de sécurité suspectes au sein de traces. Les traces distribuées mettent en corrélation les schémas d'attaque et le contexte d'exécution, ce qui permet de déclencher des signaux de sécurité en fonction des règles de détection définies.

{{< img src="security/application_security/How_Appsec_Works_June2023.png" alt="Schéma illustrant le fonctionnement de la bibliothèque de tracing Datadog au niveau du service de l'application. La bibliothèque envoie des traces au backend Datadog, qui identifie alors les signaux de sécurité exploitables et envoie une notification via l'application pertinente, par exemple PagerDuty, Jira ou Slack." >}}

## Échantillonnage et rétention des données

Dans la bibliothèque de tracing, ASM recueille l'ensemble des traces qui incluent des données de sécurité. Un [filtre de rétention][9] par défaut permet de garantir que toutes les traces liées à la sécurité sont conservées dans la plateforme Datadog.

Les données associées aux traces de sécurité sont conservées pendant 90 jours. Les données des traces sous-jacentes sont conservées pendant 15 jours.

## Confidentialité des données

Par défaut, ASM recueille des informations sur les traces de sécurité afin de vous aider à comprendre la raison pour laquelle la requête est considérée comme suspecte. Avant de transmettre les données, ASM les analyse afin de rechercher des modèles et des mots-clés permettant de conclure que les données sont sensibles. Si les données sont jugées sensibles, le flag `<redacted>` est appliqué. Ce flag indique que la requête est suspecte, et qu'aucune donnée liée à la requête n'a pu être recueillie pour des raisons de problèmes de sécurité des données.

Vous trouverez ci-dessous quelques exemples de données considérées comme sensibles par défaut :
* `pwd`, `password`, `ipassword`, `pass_phrase`
* `secret`
* `key`, `api_key`, `private_key`, `public_key`
* `token`
* `consumer_id`, `consumer_key`, `consumer_secret`
* `sign`, `signed`, `signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

Pour configurer les informations censurées par ASM, consultez les étapes de [configuration de la sécurité des données][17]

## Méthodes de détection des menaces

Les schémas utilisés par Datadog proviennent de plusieurs sources, notamment le [jeu de règles ModSecurity OWASP][12]. Ils permettent de détecter les menaces et vulnérabilités connues dans les requêtes HTTP. Lorsqu'une requête HTTP correspond à l'une des [règles de détection par défaut][13], Datadog génère un signal de sécurité.

**Mises à jour automatiques des schémas de détection de menaces :** si votre service est exécuté avec [un Agent au sein duquel la fonctionnalité de configuration à distance est activée et avec une version de la bibliothèque de tracing qui prend en charge cette fonctionnalité][26], les schémas de détection de menaces utilisés pour surveiller votre service sont automatiquement mis à jour lorsque Datadog publie des mises à jour.

Chaque fois que Datadog détecte des attaques sérieuses ciblant vos services de production, un signal de sécurité est automatiquement créé. Celui-ci vous permet d'obtenir de précieux renseignements sur les entités à l'origine de l'attaque et les services ciblés. Vous pouvez définir des règles de détection personnalisées avec des seuils, afin de déterminer les attaques pour lesquelles vous souhaitez recevoir une notification.

## Protection intégrée

{{% asm-protect %}}


## Qualification des tentatives dʼattaque

Les informations du tracing distribuée sont utilisées pour répartir les tentatives d'attaque au sein de trois catégories distinctes : Sans danger, Inconnu ou Dangereux.
* Les tentatives d'attaque de la catégorie « Sans danger » ne peuvent pas exploiter une faille pour s'introduire au sein de votre application, par exemple lorsqu'une attaque par injection PHP cible un service écrit en Java.
* Les tentatives d'attaque sont placées dans la catégorie « Inconnu » en cas d'absence d'informations suffisantes permettant d'émettre un jugement définitif sur la probabilité de réussite d'une attaque.
* Les tentatives d'attaque sont placées dans la catégorie « Dangereux » lorsqu'il existe des données prouvant qu'une vulnérabilité au niveau du code a été détectée par un acteur malveillant.



## Couverture de la surveillance des menaces


La solution ASM Datadog analyse plus de 100 signatures d'attaque afin de détecter [de nombreux types d'attaques][14], notamment les exploitations de catégories suivantes (liste non exhaustive) :

* Injections SQL
* Injections de code
* Injections de commandes
* Injections NoSQL
* Scripts intersites (XSS)
* Falsification de requête côté serveur (SSRF)

## Détection intégrée des vulnérabilités

La solution ASM Datadog intègre des fonctionnalités de détection qui vous informent des vulnérabilités détectées au sein de vos dépendances open source. Le [Vulnerability Explorer][15] fournit des informations plus détaillées, comme le niveau de gravité de la vulnérabilité, les services affectés, l'infrastructure potentiellement vulnérable, ainsi que des instructions de remédiation pour résoudre les problèmes détectés.

Pour en savoir plus, consultez [Software Composition Analysis][5].

## Sécurité des API

<div class="alert alert-info">La sécurité des API est en version bêta privée.</div>

La solution Application Security Management (ASM) de Datadog offre une visibilité sur les menaces ciblant vos API. Utilisez le [catalogue des API][27] pour surveiller les métriques relatives à la santé et aux performances des API, où vous pouvez voir les attaques ciblant vos API. Cette vue inclut l'IP de l'attaquant et ses informations d'authentification, ainsi que les en-têtes de requête indiquant les détails sur la formation de l'attaque. En utilisant à la fois ASM et la gestion des API, vous pouvez conserver une vue d'ensemble de la surface d'attaque de vos API et réagir pour atténuer les menaces.

## Protection fournie par ASM contre la vulnérabilité Log4Shell

La solution ASM Datadog identifie les charges utiles des attaques Log4Shell Log4j et renforce la visibilité sur les tentatives de chargement à distance de code malveillant par des applications vulnérables. Lorsque cette solution est utilisée conjointement avec le reste des fonctionnalités [Cloud SIEM][16], vous pouvez identifier et étudier les activités courantes qui se sont produites après l'exploitation d'une vulnérabilité, et corriger de façon proactive les services Web Java potentiellement vulnérables qui constituent un vecteur d'attaque.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/threats/
[2]: /fr/tracing/service_catalog/#security-view
[3]: /fr/tracing/services/service_page/#security
[4]: /fr/tracing/trace_explorer/trace_view/?tab=security#more-information
[5]: /fr/security/application_security/software_composition_analysis/
[6]: /fr/tracing/trace_collection/
[7]: /fr/security/application_security/enabling/#prerequisites
[8]: /fr/security/application_security/enabling/serverless/
[9]: /fr/tracing/trace_pipeline/trace_retention/
[10]: /fr/tracing/configure_data_security/?tab=http
[11]: /fr/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[12]: https://owasp.org/www-project-modsecurity-core-rule-set/
[13]: /fr/security/default_rules/?category=cat-application-security
[14]: https://app.datadoghq.com/security/appsec/event-rules
[15]: https://app.datadoghq.com/security/appsec/vm
[16]: /fr/security/cloud_siem/
[17]: /fr/security/application_security/threats/library_configuration/#data-security-considerations
[25]: /fr/security/application_security/threats/add-user-info#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[26]: /fr/agent/remote_config/#enabling-remote-configuration
[27]: /fr/tracing/api_catalog/