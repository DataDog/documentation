{
    "status": 0,
    "check_time": 1555074753734,
    "check_version": 4,
    "result": {
        "timings": {"firstByte": 717.5, "tcp": 281.8, "ssl": 565.2, "dns": 1.103536993265152, "download": 0.1, "total": 1565.7},
        "mainDC": "us1.prod",
        "eventType": "finished",
        "httpStatusCode": 200,
        "responseSize": 26693
    },
    "probe_dc": "aws:ap-northeast-1",
    "result_id": "16334500735347249235",
    "check": {"config": {"request": {"url": "https://datadoghq.com/", "method": "GET", "timeout": 30}, "assertions": [{"operator": "is", "type": "statusCode", "target": 200}]}}
}