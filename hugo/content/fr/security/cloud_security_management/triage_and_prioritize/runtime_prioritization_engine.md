---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: Documentation
  text: Comprendre le score de gravité de Cloud Security
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentation
  text: Détecter et corriger les vulnérabilités avec Cloud Security
- link: /security/security_inbox/
  tag: Documentation
  text: Examiner les découvertes priorisées dans la boîte de réception Security
- link: https://www.datadoghq.com/blog/runtime-prioritization-engine/
  tag: Blog
  text: Priorisez les résultats de sécurité avec le Datadog Runtime Prioritization
    Engine
- link: https://www.datadoghq.com/blog/datadog-security/
  tag: Blog
  text: 'Sécuriser l''ère de l''IA : devancer les attaques basées sur l''IA avec une
    sécurité et une observabilité unifiées'
- link: https://www.datadoghq.com/blog/cisa-bod-26-04-vulnerability-prioritization/
  tag: Blog
  text: Comment la directive BOD 26-04 de la CISA modifie la priorisation des vulnérabilités
title: Moteur de priorisation à l'exécution
---
Les scanners de sécurité font apparaître des milliers de résultats par environnement. La plupart des équipes classent par défaut les résultats selon la gravité CVSS, mais les scores statiques signalent comme critiques de nombreux résultats qui ne sont jamais exploités en pratique. Le risque réel dépend du contexte en temps réel : le code vulnérable est-il en cours d'exécution, un exploit est-il disponible et la ressource affectée touche-t-elle des données sensibles ou un workflow critique pour l'entreprise ?

Le moteur de priorisation à l'exécution de Datadog combine le comportement à l'exécution, l'exploitabilité, l'exposition et le contexte commercial issus des données d'Observability et de Security pour identifier les 5 % de découvertes qui présentent un risque réel et exploitable, afin que vous puissiez vous concentrer uniquement sur ce qui compte.

## Fonctionnement {#how-it-works}

Le moteur de priorisation à l'exécution est conçu pour être explicable. Pour chaque découverte, Datadog évalue cinq dimensions de risque en utilisant le contexte de production et montre pourquoi la découverte a été priorisée.

| Dimension | Question à laquelle il répond | Exemples de signaux |
|---|---|---|
| **Accessibilité** | Le composant vulnérable est-il réellement en cours d'exécution ? | Image affectée observée en cours d'exécution sur une charge de travail de production. Paquet vulnérable observé à l'exécution. |
| **Exposition** | Les attaquants peuvent-ils l'atteindre ? | Ressource accessible publiquement à partir de l'analyse réseau statique. Preuve issue du contexte d'exécution attestant d'une exposition à des attaques actives. |
| **Exploitabilité** | Les attaquants sont-ils susceptibles de l'exploiter ? | Un code d'exploitation public existe. Découverte activement exploitée dans la nature (répertoriée dans [CISA KEV][1]). Probabilité d'exploitation élevée ([EPSS][2]). |
| **Criticité métier** | Un compromis aurait-il un impact élevé ? | La ressource prend en charge une fonction métier critique ([Joyau de la couronne](#crown-jewels)). S'exécute avec des privilèges élevés et traite des données sensibles. |
| **Actionnabilité** | La bonne équipe peut-elle le corriger ? | Responsable de service identifié. Correction ou atténuation disponible. |

Le moteur de priorisation à l'exécution priorise une découverte lorsque ces signaux indiquent un risque réel et exploitable dans votre environnement. Les découvertes qui ne répondent pas aux critères de priorisation restent visibles, mais sont déplacées hors de la file d'attente de triage active.

## Joyaux de la couronne {#crown-jewels}

Les [Joyaux de la couronne][8] sont les ressources qui prennent en charge vos fonctions métier les plus critiques (services, hosts, bases de données, conteneurs, etc.). Datadog les déduit automatiquement à partir des données d'observabilité telles que le flux de traces APM, les dépendances de service (fan-in), les SLO, le trafic, les incidents, et plus encore.

Les Joyaux de la couronne se mettent à jour en continu à mesure que votre environnement change. Vous pouvez également ajouter vos propres Joyaux de la couronne manuellement dans Datadog Cloud Security.

## Propriété {#ownership}

La [Propriété][7] identifie l'équipe ou le responsable de service chargé de corriger une découverte de sécurité. Datadog déduit la propriété à partir des métadonnées d'observabilité telles que les tags de service, les tags d'équipe, les métadonnées de déploiement, la configuration d'astreinte, les liens de contrôle de source, les entrées du catalogue de services, et plus encore.

Lorsque la propriété est connue, le moteur peut acheminer les découvertes vers la bonne équipe au lieu de laisser les équipes de sécurité rechercher manuellement les responsables de la remédiation.

## Filtrer les découvertes par signaux d'exécution {#filter-findings-by-runtime-signals}

Datadog ajoute les signaux d'exécution qu'il observe aux découvertes de vulnérabilité. Utilisez ces signaux dans le [Vulnerability Explorer][11], combinés avec tout autre critère.

### Le paquet est en cours d'exécution {#package-is-running}

Lorsque la [Priorisation des paquets d'exécution][4] est activée, Datadog ajoute un contexte d'exécution au niveau du paquet aux découvertes de vulnérabilité des images de conteneur pour les paquets installés par un gestionnaire de paquets du système d'exploitation (`apt`, `yum` ou `apk`). Recherchez, filtrez et regroupez par ces tags :

| Contexte d'exécution | Tag |
|---|---|
| Le paquet est en cours d'exécution | `@risk.is_package_running:true` |
| Accédé par le processus root | `@package.is_running_as_root:true` |
| Binaire SUID présent | `@package.has_suid:true` |

Datadog ajoute un tag lorsqu'il observe un contexte d'exécution. Un tag absent signifie que Datadog n'a pas observé le contexte ; cela ne signifie pas que le paquet est inutilisé. Utilisez les tags pour prioriser ce qui doit être corrigé en premier, et non pour exclure des découvertes.

Par exemple, les vulnérabilités élevées et critiques qui sont en cours d'exécution et pour lesquelles un correctif est disponible :

```
@risk.is_package_running:true @severity:(high OR critical) @remediation.is_available:true
```

Le contexte d'exécution persiste pendant toute la durée de vie d'une version d'image : une fois qu'un paquet est observé en cours d'exécution, les découvertes associées à cette image conservent ce contexte. Comme les images de conteneur sont immuables, cela reflète ce qui a été exécuté dans cette image. Lorsque l'image n'est plus déployée, les découvertes associées deviennent obsolètes et sont clôturées.

### L'image est en cours d'exécution {#image-is-running}

Datadog ajoute le contexte d'exécution de l'image de conteneur à chaque découverte de vulnérabilité d'image de conteneur, sans configuration supplémentaire de l'Agent. Recherchez, filtrez et regroupez par ce tag :

| Contexte d'exécution | Tag |
|---|---|
| Image détectée en cours d'exécution au cours des 12 dernières heures | `@risk.is_image_running:true` |

Le tag est toujours `true` ou `false` sur les découvertes d'images de conteneur, et absent sur celles liées aux hosts, aux images de host et aux environnements sans serveur. Pour hiérarchiser les images en cours d'exécution sur tous les types d'actifs, excluez les découvertes d'image de conteneur qui n'ont pas été détectées comme étant en cours d'exécution :

```
-@risk.is_image_running:false
```

Pour une fenêtre autre que 12 heures, interrogez `@risk_details.is_image_running.evidence.detected_at`, l'heure de la dernière détection.

#### Comment le contexte d'exécution est déterminé {#how-the-running-context-is-determined}

Datadog détecte les images en cours d'exécution avec le Datadog Agent ou l'Analyse Agentless, mais les deux diffèrent quant à la provenance du contexte et à la fréquence de son actualisation :

| | Agent | Agentless |
|---|---|---|
| **Nécessite** | l'[analyse des vulnérabilités Cloud Security][14] et la [surveillance des conteneurs][12] activées sur l'Agent. | [Analyse Agentless][13] sur le compte cloud. |
| **Source du contexte** | Données de [surveillance des conteneurs][12] : les conteneurs que Datadog observe en cours d'exécution sur les hosts surveillés par l'Agent. | Analyse Agentless, qui enregistre les images en cours d'exécution sur une ressource au moment où l'analyse est effectuée. |
| **Fréquence de mise à jour** | Toutes les heures, lorsque Datadog réévalue les découvertes de l'image. | Une fois par analyse Agentless de la ressource, toutes les 12 heures. |
| **Détail au niveau du conteneur** | Le panneau latéral d'une découverte dans le [Vulnerability Explorer][11] répertorie les conteneurs qui ont récemment exécuté l'image. | Non disponible. |

## Démarrez {#get-started}

1. Activez la Priorisation des packages d'exécution sur l'Agent pour faire apparaître le signal *Le paquet est en cours d'exécution* sur les découvertes de vulnérabilité. Consultez les instructions pour ce faire pour les déploiements [Kubernetes][4], [Docker][9] ou [Linux][10]. Consultez [Configuration de Cloud Security][3].
2. Ouvrez le [{{< ui >}}Cloud Security Summary{{< /ui >}}][5] dans Datadog. Les découvertes prioritaires sont affichées en haut de chaque entonnoir et dans le [{{< ui >}}Security Inbox{{< /ui >}}][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[2]: https://www.first.org/epss/
[3]: /fr/security/cloud_security_management/setup/
[4]: /fr/security/cloud_security_management/setup/agent/kubernetes/#runtime-package-prioritization
[5]: https://app.datadoghq.com/security/csm
[6]: /fr/security/security_inbox/
[7]: /fr/security/cloud_security_management/review_remediate/ownership_agent/
[8]: /fr/security/cloud_security_management/crown_jewels/
[9]: /fr/security/cloud_security_management/setup/agent/docker/#runtime-package-prioritization
[10]: /fr/security/cloud_security_management/setup/agent/linux/#runtime-package-prioritization
[11]: https://app.datadoghq.com/security/csm/vm
[12]: /fr/containers/
[13]: /fr/security/cloud_security_management/setup/agentless_scanning/
[14]: /fr/security/cloud_security_management/vulnerabilities/