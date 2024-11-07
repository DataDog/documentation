---
description: Identifiez les problèmes de performance au sein de votre application
  qui affectent les utilisateurs finaux avec l'analyse de l'impact Watchdog.
further_reading:
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: Blog
  text: Mesurer l'ampleur de l'impact utilisateur avec l'analyse de l'impact Watchdog
- link: real_user_monitoring/explorer/watchdog_insights/
  tag: Documentation
  text: En savoir plus sur Watchdog Insights pour RUM
- link: real_user_monitoring/connect_rum_and_traces/
  tag: Documentation
  text: Associer RUM à vos traces
title: Analyse de l'impact Watchdog
---

## Présentation

Dès lors que la fonctionnalité Watchdog détecte une anomalie APM, elle analyse simultanément différentes métriques de latence et d'erreur fournies par les SDK RUM. Cette opération vise à évaluer si l'anomalie nuit aux pages Web et mobiles consultées par vos utilisateurs.

Si Watchdog détermine qu'une anomalie a une incidence négative sur l'expérience de vos utilisateurs finaux, il fournit une synthèse des répercussions dans l'alerte APM Watchdog, avec les informations suivantes :

- La liste des vues RUM concernées
- Le nombre estimé d'utilisateurs concernés
- Un lien vers la liste des utilisateurs concernés, afin de pouvoir les contacter, si nécessaire

{{< img src="watchdog/watchdog_impact_analysis.mp4" alt="Un utilisateur passe son curseur sur les boutons Users et Views pour en savoir plus sur les utilisateurs affectés et le nombre de vues affectées" video=true >}}

Cette fonctionnalité est automatiquement activée pour l'ensemble des utilisateurs d'APM et de RUM. Lorsque des alertes APM Watchdog sont associées à des impacts pour les utilisateurs finaux, les **utilisateurs** et **chemins des vues** concernés s'affichent dans la section **Impacts** de vos alertes Watchdog. Cliquez sur **users** pour afficher les coordonnées des utilisateurs concernés afin de pouvoir les contacter, ou sur **view paths** pour accéder aux vues RUM concernées afin de consulter des informations supplémentaires.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}