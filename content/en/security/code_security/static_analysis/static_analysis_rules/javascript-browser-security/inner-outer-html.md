---
aliases:
- /continuous_integration/static_analysis/rules/javascript-browser-security/inner-outer-html
- /static_analysis/rules/javascript-browser-security/inner-outer-html
dependencies: []
disable_edit: true
group_id: javascript-browser-security
meta:
  category: Security
  id: javascript-browser-security/inner-outer-html
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Do not modify innerHTML or outerHTML
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-browser-security/inner-outer-html`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
Properties like `innerHTML` and `outerHTML` should not be modified directly unless such modifications are clearly reviewed. Modifying `innerHTML` or `outerHTML` using user inputs that has not been validated can lead to XSS injection.

#### Learn More

 - [Why InnerHTML Is a Bad Idea and How to Avoid It?](https://www.dhairyashah.dev/posts/why-innerhtml-is-a-bad-idea-and-how-to-avoid-it/)
 - [CWE-79 - Improper Neutralization of Input During Web Page Generation](https://cwe.mitre.org/data/definitions/79.html)


## Non-Compliant Code Examples
```javascript
function nonCompliant(argument) {
  const content = '<div>' + argument + '</div>';
  document.write(content);
}
```

```javascript
function nonCompliant(myArgument) {
  document.body.outerHTML = myArgument;
}
```

```javascript
if (typeof(SERVER_DOMAIN) === 'undefined') {
   window.location.replace("/unconfigured.html");
}

const RECEIVE_URL = SERVER_DOMAIN + "/challenge_scoreboard.html" + "?origin=" + get_domain();

var window_ref = null;

document.getElementById("username").focus();

function store_username() {
   var username;
   var username_obj;

   username_obj = document.getElementById("username");
   username = username_obj.value

   var welcome;
   welcome = document.getElementById("welcome");
   welcome.innerHTML = "Welcome " + html_encode (username);

   var set_username;
   set_username = document.getElementById("set_username");
   set_username.style.display="none";

   var game;
   game = document.getElementById("game");
   game.style.display="inline";

   start_game();
   // have to do time out so the window can open
   setTimeout (function () {send_username(username);}, 1000);

   return false;
}

```
