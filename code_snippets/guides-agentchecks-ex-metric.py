timing = end_time - start_time
self.gauge('http.reponse_time', timing, tags=['http_check'])