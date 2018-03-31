---
title: Problèmes avec l'intégration Apache
kind: faq
---

Si vous rencontrez des problèmes avec votre intégration Apache, cela est surement dû au fait que l'Agent ne pouvait pas accéder à votre URL d'état Apache.

Essayez d'exécuter curl pour le fichier apache_status_url que vous avez dans votre fichier apache.yaml sur votre host, en vous assurant d'inclure vos identifiants de connexion, pour voir s'il affiche correctement les statistiques.

Si ce n'est pas le cas, modifiez vos autorisations pour l'URL de statut afin d'autoriser l'accès à partir de l'host. Vous pouvez lire [cet article](http://httpd.apache.org/docs/2.2/mod/mod_status.html) pour plus d'informations.

Si vous avez encore des problèmes, [contactez-nous](/help) avec [un flare](/agent/faq/send-logs-and-configs-to-datadog-via-flare-command).