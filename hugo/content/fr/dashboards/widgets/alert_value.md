---
aliases:
- /fr/graphing/widgets/alert_value/
description: Créez un graphique illustrant la valeur actuelle d'une métrique dans
  n'importe quel monitor de métrique à alerte simple défini sur votre système.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Valeur d'alerte
widget_type: alert_value
---

Les valeurs d'alerte sont des valeurs de requête qui représentent la valeur actuelle d'une métrique dans n'importe quel monitor de métrique à alerte simple défini sur votre système :

{{< img src="dashboards/widgets/alert_value/alert_value_2023.png" alt="Trois widgets Valeur d'alerte avec trois statuts de surveillance différents pour l'espace disque, la charge processeur et le taux d'erreur à l'étape de paiement" >}}

## Configuration
{{< img src="dashboards/widgets/alert_value/alert_value_setup_2023.png" alt="Page de configuration d'un widget Valeur d'alerte pour une charge processeur élevée" style="width:100%;">}}

### Configuration

1. Sélectionnez un monitor de métrique existant à représenter graphiquement.
2. Sélectionnez le format d'affichage de la valeur :
    * Valeurs décimales
    * Unités
    * Alignement
3. Donnez un titre à votre graphique.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][1]**. Le tableau ci-dessous définit le [schéma JSON du widget][2] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/