---
title: Why am I unable to iFrame certain HTTPS URLs?
aliases:
    - /graphing/faq/why-am-i-unable-to-iframe-certain-https-urls
    - /dashboards/faq/why-am-i-unable-to-iframe-certain-https-urls
---

The issue most likely has to do with the headers set on the URL page, specifically `X-Frame-Options:`.

To allow Datadog to iFrame that URL, run a curl on that URL to check the value of that field, and modify **DENY** or **SAMEORIGIN** to **ALLOW-FROM <uri>**, which permits the specified 'uri' to frame this page.

Using `https://ozcruising.fogbugz.com/login` as an example:

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

This header is set on the OzCruising side, and is a security measure that is intended to tell browsers not to allow the page to be loaded in an iframe on another site.

Reference: https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet#Defending_with_X-Frame-Options_Response_Headers
