---
algolia:
  tags:
  - asm
  - App and API Protection
aliases:
- /fr/security_platform/application_security
- /fr/security/application_security/enabling/single_step
- /fr/security/application_security/enabling/compatibility
- /fr/security/application_security/enabling
- /fr/security/application_security/getting_started
- /fr/security/application_security/threats
- /fr/security/application_security/setup/standalone
cascade:
  site_support_id: application_security_override
description: Surveillez les menaces visant votre système de production en utilisant
  le contexte d'exécution fourni par les traces distribuées.
further_reading:
- link: https://www.datadoghq.com/blog/secure-api-with-datadog
  tag: Blog
  text: 'De la découverte à la défense : sécuriser les API avec Datadog App and API
    Protection'
- link: /security/application_security/how-it-works/
  tag: Documentation
  text: Fonctionnement de la protection des applications et des API
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: Page de la solution
  text: Datadog App and API Protection
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gagner en visibilité sur les risques, vulnérabilités et attaques avec la vue
    Security d'APM
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Surveiller les applications WAF AWS avec Datadog
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: Blog
  text: Comment Datadog Security Inbox priorise les risques de sécurité
- link: https://www.datadoghq.com/blog/understanding-your-waf/
  tag: Blog
  text: 'Comprendre votre WAF : comment combler les lacunes courantes en matière de
    sécurité des applications web'
- link: https://www.datadoghq.com/blog/mitigate-account-takeovers/
  tag: Blog
  text: Atténuez les prises de contrôle de compte avec Datadog App and API Protection
- link: https://learn.datadoghq.com/courses/app-protection-block-attacks
  tag: Centre d'apprentissage
  text: Bloquez les attaques d'applications avec App and API Protection
site_support_id: application_security_override
title: Protection des applications et des API
---
{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}

<div class="alert alert-info">
AI Guard est en avant-première. Obtenez des garde-fous de sécurité en temps réel pour vos applications et agents IA. AI Guard aide à sécuriser vos applications et agents d'IA en temps réel contre les attaques par injection de prompt, jailbreaking, utilisation abusive d'outils et exfiltration de données sensibles. Remplissez ce <a href="https://www.datadoghq.com/product-preview/ai-security/">formulaire</a> pour demander l'accès.
</div>

{{% /site-region %}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Un panneau de signalement de sécurité dans Datadog, qui affiche les flux d'attaque et les graphes de flammes" width="75%">}}

**App and API Protection (AAP)** offre une visibilité et une sécurité unifiées pour vos applications et API, vous aidant à détecter, enquêter et prévenir les menaces sur les charges de travail modernes.

Que vous protégiez des API publiques, des services internes ou des applications destinées aux utilisateurs, AAP dote vos équipes d'une détection des menaces prête à l'emploi en temps réel, d'une évaluation de la posture et de protections intégrées aux applications.

<div class="alert alert-info">Auparavant connue sous le nom d'Application Security Monitoring (ASM), AAP va désormais au-delà de la détection des menaces à l'exécution pour inclure la découverte d'API, la gestion de la posture et des capacités de protection.</div>

## Fonctionnalités clés {#key-capabilities}

### Découverte d'API et gestion de la posture {#api-discovery-and-posture-management}

* Détectez automatiquement toutes les API exposées par vos services.  
* Identifiez les endpoints non protégés, non documentés ou trop permissifs.  
* Obtenez des constats détaillés et contextuels liés à des endpoints spécifiques, à des erreurs de configuration et à des comportements observés.  
* Évaluez les configurations d'API par rapport aux règles de posture basées sur les meilleures pratiques de sécurité et les cadres de conformité (par exemple, OWASP API Top 10).
* Vérifiez activement l'accessibilité et l'authentification des endpoints avec [Endpoint Scanning][17].

### Détection et protection des menaces à l'exécution {#runtime-threat-detection-and-protection}

* Détectez les menaces en temps réel telles que les attaques par injection, les tentatives de prise de contrôle de compte et les abus d'application.  
* Corrélez les modèles d'attaque multi-signaux en informations exploitables.  
* Bloquez le trafic malveillant avec les règles WAF intégrées à l'application en utilisant des attributs tels que l'adresse IP, l'agent utilisateur, les en-têtes, et plus encore.

## Cas d'utilisation {#use-cases}

* Protégez les données client dans les API de production  
* Détectez et bloquez le bourrage d'identifiants et les attaques ATO  
* Maintenez la conformité de la posture API entre les équipes et les environnements  
* Enquêtez sur les incidents avec des données de trace, de log et de sécurité corrélées

## Implémentation d'AAP dans Datadog {#aap-implementation-in-datadog}

Si vous êtes curieux de savoir comment la protection des applications et des API est structurée et comment elle utilise les données de traçage pour identifier les problèmes de sécurité, lisez [Comment fonctionne la protection des applications et des API][3].

## Configurez votre environnement {#configure-your-environment}

Propulsé par les [règles prêtes à l'emploi][4] fournies, AAP détecte les menaces sans configuration manuelle. Si vous avez déjà configuré [APM][1] de Datadog sur un hôte physique ou virtuel, [setup][16] nécessite uniquement de définir une variable d'environnement pour commencer.

Pour commencer à configurer votre environnement afin de détecter et de protéger contre les menaces avec AAP, suivez la documentation d'activation pour chaque produit. Une fois AAP configuré, vous pouvez commencer à enquêter sur les signaux de sécurité et à y remédier dans le [Security Signals Explorer][6].

## Enquêter sur les signaux de sécurité et y remédier {#investigate-and-remediate-security-signals}

Dans le [Security Signals Explorer][6], cliquez sur n'importe quel signal de sécurité pour voir ce qui s'est passé et les étapes suggérées pour atténuer l'attaque. Dans le même panneau, affichez les traces avec leur flux d'attaque corrélé et les informations de requête pour obtenir plus de contexte.

## Prévention des exploits vs WAF intégré à l'application {#exploit-prevention-vs-in-app-waf}

Cette section fournit un résumé de la prévention des exploits et explique en quoi elle diffère des règles du Web Application Firewall (WAF) intégré à l'application.

Datadog AAP inclut les fonctionnalités [Prévention des exploits][14] et [WAF intégré à l'application][15] pour protéger vos applications contre les exploits. La prévention des exploits est une extension du WAF intégré à l'application. La prévention des exploits tire parti du WAF intégré à l'application comme première ligne de défense, puis bloque les attaques manquées par le WAF.

La prévention des exploits tire parti de la technologie de protection autonome des applications en cours d'exécution (RASP) pour déterminer si une requête d'application interagit avec un chemin de code vulnérable, puis la protège contre des types de vulnérabilités spécifiques :

- Injection SQL (SQLi)
- Falsification de requête côté serveur (SSRF)
- Inclusion de fichier local (LFI)
- Injection de commande

Pour la compatibilité des bibliothèques, consultez [Exploit Prevention][13].

En plus de détecter les modèles malveillants dans la requête, Exploit Prevention se distingue de l'In-App WAF en suivant les actions effectuées par l'application (requête SQL exécutée, fichiers consultés, etc.). Exploit Prevention est capable de déterminer si une saisie utilisateur a modifié la requête SQL ou restreint l'accès à un fichier de manière préjudiciable, puis de bloquer l'opération. 

Par exemple, lors d'une attaque par injection SQL, l'objectif de l'attaquant est de prendre le contrôle de la requête SQL et d'en changer la signification. Exploit Prevention analyse la requête SQL avant son exécution et vérifie la présence de tout paramètre utilisateur dans la requête. Si tel est le cas, Exploit Prevention vérifie si l'analyseur SQL a interprété le paramètre comme plusieurs jetons SQL (modifiant ainsi la signification de la requête SQL). Dans ce cas, Exploit Prevention signale la requête comme injectée.

## Désactiver AAP {#disable-aap}

Pour plus d'informations sur la désactivation d'AAP ou de ses fonctionnalités, consultez les éléments suivants :

- [Désactivation d'AAP][10]

## Étapes suivantes {#next-steps}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/
[2]: /fr/agent/
[3]: /fr/security/application_security/how-it-works/
[4]: /fr/security/default_rules/?category=cat-application-security
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /fr/security/code_security/software_composition_analysis/
[9]: /fr/security/code_security/
[10]: /fr/security/application_security/troubleshooting/#disabling-aap
[11]: /fr/security/application_security/troubleshooting/#disabling-software-composition-analysis
[12]: /fr/security/application_security/troubleshooting/#disabling-code-security
[13]: /fr/security/application_security/exploit-prevention/#library-compatibility
[14]: /fr/security/application_security/exploit-prevention/
[15]: /fr/security/application_security/waf-integration/
[16]: /fr/security/application_security/setup/
[17]: /fr/security/application_security/api_posture/endpoint_scanning/