require 'rubygems'
require 'dogapi'

api_key = '9775a026f1ca7d1c6c5af9d94d9595a4'
app_key = '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

# Update a screenboard
board_id = 7953
board = {
    'width' => 1024,
    'height' => 768,
    'board_title' => 'dogapi test',
    'widgets' => [
        {
          'type' => 'image',
          'height' => 20,
          'width' => 32,
          'y' => 7,
          'x' => 32,
          'url' => 'https://path/to/image.jpg'
        }
    ]
}

dog.update_screenboard(board_id, board)
