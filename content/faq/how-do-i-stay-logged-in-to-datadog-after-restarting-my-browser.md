---
title: How do I stay logged in to Datadog after restarting my browser?
kind: faq
customnav: main_references
---

In order to stay logged in to Datadog after closing and restarting your browser you will need to adjust the settings for your browser's session cookies.

Datadog sets some of the cookies to be session cookies. These cookies are supposed to expire at the end of the session (i.e. when the browser closes).

Firefox, Chrome, and Safari all have the option to re-open the tabs and windows that you had when you closed the browser. In this case they keep the session cookies; when you re-open your browser you still have your session cookies so you don't need to log in again.

## Firefox

* Preferences: "General" Tab: When Firefox starts: Show my windows and tabs from last time
* Note: This will only work if you have a Datadog tab open when you close 
Firefox.

## Chrome

* Settings: On Startup: Continue where you left off

## Safari

* Preferences: "General" Tab: Safari opens with: All windows from last session