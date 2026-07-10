---
categories:
- automatización
- nube
- configuración y despliegue
- herramientas para desarrolladores
- métricas
custom_kind: integración
dependencies: []
description: Conéctate a Travis CI para ver métricas de tiempos de compilación, estados
  de compilaciones, tareas y más.
doc_link: https://docs.datadoghq.com/integrations/travis_ci/
draft: false
git_integration_title: travis_ci
has_logo: true
integration_id: ''
integration_title: Travis CI
integration_version: ''
is_public: true
manifest_version: '1.0'
name: travis_ci
public_title: Integración de Datadog y Travis CI
short_description: Conéctate a Travis CI para ver métricas de tiempos de compilación,
  estados de compilaciones, tareas y más.
team: integraciones-web
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Travis CI es un servicio de integración continuo y alojado que se utiliza para crear y probar proyectos de software. Conéctate a Travis CI para ver métricas de tiempos de compilación, estados de compilaciones, tareas y más.

## Configuración

### Instalación

Puedes instalar la integración Travis CI con su [cuadro de integración][1].

### Configuración

1. Añade tu nombre de cuenta, el token de API (que encontrarás en la pestaña del perfil en Travis CI) y el tipo de proyecto. Los tipos de proyectos se determinan de la siguiente manera:

    - _Open source_ (Código abierto) se refiere a los repositorios conectados a travis-ci.org
    - _Private_ (Privado) se refiere a los repositorios conectados a travis-ci.co
    - _Enterprise_ (Empresa) se refiere a los repositorios conectados a un dominio Travis CI personalizado

2. Si la cuenta está bajo Travis CI Enterprise, introduce tu dominio personalizado.
3. Si es necesario, añade varias cuentas haciendo clic en "Add row" (Añadir fila).
4. Haz clic en 'Install' (Instalar) (sólo instalación inicial).
5. Añade la organización y los repositorios de los que quieres recopilar métricas con la clave de API correspondiente.
6. Para recopilar métricas para todos los repositorios de una organización, escribe `<ORGANIZATION_NAME>/*` en Proyecto.
7. Haz clic en 'Update Configuration' (Actualizar configuración).

## Datos recopilados

### Métricas
{{< get-metrics-from-git "travis_ci" >}}


### Eventos

La integración Travis CI no incluye eventos.

### Checks de servicio

La integración Travis CI no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://app.datadoghq.com/integrations/travis_ci
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/travis_ci/travis_ci_metadata.csv
[3]: https://docs.datadoghq.com/es/help/
