---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: Documentation
  text: Comprendre la notation de gravité de Cloud Security
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentation
  text: Détecter et remédier aux vulnérabilités avec Cloud Security
- link: /security/security_inbox/
  tag: Documentation
  text: Examiner les résultats priorisés dans la Boîte de réception de sécurité
title: Moteur de priorisation en temps réel
---
{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="Rejoignez la Preview !">}}
Le moteur de priorisation en temps réel de Datadog est en Preview pour les vulnérabilités Cloud Security. Utilisez ce formulaire pour demander l'accès.
{{< /callout >}}

Les scanners de sécurité révèlent des milliers de résultats par environnement. La plupart des équipes choisissent par défaut de classer par gravité CVSS, mais les scores statiques signalent de nombreux résultats qui ne sont jamais exploités en pratique comme critiques. Le risque réel dépend du contexte en direct : le code vulnérable est-il en cours d'exécution, une exploitation est-elle disponible, et la ressource affectée touche-t-elle des données sensibles ou un flux de travail critique pour l'entreprise ?

Le moteur de priorisation en temps réel de Datadog combine le comportement en temps réel, l'exploitabilité, l'exposition et le contexte commercial à partir des données d'observabilité et de sécurité pour identifier les 5 % de résultats qui posent un risque réel et exploitable, afin que vous puissiez vous concentrer uniquement sur ce qui compte.

## Comment cela fonctionne {#how-it-works}

Le moteur de priorisation en temps réel est conçu pour être explicable. Pour chaque résultat, Datadog évalue cinq dimensions de risque en utilisant le contexte de production et montre pourquoi le résultat a été priorisé.

| Dimension | Question à laquelle elle répond | Signaux d'exemple |
|---|---|---|
| **Accessibilité** | Le composant vulnérable est-il réellement en cours d'exécution ? | L'image affectée observée en cours d'exécution sur une charge de travail de production. Le package vulnérable observé en cours d'exécution. |
| **Exposition** | Les attaquants peuvent-ils y accéder ? | Ressource accessible publiquement à partir d'une analyse réseau statique. Preuves d'exposition aux attaques actives en temps réel. |
| **Exploitable** | Les attaquants sont-ils susceptibles de l'exploiter ? | Un code d'exploitation public existe. Découverte d'une exploitation active dans la nature (listée dans [CISA KEV][1]). Haute probabilité d'exploitation ([EPSS][2]). |
| **Criticité commerciale** | Un compromis aurait-il un impact élevé ? | La ressource soutient une fonction commerciale critique ([Crown Jewel](#crown-jewels)). S'exécute avec des privilèges élevés et traite des données sensibles. |
| **Actionnabilité** | L'équipe appropriée peut-elle le corriger ? | Propriétaire du service identifié. Correction ou atténuation disponible. |

Le moteur de priorisation en temps réel priorise une découverte lorsque ces signaux indiquent un risque réel et exploitable dans votre environnement. Les découvertes qui ne répondent pas aux critères de priorisation restent visibles, mais sortent de la file d'attente de triage actif.

## Crown Jewels {#crown-jewels}

[Crown Jewels][8] sont les ressources qui soutiennent vos fonctions commerciales les plus critiques (services, hôtes, bases de données, conteneurs, etc.). Datadog les infère automatiquement à partir de données d'observabilité telles que le flux de traces APM, les dépendances de service (fan-in), les SLO, le trafic, les incidents, et plus encore.

Les Crown Jewels se mettent à jour en continu à mesure que votre environnement change. Vous pouvez également ajouter vos propres Crown Jewels manuellement dans Datadog Cloud Security.

## Propriété {#ownership}

[Propriété][7] identifie l'équipe ou le propriétaire du service chargé de corriger une découverte de sécurité. Datadog déduit la propriété à partir des métadonnées d'observabilité telles que les étiquettes de service, les étiquettes d'équipe, les métadonnées de déploiement, la configuration d'astreinte, les liens de contrôle de version, les entrées du catalogue de services, et plus encore.

Lorsque la propriété est connue, le moteur peut acheminer les résultats vers la bonne équipe au lieu de laisser les équipes de sécurité contacter manuellement les responsables de la remédiation.


## Commencez {#get-started}

1. Déployez la version 7.79 ou ultérieure de l'Agent Datadog avec Cloud Security activé. Voir [Configuration de Cloud Security][3].
2. Activez le [Runtime Package Tracking][4] sur l'Agent pour faire apparaître le signal *package in use* sur les constats de vulnérabilité.
3. Ouvrez le [Cloud Security Summary][5] dans Datadog. Les résultats priorisés sont affichés en haut de chaque entonnoir et dans la [Security Inbox][6].


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[2]: https://www.first.org/epss/
[3]: /fr/security/cloud_security_management/setup/
[4]: /fr/security/cloud_security_management/setup/agent/
[5]: https://app.datadoghq.com/security/csm
[6]: /fr/security/security_inbox/
[7]: /fr/security/cloud_security_management/guide/frontier_group/ownership_agent/
[8]: /fr/security/cloud_security_management/crown_jewels/