---
aliases:
- /fr/security_monitoring/explorer/
- /fr/cloud_siem/explorer/
description: Effectuer des recherches sur l'ensemble de vos signaux de sécurité et
  exécuter une analyse de la sécurité
further_reading:
- link: https://www.datadoghq.com/blog/announcing-security-monitoring/
  tag: Blog
  text: En savoir plus sur Cloud SIEM
- link: /cloud_siem/detection_rules/
  tag: Documentation
  text: En savoir plus sur la logique conditionnelle des règles de sécurité
kind: documentation
title: Security Signals Explorer
---

## Présentation

Le [Security Signals Explorer][1] vous permet de mettre en corrélation et de filtrer vos signaux de sécurité. Depuis cette page, vous pouvez également accéder aux dashboards [Cloud SIEM][2], [Posture Management][3], [Workload Security][4] et [Application Security Monitoring][5].

Grâce à cette vue, vous pouvez :

- [Explorer vos signaux de sécurité](#explorer-vos-signaux-de-securite)
- [Consulter en détail un signal de sécurité](#consulter-en-detail-un-signal-de-securite)
  - [Renseignements sur les menaces](#renseignements-sur-les-menaces)
  - [Détection des anomalies](#detection-des-anomalies)
- [Analyser visuellement vos signaux de sécurité](#analyser-visuellement-vos-signaux-de-securite)
- [Pour aller plus loin](#pour-aller-plus-loin)

## Explorer vos signaux de sécurité

Les signaux de sécurité renvoyés par votre recherche s'affichent dans un tableau dédié.

{{< img src="security_platform/security_monitoring/explorer/signals_table.png" alt="Le tableau des signaux de sécurité affichant deux signaux de piratage de compte" >}}

Filtrez son contenu en choisissant parmi la liste des facettes disponibles. Vous pouvez personnaliser le contenu de ce tableau en fonction de vos besoins et de vos préférences. Pour ce faire, cliquez sur le bouton **Options** en haut à droite de la page.

## Consulter en détail un signal de sécurité

Cliquez sur un signal de sécurité pour afficher plus de détails dans un volet dédié.

{{< img src="security_platform/security_monitoring/explorer/signal_panel.png" alt="Le volet Security Signal affichant un signal critique concernant la suppression d'un blocage de l'accès public pour AWS S3" style="width:80%;" >}}

Les détails et les actions les plus importants concernant votre problème figurent en haut du volet. Ils vous permettent de déterminer la gravité du signal et sa date de création, mais également d'accéder aux réglages de la règle, de modifier l'état du signal et de partager en quelques secondes ce signal à un collègue ou de le lui attribuer.

Les dates du premier et du dernier déclenchement sont mises à jour lorsque de nouvelles données historiques sont transmises, ou lorsque l'attaque n'a pas pris fin. Pour les signaux Cloud SIEM et Cloud Workload Security, la section **What happened** est indiquée dans l'onglet Overview, ainsi que les regroupements configurés ou les personnalisations de règles en lien avec la règle de détection. Dans cet exemple de règle de détection, le critère de regroupement `usr.name` est appliqué. Enfin, tous les tags définis pour la règle de détection s'affichent sous les critères de regroupement dans l'en-tête des findings CSPM et dans la section Context des signaux Cloud SIEM et Cloud Workload Security.

Pour faciliter l'analyse de l'activité, le volet Security Signal récapitule les tags et les attributs de l'ensemble des logs qui ont déclenché un signal, ce qui vous permet d'effectuer un dépannage sans accéder au Log Explorer. Par exemple, un seul coup d'œil à la section Context suffit pour identifier les adresses IP qui tentent de se connecter à un compte utilisateur, ou les comptes AWS et zones de disponibilités qui exécutent le service d'authentification.

Sous l'en-tête des signaux Cloud SIEM et Cloud Workload Security se trouvent plusieurs onglets comportant des informations détaillées sur le signal :

- L'onglet `Overview` indique la raison pour laquelle la règle a déclenché un signal de sécurité dans la section What Happened. Elle énumère notamment le tag de regroupement ainsi que les personnalisations basées sur un type de règle. Les informations de contexte et le JSON associés au signal sont également affichés.
- L'onglet `Rule Details` indique les détails de la règle, comme le texte défini dans la règle, afin d'aider la personne étudiant le signal à comprendre sa finalité et les mesures à prendre. Il est également possible d'ouvrir l'éditeur de règle, pour par exemple les requêtes de suppression de la règle.
- L'onglet `Logs` comporte des échantillons de logs et une visualisation connexe afin de mieux comprendre le contexte dans lequel le signal s'est déclenché. Cliquez sur l'un de ces logs dans le tableau pour le consulter dans son intégralité.
- L'onglet `Related Signals` affiche une chronologie de signaux connexes qui présentent les mêmes valeurs de regroupement pour faciliter le triage du signal.
- L'onglet `Suggested Actions (beta)` fournit des requêtes d'enquête, des dashboards connexes et des liens vers les consoles des fournisseurs cloud en fonction des caractéristiques du signal de sécurité. Ces ressources permettent de faciliter les enquêtes et de simplifier la résolution des problèmes.

Sous l'en-tête des signaux Cloud Security Posture Management se trouvent plusieurs onglets comportant des informations détaillées sur le signal :
- L'onglet `Message` affiche le texte configuré dans la règle de détection pour aider la personne chargée d'examiner le signal à bien comprendre son objectif ainsi que les mesures à prendre.
- L'onglet `Findings` répertorie la liste de chaque ressource ayant été évaluée par la règle.
- L'onglet `Related Issues` affiche une liste de signaux connexes qui présentent les mêmes valeurs de regroupement pour faciliter le triage du signal.

### Renseignements sur les menaces

La solution Cloud SIEM de Datadog fournit des flux de renseignements sur les menaces minutieusement sélectionnés par des experts en la question. Ces flux sont constamment mis à jour de façon à inclure des données sur les activités suspicieuses connues (par exemple, des indicateurs de compromissions), afin que vous puissiez identifier rapidement les menaces potentielles que vous devez éliminer.

{{< img src="security_platform/security_monitoring/explorer/threat_intel.png" alt="Renseignement sur les menaces dans le Security Signals Explorer" style="width:85%;" >}}

Datadog propose automatiquement des renseignements sur les menaces en analysant l'ensemble des logs ingérés possédant des attributs pertinents. Lorsqu'un log contient un indicateur de compromission, comme une IP anonymisée liée à un VPN, un proxy ou un nœud de sortie Tor, un attribut `threat_intel` est ajouté à l'événement de log, afin de fournir des insights supplémentaires basés sur les renseignements disponibles.

Pour afficher tous les renseignements sur les menaces dans le Security Signals Explorer, utilisez la requête `@threat_intel.indicators_matched:*`. Les attributs supplémentaires suivants permettent d'interroger les renseignements sur les menaces :

* `@threat_intel.results.category “anonymizer”, “scanner”`
* `@threat_intel.results.intention “malicious”, “unknown”`
* `@threat_intel.results.subcategory options "proxy", "tor", "vpn"`
    **Remarque** : les attributs de sous-catégorie Proxy, Tor et VPN sont uniquement fournis par le partenaire IPinfo.

### Effectuer une recherche en fonction d'attributs d'IP du réseau

Lorsque la solution Cloud SIEM de Datadog détecte des activités malveillantes à partir de vos logs, elle recherche l'adresse IP du réseau de la personne à l'origine de ces activités afin de déterminer si celle-ci a interagi avec vos systèmes. Utilisez la requête suivante pour effectuer une recherche en fonction d'attributs d'IP dans le Log Explorer : `@network.ip.list:<ADRESSE_IP>`. Cette requête recherche des adresses IP dans l'ensemble des logs, y compris dans les champs de tag, d'attribut, d'erreur et de message.

{{< img src="security_platform/security_monitoring/explorer/network_ip_list.png" alt="Le Log Explorer affichant le résultat d'une recherche avec l'attribut network.ip.list" style="width:80%;" >}}

### Détection des anomalies

Si le signal de sécurité que vous étudiez a été généré suite à la détection d'une anomalie, un graphique représente l'anomalie. Sur la partie droite du graphique, un cadre indique la date à laquelle l'anomalie a été détectée.

  {{< img src="security_platform/security_monitoring/explorer/anomaly-detection.png" alt="Graphique de détection d'anomalies" >}}

## Analyser visuellement vos signaux de sécurité

Pour passer du mode Tableau au mode Analyse des signaux de sécurité, cliquez sur le bouton _Signal Mode_ dans le coin supérieur gauche de la page :

{{< img src="security_platform/security_monitoring/explorer/analytics.png" alt="La page du Signals Explorer affichant des signaux dans un graphique à barres avec un regroupement par technique" style="width:85%;" >}}

Une fois vos signaux de sécurité générés par le moteur des règles de sécurité, vous pouvez les représenter graphiquement et afficher les valeurs maximales ou minimales, les centiles, le nombre de valeurs uniques, et plus encore.

Suivez le [guide sur la représentation graphique de logs][6] pour découvrir les différentes options des graphiques.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Log%20Detection%22
[3]: https://app.datadoghq.com/security/compliance
[4]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Workload%20Security%22
[5]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22
[6]: /fr/logs/explorer/analytics/?tab=timeseries