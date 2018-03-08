---
title: How do I collect metrics from Heroku with Datadog?
kind: faq
---

Mike Fiedler wrote an excellent blog post describing how to collect application performance metrics from Heroku via Datadog:

http://www.miketheman.net/2014/12/07/tracking-application-performance-on-heroku-with-datadog/

Complimentary to Mike's solution, Sveinn Fannar Kristjánsson from Oz.com submitted a project for collecting Heroku's routing layer, application containers, etc. using StatsD:

https://github.com/ozinc/heroku-datadog-drain

Ladislav Prskavec shared a similar project using Go:

https://github.com/apiaryio/heroku-datadog-drain-golang

Another option was provided by John Kershaw of Bristlr.com that sends Heroku logs to Datadog:

https://github.com/Bristlr/heroku-datadog



Thanks @mikefiedler, @sveinnfannar @wardrox @abtris!