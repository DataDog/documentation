---
aliases:
- /fr/graphing/faq/why-am-i-unable-to-iframe-certain-https-urls
- /fr/dashboards/faq/why-am-i-unable-to-iframe-certain-https-urls
description: Dépannez les problèmes d'iFrame causés par les en-têtes X-Frame-Options
  et découvrez comment configurer les paramètres ALLOW-FROM.
title: Pourquoi suis-je incapable d'afficher certaines URL HTTP dans un iFrame ?
---

Ce problème est certainement causé par les en-têtes définis sur la page de l'URL, notamment par l'en-tête `X-Frame-Options:`.

Pour que Datadog puisse afficher le contenu de cette URL dans un iFrame, exécutez un curl sur cette URL pour vérifier la valeur de ce champ, puis remplacez **DENY** ou **SAMEORIGIN** par **ALLOW-FROM <uri>**, afin d'autoriser l'URI spécifiée à afficher cette page dans l'iFrame.

Exemple avec l'URL `https://ozcruising.fogbugz.com/login` :

```text
curl -I -X GET https://ozcruising.fogbugz.com/login
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: text/html; charset=utf-8
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000
Set-Cookie: sUniqueID=20170117165311-54.147.147.211-va7t6961r1; expires=Sun, 17-Jan-2027 21:53:11 GMT; path=/; secure; HttpOnly
Set-Cookie: __RequestVerificationToken=9AfvMHhCQUYOZ4-hesydj0bib4VABiNIBt62BI66GOZD2pnchjazMLTd-bWFDrWxr8-6Z_KLMDNokaSD7j1fPwCqZuwjY1KEodRJK1rkPW81; path=/; HttpOnly
Set-Cookie: fb_SessionId=plvab8sfkh1fhrgc9lr8jd48okpojh; path=/; secure; HttpOnly
Date: Tue, 17 Jan 2017 16:53:12 GMT
Connection: close
Content-Length: 34778
Set-Cookie: SERVERID=webny7; path=/
```

Cet en-tête est défini côté OzCruising. Cette mesure de sécurité vise à indiquer aux navigateurs qu'ils ne doivent pas autoriser le chargement de la page dans un iFrame sur un autre site.

Référence : https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet#Defending_with_X-Frame-Options_Response_Headers