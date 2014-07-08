from dogapi import dog_http_api as api

api.api_key = '9775a026f1ca7d1c6c5af9d94d9595a4'
api.application_key = '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

board = {
    "width": 1024,
    "height": 768,
    "board_title": "dogapi test",
    "widgets": [
        {
          "type": "image",
          "height": 20,
          "width": 32,
          "y": 7,
          "x": 32,
          "url": "https://path/to/image.jpg"
        }
    ]
}

api.create_screenboard(board)
