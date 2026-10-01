---
description: Détectez, effectuez des investigations et bloquez les attaques contre
  les applications et les API en temps réel grâce à la protection contre les menaces
  dans App and API Protection.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-exploit-prevention/
  tag: Blog
  text: Protégez vos applications contre les attaques zero-day avec Datadog Exploit
    Prevention
title: Protection contre les menaces
---
Utilisez la protection contre les menaces dans [App and API Protection][1] (AAP) pour détecter les attaques contre vos applications et les API, effectuer des investigations et bloquer le trafic malveillant en temps réel.

Pour commencer, [configurez AAP][2] sur vos services afin qu'ils rapportent des traces de sécurité. AAP détecte ensuite les menaces provenant du trafic en direct de vos applications et vous permet d'y répondre.

## Comment fonctionne la protection contre les menaces {#how-threat-protection-works}

La protection contre les menaces rassemble plusieurs fonctionnalités, toutes basées sur les données de trafic des applications en direct. Avec la protection contre les menaces, vous pouvez :

- Détectez et effectuez des investigations sur les menaces avec les [Security Signals][3]. Datadog crée un signal de sécurité lorsqu'il détecte une menace à partir d'une règle de détection, afin que vous puissiez trier, filtrer et effectuer des investigations sur les attaques dans le Signals Explorer.
- Bloquez les attaques et les attaquants avec les [Policies][4]. Bloquez les adresses IP et les utilisateurs malveillants en temps réel depuis l'interface utilisateur de Datadog, manuellement ou via des règles automatisées.
- Arrêtez les tentatives d'exploitation dans le code avec [Exploit Prevention][5]. Détectez et bloquez les tentatives d'exploitation de vulnérabilités, y compris les attaques zero-day, depuis l'application en cours d'exécution.
- Étendez la protection au périmètre avec les [intégrations WAF][6]. Combinez la protection intégrée aux applications avec des défenses de périmètre telles qu'AWS WAF pour une approche de défense en profondeur.
- Défendez les comptes utilisateurs avec [Account Takeover Protection][7]. Détectez et atténuez les attaques de prise de contrôle de compte, telles que le credential stuffing, et désactivez les utilisateurs compromis.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/
[2]: /fr/security/application_security/setup/
[3]: /fr/security/application_security/threat_protection/security_signals/
[4]: /fr/security/application_security/threat_protection/policies/
[5]: /fr/security/application_security/threat_protection/exploit-prevention/
[6]: /fr/security/application_security/threat_protection/waf-integration/
[7]: /fr/security/application_security/threat_protection/account_takeover_protection/