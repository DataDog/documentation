---
description: Crea tu instalación de Datadog y define la prioridad de las funciones.
further_reading:
- link: /getting_started/integrations/
  tag: Documentación
  text: Empezando con las integraciones
title: Crear tu instalación de Datadog
---

Después de planificar el diseño de la instalación de Datadog y las prácticas recomendadas, concéntrate en la creación de Datadog propiamente dicha, entendiendo lo que hay que instalar y la mejor manera de lograrlo.

A medida que crece tu huella informática, necesitas definir normas para la instalación y el uso de software. Para ello, es importante desarrollar pasos precisos y repetibles para configurar el software de forma fiable y, al mismo tiempo, mantener la flexibilidad que necesitas. Esta sección explica cómo Datadog puede integrarse eficazmente con estas normas.

## Iterar en tu entorno

En la sección del [plan][7], exploraste una serie de temas dentro de una especificación de diseño de Datadog. Lo ideal sería que todas y cada una de esas cuestiones se investiguen y respondan por completo antes de ejecutar un gran despliegue. Sin embargo, la ingeniería de TI empresarial a menudo requiere que hagas una pausa y te adaptes a medida que creas tu instalación.

### Priorización de funciones

Es posible escalonar la instalación de Datadog y aumentar la complejidad gradualmente. Algunas cosas deben hacerse pronto y otras pueden esperar. A continuación se describe un desglose de cómo puedes aplicar aquello que es principal (necesidades) frente a aquello que es secundario (deseos) a medida que escalas tu instalación de Datadog.

**Principal**:
1. Etiquetas (tags) de servicio unificadas - `service:test` `env:prod` `version:1.x` 
2. Perfiles de productos (infraestructura, APM, Monitorización Synthetic, RUM, Gestión de logs, etc.)
3. Especificaciones principales de la integración (puertos, inicios de sesión, URL)

**Secundario**:
1. Integraciones secundarias
2. Opciones avanzadas/específicas para cada caso

## Apoyo interno

Como propietario de tu plataforma Datadog, es probable que necesites crear una forma que permita a tus usuarios consumir tu instalación. Puede que haya un wiki, una integración ServiceNow o una tabla de Jira que publique Datadog y proporcione una forma de solicitarlos. Esta es la guía que tus clientes internos utilizarán para desplegar Datadog en las aplicaciones y la infraestructura que gestionan. 

La forma de este sistema será diferente dependiendo de tu entorno, pero hay algunas cosas fundamentales que pueden acelerar esta creación:

1. Crea una lista de tareas de instalación de Datadog como:

    - Incorporar una nueva aplicación, incluido todo su software e infraestructura
    - Añadir una cuenta en la nube
    - Crear un nuevo nodo de clúster vSphere
    - Crear una nueva instancia de base de datos
    - Monitorizar nuevos productos de software de terceros
    - Añadir tests de monitorización Synthetic
    - Crear una alerta/monitor
    - Crear/Actualizar un dashboard

2. La recopilación de conjuntos mínimos de información puede incluir aspectos como:

    - Código interno del centro de costes
    - Nombre de la aplicación, propietario, equipo de operaciones
    - Aspectos específicos de las condiciones locales 

Estas definiciones se basan en los fundamentos del plan arquitectónico completado en la fase de planificación. Sin embargo, si tienes dificultades con alguna de estas definiciones, Datadog ha desarrollado mecanismos para ayudar con este proceso y que se describen a continuación.

## Crear contenidos

Datadog es una plataforma API RESTful [totalmente documentada][1] y abierta. La mayoría de las cosas que se ven en la interfaz de usuario se pueden crear mediante programación. Datadog da la bienvenida y respalda plenamente el uso de la API, incluso como fuente de datos para tus propias aplicaciones personalizadas.

Todos los objetos creados en Datadog, como dashboards, alertas, notebooks, logs analizados y configuraciones para integraciones en la nube se almacenan en la plataforma como JSON. Se pueden exportar e importar. Esto abre un host de capacidades de administración, incluyendo el cumplimiento completo de la infraestructura como código (IaC), una copia de seguridad de la configuración, la migración de cuentas y la reusabilidad. Para estos objetivos, Datadog también admite un [proveedor de Terraform][2] y una [herramienta de CLI][3].

## Suministro

El suministro es fundamental para cualquier entorno empresarial TI. Para gestionar Datadog a escala, intégralo en tu proceso de suministro. El sencillo modelo de instalación del Datadog Agent ofrece varias formas de lograrlo.

### Arquitectura modular

Como la mayoría de los productos de software empresarial, las instalaciones de Datadog pueden dividirse en tres operaciones distintas, cada una de las cuales forma parte de la [arquitectura modular][6] denominada modelo archivo/paquete/servicio.

**Archivo(s)**: Contiene configuraciones  
**Paquete**: Contiene binarios y controla su despliegue  
**Servicio**: Gestiona la instancia de ejecución a través del sistema de servicios del sistema operativo 

Las operaciones básicas que debes realizar para instalar Datadog son las siguientes:

**Archivo**: El control del código fuente puede utilizarse para almacenar y controlar las ediciones de los archivos de configuración. Las soluciones de plantillas y IaC como Jinja2 y Ansible también son muy eficaces.

**Paquete**: Utiliza repositorios de paquetes internos como Artifactory o Nexus para alojar .rpm, .msi y paquetes del Agent en contenedores.

**Servicio**: Uso de IaC o scripts de shells.

**IaC:** La infraestructura como código ha avanzado tanto en sofisticación como en solidez. Si bien se utiliza casi universalmente en infraestructuras en la nube, a menudo se acondiciona para infraestructuras on-premises establecidas desde hace tiempo. Su sencilla estructura de archivo/paquete/servicio se ha aprovechado para desplegar importantes huellas de Datadog con "herramientas" IaC tan rudimentarias como un script bash. Aunque esto no es lo recomendado, es un estímulo para comenzar la adopción de la IaC de Datadog tan pronto como sea posible. Cuando lo hagas, encontrarás Datadog listo con código de muestra e integraciones para Ansible, Puppet, Chef, Powershell, Bash, CloudFormations, Terraform y más.  

**Recomendaciones:**   
A la hora de desplegar software del Datadog Agent, se recomienda reutilizar la mayor cantidad posible de tus sistemas de suministro existentes. El diseño del software de Datadog es plano y se ajusta a los métodos estándar del sector.

## Resumen

El diseño del Datadog Agent es plano, por lo que puede integrarse fácilmente en cualquier sistema de suministro existente. Utiliza tus capacidades existentes para archivo/paquete/servicio e incorpórales el Datadog. Aunque la plataforma ofrece mecanismos útiles, tus condiciones locales determinan el mejor método para cualquier situación.

## Siguientes pasos

Revise la documentación sobre [ejecuciones][4] del administrador de Datadog para trazar un calendario de mantenimiento, realizar actualizaciones del Datadog Agent, crear dashboards y asegurarte de que tu instalación de Datadog se mantiene en buen estado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/api/latest/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://github.com/DataDog/datadog-sync-cli
[4]: /es/administrators_guide/run
[5]: /es/agent/basic_agent_usage/
[6]: /es/agent/architecture/
[7]: /es/administrators_guide/plan