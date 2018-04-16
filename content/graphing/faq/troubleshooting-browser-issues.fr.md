---
title: Troubleshooting - Problèmes de navigateur
kind: faq
---

Si vous constatez des résultats inattendus dans l'application Datadog, tels que des données manquantes ou des graphiques/widgets vierges, essayez la checklist suivante pour résoudre le problème:

* Vérifiez si vous avez le même problème en utilisant le mode de navigation privée de votre navigateur.
* Ouvrez la console de votre navigateur pour voir s'il y a des erreurs dans l'onglet Réseau
* Check if you have the same issue using a different browser
* Ask teammates to check their accounts from their machines and confirm whether they can reproduce the issue
* Connectez-vous à votre compte depuis une machine différente pour voir si le problème persiste
* Check that your system clock is not [significantly offset from NTP][1]
* Are you experiencing this from multiple locations? Can you send the output of:
    * traceroute app.datadoghq.com
    * tracepath app.datadoghq.com
* Is this dashboard specific? Using Chrome browser, do the following:
    * Select View->Developer->Developer Tools
    * Click on the Network tab of the new window that opens
    * Load the dashboard experiencing issues
    * After the page has loaded, right click on the results that show up and * select "Save as HAR with content"
    * Save the file as an attachment and send to us

In most of the scenarios above, the root cause of the issue is very likely related to a browser extension, outdated browser, or something similar.

If you continue to have issues,contact [us][2] for assistance, to help expedite your issue include:

* Results of the above tests
* A screenshot of your issue
* Un lien vers la page en question
* Extensions you're running
* Version du navigateur
* Versions OS 

[1]: /agent/faq/network-time-protocol-ntp-offset-issues
[2]: /help
