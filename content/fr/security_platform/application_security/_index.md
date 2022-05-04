---
description: Surveillez les menaces visant votre système de production en utilisant
  le contexte d'exécution fourni par les traces distribuées.
disable_sidebar: true
further_reading:
- link: /security_platform/application_security/setup_and_configure/#compatibility
  tag: Documentation
  text: En savoir plus sur les langages et frameworks compatibles
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: Blog
  text: Présentation de la solution Application Security Datadog
- link: /security_platform/guide/how-appsec-works/
  tag: Documentation
  text: Fonctionnement d'Application Security Monitoring dans Datadog
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: Page de la solution
  text: Application Security Monitoring Datadog
kind: documentation
title: Application Security Monitoring
---

{{< img src="/security_platform/application_security/app-sec-landing-page.png" alt="Un volet de signal de sécurité dans Datadog affichant des flux d'attaques et flamegraphs" width="75%">}}

La solution Application Security Monitoring (ASM) de Datadog vous permet de gagner en visibilité sur les attaques ciblant vos applications et cherchant à exploiter des vulnérabilités au niveau du code, telles que la falsification de requête côté serveur (SSRF), l'injection SQL, les vulnérabilités Log4Shell et les scripts intersites (XSS) réfléchis. Vous pouvez surveiller la sécurité d'applications s'exécutant dans Docker, Kubernetes et AWS ECS, ainsi que dans AWS Fargate pour les langages pris en charge.

ASM tirer profit des [bibliothèques de tracing][1] Datadog, de l'[Agent Datadog][2] et des règles de détection au sein de l'application afin d'identifier les menaces dans l'environnement de votre application. Cette solution déclenche des signaux chaque fois qu'une attaque vise votre système de production ou qu'une vulnérabilité est exploitée à partir du code.

Lorsqu'une menace est détectée, un signal de sécurité est généré dans Datadog. Pour les signaux de sécurité présentant un niveau de gravité `HIGH` ou `CRITICAL`, il est possible d'envoyer des notifications sur Slack, par e-mail, ou via PagerDuty. Vous pouvez ainsi informer votre équipe et lui fournir le contexte en temps réel associé aux menaces.

Lorsqu'un signal est déclenché, vous pouvez réagir rapidement en étudiant le problème à son origine dans Datadog. Examinez au sein d'une vue unique les données d'observabilité détaillées fournies par le tracing distribué des solutions ASM et APM afin de résoudre les problèmes ciblant votre application. Analysez les flux d'attaques, visualisez des flamegraphs et étudiez des données de tracing et de log corrélées pour identifier les vulnérabilités. Grâce à cette interface unique, vous pouvez parcourir les données de votre application pour prendre des mesures de remédiation sans perdre la moindre information de contexte.

La solution ASM vous permet d'ignorer toutes les traces inutiles et de vous focaliser sur les données importantes pour la sécurité et la protection de votre environnement.

## Configurer votre environnement

Grâce à ses [règles prêtes à l'emploi][3], ASM détecte les menaces sans la moindre configuration manuelle. Si vous utilisez déjà la solution [APM][1] Datadog, vous avez simplement besoin de configurer une variable d'environnement pour commencer à tirer profit d'ASM.

Pour configurer votre environnement afin de détecter les menaces avec ASM, consultez la [documentation de prise en main][4]. Une fois la solution ASM configurée, vous pouvez commencer à étudier et à résoudre les problèmes liés aux signaux de sécurité depuis la vue [Security Signals Explorer][5].

## Étudier des signaux de sécurité et résoudre les problèmes associés

Dans la vue [Security Signals Explorer][5], cliquez sur un signal de sécurité afin de consulter l'événement associé ainsi que les étapes de remédiation suggérées. Depuis ce volet, vous pouvez également visualiser des traces et le flux d'attaques associé, et obtenir des informations de contexte supplémentaires.

## Étapes suivantes

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/
[2]: /fr/agent/
[3]: /fr/security_platform/default_rules/#cat-application-security
[4]: /fr/security_platform/application_security/getting_started/
[5]: /fr/security_platform/explorer/