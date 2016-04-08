get '/games' do
  erb :'games/board'
end

get '/pause' do
  if request.xhr?
    sleep(0.8)
    "yoooooooooo"
  else
  end
end
