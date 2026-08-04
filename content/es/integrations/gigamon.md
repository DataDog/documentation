---
app_id: gigamon
categories:
- aws
- azure
- la red
- seguridad
- kubernetes
- rastreo
- google cloud
custom_kind: integración
description: Observabilidad profunda de todo el tráfico de aplicaciones en infraestructura
  en la nube, virtual y física
integration_version: 1.0.0
media:
- caption: Dashboard de Gigamon para Datadog
  image_url: images/gd1.png
  media_type: imagen
- caption: Dashboard de Gigamon para Datadog
  image_url: images/gd2.png
  media_type: imagen
- caption: Dashboard de Gigamon para Datadog
  image_url: images/gd3.png
  media_type: imagen
- caption: Dashboard de Gigamon para Datadog
  image_url: images/gigamondashboard.png
  media_type: imagen
supported_os:
- linux
- windows
title: Gigamon
---
## Información general

[Gigamon](http://gigamon.com) Application Metadata Intelligence (AMI) potencia tus herramientas de Observability, Security Information y Event Management (SIEM) y Network Performance Monitoring con atributos de metadatos críticos en miles de aplicaciones y servicios empresariales, de consumo y de TI. Obtén una amplia visibilidad de las aplicaciones para localizar rápidamente los cuellos de botella en el rendimiento, los problemas de calidad y los posibles riesgos de seguridad en la red. AMI de Gigamon te ayuda a monitorizar y gestionar aplicaciones digitales complejas para tus iniciativas de transformación digital. Esto se puede conseguir a través de la solución Gigamon, enviando los metadatos de AMI a Datadog. Algunos beneficios para destacar son la información valiosa procesable, la potenciación de la postura de seguridad, etc.

## Configuración

Gigamon envía metadatos AMI [AMX](https://docs.gigamon.com/doclib66/Content/GV-Cloud-V-Series-Applications/AMX_intro.html) a la API de Datadog a través de `POST` HTTP.

### Instalación

GigaVUE V Series Node es una máquina virtual que se ejecuta en la infraestructura del cliente y que procesa y distribuye el tráfico de red. Gigamon Application Metadata Exporter (AMX) convierte la salida de la AMI en formato CEF a JSON y la envía a Datadog. La aplicación AMX solo puede desplegarse en un Nodo Serie V y puede conectarse a la AMI que se ejecuta en un nodo físico o en una máquina virtual. La aplicación AMX y la AMI son gestionadas por GigaVUE-FM.

1. Después de instalar AMX en tu entorno, crea una sesión de monitorización en [FM](https://docs.gigamon.com/doclib66/Content/GigaVUE_Cloud_Suites.html?tocpath=GigaVUE%20Cloud%20Suite%7C_____0).
1. Edita el exportador y proporciona los siguientes campos obligatorios:
   a. Alias: Nombre del exportador (cadena).
   b. Ingestor: Especifica el puerto como "514" y el tipo como "ami".
   c. Exportación de herramientas en la nube: Crea una nueva herramienta exportadora seleccionando '+' y añade detalles como se muestra en el siguiente diagrama:
   ![Exportador AMI](https://raw.githubusercontent.com/DataDog/integrations-extras/master/gigamon/images/gigamon1.png)
   ![Exportador de herramientas en la nube](https://raw.githubusercontent.com/DataDog/integrations-extras/master/gigamon/images/gigamon2.png)

## Datos recopilados

### Atributos de los metadatos

La inspección profunda de paquetes de Gigamon extrae más de 7500 atributos de metadatos de aplicaciones y los reenvía a Datadog. Gigamon Application Metadata Protobook proporciona una lista completa de los protocolos admitidos y sus atributos. Estos protocolos también se pueden ver agrupados por etiquetas, familia y método de clasificación.

Gigamon AMX convierte la salida de la AMI en formato CEF a JSON y la envía a Datadog.

Puedes acceder al Application Metadata Protobook desde [GigaVUE FM](https://docs.gigamon.com/doclib66/Content/GV-GigaSMART/Application%20Protocol%20Bundle.html).

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Gigamon](https://www.gigamon.com/support/support-and-services/contact-support.html).