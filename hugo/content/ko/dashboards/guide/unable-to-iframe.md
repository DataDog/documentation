---
aliases:
- /ko/graphing/faq/why-am-i-unable-to-iframe-certain-https-urls
- /ko/dashboards/faq/why-am-i-unable-to-iframe-certain-https-urls
title: 특정 HTTPS URL을 iFrame화할 수 없는 이유는 무엇인가요?
---

문제는 URL 페이지에 설정된 헤더, 특히 `X-Frame-Options:`와 관련이 있을 가능성이 높습니다.

Datadog이 해당 URL을 iFrame화하도록 허용하려면 해당 URL에서 컬을 실행하여 해당 필드의 값을 확인하고 **DENY** 또는 **SAMEORIGIN**을 **ALLOW-FROM <uri>**으로 수정합니다. 이를 통해 지정한 'URL'이 이 페이지를 프레임하도록 허용합니다.

`https://ozcruising.fogbugz.com/login`를 예시로 사용:

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

이 헤더는 OzCruising 측에 설정되며 다른 사이트의 iframe에 페이지가 로드되는 것을 허용하지 않도록 브라우저에 알리기 위한 보안 조치입니다.

참고: https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet#Defending_with_X-Frame-Options_Response_Headers