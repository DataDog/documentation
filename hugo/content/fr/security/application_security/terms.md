---
disable_toc: false
further_reading:
- link: /security/application_security/how-it-works
  tag: Documentation
  text: Fonctionnement de la protection des applications et des API
- link: /security/application_security
  tag: Documentation
  text: App and API protection
- link: https://www.datadoghq.com/blog/datadog-threat-intelligence/
  tag: Blog
  text: Accélérez les enquêtes de sécurité avec Datadog Threat Intelligence
title: Termes et concepts
---
Datadog App and API Protection surveille les menaces et assure une protection contre les attaques au niveau des applications visant à exploiter des vulnérabilités au niveau du code. Il tire parti du contexte d'exécution du code au moment de l'exécution, des données de trace et d'erreur, ainsi que de l'attribution des utilisateurs.

## Termes généraux d'App and API Protection {#general-app-and-api-protection-terms}

tentative d'attaque
: Quelle règle de sécurité a été déclenchée par la trace.

Bibliothèque Datadog
: _également_ tracer, SDK
: Une bibliothèque spécifique à un langage de programmation intégrée dans les applications web. Datadog App and API Protection utilise la bibliothèque pour surveiller et protéger. APM utilise la même bibliothèque pour instrumenter le code à des fins de télémétrie de traçage.

règle de détection
: Une définition de logique conditionnelle appliquée aux données ingérées et aux configurations cloud. Lorsqu'au moins un cas défini dans une règle correspond à un événement sur une période donnée, Datadog génère un _signal de sécurité_.
: Voir [Règles de détection][10].

liste d'autorisation (anciennement filtre d'exclusion)
: Un mécanisme permettant de supprimer les traces de sécurité signalées par la bibliothèque Datadog App and API Protection et les règles In-App WAF. La liste d'autorisation est appliquée au fur et à mesure que les requêtes sont ingérées dans Datadog (intake). La liste d'autorisation aide à gérer les faux positifs et les coûts d'ingestion.
: Voir [Filtres d'exclusion][11] dans l'application.

Règles WAF intégrées (anciennement règles d'événement)
: Un ensemble de règles exécutées dans les bibliothèques Datadog pour détecter une activité de sécurité. Il s'agit notamment de modèles Web Application Firewall (WAF) qui surveillent les tentatives d'exploitation de vulnérabilités connues.
: Voir [Règles WAF intégrées][12].

Remote Configuration
: Un mécanisme de la plateforme Datadog qui permet de mettre à jour la configuration de l'Agent à distance. Utilisé par Datadog App and API Protection pour mettre à jour les règles In-App WAF, activer le produit et bloquer les attaquants.
: Voir [Fonctionnement de Remote Configuration][8].

service
: Une application web, un microservice, une API ou une fonction unique. Remplit généralement une fonction métier.

signal
: Une détection d'une attaque d'application qui impacte vos services. Les signaux identifient des menaces significatives que vous devez examiner et qui doivent être triées avec une priorité élevée.
: Voir [Signals Explorer][13] dans l'application.

gravité
: Un indicateur de la rapidité avec laquelle une tentative d'attaque doit être triée et traitée. Basé sur une combinaison de facteurs, notamment l'impact potentiel et le risque de l'attaque. Les valeurs sont Critical, High, Medium, Low, Info.

trace de sécurité
: Une trace distribuée pour laquelle une activité de sécurité a été signalée par les règles WAF intégrées. La trace sous-jacente est partagée avec APM, permettant des investigations plus approfondies et plus rapides.

requête suspecte
: Une trace distribuée pour laquelle une activité de sécurité a été signalée par les règles WAF intégrées. La trace sous-jacente est partagée avec APM, permettant des investigations plus approfondies et plus rapides.

attribution utilisateur
: Un mécanisme qui associe les requêtes suspectes aux utilisateurs connus dans vos systèmes.
: Voir [Suivi de l'activité utilisateur][14].

vulnérabilité
: Risque passif au sein d'une application. D'après [OWASP][1]: « Une vulnérabilité est une faille ou une faiblesse dans l'application, qui peut être un défaut de conception ou un bug d'implémentation, permettant à un attaquant de causer du tort aux parties prenantes d'une application. Les parties prenantes incluent le propriétaire de l'application, les utilisateurs de l'application et d'autres entités qui dépendent de l'application. »

qualification de trace
: Le processus par lequel Datadog aide à comprendre l'impact des traces, en les étiquetant
comme `Harmful Safe or Unknown`.
: Voir [Qualification des traces][15].

renseignements sur les menaces
: Un ensemble de règles exécutées dans les bibliothèques Datadog pour détecter les menaces. Il s'agit notamment de modèles Web Application Firewall (WAF) qui surveillent les tentatives d'exploitation de vulnérabilités connues.
: Voir [Renseignements sur les menaces][16]

attaquants suspects
: Un précurseur des adresses IP signalées. Les adresses IP suspectes ont atteint un seuil minimal de trafic d'attaque pour être classées comme suspectes, mais pas le seuil pour être signalées. Les seuils ne sont pas configurables par l'utilisateur.
: Voir [Attackers Explorer][17]

attaquants signalés
: Adresses IP qui envoient de grandes quantités de trafic d'attaque. Nous recommandons d'examiner et de bloquer les adresses IP signalées. Les seuils ne sont pas configurables par l'utilisateur.
: Voir [Attackers Explorer][17]

empreinte d'attaquant
: Identifiants calculés à partir des caractéristiques de la requête pour suivre un attaquant à travers plusieurs requêtes.
: Voir [Empreinte d'attaquant][18]

cluster d'attaquants
: Un ensemble d'attributs identifiant un attaquant à travers une attaque distribuée.
: Voir [Regroupement d'attaquants][19]

## Termes relatifs aux attaques et aux vulnérabilités connues {#attacks-and-known-vulnerabilities-terms}

Open Web Application Security Project (OWASP)
: Une fondation à but non lucratif avec plusieurs projets visant à améliorer la sécurité des applications web. L'OWASP est surtout connu pour l'[OWASP Top 10][2], un large consensus sur les risques de sécurité les plus critiques pour les applications web.

Scripts intersites (XSS)
: Un type d'attaque par injection dans lequel des scripts malveillants sont injectés dans des sites web par ailleurs fiables.
: Voir [XSS sur l'OWASP][3].

Injection de langage de requête structuré (SQLi, injection SQL) :
: Un type d'attaque par injection dans lequel une requête SQL est exécutée via les données d'entrée du client vers l'application. Des commandes SQL sont injectées dans les données d'entrée du plan de données afin d'affecter l'exécution de commandes SQL prédéfinies. Une exploitation réussie d'injection SQL peut lire des données sensibles de la base de données, modifier des données de la base de données (Insertion/Mise à jour/Suppression), exécuter des opérations d'administration sur la base de données (telles que l'arrêt du SGBD), récupérer le contenu d'un fichier donné présent sur le système de fichiers du SGBD, et dans certains cas, émettre des commandes vers le système d'exploitation.
: **Connexe :**: Injection de langage de requête Cassandra (CQLi), injection NoSQL (NoSQLi) — similaire à SQLi mais pour le langage de requête Cassandra et NoSQL.
: Voir [Injection SQL sur OWASP][4].

Falsification de requête côté serveur (SSRF)
: Une vulnérabilité où une application web récupère une ressource distante sans valider l'URL fournie par l'utilisateur. Elle permet à un attaquant de contraindre l'application à envoyer une requête conçue vers une destination inattendue, même lorsqu'elle est protégée par un pare-feu, un VPN ou un autre type de liste de contrôle d'accès (ACL) réseau.
: Voir [Falsification de requête côté serveur sur OWASP][5].

Inclusion de fichier local (LFI)
: Une vulnérabilité qui permet à un attaquant d'inclure un fichier présent localement sur le serveur lors du traitement de la requête. Dans la plupart des cas, cela permet à l'attaquant de lire des informations sensibles stockées dans des fichiers sur le serveur. Dans des cas plus graves, l'exploitation peut conduire à du cross-site scripting ou à une exécution de code à distance.
: Voir [Test de LFI sur OWASP][6].

Inclusion de fichier distant (RFI)
: Une vulnérabilité similaire à l'inclusion de fichier local, mais qui permet à un attaquant d'inclure un fichier distant lors du traitement de la requête. Les fichiers utilisés dans les attaques par inclusion de fichier distant contiennent le plus souvent du code malveillant pour PHP, JSP ou des technologies similaires.

Exécution de code à distance (RCE)
: Une vulnérabilité qui permet à un attaquant d'exécuter du code à distance sur une machine.

Injection du langage de navigation dans les graphes d'objets (OGNLi)
: Une vulnérabilité qui permet à un attaquant d'exécuter sa propre expression OGNL dans une application Java, menant le plus souvent à une exécution de code à distance.
: Voir [OGNLi dans l'OWASP Top 10][7].



## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://owasp.org/www-community/vulnerabilities/
[2]: https://owasp.org/www-project-top-ten/
[3]: https://owasp.org/www-community/attacks/xss/
[4]: https://owasp.org/www-community/attacks/SQL_Injection
[5]: https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
[6]: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion
[7]: https://owasp.org/www-project-top-ten/2017/A1_2017-Injection
[8]: /fr/remote_configuration
[10]: /fr/security/detection_rules/
[11]: https://app.datadoghq.com/security/appsec/exclusions
[12]: /fr/security/application_security/policies/inapp_waf_rules/
[13]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&view=signal
[14]: /fr/security/application_security/how-it-works/add-user-info/
[15]: /fr/security/application_security/how-it-works/trace_qualification/
[16]: /fr/security/application_security/how-it-works/threat-intelligence/
[17]: /fr/security/application_security/security_signals/attacker-explorer/
[18]: /fr/security/application_security/security_signals/attacker_fingerprint/
[19]: /fr/security/application_security/security_signals/attacker_clustering/