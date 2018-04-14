---
title: Comment envoyer des métriques d'hôte TCP / UDP via l'API Datadog?
kind: faq
---

Si vous souhaitez obtenir des informations sur vos connexions TCP / UDP, vous pouvez collecter des métriques via une entrée Crontab et en les transférant vers votre plateforme Datadog.

Nous allons utiliser Linux sockstats situé dans: /proc/net/sockstat.

Vous pouvez trouver ici un petit extrait de code pour vous inspirer

https://gist.github.com/sage-oli-wood/70e0931f037ea0aac132

This submits your data to Datadog through an HTTP POST.

A more proper way to do this would be to send metrics and events using DogStatsD. You may adapt your cron job to forward your data locally in UDP to your Agent, find more here.

You retrieve from this:

* TCP: 

||||
|:---|:---|:---|
|in use|  total established connections |  integer (number)|
|Orphan|  Orphaned tcp connections |
(not attached to any user file handle) | integer (number)|
|TW | TIME_WAIT connections  | ineger (millisec )|
|Alloc|   TCP sockets allocated  |  ( All type for example, ESTABLISH, CLOSE_WAIT, TIME_WAIT, etc)|
|mem| total memory for TCP socket | integer (KiloBytes)|

* UDP: 

||||
|:---|:---|:---|
|inuse|   Nombre total de connexions établies  | integer|
|mem |total memory for UDP socket | integer (KB)|

