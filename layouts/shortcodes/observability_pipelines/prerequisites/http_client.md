To use Observability Pipelines's HTTP/S Client source, you need the following information available:

1. The full path of the HTTP Server endpoint that the Observability Pipelines Worker collects log events from. (For example, `https://127.0.0.8/logs`).
2. The HTTP authentication token or password. 

The HTTP client source pulls data from your upstream HTTP server. Your HTTP server must support GET requests for the HTTP Client endpoint URL that you set as an environment variable when you install the Worker.
