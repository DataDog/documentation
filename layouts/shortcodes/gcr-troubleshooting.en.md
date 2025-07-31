This integration depends on your runtime having a full SSL implementation. If you are using a slim image, you may need to add the following command to your Dockerfile to include certificates.

```dockerfile
RUN apt-get update && apt-get install -y ca-certificates
```
