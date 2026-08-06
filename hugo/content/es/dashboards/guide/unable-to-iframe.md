---
aliases:
- /es/graphing/faq/why-am-i-unable-to-iframe-certain-https-urls
- /es/dashboards/faq/why-am-i-unable-to-iframe-certain-https-urls
title: ¿Por qué no puedo hacer iFrame con ciertas URLs HTTPS?
---

Lo más probable es que el problema tenga que ver con los encabezados establecidos en la página URL, concretamente `X-Frame-Options:`.

Para permitir hacer Datadog iFrame con esa URL, ejecuta un curl en esa URL para comprobar el valor de ese campo, y modifica **DENY** (Denegar) o **SAMEORIGIN** (Mismo origen) a **ALLOW-FROM<uri>** (Permitir desde), lo que permite a la 'uri' especificada enmarcar esta página.

Utilizando `https://ozcruising.fogbugz.com/login` como ejemplo:

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

Este encabezado se establece en el lado de OzCruising y es una medida de seguridad que pretende indicar a los navegadores que no permitan que la página se cargue en un iframe en otro sitio.

Referencia: https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet#Defending_with_X-Frame-Options_Response_Headers