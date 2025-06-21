---
title: Python App and API Protection Compatibility
further_reading:
  - link: "/security/application_security/how-it-works/"
    tag: "Documentation"
    text: "How App and API Protection Works"
  - link: "/security/default_rules/?category=cat-application-security"
    tag: "Documentation"
    text: "OOTB App and API Protection Rules"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting App and API Protection"
---

{{< partial name="api_security/callout.html" >}}

{{< partial name="api_security/python/overview.html" >}}

This page provides compatibility information for Python App and API Protection (AAP).

## Supported Python Versions

- Python 3.6+
- Python 3.7+
- Python 3.8+
- Python 3.9+
- Python 3.10+
- Python 3.11+
- Python 3.12+

## Supported Frameworks

### Web Frameworks
- Django 2.0+
- Flask 1.0+
- FastAPI 0.68+
- Pyramid 1.9+
- Bottle 0.12+
- CherryPy 18.0+
- Falcon 3.0+
- Sanic 21.0+

### ASGI Frameworks
- Starlette 0.20+
- Uvicorn 0.15+
- Hypercorn 0.14+

### WSGI Servers
- Gunicorn 20.0+
- uWSGI 2.0+
- Waitress 2.0+

## Supported Libraries

### Database Libraries
- SQLAlchemy 1.3+
- psycopg2 2.8+
- pymongo 3.9+
- redis 3.5+
- mysql-connector-python 8.0+

### HTTP Libraries
- requests 2.22+
- urllib3 1.25+
- aiohttp 3.6+

### Task Queues
- Celery 4.4+
- RQ 1.8+

## Datadog Library Requirements

- ddtrace >= 1.2.2

## Operating System Support

- Linux (Ubuntu, CentOS, RHEL, etc.)
- macOS 10.14+
- Windows 10+

## Container Support

- Docker
- Kubernetes
- Amazon ECS
- AWS Fargate

## Further Reading

{{< partial name="whats-next/whats-next.html" >}} 