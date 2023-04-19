---
aliases:
- /fr/security_platform/application_security
description: Surveillez les menaces visant votre système de production en utilisant
  le contexte d'exécution fourni par les traces distribuées.
disable_sidebar: true
further_reading:
- link: /security/application_security/setup_and_configure/#compatibilite
  tag: Documentation
  text: En savoir plus sur les langages et frameworks compatibles
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: Fonctionnement d'Application Security Management
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: Page de la solution
  text: Solution Application Security Management Datadog
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: Blog
  text: Présentation de la solution Application Security Datadog
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: GitHub
  text: Applications sans serveur sécurisées grâce à la solution ASM Datadog
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: GitHub
  text: Pratiques de sécurité recommandées pour les applications dans des environnements
    cloud natifs.
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gagner en visibilité sur les risques, vulnérabilités et attaques avec la vue
    Security d'APM
kind: documentation
title: Application Security Management
---

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Un volet de signal de sécurité dans Datadog affichant des flux d'attaques et flamegraphs" width="75%">}}

La solution Application Security Management (ASM) de Datadog vous protège contre les attaques ciblant vos applications et cherchant à exploiter des vulnérabilités au niveau du code, telles que la falsification de requête côté serveur (SSRF), l'injection SQL, ka vulnérabilité Log4Shell et les scripts intersites (XSS) réfléchis. Vous pouvez surveiller et renforcer la sécurité des applications s'exécutant dans Docker, Kubernetes et AWS ECS, ainsi que dans AWS Fargate pour les langages pris en charge.

ASM tire profit des [bibliothèques de tracing][1] Datadog et de l'[Agent Datadog][2] afin de mettre en évidence les services susceptibles de faire l'objet d'attaques. Une fois cette solution configurée, ses règles de détection intégrées aux applications identifient et neutralisent les menaces dans l'environnement de vos applications, et déclenchent des signaux chaque fois qu'une attaque nuit à votre système de production ou qu'une vulnérabilité est exploitée à partir du code.

Lorsqu'une menace est détectée, un signal de sécurité est généré dans Datadog. Pour les signaux de sécurité présentant un niveau de gravité `HIGH` ou `CRITICAL`, il est possible d'envoyer des notifications sur Slack, par e-mail, ou via PagerDuty. Vous pouvez ainsi informer votre équipe et lui fournir le contexte en temps réel associé aux menaces.

Lorsqu'un signal de sécurité est déclenché, vous pouvez réagir rapidement, dans le but d'analyser et de corriger le problème à l'origine du déclenchement dans Datadog. Examinez au sein d'une vue unique les données d'observabilité détaillées fournies par le tracing distribué des solutions ASM et APM afin de résoudre les problèmes ciblant votre application. Analysez les flux d'attaques, visualisez des flamegraphs et étudiez des données de tracing et de log corrélées pour identifier les vulnérabilités. Grâce à cette interface unique, vous pouvez parcourir les données de votre application pour prendre des mesures de remédiation et d'atténuation sans perdre la moindre information de contexte.

La solution ASM vous permet d'ignorer toutes les traces inutiles et de vous focaliser sur les données importantes pour la sécurité et la protection de votre environnement.

Tant que les vulnérabilités potentielles n'ont pas été entièrement corrigées dans le code de votre application, ASM vous permet de réduire l'impact des attaques en bloquant temporairement ou définitivement les adresses IP malveillantes, le tout d'un simple clic. Cette fonctionnalité est disponible en bêta privée. Remplissez [ce formulaire][7] pour faire partie des premières personnes à la tester.

## Mise en œuvre de la sécurité au niveau des applications dans Datadog

Pour mieux comprendre le fonctionnement structurel d'ASM et découvrir comment cette solution se base sur les données de tracing pour identifier les problèmes de sécurité, consultez la section [Fonctionnement d'Application Security Management dans Datadog][3].

## Configurer votre environnement

Grâce à ses [règles prêtes à l'emploi][4], ASM détecte les menaces sans la moindre configuration manuelle. Si vous avez déjà configuré la solution [APM][1] Datadog sur un host physique ou virtuel, vous avez simplement besoin de définir une variable d'environnement pour commencer à utiliser ASM.

Pour configurer votre environnement afin de détecter et de neutraliser les menaces avec ASM, consultez la [documentation de prise en main][5]. Une fois la solution ASM configurée, vous pouvez commencer à étudier et à résoudre les problèmes liés aux signaux de sécurité depuis la vue [Security Signals Explorer][6].

## Étudier des signaux de sécurité et résoudre les problèmes associés

Dans la vue [Security Signals Explorer][6], cliquez sur un signal de sécurité afin de consulter l'événement associé ainsi que les étapes d'atténuation suggérées. Depuis ce volet, vous pouvez également visualiser des traces et le flux d'attaques associé, et obtenir des informations de contexte supplémentaires.

## Étapes suivantes

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/
[2]: /fr/agent/
[3]: /fr/security/application_security/how-appsec-works/
[4]: /fr/security/default_rules/#cat-application-security
[5]: /fr/security/application_security/getting_started/
[6]: /fr/security/explorer/
[7]: https://dashcon.io/appsec